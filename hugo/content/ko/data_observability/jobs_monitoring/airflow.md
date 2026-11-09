---
aliases:
- /ko/data_jobs/airflow
description: 'Kubernetes, Amazon MWAA 및 기타 플랫폼에서 OpenLineage 공급자와 Data Observability:
  Jobs Monitoring을 사용하여 Apache Airflow DAG 워크플로를 모니터링하세요.'
further_reading:
- link: https://www.datadoghq.com/blog/data-jobs-monitoring/
  tag: 블로그
  text: Data Jobs Monitoring을 사용하여 데이터 처리 워크로드의 문제 해결 및 최적화하기
- link: https://www.datadoghq.com/blog/data-observability-monitoring
  tag: 블로그
  text: Datadog으로 데이터 수명 주기 관찰하기
- link: /data_jobs
  tag: 문서
  text: 'Data Observability: Jobs Monitoring'
title: 'Apache Airflow용 Data Observability: Jobs Monitoring 활성화'
---
[Data Observability: Jobs Monitoring][1]은 Apache Airflow DAG가 실행하는 워크플로의 성능 및 안정성에 대한 가시성을 제공합니다.

## 설정 {#setup}

Airflow 플랫폼을 선택하고 설정 단계를 따르세요.

{{< tabs >}}
{{% tab "Kubernetes" %}}
### 요구 사항 {#requirements}

* [Apache Airflow 2.7][1] 이상(Airflow 3 포함)
* [apache-airflow-providers-openlineage][2]

### 설정 {#setup-1}

시작하려면 다음 단계를 따르세요.

1. 배포에 사용된 Airflow 버전을 확인합니다. 예를 들어 Airflow 이미지 태그, Helm 값, 배포 매니페스트 또는 Airflow UI에 표시된 버전을 확인합니다.

2. [OpenLineage 공급자 버전 참조](#openlineage-provider-version-reference) 및 [OpenLineage 공급자 변경 로그](https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/changelog.html)를 사용하여 사용 중인 Airflow 버전을 지원하는 최신 공급자 릴리스를 확인합니다.

3. `openlineage` 공급자를 **Airflow 스케줄러와 Airflow Worker 모두**에 설치하려면 `requirements.txt` 파일 또는 Airflow 종속성을 관리하는 위치에서 공급자 버전을 고정합니다.

    ```text
    apache-airflow-providers-openlineage==<PROVIDER_VERSION>
    ```

   배포에서 버전 제약 조건을 사용하는 경우 Airflow 제약 조건 파일에서 `apache-airflow-providers-openlineage`의 버전을 동일하게 설정합니다. 또한 해당 공급자 릴리스에 필요한 모든 OpenLineage 종속성을 [OpenLineage 공급자 버전 참조](#openlineage-provider-version-reference)에 나열된 최소 버전으로 업데이트합니다.

4. `openlineage` 공급자를 구성합니다. 다음 구성 옵션 중 하나를 선택하고 환경 변수를 설정하여 Airflow 스케줄러와 Airflow Worker가 실행되는 포드에서 사용할 수 있도록 합니다.

   **옵션 1: Datadog Transport(권장)**

   **요구 사항**: `apache-airflow-providers-openlineage` 버전 2.7.3 이상 및 `openlineage-python` 버전 1.37.0 이상이 필요합니다.

   ```shell
   export DD_API_KEY=<DD_API_KEY>
   export DD_SITE=<DD_SITE>
   export OPENLINEAGE__TRANSPORT__TYPE=datadog
   # OPENLINEAGE_NAMESPACE sets the 'env' tag value in Datadog. You can hardcode this to a different value
   export OPENLINEAGE_NAMESPACE=${AIRFLOW_ENV_NAME}
   ```
   * `<DD_API_KEY>`를 유효한 [Datadog API 키][4]로 바꿉니다.
   * `<DD_SITE>`를 사용 중인 Datadog 사이트로 바꿉니다(예: {{< region-param key="dd_site" code="true" >}})에서 지원되지 않습니다. 

   **옵션 2: Composite Transport**

   **요구 사항**: `apache-airflow-providers-openlineage` 버전 1.11.0 이상 및 `openlineage-python` 버전 1.37.0 이상이 필요합니다.

   이미 다른 시스템에서 OpenLineage를 사용 중이고 Datadog을 추가 목적지로 지정하려는 경우 이 옵션을 사용하세요. 복합 전송은 구성된 모든 전송 대상으로 이벤트를 보냅니다.

   예를 들어 HTTP 전송을 사용하여 다른 시스템에 이벤트를 전송하는 경우는 다음과 같습니다.

   ```shell
   # Your existing HTTP transport configuration
   export OPENLINEAGE__TRANSPORT__TYPE=composite
   export OPENLINEAGE__TRANSPORT__TRANSPORTS__EXISTING__TYPE=http
   export OPENLINEAGE__TRANSPORT__TRANSPORTS__EXISTING__URL=<YOUR_EXISTING_URL>
   export OPENLINEAGE__TRANSPORT__TRANSPORTS__EXISTING__AUTH__TYPE=api_key
   export OPENLINEAGE__TRANSPORT__TRANSPORTS__EXISTING__AUTH__API_KEY=<YOUR_EXISTING_API_KEY>

   # Add Datadog as an additional transport
   export DD_API_KEY=<DD_API_KEY>
   export DD_SITE=<DD_SITE>
   export OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__TYPE=datadog
   # OPENLINEAGE_NAMESPACE sets the 'env' tag value in Datadog. You can hardcode this to a different value
   export OPENLINEAGE_NAMESPACE=${AIRFLOW_ENV_NAME}
   ```
   * `<DD_API_KEY>`를 유효한 [Datadog API 키][4]로 바꿉니다.
   * `<DD_SITE>`를 사용 중인 Datadog 사이트로 바꿉니다(예: {{< region-param key="dd_site" code="true" >}})에서 지원되지 않습니다.
   * `<YOUR_EXISTING_URL>`과 `<YOUR_EXISTING_API_KEY>`를 기존 OpenLineage 전송 구성으로 바꿉니다.

   이 예시에서 OpenLineage 이벤트는 기존 시스템과 Datadog 모두로 전송됩니다. 각 전송에 고유한 이름(위 예시의 `EXISTING` 및 `DATADOG`와 같이)을 지정하여 여러 전송을 구성할 수 있습니다.

   **옵션 3: Simple Configuration**

   이 옵션은 URL 기반 구성을 사용하며 모든 버전의 OpenLineage 공급자와 호환됩니다.

   ```shell
   export OPENLINEAGE_URL=<DD_DATA_OBSERVABILITY_INTAKE>
   export OPENLINEAGE_API_KEY=<DD_API_KEY>
   # OPENLINEAGE_NAMESPACE sets the 'env' tag value in Datadog. You can hardcode this to a different value
   export OPENLINEAGE_NAMESPACE=${AIRFLOW_ENV_NAME}
   ```
   * `<DD_DATA_OBSERVABILITY_INTAKE>`를 `https://data-obs-intake.`로 바꿉니다.{{< region-param key="dd_site" code="true" >}}.
   * `<DD_API_KEY>`를 유효한 [Datadog API 키][4]로 바꿉니다.

   * **Airflow v2.7 또는 v2.8**을 사용하는 경우, 앞서 설정한 환경 변수에 다음 두 가지 환경 변수도 추가합니다. Airflow v2.7 및 v2.8은 이전 버전을 사용하므로, 이렇게 하면 `apache-airflow-providers-openlineage` v1.7에서 해결된 OpenLineage 구성 문제를 수정할 수 있습니다.
      ```shell
      #!/bin/sh
      # Required for Airflow v2.7 & v2.8 only
      export AIRFLOW__OPENLINEAGE__CONFIG_PATH=""
      export AIRFLOW__OPENLINEAGE__DISABLED_FOR_OPERATORS=""
      ```

   `openlineage` 공급자에서 지원하는 다른 구성은 공식 문서 [configuration-openlineage][3]에서 확인합니다.

5. Airflow 포드 업데이트를 트리거하고 완료될 때까지 기다립니다.

6. 필요시 Data Observability: Jobs Monitoring에서 작업 로그와 DAG 실행을 연관 지을 수 있도록 로그 수집을 설정합니다. 로그를 연관 지으려면 로그 디렉터리가 [기본 로그 파일 이름 형식][5]을 준수해야 합니다.

   **참고:** 로그를 연관 지으려면 Airflow 작업 컨텍스트 속성(DAG ID, 실행 ID, 작업 ID, 시도 횟수)을 Datadog의 구조화된 패싯으로 작업 로그에 주입해야 합니다. [Airflow 작업 컨텍스트를 로그에 주입][11]을 참조하세요.

   표준 배포에서는 `PATH_TO_AIRFLOW_LOGS` 값이 `$AIRFLOW_HOME/logs`이지만, 사용자 지정 구성에서는 다를 수 있습니다. 포드에 다음 주석을 추가합니다.
   ```yaml
   ad.datadoghq.com/base.logs: '[{"type": "file", "path": "PATH_TO_AIRFLOW_LOGS/*/*/*/*.log", "source": "airflow"}]'
   ```

   `"source": "airflow"`를 추가하면 [Airflow 통합][7] 로그 파이프라인에서 로그 연관에 필요한 속성을 추출할 수 있습니다.

   이 파일 경로는 Agent 컨테이너를 기준으로 하는 상대 경로입니다. 로그 파일이 포함된 디렉터리를 애플리케이션 컨테이너와 Agent 컨테이너 모두에 마운트하여 Agent가 해당 파일에 액세스할 수 있도록 합니다. 자세한 내용은 [컨테이너 로컬 로그 파일에서 로그 수집][9]을 참조하세요.

   **참고**: 로그를 수집하려면 Kubernetes 클러스터에 Datadog Agent가 이미 설치되어 있어야 합니다. 아직 설치하지 않았다면 [Kubernetes 설치 문서][8]를 참조하세요.

   Kubernetes에서 로그 수집을 설정하는 다른 방법은 [Kubernetes 및 Integrations 구성 섹션][6]을 참조하세요.


[1]: https://github.com/apache/airflow/releases/tag/2.7.0
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[4]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#api-keys
[5]: https://airflow.apache.org/docs/apache-airflow/2.9.3/configurations-ref.html#log-filename-template
[6]: /ko/containers/kubernetes/integrations/?tab=annotations#configuration
[7]: /ko/integrations/airflow/?tab=containerized
[8]: /ko/containers/kubernetes/installation/?tab=datadogoperator#installation
[9]: /ko/containers/kubernetes/log/?tab=datadogoperator#from-a-container-local-log-file
[11]: /ko/data_observability/jobs_monitoring/airflow_log_context/

### 유효성 검사 {#validation}

설정을 완료한 후 Datadog의 [Data Observability: Jobs Monitoring][2] 페이지에서 Airflow 작업 실행 목록을 확인합니다.

### 문제 해결 {#troubleshooting}

OpenLineage 클라이언트 및 하위 모듈에 대해 앞서 설정한 다른 환경 변수와 함께 `OPENLINEAGE_CLIENT_LOGGING`을 `DEBUG`로 설정합니다. 이 설정은 `openlineage` 공급자 구성 중 발생하는 문제를 해결하는 데 유용할 수 있습니다.

OpenLineage 설정을 자동으로 검사하는 방법은 [OpenLineage 유효성 검사 DAG를 사용한 Airflow 설정 문제 해결][10]을 참조하세요.

[10]: /ko/data_observability/jobs_monitoring/airflow_troubleshooting_dag/

{{% /tab %}}

{{% tab "Amazon MWAA" %}}
### 요구 사항 {#requirements-1}

* [Apache Airflow 2.7.0][1] 이상(Airflow 3 포함)
* [apache-airflow-providers-openlineage][2]

### 설정 {#setup-2}

<div class="alert alert-info"><strong>Airflow 2.7.2, 2.8.1 또는 2.9.2를 사용하는 경우</strong>: MWAA 기본 제약 조건에 따라 이전 <code>apache-airflow-providers-openlineage</code> 버전이 고정됩니다. 이러한 버전에는 Data Observability 사용 경험에 부정적인 영향을 미칠 수 있는 알려진 문제가 있습니다. 해당 문제가 수정된 공급자 버전으로 업그레이드하는 방법은 <a href="/data_observability/jobs_monitoring/airflow_mwaa_upgrade/">Airflow 2.7.2, 2.8.1 및 2.9.2용 Amazon MWAA에서 OpenLineage 공급자 업그레이드</a>를 참조하세요.</div>

시작하려면 다음 단계를 따르세요.

1. Amazon MWAA Airflow 버전을 확인하고 해당 버전과 호환되는 최신 OpenLineage 공급자 릴리스를 선택합니다.

   환경에서 Airflow 2.7.2, 2.8.1 또는 2.9.2를 사용하는 경우, [MWAA 업그레이드 가이드][11]에 따라 전송을 구성하기 전에 OpenLineage 공급자 및 관련 종속성 제약 조건을 업데이트합니다. 다른 Amazon MWAA 버전의 경우 [OpenLineage 공급자 버전 참조](#openlineage-provider-version-reference)를 사용합니다.

1. `requirements.txt` 파일에 공급자를 추가합니다.

    ```text
    apache-airflow-providers-openlineage
    ```

1. `openlineage` 공급자를 구성합니다. 가장 간단한 방법은 [Amazon MWAA 시작 스크립트][3]에서 다음 환경 변수를 설정하는 것입니다.

   ```shell
   #!/bin/sh
   export OPENLINEAGE_URL=<DD_DATA_OBSERVABILITY_INTAKE>
   export OPENLINEAGE_API_KEY=<DD_API_KEY>
   # AIRFLOW__OPENLINEAGE__NAMESPACE sets the 'env' tag value in Datadog. You can hardcode this to a different value
   export AIRFLOW__OPENLINEAGE__NAMESPACE=${AIRFLOW_ENV_NAME}
   ```

   * `<DD_DATA_OBSERVABILITY_INTAKE>`를 `https://data-obs-intake.`로 완전히 바꿉니다.{{< region-param key="dd_site" code="true" >}}.
   * `<DD_API_KEY>`를 유효한 [Datadog API 키][5]로 완전히 바꿉니다.
   * **Airflow v2.7 또는 v2.8**을 사용하는 경우 시작 스크립트에 다음 두 환경 변수도 추가합니다. Airflow v2.7 및 v2.8은 이전 버전을 사용하므로, 이렇게 하면 `apache-airflow-providers-openlineage` v1.7에서 해결된 OpenLineage 구성 문제를 수정할 수 있습니다.
      ```shell
      #!/bin/sh
      # Required for Airflow v2.7 & v2.8 only
      export AIRFLOW__OPENLINEAGE__CONFIG_PATH=""
      export AIRFLOW__OPENLINEAGE__DISABLED_FOR_OPERATORS=""
      ```

   `openlineage` 공급자에서 지원하는 다른 구성은 공식 문서 [configuration-openlineage][4]에서 확인합니다.

   Amazon MWAA의 종속성 해결은 MWAA 제약 조건에 따라 제어됩니다. 호환되는 최신 공급자가 MWAA 기본 설정과 충돌하는 경우 [MWAA 업그레이드 가이드][11]에 설명된 사용자 지정 제약 조건 패턴을 따릅니다.

1. 업데이트된 `requirements.txt` 및 [Amazon MWAA 시작 스크립트][3]를 Amazon MWAA 환경용으로 구성한 Amazon S3 폴더에 배포합니다.

1. 필요시 Jobs Monitoring에서 작업 로그와 DAG 실행을 연관 지을 수 있도록 Log Collection을 설정합니다.
   1. Amazon MWAA가 [CloudWatch로 로그를 전송][9]하도록 구성합니다.
   2. [Datadog으로 로그를 전송합니다][10].

[1]: https://github.com/apache/airflow/releases/tag/2.7.0
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://docs.aws.amazon.com/mwaa/latest/userguide/using-startup-script.html
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[5]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#api-keys
[6]: https://docs.aws.amazon.com/mwaa/latest/userguide/mwaa-create-role.html
[7]: https://app.datadoghq.com/data-jobs/
[8]: https://openlineage.io/docs/integrations/airflow/
[9]: https://docs.aws.amazon.com/mwaa/latest/userguide/monitoring-airflow.html#monitoring-airflow-enable
[10]: /ko/integrations/amazon_web_services/?tab=roledelegation#log-collection
[11]: /ko/data_observability/jobs_monitoring/airflow_mwaa_upgrade/

### 검증 {#validation-1}

설정을 완료한 후 Datadog의 [Data Observability: Jobs Monitoring][7] 페이지에서 Airflow 작업 실행 목록을 확인합니다.

### 문제 해결 {#troubleshooting-1}

Amazon MWAA 환경에 구성된 실행 역할에 `requirements.txt` 및 [Amazon MWAA 시작 스크립트][3]에 액세스할 수 있는 적절한 권한이 있는지 확인합니다. 실행 역할을 직접 관리하면서 해당 지원 파일을 처음 추가하는 경우 이 권한이 필요합니다. 필요한 경우 자세한 내용은 공식 가이드 [Amazon MWAA 실행 역할][6]을 참조하세요.

OpenLineage 클라이언트 및 해당 하위 모듈에 대해 [Amazon MWAA 시작 스크립트][3]에서 `OPENLINEAGE_CLIENT_LOGGING` 값을 `DEBUG`로 설정합니다. 이 설정은 `openlineage` 공급자 구성 중 발생하는 문제를 해결하는 데 유용할 수 있습니다.

OpenLineage 설정을 자동으로 검사하는 방법은 [OpenLineage 검증 DAG를 사용한 Airflow 설정 문제 해결][12]을 참조하세요.

[12]: /ko/data_observability/jobs_monitoring/airflow_troubleshooting_dag/

{{% /tab %}}

{{% tab "Astronomer" %}}

<div class="alert alert-danger">
Astro를 사용하는 Astronomer 고객의 경우, <a href=https://www.astronomer.io/docs/learn/airflow-openlineage#lineage-on-astro>Astro는 Airflow OpenLineage 공급자를 기반으로 하는 데이터 계보 기능을 제공합니다.</a> Data Observability: Jobs Monitoring은 동일한 OpenLineage 공급자에 의존하며 <a href=https://openlineage.io/docs/client/python#composite>Composite</a> 전송 방식을 사용하여 추가 전송을 구성합니다.
</div>

### 요구 사항 {#requirements-2}

* [Astro Runtime 12.1.0+][1]
* [`apache-airflow-providers-openlineage` 1.11.0+][2]
* [`openlineage-python` 1.23.0+][8]

### 설정 {#setup-3}

1. Astro Runtime에 `apache-airflow-providers-openlineage` 1.11.0 이상 및 `openlineage-python` 1.23.0 이상이 포함되어 있는지 확인합니다. 배포 이미지에서 Airflow 종속성을 관리하는 경우 전송을 구성하기 전에 Dockerfile에서 호환되는 버전을 고정합니다.

2. OpenLineage 공급자를 설정하려면 다음 환경 변수를 정의합니다.

    ```shell
    OPENLINEAGE__TRANSPORT__TYPE=composite
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__TYPE=http
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__URL=<DD_DATA_OBSERVABILITY_INTAKE>
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__AUTH__TYPE=api_key
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__AUTH__API_KEY=<DD_API_KEY>
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__COMPRESSION=gzip
    ```

    * Replace `<DD_DATA_OBSERVABILITY_INTAKE>` with `https://data-obs-intake.`{{< region-param key="dd_site" code="true" >}}.
    * `<DD_API_KEY>`를 유효한 [Datadog API 키][7]로 바꿉니다.

    **Optional:**
    * Set `AIRFLOW__OPENLINEAGE__NAMESPACE` with a unique name for the `env` tag on all DAGs in the Airflow deployment. This allows Datadog to logically separate this deployment's jobs from those of other Airflow deployments.
    * Set `OPENLINEAGE_CLIENT_LOGGING` to `DEBUG` for the OpenLineage client and its child modules to log at a `DEBUG` logging level. This can be useful for troubleshooting during the configuration of an OpenLineage provider.

    You can configure these variables in your Astronomer deployment using either of the following methods:

    - [From the Astro UI][5]: Navigate to your deployment settings and add the environment variables directly.
    - [In the Dockerfile][11]: Define the environment variables in your `Dockerfile` to ensure they are included during the build process.

    See the [Astronomer official guide][10] for managing environment variables for a deployment. See Apache Airflow's [OpenLineage Configuration Reference][6] for other supported configurations of the OpenLineage provider.

3. 배포 업데이트를 트리거하고 완료될 때까지 기다립니다.

[1]: https://www.astronomer.io/docs/astro/runtime-release-notes#astro-runtime-1210
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://www.astronomer.io/docs/astro/runtime-provider-reference
[4]: https://www.astronomer.io/docs/astro/cli/develop-project
[5]: https://www.astronomer.io/docs/astro/manage-env-vars#using-the-astro-ui
[6]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[7]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#api-keys
[8]: https://github.com/OpenLineage/OpenLineage/releases/tag/1.23.0
[9]: https://www.astronomer.io/docs/astro/runtime-provider-reference#astro-runtime-1210
[10]: https://www.astronomer.io/docs/astro/environment-variables/#management-options
[11]: https://www.astronomer.io/docs/astro/manage-env-vars#using-your-dockerfile

### 검증 {#validation-2}

설정을 완료한 후 Datadog의 [Data Observability: Jobs Monitoring][2] 페이지에서 Airflow 작업 실행 목록을 확인합니다.


### 문제 해결 {#troubleshooting-2}
Astronomer 배포에서 OpenLineage 환경 변수가 올바르게 설정되었는지 확인합니다.

**참고**: `.env` 파일을 사용하여 환경 변수를 추가해도 해당 변수가 로컬 Airflow 환경에만 적용되므로 올바르게 작동하지 않습니다.

OpenLineage 설정을 자동으로 검사하는 방법은 [OpenLineage 검증 DAG를 사용한 Airflow 설정 문제 해결][12]을 참조하세요.

[12]: /ko/data_observability/jobs_monitoring/airflow_troubleshooting_dag/

{{% /tab %}}
{{% tab "Google Cloud Composer" %}}
<div class="alert alert-danger">
Airflow용 Data Observability: Jobs Monitoring은 아직 <a href=https://cloud.google.com/composer/docs/composer-2/lineage-integration>Dataplex</a> 데이터 계보와 호환되지 않습니다. Data Observability: Jobs Monitoring을 위해 OpenLineage를 설정하면 기존 Dataplex 전송 구성을 재정의합니다.
</div>

### 요구 사항 {#requirements-3}

* [Cloud Composer 2][1] 이상
* [apache-airflow-providers-openlineage][2]

### 설정 {#setup-4}

시작하려면 다음 단계를 따르세요.

1. Cloud Composer 환경의 Airflow 버전과 OpenLineage 공급자 버전을 확인합니다. 공급자 버전을 변경해야 한다면 환경 패키지를 변경하기 전에 Google Cloud Composer 패키지 관리 지침과 [OpenLineage 공급자 버전 참조](#openlineage-provider-version-reference)를 검토합니다.

2. {{< ui >}}Advanced Configuration{{< /ui >}} 탭의 {{< ui >}}Airflow configuration override{{< /ui >}} 아래에서 {{< ui >}}Add Airflow configuration override{{< /ui >}}를 클릭하고 다음 설정을 구성합니다.

   - 섹션 1에 `openlineage`를 입력합니다.
   - 키 1에 `disabled`를 입력합니다.
   - 값 1에 `False`를 입력하여 OpenLineage를 활성화합니다.

   - 섹션 2에 `openlineage`를 입력합니다.
   - 키 2에 `transport`를 입력합니다.
   - 값 2에 다음을 입력합니다.

     ```text
     {
      "type": "http",
      "url": "<DD_DATA_OBSERVABILITY_INTAKE>",
      "auth": {
         "type": "api_key",
         "api_key": "<DD_API_KEY>"
      }
     }
     ```

   * `<DD_DATA_OBSERVABILITY_INTAKE>`를 `https://data-obs-intake.`로 완전히 바꿉니다.{{< region-param key="dd_site" code="true" >}}.
   * `<DD_API_KEY>`를 유효한 [Datadog API 키][5]로 완전히 바꿉니다.

**선택 사항:** OpenLineage 네임스페이스를 구성하여 Datadog에서 `env` 태그 값을 설정합니다.
   - 섹션 3에 `openlineage`을 입력합니다.
   - 키 3에 `namespace`을 입력합니다.
   - 값 3에 Composer 환경 값을 입력합니다(예: prod, dev, staging 또는 test).
   
**참고:** [Dataplex][6]가 활성화되어 있으면 네임스페이스가 기본적으로 Composer 환경 이름으로 설정됩니다. 여기에서 OpenLineage 네임스페이스를 수동으로 설정하면 필요에 따라 기본값을 재정의할 수 있습니다.

Google Cloud Composer에서 `openlineage` 공급자가 지원하는 다른 구성은 공식 [Airflow][4] 및 [Composer][3] 문서에서 확인합니다.

[1]: https://cloud.google.com/composer/docs/composer-versioning-overview
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://cloud.google.com/composer/docs/airflow-configurations
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[5]: https://docs.datadoghq.com/ko/account_management/api-app-keys/#api-keys
[6]: https://cloud.google.com/composer/docs/composer-2/lineage-integration
[7]: https://app.datadoghq.com/data-jobs/

### 검증 {#validation-3}

설정을 완료한 후 Datadog의 [Data Observability: Jobs Monitoring][7] 페이지에서 Airflow 작업 실행 목록을 확인합니다.

### 문제 해결 {#troubleshooting-3}

OpenLineage 클라이언트 및 해당 하위 모듈을 위해 Composer 페이지의 {{< ui >}}Environment variables{{< /ui >}} 탭에서 `OPENLINEAGE_CLIENT_LOGGING`을 `DEBUG`로 설정합니다. 이 설정은 `openlineage` 공급자 구성 중 발생하는 문제를 해결하는 데 유용할 수 있습니다.

OpenLineage 설정을 자동으로 검사하는 방법은 [OpenLineage 검증 DAG를 사용한 Airflow 설정 문제 해결][8]을 참조하세요.

[8]: /ko/data_observability/jobs_monitoring/airflow_troubleshooting_dag/

{{% /tab %}}
{{< /tabs >}}

## 알려진 문제 {#known-issues}

Airflow 2.x에서 DAG 실행 또는 작업을 수동으로 실패로 표시해도 Data Observability: Jobs Monitoring에서 해당 실행 또는 작업의 상태가 업데이트되지 않습니다. 영향을 받는 실행의 경우, 스팬 지속 시간 및 지속 시간 메트릭이 부정확할 수 있습니다.

## OpenLineage 공급자 버전 참조 {#openlineage-provider-version-reference}

Data Observability: Jobs Monitoring은 Apache Airflow OpenLineage 공급자를 사용하여 Airflow DAG 및 작업 이벤트를 전송합니다. 최상의 사용 경험을 위해 Datadog은 사용 중인 Airflow 버전과 호환되는 최신 OpenLineage 공급자 버전을 사용할 것을 권장합니다.

**Airflow 2.11 이상(Airflow 3 포함)**
: **권장 공급자 버전**: `2.20.3`
: **필수 종속성의 최소 버전**:
: - `apache-airflow-providers-common-sql>=1.32.0`
: - `apache-airflow-providers-common-compat>=1.15.0`
: - `openlineage-integration-common>=1.47.0`
: - `openlineage-python>=1.47.0`
: - `openlineage-integration-common>=1.52.0`
: - `openlineage-python>=1.52.0`
: **참고**: 가장 최신 공급자 릴리스입니다. 공급자 `2.20.3`에는 Python 3.11 이상이 필요합니다. 공급자 `2.9.0` 이상은 Airflow 2.11 이상이 필요합니다.

**Airflow 2.10.x**
: **권장 공급자 버전**: `2.8.0`
: **필수 종속성의 최소 버전**:
: - `apache-airflow-providers-common-sql>=1.20.0`
: - `apache-airflow-providers-common-compat>=1.8.0`
: - `openlineage-integration-common>=1.38.0`
: - `openlineage-python>=1.38.0`
: **참고**: Airflow 2.10과 호환되는 최신 공급자 릴리스입니다. 공급자 `2.9.0` 이상은 Airflow 2.11 이상이 필요합니다.

**Airflow 2.9.x**
: **권장 공급자 버전**: `2.2.0`
: **필수 종속성의 최소 버전**:
: - `apache-airflow-providers-common-sql>=1.20.0`
: - `apache-airflow-providers-common-compat>=1.4.0`
: - `openlineage-integration-common>=1.31.0`
: - `openlineage-python>=1.31.0`
: **참고**: Airflow 2.9와 호환되는 최신 공급자 릴리스입니다. 공급자 `2.3.0` 이상부터는 Airflow 2.10 이상이 필요합니다.

**Airflow 2.8.x**
: **권장 공급자 버전**: `1.14.0`
: **필수 종속성의 최소 버전**:
: - `apache-airflow-providers-common-sql>=1.20.0`
: - `apache-airflow-providers-common-compat>=1.2.1`
: - `openlineage-integration-common>=1.24.2`
: - `openlineage-python>=1.24.2`
: **참고**: Airflow 2.8과 호환되는 최신 공급자 릴리스입니다. 공급자 `2.0.0` 이상부터는 Airflow 2.9 이상이 필요합니다.

**Airflow 2.7.x**
: **권장 공급자 버전**: `1.10.0`
: **필수 종속성의 최소 버전**:
: - `apache-airflow-providers-common-sql>=1.6.0`
: - `openlineage-integration-common>=1.16.0`
: - `openlineage-python>=1.16.0`
: **참고**: Airflow 2.7과 호환되는 최신 공급자 릴리스입니다. 공급자 `1.11.0` 이상부터는 Airflow 2.8 이상이 필요합니다. Airflow 2.7 및 2.8의 경우, 설정 단계에 표시된 추가 구성 변수를 추가합니다. Amazon MWAA 2.7.2를 사용하는 경우, Datadog 패치가 적용된 휠에 대한 MWAA 업그레이드 가이드를 참조하세요.

공급자 릴리스에 따라 최소 지원 Airflow 버전이 변경되거나 필수 종속성 제약 조건이 추가될 수 있으므로 업그레이드하기 전에 [OpenLineage 공급자 변경 로그](https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/changelog.html)를 검토하세요.

## 고급 구성 {#advanced-configuration}

### dbt 작업과 Airflow 작업 연결 {#link-your-dbt-jobs-with-airflow-tasks}

<div class="alert alert-info">해당 <code>lineage_root_*</code> 아래에서 사용하는 매크로는 <code>apache-airflow-providers-openlineage</code> 2.3.0 이상이 필요합니다. 이전 공급자 버전(예: Airflow 2.9.2 및 공급자 2.2.0)의 경우, <a href="#backport-openlineage-lineage-macros-for-older-provider-versions">이전 공급자 버전을 위한 OpenLineage 계보 매크로 백포트</a>를 참조하세요.</div>

[OpenLineage dbt 통합][6]을 사용하여 dbt 텔레메트리를 해당 Airflow 작업에 연결하면 Airflow에서 실행 중인 dbt 작업을 모니터링할 수 있습니다.

Airflow 작업과 dbt 작업 간의 연결을 확인하려면 다음 단계를 따르세요.

1. `openlineage-dbt`를 설치합니다. 가상 환경에 dbt를 설정하려면 [Amazon MWAA에서 dbt 사용][7]을 참조하세요.

```shell
pip3 install openlineage-dbt>=1.39.0
```

2. dbt 호출을 `dbt-ol`(dbt용 OpenLineage 래퍼)로 변경합니다.

또한 명령이 실행되는 동안 dbt 작업을 확인할 수 있도록 --consume-structured-logs 플래그를 추가합니다.

```bash
dbt-ol run --consume-structured-logs --project-dir=$TEMP_DIR --profiles-dir=$PROFILES_DIR
```

3. DAG 파일에서 dbt 프로세스를 실행하는 Airflow 작업에 OpenLineage 상위 및 루트 상위 환경 변수를 설정하여 dbt 작업이 Datadog에서 직접적인 상위 작업과 최상위 DAG 실행 모두에 연결되도록 합니다.

```python
dbt_run = BashOperator(
    task_id="dbt_run",
    dag=dag,
    bash_command=f"dbt-ol run --consume-structured-logs --project-dir=$TEMP_DIR --profiles-dir=$PROFILES_DIR",
    append_env=True,
    env={
        "OPENLINEAGE_PARENT_JOB_NAMESPACE": "{{ lineage_job_namespace() }}",
        "OPENLINEAGE_PARENT_JOB_NAME": "{{ lineage_job_name(task_instance) }}",
        "OPENLINEAGE_PARENT_RUN_ID": "{{ lineage_run_id(task_instance) }}",
        "OPENLINEAGE_ROOT_PARENT_JOB_NAMESPACE": "{{ lineage_root_job_namespace(task_instance) }}",
        "OPENLINEAGE_ROOT_PARENT_JOB_NAME": "{{ lineage_root_job_name(task_instance) }}",
        "OPENLINEAGE_ROOT_PARENT_RUN_ID": "{{ lineage_root_run_id(task_instance) }}",
    },
)
```

### Spark 작업과 Airflow 작업 연결 {#link-your-spark-jobs-with-airflow-tasks}

<div class="alert alert-info">이 <code>lineage_root_*</code> 매크로를 사용하려면 <code>apache-airflow-providers-openlineage</code> 2.3.0 이상이 필요합니다. 이전 공급자 버전(예: Airflow 2.9.2 및 공급자 2.2.0)의 경우, <a href="#backport-openlineage-lineage-macros-for-older-provider-versions">이전 공급자 버전을 위한 OpenLineage 계보 매크로 백포트</a>를 참조하세요.</div>

OpenLineage 통합은 Airflow의 상위 작업 정보(네임스페이스, 작업 이름, 실행 ID)를 Spark 애플리케이션 속성에 자동으로 주입할 수 있습니다. 이렇게 하면 Airflow 작업과 Spark 작업 간에 상위-하위 관계가 형성되어 한곳에서 두 시스템의 문제를 해결할 수 있습니다.

**참고**: 이 기능을 사용하려면 `apache-airflow-providers-openlineage` 버전 2.1.0 이상이 필요합니다(Airflow 2.9 이상부터 지원).

1. **연산자 호환성 확인**: Spark 연산자가 지원되는지 확인하려면 [Apache Airflow OpenLineage 문서][8]를 참조하세요. 이 기능은 SparkSubmitOperator 및 LivyOperator와 같은 특정 연산자에서만 작동합니다.

2. Spark 작업이 [Data Observability: Jobs Monitoring][2]을 통해 실제로 모니터링되고 있는지 확인합니다.

3. 다음 구성을 설정하여 상위 작업 정보의 자동 주입을 활성화합니다.

```shell
AIRFLOW__OPENLINEAGE__SPARK_INJECT_PARENT_JOB_INFO=true
```

이렇게 하면 지원되는 모든 Spark 연산자에 상위 작업 속성이 자동으로 주입됩니다. 특정 연산자에서 이 기능을 비활성화하려면 해당 연산자에 `openlineage_inject_parent_job_info=False`를 설정하세요.

#### 지원되지 않는 연산자에 상위 작업 정보 수동 주입 {#manually-inject-parent-job-information-for-unsupported-operators}

자동 주입을 지원하지 않는 연산자(예: AWS CLI를 실행하여 Amazon EMR Serverless 작업을 시작하는 `BashOperator`)의 경우, [OpenLineage Airflow 계보 매크로][4]를 사용하여 상위 및 루트 상위 식별자를 Spark 구성 속성으로 전달합니다.

```python
from datetime import datetime

from airflow import DAG
from airflow.operators.bash import BashOperator

with DAG(
    dag_id="emr_serverless_with_openlineage_parent",
    start_date=datetime(2026, 1, 1),
    schedule_interval=None,
    catchup=False,
) as dag:

    submit = BashOperator(
        task_id="start_emr_serverless_job",
        bash_command=r"""
set -euo pipefail

aws emr-serverless start-job-run \
  --application-id <APPLICATION_ID> \
  --execution-role-arn <EXECUTION_ROLE_ARN> \
  --name <JOB_NAME> \
  --region <AWS_REGION> \
  --mode STREAMING \
  --job-driver '{"sparkSubmit": {
    "entryPoint": "<JAR_URL>",
    "entryPointArguments": ["--config-key", "<CONFIG_KEY>", "--stage", "<STAGE>"],
    "sparkSubmitParameters": "\
--conf spark.app.name=<APP_NAME> \
--conf spark.openlineage.parentJobNamespace={{ lineage_job_namespace() }} \
--conf spark.openlineage.parentJobName={{ lineage_job_name(task_instance) }} \
--conf spark.openlineage.parentRunId={{ lineage_run_id(task_instance) }} \
--conf spark.openlineage.rootParentJobNamespace={{ lineage_root_job_namespace(task_instance) }} \
--conf spark.openlineage.rootParentJobName={{ lineage_root_job_name(task_instance) }} \
--conf spark.openlineage.rootParentRunId={{ lineage_root_run_id(task_instance) }}\
"
  }}'
""",
    )
```

### 이전 공급자 버전을 위한 OpenLineage 계보 매크로 백포트 {#backport-openlineage-lineage-macros-for-older-provider-versions}

루트 상위 연결을 위해 최상위 DAG 식별자를 출력하는 `lineage_root_job_namespace`, `lineage_root_job_name` 및 `lineage_root_run_id` 매크로는 `apache-airflow-providers-openlineage` 2.3.0에서 추가되었습니다. 공급자를 업그레이드할 수 없는 경우(예: Airflow 2.9.2의 Amazon MWAA는 공급자 2.2.0으로 고정됨), DAG에 `user_defined_macros`로 누락된 매크로를 정의합니다.

```python
from __future__ import annotations

from datetime import datetime

from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.providers.openlineage import conf as ol_conf
from airflow.providers.openlineage.plugins.adapter import OpenLineageAdapter


def _logical_date(ti):
    return getattr(ti, "logical_date", None) or ti.execution_date


def _clear_number(ti) -> int:
    return ti.get_dagrun().clear_number


def _root_from_conf(ti, key):
    ol = (ti.get_dagrun().conf or {}).get("openlineage") or {}
    return ol.get(key) or None


def lineage_job_namespace():
    return ol_conf.namespace()


def lineage_job_name(ti):
    return f"{ti.dag_id}.{ti.task_id}"


def lineage_run_id(ti):
    return OpenLineageAdapter.build_task_instance_run_id(
        dag_id=ti.dag_id,
        task_id=ti.task_id,
        try_number=ti.try_number,
        logical_date=_logical_date(ti),
        map_index=ti.map_index,
    )


def lineage_root_job_namespace(ti):
    return _root_from_conf(ti, "rootParentJobNamespace") or ol_conf.namespace()


def lineage_root_job_name(ti):
    return _root_from_conf(ti, "rootParentJobName") or ti.dag_id


def lineage_root_run_id(ti):
    forwarded = _root_from_conf(ti, "rootParentRunId")
    if forwarded:
        return forwarded
    return OpenLineageAdapter.build_dag_run_id(
        dag_id=ti.dag_id,
        logical_date=_logical_date(ti),
        clear_number=_clear_number(ti),
    )


OL_MACROS = {
    "lineage_job_namespace": lineage_job_namespace,
    "lineage_job_name": lineage_job_name,
    "lineage_run_id": lineage_run_id,
    "lineage_root_job_namespace": lineage_root_job_namespace,
    "lineage_root_job_name": lineage_root_job_name,
    "lineage_root_run_id": lineage_root_run_id,
}


with DAG(
    dag_id="<YOUR_DAG_ID>",
    start_date=datetime(2026, 1, 1),
    schedule_interval=None,
    catchup=False,
    user_defined_macros=OL_MACROS,
) as dag:
    submit = BashOperator(
        task_id="<YOUR_TASK_ID>",
        bash_command="...",
    )
```

DAG에 `user_defined_macros`를 설정하면 다음 `{{ lineage_*() }}` and `{{ lineage_root_*() }}` 호출이 공급자 2.3.0 이상에 포함된 내장 매크로의 반환값과 일치하는 값으로 해석되므로, 다운스트림 Spark 또는 dbt 작업을 Datadog의 Airflow 루트 상위 작업에 연결할 수 있습니다.

### Jobs Monitoring에서 특정 DAG 제외 {#exclude-specific-dags-from-jobs-monitoring}

<div class="alert alert-info">이 <code>emission_policy</code> 구성을 사용하려면 <code>apache-airflow-providers-openlineage</code> 2.19.0 이상이 필요하며, 해당 버전을 사용하려면 Airflow 2.11 이상이 필요합니다.</div>

특정 DAG가 Datadog으로 OpenLineage 이벤트를 전송하지 않도록 하려면 Airflow 구성의 `[openlineage]` 섹션에 각 DAG에 대한 `emission_policy` 규칙을 추가합니다.

```ini
[openlineage]
emission_policy = [{"scope": {"dag_id": "<YOUR_DAG_ID>"}, "controls": {"emit": false}}]
```

`<YOUR_DAG_ID>`를 제외하려는 DAG의 ID로 바꿉니다.

명명 패턴을 공유하는 여러 DAG를 제외하려면 `match_mode`를 `regex`로 설정합니다.

```ini
[openlineage]
emission_policy = [{"scope": {"dag_id": "^staging_.*"}, "match_mode": "regex", "controls": {"emit": false}}]
```

Airflow 구성 재정의 또는 `AIRFLOW__OPENLINEAGE__EMISSION_POLICY` 환경 변수와 같이 플랫폼의 다른 OpenLineage 공급자 옵션을 설정할 때와 동일한 방식으로 `emission_policy`를 설정합니다. 변경 사항을 적용하려면 Airflow 스케줄러와 Worker를 다시 시작합니다.

추가 적용 범위 및 제어 옵션은 [OpenLineage 이벤트 전송 정책 문서][9]를 참조하세요.


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/data_jobs
[2]: https://app.datadoghq.com/data-jobs/
[3]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#lazy-load-plugins
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/macros.html#lineage-job-run-macros
[5]: https://airflow.apache.org/docs/apache-airflow-providers-apache-spark/stable/_api/airflow/providers/apache/spark/operators/spark_submit/index.html#airflow.providers.apache.spark.operators.spark_submit.SparkSubmitOperator
[6]: https://openlineage.io/docs/integrations/dbt/
[7]: https://docs.aws.amazon.com/mwaa/latest/userguide/samples-dbt.html
[8]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/spark.html#automatic-injection
[9]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/emission_policy.html