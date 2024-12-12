// Schedule a downtime returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_downtimes::DowntimesAPI;
use datadog_api_client::datadogV2::model::DowntimeCreateRequest;
use datadog_api_client::datadogV2::model::DowntimeCreateRequestAttributes;
use datadog_api_client::datadogV2::model::DowntimeCreateRequestData;
use datadog_api_client::datadogV2::model::DowntimeMonitorIdentifier;
use datadog_api_client::datadogV2::model::DowntimeMonitorIdentifierTags;
use datadog_api_client::datadogV2::model::DowntimeResourceType;
use datadog_api_client::datadogV2::model::DowntimeScheduleCreateRequest;
use datadog_api_client::datadogV2::model::DowntimeScheduleOneTimeCreateUpdateRequest;

#[tokio::main]
async fn main() {
    let body = DowntimeCreateRequest::new(DowntimeCreateRequestData::new(
        DowntimeCreateRequestAttributes::new(
            DowntimeMonitorIdentifier::DowntimeMonitorIdentifierTags(Box::new(
                DowntimeMonitorIdentifierTags::new(vec!["cat:hat".to_string()]),
            )),
            "test:exampledowntime".to_string(),
        )
        .message(Some("dark forest".to_string()))
        .schedule(
            DowntimeScheduleCreateRequest::DowntimeScheduleOneTimeCreateUpdateRequest(Box::new(
                DowntimeScheduleOneTimeCreateUpdateRequest::new().start(None),
            )),
        ),
        DowntimeResourceType::DOWNTIME,
    ));
    let configuration = datadog::Configuration::new();
    let api = DowntimesAPI::with_config(configuration);
    let resp = api.create_downtime(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
