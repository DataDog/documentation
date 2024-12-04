---
categories:
- azure
- 클라우드
- 데이터 스토어
custom_kind: 통합
dependencies: []
description: Azure DB for MariaDB의 핵심 메트릭 추적하기
doc_link: https://docs.datadoghq.com/integrations/azure_db_for_mariadb/
draft: false
git_integration_title: azure_db_for_mariadb
has_logo: true
integration_id: azure-dbformariadb
integration_title: Microsoft Azure DB for MariaDB
integration_version: ''
is_public: true
manifest_version: '1.0'
name: azure_db_for_mariadb
public_title: Datadog-Microsoft Azure DB for MariaDB 통합
short_description: Azure DB for MariaDB의 핵심 메트릭 추적하기
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Azure Database for MariaDB는 완전관리형 엔터프라이즈 지원 커뮤니티 MariaDB 데이터베이스를 제공하는 서비스입니다.

Azure Database for MariaDB 메트릭을 얻으면 다음을 할 수 있습니다.

- MariaDB 데이터베이스 성능 가시화
- MariaDB 데이터베이스의 성능과 애플리케이션의 상관 관계 파악

## 설정

### 설치

아직 설정하지 않았다면, 먼저 [Microsoft Azure 통합][1]을 설정하세요. 그 외 다른 설치 단계는 없습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "azure_db_for_mariadb" >}}


### 이벤트

Azure Database for MariaDB 통합에는 이벤트가 포함되어 있지 않습니다.

### 서비스 점검

Azure Database for MariaDB 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://docs.datadoghq.com/ko/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_db_for_mariadb/azure_db_for_mariadb_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/