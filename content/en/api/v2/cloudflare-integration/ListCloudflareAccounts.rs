// List Cloudflare accounts returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_cloudflare_integration::CloudflareIntegrationAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = CloudflareIntegrationAPI::with_config(configuration);
    let resp = api.list_cloudflare_accounts().await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
