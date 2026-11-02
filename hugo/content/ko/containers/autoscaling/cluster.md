---
description: Kubernetes Cluster Autoscaling을 사용하여 클러스터를 자동으로 스케일링하세요.
site_support_id: containers_autoscaling_cluster
title: Kubernetes Cluster Autoscaling
---
<div class="alert alert-warning">제한적 제공 기간 동안 Datadog은 Datadog Kubernetes Cluster Autoscaling을 <strong>비프로덕션 환경에서만 사용할 것</strong>을 권장합니다. 자세한 정보와 지원이 필요하면 <a href="mailto:kubernetes-beta@datadoghq.com">kubernetes-beta@datadoghq.com</a>으로 이메일을 보내주세요.</div>

## 요구 사항 {#requirements}
- Datadog Agent v7.75+
- Datadog Operator v1.23.0+ **또는** Datadog Helm chart v3.155.1+
- [Remote Configuration][1]이 조직 수준과 대상 클러스터의 Agent 모두에서 활성화되어 있어야 합니다. 설정 방법은 [Remote Configuration 활성화][2]를 참조하세요.
- Datadog 사용자 권한:
  - Org Management
  - API Keys Write
  - Autoscaling Manage

  기본적으로 모든 Datadog 관리자 사용자는 Autoscaling Manage 권한을 가지며, 모든 Datadog 사용자는 권장 사항과 보고서를 조회할 수 있는 읽기 권한을 가집니다.

  추가 표준 역할 또는 사용자 지정 역할의 사용자에게 Autoscaling Manage 권한을 부여하려면 [Datadog Role Permissions][3]에서 지침을 확인하세요.

## 설정 {#setup}

1. Cluster Autoscaling을 활성화합니다.

   {{< tabs >}}
{{% tab "Datadog Operator" %}}

`DatadogAgent` 사양에서 `features.autoscaling.cluster.enabled` 값을 `true`로 설정합니다.

```yaml
spec:
  features:
    autoscaling:
      cluster:
        enabled: true
```
{{% /tab %}}

{{% tab "Helm" %}}

`datadog-values.yaml` 파일에서 `datadog.autoscaling.cluster.enabled` 값을 `true`로 설정합니다.

```yaml
datadog:
  autoscaling:
    cluster:
      enabled: true
```

그런 다음 `helm upgrade`를 실행합니다.
{{% /tab %}}
{{< /tabs >}}
2. 기존에 Karpenter가 설치되어 있지 않으면 [Datadog `kubectl` 플러그인][4]을 설치합니다. 이 플러그인은 Karpenter 구성을 설치하거나 기존 Karpenter 구성에 연결하는 데 도움을 줍니다.
   ```shell
   kubectl krew install datadog
   ```
3. `kubectl` 플러그인을 실행하고 클러스터가 실행 중인 AWS 프로젝트의 AWS 자격 증명을 전달합니다.
   ```shell
   AWS_PROFILE=<foo> AWS_REGION=<bar> kubectl datadog autoscaling cluster install
   ```

   이 명령은 다음을 생성합니다.
   - 이름이 `dd-karpenter-$CLUSTER_NAME`인 CloudFormation 스택 2개
   - Kubernetes 네임스페이스 `dd-karpenter`에 있는 이름이 `karpenter`인 Helm 릴리스
   - Karpenter의 `EC2NodeClass` 및 `NodePool` 객체

   자세한 명령 옵션을 보려면 [`kubectl datadog autoscaling cluster install --help`][4]를 실행하세요.

## 클러스터 자동 스케일링 {#autoscale-a-cluster}

Datadog에서 [Kubernetes Autoscaling][5]으로 이동하세요. [Autoscaling Settings][7] 페이지에서 자동 스케일링에 사용할 수 있는 모든 클러스터를 검토할 수 있습니다. 원하는 클러스터의 {{< ui >}}Enabled{{< /ui >}} 열에서 토글 스위치를 전환하세요.

{{< img src="containers/autoscaling/settings.png" alt=" Enable Clusters for Autoscaling 섹션을 보여주는 Autoscaling Settings 페이지입니다. 클러스터 이름, 노드, CPU 용량, 메모리 용량, 시각적 막대가 포함된 CPU 사용률(%), 시각적 막대가 포함된 메모리 사용률(%), 자동 스케일링된 워크로드 수, 클러스터 스케일링 가용성, 워크로드 스케일링 가용성 및 활성화 토글 스위치에 대한 열이 있는 필터링 가능한 Kubernetes 클러스터 표를 표시합니다. 오른쪽에 있는 토글 스위치는 어떤 클러스터에서 자동 스케일링이 활성화되었는지 보여줍니다." style="width:100%;" >}}

[Cluster Scaling][6] 페이지에서 클러스터를 선택하여 해당 클러스터의 권장 사항을 검토하세요. 최적화를 시작할 클러스터를 식별하세요. 제한적 제공 기간 동안 Datadog은 **비프로덕션 클러스터**를 선택할 것을 권장합니다.

{{< img src="containers/autoscaling/cluster-view.png" alt="클러스터 dev-eks-shopist-a-us-east-1에 대한 Cluster Scaling 상세 페이지입니다. Cost Summary 섹션에는 4가지 메트릭이 표시됩니다. 클러스터 비용은 14만 700달러(전월 대비 3,100달러 감소), 유휴 비용은 9만 3,660달러(전월 대비 2,290달러 감소)이며, CPU 사용량/요청 효율성은 27.24%, 메모리 사용량/요청 효율성은 35.15%입니다. Scaling Events 섹션에는 지난 한 달 동안의 CPU 및 메모리 메트릭을 추적하는 시계열 그래프 2개가 표시됩니다. 그래프에는 사용량 변동이 나타나며, 포드 및 DatadogPodAutoscaler 활동을 포함한 최근 스케일링 이벤트 타임라인도 함께 표시됩니다. Scaling Recommendations 섹션에는 유휴 CPU 및 메모리가 있는 워크로드의 표가 표시되며, 워크로드의 8.7%에서 자동 스케일링이 활성화된 것으로 나타납니다." style="width:100%;" >}}

{{< ui >}}Start Autoscaling{{< /ui >}} 버튼을 클릭하여 권장 사항을 적용하세요.

[1]: /ko/agent/remote_config
[2]: /ko/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: /ko/account_management/rbac/permissions/#overview
[4]: /ko/containers/kubernetes/kubectl_plugin/
[5]: https://app.datadoghq.com/orchestration/scaling/summary
[6]: https://app.datadoghq.com/orchestration/scaling/cluster
[7]: https://app.datadoghq.com/orchestration/scaling/settings