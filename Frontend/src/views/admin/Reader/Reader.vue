<template>
    <div class="flex h-screen w-full bg-gray-100">
        <Sidebar />
        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                <div class="container mx-auto px-6 py-8">
                    <!-- Reader Management -->
                    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                        <div class="p-4 flex justify-between items-center space-x-4">
                            <input type="text" placeholder="Tìm kiếm sách..."
                                class="flex-grow p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" />
                            <router-link :to="{ name: 'AddReader' }">
                                <button
                                    class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Thêm Độc Giả
                                </button>
                            </router-link>
                        </div>
                        <div class="mt-4">

                            <table class="min-w-full bg-white">
                                <thead class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                                    <tr>
                                        <th class="py-3 px-6 text-left">Mã Độc Giả</th>
                                        <th class="py-3 px-6 text-left">Tên Độc Giả</th>
                                        <th class="py-3 px-6 text-left">Họ Lót</th>
                                        <th class="py-3 px-6 text-left">Ngày Sinh</th>
                                        <th class="py-3 px-6 text-left">Giới Tính</th>
                                        <th class="py-3 px-6 text-left">Địa Chỉ</th>
                                        <th class="py-3 px-6 text-left">Điện Thoại</th>
                                        <th class="py-3 px-6 text-left"></th>
                                    </tr>
                                </thead>

                                <tbody class="text-gray-600 text-sm font-light">

                                    <tr v-if="readers.length === 0">
                                        <td class="py-3 px-6 text-left whitespace-nowrap" colspan="8">
                                            <h2>Không có dữ liệu</h2>
                                        </td>
                                    </tr>

                                    <tr v-for="reader in readers" :key="reader._id"
                                        class="border-b border-gray-200 hover:bg-gray-100">
                                        <td class="py-3 px-6 text-left whitespace-nowrap">
                                            {{ reader.MaDocGia }}
                                        </td>
                                        <td class="py-3 px-6 text-left">{{ reader.HoLot }}</td>
                                        <td class="py-3 px-6 text-left">{{ reader.Ten }}</td>
                                        <td class="py-3 px-6 text-left">{{ reader.NgaySinh }}</td>
                                        <td class="py-3 px-6 text-left">{{ reader.Phai }}</td>
                                        <td class="py-3 px-6 text-left">{{ reader.DiaChi }}</td>
                                        <td class="py-3 px-6 text-left">{{ reader.DienThoai }}</td>
                                        <td class="py-3 px-6 text-left">
                                            <div class="flex items-center space-x-2">

                                                <button @click="editReader(reader.MaDocGia)"
                                                    class="text-blue-600 hover:text-blue-900">
                                                    <PencilIcon class="h-5 w-5" />
                                                </button>

                                                <button @click="deleteReader(reader.MaDocGia)"
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
import readerService from "@/services/reader.service";
import { useRouter } from "vue-router";

export default {
    name: "Reader",
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
            readers: [],
        };
    },
    methods: {
        async getAllReader() {
            try {
                this.readers = await readerService.getAllReaders();
            } catch (error) {
                console.error("Error while getting readers:", error);
            }
        },

        async editReader(readerId) {
          this.$router.push({ name: "EditReader", params: { id: readerId } });
        },

        async deleteReader(readerId) {
            try {
                if (window.confirm("Bạn có chắc muốn xóa độc giả này này?")) {
                    await readerService.deleteReader(readerId);
                    this.readers = this.readers.filter((reader) => reader.MaDocGia !== readerId);
                }
            } catch (error) {
                console.log("Error while deleting reader:", error);
            }
        },
    },
    mounted() {
        this.getAllReader();
    },
};
</script>
