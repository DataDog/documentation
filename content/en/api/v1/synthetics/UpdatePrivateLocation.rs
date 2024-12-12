// Edit a private location returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_synthetics::SyntheticsAPI;
use datadog_api_client::datadogV1::model::SyntheticsPrivateLocation;
use datadog_api_client::datadogV1::model::SyntheticsPrivateLocationMetadata;

#[tokio::main]
async fn main() {
    let body = SyntheticsPrivateLocation::new(
        "Description of private location".to_string(),
        "New private location".to_string(),
        vec!["team:front".to_string()],
    )
    .metadata(
        SyntheticsPrivateLocationMetadata::new()
            .restricted_roles(vec!["xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".to_string()]),
    );
    let configuration = datadog::Configuration::new();
    let api = SyntheticsAPI::with_config(configuration);
    let resp = api
        .update_private_location("location_id".to_string(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
