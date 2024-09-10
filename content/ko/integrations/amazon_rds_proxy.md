---
categories:
- aws
- cloud
- 데이터 스토어
- 로그 수집
dependencies: []
description: Amazon RDS Proxy의 핵심 메트릭 추적하기.
doc_link: https://docs.datadoghq.com/integrations/amazon_rds_proxy/
draft: false
git_integration_title: amazon_rds_proxy
has_logo: true
integration_id: ''
integration_title: Amazon RDS Proxy
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_rds_proxy
public_title: Datadog-Amazon RDS Proxy 통합
short_description: Amazon RDS Proxy의 핵심 메트릭 추적하기.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon RDS Proxy는 Amazon Relational Database Service(RDS)에서 사용되는, 가용성이 매우 높은 전체 관리형 데이터베이스 프록시입니다. 이 서비스를 사용해 애플리케이션의 확장성을 높이고, 데이터베이스 실패 회복력을 높이면서 보안을 강화할 수 있습니다.

이 통합을 활성화하면 Datadog에서 RDS Proxy 메트릭 전체를 확인할 수 있습니다.

## 설정

### 설치

아직 설정하지 않은 경우 [먼저 Amazon Web Services 통합을 설정][1]하세요.
[Amazon RDS 통합][2] 또한 활성화해야 합니다.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Metric Collection` 탭 하단에 `RDS Proxy`가 활성화되어 있는지 확인합니다.
2. [Datadog - Amazon RDS Proxy 통합][4]을 설치하세요.

### 로그 수집

#### 로깅 활성화

RDS Proxy를 생성할 때 고급 구성에서 로깅을 활성화할 수 있습니다. [RDS Proxy 시작하기][5]에 안내된 지침에 따라 RDS Proxy 로그를 Cloudwatch로 전송하세요.

#### Datadog로 로그 전송

1. 아직 설정하지 않았다면 [Datadog 로그 수집 AWS Lambda 함수][6]를 설정하세요.
2. Lambda 함수를 설치한 후 RDS Proxy 로그가 있는 CloudWatch 로그 그룹에 수동으로 트리거를 추가하세요. 해당하는 CloudWatch 로그 그룹을 선택하고 필터 이름을 추가(선택 사항)한 후 트리거를 추가하세요.

완료되면 [Datadog Log Explorer][7]로 이동해 로그를 분석합니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_rds_proxy" >}}


### 이벤트

Amazon RDS Proxy 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Amazon RDS Proxy 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][9]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://docs.datadoghq.com/ko/integrations/amazon_rds/
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://app.datadoghq.com/integrations/amazon-rds-proxy
[5]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy-setup.html#rds-proxy-creating
[6]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=roledelegation#log-collection
[7]: https://app.datadoghq.com/logs
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_rds_proxy/amazon_rds_proxy_metadata.csv
[9]: https://docs.datadoghq.com/ko/help/