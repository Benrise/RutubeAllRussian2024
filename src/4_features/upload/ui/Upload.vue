<template>
    <Dialog v-model:open="modelValue" class="upload-file">
      <DialogTrigger as-child>
        <slot/>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[40vw] flex flex-col gap-12">
        <DialogHeader class="flex flex-col gap-2">
          <DialogTitle>Загрузка проекта</DialogTitle>
          <DialogDescription>
            Поддерживаемые форматы: mp4, webm or avi. Максимальный размер: 2 ГБ
          </DialogDescription>
        </DialogHeader>
        <label for="file" class="upload-file__upload upload">
          <Input @change="onFileChange($event)" accept=".mp4,.webm,.avi" id="file" type="file"/>
          <div class="upload__area">
            <img src="/images/png/folder.png" class="upload__icon"/>
            <div class="upload__body">
              <span @click="(e) => e.target?.parentElement?.click()" class="cursor-pointer text-primary" >Нажмите </span>
              <span class="upload__text">на область, чтобы загрузить видео</span>
            </div>
          </div>
        </label>
        <div v-if="!uploadedFile" class="upload__link">
          <div class="upload__link-title">Загрузка видео по ссылке (Rutube)</div>
          <div class="flex gap-2 items-center">
            <Input v-model:model-value="enteredLink" placeholder="Ссылка на видео" id="linkUpload"/>
            <Button :loading="isLoading" @click="sendLink" variant="default">Далее</Button>
          </div>
        </div>
        <transition name="fade" mode="out-in">
          <div v-if="uploadedFile" class="upload__uploaded">
            <Separator v-if="uploadedFile"/>
            <div class="upload__file file">
              <div class="file__main">
                <div class="file__format">
                  {{ uploadedFile?.type.split('/')[1] }}
                </div>
                <div class="file__text">
                  <div class="file__name">
                    {{ uploadedFile?.name }}
                  </div>
                  <div class="file__size">
                    {{ calculateFileSize(uploadedFile?.size || 0) }}
                  </div>
                </div>
              </div>
              <Button @click="clearFile" class="text-foreground" size="icon" variant="destructive">
                <IconXmark/>
              </Button>
            </div>
            <Button @click="uploadFile" :loading="isLoading" class="w-full">
              Загрузить файл
            </Button>
          </div>
        </transition>
      </DialogContent>
    </Dialog>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useToast } from '@/6_shared/ui/toast';
  
  import { Button } from '@/6_shared/ui/button';
  import { Separator } from '@/6_shared/ui/separator';

  import IconXmark from '~icons/heroicons/x-mark-20-solid';
  
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '@/6_shared/ui/dialog'
  
  import { Input } from '@/6_shared/ui/input';
  
  const { toast } = useToast();
  
  defineProps({
    isLoading: {
      type: Boolean,
      required: true,
    },
  });

  const emit = defineEmits(['upload-file', 'upload-file-link']);
  const modelValue = defineModel<boolean>();
  
  const uploadedFile = ref<File>();
  const enteredLink = ref('');

  const clearFile = (e: Event) => {
    uploadedFile.value = undefined;
    e.preventDefault();
  };
  
const onFileChange = (e: any) => {
    const maxFileSizeInGB = 2;
    const maxFileSizeInBytes = 1024 * 1024 * 1024 * maxFileSizeInGB;

    const file = e.target.files[0];

    if (file.size > maxFileSizeInBytes) {
        toast({
            variant: 'destructive',
            title: `Превышен максимальный размер файла`,
            description: `Файл ${file.name} не загружен. Максимальный размер - ${maxFileSizeInGB} ГБ.`,
        });
        return;
    }

    uploadedFile.value = file;
};
  
  const uploadFile = () => {
    if (uploadedFile.value) {
      emit('upload-file', uploadedFile.value);
    }
  };
  const sendLink = () => {
    if (enteredLink.value) {
      emit('upload-file-link', enteredLink.value); 
    }
  };
  
  const calculateFileSize = (bytes: number) => {
    const sizes = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ'];
    if (bytes === 0) {
      return '0 Байт';
    }
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  }
  </script>
  
  <style scoped lang="scss">
  @import './styles';
  </style>
  