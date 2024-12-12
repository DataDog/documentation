// Get Fastly account returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_fastly_integration::FastlyIntegrationAPI;

#[tokio::main]
async fn main() {
    // there is a valid "fastly_account" in the system
    let fastly_account_data_id = std::env::var("FASTLY_ACCOUNT_DATA_ID").unwrap();
    let configuration = datadog::Configuration::new();
    let api = FastlyIntegrationAPI::with_config(configuration);
    let resp = api.get_fastly_account(fastly_account_data_id.clone()).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
