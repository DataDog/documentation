// Create an Application key with scopes for current user returns "Created"
// response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_key_management::KeyManagementAPI;
use datadog_api_client::datadogV2::model::ApplicationKeyCreateAttributes;
use datadog_api_client::datadogV2::model::ApplicationKeyCreateData;
use datadog_api_client::datadogV2::model::ApplicationKeyCreateRequest;
use datadog_api_client::datadogV2::model::ApplicationKeysType;

#[tokio::main]
async fn main() {
    let body = ApplicationKeyCreateRequest::new(ApplicationKeyCreateData::new(
        ApplicationKeyCreateAttributes::new("Example-Key-Management".to_string()).scopes(Some(
            vec![
                "dashboards_read".to_string(),
                "dashboards_write".to_string(),
                "dashboards_public_share".to_string(),
            ],
        )),
        ApplicationKeysType::APPLICATION_KEYS,
    ));
    let configuration = datadog::Configuration::new();
    let api = KeyManagementAPI::with_config(configuration);
    let resp = api.create_current_user_application_key(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
