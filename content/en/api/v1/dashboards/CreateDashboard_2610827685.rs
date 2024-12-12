// Create a new dashboard with run-workflow widget
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboards::DashboardsAPI;
use datadog_api_client::datadogV1::model::Dashboard;
use datadog_api_client::datadogV1::model::DashboardLayoutType;
use datadog_api_client::datadogV1::model::RunWorkflowWidgetDefinition;
use datadog_api_client::datadogV1::model::RunWorkflowWidgetDefinitionType;
use datadog_api_client::datadogV1::model::RunWorkflowWidgetInput;
use datadog_api_client::datadogV1::model::Widget;
use datadog_api_client::datadogV1::model::WidgetDefinition;
use datadog_api_client::datadogV1::model::WidgetLayout;
use datadog_api_client::datadogV1::model::WidgetLegacyLiveSpan;
use datadog_api_client::datadogV1::model::WidgetTextAlign;
use datadog_api_client::datadogV1::model::WidgetTime;

#[tokio::main]
async fn main() {
    let body = Dashboard::new(
        DashboardLayoutType::FREE,
        "Example-Dashboard".to_string(),
        vec![
            Widget::new(WidgetDefinition::RunWorkflowWidgetDefinition(Box::new(
                RunWorkflowWidgetDefinition::new(
                    RunWorkflowWidgetDefinitionType::RUN_WORKFLOW,
                    "2e055f16-8b6a-4cdd-b452-17a34c44b160".to_string(),
                )
                .inputs(vec![RunWorkflowWidgetInput::new(
                    "environment".to_string(),
                    "$env.value".to_string(),
                )])
                .time(WidgetTime::WidgetLegacyLiveSpan(Box::new(
                    WidgetLegacyLiveSpan::new(),
                )))
                .title("Run workflow title".to_string())
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
