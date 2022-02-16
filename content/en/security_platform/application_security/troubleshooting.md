---
title: Troubleshooting Application Security Monitoring
kind: documentation
further_reading:
- link: "/security_platform/application_security/"
  tag: "Documentation"
  text: "Monitoring Threats with Datadog Application Security"
- link: "/security_platform/application_security/getting_started/"
  tag: "Documentation"
  text: "Get Started Using Application Security to Detect Threats"
- link: "/security_platform/application_security/setup_and_configure/#compatibility"
  tag: "Documentation"
  text: "Programming Language and Framework Compatibility"
---

If you experience unexpected behavior with Datadog Application Security, there are common issues you can investigate, as mentioned below. If you continue to have trouble, reach out to [Datadog support][1] for further assistance. 

## Application Security rate limits

Application Security traces are rate-limited to 100 traces per second. Traces sent after the limit are not reported. Contact [Datadog support][1] if you need to change the limit.

## No Suspicious Requests detected by Application Security

There are a series of steps that must run successfully for threat information to appear in the Application Security [Trace and Signals Explorer][2]. It is important to check each step when investigating this issue. Additional troubleshooting steps for specific languages are in the language tab at the end.

### Confirm Application Security is enabled

Check your [tracer startup logs][3]. If `appsec_enabled` is `true`, then Application Security is enabled and running.

Alternatively, you can use the metric `datadog.apm.appsec_host` to check if Application Security is running.

1. Go to **Metrics > Summary** in Datadog.
2. Search for the metric `datadog.apm.appsec_host`. If the metric doesn’t exist, then there are no services running Application Security. If the metric exists, the services are reported with the metric tags `host` and `service`.
3. Select the metric, and in the **Tags** section, search for `service` to see which services are running Application Security.

If you are not seeing `datadog.apm.appsec_host`, check the [in-app instructions][4] to confirm that all steps for the initial setup are complete.

Application Security data is sent with APM traces. See [APM troubleshooting][5] to [confirm APM setup][6] and check for [connection errors][7].

### Send a test attack to your application

 To test your Application Security setup, trigger the [Security Scanner Detected][8] rule by running a file that contains the following curl script: 

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,NodeJS" >}}
{{< programming-lang lang="java" >}}

```curl
for ((i=1;i<=200;i++)); 
do
# Target existing service’s routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service’s routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

**Note:** The `dd-test-scanner-log` value is supported in the most recent releases and in the application security event configuration file version >= 1.2.5.

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

```curl
for ((i=1;i<=200;i++)); 
do
# Target existing service’s routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service’s routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

**Note:** The `dd-test-scanner-log` value is supported in the most recent releases and in the application security event configuration file version >= 1.2.5.

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

 ```curl
 for ((i=1;i<=200;i++)); 
do
# Target existing service’s routes
curl https://your-application-url/existing-route -A Arachni/v1.0;
# Target non existing service’s routes
curl https://your-application-url/non-existing-route -A Arachni/v1.0;
done
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

 ```curl
 for ((i=1;i<=200;i++)); 
do
# Target existing service’s routes
curl https://your-application-url/existing-route -A Arachni/v1.0;
# Target non existing service’s routes
curl https://your-application-url/non-existing-route -A Arachni/v1.0;
done
```

{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

```curl
for ((i=1;i<=200;i++)); 
do
# Target existing service’s routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service’s routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```

**Note:** The `dd-test-scanner-log` value is supported in the most recent releases and in the application security event configuration file version >= 1.2.5.

{{< /programming-lang >}}
{{< programming-lang lang="NodeJS" >}}

```curl
for ((i=1;i<=200;i++)); 
do
# Target existing service’s routes
curl https://your-application-url/existing-route -A dd-test-scanner-log;
# Target non existing service’s routes
curl https://your-application-url/non-existing-route -A dd-test-scanner-log;
done
```
**Note:** The `dd-test-scanner-log` value is supported in the most recent releases and in the application security event configuration file version >= 1.2.5.

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

A few minutes after you enable your application and exercise it, and if it's successful, threat information appears in the [Trace and Signals Explorer][2].

{{< img src="/security_platform/application_security/application-security-signal.png" alt="Security Signal details page showing tags, metrics, suggested next steps, and attacker IP addresses associated with a threat." style="width:100%;" >}}

### Check if required tracer integrations are deactivated

Application Security relies on certain tracer integrations. If they are deactivated, Application Security won't work. To see if there are deactivated integrations, look for `disabled_integrations` in your [startup logs][3].

The required integrations vary by language.

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,NodeJS" >}}
{{< programming-lang lang="java" >}}

For [Java][1], the required integrations are the following:

- servlet
- servlet-2
- servlet-3
- servlet-request-body
- grizzly
- grizzly-char-body
- grizzly-byte-body
- grizzly-filterchain
- spring-web
- spring-webflux


[1]: /security_platform/application_security/setup_and_configure/
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

For [.NET][1], the ASP.NET integration is required.

**Note:** If ASP.NET Core is disabled, Application Security should still work with this framework.


[1]: /security_platform/application_security/setup_and_configure/
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

The are no required integrations for [PHP][1].


[1]: /security_platform/application_security/setup_and_configure/
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

For [Go][1], the required integrations are the following:

- [gRPC][2]
- [net/http][3]
- [Gorilla Mux][4]
- [Echo][5]
- [Chi][6]


[1]: /security_platform/application_security/setup_and_configure/
[2]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc#example-package-Server
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http#example-package
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux#example-package
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4#example-package
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi.v5#example-package
{{< /programming-lang >}}
{{< programming-lang lang="NodeJS" >}}

For [NodeJS][1], the HTTP integration is required.


[1]: /security_platform/application_security/setup_and_configure/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

For [Ruby][1], the [Rack][2] integration is required. Ruby tracer version `1.0.0.beta1` or higher is also required. See information on [migrating from 0.x to 1.x][3]. 

**Note:** Rack can be manually added or automatically added with the [Rails][4] or [Sinatra][5] integration. If manually added, the tracer middleware must appear before the security middleware in the Rack stack.


[1]: /security_platform/application_security/setup_and_configure/
[2]: /tracing/setup_overview/setup/ruby/#rack
[3]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/UpgradeGuide.md#from-0x-to-10
[4]: /tracing/setup_overview/setup/ruby/#rails
[5]: /tracing/setup_overview/setup/ruby/#sinatra
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Check Datadog Agent configuration

 To troubleshoot this step of the process, do the following: 

- Check the details of the running Agent at this address `http://<agent-machine-name>:<agent-port>/info`, usually `http://localhost:8126/info`. 
- Ensure there are no Agent transmission errors related to spans in your [tracer logs][8]. 
- If the Agent is installed on a separate machine, check that `DD_AGENT_HOST` and, optionally, `DD_TRACE_AGENT_PORT` are set, or that `DD_TRACE_AGENT_URL` is set for the application tracing library.

### Check Datadog Agent to backend configuration

Application Security data is sent over [spans][9]. To confirm that spans are successfully transmitted to Datadog, check that your tracer logs contain logs that look similar to this:

```
2021-11-29 21:19:58 CET | TRACE | INFO | (pkg/trace/info/stats.go:111 in LogStats) | [lang:.NET lang_version:5.0.10 interpreter:.NET tracer_version:1.30.1.0 endpoint_version:v0.4] -> traces received: 2, traces filtered: 0, traces amount: 1230 bytes, events extracted: 0, events sampled: 0
```

If spans are not being transmitted, then the tracer logs will contain logs similar to this:

```
2021-11-29 21:18:48 CET | TRACE | INFO | (pkg/trace/info/stats.go:104 in LogStats) | No data received
```

## Troubleshooting by language

Below are additional troubleshooting steps for specific languages.

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,NodeJS" >}}
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

| Platform 	 | Log directory 	|
|------------|----------------|
| Docker 	   | The container's directory `/var/log/datadog/dotnet/`. A recommended option is to mount the log folder on the host machine using [volumes][1]. |
| Linux	     | /var/log/datadog/dotnet/	                                  |
| Windows 	 | C:\ProgramData\Datadog .NET Tracer\logs                    |

[1]: https://docs.docker.com/storage/volumes/
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

For PHP, to start troubleshooting issues with the Datadog Application Security extension, enable debug logs in the Application Security extension’s `.ini` file.

The extension's `ini` file is usually found in `/etc/php/<version>/xxx/conf.d/98-ddappsec.ini`, but the location may differ depending on your installation. Look at the beginning of the `phpinfo()` output to identify the directory that is scanned for `.ini` files, if any. In the `.ini` file, set the following configuration options with the following: 

```php
ddappsec.log_level=‘debug’
ddappsec.helper_extra_args=‘--log_level=debug’
ddappsec.helper_log_file=‘/tmp/helper.log’
```

The extension outputs logs to the default `php_error` log file. If there are no logs in the file, add the following to the `.ini` file:

```php
ddappsec.log_file=’tmp/extension.log’
```

### Installation fails to find PHP
If the installation script is unable to find the correct PHP version, you can set the `--php-bin` to the PHP binary location, for example:

```
$ php dd-library-php-setup.php --php-bin /usr/bin/php7.4 --tracer-version=latest --appsec-version=latest
```
### Connection to helper failed
If the Application Security extension is unable to communicate with the helper process, the following warning occurs:

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

If the user doesn’t have write access to the tmp directory, you can change the location of the lock file and socket file by modifying the following settings in the extension’s `.ini` file:

```
ddappsec.helper_socket_path = /<directory with compatible permissions>/ddappsec.sock
ddappsec.helper_lock_path = /<directory with compatible permissions>/ddappsec.lock
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

#### Installing the C toolchain

CGO requires the following:

- The `gcc` compiler for the target `GOOS` and `GOARCH`.
- The C library headers.

To install those libraries, use the command based on your OS:

| OS                   | Installation Command          |
|----------------------|-------------------------------|
| Debian, Ubuntu       | $ apt install gcc libc6-dev   |
| Alpine               | $ apk add gcc musl-dev	       |
| RHEL, CentOS, Fedora | $ yum install gcc glibc-devel |
| macOS	               | xcode-select --install        |

#### Enable CGO

Follow the below instructions based on your situation:

- **You are not explicitly disabling CGO yourself.**
  
  - Set the `CGO_ENABLED` environment variable to `1` during the program compilation to enable it. For example:

    ```go
      env CGO_ENABLED=1 go build -tags appsec ./my/app
    ```

  - You might also have to install the [C toolchain](#installing-the-c-toolchain). 

- **You are explicitly disabling CGO to statically link your Go program.**
  
  Static linking isn’t supported. If you can’t enable CGO for this reason, contact [Datadog support][1] for additional help to get Application Security added to your application. 

[1]: /help/
{{< /programming-lang >}}
{{< programming-lang lang="NodeJS" >}}

For NodeJS, if you don’t see Application Security threat information in the [Trace and Signals Explorer][1], follow these steps to troubleshoot the issue:

1. Confirm the latest version of Application Security is running by checking that `appsec_enabled` is `true` in the [startup logs][2]

    a. If you don’t see startup logs after a request has been sent, add the environment variable `DD_TRACE_STARTUP_LOGS=true` to enable startup logs. Check the startup logs for `appsec_enabled` is `true`.

    b. If `appsec_enabled` is `false`, then Application Security was not enabled correctly. See [installation instructions][3].

    c. If `appsec_enabled` is not in the startup logs, the latest Application Security version needs to be installed. See [installation instructions][3].

2. Is the tracer working? Can you see relevant traces on the APM dashboard? 

    Application Security relies on the tracer so if you don’t see traces, then the tracer might not be working. See [APM Troubleshooting][4].

3. In your application directory, run the command `npm explore @datadog/native-appsec -- npm run install` and restart your app.

    a. If `@datadog/native-appsec` is not found then the installation is incorrect. See [installation instructions][3].
    
    b. If `@datadog/native-appsec` is found when starting your application, add the command to your runtime start script.

    c. If the tracer still does not work, you might be running an unsupported runtime.

4. To enable logs, add the following environment variables: 

    ```
    DD_TRACE_DEBUG=1
    DD_TRACE_LOG_LEVEL=info
    ```

[1]: https://app.datadoghq.com/security/appsec/
[2]: /tracing/troubleshooting/tracer_startup_logs/
[3]: /security_platform/application_security/getting_started/nodejs/?tab=dockercli
[4]: /tracing/troubleshooting/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

For Ruby, if you don’t see Application Security threat information in the [Trace and Signals Explorer][1] after a few minutes, enable tracer diagnostics for [debug logs][2] in the file `config/initializers/datadog-tracer.rb`. For example:

```ruby
Datadog.configure do |c|
  c.diagnostics.debug = true
end
```

Debug logs are verbose but useful. If you open up a ticket with [Datadog support][1], forward the logs with your request.

#### Is AppSec correctly enabled?

Application Security has been correctly enabled if you see logs such as:

```
D, [2021-12-14T11:03:32.167125 #73127] DEBUG -- ddtrace: [ddtrace] (libddwaf/lib/datadog/security/waf.rb:296:in `block in logger=') {:level=>:ddwaf_log_info, :func=> "ddwaf_set_log_cb", :file=>"PowerWAFInterface.cpp", :message=>"Sending log messages to binding, min level trace"}
D, [2021-12-14T11:03:32.200491 #73127] DEBUG -- ddtrace: [ddtrace] (libddwaf/lib/datadog/security/waf.rb:296:in `block in logger=') {:level=>:ddwaf_log_debug, :func= >"parse", :file=>"parser_v2.cpp", :message=>"Loaded 124 rules out of 124 available in the ruleset"}
```

If you do not see those logs, check the following:

- If the correct Application Security environment variables are set for your application process. 
- The latest gem version is installed.
- The tracer is configured correctly and sending APM traces to your APM dashboard.

#### Is Application Security called for each HTTP request?

To confirm that Application Security is called for each HTTP request, trigger a [test attack](#send-a-test-attack-to-your-application) and look for these logs:

```
D, [2022-01-19T21:25:50.579745 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/security/reactive/operation.rb:14:in `initialize') operation: rack.request initialize
D, [2022-01-19T21:25:50.580300 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/security/contrib/rack/gateway/watcher.rb:25:in `block (2 levels) in watch') root span: 964736568335365930
D, [2022-01-19T21:25:50.580371 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/security/contrib/rack/gateway/watcher.rb:26:in `block (2 levels) in watch') active span: 964736568335365930
D, [2022-01-19T21:25:50.581061 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/security/contrib/rack/reactive/request.rb:34:in `block in subscribe') reacted to ["request.headers", "request.uri.raw", "request.query", "request.cookies", "request.body.raw"]: [{"version"=>"HTTP/1.1", "host"=>"127.0.0.1:9292", "accept"=>"*/*", "user-agent"=>"Nessus SOAP"}, "http://127.0.0.1:9292/", [], {}, ""]
```

If you don’t see those logs, try the following:

- Check that another upstream security system is not filtering requests based on the test header value, which would prevent the request from reaching the application. 
- Send another [test attack](#send-a-test-attack-to-your-application) using another user's agent values in the curl command to see if the threat information is successfully sent.
- Look in the application logs for the exact request you ran to confirm the request reached the application, and was not responded to by another upstream system.

If the Rack integration was configured manually, sometimes a known issue prevents Application Security from working. For example:

```
Datadog.configure do |c|
  c.use :rails
  ...
  c.use :rack, web_service_name: "something", request_queuing: true
```

If `c.use :rack` is present, remove it to see if the check passes.

#### Is Application Security detecting HTTP request security threats?

To confirm that Application Security is detecting security threats, trigger a [test attack](#send-a-test-attack-to-your-application), and look for these logs:

```
D, [2021-12-14T22:39:53.268820 #106051] DEBUG -- ddtrace: [ddtrace] (ddtrace/lib/datadog/security/contrib/rack/reactive/request.rb:63:in `block in subscribe') WAF: #<struct Datadog::Security::WAF::Result action=:monitor, data=[{"rule"=>{"id"=>"ua0-600-10x", "name"=>"Nessus", "tags"=>{"type"=>"security_scanner", "category"=>"attack_attempt"}}, "rule_matches"=>[{"operator"=>"match_regex", "operator_value"=>"(?i)^Nessus(/|([ :]+SOAP))", "parameters"=>[{"address"=>"server.request.headers.no_cookies", "key_path"=>["user-agent"], "value"=>"Nessus SOAP", "highlight"=>["Nessus SOAP"]}]}]}], perf_data=nil, perf_total_runtime=20519>
```
If you don’t see those logs, check that another upstream security system is not filtering out the requests or altering them based on the test header value. 

#### Is the tracer sending traces with security data?
Application Security data is sent with APM traces. To confirm that Application Security correctly detects and inserts security data into traces, trigger a [test attack](#send-a-test-attack-to-your-application), and look for these tracer logs:

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

Wait a minute for the agent to forward the traces, then check that the traces show up in the APM dashboard. The security information in the traces may take additional time to be processed by Datadog before showing up as suspicious requests in the Application Security [Trace and Signals Explorer][1].

#### Is Application Security forwarding security threats to the Agent?

To confirm that Application Security is detecting and forwarding security threats to the agent, trigger a [test attack](#send-a-test-attack-to-your-application), and look for these logs:

```
D, [2021-12-14T11:03:37.347815 #73127] DEBUG -- ddtrace: [ddtrace] (ddtrace/lib/datadog/security/worker.rb:54:in `block in perform') processed events: [{:event_id=>"eb1eca52-74e1-435b-9a6c-44046d3765ee", :event_type=>"appsec.threat.attack", :event_version=>"0.1.0", :detected_at=>"2021-12-14T10:03:37Z", :type=>"security_scanner", :blocked=>false, :rule=>{:id=>"ua0-600-10x", :name=>"Nessus", :set=>"security_scanner"}, :rule_match=>{:operator=>"match_regex", :operator_value=>"(?i)^Nessus(/|([ :]+SOAP))", :parameters=>[{:name=>"server.request.headers.no_cookies", :key_path=>["user-agent"], :value=>"Nessus SOAP", :highlight=>["Nessus SOAP"]}]}, :context=>{:actor=>{:context_version=>"0.1.0", :ip=>{:address=>"127.0.0.1"}, :identifiers=>nil, :_id=>nil}, :host=>{:os_type=>"Linux", :hostname=>"procyon-vm", :context_version=>"0.1.0"}, :http=>{:context_version=>"0.1.0", :request=>{:scheme=>"http", :method=>"GET", :url=>"http://127.0.0.1:9292/admin.php", :host=>"127.0.0.1", :port=>9292, :path=>"/admin.php", :remote_ip=>"127.0.0.1", :headers=>{"host"=>"127.0.0.1:9292", "accept"=>"*/*", "user-agent"=>"Nessus SOAP"}, :useragent=>"Nessus SOAP"}, :response=>{:status=>404, :blocked=>false, :headers=>{"Content-Type"=>"text/plain"}}}, :service=>{:context_version=>"0.1.0", :name=>"rack", :environment=>nil}, :span=>{:context_version=>"0.1.0", :id=>4439751766880249768}, :tags=>{:context_version=>"0.1.0", :values=>["_dd.appsec.enabled:1", "_dd.runtime_family:ruby", "service:rack"]}, :trace=>{:context_version=>"0.1.0", :id=>2632764434813487337}, :tracer=>{:context_version=>"0.1.0", :runtime_type=>"ruby", :runtime_version=>"3.0.2", :lib_version=>"0.54.1"}}}]
```

Wait a minute for the Agent to forward the threat information to Datadog, then check that the traces show up in the APM dashboard.

[1]: https://app.datadoghq.com/security/appsec/
[2]: /tracing/troubleshooting/#tracer-debug-logs
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

If you continue to have issues with Application Security, contact [Datadog support][1] with the following information: 

- Confirmation that the [test attack](#send-a-test-attack-to-your-application) was successfully sent 
- Tracer [startup][3] or [debug][10] logs

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: https://app.datadoghq.com/security/appsec/
[3]: /tracing/troubleshooting/tracer_startup_logs/
[4]: https://app.datadoghq.com/security/appsec?instructions=all
[5]: /tracing/troubleshooting/
[6]: /tracing/troubleshooting/#confirm-apm-setup-and-agent-status
[7]: /tracing/troubleshooting/connection_errors/
[8]: /security_platform/default_rules/security-scan-detected/
[9]: /tracing/visualization/#spans
[10]: /tracing/troubleshooting/#tracer-debug-logs
