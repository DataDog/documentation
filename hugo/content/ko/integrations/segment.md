---
categories:
- cloud
- 알림
custom_kind: integration
dependencies: []
description: Segment 통합은 워크스페이스 대상에 대한 이벤트 전달 메트릭을 수집할 수 있습니다.
doc_link: https://docs.datadoghq.com/integrations/segment/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-segment-datadog/
  tag: 블로그
  text: Segment 및 Datadog을 사용하여 고객 데이터 인프라스트럭처 모니터링
git_integration_title: segment
has_logo: true
integration_id: ''
integration_title: Segment
integration_version: ''
is_public: true
manifest_version: '1.0'
name: segment
public_title: Datadog-Segment 통합
short_description: Segment 이벤트 전달 메트릭을 수집합니다.
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Segment는 자사 고객 데이터를 쉽게 정리, 수집 및 제어할 수 있게 해주는 고객 데이터 인프라스트럭처입니다. Segment는 웹사이트나 모바일 앱과 같은 소스에서 데이터를 수집하여 하나 이상의 대상(예: Google Analytics 및 Amazon Redshift)으로 라우팅합니다.

Datadog의 기본 대시보드와 모니터를 사용해 다음을 할 수 있습니다.
- 클라우드 모드 대상에 대한 이벤트 전달 메트릭을 시각화합니다.
- Datadog의 태그 시스템을 사용하여 데이터를 분석합니다(예: 워크스페이스별 또는 대상별 메트릭 분할).
- 전달 문제에 대한 알림을 자동화하여 중요한 데이터 파이프라인이 중단되는 시기를 알 수 있습니다.

**참고**: 이러한 메트릭은 계측된 애플리케이션에서 Segment로 전달하기 위한 것이 아니라 Snowflake 또는 Amplitude와 같은 대상으로 전달하기 위한 것입니다.

## 설정

### 설치

[통합 타일][1]로 이동하고 OAuth2 플로를 시작하는 `Add WorkSpace` 링크를 클릭하여 Datadog에 워크스페이스에 대한 `workspace:read` 액세스 권한을 부여합니다.
워크스페이스에 대한 Datadog 액세스 권한을 부여하는 Segment 사용자에게는 `workspace owner` 역할이 있어야 합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "segment" >}}


### 이벤트

Segment 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Segment 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/segment
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/segment/segment_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/