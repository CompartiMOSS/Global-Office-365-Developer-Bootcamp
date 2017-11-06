using NotesCosmosDB.ViewModels;
using Xamarin.Forms;

namespace NotesCosmosDB.Views
{
    public partial class NoteItemView : ContentPage
    {
        private object Parameter { get; set; }

        public NoteItemView(object parameter)
        {
            InitializeComponent();

            Parameter = parameter;

            BindingContext = App.Locator.NoteItemViewModel;
        }

        protected override void OnAppearing()
        {
            var viewModel = BindingContext as NoteItemViewModel;
            if (viewModel != null) viewModel.OnAppearing(Parameter);
        }

        protected override void OnDisappearing()
        {
            var viewModel = BindingContext as NoteItemViewModel;
            if (viewModel != null) viewModel.OnDisappearing();
        }
    }
}