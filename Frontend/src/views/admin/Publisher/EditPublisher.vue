<template>
    <div class="flex h-screen w-full bg-gray-100">
        <div class="flex-1 flex flex-col overflow-hidden">
            <div class="min-h-screen bg-green-50 flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full space-y-4">
                    <div>
                        <h2 class="text-center text-3xl font-extrabold text-green-900">
                            Chỉnh Sửa Nhà Xuất Bản
                        </h2>
                        <p class="mt-2 text-center text-sm text-green-600">
                            Cập nhật thông tin nhà xuất bản
                        </p>
                    </div>
                    <PublisherForm v-if="publisher" :publisher="publisher" @submit:publisher="updatePublisher"
                        @cancel="cancelEditPublisher" :isEditing="true" />
                    <p>{{ message }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PublisherForm from "@/components/PublisherForm.vue";
import PublisherService from "@/services/publisher.service.js";

export default {
    components: {
        PublisherForm,
    },
    props: {
        id: { type: String, required: true }
    },
    data() {
        return {
            publisher: null,
            message: "",
        };
    },
    methods: {
        async getPublisher(id) {
            try {
                this.publisher = await PublisherService.getPublisher(id);
            } catch (error) {
                console.log(error);
                this.message = "Có lỗi xảy ra khi lấy thông tin nhà xuất bản";
            }
        },
        async updatePublisher(data) {
            try {
                await PublisherService.updatePublisher(this.publisher.MaNhaXB, data);
                this.message = "Cập nhật nhà xuất bản thành công!";
                this.$router.push({ name: "Publisher" });
            } catch (error) {
                console.log(error);
                this.message = "Có lỗi xảy ra khi cập nhật nhà xuất bản";
            }
        },
        cancelEditPublisher() {
            this.$router.push({ name: "Publisher" });
        },
    },
    mounted() {
        this.getPublisher(this.id);
    },
};
</script>