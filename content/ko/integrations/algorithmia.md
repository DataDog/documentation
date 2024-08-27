---
app_id: algorithmia
app_uuid: 09ef6f74-1555-4082-a69e-b5cf21ec4512
assets:
  dashboards:
    Algorithmia: assets/dashboards/algorithmia.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: algorithmia.duration_milliseconds
      metadata_path: metadata.csv
      prefix: algorithmia.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10128
    source_type_name: Algorithmia
  monitors:
    Algorithmia: assets/monitors/algorithm_duration.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Algorithmia
  sales_email: support@algorithmia.io
  support_email: support@algorithmia.io
categories:
- 메트릭
- ai/ml
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/algorithmia/README.md
display_on_public_website: true
draft: false
git_integration_title: algorithmia
integration_id: algorithmia
integration_title: Algorithmia
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: algorithmia
public_title: Algorithmia
short_description: 프로덕션에서 기계 학습 메트릭 모니터링
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::AI/ML
  - Supported OS::Linux
  configuration: README.md#Setup
  description: 프로덕션에서 기계 학습 메트릭 모니터링
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Algorithmia
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 개요

[Algorithmia][1]는 데이터 과학자, 애플리케이션 개발자, IT 전문가가 프로덕션 과정에서
 기계 학습과 기타 예측 모델을 배포, 관리, 통제, 보안 처리할 수 있도록 도와주는
 기능을 갖춘 MLOps 플랫폼입니다.

![Datadog 내의 Algorithmia Insights][2]

Algorithmia Insights는 Algorithmia Enterprise 기능으로, 기계 학습 모델을 계측, 
측정, 모니터할 수 있는 메트릭 파이프라인을 제공합니다. 기계 학습 분야 모니터링
 추론 관련 메트릭 사용 사례에는 모델 드리프트, 
데이터 드리프트, 모델 바이어스 등이 
있습니다.

이 통합을 이용하면 작동 메트릭은 물론, 사용자 정의, 추론 관련 
메트릭을 Algorithmia에서 Kafka로, 또 Datadog 메트릭 API로 스트림할 
수 있습니다.

## 설정

1. Algorithmia 인스턴스에서 Kafka 브로커(Algorithmia 외부)로 연결되도록
   Algorithmia Insights를 구성하세요.

2. 이 통합에 사용된 Datadog 메시지 전송 서비스를
   설치, 구성, 사용해 Kafka 토픽에서 Datadog의 메트릭 API로
   메트릭을 전송하려면 [Algorithmia 통합 리포지토리][3]를
   참고하세요.


### 검증

1. Algorithmia에서 Insights가 활성화된 알고리듬을 쿼리합니다.
2. Datadog 인터페이스에서 **Metrics** 요약 페이지로 이동하세요.
3. Insights의 메트릭이 Datadog에 존재하는지 `algorithmia`로 필터링해
   확인하세요.

### 메트릭 스트리밍

이 통합에서는 Insights가 활성화된 모델이 쿼리되었을 때 Algorithmia에서
 메트릭이 스트리밍됩니다. 각 로그 항목에는 작동 메트릭과 추론 관련 메트릭이
 포함되어 있습니다.

`duration_milliseconds` 메트릭은 Algorithmia의 기본 페이로드에 포함되어 있는 작동 메트릭입니다. 처음 시작할 때 이용 편의를 위해 이 기본 메트릭의 대시보드와 모니터도 포함되어 있습니다.

추가 메트릭으로 알고리듬 개발자가 Algorithmia에서 지정한 사용자 정의,
 추론 관련 메트릭을 포함할 수 있습니다. 사용자 정의 메트릭은 특정
 기계 학습 프레임워크와 사용 사례에 따라 다르지만, scikit-learn의
 예측 가능성 값, TensorFlow의 이미지 분류자, 또는 수신 API 요청의
 입력 데이터 등과 같은 값을 포함할 수 있습니다. **참고**: 이 통합에서
 제공하는 메시지 전달 스크립트는 Datadog로 전달될 때 사용자 정의
 메트릭에
 접두사 `algorithmia.`를 추가합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "algorithmia" >}}


### 서비스 검사

Algorithmia 점검에는 서비스 점검이 포함되지 않습니다.

### 이벤트

Algorithmia 점검에는 이벤트를 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Algorithmia 지원팀][5]에 문의하세요.

[1]: https://algorithmia.com/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/algorithmia/images/algorithmia-insights-datadog.png
[3]: https://github.com/algorithmiaio/integrations
[4]: https://github.com/DataDog/integrations-extras/blob/master/algorithmia/metadata.csv
[5]: https://algorithmia.com/contact