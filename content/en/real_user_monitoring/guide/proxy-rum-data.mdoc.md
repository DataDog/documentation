---
title: Proxy Your Browser RUM Data
description: "Configure browser RUM data proxying with SDK source options and version-specific settings for custom network routing."
aliases:
  - /real_user_monitoring/faq/proxy_rum_data/
content_filters:
  - trait_id: lib_src
    option_group_id: rum_browser_sdk_source_options
    label: "SDK source"
  - trait_id: rum_browser_sdk_version
    option_group_id: rum_browser_sdk_version_for_proxying_options
further_reading:
  - link: '/real_user_monitoring/'
    tag: 'Documentation'
    text: 'Learn about Real User Monitoring'
---

{% if equals($rum_browser_sdk_version, "lt_4_34_0") %}
{% alert level="danger" %}
Upgrade to Browser SDK `4.34.0` or later to avoid security vulnerabilities in your proxy configuration.
{% /alert %}
{% /if %}

## Overview

The RUM Browser SDK can be configured to send requests through a proxy. When you set the SDK's `proxy` [initialization parameter][1] to a URL such as `https://www.example-proxy.com/any-endpoint`, all RUM data is sent to that URL using the POST method. The RUM data still needs to be forwarded to Datadog from the proxy.

## Prerequisite proxy setup

To successfully forward a request to Datadog, your proxy must

1. [Build the Datadog intake URL](#build-the-datadog-intake-url).
2. Add an `X-Forwarded-For` header containing the request client IP address for accurate geoIP.
3. Forward the request to the Datadog intake URL using the POST method.
4. Leave the request body unchanged.

{% alert level="warning" %}
- For security reasons, remove any HTTP headers that potentially contain sensitive information, such as the `cookie` header.
- The request body can contain binary data and should not be converted to a string. Make sure your proxy implementation forwards the raw body without conversion.
- Make sure your proxy implementation does not allow a malicious actor to send requests to a different server. For example: `https://browser-intake-datadoghq.com.malicious.com`.
{% /alert %}

### Build the Datadog intake URL

Your Datadog intake URL should have the format `<INTAKE_ORIGIN>/<PATH><PARAMETERS>` (for example, `https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser&...`).

{% table %}
---
* intake origin
* 
    The Datadog intake origin corresponds to your `site` [initialization parameter][1]. The Datadog intake origin corresponding to your site parameter should be defined in your proxy implementation.

    {% site-region region="us" %}
    The intake origin for your Datadog site is `https://browser-intake-datadoghq.com`.
    {% /site-region %}

    {% site-region region="us3" %}
    The intake origin for your Datadog site is `https://browser-intake-us3-datadoghq.com`.
    {% /site-region %}

    {% site-region region="us5" %}
    The intake origin for your Datadog site is `https://browser-intake-us5-datadoghq.com`.
    {% /site-region %}

    {% site-region region="eu" %}
    The intake origin for your Datadog site is `https://browser-intake-datadoghq.eu`.
    {% /site-region %}

    {% site-region region="ap1" %}
    The intake origin for your Datadog site is `https://browser-intake-ap1-datadoghq.com`.
    {% /site-region %}

    {% site-region region="ap2" %}
    The intake origin for your Datadog site is `https://browser-intake-ap2-datadoghq.com`.
    {% /site-region %}

    {% site-region region="gov" %}
    The intake origin for your Datadog site is `https://browser-intake-ddog-gov.com`.
    {% /site-region %}
---
* path
* 
    The path contains the API version and the product (for example, `/api/v2/rum` for RUM data or `/api/v2/replay` for Session Replay data). 
    
    The path for each request can be accessed in the request's `ddforward` parameter (for example, `https://www.example-proxy.com/any-endpoint?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser`).
---
* parameters
* 
    The request parameters (for example, `ddsource=browser&...`) can be accessed in the request's `ddforward` parameter (for example, `https://www.example-proxy.com/any-endpoint?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser`).

{% /table %}

## SDK setup

<!-- SDK version >4.34.0 and up -->
{% if or(equals($rum_browser_sdk_version, "gte_5_4_0"),equals($rum_browser_sdk_version, "gte_4_34_0")) %}

Configure the URL of the proxy in the `proxy` initialization parameter:

<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
import { Datacenter, datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '{% region-param key="dd_site" /%}',
    proxy: '<YOUR_PROXY_URL>',
});
```
{% /if %}
<!-- end NPM -->

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: '<YOUR_PROXY_URL>',
    });
});
```

{% /if %}
<!-- end CDN async -->

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: '<YOUR_PROXY_URL>'
    });
```
{% /if %}
<!-- end CDN sync -->

The RUM Browser SDK adds a `ddforward` query parameter to all requests to your proxy. This query parameter contains the URL path and parameters that all data must be forwarded to.

For example, with a `site` set to `datadoghq.eu` and a `proxy` set to `https://example.org/datadog-intake-proxy`, the RUM Browser SDK sends requests to a URL like this: `https://example.org/datadog-intake-proxy?ddforward=%2Fapi%2Fv2%2Frum%3Fddsource%3Dbrowser`. The proxy forwards the request to `https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser`.

<!-- SDK version >=5.4.0 -->
{% if equals($rum_browser_sdk_version, "gte_5_4_0") %}
### Passing a function to the `proxy` initialization parameter

The `proxy` initialization parameter also supports a function input. This function allows you to have more control on how the path and parameters are added to the proxy URL.

This function receives an object with the following properties:

- `path`: the path for the Datadog requests (example: `/api/v2/rum`)
- `parameters`: the parameters of the Datadog requests (example: `ddsource=browser&...`)

<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
import { Datacenter, datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '{% region-param key="dd_site" /%}',
    proxy: (options) => `https://www.proxy.com/foo${options.path}/bar?${options.parameters}`,
});
```
{% /if %}
<!-- end NPM -->

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: (options) => `https://www.proxy.com/foo${options.path}/bar?${options.parameters}`,
    })
})
```
{% /if %}
<!-- end CDN async -->

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        proxy: (options) => `https://www.proxy.com/foo${options.path}/bar?${options.parameters}`
    });
```
{% /if %}
<!-- end CDN sync -->

**Note:**
- Some privacy blockers already target the intake [URL patterns][2], so you may want to take that into account when building your proxy URL.
- The `proxy` function is called for each request, so it should avoid any heavy computation.
- **JSP web applications** need to use the `\` escape character to properly propagate these parameters to the browser. For example:
    ```javascript
    proxy: (options) => 'http://proxyURL:proxyPort\${options.path}?\${options.parameters}',
    ```
{% /if %}
<!-- end SDK version >=5.4.0 -->

{% /if %}
<!-- end SDK version >4.34.0 and up -->

<!-- SDK version <4.34.0 -->
{% if equals($rum_browser_sdk_version, "lt_4_34_0") %}
Before Browser SDK v4.34.0, the `proxyUrl` initialization parameter was used, and the Datadog intake origin was included in the `ddforward` attribute. The proxy implementation was in charge of validating this host, and failure to do so resulted in various vulnerabilities.

The Datadog intake origin needs to be defined in your proxy implementation to ensure security.

**To avoid security vulnerabilities, you must upgrade to Browser SDK `4.34.0` or later.**
{% /if %}
<!-- end SDK version <4.34.0 -->

[1]: /real_user_monitoring/application_monitoring/browser/setup/client/?tab=rum#initialization-parameters
[2]: https://github.com/easylist/easylist/blob/997fb6533c719a015c21723b34e0cedefcc0d83d/easyprivacy/easyprivacy_general.txt#L3840
