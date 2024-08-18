import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardHeader,
  CModalBody,
  CCardImage,
  CCardLink,
  CCardSubtitle,
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
  const [visibleA, setVisibleA] = useState(false)
  const [visibleB, setVisibleB] = useState(false)

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader className="my-custom-button">
            <strong>Danh sách thanh tra</strong>
            <CButton className="ml-3" color="secondary">
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
    </CRow>
  )
}

export default Collapses
