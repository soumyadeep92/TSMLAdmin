import React from 'react';
import {
    DatatableWrapper,
    Filter,
    Pagination,
    PaginationOptions,
    TableBody,
    TableHeader
} from 'react-bs-datatable';
import { Container, Col, Row, Table } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

// Create table headers consisting of 4 columns.
const headers = [
    {
        prop: 'name',
        title: 'Name',
        isSortable: true,
        isFilterable: true
    },
    {
        prop: 'username',
        title: 'Username',
        isSortable: true,
        isFilterable: true
    },
    {
        prop: 'location',
        title: 'Location'
    },
    {
        prop: 'address',
        title: 'address',
        isSortable: true,
        isFilterable: true
    },
    {
        prop: 'age',
        title: 'age',
        isSortable: true,
        isFilterable: true
    }
];

// Randomize data of the table columns.
// Note that the fields are all using the `prop` field of the headers.
const body = Array.from(new Array(25), () => {
    const rd = (Math.random() * 10).toFixed(1);

    if (rd > 0.5) {
        return {
            username: 'i-am-billy',
            name: `Billy ${rd}`,
            location: 'Mars',
            address: `city ${rd}`,
            age: rd,
        };
    }

    return {
        username: 'john-nhoj',
        name: `John ${rd}`,
        location: 'Saturn',
        address: `city ${rd}`,
        age: rd,
    };
});

// Then, use it in a component.
export const ListUser = ({
    filterPlaceholder,
    afterSelect,
    beforeSelect,
    firstPage,
    lastPage,
    nextPage,
    prevPage
}) => {

    return (
        <>
            <Container fluid="true">
                <p style={textStyle}>List User</p>
                <DatatableWrapper
                    body={body}
                    headers={headers}
                    paginationOptionsProps={{
                        initialState: {
                            rowsPerPage: 10,
                            options: [5, 10, 15, 20]
                        }
                    }}
                >
                    <Row className="mb-4">
                        <Col
                            style={{marginLeft:"250px",paddingLeft:"100px"}}
                            xs={12}
                            lg={4}
                            className="d-flex flex-col justify-content-end align-items-end"
                        >
                            < Filter />
                        </Col>
                        <Col
                            xs={12}
                            sm={6}
                            lg={4}
                            className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0"
                        >
                            <PaginationOptions alwaysShowPagination />
                        </Col>
                        <Col
                            xs={12}
                            sm={6}
                            lg={4}
                            className="d-flex flex-col justify-content-end align-items-end"
                        >
                            <Pagination
                                alwaysShowPagination
                                paginationRange={3}
                                labels={{ firstPage, lastPage, nextPage, prevPage }}
                            />
                        </Col>
                    </Row>
                    <Table>
                        <TableHeader />
                        <TableBody />
                    </Table>
                </DatatableWrapper>
            </Container>
        </>
    );
}

const textStyle = {
    marginLeft: "0px",
    fontSize: "30px",
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "Mulish",
    width: "399px",
    height: "18px",
    marginTop: "100px"
}