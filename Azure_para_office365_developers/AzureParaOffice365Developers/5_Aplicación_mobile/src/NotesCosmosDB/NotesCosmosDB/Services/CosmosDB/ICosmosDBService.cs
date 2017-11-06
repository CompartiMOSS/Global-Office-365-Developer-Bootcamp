namespace NotesCosmosDB.Services.CosmosDB
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface ICosmosDBService
    {
        Task CreateDatabase(string databaseName);

        Task CreateDocumentCollection(string databaseName, string collectionName);

        Task<List<T>> GetItemsAsync<T>();
    }
}