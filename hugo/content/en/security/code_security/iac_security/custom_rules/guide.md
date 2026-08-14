---
title: Custom IaC Rule Reference
description: Reference the Rego contract, parsed inputs, shared libraries, finding fields, and testing practices for custom IaC rules.
further_reading:
  - link: "/security/code_security/iac_security/custom_rules/"
    tag: "Documentation"
    text: "Custom IaC rules"
  - link: "/security/code_security/iac_security/custom_rules/tutorial/"
    tag: "Documentation"
    text: "Create your first custom IaC rule"
  - link: "https://www.openpolicyagent.org/docs/latest/policy-language/"
    tag: "External Site"
    text: "Learn the Rego policy language"
---

This reference builds on [Create Your First Custom IaC Rule][1] and describes the rule contract, parsed inputs, and platform-specific patterns.

## Rule contract

Datadog evaluates custom rules as Rego v1. Every custom rule must:

1. Declare `package datadog`.
2. Define at least one partial set rule named `DatadogPolicy`.
3. Add one `result` object to `DatadogPolicy` for each violation.
4. Set every [required result field](#result-fields).

The following Terraform rule satisfies the contract:

```rego
package datadog

import data.generic.terraform as tf_lib

DatadogPolicy contains result if {
	some i, name
	resource := input.document[i].resource.aws_s3_bucket[name]
	resource.acl == "public-read"

	result := {
		"documentId": input.document[i].id,
		"resourceType": "aws_s3_bucket",
		"resourceName": tf_lib.resolve_s3_bucket_name(resource, name),
		"searchKey": sprintf("aws_s3_bucket[%s].acl", [name]),
	}
}
```

You can define multiple `DatadogPolicy` rules in the same policy. Each successful evaluation produces a separate finding.

## Validation

The editor checks more than Rego syntax. Before evaluating a sample, Datadog verifies that the policy:

- Uses `package datadog` and defines `DatadogPolicy`.
- Sets every required result field.
- Uses the correct number of arguments in `sprintf` calls.
- Compiles with the common and selected-platform libraries.
- Does not call restricted built-ins such as `http.send` or `opa.runtime`.

Fix all reported errors before interpreting an evaluation with no findings. Validation errors mean the policy did not run successfully.

## Parsed input

Datadog parses the sample file and exposes it to Rego under `input.document`. Each item contains an `id` and platform-specific fields. For example:

```rego
some i, document in input.document
```

For every platform, set `documentId` to the `id` of the parsed document that produced the finding. The platform determines how to traverse the rest of the document, not how to derive `documentId`.

Rego treats a reference to a missing field as undefined. An equality expression on an undefined field does not produce a finding. Use `object.get`, `not`, or helpers such as `data.generic.common.valid_key` when a rule must distinguish missing attributes from explicit values.

## Result fields

| Field | Required | Description |
| ----- | -------- | ----------- |
| `documentId` | Yes | The `id` of the parsed document that contains the violation. |
| `resourceType` | Yes | The actual type of resource being reported, such as `aws_s3_bucket`, `Pod`, or `AWS::S3::Bucket`. |
| `resourceName` | Yes | A useful name for the resource, such as a Terraform resource label, Kubernetes metadata name, or CloudFormation logical ID. |
| `searchKey` | Yes | A platform-specific locator for the source content to highlight. |
| `remediation` | No | A machine-applicable source change. Set it together with `remediationType`. |
| `remediationType` | No | The operation applied by the remediation. Set it together with `remediation`. |

The `## Remediation` section in the rule description is human-readable guidance. The optional result fields `remediation` and `remediationType` describe an automated source change.

### Remediation formats

Use `addition` to insert a missing attribute or block. Set `remediation` to the source text to insert:

```rego
"remediation": "versioning {\n\tenabled = true\n}",
"remediationType": "addition",
```

Use `replacement` to change an existing value. Encode the accepted current value and its replacement:

```rego
"remediation": json.marshal({
	"before": "Suspended",
	"after": "Enabled",
}),
"remediationType": "replacement",
```

Use `removal` to delete the content identified by the finding location. Set `remediation` to a short explanation of what is removed:

```rego
"remediation": "Remove the insecure resource.",
"remediationType": "removal",
```

If a rule cannot provide a reliable automated edit, omit both remediation fields and explain the manual fix in the rule description.

## Shared libraries

Custom rules can import Datadog's common and platform libraries:

```rego
import data.generic.common as common_lib
import data.generic.terraform as tf_lib
```

The following platform packages are available:

- `data.generic.ansible`
- `data.generic.cicd`
- `data.generic.cloudformation`
- `data.generic.dockerfile`
- `data.generic.k8s`
- `data.generic.terraform`

Shared libraries handle behavior that is difficult to reproduce with direct field access, including Ansible module aliases, GitHub Actions trigger forms, Kubernetes workload pod specifications, Terraform resource names, and CloudFormation references.

## Platform input patterns

The examples in this section show production-oriented patterns from default rules. The starter policies in the editor are intentionally smaller and may only handle the provided sample. When a default rule evaluates a similar resource, clone it to preserve its platform helpers, source location, and resource-correlation constraints.

### Ansible

Ansible modules can appear under short names, fully qualified collection names, and other aliases. Use the Ansible library to iterate over tasks and module variants:

```rego
import data.generic.ansible as ans_lib

canonical := "uri"

some id, task_index
task := ans_lib.tasks[id][task_index]
some variant in ans_lib.variants_for(canonical)
module := task[variant]
ans_lib.checkState(module)
```

Use the canonical module name as `resourceType`, `ans_lib.resource_name` for the resource name, and include the task and module variant in `searchKey`. Default rules often use a single format string such as <code>sprintf("name=&#123;&#123;%s&#125;&#125;.&#123;&#123;%s&#125;&#125;.url", [task.name, variant])</code>. The equivalent construction is:

```rego
"searchKey": sprintf("name=%s.%s.url", [
	concat("", ["{{", task.name, "}}"]),
	concat("", ["{{", variant, "}}"]),
])
```

### CI/CD

CI/CD custom rules evaluate GitHub Actions workflows. Workflow triggers can be strings, arrays, or objects, so use the CI/CD library rather than assuming one YAML shape:

```rego
import data.generic.cicd as cicd_lib

some document in input.document
cicd_lib.check_provider(document) == "github"
cicd_lib.has_dangerous_trigger(document)
```

Default rules use resource types such as `github_action`, `github_workflow`, `github_job`, and `github_step`. For step values, a literal locator such as <code>sprintf("uses=&#123;&#123;%s&#125;&#125;", [uses])</code> identifies the exact source line.

### AWS CloudFormation

CloudFormation resources are keyed by logical ID under `Resources`:

```rego
import data.generic.cloudformation as cf_lib

some document in input.document
some logical_id, resource in document.Resources
resource.Type == "AWS::S3::Bucket"
```

Use `resource.Type` as the resource type and `cf_lib.resource_name(resource, logical_id)` for the name. A missing property can be anchored to its containing block:

```rego
"searchKey": sprintf("Resources.%s.Properties", [logical_id])
```

### Dockerfile

Dockerfile instructions are grouped under `document.command` by build stage:

```rego
import data.generic.dockerfile as dockerfile_lib

some i, stage
instruction := input.document[i].command[stage][_]
instruction.Cmd == "add"
not dockerfile_lib.arrayContains(instruction.Value, {".tar", ".tar."})
```

Include the build stage and original instruction in the locator. Default rules often use <code>sprintf("FROM=&#123;&#123;%s&#125;&#125;.&#123;&#123;%s&#125;&#125;", [stage, instruction.Original])</code>:

```rego
"searchKey": sprintf("FROM=%s.%s", [
	concat("", ["{{", stage, "}}"]),
	concat("", ["{{", instruction.Original, "}}"]),
])
```

### Kubernetes

Kubernetes checks often apply to Pods and to pod specifications nested in workloads such as Deployments. Use `spec_info` to locate the effective pod specification:

```rego
import data.generic.k8s as k8s_lib

some document in input.document
spec_info := k8s_lib.spec_info(document)
some container in spec_info.spec.containers
container.securityContext.privileged == true
```

Include the workload name, pod-spec path, container name, and insecure field in `searchKey`. Default rules often use <code>sprintf("metadata.name=&#123;&#123;%s&#125;&#125;.%s.containers.name=&#123;&#123;%s&#125;&#125;.securityContext.privileged", [document.metadata.name, spec_info.path, container.name])</code>:

```rego
"searchKey": sprintf(
	"metadata.name=%s.%s.containers.name=%s.securityContext.privileged",
	[
		concat("", ["{{", document.metadata.name, "}}"]),
		spec_info.path,
		concat("", ["{{", container.name, "}}"]),
	],
)
```

Check `initContainers` separately when the same requirement applies to initialization containers.

### Terraform

Terraform resources are grouped by resource type and label:

```rego
some i, name
resource := input.document[i].resource.aws_s3_bucket[name]
```

Use the provider resource type as `resourceType`. Platform helpers can resolve names for resources that use fields such as `bucket`, `cluster_id`, or `name`:

```rego
import data.generic.terraform as tf_lib

"resourceName": tf_lib.resolve_s3_bucket_name(resource, name)
```

Terraform `searchKey` values usually start with the resource type and label:

```rego
"searchKey": sprintf("aws_s3_bucket[%s].acl", [name])
```

Provider versions may move configuration into separate resources. Use an equivalent default rule as a starting point when the check must cover multiple provider versions, modules, related resources, or Terraform plan JSON. A rule that checks only an explicit attribute value, such as `Suspended` versioning status, does not detect missing resources.

## Set the finding location

`searchKey` is a scanner-specific source locator, not a Rego path. Its format depends on the platform.

On several platforms, default rules wrap inserted values in double braces inside the format string, for example <code>sprintf("run=&#123;&#123;%s&#125;&#125;", [run])</code>. That produces locators such as `run={{checkout}}`. The platform examples above show equivalent `concat` or nested `sprintf` constructions you can paste into the editor.

Use the most precise stable location available:

- Point to the exact insecure attribute when it exists.
- For a missing attribute, point to the containing resource or properties block.
- Include identifying values with `={{...}}` when a file can contain repeated keys.
- Include workload, task, stage, job, or container identity when reporting a nested object.

Imprecise locators such as `"tasks"` or `"metadata.name"` can highlight the wrong line when a file contains multiple resources or containers. Use the editor's marker to verify the location against a representative sample.

## Correlate resources carefully

Some checks compare multiple resources, modules, jobs, or workloads. Avoid unconstrained joins across all of `input.document`, because they can associate unrelated resources and produce duplicate findings.

Preserve document, namespace, workflow, build-stage, and resource-reference constraints when adapting an existing rule.

## Test the rule

Test at least:

1. A configuration that must produce a finding.
2. A compliant configuration that must not produce a finding.
3. Missing and explicit values when defaults matter.
4. Multiple resources in one file.
5. Alternate syntax supported by the platform, such as Ansible module aliases or GitHub Actions trigger forms.
6. Related resources in separate scopes when the rule performs correlation.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/iac_security/custom_rules/tutorial/
