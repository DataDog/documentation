---
aliases:
- /ko/security_monitoring/guide/how-to-setup-security-filters-using-security-monitoring-api/
- /ko/security_platform/guide/how-to-setup-security-filters-using-security-monitoring-api/
- /ko/security_monitoring/guide/how-to-setup-security-filters-using-cloud-siem-api/
- /ko/cloud_siem/guide/how-to-setup-security-filters-using-security-monitoring-api/
- /ko/security_platform/guide/how-to-setup-security-filters-using-cloud-siem-api/
- /ko/security_platform/cloud_siem/guide/how-to-setup-security-filters-using-cloud-siem-api/
- /ko/security/guide/how-to-setup-security-filters-using-security-monitoring-api/
kind: 가이드
title: 클라우드 보안 정보와 이벤트 관리(SIEM) API를 사용하는 보안 필터
---

## 개요

클라우드 보안 정보와 이벤트 관리(SIEM) 프로덕트는 로그와 위협 인텔리전스를 매칭하거나 [탐지 규칙][1]을 적용하여 공격이나 이상 징후를 탐지하는 등, 수집한 로그를 분석하여 실시간으로 위협을 탐지합니다.

Datadog 클라우드 보안 정보와 이벤트 관리(SIEM) 서비스가 수집 및 분석한 총 기가바이트 수에 기반하여 분석 로그의 요금이 청구됩니다. 기본적으로 클라우드 보안 정보와 이벤트 관리(SIEM) 서비스는 수집한 모든 로그를 분석하여 탐지 범위를 최대화합니다. 그러나 [클라우드 보안 정보와 이벤트 관리(SIEM) API][2]를 사용하면 프로그래밍으로 보안 필터를 설정하여 분석하려는 수집 로그의 하위 집합을 설정할 수 있습니다.

본 지침에서는 다음 예시를 살펴봅니다.

* [특정 로그를 제외하는 기본 보안 필터 설정](#add-an-exclusion)
* [커스텀 보안 필터를 생성하여 어떤 로그 소스를 분석할지 특정](#create-a-custom-filter)

**참고**: 보안 필터는 클라우드 보안 정보와 이벤트 관리(SIEM) 프로덕트가 분석한 로그를 제어하는 데만 필요합니다. 클라우드 보안 관리 위협(`source:runtime-security-agent`) 및 클라우드 보안 관리 설정 오류(`source:compliance-agent`) 프로덕트의 일부로써 Datadog 에이전트가 생성한 로그는 분석 로그로써 요금이 청구되지 않으므로, 해당 로그를 제외할 목적으로 보안 필터를 생성할 필요가 없습니다.

## 전제 조건

* API를 사용하려면 API 키와 **관리자 사용자 애플리케이션 키**가 필요합니다. 해당 키는 [Datadog 계정 API 키 페이지][3]에서 확인할 수 있습니다. `<DATADOG_API_KEY>` 및 `<DATADOG_APP_KEY>`를 Datadog API 키와 Datadog 애플리케이션 키로 교체합니다.

* 본 지침에서는 `curl` 예제를 제공합니다. [cURL][4]이 설치되어 있지 않다면 설치하거나 [API 문서][2]의 본 API 엔드포인트용 추가 언어 예시 부분을 참조합니다.

## 예시

### 제외 추가

기본값으로 수집한 모든 로그를 분석하는 단일 보안 필터가 존재합니다. 해당 필터의 이름은 `all ingested logs`이고 `*` 쿼리를 갖습니다. 태그를 바탕으로 로그의 하위 집합을 제외하는 제외 기능을 추가하여 사용자 정의할 수 있습니다. 먼저 보안 필터의 목록을 검색하여 필터의 `id`를 불러와야 합니다.

**API 불러오기:**

```bash
curl -L -X GET 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>'
```

**응답:**

```json
{
    "data": [
        {
            "attributes": {
                "is_enabled": true,
                "is_builtin": true,
                "name": "all ingested logs",
                "filtered_data_type": "logs",
                "exclusion_filters": [],
                "version": 1,
                "query": "*"
            },
            "type": "security_filters",
            "id": "l6l-rmx-mqx"
        }
    ]
}
```

본 예시에서 필터의 `id`는 `"l6l-rmx-mqx"`입니다. 필터를 수정하여 제외 조건을 추가할 수 있습니다(예: `env:staging` 태그된 모든 로그 제외).

**참고**: `version`은 업데이트하려는 필터의 현재 버전을 나타냅니다. 해당 필드는 옵션입니다. 설정하지 않는 경우 최신 버전이 업데이트됩니다.

**API 불러오기:**

```bash
curl -L -X PATCH 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters/l6l-rmx-mqx' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
--data-raw '{
    "data": {
        "attributes": {
             "exclusion_filters": [
                {
                    "query": "env:staging",
                    "name": "exclude env:staging"
                }
            ],
            "version": 1
        },
        "type": "security_filters"
    }
}'
```

**응답:**

```json
{
    "data": {
        "attributes": {
            "is_enabled": true,
            "is_builtin": true,
            "name": "all ingested logs",
            "filtered_data_type": "logs",
            "exclusion_filters": [
                {
                    "query": "env:staging",
                    "name": "exclude env:staging"
                }
            ],
            "version": 2,
            "query": "*"
        },
        "type": "security_filters",
        "id": "l6l-rmx-mqx"
    }
}
```

### 커스텀 필터 생성하기

명시적으로 지정한 로그만으로 분석을 제한할 목적으로 커스텀 보안 필터를 생성할 수도 있습니다. 예를 들어, AWS CloudTrail에서 `source:cloudtrail`와만 매칭되는 필터를 사용하여 로그를 분석하도록 선택할 수 있습니다.

**API 불러오기:**

```bash
curl -L -X POST 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
--data-raw '{
    "data": {
        "type": "security_filters",
        "attributes": {
            "is_enabled": true,
            "name": "cloudtrail",
            "exclusion_filters": [],
            "filtered_data_type": "logs",
            "query": "source:cloudtrail"
        }
    }
}'
```

**응답:**

```json
{
    "data": {
        "attributes": {
            "is_enabled": true,
            "is_builtin": false,
            "name": "cloudtrail",
            "filtered_data_type": "logs",
            "exclusion_filters": [],
            "version": 1,
            "query": "source:cloudtrail"
        },
        "type": "security_filters",
        "id": "qa6-tzm-rp7"
    }
}
```

**참고**: `version`은 업데이트하려는 필터의 현재 버전을 나타냅니다. 해당 필드는 옵션입니다. 설정되지 않은 경우 최신 버전이 업데이트됩니다.

보안 필터는 포괄적이므로 특정 로그가 **하나 이상의 보안 필터**와 일치하는 경우 분석됩니다. 분석할 로그의 하위 집합을 지정하려면 기본 제공 필터인 `all ingested logs`을 비활성화해야 할 수도 있습니다. 다음과 같이 `is_enabled` 속성을 `false`로 설정합니다.

**API 호출:**

```bash
curl -L -X PATCH 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters/l6l-rmx-mqx' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DATADOG_API_KEY>' \
--header 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' \
--data-raw '{
    "data": {
        "attributes": {
            "is_enabled": false
        },
        "type": "security_filters"
    }
}'
```

**응답:**

```json
{
    "data": {
        "attributes": {
            "is_enabled": false,
            "is_builtin": true,
            "name": "all ingested logs",
            "filtered_data_type": "logs",
            "exclusion_filters": [
                {
                    "query": "env:staging",
                    "name": "exclude env:staging"
                }
            ],
            "version": 3,
            "query": "*"
        },
        "type": "security_filters",
        "id": "l6l-rmx-mqx"
    }
}
```

**참고**: `version`은 업데이트하려는 필터의 현재 버전을 나타냅니다. 해당 필드는 옵션입니다. 설정되지 않은 경우 최신 버전이 업데이트됩니다.

## 주요 보안 관련 태그 및 속성

로그의 명시적으로 지정한 카테고리만 분석하려면 중요한 보안 관련 사용자 및 엔터티 또는 보안 로그 주요 소스를 포함하는 로그를 제외하지 않도록 주의합니다. 하단의 표는 유용한 예시를 제공합니다.

**주요 사용자 및 엔티티**

| 이름                  | 쿼리                                            |
| --------------------- |--------------------------------------------------|
| 모든 명명된 이벤트      | `@evt.name:*`                                    |
| 모든 클라이언트 IP        | `@network.client.ip:*`                           |
| 모든 대상 IP   | `@network.destination.ip:*`                      |
| 모든 사용자             | `@usr.id:* OR @usr.name:* @usr.email:*`          |
| 모든 호스트             | `host:* OR instance-id:*`                        |

**주요 보안 소스**

| 이름                  | 쿼리                                            |
| --------------------- |--------------------------------------------------|
| AWS 보안 로그     | `source:(cloudtrail OR guardduty OR route53)`    |
| AWS 네트워크 로그      | `source:(vpc OR waf OR elb OR alb)`              |
| Google Cloud 로그     | `source:gcp*`                                    |
| Azure 로그            | `source:azure*`                                  |
| Kubernetes 감사 로그 | `source:kubernetes.audit`                        |
| ID 공급자(Identity Provider) 로그| `source:(okta OR gsuite OR auth0)`               |
| CDN 로그              | `source:(cloudfront OR cloudflare OR fastly)`    |
| 웹 서버 로그       | `source:(nginx* OR apache OR iis)`               |

[1]: /ko/security/default_rules#cat-cloud-siem
[2]: /ko/api/latest/security-monitoring/#get-all-security-filters
[3]: /ko/api/v1/authentication/
[4]: https://curl.haxx.se/download.html