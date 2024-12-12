// Send pipeline job event returns "Request accepted for processing" response
use chrono::{DateTime, Utc};
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_ci_visibility_pipelines::CIVisibilityPipelinesAPI;
use datadog_api_client::datadogV2::model::CIAppCreatePipelineEventRequest;
use datadog_api_client::datadogV2::model::CIAppCreatePipelineEventRequestAttributes;
use datadog_api_client::datadogV2::model::CIAppCreatePipelineEventRequestAttributesResource;
use datadog_api_client::datadogV2::model::CIAppCreatePipelineEventRequestData;
use datadog_api_client::datadogV2::model::CIAppCreatePipelineEventRequestDataType;
use datadog_api_client::datadogV2::model::CIAppPipelineEventJob;
use datadog_api_client::datadogV2::model::CIAppPipelineEventJobLevel;
use datadog_api_client::datadogV2::model::CIAppPipelineEventJobStatus;

#[tokio::main]
async fn main() {
    let body = CIAppCreatePipelineEventRequest::new().data(
        CIAppCreatePipelineEventRequestData::new()
            .attributes(CIAppCreatePipelineEventRequestAttributes::new(
                CIAppCreatePipelineEventRequestAttributesResource::CIAppPipelineEventJob(Box::new(
                    CIAppPipelineEventJob::new(
                        DateTime::parse_from_rfc3339("2021-11-11T11:10:41+00:00")
                            .expect("Failed to parse datetime")
                            .with_timezone(&Utc),
                        "cf9456de-8b9e-4c27-aa79-27b1e78c1a33".to_string(),
                        CIAppPipelineEventJobLevel::JOB,
                        "Build image".to_string(),
                        "Deploy to AWS".to_string(),
                        "3eacb6f3-ff04-4e10-8a9c-46e6d054024a".to_string(),
                        DateTime::parse_from_rfc3339("2021-11-11T11:09:11+00:00")
                            .expect("Failed to parse datetime")
                            .with_timezone(&Utc),
                        CIAppPipelineEventJobStatus::ERROR,
                        "https://my-ci-provider.example/jobs/my-jobs/run/1".to_string(),
                    ),
                )),
            ))
            .type_(CIAppCreatePipelineEventRequestDataType::CIPIPELINE_RESOURCE_REQUEST),
    );
    let configuration = datadog::Configuration::new();
    let api = CIVisibilityPipelinesAPI::with_config(configuration);
    let resp = api.create_ci_app_pipeline_event(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
