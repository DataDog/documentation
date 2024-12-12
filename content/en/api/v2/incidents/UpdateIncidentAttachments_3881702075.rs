// Create an incident attachment returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_incidents::IncidentsAPI;
use datadog_api_client::datadogV2::api_incidents::UpdateIncidentAttachmentsOptionalParams;
use datadog_api_client::datadogV2::model::IncidentAttachmentLinkAttachmentType;
use datadog_api_client::datadogV2::model::IncidentAttachmentLinkAttributes;
use datadog_api_client::datadogV2::model::IncidentAttachmentLinkAttributesAttachmentObject;
use datadog_api_client::datadogV2::model::IncidentAttachmentType;
use datadog_api_client::datadogV2::model::IncidentAttachmentUpdateAttributes;
use datadog_api_client::datadogV2::model::IncidentAttachmentUpdateData;
use datadog_api_client::datadogV2::model::IncidentAttachmentUpdateRequest;

#[tokio::main]
async fn main() {
    // there is a valid "incident" in the system
    let incident_data_id = std::env::var("INCIDENT_DATA_ID").unwrap();
    let body = IncidentAttachmentUpdateRequest::new(vec![IncidentAttachmentUpdateData::new(
        IncidentAttachmentType::INCIDENT_ATTACHMENTS,
    )
    .attributes(
        IncidentAttachmentUpdateAttributes::IncidentAttachmentLinkAttributes(Box::new(
            IncidentAttachmentLinkAttributes::new(
                IncidentAttachmentLinkAttributesAttachmentObject::new(
                    "https://www.example.com/doc".to_string(),
                    "Example-Incident".to_string(),
                ),
                IncidentAttachmentLinkAttachmentType::LINK,
            ),
        )),
    )]);
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.UpdateIncidentAttachments", true);
    let api = IncidentsAPI::with_config(configuration);
    let resp = api
        .update_incident_attachments(
            incident_data_id.clone(),
            body,
            UpdateIncidentAttachmentsOptionalParams::default(),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
