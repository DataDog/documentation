// Get all dashboard lists returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboard_lists::DashboardListsAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = DashboardListsAPI::with_config(configuration);
    let resp = api.list_dashboard_lists().await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
