using Microsoft.Practices.Unity;
using NotesCosmosDB.Services.CosmosDB;
using NotesCosmosDB.Services.Navigation;

namespace NotesCosmosDB.ViewModels.Base
{
    public class ViewModelLocator
    {
        readonly IUnityContainer _container;

        public ViewModelLocator()
        {
            _container = new UnityContainer();

            _container.RegisterType<NoteListViewModel>();
            _container.RegisterType<NoteItemViewModel>();
  
            _container.RegisterType<INavigationService, NavigationService>();
            _container.RegisterType<ICosmosDBService, CosmosDBService>();
        }

        public NoteListViewModel NoteListViewModel
        {
            get { return _container.Resolve<NoteListViewModel>(); }
        }

        public NoteItemViewModel NoteItemViewModel
        {
            get { return _container.Resolve<NoteItemViewModel>(); }
        }
    }
}