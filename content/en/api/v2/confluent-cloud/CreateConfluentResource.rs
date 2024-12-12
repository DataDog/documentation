// Add resource to Confluent account returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_confluent_cloud::ConfluentCloudAPI;
use datadog_api_client::datadogV2::model::ConfluentResourceRequest;
use datadog_api_client::datadogV2::model::ConfluentResourceRequestAttributes;
use datadog_api_client::datadogV2::model::ConfluentResourceRequestData;
use datadog_api_client::datadogV2::model::ConfluentResourceType;

#[tokio::main]
async fn main() {
    // there is a valid "confluent_account" in the system
    let confluent_account_data_id = std::env::var("CONFLUENT_ACCOUNT_DATA_ID").unwrap();
    let body = ConfluentResourceRequest::new(ConfluentResourceRequestData::new(
        ConfluentResourceRequestAttributes::new("kafka".to_string())
            .enable_custom_metrics(false)
            .tags(vec!["myTag".to_string(), "myTag2:myValue".to_string()]),
        "exampleconfluentcloud".to_string(),
        ConfluentResourceType::CONFLUENT_CLOUD_RESOURCES,
    ));
    let configuration = datadog::Configuration::new();
    let api = ConfluentCloudAPI::with_config(configuration);
    let resp = api
        .create_confluent_resource(confluent_account_data_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
