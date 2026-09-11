---
categories:
- cloud
- aws
- 로그 수집
dependencies: []
description: 주요 Amazon EC2 Spot 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_ec2_spot/
draft: false
git_integration_title: amazon_ec2_spot
has_logo: true
integration_id: ''
integration_title: Amazon EC2 Spot
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: '1.0'
name: amazon_ec2_spot
public_title: Datadog-Amazon EC2 Spot 통합
short_description: 주요 Amazon EC2 Spot 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon EC2 Spot 인스턴스를 사용하면 AWS 클라우드에서 사용되지 않은 EC2 용량을 활용할 수 있습니다.

이 통합을 활성화하여 Datadog에서 모든 EC2 Spot [Fleet 메트릭][1]을 확인하세요.

## 설정

### 설치

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][2]을 설정합니다. 

### 메트릭 수집

1. [AWS 통합 페이지][3]의 `Metric Collection` 탭 아래 `EC2 Spot`이 활성화되어 있는지 확인하세요.
2. [Datadog - Amazon EC2 Spot 통합][4]을 설치합니다.

### 로그 수집

[Datadog Agent][5] 또는 [Rsyslog][6]와 같은 다른 로그 전달자를 사용하여 로그를 Datadog으로 보냅니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_ec2_spot" >}}


### 이벤트

Amazon EC2 Spot 통합에는 이벤트가 포함되지 않습니다.

### 서비스 점검

Amazon EC2 Spot 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][8]에 문의하세요.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-fleet-cloudwatch-metrics.html
[2]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-ec2-spot
[5]: https://docs.datadoghq.com/ko/agent/logs/
[6]: https://docs.datadoghq.com/ko/integrations/rsyslog/
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ec2_spot/amazon_ec2_spot_metadata.csv
[8]: https://docs.datadoghq.com/ko/help/