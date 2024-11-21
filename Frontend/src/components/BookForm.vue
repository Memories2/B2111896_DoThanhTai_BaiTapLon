<template>
    <Form @submit="handleSubmit" :validation-schema="bookFormSchema" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm space-y-4">
            <div v-if="isEditing">
                <label for="MaSach" class="block text-sm font-medium text-gray-700">Mã Sách</label>
                <Field name="MaSach" type="text" v-model="bookLocal.MaSach" readonly
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" />
                <ErrorMessage name="MaSach" class="text-red-500 text-sm" />
            </div>

            <div>
                <label for="TenSach" class="block text-sm font-medium text-gray-700">Tên Sách</label>
                <Field name="TenSach" type="text" placeholder="Nhập tên sách"
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    v-model="bookLocal.TenSach" />
                <ErrorMessage name="TenSach" class="text-red-500 text-sm" />
            </div>

            <div>
                <label for="DonGia" class="block text-sm font-medium text-gray-700">Đơn Giá</label>
                <Field name="DonGia" type="number" placeholder="Nhập đơn giá"
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    v-model="bookLocal.DonGia" />
                <ErrorMessage name="DonGia" class="text-red-500 text-sm" />
            </div>

            <div>
                <label for="NamXuatBan" class="block text-sm font-medium text-gray-700">Năm Xuất Bản</label>
                <Field name="NamXuatBan" type="number" placeholder="Nhập năm xuất bản"
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    v-model="bookLocal.NamXuatBan" />
                <ErrorMessage name="NamXuatBan" class="text-red-500 text-sm" />
            </div>

            <div>
                <label for="MaNhaXuatBan" class="block text-sm font-medium text-gray-700">Nhà Xuất Bản</label>
                <Field as="select" name="MaNhaXuatBan"
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    v-model="bookLocal.MaNhaXuatBan">
                    <option value="" disabled>Chọn nhà xuất bản</option>
                    <option v-for="publisher in publishers" :key="publisher.MaNhaXB" :value="publisher.MaNhaXB">
                        {{ publisher.TenNhaXB }}
                    </option>
                </Field>
                <ErrorMessage name="MaNhaXuatBan" class="text-red-500 text-sm" />
            </div>

            <div>
                <label for="TacGia" class="block text-sm font-medium text-gray-700">Tác Giả</label>
                <Field name="TacGia" type="text" placeholder="Nhập tên tác giả"
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    v-model="bookLocal.TacGia" />
                <ErrorMessage name="TacGia" class="text-red-500 text-sm" />
            </div>

            <div>
                <label for="TrangThai" class="block text-sm font-medium text-gray-700">Trạng Thái</label>
                <Field as="select" name="TrangThai"
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    v-model="bookLocal.TrangThai">
                    <option value="" disabled>Chọn trạng thái</option>
                    <option value="Còn">Còn</option>
                    <option value="Đã mượn">Đã mượn</option>
                    <option value="Mất">Mất</option>
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

export default {
    name: 'BookForm',
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        book: {
            type: Object,
            default: () => ({
                MaSach: '',
                TenSach: '',
                DonGia: '',
                NamXuatBan: '',
                MaNhaXuatBan: '',
                TacGia: '',
                TrangThai: 'Còn',
            }),
        },
        isEditing: {
            type: Boolean,
            default: false,
        },
        publishers: {
            type: Array,
            default: () => [],
        },
    },
    emits: ['submit:book', 'cancel'],
    data() {
        const bookFormSchema = yup.object().shape({
            TenSach: yup
                .string()
                .required("Tên sách không được để trống"),
            DonGia: yup
                .number()
                .required("Đơn giá không được để trống")
                .positive("Đơn giá phải là số dương"),
            NamXuatBan: yup
                .number()
                .required("Năm xuất bản không được để trống")
                .min(1900, "Năm xuất bản không hợp lệ")
                .max(new Date().getFullYear(), "Năm xuất bản không được lớn hơn năm hiện tại"),
            MaNhaXuatBan: yup
                .string()
                .required("Nhà xuất bản không được để trống"),
            TacGia: yup
                .string()
                .required("Tác giả không được để trống"),
            TrangThai: yup
                .string()
                .required("Trạng thái không được để trống"),
        });

        return {
            bookLocal: { ...this.book },
            bookFormSchema,
        };
    },
    watch: {
        book: {
            handler(newBook) {
                this.bookLocal = { ...newBook };
            },
            deep: true,
        },
    },
    methods: {
        async handleSubmit() {
            try {
                Object.keys(this.bookLocal).forEach(key => {
                    if (typeof this.bookLocal[key] === 'string') {
                        this.bookLocal[key] = this.bookLocal[key].trim();
                    }
                });

                this.$emit('submit:book', this.bookLocal);
            } catch (error) {
                console.error('Lỗi khi submit form:', error);
            }
        },
        cancel() {
            this.bookLocal = { ...this.book };
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
</style>
