// Create a new service object returns "CREATED" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_opsgenie_integration::OpsgenieIntegrationAPI;
use datadog_api_client::datadogV2::model::OpsgenieServiceCreateAttributes;
use datadog_api_client::datadogV2::model::OpsgenieServiceCreateData;
use datadog_api_client::datadogV2::model::OpsgenieServiceCreateRequest;
use datadog_api_client::datadogV2::model::OpsgenieServiceRegionType;
use datadog_api_client::datadogV2::model::OpsgenieServiceType;

#[tokio::main]
async fn main() {
    let body = OpsgenieServiceCreateRequest::new(OpsgenieServiceCreateData::new(
        OpsgenieServiceCreateAttributes::new(
            "Example-Opsgenie-Integration".to_string(),
            "00000000-0000-0000-0000-000000000000".to_string(),
            OpsgenieServiceRegionType::US,
        ),
        OpsgenieServiceType::OPSGENIE_SERVICE,
    ));
    let configuration = datadog::Configuration::new();
    let api = OpsgenieIntegrationAPI::with_config(configuration);
    let resp = api.create_opsgenie_service(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
