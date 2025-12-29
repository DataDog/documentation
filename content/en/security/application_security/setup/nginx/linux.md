---
title: Enabling App and API Protection for Nginx
code_lang: nginx
code_lang_weight: 50
aliases:
  - /security_platform/application_security/getting_started/nginx
  - /security/application_security/getting_started/nginx
  - /security/application_security/enabling/tracing_libraries/threat_detection/nginx/
  - /security/application_security/threats/setup/threat_detection/nginx
  - /security/application_security/threats_detection/nginx
further_reading:
    - link: 'https://github.com/DataDog/nginx-datadog/'
      tag: "Source Code"
      text: "nginx integration's source code"
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB App and API Protection Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting App and API Protection"
    - link: "/security/application_security/guide/standalone_application_security"
      tag: "Documentation"
      text: "Standalone App and API Protection"
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
2. Update your nginx tracing library module to at least version 1.2.0. Visit
   the [GitHub releases page][2] and select the artifact named according to the
   pattern `ngx_http_datadog_module-appsec-<amd64/arm64>-<nginx
   version>.so.tgz`. **Note**: This artifact includes `appsec` in the name.
3. Enable App and API Protection in the nginx configuration.
   Do the following:
   * Define one or more thread pools with the [`thread_pool`][4] directive.
   * Explicitly enable AppSec with [`datadog_appsec_enabled`][5].
   * Map requests to a thread pool or pools that you defined with the directive
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

## Using App and API Protection without APM tracing

If you want to use App and API Protection without APM tracing functionality, you can deploy with tracing disabled:

1. Configure your tracing library with the `DD_APM_TRACING_ENABLED=false` environment variable in addition to the `DD_APPSEC_ENABLED=true` environment variable.
2. This configuration will reduce the amount of APM data sent to Datadog to the minimum required by App and API Protection products.

For more details, see [Standalone App and API Protection][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md
[2]: https://github.com/DataDog/nginx-datadog/releases
[3]: https://nginx.org/en/docs/configure.html
[4]: https://nginx.org/en/docs/ngx_core_module.html#thread_pool
[5]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md#datadog_appsec_enabled-appsec-builds
[6]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md#datadog_waf_thread_pool_name-appsec-builds
[7]: /security/application_security/guide/standalone_application_security/
