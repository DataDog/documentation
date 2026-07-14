---
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Databricks(Zerobus) 목적지
---
{{< product-availability >}}

{{< callout url="#"
 btn_hidden="true" header="미리 보기에 참여하세요!">}}
Databricks(Zerobus) 목적지는 미리 보기로 제공되고 있습니다. 액세스 권한을 요청하려면 계정 관리자에게 문의하세요.
{{< /callout >}}

## 개요 {#overview}

Observability Pipelines의 Databricks(Zerobus) 목적지를 사용하여 로그를 Databricks Unity Catalog 표로 전송하세요. 목적지는 로그를 [Zerobus Ingest API][1]로 스트리밍하고 OAuth 서비스 주체를 사용하여 Databricks에 인증합니다.

## 전제 조건 {#prerequisites}

Databricks(Zerobus) 목적지를 구성하기 전에 다음을 수행해야 합니다.

- [Observability Pipelines Worker가 로그를 기록할 Unity Catalog 스키마 및 표](#set-up-a-schema-and-table)을 설정하세요.
- [Worker가 Databricks에 인증하는 데 사용할 서비스 주체](#set-up-a-service-principal)를 설정하세요. 서비스 주체는 표에 대한 읽기 및 쓰기 권한이 필요합니다.

### 스키마 및 표 설정 {#set-up-a-schema-and-table}

이 섹션의 SQL 예에서는 다음과 같은 자리 표시자를 사용합니다.

| 자리 표시자               | 설명                                | 예                    |
|---------------------------|--------------------------------------------|----------------------------|
| `<USER>`                  | 스키마와 표를 생성하는 사용자입니다. | `databricks-user@example.com` |
| `<CATALOG_NAME>`          | Unity Catalog 이름입니다.                    | `main`                     |
| `<SCHEMA_NAME>`           | 스키마 이름입니다.                           | `obs_pipelines`            |
| `<TABLE_NAME>`            | 표 이름입니다.                            | `apache_common_logs`       |
| `<YOUR_MANAGED_LOCATION>` | (선택 사항) 관리되는 위치 URI입니다.       | `s3://your-bucket/managed` |

**참고**: `GRANT` 명령은 Databricks 작업 공간 관리자가 실행해야 합니다.

Databricks 작업 공간에서:

1. Databricks 작업 공간 관리자가 아닌 경우, 관리자에게 다음 명령을 실행하여 스키마 생성 권한을 부여해 달라고 요청하세요.
    ```sql
    GRANT CREATE SCHEMA ON CATALOG <CATALOG_NAME> TO <USER>;
    ```

1. 스키마를 생성합니다.
    ```sql
    CREATE SCHEMA IF NOT EXISTS <CATALOG_NAME>.<SCHEMA_NAME>
    MANAGED LOCATION '<YOUR_MANAGED_LOCATION>';
    ```
    - **Note**: `MANAGED LOCATION` is optional. See Databricks' [Create Schemas][2] documentation for more information.

1. 관리자가 아닌 경우, 관리자에게 다음 명령을 실행하여 스키마에서 표를 생성할 권한을 부여해 달라고 요청하세요.
    ```sql
    GRANT CREATE TABLE ON SCHEMA <CATALOG_NAME>.<SCHEMA_NAME> TO <USER>;
    ```

1. Observability Pipelines가 로그 데이터를 기록하는 표를 생성하려면 다음 명령을 실행하세요.
    ```sql
    CREATE TABLE <CATALOG_NAME>.<SCHEMA_NAME>.<TABLE_NAME> (
      host STRING,
      message STRING,
      service STRING,
      source_type STRING,
      timestamp TIMESTAMP
    );
    ```
    - See Databricks' [Create a Unity Catalog Managed Table][3] documentation for more information.

정규화된 전체 표 이름은 `catalog.schema.table`이며, 예를 들어 `main.obs_pipelines.apache_common_logs`입니다. Observability Pipelines Databricks 목적지를 설정할 때 **표 이름**에 입력하는 값입니다.

### 서비스 주체 설정 {#set-up-a-service-principal}

Databricks [Zerobus Ingest API][1]는 OAuth 인증을 사용합니다. 서비스 주체를 생성하면 OAuth 클라이언트 시크릿이 생성되고 OAuth 클라이언트 ID는 서비스 주체의 UUID입니다.

서비스 주체를 생성하려면 다음 단계를 따르세요.

1. Databricks 작업 공간에서 **User Settings** > **Identity and access** > **Service principals**로 이동하세요.
1.  **Add service principal**을 클릭하세요.
1. 서비스 주체가 생성된 후, 이를 위한 OAuth 시크릿을 생성하세요.
    - 서비스 주체의 **Application ID**(클라이언트 ID)와 OAuth 클라이언트 시크릿을 기록해 두세요. Observability Pipelines Databricks 목적지를 구성할 때 이 2가지 정보가 모두 필요합니다.
1. Databricks에서 이 SQL을 실행하여 서비스 주체에 카탈로그, 스키마 및 표에 대한 접근 권한을 부여하세요. `<SERVICE_PRINCIPAL_UUID>`를 이전 단계에서 확인한 서비스 주체의 애플리케이션 ID로 바꿉니다.
    ```sql
    GRANT USE CATALOG ON CATALOG <CATALOG_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    GRANT USE SCHEMA ON SCHEMA <CATALOG_NAME>.<SCHEMA_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    GRANT SELECT, MODIFY ON TABLE <CATALOG_NAME>.<SCHEMA_NAME>.<TABLE_NAME> TO <SERVICE_PRINCIPAL_UUID>;
    ```

자세한 내용은 Databricks의 [계정에 서비스 주체 추가][4] 및 [객체에 대한 권한 부여][5] 문서를 참조하세요.

## 설정 {#setup}

파이프라인을 [설정할 때][6] Databricks(Zerobus) 목적지를 구성하세요. 파이프라인은 [UI][7]에서 설정할 수 있으며, [API][8] 또는 [Terraform][9]을 사용하여 설정할 수 있습니다. 이 섹션에서는 UI를 기준으로 단계를 설명합니다.

**참고**: 표 스키마에 없는 로그 필드는 삭제됩니다. 예를 들어 로그에 `id`, `name`, `host` 필드가 있고 표 스키마에 `name` 및 `host` 열만 포함되어 있다면 `id` 필드는 삭제되어 표에 기록되지 않습니다.

파이프라인 UI에서 Databricks(Zerobus) 목적지를 선택한 후:

<div class="alert alert-warning">Databricks(Zerobus)는 문자열 형식의 타임스탬프를 Databricks의 <a href="https://docs.databricks.com/aws/en/sql/language-manual/data-types/timestamp-type"><code>TIMESTAMP</code> 유형</a>으로 변환하지 않습니다. 표에 타임스탬프 열을 사용하는 경우, 자세한 내용은 <a href="#convert-string-timestamps-to-timestamp-format">문자열 타임스탬프를 타임스탬프 형식으로 변환하기</a>를 참조하세요.</div>

<div class="alert alert-danger">시크릿 관리: OAuth 클라이언트 시크릿의 식별자만 입력하세요. 실제 값은 입력하지 <b>마세요.</b></div>

{{% observability_pipelines/secrets_env_var_note %}}

1. Databricks 작업 공간의 **수집 엔드포인트**(예: `https://<workspace_id>.zerobus.<region>.cloud.databricks.com`)를 입력하세요. Worker는 이 엔드포인트로 로그를 전송합니다.
1. **표 이름**을 `catalog.schema.table` 형식으로 입력합니다(예: `main.obs_pipelines.apache_common_logs`).
1. Databricks 작업 공간의 **Unity Catalog 엔드포인트**(예: `https://<workspace>.cloud.databricks.com`)를 입력하세요. Worker는 이 엔드포인트를 사용하여 표의 스키마를 읽습니다.
1. **인증 - 클라이언트 ID** 필드에 서비스 주체의 애플리케이션 ID(예: `abcdefgh-1234-5678-abcd-ef0123456789`)를 입력하세요.
1. 인증 - 클라이언트 시크릿**** 필드에 OAuth 클라이언트 시크릿의 식별자를 입력하세요. 비워두면 [기본값](#secret-defaults)이 사용됩니다.

### 선택적 설정 {#optional-settings}

#### 버퍼링 {#buffering}

{{% observability_pipelines/destination_buffer %}}

### 문자열 타임스탬프를 타임스탬프 형식으로 변환 {#convert-string-timestamps-to-timestamp-format}

로그에 문자열 형식의 타임스탬프가 있고 Databricks 표에 [`TIMESTAMP` 유형][11]으로 선언된 타임스탬프 열이 있는 경우, 로그를 Databricks(Zerobus) 목적지로 전송하기 전에 문자열을 타임스탬프 형식으로 변환해야 합니다. Databricks(Zerobus)는 타임스탬프 형식을 `TIMESTAMP` 유형으로만 변환할 수 있습니다.

문자열 타임스탬프를 변환하지 않으면 Worker가 다음과 유사한 오류를 발생시킵니다.

```
Protobuf encoding failed: Error converting timestamp field: Can't convert '2012-04-23T10[41]15Z' to i64: invalid digit found in string
```

문자열 형식의 타임스탬프를 타임스탬프 형식으로 변환하려면 다음 단계를 따르세요.

1. 파이프라인에 [사용자 정의 프로세서][12]를 추가합니다.
1. 다음과 같은 사용자 정의 스크립트가 포함된 함수를 추가합니다.
    ```
    .timestamp = parse_timestamp!(.timestamp, format: "%+")
    ```
    See [parse_timestamp][13] for more information.

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- Databricks OAuth 클라이언트 시크릿 식별자:
    - Observability Pipelines Worker가 Databricks에 인증하는 데 사용하는 서비스 주체의 OAuth 클라이언트 시크릿을 참조합니다.
    - 기본 식별자는 `DESTINATION_DATABRICKS_ZEROBUS_OAUTH_CLIENT_SECRET`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/databricks_zerobus %}}

{{% /tab %}}
{{< /tabs >}}

## 목적지가 작동하는 방식 {#how-the-destination-works}

### 이벤트 배치 {#event-batching}

이벤트 배치는 다음 중 하나의 파라미터를 충족하면 플러시됩니다. 자세한 내용은 [이벤트 배치][10]를 참조하세요.

| 최대 이벤트 | 최대 크기(MB) | 타임아웃(초)   |
|----------------|-------------------|---------------------|
| 없음           | 10                | 1                   |

[1]: https://docs.databricks.com/aws/en/ingestion/zerobus-overview
[2]: https://docs.databricks.com/aws/en/schemas/create-schema
[3]: https://docs.databricks.com/aws/en/tables/managed#create-a-managed-table
[4]: https://docs.databricks.com/aws/en/admin/users-groups/manage-service-principals#-add-service-principals-to-your-account
[5]: https://docs.databricks.com/aws/en/data-governance/unity-catalog/manage-privileges/?language=Catalog%C2%A0Explorer#-grant-permissions-on-an-object
[6]: /ko/observability_pipelines/configuration/set_up_pipelines/
[7]: https://app.datadoghq.com/observability-pipelines
[8]: /ko/api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[10]: /ko/observability_pipelines/destinations/#event-batching
[11]: https://docs.databricks.com/aws/en/sql/language-manual/data-types/timestamp-type
[12]: /ko/observability_pipelines/processors/custom_processor#setup
[13]: /ko/observability_pipelines/processors/custom_processor/#parse_timestamp