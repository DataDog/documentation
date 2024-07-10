---
aliases:
- /ko/integrations/awscodedeploy/
categories:
- automation
- aws
- cloud
- configuration & deployment
- log collection
- provisioning
dependencies: []
description: 실시간으로 배포를 참조하고 배포 소요 시간을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_codedeploy/
draft: false
git_integration_title: amazon_codedeploy
has_logo: true
integration_id: amazon-codedeploy
integration_title: AWS CodeDeploy
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_codedeploy
public_title: Datadog-AWS CodeDeploy 통합
short_description: 실시간으로 배포를 참조하고 배포 소요 시간을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/amazon_codedeploy/monitor-aws-codedeploy-dashboard.png" alt="CodeDeploy 기본 대시보드" popup="true">}}

## 개요

AWS 코드디플로이(CodeDeploy)는 클라우드 및 온프레미스에서 인스턴스로의 코드 배포를 자동화하는 서비스입니다.

이 통합을 활성화하여 Datadog에서 AWS 코드디플로이(CodeDeploy) 배포 이벤트와 메트릭을 참조하세요.

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. Amazon 코드디플로이(CodeDeploy) 메트릭을 수집하려면 [Datadog IAM 정책][2]에 다음 권한을 추가하세요. 자세한 내용은 AWS 웹사이트에서 [코드디플로이(CodeDeploy) 정책][3]을 참조하세요.

    | AWS 권한                        | 설명                                                                   |
    | ------------------------------------- | ----------------------------------------------------------------------------- |
    | `codedeploy:ListApplications`         | 모든 코드디플로이(CodeDeploy) 애플리케이션을 목록화하는 데 사용됨                                    |
    | `codedeploy:ListDeploymentGroups`     | 애플리케이션 내 모든 배포 그룹을 목록화하는 데 사용됨 (편집됨)             |
    | `codedeploy:ListDeployments`          | 애플리케이션 내 배포 그룹에서 배포를 목록화하는 데 사용됨 (편집됨) |
    | `codedeploy:BatchGetDeployments`      | 배포의 상세한 설명을 가져옴 (편집됨)                     |
    | `codedeploy:BatchGetDeploymentGroups` | 배포 그룹의 상세한 설명을 가져옴                               |

2.  [Datadog - AWS 코드디플로이(CodeDeploy) 통합][4]을 설치하세요.

### 로그 수집

#### 로깅 활성화

AWS 코드디플로이(CodeDeploy)를 설정하여 S3 버킷 또는 클라우드와치(CloudWatch)로 로그를 전송하세요.

**참고**: S3 버킷에 기록하면 `amazon_codedeploy`를 _대상 접두어_로 설정합니다.

#### Datadog에 로그 보내기

1. 이미 하지 않은 경우 [Datadog 포워더 람다 함수][5]를 설정하세요.
2. 람다 함수가 설치되면 AWS 콘솔에 AWS 코드디플로이(CodeDeploy) 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 수동으로 트리거를 추가합니다.

    - [S3 버킷에 수동 트리거 추가][6]
    - [클라우드와치 로그 그룹에 수동 트리거 추가][7]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_codedeploy" >}}


AWS에서 검색된 각 메트릭에는 AWS 콘솔에 나타나는 것과 동일한 태그가 할당됩니다, 호스트 이름, 보안 그룹 등을 포함하되 이에 제한되지 않습니다.

### 이벤트

AWS 코드디플로이(CodeDeploy) 통합은 성공, 실패 또는 중단된 배포에 대한 이벤트를 포함합니다. 아래에서 예시 이벤트를 참조하세요.

{{< img src="integrations/amazon_codedeploy/aws_codedeploy_events.png" alt="AWS Codedeploy Events" >}}

### 서비스 점검

AWS 코드디플로이(CodeDeploy) 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#installation
[3]: https://docs.aws.amazon.com/codedeploy/latest/userguide/security-iam.html
[4]: https://app.datadoghq.com/integrations/amazon_codedeploy
[5]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[6]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[7]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_codedeploy/amazon_codedeploy_metadata.csv
[9]: https://docs.datadoghq.com/ko/help/