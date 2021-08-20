import React from 'react';
import PropTypes from 'prop-types';
import { DropDown, ListRenderer, ListWrapper, SearchBar } from '@/components';
import { Box } from '@material-ui/core';
import { studioTypes } from '../utils/types';

const typeGetter = (key) => studioTypes.find((x) => x.key === key)?.title;

const StudiosList = ({ data, total, queryOptions, setQueryOptions, editRoute, onDeleteClick }) => {
  const onPageChange = (page, perPage) => setQueryOptions((opt) => ({ ...opt, page, perPage }));
  const onSearch = (q) => setQueryOptions((opt) => ({ ...opt, q }));
  const onTypeChange = (type) => setQueryOptions((opt) => ({ ...opt, type }));

  return (
    <>
      <Box display="flex" mt={3}>
        <SearchBar onSearch={onSearch} />
        <DropDown
          style={{ marginLeft: 20 }}
          items={studioTypes}
          value={studioTypes.find((x) => x.key === queryOptions.type)}
          displayKey="title"
          placeholder="Type"
          onChange={(val) => onTypeChange(val ? val.key : '')}
        />
      </Box>
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
  queryOptions: PropTypes.object,
  setQueryOptions: PropTypes.func,
  editRoute: PropTypes.string,
  onDeleteClick: PropTypes.func
};

StudiosList.defaultProps = {
  data: [],
  total: 0,
  queryOptions: {},
  setQueryOptions: () => {},
  editRoute: '',
  onDeleteClick: () => {}
};

export default StudiosList;
