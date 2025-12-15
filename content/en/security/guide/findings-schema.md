---
title: Security Findings Schema Reference
description: "Complete reference for the Security Findings schema, including all attributes, namespaces, and data model for querying vulnerabilities, misconfigurations, and security risks."
further_reading:
- link: "/security/cloud_security_management/"
  tag: "Documentation"
  text: "Cloud Security Management"
- link: "/security/code_security/"
  tag: "Documentation"
  text: "Code Security"
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Application Security"
---

## Overview

Security findings in Datadog represent vulnerabilities, misconfigurations, and security risks identified across your infrastructure and applications. Each finding contains structured data organized into namespaces that describe the nature, impact, status, and context of the security issue.

All findings share a common schema that enables unified querying and analysis across different security products.

## Core attributes

These attributes are present on all security findings and describe the fundamental nature and status of the finding.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>severity</code></td>
      <td>string</td>
      <td>Indicates the datadog adjusted severity level of the finding. Valid values: critical, high, medium, low, info, none, unknown.</td>
    </tr>
    <tr>
      <td><code>base_severity</code></td>
      <td>string</td>
      <td>Indicates the base severity level of the finding. Valid values: critical, high, medium, low, info, none, unknown.</td>
    </tr>
    <tr>
      <td><code>status</code></td>
      <td>string</td>
      <td>Indicates the workflow status of the finding. Possible values: open, muted, auto_closed.</td>
    </tr>
    <tr>
      <td><code>finding_type</code></td>
      <td>string</td>
      <td>Defines the category of the finding. Possible values: api_security, attack_path, runtime_code_vulnerability, static_code_vulnerability, host_and_container_vulnerability, iac_misconfiguration, identity_risk, library_vulnerability, misconfiguration, secret, workload_activity.</td>
    </tr>
    <tr>
      <td><code>finding_id</code></td>
      <td>string</td>
      <td>Unique identifier of the finding.</td>
    </tr>
    <tr>
      <td><code>title</code></td>
      <td>string</td>
      <td>Human-readable title for the finding.</td>
    </tr>
    <tr>
      <td><code>description</code></td>
      <td>string</td>
      <td>Provides a human-readable explanation of the finding. May include Markdown formatting.</td>
    </tr>
    <tr>
      <td><code>resource_id</code></td>
      <td>string</td>
      <td>The unique identifier of the resource affected by the finding.</td>
    </tr>
    <tr>
      <td><code>resource_name</code></td>
      <td>string</td>
      <td>Human-readable name of the resource affected by the finding.</td>
    </tr>
    <tr>
      <td><code>resource_type</code></td>
      <td>string</td>
      <td>Specifies the type of the resource.</td>
    </tr>
    <tr>
      <td><code>first_seen_at</code></td>
      <td>integer</td>
      <td>Timestamp (UTC) of the first time the finding was detected.</td>
    </tr>
    <tr>
      <td><code>last_seen_at</code></td>
      <td>integer</td>
      <td>Timestamp (UTC) of the most recent detection of the finding.</td>
    </tr>
    <tr>
      <td><code>detection_changed_at</code></td>
      <td>integer</td>
      <td>Timestamp (UTC) of the last time the finding's evaluation or detection state changed.</td>
    </tr>
    <tr>
      <td><code>origin</code></td>
      <td>array (string)</td>
      <td>Lists the detection origin that produced the finding, such as agentless scans, APM, SCI, or CI.</td>
    </tr>
    <tr>
      <td><code>exposure_time_seconds</code></td>
      <td>integer</td>
      <td>Indicates the time elapsed, in seconds, between when the finding was last closed and when it was first seen again.</td>
    </tr>
    <tr>
      <td><code>is_in_security_inbox</code></td>
      <td>boolean</td>
      <td>True if the finding appears in the Security Inbox; false otherwise.</td>
    </tr>
    <tr>
      <td><code>detection_tool</code></td>
      <td>object</td>
      <td>Indicates the tool responsible for detecting the security finding</td>
    </tr>
  </tbody>
</table>

## Workflow

The workflow namespace contains all mutable information related to the management of a finding, after it was detected. These should only be fields that can be updated manually by users through the UI, or automatically through the Automation Pipeline. "the finding is muted (with a reason) assignment to a JIRA ticket"

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>triage</code></td>
      <td>object</td>
      <td>The triage section contains assignment and status information. Assignement is potentially synchronized with case/Jira information when present</td>
    </tr>
    <tr>
      <td><code>auto_closed_at</code></td>
      <td>integer</td>
      <td>Timestamp in milliseconds (UTC) when the finding was automatically closed by the system.</td>
    </tr>
    <tr>
      <td><code>due_date</code></td>
      <td>object</td>
      <td>Describes the due date rule applied to this finding.</td>
    </tr>
    <tr>
      <td><code>mute</code></td>
      <td>object</td>
      <td>Contains muting information and metadata</td>
    </tr>
    <tr>
      <td><code>automations</code></td>
      <td>array (object)</td>
      <td>Contains data of automation rules applying on the finding.</td>
    </tr>
    <tr>
      <td><code>integrations</code></td>
      <td>object</td>
      <td>Base information for integrations like Jira, Case management and/or ServiceNow, used to triage the finding. Relates to how the finding is managed by customers, in order to track and remediate. https://datadoghq.atlassian.net/wiki/spaces/SharedXP/pages/4765483198/Data+model+for+case+management+integration+in+findings</td>
    </tr>
  </tbody>
</table>

### Triage

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>assignee</code></td>
      <td>object</td>
      <td>Contains the user assigned to this finding.</td>
    </tr>
    <tr>
      <td><code>time_to_acknowledge_seconds</code></td>
      <td>integer</td>
      <td>Time, in seconds, between when the finding was first detected and the first manual triage action (such as creating a ticket, assigning an owner, or muting the finding).</td>
    </tr>
    <tr>
      <td><code>time_to_resolution_seconds</code></td>
      <td>integer</td>
      <td>Time, in seconds, between when the finding was first detected and when it was resolved (confirmed as fixed or muted) for findings that were previously triaged only, or muted</td>
    </tr>
  </tbody>
</table>

#### Assignee

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td>Display name of the assigned user.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td>Unique identifier for the assigned user in UUID format.</td>
    </tr>
    <tr>
      <td><code>updated_at</code></td>
      <td>integer</td>
      <td>Timestamp in milliseconds (UTC) when the assignee was last modified.</td>
    </tr>
    <tr>
      <td><code>updated_by</code></td>
      <td>object</td>
      <td>Contains the user who last modified the assignee.</td>
    </tr>
  </tbody>
</table>

##### Updated By

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td>Unique identifier in UUID format of the user who created the pull request.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td>Display name of the user who created the pull request.</td>
    </tr>
  </tbody>
</table>

### Due Date

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>due_at</code></td>
      <td>integer</td>
      <td>Timestamp in milliseconds (UTC) when the finding must be resolved.</td>
    </tr>
    <tr>
      <td><code>is_overdue</code></td>
      <td>boolean</td>
      <td>True if the due date was reached, false otherwise.</td>
    </tr>
    <tr>
      <td><code>rule_id</code></td>
      <td>string</td>
      <td>Unique identifier for the due date rule applied to this finding.</td>
    </tr>
  </tbody>
</table>

### Mute

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>is_muted</code></td>
      <td>boolean</td>
      <td>Indicates whether the finding is currently muted. True means the finding is muted, false means it is active.</td>
    </tr>
    <tr>
      <td><code>reason</code></td>
      <td>string</td>
      <td>Reason provided for muting the finding. Possible values: none, no pending fix, human error, no longer accepted risk, other, pending fix, false positive, accepted risk, no fix, duplicate, risk accepted</td>
    </tr>
    <tr>
      <td><code>description</code></td>
      <td>string</td>
      <td>Free-text explanation for why the finding was muted.</td>
    </tr>
    <tr>
      <td><code>expire_at</code></td>
      <td>integer</td>
      <td>Timestamp in milliseconds (UTC) when the mute expires. If not set, the mute is permanent.</td>
    </tr>
    <tr>
      <td><code>is_muted_by_rule</code></td>
      <td>boolean</td>
      <td>Indicate if the finding is muted by an automation rule. If true, the relevant automation rule is referenced in the workflow.automation section.</td>
    </tr>
    <tr>
      <td><code>rule_id</code></td>
      <td>string</td>
      <td>Unique identifier for the automation rule that muted this finding. Only set when is_muted_by_rule is true.</td>
    </tr>
    <tr>
      <td><code>rule_name</code></td>
      <td>string</td>
      <td>Human-readable name of the automation rule that muted this finding. Only set when is_muted_by_rule is true.</td>
    </tr>
    <tr>
      <td><code>muted_at</code></td>
      <td>integer</td>
      <td>Timestamp in milliseconds (UTC) when the finding was muted.</td>
    </tr>
    <tr>
      <td><code>muted_by</code></td>
      <td>object</td>
      <td>User who muted the finding.</td>
    </tr>
  </tbody>
</table>

#### Muted By

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td>Unique identifier in UUID format of the user who created the pull request.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td>Display name of the user who created the pull request.</td>
    </tr>
  </tbody>
</table>

### Integrations

Base information for integrations like Jira, Case management and/or ServiceNow, used to triage the finding. Relates to how the finding is managed by customers, in order to track and remediate. https://datadoghq.atlassian.net/wiki/spaces/SharedXP/pages/4765483198/Data+model+for+case+management+integration+in+findings

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>cases</code></td>
      <td>array (object)</td>
      <td>Contains an array of cases attached to the finding.</td>
    </tr>
    <tr>
      <td><code>jira</code></td>
      <td>array (string)</td>
      <td>List of Jira issue keys attached to this finding in the format PROJECT-NUMBER (e.g., ["PROJ-123", "PROJ-456"]).</td>
    </tr>
    <tr>
      <td><code>pull_requests</code></td>
      <td>array (object)</td>
      <td>List of pull requests used to remediate this finding. Each entry contains metadata about a pull request in a source control system.</td>
    </tr>
  </tbody>
</table>

## Risk

Risk attributes assess the potential impact and exposure of a finding.

### Risk

Groups risk-related attributes for the finding. Each key must have a matching key in the risk_details namespace.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>has_sensitive_data</code></td>
      <td>boolean</td>
      <td>True is the finding has access to a resource that contains sensitive data (e.g. an S3 bucket). The field can be missing when this information is unknown.</td>
    </tr>
    <tr>
      <td><code>is_function_reachable</code></td>
      <td>boolean</td>
      <td>True if the vulnerable function may be executed.</td>
    </tr>
    <tr>
      <td><code>is_exposed_to_attacks</code></td>
      <td>boolean</td>
      <td>True if attacks have already been detected on this resource. Those attacks may be unrelated to the finding but indicates a higher likelyhood of facing threats.</td>
    </tr>
    <tr>
      <td><code>has_privileged_access</code></td>
      <td>boolean</td>
      <td>True if the finding's resource is running with elevated privileges (e.g. administrator) or has the ability to assume a privileged role.</td>
    </tr>
    <tr>
      <td><code>is_production</code></td>
      <td>boolean</td>
      <td>True if the finding's resource is running in production. This is detected through the `env` tag. https://docs.datadoghq.com/getting_started/tagging/</td>
    </tr>
    <tr>
      <td><code>is_publicly_accessible</code></td>
      <td>boolean</td>
      <td>True if the finding's resource is publicly accessible. For instance a host with a public IP and open ports, or a publicly accessible S3 bucket.</td>
    </tr>
    <tr>
      <td><code>has_exploit_available</code></td>
      <td>boolean</td>
      <td>True if known exploits exist for this finding.</td>
    </tr>
    <tr>
      <td><code>has_high_exploitability_chance</code></td>
      <td>boolean</td>
      <td>True if the vulnerability is likely to be exploited. This is set if the FIRST EPSS score (Exploit Prediction Scoring System) is above 1%.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_request_url</code></td>
      <td>boolean</td>
      <td>True if the final URL contains tainted parts originating from the request URL, which may lower the risk due to typical framework validation (e.g. Java Spring).</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_query_string</code></td>
      <td>boolean</td>
      <td>True if the problematic string contains elements derived from an HTTP query string.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_database</code></td>
      <td>boolean</td>
      <td>True if the string is tainted due to originating from an untrusted database source.</td>
    </tr>
    <tr>
      <td><code>is_using_sha1</code></td>
      <td>boolean</td>
      <td>True if SHA1 is used in a weak hash, which reduces the risk score due to its security being stronger than algorithms like MD5.</td>
    </tr>
  </tbody>
</table>

### Risk Details

Groups contextual risk factors that help assess the potential impact of a finding. These fields describe characteristics like exposure, sensitivity, and signs of active exploitation. All findings should have their risk reported here. if a risk is not significant enough to impact the score, it may be placed somewhere else. The name of each key must explicitely show the boolean nature of the risk (typically prefixed with is_ or has_). Though, a risk might be undefined (for instance, we can't tell fi a service is under attack if the users don't have APM nor AAP). Each item of risk_details must be accompanied by a top level boolean risk item enabling to easily search for a specific risk.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>has_sensitive_data</code></td>
      <td>object</td>
      <td>Groups evidence and indicators about whether the affected resource has sensitive data.</td>
    </tr>
    <tr>
      <td><code>is_function_reachable</code></td>
      <td>object</td>
      <td>Groups evidence and indicators about whether the vulnerable function or module is used in the code.</td>
    </tr>
    <tr>
      <td><code>is_exposed_to_attacks</code></td>
      <td>object</td>
      <td>Is the service where the finding was detected exposed to attacks?</td>
    </tr>
    <tr>
      <td><code>has_privileged_access</code></td>
      <td>object</td>
      <td>Object describing further detail about custom.risk.has_privileged_access</td>
    </tr>
    <tr>
      <td><code>is_production</code></td>
      <td>object</td>
      <td>Groups evidence and indicators about whether the resource associated with the finding is running in a production environment.</td>
    </tr>
    <tr>
      <td><code>is_publicly_accessible</code></td>
      <td>object</td>
      <td>Groups information about whether the affected resource is accessible from the public internet.</td>
    </tr>
    <tr>
      <td><code>has_exploit_available</code></td>
      <td>object</td>
      <td>Groups information about whether a known exploit exists for this finding advisory.</td>
    </tr>
    <tr>
      <td><code>has_high_exploitability_chance</code></td>
      <td>object</td>
      <td>Is the vulnerability likely to be exploited. Derived from EPSS</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_request_url</code></td>
      <td>object</td>
      <td>Groups information about whether the tainted parts originating from the request URL.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_query_string</code></td>
      <td>object</td>
      <td>Groups information about whether the tainted parts originating from a query string.</td>
    </tr>
    <tr>
      <td><code>is_tainted_from_database</code></td>
      <td>object</td>
      <td>Groups information about whether the tainted parts originating from a database.</td>
    </tr>
    <tr>
      <td><code>is_using_sha1</code></td>
      <td>object</td>
      <td>Groups information about whether SHA1 is used in a weak hash.</td>
    </tr>
  </tbody>
</table>

#### Has Sensitive Data

Groups evidence and indicators about whether the affected resource has sensitive data.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td>Describes how sensitive data presence changes the CVSS score. Possible values: `riskier`, `neutral`, `safer`, `unknown`. For instance considering a vulnerability theoretically exploitable through internet:  - `safer`: the impacted resource is on a private network, requiring the attacker to be on this private network rather than on the internet.  - `neutral`: if the impacted resource has an actual internet access.  - `unknown`: we cannot detect network related information on the impacted resource or about the vulnerability.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td>Same as `risk.has_sensitive_data`.</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td>Evidence supporting the presence of sensitive data.</td>
    </tr>
  </tbody>
</table>

##### Evidence

Evidence supporting the presence of sensitive data.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>sds_id</code></td>
      <td>string</td>
      <td>ID of a sensitive data entry such as discover by Datadog Sensitive Data Scanning.</td>
    </tr>
  </tbody>
</table>

#### Is Function Reachable

Groups evidence and indicators about whether the vulnerable function or module is used in the code.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td>Describes how function reachability changes the CVSS risk assessment. Valid values: riskier, neutral, safer, unknown.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td>True if the function is reachable.</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td>Describes the evidence used to determine whether the function is reachable</td>
    </tr>
  </tbody>
</table>

##### Evidence

Describes the evidence used to determine whether the function is reachable

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>locations</code></td>
      <td>object</td>
      <td>Array of CodeLocation items (the filename, line, column, and symbol fields are required)</td>
    </tr>
  </tbody>
</table>

###### Locations

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>filename</code></td>
      <td>string</td>
      <td>Name of the file where the root parent package version is declared.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td>Line number where the root parent package version declaration starts in the file.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td>Column position where the root parent package version declaration starts on the line.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td>Line number where the root parent package version declaration ends in the file.</td>
    </tr>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td>Column position where the root parent package version declaration ends on the line.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>boolean</td>
      <td>True if the code file is a test file, false otherwise.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td>The URL in to watch the file online. For instance the file view in github.com, highlighting the code location described by this object</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>string</td>
      <td>-</td>
    </tr>
  </tbody>
</table>

#### Is Exposed To Attacks

Is the service where the finding was detected exposed to attacks?

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td>Describes how the resource's exposure affects the CVSS scoring. Possible values: <code>riskier</code>, <code>safer</code>, <code>neutral</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td>Same as `risk.is_exposed_to_attacks`.</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td>Evidences for the presence of attacks.</td>
    </tr>
  </tbody>
</table>

##### Evidence

Evidences for the presence of attacks.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>trace_example</code></td>
      <td>object</td>
      <td>Example of a trace with attacks detected on the finding's resource.</td>
    </tr>
    <tr>
      <td><code>trace_query</code></td>
      <td>string</td>
      <td>Query used to find traces with attacks related to the resource associated with the finding.</td>
    </tr>
    <tr>
      <td><code>attacks_details</code></td>
      <td>object</td>
      <td>Details about one of the detected attacks.</td>
    </tr>
  </tbody>
</table>

#### Has Privileged Access

Object describing further detail about custom.risk.has_privileged_access

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td>Describes how privileged access changes the CVSS scoring. Possible values: <code>riskier</code>, <code>safer</code>, <code>neutral</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td>True if the resource associated with the finding has privileged access.</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td>Object of unknown shape showing proof of the Privileged Access</td>
    </tr>
  </tbody>
</table>

##### Evidence

Object of unknown shape showing proof of the Privileged Access

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>resource_key</code></td>
      <td>string</td>
      <td>Canonical Cloud Resource Identifier with proof of the Privileged Access (i.e. an aws_iam_policy CCRID)</td>
    </tr>
  </tbody>
</table>

#### Is Production

Groups evidence and indicators about whether the resource associated with the finding is running in a production environment.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td>How is this affecting the CVSS scoring? Typically, if `in_production=true`, the CVSS risk impact is `neutral`, and if `in_production=false`, the CVSS risk impact is `safer`. Possible values: <code>riskier</code>, <code>safer</code>, <code>neutral</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td>Same as `risk.is_production`.</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td>The `env` value triggering the conclusion for `is_production`.</td>
    </tr>
  </tbody>
</table>

#### Is Publicly Accessible

Groups information about whether the affected resource is accessible from the public internet.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td>How is this affecting the CVSS scoring? Possible values: `riskier`, `neutral`, `safer`, `unknown`. For instance, a resource with an exploitability exploitable through internet was detected on a private network. Hence the CVSS impact on risk is `safer`. Though, if this resource had an actual internet access, the CVSS impact on risk would be `neutral`.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td>Equals custom.risk.is_publicly_accessible (may change to enum in future).</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td>Object of unknown shape showing proof of access from the internet.</td>
    </tr>
  </tbody>
</table>

##### Evidence

Object of unknown shape showing proof of access from the internet.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>resource_key</code></td>
      <td>string</td>
      <td>CCRID of the resource accessible from the internet (i.e an AWS ELBv2 ARN).</td>
    </tr>
  </tbody>
</table>

#### Has Exploit Available

Groups information about whether a known exploit exists for this finding advisory.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td>Describes how the availability of known exploits changes the CVSS scoring. Possible values: <code>riskier</code>, <code>safer</code>, <code>neutral</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td>True if known exploits exist for this finding.</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td>Provides evidence about the exploit availability</td>
    </tr>
  </tbody>
</table>

##### Evidence

Provides evidence about the exploit availability

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>type</code></td>
      <td>string</td>
      <td>Type of evidence. Valid values: `production_ready`, `poc`, `unavailable`.</td>
    </tr>
    <tr>
      <td><code>exploit_urls</code></td>
      <td>array (string)</td>
      <td>Lists exploit urls entries associated with the finding.</td>
    </tr>
    <tr>
      <td><code>exploit_sources</code></td>
      <td>array (string)</td>
      <td>Lists exploit sources entries associated with the finding. (i.e. NIST, CISA, Exploit-DB etc)</td>
    </tr>
  </tbody>
</table>

#### Has High Exploitability Chance

Is the vulnerability likely to be exploited. Derived from EPSS

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td>Describes how the availability of known exploits changes the CVSS scoring. Possible values: <code>riskier</code>, <code>safer</code>, <code>neutral</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td>True if this vulnerability is assessed as having a high chance of exploitation (EPSS above 1%), false otherwise.</td>
    </tr>
    <tr>
      <td><code>evidence</code></td>
      <td>object</td>
      <td>Object providing the evidence of the EPSS score</td>
    </tr>
  </tbody>
</table>

##### Evidence

Object providing the evidence of the EPSS score

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>epss_score</code></td>
      <td>number</td>
      <td>FIRST EPSS score (first.org Exploit Prediction Scoring System), a percentage representing the chance of exploitation</td>
    </tr>
    <tr>
      <td><code>epss_severity</code></td>
      <td>string</td>
      <td>EPSS score severity, valid values are Critical/High/Medium/Low, being Critical any vulnerability with a high chance of exploitation</td>
    </tr>
    <tr>
      <td><code>threshold</code></td>
      <td>number</td>
      <td>Defines the minimum EPSS score required for a vulnerability to be considered as having a high exploitability chance when has_high_exploitability_chance is set to true.</td>
    </tr>
  </tbody>
</table>

#### Is Tainted From Request Url

Groups information about whether the tainted parts originating from the request URL.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td>Describes how it changes the CVSS scoring. Possible values: <code>riskier</code>, <code>safer</code>, <code>neutral</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td>True if the final URL contains tainted parts originating from the request URL, which may lower the risk due to typical framework validation (e.g. Java Spring).</td>
    </tr>
  </tbody>
</table>

#### Is Tainted From Query String

Groups information about whether the tainted parts originating from a query string.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td>Describes how it changes the CVSS scoring. Possible values: <code>riskier</code>, <code>safer</code>, <code>neutral</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td>True if the problematic string contains elements derived from an HTTP query string.</td>
    </tr>
  </tbody>
</table>

#### Is Tainted From Database

Groups information about whether the tainted parts originating from a database.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td>Describes how it changes the CVSS scoring. Possible values: <code>riskier</code>, <code>safer</code>, <code>neutral</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td>True if the string is tainted due to originating from an untrusted database source.</td>
    </tr>
  </tbody>
</table>

#### Is Using Sha1

Groups information about whether SHA1 is used in a weak hash.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>impact_cvss</code></td>
      <td>string</td>
      <td>Describes how it changes the CVSS scoring. Possible values: <code>riskier</code>, <code>safer</code>, <code>neutral</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>value</code></td>
      <td>boolean</td>
      <td>True if SHA1 is used in a weak hash, which reduces the risk score due to its security being stronger than algorithms like MD5.</td>
    </tr>
  </tbody>
</table>

## Vulnerability information

### Rule

A rule indicates how to discover a vulnerability. For instance, the rule python-flask/ssrf-requests describes how to find some kinds of SSRF in Python code. Vulnerability findings with rules mean that the vulnerability was spotted either in your source code, or in running code.  Rules are also used for non-vulnerability findings such as misconfigurations or API security.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>type</code></td>
      <td>string</td>
      <td>Contains the type of the rule that generated the finding.</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td>Contains the name of the rule that generated the finding.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td>Contains the id of the rule that generated the finding</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>integer</td>
      <td>Indicates the version of the rule that generated the finding</td>
    </tr>
    <tr>
      <td><code>default_rule_id</code></td>
      <td>string</td>
      <td>Contains the default rule id of the rule. Custom rules will not have default rule ids.</td>
    </tr>
  </tbody>
</table>

### Advisory

An advisory ties a vulnerability to a set of specific software versions. For instance, CVE-2021-44228 indicates that Log4j2 versions 2.0-beta9 through 2.15.0 are vulnerable to injection. Vulnerability findings with advisories mean that a vulnerable version of the software was detected (typically through SBOMs).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td>Represents the internal ID of the field, and should not be exposed publicly</td>
    </tr>
    <tr>
      <td><code>cve</code></td>
      <td>string</td>
      <td>Represents the primary, globally recognized identifier for a security vulnerability, following the CVE-YYYY-NNNN format.</td>
    </tr>
    <tr>
      <td><code>aliases</code></td>
      <td>array (string)</td>
      <td>Contains the additional identifiers referring to the same vulnerability, created by other entities.</td>
    </tr>
    <tr>
      <td><code>published_at</code></td>
      <td>integer</td>
      <td>UNIX timestamp (UTC) of when the advisory was published</td>
    </tr>
    <tr>
      <td><code>modified_at</code></td>
      <td>integer</td>
      <td>UNIX timestamp (UTC) of when the advisory was last updated</td>
    </tr>
    <tr>
      <td><code>summary</code></td>
      <td>string</td>
      <td>A short summary of the advisory.</td>
    </tr>
    <tr>
      <td><code>type</code></td>
      <td>string</td>
      <td>Specifies the type of the advisory. Possible values are component_with_known_vulnerability, unmaintained, end_of_life, dangerous_workflows, risky_license, and malicious_package</td>
    </tr>
  </tbody>
</table>

### Vulnerability

The vulnerability namespace contains information specific to vulnerabilities.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>cwes</code></td>
      <td>array (string)</td>
      <td>CWE (Common Weakness Enumeration) identifier associated with this vulnerability. Each entry must use the CWE-&lt;id&gt; format, for example CWE-416.</td>
    </tr>
    <tr>
      <td><code>hash</code></td>
      <td>string</td>
      <td>Vulnerability hash used to correlate the same vulnerability across SCA runtime and static.</td>
    </tr>
    <tr>
      <td><code>first_commit</code></td>
      <td>string</td>
      <td>Identifies the commit in which this vulnerability is first introduced.</td>
    </tr>
    <tr>
      <td><code>last_commit</code></td>
      <td>string</td>
      <td>Identifies the commit in which this vulnerability is fixed.</td>
    </tr>
    <tr>
      <td><code>owasp_top10_years</code></td>
      <td>array (integer)</td>
      <td>Indicates the years the vulnerability appeared in the OWASP Top 10 list of critical vulnerabilities.</td>
    </tr>
    <tr>
      <td><code>confidence</code></td>
      <td>string</td>
      <td>Assesses the likelihood of the vulnerability being a true positive. Possible values: <code>low</code>, <code>high</code>, <code>not_evaluated</code>.</td>
    </tr>
    <tr>
      <td><code>confidence_reason</code></td>
      <td>string</td>
      <td>Provides the rationale behind the assigned confidence level, explaining reasons for low or high assessments.</td>
    </tr>
    <tr>
      <td><code>is_emerging</code></td>
      <td>boolean</td>
      <td>True if this vulnerability is classified as an emerging threat.</td>
    </tr>
    <tr>
      <td><code>stack</code></td>
      <td>object</td>
      <td>Specifies the technological stack the vulnerability was found on.</td>
    </tr>
  </tbody>
</table>

#### Stack

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>language</code></td>
      <td>string</td>
      <td>Specifies the language the vulnerability was found on</td>
    </tr>
    <tr>
      <td><code>ecosystem</code></td>
      <td>string</td>
      <td>Indicates the package management ecosystem or source registry from which the vulnerable component originates. Possible values include:go,maven,npm,deb,apk,windows, and others.</td>
    </tr>
  </tbody>
</table>

## Remediation

Groups information about the finding's remediation.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>codegen</code></td>
      <td>object</td>
      <td>Track a finding for the codegen platform.</td>
    </tr>
    <tr>
      <td><code>is_available</code></td>
      <td>boolean</td>
      <td>True if a remediation is currently available for this finding, false otherwise.</td>
    </tr>
    <tr>
      <td><code>description</code></td>
      <td>string</td>
      <td>Remediation description</td>
    </tr>
    <tr>
      <td><code>recommended_type</code></td>
      <td>string</td>
      <td>Indicates the recommended remediation type for this finding, such as applying a code change, upgrading a package, or upgrading the host image version. Possible values: <code>package</code>, <code>host_image</code>, <code>container_image</code>, <code>code_update</code>, <code>microsoft_kb</code>, <code>root_package</code>.</td>
    </tr>
    <tr>
      <td><code>recommended</code></td>
      <td>object</td>
      <td>The recommended remediation</td>
    </tr>
    <tr>
      <td><code>package</code></td>
      <td>object</td>
      <td>Groups remediation package information.</td>
    </tr>
    <tr>
      <td><code>root_package</code></td>
      <td>object</td>
      <td>Groups remediation root package information.</td>
    </tr>
    <tr>
      <td><code>host_image</code></td>
      <td>object</td>
      <td>Indicates a remediation (if present) that will suggest the latest version of a host image that may remediate the vulnerability.</td>
    </tr>
    <tr>
      <td><code>container_image</code></td>
      <td>object</td>
      <td>Indicates a remediation (if present) that will suggest a newer version of a container image that may remediate the vulnerability.</td>
    </tr>
    <tr>
      <td><code>code_update</code></td>
      <td>object</td>
      <td>-</td>
    </tr>
    <tr>
      <td><code>microsoft_kb</code></td>
      <td>object</td>
      <td>Details a remediation strategy using a Microsoft Knowledge Base article.</td>
    </tr>
  </tbody>
</table>

### Codegen

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>status</code></td>
      <td>string</td>
      <td>Status of the fix with codegen. Valid values: generated, not_available_non_default_branch, not_available_unsupported_tool, not_available_unsupported_rule, not_available_confidence_low, not_available_disabled, not_available_git_provider_not_supported, not_available_confidence_too_low, error.</td>
    </tr>
    <tr>
      <td><code>id</code></td>
      <td>string</td>
      <td>String that is used to track the remediation in the codegen backend.</td>
    </tr>
  </tbody>
</table>

### Package

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>latest_no_critical</code></td>
      <td>array (object)</td>
      <td>Indicates a remediation (if present) that will suggest the latest version of the package that has no critical vulnerabilities (using their base score)</td>
    </tr>
    <tr>
      <td><code>closest_no_critical</code></td>
      <td>array (object)</td>
      <td>Indicates a remediation (if present) that will suggest the closest version (to the current one) of the package that has no critical vulnerabilities (using their base score)</td>
    </tr>
    <tr>
      <td><code>latest_no_vulnerabilities</code></td>
      <td>array (object)</td>
      <td>Indicates a remediation (if present) that will suggest the latest version of the package that has no vulnerability</td>
    </tr>
    <tr>
      <td><code>closest_no_vulnerabilities</code></td>
      <td>array (object)</td>
      <td>Indicates a remediation (if present) that will suggest the closest version (to the current one) of the package that has no vulnerability</td>
    </tr>
    <tr>
      <td><code>base</code></td>
      <td>array (object)</td>
      <td>-</td>
    </tr>
  </tbody>
</table>

### Root Package

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>latest_no_critical</code></td>
      <td>array (object)</td>
      <td>Indicates a remediation (if present) that will suggest the latest version of the package that has no critical vulnerabilities (using their base score)</td>
    </tr>
    <tr>
      <td><code>closest_no_critical</code></td>
      <td>array (object)</td>
      <td>Indicates a remediation (if present) that will suggest the closest version (to the current one) of the package that has no critical vulnerabilities (using their base score)</td>
    </tr>
    <tr>
      <td><code>latest_no_vulnerabilities</code></td>
      <td>array (object)</td>
      <td>Indicates a remediation (if present) that will suggest the latest version of the package that has no vulnerability</td>
    </tr>
    <tr>
      <td><code>closest_no_vulnerabilities</code></td>
      <td>array (object)</td>
      <td>Indicates a remediation (if present) that will suggest the closest version (to the current one) of the package that has no vulnerability</td>
    </tr>
    <tr>
      <td><code>base</code></td>
      <td>array (object)</td>
      <td>-</td>
    </tr>
  </tbody>
</table>

### Host Image

Indicates a remediation (if present) that will suggest the latest version of a host image that may remediate the vulnerability.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>latest_major</code></td>
      <td>object</td>
      <td>Contains information about the latest Amazon Machine Image that may remediate the vulnerability.</td>
    </tr>
  </tbody>
</table>

#### Latest Major

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td>Indicates the name of the latest Amazon Machine Image (AMI), such as "ami-12345678" that may remediate the vulnerability.</td>
    </tr>
  </tbody>
</table>

### Container Image

Indicates a remediation (if present) that will suggest a newer version of a container image that may remediate the vulnerability.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>closest_no_vulnerabilities</code></td>
      <td>object</td>
      <td>-</td>
    </tr>
  </tbody>
</table>

#### Closest No Vulnerabilities

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>registry_url</code></td>
      <td>string</td>
      <td>-</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td>-</td>
    </tr>
    <tr>
      <td><code>tag</code></td>
      <td>string</td>
      <td>-</td>
    </tr>
  </tbody>
</table>

### Code Update

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>edits</code></td>
      <td>array (object)</td>
      <td>Lists the code changes required to remediate the finding</td>
    </tr>
  </tbody>
</table>

### Microsoft Kb

Details a remediation strategy using a Microsoft Knowledge Base article.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>closest_fix_advisory</code></td>
      <td>object</td>
      <td>Specifies the closest patch available to address the current advisory based on your system's last installed update.</td>
    </tr>
  </tbody>
</table>

#### Closest Fix Advisory

Specifies the closest patch available to address the current advisory based on your system's last installed update.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>article</code></td>
      <td>string</td>
      <td>Identifies the article name for the closest patch.</td>
    </tr>
  </tbody>
</table>

## Compliance

The compliance namespace contains information specific to compliance findings. For example compliance rule, or evaluation (pass/fail).

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>evaluation</code></td>
      <td>string</td>
      <td>Cloud misconfigurations can fail (the resource is misconfigured) or pass (the resource isn't). Possible values: <code>pass</code>, <code>fail</code>.</td>
    </tr>
    <tr>
      <td><code>frameworks</code></td>
      <td>array (object)</td>
      <td>Lists the compliance frameworks mapped to this finding.</td>
    </tr>
    <tr>
      <td><code>framework_requirements</code></td>
      <td>array (string)</td>
      <td>Lists the requirements within the compliance framework that this finding relates to.</td>
    </tr>
    <tr>
      <td><code>framework_requirement_controls</code></td>
      <td>array (string)</td>
      <td>Lists the controls within the framework requirement that this finding maps to.</td>
    </tr>
  </tbody>
</table>

## Resource identification

These attributes identify and provide context about the affected resource.

### Cloud Resource

Groups attributes identifying the cloud resource affected by the finding.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>tags</code></td>
      <td>array (string)</td>
      <td>Lists tags applied to the cloud resource. Those tags are also duplicated in the root-level tag item.</td>
    </tr>
    <tr>
      <td><code>category</code></td>
      <td>string</td>
      <td>The category the resource type belongs to.</td>
    </tr>
    <tr>
      <td><code>key</code></td>
      <td>string</td>
      <td>The Canonical Cloud Resource Identifier (CCRID)</td>
    </tr>
    <tr>
      <td><code>cloud_provider_url</code></td>
      <td>string</td>
      <td>The link to the respective cloud provider.</td>
    </tr>
    <tr>
      <td><code>cloud_provider</code></td>
      <td>string</td>
      <td>Indicates the cloud provider hosting the resource. Valid values: aws, azure, gcp.</td>
    </tr>
    <tr>
      <td><code>configuration</code></td>
      <td>object</td>
      <td>The configuration of the cloud resource, as returned by the cloud provider.</td>
    </tr>
    <tr>
      <td><code>account</code></td>
      <td>string</td>
      <td>Cloud account or equivalent that owns the cloud resource (for example, AWS account, Azure subscription, GCP project, OCI tenancy).</td>
    </tr>
    <tr>
      <td><code>display_name</code></td>
      <td>string</td>
      <td>The display name of the resource.</td>
    </tr>
    <tr>
      <td><code>region</code></td>
      <td>string</td>
      <td>The cloud region where the resource belongs to.</td>
    </tr>
    <tr>
      <td><code>public_accessibility_paths</code></td>
      <td>array (string)</td>
      <td>Describes the network paths through which the resource is accessible from the public internet, for example via public endpoints, gateways, or load balancers.</td>
    </tr>
    <tr>
      <td><code>public_port_ranges</code></td>
      <td>array (object)</td>
      <td>List of port ranges on the resource that are exposed to the public internet.</td>
    </tr>
  </tbody>
</table>

### Iac Resource

Groups attributes identifying the Infrastructure as Code (IaC) resource related to the finding.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>provider</code></td>
      <td>string</td>
      <td>Indicates the IaC (Infrastructure as Code) provider on which the resource is. For example platform Terraform could have "aws", "gcp" or "azure" as a provider. Some iac platform (e.g. Kubernetes, Dockerfile) don't have a provider.</td>
    </tr>
    <tr>
      <td><code>platform</code></td>
      <td>string</td>
      <td>Indicates which IaC (Infrastructure as Code) platform the vulnerability was found on (e.g. `terraform`, `kubernetes`). Possible values: <code>cicd</code>, <code>terraform</code>, <code>kubernetes</code>.</td>
    </tr>
  </tbody>
</table>

### K8S

Kubernetes fields for findings generated against Kubenertes resources

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>cluster_id</code></td>
      <td>string</td>
      <td>The Kubernetes cluster id.</td>
    </tr>
  </tbody>
</table>

### Host

Contains host information

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td>Host name</td>
    </tr>
    <tr>
      <td><code>key</code></td>
      <td>string</td>
      <td>The Canonical Cloud Resource Identifier (CCRID)</td>
    </tr>
    <tr>
      <td><code>cloud_provider</code></td>
      <td>string</td>
      <td>The cloud provider the host belongs to. Possible values: <code>aws</code>, <code>azure</code>, <code>gcp</code>, <code>oci</code>.</td>
    </tr>
    <tr>
      <td><code>image</code></td>
      <td>string</td>
      <td>The name of the host image used to build the host, e.g. "ami-1234".</td>
    </tr>
    <tr>
      <td><code>os</code></td>
      <td>object</td>
      <td>Groups attributes of the operating system running on the host.</td>
    </tr>
  </tbody>
</table>

#### Os

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td>The OS name</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>string</td>
      <td>The OS version</td>
    </tr>
  </tbody>
</table>

### Service

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td>The name of the service where this finding was detected</td>
    </tr>
    <tr>
      <td><code>git_commit_sha</code></td>
      <td>string</td>
      <td>Git commit SHA of the latest commit where this finding is detected for the service, available only when Source Code Integration is configured: https://docs.datadoghq.com/integrations/guide/source-code-integration/?tab=go#embed-git-information-in-your-build-artifacts</td>
    </tr>
    <tr>
      <td><code>git_repository_url</code></td>
      <td>string</td>
      <td>URL of the Git repository for the service associated with this finding, available only when Source Code Integration is configured: https://docs.datadoghq.com/integrations/guide/source-code-integration/?tab=go#embed-git-information-in-your-build-artifacts</td>
    </tr>
  </tbody>
</table>

### Container Image

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>registries</code></td>
      <td>array (string)</td>
      <td>Indicates the container registry where the image is stored or from which it was pulled.</td>
    </tr>
    <tr>
      <td><code>repository</code></td>
      <td>string</td>
      <td>Specifies the repository of the container image</td>
    </tr>
    <tr>
      <td><code>repo_digests</code></td>
      <td>array (string)</td>
      <td>Contains the repository digests of the container image, where this finding was detected.</td>
    </tr>
    <tr>
      <td><code>git_repository_url</code></td>
      <td>string</td>
      <td>URL of the Git repository for the code used to build the container image associated with this finding, available only when Source Code Integration is configured: https://docs.datadoghq.com/integrations/guide/source-code-integration/?tab=go#embed-git-information-in-your-build-artifacts</td>
    </tr>
    <tr>
      <td><code>oses</code></td>
      <td>array (object)</td>
      <td>Today, we group container images by name, hence they may have several OS.</td>
    </tr>
    <tr>
      <td><code>architectures</code></td>
      <td>array (string)</td>
      <td>Today, we group container images by name, hence they may have several architectures.</td>
    </tr>
    <tr>
      <td><code>image_layer_digests</code></td>
      <td>array (string)</td>
      <td>-</td>
    </tr>
    <tr>
      <td><code>image_layer_diff_ids</code></td>
      <td>array (string)</td>
      <td>-</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td>The full name of the container image.</td>
    </tr>
    <tr>
      <td><code>tags</code></td>
      <td>array (string)</td>
      <td>It represents the tag part of the container image name, e.g. "latest" or "1.2.3"</td>
    </tr>
  </tbody>
</table>

## Code context

These attributes provide source code context for findings detected in code.

### Git

Contains Git metadata linking a finding to source code context. It contains information about the repository, branch, commit, author, and committer.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>repository_id</code></td>
      <td>string</td>
      <td>The normalized id of the Git repository</td>
    </tr>
    <tr>
      <td><code>repository_url</code></td>
      <td>string</td>
      <td>The Git repository URL related to the current finding</td>
    </tr>
    <tr>
      <td><code>repository_visibility</code></td>
      <td>string</td>
      <td>Indicates the visibility of the repository. Valid values: public, private, not_detected. Used to modify severity and assist in triage for secrets detections (publicly exposed secrets are more severe than private secrets)</td>
    </tr>
    <tr>
      <td><code>branch</code></td>
      <td>string</td>
      <td>The name of the Git branch related to the current finding</td>
    </tr>
    <tr>
      <td><code>default_branch</code></td>
      <td>string</td>
      <td>Contains the default branch defined for Git repository to which the current finding is related</td>
    </tr>
    <tr>
      <td><code>is_default_branch</code></td>
      <td>boolean</td>
      <td>True the current branch is the default branch for the repository</td>
    </tr>
    <tr>
      <td><code>sha</code></td>
      <td>string</td>
      <td>Contains the Git commit unique ID usually called SHA</td>
    </tr>
    <tr>
      <td><code>author</code></td>
      <td>object</td>
      <td>Details about the author of the commit</td>
    </tr>
    <tr>
      <td><code>committer</code></td>
      <td>object</td>
      <td>Groups details about the committer</td>
    </tr>
    <tr>
      <td><code>codeowners</code></td>
      <td>array (string)</td>
      <td>Includes codeowner teams extracted from an SCM provider's CODEOWNERS file (for example, GitHub).</td>
    </tr>
  </tbody>
</table>

#### Author

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td>The name of the commit author.</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>string</td>
      <td>The email address of the commit author.</td>
    </tr>
    <tr>
      <td><code>authored_at</code></td>
      <td>integer</td>
      <td>The date when the original changes were made.</td>
    </tr>
  </tbody>
</table>

#### Committer

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td>The name of the committer.</td>
    </tr>
    <tr>
      <td><code>email</code></td>
      <td>string</td>
      <td>The email address of the committer.</td>
    </tr>
    <tr>
      <td><code>committed_at</code></td>
      <td>integer</td>
      <td>The date when the changes were last significantly modified, for example, during a rebase or amend operation.</td>
    </tr>
  </tbody>
</table>

### Code Location

Groups attributes pinpointing the specific file and line numbers where the finding is located.

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>filename</code></td>
      <td>string</td>
      <td>Name of the file where the root parent package version is declared.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td>Line number where the root parent package version declaration starts in the file.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td>Column position where the root parent package version declaration starts on the line.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td>Line number where the root parent package version declaration ends in the file.</td>
    </tr>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td>Column position where the root parent package version declaration ends on the line.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>boolean</td>
      <td>True if the code file is a test file, false otherwise.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td>The URL in to watch the file online. For instance the file view in github.com, highlighting the code location described by this object</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>string</td>
      <td>-</td>
    </tr>
  </tbody>
</table>

### Package

A package manager is a tool that automates the installation, upgrading, configuration, and removal of software packages, managing dependencies and versioning to ensure consistency in development or runtime environments. Examples: Bundle, NPM, Aptitude, Yum, ...

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>name</code></td>
      <td>string</td>
      <td>The name of the package or library where the vulnerability is identified.</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>string</td>
      <td>The version of the package or library where the vulnerability is identified.</td>
    </tr>
    <tr>
      <td><code>additional_names</code></td>
      <td>array (string)</td>
      <td>Contains the list of affected package names when a cloud vulnerability impacts multiple packages derived from the same source package.</td>
    </tr>
    <tr>
      <td><code>normalized_name</code></td>
      <td>string</td>
      <td>The normalized name according to the ecosystem of the package or library where the vulnerability is identified.</td>
    </tr>
    <tr>
      <td><code>manager</code></td>
      <td>string</td>
      <td>Indicates the package management ecosystem or source registry from which the vulnerable component originates Possible values: <code>maven</code>, <code>gradle</code>, <code>npm</code>, <code>yarn</code>, <code>pnpm</code>, <code>requirements</code>, <code>pipfile</code>, <code>pdm</code>, <code>poetry</code>, <code>nuget</code>, <code>bundler</code>, <code>golang</code>, <code>composer</code>, <code>crates</code>, <code>conan</code>, <code>hex</code>, <code>pub</code>, <code>renv</code>, <code>uv</code>, <code>unknown</code>.</td>
    </tr>
    <tr>
      <td><code>dependency_type</code></td>
      <td>string</td>
      <td>Indicates whether this package is a direct or a transitive dependency, or not supported if the information can not be retrieved Possible values: <code>direct</code>, <code>transitive</code>, <code>not_supported</code>.</td>
    </tr>
    <tr>
      <td><code>loading_type</code></td>
      <td>string</td>
      <td>Used for runtime detection, indicates if the component is always loaded and running (hot), running infrequently (cold) or loaded on demand (lazy) Possible values: <code>hot</code>, <code>cold</code>, <code>lazy</code>.</td>
    </tr>
    <tr>
      <td><code>dependency_location_text</code></td>
      <td>string</td>
      <td>-</td>
    </tr>
    <tr>
      <td><code>declaration</code></td>
      <td>object</td>
      <td>Code locations of the package definition</td>
    </tr>
    <tr>
      <td><code>scope</code></td>
      <td>string</td>
      <td>Indicates the intended usage scope of the package (production or development) Possible values: <code>production</code>, <code>development</code>.</td>
    </tr>
    <tr>
      <td><code>root_parents</code></td>
      <td>array (object)</td>
      <td>Contains a list of the dependencies for which this package is a transitive dependency. One of them will be root_parent.name</td>
    </tr>
  </tbody>
</table>

#### Declaration

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>block</code></td>
      <td>object</td>
      <td>Indicates the location of the code that declares the whole dependency declaration</td>
    </tr>
    <tr>
      <td><code>name</code></td>
      <td>object</td>
      <td>Indicates the location of the code that declares the name of the dependency</td>
    </tr>
    <tr>
      <td><code>version</code></td>
      <td>object</td>
      <td>The version declared for the root parent</td>
    </tr>
  </tbody>
</table>

##### Block

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>filename</code></td>
      <td>string</td>
      <td>Name of the file where the root parent package version is declared.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td>Line number where the root parent package version declaration starts in the file.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td>Column position where the root parent package version declaration starts on the line.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td>Line number where the root parent package version declaration ends in the file.</td>
    </tr>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td>Column position where the root parent package version declaration ends on the line.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>boolean</td>
      <td>True if the code file is a test file, false otherwise.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td>The URL in to watch the file online. For instance the file view in github.com, highlighting the code location described by this object</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>string</td>
      <td>-</td>
    </tr>
  </tbody>
</table>

##### Name

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>filename</code></td>
      <td>string</td>
      <td>Name of the file where the root parent package version is declared.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td>Line number where the root parent package version declaration starts in the file.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td>Column position where the root parent package version declaration starts on the line.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td>Line number where the root parent package version declaration ends in the file.</td>
    </tr>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td>Column position where the root parent package version declaration ends on the line.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>boolean</td>
      <td>True if the code file is a test file, false otherwise.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td>The URL in to watch the file online. For instance the file view in github.com, highlighting the code location described by this object</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>string</td>
      <td>-</td>
    </tr>
  </tbody>
</table>

##### Version

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>filename</code></td>
      <td>string</td>
      <td>Name of the file where the root parent package version is declared.</td>
    </tr>
    <tr>
      <td><code>line_start</code></td>
      <td>integer</td>
      <td>Line number where the root parent package version declaration starts in the file.</td>
    </tr>
    <tr>
      <td><code>column_start</code></td>
      <td>integer</td>
      <td>Column position where the root parent package version declaration starts on the line.</td>
    </tr>
    <tr>
      <td><code>line_end</code></td>
      <td>integer</td>
      <td>Line number where the root parent package version declaration ends in the file.</td>
    </tr>
    <tr>
      <td><code>column_end</code></td>
      <td>integer</td>
      <td>Column position where the root parent package version declaration ends on the line.</td>
    </tr>
    <tr>
      <td><code>is_test_file</code></td>
      <td>boolean</td>
      <td>True if the code file is a test file, false otherwise.</td>
    </tr>
    <tr>
      <td><code>url</code></td>
      <td>string</td>
      <td>The URL in to watch the file online. For instance the file view in github.com, highlighting the code location described by this object</td>
    </tr>
    <tr>
      <td><code>symbol</code></td>
      <td>string</td>
      <td>-</td>
    </tr>
  </tbody>
</table>

### Secret

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>validation_status</code></td>
      <td>string</td>
      <td>Represents the result of attempting to validate if the secret is active Possible values: <code>valid</code>, <code>invalid</code>, <code>not_validated</code>, <code>validation_error</code>, <code>not_available</code>.</td>
    </tr>
  </tbody>
</table>

### Api Endpoint

The object representation of the HTTP endpoint

<table>
  <thead>
    <tr>
      <th style="width: 25%;">Attribute name</th>
      <th style="width: 15%;">Type</th>
      <th style="width: 60%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>operation_name</code></td>
      <td>string</td>
      <td>Name of the entry-point into a service. examples: http.request, grpc.server</td>
    </tr>
    <tr>
      <td><code>path</code></td>
      <td>string</td>
      <td>The relative path of the endpoint</td>
    </tr>
    <tr>
      <td><code>method</code></td>
      <td>string</td>
      <td>The method of the endpoint (HTTP verb, gRPC method, etc)</td>
    </tr>
    <tr>
      <td><code>resource_name</code></td>
      <td>string</td>
      <td>The internal identification of the endpoint, in the form of a string composed of "{method} {path}"</td>
    </tr>
  </tbody>
</table>

## Tags

Key-value metadata in the format `name:value`. Enables flexible filtering and grouping of findings. Must include at least `source` and `origin`.



## Further reading

{{< partial name="whats-next/whats-next.html" >}}
