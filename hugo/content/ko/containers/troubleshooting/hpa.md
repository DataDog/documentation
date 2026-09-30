---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: 블로그
  text: Datadog Cluster Agent 소개
- link: /containers/guide/cluster_agent_autoscaling_metrics
  tag: 설명서
  text: Datadog 메트릭으로 Kubernetes 워크로드 오토스케일링
title: 커스텀 메트릭 서버 및 HPA 트러블슈팅
---

## Cluster Agent 상태 및 Flare

커스텀 메트릭 서버에 문제가 있는 경우:

* 집계 레이어와 인증서가 설정되어 있는지 확인합니다.
* 오토스케일링하려는 메트릭을 사용할 수 있는지 확인하세요. HPA를 생성하면 Datadog Cluster Agent가 매니페스트를 파싱하고 Datadog에 쿼리하여 메트릭 가져오기를 시도합니다. 메트릭 이름에 오타가 있거나 메트릭이 Datadog 계정에 존재하지 않는 경우 다음 오류가 발생합니다.

    ```text
    2018-07-03 13:47:56 UTC | ERROR | (datadogexternal.go:45 in queryDatadogExternal) | Returned series slice empty
    ```

외부 메트릭 공급자 프로세스 상태를 확인하려면 `agent status` 명령을 실행하세요.

```text
  Custom Metrics Provider
  =======================
  External Metrics
  ================
    ConfigMap name: datadog-hpa
    Number of external metrics detected: 2
```

외부 메트릭 공급자 프로세스 오류가 이 명령과 함께 표시됩니다. 보다 자세한 출력을 원하면 flare 명령을 실행하세요. `Agent flare`.

flare 명령은 다음과 같은 출력을 볼 수 있는 `custom-metrics-provider.log`를 포함하는 zip 파일을 생성합니다.

```text
  Custom Metrics Provider
  =======================
  External Metrics
  ================
    ConfigMap name: datadog-hpa
    Number of external metrics detected: 2

    hpa:
    - name: nginxext
    - namespace: default
    labels:
    - cluster: eks
    metricName: redis.key
    ts: 1532042322
    valid: false
    value: 0

    hpa:
    - name: nginxext
    - namespace: default
    labels:
    - dcos_version: 1.9.4
    metricName: docker.mem.limit
    ts: 1.532042322
    valid: true
    value: 268435456
```

메트릭 플래그 `Valid`가 `false`로 설정된 경우 메트릭이 HPA 파이프라인에서 고려되지 않습니다.

## HPA 매니페스트 설명하기

HPA 매니페스트를 설명할 때 다음 메시지가 표시되는 경우:

```text
Conditions:
  Type           Status  Reason                   Message
  ----           ------  ------                   -------
  AbleToScale    True    SucceededGetScale        the HPA controller was able to get the target's current scale
  ScalingActive  False   FailedGetExternalMetric  the HPA was unable to compute the replica count: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server could not find the requested resource (get nginx.net.request_per_s.external.metrics.k8s.io)

```

메트릭 공급자에 적절한 RBAC 또는 서비스 연결이 설정되어 있지 않을 가능성이 높습니다. `kubectl get apiservices`가 표시되는지 확인하세요.

```text
% kubectl get apiservices
NAME                                   SERVICE                                     AVAILABLE   AGE
...
v1beta1.external.metrics.k8s.io        default/datadog-cluster-agent-metrics-api   True        57s
```

API 서비스, 서비스, 포드의 포트 매핑이 모두 일치하는 경우 외부 메트릭 API 서비스가 `true` 옵션과 함께 표시되어야 합니다. 또한 Cluster Agent에 올바른 RBAC 권한이 있어야 합니다. [외부 메트릭 등록 공급자 등록][1] 단계에서 리소스를 생성했는지 확인하세요.

HPA 매니페스트를 설명할 때 다음 오류가 표시되는 경우:

```text
Warning  FailedComputeMetricsReplicas  3s (x2 over 33s)  horizontal-pod-autoscaler  failed to get nginx.net.request_per_s external metric: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server is currently unable to handle the request (get nginx.net.request_per_s.external.metrics.k8s.io)
```

Datadog Cluster Agent가 실행 중이고 APIService에 이름이 등록된 포트 `8443`를 노출하는 서비스가 활성화되어 있는지 확인합니다.

## Datadog 및 Kubernetes 간 값 차이

Kubernetes에서 리소스를 오토스케일링하기 때문에 HPA는 Cluster Agent에서 제공한 메트릭 값에 따라 확장 결정을 내립니다. Cluster Agent는 쿼리에서 반환된 정확한 메트릭 값을 Datadog API에 저장합니다. HPA의 목표 값이 `type: Value`인 경우, 해당 메트릭 값이 그대로 HPA에 제공됩니다. HPA가 `type: AverageValue`인 경우, 현재 복제 개수로 나뉩니다.

따라서 다음과 같은 값이 반환될 수 있습니다.

```text
% kubectl get datadogmetric
NAME             ACTIVE   VALID   VALUE   REFERENCES                UPDATE TIME
example-metric   True     True    7       hpa:default/example-hpa   21s

% kubectl get hpa
NAME          REFERENCE          TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
example-hpa   Deployment/nginx   3500m/5 (avg)   1         3         2          24
```

`7` 값을 복제값 `2`로 나누어 평균이 `3.5`입니다. HPA에는 두 가지 유형이 모두 지원되므로 쿼리 및 목표 값을 설정할 때 유형을 고려하면 됩니다. 설정 예시는 [Cluster Agent 가이드][2]를 참조하세요.

*유의 사항*: Datadog Cluster Agent는 기본적으로 서로 다른 HPA 매니페스트에 설정된 메트릭을 처리하고 Datadog에 쿼리하여 30초마다 값을 얻습니다. Kubernetes는 기본적으로 Datadog Cluster Agent에 30초마다 쿼리합니다. 이 프로세스가 비동기적으로 완료되므로, 메트릭 값이 여럿일 경우에는 위 규칙이 항상 적용되지 않을 수 있습니다. 이때 두 쿼리의 주기를 설정해 문제를 해결할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/containers/guide/cluster_agent_autoscaling_metrics
[2]: /ko/containers/guide/cluster_agent_autoscaling_metrics/?tab=helm#value-vs-averagevalue-for-the-target-metric