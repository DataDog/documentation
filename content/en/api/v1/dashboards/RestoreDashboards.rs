// Restore deleted dashboards returns "No Content" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboards::DashboardsAPI;
use datadog_api_client::datadogV1::model::DashboardBulkActionData;
use datadog_api_client::datadogV1::model::DashboardResourceType;
use datadog_api_client::datadogV1::model::DashboardRestoreRequest;

#[tokio::main]
async fn main() {
    // there is a valid "dashboard" in the system
    let dashboard_id = std::env::var("DASHBOARD_ID").unwrap();
    let body = DashboardRestoreRequest::new(vec![DashboardBulkActionData::new(
        dashboard_id.clone(),
        DashboardResourceType::DASHBOARD,
    )]);
    let configuration = datadog::Configuration::new();
    let api = DashboardsAPI::with_config(configuration);
    let resp = api.restore_dashboards(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
