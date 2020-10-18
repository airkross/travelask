<template>
    <div class="content">
        <table class="table" v-if="getData.length">
            <thead>
                <tr>
                    <th scope="col">Название</th>
                    <th scope="col">Описание</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(hotel, index) in getHotels" :key="index">
                    <td> {{hotel.name}} </td>
                    <td> {{hotel.description}} </td>
                    <td> <button class="btn btn-primary">Забронировать</button> </td>
                </tr>
            </tbody>
        </table>
        <div class="empty">
            Ничего не найдено
        </div>
        <Pagination
        v-if="getData.length"
            :total-pages="getData ? Math.ceil(getData.length / 3) : 0"
            :total="getData ? getData.length : 0"
            :current-page="currentPage"
            @pagechanged="onPageChange"
        />
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return {
            currentPage: 1,
        }
    },
    computed:{
        getHotels(){
            return this.getData ? this.getData.filter((item, index) => index >= ((this.currentPage - 1) * 3) && index + 1 <= ((this.currentPage - 1) * 3 + 3)) : 0
        },
        ...mapGetters(["getData"]),
    },
    methods:{
        onPageChange(page){
            this.currentPage = page
        },
    },
}
</script>

<style scoped>
.content{
    width: 100%;
    margin-left: 15px;
}
.table{
    width: 100%;   
}
.empty{
    text-align: center;
}
</style>