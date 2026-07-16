---
title: Write Custom IaC Rules
description: Write, test, and publish custom Infrastructure as Code Security rules with Rego.
algolia:
  tags: ['iac security', 'infrastructure as code', 'custom rule', 'rego']
further_reading:
  - link: "/security/code_security/iac_security/iac_rules/"
    tag: "Documentation"
    text: "Explore IaC Security rules"
  - link: "/security/code_security/iac_security/configuration/"
    tag: "Documentation"
    text: "Configure IaC Security"
  - link: "https://www.openpolicyagent.org/docs/latest/policy-language/"
    tag: "External Site"
    text: "Learn the Rego policy language"
---

## Overview

You can create custom Infrastructure as Code (IaC) Security rules to enforce requirements that are specific to your organization. Custom rules use [Rego][1], the policy language from Open Policy Agent (OPA), and run with the default rules during IaC scans.

Create a rule from scratch or clone a default rule as a starting point. Cloning is recommended when you want to modify an existing check or learn the resource structure for a particular platform.

## Create or clone a rule

To create a rule from scratch:

1. Navigate to the [IaC Rules][2] page.
2. Click {{< ui >}}Create rule{{< /ui >}}.
3. Under {{< ui >}}Identify your rule{{< /ui >}}, enter a rule name and select its platform, category, and severity. You can also specify a provider and CWE.
4. Under {{< ui >}}Write and test your policy{{< /ui >}}, write the Rego policy and test it against an IaC sample.
5. Under {{< ui >}}Say what's happening{{< /ui >}}, describe the finding and how to remediate it.
6. Click {{< ui >}}Save as draft{{< /ui >}}, or select {{< ui >}}Save and publish{{< /ui >}}.

To clone a rule:

1. On the [IaC Rules][2] page, find a default or custom rule for the same platform and resource type.
2. Select {{< ui >}}Clone{{< /ui >}} from the rule's actions menu.
3. Update the copied metadata, policy, and description.
4. Save the rule as a draft or publish it.

A draft rule does not run in scans. A published custom rule is active and runs in subsequent IaC scans. You can publish or unpublish a custom rule from its details panel.

## Understand the IaC rule input

Before evaluating a rule, Datadog parses each IaC file and organizes its resources by type under `input.resources`. A rule selects a resource bucket for its platform and evaluates each resource in that bucket:

```python
some resource in input.resources["aws_db_instance"]
```

Resource type names and fields vary by platform. For example, Terraform buckets use provider resource types such as `aws_db_instance`, while Kubernetes buckets include Kubernetes kinds and derived resources for pod specifications and containers.

The easiest way to find the appropriate resource type and fields is to clone a default rule that evaluates a similar resource. You can also test a policy against a representative file in the rule editor and adjust the policy based on the evaluation result.

Each indexed resource includes:

- The resource's authored configuration fields, which you can access directly in the policy.
- Scope and relationship information used to correlate related resources without combining resources from unrelated files, namespaces, clusters, workloads, or Docker build stages.

## Write a rule

An IaC rule belongs to the `datadog` package and adds a result to `DatadogPolicy` when it detects a misconfiguration.

The following rule reports an AWS database instance when `publicly_accessible` is set to `true`:

```python
package datadog

resource_type := "aws_db_instance"

DatadogPolicy contains result if {
    some resource in input.resources[resource_type]
    resource.publicly_accessible == true

    result := data.datadog.finding(resource, ["publicly_accessible"])
}
```

The rule has three main parts:

1. `resource_type` identifies the resource bucket to evaluate.
2. The expressions inside `DatadogPolicy` define the condition that produces a finding.
3. `data.datadog.finding(resource, path)` identifies the matched resource and the attribute responsible for the finding.

### Select resources

Select the narrowest resource bucket that contains the configuration you want to evaluate:

```python
some resource in input.resources[resource_type]
```

Selecting a typed bucket avoids walking raw parser documents and prevents the rule from evaluating unrelated resource types.

### Define the detection condition

Add Rego expressions that are true only for insecure configurations. If any expression is undefined or false, that evaluation does not produce a finding.

You can define helper rules to keep the detection logic readable:

```python
is_public(resource) if {
    resource.publicly_accessible == true
}

DatadogPolicy contains result if {
    some resource in input.resources[resource_type]
    is_public(resource)

    result := data.datadog.finding(resource, ["publicly_accessible"])
}
```

### Report the responsible attribute

Pass the matched resource and a path relative to that resource to `data.datadog.finding`:

```python
result := data.datadog.finding(resource, ["publicly_accessible"])
```

The path is an array. Use strings for object keys and integers for array indexes:

```python
["spec", "containers", 0, "securityContext", "privileged"]
```

Datadog combines this relative path with the resource's location in the source document and highlights the selected attribute in the finding. Structured paths also preserve the distinction between map keys that contain periods and nested keys.

For a missing attribute, you can pass the intended path. Datadog anchors the finding to the deepest part of that path that exists in the source. Use an empty path (`[]`) when there is no more specific attribute to highlight:

```python
result := data.datadog.finding(resource, [])
```

## Correlate resources

Some policies need to compare multiple resource types. Select each type from `input.resources`, then constrain the comparison with the indexed resources' scope or relationships.

For example, a policy that compares Kubernetes resources should preserve the appropriate cluster and namespace scope. Dockerfile policies should preserve source and build-stage boundaries, and CI/CD policies should preserve workflow and job boundaries.

Avoid joining every resource of one type with every resource of another type. An unconstrained join can produce duplicate findings or associate resources from different source files. Clone a default cross-resource rule for the same platform to see the scope and relationship fields available for that resource type.

## Test the rule

The rule editor validates Rego syntax as you type. To test the rule's behavior:

1. Select the platform before adding the sample. The platform determines how Datadog parses the sample.
2. In {{< ui >}}Test your policy{{< /ui >}}, enter a representative IaC file.
3. Click {{< ui >}}Run{{< /ui >}}.
4. Confirm that the editor reports a finding on the intended attribute.
5. Change the sample to a compliant configuration and run the policy again to confirm that it reports no findings.

Test missing attributes, nested values, multiple resources, and cross-resource configurations when they are relevant to the rule. For cross-resource policies, also test resources with the same names in separate scopes to ensure they are not incorrectly correlated.

## Describe the finding

In {{< ui >}}Say what's happening{{< /ui >}}, use Markdown to explain the risk and remediation. Use `## Description` and `## Remediation` headings so the content appears in the corresponding sections of the finding:

```markdown
## Description

Publicly accessible database instances can accept connections from the internet.

## Remediation

Set `publicly_accessible` to `false` and use a private network path to access the database.
```

## Find out more

Read the [Rego documentation][1] for information about rules, operators, iteration, functions, and comprehensions. You can also browse and clone [default IaC Security rules][2] for platform-specific examples.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.openpolicyagent.org/docs/latest/policy-language/
[2]: https://app.datadoghq.com/security/code-security/detection-coverage/iac
