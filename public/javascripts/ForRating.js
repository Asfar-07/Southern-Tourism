async function postbackside(){
    const adjacentDiv=document.getElementById('ForRating')
    const useremail=document.getElementById("useremail").textContent
        console.log(totalRating)
        document.getElementById("totalRating").textContent=totalRating
        document.getElementById("totaluserRating").textContent=numUsers
        var placename=document.getElementById('Placename').textContent
        const Rating = totalRating / numUsers;
        const averageRating=Rating.toFixed(1)
        adjacentDiv.style.display = 'none';
        viewrating.textContent=`rating:-${averageRating}/5`
        await fetch('/placerating', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            
                body: JSON.stringify({totalRating,numUsers,placename,useremail})
          })
   }