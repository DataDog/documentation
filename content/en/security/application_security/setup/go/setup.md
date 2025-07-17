---
title: Enabling App and API Protection for Go
aliases:
  - /security_platform/application_security/getting_started/go
  - /security/application_security/getting_started/go
  - /security/application_security/threats/setup/threat_detection/go
  - /security/application_security/threats_detection/go
further_reading:
- link: "https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/appsec"
  tag: "Documentation"
  text: "Go Security API docs"
- link: "/security/application_security/add-user-info/"
  tag: "Documentation"
  text: "Adding user information to traces"
- link: 'https://github.com/DataDog/dd-trace-go'
  tag: "Source Code"
  text: 'Tracer source code'
- link: 'https://github.com/DataDog/orchestrion'
  tag: "Source Code"
  text: 'Orchestrion source code'
- link: "/security/default_rules/?category=cat-application-security"
  tag: "Documentation"
  text: "OOTB App and API Protection Rules"
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting App and API Protection"
---

You can monitor App and API Protection (AAP) for Go apps running in Docker, Kubernetes, and Amazon ECS.

{{% appsec-getstarted %}}

# Prerequisite

- Your service framework and tools are [compatible][2] with Datadog [Application and API Protection][1].
- Your deployment environment is [supported][5].
- You have one of the latest two versions of [Go][4] installed (following the [Official Release Policy][5]).

## Enabling Application & API Protection (AAP)

### Get started

1. Install [Orchestrion][10]:
   ```console
   $ go install github.com/DataDog/orchestrion@latest
   ```

2. Register Orchestrion as a Go module in your project directory:
   ```console
   $ orchestrion pin
   ```

3. Datadog provides a series of pluggable packages that provide native support for instrumenting a series of Go libraries and frameworks. A list of these packages can be found in [Compatibility Requirements][1]. Import these packages into your application and follow the configuration instructions listed alongside each integration.

4. Recompile your program with Orchestrion using the `appsec` build:
   ```console
   $ orchestrion go build -tags=appsec my-program
   ```
   For more options on how to use Orchestrion, see [Orchestrion usage][7].

Note: If you are building without [CGO][9] on Linux, see [Building Go applications with CGO disabled][6].

5. Redeploy your Go service and enable AAP by setting the `DD_APPSEC_ENABLED` environment variable to `true`:

{{< tabs >}}
{{% tab "Environment Variable" %}}

```console
$ env DD_APPSEC_ENABLED=true ./my-program
```

{{% /tab %}}
{{% tab "Docker CLI" %}}

Add the following environment variable value to your Docker command line:

```console
$ docker run -e DD_APPSEC_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Add the following environment variable value to your application container's Dockerfile:

```Dockerfile
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Update your application's deployment configuration file for APM and add the AAP environment variable:

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_APPSEC_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

Update your application's ECS task definition JSON file using this environment section:

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}

{{< /tabs >}}

{{% app_and_api_protection_verify_setup %}}

{{% appsec-getstarted-2 %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

### Building without CGO

If you are building your Go application without [CGO][9], you can still enable AAP by following these steps:

1. Add the `appsec` build tag when compiling your application:
   ```console
   $ CGO_ENABLED=0 orchestrion go build -tags appsec my-program
   ```

  <div class="alert alert-info">Using `CGO_ENABLED=0` usually guarantees a statically-linked binary. This is not the case described in these setup instructions.</div>

2. Install `libc.so.6`, `libpthread.so.0` and `libdl.so.2` on your system, as these libraries are required by the Datadog WAF:
   This installation can be done by installing the `glibc` package on your system with your package manager. See [Creating a Dockerfile for AAP][3].

3. Redeploy your Go service with the `DD_APPSEC_ENABLED=true` environment variable set, as described above.

### Building with Bazel

If you are using Bazel and [rules_go][12] to build your Go application, [Orchestrion][7] is not compatible with Bazel.
Instead, you can use the [Datadog Go Tracer library][11] to instrument your application manually.

AAP relies on [purego][13] to support its C++ biddings to DataDog's WAF, which requires special attention inside the `repositories.bzl` generated by Gazelle. Under the `go_repository` rule for `com_github_ebitengine_purego`,
you need to add the `build_directives` attribute with the `gazelle:build_tags cgo` directive. For example:

```starlark
    go_repository(
        name = "com_github_ebitengine_purego",
        build_directives = [
            "gazelle:build_tags cgo",
        ]
        build_file_proto_mode = "disable",
        importpath = "github.com/ebitengine/purego",
        sum = "<your-checksum>",
        version = "v0.8.3",
    )
```

## Using AAP without APM tracing

If you want to use AAP without APM tracing functionality, you can deploy with tracing disabled:

1. Configure your tracing library with the `DD_APM_TRACING_ENABLED=false` environment variable in addition to the `DD_APPSEC_ENABLED=true` environment variable. This configuration reduces the amount of APM data sent to Datadog to the minimum required by AAP products.

For more details, see [Standalone App and API Protection][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/compatibility/go/?tab=v2#web-framework-compatibility
[2]: /security/application_security/setup/compatibility/go/
[4]: https://go.dev/
[5]: https://go.dev/doc/devel/release#policy
[6]: /security/application_security/setup/go#building-without-cgo
[7]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go/?tab=compiletimeinstrumentation#usage
[8]: /security/application_security/guide/standalone_application_security/
[9]: https://go.dev/wiki/cgo
[10]: https://datadoghq.dev/orchestrion
[11]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go/?tab=manualinstrumentation#add-the-tracer-library-to-your-application
[12]: https://github.com/bazel-contrib/rules_go
[13]: https://github.com/ebitengine/purego
