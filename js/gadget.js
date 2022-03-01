// Take input from user
const phoneInput=()=>{
  const brandName=document.getElementById('input-brand').value;
  const universalBrandName = brandName.toLowerCase();

  //load searched result
  loadPhone(universalBrandName);
  document.getElementById('spinner').style.display = "block";
  document.getElementById('not-found').style.display = "none";
  document.getElementById('collection').style.display = "none";

  // clear old field 
  document.getElementById('input-brand').value='';
  document.getElementById('phone-details').innerHTML='';
}

//Bring requested phones by brand
const loadPhone = (searchText) =>{
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    // fetch(`https://openapi.programming-hero.com/api/phones?search=oppo`)
    .then(response=>response.json())
    .then(phoneList=>showPhone(phoneList.data))
}

//Show available phones
const showPhone= (phoneList) =>{
  document.getElementById('spinner').style.display = "none";
  const div = document.getElementById('my-card');
   //clear the previously displayed result
   div.innerHTML='';

  if(phoneList.length!==0){
    const setInnerHtml=(phones)=>{
      document.getElementById('not-found').style.display = "none";
      document.getElementById('collection').style.display = "block";

      for(phone of phones){
        phoneId= phone.slug;
      const cardDiv = document.createElement('div');
    
      //dynamic card generation
      cardDiv.innerHTML = 
      `
      <div class="my-4 col">
        <div class="card shadow rounded-3 m-4 p-4">
          <img class="h-50 w-50" src=${phone.image} class="card-img-top" alt="">
          <div class="card-body">
              <h3 class="card-title">Model: ${phone.phone_name}</h3>
              <h5>Brand: ${phone.brand}</h5>
              <button onclick="selectPhone('${phoneId}')" type="" class="btn align-middle">Show Details</button>
          </div>
        </div>
      </div> `;
      div.appendChild(cardDiv);
      }
    }
    if(phoneList.length<=20){
      document.getElementById('collection').style.display = "block";
      setInnerHtml(phoneList);
    }
    else{
      setInnerHtml(phoneList.slice(0,20));
    } 
  }
    else{
      document.getElementById('collection').style.display = "none";
      document.getElementById('not-found').style.display = "block";
    }
}

//Select ome phone from the card
const selectPhone=(id)=>{
  document.getElementById('phone-details').innerHTML='';
  document.getElementById('spinner').style.display = "block";
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  .then(response=>response.json())
  .then(onePhone=>showDetails(onePhone.data))
}

//Show the details of one specific phone
const showDetails=(phoneSpecifications)=>{
  document.getElementById('spinner').style.display = "none";
  const parenttDiv= document.getElementById('phone-details');
  const childDiv= document.createElement('div');

  if(phoneSpecifications.releaseDate == undefined){
    const releaseDate= "No release date found";
  }
  else{
    releaseDate=phoneSpecifications.releaseDate;
  }

  //dynamic details window
  childDiv.innerHTML=
  `<img class="img-fluid mb-4" src=${phoneSpecifications.image}></img>
  <p><strong>${phoneSpecifications.slug}</strong></p>
  <p><strong>Release date:</strong>${releaseDate}</p>

  <p><b>Basic features:</b></p>
  <p><strong>Chipset:</strong> ${phoneSpecifications.mainFeatures.chipSet}</p>
  <p><strong>Storage:</strong> ${phoneSpecifications.mainFeatures.storage}</p>
  <p><strong>Display:</strong> ${phoneSpecifications.mainFeatures.displaySize}</p>
  <p><strong>Sensors:</strong>${phoneSpecifications.mainFeatures.sensors}</p>   

  <p><b>Other info:</b></p>
  <p><strong>Bluetooth: </strong>${phoneSpecifications.others.Bluetooth}</p>
  <p><strong>GPS: </strong>${phoneSpecifications.others.GPS}</p>
  <p><strong>WLAN: </strong>${phoneSpecifications.others.WLAN}</p> `;
  parenttDiv.appendChild(childDiv);
  window.scrollTo(0,300);
}
