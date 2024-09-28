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
                <Button class="w-fit" variant="outline">Экспорт</Button>
            </div>
            <div :class="$style.main">
                <div :class="$style.mainTranscript">
                    <div :class="$style.mainTitle">
                        Транскрипция
                    </div>
                    <div :class="$style.mainTranscriptContent">
                        <div v-for="sentence in selectedClip.transcript" :class="$style.mainTranscriptSentences">
                            {{ sentence.description }}
                        </div>
                    </div>
                </div>
                <div :class="$style.mainClip">
                    <div :class="$style.mainClipBody">
                        <div :class="$style.clipWrapper">
                            <video :class="$style.clip" src="/video/promo-viral.mp4"/>
                            <div :class="$style.viralInfo">
                                <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <Badge :class="$style.viralBadge">
                                            {{ selectedClip.score }}
                                            <IconInfo/>
                                        </Badge>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        {{ selectedClip.score_description }}
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                            </div>
                        </div>
                        <div :class="$style.clipTimeline">

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
                        Транскрипция
                    </div>
                    <div :class="$style.mainClipsList">
                        <ClipCard 
                            v-for="(clip, index) in mockProject.clips" 
                            :key="clip.id"
                            :clip="clip"
                            :index="index + 1"
                        />
                    </div>
                </div>
            </div>
        </div>
    </PageBuilder>
</template>

<script lang="ts" setup>
import IconSlash from '~icons/lucide/slash?width=48px&height=48px';
import IconDislike from '~icons/heroicons/hand-thumb-down';
import IconLike from '~icons/heroicons/hand-thumb-up';
import IconInfo from '~icons/lucide/info?width=16px&height=16px';
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
} from '@/6_shared/ui/tooltip'
import { Badge } from '@/6_shared/ui/badge';
import PageBuilder from '@/6_shared/ui/page-builder/PageBuilder.vue';
import { AppPages } from '@/1_app/router';
import { Button } from '@/6_shared/ui/button';
import { ref } from 'vue';
import { ClipCard } from '@/5_entities/clip/ui/card';

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
            id: 1,
            src: '/video/promo-viral.mp4',
            preview: '/images/png/clip-card-image-mock.png',
            title: 'Короткая тема',
            duration: '14:48',
            score: 9.0,
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
            id: 1,
            src: '/video/promo-viral.mp4',
            preview: '/images/png/clip-card-image-mock.png',
            title: 'Короткая тема',
            duration: '14:48',
            score: 9.0,
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
            id: 1,
            src: '/video/promo-viral.mp4',
            preview: '/images/png/clip-card-image-mock.png',
            title: 'Короткая тема',
            duration: '14:48',
            score: 9.0,
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
        },{
            id: 1,
            src: '/video/promo-viral.mp4',
            preview: '/images/png/clip-card-image-mock.png',
            title: 'Короткая тема',
            duration: '14:48',
            score: 9.0,
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
            id: 1,
            src: '/video/promo-viral.mp4',
            preview: '/images/png/clip-card-image-mock.png',
            title: 'Короткая тема',
            duration: '14:48',
            score: 9.0,
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
            id: 1,
            src: '/video/promo-viral.mp4',
            preview: '/images/png/clip-card-image-mock.png',
            title: 'Короткая тема',
            duration: '14:48',
            score: 9.0,
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
            id: 1,
            src: '/video/promo-viral.mp4',
            preview: '/images/png/clip-card-image-mock.png',
            title: 'Короткая тема',
            duration: '14:48',
            score: 9.0,
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
            id: 1,
            src: '/video/promo-viral.mp4',
            preview: '/images/png/clip-card-image-mock.png',
            title: 'Короткая тема',
            duration: '14:48',
            score: 9.0,
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
            id: 1,
            src: '/video/promo-viral.mp4',
            preview: '/images/png/clip-card-image-mock.png',
            title: 'Короткая тема',
            duration: '14:48',
            score: 9.0,
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
            id: 1,
            src: '/video/promo-viral.mp4',
            preview: '/images/png/clip-card-image-mock.png',
            title: 'Короткая тема',
            duration: '14:48',
            score: 9.0,
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
        }
    ]
}
const selectedClip = ref(mockProject.clips[0])
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
}
.mainTranscript {
    display: flex;
    flex-direction: column;
    gap: 16px;
    height: 100%
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
    max-height: 100vh;

    ::-webkit-scrollbar {
        display: none;
    }
}
.mainClipsList {
    max-height: 100vh;
    overflow-y: scroll;
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
    background: hsl(var(--primary));
    font-size: 14px;
    padding: 8px 12px;
    color: hsl(var(--white));
    border-radius: 999px;
}
</style>