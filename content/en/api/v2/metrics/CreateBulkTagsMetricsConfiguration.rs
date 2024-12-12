// Configure tags for multiple metrics returns "Accepted" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_metrics::MetricsAPI;
use datadog_api_client::datadogV2::model::MetricBulkConfigureTagsType;
use datadog_api_client::datadogV2::model::MetricBulkTagConfigCreate;
use datadog_api_client::datadogV2::model::MetricBulkTagConfigCreateAttributes;
use datadog_api_client::datadogV2::model::MetricBulkTagConfigCreateRequest;

#[tokio::main]
async fn main() {
    // there is a valid "user" in the system
    let user_data_attributes_email = std::env::var("USER_DATA_ATTRIBUTES_EMAIL").unwrap();
    let body = MetricBulkTagConfigCreateRequest::new(
        MetricBulkTagConfigCreate::new(
            "system.load.1".to_string(),
            MetricBulkConfigureTagsType::BULK_MANAGE_TAGS,
        )
        .attributes(
            MetricBulkTagConfigCreateAttributes::new()
                .emails(vec![user_data_attributes_email.clone()])
                .tags(vec!["test".to_string(), "examplemetric".to_string()]),
        ),
    );
    let configuration = datadog::Configuration::new();
    let api = MetricsAPI::with_config(configuration);
    let resp = api.create_bulk_tags_metrics_configuration(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
