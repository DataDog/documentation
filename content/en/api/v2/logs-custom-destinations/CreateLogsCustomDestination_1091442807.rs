// Create a Custom Header HTTP custom destination returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_logs_custom_destinations::LogsCustomDestinationsAPI;
use datadog_api_client::datadogV2::model::CustomDestinationAttributeTagsRestrictionListType;
use datadog_api_client::datadogV2::model::CustomDestinationCreateRequest;
use datadog_api_client::datadogV2::model::CustomDestinationCreateRequestAttributes;
use datadog_api_client::datadogV2::model::CustomDestinationCreateRequestDefinition;
use datadog_api_client::datadogV2::model::CustomDestinationForwardDestination;
use datadog_api_client::datadogV2::model::CustomDestinationForwardDestinationHttp;
use datadog_api_client::datadogV2::model::CustomDestinationForwardDestinationHttpType;
use datadog_api_client::datadogV2::model::CustomDestinationHttpDestinationAuth;
use datadog_api_client::datadogV2::model::CustomDestinationHttpDestinationAuthCustomHeader;
use datadog_api_client::datadogV2::model::CustomDestinationHttpDestinationAuthCustomHeaderType;
use datadog_api_client::datadogV2::model::CustomDestinationType;

#[tokio::main]
async fn main() {
    let body =
        CustomDestinationCreateRequest
        ::new().data(
            CustomDestinationCreateRequestDefinition::new(
                CustomDestinationCreateRequestAttributes::new(
                    CustomDestinationForwardDestination::CustomDestinationForwardDestinationHttp(
                        Box::new(
                            CustomDestinationForwardDestinationHttp::new(
                                CustomDestinationHttpDestinationAuth::CustomDestinationHttpDestinationAuthCustomHeader(
                                    Box::new(
                                        CustomDestinationHttpDestinationAuthCustomHeader::new(
                                            "MY-AUTHENTICATION-HEADER".to_string(),
                                            "my-secret".to_string(),
                                            CustomDestinationHttpDestinationAuthCustomHeaderType::CUSTOM_HEADER,
                                        ),
                                    ),
                                ),
                                "https://example.com".to_string(),
                                CustomDestinationForwardDestinationHttpType::HTTP,
                            ),
                        ),
                    ),
                    "Nginx logs".to_string(),
                )
                    .enabled(false)
                    .forward_tags(false)
                    .forward_tags_restriction_list(vec!["datacenter".to_string(), "host".to_string()])
                    .forward_tags_restriction_list_type(CustomDestinationAttributeTagsRestrictionListType::ALLOW_LIST)
                    .query("source:nginx".to_string()),
                CustomDestinationType::CUSTOM_DESTINATION,
            ),
        );
    let configuration = datadog::Configuration::new();
    let api = LogsCustomDestinationsAPI::with_config(configuration);
    let resp = api.create_logs_custom_destination(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
