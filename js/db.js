//accessing data offline

db.enablePersistence()
    .catch(err => {
        if(err.code == 'failed-precondition') {
            //if multiple tabs opened at once
            console.log('percistense failed!')
        }
        else if (err.code == 'unimplemented') {
            //browser not supporting
            console.log('percistense not available!')
        }
    })



//setting up real time listener

db.collection('recipes').onSnapshot(snapshot=> { 
   // console.log(snapshot.docChanges())
   snapshot.docChanges().forEach(change => {
       //console.log( change, change.doc.data(), change.doc.id)
       if (change.type === 'added') {  
           showRecipes( change.doc.data(), change.doc.id)
       }
       if (change.type === 'removed') {
          removeRecipe(change.doc.id)
    }
   });
})




