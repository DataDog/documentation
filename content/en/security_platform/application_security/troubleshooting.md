---
title: Troubleshooting Application Security Monitoring
kind: documentation
further_reading:
- link: "/security_platform/getting_started/"
  tag: "Documentation"
  text: "Get Started Instrumenting Your Application to Send Signals"
- link: "/security_platform/application_security/"
  tag: "Documentation"
  text: "Monitoring Threats with Datadog Application Security"
- link: "/security_platform/application_security/setup_and_configure/#compatibility"
  tag: "Documentation"
  text: "Programming Language and Framework Compatibility"
---

If you experience unexpected behavior with Datadog Application Security, there are a few common issues you can investigate and this guide may help resolve issues quickly. If you continue to have trouble, reach out to [Datadog support][1] for further assistance. 

## Confirm Application Security is running

If `appsec_enabled` is `true` in the [tracer startup logs][2], then Application Security is running. 

Alternatively, you can use the metric `datadog.apm.appsec_host` to check if Application Security is running.

1. Go to **Metrics > Summary** in Datadog.
2. Search for the metric `datadog.apm.appsec_host`. If the metric doesn’t exist, then there are no services running Application Security. If the metric exists, the services are reported with the metric tags `host` and `service`.
3. Select the metric, and in the **Tags** section, search for `service` to see which services are running Application Security. 

## Application Security rate limits

Application Security traces are rate-limited to 100 traces per second. Traces sent after the limit are not reported. Contact [Datadog support][1] if you need to change the limit.

## Application Security events are missing in the dashboard

There are a series of steps that must run successfully for Application Security events to appear in the Application Security dashboard. It is important to check each step when investigating this issue. Additional troubleshooting steps for specific languages are in the language tab at the end.

### 1. Send a test attack to your application

Simulate an attack to test your Application Security setup using the following command:

```
curl -A Arachni/v YOUR_APP_URL
```

View the resulting Application Security event in the [Application Security dashboard][3]. 

It is possible that the test attack doesn't reach your application because of a firewall or another type of proxy server. It’s known that the following services block the Arachni test:

- AWS API Gateway: Removes the user-agent and malicious parameters, even when its built-in WAF is deactivated
- Extensible Service Proxy (ESP) by Google 

To ensure that the Arachni test isn’t blocked:

- Run the test from the machine hosting the service.
- Verify that curl returns 200.
- Verify that there is a trace with the attribute `@appsec.event:true`.
- If [debug logs][4] are available, look for the following logs to see if the test is being blocked:

  ```
  DAS-0011-00: AppSec In-App WAF returned: <full_iaw_output> Took <exec_duration> ms

  DDAS-0012-01: Detecting an attack from rule <rule_id>: <attack_info>

  DDAS-0012-02: Blocked attack from <full_iaw_output>
  ```

### 2. Check if required tracer integrations are deactivated

Application Security relies on certain tracer integrations, if they are deactivated then Application Security won't work. To see if there are deactivated integrations, look for `disabled_integrations` in the [startup logs][2].

The required integrations vary by language.

{{< programming-lang-wrapper langs="java,.NET,go,ruby,PHP,NodeJS" >}}
{{< programming-lang lang="java" >}}

For Java, the required integrations are the following:

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

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

For .Net, the required integrations are the following:

- AspNet

**Note:** If AspNetCore is disabled, Application Security should still work with this framework.

{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

**[NEED INFO]**

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

For Go, the required integrations are the following:

- net/http
- Chi
- Echo
- Gorilla/mux
- gRPC

**Note:** They can’t be deactivated but rather just not integrated into the program’s source code.

{{< /programming-lang >}}
{{< programming-lang lang="NodeJS" >}}

For NodeJS, the required integrations are the following:

- HTTP

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

For Ruby, the required integrations are the following:

- Rack

**Note:** Rack can be manually added or automatically added with the Rails or Sinatra integration. If manually added, the tracer middleware must appear before the security middleware in the Rack stack.

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### 3. Application to Datadog Agent

 To troubleshoot this step of the process, do the following: 

- Check the details of the running Agent at this address `http://<agent-machine-name>:<agent-port>/info`, usually `http://localhost:8126/info`. 
- Ensure there are no transmission errors related to spans in the [tracer logs][4]. 
- If the agent is installed on a separate machine, check that `DD_AGENT_HOST` and optionally `DD_TRACE_AGENT_PORT` are set, or that `DD_TRACE_AGENT_URL` is set for the application / tracing library.

### 4. Datadog Agent to backend

Application Security events are sent over [spans][5]. To confirm that spans are successfully transmitted to the backend, check that the tracer logs contain logs like this:

```
2021-11-29 21:19:58 CET | TRACE | INFO | (pkg/trace/info/stats.go:111 in LogStats) | [lang:.NET lang_version:5.0.10 interpreter:.NET tracer_version:1.30.1.0 endpoint_version:v0.4] -> traces received: 2, traces filtered: 0, traces amount: 1230 bytes, events extracted: 0, events sampled: 0
```

If spans are not being transmitted, then the tracer logs will contain logs like this:

```
2021-11-29 21:18:48 CET | TRACE | INFO | (pkg/trace/info/stats.go:104 in LogStats) | No data received
```

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
If the Application Security extension is unable to communicate with the helper process, you will see the following log warning:

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

For NodeJS, if you don’t see Application Security events in the Application Security dashboard, follow these steps to troubleshoot the issue:

1. Confirm the latest version of Application Security is running by checking that `appsec_enabled` is `true` in the [startup logs][1]

    a. If you don’t see startup logs after a request has been sent, add the environment variable `DD_TRACE_STARTUP_LOGS=true` to enable startup logs. Check the startup logs for `appsec_enabled` is `true`.

    b. If `appsec_enabled` is `false`, then Application Security was not enabled correctly. See [installation instructions][2].

    c. If `appsec_enabled` is not in the startup logs, the latest Application Security version needs to be installed. See [installation instructions][2].

2. Is the tracer working? Can you see relevant traces on the APM dashboard? 

    Application Security relies on the tracer so if you don’t see traces, then the tracer might not be working. See [APM Troubleshooting][3].

3. In your application directory, run the command `npm explore @datadog/native-appsec -- npm run install` and restart your app.

    a. If `@datadog/native-appsec` is not found then the installation is incorrect. See [installation instructions][2].
    
    b. If it works, you probably build and run your app on different OS, add the command to your runtime start script.

    c. If it doesn’t work, you might be running an unsupported runtime.

4. To enable logs, add the following environment variables: 

    ```
    DD_TRACE_DEBUG=1
    DD_TRACE_LOG_LEVEL=info
    ```

[1]: /tracing/troubleshooting/tracer_startup_logs/
[2]: /security_platform/application_security/getting_started/nodejs/?tab=dockercli
[3]: /tracing/troubleshooting/
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

For Ruby, if you don’t see Application Security events in your Application Security dashboard after a few minutes, enable tracer diagnostics for [debug logs][1] in the file `config/initializers/datadog-tracer.rb`. For example:

```ruby
Datadog.configure do |c|
  c.diagnostics.debug = true
end
```

Debug logs are verbose but useful. If you open up a ticket with [Datadog support][1], forward the logs with your request.

#### Check #1: Is AppSec correctly enabled?

Application Security has been correctly enabled if you see logs such as:

```
D, [2021-12-14T11:03:32.167125 #73127] DEBUG -- ddtrace: [ddtrace] (libddwaf/lib/datadog/security/waf.rb:296:in `block in logger=') {:level=>:ddwaf_log_info, :func=> "ddwaf_set_log_cb", :file=>"PowerWAFInterface.cpp", :message=>"Sending log messages to binding, min level trace"}
D, [2021-12-14T11:03:32.200491 #73127] DEBUG -- ddtrace: [ddtrace] (libddwaf/lib/datadog/security/waf.rb:296:in `block in logger=') {:level=>:ddwaf_log_debug, :func= >"parse", :file=>"parser_v2.cpp", :message=>"Loaded 124 rules out of 124 available in the ruleset"}
```

If you do not see those logs, check the following:

- The correct Application Security environment variables are set up for your application process. 
- The latest gem version is installed.
- The tracer is configured correctly and sending APM traces to your APM dashboard.

#### Check #2a: Is Application Security called on HTTP requests?

To confirm that Application Security is called for each HTTP request, trigger a [test attack](#1-send-a-test-attack-to-your-application) and look for these logs:

```
D, [2022-01-19T21:25:50.579745 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/security/reactive/operation.rb:14:in `initialize') operation: rack.request initialize
D, [2022-01-19T21:25:50.580300 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/security/contrib/rack/gateway/watcher.rb:25:in `block (2 levels) in watch') root span: 964736568335365930
D, [2022-01-19T21:25:50.580371 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/security/contrib/rack/gateway/watcher.rb:26:in `block (2 levels) in watch') active span: 964736568335365930
D, [2022-01-19T21:25:50.581061 #341792] DEBUG -- ddtrace: [ddtrace] (/home/lloeki/src/github.com/DataDog/dd-trace-rb/lib/datadog/security/contrib/rack/reactive/request.rb:34:in `block in subscribe') reacted to ["request.headers", "request.uri.raw", "request.query", "request.cookies", "request.body.raw"]: [{"version"=>"HTTP/1.1", "host"=>"127.0.0.1:9292", "accept"=>"*/*", "user-agent"=>"Nessus SOAP"}, "http://127.0.0.1:9292/", [], {}, ""]
```

If you don’t see those logs, try the following:

- Check that another upstream security system is not filtering requests based on the test header value, which would prevent the request from reaching the application. 
- Send another [test attack](#1-send-a-test-attack-to-your-application) using another user's agent values in the curl command to see if the event is successfully sent.
- Look in the application logs for the exact request you ran to confirm the request reached the application, and was not responded to by another upstream system.

If the Rack integration was configured manually, sometimes a known issue prevents Application Security from working. For example:

```
Datadog.configure do |c|
  c.use :rails
  ...
  c.use :rack, web_service_name: "something", request_queuing: true
```

If `c.use :rack` is present, remove it to see if the check passes.

#### Check #2b: Is Application Security detecting HTTP request security events?

To confirm that Application Security is detecting security events, trigger a [test attack](#1-send-a-test-attack-to-your-application), and look for these logs:

```
D, [2021-12-14T22:39:53.268820 #106051] DEBUG -- ddtrace: [ddtrace] (ddtrace/lib/datadog/security/contrib/rack/reactive/request.rb:63:in `block in subscribe') WAF: #<struct Datadog::Security::WAF::Result action=:monitor, data=[{"rule"=>{"id"=>"ua0-600-10x", "name"=>"Nessus", "tags"=>{"type"=>"security_scanner", "category"=>"attack_attempt"}}, "rule_matches"=>[{"operator"=>"match_regex", "operator_value"=>"(?i)^Nessus(/|([ :]+SOAP))", "parameters"=>[{"address"=>"server.request.headers.no_cookies", "key_path"=>["user-agent"], "value"=>"Nessus SOAP", "highlight"=>["Nessus SOAP"]}]}]}], perf_data=nil, perf_total_runtime=20519>
```
If you don’t see those logs, check that another upstream security system is not filtering out the requests or altering them based on the test header value. 

#### Check #3a: Is the tracer sending traces with security data?
Application Security events are sent with APM traces. To confirm that Application Security correctly detects and inserts security data into traces, trigger a [test attack](#1-send-a-test-attack-to-your-application), and look for these tracer logs:

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

Please wait a minute for the agent to forward the traces, then check that the traces show up in the APM dashboard. The security information in the traces may take additional time to be processed by the backend before showing up as events in the Application Security dashboard.

#### Check #3b: Is Application Security forwarding security events to the agent?

To confirm that Application Security is detecting and forwarding security events to the agent, trigger a [test attack](#1-send-a-test-attack-to-your-application), and look for these logs:

```
D, [2021-12-14T11:03:37.347815 #73127] DEBUG -- ddtrace: [ddtrace] (ddtrace/lib/datadog/security/worker.rb:54:in `block in perform') processed events: [{:event_id=>"eb1eca52-74e1-435b-9a6c-44046d3765ee", :event_type=>"appsec.threat.attack", :event_version=>"0.1.0", :detected_at=>"2021-12-14T10:03:37Z", :type=>"security_scanner", :blocked=>false, :rule=>{:id=>"ua0-600-10x", :name=>"Nessus", :set=>"security_scanner"}, :rule_match=>{:operator=>"match_regex", :operator_value=>"(?i)^Nessus(/|([ :]+SOAP))", :parameters=>[{:name=>"server.request.headers.no_cookies", :key_path=>["user-agent"], :value=>"Nessus SOAP", :highlight=>["Nessus SOAP"]}]}, :context=>{:actor=>{:context_version=>"0.1.0", :ip=>{:address=>"127.0.0.1"}, :identifiers=>nil, :_id=>nil}, :host=>{:os_type=>"Linux", :hostname=>"procyon-vm", :context_version=>"0.1.0"}, :http=>{:context_version=>"0.1.0", :request=>{:scheme=>"http", :method=>"GET", :url=>"http://127.0.0.1:9292/admin.php", :host=>"127.0.0.1", :port=>9292, :path=>"/admin.php", :remote_ip=>"127.0.0.1", :headers=>{"host"=>"127.0.0.1:9292", "accept"=>"*/*", "user-agent"=>"Nessus SOAP"}, :useragent=>"Nessus SOAP"}, :response=>{:status=>404, :blocked=>false, :headers=>{"Content-Type"=>"text/plain"}}}, :service=>{:context_version=>"0.1.0", :name=>"rack", :environment=>nil}, :span=>{:context_version=>"0.1.0", :id=>4439751766880249768}, :tags=>{:context_version=>"0.1.0", :values=>["_dd.appsec.enabled:1", "_dd.runtime_family:ruby", "service:rack"]}, :trace=>{:context_version=>"0.1.0", :id=>2632764434813487337}, :tracer=>{:context_version=>"0.1.0", :runtime_type=>"ruby", :runtime_version=>"3.0.2", :lib_version=>"0.54.1"}}}]
```

Please wait about a minute for the agent to forward the events to the backend, then check that the traces show up in the APM dashboard.

[1]: /tracing/troubleshooting/#tracer-debug-logs
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

If you continue to have issues with Application Security, contact [Datadog support][1] with the following information: 

- Confirmation that the [test attack](#1-send-a-test-attack-to-your-application) was successfully sent 
- Tracer [startup][2] or [debug][4] logs

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /tracing/troubleshooting/tracer_startup_logs/
[3]: https://app.datadoghq.com/security/appsec
[4]: /tracing/troubleshooting/#tracer-debug-logs
[5]: /tracing/visualization/#spans
