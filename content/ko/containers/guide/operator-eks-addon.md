---
aliases:
- /ko/agent/guide/operator-eks-addon
further_reading:
- link: agent/kubernetes/log
  tag: 설명서
  text: Datadog와 쿠버네티스(Kubernetes)
title: Datadog Operator 애드온을 사용해 Amazon EKS에 Datadog Agent 설치하기
---

<div class="alert alert-info">v0.1.9부터 Datadog Operator 애드온은 Fargate 인스턴스에서 예약된 포드 자동 Agent 사이드카 주입을 지원합니다. <a href="https://docs.datadoghq.com/integrations/eks_fargate/?tab=datadogoperator#admission-controller-using-datadog-operator">이 가이드</a>에서 자세한 내용을 확인하세요.</div>


[Datadog Operator](/containers/datadog_operator)를 [Amazon EKS 애드온](https://docs.aws.amazon.com/eks/latest/userguide/eks-add-ons.html)으로 설치하고 `DatadogAgent` 매니페스트를 적용하여
Amazon EKS 클러스터에 Datadog Agent를 설치할 수 있습니다.

Operator 애드온을 사용해 설치한 Agent는 EC2 인스턴스에서 실행되는 포드에서만 데이터를 수집합니다. AWS Fargate에서 실행되는 포드의 경우 [AWS Fargate 기반 Amazon EKS 설명서][10]를 따르세요.

일반적인 [Helm 설치][4]와 비교할 때 애드온 설치 시에는 차이점이 존재합니다.
* Operator 설치 중 이미지는 EKS 리포지토리에서만 풀링되어야 합니다. 사용자가 이를 변경할 수 없습니다.
* Operator Helm Chart 값은 재정의될 수 있으며 [스키마 파일][3]로만 제한됩니다.

이 제한 사항은 Operator가 EKS 애드온 정책을 준수하는 데 필요합니다. 또한 EKS가 설치 안전성을 보장하고, 애드온 환경에서 아직 지원되지 않는 기능을 비활성화하는 데 필요합니다.

## 사전 필수 조건

* [Datadog Operator][1] 제품 구독
* kubectl 설치됨
* 애드온 설정 시 명령줄을 사용하는 경우 [AWS CLI](https://aws.amazon.com/cli/)를 사용합니다.

## Operator 설치하기

{{< tabs >}}
{{% tab "Console" %}}

* AWS 콘솔에서 EKS 클러스터로 이동합니다.
* 애드온 탭으로 이동해 *Get more add-ons*을 선택합니다.
* *Datadog Operator*를 찾아 선택합니다. 그런 다음 프롬프트를 따라 설치를 완료합니다.

{{% /tab %}}
{{% tab "CLI" %}}

Operator 애드온을 설치하려면 다음을 실행합니다.
  ```bash
  aws eks create-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME>
  ```

애드온 설치는 비동기식입니다. 설치 상태를 보려면 다음을 실행합니다.
  ```bash
  aws eks describe-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME>
  ```
{{% /tab %}}
{{< /tabs >}}

설치가 성공적인지 확인하려면 AWS Management Console, `eksctl` 또는 AWS CLI를 사용하여 `datadog-operator` 포드가 실행 중인지 확인합니다.

## Agent 구성하기

Operator 애드온을 설치했다면 Datadog Agent 설정을 진행할 수 있습니다.

지침에 따라 `DatadogAgent` 커스텀 리소스를 사용하여 Datadog Agent를 설정합니다.

1. Operator 설치 네임스페이스로 전환합니다. 기본적으로 `datadog-agent`입니다.
   ```bash
   kubectl config set-context --current --namespace=datadog-agent
   ```
2. [Datadog API 및 애플리케이션 키][5]를 사용하여 Kubernetes 암호를 생성합니다.
   ```bash
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```
   `<DATADOG_API_KEY>`와 `<DATADOG_APP_KEY>`를 [Datadog API 및 애플리케이션 키][5]로 교체합니다.


3. `DatadogAgent` 배포 구성 스펙을 통해 `datadog-agent.yaml` 파일을 생성합니다. Datadog Operator는 기본 Agent와 Cluster Agent 이미지 설정을 사용하여 공공 레지스트리에서 이미지를 풀링합니다.

   프라이빗 EKS 레지스트리에서 이미지를 풀링하려면 `global.registry`를 추가할 수 있습니다. 다음 구성은 메트릭, 로그 및 APM을 활성화합니다.
   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       # Required in case the Agent cannot resolve the cluster name through IMDS. See the note below.
       clusterName: <CLUSTER_NAME>
       registry: <PRIVATE_EKS_REGISTRY_PATH>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
         appSecret:
           secretName: datadog-secret
           keyName: app-key
     features:
       apm:
         enabled: true
       logCollection:
         enabled: true
   ```
   이 Agent 인스턴스 구성은 AWS Marketplace에서 호스팅한 ECR 리포지토리에서 Datadog Agent 이미지를 풀링합니다. 해당 항목은 또한 Datadog Operator Amazon EKS 애드온에 대한 이미지를 포함하고 있습니다. 대체 항목이 필요한 경우 위 매니페스트에서 'global.registry' 엔트리를 편집하세요.

   모든 구성 옵션은 [Operator 설정 사양][6]을 참조하세요.

   **참고:** 노드에서 IMDS v1 액세스가 차단된 경우, Agent는 클러스터 이름 및 특정 기능([Orchestrator Explorer][6])을 실행하지 못할 수 있습니다. 그러므로 Datadog에서는 `DatadogAgent` 매네페스트에서 `spec.global.ClusterName`를 추가할 것을 권장합니다. Agent가 IMDS v2를 사용해 메타데이터를 요청하도록 구성하는 방법에 대한 [메모][8]를 확인하세요.

4. Datadog Agent를 배포하세요:
   ```bash
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```


## Operator 설치 제거

Agent와 Operator를 설치 제거하려면 먼저 `DatadogAgent` 커스텀 리소스를 삭제합니다.

  ```bash
  kubectl delete datadogagents.datadoghq.com datadog
  ```

모든 Agent 리소스가 삭제되었는지 확인한 다음 애드온 설치 제거를 진행합니다.

{{< tabs >}}
{{% tab "Console" %}}

* AWS 콘솔에서 EKS 클러스터로 이동합니다.
* 애드온 탭으로 이동하여 *Datadog Operator* 애드온을 선택합니다.
* **Remove**를 클릭한 다음 프롬프트가 나타나면 확인합니다.

{{% /tab %}}
{{% tab "CLI" %}}

애드온을 삭제하려면 다음을 실행합니다.
  ```bash
  aws eks delete-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME>
  ```

{{% /tab %}}
{{< /tabs >}}

 **참고:** `DatadogAgent` 커스텀 리소스 삭제 전에 Operator 애드온을 설치 제거해도 Agent가 계속 클러스터에서 실행됩니다. Operator를 실행해야 `DatadogAgent`가 완료되기 때문에 네임스페이스 삭제가 실패합니다. 해결 방법은 이 Github [문제][9]를 참고하세요.


{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/marketplace/pp/prodview-wedp6r37fkufe
[2]: /ko/getting_started/containers/datadog_operator
[3]: https://github.com/DataDog/helm-charts/blob/operator-eks-addon/charts/operator-eks-addon/aws_mp_configuration.schema.json
[4]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[7]: https://docs.datadoghq.com/ko/infrastructure/containers/orchestrator_explorer/?tab=datadogoperator
[8]: https://github.com/DataDog/datadog-agent/blob/4896a45f586f74de1da2e985f98988f0181afc36/pkg/config/config_template.yaml#L407-L416
[9]: https://github.com/DataDog/datadog-operator/issues/654
[10]: /ko/integrations/eks_fargate/#setup