---
title: Enable Data Jobs Monitoring for dbt
further_reading:
    - link: '/data_jobs'
      tag: 'Documentation'
      text: 'Data Jobs Monitoring'
---

[Data Jobs Monitoring][1] gives visibility into the performance and reliability of dbt pipelines.

## Requirements

This guide is for [dbt-core][2] pipelines.

1. [dbt v1.8][3] or later.
2. [dbt-ol v1.26.0 ][4] or later.

## Setup

Follow these  steps to enable dbt traces:

1. Install `openlineage` provider by adding the following into your `requirements.txt`.
    ```text
    openlineage-dbt>=1.26.0
    ```
2. Configure `openlineage` provider. The simplest option is to set the following environment variables:
    ```shell
    export OPENLINEAGE_URL=<DD_DATA_OBSERVABILITY_INTAKE>
    export OPENLINEAGE_API_KEY=<DD_API_KEY>
    export OPENLINEAGE_NAMESPACE=<NAMESPACE>
    ```

  * Replace `DD_DATA_OBSERVABILITY_INTAKE` with `https://data-obs-intake.`{{< region-param key="dd_site" code="true" >}}.
  * Replace `DD_API_KEY` with your valid [Datadog API key][5].
  * Replace `NAMESPACE` if you want to use something other than the `default` namespace for job namespace.

**Optional**

1. Setup `OPENLINEAGE_DBT_LOGGING` environment variable, you can establish the logging level for the `openlineage.dbt` and its child modules.

Check official documentation ([python client][6] and [dbt integration][7]) for other supported configurations of OpenLineage.

## Validation

In your setup you can run the following `dbt-ol` command to see traces in Datadog.
Say you are using the [jaffle-shop][8] project.

```shell
dbt-ol run --select orders
```

The above will consume dbt [artifacts][9] and send OpenLineage events **after** the job finishes.
If you want to receive events in realtime you can use the `--consume-structured-logs` of `dbt-ol`.
```shell
dbt-ol --consume-structured-logs run --select orders
```

In Datadog, you can see the traces by using the following APM query:
```text
operation_name:*dbt*
```

## Troubleshooting

Check that the OpenLineage environment variables are correctly set.
When running `dbt-ol` commands you should see log lines like:
```text
...
Running OpenLineage dbt wrapper version X.XX.X
This wrapper will send OpenLineage events ...
...
Emitted XX OpenLineage events
```

## Further Readings

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_jobs
[2]: https://docs.getdbt.com/docs/core/installation-overview
[3]: https://docs.getdbt.com/docs/dbt-versions/core#latest-releases
[4]: https://github.com/OpenLineage/OpenLineage/releases
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://openlineage.io/docs/1.21.1/client/python#configuration
[7]: https://openlineage.io/docs/1.21.1/integrations/dbt
[8]: https://github.com/dbt-labs/jaffle-shop-classic
[9]: https://docs.getdbt.com/reference/global-configs/json-artifacts
