import { PageCreate, PagesList } from '@/views/Pages';
import { Resource } from '..';

const resources = [
  {
    name: 'pages',
    list: PagesList,
    create: PageCreate
  }
];

const ResourcesProvider = () => {
  return resources && resources.map((resource) => <Resource key={resource.name} {...resource} />);
};

export default ResourcesProvider;
