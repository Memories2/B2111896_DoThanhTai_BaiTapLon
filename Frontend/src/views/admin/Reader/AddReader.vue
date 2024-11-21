<template>
    <div class="flex h-screen w-full bg-gray-100">
        <!-- <Sidebar /> -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <div class="min-h-screen bg-green-50 flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full space-y-4">
                    <div>
                        <h2 class="text-center text-3xl font-extrabold text-green-900">
                            Thêm Độc Giả
                        </h2>
                        <p class="mt-2 text-center text-sm text-green-600">
                            Nhập thông tin của độc giả
                        </p>
                    </div>
                    <ReaderForm
                    :reader="{}"
                     @submit:reader="addReader"
                      @cancel="cancelAddReader" />
                    <p>{{ message }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ReaderForm from "@/components/ReaderForm.vue";
import ReaderService from "@/services/reader.service.js";

export default {
    components: {
        //Sidebar,
        ReaderForm,
    },
    data() {
        return {
            message: "",
        };
    },
    methods: {
        async addReader(reader) {
            try {
                await ReaderService.createReader(reader);
                this.message = "Thêm độc giả thành công!";
                this.$router.push({ name: "Reader" }); // Điều hướng đến danh sách độc giả
            } catch (error) {
                console.error(error);
                this.message = "Lỗi: " + error.response?.data?.message || error.message;
            }
        },
        cancelAddReader() {
            this.$router.push({ name: "Dashboard" });
        },
    },
};


</script>