// Create a geomap widget using an event_list request
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboards::DashboardsAPI;
use datadog_api_client::datadogV1::model::Dashboard;
use datadog_api_client::datadogV1::model::DashboardLayoutType;
use datadog_api_client::datadogV1::model::DashboardReflowType;
use datadog_api_client::datadogV1::model::FormulaAndFunctionResponseFormat;
use datadog_api_client::datadogV1::model::GeomapWidgetDefinition;
use datadog_api_client::datadogV1::model::GeomapWidgetDefinitionStyle;
use datadog_api_client::datadogV1::model::GeomapWidgetDefinitionType;
use datadog_api_client::datadogV1::model::GeomapWidgetDefinitionView;
use datadog_api_client::datadogV1::model::GeomapWidgetRequest;
use datadog_api_client::datadogV1::model::ListStreamColumn;
use datadog_api_client::datadogV1::model::ListStreamColumnWidth;
use datadog_api_client::datadogV1::model::ListStreamQuery;
use datadog_api_client::datadogV1::model::ListStreamSource;
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
            Widget::new(WidgetDefinition::GeomapWidgetDefinition(Box::new(
                GeomapWidgetDefinition::new(
                    vec![GeomapWidgetRequest::new()
                        .columns(vec![
                            ListStreamColumn::new(
                                "@network.client.geoip.location.latitude".to_string(),
                                ListStreamColumnWidth::AUTO,
                            ),
                            ListStreamColumn::new(
                                "@network.client.geoip.location.longitude".to_string(),
                                ListStreamColumnWidth::AUTO,
                            ),
                            ListStreamColumn::new(
                                "@network.client.geoip.country.iso_code".to_string(),
                                ListStreamColumnWidth::AUTO,
                            ),
                            ListStreamColumn::new(
                                "@network.client.geoip.subdivision.name".to_string(),
                                ListStreamColumnWidth::AUTO,
                            ),
                            ListStreamColumn::new(
                                "classic".to_string(),
                                ListStreamColumnWidth::AUTO,
                            ),
                            ListStreamColumn::new("".to_string(), ListStreamColumnWidth::AUTO),
                        ])
                        .query(
                            ListStreamQuery::new(ListStreamSource::LOGS_STREAM, "".to_string())
                                .indexes(vec![]),
                        )
                        .response_format(FormulaAndFunctionResponseFormat::EVENT_LIST)],
                    GeomapWidgetDefinitionStyle::new("hostmap_blues".to_string(), false),
                    GeomapWidgetDefinitionType::GEOMAP,
                    GeomapWidgetDefinitionView::new("WORLD".to_string()),
                )
                .title("".to_string())
                .title_align(WidgetTextAlign::LEFT)
                .title_size("16".to_string()),
            )))
            .layout(WidgetLayout::new(6, 12, 0, 0)),
        ],
    )
    .description(Some("Example-Dashboard".to_string()))
    .notify_list(Some(vec![]))
    .reflow_type(DashboardReflowType::FIXED)
    .tags(Some(vec![]))
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
