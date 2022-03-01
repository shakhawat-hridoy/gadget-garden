const phoneInput=()=>{
  const brandName= document.getElementById('input-brand').value;
  loadPhone(brandName);
}

const loadPhone = (searchText) =>{
    // fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    fetch(`https://openapi.programming-hero.com/api/phones?search=oppo`)
    .then(response=>response.json())
    .then(phoneList=>showPhone(phoneList.data))
}
loadPhone();

const showDetails=(phoneSpecifications)=>{
  const parenttDiv= document.getElementById('phone-details');

  const childDiv= document.createElement('div');

  console.log(phoneSpecifications);
  console.log(phoneSpecifications.releaseDate);
  console.log(phoneSpecifications.slug);

  childDiv.innerHTML=
  `<img class="h-25 w-25" src=${phoneSpecifications.image}></img>
  <p>'Name of phone: ${phoneSpecifications.slug}'</p>
  <p>'Release date: ${phoneSpecifications.releaseDate}'</p>
  `;
  parenttDiv.appendChild(childDiv);
}

const selectPhone=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(response=>response.json())
    .then(onePhone=>showDetails(onePhone.data))
}

const showPhone= (phones) =>{
    for(phone of phones){
      phoneId= phone.slug;
    const div = document.getElementById('my-card');
    const cardDiv = document.createElement('div');
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
    </div>  
    `;
    div.appendChild(cardDiv);
    }
}
