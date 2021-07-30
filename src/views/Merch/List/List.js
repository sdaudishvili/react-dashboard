import React from 'react';
import PropTypes from 'prop-types';
import { ListRenderer, ListWrapper } from '@/components';

const MerchList = ({ data, total, editRoute, onDeleteClick }) => {
  const [options, setOptions] = React.useState({ page: 0, perPage: 5 });
  const onPageChange = (page, perPage) => setOptions((opt) => ({ ...opt, page, perPage }));

  const curPageData = data.slice(options.page * options.perPage, options.page * options.perPage + options.perPage);

  return (
    <>
      <ListWrapper
        page={options.page}
        mt={3}
        count={total}
        title="All items"
        onPageChange={onPageChange}
        perPage={options.perPage}
      >
        <ListRenderer
          items={curPageData}
          onDeleteClick={onDeleteClick}
          editRoute={editRoute}
          displayKeys={[{ prop: 'price', imageKey: 'image' }, { prop: 'url' }]}
        />
      </ListWrapper>
    </>
  );
};

MerchList.propTypes = {
  data: PropTypes.array,
  total: PropTypes.number,
  editRoute: PropTypes.string,
  onDeleteClick: PropTypes.func
};

MerchList.defaultProps = {
  data: [],
  total: 0,
  editRoute: '',
  onDeleteClick: () => {}
};

export default MerchList;
