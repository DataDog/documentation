---
title: Testing Multiple Environments
description: Learn how to use Continuous Testing to reuse the same Synthetic test scenarios against multiple environments.
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/"
  tag: "Blog"
  text: "Incorporate Datadog Continuous Testing tests into your CI/CD pipeline"
- link: "https://www.datadoghq.com/blog/internal-application-testing-with-datadog/"
  tag: "Blog"
  text: "Test internal applications with Datadog's testing tunnel and private locations"
- link: "/continuous_testing/environments/proxy_firewall_vpn"
  tag: "Documentation"
  text: "Learn about testing while using proxies, firewalls, or VPNs"
---

## Overview

Continuous Testing allows you to apply the same scenario from scheduled tests against the production environment to development and staging environments. Continuous Testing uses Synthetic tests throughout the development cycle to ensure regressions are caught as soon as possible.

When triggering a CI test, you can overwrite the starting URL of a [browser][1] or [API test][2] to reroute the Synthetic Worker to the appropriate environment.

## Overriding the starting URL

A Synthetic browser test starts the test scenario by navigating to a starting URL. Similarly, an API HTTP test sends a request to a specific URL. When triggering a CI test, you can overwrite this starting URL to point to another environment where your application is deployed in.

{{< img src="continuous_testing/starting_url_substitution.png" alt="Continuous Testing tunnel allows the Synthetics Worker to reach your private applications" width="100%" >}}

When triggering a CI test, the `startUrl` field allows you to overwrite the first URL that a browser test navigates to or the URL used by an HTTP test request. You can specify this option through the global configuration file, the Synthetic Monitoring configuration files (`*.synthetics.json`), or the command line flag `--override startUrl=<STARTURL>`.

```shell
datadog-ci synthetics run-tests --public-id <public-id> --override startUrl="https://staging.my-app.com"
```


This option allows you to reuse the same test scenario on both the production environment and other development environments (such as staging) as long as they are publicly available. To learn how to test against [private environments][4], see [Testing While Using Proxies, Firewalls, or VPNs][3].

## Partially modifying the starting URL

If some of your tests start at the homepage, or a similarly simple URL, the previous solution works fine, but it doesn't cover every use case. Blindly replacing the starting URL may unintentionally remove the path or certain search query parameters from the URL that the scenario is expected to test.

In addition to `startUrl`, the `startUrlSubstitutionRegex` field allows you to modify the starting URL without overwriting it entirely. This option allows you to substitute parts of the default starting URL based on the provided regular expression.

This field expects a string containing two parts, separated by a pipe character `|`: `<regex>|<rewriting rule>`. The first part is the regex to apply to the default starting URL. The second is the expression to rewrite the URL.

A simple example looks like the following:

```shell
https://prod.my-app.com/(.*)|https://staging.my-app.com/$1
```

The regular expression uses a capture group to capture the path of the URL. The rewriting rule produces a similar looking URL pointing to `staging.my-app.com`, and appending the captured group using `$1`. Given the URL `https://prod.my-app.com/product-page?productId=id`, it would rewrite it to `https://staging.my-app.com/product-page?productId=id`.

A more complex substitution regex could look like the following: `(https?://)([^/]*)|$1<deployment-prefix>.$2`.
With a URL such as `https://my-app.com/some/path`, it would rewrite it to `https://<deployment-prefix>.my-app.com/some/path`.
Notice that the URL path is not affected by the rewrite, because it's not part of the substitution regex.

<div class="alert alert-info">
Apart from the pipe <code>|</code> syntax presented above, <code>startUrlSubstitutionRegex</code> also supports the sed syntax with modifiers: <code>s|&lt;regex&gt;|&lt;rewritting rule&gt;|&lt;modifiers&gt;</code>.</br></br>
The sed syntax is often used with a slash <code>/</code> separator, for example: <code>s/&lt;regex&gt;/&lt;rewritting rule&gt;/&lt;modifier&gt;</code>. However, it can use any character as a delimiter. When working on a URL containing an abundant number of slashes, Datadog recommends using another character rather than escaping all slashes of the URL.
</div>

With this tool, any scheduled test used on your production environment can be reused to point to a development environment.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/
[2]: /synthetics/api_tests/
[3]: /continuous_testing/environments/proxy_firewall_vpn
[4]: /synthetics/private_locations
