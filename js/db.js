

//setting up real time listener

db.collection('recipes').onSnapshot(snapshot=> { //it takes a snapshot and sends to us
   // console.log(snapshot.docChanges())
   snapshot.docChanges().forEach(change => {
       //console.log( change, change.doc.data(), change.doc.id)
       if (change.type === 'added') {
           //add data to webpage
           addRecipe( change.doc.data(), change.doc.id)
       }
       if (change.type === 'removed') {
        //remove data from webpage
    }
   });
})




