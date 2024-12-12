// Get all downtimes returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_downtimes::DowntimesAPI;
use datadog_api_client::datadogV1::api_downtimes::ListDowntimesOptionalParams;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = DowntimesAPI::with_config(configuration);
    let resp = api
        .list_downtimes(ListDowntimesOptionalParams::default().with_creator(true))
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
