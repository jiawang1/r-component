import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from './CheckBox';

import './Table.css';

const SELCOLWIDTH = 32;

class Table extends React.Component {
  constructor(props) {
    super(props);
    const { uniqueKey } = props;
    this.uniqueKey = uniqueKey || 'id';
    const lefts = this.initLefts();
    this.state = {
      headerSelected: false,
      selected: [],
      rszLeft: 0,
      lefts
    };
    this.tableBodyRef = React.createRef();

    this.offsetLeft = 0;
    this.scrollX = 0;

    this.hiddenHeader = [];
    this.onHeaderSelected = this.onHeaderSelected.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTableScrollX = this.onTableScrollX.bind(this);
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.setState({
      lefts: this.hiddenHeader.reduce((pre, node) => {
        const width = node.current.scrollWidth;
        console.log(width);
        if (pre.length === 0) {
          pre.push(width);
        } else {
          pre.push(pre[pre.length - 1] + width);
        }
        return pre;
      }, [])
    });
    this.offsetLeft = this.tableBodyRef.current.offsetLeft;
    document.body.addEventListener('mousemove', this.onMouseMove);
  }

  componentDidUpdate() {
    this.offsetLeft = this.tableBodyRef.current.offsetLeft;
  }

  componentWillUnmount() {
    this.hiddenHeader = null;
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  onMouseDown(e) {}

  onMouseMove(e) {
    const { x } = e;
    const relativeLeft = x - this.offsetLeft;
    console.log(x);
    console.log(this.state.lefts);
    const rszLeft = this.state.lefts.find(left => left === relativeLeft);

    if (rszLeft) {
      this.setState({ rszLeft });
    }
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

  onLeadSelectChange(oLine) {
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

  onTableScrollX(e) {
    console.log(e);
  }

  initLefts() {
    const { columns, selection } = this.props;
    return columns.reduce((pre, col) => {
      if (Number(col.width)) {
        if (pre.length === 0) {
          pre.push({ title: col.title, left: selection ? col.width + SELCOLWIDTH : col.width });
          return pre;
        }
        pre.push({ ...pre[pre.length - 1], left: pre[pre.length - 1].left + col.width });
      }
      return pre;
    }, []);
  }

  moveResizer() {}

  __initColWidth(col) {
    return col.width !== undefined
      ? { width: typeof col.width === 'number' ? `${col.width}px` : col.width }
      : {};
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
              {__columns.map((col, inx) => {
                return (
                  <th
                    className={`${inx === 0 ? 'p-selection-header' : 'p-header-col'}`}
                    key={inx}
                    style={this.__initColWidth(col)}
                  >
                    {col.render ? col.render() : col.title}
                  </th>
                );
              })}
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
            onChange={this.onLeadSelectChange(data)}
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
    const { data, columns, selection } = this.props;

    const __renderHidenHeader = () => {
      let __col = [];

      if (selection) {
        const ref = React.createRef();
        __col.push(<th className="p-selection-col" ref={ref} style={{ height: 0 }} />);
        this.hiddenHeader.push(ref);
      }

      __col = __col.concat(
        columns.map((col, inx) => {
          const ref = React.createRef();
          this.hiddenHeader.push(ref);
          return <th key={inx} ref={ref} style={{ ...this.__initColWidth(col), height: 0 }} />;
        })
      );

      return __col;
    };

    return (
      <div className="p-body-frame" ref={this.tableBodyRef}>
        <table className="p-body">
          <thead>
            <tr style={{ height: 0 }}>{__renderHidenHeader()}</tr>
          </thead>
          <tbody>{data.map(__data => <tr>{this.renderLine(__data)}</tr>)}</tbody>
        </table>
      </div>
    );
  }

  render() {
    return (
      <div className="table-frame" onScroll={this.onTableScrollX}>
        <div className="table-col-rsz" style={{ left: this.state.rszLeft }} />
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
