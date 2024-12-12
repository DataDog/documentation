// Update a custom destination returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_logs_custom_destinations::LogsCustomDestinationsAPI;
use datadog_api_client::datadogV2::model::CustomDestinationAttributeTagsRestrictionListType;
use datadog_api_client::datadogV2::model::CustomDestinationType;
use datadog_api_client::datadogV2::model::CustomDestinationUpdateRequest;
use datadog_api_client::datadogV2::model::CustomDestinationUpdateRequestAttributes;
use datadog_api_client::datadogV2::model::CustomDestinationUpdateRequestDefinition;

#[tokio::main]
async fn main() {
    // there is a valid "custom_destination" in the system
    let custom_destination_data_id = std::env::var("CUSTOM_DESTINATION_DATA_ID").unwrap();
    let body = CustomDestinationUpdateRequest::new().data(
        CustomDestinationUpdateRequestDefinition::new(
            custom_destination_data_id.clone(),
            CustomDestinationType::CUSTOM_DESTINATION,
        )
        .attributes(
            CustomDestinationUpdateRequestAttributes::new()
                .enabled(false)
                .forward_tags(false)
                .forward_tags_restriction_list_type(
                    CustomDestinationAttributeTagsRestrictionListType::BLOCK_LIST,
                )
                .name("Nginx logs (Updated)".to_string())
                .query("source:nginx".to_string()),
        ),
    );
    let configuration = datadog::Configuration::new();
    let api = LogsCustomDestinationsAPI::with_config(configuration);
    let resp = api
        .update_logs_custom_destination(custom_destination_data_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
