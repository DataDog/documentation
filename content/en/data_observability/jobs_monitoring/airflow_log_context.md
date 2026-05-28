---
title: Inject Airflow Task Context into Logs
description: "Inject DAG and task context attributes into Airflow task logs as structured facets in Datadog."
further_reading:
  - link: '/data_observability/jobs_monitoring/airflow/'
    tag: 'Documentation'
    text: 'Enable Data Observability: Jobs Monitoring for Apache Airflow'
  - link: '/data_jobs'
    tag: 'Documentation'
    text: 'Data Observability: Jobs Monitoring'
---

## Overview

This page describes how to inject Airflow task context attributes into every log record emitted during task execution, including logs from custom Python loggers, without modifying your DAGs.

After setup, the following attributes appear as structured facets in Datadog:

| Attribute | Description |
|---|---|
| `@airflow.dagRun.dag_id` | DAG identifier |
| `@airflow.dagRun.run_id` | DAG run identifier |
| `@airflow.task.task_id` | Task identifier |
| `@airflow.task.attempt_id` | Attempt number (1-indexed, incremented on retry) |

Datadog automatically flattens nested JSON into dot-notation facets. No log pipeline configuration is required.

The injection mechanism differs between Airflow versions. Choose the tab that matches your deployment.

## Implementation

{{< tabs >}}
{{% tab "Airflow 2.x" %}}

Airflow 2.x calls `set_context(ti)` in the same worker process before each task runs. The implementation captures that context with a `ContextVar` and injects it into every log record through a process-wide log record factory.

### Step 1: Verify your current logging configuration

Run the following before proceeding:

```shell
airflow config get-value logging logging_config_class
```

- **Empty output**: No custom logging configuration is active. Use Option A in Step 2.
- **Non-empty output**: You already have a custom configuration. Use Option B in Step 2 to avoid replacing it.

**Note**: If `logging_config_class` points to a module that cannot be imported, Airflow falls back silently to the default configuration with no error. If you see no structured attributes in Datadog after setup, verify the module is importable from the worker environment.

### Step 2: Create `dd_airflow_log_context.py`

Place this file somewhere importable in your Airflow environment — for example, alongside `airflow_local_settings.py`, or in any Python package installed in your Airflow image. On Astronomer (Astro), add it to your Astro project root so it is baked into the Docker image. On Google Cloud Composer, place it in the `plugins/` folder in your Composer GCS bucket.

```python
from __future__ import annotations

import contextvars
import logging
from copy import deepcopy

from airflow.config_templates.airflow_local_settings import DEFAULT_LOGGING_CONFIG

# Context capture
_TASK_CTX: contextvars.ContextVar[dict | None] = contextvars.ContextVar(
    "_dd_task_ctx", default=None
)


class _DatadogContextHandler(logging.NullHandler):
    """Receives Airflow's set_context(ti) callback. Stores context; emits nothing."""

    def set_context(self, ti) -> None:
        _TASK_CTX.set({
            "dagRun": {
                "dag_id": ti.dag_id,
                "run_id": ti.run_id,
            },
            "task": {
                "task_id":    ti.task_id,
                "attempt_id": ti.try_number,
            },
        })


# Record factory
_old_factory = logging.getLogRecordFactory()


def _dd_record_factory(*args, **kwargs):
    record = _old_factory(*args, **kwargs)
    ctx = _TASK_CTX.get()
    if ctx:
        record.__dict__["airflow"] = ctx
    return record


logging.setLogRecordFactory(_dd_record_factory)


# LOGGING_CONFIG
# Used by Option A (logging_config_class). Safely ignored when imported through Option B.

LOGGING_CONFIG = deepcopy(DEFAULT_LOGGING_CONFIG)

LOGGING_CONFIG["handlers"]["dd_context"] = {
    "class": "dd_airflow_log_context._DatadogContextHandler",
    "level": "DEBUG",
}

_task_logger = LOGGING_CONFIG.setdefault("loggers", {}).setdefault(
    "airflow.task", {"handlers": ["task"], "propagate": False}
)
_task_logger.setdefault("handlers", []).append("dd_context")
```

### Step 3: Configure Airflow to load the module

**Option A** — `airflow.cfg` or environment variable (preferred when no existing custom configuration exists)

Set the following in `airflow.cfg`:

```ini
[logging]
logging_config_class = dd_airflow_log_context.LOGGING_CONFIG
```

Or as an environment variable:

```shell
AIRFLOW__LOGGING__LOGGING_CONFIG_CLASS=dd_airflow_log_context.LOGGING_CONFIG
```

For Kubernetes deployments:
- Bake `dd_airflow_log_context.py` into your Airflow Docker image, or mount it with a ConfigMap.
- The mount path must be on `PYTHONPATH` inside the container.

  **Note**: Kubernetes environment variable values do not expand shell references. Setting `value: /opt/airflow/dd_addons:$PYTHONPATH` passes the literal string `$PYTHONPATH`. Set the full explicit path instead.
- Apply the environment variable to worker pods. Adding it to scheduler and triggerer pods is harmless and recommended for consistency.

**Option B** — existing `airflow_local_settings.py` (use when you already have a custom `LOGGING_CONFIG`)

Append the following to the bottom of your existing `airflow_local_settings.py`:

```python
import dd_airflow_log_context  # installs setLogRecordFactory and exposes handler class

LOGGING_CONFIG["handlers"]["dd_context"] = {
    "class": "dd_airflow_log_context._DatadogContextHandler",
    "level": "DEBUG",
}
_task_logger = LOGGING_CONFIG.setdefault("loggers", {}).setdefault(
    "airflow.task", {"handlers": ["task"], "propagate": False}
)
_task_logger.setdefault("handlers", []).append("dd_context")
```

### Step 4: Verify

Add the following to a `PythonOperator` in a test DAG:

```python
import logging
logging.getLogger("dd_probe").info("dd-context-probe")
```

Then query in Datadog:

```
@airflow.dagRun.dag_id:* "dd-context-probe"
```

- If the log line appears with `@airflow.dagRun.dag_id` and `@airflow.task.task_id` facets, the integration is working.
- If the log line appears without those facets, the file loaded but `set_context` was not called. Confirm the handler is in the `airflow.task` logger chain.
- If the log line does not appear at all, the file did not load. Check `PYTHONPATH` and `logging_config_class`.

{{% /tab %}}
{{% tab "Airflow 3.x" %}}

Airflow 3.x runs tasks in a fully isolated subprocess (Task Execution Interface, AIP-72). The `set_context()` callback is invoked in the parent worker process before the subprocess spawns — the `ContextVar` is never populated inside the subprocess where task logs are produced.

The solution reads context from environment variables that Airflow exports into the task subprocess. No handler, no `ContextVar`, and no `LOGGING_CONFIG` mutation are required.

| Environment variable | Attribute |
|---|---|
| `AIRFLOW_CTX_DAG_ID` | `dagRun.dag_id` |
| `AIRFLOW_CTX_RUN_ID` | `dagRun.run_id` |
| `AIRFLOW_CTX_TASK_ID` | `task.task_id` |
| `AIRFLOW_CTX_TRY_NUMBER` | `task.attempt_id` |

### Step 1: Create `dd_airflow_log_context.py`

Place this file somewhere importable in your Airflow environment. On Astronomer (Astro), add it to your Astro project root so it is baked into the Docker image.

```python
from __future__ import annotations

import logging
import os
from copy import deepcopy

from airflow.config_templates.airflow_local_settings import DEFAULT_LOGGING_CONFIG

# Record factory
_old_factory = logging.getLogRecordFactory()


def _dd_record_factory(*args, **kwargs):
    record = _old_factory(*args, **kwargs)
    dag_id = os.environ.get("AIRFLOW_CTX_DAG_ID")
    if dag_id:
        try:
            attempt = int(os.environ.get("AIRFLOW_CTX_TRY_NUMBER", "1"))
        except ValueError:
            attempt = 1
        record.__dict__["airflow"] = {
            "dagRun": {
                "dag_id": dag_id,
                "run_id": os.environ.get("AIRFLOW_CTX_RUN_ID"),
            },
            "task": {
                "task_id":    os.environ.get("AIRFLOW_CTX_TASK_ID"),
                "attempt_id": attempt,
            },
        }
    return record


logging.setLogRecordFactory(_dd_record_factory)


# LOGGING_CONFIG
# Required by Option A wiring. No handler changes needed for Airflow 3.x.
LOGGING_CONFIG = deepcopy(DEFAULT_LOGGING_CONFIG)
```

### Step 2: Configure Airflow to load the module

The file must be imported inside the task subprocess before user code runs.

**Option A** — `logging_config_class`

```shell
AIRFLOW__LOGGING__LOGGING_CONFIG_CLASS=dd_airflow_log_context.LOGGING_CONFIG
```

Apply to worker pods. The same `PYTHONPATH` and Kubernetes notes from the Airflow 2.x section apply.

**Note**: Whether Airflow 3.x's task subprocess honors `logging_config_class` depends on your deployment. Run the verification step before relying on this option. If the factory is not active, use Option B.

**Option B** — `sitecustomize.py` (most reliable)

Add the following to a `sitecustomize.py` on your image's `PYTHONPATH`:

```python
import dd_airflow_log_context  # installs setLogRecordFactory
```

Python runs `sitecustomize.py` at interpreter startup, so the factory is installed in every subprocess Airflow spawns, regardless of how the task runner invokes the interpreter. On Astronomer (Astro), add both `dd_airflow_log_context.py` and `sitecustomize.py` to your Astro project root.

### Step 3: Verify

Add the following to a test task:

```python
import logging, os
logging.getLogger("dd_probe").warning(
    "af3-probe dag_id=%s factory=%s",
    os.environ.get("AIRFLOW_CTX_DAG_ID", "MISSING"),
    logging.getLogRecordFactory().__name__,
)
```

- If `factory=_dd_record_factory` and the log appears in Datadog with `@airflow.dagRun.dag_id` and `@airflow.task.task_id` facets, the integration is complete.
- If `factory=_dd_record_factory` but no facets appear, the factory loaded but the environment variables were not set. Confirm the log was emitted from inside the task subprocess, not from the scheduler or triggerer.
- If `factory` is something else, the file did not load in the subprocess. Switch to Option B (`sitecustomize.py`).

{{% /tab %}}
{{< /tabs >}}

## Limitations

- **Subprocess-spawning operators**: `setLogRecordFactory` affects only the current Python process. Log records from separate subprocesses or pods (such as `KubernetesPodOperator` or `BashOperator` spawning child processes) do not carry task context.
- **Airflow 3.x deferred tasks**: Deferred operators resume in the triggerer process, which does not have `AIRFLOW_CTX_*` environment variables set. Logs during the deferred phase carry no task context.
- **Long-running background threads (Airflow 2.x)**: Context is set once per task at task start. If a task spawns background threads that outlive the task, those threads may log with the next task's context.
- **Mapped tasks (Airflow 3.x)**: `AIRFLOW_CTX_MAP_INDEX` is also exported. To surface the map index in Datadog, add `"map_index": os.environ.get("AIRFLOW_CTX_MAP_INDEX")` under `task` in the record factory.

## Rollback

To disable:
- **Option A**: Unset `AIRFLOW__LOGGING__LOGGING_CONFIG_CLASS` and restart the affected pods.
- **Option B / Airflow 3.x `sitecustomize.py`**: Remove the `import dd_airflow_log_context` line.

The Python file itself has no effect unless imported.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
