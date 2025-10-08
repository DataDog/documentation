---
app_id: redisenterprise
app_uuid: a353f8c5-240c-48f9-b2a1-c86d2da0c07e
assets:
  dashboards:
    Redis Enterprise Active/Active Statistics: assets/dashboards/redis_enterprise_active_active.json
    Redis Enterprise Cluster Overview: assets/dashboards/redisenterprise_cluster_top_view.json
    Redis Enterprise Database Overview: assets/dashboards/redisenterprise_overview.json
    Redis Enterprise Redis on Flash: assets/dashboards/redisenterprise_rof.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: redisenterprise.total_node_count
      metadata_path: metadata.csv
      prefix: redisenterprise.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10190
    source_type_name: Redis 엔터프라이즈
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Redis
  sales_email: github@mague.com
  support_email: github@mague.com
categories:
- 데이터 스토어
- 캐싱(caching)
custom_kind: 통합
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/redisenterprise/README.md
display_on_public_website: true
draft: false
git_integration_title: redisenterprise
integration_id: redisenterprise
integration_title: RedisEnterprise (지원 중단됨)
integration_version: 1.2.0
is_public: true
manifest_version: 2.0.0
name: redisenterprise
public_title: RedisEnterprise (지원 중단)
short_description: Redis 엔터프라이즈 관측 가능성
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Stores
  - Category::Caching
  - Offering::Integration
  configuration: README.md#Setup
  description: Redis 엔터프라이즈 관측 가능성
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: RedisEnterprise (지원 중단)
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


![img][1]

## 개요

**본 통합은 2024년 11월 1일부터 지원 중단되었습니다. 앞으로는 최신 [Redis 엔터프라이즈 Datadog 통합][2]를 사용하세요. 새로운 통합에는 최신 Redis 엔터프라이즈 메트릭이 모두 노출되며 업데이트된 대시보드가 포함되어 있습니다.**

이 통합은 Datadog용 [Redis 엔터프라이즈][3] 모니터링 및 메트릭을 제공합니다.

### Redis Enterprise란 무엇인가요?

[Redis 엔터프라이즈][3]는 Redis의 완전 지원 엔터프라이즈 버전입니다. Redis 엔터프라이즈는 핵심 오픈 소스 Redis 기능 세트 외에도 액티브 액티브 지오 배포(active-active geo-distribution), 다중 모델 데이터베이스 기능, 향상된 관측 가능성, 가동 시간 향상을 위한 간편한 멀티테넌시 관리 기능을 추가합니다.

### Redis 엔터프라이즈 Datadog 대시보드

Redis 엔터프라이즈 Datadog 통합에서는 클러스터 및 데이터베이스 전반의 템플릿 보기를 제공하여 다른 제품에서는 제공하지 않는 운영 인사이트를 제공해 드립니다. 정보에 기반한 의사 결정에 필요한 데이터로 사용 패턴을 이해하고 성장 계획을 세워 보세요.

#### 데이터베이스 개요
![개요][4]

#### 클러스터 개요
![개요][5]

#### Flash의 Redis
![rofdash][6]

#### 액티브/액티브 Redis
![rofdash][7]

#### Redis 엔터프라이즈 이벤트
![이벤트][8]

### 공급자

![공급자][9]

이 통합은 Redis Labs가 제공합니다.

## 설정

### 설치

에이전트 v7.21+/v6.21+를 사용하는 경우, 아래 지침에 따라 호스에 RedisEnterprise 점검을 설치합니다. [에이전트 v7.21 / v6.21 이전][11] 또는 [도커(Docker) 에이전트][12]를 사용하여 점검을 설치하려면 [커뮤니티 통합을 설치][10] 전용 에이전트 가이드를 참조하세요.

1. [Datadog 에이전트][13]를 다운로드하여 실행합니다.
2. 다음 명령을 실행해 통합 에이전트와 통합 휠을 설치하세요.

   ```shell
   datadog-agent integration install -t datadog-redisenterprise==<INTEGRATION_VERSION>
   ```
  [Datadog 통합 릴리스 페이지][14]에서 최신 버전을 확인할 수 있습니다.

   **참조**: 필요한 경우 설치 명령어에 `sudo -u dd-agent` 접두어를 덧붙이세요.

3. 통합을 [다른 패키지][15]와 유사하게 설정합니다.

### 설정

[샘플 설정][16]을 복사하고 Redis 엔터프라이즈 클러스터에서 데이터를 수집하는 데 필요한 섹션을 업데이트합니다.

```yml
    ## @param host - string - required
    ## The RedisEnterprise host
    #
    host: myrediscluster.example.com

    ## @param port - integer - optional - default: 9443
    #
    port: 9443

    ## @param user - string - required
    ## The RedisEnterprise API user
    #
    username: redisadmin@example.com

    ## @param password - string - required
    ## The RedisEnterprise API credential
    #
    password: mySecretPassword
```

클러스터 설정에 맞게 사용할 수 있는 다른 옵션 설정은 전체 예제 파일을 참조하세요.

사용자는 [문서][17]에 따라 설정할 수 있습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "redisenterprise" >}}


### 서비스 점검

**`redisenterprise.running`**

점검은 다음을 반환합니다.

- RedisEnterprise 클러스터 API가 명령에 제대로 응답하는 경우 `OK`
- API가 제대로 응답하지 않는 경우 `CRITICAL`

**`redisenterprise.license_check`**

점검은 다음을 반환합니다.

- 클러스터 라이선스가 1주일 이상 유효할 경우 `OK`.
- 클러스터 라이선스가 7일 안에 만료되는 경우 `WARNING`.
- 클러스터 라이선스가 만료된 경우 `CRITICAL`.

**참고:** 라이선스가 만료되어도 클러스터는 정상적으로 작동하지만, 이 기간 동안에는 설정 변경이 불가능합니다. 라이선스 갱신은 영업 담당자에게 문의하세요.

### 이벤트

모든 [Redis 엔터프라이즈 이벤트][19]가 수집됩니다.

## 트러블슈팅

[Redis 필드 엔지니어링 팀][20]에 문의하세요.


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/redis-enterprise.jpg
[2]: https://docs.datadoghq.com/ko/integrations/redis_enterprise/
[3]: http://www.redislabs.com
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/dashboard.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/datadog_cluster_top_view.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/ROF_dashboard.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/active_active_dashboard.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/events.png
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/redisenterprise/images/logo-redis.png
[10]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/?tab=agentv721v621
[11]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/?tab=agentearlierversions
[12]: https://docs.datadoghq.com/ko/agent/guide/use-community-integrations/?tab=docker
[13]: https://app.datadoghq.com/account/settings/agent/latest
[14]: https://github.com/DataDog/integrations-extras/tags
[15]: https://docs.datadoghq.com/ko/getting_started/integrations/
[16]: https://github.com/DataDog/integrations-extras/blob/master/redisenterprise/datadog_checks/redisenterprise/data/conf.yaml.example
[17]: https://docs.redislabs.com/latest/rc/security/database-security/passwords-users-roles/
[18]: https://github.com/DataDog/integrations-extras/blob/master/redisenterprise/metadata.csv
[19]: https://docs.redislabs.com/latest/rs/administering/monitoring-metrics/#cluster-alerts
[20]: mailto:redis.observability@redis.com?subject=Datadog%20Integration%20Support