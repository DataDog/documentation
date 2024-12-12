// Send an incident event for DORA Metrics returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_dora_metrics::DORAMetricsAPI;
use datadog_api_client::datadogV2::model::DORAGitInfo;
use datadog_api_client::datadogV2::model::DORAIncidentRequest;
use datadog_api_client::datadogV2::model::DORAIncidentRequestAttributes;
use datadog_api_client::datadogV2::model::DORAIncidentRequestData;

#[tokio::main]
async fn main() {
    let body = DORAIncidentRequest::new(DORAIncidentRequestData::new(
        DORAIncidentRequestAttributes::new(1707842944500000000)
            .finished_at(1707842944600000000)
            .git(DORAGitInfo::new(
                "66adc9350f2cc9b250b69abddab733dd55e1a588".to_string(),
                "https://github.com/organization/example-repository".to_string(),
            ))
            .name("Webserver is down failing all requests".to_string())
            .services(vec!["shopist".to_string()])
            .severity("High".to_string())
            .team("backend".to_string())
            .version("v1.12.07".to_string()),
    ));
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.CreateDORAIncident", true);
    let api = DORAMetricsAPI::with_config(configuration);
    let resp = api.create_dora_incident(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
