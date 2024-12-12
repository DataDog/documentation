// Create an incident integration metadata returns "CREATED" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_incidents::IncidentsAPI;
use datadog_api_client::datadogV2::model::IncidentIntegrationMetadataAttributes;
use datadog_api_client::datadogV2::model::IncidentIntegrationMetadataCreateData;
use datadog_api_client::datadogV2::model::IncidentIntegrationMetadataCreateRequest;
use datadog_api_client::datadogV2::model::IncidentIntegrationMetadataMetadata;
use datadog_api_client::datadogV2::model::IncidentIntegrationMetadataType;
use datadog_api_client::datadogV2::model::SlackIntegrationMetadata;
use datadog_api_client::datadogV2::model::SlackIntegrationMetadataChannelItem;

#[tokio::main]
async fn main() {
    // there is a valid "incident" in the system
    let incident_data_id = std::env::var("INCIDENT_DATA_ID").unwrap();
    let body =
        IncidentIntegrationMetadataCreateRequest::new(IncidentIntegrationMetadataCreateData::new(
            IncidentIntegrationMetadataAttributes::new(
                1,
                IncidentIntegrationMetadataMetadata::SlackIntegrationMetadata(Box::new(
                    SlackIntegrationMetadata::new(vec![SlackIntegrationMetadataChannelItem::new(
                        "C0123456789".to_string(),
                        "#new-channel".to_string(),
                        "https://slack.com/app_redirect?channel=C0123456789&team=T01234567"
                            .to_string(),
                    )
                    .team_id("T01234567".to_string())]),
                )),
            )
            .incident_id(incident_data_id.clone()),
            IncidentIntegrationMetadataType::INCIDENT_INTEGRATIONS,
        ));
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.CreateIncidentIntegration", true);
    let api = IncidentsAPI::with_config(configuration);
    let resp = api
        .create_incident_integration(incident_data_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
