import React from 'react';

import PropTypes from 'prop-types';
import CheckBox from './CheckBox';
import { SELECT_ALL, SELECT_NONE } from './const';
import './TableBody.css';

class TableBody extends React.Component {
  constructor(props) {
    super(props);
    const { uniqueKey } = props;

    this.state = {
      selected: [],
      dataKey: uniqueKey || 'id'
    };
  }

  static getDerivedStateFromProps(next, prev) {
    const { selectAll, data } = next;
    const { selected } = prev;
    let changed = false;
    if (selectAll === SELECT_ALL) {
      data.forEach(__data => {
        if (selected.every(sel => sel[prev.dataKey] !== __data[prev.dataKey])) {
          changed = true;
          selected.push(__data);
        }
      });
    } else if (selectAll === SELECT_NONE) {
      data.forEach(__data => {
        const inx = selected.findIndex(sel => sel[prev.dataKey] === __data[prev.dataKey]);
        if (inx >= 0) {
          changed = true;
          selected.splice(inx, 1);
        }
      });
    }
    return changed ? { selected } : null;
  }

  selectionChange(data) {
    const { resetSelectAll } = this.props;
    return val => {
      if (val) {
        this.state.selected.push(data);
      } else {
        this.state.selected.splice(
          this.state.selected.findIndex(sel => sel[this.state.dataKey] === data[this.state.dataKey]),
          1
        );
        resetSelectAll();
      }
    };
  }

  renderLine(data) {
    const { selection } = this.props;
    const results = [];
    if (selection) {
      results.push(
        <td key={-1} className="p-selection-col">
          <CheckBox
            onChange={this.selectionChange(data)}
            value={this.state.selected.some(sel => sel[this.state.dataKey] === data[this.state.dataKey])}
          />
        </td>
      );
    }
    return results.concat(
      Object.keys(data).map(k => (
        <td key={k} className="p-body-col">
          {data[k]}
        </td>
      ))
    );
  }

  render() {
    const { data } = this.props;
    return (
      <div className="p-body-frame">
        <table className="p-body">
          <thead />
          <tbody>{data.map(__data => <tr>{this.renderLine(__data)}</tr>)}</tbody>
        </table>
      </div>
    );
  }
}

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  selection: PropTypes.bool,
  uniqueKey: PropTypes.string,
  selectAll: PropTypes.string,
  resetSelectAll: PropTypes.func
};

TableBody.defaultProps = {
  selection: false,
  uniqueKey: undefined,
  selectAll: undefined,
  resetSelectAll: undefined
};

export default TableBody;
