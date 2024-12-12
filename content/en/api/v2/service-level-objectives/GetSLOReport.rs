// Get SLO report returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_service_level_objectives::ServiceLevelObjectivesAPI;

#[tokio::main]
async fn main() {
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.GetSLOReport", true);
    let api = ServiceLevelObjectivesAPI::with_config(configuration);
    let resp = api
        .get_slo_report("9fb2dc2a-ead0-11ee-a174-9fe3a9d7627f".to_string())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
