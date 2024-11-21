<template>
    <div class="flex h-screen w-full bg-gray-100">
        <Sidebar />
        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                <div class="container mx-auto px-6 py-8">
                    <!-- Staffs Management -->
                    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div class="p-4 flex justify-between items-center space-x-4">
                            <input type="text" placeholder="Tìm Nhân Viên..."
                                class="flex-grow p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" />
                            <router-link :to="{ name: 'AddStaff' }">
                                <button
                                    class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Thêm Nhân Viên
                                </button>
                            </router-link>
                        </div>
                        <div class="mt-4">

                            <table class="min-w-full bg-white">
                                <thead class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                    <tr>
                                        <th class="py-3 px-6 text-left">Mã Nhân Viên</th>
                                        <th class="py-3 px-6 text-left">Họ Tên Nhân Viên</th>
                                        <th class="py-3 px-6 text-left">Chức Vụ</th>
                                        <th class="py-3 px-6 text-left">Địa chỉ</th>
                                        <th class="py-3 px-6 text-left">Số Điện Thoại</th>
                                        <th class="py-3 px-6 text-left"></th>
                                    </tr>
                                </thead>

                                <tbody class="text-gray-600 text-sm font-light">

                                    <tr v-if="staffs.length === 0">
                                        <td class="py-3 px-6 text-left whitespace-nowrap" colspan="8">
                                            <h2>Không có dữ liệu</h2>
                                        </td>
                                    </tr>

                                    <tr v-for="staff in staffs" :key="staff._id"
                                        class="border-b border-gray-200 hover:bg-gray-100">
                                        <td class="py-3 px-6 text-left whitespace-nowrap">
                                            {{ staff.MSNV }}
                                        </td>
                                        <td class="py-3 px-6 text-left">{{ staff.HoTenNV }}</td>
                                        <td class="py-3 px-6 text-left">{{ staff.ChucVu }}</td>
                                        <td class="py-3 px-6 text-left">{{ staff.DiaChi }}</td>
                                        <td class="py-3 px-6 text-left">{{ staff.SoDienThoai }}</td>

                                        <td class="py-3 px-6 text-left">
                                            <div class="flex items-center space-x-2">

                                                <button @click="editStaff(staff.MSNV)"
                                                    class="text-blue-600 hover:text-blue-900">
                                                    <PencilIcon class="h-5 w-5" />
                                                </button>

                                                <button @click="deleteStaff(staff.MSNV)"
                                                    class="text-red-600 hover:text-red-900">
                                                    <TrashIcon class="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script>

import { PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";
import staffService from "@/services/staff.service";
import { useRouter } from "vue-router";

export default {
    name: "Staff",
    components: {
        PencilIcon,
        TrashIcon,
    },
    props: {
        activeSection: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            staffs: [],
        };
    },
    methods: {
        async getAllStaff() {
            try {
                this.staffs = await staffService.getAllStaffs();
            } catch (error) {
                console.error("Error while getting staffs:", error);
            }
        },

        async editStaff(staffId) {
            this.$router.push({ name: "EditStaff", params: { id: staffId } });
        },
        async deleteStaff(staffId) {
            try {
                if (window.confirm("Bạn có chắc muốn xóa nhân viên này?")) {
                    await staffService.deleteStaff(staffId);
                    this.staffs = this.staffs.filter((staff) => staff.MSNV !== staffId);
                    alert("Xóa nhân viên thành công!");
                }
            } catch (error) {
                console.log("Error while deleting staff:", error);
                alert("Có lỗi xảy ra khi xóa nhân viên!");
            }
        },
    },
    mounted() {
        this.getAllStaff();
    },
};
</script>
