---
aliases:
- /ko/agent/cluster_agent/commands
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: 블로그
  text: Datadog 클러스터 에이전트 소개
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: 블로그
  text: Datadog 메트릭으로 Kubernetes 작업량 오토스케일링
- link: /agent/cluster_agent/clusterchecks/
  tag: 설명서
  text: 자동탐지로 클러스터 검사 실행
- link: /agent/kubernetes/daemonset_setup/
  tag: 설명서
  text: Kubernetes DaemonSet 설정
- link: /agent/cluster_agent/troubleshooting/
  tag: 설명서
  text: Datadog 클러스터 에이전트 트러블슈팅
kind: 설명서
title: 클러스터 에이전트 명령 및 옵션
---

## 클러스터 에이전트 명령

Datadog 클러스터 에이전트에서 사용할 수 있는 명령은 다음과 같습니다:

`datadog-cluster-agent status`
: 에이전트의 구성 요소 및 상태에 대한 개요를 제공합니다.

`datadog-cluster-agent metamap <NODE_NAME>`
: `NODE_NAME`에 있는 포드와 클러스터 레벨 메타데이터(예: 엔드포인트) 사이에서 매핑의 로컬 캐시를 쿼리합니다. `NODE_NAME`를 지정하지 않으면 클러스터의 모든 노드에서 매퍼가 실행됩니다.

`datadog-cluster-agent flare <CASE_ID>`
: 노드 기반 에이전트와 마찬가지로 클러스터 에이전트는 사용된 로그와 설정을 집계하여 지원팀에 아카이브를 전달하거나 압축을 해제하여 로컬에서 사용할 수 있습니다. **참고**: 이 명령은 클러스터 에이전트 포드 내에서 실행됩니다.

## 클러스터 에이전트 옵션

지원되는 환경 변수는 다음과 같습니다:

`DD_API_KEY`                                  
: 사용자의 [Datadog API key][1].

`DD_HOSTNAME`
: : Datadog 클러스터 에이전트에 사용할 호스트 이름

`DD_ENV`
: 클러스터 에이전트에서 내보내는 데이터에 대해 `env` 태그를 설정합니다. 클러스터 에이전트가 단일 환경 내에서 서비스를 모니터링하는 경우에만 권장됩니다.

`DD_CLUSTER_AGENT_CMD_PORT`
: Datadog 클러스터 에이전트가 서비스할 포트입니다. 기본값은 `5005`입니다.

`DD_USE_METADATA_MAPPER`
: 클러스터 레벨 메타데이터 매핑을 활성화합니다. 기본값은 `true`입니다.

`DD_COLLECT_KUBERNETES_EVENTS`
: Kubernetes 이벤트를 수집하도록 에이전트를 설정합니다. 기본값은 `false`입니다.

`DD_LEADER_ELECTION`
: 리더 선택을 활성화합니다. 이 기능을 활성화하려면 `DD_COLLECT_KUBERNETES_EVENTS`를 `true`로 설정합니다. 기본값은 `false`입니다.

`DD_LEADER_LEASE_DURATION`
: 리더 선택이 활성화된 경우에만 사용됩니다. 기본값은 60초입니다.

`DD_CLUSTER_AGENT_AUTH_TOKEN`
: 노드 에이전트와 Datadog 클러스터 에이전트 간에 공유해야 하는 32자 길이의 토큰.

`DD_KUBE_RESOURCES_NAMESPACE`
: 클러스터 에이전트가 리더 선택, 이벤트 수집(선택 사항) 및 수평 포드 오토스케일링에 필요한 구성 맵을 만드는 네임스페이스를 설정합니다.

`DD_CLUSTER_AGENT_KUBERNETES_SERVICE_NAME`
: 클러스터 에이전트가 노출되는 Kubernetes 서비스의 이름입니다. 기본값은 `datadog-cluster-agent`입니다.

`DD_KUBERNETES_INFORMERS_RESYNC_PERIOD`
: API 서버를 쿼리하여 로컬 캐시를 다시 동기화하는 빈도(초)입니다. 기본값은 5분 또는 `300` 초입니다.

`DD_KUBERNETES_INFORMERS_RESTCLIENT_TIMEOUT`
: API 서버와 통신하는 클라이언트의 시간 제한(초)입니다. 기본값은 `60`초입니다.

`DD_METRICS_PORT`                              
: Datadog 클러스터 에이전트 메트릭 포트. 기본값은 포트 `5000`.

`DD_EXTERNAL_METRICS_PROVIDER_BATCH_WINDOW`
: 여러 오토스케일러에서 메트릭 집단을 처리하기 위해 대기한 시간(초)입니다. 기본값은 `10`초입니다.

`DD_EXTERNAL_METRICS_PROVIDER_MAX_AGE`
: 데이터 포인트가 무효한 것으로 간주되기 전 최대 수명(초)입니다. 기본값은 `120`초입니다.

`DD_EXTERNAL_METRICS_AGGREGATOR`
: Datadog 메트릭용 애그리게이터입니다. 처리된 모든 자동 오토스케일러에 적용됩니다. `sum`/`avg`/`max`/`min` 에서 선택합니다.

`DD_EXTERNAL_METRICS_PROVIDER_BUCKET_SIZE`
: Datadog에서 메트릭을 쿼리하는 데 사용되는 창의 크기(초)입니다. 기본값은 `300`초입니다.

`DD_EXTERNAL_METRICS_LOCAL_COPY_REFRESH_RATE`
: 처리된 메트릭의 로컬 캐시를 글로벌 저장소와 다시 동기화하는 속도입니다. 클러스터 에이전트의 복제본이 여러 개 있을 때 유용합니다.

`DD_CLUSTER_CHECKS_ENABLED`
: 클러스터 검사 자동탐지를 활성화합니다. 기본값은 `false`입니다.

`DD_EXTRA_CONFIG_PROVIDERS`
: 추가적인 자동탐지 설정 공급자.

`DD_EXTRA_LISTENERS`
: 실행할 추가 자동탐지 수신기.

`DD_CLUSTER_NAME`
: 클러스터 이름. 모든 클러스터 검사 설정에 인스턴스 태그로 추가되어 있습니다.

`DD_CLUSTER_CHECKS_CLUSTER_TAG_NAME`
: `DD_CLUSTER_NAME` 옵션과 함께 설정된 인스턴스 태그의 이름입니다. 기본값은`cluster_name` 입니다.

`DD_CLUSTER_CHECKS_NODE_EXPIRATION_TIMEOUT`
: 노드 기반 에이전트가 다운된 것으로 간주되어 풀에서 제거될 때까지의 시간(초)입니다. 기본값은 `30`초입니다.

`DD_CLUSTER_CHECKS_WARMUP_DURATION`
: 모든 노드 기반 에이전트가 먼저 등록할 수 있도록 리더십을 획득하고 클러스터 검사 로직을 시작하는 데 걸리는 지연 시간(초)입니다. 기본값은 `30`초입니다.

`DD_CLUSTER_CHECKS_EXTRA_TAGS`
: 클러스터 검사 메트릭에 태그를 추가합니다.

`DD_PROXY_HTTPS`                
: HTTPS 요청의 프록시 서버를 설정합니다.

`DD_PROXY_HTTP`                
: HTTP 요청의 프록시 서버를 설정합니다.

`DD_PROXY_NO_PROXY`                
: 프록시를 바이패스하는 호스트 목록을 설정합니다. 이 목록은 띄어쓰기로 구분됩니다.

`DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_INIT_RESOURCES_CPU`
: init 컨테이너의 CPU 요청과 제한을 구성합니다.

`DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_INIT_RESOURCES_MEMORY`
: init 컨테이너의 메모리 요청과 제한을 구성합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://golang.org/pkg/expvar