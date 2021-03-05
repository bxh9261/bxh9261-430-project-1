       let alignBoxes;
       let charBoxes;
       let charSelected = -1;
       let charObj;
       let characterSet;
        
       const handleResponse = (e) => {
          console.log("e.target =", e.target); //here, e.target is the xhr object
          console.log("e.target.response =", e.target.response); //so that means this is a string of "joke" JSON
          const obj = JSON.parse(e.target.response); //turn it back into an object
          console.log("obj=",obj);
          charObj = obj;
          //add character images to boxes
           let cboxes = document.querySelectorAll(".cbox");
           for(let i = 0; i < obj.length; i+=1){
               let image = document.createElement("img");
               image.src = obj[i].img;
               cboxes[i].appendChild(image);
           }
      };
        
      const boxReset = () => {
          for(let i = 0; i < alignBoxes.length; i+=1){
              alignBoxes[i].style.backgroundColor = "green";
          }
          for(let i = 0; i < charBoxes.length; i+=1){
              charBoxes[i].style.backgroundColor = "blue";
              //going to do this more elegantly later
              if(charBoxes[i].getElementsByTagName("img").length > 0){
                  charBoxes[i].getElementsByTagName("img")[0].style.backgroundColor = "blue";
              }
          }
      }
        
      const alignClicked = (e) => {
        // remember that an `Event` object gets passed along every time that an event handler or listener calls a function
        // the `target` property of that event points at the element that sent the event, in this case a button
        console.log(`An element of id=${e.target.id} was clicked!`);
        boxReset(); 
        if(charSelected > -1){
            let image = document.createElement("img");
            image.src = charObj[charSelected].img;
            e.target.appendChild(image);
        }
      }
        
      const charClicked = (e) => {
        // remember that an `Event` object gets passed along every time that an event handler or listener calls a function
        // the `target` property of that event points at the element that sent the event, in this case a button
        console.log(`An element of id=${e.target.id} was clicked!`);
        
        boxReset();  
        console.log(e.target);  
        e.target.style.backgroundColor = "red";
        for(let i = 0; i < charBoxes.length; i+=1){
            if(e.target === charBoxes[i].getElementsByTagName("img")[0]){
                charSelected = i;
                console.log(charSelected);
            }
        }
      }
      
     const getCharSet = (set = 'Spongebob') => {
        const jokeURL = "/get-characters";
        fullURL = jokeURL.concat("?set=" + set);
        const xhr = new XMLHttpRequest();
        xhr.onload = handleResponse;
        xhr.open("GET", fullURL);
        // with XHR, after we open a connection, but before we 'send()', we can set 1 or more HTTP request headers
        //this is not strictly necessary because "/random-joke" sends JSON by default
        xhr.setRequestHeader('Accept', "application/javascript");
        xhr.send();
     }
     
     const resetChars = () => {
          for(let i = 0; i < charBoxes.length; i+=1){
              charBoxes[i].innerHTML = "";
          }
         getCharSet(characterSet.options[characterSet.selectedIndex].text);
     }
      
      const init = () => {
        getCharSet();
        // An Event *Listeners*
        alignBoxes = document.querySelectorAll(".box");
          for(let i = 0; i < alignBoxes.length; i+=1){
              alignBoxes[i].addEventListener("click", alignClicked);
          }
        charBoxes = document.querySelectorAll(".cbox");
          for(let i = 0; i < charBoxes.length; i+=1){
              charBoxes[i].addEventListener("click", charClicked);
          }
        
        characterSet = document.querySelector("#characterSet");
        characterSet.addEventListener("change", resetChars);
      }
      
      window.onload = init;