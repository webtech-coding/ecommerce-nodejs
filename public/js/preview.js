class Preview{
    constructor(){
        this.image=document.querySelector('.images')
        this.container=document.querySelector('.form__images')
        this.update()

    }

    update(){
        this.image.addEventListener('change',()=>{
            const files=this.image.files
            const totalImages=files.length 

            for(let i=0; i<totalImages; i++){
                
                const img=document.createElement('img')
                img.setAttribute('class','form__images-item')
                const reader=new FileReader()
                reader.onload=(e)=>{
                    img.setAttribute('src',e.target.result)
                    this.container.appendChild(img)
                }

                reader.readAsDataURL(files[i])

            }
           
        })
    }

}

new Preview()