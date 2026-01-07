const search_city=document.querySelector('.search_input')
const search_button=document.querySelector('.search_icon')

const not_found=document.querySelector('.not_found')
const search_page=document.querySelector('.search_city:not(.not_found)')
const weather_info_page=document.querySelector('.weather_info')
const israel_error=document.querySelector('.israil')

const city_name=document.querySelector('.city_name')
const temp_deg=document.querySelector('.temp_deg')
const Humidity_per=document.querySelector('.Humidity_per')
const condition=document.querySelector('.condition')
const wind_speed=document.querySelector('.wind_speed')
const img=document.querySelector('.img');

const cards_contaner=document.querySelector('.cards_contaner')
const today_date=document.querySelector('.today_date p')

const suggetion=document.querySelector('.suggetion h4');

search_button.addEventListener("click",()=>{
   let city=search_city.value;
    if(city.trim()!=''){
    Update_values(city);
    search_city.value='';
    search_city.blur();
}
})

search_city.addEventListener("keydown",(event)=>{
    let city=search_city.value;
    if(event.key=="Enter"&&city.trim()!=''){
        Update_values(city);
    search_city.value='';
    search_city.blur();
    }
})
function get_icon_byId(id){
    if(id<=232){
      return "thunderstorm.svg";
    }
    else if(id>232 && id<=321){
        return "drizzle.svg";
    }
     else if(id>321&& id<=531){
        return "rain.svg";
    }
      else if(id>531&& id<=622){
        return "rain.svg";
    }
       else if(id>=622&& id<=781){
        return "atmosphere.svg";
    }
      else if(id==800){
        return "clear.svg";
    }
    else{
        return "clouds.svg";
    }
}
async function get_fitich_data(endpoint,city){
    const api_key='b856cbb1bee920e36ef6922377599f1b';
    const api_url=`https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${api_key}&units=metric`;

const resp=await fetch(api_url);
const data=await resp.json();
return data;
}

async function Update_values(city){
    let Weather_data=await get_fitich_data('weather',city);
    if (Weather_data.cod!=200){
       show_page_of(not_found)
       return;
    } 

      const {
        name: country,
        main:{temp,humidity},
        weather:[{id,main}],
         wind:{speed}
      }=Weather_data;
    city_name.textContent=country;
     temp_deg.textContent=Math.round(temp)+" ℃";
    Humidity_per.textContent=humidity+"%";
    condition.textContent=main;
    if(main=='rain'){
      suggetion.textContent="لمى الهدوم يا  ست الكل الجو مش حلو النهرضه وبنسبه كبيره الجو هيشتى "     
    }
    else{
       suggetion.textContent="الجو حلو النهرضه بنسبه كبيره, سيبى الهدوم ع الحبل واستمتعى بالجو يا امى "     
    }
    wind_speed.textContent=speed+" M/s" ;
       img.src=`./assets/weather/${get_icon_byId(id)}`;
    show_date();//to show the date
   update_cards_info(city)
    show_page_of(weather_info_page)
    console.log(Weather_data)
if (country=="Israel"||country=="israel")
show_page_of(israel_error);
}

function show_page_of(section){
  const array= [weather_info_page,not_found,search_page,israel_error]
    array.forEach(sec => {sec.style.display="none"});
  if(section==weather_info_page){
    section.style.display="block";
    return
  }
   section.style.display="flex";
}
async function update_cards_info(city) {
    const cards_info=await get_fitich_data("forecast",city);
    const time_taken='12:00:00';
    const today=new Date().toISOString().split("T")[0];
    console.log(cards_info);
    cards_contaner.innerHTML='';
    cards_info.list.forEach((ele)=>{
        if(ele.dt_txt.includes(time_taken)&&!ele.dt_txt.includes(today)){
          console.log(ele);

          const{
          dt_txt,
            main:{temp},
           weather:[{id}],
            }=ele;
            let now=new Date(dt_txt);
            let card_date=now.toLocaleDateString("en-GB",{day:'2-digit',month:'short'})
          let card_item=`
          <div class="card">
            <p class="regelar_text">${card_date}</p>
            <img src="./assets/weather/${get_icon_byId(id)}" alt=""   >
            <h5>${Math.round(temp)} ℃</h5>
             </div>
          `
          cards_contaner.insertAdjacentHTML("beforeend",card_item)
        }
    })

}update_cards_info('tokyo');

 function show_date(){
    const New =new Date();
    let my_options={
        weekday:'short',
        day:'2-digit',
        month:'short'
    }
    let current_date= New.toLocaleDateString('en-GB', my_options) ;
    today_date.textContent=current_date;
}

