<template>
    <aside :class="[
        'w-64 h-screen flex flex-col transition-colors duration-200',
        isDark
            ? 'bg-gray-800 text-gray-100'
            : 'bg-blue-700 text-white'
    ]">
        <!-- Header -->
        <div :class="[
            'p-4',
            isDark ? 'bg-gray-900' : 'bg-blue-800'
        ]">
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-semibold">Thư viện</h1>
                <!-- Theme Toggle Button -->
                <button @click="toggleTheme" class="p-2 rounded-lg hover:bg-opacity-20 hover:bg-gray-600">
                    <!-- Sun Icon -->
                    <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <!-- Moon Icon -->
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Menu Items -->
        <nav class="mt-4 flex-grow">
            <router-link v-for="item in allMenuItems" :key="item.name" :to="item.path" :class="[
                'flex items-center px-4 py-3 text-sm transition-colors duration-200',
                isDark ? 'hover:bg-gray-700' : 'hover:bg-green-700',
                { 'bg-green-700': item.name === activeSection },
            ]" @click="updateSection(item.name)">
                <component :is="item.icon" class="h-5 w-5 mr-3" />
                {{ item.name }}
            </router-link>
        </nav>

        <!-- Bottom Section -->
        <div :class="[
            'mt-auto border-t',
            isDark ? 'border-gray-700' : 'border-blue-600'
        ]">
            <!-- Profile Link -->
            <router-link to="/profile" :class="[
                'flex items-center px-4 py-3 text-sm transition-colors duration-200',
                isDark
                    ? 'hover:bg-gray-700'
                    : 'hover:bg-green-700'
            ]">
                <UserCircleIcon class="h-5 w-5 mr-3" />
                Thông tin cá nhân
            </router-link>

            <!-- Logout Button -->
            <button @click="handleLogout" :class="[
                'w-full flex items-center px-4 py-3 text-sm transition-colors duration-200',
                isDark
                    ? 'hover:bg-red-900'
                    : 'hover:bg-red-600'
            ]">
                <LogoutIcon class="h-5 w-5 mr-3" />
                Đăng xuất
            </button>
        </div>
    </aside>
</template>

<script>
import { useRouter } from 'vue-router';
import { useTheme } from '@/composables/useTheme';
import AuthService from '@/services/auth.service';
import {
    UserCircleIcon,
    ArrowRightOnRectangleIcon as LogoutIcon,
    BookOpenIcon,
    UsersIcon,
    UserGroupIcon,
    DocumentTextIcon,
    BuildingOfficeIcon,
} from "@heroicons/vue/24/outline";

export default {
    name: 'Sidebar',
    components: {
        UserCircleIcon,
        LogoutIcon,
        BookOpenIcon,
        UsersIcon,
        UserGroupIcon,
        DocumentTextIcon,
        BuildingOfficeIcon,
    },
    props: {
        activeSection: {
            type: String,
            required: true,
        },
    },
    setup() {
        const router = useRouter();
        const { isDark, toggleTheme } = useTheme();

        const handleLogout = () => {
            AuthService.logout();
            router.push('/login');
        };

        return {
            handleLogout,
            isDark,
            toggleTheme
        };
    },
    data() {
        return {
            menuItems: [
                { name: "Quản lý Sách", path: "/" },
                { name: "Quản lý Nhân viên", path: "/admin/staffs" },
                { name: "Quản lý Độc giả", path: "/admin/readers" },
                { name: "Quản lý Mượn sách", path: "/admin/lendings" },
                { name: "Quản lý Nhà xuất bản", path: "/admin/publishers" },
            ],
            menuItemsStaff: [
                { name: "Quản lý Sách", path: "/" },
                { name: "Quản lý Độc giả", path: "/admin/readers" },
                { name: "Quản lý Mượn sách", path: "/admin/lendings" },
            ],
            menuItemsReader: [
                { name: "Quản lý Sách", path: "/" },
                { name: "Quản lý Mượn sách", path: "/admin/lendings" },
            ],
            menuItemsGuest: [
                { 
                    name: "Quản lý Sách", 
                    path: "/", 
                    icon: 'BookOpenIcon'
                }
            ],
            isUser: "",
            allMenuItems: [],
        };
    },
    methods: {
        updateSection(sectionName) {
            this.$emit('update-section', sectionName);
        },
        initializeMenu() {
            const currentUser = AuthService.getCurrentUser();
            if (!currentUser) {
                this.isUser = 'guest';
                this.allMenuItems = [];
                return;
            }

            if (currentUser.MSNV) {
                if (currentUser.ChucVu === 'Admin') {
                    this.isUser = 'Admin';
                    this.allMenuItems = [...this.menuItems];
                } else {
                    this.isUser = 'Staff';
                    this.allMenuItems = [...this.menuItemsStaff];
                }
            } else if (currentUser.MaDocGia) {
                this.isUser = 'reader';
                this.allMenuItems = [...this.menuItemsReader];
            } else {
                this.isUser = 'guest';
                this.allMenuItems = [...this.menuItemsGuest];
            }
        }
    },
    created() {
        this.initializeMenu();
    },
    mounted() {
        this.initializeMenu();
    },
    watch: {
        '$route': {
            immediate: true,
            handler() {
                this.initializeMenu();
            }
        }
    }
};
</script>

<style scoped>
/* Add your styles here */
</style>
