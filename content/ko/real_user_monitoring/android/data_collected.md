---
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: GitHub
  text: dd-sdk-android의 소스 코드
- link: /real_user_monitoring
  tag: 설명서
  text: Datadog RUM 탐색
kind: 설명서
title: 수집된 RUM 안드로이드 데이터
---

## 개요

RUM 안드로이드 SDK는 연관된 메트릭 및 속성이 있는 이벤트를 생성합니다. 메트릭은 이벤트와 관련된 측정에 사용할 수 있는 정량화 가능한 값입니다. 속성은 분석에서 메트릭 데이터를 분류(그룹화)하는 데 사용되는 정량화할 수 없는 값입니다.

모든 RUM 이벤트에는 [기본 속성](#default-attributes)이 있습니다. 예를 들어, 디바이스 유형(`device.type`), 이름(`usr.name`) 및 국가(`geo.country`)와 같은 사용자 정보입니다.

추가적으로 [주어진 이벤트 유형에 특정 메트릭 및 속성](#event-specific-metrics-and-attributes)이 있습니다. 예를 들어, 메트릭`view.time_spent`은 "보기" 이벤트와 연결되고 속성 `resource.method`은 "리소스" 이벤트와 연결됩니다.

| 이벤트 유형     | 보존 기간 | 설명                                                                                                                                                                                                                                                   |
|----------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 세션  | 30일   | 세션은 모바일 애플리케이션에서 실제 사용자 활동을 나타냅니다. 이 세션은 사용자가 애플리케이션을 실행할 때 시작되며, 사용자가 활성 상태를 유지하는 한 세션은 활성 상태로 유지됩니다. 사용자 활동 중에 세션의 일부로 생성된 모든 RUM 이벤트는 동일한 `session.id` 속성을 공유합니다. **참고:** 세션은 15분 동안 활동이 없으면 재설정됩니다. 애플리케이션이 OS에 의해 종료된 경우 애플리케이션이 백그라운드에 있는 동안 세션을 재설정할 수 있습니다. |
| 보기     | 30일   | 보기는 모바일 애플리케이션에서 고유한 화면(또는 화면 세그먼트)을 나타냅니다. `ActivityLifecycleCallbacks` 인터페이스를 통해 `onActivityResumed`및 `onActivityPaused` 콜백이 호출될 때 보기가 시작되고 중지됩니다. 각 발생 항목은 고유한 보기로 분류됩니다. 사용자가 보기에 머무는 동안 RUM 이벤트 속성(오류, 리소스, 액션)이 고유한 `view.id`와 함께 보기에 첨부됩니다.                     |
| 리소스  | 15일   | 리소스는 모바일 애플리케이션의 퍼스트 파티 호스트, API 및 타사 공급자에 대한 네트워크 요청을 나타냅니다. 사용자 세션 중에 생성된 모든 요청은 고유한 `resource.id`와 함께 보기에 첨부됩니다.                                                                                           |
| Error     | 30일   | 오류는 생성된 보기에 첨부된 모바일 애플리케이션에서 발생한 예외 또는 충돌을 나타냅니다                                                                                                                                            |
| 액션    | 30일   | 액션은 모바일 애플리케이션에서의 사용자 활동(예: 애플리케이션 시작, 탭, 스와이프 또는 뒤로 가기)을 나타냅니다. 각 액션은 고유한 `action.id`와 함께 생성된 보기에 첨부됩니다.                                                                                                                                              |
| 긴 작업 | 15일 | 지정된 기간 임계값을 초과하여 메인 스레드를 차단하는 애플리케이션의 모든 작업에 대해 긴 작업 이벤트가 생성됩니다. |

다음 다이어그램은 RUM 이벤트 계층 구조를 보여줍니다:

{{< img src="real_user_monitoring/data_collected/event-hierarchy.png" alt="RUM Event 계층 구조" style="width:50%;" >}}

## 기본 속성

RUM은 모든 이벤트에 대한 공통 속성을 수집하고 아래 [자동으로][1] 나열된 각 이벤트에 고유한 속성을 수집합니다. 또한 [추가 이벤트][2]를 추적하거나 애플리케이션 모니터링 및 비즈니스 분석 요구 사항에 맞는 기본 이벤트에 [커스텀 속성에 추가하여][3] 사용자 세션 데이터를 보강할 수 있습니다.

### 공통 핵심 속성

| 속성 이름   | 유형   | 설명                 |
|------------------|--------|-----------------------------|
| `date` | 정수  | Epoch에서 이벤트 시작 시간(밀리초). |
| `type`     | 스트링 | 이벤트 유형 (예: `view` 또는 `resource`).             |
| `service` | 스트링 | 사용자 세션을 연결하는 데 사용한 애플리케이션의 [통합 서비스 이름][4]. |
| `application.id` | 스트링 | Datadog 애플리케이션 ID. |
| `application.name` | 스트링 | Datadog 애플리케이션 이름. |

### 기기

다음 디바이스 관련 특성은 Datadog에서 수집하는 모든 이벤트에 자동으로 첨부됩니다:

| 속성 이름                           | 유형   | 설명                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `device.type`       | 스트링 | 디바이스에서 보고한 디바이스 유형 (System User-Agent).      |
| `device.brand`  | 스트링 | 디바이스에서 보고한 디바이스 브랜드 (System User-Agent).  |
| `device.model`   | 스트링 | 디바이스에서 보고한 디바이스 모델 (System User-Agent).    |
| `device.name` | 스트링 | 디바이스에서 보고한 디바이스 이름 (System User-Agent).  |

### 연결성

다음 네트워크 관련 속성은 Datadog에서 수집한 리소스 및 오류 이벤트에 자동으로 첨부됩니다:

| 속성 이름                           | 유형   | 설명                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `connectivity.status` | 스트링 | 디바이스 네트워크 도달 가능성 상태 (`connected`, `not connected` 또는 `maybe`). |
| `connectivity.interfaces` | 스트링 | 사용 가능한 네트워크 인터페이스 목록 (예: `bluetooth`, `cellular`, `ethernet`, 또는 `wifi`). |
| `connectivity.cellular.technology` | 스트링 | 셀룰러 연결에 사용되는 무선 기술의 유형. |
| `connectivity.cellular.carrier_name` | 스트링 | SIM 캐리어의 이름. |


### 운영체제

다음 OS 관련 속성은 Datadog에서 수집하는 모든 이벤트에 자동으로 첨부됩니다.

| 속성 이름                           | 유형   | 설명                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `os.name`       | 스트링 | 디바이스에서 보고한 OS 이름 (System User-Agent).       |
| `os.version`  | 스트링 | 디바이스에서 보고한 OS 버전 (System User-Agent).  |
| `os.version_major`   | 스트링 | 디바이스에서 보고한 주요 OS 버전 (System User-Agent).   |


### 지리적 위치

다음 속성은 IP 주소의 지리적 위치와 관련이 있습니다.

**참고:** 지리적 위치 속성 수집을 중지하려면 [애플리케이션 상세 정보][9]에서 설정을 변경하세요.

| 속성 이름                              | 유형   | 설명                                                                                                                          |
|:--------------------------------------------|:-------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `geo.country`         | 스트링 | 국가 이름.                                                                                                                 |
| `geo.country_iso_code`     | 스트링 | 국가의 ISO 코드 (예: `US`는 미국 또는 `FR`은 프랑스).                                                  |
| `geo.country_subdivision`     | 스트링 | 국가의 첫 번째 세분 수준 이름 (예: 미국에서 `California` 또는 프랑스에서 `Sarthe` 부서). |
| `geo.continent_code`       | 스트링 | 대륙의 ISO 코드 (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, 또는 `OC`).                                                                 |
| `geo.continent`       | 스트링 | 대륙 이름 (`Europe`, `Australia`, `North America`, `Africa`, `Antarctica`, `South America`, 또는 `Oceania`).                    |
| `geo.city`            | 스트링 | 도시 이름 (예: `San Francisco`, `Paris`, 또는 `New York`).                                                                                   |


### 글로벌 사용자 속성

[사용자 정보 추적][5]을 전역으로 활성화하여 모든 RUM 이벤트에 사용자 속성을 수집하고 적용할 수 있습니다.

| 속성 이름   | 유형   | 설명                 |
|------------------|--------|-----------------------------|
| `user.id`     | 스트링 | 사용자의 식별자. |
| `usr.name` | 스트링 | 사용자의 이름. |
| `usr.email` | 스트링 | 사용자의 이메일. |


## 이벤트별 메트릭 및 속성

메트릭은 이벤트와 관련된 측정에 사용할 수 있는 정량화 가능한 값입니다. 속성은 분석에서 메트릭 데이터를 분류(그룹화)하는 데 사용되는 정량화할 수 없는 값입니다.

### 세션 메트릭

| 메트릭  | 유형   | 설명                |
|------------|--------|----------------------------|
| `session.time_spent` | 숫자 (ns) | 세션에 소요된 시간. |
| `session.view.count`        | 숫자      | 이 세션에 대해 수집된 모든 보기의 수. |
| `session.error.count`      | 숫자      | 이 세션에 대해 수집된 모든 오류의 수.  |
| `session.resource.count`         | 숫자      | 이 세션에 대해 수집된 모든 리소스의 수. |
| `session.action.count`      | 숫자      | 이 세션에 대해 수집된 모든 액션의 수. |
| `session.long_task.count`      | 숫자      | 이 세션에 대해 수집된 모든 긴 작업의 수.

### 세션 속성

| 속성 이름                 | 유형   | 설명                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `session.id` | 스트링 | 세션의 고유 ID. |
| `session.type` | 스트링 | 세션 유형 (`user`). |
| `session.is_active` | 부울 | 세션이 현재 활성 상태인지 여부를 나타냅니다. 사용자가 애플리케이션에서 벗어나 탐색하거나 브라우저 창을 닫으면 세션이 종료되며, 4시간 동안 활동 후 또는 15분 동안 활동하지 않으면 만료됩니다. |
| `session.initial_view.url` | 스트링 | 세션의 초기 보기 URL. |
| `session.initial_view.name` | 스트링 | 세션의 초기 보기 이름. |
| `session.last_view.url` | 스트링 | 세션의 마지막 보기 URL. |
| `session.last_view.name` | 스트링 | 세션의 마지막 보기 이름. |
| `session.ip` | 스트링 | 인테이크의 TCP 연결에서 추출된 세션의 IP 주소입니다. 이 속성의 수집을 중지하려면 [애플리케이션 세부 정보][8]에서 설정을 변경하세요. |
| `session.useragent` | 스트링 | 디바이스 정보를 해석하기 위한 시스템 사용자 에이전트 정보.  |

### 보기 메트릭

RUM 액션, 오류, 리소스 및 긴 작업 이벤트에는 수집 시 활성화된 RUM 보기 이벤트에 대한 정보가 포함됩니다.


| 메트릭                              | 유형        | 설명                                                                                          |
|----------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`                             | 숫자 (ns) | 이 보기에 소요된 시간.                                    |
| `view.long_task.count`        | 숫자      | 이 보기에 대해 수집된 모든 긴 작업의 수.                                |
| `view.error.count`            | 숫자      | 이 보기에 대해 수집된 모든 오류의 수.                                    |
| `view.resource.count`         | 숫자      | 이 보기에 대해 수집된 모든 리소스의 수.                                 |
| `view.action.count`      | 숫자      | 이 보기에 대해 수집된 모든 액션의 수.                                        |
| `view.is_active`      |    부울   | 이 이벤트에 해당하는 보기가 활성 상태로 간주되는지 여부를 나타냅니다.            |

### 보기 속성

| 속성 이름                 | 유형   | 설명                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `view.id`                      | 스트링 | 이벤트에 해당하는 초기 보기의 고유 ID.                                                                      |
| `view.url`                     | 스트링 | 이벤트에 해당하는 클래스의 정식 이름.                                                           |
| `view.name` | 스트링 | 이벤트에 해당하는 보기의 사용자 지정 이름. |                                                                                 

### 리소스 메트릭


| 메트릭                              | 유형           | 설명                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | 숫자 (ns)        | 리소스를 로드하는 데 걸린 전체 시간.                                                                                                   |
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
| `resource.id`                | 스트링 |  리소스의 고유 식별자.      |
| `resource.type`                | 스트링 | 수집 중인 리소스 유형 (예: `xhr`, `image`, `font`, `css`, 또는 `js`).          |
| `resource.method`                | 스트링 | HTTP 메서드 (예: `POST`, `GET`, `PATCH`, 또는 `DELETE`).           |
| `resource.status_code`             | 숫자 | 응답 상태 코드.                                                               |
| `resource.url`              | 스트링 | 리소스 URL.                             |
| `resource.provider.name`      | 스트링 | 리소스 공급자 이름. 기본값 `unknown`.                     |
| `resource.provider.domain`      | 스트링 | 리소스 공급자 도메인,                                            |
| `resource.provider.type`  | 스트링 | 리소스 공급자 유형 (예: `first-party`, `cdn`, `ad`, 또는 `analytics`).              |

### 오류 속성

프런트엔드 오류는 실제 사용자 모니터링(RUM)을 통해 수집됩니다. 오류 메시지와 스택 트레이스는 가능한 경우 포함됩니다.

| 속성       | 유형   | 설명                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | 스트링 | 오류가 발생하는 곳 (예: `webview`, `logger`, 또는 `network`).     |
| `error.type`    | 스트링 | 오류 유형(또는 경우에 따라 오류 코드).                   |
| `error.message` | 스트링 | 이벤트를 설명하는 간결하고 사람이 읽을 수 있는 한 줄짜리 메시지. |
| `error.stack`   | 스트링 | 오류에 대한 스택 트레이스 또는 보완 정보.     |
| `error.issue_id`   | 스트링 | 오류에 대한 스택 트레이스 또는 보완 정보.     |


### 네트워크 오류

네트워크 오류에는 실패한 HTTP 요청에 대한 정보가 포함되며 다음 패싯도 수집됩니다:

| 속성                      | 유형   | 설명                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `error.resource.status_code`             | 숫자 | 응답 상태 코드.                                                               |
| `error.resource.method`                | 스트링 | HTTP 메서드 (예: `POST` 또는 `GET`).           |
| `error.resource.url`                     | 스트링 | 리소스 URL.                                                                       |
| `error.resource.provider.name`      | 스트링 | 리소스 공급자 이름. 기본값 `unknown`.                                            |
| `error.resource.provider.domain`      | 스트링 | 리소스 공급자 도메인.                                            |
| `error.resource.provider.type`      | 스트링 | 리소스 공급자 유형 (예: `first-party`, `cdn`, `ad`, 또는 `analytics`).                                            |

### 액션 타이밍 메트릭

| 메트릭    | 유형   | 설명              |
|--------------|--------|--------------------------|
| `action.loading_time` | 숫자 (ns) | 액션 로딩 시간. |
| `action.long_task.count`        | 숫자      | 이 작업에 대해 수집된 모든 긴 작업의 수. |
| `action.resource.count`         | 숫자      | 이 작업에 대해 수집된 모든 리소스의 수. |
| `action.error.count`      | 숫자      | 이 작업에 대해 수집된 모든 오류의 수.|

### 액션 속성

| 속성    | 유형   | 설명              |
|--------------|--------|--------------------------|
| `action.id` | 스트링 | 사용자 액션의 UUID. |
| `action.type` | 스트링 | 사용자 액션 유형 (예: `tap` 또는 `application_start`). |
| `action.name` | 스트링 | 사용자 액션 이름. |
| `action.target.name` | 스트링 | 사용자가 상호 작용한 요소입니다. 자동으로 수집된 액션에만 해당합니다. |

## 데이터 저장 공간

데이터가 Datadog에 업로드되기 전에 애플리케이션의 캐시 디렉토리에 있는 일반 텍스트로 저장됩니다. 이 캐시 폴더는 [안드로이드의 애플리케이션 샌드박스][6]에 의해 보호되므로 대부분의 디바이스에서 다른 애플리케이션이 이 데이터를 읽을 수 없습니다. 그러나 모바일 디바이스가 루팅되었거나 누군가 Linux 커널을 템퍼링하는 경우 저장된 데이터를 읽을 수 있습니다.

## 직접 부팅 모드 지원

애플리케이션에서 [직접 부팅 모드][7]를 지원하는 경우, 디바이스의 잠금이 해제되기 전에 캡처한 데이터는 아직 자격 증명 암호화 저장소를 사용할 수 없으므로 캡처되지 않습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/android/advanced_configuration/#automatically-track-views
[2]: /ko/real_user_monitoring/android/advanced_configuration/#enrich-user-sessions
[3]: /ko/real_user_monitoring/android/advanced_configuration/#track-custom-global-attributes
[4]: /ko/getting_started/tagging/unified_service_tagging/
[5]: /ko/real_user_monitoring/android/advanced_configuration/#track-user-sessions
[6]: https://source.android.com/security/app-sandbox
[7]: https://developer.android.com/training/articles/direct-boot
[8]: /ko/data_security/real_user_monitoring/#ip-address
[9]: /ko/data_security/real_user_monitoring/#geolocation