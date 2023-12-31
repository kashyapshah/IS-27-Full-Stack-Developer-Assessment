import { Button, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button as Bt } from "primereact/button";
import AlertComponent from "../components/AlertComponent";

const Home = () => {
  const [Data, setData] = useState([]);
  const [RowData, setRowData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const params = location.state || "";
  const [isAlert, setAlert] = useState(null);

  useEffect(() => {
    GetProductData();
  }, []);

  useEffect(() => {
    if (!!params) {
      setAlert(params);
    }
  }, [location]);

  useEffect(() => {
    if (isAlert) {
      setTimeout(() => {
        setAlert(null);
        window.history.replaceState({}, document.title);
      }, 1500);
    }
  }, [isAlert]);

  // Delete data
  const [ViewDelete, setViewDelete] = useState(false);
  const handleDeleteShow = () => {
    setViewDelete(true);
  };
  const handleDeleteClose = () => {
    setViewDelete(false);
  };

  // Local Variable Storage

  const [id, setId] = useState("");

  // Get Data from exnternal link

  const GetBulkUsers = async() => { 
    const url = 'https://jsonplaceholder.typicode.com/users'
   const getUsers =  await axios.get(url);
   if(getUsers){
    const insertUrl = "http://127.0.0.1:3100/api/insertMany"
    const bulkData = getUsers?.data
    axios
      .post(insertUrl, bulkData) 
      .then((res) => {
        const result = res?.data;
        if (!result.success) {
          setAlert({ success: false, msg: result.message });
        } else {
          navigate("/", { state: { success: true, msg: result.message } });
        }
      })
      .catch((err) => {
        setAlert({ success: false, msg: err?.message });
      });
   }
  }

  //Get all user data
  const GetProductData = () => {
    const url = "http://127.0.0.1:3100/api/";
    axios
      .get(url)
      .then((res) => {
        const result = res.data;
        // const {status, message, data} = result;
        if (!result) {
          alert("no data");
        } else {
          setData(result);
          if(result.length == 0){
            GetBulkUsers();
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });


  };

  //handle Delete Function
  const handleDelete = () => {
    const url = `http://127.0.0.1:3100/api/delete/${id}`;
    axios
      .delete(url)
      .then((res) => {
        const result = res.data;
        if (res.status != 200) {
          setAlert({ success: false, msg: 'User not deleted'});
        } else {
          handleDeleteClose();
          window.location.reload();
          setAlert({ success: true, msg: 'User deleted successfully'});
        }
      })
      .catch((err) => {
        // console.log(err);
        setAlert({ success: false, msg: err?.message });
      });
  };

  const [globalFilter, setGlobalFilter] = useState(null);

  // render search bar of the table
  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <div className="d-flex justify-content-start p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <div className="d-flex justify-content-end">
        <Link to="/create">
          <Button variant="primary">
            <i className="fa fa-plu"></i>
            Add New User
          </Button>
        </Link>
      </div>
    </div>
  );

  // Render action button
  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <React.Fragment>
          <div
            onClick={() => {
              navigate("/edit", { state: { data: rowData, isEdit: true } });
            }}
          >
            <Bt
              icon="pi pi-pencil"
              rounded
              outlined
              className="mr-2"
              // onClick={() => {handleEditShow(rowData)}}
            />
          </div>

          <Bt
            icon="pi pi-trash"
            rounded
            outlined
            severity="danger"
            onClick={() => {
              handleDeleteShow(setRowData(rowData), setId(rowData._id));
            }}
          />
        </React.Fragment>
      </>
    );
  };

  return (
    <div
      className="container-xl"
      style={{ marginTop: "50pt", marginBottom: "50pt" }}
    >
      {!!isAlert && (
        <AlertComponent success={isAlert?.success} msg={isAlert?.msg} />
      )}
      {/* DataTable shows all data */}
      <div className="row">
        <div className="row">
          <DataTable
            value={Data}
            paginator
            rows={10}
            dataKey="productId"
            filterDisplay="row"
            resizableColumns
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
            emptyMessage="No user found."
            globalFilter={globalFilter}
            header={header}
          >
            <Column
              field="name"
              header="Name"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="email"
              header="Email"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="phone"
              header="Phone Number"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="website"
              header="Website"
              sortable
              style={{ width: "30%" }}
            ></Column>
            <Column
              field="company.name"
              header="Company Name"
              sortable
              style={{ width: "25%" }}
            ></Column>
            <Column
              field="Action"
              header="Action"
              style={{ width: "25%" }}
              body={actionBodyTemplate}
            ></Column>
          </DataTable>
        </div>
      </div>

      {/* delete user */}
      <div className="model-box-view">
        <Modal
          show={ViewDelete}
          onHide={handleDeleteClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="form-group">
                <h4>Are sure you want to delete this User!</h4>
                <Button
                  type="submit"
                  className="btn btn-danger mt-4"
                  onClick={handleDelete}
                >
                  Anyway Delete User
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
