---
aliases:
- /ko/getting_started/observability_pipelines/
- /ko/observability_pipelines/installation/
- /ko/observability_pipelines/setup/
further_reading:
- link: /observability_pipelines/legacy/working_with_data/
  tag: 설명서
  text: 관측성 파이프라인에서 데이터 작업하기
- link: /observability_pipelines/legacy/production_deployment_overview/
  tag: 설명서
  text: 옵저버빌리티 파이프라인 작업자의 배포 설계 및 원칙
- link: /observability_pipelines/legacy/architecture/
  tag: 설명서
  text: 옵저버빌리티 파이프라인 작업자의 프로덕션 배포 설계 및 원칙
- link: https://dtdg.co/d22op
  tag: 학습 센터
  text: 옵저버빌리티 파이프라인을 통한 안전한 로컬 처리
title: (레거시) 관측성 파이프라인 작업자 설정하기
type: multi-code-lang
---

{{% observability_pipelines/legacy_warning %}}

## 개요

The [Observability Pipelines Worker][1]는 로그를 수집하고 처리한 다음 모든 소스에서 모든 목적지로 로그를 라우팅할 수 있습니다. Datadog를 사용하면 대규모의 Observability Pipelines Worker 배포 모두를 빌드하고 관리할 수 있습니다.

관측성 파이프라인 작업자를 시작하는 방법에는 여러 가지가 있습니다.

- [퀵스타트](#quickstart): 데모 데이터를 내보내는 간단한 파이프라인으로 작업자를 설치하여 빠르게 시작할 수 있습니다.
- [Datadog 설정 지침][2]: Datadog 에이전트에서 Datadog으로 데이터를 수신 및 라우팅하기 위한 기본 제공 파이프라인이 있는 작업자를 설치합니다.
- [Datadog 설정 지침][3]: Datadog 에이전트에서 Datadog으로 데이터를 수신 및 라우팅하기 위한 기본 제공 파이프라인이 있는 작업자를 설치합니다.
- [Splunk 설정 지침][4]: Splunk HEC 에서 Splunk 및 Datadog 모두로 데이터를 수신 및 라우팅하기 위한 기본 제공 파이프라인이 있는 작업자를 설치합니다.

이 문서는 빠른 시작 설치 단계를 안내한 후 다음 단계를 위한 리소스를 제공해 드립니다. 본 소프트웨어의 사용 및 운영은 [최종 사용자 라이선스 계약][5]의 적용을 받습니다.

## 배포 모드

{{% op-deployment-modes %}}

## 사전 필수 조건

관측성 파이프라인 작업자를 설치하려면 다음이 필요합니다.

- 유효한 [Datadog API 키][7].
- 파이프라인 ID.

새 API 키 및 파이프라인을 생성하려면:

1. [관측성 파이프라인][6]으로 이동합니다.
2. **새 파이프라인**을 클릭합니다.
3. 파이프라인의 이름을 입력합니다.
4. **Next**를 클릭합니다.
4. 원하는 템플릿을 선택하고 지침을 따릅니다.

## 빠른 시작

아래 지침에 따라 작업자를 설치하고 데모 데이터를 사용하는 샘플 파이프라인 설정을 배포합니다.

### Observability Pipelines Worker 설치하기

{{< tabs >}}
{{% tab "Docker" %}}

Observability Pipelines Worker 도커 이미지는 도커 허브 [여기][1]에 게시되어 있습니다.

1. [샘플 파이프라인 설정 파일][2]을 다운로드합니다. 본 설정은 데모 데이터를 내보낸 후 데이터를 파싱 및 구조화한 다음 콘솔과 Datadog으로 전송합니다. 샘플 설정에 사용된 소스, 변환 및 싱크에 대한 자세한 내용은 [설정][3]을 참조하세요.

2. 다음 명령을 실행하여 도커(Docker)를 통해 Observability Pipelines Worker를 시작합니다.

    ```shell
    docker run -i -e DD_API_KEY=<API_KEY> \
      -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
      -e DD_SITE=<SITE> \
      -p 8282:8282 \
      -v ./pipeline.yaml:/etc/observability-pipelines-worker/pipeline.yaml:ro \
      datadog/observability-pipelines-worker run
    ```

    `<API_KEY>`을 Datadog API 키로, `<PIPELINES_ID>`을 관측성 파이프라인 설정 ID로, `<SITE>`을 {{< region-param key="dd_site" code="true" >}}로 교체합니다. **참고**: `./pipeline.yaml`은 1단계에서 다운로드한 설정의 상대 또는 절대 경로여야 합니다.

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker
[2]: /resources/yaml/observability_pipelines/quickstart/pipeline.yaml
[3]: /ko/observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "AWS EKS" %}}
1. AWS EKS에 대한 [Helm 차트 값 파일][1]을 다운로드합니다. 샘플 설정에 사용된 소스, 변환 및 싱크에 대한 자세한 내용은 [설정][2]을 참조하세요.

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

[1]: /resources/yaml/observability_pipelines/quickstart/aws_eks.yaml
[2]: /ko/observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "Azure AKS" %}}
1. AWS EKS에 대한 [Helm 차트 값 파일][1]을 다운로드합니다. 샘플 설정에 사용된 소스, 변환 및 싱크에 대한 자세한 내용은 [설정][2]을 참조하세요.

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

[1]: /resources/yaml/observability_pipelines/quickstart/azure_aks.yaml
[2]: /ko/observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "Google GKE" %}}
1. Google GKE에 대한 [Helm 차트 값 파일][1]을 다운로드합니다. 샘플 설정에 사용된 소스, 변환 및 싱크에 대한 자세한 내용은 [설정][2]을 참조하세요.

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

[1]: /resources/yaml/observability_pipelines/quickstart/google_gke.yaml
[2]: /ko/observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "APT-based Linux" %}}

한 줄 설치 스크립트를 사용하거나 수동으로 작업자를 설치합니다.
#### 한 줄 설치 스크립트

1. 한 줄 설치 명령을 실행하여 작업자를 설치합니다. `<DD_API_KEY>`를 Datadog API 키로, `<PIPELINES_ID>`을 관측성 파이프라인 ID로, `<SITE>`을 {{< region-param key="dd_site" code="true" >}}로 교체합니다.

    ```
    DD_API_KEY=<DD_API_KEY> DD_OP_PIPELINE_ID=<PIPELINES_ID> DD_SITE=<SITE> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_op_worker1.sh)"
    ```

2. 호스트에 `/etc/observability-pipelines-worker/pipeline.yaml`에 [샘플 설정 파일][1]을 다운로드합니다. 샘플 설정에 사용된 소스, 변환 및 싱크에 대한 자세한 내용은 [설정][2]을 참조하세요.

3. Worker를 시작합니다.

    ```
    sudo systemctl restart observability-pipelines-worker
    ```

#### 수동 설치

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

6. 작업자를 시작합니다.

    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/datadog/pipeline.yaml
[2]: /ko/observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "RPM-based Linux" %}}

한 줄 설치 스크립트를 사용하거나 수동으로 작업자를 설치합니다.

#### 한 줄 설치 스크립트

1. 한 줄 설치 명령을 실행하여 작업자를 설치합니다. `<DD_API_KEY>`를 Datadog API 키로, `<PIPELINES_ID>`을 관측성 파이프라인 ID로, `<SITE>`을 {{< region-param key="dd_site" code="true" >}}로 교체합니다.

    ```
    DD_API_KEY=<DD_API_KEY> DD_OP_PIPELINE_ID=<PIPELINES_ID> DD_SITE=<SITE> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_op_worker1.sh)"
    ```

2. 호스트에 `/etc/observability-pipelines-worker/pipeline.yaml`에 [샘플 설정 파일][1]을 다운로드합니다. 샘플 설정에 사용된 소스, 변환 및 싱크에 대한 자세한 내용은 [설정][2]을 참조하세요.

3. 다음 명령을 실행하여 작업자를 시작합니다:

    ```
    sudo systemctl restart observability-pipelines-worker
    ```

#### 수동 설치

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

4. 호스트에 `/etc/observability-pipelines-worker/pipeline.yaml`에 [샘플 설정 파일][1]을 다운로드합니다. 샘플 설정에 사용된 소스, 변환 및 싱크에 대한 자세한 내용은 [설정][2]을 참조하세요.

5. 다음 명령을 실행하여 작업자를 시작합니다:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/quickstart/pipeline.yaml
[2]: /ko/observability_pipelines/legacy/configurations/
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

1. [샘플 설정][1]을 다운로드합니다.
1. 샘플 설정을 사용해 기존 Terraform에서 작업자 모듈을 설정합니다. `vpc-id`, `subnet-ids` 및 `region` 값을 업데이트하여 설정에서 AWS 배포를 매칭합니다. 또한, `datadog-api-key` 및 `pipeline-id`의 값을 업데이트하여 파이프라인을 매칭합니다.

샘플 설정에 사용된 소스, 변환 및 싱크에 대한 자세한 내용은 [설정][2]을 참조하세요.

[1]: /resources/yaml/observability_pipelines/quickstart/terraform_opw.tf
[2]: /ko/observability_pipelines/legacy/configurations/
{{% /tab %}}
{{< /tabs >}}

데이터 변환에 대한 자세한 내용은 [데이터로 작업하기][8]를 참조하세요.

## 배포 모드 업데이트하기

{{% op-updating-deployment-modes %}}

## 다음 단계

빠른 시작은 작업자를 설치하고 샘플 파이프라인을 배포하는 과정을 안내합니다. Datadog 에이전트에서 Datadog으로 데이터를 수신 및 라우팅하거나 Splunk HEC 에서 Splunk 및 Datadog로 데이터를 수신 및 라우팅하기 위해 작업자를 설치하는 방법에 대한 지침은 다음의 특정 사용 사례를 선택하세요.

{{< partial name="observability_pipelines/use_cases.html" >}}

여러 작업자를 배포 및 확장하는 방법에 대한 권장 사항을 확인하세요.

- 관측성 파이프라인 아키텍처를 설계할 때 고려해야 할 사항에 대한 자세한 내용은 [배포 설계 및 원칙][9]을 참조하세요.
- [OP 작업자 애그리게이터(aggregator) 아키텍처 모범 사례][10]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/observability_pipelines/legacy/#what-is-observability-pipelines-and-the-observability-pipelines-worker
[2]: /ko/observability_pipelines/legacy/setup/datadog/
[3]: /ko/observability_pipelines/legacy/setup/datadog_with_archiving/
[4]: /ko/observability_pipelines/legacy/setup/splunk/
[5]: https://www.datadoghq.com/legal/eula/
[6]: https://app.datadoghq.com/observability-pipelines
[7]: /ko/account_management/api-app-keys/#api-keys
[8]: /ko/observability_pipelines/legacy/working_with_data/
[9]: /ko/observability_pipelines/legacy/production_deployment_overview/
[10]: /ko/observability_pipelines/legacy/architecture/