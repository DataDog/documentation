---
title: IaC Custom Rules
description: Create, test, and publish custom Infrastructure as Code Security rules with Rego.
algolia:
  tags: ['iac security', 'infrastructure as code', 'custom rule', 'rego']
---

Create custom security rules to enforce requirements specific to your organization.

Custom rules use [Rego][1], the policy language from Open Policy Agent (OPA), and run alongside default Datadog rules during IaC scans. The *rule* is the saved object (metadata, sample, description), while the *policy* is the Rego block evaluated in the editor.

Custom rules are available for these platforms:

- Ansible
- CI/CD (GitHub Actions)
- AWS CloudFormation
- Dockerfile
- Kubernetes
- Terraform

Creating, editing, or publishing custom rules requires the `appsec_vm_write` permission. For more information, see [Role Based Access Control][6]. For details about rule contract, parsed inputs, and platform-specific patterns, see the [IaC Custom Rule Reference][2].

There are two options for creating custom rules: cloning an existing rule or creating a rule from scratch.

## Clone an existing rule

Clone a default rule when you want to modify an existing check, evaluate the same resource type as an existing rule, or use shared Datadog Rego libraries for platform-specific parsing, resource naming, or source code locations.

1. On the IaC Rules page, find a default or custom rule for the same platform and resource type and select {{< ui >}}Clone{{< /ui >}} from the rule's actions menu.
1. Update the copied metadata, policy, sample file, and description.
1. Click {{< ui >}}Save as draft{{< /ui >}} to save the rule without publishing it, or click {{< ui >}}Save and publish{{< /ui >}} to publish the rule immediately.

   Draft rules don't run in scans. To publish a draft later, open it from the IaC Rules page and publish it.

By default, published rules run in subsequent IaC scans where the specified platform applies. To refine how rules are applied, see the [IaC Security configuration][5].

## Create a rule from scratch

Create a rule from scratch when you need a focused check and you understand the parsed structure for your platform. The editor provides a starter policy and sample file.

This example creates a Terraform rule that detects an `aws_s3_bucket_versioning` resource whose status is explicitly set to `Suspended`. The rule reports the insecure attribute and provides a suggested remediation.

The steps apply to any platform. Only the sample file and the Rego policy change.

### Name and configure the rule

1. On the IaC Rules page, click {{< ui >}}Create rule{{< /ui >}}.
1. Enter a rule name, then select the platform, category, and severity.

   You can optionally set **AWS** as the provider and specify a Common Weakness Enumeration (CWE) identifier.

### Add a sample file

The sample file is the input your policy runs against, so it must contain the misconfiguration you want to detect. For this rule, replace the starter sample under {{< ui >}}Test your policy{{< /ui >}} with:

```hcl
resource "aws_s3_bucket" "reports" {
  bucket = "example-reports-bucket"
}

resource "aws_s3_bucket_versioning" "reports" {
  bucket = aws_s3_bucket.reports.id

  versioning_configuration {
    status = "Suspended"
  }
}
```

Datadog parses Terraform resources under `input.document[i].resource`, grouped by resource type and resource label. The rule can select the versioning resource with:

```rego
some i, name
versioning := input.document[i].resource.aws_s3_bucket_versioning[name]
```

In this expression, `i` identifies the parsed document and `name` is the Terraform resource label, `reports`.

### Write the detection condition

The detection condition is the expression that must be true for the rule to report a finding. This rule produces a finding when the versioning status is `Suspended`:

```rego
versioning.versioning_configuration.status == "Suspended"
```

If the status field is missing, the rule doesn't report a finding. See [Parsed input][3] for details.

### Build the finding

The finding is what Datadog reports when the detection condition matches. It identifies which resource is affected, where it is in the source, and how to fix it. Assemble the pieces into a complete policy.

This example policy has four parts:

- Wraps the detection condition in a `DatadogPolicy` rule.
- Selects each `aws_s3_bucket_versioning` resource.
- Reports a finding only when the status is `Suspended`.
- Adds a `result` object with the four required fields, including a suggested remediation.

This policy also follows three general practices: a shared library for resource names, a precise `searchKey`, and a `replacement` remediation.

Under {{< ui >}}Rego policy{{< /ui >}}, replace the starter policy with:

```rego
package datadog

import data.generic.terraform as tf_lib

DatadogPolicy contains result if {
	some i, name
	versioning := input.document[i].resource.aws_s3_bucket_versioning[name]
	versioning.versioning_configuration.status == "Suspended"

	result := {
		"documentId": input.document[i].id,
		"resourceType": "aws_s3_bucket_versioning",
		"resourceName": tf_lib.resolve_s3_bucket_name(versioning, name),
		"searchKey": sprintf("aws_s3_bucket_versioning[%s].versioning_configuration.status", [name]),
		"remediation": json.marshal({
			"before": "Suspended",
			"after": "Enabled",
		}),
		"remediationType": "replacement",
	}
}
```

### Test the rule

1. Click {{< ui >}}Run{{< /ui >}}.
1. Confirm that the editor reports one finding on the `status` attribute.
1. Change `status` in the sample from `Suspended` to `Enabled`.
1. Click {{< ui >}}Run{{< /ui >}} and confirm that the policy reports no findings.
1. Restore `status` to `Suspended` and run the policy again before saving the example.

If the editor reports an error instead of an evaluation result, see [Validation][4].

### Describe the rule

Use the {{< ui >}}Say what's happening{{< /ui >}} field to provide a description and remediation advice, for example:

```markdown
## Description

Suspending S3 bucket versioning prevents new object versions from being created and reduces protection against accidental deletion or overwrite.

## Remediation

Set `versioning_configuration.status` to `Enabled`.
```

### Save the rule

- Click {{< ui >}}Save as draft{{< /ui >}} to save the rule without publishing it. Draft rules don't run in scans. To publish a draft later, open it from the IaC Rules page and publish it.
- Click {{< ui >}}Save and publish{{< /ui >}} to publish the rule immediately.

By default, published rules run in subsequent IaC scans where the specified platform applies. To refine how rules are applied, see the [IaC Security configuration][5].

## Rule revisions

Editing a rule creates a new revision. From the rule's details panel, you can:

- Review the rule's revision history.
- Compare any two revisions to see what changed.
- Restore an earlier revision to make it the rule's current state.

[1]: https://www.openpolicyagent.org/docs/policy-language
[2]: /security/code_security/iac_security/custom_rules/guide/
[3]: /security/code_security/iac_security/custom_rules/guide/#parsed-input
[4]: /security/code_security/iac_security/custom_rules/guide/#validation
[5]: /security/code_security/iac_security/configuration/#rule-configuration
[6]: /account_management/rbac/permissions/#cloud-security-platform
