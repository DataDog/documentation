// Create a new dashboard with apm dependency stats widget
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboards::DashboardsAPI;
use datadog_api_client::datadogV1::model::Dashboard;
use datadog_api_client::datadogV1::model::DashboardLayoutType;
use datadog_api_client::datadogV1::model::FormulaAndFunctionApmDependencyStatName;
use datadog_api_client::datadogV1::model::FormulaAndFunctionApmDependencyStatsDataSource;
use datadog_api_client::datadogV1::model::FormulaAndFunctionApmDependencyStatsQueryDefinition;
use datadog_api_client::datadogV1::model::FormulaAndFunctionQueryDefinition;
use datadog_api_client::datadogV1::model::FormulaAndFunctionResponseFormat;
use datadog_api_client::datadogV1::model::TableWidgetDefinition;
use datadog_api_client::datadogV1::model::TableWidgetDefinitionType;
use datadog_api_client::datadogV1::model::TableWidgetRequest;
use datadog_api_client::datadogV1::model::Widget;
use datadog_api_client::datadogV1::model::WidgetDefinition;
use datadog_api_client::datadogV1::model::WidgetLayout;
use datadog_api_client::datadogV1::model::WidgetTextAlign;

#[tokio::main]
async fn main() {
    let body =
        Dashboard::new(
            DashboardLayoutType::ORDERED,
            "Example-Dashboard".to_string(),
            vec![
                Widget::new(
                    WidgetDefinition::TableWidgetDefinition(
                        Box::new(
                            TableWidgetDefinition::new(
                                vec![
                                    TableWidgetRequest::new()
                                        .queries(
                                            vec![
                                                FormulaAndFunctionQueryDefinition
                                                ::FormulaAndFunctionApmDependencyStatsQueryDefinition(
                                                    Box::new(
                                                        FormulaAndFunctionApmDependencyStatsQueryDefinition::new(
                                                            FormulaAndFunctionApmDependencyStatsDataSource
                                                            ::APM_DEPENDENCY_STATS,
                                                            "ci".to_string(),
                                                            "query1".to_string(),
                                                            "cassandra.query".to_string(),
                                                            "DELETE FROM monitor_history.monitor_state_change_history WHERE org_id = ? AND monitor_id IN ? AND group = ?".to_string(),
                                                            "cassandra".to_string(),
                                                            FormulaAndFunctionApmDependencyStatName::AVG_DURATION,
                                                        )
                                                            .primary_tag_name("datacenter".to_string())
                                                            .primary_tag_value("edge-eu1.prod.dog".to_string()),
                                                    ),
                                                )
                                            ],
                                        )
                                        .response_format(FormulaAndFunctionResponseFormat::SCALAR)
                                ],
                                TableWidgetDefinitionType::QUERY_TABLE,
                            )
                                .title("".to_string())
                                .title_align(WidgetTextAlign::LEFT)
                                .title_size("16".to_string()),
                        ),
                    ),
                ).layout(WidgetLayout::new(4, 4, 0, 0))
            ],
        );
    let configuration = datadog::Configuration::new();
    let api = DashboardsAPI::with_config(configuration);
    let resp = api.create_dashboard(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
