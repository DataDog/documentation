// Update Cloudflare account returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_cloudflare_integration::CloudflareIntegrationAPI;
use datadog_api_client::datadogV2::model::CloudflareAccountType;
use datadog_api_client::datadogV2::model::CloudflareAccountUpdateRequest;
use datadog_api_client::datadogV2::model::CloudflareAccountUpdateRequestAttributes;
use datadog_api_client::datadogV2::model::CloudflareAccountUpdateRequestData;

#[tokio::main]
async fn main() {
    // there is a valid "cloudflare_account" in the system
    let cloudflare_account_data_id = std::env::var("CLOUDFLARE_ACCOUNT_DATA_ID").unwrap();
    let body = CloudflareAccountUpdateRequest::new(
        CloudflareAccountUpdateRequestData::new()
            .attributes(
                CloudflareAccountUpdateRequestAttributes::new("fakekey".to_string())
                    .email("dev@datadoghq.com".to_string())
                    .zones(vec!["zone-id-3".to_string()]),
            )
            .type_(CloudflareAccountType::CLOUDFLARE_ACCOUNTS),
    );
    let configuration = datadog::Configuration::new();
    let api = CloudflareIntegrationAPI::with_config(configuration);
    let resp = api
        .update_cloudflare_account(cloudflare_account_data_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
