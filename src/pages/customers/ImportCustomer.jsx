import AdminLayout from '../../layout/AdminLayout'
import React, { useState, useEffect, useRef } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { Container, Col, Row, Table, Form, InputGroup, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { faSearch, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowDown } from 'react-feather';
import fetchWithAuth from '../../fetchWithAuth';
import SweetAlert from 'react-bootstrap-sweetalert';
import { listAllCustomers, uploadAllCustomers } from '../../apis/apis'
import { env } from '../../constant';


export const ImportCustomers = () => {
    const navigate = useNavigate();
    const inputFile = useRef(null);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [show1, setShow1] = useState(false);
    const [errorfile, setErrorfile] = useState(false);
    const [errorfilemsg, setErrorfileMsg] = useState('');
    const [error, setError] = useState(false);
    const handleClose = () => {
        setShowAlert(false);
    };
    const handleClose1 = () => setShow1(false);
    const [filterInput, setFilterInput] = useState('');
    // Table columns
    const [showOptions, setShowOptions] = useState(null);
    const handleToggleOptions = (index) => {
        //setShowOptions(index);
        setShowOptions((prev) => (prev === index ? null : index));
    };

    const handleNavigate = () => {
        navigate('/get-all-customer')
    }
    const [customers, setCustomers] = useState([]);
    const [uploadCustomers, setUploadCustomers] = useState('');
    const uploadCustomersBulk = async () => {
        const customersDetails = customers;
        let result = await uploadAllCustomers({ "customer_arr": customersDetails });
        setUploadCustomers(result.response)
        if (uploadCustomers.status == true) {
            setShowAlert(true)
            setTimeout(() => {
                navigate('/get-all-customer');
            }, 2000);
        } else {
            setShow1(true)
        }
    }
    const getCustomers = async () => {
        const formData = new FormData();
        if (file) {
            // const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            const maxSize = 10 * 1024 * 1024;
            // if (!allowedTypes.includes(file.type)) {
            //     setErrorfile(true);
            //     setErrorfileMsg('Only JPEG, JPG, and PNG files are allowed!');
            //     return false;
            // }
            if (file.size > maxSize) {
                setErrorfile(true);
                setErrorfileMsg('File size must be less than 5MB!');
                return false;
            }
        } else {
            setError(true)
            return false;
        }
        if (file) {
            formData.append('customerFile', file);
        }
        let result = await listAllCustomers(formData)
        //result = await result.json();
        if (result.response.status === true && result.response.customerDetails) {
            const itemElements = [];
            result.response.customerDetails.map((item, index) => {
                itemElements.push({
                    id: item.id,
                    user_code: item.user_code,
                    name: item.name,
                    email: item.email,
                    phone_number: item.phone_number,
                    organization_name: item.organization_name,
                    organization_PAN: item.organization_PAN,
                    organization_GSTN: item.organization_GSTN,
                    organization_address_registered: item.organization_address_registered,
                    address: item.address,
                    city: item.city,
                    state: item.state,
                    pin_code: item.pin_code,
                    zone: item.zone,
                    customer_type_id: item.customer_type_id,
                    business_nature: item.business_nature,
                    organization_address_plant: item.organization_address_plant,
                    status: item.status,
                    created_at: item.created_at,
                    created_by: item.created_by
                });
                return itemElements;
            })
            setCustomers(itemElements);
        } else {
            // setShow1(true)
        }
    }
    const data = React.useMemo(
        () => customers,
        [customers]
    );
    useEffect(() => {
    }, [uploadCustomers])
    const columns = React.useMemo(
        () => [
            { Header: 'ID', accessor: 'id' },
            { Header: 'User Code', accessor: 'user_code' },
            { Header: 'User Name', accessor: 'name' },
            { Header: 'Email', accessor: 'email' },
            { Header: 'Phone', accessor: 'phone_number' },
            { Header: 'Organization Name', accessor: 'organization_name' },
            { Header: 'Organization GSTN', accessor: 'organization_GSTN' },
            { Header: 'Organization Registered Address', accessor: 'organization_address_registered' },
            { Header: 'Organization Plant Address', accessor: 'organization_address_plant' },
            { Header: 'Business Nature', accessor: 'business_nature' },
        ],
        [customers]
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
        setPageSize,
        // state: { globalFilter },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 5 }, // Set initial page size
        },
        useGlobalFilter,
        usePagination
    );
    const browserBtn = () => {
        inputFile.current.click();
    }
    const handleFilterChange = (e) => {
        const value = e.target.value || undefined;
        setFilterInput(value);
        setGlobalFilter(value);
    };
    useEffect(() => {
        setFileName(file?.name);
    }, [file])
    return (
        <>
            {show1 && (
                <SweetAlert
                    warning
                    title="Oops!"
                    onConfirm={handleClose1}
                    onCancel={handleClose1}
                    confirmBtnBsStyle="success"
                >
                    Customers not uploaded
                </SweetAlert>
            )}
            {showAlert && (
                <SweetAlert
                    success
                    title="Customer Added!"
                    onConfirm={handleClose}
                    confirmBtnBsStyle="success"
                >
                    Customers uploaded successfully
                </SweetAlert>
            )}
            <AdminLayout>

                <Container fluid="true">
                    <Row>
                        <Col sm={3}><p className='page_left_panel'>Import Customer</p></Col>
                        <Col sm={5}></Col>
                        <Col sm={4}><p className='page_right_panel'><span style={{ cursor: 'pointer' }} onClick={handleNavigate}>Customer List</span> / Import Customer</p></Col>
                    </Row>
                    <Row style={{ backgroundColor: 'white', borderRadius: '1%', margin: '2px 1px' }}>
                        <Form style={{ padding: '25px 20px 25px 25px' }}>
                            <Row className="g-2 align-items-end" style={row_style}>
                                <Col md>
                                    <Form.Label>Upload Customer Data</Form.Label>
                                    <InputGroup>
                                        <Form.Control style={{ display: "none" }} type="file" ref={inputFile} onChange={(e) => { setFile(e.target.files[0]) }} />
                                        <Form.Control value={fileName ? fileName : ''} disabled />
                                        <InputGroup.Text onClick={browserBtn} style={{ cursor: "pointer" }}>Browse</InputGroup.Text>
                                    </InputGroup>
                                </Col>
                                <Col md className='gap-3 d-flex'>
                                    <Button onClick={getCustomers}>Submit File</Button>
                                    <Button href={env.ADMIN_BACKEND_IMAGE_URL_ASSETS + "customers.xlsx"}>Download Sample</Button>
                                    {uploadCustomers.status === false && <Button href={uploadCustomers.logPath} target="_blank" download>Download Error Log</Button>}
                                </Col>
                            </Row>
                        </Form>
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
                                </div>
                            </Col>
                        </Row>
                        <Table {...getTableProps()} style={{ width: '100%', marginTop: '20px' }} striped bordered hover >
                            <thead>
                                {headerGroups.map((headerGroup, headKey) => (
                                    <tr {...headerGroup.getHeaderGroupProps()} key={headKey}>
                                        {headerGroup.headers.map((column, key) => (
                                            <th {...column.getHeaderProps()} key={key}>{column.render('Header')}</th>
                                        ))}
                                        {/* <th>Action</th> */}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {page.map((row, index) => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()} key={index}>
                                            <td>{row.original.id}</td>
                                            <td>{row.original.user_code}</td>
                                            <td>{row.original.name}</td>
                                            <td>{row.original.email}</td>
                                            <td>{row.original.phone_number}</td>
                                            <td>{row.original.organization_name}</td>
                                            <td>{row.original.organization_GSTN}</td>
                                            <td>{row.original.organization_address_registered}</td>
                                            <td>{row.original.organization_address_plant}</td>
                                            <td>{row.original.business_nature}</td>
                                            {/* <td style={{ position: 'relative' }}>
                                                <p onClick={() => handleToggleOptions(index)} style={{ cursor: 'pointer' }}>...</p>
                                                {showOptions === index &&
                                                    <ul className='dropdown-option'>
                                                        <li onClick={() => handleView(row.original.dataid)} className="listing-style"><FontAwesomeIcon icon={faEye} className='mx-2' />View</li>
                                                        <li onClick={() => handleEdit(row.original.dataid)} className="listing-style"><FontAwesomeIcon icon={faEdit} className='mx-2' />Edit</li>
                                                        {row.original.status == 1 && <li onClick={() => handleDelete(row.original.dataid)} className="listing-style"><FontAwesomeIcon icon={faTrash} className='mx-2' />Deactivate</li>}
                                                    </ul>
                                                }
                                            </td> */}
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
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Row className="g-2" style={{ marginLeft: "829px" }}>
                        <Col md>
                            <Button style={submitbuttonStyle} onClick={uploadCustomersBulk}>Add</Button>
                        </Col>
                    </Row>
                </Container>

            </AdminLayout>
        </>
    )
}
const invalidInput = {
    color: "red"
}
const clearbuttonStyle = {
    width: "180px",
    height: "39px",
    backgroundColor: "#FFF",
    color: "#3A85E5",
    border: "1px solid #3A85E5",
    marginTop: "15px",
}
const submitbuttonStyle = {
    width: "180px",
    height: "39px",
    radius: "5px",
    backgroundColor: "#3A85E5",
    marginTop: "15px",
}

const row_style = {
    marginTop: "20px"
}
const asteriskStyle = {
    color: "red"
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