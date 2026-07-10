---
aliases:
- /ko/agent/vector_aggregation/
- /ko/integrations/observability_pipelines/integrate_vector_with_datadog/
- /ko/observability_pipelines/integrate_vector_with_datadog/
- /ko/observability_pipelines/integrations/integrate_vector_with_datadog/
- /ko/observability_pipelines/production_deployment_overview/integrate_datadog_and_the_observability_pipelines_worker/
- /ko/observability_pipelines/setup/datadog/
further_reading:
- link: /observability_pipelines/legacy/production_deployment_overview/
  tag: 설명서
  text: 옵저버빌리티 파이프라인 작업자의 프로덕션 배포 설계 및 원칙
- link: https://dtdg.co/d22op
  tag: 학습 센터
  text: Observability Pipelines를 통한 안전한 로컬 프로세싱
title: (레거시) Datadog에서 Observability Pipelines 설정
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines은 US1-FED Datadog 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

{{% observability_pipelines/legacy_warning %}}

## 개요

[Observability Pipelines Worker][1]는 모든 소스에서 로그를 수집, 처리, 라우팅하여 원하는 대상에 전달할 수 있습니다. Datadog을 사용하면 모든 Observability Pipelines Worker 배포를 대규모로 구축하고 관리할 수 있습니다.

이 가이드는 공통 툴 클러스터(common tools cluster)에 Worker를 배포하고 Datadog Agent를 구성하여 로그와 메트릭을 Worker로 전송하는 과정을 설명합니다.

{{< img src="observability_pipelines/setup/opw-dd-pipeline.png" alt="여러 워크로드 클러스터에서 Observability Pipelines 집계기를 통해 데이터를 전송하는 다이어그램" >}}

## 배포 모드

{{% op-deployment-modes %}}

## 전제 조건
* 이미 Datadog을 사용 중이며 Observability Pipelines를 사용하려는 경우
* Observability Pipelines Worker가 배포될 클러스터와 집계될 워크로드에 대한 관리자 권한을 가진 경우
* 모든 클러스터가 연결된 공통 툴 또는 보안 클러스터를 보유한 경우

## 설치 전 준비 사항
설치 전에 다음을 확인해야 합니다.

* 유효한 [Datadog API 키][2]
* 파이프라인 ID

이 두 가지는 [Observability Pipelines][3]에서 생성할 수 있습니다.

### 공급자별 요구 사항
{{< tabs >}}
{{% tab "Docker" %}}
Docker를 실행하도록 머신이 구성되어 있는지 확인합니다.
{{% /tab %}}
{{% tab "AWS EKS" %}}
Kubernetes 노드에서 Worker를 실행하려면 최소 두 개의 노드와 각 노드에 1 CPU, 512MB RAM이 필요합니다. Datadog은 Worker 전용 노드 풀을 생성하는 것을 권장하며, 이는 프로덕션 배포 시에도 권장되는 구성입니다.

* [EBS CSI 드라이버][1]가 필요합니다. 설치 여부는 아래 명령어로 확인할 수 있으며, 목록에 `ebs-csi-controller`가 있는지 확인하세요.

  ```shell
  kubectl get pods -n kube-system
  ```

* 올바른 EBS 디스크를 프로비저닝하려면 `StorageClass`가 필요합니다. 설치 여부는 아래 명령어로 확인할 수 있으며, 목록에 `io2`가 있는지 확인하세요.

  ```shell
  kubectl get storageclass
  ```

  `io2`가 없으면  [StorageClass YAML][2]를 다운로드한 뒤 `kubectl apply`하세요.

* [AWS Load Balancer controller][3]가 필요합니다. 설치 여부는 아래 명령어로 확인할 수 있으며 목록에서 `aws-load-balancer-controller`를 찾습니다.

  ```shell
  helm list -A
  ```
* Datadog는 Amazon EKS 1.16 이상을 사용할 것을 권장합니다.

프로덕션 수준 요건은 [OPW Aggregator 아키텍처 모범 사례][4]를 참조하세요.

[1]: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html
[2]: /resources/yaml/observability_pipelines/helm/storageclass.yaml
[3]: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html
[4]: /ko/observability_pipelines/legacy/architecture/

{{% /tab %}}
{{% tab "Azure AKS" %}}
Kubernetes 노드에서 Worker를 실행하려면 최소 두 개의 노드와 각 노드에 1 CPU, 512MB RAM이 필요합니다. Datadog은 Worker 전용 노드 풀을 생성하는 것을 권장하며, 이는 프로덕션 배포 시에도 권장되는 구성입니다. 

프로덕션 수준 요건은 [OPW Aggregator 아키텍처 모범 사례][4]를 참조하세요.

[1]: /ko/observability_pipelines/legacy/architecture/
{{% /tab %}}
{{% tab "Google GKE" %}}
Kubernetes 노드에서 Worker를 실행하려면 최소 두 개의 노드와 각 노드에 1 CPU, 512MB RAM이 필요합니다. Datadog은 Worker 전용 노드 풀 생성을 권장하며, 이는 프로덕션 배포 시에도 권장되는 구성입니다.

프로덕션 수준 요건은 [OPW Aggregator 아키텍처 모범 사례][4]를 참조하세요.

[1]: /ko/observability_pipelines/legacy/architecture/
{{% /tab %}}
{{% tab "APT-based Linux" %}}
APT 기반 Linux 환경에는 별도의 요구 사항이 없습니다.
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
RPM 기반 Linux 환경에는 별도의 요구 사항이 없습니다.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
AWS 계정에서 Worker를 실행하려면 해당 계정의 관리자 권한이 필요합니다. Worker 인스턴스를 실행하기 위해 다음 정보를 수집해야 합니다.
* 인스턴스가 실행될 VPC ID
* 인스턴스가 실행될 서브넷 ID
* VPC가 위치한 AWS 리전
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-warning">CloudFormation 설치는 원격 구성(Remote Configuration)만 지원합니다.</div>
<div class="alert alert-danger">CloudFormation 설치는 프로덕션급 워크로드가 아닌 환경에서만 사용하세요.</div>

AWS 계정에서 Worker를 실행하려면 계정의 관리자 액세스 권한이 있어야 합니다. Worker 인스턴스를 실행하려면 다음 정보를 수집합니다.
* 인스턴스가 실행될 VPC ID
* 인스턴스가 실행될 서브넷 ID
* VPC가 위치한 AWS 지역
{{% /tab %}}
{{< /tabs >}}

## Observability Pipelines Worker 설치하기

{{< tabs >}}
{{% tab "Docker" %}}

Observability Pipelines Worker 도커 이미지는 도커 허브 [여기][1]에 게시되어 있습니다.

1. [샘플 파이프라인 설정 파일][2]을 다운로드합니다.

2. 다음 명령을 실행하여 도커(Docker)를 통해 Observability Pipelines Worker를 시작합니다.
    ```
    docker run -i -e DD_API_KEY=<API_KEY> \
      -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
      -e DD_SITE=<SITE> \
      -p 8282:8282 \
      -v ./pipeline.yaml:/etc/observability-pipelines-worker/pipeline.yaml:ro \
      datadog/observability-pipelines-worker run
    ```
    `<API_KEY>`는 Datadog API 키로, `<PIPELINES_ID>`는 Observability Pipelines 구성 ID로, `<SITE>` 는 {{< region-param key="dd_site" code="true" >}}로 바꾸세요. `./pipeline.yaml`는 사용하려는 구성 파일의 상대 경로나 절대 경로여야 합니다.

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker
[2]: /resources/yaml/observability_pipelines/datadog/pipeline.yaml
{{% /tab %}}
{{% tab "AWS EKS" %}}
1. AWS EKS를 위해 [Helm 차트 값 파일][1]을 다운로드합니다.

2. Helm 차트에서 `datadog.apiKey` 및 `datadog.pipelineId` 값을 파이프라인과 일치하도록 교체하고 `site` 값으로 {{< region-param key="dd_site" code="true" >}}를 사용합니다. 그 후 다음 명령을 사용하여 클러스터에 설치합니다.

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    ```shell
    helm repo update
    ```
    ```shell
    helm upgrade --install \
        opw datadog/observability-pipelines-worker \
        -f aws_eks.yaml
    ```

[1]: /resources/yaml/observability_pipelines/datadog/aws_eks.yaml
{{% /tab %}}
{{% tab "Azure AKS" %}}
1. Azure AKS용 [Helm 차트 값 파일][1]을 다운로드합니다.

2. Helm 차트에서 `datadog.apiKey` 및 `datadog.pipelineId` 값을 파이프라인과 일치하도록 교체하고 `site` 값으로 {{< region-param key="dd_site" code="true" >}}를 사용합니다. 그 후 다음 명령을 사용하여 클러스터에 설치합니다.

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    ```shell
    helm repo update
    ```
    ```shell
    helm upgrade --install \
      opw datadog/observability-pipelines-worker \
      -f azure_aks.yaml
    ```

[1]: /resources/yaml/observability_pipelines/datadog/azure_aks.yaml
{{% /tab %}}
{{% tab "Google GKE" %}}
1. Google GKE용 [Helm 차트 값 파일][1]을 다운로로드합니다.

2. Helm 차트에서 `datadog.apiKey` 및 `datadog.pipelineId` 값을 파이프라인과 일치하도록 교체하고 `site` 값으로 {{< region-param key="dd_site" code="true" >}}를 사용합니다. 그 후 다음 명령을 사용하여 클러스터에 설치합니다.

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    ```shell
    helm repo update
    ```
    ```shell
    helm upgrade --install \
      opw datadog/observability-pipelines-worker \
      -f google_gke.yaml
    ```

[1]: /resources/yaml/observability_pipelines/datadog/google_gke.yaml
{{% /tab %}}
{{% tab "APT-based Linux" %}}
1. 다음 명령을 실행하여 APT를 설정하여 HTTPS를 통해 다운로드합니다.

    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. 다음 명령을 실행하여 시스템에 Datadog `deb` 리포지토리를 설정하고 Datadog 아카이브 키링을 생성합니다:

    ```
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable observability-pipelines-worker-1' > /etc/apt/sources.list.d/datadog-observability-pipelines-worker.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
    sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. 다음 명령을 실행하여 로컬 `apt` 리포지토리를 업데이트하고 Worker를 설치합니다:

    ```
    sudo apt-get update
    sudo apt-get install observability-pipelines-worker datadog-signing-keys
    ```

4. 작업자의 환경 변수에 다음과 같이 키와 사이트({{< region-param key="dd_site" code="true" >}})를 추가합니다.

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    EOF
    ```

5. [샘플 설정 파일][1]을 호스트의 `/etc/observability-pipelines-worker/pipeline.yaml`에 다운로드합니다.

6. Worker를 시작합니다.
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/datadog/pipeline.yaml
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
1. 다음 명령을 실행하여 시스템에서 Datadog `rpm` 르포를 설정합니다.

    ```
    cat <<EOF > /etc/yum.repos.d/datadog-observability-pipelines-worker.repo
    [observability-pipelines-worker]
    name = Observability Pipelines Worker
    baseurl = https://yum.datadoghq.com/stable/observability-pipelines-worker-1/\$basearch/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    EOF
    ```

   **참고:** RHEL 8.1 또는 CentOS 8.1을 실행하는 경우 위 설정에서 `repo_gpgcheck=1` 대신 `repo_gpgcheck=0`를 사용합니다.

2. 패키지를 업데이트하고 Worker를 설치합니다.

    ```
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```

3. 작업자의 환경 변수에 다음과 같이 키와 사이트({{< region-param key="dd_site" code="true" >}})를 추가합니다.

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    EOF
    ```

4. [샘플 설정 파일][1]을 호스트의 `/etc/observability-pipelines-worker/pipeline.yaml`에 다운로드합니다.

5. Worker를 시작합니다.
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/datadog/pipeline.yaml
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

1. [샘플 설정][1]을 다운로드합니다.
1. 샘플 설정을 사용해 기존 Terraform에서 Worker 모듈을 설정합니다. `vpc-id`, `subnet-ids` 및 `region` 값을 업데이트하여 설정에서 AWS 배포를 매칭합니다. 또한, `datadog-api-key` 및 `pipeline-id`의 값을 업데이트하여 파이프라인을 매칭합니다.

[1]: /resources/yaml/observability_pipelines/datadog/terraform_opw_datadog.tf

{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-danger">프로덕션 수준이 아닌 워크로드에만 CloudFormation 설치를 사용합니다.</div>

AWS 계정에 Worker를 설치하려면 다음과 같이 CloudFormation 템플릿으로 스택을 생성합니다.

  1. Worker용 [CloudFormation 템플릿][1]을 다운로드합니다.

  2. **CloudFormation console**에서 **Create stack**를 클릭하고 **With new resources (standard)** 옵션을 선택합니다.

  3. **Template is ready** 옵션이 선택되어 있는지 확인하고 **Upload a template file**을 선택합니다. **Choose file**을 클릭하고 앞서 다운로드한 CloudFormation 템플릿 파일을 추가합니다. **Next**를 클릭합니다.

  4. **Specify stack details**에서 스택 이름을 입력합니다.

  5. CloudFormation 템플릿의 파라미터를 입력합니다. 다음 사항을 특별히 주의해 주세요.

      * `APIKey` 및 `PipelineID`의 경우 앞서 필수 요건 섹션에서 수집한 키와 ID를 입력합니다.

      * `VPCID` 및 `SubnetIDs`의 경우 앞서 선택한 서브넷과 VPC를 입력합니다.

      * 다른 파라미터는 Worker 배포에 적절한 기본값으로 설정되어 있습니다. 그러나 필요에 따라 내 사용 사례에 맞게 값을 조정할 수 있습니다.

  6. **Next**를 클릭합니다.

  7. 파라미터를 검토하고 예상값과 일치하는지 확인합니다. IAM에 필요한 권한 확인란을 클릭하고 **Submit**을 클릭하여 스택을 생성합니다.

이 시점에서 CloudFormation이 설치를 시작합니다. Worker 인스턴스가 시작되어 필요한 소프트웨어를 다운로드한 후 자동으로 실행합니다.

[1]: /resources/yaml/observability_pipelines/cloudformation/datadog.yaml
{{% /tab %}}
{{< /tabs >}}

샘플 구성에 사용된 소스, 변환, 싱크에 대한 자세한 내용은 [구성][4]을 참조하세요. 데이터 변환에 관한 자세한 내용은 [데이터로 작업하기][5]를 참조하세요.

### 로드 밸런싱

{{< tabs >}}
{{% tab "Docker" %}}
프로덕션 설정은 Docker 지침에 포함되어 있지 않습니다. 대신, 컨테이너 환경에서 로드 밸런싱을 설정할 때는 기업 표준을 참조합니다. 로컬 머신에서 테스트하는 경우에는 로드 밸런서를 설정할 필요가 없습니다.
{{% /tab %}}
{{% tab "AWS EKS" %}}
클라우드 공급자가 제공하는 로드 밸런서를 사용하세요.
로드 밸런서는 기본 Helm 설정에 지정된 오토스케일링 이벤트에 따라 자동으로 조정됩니다. 또한 로드 밸런서는 내부 네트워크 전용으로 설정되어,
고객님의 네트워크 내부에서만 접근할 수 있습니다.

Datadog 에이전트를 설정할 때 Helm에서 제공한 로드 밸런서 URL을 사용합니다.

[AWS 로드 밸런서 컨트롤러][1]가 프로비저닝된 NLB를 사용합니다.

Worker 스케일링 시 로드 밸런서 권장 사항을 위한 [용량 계획 및 스케일링][2]을 참조하세요.
#### 교차 사용 가능성 존 로드 밸런싱
제공된 Helm 설정은 로드 밸런싱 단순화를 시도합니다. 하지만 교차 AZ 트래픽에 대한 잠재적 가격을 고려애햐 합니다. 가능한 경우 샘플으 여러 교차 AZ 홉이 발생할 수 있는 상황을 만드는 것을 피하려 합니다.

샘플 설정은 이 컨트롤러에서 사용 가능한 교차 존 로드 밸런싱 기능을 활성화할 수 없습니다. 활성화하려면 `service` 블록에서 다음 주석을 추가합니다.

```
service.beta.kubernetes.io/aws-load-balancer-attributes: load_balancing.cross_zone.enabled=true
```

자세한 정보는 [AWS 로드 밸런서 컨트롤러][3]를 참조하세요.

[1]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/
[2]: /ko/observability_pipelines/legacy/architecture/capacity_planning_scaling/
[3]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/guide/service/annotations/#load-balancer-attributes
{{% /tab %}}
{{% tab "Azure AKS" %}}
클라우드 공급자가 제공하는 로드 밸런서를 사용하세요.
로드 밸런서는 기본 Helm 설정에 지정된 오토스케일링 이벤트에 따라 자동으로 조정됩니다. 또한 로드 밸런서는 내부 네트워크 전용으로 설정되어,
고객님의 네트워크 내부에서만 접근할 수 있습니다.

Datadog 에이전트를 설정할 때 Helm에서 제공한 로드 밸런서 URL을 사용합니다.

Worker 스케일링 시 로드 밸런서 권장 사항에 대해서는 [용량 계획 및 스케일링][1]을 참조하세요.

#### 교차 사용 가능성 존 로드 밸런싱
제공된 Helm 설정은 로드 밸런싱 단순화를 시도합니다. 하지만 교차 AZ 트래픽에 대한 잠재적 가격을 고려애햐 합니다. 가능한 경우 샘플으 여러 교차 AZ 홉이 발생할 수 있는 상황을 만드는 것을 피하려 합니다.

[1]: /ko/observability_pipelines/legacy/architecture/capacity_planning_scaling/
{{% /tab %}}
{{% tab "Google GKE" %}}
클라우드 공급자가 제공하는 로드 밸런서를 사용하세요.
로드 밸런서는 기본 Helm 설정에 지정된 오토스케일링 이벤트에 따라 자동으로 조정됩니다. 또한 로드 밸런서는 내부 네트워크 전용으로 설정되어,
고객님의 네트워크 내부에서만 접근할 수 있습니다.

Datadog 에이전트를 설정할 때 Helm에서 제공한 로드 밸런서 URL을 사용합니다.

Worker 스케일링 시 로드 밸런서 권장 사항에 대해서는 [용량 계획 및 스케일링][1]을 참조하세요.

#### 교차 사용 가능성 존 로드 밸런싱
제공된 Helm 설정은 로드 밸런싱 단순화를 시도합니다. 하지만 교차 AZ 트래픽에 대한 잠재적 가격을 고려애햐 합니다. 가능한 경우 샘플으 여러 교차 AZ 홉이 발생할 수 있는 상황을 만드는 것을 피하려 합니다.

글로벌 액세스는 공유 도구 클러스터에서 사용하는 경우가 많기 때문에 기본값으로 활성화되어 있습니다.

[1]: /ko/observability_pipelines/legacy/architecture/capacity_planning_scaling/
{{% /tab %}}
{{% tab "APT-based Linux" %}}
설치가 단일 머신에 한정되므로 로드 밸런싱에 대한 기본 제공 지원이 없습니다. 회사에서 정한 표준 방식에 따라 별도의 로드 밸런서를 구성해야 합니다.
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
설치가 단일 머신에 한정되므로 로드 밸런싱에 대한 기본 제공 지원이 없습니다. 회사에서 정한 표준 방식에 따라 별도의 로드 밸런서를 구성해야 합니다.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
Terraform 모듈이 NLB(Network Load Balancer)를 자동으로 프로비저닝하며, 인스턴스를 대상으로 설정합니다. NLB의 DNS 주소는 Terraform 출력값으로 반환됩니다.
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-danger">프로덕션 수준이 아닌 워크로드에만 CloudFormation 설치를 사용합니다.</div>

NLB는 CloudFormation 템플릿이 프로비저닝하며 오토스케일링 그룹을 포인팅하도록 설정됩니다. 해당 DNS 주소는 `LoadBalancerDNS` CloudFormation 출력에 반환됩니다.
{{% /tab %}}
{{< /tabs >}}

### 버퍼링
Observability Pipeline는 다수의 버퍼링 전략을 포함하여 다운스트림 오류에 대한 클러스터의 복원력을 향상합니다. 제공된 샘플 설정은 디스크 버퍼를 사용합니다. 해당 용량은 Observability Pipeline 배포에 대해 10Mbps/코어당 약 10분 분량의 데이터로 계산됩니다. 이는 자체적으로 일시적인 문제를 해결하거나 인시던트 반응자가 관측 가능성 데이터로 할 수 있는데 필요한 결정을 내리는 데 충분한 시간입니다.

{{< tabs >}}
{{% tab "Docker" %}}}
기본적으로 Observability Pipelines Worker의 데이터 디렉터리는 `/var/lib/observability-pipelines-worker`로 설정되어 있습니다. 호스트 머신의 컨테이너 마운트 지점에 충분한 양의 저장 용량이 할당되어 있는지 확인하세요.
{{% /tab %}}
{{% tab "AWS EKS" %}}
AWS의 경우 Datadog에서는 `io2` EBS 드라이브 제품군을 사용할 것을 권장합니다. 또는 `gp3` 드라이브를 사용할 수도 있습니다.
{{% /tab %}}
{{% tab "Azure AKS" %}}
Azure AKS의 경우 Datadog은 `default`(`managed-csi`라고도 함) 디스크를 사용하기를 권장합니다.
{{% /tab %}}
{{% tab "Google GKE" %}}
Google GKE의 경우 Datadog은 SSD 기반이기 때문에 `premium-rwo` 드라이브 클래스 사용을 권장합니다. HDD 기반 클래스 `standard-rwo`는 버퍼에 필요한 충분한 쓰기 성능을 내지 못할 수도 있습니다. 
{{% /tab %}}
{{% tab "APT-based Linux" %}}
기본적으로 Observability Pipelines Worker의 데이터 디렉터리는 `/var/lib/observability-pipelines-worker`로 설정되어 있습니다. 설정 샘플을 사용하는 경우 버퍼링에 사용할 수 있는 공간이 최소 288GB 이상 확보되어 있는지 확인해야 합니다.

가능한 경우 해당 위치에 별도의 SSD를 장착하는 것을 권장합니다.
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
기본적으로 Observability Pipelines Worker의 데이터 디렉터리는 `/var/lib/observability-pipelines-worker`로 설정되어 있습니다. 설정 샘플을 사용하는 경우 버퍼링에 사용할 수 있는 공간이 최소 288GB 이상 확보되어 있는지 확인해야 합니다.

가능한 해당 위치에 별도의 SSD를 장착하는 것을 권장합니다.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
기본적으로 각 인스턴스에는 288GB EBS 드라이브가 할당되며, 위의 샘플 설정에서는 버퍼링에 이를 사용하도록 설정되어 있습니다.
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-danger">이 CloudFormation 템플릿으로 생성된 EBS 드라이브의 수명 주기는 해당 탬플릿이 생성한 인스턴스와 관련되어어 있습니다. <strong>그러므로 인스턴스가 오토스케일링 그룹 등에 의해 종료되면 데이터가 손실될 수 있습니다.</strong> 그러므로 프로덕션 수준이 아닌 워크로드에만 CloudFormation 설치를 사용합니다.</div>

각 인스턴스에는 288GB EBS 드라이브가 기본값으로 할당되며, 인스턴스 부팅 시 자동으로 마운트 및 포맷됩니다.
{{% /tab %}}
{{< /tabs >}}

## Datadog 에이전트를 Observability Pipelines Worker에 연결하기
Datadog 에이전트 로그를 Observability Pipelines Worker에 전송하려면 다음을 통해 에이전트 설정을 업데이트합니다.

```yaml
observability_pipelines_worker:
  logs:
    enabled: true
    url: "http://<OPW_HOST>:8282"
```

`OPW_HOST`는 이전에 설정한 로드 밸런서 또는 컴퓨터의 IP입니다. 단일 호스트 도커(Docker) 기반 설치의 경우, 기본 호스트의 IP 주소입니다. 쿠버네티스(Kubernetes) 기반 설치의 경우, 다음 명령을 실행하고 `EXTERNAL-IP`를 복사하여 검색할 수 있습니다.

```shell
kubectl get svc opw-observability-pipelines-worker
```

Terraform 설치의 경우 `lb-dns` 출력은 필요한 값을 제공합니다. CloudFormation 설치의 경우 `LoadBalancerDNS` CloudFormation 출력에는 사용할 수 있는 적절한 URL이 있습니다.

이 시점에서 통합 가시성 데이터는 Worker로 이동되어 데이터 프로세싱에 사용할 수 있습니다.

## 배포 모드 업데이트하기

{{% op-updating-deployment-modes %}}

## 데이터로 작업하기
제공된 샘플 구성에는 Observability Pipelines 도구를 시연하고 Datadog으로 전송되는 데이터가 올바른 형식인지 확인하는 프로세싱 단계의 예시가 포함되어 있습니다.

### 로그 프로세싱하기
예시 Observability Pipelines 설정은 다음 작업을 수행합니다.
- Datadog Agent에서 Observability Pipelines Worker로 전송된 로그를 수집합니다.
- Observability Pipelines Worker를 통해 들어오는 로그를 태깅합니다. 이렇게 하면 클러스터를 업데이트할 때 어떤 트래픽을 Worker로 전환해야 하는지 파악할 수 있습니다. 이 태그는 또한 불균형이 있을 때 부하 분산 장치를 통해 로그가 어떻게 라우팅되는지 보여줍니다.
- Worker를 통해 들어오는 로그의 상태를 수정합니다. Datadog Agent가 컨테이너에서 로그를 수집하는 방법으로 인해 제공된 `.status` 속성이 메시지의 실제 수준을 제대로 반영하지 못합니다. 이는 Worker에서 로그를 수신하는 백엔드에서 파싱 규칙과 관련된 문제를 방지하기 위해 제거되었습니다.

다음은 예제 구성에서 중요한 두 가지 구성 요소입니다.
- `logs_parse_ddtags`: 문자열에 저장된 태그를 구조화된 데이터로 파싱합니다.
- `logs_finish_ddtags` Datadog Agent에서 전송하는 형식으로 태그를 다시 인코딩합니다.

내부적으로 Datadog Agent는 로그 태그를 단일 문자열의 CSV로 나타냅니다. 이러한 태그를 효과적으로 조작하려면 수집 엔드포인트로 전송하기 전에 태그를 파싱하고 수정한 다음 다시 인코딩해야 합니다. 이 단계는 이 작업을 자동으로 실행하기 위해 작성되었습니다. 특히 태그 조작을 위해 파이프라인 수정은 이 두 단계 사이에 완료되어야 합니다.

이 시점에서 환경은 데이터가 통과하는 Observability Pipelines에 맞게 구성되었습니다. 특정 사용 사례에 따라 추가 구성이 필요할 수 있지만 제공된 도구로 시작할 수 있습니다.

## 참고 자료
{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/observability_pipelines/legacy/
[2]: /ko/account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/observability-pipelines/create
[4]: /ko/observability_pipelines/legacy/configurations/
[5]: /ko/observability_pipelines/legacy/working_with_data/