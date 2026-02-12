---
title: Building your Go application for App and API Protection
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

App and API Protection for Go installation requirements can be abstract and the Go toolchain
cross-compilation and CGO capabilities can make precise installation steps difficult to understand.

The goal of this guide is to provide a step-by-step guide to a working Dockerfile customized for your use case.

## Walkthrough

Many Dockerfiles found in this guide come from the [appsec-go-test-app][4] repository. To try it out, first clone the repository:

```sh
git clone https://github.com/DataDog/appsec-go-test-app.git
cd appsec-go-test-app
```

A list of `Dockerfile` examples can be found in the [`examples/docker`][3] directory.
Here is an example of it in its simplest form:

```dockerfile
FROM golang:1.25.7 AS build
WORKDIR /app
COPY . .

RUN go install github.com/DataDog/orchestrion # Resolved from go.mod dependencies

RUN orchestrion go build -o=main .

FROM debian:bookworm
COPY --from=build /app/main /usr/local/bin

ENV DD_APPSEC_ENABLED=true
ENTRYPOINT [ "/usr/local/bin/main" ]
```

This is the simplest version of a working Dockerfile for a Datadog WAF-enabled Go application. If this is your first use of [Orchestrion][5], note that this dockerfile requires you run `orchestrion pin` beforehand and commit the resulting changes. See [Getting Started for Go][6].

This Dockerfile is split into two stages:
1. The build stage uses a Debian image to build the Go application, and uses the [Orchestrion][5] tool to instrument the application with App and API Protection features.
2. The runtime stage copies the built application into a minimal Ubuntu image and sets the environment variable `DD_APPSEC_ENABLED` to `true` to enable App and API Protection.

This two-stage build process allows you to keep the final image small and free of unnecessary build tools while still ensuring that your application is instrumented correctly for App and API Protection.

The following sections show different Dockerfile scenarios, each with their specific considerations and complete examples.

## Dockerfile scenarios

Two main dimensions impact your Dockerfile choice for App and API Protection:
* **libc implementation**: glibc (Debian/Ubuntu) or musl (Alpine)
* **CGO**: enabled or disabled (with the env var `CGO_ENABLED`).

These dimensions affect both build requirements and runtime compatibility. The Datadog WAF requires specific shared libraries (`libc.so.6`, `libpthread.so.0` and `libdl.so.2`) at runtime and the build approach varies depending on these choices. Those dependencies are required by all programs built with CGO enabled, so the Datadog WAF will work out-of-the-box on runtime environments that support such programs. 

When CGO is disabled, however, Go usually produces a fully, statically linked binary that does not require these libraries. but this is not true when using the Datadog WAF. This is why, when CGO is disabled, the `-tags=appsec` flag needs to be passed to enable the Datadog WAF.

### Standard glibc-based Dockerfile

This is the recommended approach for most users, using Debian/Ubuntu-based images:

```dockerfile
FROM golang:1.25.7 AS build
WORKDIR /app
COPY . .

RUN go install github.com/DataDog/orchestrion
RUN orchestrion go build -o=main .

FROM ubuntu:noble

COPY --from=build /app/main /usr/local/bin
ENV DD_APPSEC_ENABLED=true
ENTRYPOINT [ "/usr/local/bin/main" ]
```

**Key considerations:**
* Uses [Orchestrion][5] for compile-time instrumentation
* CGO is enabled by default, providing the required shared libraries
* The runtime uses the same libc implementation (glibc) as the build stage
* No additional packages needed in the runtime stage

### Glibc-built and Alpine runtime

If you need CGO but still want a lighter runtime image, build with a Debian-based image and run with Alpine:

```dockerfile
FROM golang:1.25.7 AS build
WORKDIR /app
COPY . .

RUN go install github.com/DataDog/orchestrion
RUN orchestrion go build -o=main .

FROM alpine

COPY --from=build /app/main /usr/local/bin/main
RUN apk add libc6-compat
ENV DD_APPSEC_ENABLED=true
ENTRYPOINT [ "/usr/local/bin/main" ]
```

**Key considerations:**
* No `appsec` build tag required
* `apk add libc6-compat` adds symlinks where necessary for a glibc-built binary to work on Alpine
* This setup may require installing more packages at runtime if other libraries than Datadog use CGO

### Alpine-based Dockerfile (CGO disabled)

For minimal build and runtime size, using CGO disabled builds (the default on Alpine):

```dockerfile
FROM golang:1.25.7-alpine AS build
WORKDIR /app
COPY . .

RUN go install github.com/DataDog/orchestrion
RUN orchestrion go build -tags=appsec -o=main .

FROM alpine

COPY --from=build /app/main /usr/local/bin/main
ENV DD_APPSEC_ENABLED=true
ENTRYPOINT [ "/usr/local/bin/main" ]
```

**Key considerations:**
* Requires the `-tags=appsec` flag when CGO is disabled

### Minimal Dockerfile with library extraction

For ultra-minimal images when using `CGO_ENABLED=0`:

```dockerfile
FROM golang:1.25.7 AS build
WORKDIR /app
COPY . .

RUN go install github.com/DataDog/orchestrion

# Build with appsec tag for CGO-disabled builds
ENV CGO_ENABLED=0
RUN orchestrion go build -tags=appsec -o=main .

# Install ldd and extract shared libraries that are necessary at runtime
RUN apt update && apt install -y binutils
RUN ldd main | tr -s '[:blank:]' '\n' | grep '^/' | \
      xargs -I % sh -c 'mkdir -p $(dirname libs%); cp % libs%;'

FROM scratch
COPY --from=build /app/libs /app/main /
ENV DD_APPSEC_ENABLED=true
ENTRYPOINT [ "/main" ]
```

**Key considerations:**
* Requires the `-tags=appsec` flag when CGO is disabled
* Must manually extract and copy required shared libraries
* Results in the smallest possible image size
* The `ldd` command identifies all runtime dependencies

### Distroless Dockerfile

For security-focused deployments using [Google's distroless][7] images:

```dockerfile
FROM golang:1.25.7 AS build
WORKDIR /app
COPY . .

RUN go install github.com/DataDog/orchestrion

ENV CGO_ENABLED=0
RUN orchestrion go build -tags=appsec -o=main .

# Install ldd and extract shared libraries
RUN apt update && apt install -y binutils
RUN ldd main | tr -s '[:blank:]' '\n' | grep '^/' | \
      xargs -I % sh -c 'mkdir -p $(dirname libs%); cp % libs%;'

FROM gcr.io/distroless/base-debian12:nonroot
COPY --from=build /app/libs /app/main /
ENV DD_APPSEC_ENABLED=true
ENTRYPOINT [ "/main" ]
```

**Key considerations:**
* Provides enhanced security by eliminating package managers and shells
* Requires library extraction similar to the scratch approach
* Runs as non-root user by default
* Maintains compatibility with glibc-based shared libraries

### Cross-compilation Dockerfile

For building applications targeting different architectures:

```dockerfile
FROM golang:1.25.7 AS build
# Install cross-compilation toolchain
RUN apt-get update && apt-get install -y gcc-aarch64-linux-gnu

WORKDIR /app
COPY . .

RUN go install github.com/DataDog/orchestrion

# Cross-compile for ARM64
ENV CGO_ENABLED=1 CC=aarch64-linux-gnu-gcc GOOS=linux GOARCH=arm64
RUN orchestrion go build -o=main .

FROM arm64v8/debian
COPY --from=build /app/main /usr/local/bin
ENV DD_APPSEC_ENABLED=true
ENTRYPOINT [ "/usr/local/bin/main" ]
```

**Key considerations:**
* Requires installing the appropriate cross-compilation toolchain
* Must set `CC`, `GOOS`, and `GOARCH` environment variables
* The runtime stage must match the target architecture
* CGO must be enabled for proper WAF integration

## Try it out

Most of these Dockerfiles are available in [appsec-go-test-app][4], trying them out is very easy:

```sh
docker build -f ./examples/alpine/Dockerfile -t appsec-go-test-app .
docker run appsec-go-test-app
```

### Verify your setup

To verify that App and API Protection is working correctly:
   
To see App and API Protection threat detection in action, send known attack patterns to your application. For example, trigger the [Security Scanner Detected][9] rule by running a file that contains the following curl script:
<div>
<pre><code>for ((i=1;i<=250;i++)); <br>do<br># Target existing service’s routes<br>curl https://your-application-url/existing-route -A Arachni/v1.0;<br># Target non existing service’s routes<br>curl https://your-application-url/non-existing-route -A Arachni/v1.0;<br>done</code></pre></div>

A few minutes after you enable your application and exercise it, **threat information appears in the [Application Trace and Signals Explorer][8] in Datadog**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/setup/compatibility/go
[3]: https://github.com/DataDog/appsec-go-test-app/blob/main/examples/docker
[4]: https://github.com/DataDog/appsec-go-test-app
[5]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go/?tab=compiletimeinstrumentation
[6]: /security/application_security/setup/go/setup
[7]: https://github.com/GoogleContainerTools/distroless
[8]: https://app.datadoghq.com/security/appsec
[9]: /security/default_rules/security-scan-detected/