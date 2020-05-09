function deleteRecord(i,name){
    console.log('func data',i,name)
    
    fetch('http://127.0.0.1:5002/listHeroes',{
        method: 'delete',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({ index: i })
    })
    .then(res => console.log('onclick delete',res))
    .catch(err => console.log('onclick delete err',err))
}

$(document).on('click','btn-delete',(req)=>{
    console.log('btn pressed',req)
})