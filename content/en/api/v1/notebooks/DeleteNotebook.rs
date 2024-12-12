// Delete a notebook returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_notebooks::NotebooksAPI;

#[tokio::main]
async fn main() {
    // there is a valid "notebook" in the system
    let notebook_data_id: i64 = std::env::var("NOTEBOOK_DATA_ID").unwrap().parse().unwrap();
    let configuration = datadog::Configuration::new();
    let api = NotebooksAPI::with_config(configuration);
    let resp = api.delete_notebook(notebook_data_id.clone()).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
