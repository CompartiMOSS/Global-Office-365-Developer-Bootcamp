1 - Entramos en el portal de Azure (https://portal.azure.com) y vamos a la LogicApp que hemos creado en el punto 2

2 - Creamos una LogicApp a partir de una Blank Template.

3 - Buscamos Sharepoint y seleccionamos el Trigger: When an item is created
        ![alt text](/AzureParaOffice365Developers/Media/LogicApp/SharepointConnector.png)         

4 - Nos pide los datos de conexión a Sharepoint:
        * Tenemos que poner la dirección del site que hemos creado
        * Debemos seleccionar la lista que hemos creado.
        * Poner a 5 segundos el intervalo de check

5 - Next Step - Choose an action. Buscar TextAnalytics y seleccionar.
        * Seleccionar DetectSentiment Action
        * Ir al portal de Azure al servico de TextAnalytics creado en el punto 2 para obtener los datos de conexión.
         ![alt text](/AzureParaOffice365Developers/Media/LogicApp/TextAnalytic.png)                
          A parte os hará falta el endpoint que se encuentra en overview

6 - Cuando entreis en el textbox Text os aparecerán todas las propiedades de la lista de sharpoint seleccionar: Title

7- Next Step - Choose an action: Buscar Azure CosmosDB y seleccionar Create or Update Document
        ![alt text](/AzureParaOffice365Developers/Media/LogicApp/CosmosDB.png)        
        * Ir al portal de Azure, ir al servicio de CosmosDB creado, ir a key y seleccionar la connectionString, ponerla
        * De los campos que salen solo rellenaremos los campos: Datase ID, Collection ID y Document
        Databse ID y Collection ID seleccionaremos la opción del combo, en Document pondremos el JSON a Guardar.
        ![alt text](/AzureParaOffice365Developers/Media/LogicApp/CosmosDBDocument.png)               

8 - Next Step - Add a condition:           
        * Seleccionamos el Score que nos ha devuelto el Cognitive Servies y actualizaremos el campo SI/NO de la lista de Sharepoint viendo si el campo es mayor o igual a 0.5 (será si) o menos a 0.5 que será No
        ![alt text](/AzureParaOffice365Developers/Media/LogicApp/Conditional.png)                
        * Ahora en Yes añadimos la acción de Update Document de Sharepoint. Seleccionamos Sharepoint y Update Item.
        * Rellenlamos los datos de conexión y en el campo EsBueno ponemos Si, en Id y title seleccionamos los valores que nos vienen del inicio de Sharepoint
        ![alt text](/AzureParaOffice365Developers/Media/LogicApp/UpdateSharepoint.png)                
        * Hacer lo mismo con el No pero poniendo en el campo EsBueno No

9 - Ya tenemos nuestra LogicApp, le damos a Save and Run arriba de todo.

10 - Ahora vamos a la lista de sharepoint y añadimos una elemento con el camo EsBueno a lo contrario del que debería ser.
     Por ejemplo:
        Title: Esto es algo bueno
        EsBueno: No

/* Comprobación resultado */                

11 - Una vez añadido, en el apartado overview de la LogicApp en Azure, le damos a Refresh y nos tiene que aparecer el resultado de la ejecución de la logic app.
![alt text](/AzureParaOffice365Developers/Media/LogicApp/LogicAppResult.png)         

12 - Ir a la lista de sharepoint, refrescar y ver que ha cambiado el campo EsBueno.

13 - Ir al servicio de CosmosDB, entrar en la collection y ver que se ha añadido el item en CosmosDB DcoumentDB.
![alt text](/AzureParaOffice365Developers/Media/LogicApp/ResultadoCosmosDB.png)         








