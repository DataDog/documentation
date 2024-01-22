---
aliases:
- /ko/getting_started/observability_pipelines/
- /ko/observability_pipelines/installation/
further_reading:
- link: /observability_pipelines/working_with_data/
  tag: 설명서
  text: 옵저버빌리티 파이프라인에서 데이터 사용
- link: /observability_pipelines/production_deployment_overview/
  tag: 설명서
  text: 옵저버빌리티 파이프라인 작업자의 배포 설계 및 원칙
- link: /observability_pipelines/architecture/
  tag: 설명서
  text: 옵저버빌리티 파이프라인 작업자의 프로덕션 배포 설계 및 원칙
- link: https://dtdg.co/d22op
  tag: 학습 센터
  text: 옵저버빌리티 파이프라인을 통한 안전한 로컬 처리
kind: documentation
title: 옵저버빌리티 파이프라인 작업자 설정
type: multi-code-lang
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">옵저버빌리티 파이프라인은 US1-FED Datadog 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

## 개요

[옵저버빌리티 파이프라인 작업자][1]는 모든 소스에서 모든 대상으로 로그와 메트릭을 수집, 처리 및 라우팅할 수 있습니다. Datadog을 사용하면 모든 옵저버빌리티 파이프라인 작업자 배포를 대규모로 구축하고 관리할 수 있습니다.

옵저버빌리티 파이프라인 작업자를 시작하는 방법에는 여러 가지가 있습니다.

- [빠른 설치](#quickstart): 데모 데이터를 내보내는 간단한 파이프라인으로 작업자를 설치하여 빠르게 시작할 수 있습니다.
- [Datadog 설정 가이드][2]: Datadog Agents에서 Datadog으로 데이터를 수신하고 라우팅하기 위해 즉시 사용 가능한 파이프라인으로 작업자를 설치합니다.
- [Datadog 아카이빙 설정 가이드][3]: Datadog Agents에서 Datadog과 S3로 데이터를 수신하고 라우팅하기 위해 즉시 사용 가능한 파이프라인으로 작업자를 설치합니다.
- [Splunk 설정 가이드][4]: Splunk HEC에서 Splunk 및 Datadog으로 데이터를 수신하고 라우팅하기 위해 즉시 사용 가능한 파이프라인으로 작업자를 설치합니다.

이 문서는 빠른 시작 설치 단계를 안내하고 다음 단계를 위한 리소스를 제공합니다.

## 배포 모드

{{% op-deployment-modes %}}

## 필수 구성 요소 

옵저버빌리티 파이프라인 작업자를 설치하려면 다음이 필요합니다:

- 유효한 [Datadog API 키[5].
- 파이프라인 ID.

새 API 키 및 파이프라인을 생성하려면:

1. [Observability Pipelines][6]로 이동합니다.
2. **New Pipeline**을 클릭합니다.
3. 파이프라인의 이름을 입력합니다.
4. **Next**를 클릭합니다.
4. 원하는 템플릿을 선택하고 지침을 따릅니다.

## 빠른 시작

다음 지침에 따라 작업자를 설치하고 데모 데이터를 사용하는 샘플 파이프라인 설정을 배포합니다.

### 옵저버빌리티 파이프라인 작업자 설치

{{< tabs >}}
{{% tab "Docker" %}}

옵저버빌리티 파이프라인 작업자 Docker 이미지는 Docker Hub [여기][1]에 게시됩니다.

1. [샘플 파이프라인 설정 파일][2]을 다운로드합니다. 이 설정은 데모 데이터를 내보내고 데이터를 파싱 및 구조화한 후 콘솔 및 Datadog으로 보냅니다. 샘플 설정에 사용된 소스, 변환, 싱크에 대한 자세한 내용은 [설정][3]을 참조하세요.

2. 다음 명령을 실행하여 Docker와 함께 옵저버빌리티 파이프라인 작업자를 시작합니다:

    ```shell
    docker run -i -e DD_API_KEY=<API_KEY> \
      -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
      -e DD_SITE=<SITE> \
      -p 8282:8282 \
      -v ./pipeline.yaml:/etc/observability-pipelines-worker/pipeline.yaml:ro \
      datadog/observability-pipelines-worker run
    ```

    `<API_KEY>`를 Datadog API 키로, `<PIPELINES_ID>`를 옵저버빌리티 파이프라인 설정 ID로, `<SITE>`를 {{< region-param key="dd_site" code="true" >}}로 교체합니다. **참고**: `./pipeline.yaml`는 1단계에서 다운로드한 설정의 상대적 또는 절대적 경로여야 합니다.

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker
[2]: /resources/yaml/observability_pipelines/quickstart/pipeline.yaml
[3]: /ko/observability_pipelines/configurations/
{{% /tab %}}
{{% tab "AWS EKS" %}}
1. AWS EKS용 [Helm 차트][1]를 다운로드합니다. 샘플 설정에 사용된 소스, 변환 및 싱크에 대한 자세한 내용은 [설정][2]을 참조하세요.

2. Helm 차트에서 해당 파이프라인과 일치하도록 `datadog.apiKey` 및 `datadog.pipelineId` 값을 변경하고 `site` 값에는 {{< region-param key="dd_site" code="true" >}}를 사용하세요. 그런 다음 아래 명령을 사용하여 클러스터에 설치합니다:

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
[2]: /ko/observability_pipelines/configurations/
{{% /tab %}}
{{% tab "Azure AKS" %}}
1. Azure AKS의 경우 [Helm 차트][1]를 다운로드합니다. 샘플 설정에 사용된 소스, 변환 및 싱크에 대한 자세한 내용은 [설정][2]을 참조하세요.

2. Helm 차트에서 해당 파이프라인과 일치하도록 `datadog.apiKey` 및 `datadog.pipelineId`값을 변경하고 `site`값에 {{< region-param key="dd_site" code="true" >}}를 사용합니다. 그런 다음 아래 명령을 사용하여 클러스터에 설치합니다:

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
[2]: /ko/observability_pipelines/configurations/
{{% /tab %}}
{{% tab "Google GKE" %}}
1. 구글 GKE용 [Helm 차트][1]를 다운로드합니다. 샘플 설정에 사용된 소스, 변환 및 싱크에 대한 자세한 내용은 [설정][2]을 참조하세요.

2. Helm 차트에서 해당 파이프라인과 일치하도록 `datadog.apiKey` 및 `datadog.pipelineId` 값을 변경하고 `site` 값에 {{< region-param key="dd_site" code="true" >}}를 사용합니다. 그런 다음 아래 명령을 사용하여 클러스터에 설치합니다:

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
[2]: /ko/observability_pipelines/configurations/
{{% /tab %}}
{{% tab "APT 기반 Linux" %}}

한 줄 설치 스크립트를 사용하거나 수동으로 작업자를 설치합니다.
#### 한 줄 설치 스크립트

1. 한 줄 설치 명령을 실행하여 작업자를 설치합니다. `<DD_API_KEY>`는 Datadog API 키로, `<PIPELINES_ID>`는 옵저버빌리티 파이프라인 ID로, `<SITE>`는 {{< region-param key="dd_site" code="true" >}}로 교체합니다.

    ```
    DD_API_KEY=<DD_API_KEY> DD_OP_PIPELINE_ID=<PIPELINES_ID> DD_SITE=<SITE> bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_op_worker1.sh)"
    ```

2. [샘플 설정 파일][1]을 호스트에서 `/etc/observability-pipelines-worker/pipeline.yaml`로 다운로드합니다. 샘플 설정에 사용되는 소스, 변환 및 싱크에 대한 자세한 내용은 [설정][2]를 참조하세요.

3. 작업자 시작:

    ```
    sudo systemctl restart observability-pipelines-worker
    ```

#### 수동 설치

1. HTTPS를 통해 다운로드할 APT를 설정하려면 다음 명령을 실행합니다:

    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. 다음 명령을 실행하여 시스템에 Datadog `deb` 리포지토리를 설정하고 Datadog 아카이브 키링을 생성하세요:

    ```
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable observability-pipelines-worker-1' > /etc/apt/sources.list.d/datadog-observability-pipelines-worker.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
    sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. 다음 명령을 실행하여 로컬 `apt` 리포지토리를 업데이트하고 작업자를 설치합니다:

    ```
    sudo apt-get update
    sudo apt-get install observability-pipelines-worker datadog-signing-keys
    ```

4. 키와 사이트 ({{< region-param key="dd_site" code="true" >}})를 작업자 환경 변수에 추가합니다:

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    EOF
    ```

5. 호스트에서 [샘플 설정 파일][1]을 `/etc/observability-pipelines-worker/pipeline.yaml`에 다운로드합니다.

6. 작업자 시작:

    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/datadog/pipeline.yaml
[2]: /ko/observability_pipelines/configurations/
{{% /tab %}}
{{% tab "RPM 기반 Linux" %}}

한 줄 설치 스크립트를 사용하거나 수동으로 작업자를 설치합니다.

#### 한 줄 설치 스크립트

1. 한 줄 설치 명령을 실행하여 작업자를 설치합니다. `<DD_API_KEY>`는 Datadog API 키로, `<PIPELINES_ID>`는 옵저버빌리티 파이프라인 ID로, `<SITE>`는 {{< region-param key="dd_site" code="true" >}}로 교체합니다.

    ```
    DD_API_KEY=<DD_API_KEY> DD_OP_PIPELINE_ID=<PIPELINES_ID> DD_SITE=<SITE> bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_op_worker1.sh)"
    ```

2. [샘플 설정 파일][1]을 호스트에서 `/etc/observability-pipelines-worker/pipeline.yaml`로 다운로드합니다. 샘플 설정에 사용되는 소스, 변환 및 싱크에 대한 자세한 내용은 [설정][2]를 참조하세요.

3. 다음 명령을 실행하여 작업자를 시작합니다:

    ```
    sudo systemctl restart observability-pipelines-worker
    ```

#### 수동 설치

1. 다음 명령을 실행하여 시스템에서 Datadog `rpm` 리포지토리를 설정합니다:

    ```
    cat <<EOF > /etc/yum.repos.d/datadog-observability-pipelines-worker.repo
    [observability-pipelines-worker]
    name = Observability Pipelines Worker
    baseurl = https://yum.datadoghq.com/stable/observability-pipelines-worker-1/\$basearch/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    EOF
    ```

   **참고:** RHEL 8.1 또는 CentOS 8.1을 실행 중인 경우 위의 설정에서 `repo_gpgcheck=1` 대신 `repo_gpgcheck=0`를 사용하세요.

2. 패키지를 업데이트하고 작업자를 설치합니다:

    ```
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```

3. 키와 사이트 ({{< region-param key="dd_site" code="true" >}}) 를 작업자 환경 변수에 추가합니다:

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    EOF
    ```

4. [샘플 설정 파일][1]을 호스트에서 `/etc/observability-pipelines-worker/pipeline.yaml`로 다운로드합니다. 샘플 설정에 사용되는 소스, 변환 및 싱크에 대한 자세한 내용은 [설정][2]를 참조하세요.

5. 다음 명령을 실행하여 작업자를 시작합니다:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/quickstart/pipeline.yaml
[2]: /ko/observability_pipelines/configurations/
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
이 샘플 설정을 사용하여 기존 Terraform에 작업자 모듈을 설정합니다. 해당 AWS 배포와 일치하도록 `vpc-id`, `subnet-ids` 및 `region`의 값을 업데이트합니다. 해당 파이프라인과 일치하도록 `datadog-api-key` 및 `pipeline-id`의 값을 업데이트합니다.

샘플 설정에 사용되는 소스, 변환 및 싱크에 대한 자세한 내용은 [설정][2]을 참조하세요.

```
module "opw" {
    source     = "https://github.com/DataDog/opw-terraform//aws"
    vpc-id     = "{VPC ID}"
    subnet-ids = ["{SUBNET ID 1}", "{SUBNET ID 2}"]
    region     = "{REGION}"

    datadog-api-key = "{DATADOG API KEY}"
    pipeline-id = "{OP PIPELINE ID}"
    pipeline-config = <<EOT
## 소스: 옵저버빌리티 파이프라인 작업자가 데이터를 수집하는 데이터 소스.
## Datadog 사용 사례의 경우, Datadog Agent로부터 데이터를 받게 됩니다.
sources:
  datadog_agent:
    address: 0.0.0.0:8282
    type: datadog_agent
    multiple_outputs: true

transforms:
  ## Datadog Agent는 기본적으로 태그를 쉼표로 구분된 값 목록으로 인코딩하며, 
  ## 이 값은 `.ddtags` 문자열에 저장됩니다. 이러한 태그로 작업하고 필터링하려면
  ## 해당 문자열을 보다 구조화된 데이터로 
  ## 파싱해야 합니다.
  logs_parse_ddtags:
    type: remap
    inputs:
      - datadog_agent.logs
    source: |
      .ddtags = parse_key_value!(.ddtags, key_value_delimiter: ":", field_delimiter: ",")

  ## Datadog Agent가 추가한 `.status` 속성을 삭제해야 합니다.
  ## 그렇지 않으면 수집 시 로그가 잘못 분류될 수 있습니다.
  logs_remove_wrong_level:
    type: remap
    inputs:
      - logs_parse_ddtags
    source: |
      del(.status)

  ## 이는 태그가 설정된 자체 리맵 (또는 다른 변환) 단계를 위한 플레이스홀더입니다.
  ## Datadog은 이러한 태그 할당을 권장합니다.
  ## 이 태그는 어떤 데이터가 OP로 이동되었고 
  ## 어떤 데이터가 아직 이동되어야 하는지를 보여줍니다.
  LOGS_YOUR_STEPS:
    type: remap
    inputs:
      - logs_remove_wrong_level
    source: |
      .ddtags.sender = "observability_pipelines_worker"
      .ddtags.opw_aggregator = get_hostname!()

  ## 로그 인테이크에 데이터를 보내기 전에
  ## Agent가 직접 보내는 것처럼 보이도록 
  ## 태그를 예상 형식으로 다시 인코딩해야 합니다.
  logs_finish_ddtags:
    type: remap
    inputs:
      - LOGS_YOUR_STEPS
    source: |
      .ddtags = encode_key_value(.ddtags, key_value_delimiter: ":", field_delimiter: ",")

  metrics_add_dd_tags:
    type: remap
    inputs:
      - datadog_agent.metrics
    source: |
      .tags.sender = "observability_pipelines_worker"
      .tags.opw_aggregator = get_hostname!()

## 이 버퍼 구성은 다음과 같이 분할되어 총 288GB입니다.
## Terraform 모듈에 의해 자동으로 프로비저닝됩니다.
## - 로그에 대해 240GB 버퍼
## - 메트릭에 대해 48GB 버퍼
##
## 이는 대부분의 OP 작업자 배포에 적용되며
## 조정할 필요가 거의 없습니다. 변경하려면 `ebs-drive-size-gb` 파라미터를
## 업데이트합니다.
sinks:
  datadog_logs:
    type: datadog_logs
    inputs:
      - logs_finish_ddtags
    default_api_key: "$${DD_API_KEY}"
    compression: gzip
    buffer:
       type: disk
       max_size: 257698037760
  datadog_metrics:
    type: datadog_metrics
    inputs:
      - metrics_add_dd_tags
    default_api_key: "$${DD_API_KEY}"
    buffer:
      type: disk
      max_size: 51539607552
EOT
}
```

[2]: /ko/observability_pipelines/configurations/
{{% /tab %}}
{{< /tabs >}}

데이터 변환에 대한 자세한 내용은 [데이터 작업][7]을 참조하세요.

## 배포 모드 업데이트

{{% op-updating-deployment-modes %}}

## 다음 단계

빠른 시작은 작업자 설치와 샘플 파이프라인 설정 배포를 안내합니다. 작업자를 설치하여 Datadog Agents에서 데이터를 수신하여 Datadog으로 라우팅하거나 Splunk HEC에서 데이터를 수신하여 Splunk 및 Datadog으로 라우팅하는 방법에 대한 지침을 보려면 특정 사용 사례를 선택하세요:

{{< partial name="observability_pipelines/use_cases.html" >}}

여러 작업자 배포 및 확장에 대한 권장 사항은 다음을 참조하세요.

- 옵저버빌리티 파이프라인 아키텍처를 설계할 때 고려해야 할 사항은 [배포 설계 및 원칙][8]을 참조하세요.
- [OP 작업자 애그리게이터 아키텍처 모범 사례][9]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/observability_pipelines/#what-is-observability-pipelines-and-the-observability-pipelines-worker
[2]: /ko/observability_pipelines/setup/datadog/
[3]: /ko/observability_pipelines/setup/datadog_with_archiving/
[4]: /ko/observability_pipelines/setup/splunk/
[5]: https://app.datadoghq.com/observability-pipelines
[6]: /ko/account_management/api-app-keys/#api-keys
[7]: /ko/observability_pipelines/working_with_data/
[8]: /ko/observability_pipelines/production_deployment_overview/
[9]: /ko/observability_pipelines/architecture/