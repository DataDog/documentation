// Edit a monitor returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_monitors::MonitorsAPI;
use datadog_api_client::datadogV1::model::MonitorOptions;
use datadog_api_client::datadogV1::model::MonitorThresholds;
use datadog_api_client::datadogV1::model::MonitorUpdateRequest;

#[tokio::main]
async fn main() {
    // there is a valid "monitor" in the system
    let monitor_id: i64 = std::env::var("MONITOR_ID").unwrap().parse().unwrap();
    let body = MonitorUpdateRequest::new()
        .name("My monitor-updated".to_string())
        .options(
            MonitorOptions::new()
                .evaluation_delay(None)
                .new_group_delay(Some(600))
                .new_host_delay(None)
                .renotify_interval(None)
                .thresholds(MonitorThresholds::new().critical(2.0 as f64).warning(None))
                .timeout_h(None),
        )
        .priority(None);
    let configuration = datadog::Configuration::new();
    let api = MonitorsAPI::with_config(configuration);
    let resp = api.update_monitor(monitor_id.clone(), body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
