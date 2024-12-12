// Delete an SLO correction returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_service_level_objective_corrections::ServiceLevelObjectiveCorrectionsAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = ServiceLevelObjectiveCorrectionsAPI::with_config(configuration);
    let resp = api
        .delete_slo_correction("slo_correction_id".to_string())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
