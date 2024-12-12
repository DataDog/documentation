// Create a distribution widget using a histogram request containing a formulas
// and functions metrics query
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
use datadog_api_client::datadogV1::model::FormulaAndFunctionMetricDataSource;
use datadog_api_client::datadogV1::model::FormulaAndFunctionMetricQueryDefinition;
use datadog_api_client::datadogV1::model::Widget;
use datadog_api_client::datadogV1::model::WidgetCustomLink;
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
                                            ::FormulaAndFunctionMetricQueryDefinition(
                                                Box::new(
                                                    FormulaAndFunctionMetricQueryDefinition::new(
                                                        FormulaAndFunctionMetricDataSource::METRICS,
                                                        "query1".to_string(),
                                                        "histogram:trace.Load{*}".to_string(),
                                                    ),
                                                ),
                                            ),
                                        )
                                        .request_type(DistributionWidgetHistogramRequestType::HISTOGRAM)
                                        .style(WidgetStyle::new().palette("dog_classic".to_string()))
                                ],
                                DistributionWidgetDefinitionType::DISTRIBUTION,
                            )
                                .custom_links(
                                    vec![
                                        WidgetCustomLink::new()
                                            .label("Example".to_string())
                                            .link("https://example.org/".to_string())
                                    ],
                                )
                                .show_legend(false)
                                .title("Metrics HOP".to_string())
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
                ).layout(WidgetLayout::new(2, 4, 0, 0))
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
