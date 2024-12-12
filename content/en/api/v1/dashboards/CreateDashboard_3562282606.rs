// Create a new dashboard with a change widget using formulas and functions slo
// query
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboards::DashboardsAPI;
use datadog_api_client::datadogV1::model::ChangeWidgetDefinition;
use datadog_api_client::datadogV1::model::ChangeWidgetDefinitionType;
use datadog_api_client::datadogV1::model::ChangeWidgetRequest;
use datadog_api_client::datadogV1::model::Dashboard;
use datadog_api_client::datadogV1::model::DashboardLayoutType;
use datadog_api_client::datadogV1::model::FormulaAndFunctionQueryDefinition;
use datadog_api_client::datadogV1::model::FormulaAndFunctionResponseFormat;
use datadog_api_client::datadogV1::model::FormulaAndFunctionSLODataSource;
use datadog_api_client::datadogV1::model::FormulaAndFunctionSLOGroupMode;
use datadog_api_client::datadogV1::model::FormulaAndFunctionSLOMeasure;
use datadog_api_client::datadogV1::model::FormulaAndFunctionSLOQueryDefinition;
use datadog_api_client::datadogV1::model::FormulaAndFunctionSLOQueryType;
use datadog_api_client::datadogV1::model::Widget;
use datadog_api_client::datadogV1::model::WidgetChangeType;
use datadog_api_client::datadogV1::model::WidgetDefinition;
use datadog_api_client::datadogV1::model::WidgetFormula;
use datadog_api_client::datadogV1::model::WidgetLayout;
use datadog_api_client::datadogV1::model::WidgetLegacyLiveSpan;
use datadog_api_client::datadogV1::model::WidgetOrderBy;
use datadog_api_client::datadogV1::model::WidgetSort;
use datadog_api_client::datadogV1::model::WidgetTextAlign;
use datadog_api_client::datadogV1::model::WidgetTime;

#[tokio::main]
async fn main() {
    // there is a valid "slo" in the system
    let slo_data_0_id = std::env::var("SLO_DATA_0_ID").unwrap();
    let body = Dashboard::new(
        DashboardLayoutType::ORDERED,
        "Example-Dashboard".to_string(),
        vec![
            Widget::new(WidgetDefinition::ChangeWidgetDefinition(Box::new(
                ChangeWidgetDefinition::new(
                    vec![ChangeWidgetRequest::new()
                        .change_type(WidgetChangeType::ABSOLUTE)
                        .formulas(vec![
                            WidgetFormula::new("hour_before(query1)".to_string()),
                            WidgetFormula::new("query1".to_string()),
                        ])
                        .increase_good(true)
                        .order_by(WidgetOrderBy::CHANGE)
                        .order_dir(WidgetSort::ASCENDING)
                        .queries(vec![
                            FormulaAndFunctionQueryDefinition::FormulaAndFunctionSLOQueryDefinition(
                                Box::new(
                                    FormulaAndFunctionSLOQueryDefinition::new(
                                        FormulaAndFunctionSLODataSource::SLO,
                                        FormulaAndFunctionSLOMeasure::SLO_STATUS,
                                        slo_data_0_id.clone(),
                                    )
                                    .additional_query_filters("*".to_string())
                                    .group_mode(FormulaAndFunctionSLOGroupMode::OVERALL)
                                    .name("query1".to_string())
                                    .slo_query_type(FormulaAndFunctionSLOQueryType::METRIC),
                                ),
                            ),
                        ])
                        .response_format(FormulaAndFunctionResponseFormat::SCALAR)],
                    ChangeWidgetDefinitionType::CHANGE,
                )
                .time(WidgetTime::WidgetLegacyLiveSpan(Box::new(
                    WidgetLegacyLiveSpan::new(),
                )))
                .title("".to_string())
                .title_align(WidgetTextAlign::LEFT)
                .title_size("16".to_string()),
            )))
            .layout(WidgetLayout::new(2, 4, 0, 0)),
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
