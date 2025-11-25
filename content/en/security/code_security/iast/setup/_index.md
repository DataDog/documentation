---
title: Set up Runtime Code Analysis (IAST)
disable_toc: false
aliases:
- /security/application_security/enabling/single_step/code_security/
- /security/application_security/enabling/tracing_libraries/code_security/
- /security/application_security/code_security/setup/
---

## Prerequisites
Before setting up Runtime Code Analysis (IAST), ensure the following prerequisites are met:

1. **Datadog Agent Installation:** The Datadog Agent is installed and configured for your application's operating system or container, cloud, or virtual environment.
2. **Supported Tracing Library:** The Datadog Tracing Library used by your application or service supports Runtime Code Analysis (IAST) capabilities for the language of your application or service. For more details, see the **Compatibility Requirements** section below.

## Using Datadog Tracing Libraries

Select your application language for details on how to enable Runtime Code Analysis (IAST) for your language and infrastructure types.


{{% collapse-content title="Java" level="h4" %}}

You can detect code-level vulnerabilities and monitor application security in Java applications running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

Follow these steps to enable Runtime Code Analysis (IAST) in your service:

1. [Update your Datadog Agent][6] to at least version 7.41.1.
2. Update your Datadog Tracing Library to at least the minimum version needed to turn on Runtime Code Analysis (IAST). For details, see the **Compatibility Requirements** below.
3. Add the `DD_IAST_ENABLED=true` environment variable to your application configuration.

   From the command line:

   ```shell
   java -javaagent:/path/to/dd-java-agent.jar -Ddd.iast.enabled=true -Ddd.service=<MY SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
   ```

   Or one of the following orchestration tool methods, depending on where your application runs.

   **Note**: Read-only file systems are not supported. The application must have access to a writable `/tmp` directory.


#### Docker CLI

Update your configuration container for APM by adding the following argument in your `docker run` command:


```shell
docker run [...] -e DD_IAST_ENABLED=true [...]
```

#### Dockerfile

Add the following environment variable value to your container Dockerfile:

```Dockerfile
DD_IAST_ENABLED=true
```

#### Kubernetes

Update your deployment configuration file for APM and add the IAST environment variable:

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_IAST_ENABLED
              value: "true"
```

#### Amazon ECS

Update your ECS task definition JSON file, by adding this in the environment section:

```json
"environment": [
  ...,
  {
    "name": "DD_IAST_ENABLED",
    "value": "true"
  }
]
```

#### APM Tracing disabled

To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing variable to false.

{{< tabs >}}
{{% tab "Using system properties" %}}

Start your Java application with the Datadog agent and App and API Protection enabled using system properties:

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.iast.enabled=true -Ddd.apm.tracing.enabled=false -Ddd.service=<MY_SERVICE> -Ddd.env=<MY_ENV> -jar path/to/app.jar
```
{{% /tab %}}

{{% tab "Using environment variables" %}}

Set the required environment variables:

```Dockerfile
DD_IAST_ENABLED=true
DD_APM_TRACING_ENABLED=false
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
```
{{% /tab %}}
{{< /tabs >}}


[1]: https://github.com/DataDog/dd-trace-java/releases
[2]: /security/code_security/iast/setup/
[3]: /security/code_security/iast/setup/
[4]: https://app.datadoghq.com/security/appsec/vm
[5]: /help
[6]: /agent/versions/upgrade_between_agent_minor_versions/


{{% /collapse-content %}}

{{% collapse-content title=".NET" level="h4" %}}

You can detect code-level vulnerabilities and monitor application security in .NET applications running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

Follow these steps to enable Runtime Code Analysis (IAST) in your service:

1. [Update your Datadog Agent][3] to at least version 7.41.1.
2. Update your Datadog Tracing Library to at least the minimum version needed to turn on Runtime Code Analysis (IAST). For details, see the **Compatibility Requirements** below.
3. Add the `DD_IAST_ENABLED=true` environment variable to your application configuration. For example, on Windows self-hosted, run the following PowerShell snippet as part of your application start-up script:

   ```sh
   $target=[System.EnvironmentVariableTarget]::Process
   [System.Environment]::SetEnvironmentVariable("DD_IAST_ENABLED","true",$target)
   ```

Or one of the following methods, depending on where your application runs:

#### Windows-Self-Hosted

In a Windows console:

```sh
rem Set environment variables
SET DD_IAST_ENABLED=true

rem Start application
dotnet.exe example.dll
```

#### IIS

Run the following PowerShell command as administrator to configure the necessary environment variables in the registry `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment` and restart IIS.

```sh
$target=[System.EnvironmentVariableTarget]::Machine
[System.Environment]::SetEnvironmentVariable("DD_IAST_ENABLED","true",$target)
net stop was /y
net start w3svc
```

#### Linux

Add the following to your application configuration:

```
DD_IAST_ENABLED=true
```

#### Docker CLI

Update your configuration container for APM by adding the following argument in your docker run command:

```
docker run -d --name app -e DD_IAST_ENABLED=true company/app:latest
```

#### Dockerfile

Add the following environment variable value to your container Dockerfile:

```
ENV DD_IAST_ENABLED=true
```

#### Kubernetes

Update your deployment configuration file for APM and add the Runtime Code Analysis (IAST) environment variable:

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_IAST_ENABLED
              value: "true"
```

#### AWS ECS

Update your ECS task definition JSON file, by adding this in the environment section:

```yaml
"environment": [
  ...,
  {
    "name": "DD_IAST_ENABLED",
    "value": "true"
  }
]
```

#### AWS Fargate

Add the following line to your container Dockerfile:

```
ENV DD_IAST_ENABLED=true
```

#### APM Tracing disabled

To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing variable to false.

```Dockerfile
DD_IAST_ENABLED=true
DD_APM_TRACING_ENABLED=false
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
```


To see Runtime Code Analysis (IAST) in action, browse your service and find code-level vulnerabilities in the [Vulnerability Explorer][4].

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="Video showing Code Vulnerabilities" video="true" >}}

If you need additional assistance, contact [Datadog support][5].

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[2]: /security/code_security/iast/setup/
[3]: /agent/versions/upgrade_between_agent_minor_versions/
[4]: /security/code_security/iast/setup/
[5]: /help

{{% /collapse-content %}}

{{% collapse-content title="Node.js" level="h4" %}}

You can detect code-level vulnerabilities and monitor application security in Node.js applications running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

Follow these steps to enable Runtime Code Analysis (IAST) in your service:

1. [Update your Datadog Agent][4] to at least version 7.41.1.
2. Update your Datadog Tracing Library to at least the minimum version needed to turn on Runtime Code Analysis (IAST). For details, see the **Compatibility Requirements** below.
3. Add the `DD_IAST_ENABLED=true` environment variable to your application configuration.

   If you initialize the APM library on the command line using the `--require` option to Node.js:

   ```shell
   node --require dd-trace/init app.js
   ```
   Then use environment variables to enable Runtime Code Analysis (IAST):
   ```shell
   DD_IAST_ENABLED=true node app.js
   ```
   How you do this varies depending on where your service runs:

#### Docker CLI

Update your configuration container for APM by adding the following argument in your `docker run` command:

```shell
docker run [...] -e DD_IAST_ENABLED=true [...]
```

#### Dockerfile

Add the following environment variable value to your container Dockerfile:

```Dockerfile
ENV DD_IAST_ENABLED=true
```

#### Kubernetes

Update your configuration yaml file container for APM and add the AppSec env variable:

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_IAST_ENABLED
              value: "true"
```

#### Amazon ECS

Update your ECS task definition JSON file, by adding this in the environment section:

```json
"environment": [
  ...,
  {
    "name": "DD_IAST_ENABLED",
    "value": "true"
  }
]
```

#### APM Tracing disabled

To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing variable to false.

```Dockerfile
DD_IAST_ENABLED=true
DD_APM_TRACING_ENABLED=false
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
```

[1]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[2]: /security/code_security/iast/setup/nodejs/
[3]: /security/code_security/iast/setup/
[4]: /agent/versions/upgrade_between_agent_minor_versions/
[5]: https://app.datadoghq.com/security/appsec/vm/code
[6]: /help

{{% /collapse-content %}}

{{% collapse-content title="Python" level="h4" %}}

You can detect code-level vulnerabilities and monitor application security in Python applicationss running in Docker, Kubernetes, Amazon ECS, and AWS Fargate.

NOTE: Runtime Code Analysis (IAST) in Python is in Preview.

Follow these steps to enable Runtime Code Analysis (IAST) in your service:

1. [Update your Datadog Agent][6] to at least version 7.41.1.
2. Update your Datadog Tracing Library to at least the minimum version needed to turn on Runtime Code Analysis (IAST). For details, see the **Compatibility Requirements** below.
3. Add the `DD_IAST_ENABLED=true` environment variable to your application configuration.

   From the command line:

   ```shell
   DD_IAST_ENABLED=true ddtrace-run python app.py
   ```

   Or one of the following methods, depending on where your application runs:


#### Docker CLI

Update your configuration container for APM by adding the following argument in your `docker run` command:


```shell
docker run [...] -e DD_IAST_ENABLED=true [...]
```

#### Dockerfile

Add the following environment variable value to your container Dockerfile:

```Dockerfile
DD_IAST_ENABLED=true
```

#### Kubernetes

Update your deployment configuration file for APM and add the IAST environment variable:

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_IAST_ENABLED
              value: "true"
```

#### Amazon ECS

Update your ECS task definition JSON file, by adding this in the environment section:

```json
"environment": [
  ...,
  {
    "name": "DD_IAST_ENABLED",
    "value": "true"
  }
]
```

#### APM Tracing disabled

To disable APM tracing while keeping App and API Protection enabled, you must set the APM tracing variable to false.

```Dockerfile
DD_IAST_ENABLED=true
DD_APM_TRACING_ENABLED=false
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
```

#### Third-Party Library Compatibility Note

Runtime Code Analysis (IAST) modifies Python code at runtime. This could cause conflicts with other third-party Python libraries that perform similar code transformations, particularly with the following, though not limited to them:

- Numba
- JAX
- TorchScript
- TensorFlow
- Bytecode
- Codetransformer
- PyPy

Additionally, Runtime Code Analysis (IAST) does not correctly propagate taint ranges over native (compiled) code. Therefore, if your codebase heavily relies on modules written in C or C++,
using the CPython API, or on intermediate language systems like Cython, the results might be less accurate than expected.


[1]: https://github.com/DataDog/dd-trace-py/releases
[2]: /security/code_security/iast/setup/python
[3]: /security/code_security/iast/setup/
[4]: https://app.datadoghq.com/security/appsec/vm/code
[5]: /help
[6]: /agent/versions/upgrade_between_agent_minor_versions/

{{% /collapse-content %}}

### Finishing setup

1. Restart your service.
2. To see Runtime Code Analysis (IAST) in action, browse your service and find code-level vulnerabilities in the [Vulnerability Explorer][4].

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="Video showing Code Vulnerabilities" video="true" >}}

If you need additional assistance, contact [Datadog support][5].

[1]: /security/code_security/iast/setup/
[4]: https://app.datadoghq.com/security/appsec/vm
[5]: /help

## Compatibility Requirements

The following code security capabilities are supported relative to each language's tracing library:

| Code Security capability                      | Java    | .NET     | Node.js    | Python      | Go             | Ruby          | PHP           |
|-----------------------------------------------|---------|----------|------------|-------------|----------------|---------------|---------------|
| Runtime Software Composition Analysis (SCA)   | 1.1.4   | 2.16.0   | 4.0.0      | 1.5.0       | 1.49.0         | 1.11.0        | 0.90.0        |
| Runtime Code Analysis (IAST)                  | 1.15.0  | 2.42.0   | 4.18.0     | Preview     | not supported  | not supported | not supported |

**Note**: **Static Software Composition Analysis (SCA)** and **Static Code Analysis (SAST)** capabilities do not require Datadog's tracing library. Therefore, the requirements listed below do not apply to these two Code Security capabilities.

Select your application language for details about framework compatibility and feature support.

{{% collapse-content title="Java" level="h4" %}}

### Code Security capabilities

The following code security capabilities are supported in the Java library, for the specified tracer version:

| Code Security capability                    | Minimum Java tracer version |
| ------------------------------------------- | ----------------------------|
| Runtime Software Composition Analysis (SCA) | 1.1.4                       |
| Runtime Code Analysis (IAST)                | 1.15.0                      |

The minimum tracer version to get all supported code security capabilities for Java is 1.15.0.

#### Supported deployment types
| Type              | Runtime Software Composition Analysis (SCA) | Runtime Code Analysis (IAST)        |
|------------------ | ------------------------------------------- | ----------------------------------- |
| Docker            | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Kubernetes        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Amazon ECS        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| AWS Fargate       | <i class="icon-check-bold"></i>             | Preview (1.15.0)                    |
| AWS Lambda        |                                             |                                     |
| Azure App Service | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |

**Note**: Azure App Service is supported for **web applications only**. Code Security doesn't support Azure Functions.

### Language and framework compatibility

#### Supported Java versions
The Java Tracer supports automatic instrumentation for the following Oracle JDK and OpenJDK JVM runtimes.

| JVM versions | Operating Systems                                                                     | Support level                       | Tracer version |
| -------------| ------------------------------------------------------------------------------------- | ----------------------------------- | -------------- |
| 8 to 21      | Windows (x86-64)<br>Linux (glibc, musl) (arm64, x86-64)<br>MacOS (arm64, x86-64)      | Supported                           | Latest         |


Datadog does not officially support any early-access versions of Java.

Versions 22 and above are supported as in Preview.

#### Web framework compatibility
##### Code Security Capability Notes
- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks
- If **Runtime Code Analysis (IAST)** does not support your framework, it continues to detect Weak Cipher, Weak Hashing, Weak Randomness, Insecure Cookie, Cookie without HttpOnly Flag, and Cookie without SameSite Flag vulnerabilities.

| Framework                   | Versions         | Runtime Code Analysis (IAST)      |
| --------------------------- | ---------------- | --------------------------------- |
| Grizzly                     | 2.0+             | <i class="icon-check-bold"></i>   |
| Glassfish                   |                  | <i class="icon-check-bold"></i>   |
| Java Servlet                | 2.3+, 3.0+       | <i class="icon-check-bold"></i>   |
| Jetty                       | 7.0-9.x, 10.x    | <i class="icon-check-bold"></i>   |
| Spring Boot                 | 1.5              | <i class="icon-check-bold"></i>   |
| Spring Web (MVC)            | 4.0+             | <i class="icon-check-bold"></i>   |
| Spring WebFlux              | 5.0+             | <i class="icon-check-bold"></i>   |
| Tomcat                      | 5.5+             | <i class="icon-check-bold"></i>   |
| Vert.x                      | 3.4-3.9.x        | <i class="icon-check-bold"></i>   |

**Note**: Many application servers are Servlet compatible and are automatically covered by that instrumentation, such as Websphere, Weblogic, and JBoss. Also, frameworks like Spring Boot (version 3) inherently work because they usually use a supported embedded application server, such as Tomcat, Jetty, or Netty.

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

#### Networking framework compatibility

`dd-java-agent` includes support for automatically tracing the following networking frameworks.

##### Code Security Capability Notes
- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks
- If **Runtime Code Analysis (IAST)** does not support your framework, it continues to detect Weak Cipher, Weak Hashing, Insecure Cookie, Cookie without HttpOnly Flag, Cookie without SameSite Flag, HSTS Header Missing, and X-Content-Type-Options Header Missing vulnerabilities.

| Framework                              | Versions    | Runtime Code Analysis (IAST)                   |
| -------------------------------------- | ----------- | ---------------------------------------------- |
| Apache HTTP Client                     | 4.0+        |                                                |
| gRPC                                   | 1.5+        |                                                |
| HttpURLConnection                      | all         |                                                |
| Jax RS Clients                         | 2.0+        |  <i class="icon-check-bold"></i>               |
| Jersey Server                          | 1.9-2.29    |  <i class="icon-check-bold"></i>               |
| Netty HTTP Server                      |  3.8+       |                                                |
| RESTEasy                               |  3.0.x      |                                                |
| Spring SessionAwareMessageListener     | 3.1+        |                                                |

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

#### Data store compatibility

`dd-java-agent` includes support for automatically tracing the following database frameworks/drivers.

**Datastore tracing provides:**

- Timing request to response
- Query info (for example, a sanitized query string)
- Error and stacktrace capturing

##### Code Security Capability Notes
- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks
- If your framework is not supported below, **Runtime Code Analysis (IAST)** won't detect SQL Injection vulnerabilities, but it continues to detect the remaining vulnerability types listed [here][3].

| Database                | Versions | Runtime Code Analysis (IAST)     |
| ----------------------- | -------- | -------------------------------- |
| Aerospike               | 4.0+     |                                  |
| Couchbase               | 2.0+     |                                  |
| JDBC                    | N/A      | <i class="icon-check-bold"></i>  |
| MongoDB                 | 3.0-4.0+ |                                  |

<div class="alert alert-info">If you don't see your framework of choice listed, let us know. Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>


[1]: /tracing/trace_collection/compatibility/java/
[2]: /remote_configuration
[3]: /security/code_security/software_composition_analysis/

{{% /collapse-content %}}

{{% collapse-content title=".NET" level="h4" %}}

### Code Security capabilities support

The following code security capabilities are supported in the .NET library, for the specified tracer version:

| Code Security capability                    | Minimum .NET tracer version |
| ------------------------------------------- | --------------------------- |
| Runtime Software Composition Analysis (SCA) | 2.16.0                      |
| Runtime Code Analysis (IAST)                | 2.42.0                      |

The minimum tracer version to get all supported code security capabilities for .NET is 2.42.0.

#### Supported deployment types
| Type              | Runtime Software Composition Analysis (SCA) | Runtime Code Analysis (IAST)        |
|------------------ | ------------------------------------------- | ----------------------------------- |
| Docker            | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Kubernetes        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| Amazon ECS        | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |
| AWS Fargate       | <i class="icon-check-bold"></i>             | Preview (2.42.0)                    |
| AWS Lambda        |                                             |                                     |
| Azure App Service | <i class="icon-check-bold"></i>             | <i class="icon-check-bold"></i>     |

**Note**: Azure App Service is supported for **web applications only**. Code Security capabilities are not supported for Azure Functions.

### Language and framework compatibility

#### Supported .NET versions

| .NET Framework Version  | Microsoft End of Life | Support level       | Package version     |
| ----------------------- | --------------------- | ------------------- | ------------------- |
| 4.8                     |                       | GA                  | latest              |
| 4.7.2                   |                       | GA                  | latest              |
| 4.7                     |                       | GA                  | latest              |
| 4.6.2                   |                       | GA                  | latest              |
| 4.6.1                   | 04/26/2022            | GA                  | latest              |


These are supported on the following architectures:
- Linux (GNU) x86-64, ARM64
- Alpine Linux (musl) x86-64, ARM64
- macOS (Darwin) x86-64, ARM64
- Windows (msvc) x86, x86-64

#### Web framework compatibility
##### Code Security capability notes

- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks.
- If your framework is not listed below, **Runtime Code Analysis (IAST)** continues to detect Insecure Cookie vulnerabilities.

| Framework               | Runtime Code Analysis (IAST)     |
| ----------------------- | -------------------------------- |
| ASP.NET MVC             | <i class="icon-check-bold"></i>  |
| ASP.NET Web API 2       | <i class="icon-check-bold"></i>  |

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Networking framework compatibility
##### Code Security capability notes

- **Runtime Software Composition Analysis (SCA)**  is supported on all frameworks

| Framework | Runtime Code Analysis (IAST)                |
|---------- |-------------------------------------------- |
| http      | <i class="icon-check-bold"></i>             |
| https     | <i class="icon-check-bold"></i>             |

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

#### Data store compatibility

**Datastore tracing provides:**

- query info (for example, a sanitized query string)
- error and stacktrace capturing

##### Code Security Capability Notes

- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks.

| Framework        | Runtime Code Analysis (IAST)    |
|------------------|---------------------------------|
| OracleDB         | <i class="icon-check-bold"></i> |
| ADO.NET          | <i class="icon-check-bold"></i> |
| SQL Server       | <i class="icon-check-bold"></i> |
| MySQL            | <i class="icon-check-bold"></i> |
| SQLite           | <i class="icon-check-bold"></i> |

[1]: /tracing/trace_collection/compatibility/dotnet-core/
[2]: /tracing/trace_collection/compatibility/dotnet-framework/
[3]: /remote_configuration#enabling-remote-configuration


{{% /collapse-content %}}

{{% collapse-content title="Node.js" level="h4" %}}

### Code Security capabilities

The following code security capabilities are supported in the Node.js library, for the specified tracer version:

| Code Security capability                      | Minimum Node.js tracer version                     |
|---------------------------------------------- | -------------------------------------------------- |
| Runtime Software Composition Analysis (SCA)   | 4.0.0                                              |
| Runtime Code Analysis (IAST)                  | 4.18.0 for Node.js 16+, or 5.0.0 for Node.js 18+   |

The minimum tracer version to get all supported code security capabilities is 4.30.0 for Node.js 16+ and 5.0.0 for Node.js 18+.

#### Supported deployment types
| Type         | Runtime Software Composition Analysis (SCA)   | Runtime Code Analysis (IAST)                               |
|------------- | --------------------------------------------- | ---------------------------------------------------------- |
| Docker       | <i class="icon-check-bold"></i>               | <i class="icon-check-bold"></i>                            |
| Kubernetes   | <i class="icon-check-bold"></i>               | <i class="icon-check-bold"></i>                            |
| Amazon ECS   | <i class="icon-check-bold"></i>               | <i class="icon-check-bold"></i>                            |
| AWS Fargate  | <i class="icon-check-bold"></i>               | Preview (4.18.0 for Node.js 16+, or 5.0.0 for Node.js 18+) |
| AWS Lambda   | <i class="icon-check-bold"></i>               | not supported                                              |

### Language and framework compatibility

#### Node.js Version Support

When the Node.js project drops support for an LTS major release line (when it goes End of Life), support for it is dropped in the next major version of `dd-trace`.
The last major supporting release line of `dd-trace` library supports that EOL version of Node.js for at least another year on a maintenance mode basis.

Some issues cannot be solved in `dd-trace` and instead must be solved in Node.js. When this happens and the Node.js release in question is EOL, it's not possible to solve the issue without moving to another non-EOL release.
Datadog does not make new releases of `dd-trace` to provide specific support for non-LTS Node.js major release lines (odd numbered versions).

For the best level of support, always run the latest LTS release of Node.js, and the latest major version of `dd-trace`. Whatever release line of Node.js you use, also use the latest version of Node.js on that release line, to ensure you have the latest security fixes.

For more information about Node.js release, see the [official Node.js documentation][4].

#### Operating system support

The following operating systems are officially supported by `dd-trace`. Any operating system not listed is still likely to work, but with some features missing, for example application security capabilities, profiling, and runtime metrics. Generally speaking, operating systems that are actively maintained at the time of initial release for a major version are supported.

| Operating System | Architectures | Minimum Versions                         |
|------------------|---------------|------------------------------------------|
| Linux (glibc)    | arm64, x64    | CentOS 7, Debian 9, RHEL 7, Ubuntu 14.04 |
| Linux (musl)     | arm64, x64    | Alpine 3.13                              |
| macOS            | arm64, x64    | Catalina (10.15)                         |
| Windows          | x64           | Windows 8.1, Windows Server 2012         |

#### Web framework compatibility
##### Code Security Capability Notes
- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks
- If your framework is not listed below, **Runtime Code Analysis (IAST)** it continues to detect Weak Cipher, Weak Hashing, Weak Randomness, Insecure Cookie, Cookie without HttpOnly Flag, Cookie without SameSite Flag, HSTS Header Missing, and X-Content-Type-Options Header Missing vulnerabilities.

| Framework | Versions | Runtime Code Analysis (IAST)     |
|-----------|----------|----------------------------------|
| express   | >=4      | <i class="icon-check-bold"></i>  |
| fastify   | >=2      | <i class="icon-check-bold"></i>  |
| nextjs    | >=11.1   |                                  |

<div class="alert alert-info">If you would like to see support added for any of the unsupported capabilities or for your Node.js framework, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Networking framework compatibility
##### Code Security capability notes

- **Runtime Software Composition Analysis (SCA)**  is supported on all frameworks

| Framework | Runtime Code Analysis (IAST)                |
|---------- |-------------------------------------------- |
| http      | <i class="icon-check-bold"></i>             |
| https     | <i class="icon-check-bold"></i>             |

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

### Data store compatibility

Datastore tracing provides:

- Query info (for example, a sanitized query string)
- Error and stacktrace capturing

##### Code Security capability notes

- **Runtime Software Composition Analysis (SCA)**  is supported on all framework


| Framework                | Versions  | Runtime Code Analysis (IAST)           |
|--------------------------|-----------|--------------------------------------- |
| [@apollo/server][43]     | `>=4`     |                                        |
| [apollo-server-core][44] | `>=3`     |                                        |
| [cassandra-driver][28]   | `>=3`     |                                        |
| [couchbase][29]          | `^2.4.2`  |                                        |
| [elasticsearch][30]      | `>=10`    |                                        |
| [ioredis][31]            | `>=2`     |                                        |
| [knex][32]               | `>=0.8`   |                                        |
| [mariadb][5]             | `>=3`     |                                        |
| [memcached][33]          | `>=2.2`   |                                        |
| [mongodb-core][34]       | `>=2`     | <i class="icon-check-bold"></i>        |
| [mysql][35]              | `>=2`     | <i class="icon-check-bold"></i>        |
| [mysql2][36]             | `>=1`     | <i class="icon-check-bold"></i>        |
| [oracledb][37]           | `>=5`     |                                        |
| [pg][38]                 | `>=4`     | <i class="icon-check-bold"></i>        |
| [redis][39]              | `>=0.12`  |                                        |
| [sharedb][40]            | `>=1`     |                                        |
| [tedious][41]            | `>=1`     |                                        |
| [sequelize][42]          | `>=4`     | <i class="icon-check-bold"></i>        |

[1]: /tracing/trace_collection/compatibility/nodejs/
[2]: /remote_configuration#enabling-remote-configuration
[4]: https://github.com/nodejs/release#release-schedule
[5]: https://github.com/mariadb-corporation/mariadb-connector-nodejs
[28]: https://github.com/datastax/nodejs-driver
[29]: https://github.com/couchbase/couchnode
[30]: https://github.com/elastic/elasticsearch-js
[31]: https://github.com/luin/ioredis
[32]: https://knexjs.org
[33]: https://github.com/3rd-Eden/memcached
[34]: https://www.mongodb.com/docs/drivers/node/current/
[35]: https://github.com/mysqljs/mysql
[36]: https://github.com/sidorares/node-mysql2
[37]: https://oracle.github.io/node-oracledb/
[38]: https://node-postgres.com
[39]: https://github.com/NodeRedis/node_redis
[40]: https://share.github.io/sharedb/
[41]: http://tediousjs.github.io/tedious
[42]: https://github.com/sequelize/sequelize
[43]: https://github.com/apollographql/apollo-server
[44]: https://www.npmjs.com/package/apollo-server-core


{{% /collapse-content %}}

{{% collapse-content title="Python" level="h4" %}}

### Code Security capabilities support

The following code security capabilities are supported in the Python library, for the specified tracer version:

| Code Security capability                    | Minimum Python tracer version |
| ------------------------------------------- |-------------------------------|
| Runtime Software Composition Analysis (SCA) | 1.5.0                         |
| Runtime Code Analysis (IAST)                | Preview (2.21.0)              |

#### Supported deployment types
| Type        | Runtime Code Analysis (IAST)      |
|------------ |---------------------------------- |
| Docker      | <i class="icon-check-bold"></i>   |
| Kubernetes  | <i class="icon-check-bold"></i>   |
| Amazon ECS  | <i class="icon-check-bold"></i>   |
| AWS Fargate | Preview (2.9.3)                   |
| AWS Lambda  |                                   |


### Language and framework compatibility

#### Supported Python versions

The Python Application Security Client library follows a [versioning policy][3] that specifies the support level for the different versions of the library and Python runtime.

Two release branches are supported:

| Release    | Support level                              | Minimum Datadog Agent |
|------------|--------------------------------------------|-----------------------|
| `>=3.0,<4` | General Availability                       | 7.28                  |
| `>=2.0,<3` | End of Life                                | 7.28                  |
|    `<2`    | End of Life                                |                       |

And the library supports the following runtimes:

| OS      | CPU                   | Runtime | Runtime version | Supported ddtrace versions |
|---------|-----------------------|---------|-----------------|----------------------------|
| Linux   | x86-64, i686, AArch64 | CPython | 3.8+            | `>=3,<4`                   |
| MacOS   | Intel, Apple Silicon  | CPython | 3.8+            | `>=3,<4`                   |
| Windows | 64bit, 32bit          | CPython | 3.8+            | `>=3,<4`                   |
| Linux   | x86-64, i686, AArch64 | CPython | 3.7-3.13        | `>=2,<3`                   |
| MacOS   | Intel, Apple Silicon  | CPython | 3.7-3.13        | `>=2,<3`                   |
| Windows | 64bit, 32bit          | CPython | 3.7-3.13        | `>=2,<3`                   |
| Linux   | x86-64, i686, AArch64 | CPython | 2.7, 3.5-3.11   | `<2`                       |
| MacOS   | Intel, Apple Silicon  | CPython | 2.7, 3.5-3.11   | `<2`                       |
| Windows | 64bit, 32bit          | CPython | 2.7, 3.5-3.11   | `<2`                       |


#### Web framework compatibility
##### Code Security Capability Notes

- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks

#### Supported frameworks

| Framework   | Versions     | Runtime Code Analysis (IAST)    |
|-------------|--------------|---------------------------------|
| Django      | 1.8          | <i class="icon-check-bold"></i> |
| FastAPI     | 0.86         | <i class="icon-check-bold"></i> |
| Flask       | 0.10         | <i class="icon-check-bold"></i> |

Support for query strings is not available for Flask.

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

#### Data store compatibility

Datastore tracing provides:

- query info (for example, a sanitized query string)
- error and stacktrace capturing

##### Code Security capability notes

- **Runtime Software Composition Analysis (SCA)** is supported on all frameworks.

The Python library supports the [database API specifications][4] and supports all generic SQL databases. This includes databases such as SQLite, Mysql, Postgres and MariaDB.

[1]: /tracing/trace_collection/compatibility/python/
[2]: /remote_configuration#enabling-remote-configuration
[3]: https://ddtrace.readthedocs.io/en/stable/versioning.html
[4]: https://peps.python.org/pep-0249/


{{% /collapse-content %}}
