---
title: Understanding Injector Behavior with Single Step Instrumentation
description: Learn how the injector works with Single Step Instrumentation to automatically instrument applications at runtime without manual configuration.
further_reading:
- link: tracing/trace_collection/automatic_instrumentation/single-step-apm
  tag: Documentation
  text: Single Step APM Instrumentation
---

## Overview

The injector is a shared library that automatically instruments applications at runtime. With [Single Step Instrumentation][1], the injector automates environment setup and tracer initialization, eliminating the need for manual configuration.

## How the injector is loaded

### Linux

On Linux systems, the injector uses the `LD_PRELOAD` mechanism—a dynamic linking feature in Unix-like environments—to load itself into all dynamically linked processes. This can happen in two ways:
- Explicitly, by setting the `LD_PRELOAD` environment variable.
- Implicitly, by modifying the system-wide `/etc/ld.so.preload` file.

### Docker

In Docker environments, the injector uses the same `LD_PRELOAD` mechanism as on Linux hosts to load into application processes at runtime. This allows it to initialize tracing logic and modify environment variables before the application starts.

To enable this, Datadog provides a custom `runc` shim that replaces Docker's default container runtime. The shim's purpose is to:
1. Inject the shared library (the injector) into the container.
1. Set the `LD_PRELOAD` environment variable, ensuring the injector is loaded into all dynamically linked processes inside the container.

### Kubernetes

In Kubernetes environments, injection is handled by the Datadog Admission Controller, which uses a mutating admission webhook. When a pod is scheduled, the controller:

1. Evaluates whether the pod should be instrumented based on configured selectors (such as namespaces, labels, or specific pod properties).
1. Mutates the pod spec to:
   - Add init containers to download injector and tracer libraries
   - Set environment variables (like `LD_PRELOAD`)
   - Mount volumes to persist injected libraries

## What gets instrumented

Single Step Instrumentation instruments the following types of applications:

- **Web services** - API servers, web applications, microservices
- **Application servers** - Tomcat, Jetty, JBoss, WebLogic, Kestrel
- **Background workers** - Celery, Sidekiq, job processors
- **Custom applications** - Business logic and services

SSI uses multiple signals to determine if a process should be instrumented:

### Location
Applications deployed in standard application directories are instrumented:
- `/opt/myapp`, `/app`, `/home/user/app` (instrumented)
- `/bin`, `/sbin`, `/usr/bin` (system utilities, not instrumented)

### Language
SSI detects applications written in supported languages (Java, .NET, Node.js, Python, Ruby, PHP) and loads the appropriate Datadog SDK.

### Process type
- Long-running server processes (instrumented)
- Short-lived CLI commands (not instrumented)

### Context
SSI differentiates between:
- `java -jar myapp.jar` (application, instrumented)
- `java -version` (version check, not instrumented)
- `npm start` (starts application, instrumented)
- `npm install` (installs dependencies, not instrumented)

## What doesn't get instrumented


### Development and build tools
- **Compilers:** `javac`, `gcc`, `dotnet build`
- **Package managers:** `npm`, `pip`, `gem`, `maven`, `gradle`
- **Build tools:** `make`, `cmake`, `webpack`
- **Project scaffolding:** `dotnet new`, `rails new`, `create-react-app`

### Database and infrastructure management tools
- **Database CLIs:** `psql`, `mysql`, `mongo`, `redis-cli`
- **Kafka tools:** `kafka-topics.sh`, `kafka-console-consumer.sh`
- **Elasticsearch tools:** `elasticsearch-plugin`, `elasticsearch-keystore`
- **Cassandra tools:** `nodetool`, `cqlsh`
- **Cloud CLIs:** `aws`, `gcloud`, `kubectl`

**Note:** The actual database servers, Kafka brokers, and infrastructure services can be monitored using Datadog products such as DSM, DBM, DJM. SSI does not instrument their command-line management utilities.

### IDEs and development environments
- IntelliJ IDEA, Eclipse, NetBeans
- Visual Studio, VS Code
- Remote development environments

### System utilities
- Text processing: `grep`, `sed`, `awk`
- File operations: `cp`, `mv`, `tar`, `zip`
- System monitoring: `ps`, `top`, `htop`
- Package management: `apt`, `yum`, `apk`

### Security and monitoring tools
- Security scanners: `chkrootkit`, `clamscan`, `lynis`
- System monitors: `datadog-agent`, `prometheus`, `telegraf`
- Log collectors: `filebeat`, `fluentd`

## Language-specific behavior

Each Datadog language SDK includes additional logic for instrumentation decisions:

### Java
- Instruments: Application servers, Spring Boot, microservices
- Skips: JDK tools (`javac`, `jar`), build tools, old JVM versions

### .NET
- Instruments: ASP.NET Core, Kestrel, web applications
- Skips: Build commands (`dotnet build`), compilation, already-instrumented apps

### Node.js
- Instruments: Express, Fastify, web servers
- Skips: Package managers (`npm`, `yarn`), build scripts

### Python
- Instruments: Django, Flask, FastAPI, Gunicorn
- Skips: Package managers (`pip`), virtual environment tools

### Ruby
- Instruments: Rails, Sinatra, Puma, Unicorn
- Skips: Gem management (`bundle install`), build tools

All language-specific logic is open source and can be reviewed in the respective tracer repositories:
- [Java SDK requirements](https://github.com/DataDog/dd-trace-java/blob/master/metadata/requirements.json)
- [.NET SDK requirements](https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/build/artifacts/requirements.json)
- [Node.js SDK requirements](https://github.com/DataDog/dd-trace-js/blob/master/requirements.json)
- [Python SDK requirements](https://github.com/DataDog/dd-trace-py/blob/main/lib-injection/sources/requirements.json)
- [Ruby SDK requirements](https://github.com/DataDog/dd-trace-rb/blob/master/lib-injection/requirements.json)

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/single-step-apm
