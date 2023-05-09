async function Checkversion(){
    const dialog = document.getElementById("refresh-webpage"); 
    console.log("Start Checking version")
    const currentversion = await(await fetch("version.txt")).text()
    let i = 1
    setInterval(async() => {
        console.log("Check Number " + i++)
        if(currentversion !== await(await fetch("version.txt")).text()){
            console.log("new version was detected")
            dialog.show()
            setTimeout(async() => {
            location.reload()
            }, 3000)

        }else{
            dialog.close()
        }
    }, 5000)
}