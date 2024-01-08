let url = "http://universities.hipolabs.com/search?name=";
let url2 = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

let father = document.querySelector(".containerOne");

let btn = document.querySelector("button");
btn.addEventListener("click", async () => {
  let CLrARR = await GetData();
  show(CLrARR);
});

async function show(CLrARR) {
  // let list = document.querySelector("ul");
  // list.innerText = " ";
  father.innerHTML = " "
  for (col of CLrARR) {
    let storeLink = await getImg();
    // let li = document.createElement("li");
    // li.innerText = col.name;
    // list.appendChild(li);

    let card = document.createElement("div");
    let ImgCon = document.createElement("div");  // img container
    let UniName_Link = document.createElement("div");
    let imgCard = document.createElement("img") //img
    let UniName = document.createElement("h3");
    let AnchorTag = document.createElement("a");
    
    imgCard.setAttribute("src" , storeLink)
    UniName.innerText = col.name;
    AnchorTag.innerHTML = `Visit Page : <b><u> ${col.domains[0]} </u></b>` ;
    AnchorTag.setAttribute("href" , "https://" + col.domains[0] );
    AnchorTag.setAttribute("target" , "_blank");
    card.classList.add("card");
    ImgCon.classList.add("ImgCon");
    UniName_Link.classList.add("UniName_Link");

    ImgCon.appendChild(imgCard);
    UniName_Link.appendChild(UniName);
    UniName_Link.appendChild(AnchorTag);

    card.appendChild(ImgCon);
    card.appendChild(UniName_Link);
    
    father.appendChild(card);
}
}
async function GetData() {
  let country = document.querySelector(".c-form__input").value;
  if (country == "") {
    alert("Enter country Name");
    // list.innerText = " "
    throw "your input is empty";
  }
  try {
    let req = await axios.get(url + country , {Headers : {Accept : "application/json"}});
    // console.log("hanzala");
    return req.data;
  } catch (err) {
    console.log("error is ", err);
  }
}
async function getImg(){
  let randomNum = Math.floor(Math.random() * 1000) + 1;
  try{
    let req2 = await axios.get(url2 + randomNum , {Headers : {Accept : "application/json"}});
    let data = req2.data.primaryImageSmall;
    if(data == ""){
      return getImg();
    }
    else{
      return data;
    }
  }
  catch(err){
    // console.log(err);
    return getImg();

  }
}