// Update a notebook returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_notebooks::NotebooksAPI;
use datadog_api_client::datadogV1::model::NotebookCellCreateRequest;
use datadog_api_client::datadogV1::model::NotebookCellCreateRequestAttributes;
use datadog_api_client::datadogV1::model::NotebookCellResourceType;
use datadog_api_client::datadogV1::model::NotebookGlobalTime;
use datadog_api_client::datadogV1::model::NotebookGraphSize;
use datadog_api_client::datadogV1::model::NotebookMarkdownCellAttributes;
use datadog_api_client::datadogV1::model::NotebookMarkdownCellDefinition;
use datadog_api_client::datadogV1::model::NotebookMarkdownCellDefinitionType;
use datadog_api_client::datadogV1::model::NotebookRelativeTime;
use datadog_api_client::datadogV1::model::NotebookResourceType;
use datadog_api_client::datadogV1::model::NotebookSplitBy;
use datadog_api_client::datadogV1::model::NotebookStatus;
use datadog_api_client::datadogV1::model::NotebookTimeseriesCellAttributes;
use datadog_api_client::datadogV1::model::NotebookUpdateCell;
use datadog_api_client::datadogV1::model::NotebookUpdateData;
use datadog_api_client::datadogV1::model::NotebookUpdateDataAttributes;
use datadog_api_client::datadogV1::model::NotebookUpdateRequest;
use datadog_api_client::datadogV1::model::TimeseriesWidgetDefinition;
use datadog_api_client::datadogV1::model::TimeseriesWidgetDefinitionType;
use datadog_api_client::datadogV1::model::TimeseriesWidgetRequest;
use datadog_api_client::datadogV1::model::WidgetAxis;
use datadog_api_client::datadogV1::model::WidgetDisplayType;
use datadog_api_client::datadogV1::model::WidgetLineType;
use datadog_api_client::datadogV1::model::WidgetLineWidth;
use datadog_api_client::datadogV1::model::WidgetLiveSpan;
use datadog_api_client::datadogV1::model::WidgetRequestStyle;

#[tokio::main]
async fn main() {
    // there is a valid "notebook" in the system
    let notebook_data_id: i64 = std::env::var("NOTEBOOK_DATA_ID").unwrap().parse().unwrap();
    let body = NotebookUpdateRequest::new(NotebookUpdateData::new(
        NotebookUpdateDataAttributes::new(
            vec![
                NotebookUpdateCell::NotebookCellCreateRequest(Box::new(
                    NotebookCellCreateRequest::new(
                        NotebookCellCreateRequestAttributes::NotebookMarkdownCellAttributes(
                            Box::new(NotebookMarkdownCellAttributes::new(
                                NotebookMarkdownCellDefinition::new(
                                    r#"## Some test markdown

```js
var x, y;
x = 5;
y = 6;
```"#
                                        .to_string(),
                                    NotebookMarkdownCellDefinitionType::MARKDOWN,
                                ),
                            )),
                        ),
                        NotebookCellResourceType::NOTEBOOK_CELLS,
                    ),
                )),
                NotebookUpdateCell::NotebookCellCreateRequest(Box::new(
                    NotebookCellCreateRequest::new(
                        NotebookCellCreateRequestAttributes::NotebookTimeseriesCellAttributes(
                            Box::new(
                                NotebookTimeseriesCellAttributes::new(
                                    TimeseriesWidgetDefinition::new(
                                        vec![TimeseriesWidgetRequest::new()
                                            .display_type(WidgetDisplayType::LINE)
                                            .q("avg:system.load.1{*}".to_string())
                                            .style(
                                                WidgetRequestStyle::new()
                                                    .line_type(WidgetLineType::SOLID)
                                                    .line_width(WidgetLineWidth::NORMAL)
                                                    .palette("dog_classic".to_string()),
                                            )],
                                        TimeseriesWidgetDefinitionType::TIMESERIES,
                                    )
                                    .show_legend(true)
                                    .yaxis(WidgetAxis::new().scale("linear".to_string())),
                                )
                                .graph_size(NotebookGraphSize::MEDIUM)
                                .split_by(NotebookSplitBy::new(vec![], vec![]))
                                .time(None),
                            ),
                        ),
                        NotebookCellResourceType::NOTEBOOK_CELLS,
                    ),
                )),
            ],
            "Example-Notebook-updated".to_string(),
            NotebookGlobalTime::NotebookRelativeTime(Box::new(NotebookRelativeTime::new(
                WidgetLiveSpan::PAST_ONE_HOUR,
            ))),
        )
        .status(NotebookStatus::PUBLISHED),
        NotebookResourceType::NOTEBOOKS,
    ));
    let configuration = datadog::Configuration::new();
    let api = NotebooksAPI::with_config(configuration);
    let resp = api.update_notebook(notebook_data_id.clone(), body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
