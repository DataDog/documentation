// Update indexes order returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_logs_indexes::LogsIndexesAPI;
use datadog_api_client::datadogV1::model::LogsIndexesOrder;

#[tokio::main]
async fn main() {
    let body = LogsIndexesOrder::new(vec![
        "main".to_string(),
        "payments".to_string(),
        "web".to_string(),
    ]);
    let configuration = datadog::Configuration::new();
    let api = LogsIndexesAPI::with_config(configuration);
    let resp = api.update_logs_index_order(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
