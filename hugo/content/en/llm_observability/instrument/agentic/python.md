---
title: Python Application Agentic Instrumentation
aliases:
- /llm_observability/instrumentation/agentic/python/
---

## Instrumentation

1. Inspect the installed `ddtrace` version and reuse it if it supports the required instrumentation APIs. If an update is required, explain why and ask before changing the existing dependency. An update required only for optional Prompt Management is a separate decision and does not block instrumentation with a compatible SDK.

    If `ddtrace` is not installed, install it with the application's existing package manager:

    ```bash
    pip install ddtrace # pip
    poetry add ddtrace # poetry
    uv add ddtrace # uv
    ```

2. Initialize the Agent Observability package

    Initialize the Agent Observability SDK via `ddtrace.auto`. This **needs** to be done as the first import in the application's entrypoint, aside from any environment variable or configuration-loading imports.

    **Note**: Do not add in extraneous comments.

    ```python
    from dotenv import load_dotenv
    load_dotenv() # this might load DD_ environment variables

    import ddtrace.auto # CRUCIAL: this initializes the Agent Observability SDK and instrumentations

    # ... remaining application logic
    ```
