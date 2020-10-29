const apiUrl = "http://localhost:8888"

// 菜单图标
var icons = new Map();
icons.set("SYSTEM","icon-set");
icons.set("DATACENTER","icon-tradingdata");
icons.set("DEVELOP:GENERATOR","icon-electronics");
icons.set("DEVELOP:DATABASE","icon-ali-clould-fill");
icons.set("DEVELOP:EXCEPTION","icon-feeds-fill");
icons.set("MANAGEMENT","icon-fencengpeizhi");
icons.set("DEVELOP","icon-code");
icons.set("DASHBOARD","icon-tradingdata");
icons.set("DEVELOP:DATABASE","icon-hardware");
icons.set("MANAGEMENT:USER","icon-account-fill");
icons.set("MANAGEMENT:ROLE","icon-becomeagoldsupplier");
icons.set("MANAGEMENT:AUTHORITY","icon-operation");

export default {
	apiUrl,
	icons
}