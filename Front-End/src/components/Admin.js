import React from "react";
import Loading from "../components/common/LoadingPage";
import { Card, Button, IconButton }from "@material-ui/core";
import { ArrowDownward, Delete, Add, Search } from "@material-ui/icons";
import DataTable, { memoize } from "react-data-table-component";
import Select from 'react-select';
import { UserModal } from "./common/UserModal";
import "styles/Admin.scss";
/**--------Props--------
 * provider: Facebook Provider used to login with Facebook
 */
const darkTheme = {
  title: {
    fontSize: "22px",
    fontColor: "#FFFFFF",
    backgroundColor: "#252132",
  },
  contextMenu: {
    backgroundColor: "#E91E63",
    fontColor: "#FFFFFF",
  },
  header: {
    fontSize: "12px",
    fontColorActive: "FFFFFF",
    fontColor: "#FFFFFF",
    backgroundColor: "#252132",
    borderColor: "rgba(255, 255, 255, .12)",
  },
  rows: {
    fontColor: "#FFFFFF",
    backgroundColor: "#252132",
    borderColor: "rgba(255, 255, 255, .12)",
    hoverFontColor: "white",
    hoverBackgroundColor: "rgba(0, 0, 0, .24)",
  },
  cells: {
    cellPadding: "48px",
  },
  pagination: {
    fontSize: "13px",
    fontColor: "#FFFFFF",
    backgroundColor: "#252132",
    buttonFontColor: "#FFFFFF",
    buttonHoverBackground: "rgba(255, 255, 255, .12)",
  },
  expander: {
    fontColor: "#FFFFFF",
    backgroundColor: "#252132",
    expanderColor: "#FFFFFF",
  },
  footer: {
    separatorColor: "rgba(255, 255, 255, .12)",
  },
};
const permissions = [
  { value: 'All', label: 'All' },
  { value: 'Active', label: 'Active' },
  { value: 'Disable', label: 'Disable' }
];
const sortIcon = <ArrowDownward />;
const contextActions = memoize(deleteHandler => (
  <IconButton color="secondary" onClick={deleteHandler}>
    <Delete />
  </IconButton>
));
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <div className="search-box">
    <Search />
    <input id="search" type="text" placeholder="Search" value={filterText} onChange={onFilter} />
    <button onClick={onClear}>X</button>
  </div>
);
class Admin extends React.Component {
  /**
   * constructor - sets initial state
   */
  constructor(props) {
    super(props);
    this.props.getUsersList();
    this.state = {
      data: this.props.users,
      modalData: null,
      isNewModal: true,
      filterText: "",
      permission_filter: permissions[1]
    };
  }
  setFilterText = (text) => {
    this.setState({ filterText: text });
  }
  setPermissionFilter = (item) => {
    console.log(item);
    this.setState({ permission_filter: item });
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    this.setState({ data: nextProps.users });
  }
  newRow = () => {
    this.setState({
      modalData: { name: "", email: "", location: "", active: false, role: "" },
      isNewModal: true,
    });
    this.props.openModal(true);
  };
  editRow = row => {
    this.setState({ modalData: row, isNewModal: false });
    this.props.openModal(true);
  };
  render() {
    const { data, filterText, permission_filter } = this.state;
    if (!data || data.length === 0) {
      return <Loading />;
    }
    let filteredData = data;
    if (filterText != null) {
      filteredData = filteredData.filter(item => item.name.includes(filterText) || item.email.includes(filterText) || item.username.includes(filterText));
    }
    if (permission_filter.value !== "All") {
      var isActive = (permission_filter.value === "Active") ? true : false;
      filteredData = filteredData.filter(item => (item.active === isActive));
    }
    return (
      <div className="Admin-page">
        <Card className="card-table">
          <DataTable
            title="Users"
            columns={[
              {
                name: "Name",
                selector: "name",
                sortable: true,
                grow: 2,
              },
              {
                name: "UserName",
                selector: "username",
                sortable: true,
                grow: 2,
              },
              {
                name: "Email",
                selector: "email",
                sortable: true,
                grow: 2,
              },
              {
                name: "Location",
                selector: "location",
                cell: row => <span>{Array.isArray(row.location) ? row.location.join(", ") : row.location }</span>,
                sortable: true,
                grow: 1,
              },
              {
                name: "Permission",
                selector: "active",
                sortable: true,
                cell: row => <span>{row.active ? "Active" : "Disable"}</span>,
                grow: 1,
              },
              {
                name: "Role",
                selector: "role",
                sortable: true,
                cell: row => <span>{row.role && row.role === "admin" ? "Manager" : "User"}</span>,
                grow: 1,
              },
              {
                cell: row => (
                  <Button variant="contained" color="primary" onClick={() => this.editRow(row)}>
                    Edit
                  </Button>
                ),
                button: true,
              },
            ]}
            data={filteredData}
            customTheme={darkTheme}
            highlightOnHover
            pagination
            paginationPerPage="25"
            defaultSortField="name"
            actions={
              <>
                <Select
                  className="permission-filter"
                  value={permission_filter}
                  onChange={(items) => this.setPermissionFilter(items)}
                  options={permissions}
                />
                <FilterComponent onFilter={e => this.setFilterText(e.target.value)} onClear={() => this.setFilterText("")} filterText={filterText} />
                <IconButton color="primary" onClick={() => this.newRow()}>
                  <Add />
                </IconButton>
              </>
            }
            contextActions={contextActions(this.deleteAll)}
            sortIcon={sortIcon}
          />
        </Card>
        <UserModal
          isOpen={this.props.isOpen}
          isNew={this.state.isNewModal}
          Data={this.state.modalData}
          openModal={this.props.openModal}
          addNewUser={this.props.addNewUser}
          updateUser={this.props.updateUser}
          users={this.props.users}
        />
      </div>
    );
  }
}

export default Admin;
