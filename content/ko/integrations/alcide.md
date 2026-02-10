---
categories:
- log collection
- Security
description: Alcide 로그 수집 및 처리
doc_link: https://docs.datadoghq.com/integrations/alcide/
dependencies: ["https://github.com/DataDog/documentation/blob/master/content/en/integrations/alcide.md"]
has_logo: true
integration_title: Alcide
is_public: true
custom_kind: integration
name: alcide
public_title: Datadog-Alcide 통합
short_description: Alcide 로그 수집 및 처리
version: '1.0'
integration_id: "alcide"
---

## 개요

Alcide는 Kubernetes 감사 및 이상 모니터링 서비스를 제공합니다. Datadog는 이 통합을 사용해 Alcide에서 로그를 수집하고 처리할 수 있습니다.

## 설정

### 설치

Datadog은 Alcide 로그가 탐지되면 자동으로 로그 처리 파이프라인을 활성화합니다. 설치 단계는 필요하지 않습니다.

### 구성

Alcide에서 _Integrations_(통합) 탭을 선택하고 _Detections Integrations Configuration_(탐지 통합 구성) 섹션으로 이동합니다. 이 섹션은 위협 인텔리전스 로그 통합을 구성하는 데 사용됩니다.

1. 대상으로 **HTTP API**를 선택합니다.

2. URL 입력란에 `https://http-intake.logs.<DATADOG_SITE>/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=alcide`를 입력합니다. 플레이스홀더 값 `<DATADOG_SITE>`를 미국 사이트의 경우 `datadoghq.com`, EU 사이트의 경우 `datadoghq.eu`로 대체합니다. 플레이스홀더 값 `<DATADOG_API_KEY>`를 사용자의 [Datadog API 키][1]로 대체합니다.

3. _Entities Types_(엔터티 유형)에서 관련 위협 인텔리전스를 전달할 유형을 선택합니다. Datadog에서는 이러한 유형을 모두 선택할 것을 권장합니다.

4. _Detection Categories_(탐지 카테고리)에서 전달하고자 하는 카테고리를 선택합니다. Datadog에서는 _incidents_(인시던트)와 _anomalies_(이상)를 모두 선택할 것을 권장합니다.

5. _Detection Confidence_(탐지 신뢰도) 아래에서 원하는 신뢰도 수준을 선택합니다. Datadog에서는 적어도 _high_(높음) 및 _medium_(중간)을 선택할 것을 권장합니다.

6. 선택 사항으로, _Entities Matching_(엔터티 일치) 및 _Entities Not Matching_(엔터티 일치 안 함) 입력란을 사용해 엔터티에 대한 포함 및 제외 필터를 만들 수 있습니다.

그런 다음, 이전 섹션 아래에 있는 _Selected Audit Entries Integration Configuration_(선택한 감사 항목 통합 구성) 섹션으로 이동합니다. 이 섹션은 감사 로그 통합을 구성하는 데 사용됩니다.

1. 대상으로 **HTTP API**를 선택합니다.

2. URL 입력란에 `https://http-intake.logs.<DATADOG_SITE>/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=alcide`를 입력합니다. 플레이스홀더 값 `<DATADOG_SITE>`를 미국 사이트의 경우 `datadoghq.com`, EU 사이트의 경우 `datadoghq.eu`로 대체합니다. 플레이스홀더 값 `<DATADOG_API_KEY>`를 사용자의 [Datadog API 키][1]로 대체합니다.

## 문제 해결

도움이 필요하십니까? [Datadog 지원팀][2]에 문의하세요.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /help/
