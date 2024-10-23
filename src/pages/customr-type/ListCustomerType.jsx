import AdminLayout from '../../layout/AdminLayout'
import React, { useState, useEffect } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { Container, Col, Row, Table, Form, InputGroup, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { faSearch, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowDown } from 'react-feather';
import { ADMIN_BACKEND_BASE_URL, ADMIN_BACKEND_CUSTOMER_API_URL } from '../../constant';
import fetchWithAuth from '../../fetchWithAuth';

export const ListCustomerType = () => {

    const [filterInput, setFilterInput] = useState('');
    const [showOptions, setShowOptions] = useState(null);
    const handleToggleOptions = (index) => {
        //setShowOptions(index);
        setShowOptions((prev) => (prev === index ? null : index));
    };
    const navigate = useNavigate();
    const handleView = (item) => {
        console.log('view:', item);
        navigate('/dashboard/' + item);
    };
    const handleEdit = (item) => {
        navigate('/edit-customer-type/' + item);
    };
    const handleDelete = async (item) => {
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}delete-customer-type/${item}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(result.success === true){
            setApiData((prevdata) => prevdata.filter(data => data.dataid !== item));
        }
    };
    const [apiData, setApiData] = useState([]);
    useEffect(() => {
        
        getApiDatas();
    }, [])
    const getApiDatas = async () => {
        let result = await fetchWithAuth(`${ADMIN_BACKEND_BASE_URL}${ADMIN_BACKEND_CUSTOMER_API_URL}list-customer-type`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (result.response.status === true && result.response.data) {
            const itemElements = [];
            result.response.data.map((item, index) => {
                itemElements.push({
                    dataid: item.id,
                    customer_type: item.customer_type,
                    status: item.status,
                });
                return itemElements;
            })
            setApiData(itemElements);
        }
    }
    const data = React.useMemo(
        () => apiData,
        [apiData]
    );
    const columns = React.useMemo(
        () => [
            { Header: 'Id', accessor: 'dataid' },
            { Header: 'Customer Type', accessor: 'customer_type' },
            { Header: 'Status', accessor: 'status' },
        ],
        []
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
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
        setPageSize
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

    const addCustomerType = () => {
        navigate('/add-customer-type');
    }
    return (
        <AdminLayout>
            <Container fluid="true">
                <Row>
                    <Col sm={3}><p style={{ fontSize: "27px", fontWeight: "bold", fontFamily: "Mulish", marginTop: "20px" }}>List Customer Type</p></Col>
                    <Col sm={6}></Col>
                    <Col sm={3}><p style={{ fontSize: "17px", fontFamily: "Mulish", marginTop: "25px" }}><Link to="/dashboard" style={{ textDecoration: 'none' }}>Dashboard</Link> / <Link to="/list-customer-type" style={{ textDecoration: 'none' }}>List Customer Type</Link></p></Col>
                </Row>
                <div style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px', padding: '25px 20px 25px 25px' }}>
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
                            {page.map((row, index) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        <td>{row.original.dataid}</td>
                                        <td>{row.original.customer_type}</td>
                                        <td>{(row.original.status === 1)?'Active':'Inactive'}</td>
                                        <td style={{ position: 'relative' }}>
                                            <p onClick={() => handleToggleOptions(index)} style={{ cursor: 'pointer' }}>...</p>
                                            {showOptions === index &&
                                            <ul className='dropdown-option'>
                                                <li onClick={() => handleView(row.original.dataid)} className="listing-style"><FontAwesomeIcon icon={faEye}  className='mx-2'/>View</li>
                                                <li onClick={() => handleEdit(row.original.dataid)} className="listing-style"><FontAwesomeIcon icon={faEdit} className='mx-2'/>Edit</li>
                                                <li onClick={() => handleDelete(row.original.dataid)}className="listing-style"><FontAwesomeIcon icon={faTrash} className='mx-2'/>Delete</li>
                                            </ul>
                                        }
                                        </td>

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
                        <Button style={clearbuttonStyle}>Export< ArrowDown /></Button>
                    </Col>
                    <Col md>
                        <Button onClick={addCustomerType} style={submitbuttonStyle}>Add CustomerType</Button>
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
    boxShadow: '0px 7px 17px -12px black'
}
const tableFooterStyle = {
    paddingTop: '10px',
}
const fontFamilyStyle = {
    fontFamily: 'math'
}