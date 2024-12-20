module.exports={
    ProfileImage:(userData)=>{
        const PackageData=userData
        // console.log(userData)
        function truncateText(text, maxLength) {
                if (text.length <= maxLength) {
                    return text;
                } else {
                    return text.slice(0, maxLength) + '...';
                }
            }
        for(i=0;i<userData.length;i++){
            let originalText = PackageData[i].mainabout
            let truncatedText = truncateText(originalText, 200); 
            console.log(truncatedText)
             PackageData[i].mainabout=truncatedText // Truncate to 150 characters
               const splitMainimage=PackageData[i].mainImages.split("||") 
                PackageData[i].DPImage=splitMainimage[0]
                // PackageData[i].email="asfarbismi@gmail.com"
        }  
        // console.log(PackageData)
        return
      },
      MainUpdateSpliteImage:(userData)=>{
        const PackageData=userData
        const splitMainimage=PackageData.mainImages.split("||") 
        const splitHotelimage=PackageData.hotelImage.split("||")
        // console.log(splitHotelimage)
        PackageData.mainimage1="/"+splitMainimage[0]
        PackageData.mainimage2="/"+splitMainimage[1]
        PackageData.mainimage3="/"+splitMainimage[2]
        PackageData.hotelimage1="/"+splitHotelimage[0]
        PackageData.hotelimage2="/"+splitHotelimage[1]
        PackageData.hotelimage3="/"+splitHotelimage[2]
        return
      },
      MainUpdateSpliteImageloop:(userData)=>{
        const PackageData=userData
        for(i=0;i<PackageData.length;i++){

        const splitMainimage=PackageData[i].mainImages.split("||") 
        const splitHotelimage=PackageData[i].hotelImage.split("||")
        // console.log(splitHotelimage)
        PackageData[i].mainimage1="/"+splitMainimage[0]
        PackageData[i].mainimage2="/"+splitMainimage[1]
        PackageData[i].mainimage3="/"+splitMainimage[2]
        PackageData[i].hotelimage1="/"+splitHotelimage[0]
        PackageData[i].hotelimage2="/"+splitHotelimage[1]
        PackageData[i].hotelimage3="/"+splitHotelimage[2]
        }
      },
      MainUpdateSpliteLocation:(userData)=>{
        const PackageData=userData
        const splitpackhref=PackageData.packhref.split("||") 
        const splitpackplacename=PackageData.packplacename.split("||") 
        const splitpacktimetrip=PackageData.packtimetrip.split("||") 
        var locationdata=[]
        var locationtime=[]
        for(i=0;i<splitpackhref.length-1;i++){
            locationdata[i]={
                packhref:splitpackhref[i],
                packplacename:splitpackplacename[i]
            }
            locationtime[i]={
                packtimetrip:splitpacktimetrip[i]
            }
        }
        // console.log(locationtime)

        return({locationname:locationdata,time:locationtime})
      },
      MainUpdateSplitecomments:(userdata)=>{
        const PackageData=userdata
        var allcommentsdata=[]
        if(PackageData.usercommentsemail){
        const splitusercommentsemail=PackageData.usercommentsemail.split("||") 
        const splitusercomments=PackageData.usercomments.split("||") 
        for(i=0;i<splitusercomments.length-1;i++){
            allcommentsdata[i]={
                usercomments:splitusercomments[i],
                usercommentsemail:splitusercommentsemail[i]
            }
        }

    }
        return (allcommentsdata)
      },
      CompressText:(PlaceData)=>{
          function truncateText(text, maxLength) {
              if (text.length <= maxLength) {
                  return text;
                } else {
                    return text.slice(0, maxLength) + '...';
                }
            }
            for(i=0;i<PlaceData.length;i++){
            let originalText =PlaceData[i].placeabout
            let truncatedText = truncateText(originalText, 250); 
            PlaceData[i].placeabout=truncatedText
          }
          return
      }
}