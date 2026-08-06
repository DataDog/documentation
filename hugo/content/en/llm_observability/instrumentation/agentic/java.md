---
title: Java Application Agentic Instrumentation
---

## Instrumentation

1. Download the latest `dd-java-agent` JAR from the [Datadog Java agent releases](https://github.com/DataDog/dd-trace-java/releases).

2. Attach the Datadog Java agent at startup by passing it as a JVM argument. This must be set before the application starts.

```bash
java -javaagent:/path/to/dd-java-agent.jar -jar your-application.jar
```

If the application uses a startup script or `Dockerfile`, add the flag to `JAVA_TOOL_OPTIONS`:

```bash
JAVA_TOOL_OPTIONS="-javaagent:/path/to/dd-java-agent.jar"
```

The agent automatically instruments supported LLM providers and frameworks on startup. No additional code changes are required.
