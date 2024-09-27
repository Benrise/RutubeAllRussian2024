<template>
    <div :class="$style.header">
        <div :class="$style.headerContainer">
            <div :class="$style.headerLeft">
                <router-link :to="AppPages.home" :class="$style.headerLogo">
                    <img src="/images/svg/logo/logo.svg" alt="logo" />
                </router-link>
                <div :class="$style.headerMenu">
                    <router-link
                        v-for="item in menuItems"
                        :key="item.name"
                        v-slot="{ isExactActive }"
                        :to="item.path"
                    >
                        <div
                            :class="[
                                $style.headerMenuLink,
                                isExactActive && $style.headerMenuLinkActive,
                            ]"
                        >
                            {{ item.name }}
                        </div>
                    </router-link>
                </div>
            </div>
            <div :class="$style.headerRight"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { RouterLocationRaw } from 'vue-router';
import { AppPages } from '@/1_app/router/types';

type menuItem = {
    name: string;
    path: RouterLocationRaw;
};

const menuItems: menuItem[] = [
    {
        name: 'Главная',
        path: { name: AppPages.home },
    },
    {
        name: 'Проекты',
        path: { name: AppPages.projects },
    },
    {
        name: 'Рабочие места',
        path: { name: AppPages.workspaces },
    },
];
</script>

<style lang="scss" module>
.header {
    background-color: white;
    height: fit-content;
}
.headerContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 16px;
    padding-bottom: 16px;
    gap: 24px;
}
.headerLeft,
.headerCenter,
.headerRight {
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
}
.headerLogo {
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;

    img {
        max-height: 48px;
    }
}
.headerMenu {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
}
.headerMenuLink {
    font-size: 16px;
    line-height: 150%;
    color: hsl(var(--muted-foreground));
}
.headerMenuLinkActive {
    color: hsl(var(--foreground));
}
</style>
