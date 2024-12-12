// Get all notebooks returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_notebooks::ListNotebooksOptionalParams;
use datadog_api_client::datadogV1::api_notebooks::NotebooksAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = NotebooksAPI::with_config(configuration);
    let resp = api
        .list_notebooks(ListNotebooksOptionalParams::default())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
