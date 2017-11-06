using NotesCosmosDB.Models;
using NotesCosmosDB.Services.CosmosDB;
using NotesCosmosDB.Services.Navigation;
using NotesCosmosDB.ViewModels.Base;
using System.Collections.ObjectModel;
using System.Windows.Input;
using Xamarin.Forms;

namespace NotesCosmosDB.ViewModels
{
    public class NoteListViewModel : ViewModelBase
    {
        private ObservableCollection<Note> _items;
        private ICosmosDBService _cosmosService;

        public NoteListViewModel(ICosmosDBService cosmosService)
        {           
            _cosmosService = cosmosService;
        }

        public ObservableCollection<Note> Items
        {
            get { return _items; }
            set
            {
                _items = value;
                OnPropertyChanged();
            }
        }
     
        public override async void OnAppearing(object navigationContext)
        {
            base.OnAppearing(navigationContext);

            await _cosmosService.CreateDatabase(AppSettings.DatabaseName);
            await _cosmosService.CreateDocumentCollection(AppSettings.DatabaseName, AppSettings.CollectionName);
            var result = await _cosmosService.GetItemsAsync<Note>();

            Items = new ObservableCollection<Note>();

            foreach (var item in result)
            {
                Items.Add(item);
            }
        }
    }
}