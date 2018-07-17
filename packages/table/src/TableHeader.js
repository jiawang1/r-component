import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from './CheckBox';

import { SELECT_ALL } from './const';

import './TableHeader.css';

class TableHeader extends React.Component {
  constructor() {
    super();
    this.state = { selected: false };
    this.columns = [];
    this.onSelctionClick = this.onSelctionClick.bind(this);
  }

  static getDerivedStateFromProps(next, prev) {
    const { selectAll } = next;

    const selected = selectAll === SELECT_ALL;

    if (selected !== prev.selected) {
      return { selected };
    }
    return null;
  }

  onSelctionClick(selected) {
    const { selectAllCb } = this.props;
    this.setState({ selected });
    if (typeof selectAllCb === 'function') {
      selectAllCb(selected);
    }
  }

  render() {
    const { columns, selection } = this.props;
    const __columns = columns.slice();

    if (selection) {
      __columns.unshift({
        render: () => <CheckBox value={this.state.selected} onChange={this.onSelctionClick} />
      });
    }
    return (
      <div className="p-header-frame">
        <table className="p-header">
          <thead>
            <tr>
              {__columns.map((col, inx) => (
                <th className={`${inx === 0 ? 'p-selection-header' : 'p-header-col'}`} key={inx}>
                  {col.render ? col.render() : col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody />
        </table>
      </div>
    );
  }
}
TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
  selection: PropTypes.bool,
  selectAllCb: PropTypes.func,
  selectAll: PropTypes.string
};

TableHeader.defaultProps = {
  selection: false,
  selectAllCb: null,
  selectAll: undefined
};

export default TableHeader;
