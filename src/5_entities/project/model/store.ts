import { defineStore } from 'pinia';
import { ref } from 'vue';
import { http } from '../api/http';
import { useToast } from '@/6_shared/ui/toast';
import { HttpStatusCode } from 'axios';

const { toast } = useToast();

export type LoadingKeys = 'list' | 'item' | 'create' | 'update' | 'delete';
export interface LoadingState {
    list: boolean;
    item: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
}

const namespace = 'projects';

export const useProjectStore = defineStore(namespace, () => {
    const isLoading = ref<LoadingState>({
        list: false,
        item: false,
        create: false,
        update: false,
        delete: false,
    });

    const setLoading = (key: LoadingKeys, value: boolean) => {
        isLoading.value[key] = value;
    };

    const uploadFile = async (file: File, callback?: () => void) => {
        setLoading('create', true);
        try {
            const response = await http.upload.postFile(file);
            if (response.status === HttpStatusCode.Ok) {
                toast({
                    variant: 'success',
                    title: 'Видео успешно загружено!'
                });
                callback?.();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading('create', false);
        }
    };

    const uploadFileByURL = async (url: string, callback?: () => void) => {
        setLoading('create', true);
        try {
            const response = await http.upload.postFileByURL(url);
            if (response.status === HttpStatusCode.Ok) {
                toast({
                    variant: 'success',
                    title: 'Видео успешно загружено по ссылке!'
                });
                callback?.();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading('create', false);
        }
    };

    return {
        isLoading,
        uploadFile,
        uploadFileByURL,
    };
});
