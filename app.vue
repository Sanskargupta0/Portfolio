<script setup lang="ts">
useHead({
    title: 'Sanskar Gupta',
    meta: [
        {
            name: 'description',
            content:
                "Sanskar Gupta, I'm a passionate developer with a deep interest in technology and all things related to computing. Over the years, I've dedicated myself creating a variety of personal projects, driven by my passion for learning and exploring new technologies."
        },
        {
            property: 'og:title',
            content: 'Sanskar Gupta'
        },
        {
            property: 'og:description',
            content:
                "Sanskar Gupta, I'm a passionate developer with a deep interest in technology and all things related to computing. Over the years, I've dedicated myself creating a variety of personal projects, driven by my passion for learning and exploring new technologies."
        },
        {
            property: 'twitter:card',
            content: 'summary'
        }
    ]
});

useSeoMeta({
    title: 'Sanskar Gupta',
    description:
        "Sanskar Gupta, I'm a passionate developer with a deep interest in technology and all things related to computing. Over the years, I've dedicated myself creating a variety of personal projects, driven by my passion for learning and exploring new technologies.",
    ogTitle: 'Sanskar Gupta',
    ogDescription:
        "Sanskar Gupta, I'm a passionate developer with a deep interest in technology and all things related to computing. Over the years, I've dedicated myself creating a variety of personal projects, driven by my passion for learning and exploring new technologies.",
    twitterCard: 'summary'
});
</script>

<template>
    <div>
        <NuxtPage />
    </div>
</template>
