import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
  CImage,
  CFormInput,
  CFormTextarea,
} from '@coreui/react'
import '../paginations/style.css'

const Progress = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Tạo biên bản xử lý:</strong>
          </CCardHeader>
          <CCardBody>
            <CContainer>
              <CRow>
                <CCol xs={6}>
                  <div>
                    <p>Tên biên bản:</p>
                    <CFormInput id="inputAddress" readOnly />
                    <p className="mt-3 mb-1">Ngày xử lý</p>
                    <CFormInput id="inputAddress" readOnly />
                  </div>
                </CCol>

                <CCol xs={6}>
                  <div>
                    <p>Id vi phạm:</p>
                    <CFormInput id="inputAddress" readOnly />
                    <p className=" mt-2">Người xử lý</p>
                    <CFormInput id="inputAddress" readOnly />
                  </div>
                </CCol>
                <p>Nội dung:</p>
                <CFormTextarea id="inputAddress" rows="10" readOnly />
              </CRow>
              <div className="mt-3">
                <CButton color="primary" className="ml-1 hello">
                  Tạo biên bản
                </CButton>
                <CButton color="primary" className="ml-1">
                  Huỷ
                </CButton>
              </div>
            </CContainer>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Progress
