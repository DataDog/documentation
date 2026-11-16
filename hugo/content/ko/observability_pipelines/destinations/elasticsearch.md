---
description: Observability Pipelines Worker를 사용하여 Elasticsearch로 로그 또는 메트릭을 전송하는 방법을
  알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: 메트릭
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Elasticsearch 목적지
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 Elasticsearch 목적지를 사용하여 로그 또는 메트릭을 Elasticsearch로 전송합니다.

## 설정 {#setup}

<div class="alert alert-danger">시크릿 관리를 사용하는 경우 Elasticsearch 엔드포인트 URL, 사용자 이름 및 비밀번호의 식별자만 입력합니다. 실제 값을 입력하지 <b>마세요</b>.</div>

[파이프라인을 설정][7]할 때 Elasticsearch 목적지를 구성합니다. [UI][1]에서 또는 [API][8]나 [Terraform][9]을 사용하여 파이프라인을 설정할 수 있습니다. 이 섹션에서 설명한 단계는 UI로 구성했습니다.

파이프라인 UI에서 Elasticsearch 목적지를 선택한 후 다음 단계를 따르세요.

1. Elasticsearch 사용자 이름과 비밀번호의 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. Elasticsearch 엔드포인트 URL의 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. (선택 사항) Elasticsearch 버전을 입력합니다.
1. {{< ui >}}Mode{{< /ui >}} 드롭다운 메뉴에서 {{< ui >}}Bulk{{< /ui >}} 또는 {{< ui >}}Data stream{{< /ui >}}을 선택합니다.
	- {{< ui >}}Bulk{{< /ui >}} 모드
		- Elasticsearch의 [Bulk API][5]를 사용하여 일괄 처리된 이벤트를 표준 인덱스로 직접 전송합니다.
		- 인덱스 명명 및 수명 주기 관리를 직접 제어하려는 경우 이 모드를 선택하세요. 데이터는 지정한 인덱스에 추가되며, 롤오버, 삭제 및 매핑 처리는 사용자가 담당합니다.
		- {{< ui >}}Bulk{{< /ui >}} 모드 구성 방법:
			- (선택 사항) {{< ui >}}Index{{< /ui >}} 필드에 Elasticsearch 인덱스 이름을 입력합니다. [템플릿 구문][3]을 사용하여 로그의 특정 필드를 기반으로 데이터를 다른 인덱스로 동적으로 라우팅할 수 있습니다(예: `logs-{{service}}` 또는 `metrics-{{service}})`.
	- {{< ui >}}Data streams{{< /ui >}} 모드
		- 데이터 저장에 [Elasticsearch Data Streams][4]를 사용합니다. 데이터 스트림은 백킹 인덱스와 롤오버를 자동으로 관리하므로 시계열 로그 데이터를 저장하는 데 적합합니다.
		- Elasticsearch가 인덱스 수명 주기를 관리하도록 하려면 이 모드를 선택하세요. Data streams를 사용하면 인덱스가 원활하게 롤오버되고, 인덱스 수명 주기 관리(ILM)와 호환되며, 시간 기반 데이터를 효율적으로 처리할 수 있습니다.
		- {{< ui >}}Data streams{{< /ui >}} 모드에서 구성하려면 필요시 데이터 스트림 이름을 지정하고 라우팅 및 동기화 설정을 구성합니다.
			1. {{< ui >}}Type{{< /ui >}} 필드에 수집되는 데이터 범주를 입력합니다(예: `logs` or `metrics`.).
			1. {{< ui >}}Dataset{{< /ui >}} 필드에 형식을 지정하거나 데이터 구조를 설명하는 데이터 소스를 입력합니다(예: `apache`.).
			1. {{< ui >}}Namespace{{< /ui >}} 필드에 데이터 스트림을 구성하기 위한 그룹화를 입력합니다(예: `production`.).
			1. {{< ui >}}Auto routing{{< /ui >}} 토글을 활성화하여 이벤트 내용에 따라 데이터 스트림으로 이벤트를 자동 라우팅합니다.
			1. {{< ui >}}Sync fields{{< /ui >}} 토글을 활성화하여 데이터 스트림 필드를 Elasticsearch 인덱스 매핑과 동기화합니다.
			- {{< ui >}}Type{{< /ui >}}, {{< ui >}}Dataset{{< /ui >}}, {{< ui >}}Namespace{{< /ui >}} 필드에 [템플릿 구문][3]을 사용하여 로그나 메트릭의 특정 필드 값을 바탕으로 데이터 스트림 이름을 동적으로 구성할 수 있습니다.
			- UI에는 설정한 데이터 스트림 이름의 미리보기가 표시됩니다. 필드를 비워 두면 로그에는 `logs-generic-default`, 메트릭에는 `metrics-generic-default`가 기본 데이터 스트림 이름으로 사용됩니다. 위 예시 값을 입력한 경우 Worker가 데이터를 기록하는 데이터 스트림의 이름은 다음과 같습니다.
				- `logs-apache-production`(로그용)
				- `metrics-apache-production`(메트릭용)

{{% observability_pipelines/secrets_env_var_note %}}

#### 선택적 설정 {#optional-settings}

##### TLS 활성화 {#enable-tls}

스위치를 {{< ui >}}Enable TLS{{< /ui >}}로 전환합니다.
- 시크릿 관리를 사용하는 경우 키 패스의 식별자를 입력합니다. 필드를 비워둘 때 적용되는 기본값은 [시크릿 기본값](#secret-defaults)을 참조하세요.
- TLS를 사용하려면 다음 인증서 및 키 파일이 필요합니다.
  - `Server Certificate Path`: DER, PEM 또는 CRT(X.509) 형식이며 인증 기관(CA) 루트 파일로 서명된 인증서 파일의 경로입니다.
  - `CA Certificate Path`: DER, PEM 또는 CERT(X.509) 형식의 인증 기관(CA) 루트 인증서 파일 경로입니다.
  - `Private Key Path`: 서버 인증서 경로에 해당하는 `.key` 개인 키 파일의 경로입니다. 파일 형식은 DER, PEM 또는 CERT(PKCS #8)입니다.
  - **참고**:
    - 구성 데이터 디렉터리 `/var/lib/observability-pipelines-worker/config/`가 파일 경로에 자동으로 추가됩니다. 자세한 내용은 [고급 Worker 구성][6]을 참조하세요.
    - 파일은 `observability-pipelines-worker` 그룹 및 사용자가 읽을 수 있어야 합니다.

##### 압축 {#compression}

Elasticsearch 클러스터로 대량의 이벤트를 전송하는 경우 압축을 사용하는 것이 좋습니다.

{{< ui >}}Compression{{< /ui >}}을 활성화하려면 스위치를 전환합니다. 드롭다운 메뉴에서 압축 알고리즘(`gzip`, `snappy`, `zlib`, `zstd`)을 선택합니다. 기본값은 압축 없음입니다.

##### 버퍼링 {#buffering}

{{% observability_pipelines/destination_buffer %}}

##### 고급 옵션 {#advanced-options}

1. {{< ui >}}ID Key{{< /ui >}} 필드에 Elasticsearch에서 문서 ID로 사용할 필드의 이름을 입력합니다.
1. {{< ui >}}Pipeline{{< /ui >}} 필드에 인덱싱 전에 이벤트에 적용할 Elasticsearch 수집 파이프라인의 이름을 입력합니다.
1. 배치의 일부 이벤트는 성공하고 나머지는 실패한 경우 실패한 대량 요청을 재시도하도록 {{< ui >}}Retry partial failures{{< /ui >}} 토글을 활성화합니다.

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- Elasticsearch 엔드포인트 URL 식별자:
	- 기본 식별자는 `DESTINATION_ELASTICSEARCH_ENDPOINT_URL`입니다.
- Elasticsearch 인증 사용자 이름 식별자:
	- 기본 식별자는 `DESTINATION_ELASTICSEARCH_USERNAME`입니다.
- Elasticsearch 인증 비밀번호 식별자:
	- 기본 식별자는 `DESTINATION_ELASTICSEARCH_PASSWORD`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/elasticsearch %}}

{{% /tab %}}
{{< /tabs >}}

## 목적지의 작동 방식 {#how-the-destination-works}

### 이벤트 배치 처리{#event-batching}

이벤트 배치는 다음 중 하나의 파라미터를 충족하면 플러시됩니다. 자세한 내용은 [목적지 이벤트 배치 처리][2]를 참조하세요.

| 최대 이벤트 | 최대 크기(MB) | 시간 초과(초)   |
|----------------|-------------------|---------------------|
| 없음           | 10                | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ko/observability_pipelines/destinations/#event-batching
[3]: /ko/observability_pipelines/destinations/#template-syntax
[4]: https://www.elastic.co/docs/reference/fleet/data-streams
[5]: https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-bulk
[6]: /ko/configuration/install_the_worker/advanced_worker_configurations/
[7]: /ko/observability_pipelines/configuration/set_up_pipelines/
[8]: /ko/api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline