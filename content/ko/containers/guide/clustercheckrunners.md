---
aliases:
- /ko/agent/cluster_agent/clusterchecksrunner
- /ko/containers/cluster_agent/clusterchecksrunner
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: 블로그
  text: Datadog 클러스터 에이전트 소개
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: 블로그
  text: Datadog 메트릭으로 쿠버네티스(Kubernetes) 워크로드 자동 확장
- link: 컨테이너스/클러스터_에이전트/클러스터점검/
  tag: 설명서
  text: 클러스터 검사
kind: 설명서
title: 클러스터 검사 러너
---

Cluster Agent는 [엔드포인트 검사][1]와 [클러스터 검사][2] 이 두 가지 유형의 검사를 발송할 수 있습니다. 두 검사는 약간 다릅니다.

엔드포인트 검사는 애플리케이션 파드 엔드포인트와 동일한 노드에 있는 일반 Datadog Agent로 특별히 발송됩니다. 애플리케이션 엔드포인트와 동일한 노드에서 엔드포인트 검사를 실행하면 메트릭에 적절한 태그를 지정할 수 있습니다.

클러스터 검사는 관리형 데이터베이스 및 네트워크 장치와 같은 외부 서비스뿐만 아니라 내부 Kubernetes 서비스를 모니터링하며 훨씬 더 자유롭게 발송될 수 있습니다.
클러스터 검사 러너 사용은 선택 사항입니다. 클러스터 검사 러너를 사용하면 소규모의 전용 Agent 세트가 클러스터 검사를 실행하고 엔드포인트 검사는 일반 Agent에 맡기게 됩니다. 이 전략은 특히 클러스터 검사 규모가 증가할 때 클러스터 검사 발송을 제어하는 데 유용할 수 있습니다.

## 설정

먼저 [Cluster Agent를 배포합니다][3].

그런 다음 [Datadog Operator][4] 또는 [Helm][5]을 사용하여 클러스터 검사 러너를 배포합니다:

{{< tabs >}}
{{% tab "Operator" %}}

Operator를 사용하면 이 모든 리소스를 하나의 매니페스트로 시작하고 관리할 수 있습니다. 예를 들면

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterAgentToken: <DATADOG_CLUSTER_AGENT_TOKEN>
  features:
    clusterChecks:
      enabled: true
      useClusterChecksRunners: true
  override:
    clusterAgent:
      replicas: 2
```

클러스터에 다음 리소스를 배포합니다:

```
kubectl apply -f datadog-agent-with-dca-clusterchecksrunner.yaml
```

다음 출력이 표시되면 설정이 성공적으로 적용되었음을 확인하는 것입니다.

```
datadogagent.datadoghq.com/datadog created
```

Datadog Operator에 대한 자세한 내용은 [Datadog Operator 리포지토리][1]를 참조하세요.


[1]: https://github.com/DataDog/datadog-operator
{{% /tab %}}
{{% tab "Helm" %}}

차트의 관련 섹션을 업데이트하여 클러스터 검사, Cluster Agent 및 클러스터 검사 러너를 동시에 사용하도록 설정할 수 있습니다. 예:

```yaml
datadog:
  clusterChecks:
    enabled: true
  #(...)

clusterAgent:
  enabled: true
  #(...)

clusterChecksRunner:
  enabled: true
  replicas: 2
```


{{% /tab %}}
{{< /tabs >}}

**참고**: Datadog Operator와 Helm 차트는 동일한 노드에 여러 개의 클러스터 검사 러너가 있지 않도록 `podAntiAffinity`를 사용합니다. Cluster Agent가 노드 이름으로 클러스터 검사 러너를 식별하기 때문에 이 점이 중요합니다. `podAntiAffinity`를 사용하면 이름 충돌이 발생하지 않습니다.


[1]: https://docs.datadoghq.com/ko/agent/cluster_agent/endpointschecks/
[2]: https://docs.datadoghq.com/ko/agent/cluster_agent/clusterchecks/
[3]: https://docs.datadoghq.com/ko/agent/cluster_agent/setup/
[4]: https://github.com/DataDog/datadog-operator
[5]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml