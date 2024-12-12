// Create a new dashboard with alert_graph widget
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboards::DashboardsAPI;
use datadog_api_client::datadogV1::model::AlertGraphWidgetDefinition;
use datadog_api_client::datadogV1::model::AlertGraphWidgetDefinitionType;
use datadog_api_client::datadogV1::model::Dashboard;
use datadog_api_client::datadogV1::model::DashboardLayoutType;
use datadog_api_client::datadogV1::model::Widget;
use datadog_api_client::datadogV1::model::WidgetDefinition;
use datadog_api_client::datadogV1::model::WidgetLayout;
use datadog_api_client::datadogV1::model::WidgetLegacyLiveSpan;
use datadog_api_client::datadogV1::model::WidgetTextAlign;
use datadog_api_client::datadogV1::model::WidgetTime;
use datadog_api_client::datadogV1::model::WidgetVizType;

#[tokio::main]
async fn main() {
    // there is a valid "monitor" in the system
    let body = Dashboard::new(
        DashboardLayoutType::FREE,
        "Example-Dashboard".to_string(),
        vec![
            Widget::new(WidgetDefinition::AlertGraphWidgetDefinition(Box::new(
                AlertGraphWidgetDefinition::new(
                    "7".to_string(),
                    AlertGraphWidgetDefinitionType::ALERT_GRAPH,
                    WidgetVizType::TIMESERIES,
                )
                .time(WidgetTime::WidgetLegacyLiveSpan(Box::new(
                    WidgetLegacyLiveSpan::new(),
                )))
                .title("".to_string())
                .title_align(WidgetTextAlign::LEFT)
                .title_size("16".to_string()),
            )))
            .layout(WidgetLayout::new(15, 47, 0, 0)),
        ],
    )
    .description(Some("".to_string()))
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
