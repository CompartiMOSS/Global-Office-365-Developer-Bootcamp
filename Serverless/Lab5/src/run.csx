#r "Newtonsoft.Json"
#r "System.Configuration"
#r "System.Collections"

using System;
using System.Net;
using System.Text;
using System.Configuration;
using System.Collections.Generic;
using System.Security.Claims; 
using System.Net.Http.Headers;
using Newtonsoft.Json;
using Microsoft.IdentityModel.Clients.ActiveDirectory;

public static async Task<HttpResponseMessage> Run(HttpRequestMessage req, TraceWriter log)
{
    log.Info($"Http triggered function called");

    // The resourceId variable is the resource we want to access once we have a token
    // You can get a token issued even if you change the resource, but when you try to access said resource it will throw an error back at you.
    string resourceId = "https://graph.microsoft.com";
    string tenantId = System.Environment.GetEnvironmentVariable("TenantId", EnvironmentVariableTarget.Process);
    string clientId = System.Environment.GetEnvironmentVariable("ClientId", EnvironmentVariableTarget.Process);
    string clientSecret = System.Environment.GetEnvironmentVariable("ClientSecret", EnvironmentVariableTarget.Process);
    string authString = "https://login.microsoftonline.com/"+tenantId;

    // 1. Acquiring a token that the server can use to do lookups. (We are using the client credentials flow for OAuth. Which should only be used in a back-end context; not in a mobile app.)
    log.Verbose("client credentials flow for OAuth: " + authString);
    // This follows the Client Credential flow for OAuth, and this is a silent flow for the user.
    var authenticationContext = new AuthenticationContext(authString, false);

    // Config for OAuth client credentials 
    log.Verbose("clientId: " + clientId);
    log.Verbose("clientSecret: " + clientSecret);
    
    ClientCredential clientCred = new ClientCredential(clientId, clientSecret);
    AuthenticationResult authenticationResult = await authenticationContext.AcquireTokenAsync(resourceId, clientCred);

    string token = authenticationResult.AccessToken;
    log.Verbose("token: " + token.ToString().Substring(0,10) + "...");

    string requestUrl = $"https://graph.microsoft.com/v1.0/users/adiaz@dev.encamina.com/photo/$value";
    //string requestUrl = $"https://graph.microsoft.com/v1.0/users/adiaz@dev.encamina.com/photo";
    
    log.Verbose("requestUrl: " + requestUrl);
    
    HttpClient client = new HttpClient();
    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

    return await client.GetAsync(requestUrl);
}