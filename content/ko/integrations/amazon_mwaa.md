---
categories:
- cloud
- aws
- 로그 수집
dependencies: []
description: Amazon Managed Workflows for Apache Airflow(MWAA)의 핵심 메트릭 추적하기.
doc_link: https://docs.datadoghq.com/integrations/amazon_mwaa/
draft: false
git_integration_title: amazon_mwaa
has_logo: true
integration_id: ''
integration_title: Amazon Managed Workflows for Apache Airflow(MWAA)
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_mwaa
public_title: Datadog-Amazon Managed Workflows for Apache Airflow(MWAA) 통합
short_description: Amazon Managed Workflows for Apache Airflow(MWAA)의 핵심 메트릭 추적하기.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Amazon Managed Workflows for Apache Airflow(MWAA)는 Apach Airflow용 관리형 서비스로, 클라우드에서 워크플로우를 빌드하고 관리하기 쉽게 도와줍니다.

이 통합을 활성화하면 Datadog에서 모든 MWAA 메트릭을 확인할 수 있습니다.

## 설정

### 설치

아직 설정하지 않은 경우 먼저 [Amazon Web Services 통합][1]을 설정하세요.

### 메트릭 수집

1. [AWS 통합 페이지][2]에서 `Metric Collection` 탭 하단의 `MWAA`가 활성화되어 있는지 확인합니다.
2. [Datadog - Amazon Managed Workflows for Apache Airflow(MWAA) 통합][3]을 설치하세요.

### 로그 수집

1. [로그를 CloudWatch][4]로 전송하도록 AWS MWAA를 구성하세요.
2. [Datadog로 로그를 전송하세요][5].

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_mwaa" >}}


### 이벤트

Amazon Managed Workflows for Apache Airflow(MWAA) 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Amazon Managed Workflows for Apache Airflow(MWAA) 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][7]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-mwaa
[4]: https://docs.aws.amazon.com/mwaa/latest/userguide/monitoring-airflow.html#monitoring-airflow-enable
[5]: /ko/integrations/amazon_web_services/?tab=roledelegation#log-collection
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mwaa/amazon_mwaa_metadata.csv
[7]: https://docs.datadoghq.com/ko/help/