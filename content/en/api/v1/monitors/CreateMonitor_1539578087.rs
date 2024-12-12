// Create a metric monitor with a custom schedule returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_monitors::MonitorsAPI;
use datadog_api_client::datadogV1::model::Monitor;
use datadog_api_client::datadogV1::model::MonitorOptions;
use datadog_api_client::datadogV1::model::MonitorOptionsCustomSchedule;
use datadog_api_client::datadogV1::model::MonitorOptionsCustomScheduleRecurrence;
use datadog_api_client::datadogV1::model::MonitorOptionsSchedulingOptions;
use datadog_api_client::datadogV1::model::MonitorOptionsSchedulingOptionsEvaluationWindow;
use datadog_api_client::datadogV1::model::MonitorThresholds;
use datadog_api_client::datadogV1::model::MonitorType;

#[tokio::main]
async fn main() {
    let body = Monitor::new(
        "avg(current_1mo):avg:system.load.5{*} > 0.5".to_string(),
        MonitorType::QUERY_ALERT,
    )
    .message("some message Notify: @hipchat-channel".to_string())
    .name("Example-Monitor".to_string())
    .options(
        MonitorOptions::new()
            .include_tags(false)
            .notify_audit(false)
            .scheduling_options(
                MonitorOptionsSchedulingOptions::new()
                    .custom_schedule(MonitorOptionsCustomSchedule::new().recurrences(vec![
                                        MonitorOptionsCustomScheduleRecurrence::new()
                                            .rrule("FREQ=DAILY;INTERVAL=1".to_string())
                                            .start("2024-10-26T09:13:00".to_string())
                                            .timezone("America/Los_Angeles".to_string())
                                    ]))
                    .evaluation_window(
                        MonitorOptionsSchedulingOptionsEvaluationWindow::new()
                            .day_starts("04:00".to_string())
                            .month_starts(1),
                    ),
            )
            .thresholds(MonitorThresholds::new().critical(0.5 as f64)),
    )
    .tags(vec![]);
    let configuration = datadog::Configuration::new();
    let api = MonitorsAPI::with_config(configuration);
    let resp = api.create_monitor(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
