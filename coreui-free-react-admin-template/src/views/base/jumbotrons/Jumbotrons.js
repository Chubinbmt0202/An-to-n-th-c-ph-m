import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModalTitle,
  CContainer,
  CForm,
  CModalFooter,
  CRow,
  CModalBody,
  CFormTextarea,
  CFormInput,
  CModalHeader,
  CImage,
  CModal,
} from '@coreui/react'
import { DocsLink } from 'src/components'

const Jumbotrons = () => {
  return (
    <>
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
                        <CImage
                          align="start"
                          rounded
                          src="/images/react400.jpg"
                          width={200}
                          height={200}
                        />
                        <div className="mt-3">
                          <CButton
                            color="primary"
                            className="ml-1"
                            onClick={() => handleViewStatus()}
                          >
                            Yêu cầu bổ sung
                          </CButton>
                        </div>
                      </div>
                    </CCol>

                    <CCol xs={6}>
                      <div>
                        <p>chủ cơ sở:</p>
                        <CFormInput id="inputAddress" value={dataFile.TenCoSo} readOnly />
                        <p className=" mt-2">Loại hình kinh doanh</p>
                        <CFormInput
                          id="inputAddress"
                          value={dataFile.TenLoaiHinhKinhDoanh}
                          readOnly
                        />
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
      </CRow>
    </>
  )
}

export default Jumbotrons
