// Create a distribution widget using a histogram request containing a formulas
// and functions events query
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
use datadog_api_client::datadogV1::model::FormulaAndFunctionEventAggregation;
use datadog_api_client::datadogV1::model::FormulaAndFunctionEventQueryDefinition;
use datadog_api_client::datadogV1::model::FormulaAndFunctionEventQueryDefinitionCompute;
use datadog_api_client::datadogV1::model::FormulaAndFunctionEventQueryDefinitionSearch;
use datadog_api_client::datadogV1::model::FormulaAndFunctionEventsDataSource;
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
                    WidgetDefinition::DistributionWidgetDefinition(
                        Box::new(
                            DistributionWidgetDefinition::new(
                                vec![
                                    DistributionWidgetRequest::new()
                                        .query(
                                            DistributionWidgetHistogramRequestQuery
                                            ::FormulaAndFunctionEventQueryDefinition(
                                                Box::new(
                                                    FormulaAndFunctionEventQueryDefinition::new(
                                                        FormulaAndFunctionEventQueryDefinitionCompute::new(
                                                            FormulaAndFunctionEventAggregation::MIN,
                                                        ).metric("@duration".to_string()),
                                                        FormulaAndFunctionEventsDataSource::EVENTS,
                                                        "query1".to_string(),
                                                    )
                                                        .group_by(vec![])
                                                        .indexes(vec!["*".to_string()])
                                                        .search(
                                                            FormulaAndFunctionEventQueryDefinitionSearch::new(
                                                                "".to_string(),
                                                            ),
                                                        ),
                                                ),
                                            ),
                                        )
                                        .request_type(DistributionWidgetHistogramRequestType::HISTOGRAM)
                                ],
                                DistributionWidgetDefinitionType::DISTRIBUTION,
                            )
                                .show_legend(false)
                                .title("Events Platform - Request latency HOP".to_string())
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
        ).description(Some("Example-Dashboard".to_string()));
    let configuration = datadog::Configuration::new();
    let api = DashboardsAPI::with_config(configuration);
    let resp = api.create_dashboard(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
