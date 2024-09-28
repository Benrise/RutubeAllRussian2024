<template>
    <router-link :to="{ name: AppPages.project, params: { projectId: 1 } }">
        <div :class="[$style.card, $style[variant]]">
            <div :class="$style.cardImage">
                <img src="/images/png/project-card-image-mock.png" alt="logo" />
                <div :class="$style.duration">
                    14:48
                </div>
            </div>
            <div :class="$style.cardBody">
                <div :class="$style.cardHeader">
                    <div :class="$style.cardDate">
                        Сентябрь 27, 2024 22:06
                    </div>
                    <div :class="$style.cardName">
                        2024-09-27 22.05.18
                    </div>
                </div>
                <Badge class="bg-orange-700" v-if="variant === 'default'">
                    Средний рейтинг виральности: 10
                </Badge>
                <Badge v-if="variant === 'default'">
                    10 клипов
                </Badge>
                <div :class="$style.cardActions">
                    <Button variant="secondary">
                        Подробнее
                        <IconChevronRight class="ml-2"/>
                    </Button>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script setup lang="ts">
import { Button } from '@/6_shared/ui/button';
import { AppPages } from '@/1_app/router';
import type { PropType } from 'vue';
import Badge from '@/6_shared/ui/badge/Badge.vue';
import IconChevronRight from '~icons/tabler/chevron-right?width=24px&height=24px';

defineProps({
    variant: {
        type: String as PropType<'recent' | 'default'>, 
        required: true
    }
})
</script>

<style lang="scss" module>
.card.default,
.card.recent {
    align-items: center;
    display: flex;
    width: 100%;
    background-color: hsl(var(--muted));
    border-radius: 8px;
    min-height: 152px;
    overflow: hidden;
}
.card.default {
    flex-direction: column;

    .cardHeader {
        gap: 8px;
    }

    .cardName {
        @include h3();
    }

    .cardDate {
        @include body();
        color: hsl(var(--muted-foreground));
    }

    .cardBody {
        padding: 24px;
        gap: 24px;
    }
}
.cardImage {
    position: relative;
    width: 100%;
    height: 100%;

    img {
        object-fit: contain;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
    }
}
.duration {
    position: absolute;
    bottom: 8px;
    right: 8px;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 2px 8px;
    border-radius: 4px;
    z-index: 2;
}
.cardBody {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    padding: 12px;
    height: 100%;
    width: 100%;
}
.cardHeader {
    display: flex;
    flex-direction: column;
    gap: 4px;
}
.cardDate {
    @include caption();
    color: hsl(var(--muted-foreground));
}
.cardName {
    @include body();
    color: hsl(var(--foreground));
}
</style>