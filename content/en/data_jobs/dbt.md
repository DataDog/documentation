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

Follow these steps to enable dbt traces:

1. Install the `openlineage` provider by adding the following into your `requirements.txt`.
    ```text
    openlineage-dbt>=1.26.0
    ```
2. Configure the `openlineage` provider. The simplest option is to set the following environment variables:
    ```shell
    export OPENLINEAGE_URL=<DD_DATA_OBSERVABILITY_INTAKE>
    export OPENLINEAGE_API_KEY=<DD_API_KEY>
    export OPENLINEAGE_NAMESPACE=<NAMESPACE>
    ```

  * Replace `DD_DATA_OBSERVABILITY_INTAKE` with `https://data-obs-intake.`{{< region-param key="dd_site" code="true" >}}.
  * Replace `DD_API_KEY` with your valid [Datadog API key][5].
  * Replace `NAMESPACE` if you want to use something other than the `default` namespace for job namespace.

Check official documentation ([python client][6] and [dbt integration][7]) for other supported configurations of OpenLineage.

In your setup, use `dbt-ol` instead of `dbt`. It's a light wrapper that supports all the subcommands `dbt` does.
Use the `--consume-structured-logs` option to get OpenLineage events in real time.

```shell
dbt-ol --consume-structured-logs run --select <your_model_name>
```

## Validation

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

Set up the `OPENLINEAGE_DBT_LOGGING` environment variable. This will establish the logging level for the `openlineage.dbt` and its child modules.
```bash
export OPENLINEAGE_DBT_LOGGING="DEBUG"
```

## Further Reading

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
