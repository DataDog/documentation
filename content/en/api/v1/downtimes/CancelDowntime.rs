// Cancel a downtime returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_downtimes::DowntimesAPI;

#[tokio::main]
async fn main() {
    // there is a valid "downtime" in the system
    let downtime_id: i64 = std::env::var("DOWNTIME_ID").unwrap().parse().unwrap();
    let configuration = datadog::Configuration::new();
    let api = DowntimesAPI::with_config(configuration);
    let resp = api.cancel_downtime(downtime_id.clone()).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
