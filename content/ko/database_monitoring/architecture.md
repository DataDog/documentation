---
description: 데이터베이스 모니터링 시작하기
further_reading:
- link: https://www.datadoghq.com/blog/database-performance-monitoring-datadog
  tag: 블로그
  text: 데이터베이스 성능 모니터링 및 시각화
- link: /데이터 베이스_모니터링/데이터_수집됨/
  tag: 설명서
  text: 수집한 데이터
- link: /database_monitoring/troubleshooting/
  tag: 설명서
  text: 트러블슈팅
title: DBM 설정 아키텍처
---
{{< site-region region="gov" >}}
해당 지역에서는 데이터베이스 모니터링이 지원되지 않습니다
{{< /site-region >}}

## 개요

사용하는 데이터베이스 유형(Postgres, MySQL, SQA Server)과 호스트 공급자(자체 호스팅,  AWS, Google Cloud SQL, Azure)에 따라 Datadog 데이터베이스 모니터링을 설정하기 위한 필수 단계가 다릅니다. 어떤 데이터베이스나 호스트 공급자를 사용하든 데이터베이스 모니터링을 사용하려면 다음이 필요합니다.

* [Datadog Agent][1]
* Datadog Agent용 호스트
* 데이터베이스 읽기 전용 액세스

## Agent

Datadog Agent는 CPU, 메모리, 네트워크 활동과 같은 시스템 메트릭을 모니터링하는 경량 소프트웨어입니다. 또한 SQL 사용자로 데이터베이스에 접속하여 데이터베이스 성능에 대한 데이터를 수집합니다.

자체 호스팅 데이터베이스의 경우, 데이터베이스를 호스팅하는 호스트에 에이전트를 직접 설치합니다. AWS RDS 및 Azure SQL과 같은 클라우드 관리형 데이터베이스의 경우 원격으로 데이터베이스에 연결하도록 Agent를 구성합니다.


### 자체 호스팅 데이터베이스

{{< img src="database_monitoring/dbm_architecture_self-hosted.png" alt="자체 호스팅 설정은 Agent를 호스팅하는 데이터베이스 호스트에서 데이터베이스 프로세스를 거칩니다. 그런 다음 인터넷에 연결한 후 Datadog의 백엔드로 이동합니다.">}}

자체 호스팅 설정의 경우, Datadog Agent는 운영 체제 호스트에서 시스템 메트릭을 수집하고 데이터베이스에서 직접 데이터베이스 메트릭을 수집하며 데이터베이스 로그에서 로그 이벤트를 수집합니다.

* [Postgres에서 수집한 시스템 메트릭][2]
* [MySQL에서 수집한 시스템 메트릭][3]
* [SQL Server에서 수집한 시스템 메트릭][4]


자체 호스팅 설정의 경우, Agent를 데이터베이스 호스트에 직접 설치해 데이터베이스 프로세스를 실행하는 시스템 상태 전체에 대한 가시성을 확보할 수 있습니다.

Agent에 데이터베이스에 대한 읽기 전용 액세스를 부여하고 통합을 설정합니다. Agent가 사용자로 로그인해야 데이터베이스에서 읽기 전용 쿼리를 실행할 수 있습니다.

자체 호스팅 공급자 이용 시 데이터베이스 모니터링을 설정하는 방법:

* [Postgres][5]
* [MySQL][6]
* [SQL Server][7]


### 클라우드 관리형 데이터베이스

클라우드 관리형 설정의 경우 ([AWS RDS][8] 또는 Aurora, Google Cloud SQL, Azure와 같은 공급자 사용) Agent 를 별도 호스트에 설치하고 각 관리형 인스턴스에 연결하도록 설정합니다.

데이터베이스 모니터링은 해당 공급자와 Datadog 통합을 사용하여 CPU, 메모리, 디스크 사용량, 로그 및 관련 원격 분석과 같은 시스템 메트릭을 클라우드 공급자로부터 바로 수집합니다.

{{< img src="database_monitoring/dbm_architecture_cloud-hosted.png" alt="데이터베이스 인스턴스는 Agent 호스트와 분리되어 있으며, 이는 Datadog 백엔드와 분리되어 있습니다. 클라우드 API는 인터넷을 통해 Datadog AWS 통합에 연결됩니다.">}}

Agent가 데이터베이스 인스턴스에 연결할 수 있는 경우 모든 클라우드 VM(예: EC2)에 Agent를 설치할 수 있습니다.

자체 Kubernetes 클러스터를 실행하지 않는 경우, Datadog은 클라우드 공급자의 오케스트레이션 도구를 사용할 것을 권장합니다. 예를 들어, [Agent가 이미 Docker 컨테이너로 존재하기 때문에][10] [AWS ECS][9]를 사용해 Datadog Agent를 호스팅할 수 있습니다.

### 쿠버네티스(Kubernetes)

[Kubernetes][11]에서 앱을 실행하는 경우, [데이터베이스 모니터링이 포함된 Datadog Cluster Agent][12]를 사용하여 파드 전체에 [클러스터 검사][13]를 실행할 수 있습니다.

{{< img src="database_monitoring/dbm_architecture_clusters.png" alt="클라우드 공급자의 데이터베이스 인스턴스는 Kubernetes 클러스터 노드에 연결된 후 인터넷을 통해 Datadog 백엔드에 연결됩니다. 클라우드 API는 Datadog AWS 통합에 직접 연결됩니다.">}}

[Cluster Agent][14]는 데이터베이스 인스턴스를  Agents 풀에 자동으로 배포합니다. 이렇게 하면 각 노드 기반 Agent 파드가 해당 검사를 실행하는 것과 달리 각 검사의 인스턴스 하나만 실행됩니다. Cluster Agent는 구성을 보유하고 노드 기반 Agents에 동적으로 디스패치합니다. 각 노드의  Agents는 10초마다 Cluster Agent에 연결하여 실행할 구성을 검색합니다.

Agent가 보고를 중단하면 Cluster Agent는 활성 풀에서 해당 Agent를 제거하고 다른 Agents로 구성을 디스패치합니다. 이렇게 하면 클러스터에서 노드를 추가하거나 제거해도 항상 하나의 인스턴스만 실행되도록 할 수 있습니다. 이는 Cluster Agent가 클러스터 검사를 여러 노드에 분산하기 때문에 데이터베이스 인스턴스 수가 많은 경우 중요합니다.



#### Aurora

[Aurora][15]를 사용하는 경우, Agent가 모니터링 중인 호스트에 직접 연결되어야 하기 때문에 클러스터 엔드포인트가 아닌 개별 Aurora 인스턴스에 Agent가 연결되어 있어야 합니다.

Aurora 데이터베이스를 모니터링하려면 Agent를 프록시, 로드 밸런서, `pgbouncer`와 같은 연결 풀러 또는 Aurora 클러스터 엔드포인트를 통해 데이터베이스에 연결해서는 안됩니다. 각 Datadog Agent는 기본 호스트 이름에 대해 알고 있어야 하며, 장애 발생 시에도 수명 기간 동안 단일 호스트에서 실행되어야 합니다. 그러지 않으면 메트릭 값이 정확하지 않게 됩니다.



## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/basic_agent_usage/
[2]: /ko/integrations/postgres/?tab=host#data-collected
[3]: /ko/integrations/mysql/?tab=host#data-collected
[4]: /ko/integrations/sqlserver/?tabs=host#data-collected
[5]: /ko/database_monitoring/setup_postgres/selfhosted/
[6]: /ko/database_monitoring/setup_mysql/selfhosted/
[7]: /ko/database_monitoring/setup_sql_server/selfhosted/
[8]: /ko/integrations/amazon_rds/
[9]: /ko/agent/amazon_ecs/
[10]: /ko/agent/docker/
[11]: /ko/agent/kubernetes/integrations/
[12]: /ko/database_monitoring/setup_postgres/rds/?tab=kubernetes
[13]: /ko/agent/cluster_agent/clusterchecks/
[14]: https://www.datadoghq.com/blog/datadog-cluster-agent/
[15]: /ko/database_monitoring/setup_postgres/aurora/