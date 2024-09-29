<template>
    <div :class="$style.project">
        <div :class="$style.projectHeader">
            Проекты
            <Upload>
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