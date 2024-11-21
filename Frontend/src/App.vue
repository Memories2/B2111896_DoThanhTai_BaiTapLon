<template>
  <div class="flex h-screen w-full bg-gray-100">
    <Sidebar :activeSection="activeSection" @update-section="setActiveSection" @profile="handleProfile"
      @logout="handleLogout" />
    <div class="flex-1 flex flex-col overflow-hidden">
      <Header :title="activeSection" />
      <router-view :activeSection="activeSection" />
    </div>
  </div>
</template>

<script>
import { ref, computed, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  components: {
    AppHeader, Sidebar
  },
  setup() {
    const route = useRoute();
    const activeSection = ref("Quản lý Sách");

    const menuItems = [
      { name: "Quản lý Sách", path: "/" },
      { name: "Quản lý Nhân viên", path: "/admin/staffs" },
      { name: "Quản lý Độc giả", path: "/admin/readers" },
      { name: "Quản lý Mượn sách", path: "/admin/lendings" },
      { name: "Quản lý Nhà xuất bản", path: "/admin/publishers" },
    ];

    const setActiveSectionFromRoute = () => {
      const currentItem = menuItems.find((item) => item.path === route.path);
      activeSection.value = currentItem ? currentItem.name : "Quản lý Sách";
    };

    //watchEffect được sử dụng để theo dõi sự thay đổi của route.path và cập nhật activeSection mỗi khi đường dẫn thay đổi
    watchEffect(() => {
      setActiveSectionFromRoute();
    });

    return {
      activeSection,
    };
  },
};
</script>

<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>