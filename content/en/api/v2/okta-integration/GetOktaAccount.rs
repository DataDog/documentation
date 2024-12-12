// Get Okta account returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_okta_integration::OktaIntegrationAPI;

#[tokio::main]
async fn main() {
    // there is a valid "okta_account" in the system
    let okta_account_data_id = std::env::var("OKTA_ACCOUNT_DATA_ID").unwrap();
    let configuration = datadog::Configuration::new();
    let api = OktaIntegrationAPI::with_config(configuration);
    let resp = api.get_okta_account(okta_account_data_id.clone()).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
