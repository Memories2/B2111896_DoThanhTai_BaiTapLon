<template>
    <Form @submit="handleSubmit" :validation-schema="contactFormSchema" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm space-y-4">
            <div v-if="isEditing">
                <label for="MaNhaXB" class="block text-sm font-medium text-gray-700">Mã Nhà Xuất Bản</label>
                <Field name="MaNhaXB" type="text" v-model="publisherLocal.MaNhaXB" readonly
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" />
                <ErrorMessage name="MaNhaXB" class="text-red-500 text-sm" />
            </div>

            <div>
                <label for="TenNhaXB" class="block text-sm font-medium text-gray-700">Tên Nhà Xuất Bản</label>
                <Field name="TenNhaXB" type="text" placeholder="Nhập tên nhà xuất bản"
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    v-model="publisherLocal.TenNhaXB" />
                <ErrorMessage name="TenNhaXB" class="text-red-500 text-sm" />
            </div>

            <div>
                <label for="DiaChi" class="block text-sm font-medium text-gray-700">Địa Chỉ</label>
                <Field name="DiaChi" type="text" placeholder="Nhập địa chỉ"
                    class="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    v-model="publisherLocal.DiaChi" />
                <ErrorMessage name="DiaChi" class="text-red-500 text-sm" />
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
    name: 'PublisherForm',
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        publisher: {
            type: Object,
            default: () => ({
                MaNhaXB: '',
                TenNhaXB: '',
                DiaChi: '',
            }),
        },
        isEditing: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['submit:publisher', 'cancel'],
    data() {
        const contactFormSchema = yup.object().shape({
            TenNhaXB: yup
                .string()
                .required("Tên nhà xuất bản không được để trống"),
            DiaChi: yup
                .string()
                .required("Địa chỉ không được để trống"),
        });

        return {
            publisherLocal: { ...this.publisher },
            contactFormSchema,
        };
    },
    watch: {
        publisher: {
            handler(newPublisher) {
                this.publisherLocal = { ...newPublisher };
            },
            deep: true,
        },
    },
    methods: {
        async handleSubmit() {
            try {
                Object.keys(this.publisherLocal).forEach(key => {
                    if (typeof this.publisherLocal[key] === 'string') {
                        this.publisherLocal[key] = this.publisherLocal[key].trim();
                    }
                });

                this.$emit('submit:publisher', this.publisherLocal);
            } catch (error) {
                console.error('Lỗi khi submit form:', error);
            }
        },
        cancel() {
            this.publisherLocal = { ...this.publisher };
            this.$emit('cancel');
        },
    },
};
</script> 