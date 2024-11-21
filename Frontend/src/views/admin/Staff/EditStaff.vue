<template>
    <div class="flex h-screen w-full bg-gray-100">
        <div class="flex-1 flex flex-col overflow-hidden">
            <div class="min-h-screen bg-green-50 flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full space-y-4">
                    <div>
                        <h2 class="text-center text-3xl font-extrabold text-green-900">
                            Chỉnh sửa nhân viên
                        </h2>
                        <p class="mt-2 text-center text-sm text-green-600">
                            Nhập thông tin của nhân viên
                        </p>
                    </div>
                    <StaffForm :staff="staff" @submit:staff="updateStaff" :isEditing="true" @cancel="cancelEdit" />
                    <p>{{ message }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import StaffForm from '@/components/StaffForm.vue';
import StaffService from '@/services/staff.service.js';
import { useRouter, useRoute } from 'vue-router';

export default {
    name: 'EditStaff',
    components: {
        StaffForm,
    },
    data() {
        return {
            staff: {
                MSNV: '',
                HoTenNV: '',
                Password: '',
                ChucVu: '',
                DiaChi: '',
                SoDienThoai: '',
            },
            message: '',
        };
    },
    methods: {
        async getStaff(id) {
            try {
                const response = await StaffService.getStaff(id);
                this.staff = response;
                console.log(this.staff);
            } catch (error) {
                console.error('Error while getting staff:', error);
            }
        },
        async updateStaff(updatedStaff) {
            try {
                await StaffService.updateStaff(this.staff.MSNV, updatedStaff);
                this.message = 'Cập nhật nhân viên thành công!';
                this.$router.push({ name: 'Staff' });
            } catch (error) {
                console.error('Error while updating staff:', error);
                this.message = 'Lỗi: ' + (error.response?.data?.message || 'Không thể cập nhật nhân viên');
            }
        },
        cancelEdit() {
            this.$router.push({ name: 'Staff' }); // Điều hướng đến trang danh sách độc giả
        },
    },
    mounted() {
        this.getStaff(this.$route.params.id);
    },
};
</script>

<style scoped>
/* Thêm style của bạn ở đây */
</style>
