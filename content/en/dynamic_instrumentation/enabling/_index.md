---
title: Enabling Dynamic Instrumentation
type: multi-code-lang
aliases:
    - /tracing/dynamic_instrumentation/enabling/
private: false
further_reading:
    - link: '/agent/'
      tag: 'Documentation'
      text: 'Getting Started with Datadog Agent'
---

Dynamic Instrumentation is a feature of supporting Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, ensure your tracing library is up-to-date and then enable Dynamic Instrumentation for your application.

Select your runtime below to learn how to enable Dynamic Instrumentation for your application:

{{< partial name="dynamic_instrumentation/dynamic-instrumentation-languages.html" >}}

## Supported environment variables

| Environment Variable | Default | Java | .NET | Python | Ruby | PHP | Node.js | Description
| -------------------- | ------- | ---- | ---- | ------ | ---- | --- | ------- | -----------
| `DD_DYNAMIC_INSTRUMENTATION_ENABLED` | `"false"` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Enable Dynamic Instrumentation
| `DD_DYNAMIC_INSTRUMENTATION_REDACTED_IDENTIFIERS` | `""` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Add identifiers to redact
| `DD_DYNAMIC_INSTRUMENTATION_REDACTED_TYPES` | `""` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Add types to redact
| `DD_DYNAMIC_INSTRUMENTATION_REDACTION_EXCLUDED_IDENTIFIERS` | `""` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Remove identifiers from redaction
| `DD_SERVICE` | `""` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Service name
| `DD_ENV` | `""` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Environment name
| `DD_VERSION` | `""` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Service version
| `DD_TAGS` | `""` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Tags
| `DD_GIT_REPOSITORY_URL` | `""` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Git repository URL
| `DD_GIT_COMMIT_SHA` | `""` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Git commit SHA

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
