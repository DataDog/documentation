---
categories:
- aws
- cloud
- 데이터 스토어
- 로그 수집
dependencies: []
description: 핵심 Amazon S3 Storage Lens 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_s3_storage_lens
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/amazon-s3-storage-lens-monitoring-datadog/
  tag: 블로그
  text: Amazon S3 Storage Lens 메트릭을 통해 S3 스토리지를 모니터링하고 최적화하세요.
git_integration_title: amazon_s3_storage_lens
has_logo: true
integration_id: ''
integration_title: Amazon S3 Storage Lens
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_s3_storage_lens
public_title: Datadog-Amazon S3 Storage Lens 통합
short_description: 핵심 Amazon S3 Storage Lens 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon S3 Storage Lens는 Amazon S3 스토리지 전반에서의 사용량 및 활동에 대한 단일 보기를 제공합니다. S3 Storage Lens를 사용해 요약 인사이트를 생성하여 전체 조직에서 보유한 스토리지 용량이나 가장 빨리 성장하는 버킷과 접두어 등을 확인할 수 있습니다. 스토리지 메트릭에서 아웃라이어(outlier)를 식별한 다음 더욱 심도 깊게 사용량 또는 활동 급증의 원인을 조사하세요.

이 통합을 활성화하여 Datadog에서 모든 S3 Storage Lens 메트릭을 확인하세요.

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. AWS 계정 내에서 [S3 Storage Lens용 CloudWatch 퍼블리싱][2]을 활성화합니다. 이 기능을 사용하려면 "고급 메트릭 및 권장 사항"을 이용해야 합니다.
2. [AWS 통합 페이지][3]의 `Metric Collection` 탭에서 `S3 Storage Lens`가 활성화되어 있도록 합니다.
3. [Datadog - Amazon S3 Storage Lens 통합][4]을 설치하세요.

**참고**: S3 Storage Lens 메트릭은 일일 메트릭으로 하루에 한 번 클라우드와치에 게시됩니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_s3_storage_lens" >}}


### 이벤트

Amazon S3 Storage Lens 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Amazon S3 Storage Lens 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][6]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-lens-cloudwatch-enable-publish-option.html
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-s3-storage-lens
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_s3_storage_lens/amazon_s3_storage_lens_metadata.csv
[6]: https://docs.datadoghq.com/ko/help/