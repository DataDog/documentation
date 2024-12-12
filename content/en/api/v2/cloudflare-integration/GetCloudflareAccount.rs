// Get Cloudflare account returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_cloudflare_integration::CloudflareIntegrationAPI;

#[tokio::main]
async fn main() {
    // there is a valid "cloudflare_account" in the system
    let cloudflare_account_data_id = std::env::var("CLOUDFLARE_ACCOUNT_DATA_ID").unwrap();
    let configuration = datadog::Configuration::new();
    let api = CloudflareIntegrationAPI::with_config(configuration);
    let resp = api
        .get_cloudflare_account(cloudflare_account_data_id.clone())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
