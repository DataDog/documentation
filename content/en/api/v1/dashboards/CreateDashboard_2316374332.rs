// Create a new dashboard with alert_value widget
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboards::DashboardsAPI;
use datadog_api_client::datadogV1::model::AlertValueWidgetDefinition;
use datadog_api_client::datadogV1::model::AlertValueWidgetDefinitionType;
use datadog_api_client::datadogV1::model::Dashboard;
use datadog_api_client::datadogV1::model::DashboardLayoutType;
use datadog_api_client::datadogV1::model::Widget;
use datadog_api_client::datadogV1::model::WidgetDefinition;
use datadog_api_client::datadogV1::model::WidgetLayout;
use datadog_api_client::datadogV1::model::WidgetTextAlign;

#[tokio::main]
async fn main() {
    // there is a valid "monitor" in the system
    let body = Dashboard::new(
        DashboardLayoutType::FREE,
        "Example-Dashboard".to_string(),
        vec![
            Widget::new(WidgetDefinition::AlertValueWidgetDefinition(Box::new(
                AlertValueWidgetDefinition::new(
                    "7".to_string(),
                    AlertValueWidgetDefinitionType::ALERT_VALUE,
                )
                .precision(2)
                .text_align(WidgetTextAlign::LEFT)
                .title("".to_string())
                .title_align(WidgetTextAlign::LEFT)
                .title_size("16".to_string())
                .unit("auto".to_string()),
            )))
            .layout(WidgetLayout::new(8, 15, 0, 0)),
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
