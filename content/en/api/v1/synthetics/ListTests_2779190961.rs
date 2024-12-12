// Client is resilient to enum and oneOf deserialization errors
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_synthetics::ListTestsOptionalParams;
use datadog_api_client::datadogV1::api_synthetics::SyntheticsAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = SyntheticsAPI::with_config(configuration);
    let resp = api.list_tests(ListTestsOptionalParams::default()).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
