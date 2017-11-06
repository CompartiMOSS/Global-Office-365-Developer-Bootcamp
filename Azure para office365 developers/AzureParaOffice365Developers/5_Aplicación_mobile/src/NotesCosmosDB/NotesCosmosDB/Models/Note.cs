
namespace NotesCosmosDB.Models
{
    using Newtonsoft.Json;

    public class Note
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "titulo")]
        public string Title { get; set; }

        [JsonProperty(PropertyName = "score")]
        public decimal Score { get; set; }
    }
}