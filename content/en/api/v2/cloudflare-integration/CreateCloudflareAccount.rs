// Add Cloudflare account returns "CREATED" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_cloudflare_integration::CloudflareIntegrationAPI;
use datadog_api_client::datadogV2::model::CloudflareAccountCreateRequest;
use datadog_api_client::datadogV2::model::CloudflareAccountCreateRequestAttributes;
use datadog_api_client::datadogV2::model::CloudflareAccountCreateRequestData;
use datadog_api_client::datadogV2::model::CloudflareAccountType;

#[tokio::main]
async fn main() {
    let body = CloudflareAccountCreateRequest::new(CloudflareAccountCreateRequestData::new(
        CloudflareAccountCreateRequestAttributes::new(
            "fakekey".to_string(),
            "examplecloudflareintegration".to_string(),
        )
        .email("dev@datadoghq.com".to_string()),
        CloudflareAccountType::CLOUDFLARE_ACCOUNTS,
    ));
    let configuration = datadog::Configuration::new();
    let api = CloudflareIntegrationAPI::with_config(configuration);
    let resp = api.create_cloudflare_account(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
