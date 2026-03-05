---
aliases:
- /ko/integrations/google_cloud_apis
app_id: google-cloud-apis
categories:
- google cloud
- 메트릭
- 클라우드
custom_kind: 통합
description: Google 클라우드 API를 사용하면 코드에서 Google 클라우드 플랫폼 제품에 액세스할 수 있습니다.
integration_version: 1.0.0
media: []
title: Google 클라우드 API
---
## 개요

Google 클라우드 API를 사용하면 코드에서 Google 클라우드 플랫폼 제품에 액세스할 수 있습니다.

Datadog Google 클라우드 플랫폼 통합을 사용하여 Google 클라우드 API에서 메트릭 수집합니다.

## 설정

### 설치

아직 하지 않았다면, 먼저 [Google 클라우드 플랫폼 통합](https://docs.datadoghq.com/integrations/google-cloud-platform/)을 설정하세요. 다른 설치 단계는 필요하지 않습니다.

## 수집한 데이터

### Metrics

| | |
| --- | --- |
| **gcp.serviceruntime.api.request_count** <br>(count) | 완료된 요청 수<br>_request로 표시_ |
| **gcp.serviceruntime.api.request_latencies.avg** <br>(gauge) | 비스트리밍 요청 지연 시간(초) 분포<br>_second로 표시_ |
| **gcp.serviceruntime.api.request_latencies.samplecount** <br>(count) | API 요청 지연 시간 샘플 수<br>_second로 표시_ |
| **gcp.serviceruntime.api.request_latencies.sumsqdev** <br>(gauge) | API 요청 지연 시간 제곱 편차 합계<br>_second로 표시_ |
| **gcp.serviceruntime.api.request_latencies_backend.avg** <br>(gauge) | 비스트리밍 요청 백엔드 지연 시간(초) 분포<br>_second로 표시_ |
| **gcp.serviceruntime.api.request_latencies_backend.samplecount** <br>(count) | API 백엔드 요청 지연 시간 샘플 수<br>_second로 표시_ |
| **gcp.serviceruntime.api.request_latencies_backend.sumsqdev** <br>(gauge) | API 백엔드 요청 지연 시간 제곱 편차 합계<br>_second로 표시_ |
| **gcp.serviceruntime.api.request_latencies_overhead.avg** <br>(gauge) | 백엔드를 제외한 비스트리밍 요청 지연 시간(초) 분포<br>_second로 표시_ |
| **gcp.serviceruntime.api.request_latencies_overhead.samplecount** <br>(count) | API 오버헤드 요청 지연 시간 샘플 수<br>_second로 표시_ |
| **gcp.serviceruntime.api.request_latencies_overhead.sumsqdev** <br>(gauge) | API 오버헤드 요청 지연 시간 제곱 편차 합계<br>_second로 표시_ |
| **gcp.serviceruntime.api.request_sizes.avg** <br>(gauge) | 요청 완료 시 기록된 요청 크기(바이트) 분포<br>_byte로 표시_ |
| **gcp.serviceruntime.api.request_sizes.samplecount** <br>(count) | API 요청 크기 샘플 수<br>_byte로 표시_ |
| **gcp.serviceruntime.api.request_sizes.sumsqdev** <br>(gauge) | API 요청 크기 제곱 편차 합계<br>_byte로 표시_ |
| **gcp.serviceruntime.api.response_sizes.avg** <br>(gauge) | 요청 완료 시 기록된 응답 크기(바이트) 분포<br>_byte로 표시_ |
| **gcp.serviceruntime.api.response_sizes.samplecount** <br>(count) | 응답 크기 샘플 수<br>_byte로 표시_ |
| **gcp.serviceruntime.api.response_sizes.sumsqdev** <br>(gauge) | 응답 크기 제곱 편차 합계<br>_byte로 표시_ |
| **gcp.serviceruntime.quota.allocation.usage** <br>(gauge) | 총 소비된 할당량.|
| **gcp.serviceruntime.quota.exceeded** <br>(gauge) | 할당량 한도 초과 시 발생한 오류.|
| **gcp.serviceruntime.quota.limit** <br>(gauge) | 할당량 한도.|
| **gcp.serviceruntime.quota.rate.net_usage** <br>(count) | 총 소비된 속도 할당량.|

### 이벤트

Google 클라우드 API 통합에는 점검이 포함되어 있지 않습니다.

### 서비스 점검

Google 클라우드 API 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하세요? [Datadog 지원 팀](https://docs.datadoghq.com/help/)에 문의하세요.