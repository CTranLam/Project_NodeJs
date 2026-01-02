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