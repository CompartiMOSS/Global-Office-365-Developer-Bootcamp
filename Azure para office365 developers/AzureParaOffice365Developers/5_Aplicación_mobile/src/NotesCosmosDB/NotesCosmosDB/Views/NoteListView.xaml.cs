using NotesCosmosDB.ViewModels;
using Xamarin.Forms;

namespace NotesCosmosDB.Views
{
    public partial class NoteListView : ContentPage
    {
        private object Parameter { get; set; }

        public NoteListView(object parameter)
        {
            InitializeComponent();

            Parameter = parameter;

            BindingContext = App.Locator.NoteListViewModel;
        }

        protected override void OnAppearing()
        {
            var viewModel = BindingContext as NoteListViewModel;
            if (viewModel != null) viewModel.OnAppearing(Parameter);
        }

        protected override void OnDisappearing()
        {
            var viewModel = BindingContext as NoteListViewModel;
            if (viewModel != null) viewModel.OnDisappearing();
        }
    }
}