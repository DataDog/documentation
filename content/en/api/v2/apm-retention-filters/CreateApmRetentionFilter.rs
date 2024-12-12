// Create a retention filter returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_apm_retention_filters::APMRetentionFiltersAPI;
use datadog_api_client::datadogV2::model::ApmRetentionFilterType;
use datadog_api_client::datadogV2::model::RetentionFilterCreateAttributes;
use datadog_api_client::datadogV2::model::RetentionFilterCreateData;
use datadog_api_client::datadogV2::model::RetentionFilterCreateRequest;
use datadog_api_client::datadogV2::model::RetentionFilterType;
use datadog_api_client::datadogV2::model::SpansFilterCreate;

#[tokio::main]
async fn main() {
    let body = RetentionFilterCreateRequest::new(RetentionFilterCreateData::new(
        RetentionFilterCreateAttributes::new(
            true,
            SpansFilterCreate::new("@http.status_code:200 service:my-service".to_string()),
            RetentionFilterType::SPANS_SAMPLING_PROCESSOR,
            "my retention filter".to_string(),
            1.0,
        ),
        ApmRetentionFilterType::apm_retention_filter,
    ));
    let configuration = datadog::Configuration::new();
    let api = APMRetentionFiltersAPI::with_config(configuration);
    let resp = api.create_apm_retention_filter(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
