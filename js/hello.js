const loadPhone = () =>{
    fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
    .then(response=>response.json())
    .then(phoneList=>showPhone(phoneList.data))
}
loadPhone();

const specificPhone=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(response=>response.json())
    .then(onePhone=>console.log(onePhone))
}

const showPhone= (phones) =>{
    console.log(phones);

    for(phone of phones){

    const div = document.getElementById('my-card');
    const cardDiv = document.createElement('div');
    cardDiv.innerHTML = 
    `
    <div class="col">
      <div class="card p-4">
        <img class="w-50 h-50" src=${phone.image} class="card-img-top" alt="">

        <div class="card-body">
            <h3 class="card-title">Model: ${phone.phone_name}</h3>

            <h5>Brand: ${phone.brand}</h5>

            <button onclick="specificPhone(phone.slug)" type="button" class="btn btn-primary">Details</button>

        </div>
      </div>
    </div>  `;
    div.appendChild(cardDiv);
    }

}