---
aliases:
- /ko/integrations/awselasticache/
- /ko/integrations/elasticache/
categories:
- aws
- caching
- cloud
- configuration & deployment
- log collection
dependencies: []
description: 핵심 Amazon ElasicCache 메트릭을 추적하세요.
doc_link: https://docs.datadoghq.com/integrations/amazon_elasticache/
draft: false
git_integration_title: amazon_elasticache
has_logo: true
integration_id: ''
integration_title: Amazon ElastiCache
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_elasticache
public_title: Datadog-Amazon ElastiCache 통합
short_description: 핵심 Amazon ElasicCache 메트릭을 추적하세요.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/awselasticache/elasticache-memcached.png" alt="ElastiCache Memcached 기본 대시보드" popup="true">}}

## 개요

주요 성능 메트릭, 수집 방법, [Coursera][2]가 Datadog 를 사용하여 ElastiCache를 모니터링하는 방법에 대해 알아보려면 [Redis 또는 Memcached를 사용한 ElastiCache 성능 메트릭 모니터링 ][1]을 참조하세요.

## 설정

이미 하지 않은 경우 먼저 [Amazon Web Services 통합][3]을 설정합니다. 

### Datadog 에이전트 없는 설치

1. [AWS 통합 페이지][4]에서 `ElastiCache`가 `Metric Collection` 탭에서 활성화되어 있는지 확인하세요.
2. Amazon ElastiCache 메트릭을 수집하려면 [Datadog IAM 정책][2]에 다음 권한을 추가하세요. 자세한 내용은 AWS 웹사이트에서 [ElastiCache 정책][3]을 참조하세요.

    | AWS 권한                     | 설명                                                        |
    | ----------------------------------- | --------------------------------------------------------------------- |
    | `elasticache:DescribeCacheClusters` |  캐시 클러스터를 목록화 및 설명하고 태그와 메트릭을 추가합니다. |
    | `elasticache:ListTagsForResource`   | 클러스터의 커스텀 태그를 목록화하여 커스텀 태그를 추가합니다.                    |
    | `elasticache:DescribeEvents`        | 스냅샷과 유지관리에 대한 이벤트를 추가합니다.                          |

3. [Datadog - Amazon ElastiCache 통합][7]을 설치합니다.

### Datadog 에이전트를 사용한 설치(권장)

#### 에이전트를 통해 네이티브 메트릭 수집

다음 다이어그램은 Datadog가 네이티브 ElastiCache 통합을 사용해 클라우드와치(CloudWatch)에서 직접 메트릭을 수집하는 방법과 Redis 또는 Memcached 등 백엔드 기술에서 직접 네이티브 메트릭을 추가로 수집하는 방법을 보여줍니다. 백엔드에서 직접 수집함으로써 더 높은 명확도의 더 많은 주요 메트릭에 액세스할 수 있습니다.

{{< img src="integrations/awselasticache/elasticache1.png" alt="ElastiCache, Redis 및 Memcached 통합" >}}

#### 작업 방법

에이전트 메트릭이 실제 ElastiCache 인스턴스가 아니라 에이전트가 실행되는 EC2 인스턴스에 연결되어 있기 때문에 `cacheclusterid` 태그를 사용해 모든 메트릭을 연결해야 합니다. ElastiCache 인스턴스와 동일한 태그로 에이전트가 구성되면 Redis/Memcached 메트릭을 ElastiCache 메트릭과 결합하는 것이 직관적입니다.

#### 단계별

에이전트가 실제 ElastiCache 인스턴스가 아니라 원격 머신에서 실행되므로 이 통합을 올바르게 설치하기 위한 핵심은 에이전트가 어디에서 메트릭을 수집할지를 지정하는 것입니다.

#####  ElastiCache 인스턴스를 위한 연결 상세 정보 수집

먼저 AWS 콘솔로 이동합니다. ElastiCache 섹션을 연 다음 캐시 클러스터 탭을 열어 모니터링하려는 클러스터를 찾습니다. 다음과 같습니다.

{{< img src="integrations/awselasticache/elasticache2.png" alt="AWS 콘솔의 ElastiCache 클러스터" >}}

그런 다음 "노드" 링크를 클릭해 엔드포인트 URL에 액세스합니다.

{{< img src="integrations/awselasticache/elasticache3.png" alt="AWS 콘솔의 노드 링크" >}}

엔드포인트 URL(예: **replica-001.xxxx.use1.cache.amazonaws.com**)과 `cacheclusterid` (예: **replica-001**)을 적어둡니다. 해당 값은 에이전트를 설정하고 그래프와 대시보드를 생성하는 데 필요합니다.

##### Agent 설정

Redis/Memcached 통합은 개별 캐시 인스턴스의 태깅을 지원합니다. 원래는 동일한 머신의 여러 인스턴스를 모니터링하기 위해 허용되었지만 이들 태그는 메트릭을 필터링하고 그룹화하는 데 사용할 수 있습니다. `redisdb.yaml`를 사용해 Redis 포함 ElastiCache를 설정한 예시는 다음과 같습니다. 이 파일이 사용자 플랫폼 기준 어디에 저장되는지에 대한 자세한 정보는 [에이전트 설정 디렉터리][8]을 참조하세요.

```yaml
init_config:

instances:
    # Endpoint URL from AWS console
    - host: replica-001.xxxx.use1.cache.amazonaws.com
      port: 6379
      # Cache Cluster ID from AWS console
      tags:
          - cacheclusterid:replicaa-001
```

그런 다음 에이전트를 다시 시작합니다. `sudo /etc/init.d/datadog-agent restart`(리눅스(Linux)에서)

##### 메트릭을 함께 시각화

몇 분 후, ElastiCache 메트릭과 Redis 또는 Memcached 메트릭은 그래픽, 모니터링 등을 위해 Datadog에 액세스할 수 있습니다.

그래프를 설정하고 동일한 `cacheclusterid` 태그 **replicaa-001**를 사용하여 ElastiCache의 캐시 히트 메트릭을 Redis의 네이티브 지연 메트릭과 결합하는 예시입니다.

{{< img src="integrations/awselasticache/elasticache4.png" alt="ElastiCache 및 캐시 메트릭" >}}

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "amazon_elasticache" >}}


AWS에서 검색된 각 메트릭에는 AWS 콘솔에 나타나는 것과 동일한 태그가 할당됩니다, 호스트 이름, 보안 그룹 등을 포함하되 이에 국한되지 않습니다.

### 이벤트

Amazon ElastiCache 통합은 클러스터, 캐ㅣ 보안 그룹 및 캐시 파라미터 그룹에 대한 이벤트를 포함합니다. 아래에서 예시 이벤트를 참조하세요.

{{< img src="integrations/amazon_elasticache/aws_elasticache_events.png" alt="Amazon Elasticache 이벤트" >}}

### 서비스 검사

Amazon ElastiCache 통합은 서비스 점검을 포함하지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][10]에 문의해주세요.

## 참고 자료

- [Redis 또는 Memcached를 통한 ElastiCache 성능 메트릭 모니터링][1]
- [ElastiCache 메트릭 수집 + Redis/Memcached 메트릭][11]

[1]: https://www.datadoghq.com/blog/monitoring-elasticache-performance-metrics-with-redis-or-memcached
[2]: https://www.coursera.org
[3]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/#installation
[6]: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/IAM.html
[7]: https://app.datadoghq.com/integrations/amazon-elasticache
[8]: https://docs.datadoghq.com/ko/agent/guide/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_elasticache/amazon_elasticache_metadata.csv
[10]: https://docs.datadoghq.com/ko/help/
[11]: https://www.datadoghq.com/blog/collecting-elasticache-metrics-its-redis-memcached-metrics