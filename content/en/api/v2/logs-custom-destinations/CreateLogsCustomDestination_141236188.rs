// Create an Elasticsearch custom destination returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_logs_custom_destinations::LogsCustomDestinationsAPI;
use datadog_api_client::datadogV2::model::CustomDestinationAttributeTagsRestrictionListType;
use datadog_api_client::datadogV2::model::CustomDestinationCreateRequest;
use datadog_api_client::datadogV2::model::CustomDestinationCreateRequestAttributes;
use datadog_api_client::datadogV2::model::CustomDestinationCreateRequestDefinition;
use datadog_api_client::datadogV2::model::CustomDestinationElasticsearchDestinationAuth;
use datadog_api_client::datadogV2::model::CustomDestinationForwardDestination;
use datadog_api_client::datadogV2::model::CustomDestinationForwardDestinationElasticsearch;
use datadog_api_client::datadogV2::model::CustomDestinationForwardDestinationElasticsearchType;
use datadog_api_client::datadogV2::model::CustomDestinationType;

#[tokio::main]
async fn main() {
    let body = CustomDestinationCreateRequest::new()
        .data(CustomDestinationCreateRequestDefinition::new(
        CustomDestinationCreateRequestAttributes::new(
            CustomDestinationForwardDestination::CustomDestinationForwardDestinationElasticsearch(
                Box::new(
                    CustomDestinationForwardDestinationElasticsearch::new(
                        CustomDestinationElasticsearchDestinationAuth::new(
                            "my-password".to_string(),
                            "my-username".to_string(),
                        ),
                        "https://example.com".to_string(),
                        "nginx-logs".to_string(),
                        CustomDestinationForwardDestinationElasticsearchType::ELASTICSEARCH,
                    )
                    .index_rotation("yyyy-MM-dd".to_string()),
                ),
            ),
            "Nginx logs".to_string(),
        )
        .enabled(false)
        .forward_tags(false)
        .forward_tags_restriction_list(vec!["datacenter".to_string(), "host".to_string()])
        .forward_tags_restriction_list_type(
            CustomDestinationAttributeTagsRestrictionListType::ALLOW_LIST,
        )
        .query("source:nginx".to_string()),
        CustomDestinationType::CUSTOM_DESTINATION,
    ));
    let configuration = datadog::Configuration::new();
    let api = LogsCustomDestinationsAPI::with_config(configuration);
    let resp = api.create_logs_custom_destination(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
