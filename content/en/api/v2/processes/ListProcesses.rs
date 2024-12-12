// Get all processes returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_processes::ListProcessesOptionalParams;
use datadog_api_client::datadogV2::api_processes::ProcessesAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = ProcessesAPI::with_config(configuration);
    let resp = api
        .list_processes(
            ListProcessesOptionalParams::default()
                .search("process-agent".to_string())
                .tags("testing:true".to_string())
                .page_limit(2),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
