---
aliases:
- /ko/real_user_monitoring/data_collected/
- /ko/real_user_monitoring/data_collected/view/
- /ko/real_user_monitoring/data_collected/resource/
- /ko/real_user_monitoring/data_collected/long_task/
- /ko/real_user_monitoring/data_collected/error/
- /ko/real_user_monitoring/data_collected/user_action/
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: 블로그
  text: Datadog 실제 사용자 모니터링 소개
- link: /real_user_monitoring/browser/modifying_data_and_context
  tag: 설명서
  text: RUM 데이터 수정 및 컨텍스트 추가
- link: /real_user_monitoring/explorer/
  tag: 설명서
  text: Datadog에서 보기 탐색
- link: /real_user_monitoring/explorer/visualize/
  tag: 설명서
  text: 이벤트에 시각화 적용
- link: /logs/log_configuration/attributes_naming_convention
  tag: 설명서
  text: Datadog 표준 속성
title: 수집된 RUM 브라우저 데이터
---

## 개요

RUM Browser SDK는 연관된 메트릭과 속성이 있는 이벤트를 생성합니다. 모든 RUM 이벤트에는 [기본 속성](#default-attributes)이 있으며, 페이지의 URL(`view.url`), 디바이스 유형(`device.type`) 및 국가(`geo.country`)와 같은 사용자 정보입니다.

추가적으로 [특정 이벤트 유형에 대한 메트릭 및 속성](#event-specific-metrics-and-attributes)이 있습니다. 예를 들어, `view.loading_time` 메트릭은 보기 이벤트와 연결되고 `resource.method` 속성은 리소스 이벤트와 연결됩니다.

| 이벤트 유형     | 보존 | 설명                                                                                                                                                                                                                                                   |
|----------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 세션   | 30일   | 사용자 세션은 사용자가 웹 애플리케이션을 탐색하기 시작할 때 시작됩니다. 사용자 세션에는 브라우저, 디바이스, 지리적 위치 등 사용자에 대한 높은 수준의 정보가 포함됩니다. 사용자가 사용하는 동안 수집된 모든 RUM 이벤트를 고유한 `session.id` 속성으로 집계합니다. **참고: 세션은 15분 동안 활동이 없으면 재설정됩니다. |
| 보기      | 30일   | 보기 이벤트는 사용자가 웹 애플리케이션의 페이지를 방문할 때마다 생성됩니다. 사용자가 동일한 페이지에 머무는 동안 리소스, 긴 작업, 오류 및 액션 이벤트는 `view.id` 속성을 사용하여 관련 RUM 보기에 연결됩니다.                       |
| 리소스  | 15일   | 리소스 이벤트는 웹페이지에 로드된 이미지, XHR, Fetch, CSS 또는 JS 라이브러리에 대해 생성됩니다. 여기에는 자세한 로딩 타이밍 정보가 포함됩니다.                                                                                                              |
| 긴 작업 | 15일   | 50밀리초 이상 메인 스레드를 차단하는 브라우저의 모든 작업에 대해 긴 작업 이벤트가 생성됩니다.                                                                                                                                                    |
| 에러     | 30일   | RUM은 브라우저에서 발생하는 모든 프론트엔드 오류를 수집합니다.                                                                                                                                                                                                     |
| 액션    | 30일   | RUM 액션 이벤트는 사용자가 사용하는 동안의 상호 작용을 추적하며 커스텀 사용자 액션을 모니터링하기 위해 수동으로 전송할 수도 있습니다.                                                                                                                                 |

다음 다이어그램은 RUM 이벤트 계층 구조를 보여줍니다:

{{< img src="real_user_monitoring/data_collected/event-hierarchy.png" alt="RUM 이벤트 계층 구조" style="width:50%;border:none" >}}


## 기본 속성

이러한 각 이벤트 유형에는 기본적으로 다음 속성이 첨부되어 있으므로 쿼리되는 RUM 이벤트 유형에 관계없이 사용할 수 있습니다.

### 코어

| 속성 이름   | 유형   | 설명                 |
|------------------|--------|-----------------------------|
| `type`     | 문자열 | 이벤트 유형 (예: `view` 또는 `resource`).             |
| `application.id` | 문자열 | RUM 애플리케이션을 만들 때 생성되는 Datadog 애플리케이션 ID. |
| `application.name` | 문자열 | Datadog 애플리케이션의 이름. |
| `service`     | 문자열 | 서비스란 브라우저 애플리케이션에서 특정 기능을 제공하는 팀에서 구축한 페이지 집합을 의미합니다. [수동 보기 추적][1]을 사용하여 웹 페이지를 서비스에 할당할 수 있습니다.             |

### 보기 속성

RUM 액션, 오류, 리소스 및 긴 작업 이벤트에는 수집 시 활성 RUM 보기 이벤트에 대한 정보가 포함됩니다:

| 속성 이름                 | 유형   | 설명                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `view.id`                      | 문자열 | 각 페이지 뷰에 대해 임의로 생성된 ID.                                                                      |
| `view.loading_type`                     | 문자열 | 페이지 로드 유형: `initial_load`또는 `route_change`. 자세한 내용은 [단일 페이지 애플리케이션 지원 설명서][2]를 참조하세요.|
| `view.referrer`                | 문자열 | 현재 요청된 페이지로 연결되는 링크를 따르는 이전 웹 페이지의 URL.               |
| `view.url`                     | 문자열 | 보기 URL.                                                                                                  |
| `view.url_hash`                     | 문자열 | URL의 해시 부분.|
| `view.url_host`        | 문자열 | URL의 호스트 부분.                                                                                |
| `view.url_path`        | 문자열 | URL의 경로 부분.                                                                                 |
| `view.url_path_group`  | 문자열 | 유사한 URL(예: `/dashboard/123`및 `/dashboard/456`의 경우 `/dashboard/?`)에 대해 생성된 자동 URL 그룹. |
| `view.url_query` | object | URL의 쿼리 문자열 부분이 쿼리 파라미터 키/값 속성으로 분해됩니다.                        |
| `view.url_scheme` | 오브젝트 | URL의 스키마 부분.                        |

### 디바이스

다음 디바이스 관련 속성은 Datadog에서 수집하는 모든 이벤트에 자동으로 첨부됩니다:

| 속성 이름                           | 유형   | 설명                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `device.type`       | 문자열 | 디바이스에서 보고한 디바이스 유형 (User-Agent HTTP 헤더).      |
| `device.brand`  | 문자열 | 디바이스에서 보고한 디바이스 브랜드 (User-Agent HTTP 헤더).  |
| `device.model`   | 문자열 | 디바이스에서 보고한 디바이스 모델 (User-Agent HTTP 헤더).   |
| `device.name` | 문자열 | 디바이스에서 보고한 디바이스 이름 (User-Agent HTTP 헤더). |

### 운영체제

다음 OS 관련 특성은 Datadog에서 수집하는 모든 이벤트에 자동으로 첨부됩니다:

| 속성 이름                           | 유형   | 설명                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `os.name`       | 문자열 | 디바이스에서 보고한 OS 이름 (User-Agent HTTP 헤더).       |
| `os.version`  | 문자열 | 디바이스에서 보고한 OS 버전 (User-Agent HTTP 헤더).  |
| `os.version_major`   | 문자열 | 디바이스에서 보고한 OS 버전 (User-Agent HTTP 헤더).   |

### 지리적 위치

IP 주소의 지리적 위치와 관련된 속성은 다음과 같습니다:

| 이름                                    | 유형   | 설명                                                                                                                          |
|:--------------------------------------------|:-------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `geo.country`         | 문자열 | 국가 이름.                                                                                                                  |
| `geo.country_iso_code`     | 문자열 | 국가의 [ISO 코드][3] (예: `US`는 미국 또는 `FR`은 프랑스).                                                  |
| `geo.country_subdivision`     | 문자열 | 국가의 첫 번째 세분 수준 이름 (예: 미국에서 `California` 또는 프랑스에서 `Sarthe` 부서). |
| `geo.continent_code`       | 문자열 | 대륙의 ISO 코드 (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`).                                                                 |
| `geo.continent`       | 문자열 | 대륙의 이름 (`Europe`, `Australia`, `North America`, `Africa`, `Antarctica`, `South America`, `Oceania`).                    |
| `geo.city`            | 문자열 | 도시 이름 (예, `Paris` 또는 `New York`).                                                                                   |

**참고**: 기본적으로 Datadog은 클라이언트 IP 주소를 저장합니다. 사용자 데이터 자동 수집 관리 방법에 대한 자세한 내용은 [실제 사용자 모니터링 데이터 보안][4]에서 확인할 수 있습니다.

### 사용자 속성

기본 속성 외에도 [사용자 세션 식별][5]을 통해 모든 RUM 이벤트 유형에 사용자 관련 데이터를 추가할 수 있습니다. 이를 통해 특정 사용자의 활동을 추적하고, 어떤 사용자가 오류의 영향을 가장 많이 받는지 파악하며, 가장 중요한 사용자의 성능을 모니터링할 수 있습니다.

### 기능 플래그 속성

{{< callout btn_hidden="true" header="기능 플래그 추적 베타 버전에 참여하세요!">}}
기능 플래그 추적 베타 버전에 참여하려면 <a href="/real_user_monitoring/guide/setup-feature-flag-data-collection/">데이터 수집을 설정하세요</a>.
{{< /callout >}}

성능 모니터링에 대한 추가적인 컨텍스트와 가시성을 확보하기 위해 [기능 플래그를 사용하여 RUM 이벤트 데이터를 강화][6]할 수 있습니다. 이를 통해 어떤 사용자에게 특정 사용자 경험이 표시되는지, 그리고 해당 경험이 사용자의 성능에 부정적인 영향을 미치는지 확인할 수 있습니다.

## 이벤트별 메트릭 및 속성

### 세션 메트릭

| 메트릭  | 유형   | 설명                |
|------------|--------|----------------------------|
| `session.time_spent` | 숫자 (ns) | 사용자 세션의 기간. |
| `session.view.count`        | 숫자      | 이 세션에 대해 수집된 모든 보기의 수. |
| `session.error.count`      | 숫자      | 이 세션에 대해 수집된 모든 오류의 수.  |
| `session.resource.count`         | 숫자      | 이 세션에 대해 수집된 모든 리소스의 수. |
| `session.action.count`      | 숫자      | 이 세션에 대해 수집된 모든 액션의 수. |
| `session.long_task.count`      | 숫자      | 이 세션에 대해 수집된 모든 긴 작업의 수. |

### 세션 속성

| 속성 이름                 | 유형   | 설명                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `session.id`                      | 문자열 | 각 세션에 대해 임의로 생성된 ID.                                                                      |
| `session.ip`                      | 문자열 | 클라이언트 IP 주소. 이 속성의 수집을 중지하려면 [애플리케이션 상세 정보][7]에서 설정을 변경하세요.                                                                       |
| `session.is_active`                      | 부울 | 세션이 현재 활성 상태인지 여부를 나타냅니다. 세션은 4시간 동안 활동하거나 15분 동안 활동하지 않으면 종료됩니다.                                                                     |
| `session.type`                     | 문자열 | 세션 유형: `user`또는`synthetics`. [Synthetic 모니터링 브라우저 테스트][8]의 세션은 청구에서 제외됩니다. |
| `session.referrer`                | 문자열 | 현재 요청된 페이지로 연결되는 링크를 따르는 이전 웹 페이지의 URL. |
| `session.initial_view.id`        | 문자열 | 사용자가 생성한 첫 번째 RUM 보기의 ID. |
| `session.initial_view.url_host`        | 문자열 | URL의 호스트 부분. |
| `session.initial_view.url_path`        | 문자열 | URL의 경로 부분. |
| `session.initial_view.url_path_group`  | 문자열 | 유사한 URL(예: `/dashboard/123`및 `/dashboard/456`의 경우 `/dashboard/?`)에 대해 생성된 자동 URL 그룹. |
| `session.initial_view.url_query` | 오브젝트 | URL의 쿼리 문자열 부분이 쿼리 파라미터 키/값 속성으로 분해됩니다. |
| `session.initial_view.url_scheme` | 오브젝트 | URL의 스키마 부분. |
| `session.last_view.id`        | 문자열 | 사용자가 생성한 마지막 RUM 보기의 ID. |
| `session.last_view.url_host`        | 문자열 | URL의 호스트 부분. |
| `session.last_view.url_path`        | 문자열 | URL의 경로 부분. |
| `session.last_view.url_path_group`  | 문자열 | 유사한 URL(예: `/dashboard/123`및 `/dashboard/456`의 경우 `/dashboard/?`)에 대해 생성된 자동 URL 그룹. |
| `session.last_view.url_query` | 오브젝트 | URL의 쿼리 문자열 부분이 쿼리 파라미터 키/값 속성으로 분해됩니다. |
| `session.last_view.url_scheme` | 오브젝트 | URL의 스키마 부분. |

### 타이밍 메트릭 보기
**참고**: 보기 타이밍 메트릭은 백그라운드에서 페이지가 열리는 시간을 포함합니다.

| 속성                       | 유형        | 설명                                                                                                                                                                                                           |
|---------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`               | 숫자 (ns) | 현재 보기에 소요된 시간.                                                                                                                                                                                       |
| `view.first_byte`               | 숫자 (ns) | 보기의 첫 번째 바이트가 수신될 때까지 경과된 시간.                                                                                                |
| `view.largest_contentful_paint` | 숫자 (ns) | 뷰포트(화면에 표시)에서 가장 큰 DOM 객체가 렌더링되는 페이지 로드의 시간.                                                                                                |
| `view.first_input_delay`        | 숫자 (ns) | 사용자가 페이지와 처음 상호 작용한 후 브라우저의 응답까지 경과한 시간.                                                                                                                             |
| `view.cumulative_layout_shift`  | 숫자      | 동적으로 로드된 콘텐츠(예: 타사 광고)로 인한 예기치 않은 페이지 이동을 정량화하며, `0`은 이동이 일어나지 않음을 의미합니다.                                                                               |
| `view.loading_time`             | 숫자 (ns) | 페이지가 준비될 때까지의 시간이며 현재 네트워크 요청이나 DOM 변이가 발생하지 않습니다. 자세한 내용은 [페이지 성능 모니터링][9]에서 확인하세요.                                                                             |
| `view.first_contentful_paint`   | 숫자 (ns) | 브라우저가 텍스트, 이미지(배경 이미지 포함), 흰색이 아닌 캔버스 또는 SVG를 처음 렌더링하는 시간입니다. 브라우저 렌더링에 대한 자세한 내용은 [w3c 정의][10]를 참조하세요.                               |
| `view.dom_interactive`          | 숫자 (ns) | 파서(parser)가 메인 문서에 대한 작업을 완료할 때까지의 시간입니다. [MDN 문서에서 자세한 내용을 확인하세요][11].                                                                                                         |
| `view.dom_content_loaded`       | 숫자 (ns) | 로드 이벤트가 발생해 최초의 HTML 문서가 렌더링 이외의 블로킹 스타일 시트, 이미지, 서브프레임의 로드 완료를 기다리지 않고 완전하게 로드된 후 해석되기까지의 시간. [자세한 내용은 MDN 문서를 참조하세요[12]. |
| `view.dom_complete`             | 숫자 (ns) | 페이지와 모든 하위 리소스가 준비될 때까지의 시간입니다. 사용자를 위해 로딩 스피너의 회전이 정지된 상태입니다.[MDN 문서에서 자세한 내용을 확인하세요][13].                                                                       |
| `view.load_event`               | 숫자 (ns) | 페이지가 완전히 로드되었음을 나타내면서 로드 이벤트가 실행될 때까지의 시간입니다. 일반적으로 추가 애플리케이션 로직을 위한 트리거입니다. [자세한 내용은 MDN 문서에서 확인하세요][14].                                                                             |
| `view.error.count`              | 숫자      | 이 보기에 대해 수집된 모든 오류의 수.                                                                                                                                                                          |
| `view.long_task.count`          | 숫자      | 이 보기에 대해 수집된 모든 긴 작업의 수.                                                                                                                                                                      |
| `view.resource.count`           | 숫자      | 이 보기에 대해 수집된 모든 리소스의 수.                                                                                                                                                                       |
| `view.action.count`             | 숫자      | 이 보기에 대해 수집된 모든 액션의 수.                                                                                                                                                                         |

### 리소스 타이밍 메트릭

애플리케이션의 리소스 로딩에 대한 자세한 네트워크 타이밍 데이터는 [성능 리소스 타이밍 API][15]를 통해 수집됩니다.

| 메트릭                              | 유형           | 설명                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | 숫자         | 리소스를 로드하는 데 걸린 전체 시간.                                                                                                   |
| `resource.size`                | 숫자 (바이트) | 리소스 사이즈.                                                                                                                            |
| `resource.connect.duration`    | 숫자 (ns)    | 서버 연결 설정에 소요된 시간 (connectEnd - connectStart).                                                            |
| `resource.ssl.duration`        | 숫자 (ns)    | TLS 핸드셰이크에 소요된 시간. 마지막 요청이 HTTPS를 넘지 않으면 이 메트릭이 나타나지 않습니다 (connectEnd - secureConnectionStart). |
| `resource.dns.duration`        | 숫자 (ns)    | 마지막 요청의 DNS 이름을 확인하는 데 소요된 시간 (domainLookupEnd - domainLookupStart).                                               |
| `resource.redirect.duration`   | 숫자 (ns)    | 후속 HTTP 요청에 소요된 시간 (redirectEnd - redirectStart).                                                                      |
| `resource.first_byte.duration` | 숫자 (ns)    | 응답의 첫 번째 바이트가 수신될 때까지 기다린 시간 (response Start - Request Start).                                           |
| `resource.download.duration`   | 숫자 (ns)    | 응답을 다운로드하는 데 소요된 시간 (responseEnd - responseStart).                                                                         |

### 리소스 속성

| 속성                      | 유형   | 설명                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `resource.type`                | 문자열 | 수집 중인 리소스 유형 (예: `css`, `javascript`, `media`, `XHR`, 또는 `image`).           |
| `resource.method`                | 문자열 | HTTP 메서드 (예: `POST` 또는 `GET`).           |
| `resource.status_code`             | 숫자 | 응답 상태 코드.                                                               |
| `resource.url`                     | 문자열 | 리소스 URL.                                                                       |
| `resource.url_host`        | 문자열 | URL의 호스트 부분.                                                          |
| `resource.url_path`        | 문자열 | URL의 경로 부분.                                                          |
| `resource.url_query` | 오브젝트 | URL의 쿼리 문자열 부분이 쿼리 파라미터 키/값 속성으로 분해됩니다. |
| `resource.url_scheme`      | 문자열 | URL의 프로토콜 이름(HTTP 또는 HTTPS).                                            |
| `resource.provider.name`      | 문자열 | 리소스 공급자 이름. 기본값은 `unknown`.                                            |
| `resource.provider.domain`      | 문자열 | 리소스 공급자 도메인.                                            |
| `resource.provider.type`      | 문자열 | 리소스 공급자 유형. (예: `first-party`, `cdn`, `ad`, 또는 `analytics`).                                            |


### 긴 작업 타이밍 메트릭

| 메트릭  | 유형   | 설명                |
|------------|--------|----------------------------|
| `long_task.duration` | 숫자 | 긴 작업의 기간. |


### 오류 속성

| 속성       | 유형   | 설명                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | 문자열 | 오류가 발생한 곳 (예:`console` 또는 `network`).     |
| `error.type`    | 문자열 | 오류 유형(또는 경우에 따라 오류 코드).                   |
| `error.message` | 문자열 | 이벤트를 설명하는 간결하고 사람이 읽을 수 있는 한 줄 메시지. |
| `error.stack`   | 문자열 | 스택 트레이스 또는 오류에 대한 보완 정보.     |


#### 소스 오류

소스 오류는 오류에 대한 코드 레벨 정보를 포함하며, 다양한 오류 유형에 대한 자세한 내용은 [MDN 문서][15]를 참조하세요.

| 속성       | 유형   | 설명                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | 문자열 | 오류 유형(또는 경우에 따라 오류 코드).                   |



### 액션 타이밍 메트릭

| 메트릭    | 유형   | 설명              |
|--------------|--------|--------------------------|
| `action.loading_time` | 숫자 (ns) | 액션 로딩 시간. [사용자 액션 설명서][16]에서 계산 방법을 확인하세요. |
| `action.long_task.count`        | 숫자      | 이 작업에 대해 수집된 모든 긴 작업의 수. |
| `action.resource.count`         | 숫자      | 이 작업에 대해 수집된 모든 리소스의 수. |
| `action.error.count`      | 숫자      | 이 작업에 대해 수집된 모든 오류의 수.|

### 액션 속성

| 속성    | 유형   | 설명              |
|--------------|--------|--------------------------|
| `action.id` | 문자열 | 사용자 액션의 UUID. |
| `action.type` | 문자열 | 사용자 액션의 유형. [커스텀 사용자 액션][17]의 경우 `custom`으로 설정됩니다. |
| `action.target.name` | 문자열 | 사용자가 상호 작용한 요소. 자동으로 수집된 액션에만 해당합니다. |
| `action.name` | 문자열 | 생성된 사용자 친화적 이름(예: `Click on #checkout`). [커스텀 사용자 액션 ][17]의 경우 API 호출에서 지정된 액션 이름입니다. |

### 프러스트레이션(Frustration) 신호 필드

| 필드                | 유형   | 설명                                                   |
|-------------------------------|--------|---------------------------------------------------------------|
| `session.frustration.count`     | 숫자 | 하나의 세션과 연관된 모든 프러스트레이션(Frustration) 신호의 수입니다. |
| `view.frustration.count`        | 숫자 | 하나의 보기와 연관된 모든 프러스트레이션(Frustration) 신호의 수입니다.    |
| `action.frustration.type:dead_click`  | 문자열 | RUM Browser SDK에서 감지한 데드 클릭 수.              |
| `action.frustration.type:rage_click`  | 문자열 | RUM Browser SDK에서 감지한 레이지 클릭 수.              |
| `action.frustration.type:error_click` | 문자열 | RUM Browser SDK에서 감지한 오류 클릭 수.             |

### UTM 속성

| 필드                | 유형   | 설명                                                   |
|-------------------------------|--------|---------------------------------------------------------------|
| `view.url_query.utm_source`     | 문자열 | 트래픽의 원본을 추적하는 URL의 파라미터. |
| `view.url_query.utm_medium`        | 문자열 | 트래픽이 전송되는 채널을 추적하는 URL의 파라미터.    |
| `view.url_query.utm_campaign`  | 문자열 | 해당 보기에 연결된 특정 마케팅 캠페인을 식별하는 URL의 파라미터.              |
| `view.url_query.utm_content`  | 문자열 | 마케팅 캠페인 내에서 사용자가 클릭한 특정 요소를 식별하는 URL의 파라미터.           |
| `view.url_query.utm_term` | 문자열 | 특정 캠페인을 트리거하기 위해 사용자가 검색한 키워드를 추적하는 URL의 파라미터.             |

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#override-default-rum-view-names
[2]: /ko/real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa
[3]: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
[4]: /ko/data_security/real_user_monitoring/#ip-address
[5]: /ko/real_user_monitoring/browser/modifying_data_and_context/#identify-user-sessions
[6]: /ko/real_user_monitoring/guide/setup-feature-flag-data-collection
[7]: /ko/data_security/real_user_monitoring/#ip-address
[8]: /ko/synthetics/browser_tests/
[9]: /ko/real_user_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[10]: https://www.w3.org/TR/paint-timing/#sec-terminology
[11]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[14]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
[15]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[16]: /ko/real_user_monitoring/browser/tracking_user_actions/?tab=npm#how-action-loading-time-is-calculated
[17]: /ko/real_user_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions