console.log('abc');

const loadPhone = () =>{
    fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
    .then(response=>response.json())
    .then(phoneList=>showPhone(phoneList.data))
}

//loadPhone();

const showPhone= (phones) =>{
    console.log(phones);
    console.log(phones[0].brand);

    for(phone of phones){
        const div = document.getElementById('my-card');

    const cardDiv = document.createElement('div');
    cardDiv.innerHTML = 
    `
    <div class="col">
      <div class="card">
        <img src=${phone.image} class="card-img-top" alt="">

        <div class="card-body">
            <h5 class="card-title">Model: ${phone.phone_name}</h5>
            <h3>Brand: ${phone.brand}</h3>
        </div>
      </div>
    </div> `;
    div.appendChild(cardDiv);
    }

}