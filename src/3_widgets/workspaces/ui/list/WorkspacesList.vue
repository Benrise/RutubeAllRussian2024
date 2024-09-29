<template>
    <div :class="$style.workspaces">
        <div :class="$style.workspacesHeader">
            Недавние проекты
        </div>
        <ScrollArea>
            <div :class="$style.list">
                <WorkspaceCard v-for="i in 4" :key="i"/>
            </div>
        </ScrollArea>
    </div>
</template>

<script setup lang="ts">
import { WorkspaceCard } from '@/5_entities/workspace/ui/card';
import { ScrollArea } from '@/6_shared/ui/scroll-area'
</script>

<style lang="scss" module>
.workspaces {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-height: 100%;
    
    ::-webkit-scrollbar {
        display: none;
    }
}
.workspacesHeader {
    @include h2();
}
.list {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 16px;
}
</style>