 async function addproducts(event){
    event.preventDefault();
    console.log('reached add user');


    let title = document.getElementById('title').value;
    let price = document.getElementById('price').value;
    let description = document.getElementById('description').value;
    let released = document.getElementById('released').value;
    let image = document.getElementById('image').value;
    let review = document.getElementById('review').value;
    let about = document.getElementById('about').value;
    let witer = document.getElementById('witer').value;
    let cover = document.getElementById('cover').value;


    let data={
        title,
        price,
        description,
        released,
        image,
        review,
        about,
        witer,
        cover
    }
    let json_data = JSON.stringify(data);

    try {
        let response = await fetch('/submit', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: json_data,
        });
        if(response){
            alert("product Added successfully.")
        }else{
            alert("Somthing went worng !")
        }
        window.location=`book_list.html`
        console.log('response', response);
    } catch (error) {
        console.error('Error adding product:', error);
    }

}

 async function loadList(event){
    event.preventDefault();
    console.log("reached..........")
    try {
        const response = await fetch('/submits', {
            method: 'GET',
        });

        const prased_data = await response.json(); 
        console.log(prased_data);

        let data =prased_data.data;
        console.log("data")

        let getData = document.getElementById('data_container');
        let row = '';

        for (let i = 0; i < data.length; i++) {
            row += `
            <div class="container">
                <div class="">
                    <div><img src="${data[i].image}" class="" style="" onClick="singleproduct('${data[i]._id}')"></div>
                    <div onClick="singleproduct('${data[i]._id}')">${data[i].title}</div>
                    <div class="">
                    <span onClick="singleproduct('${data[i]._id}')">${data[i].witer}</span>,
                    <span onClick="singleproduct('${data[i]._id}')">${data[i].cover}</sapn>
                    </div>
                </div>
            </div>
            `; // Fixed: Used backticks for HTML template literals
        }
        getData.innerHTML=row;

    } catch (error) {
        console.error('Error fetching products:', error);
    }
}
function singleproduct(id){
    console.log("Reached.......");
    window.location=`singleview.html?id=${id}`;
}
async function singleviewData(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    try {
        const response = await fetch(`/users/${id}`, { method: 'GET' });


        let prased_data = await response.json();
        console.log("prased_data",prased_data);

        let data=prased_data.data;
        console.log(" Data",data);


        let container = document.getElementById('singleData');
            
        let productHTML = `
            <div class=" ">
                <div class="">
                    <img src="${data.image}" style="width:600px; height:600px;">
                </div>
                <div class=" ">
                    <h2 class="fs-1 fw-bolder pt-2">${data.title}</h2>
                    <p class="fs-5  pt-2"> ${data.description}</p>
                    <p class="fs-3 link-danger  fw-bolder pt-2"> $${data.price}</p>
                    <p> ${data.category}</p>

                </div>
            </div>
        `;

        container.innerHTML = productHTML;
    }catch (error) {
    console.error("Error fetching product:", error);
}
}

async function loadListadmin(){
    event.preventDefault();
    console.log("reached..........")
    try {
        const response = await fetch('/submits', {
            method: 'GET',
        });

        const prased_data = await response.json(); 
        console.log(prased_data);

        let data =prased_data.data;
        console.log("data")

        let getData = document.getElementById('data_container');
        let row = '';

        for (let i = 0; i < data.length; i++) {
            row += `
            <div class="container">
                <div class="">
                    <div><img src="${data[i].image}" class="" style="" onClick="singleproduct('${data[i]._id}')"></div>
                    <div onClick="singleproduct('${data[i]._id}')">${data[i].title}</div>
                    <div class="">
                    <span onClick="singleproduct('${data[i]._id}')">${data[i].witer}</span>,
                    <span onClick="singleproduct('${data[i]._id}')">${data[i].cover}</sapn>
                    </div>
                    <div><button onClick="deleteProduct('${data[i]._id}')">delete</button></div>
                </div>
            </div>
            `; // Fixed: Used backticks for HTML template literals
        }
        getData.innerHTML=row;

    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

 async function deleteProduct(id){
    console.log("Clicked to delete product with ID:", id);

    try {
        const response = await fetch(`/deleteuser/${id}`, {
            method: 'DELETE',
        });

        const prased_data= await response.json();
        console.log("prased_data",prased_data)

        let data=prased_data.data;
        console.log(data)
        if(response.status===200){
            alert("product deleted successfully")
        }else{
            alert("somthing went wrong")
        }

        window.location='admin.html';
    }catch(error){
        console.error('Delete error:', error);

    }

}