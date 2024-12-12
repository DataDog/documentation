// Create a new dashboard with timeseries widget and formula style attributes
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboards::DashboardsAPI;
use datadog_api_client::datadogV1::model::Dashboard;
use datadog_api_client::datadogV1::model::DashboardLayoutType;
use datadog_api_client::datadogV1::model::DashboardReflowType;
use datadog_api_client::datadogV1::model::FormulaAndFunctionMetricDataSource;
use datadog_api_client::datadogV1::model::FormulaAndFunctionMetricQueryDefinition;
use datadog_api_client::datadogV1::model::FormulaAndFunctionQueryDefinition;
use datadog_api_client::datadogV1::model::FormulaAndFunctionResponseFormat;
use datadog_api_client::datadogV1::model::TimeseriesWidgetDefinition;
use datadog_api_client::datadogV1::model::TimeseriesWidgetDefinitionType;
use datadog_api_client::datadogV1::model::TimeseriesWidgetLegendColumn;
use datadog_api_client::datadogV1::model::TimeseriesWidgetLegendLayout;
use datadog_api_client::datadogV1::model::TimeseriesWidgetRequest;
use datadog_api_client::datadogV1::model::Widget;
use datadog_api_client::datadogV1::model::WidgetDefinition;
use datadog_api_client::datadogV1::model::WidgetDisplayType;
use datadog_api_client::datadogV1::model::WidgetFormula;
use datadog_api_client::datadogV1::model::WidgetFormulaStyle;
use datadog_api_client::datadogV1::model::WidgetLegacyLiveSpan;
use datadog_api_client::datadogV1::model::WidgetLineType;
use datadog_api_client::datadogV1::model::WidgetLineWidth;
use datadog_api_client::datadogV1::model::WidgetRequestStyle;
use datadog_api_client::datadogV1::model::WidgetTime;

#[tokio::main]
async fn main() {
    let body =
        Dashboard::new(
            DashboardLayoutType::ORDERED,
            "Example-Dashboard with formula style".to_string(),
            vec![
                Widget::new(
                    WidgetDefinition::TimeseriesWidgetDefinition(
                        Box::new(
                            TimeseriesWidgetDefinition::new(
                                vec![
                                    TimeseriesWidgetRequest::new()
                                        .display_type(WidgetDisplayType::LINE)
                                        .formulas(
                                            vec![
                                                WidgetFormula::new(
                                                    "query1".to_string(),
                                                ).style(
                                                    WidgetFormulaStyle::new()
                                                        .palette("classic".to_string())
                                                        .palette_index(4),
                                                )
                                            ],
                                        )
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
                                        .style(
                                            WidgetRequestStyle::new()
                                                .line_type(WidgetLineType::SOLID)
                                                .line_width(WidgetLineWidth::NORMAL)
                                                .palette("dog_classic".to_string()),
                                        )
                                ],
                                TimeseriesWidgetDefinitionType::TIMESERIES,
                            )
                                .legend_columns(
                                    vec![
                                        TimeseriesWidgetLegendColumn::AVG,
                                        TimeseriesWidgetLegendColumn::MIN,
                                        TimeseriesWidgetLegendColumn::MAX,
                                        TimeseriesWidgetLegendColumn::VALUE,
                                        TimeseriesWidgetLegendColumn::SUM
                                    ],
                                )
                                .legend_layout(TimeseriesWidgetLegendLayout::AUTO)
                                .show_legend(true)
                                .time(WidgetTime::WidgetLegacyLiveSpan(Box::new(WidgetLegacyLiveSpan::new())))
                                .title("styled timeseries".to_string()),
                        ),
                    ),
                )
            ],
        ).reflow_type(DashboardReflowType::AUTO);
    let configuration = datadog::Configuration::new();
    let api = DashboardsAPI::with_config(configuration);
    let resp = api.create_dashboard(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
