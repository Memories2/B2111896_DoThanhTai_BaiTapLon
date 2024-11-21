<template>
    <Form @submit="handleSubmit" :validation-schema="contactFormSchema" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm space-y-4">
            <div v-if="isEditing">
                <label for="MSNV" class="block text-sm font-medium text-gray-700">Mã Nhân Viên</label>
                <Field name="MSNV" type="text" v-model="staffLocal.MSNV" readonly
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" />
                <ErrorMessage name="MSNV" class="text-red-500 text-sm" />
            </div>
            <div>
                <label for="HoTenNV" class="block text-sm font-medium text-gray-700">Họ Tên Nhân Viên</label>
                <Field 
                    name="HoTenNV" 
                    type="text"
                    placeholder="Nhập họ tên nhân viên"
                    aria-label="Họ Tên Nhân Viên"
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    v-model="staffLocal.HoTenNV" 
                />
                <ErrorMessage name="HoTenNV" class="text-red-500 text-sm" />
            </div>
            <div v-if="!isEditing">
                <label for="Password" class="block text-sm font-medium text-gray-700">Mật khẩu</label>
                <Field 
                    name="Password" 
                    type="password" 
                    placeholder="Nhập mật khẩu"
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    v-model="staffLocal.Password" 
                />
                <ErrorMessage name="Password" class="text-red-500 text-sm" />
            </div>
            <div>
                <label for="ChucVu" class="block text-sm font-medium text-gray-700">Chức vụ</label>
                <Field
                    as="select"
                    name="ChucVu"
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    v-model="staffLocal.ChucVu"
                >
                    <option value="" disabled>Chọn chức vụ</option>
                    <option value="Admin">Admin</option>
                    <option value="Staff">Staff</option>
                </Field>
                <ErrorMessage name="ChucVu" class="text-red-500 text-sm" />
            </div>
            <div>
                <label for="DiaChi" class="block text-sm font-medium text-gray-700">Địa Chỉ</label>
                <Field name="DiaChi" type="text"
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    v-model="staffLocal.DiaChi" />
                <ErrorMessage name="DiaChi" class="text-red-500 text-sm" />
            </div>
            <div>
                <label for="SoDienThoai" class="block text-sm font-medium text-gray-700">Điện Thoại</label>
                <Field name="SoDienThoai" type="text"
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    v-model="staffLocal.SoDienThoai" />
                <ErrorMessage name="SoDienThoai" class="text-red-500 text-sm" />
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
    name: 'StaffForm',
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        staff: {
            type: Object,
            default: () => ({
                MSNV: '',
                HoTenNV: '',
                Password: '',
                ChucVu: '',
                DiaChi: '',
                SoDienThoai: '',
            }),
        },
        isEditing: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['submit:staff', 'cancel'],
    data() {
        const contactFormSchema = yup.object().shape({
            HoTenNV: yup
                .string()
                .required("Họ tên nhân viên không được để trống")
                .min(2, "Họ tên phải có ít nhất 2 ký tự")
                .matches(/^[a-zA-ZÀ-ỹ\s]+$/, "Họ tên chỉ được chứa chữ cái và khoảng trắng"),
            Password: yup.string().required("Mật khẩu không được để trống"),
            ChucVu: yup
                .string()
                .required("Chức vụ không được để trống")
                .min(2, "Chức vụ phải có ít nhất 2 ký tự"),
            DiaChi: yup
                .string()
                .required("Địa chỉ không được để trống")
                .min(5, "Địa chỉ phải có ít nhất 5 ký tự"),
            SoDienThoai: yup
                .string()
                .required("Số điện thoại không được để trống")
                .matches(
                    /^(0[3|5|7|8|9])+([0-9]{8})$/,
                    "Số điện thoại không hợp lệ (phải bắt đầu bằng 03, 05, 07, 08, 09 và có 10 số)"
                ),
        });

        return {
            staffLocal: { ...this.staff },
            contactFormSchema,
        };
    },
    watch: {
        // Theo dõi sự thay đổi của prop 'staff'
        staff: {
            // Hàm handler sẽ được gọi khi giá trị của 'staff' thay đổi
            handler(newReader) {
                // Cập nhật giá trị của 'staffLocal' bằng cách sao chép tất cả các thuộc tính từ 'newReader'
                this.staffLocal = { ...newReader };
            },
            // Theo dõi sự thay đổi sâu bên trong đối tượng 'staff'
            deep: true,
        },
    },
    methods: {
        async handleSubmit() {
            try {
                // Trim tất cả các giá trị string
                Object.keys(this.staffLocal).forEach(key => { // Lặp qua tất cả các thuộc tính của staffLocal
                    if (typeof this.staffLocal[key] === 'string') { // Kiểm tra nếu thuộc tính là string
                        this.staffLocal[key] = this.staffLocal[key].trim(); // Loại bỏ khoảng trắng ở đầu và cuối
                    }
                });
                this.$emit('submit:staff', this.staffLocal);
            } catch (error) {
                console.error('Lỗi khi submit form:', error);
                // Có thể thêm xử lý hiển thị thông báo lỗi ở đây
            }
        },
        cancel() {
            // Reset form về giá trị ban đầu trước khi cancel
            this.staffLocal = { ...this.staff };
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