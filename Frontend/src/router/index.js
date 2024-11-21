import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/auth/Login.vue';

import Book from '../views/admin/Book/Book.vue';
import AddBook from '@/views/admin/Book/AddBook.vue';
import EditBook from '@/views/admin/Book/EditBook.vue';

import Reader from '@/views/admin/Reader/Reader.vue';
import AddReader from '@/views/admin/Reader/AddReader.vue';
import EditReader from '@/views/admin/Reader/EditReader.vue';

import Lending from '@/views/admin/Lending/Lending.vue';
import AddLending from '@/views/admin/Lending/AddLending.vue';
import EditLending from '@/views/admin/Lending/EditLending.vue';

import Staff from '@/views/admin/Staff/Staff.vue';
import AddStaff from '@/views/admin/Staff/AddStaff.vue';
import EditStaff from '@/views/admin/Staff/EditStaff.vue';

import Publisher from '@/views/admin/Publisher/Publisher.vue';
import AddPublisher from '@/views/admin/Publisher/AddPublisher.vue';
import EditPublisher from '@/views/admin/Publisher/EditPublisher.vue';

import Register from '@/views/auth/Register.vue';

import Profile from '@/views/Profile.vue';

const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: Book,
    },

    {
        path: "/login",
        name: "Login",
        component: Login,
    },

    {
        path: "/addBook",
        name: "AddBook",
        component: AddBook,
    },

    {
        path: "/editBook/:id",
        name: "EditBook",
        component: EditBook,
        props: true,
    },

    {
        path: "/admin/publishers",
        name: "Publisher",
        component: Publisher,
    },

    {
        path: "/admin/addPublisher",
        name: "AddPublisher", 
        component: AddPublisher,
    },

    {
        path: "/admin/editPublisher/:id",
        name: "EditPublisher",
        component: EditPublisher,
        props: true,
    },

    {
        path: "/admin/staffs",
        name: "Staff",
        component: Staff,
    },

    {
        path: "/admin/addStaff",
        name: "AddStaff",
        component: AddStaff,
    },

    {
        path: "/admin/editStaff/:id",
        name: "EditStaff",
        component: EditStaff,
        props: true,
    },

    {
        path: "/admin/readers",
        name: "Reader",
        component: Reader,
    },

    {
        path: "/admin/addReader",
        name: "AddReader",
        component: AddReader,
    },

    {
        path: "/admin/editReader/:id",
        name: "EditReader",
        component: EditReader,
        props: true,
    },

    {
        path: "/admin/lendings",
        name: "Lending",
        component: Lending,
    },

    {
        path: "/admin/addLending",
        name: "AddLending",
        component: AddLending,
    },

    {
        path: "/editLending/:id",
        name: "EditLending",
        component: EditLending,
        props: true,
    },

    {
        path: '/register',
        name: 'Register',
        component: Register,
    },

    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            requiresAuth: true
        }
    }
];


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// Đây là một middleware được thực thi trước mỗi lần chuyển trang
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/', '/books'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // Cho phép truy cập trang sách mà không cần đăng nhập
    if (to.path === '/') {
        return next();
    }

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
});

export default router;