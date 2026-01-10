module.exports = (query) =>{
    const currentStatus = query.status || "";
    const filterStatus = [
        { name: "Tất cả", status: "" },
        { name: "Hoạt động", status: "active" },
        { name: "Dừng hoạt động", status: "inactive" }
    ];
    return { currentStatus, filterStatus };
}