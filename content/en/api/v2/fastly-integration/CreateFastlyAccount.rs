// Add Fastly account returns "CREATED" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_fastly_integration::FastlyIntegrationAPI;
use datadog_api_client::datadogV2::model::FastlyAccountCreateRequest;
use datadog_api_client::datadogV2::model::FastlyAccountCreateRequestAttributes;
use datadog_api_client::datadogV2::model::FastlyAccountCreateRequestData;
use datadog_api_client::datadogV2::model::FastlyAccountType;

#[tokio::main]
async fn main() {
    let body = FastlyAccountCreateRequest::new(FastlyAccountCreateRequestData::new(
        FastlyAccountCreateRequestAttributes::new(
            "ExampleFastlyIntegration".to_string(),
            "Example-Fastly-Integration".to_string(),
        )
        .services(vec![]),
        FastlyAccountType::FASTLY_ACCOUNTS,
    ));
    let configuration = datadog::Configuration::new();
    let api = FastlyIntegrationAPI::with_config(configuration);
    let resp = api.create_fastly_account(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
