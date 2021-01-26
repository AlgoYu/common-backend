// 子路由
let children = [];

// 遍历树形结构 把叶子点的组件路径导入children
function importForLeaf(routes){
    routes.forEach(element => {
        element.path = element.uri;
        if(element.child.length > 0){
            importForLeaf(element.child);
        }else{
            element.component = ()=>import("@/views"+element.uri+"/Index.vue");
            children.push(element);
        }
    });
}

// 新的路由表
function createRoutes(routes){
    children = [];
    importForLeaf(routes);
    return [{
        path: "/Login",
        name: "登录界面",
        component: () => import("@/views/Login.vue")
    }, {
        path: "/",
        name: "后台管理",
        component: () => import("@/views/Main.vue"),
        children: children
    }];
}
export { createRoutes }