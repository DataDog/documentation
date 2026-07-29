---
title: Infrastructure as Code (IaC) Security Custom Rules
description: Write custom Rego rules to detect misconfigurations in your infrastructure-as-code files.
further_reading:
  - link: "/security/code_security/iac_security/custom_rules/tutorial/"
    tag: "Documentation"
    text: "IaC Security Custom Rule Creation Tutorial"
  - link: "/security/code_security/iac_security/iac_rules/"
    tag: "Documentation"
    text: "IaC Security Rules"
  - link: "/security/code_security/iac_security/configuration/"
    tag: "Documentation"
    text: "Configure IaC Security"
---

[IaC Security][1] scans your infrastructure-as-code files using [Rego][2], an open source policy language from the Open Policy Agent (OPA) project. In addition to Datadog's default rules, you can write your own custom rules to detect misconfigurations specific to your organization.

## Where to write custom rules

Create and manage custom IaC Security rules from [Detection Coverage][3] in Datadog. Custom rules run alongside default rules during every scan, and their findings appear in the same [Code Security Vulnerabilities][4] page.

## The rule contract

Every IaC Security rule, whether default or custom, is a Rego module that follows the same contract:

- The module belongs to `package datadog`.
- The module defines a partial set rule named `DatadogPolicy` that contains one object per violation.
- Rego evaluates the rule against `input.document`, an array of the parsed infrastructure-as-code documents in the scanned file.

```rego
package datadog

DatadogPolicy contains result if {
	some i, name
	instance := input.document[i].resource.aws_instance[name]
	instance.associate_public_ip_address == true

	result := {
		"documentId": input.document[i].id,
		"resourceType": "aws_instance",
		"resourceName": name,
		"searchKey": sprintf("aws_instance[%s].associate_public_ip_address", [name]),
	}
}
```

This rule flags any Terraform `aws_instance` resource that sets `associate_public_ip_address` to `true`.

### Result fields

Each object your rule adds to `DatadogPolicy` becomes one finding. Use the following fields:

| Field | Required | Description |
|---|---|---|
| `documentId` | Yes | The identifier of the source document the violation belongs to. Use `input.document[i].id`. |
| `resourceType` | Yes | The type of resource that triggered the violation (for example, `aws_instance`). |
| `resourceName` | Yes | The name of the specific resource instance that triggered the violation. |
| `searchKey` | Yes | A string that locates the violation within the resource, used to attribute the finding to a line in the source file. |
| `remediation` | No | A suggested fix, shown in the finding's remediation panel. |
| `remediationType` | No | Either `addition` (the fix adds a missing attribute) or `replacement` (the fix changes an existing value). |

### Iterating over documents and resources

A file can contain more than one document, so rules iterate over `input.document` with an index (`i`). Reuse that same index when you build `documentId`.

Within a document, resources of a given type form a map keyed by resource name. Rules iterate with `some name` to check every instance:

```rego
some i, name
instance := input.document[i].resource.aws_instance[name]
```

## Testing your rule

Before saving a custom rule, test it against sample infrastructure-as-code snippets in Detection Coverage. Provide a snippet that should trigger the rule and confirm it produces the finding you expect. Then provide a compliant snippet and confirm it produces no findings.

## Next steps

Follow the [IaC Security Custom Rule Creation Tutorial][5] to write a complete rule from scratch. Or review the [default IaC Security rules][6] for more examples of what a rule can check.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/iac_security/
[2]: https://www.openpolicyagent.org/docs/latest/policy-language/
[3]: https://app.datadoghq.com/security/code-security/detection-coverage/iac
[4]: https://app.datadoghq.com/security/code-security/iac
[5]: /security/code_security/iac_security/custom_rules/tutorial/
[6]: /security/code_security/iac_security/iac_rules/
