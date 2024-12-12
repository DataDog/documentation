// Schedule a downtime with until occurrences
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_downtimes::DowntimesAPI;
use datadog_api_client::datadogV1::model::Downtime;
use datadog_api_client::datadogV1::model::DowntimeRecurrence;

#[tokio::main]
async fn main() {
    let body = Downtime::new()
        .end(Some(1636632671))
        .message(Some("Example-Downtime".to_string()))
        .monitor_tags(vec!["tag0".to_string()])
        .recurrence(Some(
            DowntimeRecurrence::new()
                .period(1)
                .type_("weeks".to_string())
                .until_occurrences(Some(3))
                .week_days(Some(vec![
                    "Mon".to_string(),
                    "Tue".to_string(),
                    "Wed".to_string(),
                    "Thu".to_string(),
                    "Fri".to_string(),
                ])),
        ))
        .scope(vec!["*".to_string()])
        .start(1636629071)
        .timezone("Etc/UTC".to_string());
    let configuration = datadog::Configuration::new();
    let api = DowntimesAPI::with_config(configuration);
    let resp = api.create_downtime(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
