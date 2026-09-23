---
title: How Datadog Instrumentation through the AWS Integration Works
description: "Understand how Datadog instruments Amazon EC2 instances, AWS Lambda functions, and Amazon EKS clusters through the AWS integration: the resources created, the instrumentation mechanism, the security model, and how Datadog keeps instrumentation in place."
private: true
further_reading:
- link: "https://docs.datadoghq.com/integrations/guide/aws-agent-installation/"
  tag: "Documentation"
  text: "Install Datadog Instrumentation through the AWS Integration"
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

This page covers Amazon EC2 instances, AWS Lambda functions, and Amazon EKS clusters.

Datadog also offers [remote instrumentation][4] for Lambda functions. Remote instrumentation deploys an instrumenter function into your own account rather than making the changes from Datadog. For a comparison of the two, see [Choose between the AWS integration and remote instrumentation][6] in the setup guide.

## AWS resources that Datadog creates

### Created once, by the CloudFormation stack

The CloudFormation template you launch creates the following resources one time, in a single stack:

| Resource | Name | Purpose |
|---|---|---|
| EventBridge connection | `datadog-agent-resource-update-intake-connection` | Holds your Datadog API and application keys so events can be sent to Datadog |
| EventBridge API destination | `datadog-agent-resource-update-intake-destination` | Sends resource change events to Datadog |
| EventBridge rule | `datadog-agent-resource-update-rule-ec2` | Notifies Datadog when a covered instance changes. Created when you select the EC2 workload |
| EventBridge rule | `datadog-agent-resource-update-rule-lambda` | Notifies Datadog when a covered function changes. Created when you select the Lambda workload |
| EventBridge rule | `datadog-agent-resource-update-rule-eks` | Notifies Datadog when a cluster changes. Created when you select the EKS workload |
| IAM role | auto-named | Lets EventBridge send events to the `datadog-agent-resource-update-intake-destination` API destination |
| IAM role | `datadog-eventbridge-cross-region-role` | Lets other regions forward events to your primary region |

The stack also attaches the IAM permissions for the workloads you selected to your AWS integration role. If you select only the Lambda workload, the stack grants no EC2 or EKS permissions.

When you select EKS, the stack also creates:

| Resource | Name | Purpose |
|---|---|---|
| AWS Marketplace subscription function and IAM role | auto-named | Accepts the one-time, account-level agreement for the Datadog Operator EKS add-on |
| IAM permissions boundary | `datadog-instrumenter-eks-ascp-boundary` under `/datadog/instrumenter-boundaries/` | Limits the permissions available to the per-cluster credential synchronization role |

### Created as needed, for EC2 instances

| Resource | Name | Purpose |
|---|---|---|
| Systems Manager document | `datadog-ec2-instrumenter` | The install and uninstall script. One document per account. |
| Secrets Manager secret | `/datadog/ec2-instrumenter/<ACCOUNT_ID>/<INSTANCE_ID>` | Holds the Datadog API key so the instance can fetch it itself. Encrypted with the default AWS-managed key. |
| IAM role and instance profile | `datadog-ssm-<INSTANCE_ID>` and `datadog-ssm-profile-<INSTANCE_ID>` | Created only when the instance has no instance profile, under the IAM path `/datadog-ec2-instrumenter/` so they are identifiable. Receives the AWS-managed `AmazonSSMManagedInstanceCore` policy so Systems Manager can reach the instance. |
| Inline IAM policy | `datadog-ec2-instrumenter-secrets` | Added to the instance's role. Grants read access only to secrets under `/datadog/ec2-instrumenter/`. |
| EventBridge rules in your other regions | Same names as the primary-region resources | Forward change events to your primary region. |

Datadog does not create S3 buckets, event buses, log groups, or SSM parameters, and does not tag your instances.

### No additional resources created for Lambda functions

Apart from the Lambda EventBridge rule that the CloudFormation stack creates, Datadog creates no AWS resources for Lambda instrumentation. The only other change is to the configuration of the functions your rule covers. Datadog does not create secrets, IAM roles, or SSM documents for Lambda, and does not tag your functions.

### Created as needed, for EKS clusters

Datadog creates the following AWS resources during instrumentation:

| Resource | Name | Purpose |
|---|---|---|
| EKS add-on | `datadog_operator` | Runs the Datadog Operator, which creates and maintains the Agent resources inside the cluster |
| EKS add-ons | `aws-secrets-store-csi-driver-provider` and `eks-pod-identity-agent` | Synchronize the Datadog credentials from AWS Secrets Manager into the cluster. Datadog creates these add-ons only when they are absent. |
| Secrets Manager secret | `/datadog/eks-instrumenter/<ACCOUNT_ID>/<CLUSTER_NAME>` | Holds the Datadog API key for the cluster |
| Secrets Manager secret | `/datadog/eks-instrumenter/<ACCOUNT_ID>/<CLUSTER_NAME>/application-key` | Holds the cluster-specific Datadog application key |
| IAM role and inline policy | `dd-eks-ascp-sync-<CLUSTER_NAME>-<HASH>` and `dd-eks-instrumenter-ascp-sync-policy` | Let the credential synchronization service account read only the two cluster-specific secrets |
| EKS Pod Identity association | `datadog-agent/datadog-ascp-sync` | Associates the credential synchronization service account with its scoped IAM role |

Datadog also creates one Datadog application key per cluster with only the **Remote Configuration Read** permission.

The Datadog Operator creates the following Kubernetes resources inside the cluster:

| Resource | Name | Purpose |
|---|---|---|
| Kubernetes Secret | `datadog-agent/datadog-managed-secret` | Makes the API and application keys available to the managed Agent resources |
| `DatadogAgent` custom resource | `datadog-agent/datadog-agent` | Defines the Agent configuration that the Datadog Operator maintains |

Datadog does not call the Kubernetes API during instrumentation; the Datadog Operator creates and removes the managed resources inside the cluster.

## How instrumentation works

After you save an instrumentation rule, Datadog evaluates the query you defined against your account to determine the covered resources, then runs the following sequence against each one. For prerequisites, including supported platforms and runtimes, see [Prerequisites][2] in the setup guide.

### On Amazon EC2

1. Datadog checks that each covered instance is running, on a supported platform, and reachable by AWS Systems Manager.
2. When an instance has no IAM instance profile, Datadog creates one so Systems Manager can reach it. When an instance already has one, Datadog adds the SSM policy and the scoped secret-read policy to the existing role.
3. Datadog checks whether an Agent is already present. When an Agent is present that Datadog did not install, Datadog stops and leaves the instance alone.
4. Datadog calls `ssm:SendCommand`, one instance at a time, running the `datadog-ec2-instrumenter` document.
5. On the instance, the document fetches the API key from Secrets Manager using the instance's own IAM role. It then runs Datadog's standard Agent installer (`install_script_agent7.sh` on Linux, or the standard MSI on Windows) with log collection and APM host instrumentation enabled.

Datadog does not reboot or restart your instances. The only service Datadog touches is the Datadog Agent itself, which is started on install and stopped on uninstall. Your applications and other services are untouched.

### On AWS Lambda

Lambda instrumentation runs entirely from Datadog. Datadog does not deploy any compute, such as an instrumenter function, into your account to instrument your functions.

1. Datadog reads the function's current configuration and tags, and checks that it meets the [Lambda prerequisites][3].
2. Datadog checks whether the function is already instrumented. Datadog skips a function that carries Datadog layers, a Datadog handler, or Datadog environment variables that Datadog did not apply. Datadog also skips a function managed by [remote instrumentation][4], and reports which of the two reasons applies.
3. Datadog resolves the Datadog layer versions for the function's runtime, architecture, region, and AWS partition. Datadog applies layer versions it has validated rather than whatever is newest at that moment, so an installation is reproducible.
4. Datadog computes the complete desired configuration and records exactly what it is about to change, before changing anything.
5. Datadog authorizes the function's execution role to send telemetry to your Datadog organization. See the [How Lambda telemetry is authenticated](#how-lambda-telemetry-is-authenticated) section.
6. Datadog calls `lambda:UpdateFunctionConfiguration` once, submitting the complete layer list and environment map. Datadog marks the change as applied only after AWS reports success.

A Lambda update is a replace-style operation: the submitted layer list and environment map become the new configuration. Datadog therefore computes the full desired state rather than appending to it, which preserves your existing layers and environment variables. The update carries the function's revision ID, so a change made in your account between Datadog's read and write causes the update to fail instead of overwriting the change.

### What Datadog changes on a function

| Change | Applies to |
|---|---|
| Adds the Datadog extension layer (`Datadog-Extension` or `Datadog-Extension-ARM`) | All supported runtimes |
| Adds the matching Datadog tracing layer | Node.js, Python, Ruby, Java, and .NET |
| Sets `DD_SITE` and `DD_ORG_UUID` | All supported runtimes |
| Redirects the handler to the Datadog handler and moves the original into `DD_LAMBDA_HANDLER` | Node.js and Python |
| Sets `AWS_LAMBDA_EXEC_WRAPPER` to `/opt/datadog_wrapper` | Java and .NET |

Datadog does not change function code, memory size, timeout, VPC configuration, concurrency, or any other function setting.

### On Amazon EKS

1. Datadog confirms that the cluster is eligible and that the AWS integration role has the required permissions.
2. Datadog installs or reuses the AWS Secrets Store CSI Driver Provider and EKS Pod Identity Agent add-ons, then creates the cluster-specific secrets, IAM role, and Pod Identity association used for credential synchronization.
3. Datadog creates the Datadog Operator EKS add-on in the `datadog-agent` namespace. The add-on synchronizes the API and application keys into the `datadog-managed-secret` Kubernetes Secret.
4. Datadog updates the add-on configuration to request Agent installation. The Operator creates the `DatadogAgent` resource and its dependent resources inside the cluster.
5. The Operator reports the result of the requested lifecycle operation to Datadog. Datadog acknowledges that result in the add-on configuration before marking instrumentation active.

Datadog does not call the Kubernetes API or require Kubernetes credentials. All control-plane operations from Datadog use AWS APIs; the Operator handles the in-cluster resources.

### Resources that Datadog excludes

On EC2, Datadog excludes:

- Instances that are not running
- EKS worker nodes
- ECS container instances
- Instances that already have a non-Datadog-installed Agent

On Lambda, Datadog excludes:

- Container image functions and functions on an unsupported runtime or architecture
- Functions outside the commercial `aws` partition
- Lambda@Edge replicas and the functions they replicate
- Functions already instrumented by you or by remote instrumentation
- Functions that already set `AWS_LAMBDA_EXEC_WRAPPER` to a non-Datadog wrapper
- Functions where adding the Datadog layers would exceed the AWS five-layer limit

On EKS, Datadog excludes:

- Clusters that are not `ACTIVE`
- Clusters with EKS Fargate workloads
- Clusters without at least one Linux node
- Clusters with an existing `datadog_operator` add-on that Datadog did not install

## Security, auditing, and change control

### How Datadog gets access

Datadog uses the same cross-account IAM role as the AWS integration, authenticated with an external ID. Datadog receives short-lived, temporary credentials, and each type of work (reading EC2, managing IAM, sending commands, updating functions) uses a separately scoped credential session rather than one broad session. Datadog does not store any long-lived AWS keys.

For EKS, the additional permissions let Datadog inspect clusters and manage the EKS add-ons, secrets, IAM role, and Pod Identity association used for instrumentation. Datadog does not store Kubernetes credentials.

### Auditing Datadog's actions

Every action Datadog takes is a standard AWS API call, so all actions appear in AWS CloudTrail. Resources created for EC2 are identifiable by name: resources are prefixed with `datadog-`, secrets are stored under `/datadog/ec2-instrumenter/`, and IAM roles use the immutable path `/datadog-ec2-instrumenter/`. Because an IAM path cannot be edited after creation, the path cannot be silently changed. On-instance command results appear in the Systems Manager Run Command history. Lambda configuration changes appear as `UpdateFunctionConfiguration` events attributed to your AWS integration role.

EKS resources are identifiable by their names and tags: secrets use the `/datadog/eks-instrumenter/` prefix, the credential synchronization role uses the `dd-eks-ascp-sync-` prefix, and the Datadog Operator add-on includes tags that identify the instrumentation and cluster.

### How the API key is handled on EC2

The API key is stored in your own Secrets Manager, encrypted at rest. Only the secret's Amazon Resource Name (ARN) is passed in the SSM command; the key itself never appears in command parameters or in CloudTrail. The instance reads the secret with its own IAM role, restricted to a single path. Datadog stores only a reference to the key internally, not the key itself.

### How Lambda telemetry is authenticated

Lambda instrumentation stores no Datadog credential in your account. The Datadog extension authenticates with the function's AWS execution identity through [Workload Identity Federation][5], using the `DD_ORG_UUID` and `DD_SITE` values Datadog sets on the function. No Datadog API key, secret ARN, or KMS-encrypted key is written into the function's configuration.

For that authentication to succeed, Datadog authorizes the function's execution role to send telemetry to your Datadog organization. Datadog sets up this authorization before it updates a function and matches the execution role exactly, rather than by a broader pattern.

Because a single execution role is often shared across functions, Datadog creates these authorizations but does not remove them on uninstall. Removing the authorization for a shared role could break another function that still depends on it.

### How the API and application keys are handled on EKS

The API key and cluster-specific application key are stored in separate AWS Secrets Manager secrets encrypted at rest. The application key has only the **Remote Configuration Read** permission. Only the secret identifiers—not the key values—appear in the EKS add-on configuration.

The credential synchronization service account assumes a dedicated IAM role through EKS Pod Identity. Its inline policy can read only the two secrets for that cluster. The AWS Secrets Store CSI Driver Provider synchronizes their values into `datadog-agent/datadog-managed-secret` for the Operator-managed Agent resources.

### Who can change instrumentation

- **In AWS**: Access is governed by your own IAM policies. Removing the cross-account permissions stops Datadog immediately.
- **In Datadog**: Viewing instrumentation rules requires the **Hosts Read** permission. Creating, editing, or deleting rules requires the **Agent Install** permission. Rule changes are rate-limited.

### Guardrails

- Datadog never removes instrumentation it did not install.
- Datadog tracks which resources it instrumented, so it cleans up only its own work.
- On EC2, when some regions cannot be listed, Datadog skips cleanup rather than risk removing instrumentation in bulk.
- On Lambda, Datadog restores a function from the configuration it recorded before instrumenting it, so an uninstall reverses exactly the change Datadog made.
- A failure is scoped to the individual resource. One resource that fails does not affect resources that are already instrumented.

For EKS, the following guardrails also apply:

- Datadog does not replace or adopt an existing Datadog Operator add-on.
- Datadog reuses compatible AWS Secrets Store CSI Driver Provider and EKS Pod Identity Agent add-ons without modifying them, and leaves them installed during uninstall.
- Datadog does not replace an existing Pod Identity association for the `datadog-ascp-sync` service account. It reuses one only when it matches the association Datadog previously created.
- Datadog removes only the Datadog Operator add-on, IAM role, and Pod Identity association that match the recorded instrumentation.

## How Datadog maintains instrumentation

### Continuous reconciliation

Datadog continuously maintains the state you define on the covered resources:

- Datadog re-checks the covered resources on a regular schedule, restoring instrumentation that goes missing, retrying anything that fails, and cleaning up resources that no longer exist.
- Change events forwarded from your account let Datadog react within minutes, rather than waiting for the next scheduled check. Datadog reacts both to a covered resource that changed and to a newly created resource that a query-based rule matches:
  - **EC2**: Events come from the CloudFormation stack's EventBridge rule.
  - **Lambda**: The `datadog-agent-resource-update-rule-lambda` rule forwards function create, configuration update, tag, and untag events.
  - **EKS**: The `datadog-agent-resource-update-rule-eks` rule forwards cluster creation, configuration, version, and tag changes.
- On EC2, instances that already have the Agent are re-verified less frequently, to avoid unnecessary activity.
- On Lambda, Datadog calls the Lambda API in your account only for functions that need a change. A fleet already on current layer versions produces no per-function activity.

For EKS, a full reconciliation runs hourly per AWS account, retrying incomplete instrumentation and removing instrumentation from clusters that are no longer covered. The Datadog Operator continuously reconciles the Agent resources inside each covered cluster.

### How Lambda functions pick up new layer versions

Datadog compares a covered function's layers against the versions Datadog deploys, rather than against the versions applied at first instrumentation. When Datadog releases new layer versions, covered functions are updated to them. Your functions therefore move forward with Datadog's layer releases without any action from you.

A Lambda configuration update that is still in progress is left alone and retried shortly afterward, so Datadog does not race a change already being applied.

### How a rule determines coverage

A rule is not a one-time selection. Datadog re-evaluates its query over time and reacts to the change events forwarded from your account. Datadog instruments a resource as soon as it detects a match, in either of the following cases:

- **It was created after you saved the rule.** Resource creation events, including `RunInstances` and `CreateFunction`, are forwarded, so a new matching EC2 instance, Lambda function, or EKS cluster is picked up within minutes.
- **It already existed and started matching.** Tagging a resource to bring it into scope is the common case, so tag events are forwarded too: `CreateTags` and `DeleteTags` on EC2, `TagResource` and `UntagResource` on Lambda, and cluster tag changes on EKS. This supports writing a rule such as `@Tags:datadog:true` first, then tagging resources into it as you go.

A rule you built by selecting specific resources holds a query naming those resources, so nothing else ever matches it.

For guidance on writing a query, including when to match a fixed tag, see [Choose how your rule matches resources][7] in the setup guide.

### What happens when coverage changes

Datadog re-evaluates the rule and compares the covered resources against the previous set. Resources no longer covered have instrumentation removed. Newly covered resources are instrumented. Deleting a rule removes instrumentation from everything the rule covered.

<div class="alert alert-warning">
Datadog removes instrumentation when a resource no longer matches the rule, whether the change comes from an edit in Datadog or from retagging or reconfiguring the resource in AWS. Keep this behavior in mind when you write a rule based on tags that other teams can change.
</div>

### Terminated, stopped, or deleted resources

On EC2, Datadog detects terminated instances and cleans up the IAM resources it created for them. Datadog leaves stopped instances alone until they return. On Lambda, a deleted function drops out of coverage.

### When instrumentation fails

For EC2 and Lambda, Datadog retries automatically, with an increasing delay between attempts. Problems that need your action, such as a missing permission or a function at the layer limit, are reported and no longer retried until you resolve them.

For EKS, Datadog retries instrumentation during later reconciliations.

Missing-permission problems appear as an issue on the **AWS integration tile** and on the Fleet install page.

<div class="alert alert-warning">
When someone removes instrumentation from a covered resource by hand, Datadog restores it. The rule is the source of truth. To stop coverage, change the rule.
</div>

## Remove Datadog instrumentation

To remove instrumentation, remove resources from a rule, edit the rule's query, or delete the rule.

- **EC2**: Datadog removes the Datadog Agent, the `/etc/datadog-agent` and `/opt/datadog-agent` directories on Linux (or performs an MSI uninstall on Windows), and any IAM role or instance profile Datadog created for each instance.
- **Lambda**: Datadog removes the layers it added and restores the environment variables and handler the function had beforehand. Datadog first compares its record of the original configuration against the function's current configuration, so it does not remove a layer or variable it did not add. The telemetry authorization for the execution role is left in place, because the role may be shared with other functions.

### Remove EKS instrumentation

Datadog performs cleanup in this order:

1. The Datadog Operator deletes the `DatadogAgent` custom resource it created and its dependent Kubernetes resources.
1. After the Operator reports that cleanup is complete, Datadog deletes the `datadog_operator` EKS add-on that it installed.
1. Datadog removes the Pod Identity association and scoped IAM role that it created.
1. The AWS Secrets Store CSI Driver Provider and EKS Pod Identity Agent add-ons remain installed so you can use them with other workloads.
1. Datadog preserves the Datadog API and application keys and their cluster-specific secrets in AWS Secrets Manager for safe reuse if the cluster is added to a rule again.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/integrations/guide/aws-agent-installation/
[2]: https://docs.datadoghq.com/integrations/guide/aws-agent-installation/#prerequisites
[3]: https://docs.datadoghq.com/integrations/guide/aws-agent-installation/#aws-lambda-functions
[4]: https://docs.datadoghq.com/serverless/aws_lambda/remote_instrumentation/
[5]: https://docs.datadoghq.com/account_management/workload_identity_federation/
[6]: https://docs.datadoghq.com/integrations/guide/aws-agent-installation/#choose-between-the-aws-integration-and-remote-instrumentation
[7]: https://docs.datadoghq.com/integrations/guide/aws-agent-installation/#choose-how-your-rule-matches-resources
