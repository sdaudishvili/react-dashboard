import { AboutEdit } from '@/views/About';
import { PageCreate, PagesList } from '@/views/Pages';
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
    name: 'About',
    resource: 'about',
    staticEdit: AboutEdit
  }
];

const ResourcesProvider = () => {
  return resources && resources.map((resource) => <Resource key={resource.name} {...resource} />);
};

export default ResourcesProvider;
