namespace NotesCosmosDB.ViewModels
{
    using NotesCosmosDB.Models;
    using NotesCosmosDB.Services.CosmosDB;
    using NotesCosmosDB.Services.Navigation;
    using NotesCosmosDB.ViewModels.Base;

    public class NoteItemViewModel : ViewModelBase
    {
        private string _id;
        private string _title;
        private decimal _score;
        
        private INavigationService _navigationService;
        private ICosmosDBService _cosmosService;

        public NoteItemViewModel(
            INavigationService navigationService,
            ICosmosDBService cosmosService)
        {
            _navigationService = navigationService;
            _cosmosService = cosmosService;
        }

        public string Id
        {
            get { return _id; }
            set
            {
                _id = value;
                OnPropertyChanged();
            }
        }

        public string Title
        {
            get { return _title; }
            set
            {
                _title = value;
                OnPropertyChanged();
            }
        }

        public decimal Score
        {
            get { return _score; }
            set
            {
                _score = value;
                OnPropertyChanged();
            }
        }


        public override void OnAppearing(object navigationContext)
        {
            var note = navigationContext as Note;

            if (note != null)
            {
                Id = note.Id;
                Title = note.Title;
                Score = note.Score;
            }

            base.OnAppearing(navigationContext);
        }
    }
}