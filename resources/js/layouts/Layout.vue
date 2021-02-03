<template>
    <div id="app-layout" class="container">
        <navigation-bar class="mb-4"></navigation-bar>
        <router-view></router-view>

        <!-- <footer-component></footer-component> -->
    </div>
</template>

<script>
    import NavigationBar from '../components/NavigationBar';
    // import FooterComponent from '../layouts/Footer';

    export default
    {
        components:
        {
            NavigationBar,
            // FooterComponent,
        },
    }
</script>
