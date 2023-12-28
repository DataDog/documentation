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

When triggering a CI Test, it's possible to overwrite the start Url of a Browser test or an API test to reroute the Synthetic Worker to the right environment.

## Overriding the Start URL

TODO: about `startUrl`

## Regex substitution

TODO: about `startUrlSubstitutionRegex`

<!--

TODO the resource URL substitution regex is not implemented yet, so let's not document it for now.

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
