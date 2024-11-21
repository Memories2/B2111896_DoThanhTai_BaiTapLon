<template>
    <div class="flex h-screen w-full bg-gray-100">
        <div class="flex-1 flex flex-col overflow-hidden">
            <div class="min-h-screen bg-green-50 flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full space-y-4">
                    <div>
                        <h2 class="text-center text-3xl font-extrabold text-green-900">
                            Chỉnh Sửa Mượn Sách
                        </h2>
                        <p class="mt-2 text-center text-sm text-green-600">
                            Cập nhật thông tin mượn sách
                        </p>
                    </div>
                    <LendingForm 
                        :lending="lending"
                        @submit:lending="updateLending"
                        @cancel="cancelEditLending" 
                        :isEditing="true"
                    />
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
    props: {
        id: { type: String, required: true }
    },
    data() {
        return {
            lending: {
                MaDocGia: '',
                MaSach: '',
                NgayMuon: '',
                NgayTra: '', 
                TrangThai: ''
            },
            message: "",
        };
    },
    methods: {
        async getLending(id) {
            try {
                this.lending = await LendingService.getLending(id);
            } catch (error) {
                console.log(error);
                this.message = "Có lỗi xảy ra khi lấy thông tin mượn sách";
            }
        },
        async updateLending(lending) {
            try {
                await LendingService.updateLending(this.id, lending);
                // cập nhật lại trạng thái sách
                // Cập nhật sách với toàn bộ thông tin cũ và chỉ thay đổi trạng thái
                const book = await BookService.getBook(lending.MaSach);
                const updatedBook = {
                    ...book,  // giữ lại tất cả thông tin cũ
                    TrangThai: lending.TrangThai
                };
                //b2: cập nhật trạng thái sách
                await BookService.updateBook(lending.MaSach, updatedBook);
                this.message = "Cập nhật mượn sách thành công!";
                this.$router.push({ name: "Lending" });

            } catch (error) {
                console.log(error);
                this.message = "Có lỗi xảy ra khi cập nhật mượn sách";
            }
        },
        cancelEditLending() {
            this.$router.push({ name: "Lending" });
        },
    },
    created() {
        this.getLending(this.id);
    },
};
</script>
