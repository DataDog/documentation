---
aliases:
- /ko/integrations/awsautoscaling/
- /ko/integrations/faq/get-your-autoscaling-group-events-and-metrics/
categories:
- automation
- aws
- cloud
- configuration & deployment
- log collection
- provisioning
dependencies: []
description: Auto Scaling 그룹에서 인스턴스 상태 및 개수를 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_auto_scaling/
draft: false
git_integration_title: amazon_auto_scaling
has_logo: true
integration_id: ''
integration_title: AWS Auto Scaling
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_auto_scaling
public_title: Datadog-AWS Auto Scaling 통합
short_description: Auto Scaling 그룹에서 인스턴스 상태 및 개수를 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

AWS Auto Scaling은 사용자 정의 정책을 기반으로 자동으로 EC2 인스턴스를 시작하거나 종료하는 서비스입니다.

이 통합을 활성화하여 Datadog에서 모든 Auto Scaling 메트릭을 참조하세요.

- `autoscaling_group` 태그를 사용해 Auto Scaling 그룹에서 호스트에 대한 EC2 메트릭을 수집하세요.
- `autoscaling_group` 및 `autoscalinggroupname` 태그를 사용해 특정 그룹에 대한 Auto Scaling 메트릭을 수집하세요.

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. Datadog [AWS 통합 페이지][2]에서 `Metric Collection` 탭 아래 `AutoScaling`가 활성화되어 있는지 확인하세요.
2. AWS에서 Auto Scaling 데이터는 클라우드와치(CloudWatch)에 전송되어야 합니다. [Auto Scaling Group 메트릭 활성화][3]를 참조하세요.
3. AWS Auto Scaling 메트릭을 수집하려면 [Datadog IAM 정책][4]에 다음 권한을 추가합니다. 자세한 정보는 AWS 웹사이트에서 [Auto Scaling 정책][5]을 참조하세요.

    | AWS 권한                          | 설명                                                                                                                                                                                                                                             |
    | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `autoscaling:DescribeAutoScalingGroups` | Auto Scaling 그룹 전체를 목록화하는 데 사용됩니다.                                                                                                                                                                                                                    |
    | `autoscaling:DescribePolicies`          | (이벤트와 모니터 자동 완료를 위해) 사용 가능한 정책을 목록화합니다.                                                                                                                                                                                     |
    | `autoscaling:DescribeTags`              | 제공된 Auto Scaling 그룹에 태그를 목록화하는 데 사용됩니다. 이를 통해  ASG 클라우드와치 메트릭에 ASG 커스텀 태그를 추가할 수 있습니다.                                                                                                                                           |
    | `autoscaling:DescribeScalingActivities` | ASG 확대 또는 축소 시 이벤트를 생성하는 데 사용됩니다.                                                                                                                                                                                                   |
    | `autoscaling:ExecutePolicy`             | 하나의 정책을 실행합니다(이벤트 피드 또는 모니터에서 확대 또는 축소).<br>[설치 정책 설명서](#installation)에 포함되어 있지 않으며 Auto Scaling 정책을 실행하는 데 이벤트나 모니터를 사용하는 경우에만 포함되어야 합니다. |

4. [Datadog - AWS Auto 확장 통합][6]을 설치합니다.

### 로그 수집

#### 로깅 활성화

S3 버킷 또는 클라우드와치 중 하나로 로그를 전송하려면 AWS Auto Scaling을 설정하세요.

**참고**: S3 버킷에 로그인하면 `amazon_auto_scaling`이 _Target prefix_로 설정되어 있는지 확인하세요.

#### Datadog에 로그 전송

1. 이미 하지 않은 경우 [Datadog 포워더 람다 함수][7]를 설정하세요.
2. 람다 함수가 설치되면 AWS 콘솔에 AWS Auto Scaling 로그를 포함하는 S3 버킷 또는 클라우드와치 로그 그룹에서 트리거를 수동으로 추가합니다.

    - [S3 버킷에 수동 트리거 추가][8]
    - [클라우드와치 로그 그룹에 수동 트리거 추가][9]

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_auto_scaling" >}}


AWS에서 검색된 각 메트릭에는 AWS 콘솔에 나타나는 것과 동일한 태그가 할당됩니다, 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않습니다.

### 이벤트

AWS Auto-Scaling 통합은 EC2 인스턴스 시작 및 종료를 위한 이벤트를 포함합니다. 아래에서 예시 이벤트를 참조하세요.

{{< img src="integrations/amazon_auto_scaling/aws_auto_scaling_events.png" alt="AWS Auto-Scaling Events" >}}

### 서비스 검사

AWS Auto-Scaling 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

ASG 메트릭이 Datadog에서 표시되도록 하려면 먼저 AWS 콘솔에서 활성화해야 합니다. [ASG 메트릭 활성화 방법에 대한 AWS 지침을 참조하세요][11]. **참고**: 해당 메트릭이 활성화된 후 표시되는 데 시간이 걸릴 수 있습니다.

도움이 필요하신가요? [Datadog 고객 지원팀][12]에 문의해주세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-instance-monitoring.html#as-enable-group-metrics
[4]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#installation
[5]: https://docs.aws.amazon.com/autoscaling/plans/userguide/auth-and-access-control.html
[6]: https://app.datadoghq.com/integrations/amazon-auto-scaling
[7]: https://docs.datadoghq.com/ko/logs/guide/forwarder/
[8]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[9]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[10]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_auto_scaling/amazon_auto_scaling_metadata.csv
[11]: http://docs.aws.amazon.com/autoscaling/latest/userguide/as-instance-monitoring.html#enable-detailed-instance-metrics
[12]: https://docs.datadoghq.com/ko/help/