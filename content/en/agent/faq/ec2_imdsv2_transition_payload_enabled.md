---
title: IMDSv2 Enablement By Default
aliases:
  - /ec2_imdsv2_transition_payload_enabled
---

# IMDSv2 Default Behavior and Host Metadata Enhancement

Agent v7.64.0 enables IMDSv2 by default for enhanced security and improved metadata handling. The host metadata payload contains a field, `legacy-resolution-hostname`, that captures the AWS instance hostname using legacy resolution logic (when IMDSv2 was disabled) and is only included when needed.

The hostname displayed by the Agent **can** change if the Agent previously did not show the instance ID as the hostname. However, the Agent continues to use the original hostname to tag the different metrics sent by the Agent.

## Field inclusion criteria

The `legacy-resolution-hostname` field appears in the host metadata payload only when **both** of the following conditions are met:

- The configuration flag `ec2_imdsv2_transition_payload_enabled` is set to `true`.
- The legacy hostname retrieved is different from the hostname retrieved with IMDSv2.

## Impact on hostname reporting

The addition of the `legacy-resolution-hostname` field **does not** alter the hostname that is used to tag the metrics sent by the Agent. If the Agent previously did not use the instance ID as the hostname, it continues to use the original hostname for metric tagging. This ensures continuity and avoids any disruption in monitoring or alerting setups.

The displayed hostname **can** switch to the instance ID in Fleet Automation and the Infrastructure List. However, you can still locate your host using the original hostname.

## Example metadata payload

The following is an example of a host metadata payload that includes the new `legacy-resolution-hostname` field:

```json
{
  // ...
  "instance_id": "i-0123456789abcdef0",
  "hostname-resolution-version": 1,
  "legacy-resolution-hostname": "ip-172-31-15-47",
  // ...
}
