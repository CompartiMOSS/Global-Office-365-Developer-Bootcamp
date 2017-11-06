/* Vincular un notification hub a una mobile app */

1 - Entramos en el portal de azure y vamos a la mobile app y seleccionamos la opción Puh.

2 - Click en connect para añadir un notification hub, le damos a crear uno y lo creamos.
    ![alt text](/AzureParaOffice365Developers/Media/MobileApp/connectnotificationhub.png)     

/*  Enviaremos notificaciones push para Android. */

/* Creación Android push notification in google */

Ara falta el nombre del package. Boton derecho en el proyecto android --> Propiedades --> Android manifest --> Package name

1 - Inicie sesión en la consola Firebase (https://console.firebase.google.com/). Si aún no tiene uno, cree un nuevo proyecto de Firebase.

2 - Una vez creado el proyecto, haga clic en Add Firebase to your Android app (Agregar Firebase a la aplicación Android) y siga las instrucciones proporcionadas.
    ![alt text](/AzureParaOffice365Developers/Media/MobileApp/Firebase1.png)         

3 - En la consola Firebase, haga clic en el engranaje de su proyecto y, después, haga clic en Project Settings(Configuración del proyecto).
![alt text](/AzureParaOffice365Developers/Media/MobileApp/Firebase2.png)
    
4 - Haga clic en la pestaña Cloud Messaging (Mensajería de nube) en la configuración del proyecto y copie el valor de Server key (Clave del servidor) y Sender ID (Identificador del remitente). Estos valores se usarán más adelante para configurar la directiva de acceso del centro de notificaciones y el controlador de notificaciones en la aplicación.

/* Añadimos la Api key en Azure*/

1 - Añadimos la APi Key (Clave de servidor) en la mobile app. Para ello vamos a:
![alt text](/AzureParaOffice365Developers/Media/Push/AppMobile1.png)
![alt text](/AzureParaOffice365Developers/Media/Push/AppMobile2.png)
![alt text](/AzureParaOffice365Developers/Media/Push/AppMobile3.png)

/* Añadimos el SENDER ID  en la aplicació movil de Xamarin */

1 - Abrimos la solución del proyecto que está en src.
2 - Ir a la clase NotesCosmosDB.Android/PushHandlerBroadcastReceiver y añadir el SENDERID a la lista.
3 - Ir a NotesCosmosDB/Services/ServiceManager.cs y añadir la url de la mobile app en el ServiceMobileClient
![alt text](/AzureParaOffice365Developers/Media/Push/AppMobileURL.png)    

/* Datos CosmosDB */

1 - En el proyecto portable ir app.config y configrar los datos

    public class AppSettings
    {
        public static readonly string EndpointUri = "https://xxx.documents.azure.com:443/";
        public static readonly string PrimaryKey = "xx==";
        public static readonly string DatabaseName = "xxx";
        public static readonly string CollectionName = "xxx";
    }
    
Referenica:

https://docs.microsoft.com/es-es/azure/app-service-mobile/app-service-mobile-xamarin-android-get-started-push  

Aplicación basada en el código de Javier Suarez: https://javiersuarezruiz.wordpress.com/2017/08/14/xamarin-forms-aplicacion-movil-y-cosmos-db/
