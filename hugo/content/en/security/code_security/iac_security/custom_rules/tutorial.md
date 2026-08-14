---
title: Create Your First Custom IaC Rule
description: Create and test a custom Terraform rule that detects explicitly suspended S3 bucket versioning.
further_reading:
  - link: "/security/code_security/iac_security/custom_rules/"
    tag: "Documentation"
    text: "Custom IaC rules"
  - link: "/security/code_security/iac_security/custom_rules/guide/"
    tag: "Documentation"
    text: "Custom IaC rule reference"
  - link: "/security/code_security/iac_security/iac_rules/"
    tag: "Documentation"
    text: "Explore IaC Security rules"
---

## Overview

This tutorial creates a Terraform rule that detects an `aws_s3_bucket_versioning` resource whose status is explicitly set to `Suspended`. The rule reports the insecure attribute and provides a suggested remediation.

## Create the rule

1. Navigate to the [IaC Rules][1] page.
2. Click {{< ui >}}Create rule{{< /ui >}}.
3. Enter a rule name, such as `S3 bucket versioning is suspended`.
4. Select **Terraform** as the platform.
5. Select a category and severity. You can also set **AWS** as the provider and specify a CWE.

## Add a sample file

Under {{< ui >}}Test your policy{{< /ui >}}, replace the starter sample with:

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

## Write the detection condition

The rule produces a finding when the versioning status is `Suspended`:

```rego
versioning.versioning_configuration.status == "Suspended"
```

If the status field is missing, the rule does not report a finding. See [Parsed input][5] for details.

## Build the finding

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

The policy:

- Selects each `aws_s3_bucket_versioning` resource.
- Produces a finding only when the status is `Suspended`.
- Uses the Terraform shared library to derive a useful resource name.
- Points `searchKey` to the exact insecure attribute.
- Encodes the existing and replacement values for a suggested remediation.

## Test the rule

1. Click {{< ui >}}Run{{< /ui >}}.
2. Confirm that the editor reports one finding on the `status` attribute.
3. Change `status` in the sample from `Suspended` to `Enabled`.
4. Click {{< ui >}}Run{{< /ui >}} and confirm that the policy reports no findings.
5. Restore `status` to `Suspended` and run the policy again before saving the example.

If the editor reports an error instead of an evaluation result, see [Validation][2].

## Describe and save the rule

Under {{< ui >}}Say what's happening{{< /ui >}}, add:

```markdown
## Description

Suspending S3 bucket versioning prevents new object versions from being created and reduces protection against accidental deletion or overwrite.

## Remediation

Set `versioning_configuration.status` to `Enabled`.
```

Click {{< ui >}}Save as draft{{< /ui >}} to review the rule, or click {{< ui >}}Save and publish{{< /ui >}} to enable it for subsequent scans. For details about drafts, publishing, and revisions, see [Custom IaC Rules][3].

## Use the published rule

A published rule runs in subsequent IaC scans where its platform applies. To limit scans to specific rule IDs or exclude a rule, use `use-rules` or `ignore-rules` in the [IaC Security configuration][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/code-security/detection-coverage/iac
[2]: /security/code_security/iac_security/custom_rules/guide/#validation
[3]: /security/code_security/iac_security/custom_rules/#drafts-published-rules-and-revisions
[4]: /security/code_security/iac_security/configuration/#rule-configuration
[5]: /security/code_security/iac_security/custom_rules/guide/#parsed-input
