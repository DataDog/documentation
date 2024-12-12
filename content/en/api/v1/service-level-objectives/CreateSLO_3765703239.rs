// Create a time-slice SLO object returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_service_level_objectives::ServiceLevelObjectivesAPI;
use datadog_api_client::datadogV1::model::FormulaAndFunctionMetricDataSource;
use datadog_api_client::datadogV1::model::FormulaAndFunctionMetricQueryDefinition;
use datadog_api_client::datadogV1::model::SLODataSourceQueryDefinition;
use datadog_api_client::datadogV1::model::SLOFormula;
use datadog_api_client::datadogV1::model::SLOSliSpec;
use datadog_api_client::datadogV1::model::SLOThreshold;
use datadog_api_client::datadogV1::model::SLOTimeSliceComparator;
use datadog_api_client::datadogV1::model::SLOTimeSliceCondition;
use datadog_api_client::datadogV1::model::SLOTimeSliceQuery;
use datadog_api_client::datadogV1::model::SLOTimeSliceSpec;
use datadog_api_client::datadogV1::model::SLOTimeframe;
use datadog_api_client::datadogV1::model::SLOType;
use datadog_api_client::datadogV1::model::ServiceLevelObjectiveRequest;

#[tokio::main]
async fn main() {
    let body = ServiceLevelObjectiveRequest::new(
        "Example-Service-Level-Objective".to_string(),
        vec![SLOThreshold::new(97.0, SLOTimeframe::SEVEN_DAYS)
            .target_display("97.0".to_string())
            .warning(98.0 as f64)
            .warning_display("98.0".to_string())],
        SLOType::TIME_SLICE,
    )
    .description(Some("string".to_string()))
    .sli_specification(SLOSliSpec::SLOTimeSliceSpec(Box::new(
        SLOTimeSliceSpec::new(SLOTimeSliceCondition::new(
            SLOTimeSliceComparator::GREATER,
            SLOTimeSliceQuery::new(
                vec![SLOFormula::new("query1".to_string())],
                vec![
                    SLODataSourceQueryDefinition::FormulaAndFunctionMetricQueryDefinition(
                        Box::new(FormulaAndFunctionMetricQueryDefinition::new(
                            FormulaAndFunctionMetricDataSource::METRICS,
                            "query1".to_string(),
                            "trace.servlet.request{env:prod}".to_string(),
                        )),
                    ),
                ],
            ),
            5.0,
        )),
    )))
    .tags(vec!["env:prod".to_string()])
    .target_threshold(97.0 as f64)
    .timeframe(SLOTimeframe::SEVEN_DAYS)
    .warning_threshold(98.0 as f64);
    let configuration = datadog::Configuration::new();
    let api = ServiceLevelObjectivesAPI::with_config(configuration);
    let resp = api.create_slo(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
