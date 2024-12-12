// Create a Slack integration channel returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_slack_integration::SlackIntegrationAPI;
use datadog_api_client::datadogV1::model::SlackIntegrationChannel;
use datadog_api_client::datadogV1::model::SlackIntegrationChannelDisplay;

#[tokio::main]
async fn main() {
    let body = SlackIntegrationChannel::new()
        .display(
            SlackIntegrationChannelDisplay::new()
                .message(true)
                .notified(true)
                .snapshot(true)
                .tags(true),
        )
        .name("#general".to_string());
    let configuration = datadog::Configuration::new();
    let api = SlackIntegrationAPI::with_config(configuration);
    let resp = api
        .create_slack_integration_channel("account_name".to_string(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
