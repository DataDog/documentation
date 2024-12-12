// Update a dashboard list returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboard_lists::DashboardListsAPI;
use datadog_api_client::datadogV1::model::DashboardList;

#[tokio::main]
async fn main() {
    // there is a valid "dashboard_list" in the system
    let dashboard_list_id: i64 = std::env::var("DASHBOARD_LIST_ID").unwrap().parse().unwrap();
    let body = DashboardList::new("updated Example-Dashboard-List".to_string());
    let configuration = datadog::Configuration::new();
    let api = DashboardListsAPI::with_config(configuration);
    let resp = api
        .update_dashboard_list(dashboard_list_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
