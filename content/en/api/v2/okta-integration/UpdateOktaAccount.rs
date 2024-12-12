// Update Okta account returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_okta_integration::OktaIntegrationAPI;
use datadog_api_client::datadogV2::model::OktaAccountType;
use datadog_api_client::datadogV2::model::OktaAccountUpdateRequest;
use datadog_api_client::datadogV2::model::OktaAccountUpdateRequestAttributes;
use datadog_api_client::datadogV2::model::OktaAccountUpdateRequestData;

#[tokio::main]
async fn main() {
    // there is a valid "okta_account" in the system
    let okta_account_data_id = std::env::var("OKTA_ACCOUNT_DATA_ID").unwrap();
    let body = OktaAccountUpdateRequest::new(
        OktaAccountUpdateRequestData::new()
            .attributes(
                OktaAccountUpdateRequestAttributes::new(
                    "oauth".to_string(),
                    "https://example.okta.com/".to_string(),
                )
                .client_id("client_id".to_string())
                .client_secret("client_secret".to_string()),
            )
            .type_(OktaAccountType::OKTA_ACCOUNTS),
    );
    let configuration = datadog::Configuration::new();
    let api = OktaIntegrationAPI::with_config(configuration);
    let resp = api
        .update_okta_account(okta_account_data_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
