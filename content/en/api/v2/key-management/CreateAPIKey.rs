// Create an API key returns "Created" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_key_management::KeyManagementAPI;
use datadog_api_client::datadogV2::model::APIKeyCreateAttributes;
use datadog_api_client::datadogV2::model::APIKeyCreateData;
use datadog_api_client::datadogV2::model::APIKeyCreateRequest;
use datadog_api_client::datadogV2::model::APIKeysType;

#[tokio::main]
async fn main() {
    let body = APIKeyCreateRequest::new(APIKeyCreateData::new(
        APIKeyCreateAttributes::new("Example-Key-Management".to_string()),
        APIKeysType::API_KEYS,
    ));
    let configuration = datadog::Configuration::new();
    let api = KeyManagementAPI::with_config(configuration);
    let resp = api.create_api_key(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
