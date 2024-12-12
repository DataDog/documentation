// Cancel downtimes by scope returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_downtimes::DowntimesAPI;
use datadog_api_client::datadogV1::model::CancelDowntimesByScopeRequest;

#[tokio::main]
async fn main() {
    // there is a valid "downtime" in the system
    let downtime_scope_0 = std::env::var("DOWNTIME_SCOPE_0").unwrap();
    let body = CancelDowntimesByScopeRequest::new(downtime_scope_0.clone());
    let configuration = datadog::Configuration::new();
    let api = DowntimesAPI::with_config(configuration);
    let resp = api.cancel_downtimes_by_scope(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
