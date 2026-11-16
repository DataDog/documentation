---
aliases:
- /ko/agent/guide/operator-eks-addon
description: Datadog Operator를 EKS 애드온으로 사용하여 Amazon EKS 클러스터에 Datadog Agent를 설치하고
  구성합니다.
further_reading:
- link: agent/kubernetes/log
  tag: 설명서
  text: Datadog 및 Kubernetes
title: Datadog Operator 애드온을 사용해 Amazon EKS에 Datadog Agent 설치하기
---
<div class="alert alert-info">v0.1.9부터 Datadog Operator 애드온은 Fargate 인스턴스에서 예약된 포드에 Agent 사이드카를 자동으로 주입하는 기능을 지원합니다. 자세한 내용은 <a href="https://docs.datadoghq.com/integrations/eks_fargate/?tab=datadogoperator#admission-controller-using-datadog-operator">이 가이드</a>를 참조하세요.
</div>


[Datadog Operator](/containers/datadog_operator)를 설치하여 Amazon EKS 클러스터에 Datadog Agent를 설치할 수 있습니다.
[Amazon EKS 애드온](https://docs.aws.amazon.com/eks/latest/userguide/eks-add-ons.html)으로 설치하고 `DatadogAgent` 매니페스트를 적용합니다.

Operator 애드온을 사용하여 설치한 Agent는 EC2 인스턴스에서 실행 중인 포드의 데이터만 수집합니다. AWS Fargate에서 실행 중인 포드의 경우 [Amazon EKS on AWS Fargate 문서][10]를 참조하세요.

일반적인 [Helm 설치][4]와 비교하면, 애드온으로 설치 시 몇 가지 차이점이 있습니다.
* Operator 설치 중에는 이미지를 EKS 리포지토리에서만 가져와야 합니다. 이는 사용자가 변경할 수 없습니다.
* Operator Helm Chart 값은 재정의할 수 있으며 [스키마 파일][3]에 정의된 항목으로 제한됩니다.

이러한 제한은 Operator가 EKS 애드온 정책을 준수하는 데 필요합니다. 또한 EKS가 설치 안전성을 보장하고, 애드온 환경에서 아직 지원되지 않는 기능을 비활성화하는 데 필요합니다.

## 전제 조건 {#prerequisites}

* [Datadog Operator][1] 제품 구독
* kubectl 설치
* 애드온 설정 시 명령줄 인터페이스를 사용하는 경우 [AWS CLI](https://aws.amazon.com/cli/)

## Operator 설치 {#installing-operator}

{{< tabs >}}
{{% tab "콘솔" %}}

* AWS 콘솔에서 EKS 클러스터로 이동합니다.
* 애드온 탭으로 이동하여 *Get more add-ons*을 선택합니다.
* *Datadog Operator*를 찾아 선택합니다. 그런 다음 안내에 따라 설치를 완료합니다.

{{% /tab %}}
{{% tab "CLI" %}}

Operator 애드온을 설치하려면 다음을 실행하세요.
  ```bash
  aws eks create-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME>
  ```

애드온 설치는 비동기식으로 진행됩니다. 설치 상태를 검사하려면 다음을 실행하세요.
  ```bash
  aws eks describe-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME>
  ```
{{% /tab %}}
{{< /tabs >}}

정상적으로 설치가 완료되었는지 확인하려면 AWS Management Console, `eksctl` 또는 AWS CLI를 사용하여 `datadog-operator` 포드가 실행 중인지 확인합니다.

## Agent 구성 {#configuring-the-agent}

Operator 애드온을 설치했다면 Datadog Agent 설정을 진행할 수 있습니다.

지침에 따라 `DatadogAgent` 커스텀 리소스를 사용하여 Datadog Agent를 설정합니다.

1. Operator 설치 네임스페이스로 전환합니다. 기본적으로 `datadog-agent`입니다.
   ```bash
   kubectl config set-context --current --namespace=datadog-agent
   ```
2. [Datadog API 및 애플리케이션 키][5]를 사용하여 Kubernetes 시크릿을 생성합니다.
   ```bash
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```
   `<DATADOG_API_KEY>` 및 `<DATADOG_APP_KEY>`를 [Datadog API 및 애플리케이션 키][5]로 바꿉니다.


3. `datadog-agent.yaml` 파일을 생성하고, 여기에 `DatadogAgent` 배포 구성의 사양을 작성합니다. Datadog Operator는 기본 Agent 및 Cluster Agent 이미지 설정을 사용하며 공개 레지스트리에서 이를 가져옵니다.

   비공개 EKS 레지스트리에서 이미지를 가져오려면 `global.registry`를 추가할 수 있습니다. 다음 구성은 메트릭, 로그 및 APM을 활성화합니다.
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
   이 Agent 인스턴스 구성은 AWS Marketplace에서 호스팅하는 ECR 리포지토리에서 Datadog Agent 이미지를 가져오며, 이 리포지토리에는 Datadog Operator Amazon EKS 애드온용 이미지도 포함되어 있습니다. 대안이 필요한 경우 위 매니페스트에서 'global.registry' 항목을 수정하세요.

   모든 구성 옵션은 [Operator 구성 사양][6]을 참조하세요.

   **참고:** 노드에서 IMDS v1에 대한 액세스가 차단된 경우, Agent가 클러스터 이름을 확인할 수 없으며 특정 기능(예: [Orchestrator Explorer][6])이 작동하지 않습니다. 따라서 Datadog은 `DatadogAgent` 매니페스트에 `spec.global.ClusterName`을 추가할 것을 권장합니다. IMDS v2를 사용하여 메타데이터를 요청하도록 Agent를 구성하는 방법은 [예시 Agent 구성 파일][8]의 `ec2_prefer_imdsv2` 매개변수를 참조하세요.

4. Datadog Agent를 배포하세요.
   ```bash
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```


## Operator 설치 제거 {#uninstall-the-operator}

Agent와 Operator를 제거하려면 먼저 `DatadogAgent` 커스텀 리소스를 삭제합니다.

  ```bash
  kubectl delete datadogagents.datadoghq.com datadog
  ```

모든 Agent 리소스가 삭제되었는지 확인한 다음 애드온 설치 제거를 진행합니다.

{{< tabs >}}
{{% tab "콘솔" %}}

* AWS 콘솔에서 EKS 클러스터로 이동합니다.
* 애드온 탭으로 이동하여 *Datadog Operator* 애드온을 선택합니다.
* **Remove**를 클릭하고 메시지가 표시되면 확인합니다.

{{% /tab %}}
{{% tab "CLI" %}}

애드온을 삭제하려면 다음을 실행하세요.
  ```bash
  aws eks delete-addon --addon-name datadog_operator --region <AWS_REGION> --cluster-name <CLUSTER_NAME>
  ```

{{% /tab %}}
{{< /tabs >}}

 **참고:** `DatadogAgent` 커스텀 리소스를 삭제하기 전에 Operator 애드온을 제거하면 Agent가 클러스터에서 계속 실행됩니다. 실행 중인 Operator 없이는 `DatadogAgent`를 완료할 수 없으므로 네임스페이스를 삭제할 수 없습니다. 해결 방법은 이 Github [이슈][9]를 참조하세요.


{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/marketplace/pp/prodview-wedp6r37fkufe
[2]: /ko/getting_started/containers/datadog_operator
[3]: https://github.com/DataDog/helm-charts/blob/operator-eks-addon/charts/operator-eks-addon/aws_mp_configuration.schema.json
[4]: https://github.com/DataDog/helm-charts/tree/main/charts/datadog-operator
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md
[7]: https://docs.datadoghq.com/ko/infrastructure/containers/orchestrator_explorer/?tab=datadogoperator
[8]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
[9]: https://github.com/DataDog/datadog-operator/issues/654
[10]: /ko/integrations/eks_fargate/#setup