namespace NotesCosmosDB.Services
{
    using Microsoft.WindowsAzure.MobileServices;

    public class ServiceManager
    {
        static ServiceManager defaultInstance = new ServiceManager();
        MobileServiceClient client;

        private ServiceManager()
        {
            this.client = new MobileServiceClient("http://xxxx.azurewebsites.net");
        }

        public MobileServiceClient CurrentClient
        {
            get { return client; }
        }

        public static ServiceManager DefaultManager
        {
            get
            {
                return defaultInstance;
            }
            private set
            {
                defaultInstance = value;
            }
        }
    }
}
