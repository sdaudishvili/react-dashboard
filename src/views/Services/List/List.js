import React from 'react';
import PropTypes from 'prop-types';
import { ListRenderer, ListWrapper, SearchBar } from '@/components';

const ServicesList = ({ data, total, queryOptions, setQueryOptions, editRoute, onDeleteClick }) => {
  const onPageChange = (page, perPage) => setQueryOptions((opt) => ({ ...opt, page, perPage }));
  const onSearch = (q) => setQueryOptions((opt) => ({ ...opt, q }));

  return (
    <>
      <SearchBar onSearch={onSearch} mt={3} />
      <ListWrapper
        page={queryOptions.page}
        mt={3}
        count={total}
        title="All Items"
        onPageChange={onPageChange}
        perPage={queryOptions.perPage}
      >
        <ListRenderer
          items={data}
          onDeleteClick={onDeleteClick}
          editRoute={editRoute}
          displayKeys={[
            { prop: 'title', imageKey: 'image' },
            { prop: 'index' },
            { prop: 'slug' },
            { prop: 'published' }
          ]}
        />
      </ListWrapper>
    </>
  );
};

ServicesList.propTypes = {
  data: PropTypes.array,
  total: PropTypes.number,
  queryOptions: PropTypes.object,
  setQueryOptions: PropTypes.func,
  editRoute: PropTypes.string,
  onDeleteClick: PropTypes.func
};

ServicesList.defaultProps = {
  data: [],
  total: 0,
  queryOptions: {},
  setQueryOptions: () => {},
  editRoute: '',
  onDeleteClick: () => {}
};

export default ServicesList;
