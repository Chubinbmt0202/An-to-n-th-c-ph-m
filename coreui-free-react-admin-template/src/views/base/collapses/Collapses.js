import React, { useEffect, useState } from 'react'
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
import axios from 'axios'

const Collapses = () => {
  const [visible, setVisible] = useState(false)
  const [visibleHorizontal, setVisibleHorizontal] = useState(false)
  const [visibleStatus, setVisibleStatus] = useState(false)
  const [coso, setCoso] = useState(' ')
  const [isLoading, setIsLoading] = useState(true)
  const [tenKeHoach, setTenKeHoach] = useState('')
  const [ngayThanhTra, setNgayThanhTra] = useState('')
  const [thoiGianThanhTra, setThoiGianThanhTra] = useState('')
  const [selectedCoSo, setSelectedCoSo] = useState([])
  const [dataThanhtra, setDataThanhtra] = useState([])

  useEffect(() => {
    fetchData2()
    fetchData()
  }, [])

  const handleCreateKeHoach = async () => {
    try {
      const thoiGianBatDau = `${ngayThanhTra} ${thoiGianThanhTra}`
      const idNguoiLap = 1 // Replace with the actual ID of the người lập

      const dataToSend = {
        TenKeHoach: tenKeHoach,
        ThoiGianBatDau: thoiGianBatDau,
        IdNguoiLap: idNguoiLap,
        IdCoSo: selectedCoSo,
      }

      const res = await axios.post('http://localhost:3001/api/createKehoach', dataToSend)
      console.log('Kế hoạch thanh tra đã được tạo:', res.data)

      const newIdKeHoach = res.data.insertId // Lấy IdKeHoach vừa tạo từ response

      try {
        // TODO: Cập nhật phần này dựa trên thông tin API updateIDChiTiet
        const updateData = {
          // ... (Dữ liệu cần gửi để cập nhật IdChiTietKetQua)
          newIdKeHoach, // Giả sử API cần IdKeHoach mới
        }
        const res2 = await axios.post('http://localhost:3001/api/updateIDChiTiet', updateData)
        console.log('Thông tin update', res2.data)
      } catch (updateError) {
        console.error('Lỗi khi cập nhật IdChiTietKetQua:', updateError)
        // Xử lý lỗi cập nhật IdChiTietKetQua, ví dụ: hiển thị thông báo lỗi
      }

      // Close the modal or perform other actions after successful creation
      setVisibleStatus(false)
      fetchData() // Cập nhật lại danh sách thanh tra
    } catch (error) {
      console.error('Lỗi khi tạo kế hoạch thanh tra:', error)
      // Handle the error appropriately, e.g., display an error message to the user
    }
  }

  const fetchData2 = async () => {
    try {
      const res2 = await axios.get('http://localhost:3001/api/getallThanhTra')
      console.log('trung anhh ', res2.data)
      setDataThanhtra(res2.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/getAllOrders')
      console.log('Load thông tin cơ sở', res.data)
      setCoso(res.data)

      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

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
              <CTableBody>
                {dataThanhtra.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">{item['Tên kế hoạch']}</CTableHeaderCell>
                    <CTableDataCell>{item['Ngày thanh tra']}</CTableDataCell>
                    <CTableDataCell>{item['Giờ bắt đầu']}</CTableDataCell>
                    <CTableDataCell>{item['Cơ sở thanh tra']}</CTableDataCell>
                    <CTableDataCell>
                      <CDropdown>
                        <CDropdownToggle color="secondary">Tuỳ chỉnh</CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Xem chi tiết</CDropdownItem>
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
                <CFormInput
                  id="inputAddress"
                  label="Nhập tên kế hoạch"
                  value={tenKeHoach}
                  onChange={(e) => setTenKeHoach(e.target.value)}
                />
                <CFormInput
                  id="inputAddress2"
                  label="Ngày thanh tra"
                  placeholder="Nhập ngày với định dạng: 2024-07-31"
                  value={ngayThanhTra}
                  onChange={(e) => setNgayThanhTra(e.target.value)}
                />
                <CFormInput
                  id="inputAddress3"
                  label="Thời gian thanh tra"
                  placeholder="Nhập thời gian với định dạng: 09:12"
                  value={thoiGianThanhTra}
                  onChange={(e) => setThoiGianThanhTra(e.target.value)}
                />
                <p>Chọn cơ sở muốn thanh tra</p>
                {isLoading ? ( // Hiển thị thông báo "Đang tải..." khi đang tải dữ liệu
                  <p>Đang tải...</p>
                ) : (
                  coso.map((cosoItem) => (
                    <CFormCheck
                      key={cosoItem.IdHoSo}
                      id={`flexCheck-${cosoItem.IdHoSo}`}
                      label={`${cosoItem.TenCoSo} - ${cosoItem.DiaChi}`}
                      value={cosoItem.IdHoSo}
                      checked={selectedCoSo.includes(cosoItem.IdHoSo)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCoSo([...selectedCoSo, cosoItem.IdHoSo])
                        } else {
                          setSelectedCoSo(selectedCoSo.filter((id) => id !== cosoItem.IdHoSo))
                        }
                      }}
                    />
                  ))
                )}
              </CForm>
            </CRow>
          </CContainer>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={handleCreateKeHoach}>
            Tạo kế hoạch
          </CButton>
          <CButton color="secondary" onClick={() => setVisibleStatus(false)}>
            Đóng
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default Collapses
