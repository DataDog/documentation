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
title: 클러스터 검사 러너
---

Cluster Agent에서는 두 가지 유형([엔드포인트 점검][1], [클러스터 점검][2])의 점검을 실행할 수 있습니다. 두 점검에는 약간의 차이가 있습니다.

엔드포인트 점검은 애플리케이션 포드 엔드포인트와 동일한 노드에 있는 일반 Datadog Agent로 디스패치됩니다. 애플리케이션 엔드포인트와 동일한 노드에서 엔드포인트 점검을 실행하면 메트릭에 적절한 태그를 지정할 수 있습니다.

클러스터 점검은 내부 Kubernetes 서비스뿐만 아니라 관리형 데이터베이스 및 네트워크 기기와 같은 외부 서비스도 모니터링하며, 훨씬 더 자유롭게 디스패치할 수 있습니다.
Cluster Check Runners(선택 사항)를 사용하면 소규모의 전담 Agent 세트가 클러스터 점검을 실행하고 엔드포인트 점검은 일반 Agent가 담당합니다. 이 전략은 특히 클러스터 점검 규모 증가 시 클러스터 점검 디스패치를 제어하는 ​​데 유용합니다.

## 설정

먼저 [Cluster Agent를 배포합니다][3].

그런 다음 [Datadog Operator][4] 또는 [Helm][5]을 사용하여 클러스터 점검 러너를 배포합니다.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Operator를 사용하면 이러한 모든 리소스를 단일 매니페스트로 실행하고 관리할 수 있습니다. 예:

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

다음 리소스를 클러스터에 배포합니다.

```
kubectl apply -f datadog-agent-with-dca-clusterchecksrunner.yaml
```

다음과 같은 출력이 표시되면 설정이 성공적으로 적용된 것입니다.

```
datadogagent.datadoghq.com/datadog created
```

Datadog Operator에 대한 자세한 내용은 [Datadog Operator 리포지토리][1]를 참고하세요.


[1]: https://github.com/DataDog/datadog-operator
{{% /tab %}}
{{% tab "Helm" %}}

차트의 관련 섹션을 업데이트하여 클러스터 점검, Cluster Agent, 클러스터 점검 러너를 동시에 활성화할 수 있습니다. 예:

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

**참고**: Datadog Operator와 Helm 차트는 동일한 노드에 여러 개의 클러스터 점검 러너가 있는 것을 방지하기 위해 `podAntiAffinity`를 사용합니다. Cluster Agent가 클러스터 점검 러너를 노드 이름으로 식별하기 때문에 `podAntiAffinity`를 사용하면 이름 충돌을 방지할 수 있습니다.


[1]: https://docs.datadoghq.com/ko/agent/cluster_agent/endpointschecks/
[2]: https://docs.datadoghq.com/ko/agent/cluster_agent/clusterchecks/
[3]: https://docs.datadoghq.com/ko/agent/cluster_agent/setup/
[4]: https://github.com/DataDog/datadog-operator
[5]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml