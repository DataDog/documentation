// Update a single service object returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_opsgenie_integration::OpsgenieIntegrationAPI;
use datadog_api_client::datadogV2::model::OpsgenieServiceRegionType;
use datadog_api_client::datadogV2::model::OpsgenieServiceType;
use datadog_api_client::datadogV2::model::OpsgenieServiceUpdateAttributes;
use datadog_api_client::datadogV2::model::OpsgenieServiceUpdateData;
use datadog_api_client::datadogV2::model::OpsgenieServiceUpdateRequest;

#[tokio::main]
async fn main() {
    // there is a valid "opsgenie_service" in the system
    let opsgenie_service_data_id = std::env::var("OPSGENIE_SERVICE_DATA_ID").unwrap();
    let body = OpsgenieServiceUpdateRequest::new(OpsgenieServiceUpdateData::new(
        OpsgenieServiceUpdateAttributes::new()
            .name("fake-opsgenie-service-name--updated".to_string())
            .opsgenie_api_key("00000000-0000-0000-0000-000000000000".to_string())
            .region(OpsgenieServiceRegionType::EU),
        opsgenie_service_data_id.clone(),
        OpsgenieServiceType::OPSGENIE_SERVICE,
    ));
    let configuration = datadog::Configuration::new();
    let api = OpsgenieIntegrationAPI::with_config(configuration);
    let resp = api
        .update_opsgenie_service(opsgenie_service_data_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
