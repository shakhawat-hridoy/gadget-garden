// Take input from user
const phoneInput=()=>{
  const brandName=document.getElementById('input-brand').value;
  const universalBrandName = brandName.toLowerCase();

  //load searched result
  loadPhone(universalBrandName);

  // clear search field 
  document.getElementById('input-brand').value='';
}

//Bring requested phones by brand
const loadPhone = (searchText) =>{
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    // fetch(`https://openapi.programming-hero.com/api/phones?search=oppo`)
    .then(response=>response.json())
    .then(phoneList=>showPhone(phoneList.data))
}
//loadPhone();

//Show available phones
const showPhone= (phoneList) =>{
  const div = document.getElementById('my-card');
   //clear the previously displayed result
   div.innerHTML='';

  if(phoneList.length!==0){
    const functry=(phones)=>{
      console.log(phones.length);
      for(phone of phones){
        phoneId= phone.slug;
      
      const cardDiv = document.createElement('div');
    
      //dynamic card generation
      cardDiv.innerHTML = 
      `
      <div class="col">
        <div class="card p-4">
          <img class="w-25 h-25" src=${phone.image} class="card-img-top" alt="">
          <div class="card-body">
              <h3 class="card-title">Model: ${phone.phone_name}</h3>
              <h5>Brand: ${phone.brand}</h5>
              <button onclick="selectPhone('${phoneId}')" type="" class="btn btn-primary align-middle">Details2</button>
          </div>
        </div>
      </div> `;
      div.appendChild(cardDiv);
      }
    }
    console.log(phoneList.length);
    if(phoneList.length<=20){
      functry(phoneList);
    }
    else{
      functry(phoneList.slice(0,20));
    } 
  }
    else{
      alert('no phone found');
    }
}

//Select ome phone from the card
const selectPhone=(id)=>{
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  .then(response=>response.json())
  .then(onePhone=>showDetails(onePhone.data))
}

//Show the details of one specific phone
const showDetails=(phoneSpecifications)=>{
  const parenttDiv= document.getElementById('phone-details');
  const childDiv= document.createElement('div');

  //dynamic details window
  childDiv.innerHTML=
  `<img class="h-50 w-25" src=${phoneSpecifications.image}></img>
  <p>Name of phone: ${phoneSpecifications.slug}</p>

  <p><b>Basic features:</b></p>
  <p><strong>Chipset:</strong> ${phoneSpecifications.mainFeatures.chipSet}</p>
  <p><strong>Storage:</strong> ${phoneSpecifications.mainFeatures.storage}</p>
  <p><strong>Display:</strong> ${phoneSpecifications.mainFeatures.displaySize}</p>
  <p><strong>Sensors:</strong>${phoneSpecifications.mainFeatures.sensors}</p>   
  <p><strong>Release date:</strong> ${phoneSpecifications?.releaseDate}</p>

  <p><b>Other info:</b></p>
  <p><strong>Bluetooth: </strong>${phoneSpecifications.others.Bluetooth}</p>
  <p><strong>GPS: </strong>${phoneSpecifications.others.GPS}</p>
  <p><strong>WLAN: </strong>${phoneSpecifications.others.WLAN}</p>

  `;
  parenttDiv.appendChild(childDiv);
}
