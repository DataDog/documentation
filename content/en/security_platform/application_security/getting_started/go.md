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
- [CGO][1] is enabled in your build environment, along with the C library headers and the C toolchain for your compilation target.

## Get started

1. **Update your program's dependencies** with the latest version of the Datadog Go library (>= v1.36.0):
   ```console
   $ go get -v -u gopkg.in/DataDog/dd-trace-go.v1@v1.36.0
   ```

2. Make sure to be using one of the following APM tracing integrations:
- [gRPC](https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc#example-package-Server)
- [net/http](https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http#example-package)
- [Gorilla Mux](https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux#example-package)
- [Echo](https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo#example-package)
- [Chi](https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi#example-package)
- [HttpRouter](https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/julienschmidt/httprouter#example-package)

3. **Recompile your program** while enabling AppSec and CGO:
   ```console
   $ env CGO_ENABLED=1 go build -v -tags appsec my-program
   ```

4. **Redeploy your Go service and enable Application Security** by setting the `DD_APPSEC_ENABLED` environment variable to `true`:
   ```console
   $ env DD_APPSEC_ENABLED=true ./my-program
   ```
   Or one of the following methods, depending on where your application runs:

   {{< tabs >}}
{{% tab "Docker CLI" %}}

Add the environment variable value to your docker command line:

```console
$ docker run -e DD_APPSEC_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

Add the following environment variable value to your container Dockerfile:

```
ENV DD_APPSEC_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Update your deployment configuration file for APM and add the Application Security environment variable:

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

Update your ECS task definition JSON file, by adding this in the environment section:

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

[1]: https://github.com/golang/go/wiki/cgo
