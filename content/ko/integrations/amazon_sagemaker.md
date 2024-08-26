---
categories:
- 자동화
- aws
- cloud
- 로그 수집
- ai/ml
dependencies: []
description: 핵심 Amazon SageMaker 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_sagemaker/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-cloudhealth-assets-datadog/
  tag: 블로그
  text: 'CloudHealth + Datadog: 클라우드 자산을 효과적으로 관리하세요.'
git_integration_title: amazon_sagemaker
has_logo: true
integration_id: ''
integration_title: Amazon SageMaker
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_sagemaker
public_title: Datadog-Amazon SageMaker 통합
short_description: 핵심 Amazon SageMaker 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon SageMaker는 완전관리형 머신러닝 서비스입니다. Amazon SageMaker를 사용해 데이터 과학자와 개발자는 머신러닝 모델을 구축하고 트레이닝한 다음 직접 프로덕션 레디 호스팅 환경에 배포할 수 있습니다.

이 통합을 활성화하여 Datadog에서 모든 SageMaker 메트릭을 확인하세요.

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Metric Collection` 탭에 `SageMaker`가 활성화되어 있는지 확인하세요.
2. [Datadog - Amazon SageMaker 통합][3]을 설치하세요.

### 로그 수집

#### 로깅 활성화

Amazon SageMaker를 설정하여 S3 버킷 또는 클라우드와치(CloudWatch) 중 하나로 로그를 전송하세요.

**참고**: S3 버킷에 로그인한 경우 `amazon_sagemaker`가 _대상 접두어_로 설정되어 있는지 확인하세요.

#### Datadog에 로그 전송

1. 이미 하지 않은 경우 [Datadog 로그 수집 AWS 람다 함수][4]를 설정하세요.
2. 람다 함수가 설치되면 AWS 콘솔에서 Amazon SageMaker 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 대해 수동으로 트리거를 추가합니다. 

    - [S3 버킷에서 직접 트리거 추가][5]
    - [클라우드와치(CloudWatch) 로그 그룹에 수동 트리거 추가][6]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_sagemaker" >}}


### 이벤트

Amazon SageMaker 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Amazon SageMaker 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 즉시 사용 가능한 모니터링

Datadog는 SageMaker 엔드포인트 및 작업에 대해 즉시 사용 가능한 대시보드를 제공합니다.

### SageMaker 엔드포인트

[SageMaker 엔드포인트 대시보드][8]를 사용하여 즉시 추가 설정 없이 SageMaker 엔드포인트의 상태 및 성능 모니터링을 시작할 수 있습니다. 어느 엔드포인트에 오류, 예상보다 높은 지연 또는 트래픽 급증이 있는지 확인하세요. 인스턴스 유형과 CPU, GPU, 메모리 및 디스크 활용률 메트릭을 사용해 확장 정책 선택 항목 을 검토하고 교정하세요.

{{< img src="integrations/amazon_sagemaker/sagemaker_endpoints.png" alt="즉시 사용 가능한 SageMaker 엔드포인트 대시보드" style="width:80%;">}}

### SageMaker 작업

[SageMaker 작업 대시보드][9]를 사용해 리소스 활용률에 대한 인사이트를 확보할 수 있습니다. 예를 들어 트레이닝, 프로세싱 또는 변환 작업의 CPU, GPU 및 스토리지 병목 현상을 찾아볼 수 있습니다. 이러한 정보를 사용해 컴퓨팅 인스턴스를 최적화하세요.

{{< img src="integrations/amazon_sagemaker/sagemaker_jobs.png" alt="즉시 사용 가능한 SageMaker 작업 대시보드" style="width:80%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-sagemaker
[4]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=automaticcloudformation#log-collection
[5]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_sagemaker/amazon_sagemaker_metadata.csv
[8]: https://app.datadoghq.com/dash/integration/31076/amazon-sagemaker-endpoints
[9]: https://app.datadoghq.com/dash/integration/31077/amazon-sagemaker-jobs
[10]: https://docs.datadoghq.com/ko/help/