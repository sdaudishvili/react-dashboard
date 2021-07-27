import React from 'react';
import PropTypes from 'prop-types';
import { ListRenderer, ListWrapper, SearchBar } from '@/components';
import { studioTypes } from '../utils/types';

const typeGetter = (key) => studioTypes.find((x) => x.key === key)?.title;

const StudiosList = ({ data, total, options, setOptions, editRoute, onDeleteClick }) => {
  const onPageChange = (page, perPage) => setOptions((opt) => ({ ...opt, page, perPage }));
  const onSearch = (q) => setOptions((opt) => ({ ...opt, q }));

  return (
    <>
      <SearchBar mt={3} onSearch={onSearch} />
      <ListWrapper
        page={options.page}
        mt={3}
        count={total}
        title="All Pages"
        onPageChange={onPageChange}
        perPage={options.perPage}
      >
        <ListRenderer
          items={data}
          onDeleteClick={onDeleteClick}
          editRoute={editRoute}
          displayKeys={[
            { prop: 'title', imageKey: 'image' },
            { prop: 'slug' },
            { prop: 'shortDescription' },
            { prop: 'type', get: typeGetter },
            { prop: 'published' }
          ]}
        />
      </ListWrapper>
    </>
  );
};

StudiosList.propTypes = {
  data: PropTypes.array,
  total: PropTypes.number,
  options: PropTypes.object,
  setOptions: PropTypes.func,
  editRoute: PropTypes.string,
  onDeleteClick: PropTypes.func
};

StudiosList.defaultProps = {
  data: [],
  total: 0,
  options: {},
  setOptions: () => {},
  editRoute: '',
  onDeleteClick: () => {}
};

export default StudiosList;
