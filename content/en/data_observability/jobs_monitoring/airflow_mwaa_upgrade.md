---
title: "Upgrade OpenLineage Provider on Amazon MWAA for Airflow 2.7.2, 2.8.1, and 2.9.2"
description: "Resolve dependency conflicts when installing apache-airflow-providers-openlineage on Amazon MWAA Airflow 2.7.2, 2.8.1, or 2.9.2."
further_reading:
  - link: '/data_observability/jobs_monitoring/airflow/?tab=amazonmwaa'
    tag: 'Documentation'
    text: 'Enable Data Observability: Jobs Monitoring for Apache Airflow'
---

## Overview

Use this guide if your Amazon MWAA environment runs Airflow `2.7.2`, `2.8.1`, or `2.9.2`.

For these Airflow versions, MWAA default constraints pin older `apache-airflow-providers-openlineage` and OpenLineage package versions. These versions can cause known reliability and compatibility issues, which can degrade the Data Observability experience.

To use provider versions that include these fixes, update constraints and requirements together. Amazon MWAA enforces package constraints for each Airflow and Python version, so upgrading OpenLineage packages can conflict with MWAA defaults unless you provide custom constraints.

For details about MWAA dependency and constraints behavior, see AWS documentation on [Python dependencies][3]. To review provider compatibility and requirements, see [OpenLineage provider documentation][4].

For base setup steps, see [Enable Data Observability: Jobs Monitoring for Apache Airflow][1].

## Requirements

- Access to the Amazon S3 bucket configured for your MWAA environment
- Permission to update `requirements.txt` and MWAA environment configuration

## Recommended versions

The following table shows the default versions pinned by MWAA constraints and the recommended upgrade versions for each Airflow version:

| Package | Airflow 2.7.2 (default / upgrade) | Airflow 2.8.1 (default / upgrade) | Airflow 2.9.2 (default / upgrade) |
|---|---|---|---|
| `apache-airflow-providers-openlineage` | 1.1.0 / **1.14.0** [Datadog-patched wheel][6] | 1.4.0 / **1.14.0** | 1.8.0 / **2.2.0** |
| `apache-airflow-providers-common-sql` | 1.7.2 / no change | 1.10.0 / **1.20.0** | 1.14.0 / **1.21.0** |
| `apache-airflow-providers-common-compat` | n/a / **1.2.2** [Datadog-patched wheel][7] | n/a / **1.2.1** | n/a / **1.4.0** |
| `openlineage-integration-common` | 1.3.1 / **1.24.2** | 1.7.0 / **1.24.2** | 1.16.0 / **1.31.0** |
| `openlineage-python` | 1.3.1 / **1.24.2** | 1.7.0 / **1.24.2** | 1.16.0 / **1.31.0** |
| `openlineage-sql` | 1.3.1 / **1.24.2** | 1.7.0 / **1.24.2** | 1.16.0 / **1.31.0** |

## Update constraints and requirements

{{< tabs >}}
{{% tab "Airflow 2.7.2" %}}

Airflow 2.7.2 is not compatible with the upstream `apache-airflow-providers-openlineage` 1.14.0 package. Datadog provides patched versions of the provider and `common-compat` packages with relaxed Airflow version constraints for use on MWAA 2.7.2.

1. Download the patched wheel files and upload them to your MWAA S3 bucket:

   ```shell
   MWAA_BUCKET=<MWAA_BUCKET_NAME>
   curl -Lo apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl \
     "https://docs.datadoghq.com/resources/whl/apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl"
   curl -Lo apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl \
     "https://docs.datadoghq.com/resources/whl/apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl"
   aws s3 cp apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl "s3://${MWAA_BUCKET}/dags/"
   aws s3 cp apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl "s3://${MWAA_BUCKET}/dags/"
   ```

2. Download the Airflow constraints file:

   ```shell
   curl -o constraints.txt \
     "https://raw.githubusercontent.com/apache/airflow/constraints-2.7.2/constraints-3.11.txt"
   ```

   **Note**: Check the Python version for your MWAA environment. If your environment uses a different Python version, replace `3.11` in the URL.

3. Edit `constraints.txt` and update these package pins:

   ```text
   apache-airflow-providers-openlineage==1.14.0
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

   Also add the following line, since it is not present in the default constraints file:

   ```text
   apache-airflow-providers-common-compat==1.2.2
   ```

   No change is needed for `apache-airflow-providers-common-sql` (the default `1.7.2` is compatible).

4. Upload the updated constraints file to your MWAA S3 bucket:

   ```shell
   aws s3 cp constraints.txt "s3://${MWAA_BUCKET}/dags/constraints.txt"
   ```

5. Update `requirements.txt` to reference the patched wheels and constraints:

   ```text
   --constraint /usr/local/airflow/dags/constraints.txt
   /usr/local/airflow/dags/apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl
   /usr/local/airflow/dags/apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

6. Upload the updated `requirements.txt` file:

   ```shell
   aws s3 cp requirements.txt "s3://${MWAA_BUCKET}/requirements.txt"
   ```

{{% /tab %}}
{{% tab "Airflow 2.8.1" %}}

1. Download the Airflow constraints file:

   ```shell
   curl -o constraints.txt \
     "https://raw.githubusercontent.com/apache/airflow/constraints-2.8.1/constraints-3.11.txt"
   ```

   **Note**: Check the Python version for your MWAA environment. If your environment uses a different Python version, replace `3.11` in the URL.

2. Edit `constraints.txt` and update these package pins:

   ```text
   apache-airflow-providers-openlineage==1.14.0
   apache-airflow-providers-common-sql==1.20.0
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

   Also add the following line, since it is not present in the default constraints file:

   ```text
   apache-airflow-providers-common-compat==1.2.1
   ```

3. Upload the updated constraints file to your MWAA S3 bucket:

   ```shell
   MWAA_BUCKET=<MWAA_BUCKET_NAME>
   aws s3 cp constraints.txt "s3://${MWAA_BUCKET}/dags/constraints.txt"
   ```

4. Update `requirements.txt` to reference the constraints file and pin the upgraded package versions:

   ```text
   --constraint /usr/local/airflow/dags/constraints.txt
   apache-airflow-providers-openlineage==1.14.0
   apache-airflow-providers-common-sql==1.20.0
   apache-airflow-providers-common-compat==1.2.1
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

5. Upload the updated `requirements.txt` file:

   ```shell
   aws s3 cp requirements.txt "s3://${MWAA_BUCKET}/requirements.txt"
   ```

{{% /tab %}}
{{% tab "Airflow 2.9.2" %}}

1. Download the Airflow constraints file:

   ```shell
   curl -o constraints.txt \
     "https://raw.githubusercontent.com/apache/airflow/constraints-2.9.2/constraints-3.12.txt"
   ```

   **Note**: Check the Python version for your MWAA environment. If your environment uses a different Python version, replace `3.12` in the URL.

2. Edit `constraints.txt` and update these package pins:

   ```text
   apache-airflow-providers-openlineage==2.2.0
   apache-airflow-providers-common-sql==1.21.0
   openlineage-integration-common==1.31.0
   openlineage-python==1.31.0
   openlineage-sql==1.31.0
   ```

   Also add the following line, since it is not present in the default constraints file:

   ```text
   apache-airflow-providers-common-compat==1.4.0
   ```

3. Upload the updated constraints file to your MWAA S3 bucket:

   ```shell
   MWAA_BUCKET=<MWAA_BUCKET_NAME>
   aws s3 cp constraints.txt "s3://${MWAA_BUCKET}/dags/constraints.txt"
   ```

4. Update `requirements.txt` to reference the constraints file and pin the upgraded package versions:

   ```text
   --constraint /usr/local/airflow/dags/constraints.txt
   apache-airflow-providers-openlineage==2.2.0
   apache-airflow-providers-common-sql==1.21.0
   apache-airflow-providers-common-compat==1.4.0
   openlineage-integration-common==1.31.0
   openlineage-python==1.31.0
   openlineage-sql==1.31.0
   ```

5. Upload the updated `requirements.txt` file:

   ```shell
   aws s3 cp requirements.txt "s3://${MWAA_BUCKET}/requirements.txt"
   ```

{{% /tab %}}
{{< /tabs >}}

## Deploy and validate

1. In the MWAA console, update the environment so it picks up the new `requirements.txt`.
2. Wait for the environment update to complete.
3. Review MWAA install and startup logs. Confirm there are no dependency resolver errors.
4. Trigger a DAG run that emits OpenLineage events.
5. In Datadog, verify that runs appear on the [Data Observability: Jobs Monitoring][2] page.

## Troubleshooting

- If dependency resolution still fails, verify that the same package versions are pinned in both `constraints.txt` and `requirements.txt`.
- If MWAA installs older versions, verify that `requirements.txt` points to `--constraint /usr/local/airflow/dags/constraints.txt` and that the file exists in your S3 `dags/` path.
- If uploads or reads fail, verify that the MWAA execution role has access to the required S3 objects. For details, see [Amazon MWAA execution role][5].

## If you manage a custom image

If your team manages package versions through a custom Airflow image, update package versions in the image definition first, then regenerate `requirements.txt` from the built image so constraints and requirements stay aligned.

[1]: /data_observability/jobs_monitoring/airflow/?tab=amazonmwaa
[2]: https://app.datadoghq.com/data-jobs/
[3]: https://docs.aws.amazon.com/mwaa/latest/userguide/connections-packages.html
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[5]: https://docs.aws.amazon.com/mwaa/latest/userguide/mwaa-create-role.html
[6]: /resources/whl/apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl
[7]: /resources/whl/apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl
