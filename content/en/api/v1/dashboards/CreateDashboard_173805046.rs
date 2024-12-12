// Create a new dashboard with slo widget
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboards::DashboardsAPI;
use datadog_api_client::datadogV1::model::Dashboard;
use datadog_api_client::datadogV1::model::DashboardLayoutType;
use datadog_api_client::datadogV1::model::SLOWidgetDefinition;
use datadog_api_client::datadogV1::model::SLOWidgetDefinitionType;
use datadog_api_client::datadogV1::model::Widget;
use datadog_api_client::datadogV1::model::WidgetDefinition;
use datadog_api_client::datadogV1::model::WidgetLayout;
use datadog_api_client::datadogV1::model::WidgetTextAlign;
use datadog_api_client::datadogV1::model::WidgetTimeWindows;
use datadog_api_client::datadogV1::model::WidgetViewMode;

#[tokio::main]
async fn main() {
    // there is a valid "slo" in the system
    let slo_data_0_id = std::env::var("SLO_DATA_0_ID").unwrap();
    let body = Dashboard::new(
        DashboardLayoutType::FREE,
        "Example-Dashboard".to_string(),
        vec![Widget::new(WidgetDefinition::SLOWidgetDefinition(Box::new(
            SLOWidgetDefinition::new(SLOWidgetDefinitionType::SLO, "detail".to_string())
                .additional_query_filters("!host:excluded_host".to_string())
                .global_time_target("0".to_string())
                .show_error_budget(true)
                .slo_id(slo_data_0_id.clone())
                .time_windows(vec![WidgetTimeWindows::SEVEN_DAYS])
                .title_align(WidgetTextAlign::LEFT)
                .title_size("16".to_string())
                .view_mode(WidgetViewMode::OVERALL),
        )))
        .layout(WidgetLayout::new(21, 60, 0, 0))],
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
