---
app_id: cloudflare
app_uuid: e48a0b64-d3ad-436f-95d3-e0c81e6d51d1
assets:
  dashboards:
    Cloudflare-Overview: assets/dashboards/cloudflare_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check: cloudflare.requests.all
      metadata_path: metadata.csv
      prefix: cloudflare
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 215
    source_type_name: Cloudflare
  monitors:
    '[Cloudflare] Abnormal bandwidth being sent for zone': assets/monitors/bandwidth.json
    '[Cloudflare] Error Rate is higher than normal in zone': assets/monitors/error_rate.json
    '[Cloudflare] Error count is unusually high for worker script': assets/monitors/worker_error.json
    '[Cloudflare] High number of detected threats for zone': assets/monitors/threats.json
    '[Cloudflare] Hit Ratio is abnormally low for zone': assets/monitors/hit_ratio.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 메트릭
- 로그 수집
- 캐싱(caching)
- 보안
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: cloudflare
integration_id: cloudflare
integration_title: Cloudflare
integration_version: ''
is_public: true
kind: 통합
manifest_version: 2.0.0
name: cloudflare
public_title: Cloudflare
short_description: Cloudflare 웹 트래픽 및 DNS 메트릭을 추적하세요.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - 카테고리::메트릭
  - 카테고리::로그 수집
  - 카테고리::캐싱(Caching)
  - 카테고리::보안
  configuration: README.md#Setup
  description: Cloudflare 웹 트래픽 및 DNS 메트릭을 추적하세요.
  media:
  - caption: Cloudflare 개요 대시보드
    image_url: images/overview-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cloudflare
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Cloudflare와 통합하여 웹 트래픽, DNS 쿼리, 위협에 대한 통찰을 비롯한 영역 메트릭을 확보하세요. 본 통합은 [Cloudflare 분석 API][1]을 기반으로 합니다.

바로 사용할 수 있는 대시보드를 제공하여 애플리케이션의 보안과 성능을 향상시켜 드립니다. 단일 패널에서 다음에 대한 가시성을 확보할 수 있습니다.

- 보안 위협
- HTTP 요청량 및 오류율
- 라운드트립 시간 및 트래픽 플로우 변경 사항이 포함된 로드 밸런싱
- 작업자 스크립트의 성능 문제

풍부한 로그 정보와 자세한 메트릭으로 Cloudflare 인프라스트럭처에 대한 심층적인 통찰을 얻어 문제 해결에 필요한 컨텍스트를 구축할 수 있습니다.

통합은 [Datadog 클라우드 보안 정보와 이벤트 관리(SIEM)][2]와 함께 동작하여 다음 사항에 대해 즉시 활용할 수 있는 위협 탐지 기능을 제공합니다.
- 불가능한 이동
- 위험한 설정 오류
- DDoS 공격

IP 주소 차단 또는 Datadog에서 케이스 생성 등, 포함된 워크플로우 자동화 청사진을 활용하여 더욱 신속하게 보안 위협을 완화할 수 있습니다.

## 설정

설정 시작 전에 [Datadog 계정][3]과 [API 키][4]가 있어야 하며, [Cloudflare Logpush][5]를 사용할 수 있어야 합니다(엔터프라이즈 계정 요금제 필요).

Cloudflare API 토큰을 사용한다면 **영역(Zone)** > **영역(Zone)** > **읽기(Read)** 및 **영역(Zone)** > **분석(Analytics)** > **읽기(Read)** 권한이 있는지 확인하세요.

### 설치

Datadog [Cloudflare 통합 타일][6]과 같이 통합을 설치합니다.

### 설정

1. Datadog [Cloudflare 통합 타일][6]의 **설정** 탭으로 이동합니다.
2. 모니터링하고 싶은 계정의 이메일 주소와 API 키 또는 토큰을 입력합니다. Cloudflare API 키와 API 토큰은 **내 프로필** > **API 토큰**의 Cloudflare 계정에서 확인할 수 있습니다.
3. 계정 이름을 추가합니다. 해당 이름은 임의의 이름이며 메트릭의 `account` 태그에서 사용됩니다.

### 로그 수집

Cloudflare는 고객이 Cloudflare Logpush를 사용하여 로그를 Datadog으로 직접 푸시할 수 있도록 도와드립니다. [Cloudflare API](#cloudflare-api) 또는 [Cloudflare 대시보드](#cloudflare-dashboard)에서 로그 푸시 작업을 관리할 수 있습니다.

Cloudflare 통합 파이프라인을 설치하면 특정 속성을 자동으로 리매핑합니다. 리매핑되는 속성을 확인하려면 다음 단계를 따르세요.

1. [로그 파이프라인][7]으로 이동합니다.
2. 오른쪽 상단의 **파이프라인 라이브러리 찾기**를 클릭합니다.
3. 검색 바에 `Cloudflare`을 입력합니다.
4. 리매퍼(remapper) 및 기타 설치된 프로세서의 목록을 보려면 **Cloudflare**를 클릭하세요.

#### Cloudflare API

1. Logpush 작업 엔드포인트에 POST 요청을 보내 Logpush 작업을 생성합니다. 다음 필드를 포함하세요.
    * `name` (옵션): 도메인 이름을 작업 이름으로 사용합니다.
    * `destination_conf`: 다음 파라미터를 구성하는 로그 대상입니다.
        * `<DATADOG_ENDPOINT_URL>`: Datadog HTTP 로그 수집 엔드포인트입니다. 엔드포인트는 `http-intake.logs.{{< region-param key="dd_site" >}}/v1/input`입니다.
        * `<DATADOG_API_KEY>`: Datadog API 키입니다.
        * `ddsource`: `cloudflare`로 설정합니다.
        * `service`(옵션): 서비스 이름을 지정합니다.
        * `host`(옵션): 호스트 이름을 지정합니다.
        * `ddtags`(옵션): 태그를 지정합니다.
    * `dataset`: 수신하려는 로그의 카테고리입니다. 지원 데이터 집합 목록을 보려면 [Cloudflare 로그 필드][8]를 참조하세요.
    * `logpull_options`(옵션): 필드, 샘플 속도 및 타임스탬프 형식을 설정하려면 [Logpush API 옵션][9]을 참조하세요. Datadog은 Cloudflare이 사용하는 기본 옵션인 **RFC 3339 형식의 타임스탬프** 사용을 의무화합니다.

    **요청 예시**:

    ```bash
    curl -s -X POST 'https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs' \
    --header 'X-Auth-Key: <CLOUDFLARE_AUTH_KEY>' \
    --header 'X-Auth-Email: <CLOUDFLARE_AUTH_EMAIL>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
       "name": "<NAME>",
       "destination_conf": "datadog://<DATADOG_ENDPOINT_URL>?header_DD-API-KEY=<DATADOG_API_KEY>&ddsource=cloudflare&service=cloudflare&ddtags=env:dev",
       "logpull_options": "fields=RayID,EdgeStartTimestamp&timestamps=rfc3339",
       "dataset": "http_requests"
    }'
    ```

    **응답 예시**:

    ```bash
    {
     "errors": [],
     "messages": [],
     "result": {
       "id": 100,
       "dataset": "http_requests",
       "enabled": false,
       "name": "<DOMAIN_NAME>",
       "logpull_options": "fields=RayID,EdgeStartTimestamp&timestamps=rfc3339",
       "destination_conf": "datadog://http-intake.logs.{{< region-param key="dd_site" >}}/v1/input?header_DD-API-KEY=<DD-API-KEY>&ddsource=cloudflare&service=cloudflare&ddtags=env:dev",
       "last_complete": null,
       "last_error": null,
       "error_message": null
     },
     "success": true
    }
    ```

    `id`의 값을 기록해 두세요. 위의 예시에서는 `100`입니다.

2. 작업을 활성화합니다. 응답 반환된 작업 ID를 사용하여 요청 본문의 `{"enabled": true}`를 전송하세요.

    **요청 예시**:

    ```bash
    curl -s -X PUT \
    https://api.cloudflare.com/client/v4/zones/<ZONE_ID>/logpush/jobs/<JOB_ID> -d'{"enabled":true}' | jq .
    ```

    **응답 예시**:

    ```bash
    {
      "errors": [],
      "messages": [],
      "result": {
        "id": 100,
        "dataset": "http_requests",
        "enabled": true,
        "name": "<DOMAIN_NAME>",
        "logpull_options": "fields=RayID,EdgeStartTimestamp&timestamps=rfc3339",
        "destination_conf": "datadog://{{< region-param key="dd_site" >}}?header_DD-API-KEY=<DATADOG-API-KEY>",
        "last_complete": null,
        "last_error": null,
        "error_message": null
      },
      "success": true
    }
    ```

#### Cloudflare 대시보드

1. 서비스를 Cloudflare 대시보드의 Logpush 섹션에 연결한 다음 데이터셋과 데이터 필드를 선택하고 대상 선택에서 Datadog을 선택합니다.
2. **대상 정보 입력**에서 다음 Datadog URL 엔드포인트를 입력합니다.

    ```
    http-intake.logs.{{< region-param key="dd_site" >}}/api/v2/logs?ddsource=cloudflare
    ```
    **참고**: `ddsource=cloudflare`는 필수 항목입니다. 로그를 구분하기 위해 `service`, `host`, `ddtags`의 옵션 파라미터를 추가할 수도 있습니다.

    **예**:

    ```
    http-intake.logs.{{< region-param key="dd_site" >}}/api/v2/logs?service=<SERVICE>&host=<HOST>&ddsource=cloudflare
    ```

3. Datadog Cloudflare 통합 타일 설정에 사용한 Datadog API 키를 입력합니다.
4. 접근 권한이 확인되면 **소유권 증명**에 "푸시 준비 완료!"가 표시됩니다. `Push`을 클릭하여 완료합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "cloudflare" >}}


#### 권한
Cloudflare API 토큰에 다음의 권한이 활성화되어 있는지 확인합니다.

| 범위       | 권한         |   상태    |
| ----------- | ------------------ | ----------- |
| 계정     | 계정 분석  |    읽기     |
| 계정     | 계정 설정    |    읽기     |
| 계정     | 작업자 스크립트     |    읽기     |
| 영역(Zone)        | 영역(Zone)               |    읽기     |
| 영역(Zone)        | 분석          |    읽기     |
| 영역(Zone)        | 작업자 경로      |    읽기     |
| 영역(Zone)        | 로드 밸런서     |    읽기     |

### 이벤트

Cloudflare 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Cloudflare 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][11]에 문의하세요.

[1]: https://api.cloudflare.com/#zone-analytics-dashboard
[2]: https://docs.datadoghq.com/ko/security/cloud_siem/
[3]: https://www.datadoghq.com/free-datadog-trial/
[4]: /ko/account_management/api-app-keys/#api-keys
[5]: https://developers.cloudflare.com/logs/about
[6]: https://app.datadoghq.com/account/settings#integrations/cloudflare
[7]: https://app.datadoghq.com/logs/pipelines
[8]: https://developers.cloudflare.com/logs/log-fields
[9]: https://developers.cloudflare.com/logs/logpush/logpush-configuration-api/understanding-logpush-api#options
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/cloudflare/cloudflare_metadata.csv
[11]: https://docs.datadoghq.com/ko/help/