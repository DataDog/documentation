// Add Okta account returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_okta_integration::OktaIntegrationAPI;
use datadog_api_client::datadogV2::model::OktaAccount;
use datadog_api_client::datadogV2::model::OktaAccountAttributes;
use datadog_api_client::datadogV2::model::OktaAccountRequest;
use datadog_api_client::datadogV2::model::OktaAccountType;

#[tokio::main]
async fn main() {
    let body = OktaAccountRequest::new(
        OktaAccount::new(
            OktaAccountAttributes::new(
                "oauth".to_string(),
                "https://example.okta.com/".to_string(),
                "exampleoktaintegration".to_string(),
            )
            .client_id("client_id".to_string())
            .client_secret("client_secret".to_string()),
            OktaAccountType::OKTA_ACCOUNTS,
        )
        .id("f749daaf-682e-4208-a38d-c9b43162c609".to_string()),
    );
    let configuration = datadog::Configuration::new();
    let api = OktaIntegrationAPI::with_config(configuration);
    let resp = api.create_okta_account(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
