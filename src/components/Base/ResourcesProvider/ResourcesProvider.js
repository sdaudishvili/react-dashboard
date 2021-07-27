import { AboutEdit } from '@/views/About';
import { AgenciesList, AgencyCreate } from '@/views/Agencies';
import { PageCreate, PagesList } from '@/views/Pages';
import { StudioCreate, StudiosList } from '@/views/Studios';
import { Resource } from '..';

const resources = [
  {
    name: 'Pages',
    resource: 'pages',
    list: PagesList,
    create: PageCreate,
    edit: PageCreate
  },
  {
    name: 'Agencies',
    resource: 'agencies',
    list: AgenciesList,
    create: AgencyCreate,
    edit: AgencyCreate
  },
  {
    name: 'Studios',
    resource: 'studios',
    list: StudiosList,
    create: StudioCreate,
    edit: StudioCreate
  },
  {
    name: 'About',
    resource: 'about',
    staticEdit: AboutEdit
  }
];

const ResourcesProvider = () => {
  return resources && resources.map((resource) => <Resource key={resource.name} {...resource} />);
};

export default ResourcesProvider;
