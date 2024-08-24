import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Tổng Quan',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // },
  },
  // {
  //   component: CNavTitle,
  //   name: 'Theme',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Colors',
  //   to: '/theme/colors',
  //   icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Typography',
  //   to: '/theme/typography',
  //   icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Components',
  // },
  {
    component: CNavGroup,
    name: 'Danh Mục',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Xác nhận hồ sơ đăng ký',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Quản lý tài khoản',
        to: '/base/tables',
      },
      {
        component: CNavItem,
        name: ' Lập kế hoạch thanh tra',
        to: '/base/collapses',
      },
      {
        component: CNavItem,
        name: 'Lập đoàn thẩm định',
        to: '/base/carousels',
      },
      {
        component: CNavItem,
        name: 'Đăng tin tức',
        to: '/base/spinners',
      },
      {
        component: CNavItem,
        name: 'Lập biên bản xử lý',
        to: '/base/paginations',
      },
      {
        component: CNavItem,
        name: 'Kết quả kiểm tra ATTP',
        to: '/base/navs',
      },
      {
        component: CNavItem,
        name: 'Danh sách vi phạm ',
        to: '/base/navs',
      },
      {
        component: CNavItem,
        name: 'Thông báo xử lý vi phạm',
        to: '/base/navs',
      },
    ],
  },
]

export default _nav
