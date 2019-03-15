<template>
    <month-view :year='year' :month='month' />
</template>
<script>
    import monthView from './monthView.vue';
    import moment from 'moment';

    export default{
        components: {
            monthView,
            moment
        },
        data(){
            return {
                month: 0,
                year: 0
            }
        },
        created() {
            this.getInitialValue();
        },
        methods: {
            getInitialValue() {
                this.month = moment(Date.now()).format('MM') - 1;
                this.year = moment(Date.now()).format('YYYY');
                console.log('Mes: ' +  this.month + ' Año: '+ this.year);
            }
        }
    }
</script>