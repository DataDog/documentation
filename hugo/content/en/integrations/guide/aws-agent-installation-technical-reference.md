---
title: How Datadog Instrumentation through the AWS Integration Works
description: "Understand how Datadog instruments Amazon EC2 instances and AWS Lambda functions through the AWS integration: the AWS resources created, the instrumentation mechanism, the security model, and the reconciliation behavior."
private: true # TODO(DOCS-14545): remove at v1 rollout to publish, at the same time as the setup guide this page links to; also add the nextlink entry under "AWS guides" in hugo/content/en/integrations/guide/_index.md at that time
further_reading:
- link: "https://docs.datadoghq.com/integrations/guide/aws-agent-installation/"
  tag: "Documentation"
  text: "Install Datadog instrumentation through the AWS Integration"
- link: "https://docs.datadoghq.com/integrations/amazon_web_services/"
  tag: "Documentation"
  text: "AWS Integration"
- link: "https://docs.datadoghq.com/agent/fleet_automation/"
  tag: "Documentation"
  text: "Fleet Automation"
- link: "https://docs.datadoghq.com/account_management/workload_identity_federation/"
  tag: "Documentation"
  text: "Workload Identity Federation"
---

This page explains how Datadog instruments and maintains your AWS workloads through the AWS integration. For setup instructions and the permissions Datadog requires, see [Install Datadog instrumentation through the AWS Integration][1].

This page covers Amazon EC2 instances and AWS Lambda functions. Amazon EKS is not supported.

Datadog also offers [remote instrumentation][4] for Lambda functions, which deploys an instrumenter function into your own account rather than making the changes from Datadog. For a comparison of the two, see [Choose between this guide and remote instrumentation][6].

## AWS resources that Datadog creates

### Created once, by the CloudFormation stack

The CloudFormation template you launch creates the following resources one time, in a single stack:

| Resource | Name | Purpose |
|---|---|---|
| EventBridge connection | `datadog-agent-resource-update-intake-connection` | Holds your Datadog API and application keys so events can be sent to Datadog |
| EventBridge API destination | `datadog-agent-resource-update-intake-destination` | Sends events to `https://api.<YOUR_DD_SITE>/api/unstable/instrumenter/events` (capped at 10 events per second) |
| EventBridge rule | `datadog-agent-resource-update-rule-ec2` | Notifies Datadog when a covered instance changes. Created when you select the EC2 workload |
| EventBridge rule | `datadog-agent-resource-update-rule-lambda` | Notifies Datadog when a covered function changes. Created when you select the Lambda workload |
| IAM role | auto-named | Lets EventBridge send events to the `datadog-agent-resource-update-intake-destination` API destination |
| IAM role | `datadog-eventbridge-cross-region-role` | Lets other regions forward events to your primary region |

The stack also attaches the IAM permissions for the workloads you selected to your AWS integration role. A Lambda-only selection receives no EC2 permissions.

### Created as needed, for EC2 instances

| Resource | Name | Purpose |
|---|---|---|
| Systems Manager document | `datadog-ec2-instrumenter` | The install and uninstall script. One document per account. |
| Secrets Manager secret | `/datadog/ec2-instrumenter/<ACCOUNT_ID>/<INSTANCE_ID>` | Holds the Datadog API key so the instance can fetch it itself. Encrypted with the default AWS-managed key. |
| IAM role and instance profile | `datadog-ssm-<INSTANCE_ID>` and `datadog-ssm-profile-<INSTANCE_ID>` | Created only when the instance has no instance profile, under the IAM path `/datadog-ec2-instrumenter/` so they are identifiable. Receives the AWS-managed `AmazonSSMManagedInstanceCore` policy so Systems Manager can reach the instance. |
| Inline IAM policy | `datadog-ec2-instrumenter-secrets` | Added to the instance's role. Grants read access only to secrets under `/datadog/ec2-instrumenter/`. |
| EventBridge rules in your other regions | Same names as the primary-region resources | Forward change events to your primary region. |

Datadog does not create S3 buckets, event buses, log groups, or SSM parameters, and does not tag your instances.

### Created as needed, for Lambda functions

Datadog creates no AWS resources for Lambda instrumentation. The only change is to the configuration of the functions your rule covers. Datadog does not create secrets, IAM roles, or SSM documents for Lambda, and does not tag your functions.

## How instrumentation works

After you save an instrumentation rule, Datadog resolves the query you defined into the set of covered resources, then runs the following sequence against each one. For prerequisites, including supported platforms and runtimes, see [Prerequisites][2] in the setup guide.

### On Amazon EC2

1. Datadog checks that each covered instance is running, on a supported platform, and reachable by AWS Systems Manager.
2. When an instance has no IAM instance profile, Datadog creates one so Systems Manager can reach it. When an instance already has one, Datadog adds the SSM policy and the scoped secret-read policy to the existing role.
3. Datadog checks whether an Agent is already present. When an Agent is present that Datadog did not install, Datadog stops and leaves the instance alone.
4. Datadog calls `ssm:SendCommand`, one instance at a time, running the `datadog-ec2-instrumenter` document.
5. On the instance, the document fetches the API key from Secrets Manager using the instance's own IAM role. It then runs Datadog's standard Agent installer (`install_script_agent7.sh` on Linux, or the standard MSI on Windows) with log collection and APM host instrumentation enabled. The command times out after 6 minutes.

Datadog does not reboot or restart your instances. The only service Datadog touches is the Datadog Agent itself, which is started on install and stopped on uninstall. Your applications and other services are untouched.

### On AWS Lambda

Lambda instrumentation runs entirely from Datadog. Datadog does not deploy anything into your account to instrument your functions.

1. Datadog reads the function's current configuration and tags, and checks that it meets the [Lambda prerequisites][3].
2. Datadog checks whether the function is already instrumented. A function carrying Datadog layers, a Datadog handler, or Datadog environment variables that Datadog did not apply is skipped, as is a function managed by [remote instrumentation][4]. Datadog reports which of the two applies.
3. Datadog resolves the Datadog layer versions for the function's runtime, architecture, region, and AWS partition. Layer versions come from a pinned set that advances with Datadog's layer releases, so an installation is reproducible rather than tracking whatever is newest at that moment.
4. Datadog computes the complete desired configuration and records exactly what it is about to change, before changing anything.
5. Datadog authorizes the function's execution role to send telemetry to your Datadog organization. See [How Lambda telemetry is authenticated](#how-lambda-telemetry-is-authenticated).
6. Datadog calls `lambda:UpdateFunctionConfiguration` once, submitting the complete layer list and environment map. Datadog marks the change as applied only after AWS reports success.

A Lambda update is a replace-style operation: the submitted layer list and environment map become the new configuration. Datadog therefore computes the full desired state rather than appending to it, preserving your existing layers and environment variables. The update carries the function's revision ID, so a change made in your account between Datadog's read and write causes the update to fail rather than overwrite it.

### What Datadog changes on a function

| Change | Applies to |
|---|---|
| Adds the Datadog extension layer (`Datadog-Extension` or `Datadog-Extension-ARM`) | All supported runtimes |
| Adds the matching Datadog tracing layer | Node.js, Python, Ruby, Java, and .NET |
| Sets `DD_SITE` and `DD_ORG_UUID` | All supported runtimes |
| Redirects the handler to the Datadog handler and moves the original into `DD_LAMBDA_HANDLER` | Node.js and Python |
| Sets `AWS_LAMBDA_EXEC_WRAPPER` to `/opt/datadog_wrapper` | Java and .NET |

Datadog does not change function code, memory size, timeout, VPC configuration, concurrency, or any other function setting.

### Resources that Datadog excludes

On EC2, Datadog excludes:

- Instances that are not running
- EKS worker nodes
- ECS container instances
- Instances that already have a non-Datadog-installed Agent

On Lambda, Datadog excludes:

- Container image functions, and functions on an unsupported runtime or architecture
- Functions outside the commercial `aws` partition
- Lambda@Edge replicas, and the functions they replicate
- Functions already instrumented by you or by remote instrumentation
- Functions that already set `AWS_LAMBDA_EXEC_WRAPPER` to a non-Datadog wrapper
- Functions where adding the Datadog layers would exceed the AWS five-layer limit

## Security, auditing, and change control

### How Datadog gets access

Datadog uses the same cross-account IAM role as the AWS integration, authenticated with an external ID. Datadog receives short-lived, temporary credentials, and each type of work (reading EC2, managing IAM, sending commands, updating functions) uses a separately scoped credential session rather than one broad session. Datadog does not store any long-lived AWS keys.

### Auditing Datadog's actions

Every action Datadog takes is a standard AWS API call, so all actions appear in AWS CloudTrail. Everything Datadog creates is identifiable by name: resources are prefixed with `datadog-`, secrets are stored under `/datadog/ec2-instrumenter/`, and IAM roles use the immutable path `/datadog-ec2-instrumenter/`. Because an IAM path cannot be edited after creation, the path cannot be silently changed. On-instance command results appear in the Systems Manager Run Command history. Lambda configuration changes appear as `UpdateFunctionConfiguration` events attributed to your AWS integration role.

### How the API key is handled on EC2

The API key is stored in your own Secrets Manager, encrypted at rest. Only the secret's Amazon Resource Name (ARN) is passed in the SSM command; the key itself never appears in command parameters or in CloudTrail. The instance reads the secret with its own IAM role, restricted to a single path. Datadog stores only a reference to the key internally, not the key itself.

### How Lambda telemetry is authenticated

Lambda instrumentation stores no Datadog credential in your account. The Datadog extension authenticates with the function's AWS execution identity through [Workload Identity Federation][5], using the `DD_ORG_UUID` and `DD_SITE` values Datadog sets on the function. No Datadog API key, secret ARN, or KMS-encrypted key is written into the function's configuration.

For that authentication to succeed, Datadog authorizes the function's execution role to send telemetry to your Datadog organization. Datadog sets up this authorization before it updates a function, and matches the execution role exactly rather than by a broader pattern.

Because a single execution role is often shared across functions, Datadog creates these mappings but does not remove them on uninstall. Removing a mapping for a shared role could break another function that still depends on it.

### Who can change instrumentation

- **In AWS**: Access is governed by your own IAM policies. Removing the cross-account permissions stops Datadog immediately.
- **In Datadog**: Viewing instrumentation rules requires the **Hosts Read** permission. Creating, editing, or deleting rules requires the **Agent Install** permission. Rule changes are rate-limited.

### Guardrails

- Datadog never removes instrumentation it did not install.
- Datadog tracks which resources it instrumented, so it cleans up only its own work.
- On EC2, when some regions cannot be listed, Datadog skips cleanup for that pass rather than risk uninstalling in bulk.
- On Lambda, Datadog restores a function from the configuration it recorded before instrumenting it, so an uninstall reverses exactly the change Datadog made.
- A failure is scoped to the individual resource. One throttled or invalid resource does not cause Datadog to reprocess resources that already succeeded.

## How Datadog maintains instrumentation

### Continuous reconciliation

Datadog continuously maintains the state you define on the covered resources:

- A full reconciliation runs hourly per AWS account. Reconciliation restores instrumentation if it goes missing, retries anything that failed, and cleans up resources that no longer exist.
- Change events forwarded from your account let Datadog react to covered resources within minutes, instead of waiting for the hourly pass. For EC2, these come from the CloudFormation stack's EventBridge rule. For Lambda, the `datadog-agent-resource-update-rule-lambda` rule forwards function create, configuration update, tag, and untag events.
- On EC2, already-installed instances are re-verified about once per day rather than every hour, to avoid unnecessary activity.
- On Lambda, the hourly scan checks each covered function against the layer versions Datadog deploys, and does per-function work only for functions that need a change. A fleet already on current layer versions produces no per-function activity, so Datadog makes no unnecessary calls to the Lambda API in your account.

### How Lambda functions pick up new layer versions

Datadog resolves layer versions from a pinned set on every reconciliation, rather than from whatever the function was first instrumented with. When Datadog releases new layer versions and that pinned set advances, the next reconciliation sees that a covered function's layers no longer match the desired versions and updates it. Your functions therefore move forward with Datadog's layer releases without any action from you.

A Lambda configuration update that is still in progress is left alone and retried shortly afterward, so Datadog does not race a change already being applied.

### Rule coverage is fixed at save time

A rule covers the set of resources it resolved to when you saved it, and Datadog does not instrument anything outside that set. This applies to both workloads: EC2 instances launched later, and Lambda functions created later, are not picked up automatically. To cover them, update the rule, which re-resolves your query against your current fleet.

Change events are what keeps the covered set correct, not what expands it. A forwarded event causes Datadog to re-examine a resource the rule already covers.

### What happens when you edit a rule

Datadog re-resolves your query and compares it against the previous set. Resources no longer covered have instrumentation removed. Newly covered resources are instrumented. Deleting a rule removes instrumentation from everything the rule covered.

### Terminated, stopped, or deleted resources

On EC2, Datadog detects terminated instances on the next hourly pass and cleans up the IAM resources it created for them. Datadog leaves stopped instances alone until they return. On Lambda, a deleted function drops out of reconciliation on the next pass.

### When instrumentation fails

Datadog retries with an increasing delay (1 hour, then 2 hours, up to once per day) and continues retrying. Problems that need your action, such as a missing permission or a function at the layer limit, are reported and stop being retried indefinitely. Missing-permission problems appear as an issue on the **AWS integration tile** and on the Fleet install page.

<div class="alert alert-warning">
When someone removes instrumentation from a covered resource by hand, the next reconciliation restores it. The rule is the source of truth. To stop coverage, change the rule.
</div>

## Uninstall

To uninstall, remove resources from a rule, edit the rule's query, or delete the rule.

- **EC2**: Uninstalling removes the Datadog Agent, the `/etc/datadog-agent` and `/opt/datadog-agent` directories on Linux (or performs an MSI uninstall on Windows), and any IAM role or instance profile Datadog created for that instance.
- **Lambda**: Uninstalling removes the Datadog layers Datadog added and restores the environment variables and handler the function had beforehand. Datadog checks that record against the function's current configuration first, so it does not remove a layer or variable it did not add. The telemetry authorization for the execution role is left in place, because the role may be shared with other functions.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/guide/aws-agent-installation/
[2]: https://docs.datadoghq.com/integrations/guide/aws-agent-installation/#prerequisites
[3]: https://docs.datadoghq.com/integrations/guide/aws-agent-installation/#aws-lambda-functions
[4]: https://docs.datadoghq.com/serverless/aws_lambda/remote_instrumentation/
[5]: https://docs.datadoghq.com/account_management/workload_identity_federation/
[6]: https://docs.datadoghq.com/integrations/guide/aws-agent-installation/#choose-between-this-guide-and-remote-instrumentation
