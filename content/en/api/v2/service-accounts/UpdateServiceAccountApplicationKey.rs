// Edit an application key for this service account returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_service_accounts::ServiceAccountsAPI;
use datadog_api_client::datadogV2::model::ApplicationKeyUpdateAttributes;
use datadog_api_client::datadogV2::model::ApplicationKeyUpdateData;
use datadog_api_client::datadogV2::model::ApplicationKeyUpdateRequest;
use datadog_api_client::datadogV2::model::ApplicationKeysType;

#[tokio::main]
async fn main() {
    // there is a valid "service_account_user" in the system
    let service_account_user_data_id = std::env::var("SERVICE_ACCOUNT_USER_DATA_ID").unwrap();

    // there is a valid "service_account_application_key" for "service_account_user"
    let service_account_application_key_data_id =
        std::env::var("SERVICE_ACCOUNT_APPLICATION_KEY_DATA_ID").unwrap();
    let body = ApplicationKeyUpdateRequest::new(ApplicationKeyUpdateData::new(
        ApplicationKeyUpdateAttributes::new()
            .name("Application Key for managing dashboards-updated".to_string()),
        service_account_application_key_data_id.clone(),
        ApplicationKeysType::APPLICATION_KEYS,
    ));
    let configuration = datadog::Configuration::new();
    let api = ServiceAccountsAPI::with_config(configuration);
    let resp = api
        .update_service_account_application_key(
            service_account_user_data_id.clone(),
            service_account_application_key_data_id.clone(),
            body,
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
