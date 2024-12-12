// Get SLO report status returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_service_level_objectives::ServiceLevelObjectivesAPI;

#[tokio::main]
async fn main() {
    // there is a valid "report" in the system
    let report_data_id = std::env::var("REPORT_DATA_ID").unwrap();
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.GetSLOReportJobStatus", true);
    let api = ServiceLevelObjectivesAPI::with_config(configuration);
    let resp = api.get_slo_report_job_status(report_data_id.clone()).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
