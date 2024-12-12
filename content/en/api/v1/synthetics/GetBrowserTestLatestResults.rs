// Get a browser test's latest results summaries returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_synthetics::GetBrowserTestLatestResultsOptionalParams;
use datadog_api_client::datadogV1::api_synthetics::SyntheticsAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = SyntheticsAPI::with_config(configuration);
    let resp = api
        .get_browser_test_latest_results(
            "2yy-sem-mjh".to_string(),
            GetBrowserTestLatestResultsOptionalParams::default(),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
