/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import {
  CButton,
  CCard,
  CCardBody,
  CModal,
  CCardFooter,
  CCardGroup,
  CCardHeader,
  CCardImage,
  CCardLink,
  CCardSubtitle,
  CModalHeader,
  CCardText,
  CCardTitle,
  CListGroup,
  CFormInput,
  CListGroupItem,
  CModalBody,
  CNav,
  CFormCheck,
  CModalTitle,
  CNavItem,
  CNavLink,
  CCol,
  CRow,
  CModalFooter,
  CTable,
  CTableHead,
  CForm,
  CTableRow,
  CContainer,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CTableCaption,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
} from '@coreui/react';
import ReactImg from 'src/assets/images/react.jpg';

const Carousels = () => {
  const [currentStatus, setCurrentStatus] = useState('Tất cả');
  const [selectedItems, setSelectedItems] = useState([]);
  const [dataNV, setDataNV] = useState([]);
  const [dataDriver, setDataDriver] = useState([])
  const [visibleStatus, setVisibleStatus] = useState(false)
  const [dataEmployer, setDataEmployee] = useState([]);



  const handelFetchDataDriver = async () => {
    const res = await axios.get("http://localhost:3001/api/getAllDriver")
    console.log(res.data);
    setDataDriver(res.data)
  }
  const handelFetchDataEmployee = async () => {
    const res = await axios.get("http://localhost:3001/api/getAllEmployee")
    console.log(res.data);
    setDataEmployee(res.data)
  }



  const handelDeleteDriverByID = async (id, idTK) => {
    const userConfirmed = confirm(`Bạn có muốn khóa tài xế với ID : ${id}`);
    if (userConfirmed) {
      try {
        const res = await axios.put(`http://localhost:3001/api/updateDriverByID/${id}`)
        const reshelp = await axios.put(`http://localhost:3001/api/updateEmployee/${idTK}`)
        handelFetchDataDriver();
        handelFetchDataEmployee();
      }
      catch (error) {
        alert("Không thể xóa nhân viên này  vì tài khoản hiện đang được sử dụng")

        console.log(error);
      }

    }



  }

  const handelDeleteEmployee = async (id) => {

    const userConfirmed = confirm(`Bạn có muốn khóa tài khoản với ID : ${id}`);
    if (userConfirmed) {

      try {
        const res = await axios.put(`http://localhost:3001/api/updateEmployee/${id}`)
        handelFetchDataDriver();
        handelFetchDataEmployee();
      }
      catch (error) {
        alert("Không thể xóa tài khoản này vì tài khoản hiện đang được sử dụng")
        console.log("delete employee fail ");
        console.log(error);
      }

    }
  }

  useEffect(() => {
    handelFetchDataDriver();
    handelFetchDataEmployee();

  }, []);


  const formatDate = (dateString) => {
    if (!dateString) return ' ';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };


  const isSelected = (id) => {
    return selectedItems.includes(id);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <CCardHeader style={{ marginBottom: '10px' }}>
          <strong>Tài khoản và phân cấp</strong>
          <div>
            <span style={{ marginRight: '200px', fontSize: 'larger' }}>
              Tổng số nhân viên: <span style={{ color: 'blue', fontSize: 'x-large' }}>{dataEmployer.length}</span>
            </span>
          </div>
        </CCardHeader>
        {/* Giữ nguyên nút thêm tài khoản */}
        <CButton color="primary">
          <a onClick={() => setVisibleStatus(true)} style={{ color: 'white', textDecoration: 'none' }}>+ Tạo đoàn thẩm định</a>
        </CButton>
      </div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CNav variant="underline-border">
            </CNav>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Tên đoàn</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Kế hoạch</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Ngày thanh tra</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Giờ bắt đầu</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Cán bộ</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Chức vụ</CTableHeaderCell>
                    {/* Xem chi tiết chuyển đến /base/progress */}
                    <CTableHeaderCell scope="col">Tuỳ chọn</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {dataDriver.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell>
                        <span style={{ color: 'blue' }}>{item.Ten_TX}</span>
                      </CTableDataCell>
                      <CTableDataCell>{item.SDT}</CTableDataCell>
                      <CTableDataCell>{formatDate(item.Ngay_Sinh)}</CTableDataCell>
                      <CTableDataCell style={{ color: 'blue' }}>{item.Email}</CTableDataCell>
                      <CTableDataCell>{item.Gioi_Tinh}</CTableDataCell>
                      <CTableDataCell
                        style={{
                          color:
                            item.Trang_thai === 'Đang rảnh'
                              ? 'green'
                              : item.Trang_thai === 'Đang giao'
                                ? 'red'
                                : 'gray',
                        }}
                      >
                        {item.Trang_thai}
                      </CTableDataCell>

                      {/* Tuỳ chọn */}
                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="secondary">Tuỳ chọn</CDropdownToggle>
                          <CDropdownMenu>
                            {/* Xem chi tiết chuyển đến /base/progress */}
                            <CDropdownItem><Link to={`/base/Paginations/${item.PK_Id_TX}`} >Xem chi tiết</Link></CDropdownItem>
                            <CDropdownItem onClick={() => handelDeleteDriverByID(item.PK_Id_TX, item.Id_TaiKhoan)} > Khóa Tài Xế</CDropdownItem>
                            {/* Chỉnh sửa chuyển đến /base/progress */}
                            {/* <CDropdownItem><Link to="/base/progress">Chỉnh sửa</Link></CDropdownItem> */}
                            <CDropdownDivider />

                          </CDropdownMenu>
                        </CDropdown>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CModal
          size="lg"
          backdrop="static"
          visible={visibleStatus}
          onClose={() => setVisibleStatus(false)}
          aria-labelledby="StaticBackdropExampleLabel"
        >
          <CModalHeader>
            <CModalTitle id="StaticBackdropExampleLabel">Tạo kế hoạch thanh tra</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CContainer>
              <CRow className=" justify-content-between">
                <CForm>
                  <CFormInput id="inputAddress" label="Nhập tên kế hoạch" />
                  <CFormInput
                    id="inputAddress"
                    label="Ngày thanh tra"
                    placeholder="Nhập ngày với định dạng: 2024-07-31"
                  />
                  <CFormInput
                    id="inputAddress"
                    label="Thời gian thanh tra"
                    placeholder="Nhập thời gian với định dạng: 09:12"
                  />
                  <p>Chọn cơ sở muốn thanh tra</p>
                  <CFormCheck id="flexCheckDefault" label="Cơ sở 1 - 12 Đống đa, Hà Nội" />
                  <CFormCheck id="flexCheckDefault" label="Cơ sở 2 - 12 Đống đa, Hà Nội" />
                </CForm>
              </CRow>
            </CContainer>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary">Tạo kế hoạch</CButton>
            <CButton color="secondary" onClick={() => setVisibleStatus(false)}>
              Đóng
            </CButton>
          </CModalFooter>
        </CModal>
      </CRow>
    </>
  );
};

export default Carousels;
