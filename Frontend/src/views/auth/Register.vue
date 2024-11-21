<template>
    <div class="min-h-screen w-full bg-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-green-900">
                    Đăng ký tài khoản
                </h2>
                <p class="mt-2 text-center text-sm text-green-600">
                    Đăng ký tài khoản để mượn sách
                </p>
            </div>

            <Form @submit="handleSubmit" :validation-schema="schema" v-slot="{ errors }">
                <div class="rounded-md shadow-sm space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Mật khẩu</label>
                        <Field name="Password" type="password"
                            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                            placeholder="Nhập mật khẩu" />
                        <ErrorMessage name="Password" class="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Họ lót</label>
                        <Field name="HoLot" type="text"
                            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                            placeholder="Nhập họ lót" />
                        <ErrorMessage name="HoLot" class="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Tên</label>
                        <Field name="Ten" type="text"
                            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                            placeholder="Nhập tên" />
                        <ErrorMessage name="Ten" class="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Ngày sinh</label>
                        <Field name="NgaySinh" type="date"
                            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" />
                        <ErrorMessage name="NgaySinh" class="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Giới tính</label>
                        <Field as="select" name="Phai"
                            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm">
                            <option value="">Chọn giới tính</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </Field>
                        <ErrorMessage name="Phai" class="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Địa chỉ</label>
                        <Field name="DiaChi" type="text"
                            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                            placeholder="Nhập địa chỉ" />
                        <ErrorMessage name="DiaChi" class="text-red-500 text-xs mt-1" />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Điện thoại</label>
                        <Field name="DienThoai" type="text"
                            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                            placeholder="Nhập số điện thoại" />
                        <ErrorMessage name="DienThoai" class="text-red-500 text-xs mt-1" />
                    </div>
                </div>

                <div class="mt-6">
                    <button type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Đăng ký
                    </button>
                </div>
            </Form>

            <!-- Modal thông báo đăng ký thành công -->
            <div v-if="showSuccessModal"
                class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                <div class="relative bg-white rounded-lg p-8 max-w-md mx-auto">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Đăng ký thành công!</h3>
                    <p class="text-sm text-gray-500 mb-4">
                        Mã độc giả của bạn là: <span class="font-bold text-green-600">{{ readerCode }}</span>
                    </p>
                    <p class="text-sm text-gray-500 mb-6">
                        Vui lòng lưu lại mã này để đăng nhập vào hệ thống.
                    </p>
                    <div class="flex justify-end">
                        <button @click="goToLogin"
                            class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                            Đăng nhập ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '@/services/auth.service';

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup() {
        const router = useRouter();
        const showSuccessModal = ref(false);
        const readerCode = ref('');

        const schema = yup.object().shape({
            Password: yup.string()
                .required('Vui lòng nhập mật khẩu')
                .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
            HoLot: yup.string()
                .required('Vui lòng nhập họ lót')
                .matches(/^[a-zA-ZÀ-ỹ\s]+$/, 'Họ lót chỉ được chứa chữ cái và khoảng trắng'),
            Ten: yup.string()
                .required('Vui lòng nhập tên')
                .matches(/^[a-zA-ZÀ-ỹ\s]+$/, 'Tên chỉ được chứa ch��� cái và khoảng trắng'),
            NgaySinh: yup.date()
                .required('Vui lòng chọn ngày sinh')
                .max(new Date(), 'Ngày sinh không hợp lệ'),
            Phai: yup.string()
                .required('Vui lòng chọn giới tính'),
            DiaChi: yup.string()
                .required('Vui lòng nhập địa chỉ')
                .min(5, 'Địa chỉ phải có ít nhất 5 ký tự'),
            DienThoai: yup.string()
                .required('Vui lòng nhập số điện thoại')
                .matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, 'Số điện thoại không hợp lệ'),
        });

        const handleSubmit = async (values) => {
            try {
                const response = await AuthService.register(values);
                readerCode.value = response.MaDocGia;
                showSuccessModal.value = true;
            } catch (error) {
                console.error('Lỗi đăng ký:', error);
                alert(error.response?.data?.message || 'Đăng ký thất bại');
            }
        };

        const goToLogin = () => {
            router.push('/login');
        };

        return {
            schema,
            handleSubmit,
            showSuccessModal,
            readerCode,
            goToLogin,
        };
    },
};
</script> 