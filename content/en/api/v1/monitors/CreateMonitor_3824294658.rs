// Create a ci-pipelines formula and functions monitor returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_monitors::MonitorsAPI;
use datadog_api_client::datadogV1::model::Monitor;
use datadog_api_client::datadogV1::model::MonitorFormulaAndFunctionEventAggregation;
use datadog_api_client::datadogV1::model::MonitorFormulaAndFunctionEventQueryDefinition;
use datadog_api_client::datadogV1::model::MonitorFormulaAndFunctionEventQueryDefinitionCompute;
use datadog_api_client::datadogV1::model::MonitorFormulaAndFunctionEventQueryDefinitionSearch;
use datadog_api_client::datadogV1::model::MonitorFormulaAndFunctionEventsDataSource;
use datadog_api_client::datadogV1::model::MonitorFormulaAndFunctionQueryDefinition;
use datadog_api_client::datadogV1::model::MonitorOptions;
use datadog_api_client::datadogV1::model::MonitorThresholds;
use datadog_api_client::datadogV1::model::MonitorType;

#[tokio::main]
async fn main() {
    let body =
        Monitor::new(
            r#"formula("query1 / query2 * 100").last("15m") >= 0.8"#.to_string(),
            MonitorType::CI_PIPELINES_ALERT,
        )
            .message("some message Notify: @hipchat-channel".to_string())
            .name("Example-Monitor".to_string())
            .options(
                MonitorOptions::new()
                    .thresholds(MonitorThresholds::new().critical(0.8 as f64))
                    .variables(
                        vec![
                            MonitorFormulaAndFunctionQueryDefinition::MonitorFormulaAndFunctionEventQueryDefinition(
                                Box::new(
                                    MonitorFormulaAndFunctionEventQueryDefinition::new(
                                        MonitorFormulaAndFunctionEventQueryDefinitionCompute::new(
                                            MonitorFormulaAndFunctionEventAggregation::COUNT,
                                        ),
                                        MonitorFormulaAndFunctionEventsDataSource::CI_PIPELINES,
                                        "query1".to_string(),
                                    )
                                        .group_by(vec![])
                                        .indexes(vec!["*".to_string()])
                                        .search(
                                            MonitorFormulaAndFunctionEventQueryDefinitionSearch::new(
                                                "@ci.status:error".to_string(),
                                            ),
                                        ),
                                ),
                            ),
                            MonitorFormulaAndFunctionQueryDefinition::MonitorFormulaAndFunctionEventQueryDefinition(
                                Box::new(
                                    MonitorFormulaAndFunctionEventQueryDefinition::new(
                                        MonitorFormulaAndFunctionEventQueryDefinitionCompute::new(
                                            MonitorFormulaAndFunctionEventAggregation::COUNT,
                                        ),
                                        MonitorFormulaAndFunctionEventsDataSource::CI_PIPELINES,
                                        "query2".to_string(),
                                    )
                                        .group_by(vec![])
                                        .indexes(vec!["*".to_string()])
                                        .search(
                                            MonitorFormulaAndFunctionEventQueryDefinitionSearch::new("".to_string()),
                                        ),
                                ),
                            )
                        ],
                    ),
            )
            .priority(Some(3))
            .tags(vec!["test:examplemonitor".to_string(), "env:ci".to_string()]);
    let configuration = datadog::Configuration::new();
    let api = MonitorsAPI::with_config(configuration);
    let resp = api.create_monitor(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
