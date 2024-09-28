<template>
    <div :class="$style.card">
        <div :class="$style.cardHeader">
            <div :class="$style.cardMainImage">
                <img src="/images/png/workspace-card-image-mock.png" />
            </div>
            <div class="flex flex-col gap-4 items-center justify-center">
                <div :class="$style.cardTitle">
                    Пространство <strong>Benrise</strong>
                </div>
                <div :class="$style.cardUsers">
                    <Avatar v-for="i in 5" :key="i">
                        <AvatarImage src="#"/>
                        <AvatarFallback>{{ i }}</AvatarFallback>
                      </Avatar>
                </div>
            </div>
        </div>
        <div :class="$style.cardImages">
            <div v-for="i in 9" :key="i" :class="$style.cardImageMini">
                <img :src="`images/png/workspaces/${i}.png`" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/6_shared/ui/avatar'
</script>

<style lang="scss" module>
.card {
    display: flex;
    flex-direction: column;
    gap: 64px;
    width: 100%;
    height: 100%;
    padding: 32px;
    background: hsl(var(--muted));
    height: 800px;
    align-items: center;
    justify-content: center;
    border-radius: 24px;
    border: 2px solid hsl(var(--secondary));
}
.cardHeader {
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;
    justify-content: center;
}
.cardTitle {
    @include h1();
}
.cardUsers {
    display: flex;
    align-items: center;
    gap: 4px;
}
.cardImageMini {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 66px;

    img {
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-width: 100%;
        object-fit: contain;
    }
}
.cardImages {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    gap: 16px;
    align-items: center;
    justify-content: center;
}
</style>