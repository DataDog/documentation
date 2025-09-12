---
title: Troubleshooting PHP App and API Protection
further_reading:
  - link: "/security/application_security/how-it-works/"
    tag: "Documentation"
    text: "How App and API Protection Works"
  - link: "/security/default_rules/?category=cat-application-security"
    tag: "Documentation"
    text: "OOTB App and API Protection Rules"
  - link: "/security/application_security/troubleshooting"
    tag: "Documentation"
    text: "Troubleshooting App and API Protection"
---

## Overview

This document provides diagnostic information for common issues and unexpected behavior with Datadog App and API Protection. If you continue to have trouble, reach out to [Datadog support][1] for further assistance.

## AAP rate limits

AAP traces are rate-limited to 100 traces per second. Traces sent after the limit are not reported. Contact [Datadog support][1] if you need to change the limit.

## No security traces detected by AAP

There are a series of steps that must run successfully for threat information to appear in the AAP [Trace and Signals Explorer][2]. It is important to check each step when investigating this issue.

### Confirm AAP is enabled

You can use the metric `datadog.apm.appsec_host` to check if AAP is running.

1. Go to **Metrics > Summary** in Datadog.
2. Search for the metric `datadog.apm.appsec_host`. If the metric doesn't exist, then there are no services running AAP. If the metric exists, the services are reported with the metric tags `host` and `service`.
3. Select the metric, and in the **Tags** section, search for `service` to see which services are running AAP.

If you are not seeing `datadog.apm.appsec_host`, check the [in-app instructions][3] to confirm that all steps for the initial setup are complete.

AAP data is sent with APM traces. See [APM troubleshooting][4] to [confirm APM setup][5] and check for [connection errors][6].

### Send a test attack to your application

 To test your AAP setup, trigger the [Security Scanner Detected][7] rule by running a file that contains the following curl script:

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

**Note:** The `dd-test-scanner-log` value is supported in the most recent releases.

A few minutes after you enable your application and run a successful exercise on it, threat information appears in the [Trace and Signals Explorer][2].

{{< img src="/security/security_monitoring/explorer/signal_panel_v2.png" alt="Security Signal details page showing tags, metrics, suggested next steps, and attacker IP addresses associated with a threat." style="width:100%;" >}}

### Check if required tracer integrations are deactivated

AAP relies on certain tracer integrations. If they are deactivated, AAP won't work. To see if there are deactivated integrations, look for `disabled_integrations` in your [startup logs][8].

The required integrations vary by language.

There are no required integrations for PHP.

### Check Datadog Agent configuration

 To troubleshoot this step of the process, do the following:

- Check the details of the running Agent at this address `http://<agent-machine-name>:<agent-port>/info`, usually `http://localhost:8126/info`.
- Ensure there are no Agent transmission errors related to spans in your [tracer logs][7].
- If the Agent is installed on a separate machine, check that `DD_AGENT_HOST` and, optionally, `DD_TRACE_AGENT_PORT` are set, or that `DD_TRACE_AGENT_URL` is set for the application tracing library.

### Check if spans are successfully transmitted to Datadog

AAP data is sent over [spans][9]. To confirm that spans are successfully transmitted to Datadog, check that your tracer logs contain logs that look similar to this:

```
2021-11-29 21:19:58 CET | TRACE | INFO | (pkg/trace/info/stats.go:111 in LogStats) | [lang:.NET lang_version:5.0.10 interpreter:.NET tracer_version:1.30.1.0 endpoint_version:v0.4] -> traces received: 2, traces filtered: 0, traces amount: 1230 bytes, events extracted: 0, events sampled: 0
```

If spans are not being transmitted, then the tracer logs will contain logs similar to this:

```
2021-11-29 21:18:48 CET | TRACE | INFO | (pkg/trace/info/stats.go:104 in LogStats) | No data received
```

## Troubleshooting by language

Below are additional troubleshooting steps for PHP.

For PHP, to start troubleshooting issues with the Datadog AAP extension, enable debug logs in the AAP extension's `.ini` file.

The extension's `ini` file is usually found in `/etc/php/<version>/xxx/conf.d/98-ddtrace.ini`, but the location may differ depending on your installation. Look at the beginning of the `phpinfo()` output to identify the directory that is scanned for `.ini` files, if any. In the `.ini` file, set the following configuration options with the following:

```php
datadog.appsec.log_level='debug'
datadog.appsec.helper_extra_args='--log_level=debug'
datadog.appsec.helper_log_file='/tmp/helper.log'
```

The extension outputs logs to the default `php_error` log file. If there are no logs in the file, add the following to the `.ini` file:

```php
datadog.appsec.log_file='tmp/extension.log'
```

### Installation fails to find PHP
If the installation script is unable to find the correct PHP version, you can set the `--php-bin` to the PHP binary location, for example:

```
$ php datadog-setup.php --php-bin /usr/bin/php7.4 --enable-appsec
```
### Connection to helper failed
If the AAP extension is unable to communicate with the helper process, the following warning occurs:

```
PHP Warning:  Unknown: [ddappsec] Connection to helper failed and we are not going to attempt to launch it: dd_error
```

The warning could be followed by one of these error messages:

```
PHP Warning:  Unknown: [ddappsec] Could not open lock file /tmp/ddappsec.lock: Permission denied in Unknown on line 0
```
```
PHP Warning:  Unknown: [ddappsec] Call to bind() failed: Permission denied
```
```
PHP Warning:  Unknown: [ddappsec] Failed to unlink /tmp/ddappsec.sock: Operation not permitted
```

This indicates that the lock file or socket file used by the extension has invalid permissions, or the user executing the PHP process does not have write access to the `tmp` directory.

If the lock file or socket file has invalid permissions, you can either delete them and restart Apache/FPM or adjust the `user:group` to match the one used by Apache/FPM, for example, `www-data`.

If the user doesn't have write access to the tmp directory, you can change the location of the lock file and socket file by modifying the following settings in the extension's `.ini` file:

```
datadog.appsec.helper_runtime_path = /<directory with compatible permissions>/
```

### Confirm AAP is enabled

You can use the metric `datadog.apm.appsec_host` to check if AAP is running.

1. Go to **Metrics > Summary** in Datadog.
2. Search for the metric `datadog.apm.appsec_host`. If the metric doesn't exist, then there are no services running AAP. If the metric exists, the services are reported with the metric tags `host` and `service`.
3. Select the metric, and in the **Tags** section, search for `service` to see which services are running AAP.

If you are not seeing `datadog.apm.appsec_host`, check the [in-app instructions][3] to confirm that all steps for the initial setup are complete.

AAP data is sent with APM traces. See [APM troubleshooting][4] to [confirm APM setup][5] and check for [connection errors][6].

### Confirm tracer versions are updated

See the App and API Protection setup documentation to validate that you are using the right tracer version. These minimum versions are required to start sending telemetry data that includes library information.

### Ensure the communication of telemetry data

Ensure the `DD_INSTRUMENTATION_TELEMETRY_ENABLED` environment variable (`DD_TRACE_TELEMETRY_ENABLED` for Node.js) is set to `true`, or the corresponding system property for your language is enabled. For example in Java: `-Ddd.instrumentation.telemetry.enabled=true`

## Disabling AAP

To disable AAP, use one of the following methods.

### DD_APPSEC_ENABLED

If the `DD_APPSEC_ENABLED=true` environment variable is set for your service, remove the `DD_APPSEC_ENABLED=true` environment variable from your application configuration, and restart your service.

If your service is a PHP service, explicitly set the environment variable to `DD_APPSEC_ENABLED=false`, and if applicable, comment out the flag `datadog.appsec.enabled = On` from your `php.ini` configuration file. Then, restart your service. 

### Remote Configuration

If AAP was activated using [Remote Configuration][16], do the following: 
  1. Go to [Services][15].
  2. Select **App & API Protection in Monitoring Mode**.
  3. In the **App & API Protection** facet, enable **Monitoring Only**, **No data**, and **Ready to block**.
  4. Click on a service.
  5. In **Capabilities** > **App & API Protection** > **Threat Detection**, click **Deactivate**.

<div class="alert alert-info">If AAP was activated using <a href="https://app.datadoghq.com/organization-settings/remote-config">Remote Configuration</a>, you can use a <strong>Deactivate</strong> button. If AAP was activated using local configuration, the <strong>Deactivate</strong> button is not an option.</div>

### Bulk disable

To disable AAP on your services in bulk, do the following: 
  1. Go to [Services][15].
  2. In the **App & API Protection** facet, enable **Monitoring Only**, **No data**, and **Ready to block**.
  3. Select the checkboxes for the services where you want to disable threat detection.
  4. In **Bulk Actions**, select **Deactivate threat detection on (number of) services**.



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: https://app.datadoghq.com/security/appsec/
[3]: https://app.datadoghq.com/security/appsec?instructions=all
[4]: /tracing/troubleshooting/
[5]: /tracing/troubleshooting/#confirm-apm-setup-and-agent-status
[6]: /tracing/troubleshooting/connection_errors/
[7]: /security/default_rules/security-scan-detected/
[8]: /tracing/troubleshooting/tracer_startup_logs/
[9]: /tracing/glossary/#spans
[10]: /tracing/troubleshooting/#tracer-debug-logs
[12]: https://app.datadoghq.com/security/appsec/vm
[13]: /security/code_security/iast/
[14]: /security/code_security/software_composition_analysis
[15]: https://app.datadoghq.com/security/configuration/asm/services-config
[16]: https://app.datadoghq.com/organization-settings/remote-config