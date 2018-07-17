import React from 'react';
import PropTypes from 'prop-types';

import TableHeader from './TableHeader';
import TableBody from './TableBody';

import { SELECT_ALL, SELECT_NONE } from './const';

import './Table.css';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.test = '';
    this.state = {
      selectAll: undefined
    };
    this.selectAll = this.selectAll.bind(this);
    this.resetSelectAll = this.resetSelectAll.bind(this);
  }

  selectAll(val) {
    const selectAll = val ? SELECT_ALL : SELECT_NONE;
    this.setState({
      selectAll
    });
  }
  resetSelectAll(val) {
    if (val !== this.state.selectAll) {
      this.setState({ selectAll: val });
    }
  }

  render() {
    const { columns, ...bodyProps } = this.props;
    const { data, ...headerProps } = this.props;

    if (this.props.selection) {
      bodyProps.selectAll = this.state.selectAll;
      bodyProps.resetSelectAll = this.resetSelectAll;
      headerProps.selectAllCb = this.selectAll;
      headerProps.selectAll = this.state.selectAll;
    }
    return (
      <div>
        <TableHeader {...headerProps} />
        <TableBody {...bodyProps} />
      </div>
    );
  }
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  selection: PropTypes.bool,
  uniqueKey: PropTypes.string
};

Table.defaultProps = {
  selection: false,
  uniqueKey: undefined
};

export default Table;
