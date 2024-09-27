<template>
    <AppLayout>
        <RouterView v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </RouterView>
    </AppLayout>
    <Toaster />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

import { AppLayout } from '@/1_app/layouts';

import Toaster from '@/6_shared/ui/toast/Toaster.vue';
</script>
