---
title: Building your Go application with Orchestrion
code_lang: docker
type: multi-code-lang
code_lang_weight: 10
further_reading:
- link: "/tracing/trace_collection/library_config/go/"
  tag: "Documentation"
  text: "Tracing Go Applications"
- link: "https://docs.datadoghq.com/tracing/trace_collection/library_config/go/"
  tag: "Documentation"
  text: "Configuring the Go Tracing Library"
- link: "/tracing/troubleshooting/go_compile_time/"
  tag: "Documentation"
  text: "Troubleshooting Go Compile-Time Instrumentation"
---

# Introduction

This guide provides a step-by-step approach to building a Dockerfile for Go applications instrumented with Application Performance Monitoring (APM) using [Orchestrion][1]. The goal is to create a production-ready container image that includes compile-time instrumentation for distributed tracing.

This guide focuses on APM instrumentation only. If you need Application Security Management (ASM) features, refer to the [App and API Protection Dockerfile guide][2].

## Prerequisites

Before you begin:
- Your application must use [Go modules][3] for dependency management
- You should have already run `orchestrion pin` in your project to register Orchestrion in your `go.mod` file
- For configuration options beyond what's shown here, refer to the [Library Configuration documentation][4]

## Minimal Dockerfile

Here's a minimal, production-ready Dockerfile for building Go applications with APM instrumentation:

```dockerfile
FROM golang:1 AS build
WORKDIR /app

# Copy dependency files first for better layer caching
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Install Orchestrion from pinned dependencies
RUN go install github.com/DataDog/orchestrion

# Build with Orchestrion instrumentation
RUN orchestrion go build -o=main .

FROM debian:bookworm
COPY --from=build /app/main /usr/local/bin/
ENTRYPOINT [ "/usr/local/bin/main" ]
```

## Optimizing Build Performance with GOCACHE

To speed up successive builds, you can persist Go's build cache between Docker builds using a Docker volume. This is particularly useful in CI/CD pipelines where you build frequently.

### Create and use a build cache volume

First, create a named Docker volume for the build cache:

```sh
docker volume create go-build-cache
```

Then build your image using the cache volume. You need to set the `GOCACHE` environment variable in the build stage and mount the volume:

```dockerfile
FROM golang:1 AS build
WORKDIR /app

# Set GOCACHE to a persistent location
ENV GOCACHE=/go/build-cache

# Copy dependency files first for better layer caching
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Install Orchestrion from pinned dependencies
RUN go install github.com/DataDog/orchestrion

# Build with Orchestrion instrumentation
RUN orchestrion go build -o=main .

FROM debian:bookworm
COPY --from=build /app/main /usr/local/bin/
ENTRYPOINT [ "/usr/local/bin/main" ]
```

Build the image with the cache mount:

```sh
docker build \
  --mount type=volume,source=go-build-cache,target=/go/build-cache \
  -t my-apm-app .
```

**Note**: The `--mount` flag requires Docker BuildKit. Enable it by setting `DOCKER_BUILDKIT=1` or by using `docker buildx build`.

## Running Your Application

### Basic usage

Run your containerized application with:

```sh
docker run my-apm-app
```

### Configuring APM

Configure your application's APM behavior using environment variables at runtime:

```sh
docker run \
  -e DD_SERVICE=my-service \
  -e DD_ENV=production \
  -e DD_VERSION=1.0.0 \
  -e DD_AGENT_HOST=datadog-agent \
  my-apm-app
```

For a complete list of configuration options, see the [Library Configuration documentation][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/orchestrion
[2]: /security/application_security/setup/go/dockerfile/
[3]: https://go.dev/ref/mod
[4]: /tracing/trace_collection/library_config/go/
[5]: https://github.com/DataDog/orchestrion
