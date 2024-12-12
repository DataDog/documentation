// Update Fastly account returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_fastly_integration::FastlyIntegrationAPI;
use datadog_api_client::datadogV2::model::FastlyAccountType;
use datadog_api_client::datadogV2::model::FastlyAccountUpdateRequest;
use datadog_api_client::datadogV2::model::FastlyAccountUpdateRequestAttributes;
use datadog_api_client::datadogV2::model::FastlyAccountUpdateRequestData;

#[tokio::main]
async fn main() {
    // there is a valid "fastly_account" in the system
    let fastly_account_data_id = std::env::var("FASTLY_ACCOUNT_DATA_ID").unwrap();
    let body = FastlyAccountUpdateRequest::new(
        FastlyAccountUpdateRequestData::new()
            .attributes(
                FastlyAccountUpdateRequestAttributes::new().api_key("update-secret".to_string()),
            )
            .type_(FastlyAccountType::FASTLY_ACCOUNTS),
    );
    let configuration = datadog::Configuration::new();
    let api = FastlyIntegrationAPI::with_config(configuration);
    let resp = api
        .update_fastly_account(fastly_account_data_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
