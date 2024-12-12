// Delete a monitor returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_monitors::DeleteMonitorOptionalParams;
use datadog_api_client::datadogV1::api_monitors::MonitorsAPI;

#[tokio::main]
async fn main() {
    // there is a valid "monitor" in the system
    let monitor_id: i64 = std::env::var("MONITOR_ID").unwrap().parse().unwrap();
    let configuration = datadog::Configuration::new();
    let api = MonitorsAPI::with_config(configuration);
    let resp = api
        .delete_monitor(monitor_id.clone(), DeleteMonitorOptionalParams::default())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
