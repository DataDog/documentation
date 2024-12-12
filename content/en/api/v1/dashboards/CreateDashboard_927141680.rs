// Create a new dashboard with funnel widget
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboards::DashboardsAPI;
use datadog_api_client::datadogV1::model::Dashboard;
use datadog_api_client::datadogV1::model::DashboardLayoutType;
use datadog_api_client::datadogV1::model::FunnelQuery;
use datadog_api_client::datadogV1::model::FunnelRequestType;
use datadog_api_client::datadogV1::model::FunnelSource;
use datadog_api_client::datadogV1::model::FunnelWidgetDefinition;
use datadog_api_client::datadogV1::model::FunnelWidgetDefinitionType;
use datadog_api_client::datadogV1::model::FunnelWidgetRequest;
use datadog_api_client::datadogV1::model::Widget;
use datadog_api_client::datadogV1::model::WidgetDefinition;

#[tokio::main]
async fn main() {
    let body = Dashboard::new(
        DashboardLayoutType::ORDERED,
        "Example-Dashboard with funnel widget".to_string(),
        vec![Widget::new(WidgetDefinition::FunnelWidgetDefinition(
            Box::new(FunnelWidgetDefinition::new(
                vec![FunnelWidgetRequest::new(
                    FunnelQuery::new(FunnelSource::RUM, "".to_string(), vec![]),
                    FunnelRequestType::FUNNEL,
                )],
                FunnelWidgetDefinitionType::FUNNEL,
            )),
        ))],
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
