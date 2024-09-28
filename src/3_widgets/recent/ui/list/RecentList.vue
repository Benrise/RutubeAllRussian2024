<template>
    <div :class="$style.recent">
        <div :class="$style.recentHeader">
            Недавние проекты
        </div>
        <div :class="$style.recentList">
            <ProjectCard v-for="i in 20" :key="i"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ProjectCard } from '@/5_entities/project/ui/card';
</script>

<style lang="scss" module>
.recent {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 534px;
    
    ::-webkit-scrollbar {
        display: none;
    }
}
.recentHeader {
    @include h2();
}
.recentList {
    max-height: 100vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>