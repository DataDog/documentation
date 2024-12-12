// Update a dashboard returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboards::DashboardsAPI;
use datadog_api_client::datadogV1::model::Dashboard;
use datadog_api_client::datadogV1::model::DashboardLayoutType;
use datadog_api_client::datadogV1::model::ListStreamColumn;
use datadog_api_client::datadogV1::model::ListStreamColumnWidth;
use datadog_api_client::datadogV1::model::ListStreamQuery;
use datadog_api_client::datadogV1::model::ListStreamResponseFormat;
use datadog_api_client::datadogV1::model::ListStreamSource;
use datadog_api_client::datadogV1::model::ListStreamWidgetDefinition;
use datadog_api_client::datadogV1::model::ListStreamWidgetDefinitionType;
use datadog_api_client::datadogV1::model::ListStreamWidgetRequest;
use datadog_api_client::datadogV1::model::Widget;
use datadog_api_client::datadogV1::model::WidgetDefinition;

#[tokio::main]
async fn main() {
    // there is a valid "dashboard" in the system
    let dashboard_id = std::env::var("DASHBOARD_ID").unwrap();
    let body = Dashboard::new(
        DashboardLayoutType::ORDERED,
        "Example-Dashboard with list_stream widget".to_string(),
        vec![Widget::new(WidgetDefinition::ListStreamWidgetDefinition(
            Box::new(ListStreamWidgetDefinition::new(
                vec![ListStreamWidgetRequest::new(
                    vec![ListStreamColumn::new(
                        "timestamp".to_string(),
                        ListStreamColumnWidth::AUTO,
                    )],
                    ListStreamQuery::new(ListStreamSource::APM_ISSUE_STREAM, "".to_string()),
                    ListStreamResponseFormat::EVENT_LIST,
                )],
                ListStreamWidgetDefinitionType::LIST_STREAM,
            )),
        ))],
    )
    .description(Some("Updated description".to_string()));
    let configuration = datadog::Configuration::new();
    let api = DashboardsAPI::with_config(configuration);
    let resp = api.update_dashboard(dashboard_id.clone(), body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
