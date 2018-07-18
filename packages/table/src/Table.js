import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from './CheckBox';

import './Table.css';

class Table extends React.Component {
  constructor(props) {
    super(props);
    const { uniqueKey } = props;
    this.uniqueKey = uniqueKey || 'id';
    this.state = {
      headerSelected: false,
      selected: []
    };

    this.onHeaderSelected = this.onHeaderSelected.bind(this);
  }

  onHeaderSelected(headerSelected) {
    const { data } = this.props;
    const selected = [...this.state.selected];
    this.setState({ headerSelected });
    if (headerSelected) {
      data.forEach(__data => {
        if (this.state.selected.findIndex(sel => sel[this.uniqueKey] === __data[this.uniqueKey]) < 0) {
          selected.push(__data);
        }
      });
    } else {
      data.forEach(__data => {
        const inx = selected.findIndex(sel => sel[this.uniqueKey] === __data[this.uniqueKey]);
        if (inx >= 0) {
          selected.splice(inx, 1);
        }
      });
    }
    this.setState({ headerSelected, selected });
  }

  selectionChange(oLine) {
    return val => {
      const selected = [...this.state.selected];
      if (val) {
        const { data } = this.props;
        const state = { selected };
        selected.push(oLine);

        if (
          data.every(__data => selected.findIndex(sel => sel[this.uniqueKey] === __data[this.uniqueKey]) >= 0)
        ) {
          state.headerSelected = true;
        }
        this.setState(state);
      } else {
        selected.splice(
          this.state.selected.findIndex(sel => sel[this.uniqueKey] === oLine[this.uniqueKey]),
          1
        );
        this.setState({
          selected,
          headerSelected: false
        });
      }
    };
  }

  renderHeader() {
    const { columns, selection } = this.props;
    const __columns = columns.slice();
    if (selection) {
      __columns.unshift({
        render: () => <CheckBox value={this.state.headerSelected} onChange={this.onHeaderSelected} />
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

  renderLine(data) {
    const { selection } = this.props;
    const results = [];
    if (selection) {
      results.push(
        <td key={-1} className="p-selection-col">
          <CheckBox
            onChange={this.selectionChange(data)}
            value={this.state.selected.some(sel => sel[this.uniqueKey] === data[this.uniqueKey])}
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

  renderBody() {
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

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderBody()}
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
