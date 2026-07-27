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

When triggering a CI test, you can overwrite the starting URL of a [browser][1] or [API test][2] to reroute the Synthetic Worker to the appropriate environment. This allows you to use the same test on both your production and staging environments.

For [browser tests][1], you can also redirect a subset of the resource URLs during the test execution with `resourceUrlSubstitutionRegexes`. This allows you to test frontend assets from your current branch against the production backend. This also allows you to reroute a subset of API calls (matching a domain or path) to a staging environment containing the changes to test, while the rest of the requests are served by the production environment.

## Using a production test on a staging environment

### Overriding the starting URL

A Synthetic browser test starts the test scenario by navigating to a starting URL. Similarly, an API HTTP test sends a request to a specific URL. When triggering a CI test, you can overwrite this starting URL to point to another environment where your application is deployed in.

{{< img src="continuous_testing/starting_url_substitution.png" alt="Continuous Testing tunnel allows the Synthetics Worker to reach your private applications" width="100%" >}}

When triggering a CI test, the `startUrl` field allows you to overwrite the first URL that a browser test navigates to or the URL used by an HTTP test request. You can specify this option through the global configuration file, the Synthetic Monitoring configuration files (`*.synthetics.json`), or the command line flag `--override startUrl=<STARTURL>`.

```shell
datadog-ci synthetics run-tests \
  --public-id <public-id> \
  --override startUrl="https://staging.my-app.com"
```

This option allows you to reuse the same test scenario on both the production environment and other development environments (such as staging) as long as they are publicly available. To learn how to test against [private environments][4], see [Testing While Using Proxies, Firewalls, or VPNs][3].

### Partially modifying the starting URL

If some of your tests start at the homepage, or a similarly simple URL, the previous solution works fine, but it doesn't cover every use case. Blindly replacing the starting URL may unintentionally remove the path or certain search query parameters from the URL that the scenario is expected to test.

The `startUrlSubstitutionRegex` field allows you to modify the starting URL without overwriting it entirely. This option allows you to substitute parts of the default starting URL based on the provided regular expression.

```shell
datadog-ci synthetics run-tests \
  --public-id <public-id> \
  --override startUrlSubstitutionRegex="<regex>|<rewriting-rule>"
```

This field expects a string containing two parts, separated by a pipe character `|`:

`<regex>|<rewriting-rule>`
- `<regex>`: Regular expression (regex) to apply to the default starting URL
- `<rewriting-rule>`: Expression to rewrite the URL

#### Example 1

Consider the following `<regex>|<rewriting-rule>` string:

```shell
https://prod.my-app.com/(.*)|https://staging.my-app.com/$1
```

The regular expression uses a capture group to capture the path of the URL. The rewriting rule produces a similar looking URL pointing to `staging.my-app.com`, and appending the captured group using `$1`. Given the URL `https://prod.my-app.com/product-page?productId=id`, it would rewrite it to `https://staging.my-app.com/product-page?productId=id`.

#### Example 2

Consider the following `<regex>|<rewriting-rule>` string:

```
(https?://)([^/]*)|$1<deployment-prefix>.$2
```

With this override, the URL `https://my-app.com/some/path` gets rewritten as `https://<deployment-prefix>.my-app.com/some/path`.
Notice that the URL path is not affected by the rewrite because it is not part of the substitution regex.

<div class="alert alert-info">
Apart from the pipe <code>|</code> syntax presented above, <code>startUrlSubstitutionRegex</code> also supports the sed syntax: <code>s/&lt;regex&gt;/&lt;rewriting rule&gt;/&lt;modifiers&gt;</code>.</br></br>
Because sed syntax uses a slash <code>/</code> separator, it may require escaping slashes from the URL, which is error-prone. Unless you need regex modifiers, Datadog recommends using the pipe <code>|</code> syntax for better readability.
</div>

With this tool, any scheduled test used on your production environment can be reused to point to a development environment.

## Introducing a change in an existing environment

### Modifying resource URLs

In addition to modifying the starting URL, you can also modify the URLs of all subsequent resource requests using the `resourceUrlSubstitutionRegexes` override. This option substitutes parts of the resource URLs based on the provided regular expressions.

This allows you to test some parts of your application independently from the main environment. The main page is still being served by the environment from the `startUrl`, but each request matching the first regex from `resourceUrlSubstitutionRegexes` can be redirected to another environment hosting only the changes from the branch triggering the CI pipeline.

For example: if your frontend JavaScript assets are located under the path `https://prod.my-app.com/resources/chunks/*`, you can use `resourceUrlSubstitutionRegexes` to redirect all JavaScript assets requests to `https://staging.my-app.com/resources/chunks`—while main page and all API calls continue to be served by `prod.my-app.com`. Similarly, if you want to test the service behind the endpoints `https://prod.my-app.com/api/my-service`, you can redirect these API calls to `https://staging.my-app.com/api/my-service` to test this service in isolation with the production frontend.

```shell
datadog-ci synthetics run-tests \
  --public-id <public-id> \
  --override resourceUrlSubstitutionRegexes="<regex1>|<rewriting-rule1>" \
  --override resourceUrlSubstitutionRegexes="<regex2>|<rewriting-rule2>"
```

The `resourceUrlSubstitutionRegexes` field expects strings, each containing two parts, separated by a pipe character `|`:

`<regex>|<rewriting-rule>`
- `<regex>`: Regular expression (regex) to apply to the resource URL
- `<rewriting-rule>`: Expression to rewrite the URL

#### Example 1

Consider the following `<regex>|<rewriting-rule>` string:

```
https://prod.my-app.com/assets/(.*)|https://staging.my-app.com/assets/$1
```

The regex, `https://prod.my-app.com/assets/(.*)`, uses a capture group to capture the path of the resource URL.

The rewriting rule, `https://staging.my-app.com/assets/$1`, produces a similar-looking URL that points to `staging.my-app.com` and appends the captured group using `$1`.

As a result, the URL `https://prod.my-app.com/assets/js/chunk-123.js` is rewritten as `https://staging.my-app.com/assets/js/chunk-123.js`.

#### Example 2

Consider the following `<regex>|<rewriting-rule>` string:

```
(https?://)([^/]*)|$1<deployment-prefix>.$2
```

With this override, the URL `https://my-app.com/some/path` gets rewritten as `https://<deployment-prefix>.my-app.com/some/path`. Notice that the URL path is not affected by the rewrite because it is not part of the substitution regex.

<div class="alert alert-info">
The <code>resourceUrlSubstitutionRegexes</code> is also applied to the first request, similarly to <code>startUrl</code> and <code>startUrlSubstitutionRegex</code>.
</div>

<div class="alert alert-info">
Apart from the pipe <code>|</code> syntax presented above, <code>resourceUrlSubstitutionRegexes</code> also supports the sed syntax: <code>s/&lt;regex&gt;/&lt;rewriting rule&gt;/&lt;modifiers&gt;</code>.</br></br>
Because this syntax uses a slash <code>/</code> separator, it may require escaping slashes from the URL, which is error-prone. Unless you need regex modifiers, Datadog recommends using the pipe <code>|</code> syntax for better readability.
</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/browser_tests/
[2]: /synthetics/api_tests/
[3]: /continuous_testing/environments/proxy_firewall_vpn
[4]: /synthetics/private_locations
