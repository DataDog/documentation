---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: 블로그
  text: Datadog Cluster Agent 소개
- link: /containers/cluster_agent/clusterchecks/
  tag: 설명서
  text: 자동탐지로 클러스터 검사 실행
- link: /containers/cluster_agent/endpointschecks/
  tag: 설명서
  text: 자동탐지로 엔드포인트 검사 실행
kind: 설명서
title: 클러스터와 엔드포인트 검사 트러블슈팅
---

## 클러스터 검사

### Kubernetes: 리더  Cluster Agent를 찾습니다.

리더 선출이 활성화되면 리더만 노드 기반 Agents에 클러스터 검사 설정을 제공합니다. Cluster Agent Pod의 복제본이 하나만 실행 중인 경우 이 복제본이 리더입니다. 그렇지 않으면 `datadog-leader-election` ConfigMap에서 리더의 이름을 확인할 수 있습니다.

```yaml
# kubectl get cm datadog-leader-election -o yaml
apiVersion: v1
kind: ConfigMap
metadata:
  annotations:
    control-plane.alpha.kubernetes.io/leader: '{"holderIdentity":"cluster-agent-rhttz", ... }'
```

이 경우 리더 Pod는 `cluster-agent-rhttz` 입니다. Pod가 삭제되거나 응답하지 않으면 다른 Pod가 자동으로 인수됩니다.

### Cluster Agent의 자동탐지

Cluster Agent가 설정(정적 또는 자동 탐지)을 선택하도록 하려면, 리더 Cluster Agent에서 `configcheck` 명령을 사용합니다:

```text
# kubectl exec <CLUSTER_AGENT_POD_NAME> agent configcheck
...
=== http_check cluster check ===
Source: kubernetes-services
Instance ID: http_check:My service:6e5f4b16b4b433cc
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
Auto-discovery IDs:
* kube_service://751adfe4-1280-11e9-a26b-42010a9c00c8
===
```

### Cluster Agent의 로직 디스패치

`clusterchecks` 명령을 사용하면 다음을 포함하여 디스패치 로직의 상태를 검사할 수 있습니다: 

- 어떤 노드 기반 Agents가 Cluster Agent에 적극적으로 보고하고 있는지.
- 각 노드에 어떤 검사가 연결되는지.

```text
# kubectl exec <CLUSTER_AGENT_POD_NAME> agent clusterchecks

=== 3 node-agents reporting ===
Name                                            Running checks
default-pool-bce5cd34-7g24.c.sandbox.internal   0
default-pool-bce5cd34-slx3.c.sandbox.internal   2
default-pool-bce5cd34-ttw6.c.sandbox.internal   1
...

===== Checks on default-pool-bce5cd34-ttw6.c.sandbox.internal =====

=== http_check check ===
Source: kubernetes-services
Instance ID: http_check:My service:5b948dee172af830
empty_default_hostname: true
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
- cluster_name:example
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
===
```

**참고:** 태그와 옵션을 추가하도록 인스턴스가 수정되므로, Instance ID는 `configcheck` 명령과 다릅니다.

이 경우 이 설정이 `default-pool-bce5cd34-ttw6` 노드로 디스패치됩니다. 해당 노드의 Agent Pod와 관련하여 트러블슈팅이 계속됩니다.

### 노드 기반 Agent의 자동탐지

Agent `configcheck` 명령은 `cluster-checks` 소스와 함께 인스턴스를 표시해야 합니다.

```text
# kubectl exec <NODE_AGENT_POD_NAME> agent configcheck
...
=== http_check check ===
Source: cluster-checks
Instance ID: http_check:My service:5b948dee172af830
empty_default_hostname: true
name: My service
tags:
- kube_namespace:default
- kube_service:my-nginx
- cluster_name:example
timeout: 1
url: http://10.15.246.109
~
Init Config:
{}
===
```

인스턴스 ID는 이전에 가지고 있던 것과 일치합니다.

### Agent 상태

Agent `status` 명령은 검사 인스턴스가 실행 중이며 성공적으로 보고되고 있음을 표시해야 합니다.

```text
# kubectl exec <NODE_AGENT_POD_NAME> agent status
...
    http_check (3.1.1)
    ------------------
      Instance ID: http_check:My service:5b948dee172af830 [OK]
      Total Runs: 234
      Metric Samples: Last Run: 3, Total: 702
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 234
      Average Execution Time : 90ms
```

## 엔드포인트 검사

엔드포인트 검사 트러블슈팅은 [클러스터 검사 트러블슈팅](#cluster-checks)과 유사합니다. 예약된 엔드포인트 검사가 클러스터 검사와 함께 표시되는 Node Agent에서 차이가 발생합니다.

**참고**: 엔드포인트 검사는 서비스의 엔드포인트를 백업하는 파드와 동일한 노드에서 실행되는 Agent에 의해 예약됩니다. 엔드포인트가 파드에 의해 백업되지 않는 경우, Cluster Agent는  클러스터 검사로 변환합니다. 이 클러스터 검사는 모든 Node Agent에서 실행할 수 있습니다.

### Node Agent의 자동탐지

Agent `configcheck` 명령은 `endpoints-checks` 소스와 함께 인스턴스를 표시합니다.

```shell
# kubectl exec <NODE_AGENT_POD_NAME> agent configcheck
...
=== nginx check ===
Configuration provider: endpoints-checks
Configuration source: kube_endpoints:kube_endpoint_uid://default/nginx/
Instance ID: nginx:956741d8796d940c
nginx_status_url: http://10.0.0.75/nginx_status/
tags:
- pod_phase:running
- kube_deployment:nginx
- kube_service:nginx
- kube_namespace:default
- kube_endpoint_ip:10.0.0.75
- cluster_name:cluster
~
Init Config:
{}
Auto-discovery IDs:
* kube_endpoint_uid://default/nginx/10.0.0.75
* kubernetes_pod://4e733448-f57e-11e9-8123-42010af001ed
State: dispatched to gke-cluster-default-pool-4658d5d4-qfnt
===
```

### Agent 상태

Agent `status` 명령은 검사 인스턴스가 실행 중이며 성공적으로 보고되고 있음을 표시해야 합니다.

```shell
# kubectl exec <NODE_AGENT_POD_NAME> agent status
...
    nginx (4.0.0)
    -------------
      Instance ID: nginx:956741d8796d940c [OK]
      Configuration Source: kube_endpoints:kube_endpoint_uid://default/nginx/
      Total Runs: 443
      Metric Samples: Last Run: 7, Total: 3,101
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 443
      Average Execution Time : 5ms
```

### Cluster Agent의 자동탐지

Cluster Agent `clusterchecks` 명령은 `kubernetes-endpoints` 소스와 함께 인스턴스를 표시합니다.

```shell
# kubectl exec <CLUSTER_AGENT_POD_NAME> agent clusterchecks
...
===== 3 Pod-backed Endpoints-Checks scheduled =====

=== nginx check ===
Configuration provider: kubernetes-endpoints
Configuration source: kube_endpoints:kube_endpoint_uid://default/nginx/
Instance ID: nginx:My Nginx Service Endpoints:f139adc46c81828e
name: My Nginx Endpoints
nginx_status_url: http://10.0.0.75/nginx_status/
tags:
- kube_service:nginx
- kube_namespace:default
- kube_endpoint_ip:10.0.0.75
- cluster_name:cluster
~
Init Config:
{}
Auto-discovery IDs:
* kube_endpoint_uid://default/nginx/10.0.0.75
* kubernetes_pod://4e733448-f57e-11e9-8123-42010af001ed
State: dispatched to gke-cluster-default-pool-4658d5d4-qfnt
===
...
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}