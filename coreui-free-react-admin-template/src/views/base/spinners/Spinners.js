import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CFormInput,
  CForm,
  CImage,
  CContainer,
  CFormTextarea,
} from '@coreui/react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
import '../spinners/spinner.css'
const Spinners = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Đăng tin tức:</strong>
          </CCardHeader>
          <CCardBody>
            <CContainer>
              <CRow>
                <CCol xs={6}>
                  <div>
                    <p>Tiêu đề:</p>
                    <CFormInput id="inputAddress" readOnly />

                    <p className="mt-3 mb-1">Ảnh bìa</p>
                    <CImage rounded src="/images/react400.jpg" width={200} height={200} />
                    <p className="mt-3 mb-1">Nội dung</p>
                    <CFormTextarea id="inputAddress" readOnly />
                    <div className="mt-3">
                      <CButton color="primary" className="ml-1 hello">
                        Đăng tin tức
                      </CButton>
                      <CButton color="primary" className="ml-1">
                        Huỷ
                      </CButton>
                    </div>
                  </div>
                </CCol>

                <CCol xs={6}>
                  <div>
                    <p className="mt-2">Mô tả ngắn</p>
                    <CFormInput id="inputAddress" readOnly />
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
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Spinners
