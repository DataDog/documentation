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

## Cluster Agent 상태 및 플레어

Custom Metrics Server에 문제가 있는 경우:

* 집계 레이어와 인증서가 설정되어 있는지 확인하세요.
* 오토스케일링 하려는 메트릭을 사용할 수 있는지 확인하세요. HPA를 생성하면 Datadog Cluster Agent는 매니페스트를 구문 분석하고 Datadog에 쿼리하여 메트릭을 가져오려고 합니다. 메트릭 이름에 오타가 있거나 메트릭이 Datadog 계정 내에 존재하지 않는 경우, 다음 오류가 발생합니다:

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

이 명령을 사용하면 외부 메트릭 공급자 프로세스의 오류가 표시됩니다. 더 자세한 출력을 원할 경우 다음 플레어 명령을 실행하세요: `agent flare`.

플레어 명령은 다음 출력에서 나타나는 것과 같이 `custom-metrics-provider.log`를 포함한 zip 파일을 생성합니다:

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

메트릭의 플래그 `Valid`가 `false`로 설정된 경우, 해당 메트릭은 HPA 파이프라인에서 고려되지 않습니다.

## HPA 매니페스트 설명

HPA 매니페스트를 설명할 때 다음 메시지가 표시되는 경우:

```text
Conditions:
  Type           Status  Reason                   Message
  ----           ------  ------                   -------
  AbleToScale    True    SucceededGetScale        the HPA controller was able to get the target's current scale
  ScalingActive  False   FailedGetExternalMetric  the HPA was unable to compute the replica count: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server could not find the requested resource (get nginx.net.request_per_s.external.metrics.k8s.io)

```

메트릭 공급자에 대해 적절한 RBAC 또는 서비스 연결이 설정되지 않았을 가능성이 높습니다. `kubectl get apiservices`가 표시되는지 확인하세요:

```text
% kubectl get apiservices
NAME                                   SERVICE                                     AVAILABLE   AGE
...
v1beta1.external.metrics.k8s.io        default/datadog-cluster-agent-metrics-api   True        57s
```

해당 파드에서 API 서비스, 서비스 및 포트 매핑이 모두 일치하는 경우, 외부 메트릭 API 서비스는 사용 가능한 `true`로 표시됩니다. 올바른 RBAC 권한을 가진 Cluster Agent도 마찬가지입니다. [외부 메트릭 제공자 등록[1] 단계에서 리소스를 생성했는지 확인하세요.

HPA 매니페스트를 설명할 때 다음 오류가 표시되는 경우:

```text
Warning  FailedComputeMetricsReplicas  3s (x2 over 33s)  horizontal-pod-autoscaler  failed to get nginx.net.request_per_s external metric: unable to get external metric default/nginx.net.request_per_s/&LabelSelector{MatchLabels:map[string]string{kube_container_name: nginx,},MatchExpressions:[],}: unable to fetch metrics from external metrics API: the server is currently unable to handle the request (get nginx.net.request_per_s.external.metrics.k8s.io)
```

Datadog Cluster Agent가 실행 중이고, APIService에 이름이 등록된 포트 `8443`를 노출하는 서비스가 작동 중인지 확인합니다.

## Datadog과 Kubernetes의 값 차이

 Kubernetes가 리소스를 오토스케일링하면 HPA는 Cluster Agent에서 제공하는 메트릭 값을 기반으로 오토스케일링을 결정합니다. Cluster Agent는 Datadog API에서 반환된 정확한 메트릭 값을 쿼리하고 저장합니다. HPA가 `type: Value`와 함께 타겟을 사용하는 경우, 이 정확한 메트릭 값이 HPA에 제공됩니다. HPA가`type: AverageValue`를 사용하는 경우 이 메트릭 값은 현재 복제본 수로 나뉩니다.

따라서 다음과 같은 값이 반환될 수 있습니다:

```text
% kubectl get datadogmetric
NAME             ACTIVE   VALID   VALUE   REFERENCES                UPDATE TIME
example-metric   True     True    7       hpa:default/example-hpa   21s

% kubectl get hpa
NAME          REFERENCE          TARGETS         MINPODS   MAXPODS   REPLICAS   AGE
example-hpa   Deployment/nginx   3500m/5 (avg)   1         3         2          24
```

`7`의 값을 복제본 `2`로 나누어 평균 `3.5`를 얻습니다. 두 유형 모두 HPA에 대해 지원되므로 쿼리와 대상 값을 설정할 때 고려하세요. [설정 예시에 대한 Cluster Agent 가이드][2]를 참조하세요.

*고지 사항*: Datadog Cluster Agent는 다른 HPA 매니페스트에 설정된 메트릭을 처리하고 기본적으로 30초마다 값을 가져오기 위해 Datadog을 쿼리합니다. Kubernetes는 기본적으로 30초마다 Datadog Cluster Agent를 쿼리합니다. 이 프로세스는 비동기적으로 수행되기 때문에 메트릭이 달라지는 경우 위의 규칙이 항상 적용되지는 않습니다. 그러나 문제 완화를 위해 두 가지 빈도를 모두 구성할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/containers/guide/cluster_agent_autoscaling_metrics
[2]: /ko/containers/guide/cluster_agent_autoscaling_metrics/?tab=helm#value-vs-averagevalue-for-the-target-metric