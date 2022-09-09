---
title: How to write Rego rules
kind: documentation
aliases:
  - /security_platform/writing_rego_rules
further_reading:
- link: "security_platform/default_rules"
  tag: "Documentation"
  text: "Explore default Posture Management cloud configuration detection rules"
- link: "security_platform/cspm/frameworks_and_benchmarks"
  tag: "Documentation"
  text: "Learn about frameworks and industry benchmarks"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Cloud Security Posture Management is not available in this site.
</div>
{{< /site-region >}}

## Overview

[Rego](https://www.openpolicyagent.org/docs/latest/#rego) is an open source query language that offers powerful resource inspection features, allowing much greater versatility when determining cloud security posture. Now with Datadog custom rules you can write your own Rego rules and take further control over the security of your infrastructure. 

## The Template Module

Everything starts with the Rego [policy](https://www.openpolicyagent.org/docs/latest/policy-language/), defined inside a [module](https://www.openpolicyagent.org/docs/latest/policy-language/#modules). Datadog Posture Management uses a module template like the one below to make writing rules easier. Let's dive in to each part of this module to understand how it works.

```java
package datadog

import future.keywords.contains
import future.keywords.if
import data.datadog.output as dd_output

eval(resource) = "skip" if {
    resource.skip_me
} else = "pass" {
    resource.should_pass
} else = "fail" {
    true
}

results contains result if {
    resource = input.some_resource_type[_]
    result := dd_output.format(resource,eval(resource))
}
```

On the first line we see the declaration `package datadog`. A [package](https://www.openpolicyagent.org/docs/latest/policy-language/#packages) groups Rego modules into a single namespace, allowing modules to be imported safely. Currently, importing user modules is not a feature of custom rules, and so the package declaration has no other purpose than to align with OPA's policy guidelines. All posture management rules will be under the `datadog` namespace, but feel free to declare whatever namespace you see fit to help organize your rules. 

```java
import future.keywords.contains
import future.keywords.if
```

The above statements import the OPA-provided keywords [`contains`](https://www.openpolicyagent.org/docs/latest/policy-language/#futurekeywordscontains) and [`if`](https://www.openpolicyagent.org/docs/latest/policy-language/#futurekeywordsif). These keywords allow defining rules with more expressive syntax to improve readability. Note: importing all keywords with `import future.keywords` is [not recommended](https://www.openpolicyagent.org/docs/latest/policy-language/#future-keywords).

```java
import data.datadog.output as dd_output
```

The above line imports Datadog's helper method, which allows you to easily format your results to the specifications of the Datadog posture management system. `datadog.output` is a Rego module with a format method that expects as the first argument your resource, and as the second argument a string, `pass`, `fail` or `skip`, which describes the outcome of the inspection of your resource.

After the import statement we come to the first rule in our template module:

```java
eval(resource) = "skip" if {
    resource.skip_me
} else = "pass" {
    resource.should_pass
} else = "fail" {
    true
}
```

The above rule evaluates the resource, and provides the outcome as a string depending on the state of the resource. You can change the order of `pass`, `fail` and `skip` according to your needs. The rule above has `fail` as a default, if `skip_me` and `should_pass` are false or nonexistent in your resource, but you can always make `pass` the default: 

```java
eval(resource) = "skip" if {
    resource.skip_me
} else = "fail" {
    resource.should_fail
} else = "pass" {
    true
}
```

The final section of the template module builds your set of results:

```java
results contains result if {
    resource = input.some_resource_type[_]
    result := dd_output.format(resource, eval(resource))
}
```

This section will pass through all resources of type `some_resource_type` and evaluate them. It will create an array of results to be processed by the posture management system. This section does not need to be changed except for specifying the resource type you want to process, for example swapping `some_resource_type` for `gcp_iam_policy`.

The above template provides a great way to start writing your own custom rules. You don't need to follow it – you can decide to clone an existing default rule, or you can write your own one from scratch. However, for the posture management system to interpret your results, they need to be called `results` in your Rego module and be formatted as follows:

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

The above rule evaluates simple true or false flags like `should_pass` in your resource. But what if you want to express logical `OR`? Take the below rule:

```java
bad_port_range(resource) {
    resource.port >= 100
    resource.port <= 200
} else {
    resource.port >= 300
    resource.port <= 400
}
```

This will evaluate to true if the `port` is between `100` and `200`, or between `300` and `400`, inclusive. Thus we can define our `eval` rule as follows:

```java
eval(resource) = "skip" if {
    not resource.port
} else = "fail" {
    bad_port_range(resource)
} else = "pass" {
    true
}
```

We will skip the resource if it has no `port` attribute, and fail it if it falls within one of our two "bad" ranges. 

Sometimes you want to examine more than one resource type in your rule. In this case, it can be incredibly time consuming to loop through all instances of a resource type for each resource. Take the following example:

```java
eval(service_account) = "fail" if {
    key := input.gcp_iam_service_account_key[_]
    key.parent == service_account.resource_name
    key.key_type == "USER_MANAGED"
} else = "pass" {
    true
}

results contains result if {
    service_account = input.gcp_iam_service_account[_]
    result := dd_output.format(service_account, eval(service_account))
}
```

This rule attempts to determine whether there are any instances of `gcp_iam_service_account_key` that are user managed and match to a `gcp_iam_service_account`. If the service account has a key that is user managed, it produces a `fail` result. The `eval` rule is executed on every service account, and loops through every service account key to find one that matches the account. Thus the complexity of this rule is `O(MxN)`, where M is the number of service accounts and N is the number of service account keys. 

To improve the time complexity significantly, you can build a [set](https://www.openpolicyagent.org/docs/latest/policy-language/#sets) of key parents that are user managed with a [set comprehension](https://www.openpolicyagent.org/docs/latest/policy-language/#set-comprehensions):

```java
user_managed_keys_parents := {key_parent |
    key := input.gcp_iam_service_account_key[_]
    key.key_type == "USER_MANAGED"
    key_parent = key.parent
}
```

Now if you want to know if your service account has a user managed key, query the set in `O(1)` time:

```java
eval(service_account) = "fail" if {
    user_managed_keys_parents[service_account.resource_name]
} else = "pass" {
    true
}
```

The new time complexity is `O(M+N)`. Rego provides set, object, and array [comprehensions](https://www.openpolicyagent.org/docs/latest/policy-language/#comprehensions) to help you build [composite values](https://www.openpolicyagent.org/docs/latest/policy-language/#comprehensions) to query.

## Find out more

Rego's [documentation](https://www.openpolicyagent.org/docs/latest/policy-language/) site provides more context around rules, modules, packages, comprehensions, and lots more. Feel free to reference the docs directly for specific guidance around writing your own custom rules.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/compliance?time=now
[2]: /security_platform/cloud_siem/
[3]: /security_platform/cloud_workload_security/
