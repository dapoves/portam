<template>
    <div>
        <header class="m-6 pt-5 flex justify-between items-center text-2xl font-noto-sans" >
            <NuxtLink to="/menu">
                <IconAlignJustify :size="30"/>
            </NuxtLink>
            <div style="width: 70%;" class="flex items-center">
                <h1 class="ml-2 mr-2 mb-1 text-neutral-600">Les valls </h1>
                <IconChevronRight color="gray" stroke-width="2"/>
            </div>
            <NuxtLink to="/deliverys">
                <IconBike :size="30"/>
            </NuxtLink>
        </header>
        </div>
</template>

