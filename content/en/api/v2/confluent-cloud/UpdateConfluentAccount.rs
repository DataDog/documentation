// Update Confluent account returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_confluent_cloud::ConfluentCloudAPI;
use datadog_api_client::datadogV2::model::ConfluentAccountType;
use datadog_api_client::datadogV2::model::ConfluentAccountUpdateRequest;
use datadog_api_client::datadogV2::model::ConfluentAccountUpdateRequestAttributes;
use datadog_api_client::datadogV2::model::ConfluentAccountUpdateRequestData;

#[tokio::main]
async fn main() {
    // there is a valid "confluent_account" in the system
    let confluent_account_data_attributes_api_key =
        std::env::var("CONFLUENT_ACCOUNT_DATA_ATTRIBUTES_API_KEY").unwrap();
    let confluent_account_data_id = std::env::var("CONFLUENT_ACCOUNT_DATA_ID").unwrap();
    let body = ConfluentAccountUpdateRequest::new(ConfluentAccountUpdateRequestData::new(
        ConfluentAccountUpdateRequestAttributes::new(
            confluent_account_data_attributes_api_key.clone(),
            "update-secret".to_string(),
        )
        .tags(vec!["updated_tag:val".to_string()]),
        ConfluentAccountType::CONFLUENT_CLOUD_ACCOUNTS,
    ));
    let configuration = datadog::Configuration::new();
    let api = ConfluentCloudAPI::with_config(configuration);
    let resp = api
        .update_confluent_account(confluent_account_data_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
