// Update Fastly service returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_fastly_integration::FastlyIntegrationAPI;
use datadog_api_client::datadogV2::model::FastlyServiceAttributes;
use datadog_api_client::datadogV2::model::FastlyServiceData;
use datadog_api_client::datadogV2::model::FastlyServiceRequest;
use datadog_api_client::datadogV2::model::FastlyServiceType;

#[tokio::main]
async fn main() {
    let body = FastlyServiceRequest::new(
        FastlyServiceData::new("abc123".to_string(), FastlyServiceType::FASTLY_SERVICES)
            .attributes(
                FastlyServiceAttributes::new()
                    .tags(vec!["myTag".to_string(), "myTag2:myValue".to_string()]),
            ),
    );
    let configuration = datadog::Configuration::new();
    let api = FastlyIntegrationAPI::with_config(configuration);
    let resp = api
        .update_fastly_service("account_id".to_string(), "service_id".to_string(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
