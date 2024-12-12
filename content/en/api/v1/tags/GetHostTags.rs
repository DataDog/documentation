// Get host tags returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_tags::GetHostTagsOptionalParams;
use datadog_api_client::datadogV1::api_tags::TagsAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = TagsAPI::with_config(configuration);
    let resp = api
        .get_host_tags(
            "host_name".to_string(),
            GetHostTagsOptionalParams::default(),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
