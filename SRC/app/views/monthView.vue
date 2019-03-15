<template>
    <div class="monthView-container">
        <h3 class="month-name">{{ months[month] }}</h3>
        <div class="body-container">
            <div class="dayNames-container">
                <div v-for="dayName in dayNames" :class="['dayName', dayName]" :key="year+'-'+months[month]+'-'+dayName"><h5>{{ dayName }}</h5></div>
            </div>
            <div class="dates-container">
                <div v-for="date in dates" 
                    @click="onClick(date.date)"
                    :class="['date', dayNames[date.day]]" 
                    :key="year+'-'+months[month]+'-'+date.date" 
                    :id="year+'-'+month+'-'+date.date" 
                    :style="`grid-area: ${(date.date > firstSatDate) ? (Math.ceil((date.date - firstSatDate)/7))+1 : 1}/${date.day + 1}/span 1/span 1`">{{ date.date }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['year', 'month'],
        data() {
            return {
                months: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
                dayNames: ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
                dates: [],
                firstSatDate: ''
            }
        },
        methods: {
            getDates: function(yr, mth) {
                this.dates = [];        //resets the 'dates' property to an empty array.
                var d = new Date(yr, mth, 1, 1);
                if (!!d.getTime() && mth <= 11 && mth >= 0) {       //to handle errors if arguments are not valid.
                    while (d.getMonth() == mth) {
                        this.dates.push({date: d.getDate(), day: d.getDay()});
                        d = new Date(d.getTime() + (1000 * 60 * 60 * 24));
                    }
                    this.firstSatDate = 7 - this.dates[0].day;      //compute the date of the first Saturday of the given month
                } else {
                    this.dates.push({});        //push an empty object into the 'dates' array
                }
            },
            onClick(day){
                alert('click en el dia: ' + day);
            }
        },
        created() {     //called when the component is created.
            this.getDates(this.year, this.month);
        },
        watch: {
            year: function(){       //triggered if the 'year' prop is changed, to re-render the component with the new values.
                this.getDates(this.year, this.month);
            },
            month: function(){      //triggered if the 'month' prop is changed.
                this.getDates(this.year, this.month);
            }
        }
    }
</script>

<style scoped>
    *
    {
        margin: 0;
        padding: 0;
        border: 0;
        outline: 0;
        vertical-align: baseline;
    }
    div.monthView-container
    {
        display: inline-grid;
        grid-template-columns: 1fr;
        font-family: 'product sans';
        font-size: .75em;
        letter-spacing: .05em;
    }
    .monthView-container h3.month-name
    {
        background: rgb(21, 100, 202);
        color: #fff;
        line-height: 3em;
        text-align: center;
    }
    div.body-container
    {
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1px;
    }
    div.dayNames-container
    {
        display: grid;
        grid-template-columns: repeat(7, auto);
        grid-gap: 1px;
    }
    div.dates-container
    {
        display: grid;
        grid-template-columns: repeat(7, auto);
        grid-gap: 1px;
    }



    div.dayName, div.date
    {
        width: 4.5em;
        padding: 10px;
    }
    div.dayName
    {
        text-align: center;
        line-height: 2em;
        background: #eef;
    }
    div.date
    {
        text-align: right;
        background: #eef;
        height: 3em;
    }
    div.SUN
    {
        color: #f00;
        background: #fee;
    }
</style>