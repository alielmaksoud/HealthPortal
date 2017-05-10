import React from 'react';
import ReactTable from 'react-table';

export default (props) => {
  return (
		<ReactTable
      data={props.data}
      columns={props.columns}
      loading={props.loading || false}
      defaultFilterMethod={(filter, row, column) => {
                              const id = filter.pivotId || filter.id
                              return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true
                          }}
      resizable={true}
      showPagination={false}
      showPageSizeOptions={false}
      showFilters={true}
    />  	
  )
}
