<template>
    <div class="sidebar">
        <Button class="mb-3" @click.native="clearFilters()">
            Очистить фильтры
        </Button>
        <!-- Заметка: Данные для опшенов/чекбоксов/range-slider должны приходить с бэка, поэтому забиваю их статично из data -->
        <label >Страна</label>
        <v-select :options="countriesOptions" v-model="filterData.selectedCountry" class="mb-3"></v-select>
        <label>Тип</label>
        <multiselect  v-model="filterData.typeSelectedData" :options="typesOptions" :multiple="true" class="mb-3"></multiselect>
        <div class="stars mb-3" >
          <label>Звезды</label>
          <b-form-checkbox-group
            id="checkbox-group-1"
            v-model="filterData.checkedStars"
            :options="stars"
            name="flavour-1"
          ></b-form-checkbox-group>
        </div>
        <label>Количество отзывов от</label>
        <input type="text" :value="filterData.countFeed" @input="setValue" class="mb-3">
        <div class="price-range mb-3">
          <label>Цена до:</label>  {{filterData.minPrice}}
          <div class="price-range-slider">
            <span> 1153 </span>
            <range-slider
              class="slider"
              v-model="filterData.minPrice"
              :min="1153"
              :max="3689"
              :step="step"
            >
            </range-slider>
            <span> 3689 </span>
          </div>
        </div>
        
        <Button @click.native="fetchFilterData()">
            Применить фильтры
        </Button>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  data(){
    return{
      countriesOptions: ['Греция', 'Испания', 'Турция'],
      typesOptions: ['Отель', 'Апартаменты'],
      stars: [
        { text: '2', value: 2, },
        { text: '3', value: 3, },
        { text: '4', value: 4, },
        { text: '5', value: 5, },
      ],
      step: 1,
      filterData: {
        selectedCountry: '',
        typeSelectedData: [],
        checkedStars: [],
        countFeed: '',
        minPrice: 0,
      },
     }
  },
  methods:{
    setValue(event){
    	this.filterData.countFeed = event.target.value = event.target.value.replace(/\D/g, '');
    },
    fetchFilterData(){
      this.GET(this.filterData)
    },
    clearFilters(){
      this.filterData.selectedCountry = ''
      this.filterData.typeSelectedData = []
      this.filterData.checkedStars = []
      this.filterData.countFeed = ''
      this.filterData.minPrice = 0
    },
    ...mapActions(["GET"]),
  },
}
</script>

<style scoped>
.sidebar{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.stars{
  display: flex;
  flex-direction: column;
}
.price-range-slider{
  display: flex;
  align-items: center;
}
</style>