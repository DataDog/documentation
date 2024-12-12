// Create a new dashboard with geomap widget
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboards::DashboardsAPI;
use datadog_api_client::datadogV1::model::Dashboard;
use datadog_api_client::datadogV1::model::DashboardLayoutType;
use datadog_api_client::datadogV1::model::FormulaAndFunctionEventAggregation;
use datadog_api_client::datadogV1::model::FormulaAndFunctionEventQueryDefinition;
use datadog_api_client::datadogV1::model::FormulaAndFunctionEventQueryDefinitionCompute;
use datadog_api_client::datadogV1::model::FormulaAndFunctionEventQueryDefinitionSearch;
use datadog_api_client::datadogV1::model::FormulaAndFunctionEventQueryGroupBy;
use datadog_api_client::datadogV1::model::FormulaAndFunctionEventQueryGroupBySort;
use datadog_api_client::datadogV1::model::FormulaAndFunctionEventsDataSource;
use datadog_api_client::datadogV1::model::FormulaAndFunctionQueryDefinition;
use datadog_api_client::datadogV1::model::FormulaAndFunctionResponseFormat;
use datadog_api_client::datadogV1::model::FormulaType;
use datadog_api_client::datadogV1::model::GeomapWidgetDefinition;
use datadog_api_client::datadogV1::model::GeomapWidgetDefinitionStyle;
use datadog_api_client::datadogV1::model::GeomapWidgetDefinitionType;
use datadog_api_client::datadogV1::model::GeomapWidgetDefinitionView;
use datadog_api_client::datadogV1::model::GeomapWidgetRequest;
use datadog_api_client::datadogV1::model::QuerySortOrder;
use datadog_api_client::datadogV1::model::Widget;
use datadog_api_client::datadogV1::model::WidgetDefinition;
use datadog_api_client::datadogV1::model::WidgetFormula;
use datadog_api_client::datadogV1::model::WidgetFormulaSort;
use datadog_api_client::datadogV1::model::WidgetLayout;
use datadog_api_client::datadogV1::model::WidgetLegacyLiveSpan;
use datadog_api_client::datadogV1::model::WidgetSort;
use datadog_api_client::datadogV1::model::WidgetSortBy;
use datadog_api_client::datadogV1::model::WidgetSortOrderBy;
use datadog_api_client::datadogV1::model::WidgetTextAlign;
use datadog_api_client::datadogV1::model::WidgetTime;

#[tokio::main]
async fn main() {
    let body =
        Dashboard::new(
            DashboardLayoutType::FREE,
            "Example-Dashboard".to_string(),
            vec![
                Widget::new(
                    WidgetDefinition::GeomapWidgetDefinition(
                        Box::new(
                            GeomapWidgetDefinition::new(
                                vec![
                                    GeomapWidgetRequest::new()
                                        .formulas(vec![WidgetFormula::new("query1".to_string())])
                                        .queries(
                                            vec![
                                                FormulaAndFunctionQueryDefinition
                                                ::FormulaAndFunctionEventQueryDefinition(
                                                    Box::new(
                                                        FormulaAndFunctionEventQueryDefinition::new(
                                                            FormulaAndFunctionEventQueryDefinitionCompute::new(
                                                                FormulaAndFunctionEventAggregation::COUNT,
                                                            ),
                                                            FormulaAndFunctionEventsDataSource::RUM,
                                                            "query1".to_string(),
                                                        )
                                                            .group_by(
                                                                vec![
                                                                    FormulaAndFunctionEventQueryGroupBy::new(
                                                                        "@geo.country_iso_code".to_string(),
                                                                    )
                                                                        .limit(250)
                                                                        .sort(
                                                                            FormulaAndFunctionEventQueryGroupBySort
                                                                            ::new(
                                                                                FormulaAndFunctionEventAggregation
                                                                                ::COUNT,
                                                                            ).order(QuerySortOrder::DESC),
                                                                        )
                                                                ],
                                                            )
                                                            .indexes(vec!["*".to_string()])
                                                            .search(
                                                                FormulaAndFunctionEventQueryDefinitionSearch::new(
                                                                    "".to_string(),
                                                                ),
                                                            ),
                                                    ),
                                                )
                                            ],
                                        )
                                        .response_format(FormulaAndFunctionResponseFormat::SCALAR)
                                        .sort(
                                            WidgetSortBy::new()
                                                .count(250)
                                                .order_by(
                                                    vec![
                                                        WidgetSortOrderBy::WidgetFormulaSort(
                                                            Box::new(
                                                                WidgetFormulaSort::new(
                                                                    0,
                                                                    WidgetSort::DESCENDING,
                                                                    FormulaType::FORMULA,
                                                                ),
                                                            ),
                                                        )
                                                    ],
                                                ),
                                        )
                                ],
                                GeomapWidgetDefinitionStyle::new("hostmap_blues".to_string(), false),
                                GeomapWidgetDefinitionType::GEOMAP,
                                GeomapWidgetDefinitionView::new("WORLD".to_string()),
                            )
                                .time(WidgetTime::WidgetLegacyLiveSpan(Box::new(WidgetLegacyLiveSpan::new())))
                                .title("".to_string())
                                .title_align(WidgetTextAlign::LEFT)
                                .title_size("16".to_string()),
                        ),
                    ),
                ).layout(WidgetLayout::new(30, 47, 0, 0))
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
