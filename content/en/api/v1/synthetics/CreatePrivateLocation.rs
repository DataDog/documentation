// Create a private location returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_synthetics::SyntheticsAPI;
use datadog_api_client::datadogV1::model::SyntheticsPrivateLocation;
use datadog_api_client::datadogV1::model::SyntheticsPrivateLocationMetadata;

#[tokio::main]
async fn main() {
    // there is a valid "role" in the system
    let role_data_id = std::env::var("ROLE_DATA_ID").unwrap();
    let body = SyntheticsPrivateLocation::new(
        "Test Example-Synthetic description".to_string(),
        "Example-Synthetic".to_string(),
        vec!["test:examplesynthetic".to_string()],
    )
    .metadata(
        SyntheticsPrivateLocationMetadata::new().restricted_roles(vec![role_data_id.clone()]),
    );
    let configuration = datadog::Configuration::new();
    let api = SyntheticsAPI::with_config(configuration);
    let resp = api.create_private_location(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
