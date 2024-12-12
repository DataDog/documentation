// Create a new dashboard with timeseries widget containing style attributes
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboards::DashboardsAPI;
use datadog_api_client::datadogV1::model::Dashboard;
use datadog_api_client::datadogV1::model::DashboardLayoutType;
use datadog_api_client::datadogV1::model::TimeseriesWidgetDefinition;
use datadog_api_client::datadogV1::model::TimeseriesWidgetDefinitionType;
use datadog_api_client::datadogV1::model::TimeseriesWidgetRequest;
use datadog_api_client::datadogV1::model::Widget;
use datadog_api_client::datadogV1::model::WidgetDefinition;
use datadog_api_client::datadogV1::model::WidgetDisplayType;
use datadog_api_client::datadogV1::model::WidgetLineType;
use datadog_api_client::datadogV1::model::WidgetLineWidth;
use datadog_api_client::datadogV1::model::WidgetRequestStyle;

#[tokio::main]
async fn main() {
    let body =
        Dashboard::new(
            DashboardLayoutType::ORDERED,
            "Example-Dashboard with timeseries widget".to_string(),
            vec![
                Widget::new(
                    WidgetDefinition::TimeseriesWidgetDefinition(
                        Box::new(
                            TimeseriesWidgetDefinition::new(
                                vec![
                                    TimeseriesWidgetRequest::new()
                                        .display_type(WidgetDisplayType::BARS)
                                        .on_right_yaxis(false)
                                        .q(
                                            "sum:trace.test.errors{env:prod,service:datadog-api-spec} by {resource_name}.as_count()".to_string(),
                                        )
                                        .style(
                                            WidgetRequestStyle::new()
                                                .line_type(WidgetLineType::SOLID)
                                                .line_width(WidgetLineWidth::NORMAL)
                                                .palette("warm".to_string()),
                                        )
                                ],
                                TimeseriesWidgetDefinitionType::TIMESERIES,
                            ),
                        ),
                    ),
                )
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
