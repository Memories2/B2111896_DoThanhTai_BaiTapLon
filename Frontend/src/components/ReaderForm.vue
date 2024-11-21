<template>
  <Form @submit="handleSubmit" :validation-schema="contactFormSchema" class="mt-8 space-y-6">
    <div class="rounded-md shadow-sm space-y-4">
      <div v-if="isEditing">
        <label for="MaDocGia" class="block text-sm font-medium text-gray-700">Mã Độc Giả</label>
        <Field name="MaDocGia" type="text" v-model="readerLocal.MaDocGia" readonly
          class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" />
        <ErrorMessage name="MaDocGia" class="text-red-500 text-sm" />
      </div>
      <div v-if="!isEditing">
        <label for="Password" class="block text-sm font-medium text-gray-700">Mật khẩu</label>
        <Field name="Password" type="password"
          class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
          v-model="readerLocal.Password" 
          placeholder="Nhập mật khẩu"/>
        <ErrorMessage name="Password" class="text-red-500 text-sm" />
      </div>
      <div>
        <label for="HoLot" class="block text-sm font-medium text-gray-700">Họ Lót</label>
        <Field name="HoLot" type="text"
          class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
          v-model="readerLocal.HoLot" />
        <ErrorMessage name="HoLot" class="text-red-500 text-sm" />
      </div>
      <div>
        <label for="Ten" class="block text-sm font-medium text-gray-700">Tên</label>
        <Field name="Ten" type="text"
          class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
          v-model="readerLocal.Ten" />
        <ErrorMessage name="Ten" class="text-red-500 text-sm" />
      </div>
      <div>
        <label for="NgaySinh" class="block text-sm font-medium text-gray-700">Ngày Sinh</label>
        <Field name="NgaySinh" type="date"
          class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
          v-model="readerLocal.NgaySinh" />
        <ErrorMessage name="NgaySinh" class="text-red-500 text-sm" />
      </div>
      <div>
        <label for="Phai" class="block text-sm font-medium text-gray-700">Giới Tính</label>
        <Field as="select" name="Phai"
          class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
          v-model="readerLocal.Phai">
          <option value="" disabled>Chọn Giới Tính</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </Field>
        <ErrorMessage name="Phai" class="text-red-500 text-sm" />
      </div>
      <div>
        <label for="DiaChi" class="block text-sm font-medium text-gray-700">Địa Chỉ</label>
        <Field name="DiaChi" type="text"
          class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
          v-model="readerLocal.DiaChi" />
        <ErrorMessage name="DiaChi" class="text-red-500 text-sm" />
      </div>
      <div>
        <label for="DienThoai" class="block text-sm font-medium text-gray-700">Điện Thoại</label>
        <Field name="DienThoai" type="text"
          class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
          v-model="readerLocal.DienThoai" />
        <ErrorMessage name="DienThoai" class="text-red-500 text-sm" />
      </div>
    </div>
    <div class="flex justify-between">
      <button type="submit"
        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
        Lưu
      </button>
      <button type="button" @click="cancel"
        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
        Hủy
      </button>
    </div>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  name: 'ReaderForm',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    reader: {
      type: Object,
      default: () => ({
        MaDocGia: '',
        Password: '',
        HoLot: '',
        Ten: '',
        NgaySinh: '',
        Phai: '',
        DiaChi: '',
        DienThoai: '',
      }),
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['submit:reader', 'cancel'],
  data() {
    const contactFormSchema = yup.object().shape({
      Password: yup.string()
        .when('isEditing', {
          is: false,
          then: () => yup.string()
            .required("Mật khẩu không được để trống")
            .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
          otherwise: () => yup.string(),
        }),
      HoLot: yup
        .string()
        .required("Họ lót không được để trống"),
      Ten: yup
        .string()
        .required("Tên không được để trống"),
      NgaySinh: yup
        .string()
        .required("Ngày sinh không được để trống"),
      Phai: yup
        .string()
        .required("Giới tính không được để trống"),
      DiaChi: yup
        .string()
        .required("Địa chỉ không được để trống"),
      DienThoai: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
    });

    return {
      readerLocal: { ...this.reader },
      contactFormSchema,
    };
  },
  watch: {
    // Theo dõi sự thay đổi của prop 'reader'
    reader: {
      // Hàm handler sẽ được gọi khi giá trị của 'reader' thay đổi
      handler(newReader) {
        // Cập nhật giá trị của 'readerLocal' bằng cách sao chép tất cả các thuộc tính từ 'newReader'
        this.readerLocal = { ...newReader };
      },
      // Theo dõi sự thay đổi sâu bên trong đối tượng 'reader'
      deep: true,
    },
  },
  methods: {
    handleSubmit() {
      this.$emit('submit:reader', this.readerLocal);
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped>
.error-feedback {
  color: red;
  font-size: 0.875rem;
}
</style>