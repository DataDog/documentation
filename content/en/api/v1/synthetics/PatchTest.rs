// Patch a Synthetic test returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_synthetics::SyntheticsAPI;
use datadog_api_client::datadogV1::model::SyntheticsPatchTestBody;
use datadog_api_client::datadogV1::model::SyntheticsPatchTestOperation;
use datadog_api_client::datadogV1::model::SyntheticsPatchTestOperationName;
use serde_json::Value;

#[tokio::main]
async fn main() {
    // there is a valid "synthetics_api_test" in the system
    let synthetics_api_test_public_id = std::env::var("SYNTHETICS_API_TEST_PUBLIC_ID").unwrap();
    let body = SyntheticsPatchTestBody::new().data(vec![
        SyntheticsPatchTestOperation::new()
            .op(SyntheticsPatchTestOperationName::REPLACE)
            .path("/name".to_string())
            .value(Value::from("New test name")),
        SyntheticsPatchTestOperation::new()
            .op(SyntheticsPatchTestOperationName::REMOVE)
            .path("/config/assertions/0".to_string()),
    ]);
    let configuration = datadog::Configuration::new();
    let api = SyntheticsAPI::with_config(configuration);
    let resp = api
        .patch_test(synthetics_api_test_public_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
