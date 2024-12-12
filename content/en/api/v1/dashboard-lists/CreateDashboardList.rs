// Create a dashboard list returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboard_lists::DashboardListsAPI;
use datadog_api_client::datadogV1::model::DashboardList;

#[tokio::main]
async fn main() {
    let body = DashboardList::new("Example-Dashboard-List".to_string());
    let configuration = datadog::Configuration::new();
    let api = DashboardListsAPI::with_config(configuration);
    let resp = api.create_dashboard_list(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
