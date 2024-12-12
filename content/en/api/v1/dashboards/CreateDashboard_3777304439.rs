// Create a new dashboard with formula and function heatmap widget
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboards::DashboardsAPI;
use datadog_api_client::datadogV1::model::Dashboard;
use datadog_api_client::datadogV1::model::DashboardLayoutType;
use datadog_api_client::datadogV1::model::FormulaAndFunctionMetricDataSource;
use datadog_api_client::datadogV1::model::FormulaAndFunctionMetricQueryDefinition;
use datadog_api_client::datadogV1::model::FormulaAndFunctionQueryDefinition;
use datadog_api_client::datadogV1::model::FormulaAndFunctionResponseFormat;
use datadog_api_client::datadogV1::model::HeatMapWidgetDefinition;
use datadog_api_client::datadogV1::model::HeatMapWidgetDefinitionType;
use datadog_api_client::datadogV1::model::HeatMapWidgetRequest;
use datadog_api_client::datadogV1::model::Widget;
use datadog_api_client::datadogV1::model::WidgetDefinition;
use datadog_api_client::datadogV1::model::WidgetFormula;
use datadog_api_client::datadogV1::model::WidgetLayout;
use datadog_api_client::datadogV1::model::WidgetLegacyLiveSpan;
use datadog_api_client::datadogV1::model::WidgetStyle;
use datadog_api_client::datadogV1::model::WidgetTextAlign;
use datadog_api_client::datadogV1::model::WidgetTime;

#[tokio::main]
async fn main() {
    let body =
        Dashboard::new(
            DashboardLayoutType::FREE,
            "Example-Dashboard".to_string(),
            vec![
                Widget::new(
                    WidgetDefinition::HeatMapWidgetDefinition(
                        Box::new(
                            HeatMapWidgetDefinition::new(
                                vec![
                                    HeatMapWidgetRequest::new()
                                        .formulas(vec![WidgetFormula::new("query1".to_string())])
                                        .queries(
                                            vec![
                                                FormulaAndFunctionQueryDefinition
                                                ::FormulaAndFunctionMetricQueryDefinition(
                                                    Box::new(
                                                        FormulaAndFunctionMetricQueryDefinition::new(
                                                            FormulaAndFunctionMetricDataSource::METRICS,
                                                            "query1".to_string(),
                                                            "avg:system.cpu.user{*}".to_string(),
                                                        ),
                                                    ),
                                                )
                                            ],
                                        )
                                        .response_format(FormulaAndFunctionResponseFormat::TIMESERIES)
                                        .style(WidgetStyle::new().palette("dog_classic".to_string()))
                                ],
                                HeatMapWidgetDefinitionType::HEATMAP,
                            )
                                .time(WidgetTime::WidgetLegacyLiveSpan(Box::new(WidgetLegacyLiveSpan::new())))
                                .title("".to_string())
                                .title_align(WidgetTextAlign::LEFT)
                                .title_size("16".to_string()),
                        ),
                    ),
                ).layout(WidgetLayout::new(15, 47, 0, 0))
            ],
        )
            .is_read_only(false)
            .notify_list(Some(vec![]))
            .template_variables(Some(vec![]));
    let configuration = datadog::Configuration::new();
    let api = DashboardsAPI::with_config(configuration);
    let resp = api.create_dashboard(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
