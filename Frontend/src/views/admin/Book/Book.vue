<template>
  <div class="flex h-screen w-full bg-gray-100">
    <Sidebar />
    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div class="container mx-auto px-6 py-8">
          <!-- Books Management -->
          <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="p-4 flex justify-between items-center space-x-4">
              <input type="text" v-model="searchQuery" placeholder="Tìm kiếm theo tên sách..."
                class="flex-grow p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" />

              <router-link v-if="isStaffOrAdmin" :to="{ name: 'AddBook' }">
                <button
                  class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Thêm sách
                </button>
              </router-link>
            </div>
            <div class="mt-4">

              <table class="min-w-full bg-white">
                <thead class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <tr>
                    <th class="py-3 px-6 text-left">Mã Sách</th>
                    <th class="py-3 px-6 text-left">Tên Sách</th>
                    <th class="py-3 px-6 text-left">Đơn Giá</th>
                    <th class="py-3 px-6 text-left">Năm Xuất Bản</th>
                    <th class="py-3 px-6 text-left">Nhà Xuất Bản</th>
                    <th class="py-3 px-6 text-left">Tác Giả</th>
                    <th class="py-3 px-6 text-left">Trạng Thái</th>
                    <th class="py-3 px-6 text-left"></th>
                  </tr>
                </thead>

                <tbody class="text-gray-600 text-sm font-light">

                  <tr v-if="filteredBooks.length === 0">
                    <td class="py-3 px-6 text-left whitespace-nowrap" colspan="8">
                      <h2>Không có dữ liệu</h2>
                    </td>
                  </tr>

                  <tr v-for="book in filteredBooks" :key="book.MaSach" class="border-b border-gray-200 hover:bg-gray-100">
                    <td class="py-3 px-6 text-left">{{ book.MaSach }}</td>
                    <td class="py-3 px-6 text-left">{{ book.TenSach }}</td>
                    <td class="py-3 px-6 text-left">{{ book.DonGia }}</td>
                    <td class="py-3 px-6 text-left">{{ book.NamXuatBan }}</td>
                    <td class="py-3 px-6 text-left">{{ book.MaNhaXuatBan }}</td>
                    <td class="py-3 px-6 text-left">{{ book.TacGia }}</td>
                    <td class="py-3 px-6 text-left">
                      <span :class="{
                        'px-2 py-1 rounded text-xs font-semibold': true,
                        'bg-green-200 text-green-800': book.TrangThai === 'Còn',
                        'bg-yellow-200 text-yellow-800': book.TrangThai === 'Đã mượn',
                        'bg-red-200 text-red-800': book.TrangThai === 'Mất'
                      }">
                        {{ book.TrangThai }}
                      </span>
                    </td>
                    <td class="py-3 px-6 text-left">
                      <div class="flex items-center space-x-2" v-if="isStaffOrAdmin">
                        <button @click="editBook(book.MaSach)" class="text-blue-600 hover:text-blue-900">
                          <PencilIcon class="h-5 w-5" />
                        </button>
                        <button @click="deleteBook(book.MaSach)" class="text-red-600 hover:text-red-900">
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
import { ref } from "vue";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";
import bookService from "@/services/book.service.js";
import { useRouter } from "vue-router";
import AuthService from "@/services/auth.service.js";

export default {
  name: "Book",
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
      books: [],
      searchQuery: "",
      isStaffOrAdmin: false,
    };
  },
  computed: {
    filteredBooks() {
      if (!this.searchQuery) {
        return this.books;
      }
      const query = this.searchQuery.toLowerCase().trim();
      return this.books.filter(book => 
        book.TenSach.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    checkUserRole() {
      const currentUser = AuthService.getCurrentUser();
      this.isStaffOrAdmin = currentUser && (currentUser.MSNV || currentUser.ChucVu === 'Admin');
    },
    async getAllBooks() {
      try {
        const response = await bookService.getBooks();
        this.books = response;
      } catch (error) {
        console.error("Error while getting books:", error);
      }
    },
    async editBook(bookId) {
      this.$router.push({ name: "EditBook", params: { id: bookId } });
    },
    async deleteBook(bookId) {
      try {
        if (window.confirm("Bạn có chắc muốn xóa sách này?")) {
          await bookService.deleteBook(bookId);
          this.books = this.books.filter((book) => book.MaSach !== bookId);
        }
      } catch (error) {
        console.log("Error while deleting book:", error);
      }
    },
  },
  mounted() {
    this.getAllBooks();
    this.checkUserRole();
  },
};
</script>
