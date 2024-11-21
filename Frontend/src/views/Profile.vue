<template>
    <div class="min-h-screen bg-gray-100">
        <div class="flex-1 flex flex-col overflow-hidden">
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                <div class="container mx-auto px-6 py-8">
                    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div class="px-4 py-5 sm:px-6">
                            <h3 class="text-lg leading-6 font-medium text-gray-900">
                                Thông tin cá nhân
                            </h3>
                            <p class="mt-1 max-w-2xl text-sm text-gray-500">
                                {{ isStaff ? 'Thông tin nhân viên' : 'Thông tin độc giả' }}
                            </p>
                        </div>
                        <div class="border-t border-gray-200">
                            <dl>
                                <!-- Mã số -->
                                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">
                                        {{ isStaff ? 'Mã nhân viên' : 'Mã độc giả' }}
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {{ userInfo[isStaff ? 'MSNV' : 'MaDocGia'] }}
                                    </dd>
                                </div>

                                <!-- Họ tên -->
                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Họ và tên
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {{ isStaff ? userInfo.HoTenNV : `${userInfo.HoLot} ${userInfo.Ten}` }}
                                    </dd>
                                </div>

                                <!-- Chức vụ (chỉ hiển thị cho nhân viên) -->
                                <div v-if="isStaff" class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Chức vụ
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {{ userInfo.ChucVu }}
                                    </dd>
                                </div>

                                <!-- Ngày sinh (chỉ hiển thị cho độc giả) -->
                                <div v-if="!isStaff" class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Ngày sinh
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {{ formatDate(userInfo.NgaySinh) }}
                                    </dd>
                                </div>

                                <!-- Giới tính (chỉ hiển thị cho độc giả) -->
                                <div v-if="!isStaff" class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Giới tính
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {{ userInfo.Phai }}
                                    </dd>
                                </div>

                                <!-- Địa chỉ -->
                                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Địa chỉ
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {{ userInfo.DiaChi }}
                                    </dd>
                                </div>

                                <!-- Số điện thoại -->
                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">
                                        Số điện thoại
                                    </dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {{ isStaff ? userInfo.SoDienThoai : userInfo.DienThoai }}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <!-- Nút chỉnh sửa -->
                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button @click="handleEdit"
                                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                Chỉnh sửa thông tin
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from '@/components/Sidebar.vue';
import ReaderService from '@/services/reader.service';
import StaffService from '@/services/staff.service';

export default {
    name: 'Profile',
    components: {
        Sidebar
    },
    setup() {
        const router = useRouter();
        const userInfo = ref({});
        const isStaff = ref(false);

        const formatDate = (dateString) => {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleDateString('vi-VN');
        };

        const loadUserInfo = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user) {
                    router.push('/login');
                    return;
                }

                // Xác định loại người dùng và lấy thông tin
                if (user.MSNV) {
                    isStaff.value = true;
                    const response = await StaffService.getStaff(user.MSNV);
                    userInfo.value = response;
                } else if (user.MaDocGia) {
                    isStaff.value = false;
                    const response = await ReaderService.getReader(user.MaDocGia);
                    userInfo.value = response;
                }
            } catch (error) {
                console.error('Lỗi khi tải thông tin người dùng:', error);
            }
        };

        const handleEdit = () => {
            if (isStaff.value) {
                router.push(`/admin/staffs/${userInfo.value.MSNV}/edit`);
            } else {
                router.push(`/readers/${userInfo.value.MaDocGia}/edit`);
            }
        };

        onMounted(() => {
            loadUserInfo();
        });

        return {
            userInfo,
            isStaff,
            formatDate,
            handleEdit
        };
    }
};
</script> 