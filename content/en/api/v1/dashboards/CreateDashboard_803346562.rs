// Create a new dashboard with distribution widget and apm stats data
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboards::DashboardsAPI;
use datadog_api_client::datadogV1::model::ApmStatsQueryDefinition;
use datadog_api_client::datadogV1::model::ApmStatsQueryRowType;
use datadog_api_client::datadogV1::model::Dashboard;
use datadog_api_client::datadogV1::model::DashboardLayoutType;
use datadog_api_client::datadogV1::model::DistributionWidgetDefinition;
use datadog_api_client::datadogV1::model::DistributionWidgetDefinitionType;
use datadog_api_client::datadogV1::model::DistributionWidgetRequest;
use datadog_api_client::datadogV1::model::Widget;
use datadog_api_client::datadogV1::model::WidgetDefinition;
use datadog_api_client::datadogV1::model::WidgetLayout;
use datadog_api_client::datadogV1::model::WidgetTextAlign;

#[tokio::main]
async fn main() {
    let body = Dashboard::new(
        DashboardLayoutType::ORDERED,
        "Example-Dashboard".to_string(),
        vec![
            Widget::new(WidgetDefinition::DistributionWidgetDefinition(Box::new(
                DistributionWidgetDefinition::new(
                    vec![DistributionWidgetRequest::new().apm_stats_query(
                        ApmStatsQueryDefinition::new(
                            "prod".to_string(),
                            "cassandra.query".to_string(),
                            "datacenter:dc1".to_string(),
                            ApmStatsQueryRowType::SERVICE,
                            "cassandra".to_string(),
                        ),
                    )],
                    DistributionWidgetDefinitionType::DISTRIBUTION,
                )
                .title("".to_string())
                .title_align(WidgetTextAlign::LEFT)
                .title_size("16".to_string()),
            )))
            .layout(WidgetLayout::new(4, 4, 0, 0)),
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
