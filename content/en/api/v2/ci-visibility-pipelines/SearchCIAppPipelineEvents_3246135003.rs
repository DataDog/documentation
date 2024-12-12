// Search pipelines events returns "OK" response with pagination
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_ci_visibility_pipelines::CIVisibilityPipelinesAPI;
use datadog_api_client::datadogV2::api_ci_visibility_pipelines::SearchCIAppPipelineEventsOptionalParams;
use datadog_api_client::datadogV2::model::CIAppPipelineEventsRequest;
use datadog_api_client::datadogV2::model::CIAppPipelinesQueryFilter;
use datadog_api_client::datadogV2::model::CIAppQueryOptions;
use datadog_api_client::datadogV2::model::CIAppQueryPageOptions;
use datadog_api_client::datadogV2::model::CIAppSort;
use futures_util::pin_mut;
use futures_util::stream::StreamExt;

#[tokio::main]
async fn main() {
    let body = CIAppPipelineEventsRequest::new()
        .filter(
            CIAppPipelinesQueryFilter::new()
                .from("now-30s".to_string())
                .to("now".to_string()),
        )
        .options(CIAppQueryOptions::new().timezone("GMT".to_string()))
        .page(CIAppQueryPageOptions::new().limit(2))
        .sort(CIAppSort::TIMESTAMP_ASCENDING);
    let configuration = datadog::Configuration::new();
    let api = CIVisibilityPipelinesAPI::with_config(configuration);
    let response = api.search_ci_app_pipeline_events_with_pagination(
        SearchCIAppPipelineEventsOptionalParams::default().body(body),
    );
    pin_mut!(response);
    while let Some(resp) = response.next().await {
        if let Ok(value) = resp {
            println!("{:#?}", value);
        } else {
            println!("{:#?}", resp.unwrap_err());
        }
    }
}
