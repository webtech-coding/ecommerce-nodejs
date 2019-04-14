class DeleteConfirm{
    constructor(){
        this.deletes=document.querySelectorAll('.delete')
        this.confirmDelete()
    }

    confirmDelete(){
        this.deletes.forEach((el)=>{
            el.addEventListener('click',(e)=>{
                e.stopPropagation()

                const con=confirm('Are you sure you want to delete the category')
                if(con==true){
                    const id=el.getAttribute('data-id')
                    window.location.href=id
                }
                
            })
           
        })
    }
}

new DeleteConfirm()