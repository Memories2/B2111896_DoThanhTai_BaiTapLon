<template>
    <div class="flex h-screen w-full bg-gray-100">
        <Sidebar />
        <div class="flex-1 flex flex-col overflow-hidden">
            <div class="min-h-screen bg-green-50 flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full space-y-4">
                    <div>
                        <h2 class="text-center text-3xl font-extrabold text-green-900">
                            Thêm nhân viên
                        </h2>
                        <p class="mt-2 text-center text-sm text-green-600">
                            Nhập thông tin của nhân viên
                        </p>
                    </div>
                    <StaffForm :staff="{}" @submit:staff="addStaff" @cancel="cancelAddStaff" />
                    <p>{{ message }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import StaffForm from "@/components/StaffForm.vue";
import StaffService from "@/services/staff.service.js";

export default {
    components: {

        StaffForm,
    },
    data() {
        return {
            message: "",
        };
    },
    methods: {
        async addStaff(staff) {
            try {
                await StaffService.createStaff(staff);
                this.message = "Thêm nhân viên thành công !";
                this.$router.push({ name: "Staff" }); // Điều hướng đến danh sách  nhân viên
            } catch (error) {
                console.error(error);
                this.message = "Lỗi: " + error.response?.data?.message || error.message;
            }
        },
        cancelAddStaff() {
            this.$router.push({ name: "Dashboard" });
        },
    },
};


</script>