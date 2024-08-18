/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CFormInput,
  CContainer,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CProgress,
  CProgressBar,
  CModalFooter,
  CForm,
  CFormTextarea,
  CImage
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import { DatePicker } from '@mui/x-date-pickers'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { Button } from '@mui/material'

const Popovers = () => {
  const { OrderID } = useParams()
  const [dataOrder, setDataOrder] = useState(null)
  const [dataFile, setDataFile] = useState(null)
  const [driverIdle, setDriverIdle] = useState(null)
  const [vehicleIdle, setVehicleIdle] = useState(null)
  const [selectedDriver, setSelectedDriver] = useState('')
  const [driverPhoneNumber, setDriverPhoneNumber] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedVehicle, setSelectedVehicle] = useState('')
  const [visibleStatus, setVisibleStatus] = useState(false);
  const navigate = useNavigate()

  const handleConfirm = async () => {
    try {
      const res = await axios.post(`http://localhost:3001/api/updateOrder`, {
        orderId: OrderID,
        deliveryDate: selectedDate,
        driverId: selectedDriver,
        vehicleId: selectedVehicle,
        addressCustomer: dataOrder['Địa chỉ khách hàng'],
      })
      if (res.status === 200) {
        alert('Cập nhật đơn hàng thành công')
        navigate('/base/accordion')
      }
      // Handle successful update, e.g., show a success message or navigate to another page
    } catch (error) {
      console.log('Update Error:', error)
      // Handle error, e.g., show an error message
    }
  }

  const handleViewStatus = (OrderID) => {
    setVisibleStatus(true);
  };

  const handleLoadData = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/getOrderDetailFinished/${OrderID}`)
      console.log('API Response detail:', res.data[0])
      setDataFile(res.data[0])
      // const format = {
      //   ...res.data[0],
      //   'Ngày đặt hàng': res.data[0]['Ngày đặt hàng'].split('T')[0],
      //   'Ngày giao': res.data[0]['Ngày giao'].split('T')[0],
      // }
      // setDataOrder(format)
    } catch (error) {
      console.log('API Error:', error)
    }
  }

  // const handleGetDriverIdle = async () => {
  //   try {
  //     const res = await axios.get('http://localhost:3001/api/getAllDriversIdle')
  //     console.log('API Response:', res.data)
  //     setDriverIdle(res.data)
  //   } catch (error) {
  //     console.log('API Error:', error)
  //   }
  // }

  // const handleGetVehicleIdle = async () => {
  //   try {
  //     const res = await axios.get('http://localhost:3001/api/getVehicleIdle')
  //     console.log('API Response vehicle idle:', res.data)
  //     setVehicleIdle(res.data)
  //   } catch (error) {
  //     console.log('API Error:', error)
  //   }
  // }

  useEffect(() => {
    if (OrderID) {
      handleLoadData()
      // handleGetDriverIdle()
      // handleGetVehicleIdle()
    }
  }, [OrderID])

  if (!OrderID) {
    return <div>Đơn hàng không tồn tại</div>
  }

  if (dataFile === null) {
    return <div>Không có dữ liệu</div> // Show loading state
  }

  if (!dataFile) {
    return <div>Error loading data</div> // Handle error state
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Xem chi tiết hồ sơ:</strong> <small>{OrderID}</small>
          </CCardHeader>
          {dataFile && (
            <CCardBody>
              <CContainer>
                <CRow>
                  <CCol xs={6}>
                    <div>
                      <p>Tên cơ sở:</p>
                      <CFormInput id="inputAddress" value={dataFile.TenCoSo} readOnly />
                      <p className="mt-2">Địa chỉ</p>
                      <CFormInput id="inputAddress" value={dataFile.DiaChi} readOnly />
                      <p className="mt-3 mb-1">Số giấy phép kinh doanh</p>
                      <CFormInput id="inputAddress" value={dataFile.SoGiayPhepKD} readOnly />
                      <p className="mt-3 mb-1">Ngày đăng ký</p>
                      <CFormInput id="inputAddress" value={dataFile.NgayDangKy} readOnly />
                      <p className="mt-3 mb-1">Hình ảnh minh chứng</p>
                      <CImage align="start" rounded src="/images/react400.jpg" width={200} height={200} />
                      <div className="mt-3">
                        <CButton color="primary" className="ml-1" onClick={() => handleViewStatus()}>
                          Yêu cầu bổ sung
                        </CButton>
                      </div>
                    </div>
                  </CCol>

                  <CCol xs={6}>
                    <div>
                      <p>chủ cơ sở:</p>
                      <CFormInput id="inputAddress" value={dataFile.TenCoSo} readOnly />
                      <p className=' mt-2'>Loại hình kinh doanh</p>
                      <CFormInput id="inputAddress" value={dataFile.TenLoaiHinhKinhDoanh} readOnly />
                      <p className="mt-3 mb-1">Ngày cấp giấy phép</p>
                      <CFormInput id="inputAddress" value={dataFile.NgayCapGiayPhep} readOnly />
                      <p className="mt-3 mb-1">Loại thực phẩm</p>
                      <CFormInput id="inputAddress" value={dataFile.LoaiThucPham} readOnly />
                      {/* <CFormInput
                        id="inputAddress"
                        className=" mb-3"
                        value={shippingService}
                        readOnly
                      /> */}
                    </div>
                  </CCol>
                </CRow>
              </CContainer>
            </CCardBody>
          )
          }
        </CCard >
      </CCol >
      <CModal
        size="lg"
        backdrop="static"
        visible={visibleStatus}
        onClose={() => setVisibleStatus(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="StaticBackdropExampleLabel">Yêu cầu bổ sung</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CContainer>
            <CRow className=" justify-content-between">
              <CForm>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  label="Nhập nội dung yêu cầu bổ sung"
                  rows={6}
                  text="Must be 8-20 words long."
                ></CFormTextarea>
              </CForm>
            </CRow>
          </CContainer>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setVisibleStatus(false)}>
            Xác nhận
          </CButton>
          <CButton color="secondary" onClick={() => setVisibleStatus(false)}>
            Đóng
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow >
  )
}

export default Popovers
