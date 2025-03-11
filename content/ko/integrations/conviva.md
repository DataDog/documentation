---
categories:
- 메트릭
dependencies: []
description: 비디오 스트리밍 플랫폼에서 Conviva Quality Insights 메트릭 모니터링하기
doc_link: https://docs.datadoghq.com/integrations/conviva/
draft: false
git_integration_title: conviva
has_logo: true
integration_id: ''
integration_title: Conviva
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: '1.0'
name: conviva
public_title: Datadog-Conviva 통합
short_description: Conviva Quality Metriclens 메트릭 수집하기.
team: web-integrations
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Datadog을 Conviva 계정과 연결해 품질 경험(QoE) MetricLens 메트릭을 확인하세요.

## 설정

### 설치

Datadog [Conviva 통합 타이틀][1]에서 통합을 설치하세요.

### 구성
1. Datadog [Conviva 통합 타이틀][1] 내 구성 탭으로 이동합니다.
2. **Add New Credentials**을 클릭하고 Conviva API 키와 API 비밀을 입력합니다. Datadog에서 해당 자격 증명과 연결된 계정을 검색합니다.
3. Datadog에서 자격 증명과 연결된 계정을 찾으면 _MetricLens_를 추가해 Datadog에서 수집할 메트릭을 결정하세요. MetricLens 이름을 지정하고 _필터_와 _차원_도 지정하세요. 특정 MetricLens의 이름이 자동으로 태그됩니다.
4. 또는 특정 MetricLenses나 계정에 태그를 추가할 수도 있습니다. 계정에 태그를 추가하면 해당 계정과 연결된 MetricLenses 모두에 태그가 적용됩니다.
5. _MetricLenses_를 더 추가하고 싶을 경우 **Add New**를 클릭하고 지침에 따르세요.
6. 다른 Conviva 자격 증명이 있으면 **Add New Credentials** 버튼을 눌러 이 단계와 동일하게 실행하면 됩니다.

### 대시보드
통합을 구성한 후에는 기본 Conviva 대시보드에서 MetricLens 메트릭 개요를 확인할 수 있습니다. 기본적으로 MetricLens에서 수집한 모든 메트릭이 대시보드에 표시됩니다.

{{< img src="integrations/conviva/conviva_dashboard.png" alt="Conviva 통합 기본 대시보드" popup="true" style="width:100%" >}}

타이틀에 구성된 각 MetricLens별로 메트릭 분석 결과를 보려면 `metriclens`로 필터링하세요. 여기에서 더 나아가 단일 차원 엔터티별로 메트릭을 보려면 `dimension` 필터를 사용하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "conviva" >}}


### 이벤트

Conviva 통합에서 [Datadog 이벤트 스트림][3]으로 알림을 보냅니다.

{{< img src="integrations/conviva/conviva_eventstream.png" alt="Datadog Conviva 이벤트 스트림에서 알림 모니터링하기" popup="true" style="width:100%" >}}

### 서비스 점검

Conviva 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

## 참고 자료

기타 유용한 문서, 링크 및 기사:

- [Datadog로 Conviva 모니터링하기][5]

[1]: https://app.datadoghq.com/integrations/conviva
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/conviva/conviva_metadata.csv
[3]: https://docs.datadoghq.com/ko/events/
[4]: https://docs.datadoghq.com/ko/help/
[5]: https://www.datadoghq.com/blog/video-streaming-performance-monitoring-conviva/