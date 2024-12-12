// Get a shared dashboard returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboards::DashboardsAPI;

#[tokio::main]
async fn main() {
    // there is a valid "shared_dashboard" in the system
    let shared_dashboard_token = std::env::var("SHARED_DASHBOARD_TOKEN").unwrap();
    let configuration = datadog::Configuration::new();
    let api = DashboardsAPI::with_config(configuration);
    let resp = api
        .get_public_dashboard(shared_dashboard_token.clone())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
