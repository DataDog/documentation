---
aliases:
- /ko/integrations/awsebs/
categories:
- cloud
- data stores
- aws
- log collection
dependencies: []
description: 스냅샷 기간, IOPS, 읽기/쓰기 시간 등을 추적하세요
doc_link: https://docs.datadoghq.com/integrations/amazon_ebs/
draft: false
git_integration_title: amazon_ebs
has_logo: true
integration_id: ''
integration_title: Amazon Elastic Block Store
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_ebs
public_title: Datadog-Amazon Elastic Block Store 통합
short_description: 스냅샷 기간, IOPS, 읽기/쓰기 시간 등을 추적하세요
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon EBS는 AWS 클라우드에서 Amazon EC2 인스턴스 블록 저장 물량을 제공했습니다.

이 통합을 활성화하여 Datadog에서 모든 EBS 메트릭을 확인합니다.

## 설정

### 설치

아직 설치하지 않았다면, [Amazon Web Services 통합을 먼저][1] 설치하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]의 `Metric Collection` 탭 아래에서 `EBS`를 확인할 수 있습니다.
2. Datadog - Amazon EBS를 소개합니다.[4]

**참고**: 이 통합은 모니터링되는 EC2 에 연결된 EBS 볼륨에 대해 메트릭 을 수집합니다. 모든 EBS 메트릭 를 수집하려면 [AWS 통합 페이지][2]에서 EC2가 체크되어 있고 [리소스 수집 제한][4] 설정으로 EC2가 모니터링 에서 제외되지 않았는지 확인합니다.

### 로그 수집

#### 로깅 활성화

설정하다 Amazon EBS로 로그 를 S3 버킷 또는 클라우드와치(CloudWatch) 으로 전송합니다.

**Note**: If you log to a S3 bucket, make sure that `amazon_ebs` is set as _Target prefix_.

#### Datadog에 로그 전송

1. 이미 하지 않은 경우 [Datadog 포워더 람다 함수][5]를 설정하세요.
2. 람다 함수가 설치되면 AWS  콘솔에서 Amazon EBS 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 수동 트리거를 추가합니다.

    - [S3 버킷에 수동 트리거 추가][6]
    - [클라우드와치 로그 그룹에 수동 트리거 추가][7]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_ebs" >}}


AWS에서 검색된 각 메트릭에는 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않고 AWS 콘솔에 표시되는 동일한 태그가 할당됩니다.

### 이벤트

Amazon EBS 통합은 이벤트를 포함하지 않습니다.

### 서비스 검사

Amazon EBS에는 서비스 점검이 포함되지 않았습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

## 참고 자료

- [Amazon EBS 모니터링을 위한 핵심 메트릭][10] 
- [아마존 EBS 메트릭 수집 생성] [11]
- [Datadog를 통한 Amazon EBS 모니터링][12]

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-ebs
[4]: https://docs.datadoghq.com/ko/account_management/billing/aws/#aws-resource-exclusion
[5]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ebs/amazon_ebs_metadata.csv
[9]: https://docs.datadoghq.com/ko/help/
[10]: https://www.datadoghq.com/blog/amazon-ebs-monitoring
[11]: https://www.datadoghq.com/blog/collecting-amazon-ebs-metrics
[12]: https://www.datadoghq.com/blog/monitoring-amazon-ebs-volumes-with-datadog