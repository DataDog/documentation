---
description: Amazon MWAA Airflow 2.7.2, 2.8.1 또는 2.9.2에서 apache-airflow-providers-openlineage를
  설치할 때 발생하는 종속성 충돌을 해결하세요.
further_reading:
- link: /data_observability/jobs_monitoring/airflow/?tab=amazonmwaa
  tag: 문서
  text: 'Apache Airflow용 Data Observability: Jobs Monitoring 활성화'
title: Airflow 2.7.2, 2.8.1 또는 2.9.2용 Amazon MWAA에서 OpenLineage 공급자를 업그레이드하세요.
---
## 개요 {#overview}

Amazon MWAA 환경에서 Airflow `2.7.2`, `2.8.1` 또는 `2.9.2`를 실행 중인 경우 이 가이드를 사용하세요.

이러한 Airflow 버전의 경우, MWAA 기본 제약 조건으로 인해 이전 `apache-airflow-providers-openlineage` 및 OpenLineage 패키지 버전이 고정됩니다. 이러한 버전은 알려진 안정성 및 호환성 문제를 일으킬 수 있으며, 이는 Data Observability 경험을 저하시킬 수 있습니다.

이러한 수정 사항이 포함된 공급자 버전을 사용하려면 제약 조건과 요구 사항을 함께 업데이트하세요. Amazon MWAA는 각 Airflow 및 Python 버전에 대한 패키지 제약 조건을 적용하므로, 사용자 지정 제약 조건을 제공하지 않으면 OpenLineage 패키지 업그레이드가 MWAA 기본값과 충돌할 수 있습니다.

MWAA 종속성 및 제약 조건 동작에 대한 자세한 내용은 [Python 종속성][3]에 관한 AWS 문서를 참조하세요. 공급자 호환성 및 요구 사항을 검토하려면 [OpenLineage 공급자 문서][4]를 참조하세요.

기본 설정 단계는 [Apache Airflow용 Data Observability: Jobs Monitoring 활성화][1]를 참조하세요.

## 기타 MWAA 버전의 경우 {#for-other-mwaa-versions}

MWAA 환경에서 이 가이드에 나열되지 않은 Airflow 버전을 실행 중인 경우 사용 중인 Airflow 버전과 호환되는 최신 `apache-airflow-providers-openlineage` 릴리스를 사용하는 것이 좋습니다. [Airflow OpenLineage 공급자 호환성 표][8]를 사용하여 해당 릴리스를 선택한 다음 동일한 제약 조건 패턴을 따르세요.

1. 사용 중인 Airflow 및 Python 버전에 맞는 MWAA 제약 조건 파일을 다운로드합니다.
2. `constraints.txt`에서 OpenLineage 공급자 고정 사항과 필요한 모든 OpenLineage 종속성 고정 사항을 업데이트합니다.
3. `requirements.txt`에서 동일한 버전을 고정합니다.
4. 두 파일을 MWAA S3 버킷에 업로드하고 MWAA 환경을 업데이트합니다.

사용 중인 Airflow 버전에서 사용할 수 있는 호환 가능한 최신 공급자 릴리스를 사용하는 것이 좋습니다. 공급자 릴리스에 따라 최소 지원 Airflow 버전이나 필수 종속성 버전이 변경될 수 있으므로 업데이트하기 전에 [OpenLineage 공급자 변경 로그][9]를 검토하세요.

## 요구 사항 {#requirements}

- MWAA 환경에 구성된 Amazon S3 버킷에 대한 액세스 권한
- `requirements.txt` 및 MWAA 환경 구성 업데이트 권한

## 권장 버전 {#recommended-versions}

다음 표는 MWAA 제약 조건에 의해 고정된 기본 버전과 각 Airflow 버전에 대해 권장되는 업그레이드 버전을 보여줍니다.

| 패키지 | Airflow 2.7.2 | Airflow 2.8.1 | Airflow 2.9.2 |
|---|---|---|---|
| `apache-airflow-providers-openlineage` | 기본값: 1.1.0 <br/> 업그레이드: **1.14.0** - [Datadog 패치 휠][6] | 기본값: 1.4.0 <br/> 업그레이드: **1.14.0** | 기본값: 1.8.0  <br/> 업그레이드:**2.2.0** |
| `apache-airflow-providers-common-sql` | 기본값: 1.7.2 <br/> 업그레이드: 변경 없음 | 기본값: 1.10.0 <br/> 업그레이드: **1.20.0** | 기본값: 1.14.0 <br/> 업그레이드: **1.21.0** |
| `apache-airflow-providers-common-compat` | 기본값: 해당 없음 <br/> 업그레이드: **1.2.2** - [Datadog 패치 휠][7] | 기본값: 해당 없음 <br/> 업그레이드: **1.2.1** | 기본값: 해당 없음 <br/> 업그레이드: **1.4.0** |
| `openlineage-integration-common` | 기본값: 1.3.1 <br/> 업그레이드: **1.24.2** | 기본값: 1.7.0 <br/> 업그레이드: **1.24.2** | 기본값: 1.16.0 <br/> 업그레이드: **1.31.0** |
| `openlineage-python` | 기본값: 1.3.1 <br/> 업그레이드: **1.24.2** | 기본값: 1.7.0 <br/> 업그레이드: **1.24.2** | 기본값: 1.16.0 <br/> 업그레이드: **1.31.0** |
| `openlineage-sql` | 기본값: 1.3.1 <br/> 업그레이드: **1.24.2** | 기본값: 1.7.0 <br/> 업그레이드: **1.24.2** | 기본값: 1.16.0 <br/> 업그레이드: **1.31.0** |

## 제약 조건 및 요구 사항 업데이트 {#update-constraints-and-requirements}

{{< tabs >}}
{{% tab "Airflow 2.7.2" %}}

Airflow 2.7.2는 업스트림 `apache-airflow-providers-openlineage` 1.14.0 패키지와 호환되지 않습니다. Datadog은 MWAA 2.7.2에서 사용할 수 있도록 완화된 Airflow 버전 제약 조건이 포함된 공급자 및 `common-compat` 패키지의 패치된 버전을 제공합니다.

1. 패치된 휠 파일을 다운로드하여 MWAA S3 버킷에 업로드합니다.

   ```shell
   MWAA_BUCKET=<MWAA_BUCKET_NAME>
   curl -Lo apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl \
     "https://docs.datadoghq.com/resources/whl/apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl"
   curl -Lo apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl \
     "https://docs.datadoghq.com/resources/whl/apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl"
   aws s3 cp apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl "s3://${MWAA_BUCKET}/dags/"
   aws s3 cp apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl "s3://${MWAA_BUCKET}/dags/"
   ```

2. Airflow 제약 조건 파일을 다운로드합니다.

   ```shell
   curl -o constraints.txt \
     "https://raw.githubusercontent.com/apache/airflow/constraints-2.7.2/constraints-3.11.txt"
   ```

   **참고**: MWAA 환경에 맞는 Python 버전을 확인하세요. 환경에서 다른 Python 버전을 사용하는 경우 URL에서 `3.11`을 교체하세요.

3. `constraints.txt`를 편집하여 다음 패키지 고정 사항을 업데이트합니다.

   ```text
   apache-airflow-providers-openlineage==1.14.0
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

   또한 기본 제약 조건 파일에 포함되어 있지 않으므로 다음 줄을 추가하세요.

   ```text
   apache-airflow-providers-common-compat==1.2.2
   ```

   `apache-airflow-providers-common-sql`에 대해 변경할 필요가 없습니다(기본 `1.7.2`는 호환 가능).

4. 업데이트된 제약 조건 파일을 MWAA S3 버킷에 업로드합니다.

   ```shell
   aws s3 cp constraints.txt "s3://${MWAA_BUCKET}/dags/constraints.txt"
   ```

5. 패치된 휠과 제약 조건을 참조하도록 `requirements.txt`를 업데이트합니다.

   ```text
   --constraint /usr/local/airflow/dags/constraints.txt
   /usr/local/airflow/dags/apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl
   /usr/local/airflow/dags/apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

6. 업데이트된 `requirements.txt` 파일을 업로드합니다.

   ```shell
   aws s3 cp requirements.txt "s3://${MWAA_BUCKET}/requirements.txt"
   ```

{{% /tab %}}
{{% tab "Airflow 2.8.1" %}}

1. Airflow 제약 조건 파일을 다운로드합니다.

   ```shell
   curl -o constraints.txt \
     "https://raw.githubusercontent.com/apache/airflow/constraints-2.8.1/constraints-3.11.txt"
   ```

   **참고**: MWAA 환경에 맞는 Python 버전을 확인하세요. 환경에서 다른 Python 버전을 사용하는 경우 URL에서 `3.11`을 교체하세요.

2. `constraints.txt`를 편집하여 다음 패키지 고정 사항을 업데이트합니다.

   ```text
   apache-airflow-providers-openlineage==1.14.0
   apache-airflow-providers-common-sql==1.20.0
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

   또한 기본 제약 조건 파일에 포함되어 있지 않으므로 다음 줄을 추가하세요.

   ```text
   apache-airflow-providers-common-compat==1.2.1
   ```

3. 업데이트된 제약 조건 파일을 MWAA S3 버킷에 업로드합니다.

   ```shell
   MWAA_BUCKET=<MWAA_BUCKET_NAME>
   aws s3 cp constraints.txt "s3://${MWAA_BUCKET}/dags/constraints.txt"
   ```

4. 제약 조건 파일을 참조하고 업그레이드된 패키지 버전을 고정하도록 `requirements.txt`를 업데이트합니다.

   ```text
   --constraint /usr/local/airflow/dags/constraints.txt
   apache-airflow-providers-openlineage==1.14.0
   apache-airflow-providers-common-sql==1.20.0
   apache-airflow-providers-common-compat==1.2.1
   openlineage-integration-common==1.24.2
   openlineage-python==1.24.2
   openlineage-sql==1.24.2
   ```

5. 업데이트된 `requirements.txt` 파일을 업로드합니다.

   ```shell
   aws s3 cp requirements.txt "s3://${MWAA_BUCKET}/requirements.txt"
   ```

{{% /tab %}}
{{% tab "Airflow 2.9.2" %}}

1. Airflow 제약 조건 파일을 다운로드합니다.

   ```shell
   curl -o constraints.txt \
     "https://raw.githubusercontent.com/apache/airflow/constraints-2.9.2/constraints-3.11.txt"
   ```

   **참고**: MWAA 환경에 맞는 Python 버전을 확인하세요. 환경에서 다른 Python 버전을 사용하는 경우 URL에서 `3.11`을 교체하세요.

2. `constraints.txt`를 편집하여 다음 패키지 고정 사항을 업데이트합니다.

   ```text
   apache-airflow-providers-openlineage==2.2.0
   apache-airflow-providers-common-sql==1.21.0
   openlineage-integration-common==1.31.0
   openlineage-python==1.31.0
   openlineage-sql==1.31.0
   ```

   또한 기본 제약 조건 파일에 포함되어 있지 않으므로 다음 줄을 추가하세요.

   ```text
   apache-airflow-providers-common-compat==1.4.0
   ```

3. 업데이트된 제약 조건 파일을 MWAA S3 버킷에 업로드합니다.

   ```shell
   MWAA_BUCKET=<MWAA_BUCKET_NAME>
   aws s3 cp constraints.txt "s3://${MWAA_BUCKET}/dags/constraints.txt"
   ```

4. 제약 조건 파일을 참조하고 업그레이드된 패키지 버전을 고정하도록 `requirements.txt`를 업데이트합니다.

   ```text
   --constraint /usr/local/airflow/dags/constraints.txt
   apache-airflow-providers-openlineage==2.2.0
   apache-airflow-providers-common-sql==1.21.0
   apache-airflow-providers-common-compat==1.4.0
   openlineage-integration-common==1.31.0
   openlineage-python==1.31.0
   openlineage-sql==1.31.0
   ```

5. 업데이트된 `requirements.txt` 파일을 업로드합니다.

   ```shell
   aws s3 cp requirements.txt "s3://${MWAA_BUCKET}/requirements.txt"
   ```

{{% /tab %}}
{{< /tabs >}}

## {#deploy-and-validate} 배포 및 검증

1. MWAA 콘솔에서 새 `requirements.txt`를 선택하도록 환경을 업데이트합니다.
2. 환경 업데이트가 완료될 때까지 기다립니다.
3. MWAA 설치 및 시작 로그를 검토합니다. 종속성 리졸버 오류가 없는지 확인하세요.
4. OpenLineage 이벤트를 내보내는 DAG 실행을 트리거합니다.
5. Datadog에서 [Data Observability: Jobs Monitoring][2] 페이지에 실행이 나타나는지 확인합니다.

## 문제 해결 {#troubleshooting}

- 종속성 해결에 계속 실패하면 `constraints.txt` 및 `requirements.txt` 둘 다에 동일한 패키지 버전이 고정되어 있는지 확인하세요.
- MWAA가 이전 버전을 설치하는 경우 `requirements.txt`에서 `--constraint /usr/local/airflow/dags/constraints.txt`를 가리키고 해당 파일이 S3 `dags/` 경로에 있는지 확인하세요.
- 업로드 또는 읽기에 실패하면 MWAA 실행 역할에 필요한 S3 객체에 대한 액세스 권한이 있는지 확인하세요. 자세한 내용은 [Amazon MWAA 실행 역할][5]을 참조하세요.

## 사용자 지정 이미지를 관리하는 경우 {#if-you-manage-a-custom-image}

팀에서 사용자 지정 Airflow 이미지를 통해 패키지 버전을 관리하는 경우, 먼저 이미지 정의에서 패키지 버전을 업데이트한 다음 빌드된 이미지에서 `requirements.txt`를 다시 생성하여 제약 조건과 요구 사항이 일치하도록 하세요.

[1]: /ko/data_observability/jobs_monitoring/airflow/?tab=amazonmwaa
[2]: https://app.datadoghq.com/data-jobs/
[3]: https://docs.aws.amazon.com/mwaa/latest/userguide/connections-packages.html
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[5]: https://docs.aws.amazon.com/mwaa/latest/userguide/mwaa-create-role.html
[6]: /ko/resources/whl/apache_airflow_providers_openlineage-1.14.0-py3-none-any.whl
[7]: /ko/resources/whl/apache_airflow_providers_common_compat-1.2.2-py3-none-any.whl
[8]: /ko/data_observability/jobs_monitoring/airflow/#openlineage-provider-compatibility
[9]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/changelog.html