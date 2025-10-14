# .NET Documentation Catalog

> Generated on 2025-10-03
> Comprehensive catalog of all .NET/C# documentation in the Datadog documentation repository

## Overview

This catalog documents all .NET-related content across the Datadog documentation, with emphasis on serverless environments (AWS Lambda, Azure Functions, Azure App Services).

**Total Files:** 49 documentation files
**Serverless-Specific Files:** 13 files

---

## 1. APM / Tracing - Core Setup & Configuration

### 1.1 Main Setup Guides

#### `content/en/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core.md`
- **Purpose:** Primary setup guide for .NET Core/.NET 5+ applications
- **Key Topics:**
  - Installation methods: Windows, Linux, NuGet
  - Compatibility requirements
  - Enabling the tracer
  - Custom instrumentation
  - Environment variable configuration
- **Serverless References:** Azure App Service, AWS Lambda setup
- **Line Count:** Unknown (requires reading)

#### `content/en/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-framework.md`
- **Purpose:** Primary setup guide for .NET Framework applications
- **Key Topics:**
  - Windows installation
  - NuGet package installation
  - IIS configuration
  - Windows services setup
  - Custom instrumentation
- **Serverless References:** Azure App Service
- **Line Count:** Unknown

### 1.2 Configuration Reference

#### `content/en/tracing/trace_collection/library_config/dotnet-core.md`
- **Purpose:** Complete configuration reference for .NET Core tracer
- **Key Topics:**
  - Unified Service Tagging
  - Trace configuration options
  - Agent connection settings
  - Trace propagation
  - Diagnostic logging
  - OpenTelemetry integration
  - Per-integration settings
- **Serverless References:** Azure App Service extension
- **Line Count:** Unknown

#### `content/en/tracing/trace_collection/library_config/dotnet-framework.md`
- **Purpose:** Complete configuration reference for .NET Framework tracer
- **Key Topics:** Same as dotnet-core but tailored for Framework (no Unix Domain Sockets)
- **Serverless References:** Azure App Service extension
- **Line Count:** Unknown

### 1.3 Compatibility

#### `content/en/tracing/trace_collection/compatibility/dotnet-core.md`
- **Purpose:** Runtime and integration compatibility matrix
- **Key Topics:**
  - Supported .NET versions (.NET Core 3.1 through .NET 9)
  - Processor architectures (x86, x64, ARM64)
  - Operating systems (Windows, Linux, macOS)
  - Supported integrations (ASP.NET Core, Azure Functions, AWS SDK, etc.)
  - End-of-life version support
- **Serverless References:**
  - Azure Functions (in-process and isolated worker models)
  - macOS support for CI environments
- **Line Count:** Unknown

#### `content/en/tracing/trace_collection/compatibility/dotnet-framework.md`
- **Purpose:** .NET Framework compatibility matrix
- **Key Topics:**
  - Supported Framework versions (4.6.1+)
  - Processor architectures
  - Integrations (ASP.NET, WCF, MSMQ, ADO.NET, etc.)
- **Serverless References:** None
- **Line Count:** Unknown

---

## 2. APM / Tracing - Custom Instrumentation

### 2.1 Custom Instrumentation Overview

#### `content/en/tracing/trace_collection/custom_instrumentation/dotnet/_index.md`
- **Purpose:** Landing page for .NET custom instrumentation options
- **Line Count:** Unknown

#### `content/en/tracing/trace_collection/custom_instrumentation/dotnet/dd-api.md`
- **Purpose:** Custom instrumentation using Datadog's native .NET API
- **Key Topics:**
  - Creating custom spans
  - Adding tags and metrics
  - Manual trace context propagation
- **Line Count:** Unknown

#### `content/en/tracing/trace_collection/custom_instrumentation/dotnet/otel.md`
- **Purpose:** Custom instrumentation using OpenTelemetry APIs
- **Key Topics:**
  - OpenTelemetry SDK integration
  - ActivitySource usage
  - Datadog exporter configuration
- **Line Count:** Unknown

#### `content/en/tracing/trace_collection/custom_instrumentation/opentracing/dotnet.md`
- **Purpose:** OpenTracing API support (legacy)
- **Key Topics:**
  - OpenTracing shim
  - Migration guidance
- **Line Count:** Unknown

---

## 3. APM / Tracing - Additional Features

### 3.1 Log Correlation

#### `content/en/tracing/other_telemetry/connect_logs_and_traces/dotnet.md`
- **Purpose:** Connecting .NET application logs with APM traces
- **Key Topics:**
  - Automatic injection for popular logging libraries:
    - Serilog
    - log4net
    - NLog
    - Microsoft.Extensions.Logging
  - Manual injection of correlation IDs
  - Trace and span ID extraction
- **Serverless References:** None
- **Line Count:** Unknown

### 3.2 Troubleshooting

#### `content/en/tracing/troubleshooting/dotnet_diagnostic_tool.md`
- **Purpose:** Using the .NET diagnostic tool for troubleshooting tracer issues
- **Key Topics:**
  - Running diagnostics
  - Interpreting output
  - Common issues and resolutions
- **Line Count:** Unknown

### 3.3 Dynamic Instrumentation

#### `content/en/tracing/dynamic_instrumentation/enabling/dotnet.md`
- **Purpose:** Enabling dynamic instrumentation for live debugging
- **Key Topics:**
  - Setup and prerequisites
  - Adding dynamic probes
  - Security considerations
- **Line Count:** Unknown

#### `content/en/tracing/dynamic_instrumentation/symdb/dotnet.md`
- **Purpose:** Symbol database configuration for dynamic instrumentation
- **Key Topics:**
  - Symbol file generation
  - PDB handling
  - Upload process
- **Line Count:** Unknown

---

## 4. Serverless - AWS Lambda

### 4.1 Lambda Instrumentation

#### `content/en/serverless/aws_lambda/instrumentation/dotnet.md`
- **Purpose:** **Primary guide for .NET serverless on AWS Lambda**
- **Key Topics:**
  - Setup methods:
    - Datadog CLI
    - Serverless Framework plugin
    - AWS SAM
    - Container images
    - Terraform
    - Custom/manual installation
  - Lambda layer configuration (x86 and ARM64)
  - Extension setup
  - Adding custom spans and metrics
  - FIPS compliance
  - Environment variable reference
- **Serverless References:** Full AWS Lambda coverage
- **Line Count:** Unknown
- **Priority:** **HIGH** - Core serverless documentation

#### `content/en/serverless/guide/datadog_forwarder_dotnet.md`
- **Purpose:** Using Datadog Forwarder (legacy) with .NET Lambda functions
- **Key Topics:**
  - Forwarder setup
  - Log and trace forwarding
  - Migration to Extension
- **Line Count:** Unknown

---

## 5. Serverless - Azure Functions

### 5.1 Azure Functions Setup

#### `content/en/serverless/azure_functions/_index.md`
- **Purpose:** **Primary guide for Azure Functions monitoring across all runtimes**
- **Key Topics:**
  - Setup for multiple runtimes (Node.js, Python, Java, .NET)
  - **.NET-specific content:**
    - Isolated Worker model support
    - In-Container model (custom handlers)
    - Datadog.AzureFunctions NuGet package
    - Dependency injection
    - Compatibility layer for Azure SDK
  - Automatic instrumentation
  - Custom metrics via DogStatsD
  - Distributed tracing
- **Serverless References:** Full Azure Functions coverage
- **Line Count:** Unknown
- **Priority:** **HIGH** - Core serverless documentation

---

## 6. Serverless - Azure App Service

### 6.1 Overview

#### `content/en/serverless/azure_app_service/_index.md`
- **Purpose:** Landing page for Azure App Service monitoring
- **Key Topics:**
  - Overview of three deployment models:
    - Windows Code
    - Linux Code
    - Linux Containers
  - APM pricing considerations
  - Links to specific setup guides
- **Line Count:** Unknown

### 6.2 Windows Code Deployments

#### `content/en/serverless/azure_app_service/windows_code.md`
- **Purpose:** **Primary guide for Azure App Service on Windows**
- **Key Topics:**
  - Extension installation:
    - Manual via Azure Portal
    - Terraform automation
  - Supported runtimes (.NET, Java, Node.js, PHP)
  - **.NET-specific configuration:**
    - IIS integration
    - App Settings configuration
    - Site extension setup
  - Custom metrics via DogStatsD
  - Log collection
  - Programmatic management:
    - PowerShell scripts
    - ARM templates
    - Azure CLI
- **Serverless References:** Full Windows App Service coverage
- **Line Count:** Unknown
- **Priority:** **HIGH** - Core serverless documentation

### 6.3 Linux Code Deployments

#### `content/en/serverless/azure_app_service/linux_code.md`
- **Purpose:** **Primary guide for Azure App Service on Linux (code deployments)**
- **Key Topics:**
  - Sidecar container pattern using serverless-init
  - Setup methods:
    - Datadog CLI
    - Terraform
    - Manual configuration
  - Tracer library installation per runtime
  - **.NET-specific setup:**
    - Datadog.Trace.Bundle NuGet package
    - Environment variables:
      - `DD_DOTNET_TRACER_HOME`
      - `CORECLR_ENABLE_PROFILING`
      - `CORECLR_PROFILER`
      - `CORECLR_PROFILER_PATH`
    - Startup command configuration
  - Log collection
  - Custom metrics
- **Serverless References:** Full Linux code deployment coverage
- **Line Count:** Unknown
- **Priority:** **HIGH** - Core serverless documentation

### 6.4 Linux Container Deployments

#### `content/en/serverless/azure_app_service/linux_container.md`
- **Purpose:** **Primary guide for Azure App Service Linux containers**
- **Key Topics:**
  - Containerized application instrumentation
  - Sidecar pattern setup
  - **.NET-specific Dockerfile instructions:**
    - Installing dd-trace-dotnet
    - Environment variable configuration
    - Multi-stage builds
  - Example applications
  - Agent configuration
  - Custom metrics and logs
- **Serverless References:** Full Linux container coverage
- **Line Count:** Unknown
- **Priority:** **HIGH** - Core serverless documentation

### 6.5 Azure App Service Guides

#### `content/en/serverless/guide/aca_serverless_init.md`
- **Purpose:** Using serverless-init with Azure Container Apps
- **Key Topics:**
  - Azure Container Apps setup
  - Serverless-init sidecar pattern
- **Line Count:** Unknown

#### `content/en/serverless/guide/azure_app_service_linux_code_wrapper_script.md`
- **Purpose:** Alternative wrapper script approach for Linux code deployments
- **Key Topics:**
  - Custom startup scripts
  - Environment setup
- **Line Count:** Unknown

#### `content/en/serverless/guide/azure_app_service_linux_containers_serverless_init.md`
- **Purpose:** Alternative serverless-init approach for containers
- **Key Topics:**
  - serverless-init integration
  - Dockerfile patterns
- **Line Count:** Unknown

---

## 7. Serverless - Google Cloud

### 7.1 Google Cloud Run

#### `content/en/serverless/google_cloud_run/containers/in_container/dotnet.md`
- **Purpose:** In-container instrumentation for Cloud Run containers
- **Key Topics:**
  - Dockerfile setup
  - dd-trace-dotnet installation
  - Agent configuration
- **Line Count:** Unknown

#### `content/en/serverless/google_cloud_run/functions/dotnet.md`
- **Purpose:** Google Cloud Run functions for .NET
- **Key Topics:**
  - Function instrumentation
  - Deployment configuration
- **Line Count:** Unknown

#### `content/en/serverless/google_cloud_run/containers/sidecar/dotnet.md`
- **Purpose:** Sidecar pattern for Cloud Run containers
- **Key Topics:**
  - Multi-container deployment
  - Agent sidecar configuration
- **Line Count:** Unknown

---

## 8. Application Security Management (ASM)

### 8.1 ASM Setup

#### `content/en/security/application_security/setup/dotnet/_index.md`
- **Purpose:** Landing page for ASM .NET setup
- **Line Count:** Unknown

#### `content/en/security/application_security/setup/dotnet/dotnet.md`
- **Purpose:** Primary ASM enablement guide for .NET
- **Key Topics:**
  - Threat detection and protection
  - Enabling ASM via `DD_APPSEC_ENABLED`
  - Configuration for:
    - Windows (IIS, Windows Services)
    - Linux
    - Docker
    - Kubernetes
    - AWS ECS/Fargate
  - Standalone ASM without APM
  - Attack detection rules
- **Serverless References:**
  - Azure App Service
  - AWS Fargate
  - ECS
- **Line Count:** Unknown

### 8.2 ASM Compatibility

#### `content/en/security/application_security/setup/compatibility/dotnet.md`
- **Purpose:** ASM compatibility matrix
- **Key Topics:**
  - Supported .NET versions
  - Tracer version requirements
  - Feature support by runtime
- **Line Count:** Unknown

#### `content/en/security/application_security/setup/dotnet/compatibility.md`
- **Purpose:** Detailed compatibility information
- **Line Count:** Unknown

### 8.3 ASM Platform-Specific Setup

#### `content/en/security/application_security/setup/aws/lambda/dotnet.md`
- **Purpose:** ASM for AWS Lambda .NET functions
- **Key Topics:**
  - Lambda-specific ASM configuration
  - Threat detection in serverless
- **Serverless References:** AWS Lambda ASM
- **Line Count:** Unknown

#### `content/en/security/application_security/setup/gcp/cloud-run/dotnet.md`
- **Purpose:** ASM for Google Cloud Run .NET
- **Serverless References:** GCP Cloud Run ASM
- **Line Count:** Unknown

#### `content/en/security/application_security/setup/dotnet/aws-fargate.md`
- **Purpose:** ASM for AWS Fargate .NET
- **Serverless References:** AWS Fargate
- **Line Count:** Unknown

#### `content/en/security/application_security/setup/dotnet/docker.md`
- **Purpose:** ASM for Docker containers
- **Line Count:** Unknown

#### `content/en/security/application_security/setup/dotnet/kubernetes.md`
- **Purpose:** ASM for Kubernetes deployments
- **Line Count:** Unknown

#### `content/en/security/application_security/setup/dotnet/linux.md`
- **Purpose:** ASM for Linux hosts
- **Line Count:** Unknown

#### `content/en/security/application_security/setup/dotnet/windows.md`
- **Purpose:** ASM for Windows hosts
- **Line Count:** Unknown

### 8.4 ASM Troubleshooting

#### `content/en/security/application_security/setup/dotnet/troubleshooting.md`
- **Purpose:** Troubleshooting ASM issues in .NET
- **Key Topics:**
  - Common ASM problems
  - Diagnostic steps
  - Performance considerations
- **Line Count:** Unknown

---

## 9. Code Security - IAST & SCA

### 9.1 Interactive Application Security Testing (IAST)

#### `content/en/security/code_security/iast/setup/dotnet.md`
- **Purpose:** IAST setup for .NET
- **Key Topics:**
  - Enabling IAST
  - Vulnerability detection
  - Supported vulnerability types
- **Line Count:** Unknown

#### `content/en/security/code_security/iast/setup/compatibility/dotnet.md`
- **Purpose:** IAST compatibility matrix
- **Line Count:** Unknown

### 9.2 Software Composition Analysis (SCA)

#### `content/en/security/code_security/software_composition_analysis/setup_runtime/compatibility/dotnet.md`
- **Purpose:** Runtime SCA compatibility for .NET
- **Key Topics:**
  - Dependency vulnerability scanning
  - Supported package managers (NuGet)
  - Tracer version requirements
- **Line Count:** Unknown

---

## 10. Continuous Profiler

### 10.1 Profiler Setup

#### `content/en/profiler/enabling/dotnet.md`
- **Purpose:** Enabling .NET Continuous Profiler
- **Key Topics:**
  - Requirements (.NET Framework 4.6.1+, .NET Core 3.1+, .NET 5-9)
  - Installation methods:
    - Linux
    - Windows
    - NuGet
    - Azure App Service
  - Enabling profiler for:
    - IIS applications
    - Windows services
    - Standalone applications
  - Supported profiling types:
    - Wall time
    - CPU
    - Garbage Collection
    - Exceptions
    - Allocations
    - Lock contention
    - Live heap
- **Serverless References:**
  - Azure App Service (Web Apps only)
  - **Note:** Azure Functions NOT supported
- **Line Count:** Unknown

### 10.2 Profiler Troubleshooting

#### `content/en/profiler/profiler_troubleshooting/dotnet.md`
- **Purpose:** Troubleshooting profiler issues
- **Key Topics:**
  - Missing profiles
  - Performance issues
  - Configuration validation
- **Line Count:** Unknown

---

## 11. Test Optimization / CI Visibility

### 11.1 Test Setup

#### `content/en/tests/setup/dotnet.md`
- **Purpose:** .NET test instrumentation
- **Key Topics:**
  - Compatibility:
    - xUnit
    - NUnit
    - MSTestV2
    - BenchmarkDotNet
  - dd-trace CLI installation
  - Instrumenting test runs
  - Custom tags and measurements
  - Code coverage collection
  - BenchmarkDotNet integration
  - Manual testing API
- **Serverless References:** None
- **Line Count:** Unknown

### 11.2 Test Impact Analysis

#### `content/en/tests/test_impact_analysis/setup/dotnet.md`
- **Purpose:** Test Impact Analysis for .NET
- **Key Topics:**
  - Intelligent test selection
  - CI optimization
- **Line Count:** Unknown

---

## 12. Logging

### 12.1 Log Collection

#### `content/en/logs/log_collection/csharp.md`
- **Purpose:** C# log collection configuration
- **Key Topics:**
  - File-tail logging with Datadog Agent:
    - Serilog
    - NLog
    - log4net
  - Agentless logging with APM
  - Agentless logging with Serilog sink
  - Log formatting and configuration
  - JSON logging
- **Serverless References:** Azure App Service references
- **Line Count:** Unknown

---

## 13. Data Streams Monitoring

#### `content/en/data_streams/setup/language/dotnet.md`
- **Purpose:** Data Streams Monitoring for .NET
- **Key Topics:**
  - Message queue instrumentation
  - Kafka, RabbitMQ, SQS support
  - End-to-end latency tracking
- **Line Count:** Unknown

---

## 14. OpenTelemetry

#### `content/en/opentelemetry/instrument/api_support/dotnet.md`
- **Purpose:** OpenTelemetry API support in Datadog .NET tracer
- **Key Topics:**
  - OTel SDK compatibility
  - ActivitySource instrumentation
  - Datadog exporter
  - Migration guidance
- **Line Count:** Unknown

---

## Summary Statistics

### By Category

| Category | File Count |
|----------|------------|
| APM/Tracing (Setup, Config, Compatibility) | 6 |
| APM/Tracing (Custom Instrumentation) | 4 |
| APM/Tracing (Additional Features) | 4 |
| Serverless - AWS Lambda | 2 |
| Serverless - Azure Functions | 1 |
| Serverless - Azure App Service | 6 |
| Serverless - Google Cloud | 3 |
| Application Security (ASM) | 12 |
| Code Security (IAST/SCA) | 3 |
| Continuous Profiler | 2 |
| Test Optimization | 2 |
| Logging | 1 |
| Data Streams | 1 |
| OpenTelemetry | 1 |
| **TOTAL** | **49** |

### Serverless Deep Dive

**.NET serverless documentation is comprehensive across three major platforms:**

#### AWS Lambda (2 files)
- Full instrumentation guide with multiple deployment patterns
- Layer-based and container-based deployments
- ASM support

#### Azure Functions (1 file)
- Isolated Worker and In-Container models
- NuGet package integration
- Automatic instrumentation

#### Azure App Service (6 files)
- **Windows Code:** Extension-based monitoring
- **Linux Code:** Sidecar pattern with serverless-init
- **Linux Containers:** Dockerfile instrumentation
- Multiple deployment automation options (Terraform, ARM, PowerShell)
- Comprehensive environment variable documentation

#### Google Cloud (3 files)
- Cloud Run containers (in-container and sidecar)
- Cloud Functions support

---

## Key Observations for Improvement Focus

### 1. Serverless Coverage Strengths
- Azure App Service has the most comprehensive documentation (3 deployment models)
- AWS Lambda has strong deployment method coverage (CLI, SAM, Terraform, etc.)
- Azure Functions documentation is consolidated in a single file

### 2. Potential Documentation Gaps
- **Azure Functions:** Only 1 file vs 6 for App Service and 2 for Lambda
- **Profiler:** Explicitly states Azure Functions NOT supported
- **Cross-references:** May need better linking between APM setup and serverless-specific docs

### 3. Documentation Patterns
- **Layered approach:** High-level overviews → platform-specific setup → troubleshooting
- **Multiple entry points:** Users can start from APM docs or serverless docs
- **Environment variable configuration:** Central to all serverless setups

### 4. Priority Areas for Enhancement (based on your focus)
1. **AWS Lambda .NET:** `serverless/aws_lambda/instrumentation/dotnet.md`
2. **Azure Functions .NET:** `serverless/azure_functions/_index.md`
3. **Azure App Service Windows:** `serverless/azure_app_service/windows_code.md`
4. **Azure App Service Linux Code:** `serverless/azure_app_service/linux_code.md`
5. **Azure App Service Linux Containers:** `serverless/azure_app_service/linux_container.md`

### 5. Common Serverless Enablement Patterns Across Docs
- **Environment variables:** Core configuration method
- **Tracer installation:** NuGet, layers, or manual file placement
- **Agent connection:** Extension, sidecar, or direct
- **Custom instrumentation:** Adding spans and metrics
- **Log correlation:** Connecting logs to traces

---

## Next Steps for Documentation Improvement

Based on this catalog, recommended focus areas for .NET serverless APM enablement:

1. **Audit existing serverless docs** for consistency in:
   - Environment variable naming and values
   - Installation steps
   - Troubleshooting sections
   - Example applications

2. **Expand Azure Functions documentation:**
   - Consider splitting into separate files for Isolated Worker vs In-Container
   - Add more deployment examples (Terraform, Azure CLI)
   - Include common troubleshooting scenarios

3. **Create cross-reference map:**
   - Link from main APM setup docs to serverless-specific pages
   - Add "Quick Start" sections for common scenarios

4. **Add comparison guide:**
   - When to use Lambda vs Functions vs App Service
   - Feature parity matrix across serverless platforms

5. **Enhance troubleshooting:**
   - Serverless-specific diagnostics
   - Common cold start issues
   - Performance optimization for serverless

---

*End of Catalog*
