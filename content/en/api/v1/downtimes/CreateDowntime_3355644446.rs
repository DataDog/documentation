// Schedule a monitor downtime returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_downtimes::DowntimesAPI;
use datadog_api_client::datadogV1::model::Downtime;

#[tokio::main]
async fn main() {
    // there is a valid "monitor" in the system
    let monitor_id: i64 = std::env::var("MONITOR_ID").unwrap().parse().unwrap();
    let body = Downtime::new()
        .message(Some("Example-Downtime".to_string()))
        .monitor_id(Some(monitor_id.clone()))
        .scope(vec!["test:exampledowntime".to_string()])
        .start(1636629071)
        .timezone("Etc/UTC".to_string());
    let configuration = datadog::Configuration::new();
    let api = DowntimesAPI::with_config(configuration);
    let resp = api.create_downtime(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
