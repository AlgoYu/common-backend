// 后端地址
const apiUrl = "http://127.0.0.1:8888"

// 菜单图标
const icons = new Map();
icons.set("SYSTEM","icon-setup_fill");
icons.set("DATACENTER","icon-chart");
icons.set("DEVELOP:GENERATOR","icon-barrage_fill");
icons.set("DEVELOP:DATAMONITOR","icon-database");
icons.set("DEVELOP:SYSTEMEXCEPTION","icon-flashlight_fill");
icons.set("MANAGEMENT","icon-manage_fill");
icons.set("DEVELOP","icon-codelibrary-fill");
icons.set("DEVELOP:DATABASE","icon-database");
icons.set("MANAGEMENT:SYSTEMUSER","icon-people_fill");
icons.set("MANAGEMENT:SYSTEMROLE","icon-role");
icons.set("MANAGEMENT:SYSTEMAUTHORITY","icon-quanxian");
icons.set("DEVELOP:APPLICATIONMONITOR","icon-stealth_fill");
icons.set("DEVELOP:DOCUMENTATION","icon-order_fill");
icons.set("SYSTEM:DICTIONARY","icon-createtask");

// 导出
export {apiUrl, icons};