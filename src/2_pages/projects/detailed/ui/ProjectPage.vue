<template>
    <PageBuilder>
        <div :class="$style.wrapper">
            <div :class="$style.header">
                <Breadcrumb :class="$style.headerBreadcrumbs">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <router-link :to="{ name: AppPages.home }">
                                Главная
                            </router-link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <IconSlash/>
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage>
                                {{ mockProject.name }}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <Button class="w-fit" variant="outline">
                    Экспорт
                    <IconExport class="ml-2"/>
                </Button>
            </div>
            <div :class="$style.main">
                <div :class="$style.mainTranscript">
                    <div :class="$style.mainTitle">
                        Транскрипция предложений
                    </div>
                    <div :class="$style.mainTranscriptContent">
                        <div v-for="(sentence, index) in localClips[selectedClipIndex].transcript" 
                            :class="[$style.mainTranscriptSentence, { [$style.active]: sentence.isActive }]" 
                            :ref="(el) => setSentenceRef(el, index)"
                        >
                            <Badge variant="secondary">{{ sentence.start_time + ' с' }}</Badge>
                            <span @click="onSentenceClick(sentence)">
                                <span v-if="!sentence.isEditing">{{ sentence.description }}</span>
                                <Input 
                                  v-else
                                  :size="sentence.description.length"  
                                  :default-value="sentence.description" 
                                  v-model:model-value="sentence.description"
                                />
                              </span>
                        </div>
                    </div>
                </div>
                <div :class="$style.mainClip">
                    <div :class="$style.mainClipBody">
                        <div :class="$style.clipWrapper">
                            <video ref="videoRef" controlslist="nodownload nofullscreen noplaybackrate" :class="$style.clip" :src="selectedClip.src" controls disabl/>
                            <div :class="$style.viralInfo">
                                <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Badge class="bg-purple-600 hover:bg-purple-700" :class="$style.viralBadge">
                                            {{ selectedClip.score }} 
                                            <IconLightning/>
                                        </Badge>
                                      </TooltipTrigger>
                                      <TooltipContent class="bg-purple-700">
                                        {{ selectedClip.score_description }}
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                            </div>
                            <div v-if="getActiveSentence" :class="$style.activeSubtitle">
                                <Badge class="bg-black" variant="secondary">{{ getActiveSentence.description }}</Badge>
                            </div>
                        </div>
                    </div>
                    <div :class="$style.mainClipFooter">
                        <Button class="w-full" variant="default">
                            <IconLike/>
                        </Button>
                        <Button class="w-full" variant="destructive">
                            <IconDislike/>
                        </Button>
                    </div>
                </div>
                <div :class="$style.mainClips">
                    <div :class="$style.mainTitle">
                        Сгенерированные клипы
                    </div>
                    <ScrollArea>
                        <div :class="$style.list">
                            <ClipCard 
                                v-for="(clip, index) in localClips" 
                                :key="clip.id"
                                :clip="clip"
                                :index="index + 1"
                                @click="selectClip(clip, index)"
                                :is-active="selectedClip.id === clip.id"
                            />
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    </PageBuilder>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';

import { AppPages } from '@/1_app/router';

import { Button } from '@/6_shared/ui/button';
import { Badge } from '@/6_shared/ui/badge';
import { Input } from '@/6_shared/ui/input';
import { PageBuilder } from '@/6_shared/ui/page-builder';
import { ScrollArea } from '@/6_shared/ui/scroll-area';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/6_shared/ui/breadcrumb';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/6_shared/ui/tooltip';

import { ClipCard } from '@/5_entities/clip/ui/card';

import IconSlash from '~icons/lucide/slash?width=48px&height=48px';
import IconDislike from '~icons/heroicons/hand-thumb-down';
import IconLike from '~icons/heroicons/hand-thumb-up';
import IconLightning from '~icons/heroicons-outline/lightning-bolt?width=16px&height=16px';
import IconExport from '~icons/uil/export?width=16px&height=16px';

const mockProject  = {
    id: 1,
    name: '2024-09-27 22.05.18',
    date: 'Сентябрь 27, 2024 22:06',
    status: 'in_progress',
    progress: 100,
    clips: [
        {
            id: 1,
            src: '/video/promo-viral.mp4',
            preview: '/images/png/clip-card-image-mock.png',
            title: 'Короткая тема',
            duration: '14:48',
            score: 9.0,
            score_description: 'Высокая виральность характеризуется многочисленными движениями и эмоциями',
            transcript: [
                {
                    start_time: 1,
                    end_time: 32.0,
                    description: 'Здорово. Короче, смотри такая тема.',
                    duration: 2.44
                },
                {
                    start_time: 3,
                    end_time: 34.0,
                    description: 'Мы берем тачку, да?',
                    duration: 2.0
                },
                {
                    start_time: 7,
                    end_time: 36.0,
                    description: 'Не, не, не, подожди, короче, смотри.',
                    duration: 2.0
                },
                {
                    start_time: 9,
                    end_time: 38.0,
                    description: 'Ну берем тачку, да?',
                    duration: 2.0
                },
                {
                    start_time: 12,
                    end_time: 40.0,
                    description: 'И что дальше? Куда поедем?',
                    duration: 2.0
                },
                {
                    start_time: 15,
                    end_time: 42.5,
                    description: 'Думаю, поедем за город, там меньше машин.',
                    duration: 2.5
                },
                {
                    start_time: 17,
                    end_time: 44.0,
                    description: 'Ну хорошо, поехали. Я готов!',
                    duration: 1.5
                },
                {
                    start_time: 20,
                    end_time: 46.0,
                    description: 'Отлично, тогда стартуем прямо сейчас.',
                    duration: 2.0
                },
                {
                    start_time: 22,
                    end_time: 24,
                    description: 'Погнали! Дорога ждёт нас.',
                    duration: 2.0
                }
            ]
        },
        {
            id: 2,
            src: '/video/promo-viral.mp4',
            preview: '/images/png/clip-card-image-mock.png',
            title: 'Короткая тема',
            duration: '14:48',
            score: 8.5,
            score_description: 'В клипе много движений',
            transcript: [
                {
                    start_time: 29.56,
                    end_time: 32.0,
                    description: 'Здорово. Короче, смотри такая тема.',
                    duration: 2.44
                },
                {
                    start_time: 32.0,
                    end_time: 34.0,
                    description: 'Мы берем тачку, да?',
                    duration: 2.0
                },
                {
                    start_time: 34.0,
                    end_time: 36.0,
                    description: 'Не, не, не, подожди, короче, смотри.',
                    duration: 2.0
                },
                {
                    start_time: 36.0,
                    end_time: 38.0,
                    description: 'Ну берем тачку, да?',
                    duration: 2.0
                },
                {
                    start_time: 38.0,
                    end_time: 40.0,
                    description: 'И что дальше? Куда поедем?',
                    duration: 2.0
                },
                {
                    start_time: 40.0,
                    end_time: 42.5,
                    description: 'Думаю, поедем за город, там меньше машин.',
                    duration: 2.5
                },
                {
                    start_time: 42.5,
                    end_time: 44.0,
                    description: 'Ну хорошо, поехали. Я готов!',
                    duration: 1.5
                },
                {
                    start_time: 44.0,
                    end_time: 46.0,
                    description: 'Отлично, тогда стартуем прямо сейчас.',
                    duration: 2.0
                },
                {
                    start_time: 46.0,
                    end_time: 48.0,
                    description: 'Погнали! Дорога ждёт нас.',
                    duration: 2.0
                }
            ]
        },
        {
            id: 3,
            src: '#',
            preview: '/images/png/clip-card-image-mock.png',
            title: 'Короткая тема',
            duration: '14:48',
            score: 8.0,
            score_description: 'В клипе много движений',
            transcript: [
                {
                    start_time: 29.56,
                    end_time: 32.0,
                    description: 'Здорово. Короче, смотри такая тема.',
                    duration: 2.44
                },
                {
                    start_time: 32.0,
                    end_time: 34.0,
                    description: 'Мы берем тачку, да?',
                    duration: 2.0
                },
                {
                    start_time: 34.0,
                    end_time: 36.0,
                    description: 'Не, не, не, подожди, короче, смотри.',
                    duration: 2.0
                },
                {
                    start_time: 36.0,
                    end_time: 38.0,
                    description: 'Ну берем тачку, да?',
                    duration: 2.0
                },
                {
                    start_time: 38.0,
                    end_time: 40.0,
                    description: 'И что дальше? Куда поедем?',
                    duration: 2.0
                },
                {
                    start_time: 40.0,
                    end_time: 42.5,
                    description: 'Думаю, поедем за город, там меньше машин.',
                    duration: 2.5
                },
                {
                    start_time: 42.5,
                    end_time: 44.0,
                    description: 'Ну хорошо, поехали. Я готов!',
                    duration: 1.5
                },
                {
                    start_time: 44.0,
                    end_time: 46.0,
                    description: 'Отлично, тогда стартуем прямо сейчас.',
                    duration: 2.0
                },
                {
                    start_time: 46.0,
                    end_time: 48.0,
                    description: 'Погнали! Дорога ждёт нас.',
                    duration: 2.0
                }
            ]
        },
    ]
}
const videoRef = ref<HTMLVideoElement>();
const selectedClipIndex = ref(0);
const previousHighlightedSentence = ref(null);
const localClips = ref(mockProject.clips.map(clip => ({
    ...clip,
    transcript: clip.transcript.map(sentence => ({ ...sentence, isEditing: false, isActive: false })),
    ref: null,
})));
const selectedClip = ref(mockProject.clips[0]);

const getActiveSentence = computed(() => localClips.value[selectedClipIndex.value].transcript.find(sentence => sentence.isActive));

const selectClip = (clip, index: number) => {
    selectedClipIndex.value = index;
};
const onSentenceClick = (sentence) => {
    if (sentence.start_time > selectedClip.value.duration) return;

    if (!sentence.isEditing) {
        sentence.isEditing = true;
        if (videoRef.value) {
            videoRef.value.currentTime = sentence.start_time;
        }
    }
};

const setSentenceRef = (el: any, index: number) => {
    if (el && localClips.value[selectedClipIndex.value].transcript[index]) {
        onClickOutside(el, () => {
            const sentence = localClips.value[selectedClipIndex.value].transcript[index];
            if (sentence.isEditing) {
                sentence.isEditing = false;
            }
        });
    }
};
const handleTimeUpdate = () => {
    const currentTime = videoRef.value?.currentTime || 0;

    localClips.value[selectedClipIndex.value].transcript.forEach((sentence) => {
        if (currentTime < sentence.start_time) {
            sentence.isActive = false;
        } else {
            if (previousHighlightedSentence.value !== sentence) {
                if (previousHighlightedSentence.value) {
                    previousHighlightedSentence.value.isActive = false;
                }
                sentence.isActive = true;
                previousHighlightedSentence.value = sentence;
            }
        }
    });

    if (localClips.value[selectedClipIndex.value].transcript.every(sentence => !sentence.isActive)) {
        previousHighlightedSentence.value = null;
    }
};

watch(selectedClipIndex, (newIndex) => {
    selectedClip.value = localClips.value[newIndex];
});
watch(videoRef, (newVideoRef) => {
    if (newVideoRef) {
        newVideoRef.addEventListener('timeupdate', handleTimeUpdate);
    }
});
</script>

<style lang="scss" module>
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 24px;
}
.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 64px;
}
.mainTranscript {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;
    max-width: 400px;
}
.mainTitle {
    @include h2();
}
.mainClip {
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: 100%;
}
.mainClips {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%;
    width: 520px;
    max-width: 540px;
    max-height: 100%;

    ::-webkit-scrollbar {
        display: none;
    }
}
.list {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.mainClipFooter {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}
.clipWrapper {
    max-width: 324px;
    border-radius: 12px 12px 0 0;
    overflow: hidden;
    outline: 4px solid hsl(var(--primary));
    position: relative;
    height: 100%;
}
.viralInfo {
    position: absolute;
    top: 16px;
    right: 16px;
}
.viralBadge {
    display: flex;
    gap: 4px;
    align-items: center; 
    font-size: 14px;
    padding: 8px 12px;
    color: hsl(var(--white));
    border-radius: 999px;
}
.clip {
    height: 100%;
}
.mainClipBody {
    height: 100%;
}
.mainTranscriptContent {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}
.mainTranscriptSentence {
    width: fit-content;
    display: flex;
    text-wrap: nowrap;
    gap: 8px;
}
.active {
    color: hsl(var(--primary));
}
.activeSubtitle {
    font-size: 14px;
    font-weight: 500;
    color: white;
    text-align: center;
    position: absolute;
    bottom: 15%;
    left: 50%;
    transform: translateX(-50%);
}
video::-webkit-media-controls-fullscreen-button {
    display: none;
}
</style>