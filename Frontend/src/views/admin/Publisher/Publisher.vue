<template>
    <div class="flex h-screen w-full bg-gray-100">
        <Sidebar />
        <div class="flex-1 flex flex-col overflow-hidden">
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                <div class="container mx-auto px-6 py-8">
                    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div class="p-4 flex justify-between items-center space-x-4">
                            <input type="text" placeholder="Tìm kiếm nhà xuất bản..."
                                class="flex-grow p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" />
                            <router-link :to="{ name: 'AddPublisher' }">
                                <button
                                    class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Thêm Nhà Xuất Bản
                                </button>
                            </router-link>
                        </div>
                        <div class="mt-4">
                            <table class="min-w-full bg-white">
                                <thead class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                    <tr>
                                        <th class="py-3 px-6 text-left">Mã Nhà XB</th>
                                        <th class="py-3 px-6 text-left">Tên Nhà XB</th>
                                        <th class="py-3 px-6 text-left">Địa Chỉ</th>
                                        <th class="py-3 px-6 text-left"></th>
                                    </tr>
                                </thead>

                                <tbody class="text-gray-600 text-sm font-light">
                                    <tr v-if="publishers.length === 0">
                                        <td class="py-3 px-6 text-left whitespace-nowrap" colspan="4">
                                            <h2>Không có dữ liệu</h2>
                                        </td>
                                    </tr>

                                    <tr v-for="publisher in publishers" :key="publisher.MaNhaXB"
                                        class="border-b border-gray-200 hover:bg-gray-100">
                                        <td class="py-3 px-6 text-left whitespace-nowrap">
                                            {{ publisher.MaNhaXB }}
                                        </td>
                                        <td class="py-3 px-6 text-left">{{ publisher.TenNhaXB }}</td>
                                        <td class="py-3 px-6 text-left">{{ publisher.DiaChi }}</td>
                                        <td class="py-3 px-6 text-left">
                                            <div class="flex items-center space-x-2">
                                                <button @click="editPublisher(publisher.MaNhaXB)"
                                                    class="text-blue-600 hover:text-blue-900">
                                                    <PencilIcon class="h-5 w-5" />
                                                </button>

                                                <button @click="deletePublisher(publisher.MaNhaXB)"
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
import publisherService from "@/services/publisher.service";

export default {
    name: "Publisher",
    components: {
        PencilIcon,
        TrashIcon,
    },
    data() {
        return {
            publishers: [],
            searchQuery: "",
        };
    },
    methods: {
        async getAllPublishers() {
            try {
                this.publishers = await publisherService.getPublishers();
            } catch (error) {
                console.error("Lỗi khi lấy danh sách nhà xuất bản:", error);
                alert("Có lỗi xảy ra khi tải danh sách nhà xuất bản!");
            }
        },

        async editPublisher(publisherId) {
            this.$router.push({ name: "EditPublisher", params: { id: publisherId } });
        },

        async deletePublisher(publisherId) {
            try {
                if (window.confirm("Bạn có chắc muốn xóa nhà xuất bản này?")) {
                    await publisherService.deletePublisher(publisherId);
                    this.publishers = this.publishers.filter(
                        (publisher) => publisher.MaNhaXB !== publisherId
                    );
                }
            } catch (error) {
                console.error("Lỗi khi xóa nhà xuất bản:", error);
            }
        },
    },
    mounted() {
        this.getAllPublishers();
    },
};
</script> 