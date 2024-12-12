// Delete Cloudflare account returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_cloudflare_integration::CloudflareIntegrationAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = CloudflareIntegrationAPI::with_config(configuration);
    let resp = api
        .delete_cloudflare_account("account_id".to_string())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
