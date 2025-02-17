---
title: Enablement IMDSv2 by default
aliases:
  - /ec2_imdsv2_transition_payload_enabled
---

# IMDSv2 Default Behavior & Host Metadata Enhancement

From 7.64.0, the Agent now enables IMDSv2 by default for enhanced security and improved metadata handling. In addition, a new field, `legacy-resolution-hostname`, has been added to the host metadata payload. This field is used to capture the AWS instance hostname using legacy resolution logic (i.e. when IMDSv2 was disabled) and is only included when needed.

> **Important:** The hostname displayed by the Agent **may** change if the Agent previously did not show the instance ID as the hostname, however it will continue to use the original hostname to tag the different metrics sent by the Agent.

## What’s New?

1. **IMDSv2 Enabled by Default:**
   - The Agent now defaults to using IMDSv2 for metadata resolution, increasing overall security.

2. **Additional Metadata Field:**
   - **Field Name:** `legacy-resolution-hostname`
   - **Purpose:** Enables IMDSv2 by default and captures the AWS instance hostname using legacy (IMDSv1) logic.

## Field Inclusion Criteria

The `legacy-resolution-hostname` field will appear in the host metadata payload only when **both** of the following conditions are met:

- The configuration flag `ec2_imdsv2_transition_payload_enabled` is set to `true`.
- The legacy hostname retrieved is different from the hostname retrieved with IMDSv2.

## Impact on Hostname Reporting

- **No Customer Impact:**
  The addition of the `legacy-resolution-hostname` field does not alter the hostname that is used to tag the metrics sent by the Agent. If the Agent previously did not use the instance ID as the hostname, it will continue to use the original hostname for metric tagging. This ensures continuity and avoids any disruption in monitoring or alerting setups.

- **Hostname display on Datadog:**
  The hostname display might switch to the instance ID in Fleet Automation and the Infrastructure list; however, you can still locate your host using either hostname.

## Example Metadata Payload

Below is an example of a host metadata payload that includes the new `legacy-resolution-hostname` field:

```json
{
  // ...
  "instance_id": "i-0123456789abcdef0",
  "hostname-resolution-version": 1,
  "legacy-resolution-hostname": "ip-172-31-15-47",
  // ...
}
