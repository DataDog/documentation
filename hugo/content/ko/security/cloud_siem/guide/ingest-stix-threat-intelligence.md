---
description: 사용자 보유 위협 인텔리전스를 STIX 2.1 번들로 Cloud SIEM에 전송합니다. 수집 엔드포인트, 인증, 지원되는 지표
  유형 및 패턴, Datadog이 각 지표 유형에 대해 생성하는 참조 표 및 이러한 표를 구성하거나 제거하는 방법을 다룹니다.
disable_toc: false
further_reading:
- link: /security/cloud_siem/ingest_and_enrich/threat_intelligence/
  tag: 설명서
  text: 사용자 보유 위협 인텔리전스를 Cloud SIEM으로 가져오기
- link: /security/threat_intelligence/
  tag: 설명서
  text: Datadog Security의 위협 인텔리전스
- link: /security/cloud_siem/triage_and_investigate/ioc_explorer/
  tag: 설명서
  text: IOC Explorer로 지표 조사
- link: /reference_tables/
  tag: 설명서
  text: 참조 표 생성 및 관리
title: STIX 위협 인텔리전스 수집
---
## 개요 {#overview}

조직에서 위협 인텔리전스 플랫폼(TIP)을 통해 위협 인텔리전스를 유지 관리하는 경우, 이를 [STIX 2.1][1] 번들로 Cloud SIEM에 전송할 수 있습니다. Cloud SIEM은 수집된 지표를 사용하여 [로그를 보강][2]하고 [IOC Explorer][3]에 표시합니다.

플랫폼에서 이미 STIX를 생성하거나 스크립트 또는 예약된 작업을 통해 증분 업데이트를 전송하려는 경우 STIX 수집을 사용하세요. CSV 파일로 지표를 업로드하거나 클라우드 스토리지에서 동기화하려면 [사용자 보유 위협 인텔리전스를 Cloud SIEM으로 가져오기][2]를 참조하세요.

## 작동 방식 {#how-it-works}

STIX 2.1 번들을 [수집 엔드포인트](#send-indicators)로 전송하면 Datadog은 다음과 같이 처리합니다. Datadog에서 사전 구성이 필요하지 않습니다.

1. Datadog은 필수 `ti_vendor` 헤더를 통해 피드를 식별합니다.
2. Datadog은 피드의 각 지표 유형에 대해 `threat_intel_stix_<TI_VENDOR>_<INDICATOR_TYPE>`로 명명된 [참조 표][4]를 하나씩 생성합니다. 하나의 번들에 여러 지표 유형이 포함될 수 있으므로 단일 요청으로 여러 표를 채울 수 있습니다.
3. Datadog은 생성된 각 표를 등록하고 Cloud SIEM 보강에 사용하도록 자동으로 활성화합니다.
4. 동일한 `ti_vendor`에 대한 이후 요청은 기존 표를 업데이트하고 사용자가 선택한 구성 설정을 유지합니다.

예를 들어 IP 주소, 도메인 및 SHA-256 지표가 포함된 피드를 `ti_vendor: acme`로 전송하면 다음 표가 생성됩니다.

| 지표 유형 | 생성된 참조 표 |
|---|---|
| IP 주소 | `threat_intel_stix_acme_ip_address` |
| 도메인 | `threat_intel_stix_acme_domain` |
| SHA-256 파일 해시 | `threat_intel_stix_acme_sha256` |

표는 첫 번째 요청 후 몇 분 뒤에 사용할 수 있습니다. 보강은 표가 활성화된 후 Cloud SIEM이 수신하는 로그에 적용되므로, 이전에 수신된 로그에는 적용되지 않습니다.

## 전제 조건 {#prerequisites}

- 조직에 Cloud SIEM이 활성화되어 있습니다.
- Datadog [API 키][5] 및 [애플리케이션 키][6]. 애플리케이션 키에는 Reference Tables Write 권한이 있어야 합니다.

## 지표 전송 {#send-indicators}

`POST https://api.{{< region-param key="dd_site" >}}/api/v2/security/threat-intel/stix`

<div class="alert alert-info">엔드포인트 URL은 사이트마다 다릅니다. 조직에 맞는 올바른 Datadog 사이트를 사용하세요.</div>

### 헤더 {#headers}

| 헤더 | 필수 | 설명 |
|---|---|---|
| `DD-API-KEY` | 예 | Datadog API 키입니다. |
| `DD-APPLICATION-KEY` | 예 | Reference Tables Write 권한이 있는 애플리케이션 키입니다. |
| `ti_vendor` | 예 | 피드를 식별합니다. 예를 들어 플랫폼 이름을 사용할 수 있습니다. 소문자와 숫자만 사용하여 10자 이하로 입력하세요. |
| `Content-Type` | 예 | `application/json` |
| `Content-Encoding` | 아니요 | 압축된 본문을 보내려면 `gzip`으로 설정하세요. 다른 인코딩은 지원되지 않습니다. |

### 요청 본문 {#request-body}

본문은 STIX 객체의 STIX 2.1 `bundle`입니다. 각 요청은 증분 배치이며, 번들은 서로 다른 유형의 지표를 포함할 수 있습니다.

```json
{
  "type": "bundle",
  "id": "bundle--0cde353c-ea5b-4668-9f68-9c3a0e2a0a0e",
  "objects": [
    {
      "type": "indicator",
      "spec_version": "2.1",
      "id": "indicator--a932fcc6-e032-476c-826f-cb970a5a1fff",
      "pattern_type": "stix",
      "pattern": "[ipv4-addr:value = '198.51.100.1']",
      "indicator_types": ["malicious-activity"],
      "valid_from": "2026-01-01T00:00:00Z",
      "valid_until": "2026-12-31T00:00:00Z"
    }
  ]
}
```

엔드포인트에는 다음과 같은 요구 사항 및 제한 사항이 있습니다.

- 번들은 STIX 2.1이어야 합니다. 번들에 `2.1` 이외의 `spec_version`이 포함된 경우 Datadog은 요청을 거부합니다. 개별 객체에 `2.1` 이외의 `spec_version`이 포함된 경우 Datadog은 해당 객체를 건너뜁니다.
- 최대 요청 본문 크기는 50 MB입니다.

### 지원되는 지표 유형 및 패턴 {#supported-indicator-types-and-patterns}

Datadog은 각 지표의 STIX `pattern`을 읽어 유형과 값을 확인합니다. Cloud SIEM은 IP 주소(IPv4 및 IPv6 모두), 도메인, SHA-256 파일 해시를 수집합니다.

Datadog은 `=` 및 `IN` 비교에서 정확한 값을 추출합니다. 또한 `OR` 표현식을 허용하며 각 값을 별도의 지표로 가져옵니다. 대괄호로 묶인 표현식 사이의 `AND`는 지원되지 않습니다.

```json
"pattern": "[ipv4-addr:value = '198.51.100.1'] OR [domain-name:value IN ('example.com', 'example.net')]"
```

부정, 범위, 와일드카드 일치, 정규 표현식 일치, 서브넷 관계, 존재 확인, 시간 한정자 또는 `FOLLOWEDBY`를 사용하는 패턴은 지원되지 않습니다. 패턴의 일부라도 지원되지 않는 표현식을 사용하는 경우 Datadog은 해당 지표 객체를 건너뜁니다.

응답은 지원되지 않는 객체를 `unsupported`로, 구문 분석할 수 없는 패턴을 `invalid`로 집계합니다. 이 수치를 확인하여 피드가 얼마나 수집되었는지 확인하세요.

### STIX 필드가 참조 표 열에 매핑되는 방식 {#how-stix-fields-map-to-reference-table-columns}

| 참조 표 열 | 값 출처 |
|---|---|
| 지표 값 | 지표의 `pattern`에서 추출된 값입니다. |
| `intention` | `indicator_types` 필드입니다. `malicious-activity`는 `malicious`로 매핑되고, `benign`은 `benign`으로 매핑되며, 그 밖의 값 또는 해당 필드가 없는 경우에는 `suspicious`로 매핑됩니다. |
| `source` | `ti_vendor` 헤더이며 `{"name": "<TI_VENDOR>"}`로 저장됩니다. |
| `category` | `custom`으로 설정합니다. |
| `additional_data` | 전용 열이 없는 STIX 필드로, `stix_id`, `created`, `modified`, `valid_from`, `confidence`, `labels`, `indicator_types`, `object_marking_refs`, `kill_chain_phases` 및 `external_references`를 포함합니다. |

선택 사항인 `valid_until` 필드는 지표의 만료 시간을 설정하며, Datadog은 해당 시간이 지나면 지표를 제거합니다. `valid_until` 없이 전송된 지표는 자동으로 만료되지 않습니다.

### 지표 업데이트 및 철회 {#update-and-revoke-indicators}

- 지표의 세부 정보를 업데이트하려면 업데이트된 필드와 함께 지표를 다시 보내세요. Datadog은 해당 지표 값에 대한 기존 행을 덮어씁니다.
- 지표를 제거하려면 `"revoked": true`과(와) 함께 보내세요. Datadog은 참조 표에서 해당 지표를 삭제합니다.

동일한 번들을 두 번 이상 보내도 중복 행이 생성되지 않습니다.

### 응답 {#response}

요청이 성공하면 `200 OK`과(와) Datadog의 번들 처리 결과에 대한 요약이 반환됩니다.

```json
{
  "data": {
    "type": "threat-intel-stix-ingest",
    "id": "acme",
    "attributes": {
      "accepted": 3,
      "unsupported": 1,
      "invalid": 0
    }
  }
}
```

| 속성 | 설명 |
|---|---|
| `accepted` | Datadog이 처리를 위해 수락한 지원되는 지표 객체의 수입니다. 이 수에는 새 지표, 업데이트 및 철회가 포함됩니다. 패턴이 `IN` 또는 `OR`를 사용하는 경우 하나의 객체가 둘 이상의 지표를 생성할 수 있습니다. |
| `unsupported` | 유형, 패턴 또는 객체 수준의 STIX 버전이 지원되지 않아 Datadog이 건너뛴 지표 객체의 수입니다. |
| `invalid` | Datadog이 패턴을 구문 분석할 수 없는 지표 객체의 수입니다. |

`200` 응답은 Datadog이 번들을 수락했음을 의미합니다. 지원되지 않거나 유효하지 않은 지표는 요청을 실패하게 하는 대신 이 수치에 포함됩니다. 수치를 확인하여 피드가 예상대로 수집되었는지 확인하세요.

### 요청 예시 {#example-request}

```shell
curl -X POST "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security/threat-intel/stix" \
  --header "DD-API-KEY: <DATADOG_API_KEY>" \
  --header "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" \
  --header "Content-Type: application/json" \
  --header "ti_vendor: acme" \
  --data '{
    "type": "bundle",
    "id": "bundle--0cde353c-ea5b-4668-9f68-9c3a0e2a0a0e",
    "objects": [
      {
        "type": "indicator",
        "spec_version": "2.1",
        "id": "indicator--a932fcc6-e032-476c-826f-cb970a5a1fff",
        "pattern_type": "stix",
        "pattern": "[ipv4-addr:value = '198.51.100.1']",
        "indicator_types": ["malicious-activity"],
        "valid_from": "2026-01-01T00:00:00Z"
      }
    ]
  }'
```

대규모 피드를 더 효율적으로 보내려면 본문을 압축하고 `Content-Encoding: gzip`을 설정하세요.

### 속도 제한 {#rate-limits}

엔드포인트는 각 API 키에 대해 초당 10개의 요청을 허용합니다. 해당 제한을 초과하는 요청은 `429 Too Many Requests` 응답을 받습니다.

### 오류 응답 {#error-responses}

| 상태 | 이유 |
|---|---|
| `400 Bad Request` | 본문이 유효한 JSON이 아니거나, 번들이 `2.1` 이외의 `spec_version`을 포함하거나, `ti_vendor` 헤더가 누락되었거나 유효하지 않거나, `Content-Encoding`이 지원되지 않습니다. |
| `401 Unauthorized` | 요청에 유효한 자격 증명이 포함되어 있지 않습니다. |
| `403 Forbidden` | 애플리케이션 키에 Reference Tables Write 권한이 없습니다. |
| `413 Request Entity Too Large` | 요청 본문이 50 MB보다 큽니다. |
| `429 Too Many Requests` | 요청이 API 키에 대한 속도 제한을 초과했습니다. |

## 생성된 참조 표 구성 {#configure-the-generated-reference-tables}

[위협 인텔리전스][7] 구성 페이지에서 수집을 통해 생성된 표를 관리하세요. 각 표에는 Cloud SIEM이 로그 보강에 해당 표를 사용할지 여부를 제어하는 토글이 있습니다. 해당 페이지에서 활성화된 피드를 확인하거나, 피드를 일시적으로 비활성화하거나, 수집 후 비활성화 상태로 남아 있는 표를 활성화하세요.

보강 설정이 수집보다 우선합니다. 표가 생성된 후 후속 요청은 지표를 추가하거나 업데이트하지만 보강 토글은 변경하지 않습니다. 비활성화한 표는 다시 활성화할 때까지 비활성화 상태로 유지됩니다.

STIX 수집은 생성된 참조 표의 행을 관리합니다. 해당 행에 대한 수동 변경 사항은 보존되지 않으며 이후 수집 요청에 의해 덮어쓰여집니다. 지표를 추가, 업데이트 또는 제거하려면 STIX 수집 엔드포인트를 통해 변경 사항을 전송하세요.

수집된 지표를 확인하려면 [Reference Tables][8]에서 표를 열거나 [IOC Explorer][3]에서 지표를 검색하세요.

### 참조 표 제한에 도달한 경우 {#if-you-reach-the-reference-table-limit}

Cloud SIEM은 한 번에 최대 10개의 위협 인텔리전스 참조 표를 사용하여 로그를 보강합니다. 조직이 이미 해당 제한에 도달한 상태에서 수집을 통해 표가 생성되는 경우에도 Datadog은 표를 생성하고 데이터를 채웁니다. 이 표는 보강에 사용하도록 자동으로 활성화되지 않으며 [위협 인텔리전스][7] 페이지에 비활성화된 상태로 표시됩니다.

이러한 표를 활성화하려면 [위협 인텔리전스][7] 페이지에서 더 이상 필요하지 않은 표를 비활성화한 다음 새 표를 활성화하세요.

## 피드 수집 중단 {#stop-ingesting-a-feed}

요청에 의해 수집이 진행되므로 피드를 제거하려면 다음 순서에 따라 두 단계를 수행해야 합니다.

1. 해당 `ti_vendor`에 대한 번들 전송을 중단합니다.
2. Datadog이 해당 피드에 대해 생성한 참조 표를 [Reference Tables][8]에서 삭제합니다.

해당 순서대로 단계를 완료하세요. 동일한 `ti_vendor`에 대한 요청이 계속 들어오는 동안 표를 삭제하면 다음 요청 시 표가 다시 생성됩니다.

아무것도 삭제하지 않고 로그 보강을 중단하려면 대신 [Threat Intelligence][7] 페이지에서 표를 비활성화하세요. 이렇게 하면 수집된 지표를 IOC Explorer에서 계속 사용할 수 있으며 나중에 보강을 재개할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html
[2]: /ko/security/cloud_siem/ingest_and_enrich/threat_intelligence/
[3]: /ko/security/cloud_siem/triage_and_investigate/ioc_explorer/
[4]: /ko/reference_tables/
[5]: /ko/account_management/api-app-keys/#api-keys
[6]: /ko/account_management/api-app-keys/#application-keys
[7]: https://app.datadoghq.com/security/configuration/threat-intel
[8]: https://app.datadoghq.com/reference-tables