<template>
    <div class="min-h-screen w-full bg-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-green-900">
                    Đăng nhập
                </h2>
                <p class="mt-2 text-center text-sm text-green-600">
                    Quản lý mượn trả sách
                </p>
            </div>

            <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
                <div class="rounded-md shadow-sm space-y-4">
                    <div>
                        <label for="taikhoan" class="block text-sm font-medium text-gray-700">Mã số</label>
                        <input v-model="taikhoan" id="taikhoan" name="taikhoan" type="text" required
                            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                            placeholder="Nhập READER-xxx hoặc STAFF-xxx" />
                    </div>
                    <div>
                        <label for="matkhau" class="block text-sm font-medium text-gray-700">Mật khẩu</label>
                        <input v-model="matkhau" id="matkhau" name="matkhau" type="password" required
                            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                            placeholder="Nhập mật khẩu" />
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Đăng nhập
                    </button>
                </div>
                <div class="text-center mt-4">
                    <router-link to="/register" class="text-green-600 hover:text-green-700">
                        Chưa có tài khoản? Đăng ký ngay
                    </router-link>
                </div>
                <div v-if="error" class="text-red-500 text-center">
                    {{ error }}
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '@/services/auth.service';

export default {
    setup() {
        const router = useRouter();
        const taikhoan = ref('');
        const matkhau = ref('');
        const error = ref('');

        const handleLogin = async () => {
            try {
                const response = await AuthService.login({
                    taikhoan: taikhoan.value,
                    matkhau: matkhau.value
                });

                if (response === 'Invalid username or password') {
                    error.value = 'Tài khoản hoặc mật khẩu không đúng';
                    return;
                }

                localStorage.setItem('user', JSON.stringify(response));

                // Kiểm tra loại tài khoản và chuyển hướng
                if (taikhoan.value.startsWith('STAFF-')) {
                    router.push({ name: 'Dashboard' });
                } else if (taikhoan.value.startsWith('READER-')) {
                    router.push({ name: 'Dashboard' });
                }
            } catch (err) {
                error.value = 'Đăng nhập thất bại';
                console.error(err);
            }
        };

        return {
            taikhoan,
            matkhau,
            error,
            handleLogin
        };
    }
};
</script>
