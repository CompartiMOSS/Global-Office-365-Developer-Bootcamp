1 - Crear una aplicación MVC en VS2017
     ![alt text](/Azure_para_office365_developers/AzureParaOffice365Developers/Media/SSO/VS2017MVC1.png)                 
     ![alt text2](/Azure_para_office365_developers/AzureParaOffice365Developers/Media/SSO/VS2017MVC2.png)

2 - Una vez creada, nos aparecerá una pantalla por defecto:
    * Seleccionar Connected Services
    * Seleccionar Authentication wiht Azure Active Directory     
     ![alt text3](/Azure_para_office365_developers/AzureParaOffice365Developers/Media/SSO/VS2017MVC3.png)

3 - Informar los campos y seguir las inidcaciones. Imporatnte: Añadir el Teneant a mano! xxx.onmicrosoft.com.

4 - Una vez finalizado ir a la carpeta App_Start y abriir el fichero Startup.Auth, os debe aparecer lo siguiente:

 public void ConfigureAuth(IAppBuilder app)
        {
            ApplicationDbContext db = new ApplicationDbContext();

            app.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);

            app.UseCookieAuthentication(new CookieAuthenticationOptions());

            app.UseOpenIdConnectAuthentication(
                new OpenIdConnectAuthenticationOptions
                {
                    ClientId = clientId,
                    Authority = Authority,
                    PostLogoutRedirectUri = postLogoutRedirectUri,

                    Notifications = new OpenIdConnectAuthenticationNotifications()
                    {
                        // If there is a code in the OpenID Connect response, redeem it for an access token and refresh token, and store those away.
                        AuthorizationCodeReceived = (context) =>
                        {
                            var code = context.Code;
                            ClientCredential credential = new ClientCredential(clientId, appKey);
                            string signedInUserID = context.AuthenticationTicket.Identity.FindFirst(ClaimTypes.NameIdentifier).Value;
                            AuthenticationContext authContext = new AuthenticationContext(Authority, new ADALTokenCache(signedInUserID));
                            return authContext.AcquireTokenByAuthorizationCodeAsync(
                               code, new Uri(HttpContext.Current.Request.Url.GetLeftPart(UriPartial.Path)), credential, graphResourceId);
                        }
                    }
                });
        }

5 - Ir al Web.config y vemos los datos que nos ha añadido el proceso con la información necesaria:

    <appSettings>    
    <add key="ida:ClientId" value="1d3eeb32-e2bf-449e-809c-62de766987fc" />
    <add key="ida:AADInstance" value="https://login.microsoftonline.com/" />
    <add key="ida:ClientSecret" value="8o1KQH+eUdhkHqoXHqN9RPiSHD96Kj3cSR4ycPEI3Xg=" />
    <add key="ida:Domain" value="bermejoblasco.onmicrosoft.com" />
    <add key="ida:TenantId" value="b923513d-76b8-4b0c-9e9c-e230f223fbd7" />
    <add key="ida:PostLogoutRedirectUri" value="https://localhost:44371/" />
  </appSettings>

6 - Ejecutamos la web.
7 - Nos logamos con nuestro usuario de office365
8 - Para verificar el SSO:
    * Sin cerrar la pestaña, abrimos una nueva y entramos en el portal de office 365: portal.office.com
    Veremos que no nos pide credenciales.
9 - Sin cerrar pestañas, abrimos una nueva y entramos en el portal de Azure: portal.azure.com
    Veremos que entramos sin tener que hacer login.

¡YA TENEMOS SSO!
