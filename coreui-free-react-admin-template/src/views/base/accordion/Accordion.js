/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCard,
  CCardBody,
  CCardHeader,
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
  CFormLabel,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
  CForm,
  CProgress,
  CProgressBar,
  CFormInput,
  CContainer,
} from '@coreui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../../firebaseConfig'
import { collection, getDocs, onSnapshot, deleteDoc } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
const Accordion = () => {
  const [currentStatus, setCurrentStatus] = useState('Tất cả');
  const [dataOrder, setDataOrder] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleStatus, setVisibleStatus] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const navigate = useNavigate();

  const handleViewStatusReason = async (OrderID) => {
    console.log("Thông tin id", OrderID)
    try {
      // Assuming you have an endpoint to get the rejection reason by OrderID
      const res = await axios.get(`http://localhost:3001/api/rejection-details/${OrderID}`);
      console.log("Lys do tu choi", res.data)
      if (res.status === 200) {
        setRejectionReason(res.data[0].NoiDungXuLy); // Set the rejection reason to state
        setVisibleStatus(true); // Show the modal
      } else {
        console.error('Không tìm thấy lý do từ chối:', res.data);
      }
    } catch (error) {
      console.log('Lỗi khi lấy lý do từ chối:', error);
    }
  }

  useEffect(() => {
    fetchData();

    const unsubscribeRejectOrders = onSnapshot(collection(db, 'reject'), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          handleRejectAdded(change.doc);
        }
      });
    });

    return () => {
      unsubscribeRejectOrders();
    };
  }, []);

  const handleRejectAdded = async (doc) => {
    const rejectData = doc.data();
    const { PK_Id_DonHang, ID_TX, rejectReason } = rejectData;
    alert(
      `Đơn hàng '${PK_Id_DonHang}' đã bị từ chối bởi tài xế '${ID_TX}' với lý do là "${rejectReason}"`
    );
    try {
      await deleteDoc(doc.ref);
      console.log('Document successfully deleted!');
    } catch (error) {
      console.error('Error deleting document:', error);
    }
    fetchData();
  };

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/getAllOrders');
      setDataOrder(res.data);
      setAllOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDetailOrder = (OrderID) => {
    navigate(`/base/popovers/${OrderID}`);
  };

  const handleUpdate = (OrderID) => {
    alert(`Chỉnh sửa đơn hàng ${OrderID}`);
  };

  const handleProcessOrder = (OrderID) => {
    navigate(`/base/tooltips/${OrderID}`);
  };

  const handleViewStatus = (OrderID) => {
    setVisibleStatus(true);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const filteredData = allOrders.filter(
        (item) =>
          item.TenKH.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.MaDH.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );

      setDataOrder(filteredData);
    } else {
      setDataOrder(allOrders);
    }
  }, [searchQuery, allOrders]);

  useEffect(() => {
    filterOrdersByStatus();
  }, [currentStatus, allOrders]);

  const filterOrdersByStatus = () => {
    if (currentStatus === 'Tất cả') {
      setDataOrder(allOrders);
    } else {
      const filteredData = allOrders.filter((item) => item.trangThai === currentStatus);
      setDataOrder(filteredData);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return ' ';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
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
          <strong>Quản lý hồ sơ</strong>
        </CCardHeader>
        <CForm className="row g-3">
          <CCol xs="auto">
            <CFormLabel htmlFor="inputPassword2" className="visually-hidden">
              Password
            </CFormLabel>
            <CFormInput
              type="text"
              id="inputPassword2"
              placeholder="Tìm kiếm đơn hàng"
              onChange={handleSearchChange}
            />
          </CCol>
          <CCol xs="auto">
            <CButton color="primary" type="submit" className="mb-3">
              Tìm kiếm
            </CButton>
          </CCol>
        </CForm>
      </div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CNav variant="underline-border">
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={currentStatus === 'Tất cả'}
                  onClick={() => setCurrentStatus('Tất cả')}
                >
                  Tất cả
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={currentStatus === 'Chưa duyệt'}
                  onClick={() => setCurrentStatus('Chưa duyệt')}
                >
                  Chưa duyệt
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={currentStatus === 'Đang giao hàng'}
                  onClick={() => setCurrentStatus('Đang giao hàng')}
                >
                  Đã duyệt
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  style={{ cursor: 'pointer' }}
                  active={currentStatus === 'Đã duyệt'}
                  onClick={() => setCurrentStatus('Đã duyệt')}
                >
                  Đã từ chối
                </CNavLink>
              </CNavItem>
            </CNav>
            <CCardBody>
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">ID hồ sơ</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tên cơ sở</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Địa chỉ</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Chủ cơ sở</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Trạng thái</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tuỳ chọn</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {allOrders.map((item, index) => (
                    <CTableRow key={item.IdHoSo}>
                      <CTableHeaderCell scope="row">{item.IdHoSo}</CTableHeaderCell>
                      <CTableDataCell>{item.TenCoSo}</CTableDataCell>
                      <CTableDataCell>{item.DiaChi}</CTableDataCell>
                      <CTableDataCell>{ }</CTableDataCell>
                      <CTableDataCell
                        style={{
                          color:
                            item.trangThai === 'Đã duyệt'
                              ? 'green'
                              : item.trangThai === 'Từ chối'
                                ? 'red'
                                : 'gray',
                        }}
                      >
                        {item.trangThai}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CDropdown>
                          <CDropdownToggle color="secondary">Tuỳ chỉnh</CDropdownToggle>
                          <CDropdownMenu>
                            {item.trangThai === 'Chưa duyệt' && (
                              <>
                                <CDropdownItem onClick={() => handleProcessOrder(item.IdHoSo)}>
                                  Xử lý
                                </CDropdownItem>
                              </>
                            )}
                            {item.trangThai === 'Từ chối' && (
                              <CDropdownItem onClick={() => handleViewStatusReason(item.IdHoSo)}>
                                Xem trạng thái
                              </CDropdownItem>
                            )}
                            {item.trangThai === 'Đã duyệt' && (
                              <CDropdownItem onClick={() => handleDetailOrder(item.IdHoSo)}>
                                Xem chi tiết
                              </CDropdownItem>
                            )}
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

      <CModal
        size="lg"
        backdrop="static"
        visible={visibleStatus}
        onClose={() => setVisibleStatus(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="StaticBackdropExampleLabel">Lý do bị từ chối</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CContainer>
            <CRow className="justify-content-between">
              <CCol sm="auto">{rejectionReason}</CCol> {/* Dynamic rejection reason */}
            </CRow>
          </CContainer>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleStatus(false)}>
            Đóng
          </CButton>
        </CModalFooter>
      </CModal>

    </>
  )
}

export default Accordion
