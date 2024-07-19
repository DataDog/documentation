---
title: Enabling ASM for Nginx
code_lang: nginx
type: multi-code-lang
code_lang_weight: 50
aliases:
  - /security_platform/application_security/getting_started/nginx
  - /security/application_security/getting_started/nginx
  - /security/application_security/enabling/nginx
further_reading:
    - link: 'https://github.com/DataDog/nginx-datadog/'
      tag: "Source Code"
      text: "nginx integration's source code"
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB Application Security Management Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting Application Security Management"
---

The Datadog nginx tracing module has experimental support for threat detection and blocking.

## Enabling threat detection
### Get started

1. Verify that your nginx build was compiled with the flag
   `--with-threads`. Most distributions ship with this flag enabled by default.
   To check if your nginx installation was built with thread support, run `nginx
   -V` and check the `configure arguments` line. If you cannot find
   `--with-threads` in the output, you will need to rebuild nginx with this flag
   enabled. For more information on how to build nginx from sources, see the
   [nginx documentation][3].

2. **Update your nginx tracing library module** to at least version 1.2.0. Visit
   the [GitHub releases page][2] and select the artifact named according to the
   pattern "ngx_http_datadog_module-appsec-&lt;amd64/arm64&gt;-&lt;nginx
   version&gt;.so.tgz". Note that this artifact includes "appsec" in the name.

3. **Enable ASM in the nginx configuration**.
   You need to:
   * define one or more thread pools with the [`thread_pool`][4] directive,
   * explicitly enable AppSec with [`datadog_appsec_enabled`][5], and
   * map requests to a thread pool or pools that you defined with the directive
     [`datadog_waf_thread_pool_name`][6].

   For example:

   ```nginx
   load_module /path/to/ngx_http_datadog_module.so;
   thread_pool waf_thread_pool threads=4 max_queue=128;
   http {
     datadog_appsec_enabled on;
     datadog_waf_thread_pool_name waf_thread_pool;
   }
   ```

   For more information, see the [reference documentation][3].

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Limitations

As of version 1.2.0, the available functionality has the following important limitations:

* The request body is not inspected, regardless of its content type.

- There is no remote configuration for AppSec. Consequently, AppSec excludes 1-click activation (AppSec must be explicitly enabled or disabled in the nginx configuration), rules cannot be updated/enabled/disabled, and blocking users by IP address is prevented, since the list cannot be transmitted to the nginx module.
* It's not possible to block the request based on characteristics of the
  response, such as its status code, headers, or body.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md
[2]: https://github.com/DataDog/nginx-datadog/releases
[3]: https://nginx.org/en/docs/configure.html
[4]: https://nginx.org/en/docs/ngx_core_module.html#thread_pool
[5]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md#datadog_appsec_enabled-appsec-builds
[6]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md#datadog_waf_thread_pool_name-appsec-builds
