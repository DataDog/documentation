// List tags by metric name returns "Success" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_metrics::MetricsAPI;

#[tokio::main]
async fn main() {
    // there is a valid "metric_tag_configuration" in the system
    let metric_tag_configuration_data_id =
        std::env::var("METRIC_TAG_CONFIGURATION_DATA_ID").unwrap();
    let configuration = datadog::Configuration::new();
    let api = MetricsAPI::with_config(configuration);
    let resp = api
        .list_tags_by_metric_name(metric_tag_configuration_data_id.clone())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
