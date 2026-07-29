---
description: Learn how to write a custom IaC Security rule from scratch.
title: IaC Security Custom Rule Creation Tutorial
---

This tutorial shows how to write a custom rule that flags a Terraform S3 bucket that doesn't have versioning enabled.

Here's the Terraform this rule detects:

```hcl
resource "aws_s3_bucket" "reports" {
  bucket = "example-reports-bucket"
}

resource "aws_s3_bucket_versioning" "reports" {
  bucket = aws_s3_bucket.reports.id
  versioning_configuration {
    status = "Disabled"
  }
}
```

## Step 1: Identify the resource to check

The rule looks at `aws_s3_bucket_versioning` resources, since that's where the `status` attribute lives.

```rego
some i, name
versioning := input.document[i].resource.aws_s3_bucket_versioning[name]
```

`i` indexes the parsed document the resource came from, and `name` is the Terraform resource name (`reports` in the example).

## Step 2: Write the violation condition

A bucket is non-compliant when `status` is anything other than `"Enabled"`:

```rego
versioning.versioning_configuration.status != "Enabled"
```

## Step 3: Build the result

Combine the resource lookup and the condition into a single `DatadogPolicy` rule, and build a result object with the required fields:

```rego
package datadog

DatadogPolicy contains result if {
	some i, name
	versioning := input.document[i].resource.aws_s3_bucket_versioning[name]
	versioning.versioning_configuration.status != "Enabled"

	result := {
		"documentId": input.document[i].id,
		"resourceType": "aws_s3_bucket_versioning",
		"resourceName": name,
		"searchKey": sprintf("aws_s3_bucket_versioning[%s].versioning_configuration.status", [name]),
		"remediation": "versioning_configuration { status = \"Enabled\" }",
		"remediationType": "replacement",
	}
}
```

## Step 4: Test the rule

In [Detection Coverage][1], add the Terraform snippet from this tutorial as a test file and confirm the rule reports a finding on the `aws_s3_bucket_versioning.reports` resource. Then change `status` to `"Enabled"` in the same snippet and confirm the rule reports no findings.

## Step 5: Save and enable the rule

Set a severity and category, add a description explaining the misconfiguration and how to fix it, and save the rule. After you save the rule, it runs alongside default rules on every subsequent scan of repositories where IaC Security is enabled.

## Next steps

For the full list of fields a rule result can set, and details on iterating over documents and resources, see [IaC Security Custom Rules][2].

[1]: https://app.datadoghq.com/security/code-security/detection-coverage/iac
[2]: /security/code_security/iac_security/custom_rules/
