// Get all notebooks returns "OK" response with pagination
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_notebooks::ListNotebooksOptionalParams;
use datadog_api_client::datadogV1::api_notebooks::NotebooksAPI;
use futures_util::pin_mut;
use futures_util::stream::StreamExt;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = NotebooksAPI::with_config(configuration);
    let response =
        api.list_notebooks_with_pagination(ListNotebooksOptionalParams::default().count(2));
    pin_mut!(response);
    while let Some(resp) = response.next().await {
        if let Ok(value) = resp {
            println!("{:#?}", value);
        } else {
            println!("{:#?}", resp.unwrap_err());
        }
    }
}
