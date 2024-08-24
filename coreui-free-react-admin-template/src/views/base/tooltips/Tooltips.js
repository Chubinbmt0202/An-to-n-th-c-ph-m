import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CLink,
  CTooltip,
  CRow,
  CCol,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CForm,
  CContainer,
  CImage,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CFormTextarea,
  CModalFooter,
  CModal,
  CModalTitle,
  CTableDataCell,
  CModalBody,
  CModalHeader,
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import { DatePicker } from '@mui/x-date-pickers'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { addDoc, collection, getDocs, setDoc, doc } from 'firebase/firestore'
import { db } from '../../../../firebaseConfig'

const Tooltips = () => {
  const { OrderID } = useParams()
  const [dataOrder, setDataOrder] = useState(null)
  const [visibleStatus, setVisibleStatus] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const navigate = useNavigate()
  console.log('OrderID:', OrderID)

  const handleViewStatus = () => {
    setVisibleStatus(true)
  }

  const handleRejection = async () => {
    try {
      const res = await axios.post(`http://localhost:3001/api/rejectOrdera/${OrderID}`, {
        noiDungTuChoi: rejectionReason,
        nguoiXuLy: 'ND001', // Hoặc giá trị thích hợp
      })

      if (res.status === 200) {
        alert('Đã từ chối hồ sơ thành công')
        navigate('/base/accordion')
      } else {
        console.error('Từ chối hồ sơ thất bại:', res.data)
      }
    } catch (error) {
      alert('Bạn phải tạo kế hoạch thanh tra trước ')
      console.log('Lỗi khi từ chối hồ sơ:', error)
    }
  }

  const handleLoadData = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/getOrderDetailFinished/${OrderID}`)
      console.log('API Response detail:', res.data[0])
      setDataOrder(res.data[0])
    } catch (error) {
      console.log('API Error:', error)
    }
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`http://localhost:3001/api/updateOrderFile/${OrderID}`)
      if (res.status === 200) {
        console.log('Cập nhật hồ sơ thành công!')
        alert('Duyệt hồ sơ thành công')
        navigate('/base/accordion')
      } else {
        console.error('Cập nhật hồ sơ thất bại:', res.data)
      }
    } catch {
      console.log('Lỗi khi duyệt hồ sơ')
    }
  }

  useEffect(() => {
    if (OrderID) {
      handleLoadData()
    }
  }, [OrderID])

  if (!OrderID) {
    return <div>Đơn hàng không tồn tại</div>
  }

  if (dataOrder === null) {
    return <div>Loading...</div>
  }

  if (!dataOrder) {
    return <div>Error loading data</div>
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Mã hồ sơ:</strong> <small>{OrderID}</small>
          </CCardHeader>
          {dataOrder && (
            <CCardBody>
              <CContainer>
                <CRow>
                  <CCol xs={6}>
                    <div>
                      <p>Tên cơ sở:</p>
                      <CFormInput id="inputAddress" value={dataOrder.TenCoSo} readOnly />
                      <p className="mt-2">Địa chỉ</p>
                      <CFormInput id="inputAddress" value={dataOrder.DiaChi} readOnly />
                      <p className="mt-3 mb-1">Số giấy phép kinh doanh</p>
                      <CFormInput id="inputAddress" value={dataOrder.SoGiayPhepKD} readOnly />
                      <p className="mt-3 mb-1">Ngày đăng ký</p>
                      <CFormInput id="inputAddress" value={'2024-08-12'} readOnly />
                      <p className="mt-3 mb-1">Hình ảnh minh chứng</p>
                      <CImage
                        align="start"
                        rounded
                        src="/images/react400.jpg"
                        width={200}
                        height={200}
                      />
                      <div className="mt-3">
                        <CButton color="primary" onClick={() => handleSubmit()}>
                          Duyệt
                        </CButton>
                        <CButton
                          color="primary"
                          className="ml-1"
                          onClick={() => handleViewStatus()}
                        >
                          Từ chối
                        </CButton>
                      </div>
                    </div>
                  </CCol>

                  <CCol xs={6}>
                    <div>
                      <p>chủ cơ sở:</p>
                      <CFormInput id="inputAddress" value={"Nguyễn Huy Hào"} readOnly />
                      <p className=" mt-2">Loại hình kinh doanh</p>
                      <CFormInput
                        id="inputAddress"
                        value={dataOrder.TenLoaiHinhKinhDoanh}
                        readOnly
                      />
                      <p className="mt-3 mb-1">Ngày cấp giấy phép</p>
                      <CFormInput id="inputAddress" value={dataOrder.NgayCapGiayPhep} readOnly />
                      <p className="mt-3 mb-1">Loại thực phẩm</p>
                      <CFormInput id="inputAddress" value={"Bánh ngọt"} readOnly />
                    </div>
                  </CCol>
                </CRow>
              </CContainer>
            </CCardBody>
          )}
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
          <CModalTitle id="StaticBackdropExampleLabel">Từ chối hồ sơ</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CContainer>
            <CRow className=" justify-content-between">
              <CForm>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  label="Nhập nội dung từ chối hồ sơ"
                  rows={6}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  text="Must be 8-20 words long."
                ></CFormTextarea>
              </CForm>
            </CRow>
          </CContainer>
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={handleRejection}>
            Xác nhận
          </CButton>
          <CButton color="secondary" onClick={() => setVisibleStatus(false)}>
            Đóng
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default Tooltips
