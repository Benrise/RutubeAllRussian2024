<template>
    <div :class="$style.project">
        <div :class="$style.projectHeader">
            Недавние проекты
        </div>
        <div :class="$style.projectList">
            <ProjectCard :variant="'default'" v-for="i in 20" :key="i"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ProjectCard } from '@/5_entities/project/ui/card';
</script>

<style lang="scss" module>
.project {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    
    ::-webkit-scrollbar {
        display: none;
    }
}
.projectHeader {
    @include h2();
}
.projectList {
    max-height: 100vh;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
    width: 100%;
}
</style>