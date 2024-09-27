<template>
    <div :class="$style.page">
        <div :class="$style.pageContainer">
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" module>
.page {
    height: 100%;
}
.pageContainer {
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: inherit;
}
</style>
