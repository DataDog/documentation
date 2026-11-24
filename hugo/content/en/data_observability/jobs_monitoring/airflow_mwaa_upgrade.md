---
title: "Upgrade OpenLineage Provider on Amazon MWAA for Airflow 2.7.2, 2.8.1, or 2.9.2"
description: "Resolve dependency conflicts when installing apache-airflow-providers-openlineage on Amazon MWAA Airflow 2.7.2, 2.8.1, or 2.9.2."
further_reading:
  - link: '/data_observability/jobs_monitoring/airflow/?tab=amazonmwaa'
    tag: 'Documentation'
    text: 'Enable Data Observability: Jobs Monitoring for Apache Airflow'
---

## Overview

Use this guide if your Amazon MWAA environment runs Airflow `2.7.2`, `2.8.1`, or `2.9.2`.

For these Airflow versions, the Apache Airflow constraints files pin older `apache-airflow-providers-openlineage` and OpenLineage package versions. These versions can cause known reliability and compatibility issues, which can degrade the Data Observability experience.

To use provider versions that include these fixes, pin the upgraded versions in a constraints file and in `requirements.txt`. Which constraints file you edit depends on your current `requirements.txt`:

- **If `requirements.txt` has no `--constraint` line**, create a `constraints.txt` file that contains only the OpenLineage pins. Your other packages resolve the same way they did before. MWAA pins `apache-airflow` to your environment's version during the install, so Airflow itself is not upgraded.
- **If `requirements.txt` already has a `--constraint` line**, update the OpenLineage pins in that constraints file.

<div class="alert alert-warning">Don't download the full Apache Airflow constraints file to use as a new constraints file. Its pins often conflict with your other packages, such as a newer <code>boto3</code>. For Airflow 2.8.1 and 2.9.2, its <code>sqlparse</code> pin also conflicts with the upgraded <code>apache-airflow-providers-common-sql</code>. When pip can't resolve the requirements, MWAA installs none of the packages in <code>requirements.txt</code>, and the environment update still reports success.</div>

For details about MWAA dependency and constraints behavior, see AWS documentation on [Python dependencies][3]. To review provider compatibility and requirements, see [OpenLineage provider documentation][4].

For base setup steps, see [Enable Data Observability: Jobs Monitoring for Apache Airflow][1].

## For other MWAA versions

If your MWAA environment runs an Airflow version that is not listed in this guide, Datadog recommends using the newest `apache-airflow-providers-openlineage` release that is compatible with your Airflow version. Use the [Airflow OpenLineage provider compatibility table][8] to choose that release, then follow the same constraints pattern:

1. Add the OpenLineage provider pin and any required OpenLineage dependency pins to a constraints file: either a new `constraints.txt` that contains only those pins, or the constraints file your `requirements.txt` already references.
2. Pin the same versions in `requirements.txt`, and make sure its first line references the constraints file.
3. Upload both files to your MWAA S3 bucket and update the MWAA environment.

Datadog recommends using the newest compatible provider release available for your Airflow version. Review the [OpenLineage provider changelog][9] before updating, because provider releases can change the minimum supported Airflow version or required dependency versions.

## Requirements

- Access to the Amazon S3 bucket configured for your MWAA environment
- Permission to update `requirements.txt` and MWAA environment configuration

## Recommended versions

The following table shows the default versions pinned by the Apache Airflow constraints files and the recommended upgrade versions for each Airflow version:

| Package | Airflow 2.7.2 | Airflow 2.8.1 | Airflow 2.9.2 |
|---|---|---|---|
| `apache-airflow-providers-openlineage` | Default: 1.1.0 <br/> Upgrade: **1.14.0** - [Datadog-patched wheel][6] | Default: 1.4.0 <br/> Upgrade: **1.14.0** | Default: 1.8.0  <br/> Upgrade:**2.2.0** |
| `apache-airflow-providers-common-sql` | Default: 1.7.2 <br/> Upgrade: no change | Default: 1.10.0 <br/> Upgrade: **1.20.0** | Default: 1.14.0 <br/> Upgrade: **1.21.0** |
| `apache-airflow-providers-common-compat` | Default: n/a <br/> Upgrade: **1.2.2** - [Datadog-patched wheel][7] | Default: n/a <br/> Upgrade: **1.2.1** | Default: n/a <br/> Upgrade: **1.4.0** |
| `openlineage-integration-common` | Default: 1.3.1 <br/> Upgrade: **1.24.2** | Default: 1.7.0 <br/> Upgrade: **1.24.2** | Default: 1.16.0 <br/> Upgrade: **1.31.0** |
| `openlineage-python` | Default: 1.3.1 <br/> Upgrade: **1.24.2** | Default: 1.7.0 <br/> Upgrade: **1.24.2** | Default: 1.16.0 <br/> Upgrade: **1.31.0** |
| `openlineage-sql` | Default: 1.3.1 <br/> Upgrade: **1.24.2** | Default: 1.7.0 <br/> Upgrade: **1.24.2** | Default: 1.16.0 <br/> Upgrade: **1.31.0** |

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

2. Create or update the constraints file.

   **If `requirements.txt` has no `--constraint` line**, create a `constraints.txt` file that contains only these lines:

   ```text
   apache-airflow-providers-openlineage==1.14.0
   apache-airflow-providers-common-compat==1.2.2
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

   **If `requirements.txt` already has a `--constraint` line**, edit the constraints file it references. If the line references a URL, download that file and edit the local copy.
   - Set the pins shown above, replacing the existing pins for those packages. Add `apache-airflow-providers-common-compat==1.2.2` if the file doesn't pin it. The Apache Airflow constraints file doesn't include it.
   - The Apache Airflow constraints files list `openlineage-sql` as `openlineage_sql`. Replace that line instead of adding a second pin for the package, because duplicate pins cause the install to fail.
   - No change is needed for `apache-airflow-providers-common-sql` (the default `1.7.2` is compatible).

3. Upload the constraints file to your MWAA S3 bucket:

   ```shell
   aws s3 cp constraints.txt "s3://${MWAA_BUCKET}/dags/constraints.txt"
   ```

4. Update `requirements.txt` to reference the patched wheels and constraints. Make the `--constraint` line the first line, replacing any existing `--constraint` line. Replace any existing lines for the packages in the following block with these lines, including version pins for `apache-airflow-providers-openlineage` and `apache-airflow-providers-common-compat`, which the wheel paths replace. Keep your other packages.

   ```text
   --constraint /usr/local/airflow/dags/constraints.txt
   /usr/local/airflow/dags/apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl
   /usr/local/airflow/dags/apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

5. Upload the updated `requirements.txt` file:

   ```shell
   aws s3 cp requirements.txt "s3://${MWAA_BUCKET}/requirements.txt"
   ```

{{% /tab %}}
{{% tab "Airflow 2.8.1" %}}

1. Create or update the constraints file.

   **If `requirements.txt` has no `--constraint` line**, create a `constraints.txt` file that contains only these lines:

   ```text
   apache-airflow-providers-openlineage==1.14.0
   apache-airflow-providers-common-sql==1.20.0
   apache-airflow-providers-common-compat==1.2.1
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

   **If `requirements.txt` already has a `--constraint` line**, edit the constraints file it references. If the line references a URL, download that file and edit the local copy.
   - Set the pins shown above, replacing the existing pins for those packages. Add `apache-airflow-providers-common-compat==1.2.1` if the file doesn't pin it. The Apache Airflow constraints file doesn't include it.
   - The Apache Airflow constraints files list `openlineage-sql` as `openlineage_sql`. Replace that line instead of adding a second pin for the package, because duplicate pins cause the install to fail.
   - Set `sqlparse==0.5.1`. `apache-airflow-providers-common-sql` 1.20.0 requires `sqlparse` 0.5.1 or later, and the Apache Airflow constraints file pins `sqlparse==0.4.4`.

2. Upload the constraints file to your MWAA S3 bucket:

   ```shell
   MWAA_BUCKET=<MWAA_BUCKET_NAME>
   aws s3 cp constraints.txt "s3://${MWAA_BUCKET}/dags/constraints.txt"
   ```

3. Update `requirements.txt` to reference the constraints file and pin the upgraded package versions. Make the `--constraint` line the first line, replacing any existing `--constraint` line. Replace any existing lines for the packages in the following block with these lines, and keep your other packages.

   ```text
   --constraint /usr/local/airflow/dags/constraints.txt
   apache-airflow-providers-openlineage==1.14.0
   apache-airflow-providers-common-sql==1.20.0
   apache-airflow-providers-common-compat==1.2.1
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

4. Upload the updated `requirements.txt` file:

   ```shell
   aws s3 cp requirements.txt "s3://${MWAA_BUCKET}/requirements.txt"
   ```

{{% /tab %}}
{{% tab "Airflow 2.9.2" %}}

1. Create or update the constraints file.

   **If `requirements.txt` has no `--constraint` line**, create a `constraints.txt` file that contains only these lines:

   ```text
   apache-airflow-providers-openlineage==2.2.0
   apache-airflow-providers-common-sql==1.21.0
   apache-airflow-providers-common-compat==1.4.0
   openlineage-integration-common==1.31.0
   openlineage-python==1.31.0
   openlineage-sql==1.31.0
   ```

   **If `requirements.txt` already has a `--constraint` line**, edit the constraints file it references. If the line references a URL, download that file and edit the local copy.
   - Set the pins shown above, replacing the existing pins for those packages. Add `apache-airflow-providers-common-compat==1.4.0` if the file doesn't pin it. The Apache Airflow constraints file doesn't include it.
   - The Apache Airflow constraints files list `openlineage-sql` as `openlineage_sql`. Replace that line instead of adding a second pin for the package, because duplicate pins cause the install to fail.
   - Set `sqlparse==0.5.1`. `apache-airflow-providers-common-sql` 1.21.0 requires `sqlparse` 0.5.1 or later, and the Apache Airflow constraints file pins `sqlparse==0.4.4`.

2. Upload the constraints file to your MWAA S3 bucket:

   ```shell
   MWAA_BUCKET=<MWAA_BUCKET_NAME>
   aws s3 cp constraints.txt "s3://${MWAA_BUCKET}/dags/constraints.txt"
   ```

3. Update `requirements.txt` to reference the constraints file and pin the upgraded package versions. Make the `--constraint` line the first line, replacing any existing `--constraint` line. Replace any existing lines for the packages in the following block with these lines, and keep your other packages.

   ```text
   --constraint /usr/local/airflow/dags/constraints.txt
   apache-airflow-providers-openlineage==2.2.0
   apache-airflow-providers-common-sql==1.21.0
   apache-airflow-providers-common-compat==1.4.0
   openlineage-integration-common==1.31.0
   openlineage-python==1.31.0
   openlineage-sql==1.31.0
   ```

4. Upload the updated `requirements.txt` file:

   ```shell
   aws s3 cp requirements.txt "s3://${MWAA_BUCKET}/requirements.txt"
   ```

{{% /tab %}}
{{< /tabs >}}

## Deploy and validate

1. In the MWAA console, update the environment so it picks up the new `requirements.txt`.
2. Wait for the environment update to complete.
3. Check the requirements install log. In CloudWatch, open your environment's worker log group (or scheduler log group), open the `requirements_install_*` log stream, and confirm that it contains no `ERROR` lines. MWAA reports the environment update as successful even when pip fails to install `requirements.txt`.
4. Trigger a DAG run that emits OpenLineage events.
5. In Datadog, verify that runs appear on the [Data Observability: Jobs Monitoring][2] page.

## Troubleshooting

- If no OpenLineage events arrive after the update, check the `requirements_install_*` log stream for `ERROR` lines, such as a pip `ResolutionImpossible` error. When pip fails, MWAA installs none of the packages in `requirements.txt`, including your own packages.
- If dependency resolution fails, verify that the same package versions are pinned in both `constraints.txt` and `requirements.txt`. Also verify that `constraints.txt` doesn't pin the same package twice, such as `openlineage-sql` and `openlineage_sql`.
- If you created `constraints.txt` from the full Apache Airflow constraints file, its older pins can conflict with your other requirements. Replace it with a file that contains only the OpenLineage pins for your Airflow version. For Airflow 2.8.1 and 2.9.2, a full constraints file must also set `sqlparse==0.5.1`.
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
[8]: /data_observability/jobs_monitoring/airflow/#openlineage-provider-compatibility
[9]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/changelog.html
