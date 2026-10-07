---
aliases:
- /ko/integrations/awsemr/
categories:
- aws
- cloud
- log collection
dependencies: []
description: Amazon EMR 핵심 메트릭 추적하기.
doc_link: https://docs.datadoghq.com/integrations/amazon_emr/
draft: false
git_integration_title: amazon_emr
has_logo: true
integration_id: ''
integration_title: Amazon EMR
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: '1.0'
name: amazon_emr
public_title: Datadog-Amazon EMR 통합
short_description: Amazon EMR 핵심 메트릭 추적하기.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon EMR는 대량의 데이터를 쉽고 빠르며 비용 효율적으로 처리할 수 있게 도와드리는 웹 서비스입니다.

본 통합을 활성화하여 Datadog에서 EMR 메트릭을 확인하세요.

## 설정

### 설치

아직 설정하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Metric Collection` 탭의 `EMR`이 활성화되어 있는지 확인하세요.
2. Amazon EMR 메트릭을 수집하려면 다음 권한을 [Datadog IAM 정책][3]에 추가합니다. 자세한 정보는 AWS 웹사이트의 [EMR 정책][4]을 참조하세요.

    | AWS 권한                    | 설명                         |
    | ---------------------------------- | ----------------------------------- |
    | `elasticmapreduce:ListClusters`    | 이용 가능한 클러스터 목록.            |
    | `elasticmapreduce:DescribeCluster` | 클라우드와치(CloudWatch) EMR 메트릭에 태그 추가. |

3. [Datadog - Amazon EMR 통합][5]을 설치하세요.

### 로그 수집

#### 로깅 활성화

Amazon EMR를 설정하여 S3 버킷 또는 클라우드와치(CloudWatch) 중 하나로 로그를 전송합니다.

**참고**: S3 버킷에 로깅하는 경우 `amazon_emr`이 _대상 접두어_( _Target prefix_)로 설정되어 있는지 확인하세요.

#### Datadog에 로그 전송

1. 이미 하지 않은 경우 [Datadog 포워더 람다 함수][6]를 설정하세요.
2. 람다 함수가 설치되면 AWS  콘솔에서 Amazon EMR 로그를 포함하는 S3 버킷 또는 클라우드와치(CloudWatch) 로그 그룹에 수동 트리거를 추가합니다.

    - [S3 버킷에 수동 트리거 추가][7]
    - [클라우드와치 로그 그룹에 수동 트리거 추가][8]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_emr" >}}


AWS에서 검색된 각 메트릭에는 AWS 콘솔에 나타나는 것과 동일한 태그가 할당됩니다, 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않습니다.

### 이벤트

Amazon EMR 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Amazon EMR 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/load-balancer-authentication-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-emr
[6]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[7]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[8]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_emr/amazon_emr_metadata.csv
[10]: https://docs.datadoghq.com/ko/help/