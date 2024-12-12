// Update a retention filter returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_apm_retention_filters::APMRetentionFiltersAPI;
use datadog_api_client::datadogV2::model::ApmRetentionFilterType;
use datadog_api_client::datadogV2::model::RetentionFilterAllType;
use datadog_api_client::datadogV2::model::RetentionFilterUpdateAttributes;
use datadog_api_client::datadogV2::model::RetentionFilterUpdateData;
use datadog_api_client::datadogV2::model::RetentionFilterUpdateRequest;
use datadog_api_client::datadogV2::model::SpansFilterCreate;

#[tokio::main]
async fn main() {
    // there is a valid "retention_filter" in the system
    let retention_filter_data_id = std::env::var("RETENTION_FILTER_DATA_ID").unwrap();
    let body = RetentionFilterUpdateRequest::new(RetentionFilterUpdateData::new(
        RetentionFilterUpdateAttributes::new(
            true,
            SpansFilterCreate::new("@_top_level:1 test:service-demo".to_string()),
            RetentionFilterAllType::SPANS_SAMPLING_PROCESSOR,
            "test".to_string(),
            0.9,
        ),
        "test-id".to_string(),
        ApmRetentionFilterType::apm_retention_filter,
    ));
    let configuration = datadog::Configuration::new();
    let api = APMRetentionFiltersAPI::with_config(configuration);
    let resp = api
        .update_apm_retention_filter(retention_filter_data_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
