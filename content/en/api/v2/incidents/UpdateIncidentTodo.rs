// Update an incident todo returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_incidents::IncidentsAPI;
use datadog_api_client::datadogV2::model::IncidentTodoAssignee;
use datadog_api_client::datadogV2::model::IncidentTodoAttributes;
use datadog_api_client::datadogV2::model::IncidentTodoPatchData;
use datadog_api_client::datadogV2::model::IncidentTodoPatchRequest;
use datadog_api_client::datadogV2::model::IncidentTodoType;

#[tokio::main]
async fn main() {
    // there is a valid "incident" in the system
    let incident_data_id = std::env::var("INCIDENT_DATA_ID").unwrap();

    // the "incident" has an "incident_todo"
    let incident_todo_data_id = std::env::var("INCIDENT_TODO_DATA_ID").unwrap();
    let body = IncidentTodoPatchRequest::new(IncidentTodoPatchData::new(
        IncidentTodoAttributes::new(
            vec![IncidentTodoAssignee::IncidentTodoAssigneeHandle(
                "@test.user@test.com".to_string(),
            )],
            "Restore lost data.".to_string(),
        )
        .completed(Some("2023-03-06T22:00:00.000000+00:00".to_string()))
        .due_date(Some("2023-07-10T05:00:00.000000+00:00".to_string())),
        IncidentTodoType::INCIDENT_TODOS,
    ));
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.UpdateIncidentTodo", true);
    let api = IncidentsAPI::with_config(configuration);
    let resp = api
        .update_incident_todo(
            incident_data_id.clone(),
            incident_todo_data_id.clone(),
            body,
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
