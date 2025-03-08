let options=document.querySelectorAll(".Container select");
let btn=document.querySelector("button");
let input=document.querySelector("input");
let display=document.querySelector(".show");
const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let from=options[0];
let to=options[1];

function update_flag(element){
    let code=element.value;
    let country_code=countryList[code];
    let image=element.parentElement.querySelector("img");
    image.src=`https://flagsapi.com/${country_code}/flat/64.png`;
}


for(let select of options){
    for(let code in countryList){
        let new_option=document.createElement("option");
        new_option.value=code;
        new_option.innerText=code;
        if(select.name==="from" && code=="USD"){
           new_option.selected="selected";
        }
        if(select.name==="to" && code=="INR"){
           new_option.selected="selected";
        }
        select.append(new_option);
    }
    select.addEventListener("change",(e)=>{
        update_flag(e.target);
    });
}

btn.addEventListener("click",async(e)=>{
      e.preventDefault();
      let link=`${BASE_URL}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
      let response=await fetch(link);
      let data=await response.json();
      let rate=data[to.value.toLowerCase()];
      let final_amt=rate*parseFloat(input.value);
      display.innerHTML=`${input.value} ${from.value} = ${final_amt} ${to.value}`;
});
