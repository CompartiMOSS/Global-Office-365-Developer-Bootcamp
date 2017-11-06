1 - Entramos en el portal de Azure y vamos al servicio CosmosDB y seleccionamos la opción Add Azure Function del menu.

2 - Seleccionar por defecto los valores que os aparezcan

3 - Ir a la function que os ha creado y añadir el siguiente código:

        #r "Microsoft.Azure.Documents.Client"
        #r "Microsoft.Azure.NotificationHubs"
        #r "Newtonsoft.Json"

        using Microsoft.Azure.Documents;
        using System.Collections.Generic;
        using System;
        using Microsoft.Azure.NotificationHubs;
        using Newtonsoft.Json;

        public static async Task Run(IReadOnlyList<Document> input,  IAsyncCollector<Notification> notification, TraceWriter log)
        {
        log.Verbose("Document count " + input.Count);
                log.Verbose("First document Id " + input[0].Id);

        log.Info($"Sending GCM notification insert/update value");    
        
        string gcmNotificationPayload = "{\"data\": {\"message\": \"A new item was added or updated\" }}";
        log.Info($"{gcmNotificationPayload}");
        await notification.AddAsync(new GcmNotification(gcmNotificationPayload));   
        }

4 - Ir a aplpicationSetting de la function
        ![alt text](/Azure_para_office365_developers/AzureParaOffice365Developers/Media/AzureFunction/AppSettings.png)         
        * Añadir la cadena de conexión del NotificationHub. Ir al servicio de notification hub, keys y copiar la connectionString.
      Añadirla con el nombre de MyHubConnectionString        

5 - Configuramos el Notification Hub en la function
        * Ir a Integrate - Advance Settings
        ![alt text](/Azure_para_office365_developers/AzureParaOffice365Developers/Media/AzureFunction/AdvanceSettings.png)  
        
        * Añadir
                {
                        "name": "notification",
                        "type": "notificationHub",
                        "tagExpression": "",
                        "hubName": "Nombre del servicio de notificationHub que hayamos creado",
                        "connection": "MyHubConnectionString",
                        "platform": "gcm",
                        "direction": "out"
                }        

6 - Vamos a la solución de VS. La ejectuamos, ya sea con el emulador o en un mobile.
        * Cuando la ejecutemso nos debería aparecer los elementos que tenemos en CosmosDB.

7 - Para validar que todo ha ido ok, insertamos un elemento en la lista de sharepoint y nos tendría que llegar una notificación Push al emulador o al mobile.
        


