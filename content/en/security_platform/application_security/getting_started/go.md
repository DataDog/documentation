---
title: Go Applications
kind: documentation
code_lang: go
type: multi-code-lang
code_lang_weight: 20
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-go/tree/v1'
      tag: 'GitHub'
      text: 'Go Datadog Library source code'
---

{{% appsec-getstarted %}}
- [CGO][1] and a C toolchain are enabled in your build environment.

## Get started

1. **Add or update your program's dependencies** with the latest version of the Datadog Go library, at least version 1.36.0:
   ```
   go get -v -u gopkg.in/DataDog/dd-trace-go.v1@v1.36.0
   ```

2. **Recompile your program by adding the `appsec` build tag** using the Go compiler option `-tags appsec`:
   ```
   go build -tags appsec my-program
   ```

3. **Redeploy your Go service and enable Application Security** by setting the `DD_APPSEC_ENABLED` environment variable to `true`:
   ```
   env DD_APPSEC_ENABLED=true ./my-program
   ```
   Or one of the following methods, depending on where your application runs:

   {{< tabs >}}
{{% tab "Docker CLI" %}}

Update your configuration container for APM by adding the following argument in your `docker run` command: 

```
docker run [...] -e DD_APPSEC_ENABLED=true [...] 
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Add the following environment variable value to your container Dockerfile:

```
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Update your configuration yaml file container for APM and add the AppSec env variable:

```
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
{{% tab "AWS ECS" %}}

Update your ECS task definition JSON file, by adding this in the  environment section:

```
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

{{< img src="/security_platform/application_security/application-security-signal.png" alt="Security Signal details page showing tags, metrics, suggested next steps, and attacker IP addresses associated with a threat." style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pkg.go.dev/cmd/cgo
