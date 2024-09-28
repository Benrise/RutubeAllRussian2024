<template>
    <PageBuilder>
        <div :class="$style.wrapper">
            <div :class="$style.main">
                <div :class="$style.mainTitle">
                    Создавайте вирусные видео за пару кликов
                </div>
                <div :class="$style.mainExample">
                    <div :class="$style.mainExampleVideos">
                        <video
                            :class="$style.mainExampleVideoSource"
                            src="/video/promo-source.mp4"
                            autoplay
                            muted
                            loop
                            playsinline
                        ></video>
                        <div :class="$style.icons">
                            <div :class="$style.iconWrapper">
                                <IconMagic :class="$style.icon" />
                            </div>
                            <IconArrow :class="[$style.icon, $style.iconArrow]" />
                        </div>
                        <video
                            :class="$style.mainExampleVideoViral"
                            src="/video/promo-viral.mp4"
                            autoplay
                            muted
                            loop
                            playsinline
                        ></video>
                    </div>
                    <div :class="$style.mainExampleDescription">
                        Rulone — это инструмент, который автоматически выделяет
                        самые важные моменты из ваших видео. Получите готовые
                        материалы, идеально подходящие для размещения в социальных
                        сетях и других медиа-платформах.
                    </div>
                </div>
                <div :class="$style.mainActions">
                    <Button variant="default"> Загрузить файл </Button>
                    <a href="#" :class="$style.helpLink">Как это работает?</a>
                </div>
            </div>
            <RecentList/>
        </div>
    </PageBuilder>
</template>

<script setup lang="ts">
import PageBuilder from '@/6_shared/ui/page-builder/PageBuilder.vue';
import IconMagic from '~icons/prime/sparkles?width=24px&height=24px';
import IconArrow from '~icons/lets-icons/arrow-right-long-light?width=48px&height=48px';
import { RecentList } from '@/3_widgets/recent/ui/list';
import { Button } from '@/6_shared/ui/button';
</script>

<style lang="scss" module>
.wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 0 64px;
}
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 64px;
    max-width: 694px;
}
.mainTitle {
    @include h1($start-font-size: 56, $start-line-height: 64);
    text-align: center;
}
.mainExample {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
}
.mainExampleVideos {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    justify-content: center;
}
.mainExampleVideoViral,
.mainExampleVideoSource {
    max-height: 212px;
    border-radius: 12px;
}
.mainExampleDescription {
    @include body();
    text-align: center;
    color: hsl(var(--card-foreground));
}
.icon {
    color: hsl(var(--foreground));
}
.icons {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.iconWrapper {
    position: absolute;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    top: -6px;
}
.mainActions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
}
.helpLink {
    @include caption();
    color: hsl(var(--muted-foreground));
}
</style>
