// Update a restriction policy returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_restriction_policies::RestrictionPoliciesAPI;
use datadog_api_client::datadogV2::model::RestrictionPolicy;
use datadog_api_client::datadogV2::model::RestrictionPolicyAttributes;
use datadog_api_client::datadogV2::model::RestrictionPolicyBinding;
use datadog_api_client::datadogV2::model::RestrictionPolicyType;
use datadog_api_client::datadogV2::model::RestrictionPolicyUpdateRequest;

#[tokio::main]
async fn main() {
    // there is a valid "user" in the system
    let body = RestrictionPolicyUpdateRequest::new(RestrictionPolicy::new(
        RestrictionPolicyAttributes::new(vec![RestrictionPolicyBinding::new(
            vec!["org:00000000-0000-beef-0000-000000000000".to_string()],
            "editor".to_string(),
        )]),
        "dashboard:test-update".to_string(),
        RestrictionPolicyType::RESTRICTION_POLICY,
    ));
    let configuration = datadog::Configuration::new();
    let api = RestrictionPoliciesAPI::with_config(configuration);
    let resp = api
        .update_restriction_policy("dashboard:test-update".to_string(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
