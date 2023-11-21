import {Clothing} from './../models/Clothing.js';

const saveLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}

const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key) );
}

const getClothFromJson = (arrItem = []) => {
    let promise = axios({
        method: 'GET',
        url: './../data/Data.json',
        responseType: 'json',
    });

    promise.then((result) => {
        console.log(result.data.tabPanes.forEach(element => {
            arrItem.push(element);
            // console.log(arrItem);
            saveLocalStorage("item", arrItem);
        }));
    }).catch((error) => {
        console.log(error);
    })
}
getClothFromJson();
// console.log(localStorage["item"]);

const getItemByType = (key) => {
    let content = '';
   getLocalStorage("item").filter((item, index) => {
    return item.type == key;
   }).forEach((item) => {
    let newItem = new Clothing();
    Object.assign(newItem, item);
    content += `
        <div class="col-lg-3 mt-3">
        <a type = "button" onclick = "addItemToModel('${newItem.id}', '${newItem.type}')" class="d-block w-100">
            <img src="${newItem.imgSrc_jpg}" alt="#" class="img-fluid w-100">
        </a>
        <a type = "button" onclick = "addItemToModel('${newItem.id}', '${newItem.type}')" class="d-block w-100">
            <h5 class="text-center mt-3">${newItem.name}</h5>
        </a>
        
        </div>
    `
    document.getElementById('tabContent').innerHTML = content;
   })
}

window.getItemByType = getItemByType

const getNavPillsFromJson = () => {
    let promise  = axios({
        method: 'GET',
        url: './../data/Data.json',
        responseType: 'json',
    })

    promise.then((result) => {
        let content = '';
        console.log(result.data.navPills.forEach(element => {
            content += `
            <li class="nav-item">
            <button type="button" onclick = "getItemByType('${element.type}')" class="nav-link">${element.showName}</button>
            </li>
            `
            // console.log(content);
            document.querySelector('.nav-pills').innerHTML = content;
        }));
        
        
    }).catch((error) => {
        console.log(error)
    })
}
getNavPillsFromJson();


let arrchooseItem = [];

const showItem = () => {
    // 1 get data from local storage
    // 2 add data to an array
    // 3 execute for each element in an array to get the value

    arrchooseItem.forEach((item) => {
        switch(item.type){
            case "topclothes":
                document.querySelector('.bikinitop').innerHTML = `<img src=${item.imgSrc_png} class="img-fluid position-relative" style="z-index: 10;" alt="">`
                
                break;
            
            case "botclothes":
                document.querySelector('.bikinibottom').innerHTML = `<img src=${item.imgSrc_png} class="img-fluid position-relative" style="z-index: 10;" alt="">`
                    
                break;

            case "shoes":
                document.querySelector('.feet').innerHTML = `<img src=${item.imgSrc_png} class="img-fluid position-relative" style="z-index: 10;" alt="">`
                
                break;
            
            case "handbags":
                document.querySelector('.handbag').innerHTML = `<img src=${item.imgSrc_png} class="img-fluid position-relative" style="z-index: 10;" alt="">`
                
                break;

            case "necklaces":
                document.querySelector('.necklace').innerHTML = `<img src=${item.imgSrc_png} class="img-fluid position-relative" style="z-index: 20;" alt="">`
                    
                break;
            
            case "hairstyle":
                document.querySelector('.hairstyle').innerHTML = `<img src=${item.imgSrc_png} class="img-fluid position-relative d-block" style="z-index: 10; margin-left: 50px; margin-top: 13px" alt="">`
                        
                break;

            case "background":
                document.querySelector('.background').style.backgroundImage = `url('${item.imgSrc_png}')`
                        
                break;
        }
    })
}
