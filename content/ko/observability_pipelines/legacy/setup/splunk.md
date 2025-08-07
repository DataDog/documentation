---
aliases:
- /ko/integrations/observability_pipelines/splunk
- /ko/observability_pipelines/guide/setup_splunk_environment
- /ko/observability_pipelines/setup/splunk/
further_reading:
- link: /observability_pipelines/legacy/working_with_data/
  tag: 설명서
  text: Observability Pipelines로 데이터 작업
- link: /observability_pipelines/legacy/configurations/
  tag: 설명서
  text: Observability Pipelines 구성 알아보기
- link: https://dtdg.co/d22op
  tag: 학습 센터
  text: 옵저버빌리티 파이프라인을 통한 안전한 로컬 처리
title: (레거시) Splunk 환경에서 Observability Pipelines 설정하기
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines는 US1-FED Datadog 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

{{% observability_pipelines/legacy_warning %}}

<div class="alert alert-info">Observability Pipelines는 Splunk HTTP Event Collector(HEC) 프로토콜만 지원합니다.</div>

## 개요

The [Observability Pipelines Worker][1]는 로그를 수집하고 처리한 다음 모든 소스에서 모든 목적지로 로그를 라우팅할 수 있습니다. Datadog를 사용하면 대규모의 Observability Pipelines Worker 배포 모두를 빌드하고 관리할 수 있습니다.

본 지침에서는 일반 툴 클러스터에 해당 Worker를 배포하고 Worker를 통해 로그를 이중 쓰기로 Datadog에 전송하도록 Splunk를 설정하는 방법을 상세하게 안내합니다.

{{< img src="observability_pipelines/guide/splunk/setup2.png" alt="여러 개의 Splunk Heavy Forwarder가 Observability Pipelines aggregator로 데이터를 전송하는 것을 보여주는 다이어그램" >}}

## 가정
* Splunk HTTP Event Collector(HEC) 프로토콜과 호환되는 로그 컬렉터를 사용하고 있습니다.
* 로그 컬렉터(Collector)와 로그가 전송될 Splunk 인덱스에 대한 관리자 액세스 권한이 있습니다.
* Observability Pipelines Worker를 배포할 클러스터의 관리자 액세스 권한이 있습니다.
* 다른 모든 클러스터가 연결된 환경에서 공통 툴 또는 보안 클러스터를 보유하고 있습니다.

## 사전 필수 조건
설치하기 전에 다음을 보유하고 있는지 확인합니다.

* 유효한 [Datadog API 키][2]
* 파이프라인 ID

[관측 가능성 파이프라인][3]에서 이 모두를 생성할 수 있습니다.


### 제공자별 요구 사항
{{< tabs >}}
{{% tab "Docker" %}}
머신이 Docker를 실행하도록 설정되어 있는지 확인합니다.
{{% /tab %}}
{{% tab "AWS EKS" %}}
Kubernetes 노드에서 Worker를 실행하려면 사용 가능한 하나의 CPU와 512MB RAM과 함께 최소 2개 노드가 필요합니다. Datadog에서는 Worker에 별도의 노드 풀을 생성하는 것을 권장합니다. 이는 프로덕션 배포를 위한 권장 설정이기도 합니다.

* [EBS CSI 드라이버][1]가 필요합니다. 드라이버가 설치되어 있는지 확인하려면 다음 명령을 실행한 다음 목록에서 `ebs-csi-controller`를 찾습니다.

  ```shell
  kubectl get pods -n kube-system
  ```

*  Worker가 올바른 EBS 드라이브를 프로비저닝하려면 `StorageClass`가 필요합니다. 이미 설치되어 있는지 확인하려면 다음 명령을 실행하고 목록에서 `io2`를 찾습니다.

  ```shell
  kubectl get storageclass
  ```

  `io2`가 존재하지 않는 경우 [StorageClass YAML][2]을 다운로드한 다음 `kubectl apply`를 실행합니다.

* [AWS Load Balancer 컨트롤러][3]가 필요합니다. 컨트롤러가 설치되어 있는지 확인하려면, 다음 명령을 실행한 다음, 목록에서 `aws-load-balancer-controller`를 찾습니다.

  ```shell
  helm list -A
  ```
* Datadog는 Amazon EKS >= 1.16을 사용한 것을 권장합니다.

프로덕션 수준 요구 사항의 경우 [OPW Aggregator Architecture 모범 사례][4]를 참조하세요.

[1]: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html
[2]: /resources/yaml/observability_pipelines/helm/storageclass.yaml
[3]: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html
[4]: /ko/observability_pipelines/legacy/architecture/

{{% /tab %}}
{{% tab "Azure AKS" %}}
Kubernetes 노드에서 Worker를 실행하려면 사용 가능한 하나의 CPU와 512MB RAM과 함께 최소 2개 노드가 필요합니다. Datadog에서는 Worker에 별도의 노드 풀을 생성하는 것을 권장합니다. 이는 프로덕션 배포를 위한 권장 설정이기도 합니다.

프로덕션 수준 요구 사항의 경우 [OPW Aggregator Architecture 모범 사례][1]를 참조하세요.

[1]: /ko/observability_pipelines/legacy/architecture/
{{% /tab %}}
{{% tab "Google GKE" %}}
Kubernetes 노드에서 Worker를 실행하려면 사용 가능한 하나의 CPU와 512MB RAM과 함께 최소 2개 노드가 필요합니다. Datadog에서는 Worker에 별도의 노드 풀을 생성하는 것을 권장합니다. 이는 프로덕션 배포를 위한 권장 설정이기도 합니다.

프로덕션 수준 요구 사항의 경우 [OPW Aggregator Architecture 모범 사례][1]를 참조하세요.

[1]: /ko/observability_pipelines/legacy/architecture/
{{% /tab %}}
{{% tab "APT-based Linux" %}}
APT-기반 Linux에는 공급자별 요구 사항은 없습니다.
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
RPM-기반 Linux에는 공급자별 요구 사항은 없습니다.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
AWS 계정에서 Worker를 실행하려면 해당 계정의 관리자 액세스 권한이 있어야 합니다. Worker 인스턴스를 실행하려면 다음 정보를 수집합니다.
* 인스턴스가 실행될 VPC ID
* 인스턴스가 실행될 서브넷 ID
* VPC가 위치한 AWS 지역
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-warning">CloudFormation 설치는 현재 원격 설정만 지원됩니다.</div>
<div class="alert alert-danger">프로덕션 수준이 아닌 워크로드에만 CloudFormation 설치를 사용합니다.</div>

AWS 계정에서 Worker를 실행하려면 계정의 관리자 액세스 권한이 있어야 합니다. Worker 인스턴스를 실행하려면 다음 정보를 수집합니다.
* 인스턴스가 실행될 VPC ID
* 인스턴스가 실행될 서브넷 ID
* VPC가 위치한 AWS 지역
{{% /tab %}}
{{< /tabs >}}

## Splunk Index 설정

<div class="alert alert-info">Observability Pipelines는 입력에서 <strong>Enable Indexer Acknowledgments</strong> 설정을 활성화하면 승인을 지원합니다.</div>

Observability Pipelines Worker로부터 로그를 수신하려면 인덱스에서 HEC 입력과 HEC 토큰을 프로비저닝해야 합니다.


1. Splunk에서 **Settings** > **Data Inputs**으로 이동합니다.
2. 새 HTTP Event Collector 입력을 추가하고 이름을 지정합니다.
3. 로그를 전송할 인덱스를 선택합니다.

입력을 추가하면 Splunk가 토큰을 생성합니다. 토큰은 일반적으로 UUID 형식입니다. 본 문서의 하단에 제시된 샘플 설정에서는 해당 토큰을 설정에 추가하여 Observability Pipelines Worker가 자체적으로 인증할 수 있습니다.

## Observability Pipelines Worker 설치하기

{{< tabs >}}
{{% tab "Docker" %}}

Observability Pipelines Worker Docker 이미지는 Docker Hub [여기][1]에 게시되어 있습니다.

1. [샘플 파이프라인 설정 파일][2]을 다운로드합니다.

2. 다음 명령을 실행하여 Docker를 통해 Observability Pipelines Worker를 시작합니다.
    ```
    docker run -i -e DD_API_KEY=<API_KEY> \
      -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
      -e DD_SITE=<SITE> \
      -e SPLUNK_HEC_ENDPOINT=<SPLUNK_URL> \
      -e SPLUNK_TOKEN=<SPLUNK_TOKEN> \
      -p 8088:8088 \
      -v ./pipeline.yaml:/etc/observability-pipelines-worker/pipeline.yaml:ro \
      datadog/observability-pipelines-worker run
    ```
   `<API_KEY>`을 Datadog API 키로, `<PIPELINES_ID>`를 Observability Pipelines 설정 ID로, `<SITE>`를 {{< region-param key="dd_site" code="true" >}}로 변경합니다. `SPLUNK_HEC_ENDPOINT` 및 `SPLUNK_TOKEN`를 [Splunk 인덱스 설정하기](#setting-up-the-splunk-index)에서 생성한 Splunk 배치와 일치하는 값으로 업데이트합니다. `./pipeline.yaml`는 반드시 1단계에서 다운로드한 설정의 상대 또는 절대 경로여야 합니다.

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker
[2]: /resources/yaml/observability_pipelines/splunk/pipeline.yaml
{{% /tab %}}
{{% tab "AWS EKS" %}}
1. AWS EKS를 위해 [Helm 차트 값 파일][1]을 다운로드합니다.

2. Helm 차트에서 `datadog.apiKey` 및 `datadog.pipelineId`을 해당하는 값으로 각각 변경하고 `<site>`를 {{< region-param key="dd_site" code="true" >}}로 변경합니다.
    ```yaml
    datadog:
      apiKey: "<datadog_api_key>"
      pipelineId: "<observability_pipelines_configuration_id>"
      site: "<site>"
    ```

3. `SPLUNK_HEC_ENDPOINT` 및 `SPLUNK_HEC_TOKEN` 값을 [Splunk 인덱스 설정하기](#setting-up-the-splunk-index)에서 생성한 토큰을 포함하여 Splunk 배치와 일치하는 값으로 변경합니다.
    ```yaml
    env:
      - name: SPLUNK_HEC_ENDPOINT
        value: <https://your.splunk.index:8088/>
      - name: SPLUNK_TOKEN
        value: <a_random_token_usually_a_uuid>
    ```

4. 다음 명령어로 클러스터에 Helm 차트를 설치합니다.

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

[1]: /resources/yaml/observability_pipelines/splunk/aws_eks.yaml
{{% /tab %}}
{{% tab "Azure AKS" %}}
1. Azure AKS용 [Helm 차트 값 파일][1]을 다운로드합니다.

2. Helm 차트에서 `Datadog.apiKey` 및 `Datadog.pipelineId` 을 각 해당 값으로 변경하고 `<site>`를 {{< region-param key="dd_site" code="true" >}}로 변경합니다.
    ```yaml
    datadog:
      apiKey: "<datadog_api_key>"
      pipelineId: "<observability_pipelines_configuration_id>"
      site: "<site>"
    ```

3. `SPLUNK_HEC_ENDPOINT` 및 `SPLUNK_HEC_TOKEN` 값을 [Splunk 인덱스 설정하기](#setting-up-the-splunk-index)에서 생성한 토큰을 포함하여 Splunk 배치와 일치하는 값으로 변경합니다.
    ```yaml
    env:
      - name: SPLUNK_HEC_ENDPOINT
        value: <https://your.splunk.index:8088/>
      - name: SPLUNK_TOKEN
        value: <a_random_token_usually_a_uuid>
    ```

4. 다음 명령어로 클러스터에 Helm 차트를 설치합니다.

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

[1]: /resources/yaml/observability_pipelines/splunk/azure_aks.yaml
{{% /tab %}}
{{% tab "Google GKE" %}}
1. Google GKE용 [Helm 차트 값 파일][1]을 다운로로드합니다.

2. Helm 차트에서 `Datadog.apiKey` 및 `Datadog.pipelineId` 을 각 해당 값으로 변경하고 `<site>`를 {{< region-param key="dd_site" code="true" >}}로 변경합니다.
    ```yaml
    datadog:
      apiKey: "<datadog_api_key>"
      pipelineId: "<observability_pipelines_configuration_id>"
      site: "<site>"
    ```

3. `SPLUNK_HEC_ENDPOINT` 및 `SPLUNK_HEC_TOKEN` 값을 [Splunk 인덱스 설정하기](#setting-up-the-splunk-index)에서 생성한 토큰을 포함하여 Splunk 배치와 일치하는 값으로 변경합니다.
    ```yaml
    env:
      - name: SPLUNK_HEC_ENDPOINT
        value: <https://your.splunk.index:8088/>
      - name: SPLUNK_TOKEN
        value: <a_random_token_usually_a_uuid>
    ```

4. 다음 명령어로 클러스터에 Helm 차트를 설치합니다.

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

[1]: /resources/yaml/observability_pipelines/splunk/google_gke.yaml
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

4. Worker의 환경 변수에 다음과 같이 키, 사이트({{< region-param key="dd_site" code="true" >}}), Splunk 정보를 추가합니다.

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    SPLUNK_HEC_ENDPOINT=<SPLUNK_URL>
    SPLUNK_TOKEN=<SPLUNK_TOKEN>
    EOF
    ```

5. [샘플 설정 파일][1]을 호스트의 `/etc/observability-pipelines-worker/pipeline.yaml`에 다운로드합니다.

6. Worker를 시작합니다.
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/splunk/pipeline.yaml
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
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
    EOF
    ```

   **참고:** RHEL 8.1 또는 CentOS 8.1을 실행하는 경우 위 설정에서 `repo_gpgcheck=1` 대신 `repo_gpgcheck=0`를 사용합니다.

2. 패키지를 업데이트하고 Worker를 설치합니다.

    ```
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```

3. Worker의 환경 변수에 다음과 같이 키, 사이트({{< region-param key="dd_site" code="true" >}}) 및 Splunk 정보를 추가합니다.

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    SPLUNK_HEC_ENDPOINT=<SPLUNK_URL>
    SPLUNK_TOKEN=<SPLUNK_TOKEN>
    EOF
    ```

4. [샘플 설정 파일][1]을 호스트의 `/etc/observability-pipelines-worker/pipeline.yaml`에 다운로드합니다.

5. Worker를 시작합니다.
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/splunk/pipeline.yaml
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
샘플 설정으로 기존 Terraform에서 Worker 모듈을 설정합니다. `vpc-id`, `subnet-ids`, `region` 값을 업데이트하여 AWS 배포에 매칭합니다. 또한, `datadog-api-key` 및 `pipeline-id`의 값을 업데이트하여 파이프라인을 매칭합니다.

```
module "opw" {
    source     = "git::https://github.com/DataDog/opw-terraform//aws"
    vpc-id     = "{VPC ID}"
    subnet-ids = ["{SUBNET ID 1}", "{SUBNET ID 2}"]
    region     = "{REGION}"

    datadog-api-key = "{DATADOG API KEY}"
    pipeline-id = "{OP PIPELINE ID}"
    environment = {
      "SPLUNK_TOKEN": "<SPLUNK TOKEN>",
    }
    pipeline-config = <<EOT
sources:
  splunk_receiver:
    type: splunk_hec
    address: 0.0.0.0:8088
    valid_tokens:
        - $${SPLUNK_TOKEN}

transforms:
  ## This is a placeholder for your own remap (or other transform)
  ## steps with tags set up. Datadog recommends these tag assignments.
  ## They show which data has been moved over to OP and what still needs
  ## to be moved.
  LOGS_YOUR_STEPS:
    type: remap
    inputs:
      - splunk_receiver
    source: |
      .sender = "observability_pipelines_worker"
      .opw_aggregator = get_hostname!()

## This buffer configuration is split into 144GB buffers for both of the Datadog and Splunk sinks.
##
## This should work for the vast majority of OP Worker deployments and should rarely
## need to be adjusted. If you do change it, be sure to update the size the `ebs-drive-size-gb` parameter.
sinks:
  datadog_logs:
    type: datadog_logs
    inputs:
      - LOGS_YOUR_STEPS
    default_api_key: "$${DD_API_KEY}"
    compression: gzip
    buffer:
        type: disk
        max_size: 154618822656
  splunk_logs:
    type: splunk_hec_logs
    inputs:
      - LOGS_YOUR_STEPS
    endpoint: <SPLUNK HEC ENDPOINT>
    default_token: $${SPLUNK_TOKEN}
    encoding:
      codec: json
    buffer:
        type: disk
        max_size: 154618822656
EOT
}
```
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-danger">프로덕션 수준이 아닌 워크로드에만 CloudFormation 설치를 사용합니다.</div>

AWS 계정에 Worker를 설치하려면 다음에 따라 CloudFormation 템플릿으로 스택을 생성합니다.

  1. Worker용 [CloudFormation 템플릿][1]을 다운로드합니다.

  2. **CloudFormation console**에서 **Create stack**를 클릭하고 **With new resources (standard)** 옵션을 선택합니다.

  3. **Template is ready** 옵션을 선택했는지 확인합니다. **Choose file**을 클릭하고 앞서 다운로드한 CloudFormation 템플릿 파일을 추가합니다. 그런 다음 **Next**을 클릭합니다.

  4. **Specify stack details**에서 스택 이름을 입력합니다.

  5. CloudFormation 템플릿의 파라미터를 입력합니다. 일부 파라미터의 경우 특별히 유의하세요.

      * `APIKey` 및 `PipelineID`의 경우 앞서 필수 요건 섹션에서 수집한 키와 ID를 입력합니다.

      * `SplunkToken`의 경우 앞서 Splunk 인덱스에서 생성한 토큰을 입력합니다.

     * `VPCID` 및 `SubnetIDs`의 경우 앞서 선택한 서브넷과 VPC를 입력합니다.

      * 다른 파라미터는 Worker 배포에 적절한 기본값으로 설정되어 있습니다. 그러나 필요에 따라 내 사용 사례에 맞게 값을 조정할 수 있습니다.

  6. **Next**를 클릭합니다.

  7. 파라미터를 검토하고 예상값과 일치하는지 확인합니다. IAM의 필요 권한 확인란을 클릭하고 **Submit**을 클릭하여 스택을 생성합니다.

이 시점에서 CloudFormation이 설치를 진행하며, Worker 인스턴스가 시작되고 필요한 소프트웨어를 자동으로 다운로드하여 실행을 시작합니다.

[1]: /resources/yaml/observability_pipelines/cloudformation/splunk.yaml
{{% /tab %}}
{{< /tabs >}}

### 로드 밸런싱

{{< tabs >}}
{{% tab "Docker" %}}
프로덕션 설정은 Docker 지침에 포함되어 있지 않습니다. 대신, 컨테이너 환경에서는 로드 밸런싱 관련 기업 표준을 참조합니다. 로컬 머신에서 테스트하는 경우에는 로드 밸런서를 설정할 필요가 없습니다.
{{% /tab %}}
{{% tab "AWS EKS" %}}
클라우드 공급자가 제공하는 로드 밸런서를 사용하세요.
로드 밸런서는 기본 Helm 설정에 지정된 오토스케일링 이벤트에 따라 자동으로 조정됩니다. 또한 로드 밸런서는 내부 네트워크 전용으로 설정되어,
고객님의 네트워크 내부에서만 접근할 수 있습니다.

기존 Collector를 설정할 때 Helm이 제공한 로드 밸런서 URL을 사용합니다.

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

기존 Collector를 설정할 때 Helm이 제공한 로드 밸런서 URL을 사용합니다.

Worker 스케일링 시 로드 밸런서 권장 사항에 대해서는 [용량 계획 및 스케일링][1]을 참조하세요.

#### 교차 사용 가능성 존 로드 밸런싱
제공된 Helm 설정은 로드 밸런싱 단순화를 시도합니다. 하지만 교차 AZ 트래픽에 대한 잠재적 가격을 고려애햐 합니다. 가능한 경우 샘플으 여러 교차 AZ 홉이 발생할 수 있는 상황을 만드는 것을 피하려 합니다.

[1]: /ko/observability_pipelines/legacy/architecture/capacity_planning_scaling/
{{% /tab %}}
{{% tab "Google GKE" %}}
클라우드 공급자가 제공하는 로드 밸런서를 사용하세요.
로드 밸런서는 기본 Helm 설정에 지정된 오토스케일링 이벤트에 따라 자동으로 조정됩니다. 또한 로드 밸런서는 내부 네트워크 전용으로 설정되어,
고객님의 네트워크 내부에서만 접근할 수 있습니다.

기존 Collector를 설정할 때 Helm가 제공한 로드 밸런서 URL을 사용합니다.

Worker 스케일링 시 로드 밸런서 권장 사항에 대해서는 [용량 계획 및 스케일링][1]을 참조하세요.

#### 교차 사용 가능성 존 로드 밸런싱
제공된 Helm 설정은 로드 밸런싱 단순화를 시도합니다. 하지만 교차 AZ 트래픽에 대한 잠재적 가격을 고려애햐 합니다. 가능한 경우 샘플으 여러 교차 AZ 홉이 발생할 수 있는 상황을 만드는 것을 피하려 합니다.

글로벌 액세스는 공유 도구 클러스터에서 필요할 가능성이 높기 때문에 기본적으로 활성화되어 있습니다.

[1]: /ko/observability_pipelines/legacy/architecture/capacity_planning_scaling/
{{% /tab %}}
{{% tab "APT-based Linux" %}}
단일 머신 설치의 특성을 고려하여 로드 밸런싱 기본 지원을 제공하지 않습니다. 회사의 기준을 바탕으로 자체 로드 밸런서를 프로비저닝합니다.
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
단일 머신 설치의 특성을 고려하여 로드 밸런싱 기본 지원을 제공하지 않습니다. 회사의 기준을 바탕으로 자체 로드 밸런서를 프로비저닝합니다.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
NLB는 Terraform 모듈이 프로비저닝하며, 인스턴스를 포인팅하도록 프로비저닝됩니다. 해당 DNS 주소는 Terraform의 `lb-dns` 출력에 반환됩니다.
{{% /tab %}}
{{% tab "CloudFormation" %}}

<div class="alert alert-danger">프로덕션 수준이 아닌 워크로드에만 CloudFormation 설치를 사용합니다.</div>

NLB는 CloudFormation 템플릿이 프로비저닝하며 오토스케일링 그룹을 포인팅하도록 설정됩니다. 해당 DNS 주소는 `LoadBalancerDNS` CloudFormation 출력에 반환됩니다.
{{% /tab %}}
{{< /tabs >}}

### 버퍼링
Observability Pipeline는 다수의 버퍼링 전략을 포함하여 다운스트림 오류에 대한 클러스터의 복원력을 향상합니다. 제공된 샘플 설정은 디스크 버퍼를 사용합니다. 해당 용량은 Observability Pipeline 배포에 대해 10Mbps/코어당 약 10분 분량의 데이터로 계산됩니다. 이는 자체적으로 일시적인 문제를 해결하거나 인시던트 반응자가 관측 가능성 데이터로 할 수 있는데 필요한 결정을 내리는 데 충분한 시간입니다.

{{< tabs >}}
{{% tab "Docker" %}}
기본적으로 Observability Pipelines Worker 데이터 디렉터리는 `/var/lib/observability-pipelines-worker`로 설정되어 있습니다. 호스트 머신의 컨테이너 연결 지점에 충분한 양의 저장 용량이 할당되어 있는지 확인하세요.
{{% /tab %}}
{{% tab "AWS EKS" %}}
AWS의 경우 Datadog에서는 `io2` EBS 드라이브 제품군을 사용할 것을 권장합니다. 또는 `gp3` 드라이브를 사용할 수도 있습니다.
{{% /tab %}}
{{% tab "Azure AKS" %}}
Azure AKS의 경우 Datadog은 `default`(`managed-csi`라고도 함) 디스크를 사용하기를 권장합니다.
{{% /tab %}}
{{% tab "Google GKE" %}}
Google GKE의 경우 Datadog은 SSD 기반이기 때문에 `premium-rwo` 드라이브 등급 사용을 권장합니다. HDD 기반 등급 `standard-rwo`는 버퍼에 필요한 충분한 쓰기 성능을 내지 못할 수도 있습니다. 
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

<div class="alert alert-danger">이 CloudFormation 템플릿으로 생성한 EBS 드라이브의 수명 주기는 해당 탬플릿과 함께 생성된 인스턴스와 연결됩니다. <strong>그러므로 인스턴스가 오토스케일링 그룹 등에 의해 종료되면 데이터가 손실될 수 있습니다.</strong> 따라서 프로덕션 수준이 아닌 워크로드에만 CloudFormation 설치를 사용합니다.</div>

각 인스턴스에는 288GB EBS 드라이브가 기본값으로 할당되며, 인스턴스 부팅 시 자동으로 마운트 및 포맷됩니다.
{{% /tab %}}
{{< /tabs >}}

## Splunk Forwarder를 Observability Pipelines Worker에 연결하기
Observability Pipelines Worker를 설치 및 설정하여 로그를 Splunk 인덱스로 전송한 후에는 기존 Collector가 Worker를 가리키도록 반드시 업데이트해야 합니다.

Observability Pipelines Worker와 연결된 호스트(또는 로드 밸런서)의 IP/URL로 Splunk Collector 대부분을 업데이트할 수 있습니다.

Terraform 설치의 경우 `lb-dns` 출력에서 필요한 값을 확인할 수 있습니다. CloudFormation 설치의 경우 `LoadBalancerDNS` CloudFormation 출력에 사용할 수 있는 적절한 URL이 있습니다.

또한  인증에 사용하려는 HEC 토큰으로 Splunk 수집기를 반드시 업데이트하여 `pipeline.yaml`의 Observability Pipelines Worker `valid_tokens` 목록에 지정된 토큰과 일치하도록 해야 합니다.

```
# Example pipeline.yaml splunk_receiver source
sources:
  splunk_receiver:
    type: splunk_hec
    address: 0.0.0.0:8088
    valid_tokens:
        - ${SPLUNK_TOKEN}
```
제시된 예제 설정에서는 Splunk 소스와 대상 모두에서 동일한 HEC 토큰이 사용됩니다.

이 시점에서 로그는 Worker로 전송되어 처리되어야 합니다. 다음 섹션에서는 기본적으로 포함된 프로세스와 사용 가능한 추가 옵션에 관해 설명합니다.

## 데이터 작업하기
Observability Pipelines 예제 설정으로 다음 작업을 할 수 있습니다.
- Splunk 전달자에서 Observability Pipelines Worker로 전송되는 로그를 수집합니다. 
- Observability Pipelines Worker를 통해 수신된 데이터에 태그를 추가하여 로그를 변환합니다. 해당 작업은 클러스터를 업데이트할 때 어떤 트래픽이 아직 Worker로 전송되어야 하는지 판단하는 데 도움이 됩니다. 아울러, 이 태그는 불균형이 발생할 경우 로그가 로드 밸런서를 통해 어떻게 라우팅되는지 보여줍니다.
- 데이터를 Splunk와 Datadog에 이중 전송하여 로그를 라우팅합니다.

## 참고 자료
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/observability_pipelines/legacy/
[2]: /ko/account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/observability-pipelines/create