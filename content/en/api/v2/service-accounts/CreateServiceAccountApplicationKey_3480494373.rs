// Create an application key with scopes for this service account returns
// "Created" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_service_accounts::ServiceAccountsAPI;
use datadog_api_client::datadogV2::model::ApplicationKeyCreateAttributes;
use datadog_api_client::datadogV2::model::ApplicationKeyCreateData;
use datadog_api_client::datadogV2::model::ApplicationKeyCreateRequest;
use datadog_api_client::datadogV2::model::ApplicationKeysType;

#[tokio::main]
async fn main() {
    // there is a valid "service_account_user" in the system
    let service_account_user_data_id = std::env::var("SERVICE_ACCOUNT_USER_DATA_ID").unwrap();
    let body = ApplicationKeyCreateRequest::new(ApplicationKeyCreateData::new(
        ApplicationKeyCreateAttributes::new("Example-Service-Account".to_string()).scopes(Some(
            vec![
                "dashboards_read".to_string(),
                "dashboards_write".to_string(),
                "dashboards_public_share".to_string(),
            ],
        )),
        ApplicationKeysType::APPLICATION_KEYS,
    ));
    let configuration = datadog::Configuration::new();
    let api = ServiceAccountsAPI::with_config(configuration);
    let resp = api
        .create_service_account_application_key(service_account_user_data_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
