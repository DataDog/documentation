// Create a new dashboard with template variable defaults returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboards::DashboardsAPI;
use datadog_api_client::datadogV1::model::Dashboard;
use datadog_api_client::datadogV1::model::DashboardLayoutType;
use datadog_api_client::datadogV1::model::DashboardReflowType;
use datadog_api_client::datadogV1::model::DashboardTemplateVariable;
use datadog_api_client::datadogV1::model::HostMapRequest;
use datadog_api_client::datadogV1::model::HostMapWidgetDefinition;
use datadog_api_client::datadogV1::model::HostMapWidgetDefinitionRequests;
use datadog_api_client::datadogV1::model::HostMapWidgetDefinitionType;
use datadog_api_client::datadogV1::model::Widget;
use datadog_api_client::datadogV1::model::WidgetDefinition;

#[tokio::main]
async fn main() {
    let body = Dashboard::new(
        DashboardLayoutType::ORDERED,
        "".to_string(),
        vec![Widget::new(WidgetDefinition::HostMapWidgetDefinition(
            Box::new(HostMapWidgetDefinition::new(
                HostMapWidgetDefinitionRequests::new()
                    .fill(HostMapRequest::new().q("avg:system.cpu.user{*}".to_string())),
                HostMapWidgetDefinitionType::HOSTMAP,
            )),
        ))],
    )
    .description(None)
    .is_read_only(false)
    .notify_list(Some(vec![]))
    .reflow_type(DashboardReflowType::AUTO)
    .restricted_roles(vec![])
    .template_variables(Some(vec![DashboardTemplateVariable::new(
        "host1".to_string(),
    )
    .available_values(Some(vec![
        "my-host".to_string(),
        "host1".to_string(),
        "host2".to_string(),
    ]))
    .defaults(vec!["my-host".to_string()])
    .prefix(Some("host".to_string()))]));
    let configuration = datadog::Configuration::new();
    let api = DashboardsAPI::with_config(configuration);
    let resp = api.create_dashboard(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
