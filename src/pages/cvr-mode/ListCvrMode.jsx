import AdminLayout from '../../layout/AdminLayout'
import React, { useState } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { Container, Col, Row, Table, Form, InputGroup, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { faSearch, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowDown } from 'react-feather';

export const ListCvrMode = () => {

  const [filterInput, setFilterInput] = useState('');
  // Table columns
  const columns = React.useMemo(
      () => [
          { Header: 'Id', accessor: 'id' },
          { Header: 'Cvr Mode', accessor: 'cvrmode' },
          { Header: 'Status', accessor: 'status' },
      ],
      []
  );
  const [showOptions, setShowOptions] = useState(null);
  const handleToggleOptions = (index) => {
      //setShowOptions(index);
      setShowOptions((prev) => (prev === index ? null : index));
  };
  const navigate = useNavigate();
  const handleView = (item) => {
      console.log('view:', item);
      navigate('/dashboard/'+item);
  };
  const handleEdit = (item) => {
      console.log('Editing:', item);
  };
  const handleDelete = (item) => {
      console.log('Deleting:', item);
  };
  const items = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,29,30,31,32,33,34,35,36];
  const itemElements = [];
  for (let i = 1; i < items.length; i++) {
    itemElements.push({
      id: i,
      cvrmode: 'kolkata',
      status: 'Active',
  });
  }
  // Sample data
  const data = React.useMemo(
      () => itemElements,
      []
  );

  const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      state,
      setGlobalFilter,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { globalFilter },
  } = useTable(
      {
          columns,
          data,
          initialState: { pageSize: 5 }, // Set initial page size
      },
      useGlobalFilter,
      usePagination
  );

  // Update the state when input changes
  const handleFilterChange = (e) => {
      const value = e.target.value || undefined;
      setFilterInput(value);
      setGlobalFilter(value);
  };

  const addCvrMode = ()=>{
    navigate('/add-cvr-mode');
  }
  return (
    <AdminLayout>
        <Container fluid="true">
                <Row>
                    <Col sm={3}><p style={{ fontSize: "30px", fontWeight: "bold", fontFamily: "Mulish", marginTop: "20px" }}>List Cvr Mode</p></Col>
                    <Col sm={6}></Col>
                    <Col sm={3}><p style={{ fontSize: "20px", fontFamily: "Mulish", marginTop: "25px" }}><Link to="/dashboard" style={{ textDecoration: 'none' }}>Dashboard</Link> / <Link to="/list-cvr-mode" style={{ textDecoration: 'none' }}>List Cvr Mode</Link></p></Col>
                </Row>
                <div style={{backgroundColor:'white', borderRadius:'1%',margin:'2px 1px',padding:'25px 20px 25px 25px'}}>
                <Row style={tableHeaderStyle}>
                    <Col style={{ textAlign: 'left' }} sm={3}>
                        <div style={fontFamilyStyle}>
                            <select
                                value={state.pageSize}
                                onChange={e => {
                                    setPageSize(Number(e.target.value));
                                }}
                            >
                                {[5, 10, 20].map(pageSize => (
                                    <option key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </option>
                                ))}
                            </select>
                            <span>     entries per page</span>
                        </div>
                    </Col>
                    <Col sm={6}></Col>
                    <Col sm={3}>
                        <div style={fontFamilyStyle}>
                            <InputGroup className="mb-3">
                                <Form.Control onChange={handleFilterChange} value={filterInput} placeholder="Search Here" />
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faSearch} />
                                </InputGroup.Text>
                            </InputGroup>
                            {/* <input
                                value={filterInput}
                                onChange={handleFilterChange}
                                placeholder="Search User "
                            /> */}

                        </div>
                    </Col>
                </Row>
                <Table {...getTableProps()} style={{ width: '100%', marginTop: '20px' }} striped bordered hover >
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                                <th>Action</th>
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row,index) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.value}</td>;
                                    })}
                                    <td><p onClick={() => handleToggleOptions(index)} style={{ cursor: 'pointer' }}>...</p></td>
                                    {showOptions === index && (
                                        <div style={{ position: 'absolute', background: 'white', border: '1px solid #ccc' }}>
                                            <button onClick={() => handleView(row.original.userid)}>
                                                <div style={{display:'flex'}}><FontAwesomeIcon icon={faEye} />View</div>
                                            </button>
                                            <button onClick={() => handleEdit(row.original.userid)}>
                                            <div style={{display:'flex'}}><FontAwesomeIcon icon={faEdit} />Edit</div>
                                            </button>
                                            <button onClick={() => handleDelete(row.original.userid)}>
                                            <div style={{display:'flex'}}><FontAwesomeIcon icon={faTrash} />Delete</div>
                                            </button>
                                        </div>
                                    )}

                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <Row style={tableFooterStyle}>
                    <Col style={{ textAlign: 'left' }} sm={3}>
                        <span style={fontFamilyStyle}>
                            Showing{' '}
                            <strong>
                                {state.pageIndex + 1} out of {pageOptions.length}
                            </strong>{' '}Results
                        </span>
                    </Col>
                    <Col sm={7}></Col>
                    <Col sm={2}>
                        <div style={fontFamilyStyle}>
                            {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            {'<<'}
                        </button> */}
                        
                            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                                {'<'}
                            </button>
                            
                            <button onClick={() => gotoPage(state.pageIndex + 1)} disabled={!canNextPage}>
                                {state.pageIndex + 2}
                            </button>
                            
                            <button onClick={() => gotoPage(state.pageIndex + 2)} disabled={!canNextPage}>
                                {state.pageIndex + 3}
                            </button>
                            <button onClick={() => nextPage()} disabled={!canNextPage}>
                                {'>'}
                            </button>
                            
                            {/* <button onClick={() => gotoPage(pageOptions.length - 1)} disabled={!canNextPage}>
                            {'>>'}
                        </button> */}

                        </div>
                    </Col>
                </Row>
                </div>
                <Row className="g-2" style={{ marginLeft: "629px" }}>
                    <Col md style={{ textAlign: "right" }}>
                        <Button style={clearbuttonStyle}>Export< ArrowDown/></Button>
                    </Col>
                    <Col md>
                        <Button onClick={addCvrMode} style={submitbuttonStyle}>Add Cvr Mode</Button>
                    </Col>
                </Row>
            </Container>
    </AdminLayout>
  )
}

const clearbuttonStyle = {
    width: "180px",
    height: "39px",
    backgroundColor: "#FFF",
    color: "#3A85E5",
    border: "1px solid #3A85E5",
    marginTop: "10px",
}
const submitbuttonStyle = {
    width: "180px",
    height: "39px",
    radius: "5px",
    backgroundColor: "#3A85E5",
    marginTop: "10px",
}

const tableHeaderStyle = {
  height: '70px',
  boxShadow:'0px 7px 17px -12px black;'
}
const tableFooterStyle = {
  paddingTop: '10px',
}
const fontFamilyStyle = {
  fontFamily: 'math'
}