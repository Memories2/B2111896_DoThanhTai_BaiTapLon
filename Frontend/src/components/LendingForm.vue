<template>
    <Form @submit="handleSubmit" :validation-schema="contactFormSchema" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm space-y-4">
            <div v-if="isEditing">
                <label for="MaMuonSach" class="block text-sm font-medium text-gray-700">Mã Mượn Sách</label>
                <Field name="MaMuonSach" type="text" v-model="lendingLocal.MaMuonSach" readonly
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" />
                <ErrorMessage name="MaMuonSach" class="text-red-500 text-sm" />
            </div>
            <div v-if="isEditing">
                <label for="MaDocGia" class="block text-sm font-medium text-gray-700">Mã Độc Giả</label>
                <Field name="MaDocGia" type="text" v-model="lendingLocal.MaDocGia" readonly
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" />
                <ErrorMessage name="MaDocGia" class="text-red-500 text-sm" />
            </div>
            <div v-if="isEditing">
                <label for="MaSach" class="block text-sm font-medium text-gray-700">Mã Sách</label>
                <Field name="MaSach" type="text" v-model="lendingLocal.MaSach" readonly
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" />
                <ErrorMessage name="MaSach" class="text-red-500 text-sm" />
            </div>
            <div v-if="!isEditing">
                <label for="MaDocGia" class="block text-sm font-medium text-gray-700">Mã Độc Giả</label>
                <Field name="MaDocGia" type="text" placeholder="Nhập mã độc giả"
                    :readonly="isReader"
                    :class="[
                        'appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm',
                        { 'bg-gray-100': isReader }
                    ]"
                    v-model="lendingLocal.MaDocGia" />
                <ErrorMessage name="MaDocGia" class="text-red-500 text-sm" />
            </div>
            <div v-if="!isEditing">
                <label for="MaSach" class="block text-sm font-medium text-gray-700">Mã Sách</label>
                <Field name="MaSach" type="text" placeholder="Nhập mã sách"
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    v-model="lendingLocal.MaSach" />
                <ErrorMessage name="MaSach" class="text-red-500 text-sm" />
            </div>
            <div>
                <label for="NgayMuon" class="block text-sm font-medium text-gray-700">Ngày Mượn</label>
                <Field name="NgayMuon" type="date"
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    v-model="lendingLocal.NgayMuon" />
                <ErrorMessage name="NgayMuon" class="text-red-500 text-sm" />
            </div>
            <div>
                <label for="NgayTra" class="block text-sm font-medium text-gray-700">Ngày Trả</label>
                <Field name="NgayTra" type="date"
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    v-model="lendingLocal.NgayTra" />
                <ErrorMessage name="NgayTra" class="text-red-500 text-sm" />
            </div>
            <div>
                <label for="TrangThai" class="block text-sm font-medium text-gray-700">Trạng Thái</label>
                <Field as="select" name="TrangThai"
                    :disabled="isReader"
                    :class="[
                        'appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm',
                        { 'bg-gray-100': isReader }
                    ]"
                    v-model="lendingLocal.TrangThai">
                    <option value="" disabled>Chọn trạng thái</option>
                    <option value="Đăng Ký">Đăng Ký</option>
                    <option value="Đang mượn">Đang mượn</option>
                    <option value="Đã trả">Đã trả</option>
                    <option value="Quá hạn">Quá hạn</option>
                </Field>
                <ErrorMessage name="TrangThai" class="text-red-500 text-sm" />
            </div>
        </div>
        <div class="flex justify-between">
            <button type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Lưu
            </button>
            <button type="button" @click="cancel"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Hủy
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import AuthService from "@/services/auth.service";

export default {
    name: 'LendingForm',
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        lending: {
            type: Object,
            default: () => ({
                MaMuonSach: '',
                MaDocGia: '',
                MaSach: '',
                NgayMuon: '',
                NgayTra: '',
                TrangThai: '',
            }),
        },
        isEditing: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['submit:lending', 'cancel'],
    data() {
        const contactFormSchema = yup.object().shape({
            MaDocGia: yup
                .string()
                .required("Mã độc giả không được để trống"),
            MaSach: yup
                .string()
                .required("Mã sách không được để trống"),
            NgayMuon: yup
                .date()
                .required("Ngày mượn không được để trống")
                .max(new Date(), "Ngày mượn không được lớn hơn ngày hiện tại"),
            NgayTra: yup
                .date()
                .required("Ngày trả không được để trống")
                .min(yup.ref('NgayMuon'), "Ngày trả phải sau ngày mượn"),
            TrangThai: yup
                .string()
                .required("Trạng thái không được để trống"),
        });

        return {
            lendingLocal: { ...this.lending },
            contactFormSchema,
            isReader: false,
            currentUser: null,
        };
    },
    created() {
        this.checkUserRole();
    },
    watch: {
        lending: {
            handler(newLending) {
                this.lendingLocal = { ...newLending };
                if (this.isReader && !this.isEditing) {
                    this.lendingLocal.TrangThai = "Đăng Ký";
                }
            },
            deep: true,
        },
    },
    methods: {
        checkUserRole() {
            this.currentUser = AuthService.getCurrentUser();
            this.isReader = this.currentUser && this.currentUser.MaDocGia ? true : false;
            
            if (this.isReader) {
                this.lendingLocal.MaDocGia = this.currentUser.MaDocGia;
                if (!this.isEditing) {
                    this.lendingLocal.TrangThai = "Đăng Ký";
                }
            }
        },
        async handleSubmit() {
            try {
                Object.keys(this.lendingLocal).forEach(key => { // Lặp qua tất cả các thuộc tính của lendingLocal  
                    if (typeof this.lendingLocal[key] === 'string') { // Kiểm tra nếu thuộc tính là string
                        this.lendingLocal[key] = this.lendingLocal[key].trim(); // Loại bỏ khoảng trắng ở đầu và cuối
                    }
                });

                this.$emit('submit:lending', this.lendingLocal);
            } catch (error) {
                console.error('Lỗi khi submit form:', error);
            }
        },
        cancel() {
            this.lendingLocal = { ...this.lending };
            this.$emit('cancel');
        },
    },
};
</script>

<style scoped>
.error-feedback {
    color: red;
    font-size: 0.875rem;
}

/* Thêm style để làm rõ trạng thái disabled */
select:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}
</style>