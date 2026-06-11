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

Inject Airflow task context attributes into every log record emitted during task execution, including logs from custom Python loggers, without modifying your DAGs.

After you complete the steps on this page, the following attributes appear as structured facets in Datadog:

| Attribute | Description |
|---|---|
| `@airflow.dagRun.dag_id` | DAG identifier |
| `@airflow.dagRun.run_id` | DAG run identifier |
| `@airflow.task.task_id` | Task identifier |
| `@airflow.task.attempt_id` | Attempt number (1-indexed, incremented on retry) |

Datadog automatically flattens nested JSON into dot-notation facets. No log pipeline configuration is required.

The injection mechanism differs between Airflow versions. Choose the tab that matches your deployment.

## Set up log context injection

{{< tabs >}}
{{% tab "Airflow 2.x" %}}

Airflow 2.x calls `set_context(ti)` in the same worker process before each task runs. The implementation captures that context with a `ContextVar` and injects it into every log record through a process-wide log record factory.

### Step 1: Create `dd_airflow_log_context.py`

Create `dd_airflow_log_context.py` in a location that Airflow can import:
- **General**: Place it alongside `airflow_local_settings.py` or in any Python package installed in your Airflow image.
- **Google Cloud Composer**: Place it in the `plugins/` folder in your Composer GCS bucket.

Add the following code to the file:

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
# Used by the logging_config_class approach. Safely ignored when imported through airflow_local_settings.py.

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

### Step 2: Verify your current logging configuration

Run the following command:

```shell
airflow config get-value logging logging_config_class
```

If the command returns no output, no custom logging configuration is active. If it returns non-empty output, you already have a custom logging configuration.

**Note:** If `logging_config_class` points to a module that cannot be imported, Airflow falls back silently to the default configuration with no error. If you see no structured attributes in Datadog after setup, run the following inside the Airflow worker container to verify the module is importable: `python -c 'import dd_airflow_log_context'`

### Step 3: Configure Airflow to load the module

Choose one of the following approaches, depending on whether you have an existing custom logging configuration:

**No existing custom configuration**

Set the following in `airflow.cfg`:

```ini
[logging]
logging_config_class = dd_airflow_log_context.LOGGING_CONFIG
```

Alternatively, set it as an environment variable:

```shell
AIRFLOW__LOGGING__LOGGING_CONFIG_CLASS=dd_airflow_log_context.LOGGING_CONFIG
```

For Kubernetes deployments:
- Include `dd_airflow_log_context.py` in your Airflow Docker image, or mount it with a ConfigMap.
- Verify the mount path is on `PYTHONPATH` inside the container.

  **Note:** Kubernetes environment variable values do not expand shell references. Setting `value: /opt/airflow/dd_addons:$PYTHONPATH` passes the literal string `$PYTHONPATH`. Set the full explicit path instead.
- Apply the environment variable to worker pods. Adding it to scheduler and triggerer pods is harmless and recommended for consistency.

**Existing custom configuration**

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

Airflow 3.x runs tasks in a fully isolated subprocess ([Task Execution Interface, AIP-72][TEI]). The `set_context()` callback is invoked in the parent worker process before the subprocess spawns. As a result, the `ContextVar` is never populated inside the subprocess where task logs are produced.

The solution reads context from environment variables that Airflow exports into the task subprocess. This approach requires no handler, `ContextVar`, or `LOGGING_CONFIG` mutation.

Airflow exports the following environment variables into the task subprocess. Each maps to a Datadog attribute:

| Environment variable | Attribute |
|---|---|
| `AIRFLOW_CTX_DAG_ID` | `dagRun.dag_id` |
| `AIRFLOW_CTX_RUN_ID` | `dagRun.run_id` |
| `AIRFLOW_CTX_TASK_ID` | `task.task_id` |
| `AIRFLOW_CTX_TRY_NUMBER` | `task.attempt_id` |

### Step 1: Create `dd_airflow_log_context.py`

Create `dd_airflow_log_context.py` somewhere importable in your Airflow environment. Add the following code to the file:

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
# Required by the logging_config_class approach. No handler changes needed for Airflow 3.x.
LOGGING_CONFIG = deepcopy(DEFAULT_LOGGING_CONFIG)
```

### Step 2: Configure Airflow to load the module

To import the file inside the task subprocess before user code runs, choose one of the following options. `sitecustomize.py` is the most reliable method across deployments. Use `logging_config_class` only if your deployment honors it; if the factory is not active after the verification step, switch to `sitecustomize.py`.

**Import with `sitecustomize.py` (recommended)**

Add the following to a `sitecustomize.py` on your image's `PYTHONPATH`.

```python
import dd_airflow_log_context  # installs setLogRecordFactory
```

Python runs `sitecustomize.py` at interpreter startup, so the factory is installed in every subprocess Airflow spawns, regardless of how the task runner invokes the interpreter.

**Import with `logging_config_class`**

Set `logging_config_class` so Airflow loads your module's `LOGGING_CONFIG`, which installs the record factory:

```shell
AIRFLOW__LOGGING__LOGGING_CONFIG_CLASS=dd_airflow_log_context.LOGGING_CONFIG
```

For Kubernetes deployments:
- Include `dd_airflow_log_context.py` in your Airflow Docker image, or mount it with a ConfigMap.
- Verify the mount path is on `PYTHONPATH` inside the container.

  **Note:** Kubernetes environment variable values do not expand shell references. Setting `value: /opt/airflow/dd_addons:$PYTHONPATH` passes the literal string `$PYTHONPATH`. Set the full explicit path instead.
- Apply the environment variable to worker pods. Adding it to scheduler and triggerer pods is harmless and recommended for consistency.

**Note:** Whether Airflow 3.x's task subprocess honors `logging_config_class` depends on your deployment. Run the verification step before relying on this option. If the factory is not active, switch to `sitecustomize.py`.

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
- If `factory` is something else, the file did not load in the subprocess. Switch to `sitecustomize.py`.

[TEI]: https://cwiki.apache.org/confluence/display/AIRFLOW/AIP-72+Task+Execution+Interface+aka+Task+SDK

{{% /tab %}}
{{< /tabs >}}

## Limitations

- **Subprocess-spawning operators**: `setLogRecordFactory` affects only the current Python process. Log records from separate subprocesses or pods (such as `KubernetesPodOperator` or `BashOperator` spawning child processes) do not carry task context.
- **Airflow 3.x deferred tasks**: Deferred operators resume in the triggerer process, which does not have `AIRFLOW_CTX_*` environment variables set. Logs during the deferred phase carry no task context.
- **Long-running background threads (Airflow 2.x)**: Context is set once per task at task start. If a task spawns background threads that outlive the task, those threads may log with the next task's context.
- **Mapped tasks (Airflow 3.x)**: `AIRFLOW_CTX_MAP_INDEX` is also exported. To surface the map index in Datadog, add `"map_index": os.environ.get("AIRFLOW_CTX_MAP_INDEX")` under `task` in the record factory.

## Rollback

To disable:
- **`logging_config_class` approach**: Unset `AIRFLOW__LOGGING__LOGGING_CONFIG_CLASS` and restart the affected pods.
- **`airflow_local_settings.py` or `sitecustomize.py` approach**: Remove the `import dd_airflow_log_context` line.

The Python file itself has no effect unless imported.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
