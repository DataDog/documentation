// Create a distribution widget using a histogram request containing a formulas
// and functions APM Stats query
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboards::DashboardsAPI;
use datadog_api_client::datadogV1::model::Dashboard;
use datadog_api_client::datadogV1::model::DashboardLayoutType;
use datadog_api_client::datadogV1::model::DistributionWidgetDefinition;
use datadog_api_client::datadogV1::model::DistributionWidgetDefinitionType;
use datadog_api_client::datadogV1::model::DistributionWidgetHistogramRequestQuery;
use datadog_api_client::datadogV1::model::DistributionWidgetHistogramRequestType;
use datadog_api_client::datadogV1::model::DistributionWidgetRequest;
use datadog_api_client::datadogV1::model::DistributionWidgetXAxis;
use datadog_api_client::datadogV1::model::DistributionWidgetYAxis;
use datadog_api_client::datadogV1::model::FormulaAndFunctionApmResourceStatName;
use datadog_api_client::datadogV1::model::FormulaAndFunctionApmResourceStatsDataSource;
use datadog_api_client::datadogV1::model::FormulaAndFunctionApmResourceStatsQueryDefinition;
use datadog_api_client::datadogV1::model::Widget;
use datadog_api_client::datadogV1::model::WidgetDefinition;
use datadog_api_client::datadogV1::model::WidgetLayout;
use datadog_api_client::datadogV1::model::WidgetStyle;
use datadog_api_client::datadogV1::model::WidgetTextAlign;

#[tokio::main]
async fn main() {
    let body =
        Dashboard::new(
            DashboardLayoutType::ORDERED,
            "Example-Dashboard".to_string(),
            vec![
                Widget::new(
                    WidgetDefinition::DistributionWidgetDefinition(
                        Box::new(
                            DistributionWidgetDefinition::new(
                                vec![
                                    DistributionWidgetRequest::new()
                                        .query(
                                            DistributionWidgetHistogramRequestQuery
                                            ::FormulaAndFunctionApmResourceStatsQueryDefinition(
                                                Box::new(
                                                    FormulaAndFunctionApmResourceStatsQueryDefinition::new(
                                                        FormulaAndFunctionApmResourceStatsDataSource
                                                        ::APM_RESOURCE_STATS,
                                                        "staging".to_string(),
                                                        "query1".to_string(),
                                                        "azure-bill-import".to_string(),
                                                        FormulaAndFunctionApmResourceStatName::LATENCY_DISTRIBUTION,
                                                    )
                                                        .group_by(vec!["resource_name".to_string()])
                                                        .operation_name("universal.http.client".to_string())
                                                        .primary_tag_name("datacenter".to_string())
                                                        .primary_tag_value("*".to_string()),
                                                ),
                                            ),
                                        )
                                        .request_type(DistributionWidgetHistogramRequestType::HISTOGRAM)
                                        .style(WidgetStyle::new().palette("dog_classic".to_string()))
                                ],
                                DistributionWidgetDefinitionType::DISTRIBUTION,
                            )
                                .show_legend(false)
                                .title("APM Stats - Request latency HOP".to_string())
                                .title_align(WidgetTextAlign::LEFT)
                                .title_size("16".to_string())
                                .xaxis(
                                    DistributionWidgetXAxis::new()
                                        .include_zero(true)
                                        .max("auto".to_string())
                                        .min("auto".to_string())
                                        .scale("linear".to_string()),
                                )
                                .yaxis(
                                    DistributionWidgetYAxis::new()
                                        .include_zero(true)
                                        .max("auto".to_string())
                                        .min("auto".to_string())
                                        .scale("linear".to_string()),
                                ),
                        ),
                    ),
                ).layout(WidgetLayout::new(2, 4, 8, 0))
            ],
        ).description(Some("".to_string()));
    let configuration = datadog::Configuration::new();
    let api = DashboardsAPI::with_config(configuration);
    let resp = api.create_dashboard(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
