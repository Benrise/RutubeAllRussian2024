<template>
    <div :class="$style.recent">
        <div :class="$style.recentHeader">
            Рабочие пространства
        </div>
        <ScrollArea>
            <div :class="$style.list">
                <ProjectCard :variant="'recent'" v-for="i in 20" :key="i"/>
            </div>
        </ScrollArea>
    </div>
</template>

<script setup lang="ts">
import { ScrollArea } from '@/6_shared/ui/scroll-area'
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
.list {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
}
</style>