---
title: Testing Multiple Environments
kind: documentation
description: Learn how to use Continuous Testing to reuse the same Synthetics scenarios against multiple environments.
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/"
  tag: "Blog"
  text: "Incorporate Datadog Continuous Testing tests into your CI/CD pipeline"
- link: "https://www.datadoghq.com/blog/internal-application-testing-with-datadog/"
  tag: "Blog"
  text: "Test internal applications with Datadog's testing tunnel and private locations"
---

## Overview

Continuous Testing brings the most value with the ability to share the same scenario between scheduled tests against the production environment and development and staging environments.
With Continuous Testing, Synthetic Tests are used throughout the development cycle to ensure regressions are caught as soon as possible.

When triggering a CI Test, it's possible to overwrite the start Url of a Browser or API test to reroute the Synthetic Worker to the right environment.

## Overriding the Start URL

A Browser test will start the test scenario by navigating to a start url. Similarly, an API HTTP test will send a request to a specific url. When triggering a CI Test, it's possible to overwrite this starting url to point to another location where your application is deployed: another environment.

{{< img src="continuous_testing/continuous_testing_start-url_substitution.png" alt="Continuous Testing tunnel allows the Synthetics Worker to reach your private applications" width="100%" >}}

When triggereing a CI Test, the configuration field `startUrl` allows to overwrite entirely the first url a Browser test navigates to, or the url used by an HTTP test request. You can specify this option either through the global configuration file, the synthetics configuration files (`*.synthetics.json`), or through a command line flag.
```
yarn datadog-ci synthetics run-tests --public-id <public-id> --start-url "https://staging.my-app.com"
```

<!--
Note: I'm not sure about that.
This option also supports using environment variables to allow picking up the URL from the developement environment that might expose it as environment variable: `--start-url "https://$DEPLOYMENT_PREFIX.my-app.com"`.
-->

This simple option allows to reuse the same test scenario on both the production environement and any development environments e.g. staging, as long as they are publicly available. If some of your development environments are private, you can head over to [Testing While Using Proxies, Firewalls, or VPNs](proxy_firewall_vpn) to learn how to test against private environments.

## Partially modifying the Start URL

If some of your tests start at the homepage, or a similarly simple URL, the previous solution would work fine, but it doesn't cover all use cases. Replacing blindly the starting url might remove from the url the path the scenario is expected to test, or some search query parameters that are required to trigger certain behavior of your application.

In addition to `startUrl`, Continuous Testing supports another configuration field to help you modify the starting URL, without overwriting it entirely: `startUrlSubstitutionRegex`.
It allows to substitute parts of the default starting url, based on the provided regular expression.

This field expects a string containing two parts, separated by a pipe character `|`:
`<regex>|<rewritting rule>`.
The first part is the regex to apply to the default starting url. The second is the expression to rewrite the url.

A simple example could looke like this:
```
https://prod.my-app.com/(.*)|https://staging.my-app.com/$1
```
The regular expression uses a capture group to capture the path of the url. The rewriting rule produces a similar looking url pointing to `staging.my-app.com`, and appending the captured group using `$1`. Given the url `https://prod.my-app.com/product-page?productId=id`, it would rewrite it to `https://staging.my-app.com/product-page?productId=id`.

A more complex substitution regex could look like the following: `(https?://)([^/]*)|$1<deployment-prefix>.$2`.
Given an url such as `https://my-app.com/some/path`, it would rewrite it with `https://<deployment-prefix.my-app.com/some/path`.
Notice that the path part of the url is not concerned by the substitution regex, hence is left as is.

<div class="alert alert-info">
Appart from the pipe `|` syntax presented above, `startUrlSubstitutionRegex` also supports the sed syntax, with modifieres: `s|<regex>|<rewritting rule>|<modifiers>`.
The sed syntax is often used with a slash `/` separator, like so `s/<regex>/rewritting rule>/<modifier>`. However, it can use any character as a delimiter. And when working on url which contains an abundant number of slashes, it's often more convenient to use another character rather than escaping all slashes of the url.
</div>

With this tool, any scheduled test used on your production environement can be reused to point to a development environment.



<!--

## Other forms of rerouting

TODO other overrride possible, headers, variables etc... -->

<!--

TODO the resource URL substitution regex is not implemented yet, so let's not document it for now.

{{< img src="continuous_testing/continuous_testing_resource-url_substitution.png" alt="Continuous Testing tunnel allows the Synthetics Worker to reach your private applications" width="100%" >}}

### Start URL Substitution Regex

only for the entrypoint

### Resource URL Substitution Regex

for most advanced usage

{{< tabs >}}

{{% tab "Sed-based syntax" %}}
```json
[
  "s/hello-world.com/hell0-w0rld.com/",
  "s/(my-cdn.com/)prod//$1staging//"
]
```
{{% /tab %}}

{{% tab "Pipe-based syntax" %}}
```json
[
  "hello-world.com|hell0-w0rld.com",
  "(my-cdn.com/)prod/|$1staging/"
]
```
{{% /tab %}}

{{< /tabs >}} -->

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/private_locations
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
<!-- [3]: https://github.com/DataDog/datadog-ci/releases/tag/v0.11.0 -->
[4]: /continuous_testing/cicd_integrations#use-the-cli
