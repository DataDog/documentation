// Search pipelines events returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_ci_visibility_pipelines::CIVisibilityPipelinesAPI;
use datadog_api_client::datadogV2::api_ci_visibility_pipelines::SearchCIAppPipelineEventsOptionalParams;
use datadog_api_client::datadogV2::model::CIAppPipelineEventsRequest;
use datadog_api_client::datadogV2::model::CIAppPipelinesQueryFilter;
use datadog_api_client::datadogV2::model::CIAppQueryOptions;
use datadog_api_client::datadogV2::model::CIAppQueryPageOptions;
use datadog_api_client::datadogV2::model::CIAppSort;

#[tokio::main]
async fn main() {
    let body = CIAppPipelineEventsRequest::new()
        .filter(
            CIAppPipelinesQueryFilter::new()
                .from("now-15m".to_string())
                .query("@ci.provider.name:github AND @ci.status:error".to_string())
                .to("now".to_string()),
        )
        .options(CIAppQueryOptions::new().timezone("GMT".to_string()))
        .page(CIAppQueryPageOptions::new().limit(5))
        .sort(CIAppSort::TIMESTAMP_ASCENDING);
    let configuration = datadog::Configuration::new();
    let api = CIVisibilityPipelinesAPI::with_config(configuration);
    let resp = api
        .search_ci_app_pipeline_events(
            SearchCIAppPipelineEventsOptionalParams::default().body(body),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
