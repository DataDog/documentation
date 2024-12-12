// Edit an API key returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_key_management::KeyManagementAPI;
use datadog_api_client::datadogV2::model::APIKeyUpdateAttributes;
use datadog_api_client::datadogV2::model::APIKeyUpdateData;
use datadog_api_client::datadogV2::model::APIKeyUpdateRequest;
use datadog_api_client::datadogV2::model::APIKeysType;

#[tokio::main]
async fn main() {
    // there is a valid "api_key" in the system
    let api_key_data_id = std::env::var("API_KEY_DATA_ID").unwrap();
    let body = APIKeyUpdateRequest::new(APIKeyUpdateData::new(
        APIKeyUpdateAttributes::new("Example-Key-Management".to_string()),
        api_key_data_id.clone(),
        APIKeysType::API_KEYS,
    ));
    let configuration = datadog::Configuration::new();
    let api = KeyManagementAPI::with_config(configuration);
    let resp = api.update_api_key(api_key_data_id.clone(), body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
