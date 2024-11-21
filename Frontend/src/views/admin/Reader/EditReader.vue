<template>
    <div class="flex h-screen w-full bg-gray-100">
        <div class="flex-1 flex flex-col overflow-hidden">
            <div class="min-h-screen bg-green-50 flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full space-y-4">
                    <div>
                        <h2 class="text-center text-3xl font-extrabold text-green-900">
                            Chỉnh sửa Độc Giả
                        </h2>
                        <p class="mt-2 text-center text-sm text-green-600">
                            Nhập thông tin chi tiết của độc giả
                        </p>
                    </div>
                    <ReaderForm :reader="reader" @submit:reader="updateReader" :isEditing="true" @cancel="cancelEdit" />
                    <p>{{ message }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ReaderForm from '@/components/ReaderForm.vue';
import ReaderService from '@/services/reader.service.js';
import { useRouter, useRoute } from 'vue-router';

export default {
    name: 'EditReader',
    components: {
        ReaderForm,
    },
    data() {
        return {
            reader: {
                MaDocGia: '',
                HoLot: '',
                Ten: '',
                NgaySinh: '',
                Phai: '',
                DiaChi: '',
                DienThoai: '',
            },
            message: '',
        };
    },
    methods: {
        async getReader(id) {
            try {
                const response = await ReaderService.getReader(id);
                this.reader = response;
                debugger;
                console.log(this.reader);
            } catch (error) {
                console.error('Error while getting reader:', error);
            }
        },
        async updateReader(updatedReader) {
            try {
                await ReaderService.updateReader( this.reader.MaDocGia,updatedReader);
                this.message = 'Cập nhật độc giả thành công!';
                this.$router.push({ name: 'Reader' }); // Điều hướng đến trang danh sách độc giả
            } catch (error) {
                console.error('Error while updating reader:', error);
                this.message = 'Lỗi: ' + (error.response?.data?.message || error.message);
            }
        },
        cancelEdit() {
            this.$router.push({ name: 'ReaderList' }); // Điều hướng đến trang danh sách độc giả
        },
    },
    mounted() {
        this.getReader(this.$route.params.id);
    },
};
</script>

<style scoped>
/* Thêm style của bạn ở đây */
</style>
