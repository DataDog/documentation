// Add tags to a host returns "Created" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_tags::CreateHostTagsOptionalParams;
use datadog_api_client::datadogV1::api_tags::TagsAPI;
use datadog_api_client::datadogV1::model::HostTags;

#[tokio::main]
async fn main() {
    let body = HostTags::new()
        .host("test.host".to_string())
        .tags(vec!["environment:production".to_string()]);
    let configuration = datadog::Configuration::new();
    let api = TagsAPI::with_config(configuration);
    let resp = api
        .create_host_tags(
            "host_name".to_string(),
            body,
            CreateHostTagsOptionalParams::default(),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
