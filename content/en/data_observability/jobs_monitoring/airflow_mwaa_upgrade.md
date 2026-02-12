---
title: "Upgrade OpenLineage provider on Amazon MWAA for Airflow 2.7.2, 2.8.1, and 2.9.2"
description: "Resolve dependency conflicts when installing apache-airflow-providers-openlineage on Amazon MWAA Airflow 2.7.2, 2.8.1, or 2.9.2."
further_reading:
  - link: '/data_observability/jobs_monitoring/airflow/?tab=amazonmwaa'
    tag: 'Documentation'
    text: 'Enable Data Observability: Jobs Monitoring for Apache Airflow'
---

## Overview

Use this guide if your Amazon MWAA environment runs Airflow `2.7.2`, `2.8.1`, or `2.9.2` and installing `apache-airflow-providers-openlineage` from `requirements.txt` fails with dependency resolution errors.

Amazon MWAA enforces package constraints for each Airflow and Python version. When you upgrade OpenLineage packages, the new dependency requirements can conflict with MWAA defaults. Resolve this by using a custom constraints file and referencing it from `requirements.txt`.

For details about MWAA dependency and constraints behavior, see AWS documentation on [Python dependencies][3]. To review provider compatibility and requirements, see [OpenLineage provider documentation][4].

For base setup steps, see [Enable Data Observability: Jobs Monitoring for Apache Airflow][1].

## Requirements

- Access to the Amazon S3 bucket configured for your MWAA environment
- Permission to update `requirements.txt` and MWAA environment configuration
- Target versions for `apache-airflow-providers-openlineage` and related OpenLineage packages

## Update package constraints

1. Set the Airflow and Python versions that match your MWAA environment:

   ```shell
   AIRFLOW_VERSION=2.9.2
   PYTHON_VERSION=3.11
   ```

   Keep `AIRFLOW_VERSION` at one of `2.7.2`, `2.8.1`, or `2.9.2` for this guide. Check the required Python version for your MWAA environment in AWS before you continue.

2. Download the matching Airflow constraints file:

   ```shell
   curl -o constraints.txt \
     "https://raw.githubusercontent.com/apache/airflow/constraints-${AIRFLOW_VERSION}/constraints-${PYTHON_VERSION}.txt"
   ```

3. Edit `constraints.txt` and update the OpenLineage-related package pins to your target versions:
   - `apache-airflow-providers-openlineage`
   - `apache-airflow-providers-common-sql`
   - `openlineage-python`
   - `openlineage-integration-common`
   - `openlineage-sql`

   If you upgrade to `apache-airflow-providers-openlineage` `2.x`, also add `apache-airflow-providers-common-compat` if it is missing from the file.

4. Upload the updated constraints file to your MWAA S3 bucket:

   ```shell
   MWAA_BUCKET=<MWAA_BUCKET_NAME>
   aws s3 cp constraints.txt "s3://${MWAA_BUCKET}/dags/constraints.txt"
   ```

## Update requirements.txt

1. Reference the uploaded constraints file at the top of `requirements.txt`:

   ```text
   --constraint /usr/local/airflow/dags/constraints.txt
   ```

2. Pin the same upgraded package versions in `requirements.txt`.
3. Upload the updated `requirements.txt` file:

   ```shell
   aws s3 cp requirements.txt "s3://${MWAA_BUCKET}/requirements.txt"
   ```

## Deploy and validate

1. In the MWAA console, update the environment so it picks up the new `requirements.txt`.
2. Wait for the environment update to complete.
3. Review MWAA install and startup logs. Confirm there are no dependency resolver errors.
4. Trigger a DAG run that emits OpenLineage events.
5. In Datadog, verify that runs appear on the [Data Observability: Jobs Monitoring][2] page.

## Troubleshooting

- If dependency resolution still fails, ensure the same package versions are pinned in both `constraints.txt` and `requirements.txt`.
- If MWAA installs older versions, verify that `requirements.txt` points to `--constraint /usr/local/airflow/dags/constraints.txt` and that the file exists in your S3 `dags/` path.
- If uploads or reads fail, verify that the MWAA execution role has access to the required S3 objects. For details, see [Amazon MWAA execution role][5].

## If you manage a custom image

If your team manages package versions through a custom Airflow image, update package versions in the image definition first, then regenerate `requirements.txt` from the built image so constraints and requirements stay aligned.

[1]: /data_observability/jobs_monitoring/airflow/?tab=amazonmwaa
[2]: https://app.datadoghq.com/data-jobs/
[3]: https://docs.aws.amazon.com/mwaa/latest/userguide/connections-packages.html
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[5]: https://docs.aws.amazon.com/mwaa/latest/userguide/mwaa-create-role.html
