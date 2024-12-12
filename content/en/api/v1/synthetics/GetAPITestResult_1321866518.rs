// Get an API test result returns result with failure object
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_synthetics::SyntheticsAPI;

#[tokio::main]
async fn main() {
    // there is a "synthetics_api_test_with_wrong_dns" in the system
    let synthetics_api_test_with_wrong_dns_public_id =
        std::env::var("SYNTHETICS_API_TEST_WITH_WRONG_DNS_PUBLIC_ID").unwrap();

    // the "synthetics_api_test_with_wrong_dns" is triggered
    let synthetics_api_test_with_wrong_dns_result_results_0_result_id =
        std::env::var("SYNTHETICS_API_TEST_WITH_WRONG_DNS_RESULT_RESULTS_0_RESULT_ID").unwrap();
    let configuration = datadog::Configuration::new();
    let api = SyntheticsAPI::with_config(configuration);
    let resp = api
        .get_api_test_result(
            synthetics_api_test_with_wrong_dns_public_id.clone(),
            synthetics_api_test_with_wrong_dns_result_results_0_result_id.clone(),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
