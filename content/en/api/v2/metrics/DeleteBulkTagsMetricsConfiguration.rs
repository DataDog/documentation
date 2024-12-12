// Delete tags for multiple metrics returns "Accepted" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_metrics::MetricsAPI;
use datadog_api_client::datadogV2::model::MetricBulkConfigureTagsType;
use datadog_api_client::datadogV2::model::MetricBulkTagConfigDelete;
use datadog_api_client::datadogV2::model::MetricBulkTagConfigDeleteAttributes;
use datadog_api_client::datadogV2::model::MetricBulkTagConfigDeleteRequest;

#[tokio::main]
async fn main() {
    let body = MetricBulkTagConfigDeleteRequest::new(
        MetricBulkTagConfigDelete::new(
            "kafka.lag".to_string(),
            MetricBulkConfigureTagsType::BULK_MANAGE_TAGS,
        )
        .attributes(MetricBulkTagConfigDeleteAttributes::new().emails(vec![
            "sue@example.com".to_string(),
            "bob@example.com".to_string(),
        ])),
    );
    let configuration = datadog::Configuration::new();
    let api = MetricsAPI::with_config(configuration);
    let resp = api.delete_bulk_tags_metrics_configuration(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
