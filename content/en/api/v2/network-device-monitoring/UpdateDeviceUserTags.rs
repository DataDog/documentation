// Update the tags for a device returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_network_device_monitoring::NetworkDeviceMonitoringAPI;
use datadog_api_client::datadogV2::model::ListTagsResponse;
use datadog_api_client::datadogV2::model::ListTagsResponseData;
use datadog_api_client::datadogV2::model::ListTagsResponseDataAttributes;

#[tokio::main]
async fn main() {
    let body = ListTagsResponse::new().data(
        ListTagsResponseData::new()
            .attributes(
                ListTagsResponseDataAttributes::new()
                    .tags(vec!["tag:test".to_string(), "tag:testbis".to_string()]),
            )
            .id("default_device".to_string())
            .type_("tags".to_string()),
    );
    let configuration = datadog::Configuration::new();
    let api = NetworkDeviceMonitoringAPI::with_config(configuration);
    let resp = api
        .update_device_user_tags("default_device".to_string(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
