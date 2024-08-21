import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CFormCheck,
  CCardFooter,
  CContainer,
  CCardGroup,
  CCardHeader,
  CModalBody,
  CCardImage,
  CCardLink,
  CCardSubtitle,
  CFormTextarea,
  CCardText,
  CCardTitle,
  CListGroup,
  CListGroupItem,
  CNav,
  CNavItem,
  CNavLink,
  CCol,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CTableCaption,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import '../../base/collapses/Collapses.css'

const Collapses = () => {
  const [visible, setVisible] = useState(false)
  const [visibleHorizontal, setVisibleHorizontal] = useState(false)
  const [visibleStatus, setVisibleStatus] = useState(false)
  const handleViewStatus = () => {
    setVisibleStatus(true)
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader className="my-custom-button">
            <strong>Danh sách thanh tra</strong>
            <CButton className="ml-3" color="secondary" onClick={() => handleViewStatus()}>
              Tạo kế hoạch thanh tra
            </CButton>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Tên kế hoạch</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ngày thanh tra</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Giờ bắt đầu</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Cơ sở thanh tra</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tuỳ chọn</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              {/* <CTableBody>
                {data.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">{item.HoTen}</CTableHeaderCell>
                    <CTableDataCell>{item.Cccd}</CTableDataCell>
                    <CTableDataCell>{item.TenChucvu}</CTableDataCell>
                    <CTableDataCell>{item.MatKhau}</CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="secondary">Tuỳ chỉnh</CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem onClick={() => fetchCustomerDetails(item.PK_Ma_KH)}>
                            Xem chi tiết
                          </CDropdownItem>

                          <CDropdownDivider />
                        </CDropdownMenu>
                      </CDropdown>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody> */}
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
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
  )
}

export default Collapses
