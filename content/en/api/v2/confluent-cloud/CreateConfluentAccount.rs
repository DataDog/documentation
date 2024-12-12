// Add Confluent account returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_confluent_cloud::ConfluentCloudAPI;
use datadog_api_client::datadogV2::model::ConfluentAccountCreateRequest;
use datadog_api_client::datadogV2::model::ConfluentAccountCreateRequestAttributes;
use datadog_api_client::datadogV2::model::ConfluentAccountCreateRequestData;
use datadog_api_client::datadogV2::model::ConfluentAccountResourceAttributes;
use datadog_api_client::datadogV2::model::ConfluentAccountType;

#[tokio::main]
async fn main() {
    let body = ConfluentAccountCreateRequest::new(ConfluentAccountCreateRequestData::new(
        ConfluentAccountCreateRequestAttributes::new(
            "TESTAPIKEY123".to_string(),
            "test-api-secret-123".to_string(),
        )
        .resources(vec![ConfluentAccountResourceAttributes::new(
            "kafka".to_string(),
        )
        .enable_custom_metrics(false)
        .id("resource-id-123".to_string())
        .tags(vec!["myTag".to_string(), "myTag2:myValue".to_string()])])
        .tags(vec!["myTag".to_string(), "myTag2:myValue".to_string()]),
        ConfluentAccountType::CONFLUENT_CLOUD_ACCOUNTS,
    ));
    let configuration = datadog::Configuration::new();
    let api = ConfluentCloudAPI::with_config(configuration);
    let resp = api.create_confluent_account(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
