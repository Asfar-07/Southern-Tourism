function MainImagepicker(){
  var  firstimg=document.getElementById('1stimg')
  var  secondimg=document.getElementById('2stimg')
  var  thirdtimg=document.getElementById('3stimg')
  var  firstimgview=document.getElementById('1stimgview')
  var  secondimgview=document.getElementById('2stimgview')
  var  thirdtimgview=document.getElementById('3stimgview')
    firstimg.addEventListener('input',()=>{
        const reader = new FileReader();
        reader.onload = () => {
          var imageData = reader.result;
            firstimgview.src=imageData
        }
        reader.readAsDataURL(firstimg.files[0])
      
    })
    secondimg.addEventListener('input',()=>{
        const reader = new FileReader();
        reader.onload = () => {
          var imageData = reader.result;
            secondimgview.src=imageData
        }
        reader.readAsDataURL(secondimg.files[0])
    })
    thirdtimg.addEventListener('input',()=>{
        const reader = new FileReader();
        reader.onload = () => {
          var imageData = reader.result;
            thirdtimgview.src=imageData
        }
        reader.readAsDataURL(thirdtimg.files[0])
    })
    var  firstimghotel=document.getElementById('1stimghotel')
    var  secondimghotel=document.getElementById('2stimghotel')
    var  thirdtimghotel=document.getElementById('3stimghotel')
    var  firstimgviewhotel=document.getElementById('1stimgviewhotel')
    var  secondimgviewhotel=document.getElementById('2stimgviewhotel')
    var  thirdtimgviewhotel=document.getElementById('3stimgviewhotel')
    firstimghotel.addEventListener('input',()=>{
        const reader = new FileReader();
        reader.onload = () => {
          var imageData = reader.result;
            firstimgviewhotel.src=imageData
        }
        reader.readAsDataURL(firstimghotel.files[0])
      
    })
    secondimghotel.addEventListener('input',()=>{
        const reader = new FileReader();
        reader.onload = () => {
          var imageData = reader.result;
            secondimgviewhotel.src=imageData
        }
        reader.readAsDataURL(secondimghotel.files[0])
    })
    thirdtimghotel.addEventListener('input',()=>{
        const reader = new FileReader();
        reader.onload = () => {
          var imageData = reader.result;
            thirdtimgviewhotel.src=imageData
        }
        reader.readAsDataURL(thirdtimghotel.files[0])
    })
}
function sendtobackend(){
  // Select all <a> tags within <div> elements with class "linkpart"
const linkElements = document.querySelectorAll('div.linkpart a');

// Select all <p> tags within <div> elements with class "createright"
const paragraphElements = document.querySelectorAll('div.createright p');

// Convert NodeList to arrays using Array.from()
const linksArray = Array.from(linkElements);
const paragraphsArray = Array.from(paragraphElements);

// Combine the arrays while ensuring they have the same length
const minLength = Math.min(linksArray.length, paragraphsArray.length);

// Initialize an empty array to store the links with associated paragraph text
const links = [];

// Iterate over the combined arrays
for (let i = 0; i < minLength; i++) {
const linkElement = linksArray[i];
const paragraphElement = paragraphsArray[i];

// Create an object with href, textContent, and timetrip properties
const linkObject = {
href: linkElement.getAttribute('href'), // Get the href attribute
textContent: linkElement.textContent, // Get the text content of <a> tag
timetrip: paragraphElement.textContent // Get the text content of <p> tag
};

// Push the object to the links array
links.push(linkObject);
}

console.log(links);
return(links)

}
async function submitAllData(){
  const PackageName = document.querySelector('.PackageName').textContent;
  const PackageId = document.querySelector('.packid').textContent;
  const CreateNewLDiv=document.querySelector('.createleft')
  var currentHeight = CreateNewLDiv.clientHeight;
  if(PackageName != "PackName"){
  var  image1=document.getElementById('1stimg').files[0];
  var  image2=document.getElementById('2stimg').files[0];
  var  image3=document.getElementById('3stimg').files[0];
  var  image4=document.getElementById('1stimghotel').files[0];
  var  image5=document.getElementById('2stimghotel').files[0];
  var  image6=document.getElementById('3stimghotel').files[0];
  const maintextareahotel=document.querySelector("div.hotelreview p")
  const maintextarea=document.querySelector("div.LeftSection p")
  const Maindetail=maintextarea.textContent
  const Hoteldetail=maintextareahotel.textContent
if(image1 && image2 && image3 && image4 && image5 && image6){
const Locationmap= sendtobackend()
  const formData = new FormData();
    formData.append('images', image1);
    formData.append('images', image2);
    formData.append('images', image3);
    formData.append('images', image4);
    formData.append('images', image5);
    formData.append('images', image6);
    const aadata="hello"
   await fetch('/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      
          body: JSON.stringify({PackageName,PackageId,Locationmap,Maindetail,Hoteldetail,currentHeight})
    })
  .then( (response) => {
      // Handle response from server
      
  })
  .catch(error => {
      console.error('Error:', error);
  });
  await  fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        // Handle response from server
        window.location.href = 'http://localhost:5000/Profile';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}else{
  alert("enter all image")
}
  }else{
    alert("enter all PackName")
  }
}
MainImagepicker()
