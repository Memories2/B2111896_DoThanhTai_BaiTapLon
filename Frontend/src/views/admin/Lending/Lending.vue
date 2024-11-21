<template>
    <div class="flex h-screen w-full bg-gray-100">
        <Sidebar />
        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                <div class="container mx-auto px-6 py-8">
                    <!-- Lending Management -->
                    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div class="p-4 flex justify-between items-center space-x-4">
                            <input type="text" placeholder="Tìm kiếm mượn sách..."
                                class="flex-grow p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" />
                            <router-link  :to="{ name: 'AddLending' }">
                                <button
                                    class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Thêm Mượn Sách
                                </button>
                            </router-link>
                        </div>
                        <div class="mt-4">
                            <table class="min-w-full bg-white">
                                <thead class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                    <tr>
                                        <th class="py-3 px-6 text-left">Mã Mượn Sách</th>
                                        <th class="py-3 px-6 text-left">Mã Độc Giả</th>
                                        <th class="py-3 px-6 text-left">Mã Sách</th>
                                        <th class="py-3 px-6 text-left">Ngày Mượn</th>
                                        <th class="py-3 px-6 text-left">Ngày Trả</th>
                                        <th class="py-3 px-6 text-left">Trạng Thái</th>
                                        <th class="py-3 px-6 text-left"></th>
                                    </tr>
                                </thead>

                                <tbody class="text-gray-600 text-sm font-light">
                                    <tr v-if="lendings.length === 0">
                                        <td class="py-3 px-6 text-left whitespace-nowrap" colspan="7">
                                            <h2>Không có dữ liệu</h2>
                                        </td>
                                    </tr>

                                    <tr v-for="lending in lendings" :key="lending.MaMuonSach"
                                        class="border-b border-gray-200 hover:bg-gray-100">
                                        <td class="py-3 px-6 text-left whitespace-nowrap">
                                            {{ lending.MaMuonSach }}
                                        </td>
                                        <td class="py-3 px-6 text-left">{{ lending.MaDocGia }}</td>
                                        <td class="py-3 px-6 text-left">{{ lending.MaSach }}</td>
                                        <td class="py-3 px-6 text-left">{{ formatDate(lending.NgayMuon) }}</td>
                                        <td class="py-3 px-6 text-left">{{ formatDate(lending.NgayTra) }}</td>
                                        <td class="py-3 px-6 text-left">
                                            <span :class="getStatusClass(lending.TrangThai)">
                                                {{ lending.TrangThai }}
                                            </span>
                                        </td>
                                        <td class="py-3 px-6 text-left">
                                            <div class="flex items-center space-x-2">
                                                <template v-if="!isReader">
                                                    <button @click="editLending(lending.MaMuonSach)"
                                                        class="text-blue-600 hover:text-blue-900">
                                                        <PencilIcon class="h-5 w-5" />
                                                    </button>
                                                    <button @click="deleteLending(lending.MaMuonSach)"
                                                        class="text-red-600 hover:text-red-900">
                                                        <TrashIcon class="h-5 w-5" />
                                                    </button>
                                                </template>
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
import lendingService from "@/services/lending.service";
import AuthService from "@/services/auth.service";

export default {
    name: "Lending",
    components: {
        PencilIcon,
        TrashIcon,
    },
    data() {
        return {
            lendings: [],
            searchQuery: "",
            isReader: false,
            currentUser: null,
        };
    },
    methods: {
        checkUserRole() {
            this.currentUser = AuthService.getCurrentUser();
            this.isReader = this.currentUser && this.currentUser.MaDocGia ? true : false;
        },

        async getAllLendings() {
            try {
                if (this.isReader) {
                    this.lendings = await lendingService.getLendingsByReaderId(this.currentUser.MaDocGia);
                } else {
                    this.lendings = await lendingService.getAllLendings();
                }
                console.log("Danh sách mượn sách:", this.lendings);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách mượn sách:", error);
                alert("Có lỗi xảy ra khi tải danh sách mượn sách!");
            }
        },

        async editLending(lendingId) {
            this.$router.push({ name: "EditLending", params: { id: lendingId } });
        },

        async deleteLending(lendingId) {
            try {
                if (window.confirm("Bạn có chắc muốn xóa bản ghi mượn sách này?")) {
                    await lendingService.deleteLending(lendingId);
                    this.lendings = this.lendings.filter(
                        (lending) => lending.MaMuonSach !== lendingId
                    );
                }
            } catch (error) {
                console.error("Lỗi khi xóa bản ghi mượn sách:", error);
            }
        },

        formatDate(dateString) {
            if (!dateString) return "";
            const date = new Date(dateString);
            return date.toLocaleDateString('vi-VN');
        },

        getStatusClass(status) {
            switch (status) {
                case 'Đang mượn':
                    return 'px-2 py-1 rounded-full bg-blue-100 text-blue-800';
                case 'Đã trả':
                    return 'px-2 py-1 rounded-full bg-green-100 text-green-800';
                case 'Quá hạn':
                    return 'px-2 py-1 rounded-full bg-red-100 text-red-800';
                default:
                    return 'px-2 py-1 rounded-full bg-gray-100 text-gray-800';
            }
        }
    },
    mounted() {
        this.checkUserRole();
        this.getAllLendings();
    },
};
</script>

<style scoped>
.status-badge {
    @apply px-2 py-1 rounded-full text-sm font-medium;
}
</style>