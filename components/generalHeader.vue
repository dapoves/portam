<template>
    <header class="sticky top-0 z-50 pt-6 bg-white w-full shadow-lg text-2xl font-noto-sans font-bold">
        <div class="px-4 py-4 lg:px-8 lg:py-4">
            <div class="flex items-center justify-between">
                <NuxtLink @click="$router.go(-1)" class="cursor-pointer">
                    <IconChevronLeft stroke-width="2" />
                </NuxtLink>
                <p class="text-center flex-grow mx-auto">
                    <slot></slot>
                </p>
                <div class="opacity-0">
                    <IconChevronLeft stroke-width="2" />
                </div>
            </div>
        </div>
    </header>
</template>