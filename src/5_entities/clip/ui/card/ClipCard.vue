<template>
    <div :class="$style.card">
        <div v-if="index" :class="$style.cardIndex">
            {{ index }}
        </div>
        <div :class="[$style.cardBody, isActive && $style.cardActive]">
            <div :class="$style.cardImageWrapper">
                <img :class="$style.cardImage" :src="clip.preview"/>
            </div>
            <div :class="$style.cardContent">
                <div :class="$style.cardHeader">
                    {{ clip.title }}
                </div>
                <div :class="$style.cardFooter">
                    <div :class="$style.duration">
                        {{ clip.duration }}
                    </div>
                </div>
            </div>
            <div :class="$style.cardTail">
                {{ clip.score }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps({ 
    index: {
        type: Number,
    },
    clip: {
        type: Object,
        required: true
    },
    isActive: {
        type: Boolean,
        default: false,
    }
});
</script>

<style lang="scss" module>
.card {
    display: flex;
    gap: 16px;
    border: 2px solid transparent;

    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }
}
.cardActive {
    outline: 2px solid hsl(var(--primary));
}
.cardIndex {
    @include h2();
    color: hsl(var(--muted-foreground));
}
.cardBody {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: hsl(var(--muted));
    border-radius: 12px;
    overflow: hidden;
    width: 100%;
}
.cardContent {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 12px;
}
.cardTail {
    background-color: hsl(var(--secondary));
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 24px;
    width: 100%;
    max-width: 100px;
    height: 100%;
    @include h1();
    border-radius: inherit;
}
.cardImageWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    min-width: 194px;
    min-height: 138px;
}
.duration {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 2px 8px;
    border-radius: 4px;
    z-index: 2;
}
</style>