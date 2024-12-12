// Create a tag configuration returns "Created" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_metrics::MetricsAPI;
use datadog_api_client::datadogV2::model::MetricTagConfigurationCreateAttributes;
use datadog_api_client::datadogV2::model::MetricTagConfigurationCreateData;
use datadog_api_client::datadogV2::model::MetricTagConfigurationCreateRequest;
use datadog_api_client::datadogV2::model::MetricTagConfigurationMetricTypes;
use datadog_api_client::datadogV2::model::MetricTagConfigurationType;

#[tokio::main]
async fn main() {
    let body = MetricTagConfigurationCreateRequest::new(
        MetricTagConfigurationCreateData::new(
            "ExampleMetric".to_string(),
            MetricTagConfigurationType::MANAGE_TAGS,
        )
        .attributes(MetricTagConfigurationCreateAttributes::new(
            MetricTagConfigurationMetricTypes::GAUGE,
            vec!["app".to_string(), "datacenter".to_string()],
        )),
    );
    let configuration = datadog::Configuration::new();
    let api = MetricsAPI::with_config(configuration);
    let resp = api
        .create_tag_configuration("ExampleMetric".to_string(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
