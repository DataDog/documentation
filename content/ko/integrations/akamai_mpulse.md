---
categories:
- cloud
dependencies: []
description: Datadog와 Akamai mPulse 통합
doc_link: https://docs.datadoghq.com/integrations/akamai_mpulse/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/integrate-akamai-mpulse-real-user-monitoring-with-datadog/
  tag: 블로그
  text: Datadog와 Akamai mPulse 실시간 사용자 모니터링 통합
git_integration_title: akamai_mpulse
has_logo: true
integration_id: akamai-mpulse
integration_title: Akamai mPulse
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: akamai_mpulse
public_title: Datadog-Akamai mPulse
short_description: Datadog와 Akamai mPulse 통합
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Datadog를 Akamai mPulse에 연결해 실시간 사용자 모니터링(RUM) 메트릭을 수집하고 최종 사용자가 경험하는 웹사이트 성능이 어떤지 가시화해 살펴보세요. CND와 백엔드 인프라스트럭처에서 RUM 메트릭을 성능 데이터와 연결하고 분석해 웹 스택에 관한 폭 넓은 정보를 가시화할 수 있습니다.

Datadog의 기본 대시보드와 모니터를 사용해 다음을 할 수 있습니다.
- 이탈률, 사용자 세션, 페이지 로드 시간과 같은 핵심 메트릭의 개요 보기
- 프론트엔드나 백엔드에서 사용자가 경험하는 느린 속도의 원인 조사하기
- 페이지 로드 시간과 페이지 그룹 모니터링

[Akamai DataStream 2][1], [NGINX][2], [MYSQL][3] 등 600개가 넘는 기술에서 얻은 실시간 데이터를 메트릭과 연결해 웹 스택의 프론트엔드와 백엔드 살펴보기

## 설정

### 설치

Datadog [Akamai mPulse 통합이라는 이름][4]의 통합을 설치합니다.

### 구성

Akamai mPulse 통합에는 `apiKey`와 `apiToken`이 필요합니다.

#### API 키 생성

`apiKey`는 자동 생성 값으로, 내 mPulse 포털에서 파악한 사이트의 데이터(비콘)를 식별하는 데 사용됩니다.

<div class="alert alert-warning">
"Apps" 메뉴 옵션과 `apiKey` 속성은 앱 관리자에게만 보입니다.
</div>

1. "Central" 페이지로 이동해 `apiKey`를 찾습니다.
2. 왼쪽 패널에서 **Apps**를 클릭합니다.
3. 모니터하고자 하는 앱 이름을 선택하여 내 `apiKey`를 포함하고 있는 구성 페이지를 엽니다.

#### API 토큰 생성

[Akamai의 API 토큰 설명서][5]를 읽은 후 다음을 따르세요.

1. `mpulse.soasta.com`에서 로그인합니다.
2. 패널 왼쪽 끝에 있는 My Settings로 이동합니다.
3. API 토큰 영역에 있는 "Generate"를 클릭합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "akamai_mpulse" >}}


### 이벤트

Akamai mPulse 통합에는 이벤트가 포함되지 않습니다.

### 서비스 검사

Akamai mPulse 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/integrations/akamai_datastream_2/
[2]: https://docs.datadoghq.com/ko/integrations/nginx/
[3]: https://docs.datadoghq.com/ko/integrations/mysql/
[4]: https://app.datadoghq.com/integrations/akamai-mpulse
[5]: https://community.akamai.com/customers/s/article/mPulse-API-Login-Changes?language=en_US
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/akamai_mpulse/akamai_mpulse_metadata.csv
[7]: https://docs.datadoghq.com/ko/help/