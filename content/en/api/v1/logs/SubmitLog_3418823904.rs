// Send deflate logs returns "Response from server (always 200 empty JSON)."
// response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_logs::LogsAPI;
use datadog_api_client::datadogV1::api_logs::SubmitLogOptionalParams;
use datadog_api_client::datadogV1::model::ContentEncoding;
use datadog_api_client::datadogV1::model::HTTPLogItem;
use std::collections::BTreeMap;

#[tokio::main]
async fn main() {
    let body = vec![HTTPLogItem::new("Example-Log".to_string())
        .ddtags("host:ExampleLog".to_string())
        .additional_properties(BTreeMap::from([]))];
    let configuration = datadog::Configuration::new();
    let api = LogsAPI::with_config(configuration);
    let resp = api
        .submit_log(
            body,
            SubmitLogOptionalParams::default().content_encoding(ContentEncoding::DEFLATE),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
