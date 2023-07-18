const fetchData = callback=>{
    setTimeout(()=>{
        callback('Done!');
    }, 1500);
}

setTimeout(()=>{
    console.log('Timer is done!');
    fetchData()
}, 2000)

console.log('Hi!');
console.log('Hello!')