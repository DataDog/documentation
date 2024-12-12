// Edit an application key returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_key_management::KeyManagementAPI;
use datadog_api_client::datadogV2::model::ApplicationKeyUpdateAttributes;
use datadog_api_client::datadogV2::model::ApplicationKeyUpdateData;
use datadog_api_client::datadogV2::model::ApplicationKeyUpdateRequest;
use datadog_api_client::datadogV2::model::ApplicationKeysType;

#[tokio::main]
async fn main() {
    // there is a valid "application_key" in the system
    let application_key_data_id = std::env::var("APPLICATION_KEY_DATA_ID").unwrap();
    let body = ApplicationKeyUpdateRequest::new(ApplicationKeyUpdateData::new(
        ApplicationKeyUpdateAttributes::new()
            .name("Application Key for managing dashboards-updated".to_string()),
        application_key_data_id.clone(),
        ApplicationKeysType::APPLICATION_KEYS,
    ));
    let configuration = datadog::Configuration::new();
    let api = KeyManagementAPI::with_config(configuration);
    let resp = api
        .update_application_key(application_key_data_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
