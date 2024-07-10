---
title: Enabling ASM for Go
code_lang: go
type: multi-code-lang
code_lang_weight: 20
aliases:
  - /security_platform/application_security/getting_started/go
  - /security/application_security/getting_started/go
  - /security/application_security/enabling/go
further_reading:
    - link: "/security/application_security/add-user-info/"
      tag: "Documentation"
      text: "Adding user information to traces"
    - link: 'https://github.com/DataDog/dd-trace-go/tree/v1'
      tag: "Source Code"
      text: 'Go Datadog library source code'
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB Application Security Management Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting Application Security Management"
---

You can monitor application security for Go apps running in Docker, Kubernetes, and Amazon ECS.

{{% appsec-getstarted %}}
- Your service is [supported][2].

## Enabling threat detection
### Get started

1. **Add to your program's go.mod dependencies** the latest version of the Datadog Go library (version 1.53.0 or later):

   ```console
   $ go get -v -u gopkg.in/DataDog/dd-trace-go.v1
   ```

2. Datadog has a series of pluggable packages which provide out-of-the-box support for instrumenting a series of Go libraries and frameworks.
   A list of these packages can be found in the [compatibility requirements][1] page. Import these packages into your application and follow the configuration instructions listed alongside each integration.

3. **Recompile your program** with ASM enabled:
   ```console
   $ go build -v -tags appsec my-program
   ```

   **Notes**:
   - The Go build tag `appsec` is not necessary if CGO is enabled with `CGO_ENABLED=1`.
   - Datadog WAF needs the following shared libraries on Linux: `libc.so.6` and `libpthread.so.0`.
   - When using the build tag `appsec` and CGO is disabled, the produced binary is still linked dynamically to these libraries.
   - The Go build tag `datadog.no_waf` can be used to disable ASM at build time in any situation where the requirements above are a hinderance.

4. **Redeploy your Go service and enable ASM** by setting the `DD_APPSEC_ENABLED` environment variable to `true`:
   ```console
   $ env DD_APPSEC_ENABLED=true ./my-program
   ```

   Or one of the following methods, depending on where your application runs:

   {{< tabs >}}
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

Update your application's deployment configuration file for APM and add the ASM environment variable:

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

Update your application's ECS task definition JSON file, by adding this in the environment section:

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

{{% appsec-getstarted-2 %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/enabling/compatibility/go/#web-framework-compatibility
[2]: /security/application_security/enabling/compatibility/go
