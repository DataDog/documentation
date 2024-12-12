// Get a single service object returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_opsgenie_integration::OpsgenieIntegrationAPI;

#[tokio::main]
async fn main() {
    // there is a valid "opsgenie_service" in the system
    let opsgenie_service_data_id = std::env::var("OPSGENIE_SERVICE_DATA_ID").unwrap();
    let configuration = datadog::Configuration::new();
    let api = OpsgenieIntegrationAPI::with_config(configuration);
    let resp = api
        .get_opsgenie_service(opsgenie_service_data_id.clone())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
