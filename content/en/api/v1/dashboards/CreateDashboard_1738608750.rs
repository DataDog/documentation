// Create a new dashboard with free_text widget
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboards::DashboardsAPI;
use datadog_api_client::datadogV1::model::Dashboard;
use datadog_api_client::datadogV1::model::DashboardLayoutType;
use datadog_api_client::datadogV1::model::FreeTextWidgetDefinition;
use datadog_api_client::datadogV1::model::FreeTextWidgetDefinitionType;
use datadog_api_client::datadogV1::model::Widget;
use datadog_api_client::datadogV1::model::WidgetDefinition;
use datadog_api_client::datadogV1::model::WidgetLayout;
use datadog_api_client::datadogV1::model::WidgetTextAlign;

#[tokio::main]
async fn main() {
    let body = Dashboard::new(
        DashboardLayoutType::FREE,
        "Example-Dashboard".to_string(),
        vec![
            Widget::new(WidgetDefinition::FreeTextWidgetDefinition(Box::new(
                FreeTextWidgetDefinition::new(
                    "Example free text".to_string(),
                    FreeTextWidgetDefinitionType::FREE_TEXT,
                )
                .color("#4d4d4d".to_string())
                .font_size("auto".to_string())
                .text_align(WidgetTextAlign::LEFT),
            )))
            .layout(WidgetLayout::new(6, 24, 0, 0)),
        ],
    )
    .description(None)
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
