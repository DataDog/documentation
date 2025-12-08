---
title: API Security Inventory
further_reading:
- link: "https://www.datadoghq.com/blog/primary-risks-to-api-security/"
  tag: "Blog"
  text: "Mitigate the primary risks to API security"
---

API security relies on visibility. The biggest failure mode in most applications isn't missed vulnerabilities, it's missed APIs.

[API Security Inventory][7] provides a comprehensive, up-to-date catalog and risk assessment of all API endpoints and services in your environment.

**Inventory** is comprised of explorers that correspond to distinct layers in the API security lifecycle:

1. **API Endpoints:** *What APIs exist, and what risk do they expose?*
    
    Each API endpoint is a unique entry point where data or functionality can be accessed. The API Endpoints explorer enables shadow API detection, asset management, and risk prioritization at the granularity attackers exploit.
2. **Services:** *Where do risky APIs live, who owns them, and how severe is their collective risk?*
    
    A service groups multiple endpoints into a logical or deployed component (typically aligned with a microservice, app, or backend system).
3. **API Findings:** *Which API weaknesses, attacks or misconfigurations require investigation or remediation?*
    
    API Findings are security detections and policy evaluation results tied to endpoints or services. These represent known or inferred weaknesses or threats in API behavior or configuration.

These explorers correspond to the common API security operational flow: 

1. **Discover:** Identify what endpoints exist using **API Endpoints**.
2. **Contextualize:** Identify ownership and dependencies using **Services**.
3. **Detect and respond:** See where attacks or misconfigurations are occurring using **API Findings**.

## API Endpoints

API Endpoints monitors your API traffic to provide visibility into the security posture of your APIs, including:

- **Authentication**: Whether the API enforces authentication.
- **Authentication Method**: Type of authentication used, such as Basic Auth and API key.
- **Public Exposure**: Whether the API is processing traffic from the internet.
- **Sensitive data flows**: Sensitive data handled by the API and flows between APIs.
- **Attack Exposure**: If the endpoint is targeted by attacks.
- **Business Logic**: Business logic and associated business logic suggestions for this API.
- **Vulnerabilities**: If the endpoint contains a vulnerability (powered by [Code Security][8] and [Software Composition Analysis][3]).
- **Findings**: Security findings identified on this API.
- **Dependencies**: APIs and Databases the API depends on.

Using API Endpoints you can:

- See at a glance which endpoints process sensitive data, are authenticated, have vulnerabilities or findings, or are publicly available.
- See which endpoints are at risk, and pivot directly into the [Threat Monitoring and Protection][2] service for further investigation or response.
- See which endpoints are associated to your business's logic, and find business logic suggestions based on your endpoint's traffic history.

### Configuration

To view the API Endpoints on your services, **you must have App and API Protection Threats Protection enabled**. 

For Amazon Web Services (AWS) API Gateway integration, you must set up the following

- [Amazon Web Services][9]
- [Amazon API Gateway Integration][10]

For information on what library versions are compatible with API Security Inventory, see [Enabling App and API Protection][11]. [Remote Configuration][1] is required.

|Technology|Minimum tracer version| Support for sensitive data scanning |
|----------|----------|----------|
|Python    | v2.1.6   | Requests and responses |
|Java      | v1.31.0  | Requests only |
|PHP      | v0.98.0  | Requests and responses |
|.NET Core | v2.42.0  | Requests and responses |
|.NET Fx   | v2.47.0  | Requests and responses |
|Ruby      | v1.15.0  | Requests only |
|Golang    | v1.59.0  | Requests only |
|Node.js   | v3.51.0, v4.30.0 or v5.6.0 | Requests and responses |

**Note**: On .NET Core and .NET Fx tracers, you need to set the environment variable `DD_API_SECURITY_ENABLED=true` for API Security features to work properly.

### How it works

API Endpoints leverages the Datadog tracing library with App and API Protection enabled, alongside configurations from AWS API Gateway and uploaded API Definitions, to gather security metadata about API traffic. This rich data includes the discovered API schema, the types of sensitive data (PII) processed, and the authentication scheme in use. The API information is continuously evaluated, ensuring a comprehensive and up-to-date view of your entire API attack surface.

API Endpoints uses [Remote Configuration][1] to manage and configure scanning rules that detect sensitive data and authentication.

The following risks are calculated for each endpoint:

### Data sources

In the **API Endpoints** explorer, the **Data Sources** show where visibility originates.

The following data sources are explored.

#### Amazon API Gateway

One you have used the Amazon API Gateway service to formally define your API structure,
Datadog's AWS integration reads this pre-defined configuration from the Amazon API Gateway Datadog uses this configuration to create API endpoint entries in the Inventory.

The **AWS API Gateway** data source provide visibility into these exposed endpoints.

#### API Definition

API Endpoints with the **API Definition** data source are the set of endpoints that Datadog learned about by reading a formal specification uploaded to Datadog. The API specification is attached to or registered as a dedicated API component within the IDP service entity.

This source ensures that your API inventory is complete by including all planned and formally documented endpoints.

#### Spans

The Spans data source shows real traffic and data exposure. Remediation should be performed in code, config, or access controls immediately.

What actions you take depend on each of the attack surfaces:

- **Vulnerabilities:** Patch any vulnerable libraries surfaced by SCA or Runtime Code Analysis, then redeploy the service.
- **API findings discovered:** Review each issue in context of the traced service, fix any code or configurations, and then validate using new traces.
- **Processing sensitive data:** Confirm data handling complies with policy, sanitize or encrypt PII and limit access to necessary services.
- **Unauthenticated endpoint:** If the endpoint is not intentionally public, enforce authentication and update service configurations.

### Processing sensitive data

[App and API Protection][2] matches known patterns for sensitive data in API request and responses. If it finds a match, the endpoint is tagged with the type of sensitive data processed.

The matching occurs within your application, and none of the sensitive data is sent to Datadog.

#### Supported data types

To see the supported data types, use the **Personal Information (PII)** facet. You can also see the data type used in the **Sensitive Data** column.

### Business logic

These tags `(users.login.success`, `users.login.failure`, etc.) are determined by the presence of business logic traces associated with the endpoint.

<div class="alert alert-tip">Datadog can suggest a business logic tag for your endpoint based on its HTTP method, response status codes, and URL.</div>

### Publicly accessible

Datadog marks an endpoint as public if the client IP address is outside these ranges:

- 10.0.0.0/8
- 172.16.0.0/12
- 192.168.0.0/16
- 169.254.1.0/16

See [Configuring a client IP header][6] for more information on the required library configuration.

### Endpoint authentication

Authentication is determined by:

- The presence of `Authorization`, `Token` or `X-Api-Key` headers.
- The presence of a user ID within the trace (for example, the `@usr.id` APM attribute).
- The request has responded with a 401 or 403 status code.

Datadog reports the type of authentication when available in a header through the Authentication Method facet.

#### Supported authentication methods

| Category                                          | Category facet   |
|---------------------------------------------------|------------------|
| JSON Web Token (JWT)                              | `json_web_token` |
| Bearer tokens (found in `Authorization` headers)  | `bearer_token`   |
| Basic Authentication                              | `basic_auth`     |
| Digest access authentication                      | `digest_auth`    |


## Services

The **Services** explorer shows where findings from API Endpoints, vulnerabilities, and runtime signals converge by service. Consider it the operational risk view of your applications.

Review your services for the following:

- **Vulnerability risk:** The **Vulnerability Risk** column shows aggregated SCA and IAST results for each service. Vulnerable services have components needing patching or upgrading.
- **Signals and attacks:** Click a service to see charts showing ongoing detections for active exploit attempts or recurring attack patterns.
- **Sensitive data exposure:** Services processing PII (like SSNs or emails) demand stricter controls and monitoring.
- **Coverage and mode:** Use the **App & API Protection In Monitoring Mode**, **App & API Protection In Blocking Mode**, and the **Inactive** facet to identify where App and API Protection is enabled and enforcing runtime protection.
- **Trend graphs:** The **Trend** column indicates activity and attack frequency over time.

### Coverage

The **Coverage** column shows which protection and analysis capabilities are active for each service. Use the column to measure the completeness of your protection stack.

For example, here are some use cases for **Coverage**:

- **Runtime protection coverage with App and API Protection**: 
  - Identify which services are in **Monitoring** or **Blocking** mode.
  - Move ready-to-block services into blocking mode to actively stop attacks.
  - Investigate inactive services to see if instrumentation or configuration gaps are leaving APIs exposed.
- **Software Composition Analysis (SCA) coverage**:
  - Track which services have their open source dependencies analyzed.
  - Enable SCA for unscanned services to detect vulnerable libraries early.
  - Prioritize patching in active services with high dependency risk.
- **Runtime Code Analysis (IAST) coverage**:
  - Pinpoint where code-level vulnerability detection is missing.
  - Enable IAST for production or high-risk apps to uncover exploitable issues in live traffic.
  - Use results to confirm whether library vulnerabilities are actually reachable in code.

## API Findings

**API Findings** provides a central triage view of all detected API risks across definitions, gateways, and live traffic.

**API Findings** columns:

- **Severity:** Each issue is ranked by risk.
- **Endpoints:** Shows how many endpoints are affected and their services.
- **Status and Ticketing:** `Open` or `In Progress` tracks remediation progress and workflow integration.

Use the **Service** facet see each service's endpoints to identify ownership and prioritize by business impact.

### Common operations

Click a finding to view its details and perform a workflow such as Validate > Investigate > Fix > Track:

1. Validate:
   - Review **What Happened** and **Detected In** to ensure the detection is accurate (service, endpoint, method).
   - In **Next Steps**, choose whether to **Mute**, **Create Ticket**, or **Run Workflow** depending on ownership and impact.
2. Investigate:
   - Use the **Context** tab to examine the endpoint snapshot and attributes (method, path, authentication flags, tags).
   - **Dectected In** provides information for routing ownership and remediation.
   - In **Detection Rule Query**, if runtime data (from spans/traces) contributed to the finding, you can view those traces by clicking **See Detection Rule**.
3. Fix: 
   - Follow the guidance under **Remediation**.
4. Track:
   - Use **Create Ticket** to link the issue to your tracking system.
   - Use **Reference Links** for developer education or code review.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/remote_config/
[2]: /security/application_security/
[3]: /security/code_security/software_composition_analysis/
[6]: /security/application_security/policies/library_configuration/#configuring-a-client-ip-header
[7]: https://app.datadoghq.com/security/appsec/inventory/apis
[8]: /security/code_security/iast/
[9]: /integrations/amazon-web-services
[10]: /integrations/amazon-api-gateway
[11]: /security/application_security/setup/