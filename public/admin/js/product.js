// Change status
const buttonsChangeStatus = document.querySelectorAll('[button-change-status]');
if(buttonsChangeStatus.length > 0){
    const formChangeStatus = document.getElementById('form-change-status');
    const path = formChangeStatus.getAttribute('data-path');

    buttonsChangeStatus.forEach(button => {
        button.addEventListener('click', ()=>{
            const statusCurrent = button.getAttribute('data-status');
            const id = button.getAttribute('data-id');
            
            let statusChange = statusCurrent === 'active' ? 'inactive' : 'active';

            // Gửi qua url thì method luôn là GET
            // Để gửi method khác thì dùng fetch/form 
            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action = action;
            
            // submit form mà không cần nút submit
            formChangeStatus.submit();
        });
    });
}
// End change status

// Delete product
const buttonsDelete = document.querySelectorAll('[button-delete]');
if(buttonsDelete.length > 0){
    const formDeleteItem = document.querySelector('#form-delete-item'); // Lấy form xóa
    const path = formDeleteItem.getAttribute('data-path');
    
    buttonsDelete.forEach(button => {
        button.addEventListener('click', ()=>{
            const isConfirmed = confirm('Bạn có chắc muốn xóa sản phẩm này không?');
            if(isConfirmed){
                const id = button.getAttribute('data-id');
                
                const action = path + `/${id}?_method=DELETE`;
                formDeleteItem.action = action;

                // submit form xóa đó lên param
                formDeleteItem.submit();
            }
        });

    });

}
// End delete product