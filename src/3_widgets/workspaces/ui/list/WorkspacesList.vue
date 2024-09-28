<template>
    <div :class="$style.workspaces">
        <div :class="$style.workspacesHeader">
            Недавние проекты
        </div>
        <div :class="$style.workspacesList">
            <WorkspaceCard v-for="i in 4" :key="i"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { WorkspaceCard } from '@/5_entities/workspace/ui/card';
</script>

<style lang="scss" module>
.workspaces {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    
    ::-webkit-scrollbar {
        display: none;
    }
}
.workspacesHeader {
    @include h2();
}
.workspacesList {
    height: 100vh;
    overflow-y: scroll;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(700px, 1fr));
    gap: 16px;
    width: 100%;
}
</style>