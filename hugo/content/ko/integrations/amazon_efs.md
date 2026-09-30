---
aliases:
- /ko/integrations/awsefs/
categories:
- aws
- cloud
- data stores
- log collection
- os & system
dependencies: []
description: 핵심 Amazon Elastic Filesystem 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_efs/
draft: false
git_integration_title: amazon_efs
has_logo: true
integration_id: ''
integration_title: Amazon Elastic File System
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_efs
public_title: Datadog-Amazon Elastic File System 통합
short_description: 핵심 Amazon Elastic Filesystem 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon EFS는 AWS 람다 함수 또는 Amazon EC2 인스턴스와 함께 사용할 수 있는 단순하면서도 확장 가능한 스토리지를 제공합니다.

이 통합을 활성화해 Datadog에서 모든 EFS 메트릭을 수집하세요.

## 설정

### 설치

아직 설치하지 않았다면, [Amazon Web Services 통합을 먼저][1] 설치하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `EFS`이 `Metric Collection` 탭 아래에서 활성화되어 있는지 확인하세요.
2. Amazon EFS 메트릭을 수집하려면 [Datadog IAM 정책][3]에 해당 권한을 추가합니다. 

    - `elasticfilesystem:DescribeTags`: 파일 시스템에 적용된 커스텀 태그를 받습니다.
    - `elasticfilesystem:DescribeFileSystems`: 활성 파일 시스템 목록을 제공합니다.

    자세한 정보는 AWS 웹사이트에서 [EFS 정책][4]을 참조하세요.

3. [Datadog - Amazon EFS 통합][5]을 설치하세요.

### 로그 수집

#### 로깅 활성화

Amazon EFS를 설정하여 S3 버킷 또는 클라우드와치(CloudWatch) 중 하나로 로그를 전송합니다.

**참고**: S3 버킷에 로깅하는 경우 `amazon_efs`가 _대상 접두어_로 설정되어 있는지 확인하세요.

#### Datadog에 로그 전송

1. 이미 하지 않은 경우 [Datadog 포워더 람다 함수][6]를 설정하세요.
2. 람다 함수가 설치되면 AWS  콘솔에서 Amazon EFS 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 대해 수동 트리거를 추가합니다.

    - [S3 버킷에 수동 트리거 추가][7]
    - [클라우드와치 로그 그룹에 수동 트리거 추가][8]

### Amazon EFS for Lambda

[Amazon EFS for Lambda][9]를 사용하면 EFS를 람다 함수에 연결할 수 있습니다. 조직은 EFS for Lambda를 사용해 기계 학습과 데이터 프로세싱 워크로드를 단순화하여 완전한 서버리스 환경을 구현할 수 있습니다. EFS별로 람다 메트릭과 로그를 구분하는 방법은 다음과 같습니다.

1. [AWS 람다 통합][10]을 설치하고 메트릭 수집을 활성화하세요.
2. 이 권한을 [Datadog IAM 정책][3]에 추가하세요.

    - `elasticfilesystem:DescribeAccessPoints`: 람다 함수에 연결된 활성 EFS를 목록화합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_efs" >}}


AWS에서 검색된 각 메트릭에는 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않고 AWS 콘솔에 표시되는 동일한 태그가 할당됩니다.

### 이벤트

AWS Elastic File System 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

AWS Elastic File System 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][12]에 문의해주세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/efs/latest/ug/auth-and-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-efs
[6]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[7]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[8]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[9]: /ko/integrations/amazon_lambda/#amazon-efs-for-lambda
[10]: https://docs.datadoghq.com/ko/integrations/amazon_lambda/#aws-lambda-metrics
[11]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_efs/amazon_efs_metadata.csv
[12]: https://docs.datadoghq.com/ko/help/