// Get the list of all Synthetic tests returns "OK - Returns the list of all
// Synthetic tests." response with pagination
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_synthetics::ListTestsOptionalParams;
use datadog_api_client::datadogV1::api_synthetics::SyntheticsAPI;
use futures_util::pin_mut;
use futures_util::stream::StreamExt;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = SyntheticsAPI::with_config(configuration);
    let response = api.list_tests_with_pagination(ListTestsOptionalParams::default().page_size(2));
    pin_mut!(response);
    while let Some(resp) = response.next().await {
        if let Ok(value) = resp {
            println!("{:#?}", value);
        } else {
            println!("{:#?}", resp.unwrap_err());
        }
    }
}
