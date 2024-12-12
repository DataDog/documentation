// Update a shared dashboard returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboards::DashboardsAPI;
use datadog_api_client::datadogV1::model::DashboardGlobalTimeLiveSpan;
use datadog_api_client::datadogV1::model::DashboardShareType;
use datadog_api_client::datadogV1::model::SharedDashboardUpdateRequest;
use datadog_api_client::datadogV1::model::SharedDashboardUpdateRequestGlobalTime;

#[tokio::main]
async fn main() {
    // there is a valid "shared_dashboard" in the system
    let shared_dashboard_token = std::env::var("SHARED_DASHBOARD_TOKEN").unwrap();
    let body = SharedDashboardUpdateRequest::new(Some(
        SharedDashboardUpdateRequestGlobalTime::new()
            .live_span(DashboardGlobalTimeLiveSpan::PAST_FIFTEEN_MINUTES),
    ))
    .share_list(Some(vec![]))
    .share_type(Some(DashboardShareType::OPEN));
    let configuration = datadog::Configuration::new();
    let api = DashboardsAPI::with_config(configuration);
    let resp = api
        .update_public_dashboard(shared_dashboard_token.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
