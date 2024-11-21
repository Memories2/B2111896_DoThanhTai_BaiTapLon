<template>
    <div class="flex h-screen w-full bg-gray-100">
        <div class="flex-1 flex flex-col overflow-hidden">
            <div class="min-h-screen bg-green-50 flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full space-y-4">
                    <div>
                        <h2 class="text-center text-3xl font-extrabold text-green-900">
                            Đăng Ký Mượn Sách
                        </h2>
                        <p class="mt-2 text-center text-sm text-green-600">
                            Nhập thông tin mượn sách
                        </p>
                    </div>
                    <LendingForm :lending="{}" @submit:lending="addLending" @cancel="cancelAddLending" />
                    <p>{{ message }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LendingForm from "@/components/LendingForm.vue";
import LendingService from "@/services/lending.service.js";
import BookService from "@/services/book.service.js";

export default {
    components: {
        LendingForm,
    },
    data() {
        return {
            message: "",
        };
    },
    methods: {
        async addLending(lending) {
            try {
                // Kiểm tra số lượng sách đang mượn
                const currentLendings = await LendingService.getLendingsByReaderId(lending.MaDocGia);
                if (currentLendings.length >= 5) {
                    this.message = "Bạn không thể mượn quá 5 quyển sách cùng lúc.";
                    return;
                }

                // Kiểm tra tình trạng sách
                const book = await BookService.getBook(lending.MaSach);
                if (!book) {
                    this.message = "Sách không tồn tại.";
                    return;
                }

                if (book.TrangThai !== "Còn") {
                    this.message = "Sách này hiện không khả dụng để mượn.";
                    return;
                }

                // Tạo bản ghi mượn sách mới
                await LendingService.createLending(lending);
                this.message = "Đăng ký mượn sách thành công!";

                // Cập nhật sách với toàn bộ thông tin cũ và chỉ thay đổi trạng thái
                const updatedBook = {
                    ...book,  // giữ lại tất cả thông tin cũ
                    TrangThai: "Đăng Ký"
                };
                //b2: cập nhật trạng thái sách
                await BookService.updateBook(lending.MaSach, updatedBook);
                this.$router.push({ name: "Lending" });
            } catch (error) {
                console.error(error);
                this.message = "Lỗi: " + error.response?.data?.message || error.message;
            }
        },
        cancelAddLending() {
            this.$router.push({ name: "Lending" });
        },
    },
};
</script>