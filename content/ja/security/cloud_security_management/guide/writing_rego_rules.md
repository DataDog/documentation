---
title: Writing Custom Rules with Rego
aliases:
  - /security_platform/cloud_security_management/guide/writing_rego_rules/
further_reading:
- link: /security/default_rules
  tag: Documentation
  text: Explore default Posture Management cloud configuration detection rules
- link: /security/cloud_security_management/misconfigurations/frameworks_and_benchmarks
  tag: Guide
  text: Learn about frameworks and industry benchmarks
is_beta: true
---

## Overview

Open Policy Agent (OPA) provides [Rego][1], an open source policy language with versatile resource inspection features for determining cloud security posture. In Datadog, you can write custom rules with Rego to control the security of your infrastructure. 

## The template module

Defining a rule starts with a Rego [policy][2], defined inside a [module][3]. CSM Misconfigurations uses a module template like the one below to simplify writing rules:

```python
package datadog

import data.datadog.output as dd_output

import future.keywords.contains
import future.keywords.if
import future.keywords.in

eval(resource_type) = "skip" if {
    # Logic that evaluates to true if the resource should be skipped
} else = "pass" {
    # Logic that evaluates to true if the resource is compliant
} else = "fail" {
    # Logic that evaluates to true if the resource is not compliant
}

# This part remains unchanged for all rules
results contains result if {
    some resource in input.resources[input.main_resource_type]
    result := dd_output.format(resource, eval(resource))
}

```

Take a close look at each part of this module to understand how it works.

### Import statements

The first line contains the declaration `package datadog`. A [package][4] groups Rego modules into a single namespace, allowing modules to be imported safely. Currently, importing user modules is not a feature of custom rules. All posture management rules are grouped under the `datadog` namespace. For your results to be returned properly, group your rules under the `package datadog` namespace. 

```python
import future.keywords.contains
import future.keywords.if
import future.keywords.in
```

The next three statements import the OPA-provided keywords [`contains`][5], [`if`][6], and [`in`][7]. These keywords allow defining rules with more expressive syntax to improve readability. **Note:** Importing all keywords with `import future.keywords` is [not recommended][8].

```python
import data.datadog.output as dd_output
```

The next line imports the Datadog helper method, which formats your results to the specifications of the Datadog posture management system. `datadog.output` is a Rego module with a format method that expects your resource as the first argument, and a string, `pass`, `fail`, or `skip` as the second argument, describing the outcome of the inspection of your resource.

### Rules

After the import statements comes the first rule in the template module:

```python
eval(resource) = "skip" if {
    resource.skip_me
} else = "pass" {
    resource.should_pass
} else = "fail" {
    true
}
```

The rule evaluates the resource, and provides the outcome as a string depending on the state of the resource. You can change the order of `pass`, `fail`, and `skip` according to your needs. The rule above has `fail` as a default, if `skip_me` and `should_pass` are false or nonexistent in your resource. Alternatively, you can make `pass` the default: 

```python
eval(resource) = "skip" if {
    resource.skip_me
} else = "fail" {
    resource.should_fail
} else = "pass" {
    true
}
```

### Results

The final section of the template module builds your set of results:

```python
# This part remains unchanged for all rules
results contains result if {
    some resource in input.resources[input.main_resource_type]
    result := dd_output.format(resource, eval(resource))
}
```

This section passes through all resources from the main resource type and evaluates them. It creates an array of results to be processed by the posture management system. The [some][9] keyword declares the local variable `resource`, which comes from the array of main resources. The `eval` rule is executed on every resource, returning a `pass`, `fail`, or `skip`. The `dd_output.format` rule formats the resource and evaluation correctly to be processed by cloud security.

This section of the policy does not need to be modified. Instead, when you select your main resource type in the **Choose your main resource type** dropdown when cloning rules, it is inserted in this section of the policy. You can also access the array of your resources through `input.resources.some_resource_type`, replacing `some_resource_type` with the main resource type that you chose, for example, `gcp_iam_policy`.

## Other ways to write rules

The template helps you start writing custom rules. You aren't required to follow it. You can instead clone an existing default rule, or you write your own rule from scratch. However, for the posture management system to interpret your results, they must be called `results` in your Rego module and be formatted as follows:

```json
[
    {
        "result": "pass" OR "fail" OR "skip",
        "resource_id": "some_resource_id",
        "resource_type": "some_resource_type"
    }
]
```

## More complex rules 

The above rule example evaluates basic true or false flags like `should_pass` in your resource. Consider a rule that expresses a logical `OR`, for example:

```python
bad_port_range(resource) {
    resource.port >= 100
    resource.port <= 200
} else {
    resource.port >= 300
    resource.port <= 400
}
```

This rule evaluates to true if the `port` is between `100` and `200`, or between `300` and `400`, inclusive. For this, you can define your `eval` rule as follows:

```python
eval(resource) = "skip" if {
    not resource.port
} else = "fail" {
    bad_port_range(resource)
} else = "pass" {
    true
}
```

This skips the resource if it has no `port` attribute, and fails it if it falls within one of the two "bad" ranges. 

Sometimes you want to examine more than one resource type in your rule. To do this, you can select some related resource types in the dropdown under **Advanced Rule Options**. You can then access the arrays of related resources through `input.resources.related_resource_type`, replacing `related_resource_type` with whatever related resource you would like to access.

When writing a policy for more than one resource type, it can be time consuming to loop through all instances of a related resource type for each main resource. Take the following example:

```python
eval(iam_service_account) = "fail" if {
    some key in input.resources.gcp_iam_service_account_key
    key.parent == iam_service_account.resource_name
    key.key_type == "USER_MANAGED"
} else = "pass" {
    true
}

# This part remains unchanged for all rules
results contains result if {
    some resource in input.resources[input.main_resource_type]
    result := dd_output.format(resource, eval(resource))
}
```

This rule determines whether there are any instances of `gcp_iam_service_account_key` that are user managed and match to a `gcp_iam_service_account` (the resource selected as the main resource type). If the service account has a key that is user managed, it produces a `fail` result. The `eval` rule is executed on every service account, and loops through every service account key to find one that matches the account, resulting in a complexity of `O(MxN)`, where M is the number of service accounts and N is the number of service account keys. 

To improve the time complexity significantly, build a [set][10] of key parents that are user managed with a [set comprehension][11]:

```python
user_managed_keys_parents := {key_parent |
    some key in input.resources.gcp_iam_service_account_key
    key.key_type == "USER_MANAGED"
    key_parent = key.parent
}
```

To find out if your service account has a user managed key, query the set in `O(1)` time:

```python
eval(iam_service_account) = "fail" if {
    user_managed_keys_parents[iam_service_account.resource_name]
} else = "pass" {
    true
}
```

The new time complexity is `O(M+N)`. Rego provides set, object, and array [comprehensions][12] to help you build [composite values][13] to query.

## Find out more

Read the [Rego documentation][2] for more context around rules, modules, packages, comprehensions, and for specific guidance around writing custom rules.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.openpolicyagent.org/docs/latest/#rego
[2]: https://www.openpolicyagent.org/docs/latest/policy-language/
[3]: https://www.openpolicyagent.org/docs/latest/policy-language/#modules
[4]: https://www.openpolicyagent.org/docs/latest/policy-language/#packages
[5]: https://www.openpolicyagent.org/docs/latest/policy-language/#futurekeywordscontains
[6]: https://www.openpolicyagent.org/docs/latest/policy-language/#futurekeywordsif
[7]: https://www.openpolicyagent.org/docs/latest/policy-language/#futurekeywordsin
[8]: https://www.openpolicyagent.org/docs/latest/policy-language/#future-keywords
[9]: https://www.openpolicyagent.org/docs/latest/policy-language/#some-keyword
[10]: https://www.openpolicyagent.org/docs/latest/policy-language/#sets
[11]: https://www.openpolicyagent.org/docs/latest/policy-language/#set-comprehensions
[12]: https://www.openpolicyagent.org/docs/latest/policy-language/#comprehensions
[13]: https://www.openpolicyagent.org/docs/latest/policy-language/#composite-values
