// Trigger Synthetic tests returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_synthetics::SyntheticsAPI;
use datadog_api_client::datadogV1::model::SyntheticsTriggerBody;
use datadog_api_client::datadogV1::model::SyntheticsTriggerTest;

#[tokio::main]
async fn main() {
    // there is a valid "synthetics_api_test" in the system
    let synthetics_api_test_public_id = std::env::var("SYNTHETICS_API_TEST_PUBLIC_ID").unwrap();
    let body = SyntheticsTriggerBody::new(vec![SyntheticsTriggerTest::new(
        synthetics_api_test_public_id.clone(),
    )]);
    let configuration = datadog::Configuration::new();
    let api = SyntheticsAPI::with_config(configuration);
    let resp = api.trigger_tests(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
