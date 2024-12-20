var connectiondb=require('../DataBase/mongoosdb')
const bcrypt=require('bcrypt');
const Schema=require("../DataBase/dbShema")
const nodemailer = require('nodemailer');
const cheerio = require('cheerio');
const { route } = require('../app');
module.exports={
    SUPPORT_SIGNUP:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.password=await bcrypt.hash(userData.password,10)
       const connection=await connectiondb()
       let response={}
       collectionName='userlogindata';
       const signData = connection.model.collectionName || connection.model(collectionName,Schema)  
       const data=await signData.findOne({email:userData.email});
       if(data){
        console.log("exited")
        resolve({status:false})
       }else{
        console.log("signup susss")
        const user =  new signData(userData)
        user.save(function(err,dataofbase) {
            if(err){
            reject(err)
            }else{
            console.log("save dtaa="+dataofbase)
            response.data=userData
            response.status=true
            resolve(response)
            }
            });
                   }
                    })

    },
    SUPPORT_LOGIN:(UserData)=>{
        return new Promise(async(resolve,reject)=>{
            const connection=await connectiondb()
            let response={}
            collectionName='userlogindata';
            const signData = connection.model.collectionName || connection.model(collectionName,Schema)  
            const data=await signData.findOne({email:UserData.email});
                        if(data){
                            bcrypt.compare(UserData.password,data.password).then(async(status)=>{
                                    if(status){
                                        console.log("passwordcorrect")
                                        response.status=true
                                        response.data=data
                                        resolve(response)
                                    }else{
                                        console.log("passwordnotcorrect")
                                        resolve({status:false})
                                    }
                            })
                        }else{
                            console.log("email not exited")
                            resolve({status:false})
                        }
        })
    },
    SUPPORT_REGISTER:async(userData,Useremail)=>{
        return new Promise(async(resolve,reject)=>{
        const { 
            full_name, gender, contact_number,
            Google_map,address,languages_spoken,
            years_experience,certification
         } = userData;
         function generateRandom15Digits() {
            let result = '';
            for (let i = 0; i < 15; i++) {
                result += Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
            }
            return result;
        }
        
        const random15Digits = generateRandom15Digits();
         const Userdetails=Useremail
         var UserData=userData;
         const $ = cheerio.load(UserData.Google_map);

         // Extract the src attribute value
         const srcValue = $('iframe').attr('src');
         
         console.log(srcValue); 
         UserData.email=Userdetails.email
         UserData.Idcheck=random15Digits
         UserData.Google_map=srcValue
         console.log(UserData)
         let response={}
         const connection=await connectiondb()
           collectionName='tempdata';  
           collectionName2='emailchecks';
           const TempRegisterData = connection.model.collectionName || connection.model(collectionName,Schema)  
           const MainRegisterData = connection.model.collectionName2 || connection.model(collectionName2,Schema) 
           const data=await MainRegisterData.findOne({email:Userdetails.email});
           const data2=await TempRegisterData.findOne({email:Userdetails.email});
           if(data || data2){
            console.log("exited")
            resolve({status:false})
           }else{
            const TempData =  new TempRegisterData(UserData)
            TempData.save(function(err,dataofbase) {
                if(err){
                reject(err)
                }else{
                console.log("save dtaa="+dataofbase)

                }
                });
           }
        const confirmLink = 'http://localhost:5000/confirm/email'
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail', // e.g., Gmail, Yahoo, etc.
                auth: {
                    user: '',
                    pass: ''
                }
            });
            const emailTemplate = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <style>
                    .collectedata{
                        margin: 5px 0;
                    }
                    .collectedata label{
                        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                        font-size: 17px;
                    }
                    button{
                        background-color: #4CAF50; 
                        color: white;
                         padding: 10px 25px;
                          text-align: center; 
                          text-decoration: none;
                           display: inline-block; 
                           font-size: 14px; 
                           margin: 4px 2px; 
                           cursor: pointer; 
                           border:0;
                        border-radius: 10px;
                    }
        
                </style>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Confirmation</title>
            </head>
            <body>
                <h2>Confirmation MemberShip</h2>
                <p>Thank you for your interest. Please click the button below to confirm your email:</p>
                <div class="MainData">
                    <div class="collectedata">
                        <label for="full_name">Full Name:</label>${full_name}<br>
                    </div>
                    <div class="collectedata">
                        <label for="gender">Gender:</label>${gender}<br>
                    </div>
                    <div class="collectedata">
                        <label for="contact_number">Contact Number:</label>${contact_number}<br>
                    </div>
                    <div class="collectedata">
                        <label for="address">Address:</label>${address}<br>
                    </div>
                    <div class="collectedata">
                        <label for="languages_spoken">Languages Spoken:</label>${languages_spoken}<br>
                    </div>
                    <div class="collectedata">
                        <label for="years_experience">Number of years as a tourist guide:</label>${years_experience}<br>
                    </div>
                    <div class="collectedata">
                        <label for="certification">Certification:</label>${certification}
                    </div>
                </div>
                <form action="${confirmLink}" method="POST">
                <input value="${random15Digits}" type="text"  name="Idcheck" style="display: none;" >
                <button type="submit">Confirm Email</button>
            </form>
            </body>
            </html>
    `;
            const mailOptions = {
                from: '',
                to: "",
                subject: 'Confirm Your Email',
                html: emailTemplate
            };
    
            await transporter.sendMail(mailOptions);
            console.log('Email confirmation sent successfully');
            response.status=true
            resolve(response)
        } catch (error) {
            console.error('Error sending email confirmation:', error);
        }
    
    //     Redirect back to the form page with a success message
        })
    },
    SUPPORT_UPDATEPAGE:async(UserData)=>{
        return new Promise(async(resolve,reject)=>{
        const Textdata=UserData.Textdata
        const PackageId=Textdata.PackageId
        const currentHeight=Textdata.currentHeight
        const Locationmap=Textdata.Locationmap
        const PackageName=Textdata.PackageName
        const Maindetail=Textdata.Maindetail
        const Hoteldetail=Textdata.Hoteldetail
        const logindata=UserData.logindata
        var splituseremail=logindata.email.split("@")
        console.log(UserData)
        const connection=await connectiondb()
        let response={}
        function generateRandom15Digits() {
            let result = '';
            for (let i = 0; i < 5; i++) {
                result += Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
            }
            return result;
        }
        collectionName='membership-'+splituseremail[0];
        collectionName2="tempacks";
        const Packupdate= connection.model.collectionName || connection.model(collectionName,Schema)
        const Packupdate2= connection.model.collectionName2 || connection.model(collectionName2,Schema)
        const random5Digits = generateRandom15Digits();
        if(UserData.Imagedata){
            // console.log(UserData.Imagedata)
            const ImageUserData=UserData.Imagedata
            var MainImage=""
            var HotelImage=""
            for(i=0;i<3;i++){
              console.log(i)
              MainImage +=ImageUserData[i].path+"||"
            }
            for(i=3;i<6;i++){
              console.log(i)
              HotelImage +=ImageUserData[i].path+"||"
            }
            console.log(MainImage,HotelImage)
            const Finddata=await Packupdate.findOne({packid: UserData.PackId})
            const Finddata2=await Packupdate2.findOne({packid: UserData.PackId})
        if(Finddata){
            Finddata.mainImages=MainImage
            Finddata.hotelImage=HotelImage
            Finddata2.mainImages=MainImage
            Finddata2.hotelImage=HotelImage
            Finddata2.save()
            Finddata.save(function(err,dataofbase) {
                if(err){
                reject(err)
                }else{
                console.log("save dtaa="+dataofbase)
                response.data=dataofbase
            response.status=true
            resolve(response)
                }
            })
        }else{
        }
        }else{
        // console.log(Maindetail)
        
        // const random5Digits = generateRandom15Digits();
        var allhref=""
        var alltextContent=""
        var alltimetrip=""
        for(i=0;i<Locationmap.length;i++){
            console.log(Locationmap[i].textContent)
            allhref +=Locationmap[i].href +"||"
            alltextContent +=Locationmap[i].textContent +"||"
            alltimetrip +=Locationmap[i].timetrip+"||"
        }  
        if(PackageId){
            const Finddata=await Packupdate.findOne({packid:PackageId})
            const Finddata2=await Packupdate2.findOne({packid:PackageId})
            if(Finddata){
                Finddata.packagename=PackageName
                Finddata.mainabout=Maindetail
                Finddata.hotelabout=Hoteldetail
                Finddata.packhref=allhref
                Finddata.packplacename=alltextContent
                Finddata.packtimetrip=alltimetrip
                Finddata.Height=currentHeight

                Finddata2.packagename=PackageName
                Finddata2.mainabout=Maindetail
                Finddata2.hotelabout=Hoteldetail
                Finddata2.packhref=allhref
                Finddata2.packplacename=alltextContent
                Finddata2.packtimetrip=alltimetrip
                Finddata2.Height=currentHeight
                Finddata2.save()
                Finddata.save(function(err,dataofbase) {
                    if(err){
                    reject(err)
                    }else{
                    console.log("AnotherTimeSave"+dataofbase)
                    response.Packid=PackageId
                    resolve(response)
                    }
                })
    
            }else{
                console.log("I can't find data")
            }
        }else{
            const user =  new Packupdate({
                focus:"packages",
                packagename:PackageName,
                packid:random5Digits+PackageName,
                mainabout:Maindetail,
                hotelabout:Hoteldetail,
                packhref:allhref,
                packplacename:alltextContent,
                packtimetrip:alltimetrip,
                Height:currentHeight,
                email:logindata.email,
                mainImages:"",
                hotelImage:"",
                usercomments: '',
                usercommentsemail: ''
            })
            const user2=  new Packupdate2({
                focus:"packages",
                packagename:PackageName,
                packid:random5Digits+PackageName,
                mainabout:Maindetail,
                hotelabout:Hoteldetail,
                packhref:allhref,
                packplacename:alltextContent,
                packtimetrip:alltimetrip,
                Height:currentHeight,
                email:logindata.email,
                mainImages:"",
                hotelImage:"",
                usercomments: '',
                usercommentsemail: ''
            })
            user2.save()
            user.save(function(err,dataofbase) {
                if(err){
                reject(err)
                }else{
                console.log("FirstTimesave"+dataofbase)
                response.Packid=random5Digits+PackageName
                resolve(response)
                }
            })
        }
      
}
    })
    }

}