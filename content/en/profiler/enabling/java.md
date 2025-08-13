---
title: Enabling the Java Profiler
code_lang: java
type: multi-code-lang
code_lang_weight: 10
further_reading:
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'profiler/profile_visualizations'
      tag: 'Documentation'
      text: 'Learn more about available profile visualizations'
    - link: 'profiler/profiler_troubleshooting/java'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
aliases:
  - /tracing/profiler/enabling/java/
---

The profiler is shipped within Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

## Choose your setup

Select your deployment environment to get started with the most appropriate configuration:

{{< tabs >}}
{{% tab "Standard Application" %}}
**For:** Java applications running on servers, VMs, or bare metal

**Best for:** Traditional deployments with full system access and control

**Requirements:**
- **Linux** (primary), Windows (limited support)
- **JDK versions:** OpenJDK/Oracle JDK 8u352+, 11.0.17+, 17.0.5+, 21+
- **Profiling engine:** Datadog Profiler (default, recommended)
- **System access:** Full access for optimal performance

{{% /tab %}}
{{% tab "Containerized (Docker/Kubernetes)" %}}
**For:** Java applications running in containers

**Best for:** Microservices, container orchestration platforms

**Requirements:**
- **Platforms:** Docker, Kubernetes, containerized environments
- **JDK versions:** OpenJDK/Oracle JDK 8u352+, 11.0.17+, 17.0.5+, 21+
- **Profiling engine:** Datadog Profiler or fallback options
- **Considerations:** May need `perf_event_paranoid` adjustments

{{% /tab %}}
{{% tab "Constrained Environments" %}}
**For:** Environments with limited privileges or older systems

**Best for:** Shared hosting, older JVMs, environments with restrictions

**Requirements:**
- **Fallback options:** Alternative profiling when system access is limited
- **JDK versions:** OpenJDK 8u262+ (wider compatibility)
- **Profiling engine:** Automatic fallback based on capabilities
- **Note:** May use alternative profiling methods with reduced features

{{% /tab %}}
{{< /tabs >}}

**Supported Languages:** All JVM-based languages (Java, Scala, Groovy, Kotlin, Clojure)

**Not supported:** AWS Lambda and similar serverless platforms

For complete version compatibility details, see [Supported Language and Tracer Versions][13].

## Installation

### Prerequisites

1. **Datadog Agent**: Ensure Datadog Agent v7+ is installed and running. Set `DD_APM_ENABLED=true` if APM is not already enabled.

2. **Download the tracer**: Get the latest `dd-java-agent.jar`:
   {{< tabs >}}
   {{% tab "Command Line" %}}
   ```shell
   # Using wget
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   
   # Or using cURL  
   curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
   {{% /tab %}}
   {{% tab "Dockerfile" %}}
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
   ```
   {{% /tab %}}
   {{< /tabs >}}

### Quick Start by Environment

{{< tabs >}}
{{% tab "Standard Application" %}}

**Recommended configuration** for optimal performance:

```bash
# Environment variables (recommended)
export DD_SERVICE=my-java-app
export DD_ENV=production  
export DD_VERSION=1.0.0
export DD_PROFILING_ENABLED=true

# Optional: Enable all profiling types for complete insights
export DD_PROFILING_DDPROF_CPU_ENABLED=true
export DD_PROFILING_DDPROF_WALL_ENABLED=true
export DD_PROFILING_DDPROF_ALLOC_ENABLED=true

# Start your application
java -javaagent:dd-java-agent.jar -jar myapp.jar
```

**System optimization** (if you have sudo access):
```bash
# Improve profiling accuracy by allowing perf events
sudo sh -c 'echo 2 > /proc/sys/kernel/perf_event_paranoid'
```

{{% /tab %}}
{{% tab "Containerized (Docker/Kubernetes)" %}}

**Docker setup:**

```dockerfile
FROM openjdk:17-jre-slim

# Download tracer
ADD 'https://dtdg.co/latest-java-tracer' /app/dd-java-agent.jar

# Copy your application
COPY myapp.jar /app/

# Configure profiling
ENV DD_PROFILING_ENABLED=true
ENV DD_PROFILING_DDPROF_CPU_ENABLED=true
ENV DD_PROFILING_DDPROF_WALL_ENABLED=true

# Start with profiling enabled
CMD ["java", "-javaagent:/app/dd-java-agent.jar", "-jar", "/app/myapp.jar"]
```

**Kubernetes deployment:**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: java-app
spec:
  template:
    spec:
      containers:
      - name: app
        image: my-java-app:latest
        env:
        - name: DD_PROFILING_ENABLED
          value: "true"
        - name: DD_SERVICE
          value: "my-java-app"
        - name: DD_ENV
          value: "production"
        - name: DD_VERSION
          value: "1.0.0"
        # For better profiling accuracy (optional)
        securityContext:
          capabilities:
            add: ["SYS_ADMIN"]
```

{{% /tab %}}
{{% tab "Constrained Environments" %}}

**Minimal setup** for environments with limited access:

```bash
# Basic profiling with automatic fallbacks
export DD_SERVICE=my-java-app
export DD_ENV=staging
export DD_VERSION=1.0.0
export DD_PROFILING_ENABLED=true

# Let the profiler choose the best available method
# No additional CPU/wall/allocation flags needed
java -javaagent:dd-java-agent.jar -jar myapp.jar
```

**If you encounter permissions issues:**
```bash
# Disable advanced profiling features that require system access
export DD_PROFILING_DDPROF_CPU_ENABLED=false
# The profiler will automatically fall back to available methods
```

**For older JVMs or compatibility issues:**
```bash
# Use environment variables instead of system properties
export DD_PROFILING_ENABLED_EVENTS="jdk.ExecutionSample,jdk.ObjectAllocationInNewTLAB"
```

{{% /tab %}}
{{< /tabs >}}

### Verification

After starting your application:

1. **Check the logs** for profiling initialization messages
2. **Wait 1-2 minutes** for the first profile upload
3. **Visit** [Datadog APM > Profiling page][8] to view your profiles

### Next Steps

- **Source Code Integration**: Set up [Source Code Integration][7] to connect profiles with your Git repositories
- **Advanced Configuration**: See configuration options below for fine-tuning
- **Troubleshooting**: If profiles don't appear, check the [troubleshooting guide][15]

{{% collapse-content title="GraalVM Native Image Support" level="h4" %}}

For GraalVM native-image applications:

```bash
# Follow the Tracer Setup Instructions first
# Then enable profiling with:
DD_PROFILING_ENABLED=true DD_PROFILING_DIRECTALLOCATION_ENABLED=true ./my_service
```

**Note**: Only basic profiling features are available for native-image applications.
{{% /collapse-content %}}

## Configuration

### Common Profiling Types

Enable different profiling types based on what you want to investigate:

{{< tabs >}}
{{% tab "CPU Performance" %}}
**Find CPU bottlenecks and hot code paths**

```bash
# CPU profiling (default enabled)
export DD_PROFILING_DDPROF_CPU_ENABLED=true

# Sample interval (default: 10ms)
export DD_PROFILING_DDPROF_CPU_INTERVAL_MS=10
```

{{% /tab %}}
{{% tab "Memory Analysis" %}}
**Track memory allocations and leaks**

```bash
# Allocation profiling
export DD_PROFILING_DDPROF_ALLOC_ENABLED=true

# Live heap tracking (for memory leaks)
export DD_PROFILING_DDPROF_LIVEHEAP_ENABLED=true

# Allocation sampling interval (default: 256KB)
export DD_PROFILING_DDPROF_ALLOC_INTERVAL=262144
```

{{% /tab %}}
{{% tab "Latency Debugging" %}}
**Profile application latency and trace correlation**

```bash
# Wall-clock profiling (default enabled)
export DD_PROFILING_DDPROF_WALL_ENABLED=true

# Sample interval (default: 50ms)
export DD_PROFILING_DDPROF_WALL_INTERVAL_MS=50

# Enable endpoint correlation
export DD_PROFILING_ENDPOINT_COLLECTION_ENABLED=true
```

{{% /tab %}}
{{% tab "Complete Profiling" %}}
**Enable all available profiling for maximum insights**

```bash
# Enable all main profiling types
export DD_PROFILING_DDPROF_CPU_ENABLED=true
export DD_PROFILING_DDPROF_WALL_ENABLED=true
export DD_PROFILING_DDPROF_ALLOC_ENABLED=true
export DD_PROFILING_DDPROF_LIVEHEAP_ENABLED=true

# Enable advanced features
export DD_PROFILING_ENDPOINT_COLLECTION_ENABLED=true
export DD_PROFILING_TIMELINE_EVENTS_ENABLED=true
```

{{% /tab %}}
{{< /tabs >}}

### Performance Tuning

{{% collapse-content title="Optimize profiling performance" level="h4" %}}

**Reduce profiling overhead:**
```bash
# Increase sampling intervals for lower overhead
export DD_PROFILING_DDPROF_CPU_INTERVAL_MS=50      # default: 10ms
export DD_PROFILING_DDPROF_WALL_INTERVAL_MS=100    # default: 50ms
export DD_PROFILING_UPLOAD_PERIOD=120              # default: 60s
```

**Increase profiling detail:**
```bash
# More frequent sampling for detailed analysis
export DD_PROFILING_DDPROF_CPU_INTERVAL_MS=5
export DD_PROFILING_DDPROF_WALL_INTERVAL_MS=25
export DD_PROFILING_STACKDEPTH=1024                # default: 512
```

**Linux system optimization:**
```bash
# Allow perf events for better accuracy (requires sudo)
sudo sh -c 'echo 2 > /proc/sys/kernel/perf_event_paranoid'

# Or configure in containers with appropriate security context
```

{{% /collapse-content %}}

{{% collapse-content title="Advanced profiling options" level="h4" %}}

**Exception profiling:**
```bash
export DD_PROFILING_EXCEPTION_SAMPLE_LIMIT=10000    # default
export DD_PROFILING_EXCEPTION_RECORD_MESSAGE=true
```

**Native stack traces** (experimental):
```bash
# WARNING: Can impact stability - test in non-production first
export DD_PROFILING_DDPROF_CSTACK=dwarf
```

**Debug and development:**
```bash
export DD_PROFILING_DEBUG_DUMP_PATH=/tmp/dd-profiling
export DD_PROFILING_DDPROF_LOG_LEVEL=INFO
export DD_PROFILING_START_DELAY=5                   # default: 10s
```

{{% /collapse-content %}}



### Environment Variables Reference

**Basic Configuration:**

| Variable | Type | Description |
|----------|------|-------------|
| `DD_PROFILING_ENABLED` | Boolean | Enable profiling (default: `false`) |
| `DD_SERVICE` | String | Your service name (e.g., `web-backend`) |
| `DD_ENV` | String | Environment name (e.g., `production`) |
| `DD_VERSION` | String | Version of your service |
| `DD_TAGS` | String | Custom tags: `key1:value1,key2:value2` |

**Profiling Types:**

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `DD_PROFILING_DDPROF_CPU_ENABLED` | Boolean | `true` | CPU profiling |
| `DD_PROFILING_DDPROF_WALL_ENABLED` | Boolean | `true` | Wall-clock profiling |
| `DD_PROFILING_DDPROF_ALLOC_ENABLED` | Boolean | `false`* | Allocation profiling |
| `DD_PROFILING_DDPROF_LIVEHEAP_ENABLED` | Boolean | `false` | Live heap profiling |

*Enabled by default on supported JDK versions (21.0.3+)

**Performance Tuning:**

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `DD_PROFILING_DDPROF_CPU_INTERVAL_MS` | Integer | `10` | CPU sampling interval (ms) |
| `DD_PROFILING_DDPROF_WALL_INTERVAL_MS` | Integer | `50` | Wall-clock sampling interval (ms) |
| `DD_PROFILING_UPLOAD_PERIOD` | Integer | `60` | Upload frequency (seconds) |
| `DD_PROFILING_STACKDEPTH` | Integer | `512` | Maximum stack depth |
| `DD_PROFILING_START_DELAY` | Integer | `10` | Startup delay (seconds) |

## Next Steps

**Getting Started:**
- Follow the [Getting Started with Profiler][11] guide for a complete walkthrough
- Set up [Source Code Integration][7] to link profiles with your code
- Review [profile visualizations][16] to understand your data

**Troubleshooting:**
- If profiles don't appear, check the [Java troubleshooting guide][15]
- For performance issues, see the [configuration tuning](#performance-tuning) section
- For version compatibility, consult [supported versions][13]

**Advanced Topics:**
- [Connect traces with profiles][12] for correlated debugging
- [Profile comparison][17] for performance regression analysis

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[7]: /integrations/guide/source-code-integration/?tab=java
[8]: https://app.datadoghq.com/profiling
[10]: /getting_started/tagging/unified_service_tagging
[11]: /getting_started/profiler/
[12]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /profiler/enabling/supported_versions/
[14]: /tracing/trace_collection/compatibility/java/?tab=graalvm#setup
[15]: /profiler/profiler_troubleshooting/java/
[16]: /profiler/profile_visualizations/
[17]: /profiler/compare_profiles/
