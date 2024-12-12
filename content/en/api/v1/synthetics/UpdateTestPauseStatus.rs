// Pause or start a test returns "OK - Returns a boolean indicating if the update
// was successful." response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_synthetics::SyntheticsAPI;
use datadog_api_client::datadogV1::model::SyntheticsTestPauseStatus;
use datadog_api_client::datadogV1::model::SyntheticsUpdateTestPauseStatusPayload;

#[tokio::main]
async fn main() {
    let body =
        SyntheticsUpdateTestPauseStatusPayload::new().new_status(SyntheticsTestPauseStatus::LIVE);
    let configuration = datadog::Configuration::new();
    let api = SyntheticsAPI::with_config(configuration);
    let resp = api
        .update_test_pause_status("public_id".to_string(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
