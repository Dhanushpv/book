 async function addproducts(event){
    event.preventDefault();
    console.log('reached add user');


    let title = document.getElementById('title').value;
    let price = document.getElementById('price').value;
    let description = document.getElementById('description').value;
    let released = document.getElementById('released').value;
    let image = document.getElementById('image').value;
    let reviews = document.getElementById('review').value;
    let about = document.getElementById('about').value;
    let witer = document.getElementById('witer').value;
    let cover = document.getElementById('cover').value;


    let data={
        title,
        price,
        description,
        released,
        image,
        reviews,
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
        window.location=`admin.html`
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
            <div class="pt-5 container px-5">
                <div class="shadow-lg p-3 mb-5 bg-body box  ">
                    <div><img src="${data[i].image}" class="box1" style="" onClick="singleproduct('${data[i]._id}')"></div>
                    <div class="">
                        <div class="card-title" onClick="singleproduct('${data[i]._id}')">${data[i].title}</div>
                        <div class="">
                            <span onClick="singleproduct('${data[i]._id}')">${data[i].witer}</span>,
                            <span onClick="singleproduct('${data[i]._id}')">${data[i].cover}</sapn>
                        </div>
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
            <div class=" d-flex gap-5">
                <div class="">
                    <img src="${data.image}"  style="width:500px; height:80vh;">
                </div>
                <div class="gap-5">
                    <h2 class="fs-1 fw-bolder link-light pt-2">${data.title}</h2>
                    <h5 class="link-light  pt-2">Released on :${data.released}</h5>
                    <h5 class="link-light  pt-2">${data.witer}</h5>
                    <h5 class="link-light  pt-2">${data.cover}</h5>
                    <p class="fs-5 lh-lg link-light pt-2"> ${data.description}</p>
                    <p class="fs-3 link-danger link-light fw-bolder pt-2"> $${data.price}</p>
                </div>        
            </div>
            <p class="lh-lg link-light  pt-5"> ${data.about}</p>
        `;

        container.innerHTML = productHTML;
    }catch (error) {
    console.error("Error fetching product:", error);
}
}

async function loadListadmin(){

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
            <div class="container px-5 pt-5">
                <div class="shadow-lg p-3 mb-5 bg-body box  d-flex">
                    <div><img src="${data[i].image}" class="box1" style="" onClick="singleproduct('${data[i]._id}')"></div>
                    <div class="">
                        <div class="fw-bolder fs-4" onClick="singleproduct('${data[i]._id}')">${data[i].title}</div>
                        <div class="">
                            <span onClick="singleproduct('${data[i]._id}')">${data[i].witer}</span>,
                            <span onClick="singleproduct('${data[i]._id}')">${data[i].cover}</sapn>
                        </div>
                        <div class="" style="text-align: justify;">${data[i].description.slice(0,300)+".."}</div>
                        <div class="pt-3">
                            <div class="px-2"><button onClick="updateProduct('${data[i]._id}')" class="custom-btn btn-15">Update</button></div>
                            <div class="pt-3"><button onClick="deleteProduct('${data[i]._id}')" class="custom-btn btn-12" ><span>DELETE</span><span>Click!</span></button></div>
                        </div>
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


function updateProduct(id){
    console.log("reached......",id);
    window.location=`updatesingle.html?id=${id}`
}
 async function updateData(){
    console.log("reached to udate............");
    let location = window.location
    let querystring = location.search
    let url_params = new URLSearchParams(querystring);


    let id = url_params.get('id');
    console.log('id from update', id);

    try {
        let response = await fetch(`/users/${id}`);
        console.log("response",response);

        let prased_data = await response.json();
        console.log("parsed_data",prased_data);

        let data = prased_data.data;
        console.log("data",data);

        let title = document.getElementById('title');
        title.value = data.title;

         let price = document.getElementById('price');
         price.value = data.price;

         let released = document.getElementById('released');
         released.value = data.released;

         
        
        let description = document.getElementById('description');
        description.value = data.description;

  

        let  image = document.getElementById('image');
         image.value = data.image;


        let reviews = document.getElementById('review');
        reviews.value = data.reviews;


        let about = document.getElementById('about');
        about.value = data.about;


        let witer = document.getElementById('witer');
        witer.value = data.witer;

        let cover = document.getElementById('cover');
        cover.value = data.cover;






    } catch (error) {
        console.log("error",error);
    }
 }

 async function editUpdate(event){
    event.preventDefault();

    let title = document.getElementById('title').value;
    let price = document.getElementById('price').value;
    let description = document.getElementById('description').value;
    let released = document.getElementById('released').value;
    let image = document.getElementById('image').value;
    let reviews = document.getElementById('review').value;
    let about = document.getElementById('about').value;
    let witer = document.getElementById('witer').value;
    let cover = document.getElementById('cover').value;


    let data={
        title,
        price,
        description,
        released,
        image,
        reviews,
        about,
        witer,
        cover
    }
    let json_data = JSON.stringify(data);
    console.log("json_data",json_data);

    let params = new URLSearchParams(window.location.search);
    console.log("params", params);

    let id = params.get('id')
    console.log("id from update data", id);


    try {
        let response = await fetch(`/userupdate/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json_data
        })
        let parsed_response = await response.json();
        console.log('parsed_response', parsed_response);

        if(response.status===200){
            alert("product updated successfully")
        }else{
            alert("somthing went wrong")
        }

        window.location='admin.html';
    }catch(error) {
        console.log("error", error);
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



