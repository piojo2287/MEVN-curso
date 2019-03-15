<template>
    <div class="jumbotron">
        <div class="container">
            <v-app id="dayspan" >
                <ds-calendar-app :calendar="calendar"></ds-calendar-app>
            </v-app>
        </div>
    </div>
</template>

<script>
    import { Calendar } from 'dayspan';
    export default {
        data: () => ({
            calendar: Calendar.months()
        })
    }
</script>

<style>
body, html, #app, #dayspan {
  font-family: Roboto, sans-serif;
  /* width: 80%; */
  /* height: 80%; */
}
</style>