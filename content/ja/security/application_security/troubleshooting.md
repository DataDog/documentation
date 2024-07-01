---
title: Troubleshooting Application Security Management
aliases:
  - /security_platform/application_security/troubleshooting
further_reading:
- link: /security/application_security/
  tag: Documentation
  text: Monitoring Threats with Datadog Application Security Management
- link: /security/application_security/enabling/
  tag: Documentation
  text: Enable Application Security Management to Start Detecting Threats
- link: /security/application_security/enabling/compatibility/
  tag: Documentation
  text: Programming Language and Framework Compatibility
- link: /security/application_security/how-appsec-works/
  tag: Documentation
  text: How Application Security Management Works in Datadog
---


## Overview

If you experience unexpected behavior with Datadog Application Security Management (ASM), there are common issues you can investigate, as mentioned below. If you continue to have trouble, reach out to [Datadog support][1] for further assistance.

## ASM rate limits

ASM traces are rate-limited to 100 traces per second. Traces sent after the limit are not reported. Contact [Datadog support][1] if you need to change the limit.

## No security traces detected by ASM

There are a series of steps that must run successfully for threat information to appear in the ASM [Trace and Signals Explorer][2]. It is important to check each step when investigating this issue. Additional troubleshooting steps for specific languages are in the language tab at the end.

### Confirm ASM is enabled

You can use the metric `datadog.apm.appsec_host` to check if ASM is running.

1. Go to **Metrics > Summary** in Datadog.
2. Search for the metric `datadog.apm.appsec_host`. If the metric doesn't exist, then there are no services running ASM. If the metric exists, the services are reported with the metric tags `host` and `service`.
3. Select the metric, and in the **Tags** section, search for `service` to see which services are running ASM.

If you are not seeing `datadog.apm.appsec_host`, check the [in-app instructions][3] to confirm that all steps for the initial setup are complete.

ASM data is sent with APM traces. See [APM troubleshooting][4] to [confirm APM setup][5] and check for [connection errors][6].

### Send a test attack to your application

 To test your ASM setup, trigger the [Security Scanner Detected][7] rule by running a file that contains the following curl script:

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,Node.js,python" >}}
{{< programming-lang lang="java" >}}

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

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

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

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

 ```bash
 for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A Arachni/v1.0;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A Arachni/v1.0;
done
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

 ```bash
 for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A Arachni/v1.0;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A Arachni/v1.0;
done
```

{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

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

{{< /programming-lang >}}
{{< programming-lang lang="Node.js" >}}

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

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

```bash
for ((i=1;i<=250;i++));
do
# Target existing service's routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service's routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

A few minutes after you enable your application and exercise it, and if it's successful, threat information appears in the [Trace and Signals Explorer][2].

{{< img src="/security/security_monitoring/explorer/signal_panel_v2.png" alt="Security Signal details page showing tags, metrics, suggested next steps, and attacker IP addresses associated with a threat." style="width:100%;" >}}

### Check if required tracer integrations are deactivated

ASM relies on certain tracer integrations. If they are deactivated, ASM won't work. To see if there are deactivated integrations, look for `disabled_integrations` in your [startup logs][8].

The required integrations vary by language.

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,Node.js,python" >}}
{{< programming-lang lang="java" >}}

For [Java][1], if you are using any of the following technologies, the respective integration is required:

- grizzly
- grizzly-filterchain
- jersey
- jetty
- ratpack
- ratpack-request-body (also requires ratpack)
- resteasy
- servlet
- servlet-2
- servlet-3
- servlet-request-body (also requires servlet)
- spring-web
- tomcat

[1]: /security/application_security/enabling/compatibility/java
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

For [.NET][1], the ASP.NET integration is required.

**Note:** If ASP.NET Core is disabled, ASM should still work with this framework.

[1]: /security/application_security/enabling/compatibility/dotnet
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

There are no required integrations for [PHP][1].
<p></p>

[1]: /security/application_security/enabling/compatibility/php
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

The following [Go][1] frameworks should be instrumented using the out-of-the-box APM integrations:

- [gRPC][2]
- [net/http][3]
- [Gorilla Mux][4]
- [Echo][5]
- [Chi][6]

If your framework is not supported, [create a new issue][7] in the Go repository.

[1]: /security/application_security/enabling/compatibility/go
[2]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc#example-package-Server
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http#example-package
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux#example-package
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4#example-package
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi.v5#example-package
[7]: https://github.com/DataDog/dd-trace-go/issues/new?title=Missing%20appsec%20framework%20support
{{< /programming-lang >}}
{{< programming-lang lang="Node.js" >}}

For [Node.js][1], the HTTP integration is required.
<p></p>

[1]: /security/application_security/enabling/compatibility/nodejs
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

For [Ruby][1], the [Rack][2] integration is required. Ruby tracer version `1.0.0` or higher is also required. See information on [migrating from 0.x to 1.x][3].

**Note:** Rack can be manually added or automatically added with the [Rails][4] or [Sinatra][5] integration. If manually added, the tracer middleware must appear before the security middleware in the Rack stack.

[1]: /security/application_security/enabling/compatibility/ruby
[2]: /tracing/trace_collection/dd_libraries/ruby/#rack
[3]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide.md#from-0x-to-10
[4]: /tracing/trace_collection/dd_libraries/ruby/#rails
[5]: /tracing/trace_collection/dd_libraries/ruby/#sinatra
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

For [Python][1], the WSGI integration is required along with the integration for the
framework you're using, such as the Django or Flask integration.
<p></p>

[1]: /security/application_security/enabling/compatibility/python
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Check Datadog Agent configuration

 To troubleshoot this step of the process, do the following:

- Check the details of the running Agent at this address `http://<agent-machine-name>:<agent-port>/info`, usually `http://localhost:8126/info`.
- Ensure there are no Agent transmission errors related to spans in your [tracer logs][7].
- If the Agent is installed on a separate machine, check that `DD_AGENT_HOST` and, optionally, `DD_TRACE_AGENT_PORT` are set, or that `DD_TRACE_AGENT_URL` is set for the application tracing library.

### Check if spans are successfully transmitted to Datadog

ASM data is sent over [spans][9]. To confirm that spans are successfully transmitted to Datadog, check that your tracer logs contain logs that look similar to this:

```
2021-11-29 21:19:58 CET | TRACE | INFO | (pkg/trace/info/stats.go:111 in LogStats) | [lang:.NET lang_version:5.0.10 interpreter:.NET tracer_version:1.30.1.0 endpoint_version:v0.4] -> traces received: 2, traces filtered: 0, traces amount: 1230 bytes, events extracted: 0, events sampled: 0
```

If spans are not being transmitted, then the tracer logs will contain logs similar to this:

```
2021-11-29 21:18:48 CET | TRACE | INFO | (pkg/trace/info/stats.go:104 in LogStats) | No data received
```

## Troubleshooting by language

Below are additional troubleshooting steps for specific languages.

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,Node.js,python" >}}
{{< programming-lang lang="java" >}}
The Java library uses [SLF4J][1] for logging. Add the following runtime flags so that the tracer logs to a file:

```java
 -Ddatadog.slf4j.simpleLogger.defaultLogLevel=info
 -Ddatadog.slf4j.simpleLogger.logFile=dd.log
```

After the service starts, the tracer logs to the specified file. Datadog recommends using `INFO` for the log level because `DEBUG` logs are verbose.

[1]: https://www.slf4j.org/
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

The .NET library logs to a file and cannot log to `stdout`/`stderr`. The default log level is `INFO`. To enable `DEBUG` logs, set `DD_TRACE_DEBUG=true`.

The log files are available in the following directories:

| Platform   | Log directory    |
|------------|----------------|
| Docker       | The container's directory `/var/log/datadog/dotnet/`. A recommended option is to mount the log folder on the host machine using [volumes][1]. |
| Linux      | /var/log/datadog/dotnet/                                   |
| Windows    | C:\ProgramData\Datadog .NET Tracer\logs                    |

[1]: https://docs.docker.com/storage/volumes/
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

For PHP, to start troubleshooting issues with the Datadog ASM extension, enable debug logs in the ASM extension's `.ini` file.

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
If the ASM extension is unable to communicate with the helper process, the following warning occurs:

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

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

#### Confirm ASM is enabled in the running application

[Tracer startup logs][1] show the tracer configuration and whether ASM is enabled or not. If `appsec` is `true`, then ASM is enabled and running.

For example, the following startup log shows that ASM is disabled:

```
2022/02/17 14:49:00 Datadog Tracer v1.36.0 INFO: DATADOG TRACER CONFIGURATION {"date":"2022-02-17T14:49:00+01:00","os_name":"Linux (Unknown Distribution)","os_version":"5.13.0","version":"v1.36.0","lang":"Go","lang_version":"go1.17.1","env":"prod","service":"grpcserver","agent_url":"http://localhost:8126/v0.4/traces","debug":false,"analytics_enabled":false,"sample_rate":"NaN","sampling_rules":null,"sampling_rules_error":"","service_mappings":null,"tags":{"runtime-id":"69d99219-b68f-4718-9419-fa173a79351e"},"runtime_metrics_enabled":false,"health_metrics_enabled":false,"profiler_code_hotspots_enabled":false,"profiler_endpoints_enabled":false,"dd_version":"","architecture":"amd64","global_service":"","lambda_mode":"false","appsec":false,"agent_features":{"DropP0s":false,"Stats":false,"StatsdPort":0}}
```

#### Enable debug logs

Enable debug logs with the environment variable `DD_TRACE_DEBUG=1`. The ASM library will log to the standard error output.

**Note:** ASM only outputs logs when it is enabled. Use the environment variable `DD_APPSEC_ENABLED=1` to enable ASM.

[1]: /tracing/troubleshooting/tracer_startup_logs/
{{< /programming-lang >}}
{{< programming-lang lang="Node.js" >}}

Use this [migration guide][1] to assess any breaking changes if you upgraded your Node.js library from 1.x to 2.x.

If you don't see ASM threat information in the [Trace and Signals Explorer][2] for your Node.js application, follow these steps to troubleshoot the issue:

1. Confirm the latest version of ASM is running by checking that `appsec_enabled` is `true` in the [startup logs][3]

    a. If you don't see startup logs after a request has been sent, add the environment variable `DD_TRACE_STARTUP_LOGS=true` to enable startup logs. Check the startup logs for `appsec_enabled` is `true`.

    b. If `appsec_enabled` is `false`, then ASM was not enabled correctly. See [installation instructions][4].

    c. If `appsec_enabled` is not in the startup logs, the latest ASM version needs to be installed. See [installation instructions][4].

2. Is the tracer working? Can you see relevant traces on the APM dashboard?

    ASM relies on the tracer so if you don't see traces, then the tracer might not be working. See [APM Troubleshooting][5].

3. In your application directory, run the command `npm explore @datadog/native-appsec -- npm run install` and restart your app.

    a. If `@datadog/native-appsec` is not found then the installation is incorrect. See [installation instructions][4].

    b. If `@datadog/native-appsec` is found when starting your application, add the command to your runtime start script.

    c. If the tracer still does not work, you might be running an unsupported runtime.

4. To enable logs, add the following environment variables:

    ```
    DD_TRACE_DEBUG=1
    DD_TRACE_LOG_LEVEL=info
    ```

[1]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[2]: https://app.datadoghq.com/security/appsec/
[3]: /tracing/troubleshooting/tracer_startup_logs/
[4]: /security/application_security/enabling/nodejs/?tab=dockercli
[5]: /tracing/troubleshooting/
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

If you don't see ASM threat information in the [Trace and Signals Explorer][1] for your Python application, check that ASM is running and that your tracer is working.

1. Set your application's log level to `DEBUG` to confirm that ASM is running:

   ```python
   import logging
   logging.basicConfig(level=logging.DEBUG)
   ```

   Then, run any HTTP call to the application. You should see the following log:

   ```
   DEBUG:ddtrace.appsec.processor:[DDAS-001-00] Executing AppSec In-App WAF with parameters:
   ```

   If this log is not present, ASM is not running.

2. Is the tracer working? Can you see relevant traces on the APM dashboard?

   ASM relies on the tracer. If you don't see traces, then the tracer might not be working. See [APM Troubleshooting][2].


[1]: https://app.datadoghq.com/security/appsec/
[2]: /tracing/troubleshooting/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

For Ruby, if you don't see ASM threat information in the [Trace and Signals Explorer][1] after a few minutes, enable tracer diagnostics for [debug logs][2]. For example:

```ruby
Datadog.configure do |c|
  c.diagnostics.debug = true  # increase general log level to debug
  c.appsec.waf_debug = true   # also enable WAF-specific log verbosity to highest level
end
```

Debug logs are verbose but useful. If you open up a ticket with [Datadog support][1], forward the logs with your request.

#### Is ASM correctly enabled?

ASM has been correctly enabled if you see logs such as:

```
D, [2021-12-14T11:03:32.167125 #73127] DEBUG -- ddtrace: [ddtrace] (libddwaf/lib/datadog/appsec/waf.rb:296:in `block in logger=') {:level=>:ddwaf_log_info, :func=> "ddwaf_set_log_cb", :file=>"PowerWAFInterface.cpp", :message=>"Sending log messages to binding, min level trace"}
D, [2021-12-14T11:03:32.200491 #73127] DEBUG -- ddtrace: [ddtrace] (libddwaf/lib/datadog/appsec/waf.rb:296:in `block in logger=') {:level=>:ddwaf_log_debug, :func= >"parse", :file=>"parser_v2.cpp", :message=>"Loaded 124 rules out of 124 available in the ruleset"}
```

If you do not see those logs, check the following:

- If the correct ASM environment variables are set for your application process.
- The latest gem version is installed.
- The tracer is configured correctly and sending APM traces to your APM dashboard.

#### Is ASM called for each HTTP request?

To confirm that ASM is called for each HTTP request, trigger a [test attack](#send-a-test-attack-to-your-application) and look for these logs:

```
D, [2022-01-19T21:25:50.579745 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/reactive/operation.rb:14:in `initialize') operation: rack.request initialize
D, [2022-01-19T21:25:50.580300 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/gateway/watcher.rb:25:in `block (2 levels) in watch') root span: 964736568335365930
D, [2022-01-19T21:25:50.580371 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/gateway/watcher.rb:26:in `block (2 levels) in watch') active span: 964736568335365930
D, [2022-01-19T21:25:50.581061 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/appsec/contrib/rack/reactive/request.rb:34:in `block in subscribe') reacted to ["request.headers", "request.uri.raw", "request.query", "request.cookies", "request.body.raw"]: [{"version"=>"HTTP/1.1", "host"=>"127.0.0.1:9292", "accept"=>"*/*", "user-agent"=>"Nessus SOAP"}, "http://127.0.0.1:9292/", [], {}, ""]
```

If you don't see those logs, try the following:

- Check that another upstream security system is not filtering requests based on the test header value, which would prevent the request from reaching the application.
- Send another [test attack](#send-a-test-attack-to-your-application) using another user agent value in the curl command to see if the threat information is successfully sent.
- Look in the application logs for the exact request you ran to confirm the request reached the application, and was not responded to by another upstream system.

If the Rack integration was configured manually, sometimes a known issue prevents ASM from working. For example:

```ruby
Datadog.configure do |c|
  c.tracing.instrument :rails
  ...
  c.tracing.instrument :rack, web_service_name: "something", request_queuing: true
```

If `c.tracing.instrument :rack` is present, remove it to see if the check passes.

#### Is ASM detecting HTTP request security threats?

To confirm that ASM is detecting security threats, trigger a [test attack](#send-a-test-attack-to-your-application), and look for these logs:

```
D, [2021-12-14T22:39:53.268820 #106051] DEBUG -- ddtrace: [ddtrace] (ddtrace/lib/datadog/appsec/contrib/rack/reactive/request.rb:63:in `block in subscribe') WAF: #<struct Datadog::AppSec::WAF::Result action=:monitor, data=[{"rule"=>{"id"=>"ua0-600-10x", "name"=>"Nessus", "tags"=>{"type"=>"security_scanner", "category"=>"attack_attempt"}}, "rule_matches"=>[{"operator"=>"match_regex", "operator_value"=>"(?i)^Nessus(/|([ :]+SOAP))", "parameters"=>[{"address"=>"server.request.headers.no_cookies", "key_path"=>["user-agent"], "value"=>"Nessus SOAP", "highlight"=>["Nessus SOAP"]}]}]}], perf_data=nil, perf_total_runtime=20519>
```
If you don't see those logs, check that another upstream security system is not filtering out the requests or altering them based on the test header value.

#### Is the tracer sending traces with security data?
ASM data is sent with APM traces. To confirm that ASM correctly detects and inserts security data into traces, trigger a [test attack](#send-a-test-attack-to-your-application), and look for these tracer logs:

```
Tags: [
   runtime-id => 0c3dfc67-9cf3-457c-a980-0229b203d048,
   _dd.runtime_family => ruby,
   appsec.event => true,
   _dd.appsec.json => {"triggers":[{"rule":{"id":"ua0-600-10x","name":"Nessus","tags":{"type":"security_scanner","category":"attack_attempt"}},"rule_matches":[{"operator":"match_regex","operator_value":"(?i)^Nessus(/|([ :]+SOAP))","parameters":[{"address":"server.request.headers.no_cookies","key_path":["user-agent"],"value":"Nessus SOAP","highlight":["Nessus SOAP"]}]}]}]},
   http.request.headers.host => 127.0.0.1:9292,
   http.request.headers.accept => */*,
   http.request.headers.user-agent => Nessus SOAP,
   http.response.headers.content-type => text/plain,
   http.host => 127.0.0.1,
   http.useragent => Nessus SOAP,
   network.client.ip => 127.0.0.1,
   _dd.origin => appsec,
   http.method => GET,
   http.url => /,
   http.base_url => http://127.0.0.1:9292,
   http.status_code => 200,
   http.response.headers.content_type => text/plain]
Metrics: [
   _dd.agent_psr => 1.0,
   system.pid => 155644.0,
   _dd.appsec.enabled => 1.0,
   _dd.measured => 1.0,
   _sampling_priority_v1 => 2.0]]
```

Wait a minute for the agent to forward the traces, then check that the traces show up in the APM dashboard. The security information in the traces may take additional time to be processed by Datadog before showing up as security traces in the ASM [Trace and Signals Explorer][1].

[1]: https://app.datadoghq.com/security/appsec/
[2]: /tracing/troubleshooting/#tracer-debug-logs
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}


## No vulnerabilities detected by Software Composition Analysis

There are a series of steps that must run successfully for vulnerability information to appear either in the [Service Catalog Security View][16] or in the [Vulnerability Explorer][12]. It is important to check each step when investigating this issue. 

### Confirm ASM is enabled

You can use the metric `datadog.apm.appsec_host` to check if ASM is running.

1. Go to **Metrics > Summary** in Datadog.
2. Search for the metric `datadog.apm.appsec_host`. If the metric doesn't exist, then there are no services running ASM. If the metric exists, the services are reported with the metric tags `host` and `service`.
3. Select the metric, and in the **Tags** section, search for `service` to see which services are running ASM.

If you are not seeing `datadog.apm.appsec_host`, check the [in-app instructions][3] to confirm that all steps for the initial setup are complete.

ASM data is sent with APM traces. See [APM troubleshooting][4] to [confirm APM setup][5] and check for [connection errors][6].

### Confirm tracer versions are updated

See the Application Security [set up documentation][11] to validate you you are using the right version of the tracer. These minimum versions are required to start sending telemetry data that includes library information.

### Ensure the communication of telemetry data

Ensure the `DD_INSTRUMENTATION_TELEMETRY_ENABLED` environment variable (`DD_TRACE_TELEMETRY_ENABLED` for NodeJS) is set to `true`, or the corresponding system property for your language is enabled. For example in Java: `-Ddd.instrumentation.telemetry.enabled=true`

## Disabling threat management and protection

To disable threat management, remove the `DD_APPSEC_ENABLED=true` environment variable from your application configuration, and restart your service.

If no `DD_APPSEC_ENABLED=true` environment variable is set for your service, do one of the following:
* If it's a PHP service: explicitly set the environment variable to `DD_APPSEC_ENABLED=false`, and restart your service.
* If threat management was activated using [Remote Configuration][16], do the following: 
  1. Go to [Services][15] (**ASM** > **Catalog** > **Services**).
  2. Select **Threat Management in Monitoring Mode**.
  3. In the **Threat Management** facet, enable **Monitoring Only**, **No data**, and **Ready to block**.
  4. Click on a service.
  5. In the service details, in **Threat Detection**, click **Deactivate**.

<div class="alert alert-info">If threat management was activated using <a href="https://app.datadoghq.com/organization-settings/remote-config">Remote Configuration</a>, you can use a <strong>Deactivate</strong> button. If threat management was activated using local configuration, the <strong>Deactivate</strong> button is not an option.</div>

* To disable threat management on your services in bulk, do the following: 
  1. Go to [Services][15].
  2. In the **Threat Management** facet, enable **Monitoring Only**, **No data**, and **Ready to block**.
  3. Select the check boxes for the services where you want to disable threat detection.
  4. In **Bulk Actions**, select **Deactivate Threat detection on (number of) services**.

## Disabling Software Composition Analysis

To disable [Software Composition Analysis][14]:

* Go to [Services][15], select **Software Composition Analysis (SCA)**, click on your service and then click **Deactivate**.
* To disable Software Composition Analysis on your services in bulk, click the check box in the list header and then under **Bulk Actions** select **Deactivate Software Composition Analysis (SCA) on (number of) services**.
* To disable Software Composition Analysis using the `DD_APPSEC_SCA_ENABLED` environment variable, remove the `DD_APPSEC_SCA_ENABLED=true` environment variable from your application configuration, and restart your service. This does not apply to PHP apps.

## Disabling Code Security

To disable [Code Security][13] vulnerability detection, remove the `DD_IAST_ENABLED=true` environment variable from your application configuration, and restart your service. This does not apply to PHP apps. 

If no `DD_IAST_ENABLED=true` environment variable is set for your service, do the following:
  1. Go to [Services][15].
  2. Select **Code Security**.
  3. Click on a service.
  4. In the service details, in **Vulnerability Detection**, click **Deactivate**.

## Need more help?

If you continue to have issues with ASM, contact [Datadog support][1] with the following information:

- Confirmation that the [test attack](#send-a-test-attack-to-your-application) was successfully sent
- Tracer [startup][8] or [debug][10] logs

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
[11]: /security/application_security/enabling/
[12]: https://app.datadoghq.com/security/appsec/vm
[13]: /security/application_security/code_security/
[14]: /security/application_security/software_composition_analysis
[15]: https://app.datadoghq.com/security/configuration/asm/services-config
[16]: https://app.datadoghq.com/organization-settings/remote-config
