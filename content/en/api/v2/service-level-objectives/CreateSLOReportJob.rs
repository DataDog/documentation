// Create a new SLO report returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_service_level_objectives::ServiceLevelObjectivesAPI;
use datadog_api_client::datadogV2::model::SLOReportInterval;
use datadog_api_client::datadogV2::model::SloReportCreateRequest;
use datadog_api_client::datadogV2::model::SloReportCreateRequestAttributes;
use datadog_api_client::datadogV2::model::SloReportCreateRequestData;

#[tokio::main]
async fn main() {
    let body = SloReportCreateRequest::new(SloReportCreateRequestData::new(
        SloReportCreateRequestAttributes::new(
            1633173071,
            r#"slo_type:metric "SLO Reporting Test""#.to_string(),
            1636629071,
        )
        .interval(SLOReportInterval::MONTHLY)
        .timezone("America/New_York".to_string()),
    ));
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.CreateSLOReportJob", true);
    let api = ServiceLevelObjectivesAPI::with_config(configuration);
    let resp = api.create_slo_report_job(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
