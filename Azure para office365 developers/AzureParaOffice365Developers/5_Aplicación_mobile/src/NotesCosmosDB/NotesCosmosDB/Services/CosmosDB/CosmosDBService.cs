
namespace NotesCosmosDB.Services.CosmosDB
{
    using Microsoft.Azure.Documents;
    using Microsoft.Azure.Documents.Client;
    using Microsoft.Azure.Documents.Linq;
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Threading.Tasks;

    public class CosmosDBService : ICosmosDBService
    {
        private DocumentClient _client;
        private Uri _collectionLink;

        public CosmosDBService()
        {
            _client = new DocumentClient(new Uri(AppSettings.EndpointUri), AppSettings.PrimaryKey);
            _collectionLink = UriFactory.CreateDocumentCollectionUri(AppSettings.DatabaseName, AppSettings.CollectionName);
        }

        public async Task CreateDatabase(string databaseName)
        {
            try
            {
                await _client.CreateDatabaseIfNotExistsAsync(new Database
                {
                    Id = databaseName
                });
            }
            catch (DocumentClientException ex)
            {
                Debug.WriteLine("Create Database Error: ", ex.Message);
            }
        }

        public async Task CreateDocumentCollection(string databaseName, string collectionName)
        {
            try
            {
                await _client.CreateDocumentCollectionIfNotExistsAsync(
                    UriFactory.CreateDatabaseUri(databaseName),
                    new DocumentCollection
                    {
                        Id = collectionName
                    },
                    new RequestOptions
                    {
                        OfferThroughput = 1000
                    });
            }
            catch (DocumentClientException ex)
            {
                Debug.WriteLine("Create Document Error: ", ex.Message);
            }
        }

        public async Task<List<T>> GetItemsAsync<T>()
        {
            var items = new List<T>();

            try
            {
                var query = _client.CreateDocumentQuery<T>(_collectionLink)            
                    .AsDocumentQuery();

                while (query.HasMoreResults)
                {
                    items.AddRange(await query.ExecuteNextAsync<T>());
                }
            }
            catch (DocumentClientException ex)
            {
                Debug.WriteLine("Get Items Error: ", ex.Message);
            }

            return items;
        }
    }
}
