import hotels from '@/static/hotels.json'

export const state = () => ({
    data: [],
});

export const mutations = {
    GET(state, payload){
        state.data = payload
    },
};

export const actions = {
    GET({commit}, payload = null){
        if(payload){
            let response = hotels.hotels;
            for(let key in payload){
                if(payload[key] === '' || payload[key].length === 0 || payload[key] === 0){
                    delete payload[key]
                }
            }
            if(payload.selectedCountry){
                response = response.filter(item => item.country === payload.selectedCountry)
            }

            if(payload.countFeed){
                response = response.filter(item => item.reviews_amount >= payload.countFeed)
            }

            if(payload.minPrice){
                response = response.filter(item => item.min_price <= payload.minPrice)
            }
          
            if(payload.checkedStars && payload.checkedStars.length ){
                let starsTmpArray = []
                for(let i = 0; i < payload.checkedStars.length; i++){
                    starsTmpArray.push(...response.filter(item => {
                        return item.stars == payload.checkedStars[i]
                    }))
                }
                response = starsTmpArray
            }

            if(payload.typeSelectedData && payload.typeSelectedData.length ){
                let typeTmpArray = []
                for(let i = 0; i < payload.typeSelectedData.length; i++){
                    typeTmpArray.push(...response.filter(item => {
                        return item.type == payload.typeSelectedData[i]
                    }))
                }
                response = typeTmpArray
            }
            commit('GET', response)
        } else {
            const response = hotels;
            commit('GET', response.hotels)
        }
    },
};

export const getters = {
    getData: state => state.data,
};
