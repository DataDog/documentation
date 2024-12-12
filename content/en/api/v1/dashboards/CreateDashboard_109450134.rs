// Create a new dashboard with slo list widget with sort
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboards::DashboardsAPI;
use datadog_api_client::datadogV1::model::Dashboard;
use datadog_api_client::datadogV1::model::DashboardLayoutType;
use datadog_api_client::datadogV1::model::SLOListWidgetDefinition;
use datadog_api_client::datadogV1::model::SLOListWidgetDefinitionType;
use datadog_api_client::datadogV1::model::SLOListWidgetQuery;
use datadog_api_client::datadogV1::model::SLOListWidgetRequest;
use datadog_api_client::datadogV1::model::SLOListWidgetRequestType;
use datadog_api_client::datadogV1::model::Widget;
use datadog_api_client::datadogV1::model::WidgetDefinition;
use datadog_api_client::datadogV1::model::WidgetFieldSort;
use datadog_api_client::datadogV1::model::WidgetLayout;
use datadog_api_client::datadogV1::model::WidgetSort;
use datadog_api_client::datadogV1::model::WidgetTextAlign;

#[tokio::main]
async fn main() {
    let body = Dashboard::new(
        DashboardLayoutType::FREE,
        "Example-Dashboard".to_string(),
        vec![
            Widget::new(WidgetDefinition::SLOListWidgetDefinition(Box::new(
                SLOListWidgetDefinition::new(
                    vec![SLOListWidgetRequest::new(
                        SLOListWidgetQuery::new("env:prod AND service:my-app".to_string())
                            .limit(75)
                            .sort(vec![WidgetFieldSort::new(
                                "status.sli".to_string(),
                                WidgetSort::ASCENDING,
                            )]),
                        SLOListWidgetRequestType::SLO_LIST,
                    )],
                    SLOListWidgetDefinitionType::SLO_LIST,
                )
                .title_align(WidgetTextAlign::LEFT)
                .title_size("16".to_string()),
            )))
            .layout(WidgetLayout::new(21, 60, 0, 0)),
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
