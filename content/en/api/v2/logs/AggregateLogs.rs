// Aggregate events returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_logs::LogsAPI;
use datadog_api_client::datadogV2::model::LogsAggregateRequest;
use datadog_api_client::datadogV2::model::LogsQueryFilter;

#[tokio::main]
async fn main() {
    let body = LogsAggregateRequest::new().filter(
        LogsQueryFilter::new()
            .from("now-15m".to_string())
            .indexes(vec!["main".to_string()])
            .query("*".to_string())
            .to("now".to_string()),
    );
    let configuration = datadog::Configuration::new();
    let api = LogsAPI::with_config(configuration);
    let resp = api.aggregate_logs(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
