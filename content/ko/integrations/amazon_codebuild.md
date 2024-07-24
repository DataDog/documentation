---
aliases:
- /ko/integrations/awscodebuild/
categories:
- aws
- cloud
- 설정 및 배포
- 로그 수집
dependencies: []
description: 실시간으로 배포를 참조하고 배포 소요 시간을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_codebuild/
draft: false
git_integration_title: amazon_codebuild
has_logo: true
integration_id: ''
integration_title: AWS CodeBuild
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_codebuild
public_title: Datadog-AWS CodeBuild 통합
short_description: 실시간으로 배포를 참조하고 배포 소요 시간을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

AWS CodeBuild는 소스 코드를 컴파일하고, 테스트를 실행하고, 배포 준비된 소프트웨어 패키지를 생성하는 빌드 서비스입니다.

Datadog AWS CodeBuild 통합 설치 대상:

- 프로젝트별 빌드 추적
- 빌드에서 메트릭 수집
- 남은 Datadog 메트릭을 통해 빌드 연계

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `CloudBuild`가 `Metric Collection` 탭 아래 활성화되었는지 확인하세요.

2. [Datadog - AWS Codebuild 통합][3]을 설치하세요.

### 로그 수집

#### 로깅 활성화

AWS CodeBuild를 설정해 S3 버킷 또는 클라우드와치(CloudWatch) 중 하나에 로그를 전송하세요.

**참고**: S3 버킷에 로그인하면 `amazon_codebuild`를 _대상 접두어_로 설정합니다.

#### Datadog에 로그 전송

1. 이미 하지 않은 경우 [Datadog 포워더 람다 함수][4]를 설정하세요.
2. 람다 함수가 설치되면 AWS 콘솔에 AWS CodeBuild 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 수동으로 트리거를 추가합니다.

    - [S3 버킷에서 직접 트리거 추가][5]
    - [클라우드와치(CloudWatch) 로그 그룹에 수동 트리거 추가][6]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_codebuild" >}}


### 이벤트

AWS CodeBuild 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

AWS CodeBuild 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-codebuild
[4]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[5]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[6]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_codebuild/amazon_codebuild_metadata.csv
[8]: https://docs.datadoghq.com/ko/help/