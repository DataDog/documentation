---
title: Building your Go application with Datadog's WAF
code_lang: docker
type: multi-code-lang
code_lang_weight: 10
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

# Introdution

App and API Protection for Go installation requirements can be abstract and the Go toolchain
cross-compilations capabilities can make it hard to understand what has to be done precisely.

In these cases, a more precise way to materialize these examples like a Dockerfile can be interesting.
The goal of this guide is to be a step-by-step guide to a working Dockerfile.

## Wallthrough

This dockerfile can be found like in the [appsec-go-test-app][4] repository. To try it out, first clone the repository:

```sh
git clone https://github.com/DataDog/appsec-go-test-app.git
cd appsec-go-test-app
```

A list of `Dockerfile` examples can be found in the [`examples/docker`][3] directory.
Here is an example of it in its simplest form:

```dockerfile
FROM golang:1 AS build
WORKDIR /app
COPY . .

RUN go install github.com/DataDog/orchestrion@latest && \
    orchestrion pin

RUN orchestrion go build -v -o main .

FROM alpine
COPY --from=build /app/main /usr/local/bin

# Every required shared library is already present in alpine, but the C library
# doesn't have the standard name on alpine by default. Adding the libc6-compat
# package allows to add symlinks with the expected names.
RUN apk update && apk add libc6-compat

# Enable the App and API Protection
ENV DD_APPSEC_ENABLED=true
ENTRYPOINT [ "/usr/local/bin/main" ]
```

Multiple remarks can be made here:
* The first stage uses [Orchestrion][5] compile-time instrumentation to instrument the Go application with the App and API Protection features.
* The flag `-tags appsec` or CGO being enabled are requirements at build time for C++ Datadog's WAF. If none of these requirements are met, your service will be marked as not compatible is Datadog's UI.
* the `libc6-compat` package is required because Datadog's WAF needs the following shared libraries on Linux: `libc.so.6` and `libpthread.so.0`. If you are using `CGO_ENABLED=0` and `-tags` appsec at the same time and those shared libraries are not present at runtime you app will refuse to start with the error `No such file or directory`.

TODO: building your our own

## Run your application

Now that the dockerfile is ready you can build the [appsec-go-test-app][4]:

```sh
docker build -f ./examples/alpine/Dockerfile -t appsec-go-test-app .
docker run appsec-go-test-app
```

{{% app_and_api_protection_verify_setup %}}

## Troubleshooting

If you encounter issues while setting up App and API Protection for your application, see the [Go App and API Protection troubleshooting guide][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/go/compatibility
[2]: /security/application_security/setup/go/troubleshooting
[3]: https://github.com/DataDog/appsec-go-test-app/blob/main/examples/docker
[4]: https://github.com/DataDog/appsec-go-test-app
[5]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go/?tab=compiletimeinstrumentation
