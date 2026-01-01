// Button status
const buttonStatus = document.querySelectorAll("[button-status]")
if(buttonStatus.length > 0){
    let url = new URL(window.location.href);

    buttonStatus.forEach(button =>{
        button.addEventListener("click",()=>{
            if(status){
                // phần sau dấu ? là searchParams
                url.searchParams.set("status", status);
            }
            else{
                url.searchParams.delete("status");
            }
            // console.log(url.href)
            window.location.href = url.href;
        })
    });
}

// Form Search
const formSearch = document.querySelector("#form-search");

if (formSearch) {
    let url = new URL(window.location.href);

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault(); // ngăn load lại trang làm xóa hết các tham số trên url 
        const keyword = e.target.elements.keyword.value;

        if (keyword) {
            url.searchParams.set("keyword", keyword);
        } 
        else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
}
// End Form Search