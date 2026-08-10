---
title: How Agent Installation through the AWS Integration Works
description: "Understand how Datadog installs and maintains the Datadog Agent on Amazon EC2 through the AWS integration: the AWS resources created, the installation mechanism, the security model, and the Agent lifecycle."
private: true # TODO(DOCS-14545): remove at v1 rollout to publish, at the same time as the setup guide this page links to; also add the nextlink entry in integrations/guide/_index.md at that time
further_reading:
- link: "https://docs.datadoghq.com/integrations/guide/aws-agent-installation/"
  tag: "Documentation"
  text: "Install the Datadog Agent through the AWS Integration"
- link: "https://docs.datadoghq.com/integrations/amazon_web_services/"
  tag: "Documentation"
  text: "AWS Integration"
- link: "https://docs.datadoghq.com/agent/fleet_automation/"
  tag: "Documentation"
  text: "Fleet Automation"
---

This page explains how Datadog installs and maintains the Agent on Amazon EC2 through the AWS integration. For setup instructions and the permissions Datadog requires, see [Install the Datadog Agent through the AWS Integration][1].

<div class="alert alert-info">This page covers the Amazon EC2 experience only. Support for more AWS resource types is planned, starting with EKS.</div>

## AWS resources that Datadog creates

The CloudFormation template you launch creates the following resources one time, in a single stack:

| Resource | Name | Purpose |
|---|---|---|
| EventBridge connection | `datadog-agent-resource-update-intake-connection` | Holds your Datadog API and application keys so events can be sent to Datadog |
| EventBridge API destination | `datadog-agent-resource-update-intake-destination` | Sends events to `https://api.<YOUR_DD_SITE>/api/unstable/instrumenter/events` (capped at 10 events per second) |
| EventBridge rule | `datadog-agent-resource-update-rule-ec2` | Notifies Datadog when a covered instance changes |
| IAM role | auto-named | Lets EventBridge send events to the `datadog-agent-resource-update-intake-destination` API destination |
| IAM role | `datadog-eventbridge-cross-region-role` | Lets other regions forward events to your primary region |

Datadog creates the following resources as needed, at install time:

| Resource | Name | Purpose |
|---|---|---|
| Systems Manager document | `datadog-ec2-instrumenter` | The install and uninstall script. One document per account. |
| Secrets Manager secret | `/datadog/ec2-instrumenter/<ACCOUNT_ID>/<INSTANCE_ID>` | Holds the Datadog API key so the instance can fetch it itself. Encrypted with the default AWS-managed key. |
| IAM role and instance profile | `datadog-ssm-<INSTANCE_ID>` and `datadog-ssm-profile-<INSTANCE_ID>` | Created only when the instance has no instance profile, under the IAM path `/datadog-ec2-instrumenter/` so they are identifiable. Receives the AWS-managed `AmazonSSMManagedInstanceCore` policy so Systems Manager can reach the instance. |
| Inline IAM policy | `datadog-ec2-instrumenter-secrets` | Added to the instance's role. Grants read access only to secrets under `/datadog/ec2-instrumenter/`. |
| EventBridge rules in your other regions | Same names as the primary-region resources | Forward change events to your primary region |

Datadog does not create S3 buckets, event buses, log groups, or SSM parameters, and does not tag your instances.

## How Agent installation works

After you save an installation rule, Datadog resolves the query you defined into a fixed list of covered instances. Datadog then runs the following sequence against each one. For prerequisites, including supported platforms, see [Prerequisites][2] in the setup guide.

1. Datadog checks that each covered instance is running, on a supported platform, and reachable by AWS Systems Manager.
2. When an instance has no IAM instance profile, Datadog creates one so Systems Manager can reach it. When an instance already has one, Datadog adds the SSM policy and the scoped secret-read policy to the existing role.
3. Datadog checks whether an Agent is already present. When an Agent is present that Datadog did not install, Datadog stops and leaves the instance alone.
4. Datadog calls `ssm:SendCommand`, one instance at a time, running the `datadog-ec2-instrumenter` document.
5. On the instance, the document fetches the API key from Secrets Manager using the instance's own IAM role. It then runs Datadog's standard Agent installer (`install_script_agent7.sh` on Linux, or the standard MSI on Windows) with log collection and APM host instrumentation enabled. The command times out after 6 minutes.

Datadog does not reboot or restart your instances. The only service Datadog touches is the Datadog Agent itself, which is started on install and stopped on uninstall. Your applications and other services are untouched.

### Instances that Datadog excludes

Datadog automatically excludes:

- Instances that are not running
- EKS worker nodes
- ECS container instances
- Instances that already have a non-Datadog-installed Agent

## Security, auditing, and change control

### How Datadog gets access

Datadog uses the same cross-account IAM role as the AWS integration, authenticated with an external ID. Datadog receives short-lived, temporary credentials, and each type of work (reading EC2, managing IAM, sending commands) uses a separately scoped credential session rather than one broad session. Datadog stores no long-lived AWS keys.

### Auditing Datadog's actions

Every action Datadog takes is a standard AWS API call, so all actions appear in AWS CloudTrail. Everything Datadog creates is identifiable by name: resources are prefixed with `datadog-`, secrets live under `/datadog/ec2-instrumenter/`, and IAM roles use the immutable path `/datadog-ec2-instrumenter/`. Because an IAM path cannot be edited after creation, the path cannot be silently changed. On-instance command results appear in the Systems Manager Run Command history.

### How the API key is handled

The API key is stored in your own Secrets Manager, encrypted at rest. Only the secret's Amazon Resource Name (ARN) is passed in the SSM command; the key itself never appears in command parameters or in CloudTrail. The instance reads the secret with its own IAM role, restricted to a single path. Datadog stores only a reference to the key internally, not the key itself.

### Who can change installations

- **In AWS**: Access is governed by your own IAM policies. Removing the cross-account permissions stops Datadog immediately.
- **In Datadog**: Viewing installation rules requires the **Hosts Read** permission. Creating, editing, or deleting rules requires the **Agent Install** permission. Rule changes are rate-limited.

### Guardrails

- Datadog never removes an Agent it did not install.
- Datadog tracks which instances it installed on, so it cleans up only its own work.
- When some regions cannot be listed, Datadog skips cleanup for that pass rather than risk uninstalling in bulk.

## Agent lifecycle and reconciliation

### Rule coverage is fixed at save time

A rule covers the list of instances it resolved to when you saved it, and Datadog instruments nothing outside that list. Instances launched later are not picked up automatically. To cover them, update the rule, which re-resolves your query against your current fleet.

### How Datadog keeps covered instances in sync

Datadog continuously maintains the state you define on the covered instances:

- A full reconciliation runs hourly per AWS account. Reconciliation reinstalls the Agent if it goes missing, retries anything that failed, and cleans up instances that no longer exist.
- Already-installed instances are re-verified about once per day rather than every hour, to avoid unnecessary activity.
- Change events from the CloudFormation stack let Datadog react to covered instances within minutes, instead of waiting for the hourly pass.

### What happens when you edit a rule

Datadog re-resolves your query and compares it against the previous list. Instances no longer covered have the Agent uninstalled. Newly covered instances have the Agent installed. Deleting a rule uninstalls the Agent from everything the rule covered.

### Terminated or stopped instances

Datadog detects terminated instances on the next hourly pass and cleans up the IAM resources it created for them. Datadog leaves stopped instances alone until they return.

### When an install fails

Datadog retries with an increasing delay (1 hour, then 2 hours, up to once per day) and continues retrying. Missing-permission problems appear as an issue on the **AWS integration tile** and on the Fleet install page.

<div class="alert alert-warning">
When someone manually removes the Agent from a covered instance, the next reconciliation reinstalls it. The rule is the source of truth. To stop coverage, change the rule.
</div>

## Uninstall the Agent

Uninstalling removes the Datadog Agent, the `/etc/datadog-agent` and `/opt/datadog-agent` directories on Linux (or performs an MSI uninstall on Windows), and any IAM role or instance profile Datadog created for that instance. To uninstall, remove instances from a rule, edit the rule's query, or delete the rule.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/guide/aws-agent-installation/
[2]: https://docs.datadoghq.com/integrations/guide/aws-agent-installation/#prerequisites
