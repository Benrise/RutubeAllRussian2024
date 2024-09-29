<template>
    <div :class="$style.project">
        <div :class="$style.projectHeader">
            Проекты
            <Upload 
                v-model:model-value="uploadDrawer" 
                :is-loading="isLoading.create" 
                @upload-file-link="(url: string) => uploadFileByUrl(url)" 
                @upload-file="(f: File) => uploadFile(f)"
            >
                <Button>
                    Создать
                </Button>
            </Upload>
        </div>
        <ScrollArea>
            <div :class="$style.list">
                <ProjectCard :variant="'default'" v-for="i in 20" :key="i"/>
            </div>
        </ScrollArea>
    </div>
</template>

<script setup lang="ts">
import { ScrollArea } from '@/6_shared/ui/scroll-area';
import { ProjectCard } from '@/5_entities/project/ui/card';
import { Button } from '@/6_shared/ui/button';
import { Upload } from '@/4_features/upload';
import { useProjectStore } from '@/5_entities/project/model';
import { computed, ref } from 'vue';
import { AppPages, router } from '@/1_app/router';

const projectStore = useProjectStore();

const isLoading = computed(() => {
    return projectStore.isLoading
})

const uploadDrawer = ref(false);

const uploadFile = async (file: File) => {
    await projectStore.uploadFile(file, afterSuccessUploading);
}
const uploadFileByUrl = async (url: string) => {
    await projectStore.uploadFileByURL(url, afterSuccessUploading);
}
const afterSuccessUploading = () => {
    closeUploadDrawer();
    router.push({ name: AppPages.project, params: { projectId: 1 } });
}
const closeUploadDrawer = () => {
    uploadDrawer.value = false
}
</script>

<style lang="scss" module>
.project {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-height: 100%;
    
    ::-webkit-scrollbar {
        display: none;
    }
}
.projectHeader {
    @include h2();
    display: flex;
    align-items: center;
    gap: 16px;
}
.list {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
}
</style>