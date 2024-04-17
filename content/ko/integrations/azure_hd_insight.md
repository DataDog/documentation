---
aliases:
- /ko/integrations/azure_hdinsight
categories:
- cloud
- azure
dependencies: []
description: 주요 Azure HDInsight 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/azure_hd_insight/
draft: false
git_integration_title: azure_hd_insight
has_logo: true
integration_id: azure-hdinsight
integration_title: Microsoft Azure HDInsight
integration_version: ''
is_public: true
kind: 통합
manifest_version: '1.0'
name: azure_hd_insight
public_title: Datadog-Microsoft Azure HDInsight 통합
short_description: 주요 Azure HDInsight 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure HDInsight는 대량의 데이터를 쉽고 빠르며 비용 효율적으로 처리할 수 있게 해주는 클라우드 서비스입니다.

Datadog Azure 통합을 사용해 Azure HDInsight 메트릭을 수집할 수 있습니다.

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_hd_insight" >}}


### 이벤트

Azure HDInsight 통합에는 이벤트가 포함되지 않습니다.

### 서비스 검사

Azure HDInsight 통합에는 서비스 점검이 포함되지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_hd_insight/azure_hd_insight_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/