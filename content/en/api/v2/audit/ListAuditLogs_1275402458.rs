// Get a list of Audit Logs events returns "OK" response with pagination
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_audit::AuditAPI;
use datadog_api_client::datadogV2::api_audit::ListAuditLogsOptionalParams;
use futures_util::pin_mut;
use futures_util::stream::StreamExt;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = AuditAPI::with_config(configuration);
    let response =
        api.list_audit_logs_with_pagination(ListAuditLogsOptionalParams::default().page_limit(2));
    pin_mut!(response);
    while let Some(resp) = response.next().await {
        if let Ok(value) = resp {
            println!("{:#?}", value);
        } else {
            println!("{:#?}", resp.unwrap_err());
        }
    }
}
