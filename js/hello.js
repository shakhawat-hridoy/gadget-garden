console.log('abc');

const loadPhone = () =>{
    fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
    .then(response=>response.json())
    .then(data=>showPhone(data))
}

//loadPhone();

const showPhone= (data) =>{
    // console.log(data);
    console.log(data.data[0].brand);

    const div = document.getElementById('search-result');

    const p = document.createElement('p');
    p.innerText = `Name of the phone is: ${data.data[0].brand}`;

    div.appendChild(p);
}

