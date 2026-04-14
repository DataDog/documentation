---
aliases:
- /ko/observability_pipelines/setup/datadog_with_archiving/
further_reading:
- link: /observability_pipelines/legacy/production_deployment_overview/
  tag: 설명서
  text: 옵저버빌리티 파이프라인 작업자의 프로덕션 배포 설계 및 원칙
- link: https://dtdg.co/d22op
  tag: 학습 센터
  text: 옵저버빌리티 파이프라인을 통한 안전한 로컬 처리
title: (레거시) Observability Pipeline을 설정하여 Datadog 재수화 가능 형식의 로그를 Amazon S3 및 Datadog로
  전송하기
---

{{% observability_pipelines/legacy_warning %}}

## 개요

The [Observability Pipelines Worker][1]는 로그를 수집하고 처리한 다음 모든 소스에서 모든 목적지로 로그를 라우팅할 수 있습니다. Datadog를 사용하면 대규모의 Observability Pipelines Worker 배포 모두를 빌드하고 관리할 수 있습니다.

이 가이드는 일반 툴 클러스터에 해당 Worker를 배포하고 이를 설정한 뒤 Datadog 재수화 가능 형식으로 로그를 전송하여 클라우드 스토리지에 아카이빙하는 방법을 상세하게 안내합니다.

## 배포 모드

{{% op-deployment-modes %}}

## 가정
* 이미 Datadog를 사용하고 있고 Observability Pipeline를 사용하려는 경우
* Observability Pipelines Worker를 배포할 클러스터에 액세스할 수 있고 워크로드가 집계될 클러스터에 대한 관리 권한을 보유하고 있습니다. 
* 다른 모든 클러스터가 연결된 환경에서 공통 툴 클러스터 또는 보안 클러스터를 보유하고 있습니다.

## 사전 필수 조건
설치하기 전에 다음을 보유하고 있는지 확인합니다.

* 유효한 [Datadog API 키][2]
* 파이프라인 ID

[Observability Pipeline][3]에서 이 모두를 생성할 수 있습니다.

### 제공자별 요구 사항
{{< tabs >}}
{{% tab "Docker" %}}
기기가 Docker를 실행하도록 설정되었는지 확인합니다.

{{% /tab %}}
{{% tab "AWS EKS" %}}

쿠버네티스(Kubernetes) 노드에서 Worker를 실행하려면 사용 가능한 하나의 CPU와 512MB RAM과 함께 최소 2개 노드가 필요합니다. Datadog는 Worker에 대해 별도의 노드 풀을 생성하는 것을 권장합니다. 이는 프로덕션 배포를 위한 권장 설정이기도 합니다.

* [EBS CSI 드라이버][1]가 필요합니다. 드라이버가 설치되어 있는지 확인하려면 다음 명령을 실행한 다음, 목록에서 `ebs-csi-controller`를 찾습니다.

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

프로덕션 수준 요구 사항의 경우 [OPW Aggregator Architecture 모범 사례]를 참조하세요.

[1]: https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html
[2]: /resources/yaml/observability_pipelines/helm/storageclass.yaml
[3]: https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html
[6]: /ko/observability_pipelines/legacy/architecture/

{{% /tab %}}
{{% tab "APT-based Linux" %}}

APT 기반 Linux의 경우 제공자별 요구 사항이 없습니다.

{{% /tab %}}
{{% tab "RPM-based Linux" %}}

APT 기반 Linux의 경우 제공자별 요구 사항이 없습니다.

{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

AWS 계정에서 Worker를 실행하려면 계정과 다음 정보에 대한관리 권한을 보유하고 있어야 합니다.

* 인스턴스가 실행될 VPC ID
* 인스턴스가 실행될 서브넷 ID
* VPC가 위치한 AWS 지역

{{% /tab %}}
{{< /tabs >}}

## 로그 아카이브 설정

나중에 [Observability Pipelines Worker](#install-the-observability-pipelines-worker)를 설치하려면 제공된 샘플 설정이 Datadog 재수화 가능 형식으로 Amazon S3에 로그를 전송하기 위한 싱크를 포함해야 합니다. 이 설정을 사용하려면 아카이브에 대한 S3 버킷을 생성하고 IAM 정책을 설정하여 Worker가 S3 버킷에 쓰도록 합니다. 그런 다음 S3 버킷을 Datadog 로그 아카이브에 연결합니다.

{{% site-region region="us,us3,us5" %}}
지역 내 데이터 수수료에 대한 [AWS 가격 정책][1] 및 클라우드 스토리지 비용에 미칠 수 있는 영향을 참조하세요.

[1]: https://aws.amazon.com/s3/pricing/
{{% /site-region %}}

### S3 버킷 생성 및 IAM 정책 설정

{{< tabs >}}
{{% tab "Docker" %}}

{{% op-datadog-archives-s3-setup %}}

3.  IAM 사용자를 생성하고 정책 위에 첨부합니다. IAM 사용자에 대한 액세스 자격 증명을 생성합니다. 이 자격 증명을 `AWS_ACCESS_KEY` 및 `AWS_SECRET_ACCESS_KEY`로 저장합니다.

{{% /tab %}}
{{% tab "AWS EKS" %}}

{{% op-datadog-archives-s3-setup %}}

3. [서비스 계정 생성][1]을 통해 위에서 생성한 정책을 사용하세요.

[1]: https://docs.aws.amazon.com/eks/latest/userguide/associate-service-account-role.html

{{% /tab %}}
{{% tab "APT-based Linux" %}}

{{% op-datadog-archives-s3-setup %}}

3. IAM 사용자를 생성하고 그 위에 정책을 첨부합니다. IAM 사용자에 대한 액세스 자격 증명을 생성합니다. 이 자격 증명을 `AWS_ACCESS_KEY` 및 `AWS_SECRET_ACCESS_KEY`로 저장합니다.

{{% /tab %}}
{{% tab "RPM-based Linux" %}}

{{% op-datadog-archives-s3-setup %}}

3. IAM 사용자를 생성하고 그 위에 정책을 첨부합니다. IAM 사용자에 대한 액세스 자격 증명을 생성합니다. 이러한 자격 증명을 `AWS_ACCESS_KEY_ID` 및 `AWS_SECRET_ACCESS_KEY`로 저장합니다.

{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

{{% op-datadog-archives-s3-setup %}}

3. Terraform으로 생성된 IAM 인스턴스 프로필에 정책을 첨부합니다. 이는 `iam-role-name` 출력 아래에서 찾을 수 있습니다.

{{% /tab %}}
{{< /tabs >}}

### S3 버킷을 Datadog 로그 아카이브에 연결하기

Datadog 로그 아카이브에 일전에 생성한 S3 버킷을 연결하여 나중에 아카이브를 재수화할 수 있습니다.

1. Datadog [로그 포워딩][5]으로 이동합니다.
1. **+ 새 아카이브**를 클릭합니다.
1. 구체적인 아카이브 이름을 입력합니다.
1. 로그 파이프라인을 거치는 모든 로그를 필터링하는 쿼리를 추가하여 해당 로그가 이 아카이브로 유입되지 않도록 합니다. 예를 들어 `observability_pipelines_read_only_archive` 쿼리를 추가하면 해당 태그가 추가된 파이프라인으로 로그가 유입되지 않습니다.
1. **AWS S3**을 선택합니다.
1. 버킷이 있는 AWS 계정을 선택합니다.
1. S3 버킷 이름을 입력합니다.
1. 선택적으로 경로를 입력합니다.
1. 확인하는 문장에 체크 표시합니다.
1. 선택적으로 태그를 추가하고 재수화를 위한 최대 검사 크기를 정의합니다. 자세한 정보는 [고급 설정][6]을 참조하세요.
1. **저장**을 클릭합니다.

추가 정보는 [로그 아카이브 설명서][7]를 참조하세요.

### Observability Pipelines Worker 설치하기

{{< tabs >}}
{{% tab "Docker" %}}

Observability Pipelines Worker 도커 이미지는 도커(Docker) 허브 [여기][1]에 게시되어 있습니다.

1. [샘플 파이프라인 설정 파일][2]을 다운로드합니다.

2. 다음 명령을 실행하여 도커(Docker)를 통해 Observability Pipelines Worker를 시작합니다.

    ```shell
    docker run -i -e DD_API_KEY=<API_KEY> \
      -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
      -e DD_SITE=<SITE> \
      -e AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID> \
      -e AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY> \
      -e DD_ARCHIVES_BUCKET=<AWS_BUCKET_NAME> \
      -e DD_ARCHIVES_SERVICE_ACCOUNT=<BUCKET_AWS_REGION> \
      -p 8282:8282 \
      -v ./pipeline.yaml:/etc/observability-pipelines-worker/pipeline.yaml:ro \
      datadog/observability-pipelines-worker run
    ```

   이 자리표시자를 다음 정보로 대체합니다.
    - `<API_KEY>`를 Datadog API 키로 대체합니다.
    - `<PIPELINES_ID>`를 Observability Pipeline 설정 ID로 대체합니다.
    - `<SITE>`를 {{< region-param key="dd_site" code="true" >}}로 대체합니다.
    - `AWS_ACCESS_KEY_ID` 및 `AWS_SECRET_ACCESS_KEY`를 이전에 생성한 AWS 자격증명으로 대체합니다.
    - `<AWS_BUCKET_NAME>`을 로그를 저장하는 S3 버킷 이름으로 저장합니다.
    - `<BUCKET_AWS_REGION>`을 대상 서비스의 [AWS 지역][3]으로 대체합니다.
    - `./pipeline.yaml`은 1단계에서 다운로드한 설정으로의 상대적 또는 절대적 경로여야 합니다.

[1]: https://hub.docker.com/r/datadog/observability-pipelines-worker
[2]: /resources/yaml/observability_pipelines/archives/pipeline.yaml
[3]: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints
{{% /tab %}}
{{% tab "AWS EKS" %}}
1. AWS EKS를 위해 [Helm 차트 값 파일][1]을 다운로드합니다.

2. Helm 차트에서 이러한 자리표시자를 다음 정보로 대체합니다.
    - `datadog.apiKey`를 Datadog API 키로 대체합니다.
    - `datadog.pipelineId`를 Observability Pipeline 설정 ID로 대체합니다.
    - `site`를 {{< region-param key="dd_site" code="true" >}}로 대체합니다.
    - `serviceAccount.name`의 `${DD_ARCHIVES_SERVICE_ACCOUNT}`를 서비스 계정 이름으로 대체합니다.
    - `pipelineConfig.sinks.datadog_archives`의 `${DD_ARCHIVES_BUCKET}`를 로그를 저장하는 S3 버킷 이름으로 대체합니다.
    - `pipelineConfig.sinks.datadog_archives`의 `${DD_ARCHIVES_SERVICE_ACCOUNT}`를 대상 서비스의 [AWS 지역][2]으로 대체합니다.

3. 다음 명령을 통해 클러스터에 설치합니다.

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

[1]: /resources/yaml/observability_pipelines/archives/aws_eks.yaml
[2]: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints
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

4. 키와 사이트({{< region-param key="dd_site" code="true" >}}를 Worker의 환경 변수를 추가합니다. `<AWS_BUCKET_NAME>`를 로그를 저장하는 S3 버킷의 이름으로 대체하고 `<BUCKET_AWS_REGION>`를 대상 서비스의 [AWS 지역][2]으로 대체합니다.

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
    AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
    DD_ARCHIVES_BUCKET=<AWS_BUCKET_NAME>
    DD_ARCHIVES_SERVICE_ACCOUNT=<BUCKET_AWS_REGION>
    EOF
    ```

5. [샘플 설정 파일][1]을 호스트의 `/etc/observability-pipelines-worker/pipeline.yaml`에 다운로드합니다.

6. Worker를 시작합니다.
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/archives/pipeline.yaml
[2]: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints
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

3. 키와 사이트({{< region-param key="dd_site" code="true" >}}를 Worker의 환경 변수를 추가합니다. `<AWS_BUCKET_NAME>`를 로그를 저장하는 S3 버킷의 이름으로 대체하고 `<BUCKET_AWS_REGION>`를 대상 서비스의 [AWS 지역][2]으로 대체합니다.

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>
    AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>
    DD_ARCHIVES_BUCKET=<AWS_BUCKET_NAME>
    DD_ARCHIVES_SERVICE_ACCOUNT=<BUCKET_AWS_REGION>
    EOF
    ```

4. [샘플 설정 파일][1]을 호스트의 `/etc/observability-pipelines-worker/pipeline.yaml`에 다운로드합니다.

5. Worker를 시작합니다.
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[1]: /resources/yaml/observability_pipelines/archives/pipeline.yaml
[2]: https://docs.aws.amazon.com/general/latest/gr/rande.html#regional-endpoints
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

1. [샘플 설정][1]을 다운로드합니다.
1. 샘플 설정을 사용해 기존 Terraform에서 Worker 모듈을 설정합니다. `vpc-id`, `subnet-ids` 및 `region` 값을 업데이트하여 설정에서 AWS 배포를 매칭합니다. 또한, `datadog-api-key` 및 `pipeline-id`의 값을 업데이트하여 파이프라인을 매칭합니다.

[1]: /resources/yaml/observability_pipelines/archives/terraform_opw_archives.tf
{{% /tab %}}
{{< /tabs >}}

### 로드 밸런싱

{{< tabs >}}
{{% tab "Docker" %}}
도커(Docker) 설명서에 포함된 프로덕션 설정을 포함하지 않습니다. 대신, 컨테이너화된 환경에서 로드밸런싱에 대한 기업 표준을 참조하세요. 로컬 기기에서 테스팅하는 경우 로드밸런서를 설정하는 것은 필요하지 않습니다.
{{% /tab %}}
{{% tab "AWS EKS" %}}
클라우드 제공자에서 제공한 로드 밸런서를 사용합니다.
로드 밸런서를 기본 Helm 설정이 설정된 자동 스케일링을 기본으로 조정합니다. 로드 밸런서는 내부 방향입니다.
그러므로 네트워크 내부에서만 액세스할 수 있습니다.

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

{{% tab "APT-based Linux" %}} 
설치의 단일 머신 속성을 고려하여 로드 밸런싱에 대한 빌트인 지원이 존재하지 않습니다. 회사 기준을 사용하여 자체적인 로드 밸런서를 프로비저닝합니다.
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
설치의 단일 머신 속성을 고려하여 로드 밸런싱에 대한 빌트인 지원이 존재하지 않습니다. 회사 기준을 바탕으로 자체적인 로드 밸런서를 프로비저닝해야 합니다.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
Terraform 모듈은 인스턴스의 포인트에 NLB를 프로비저닝합니다. Terraform의 `lb-dns` 출력에서 DNS가 반환됩니다.
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
{{% tab "APT-based Linux" %}}
기본적으로 Observability Pipelines Worker의 데이터 디렉터리는 `/var/lib/observability-pipelines-worker`로 설정되어 있습니다. 설정 샘플을 사용하는 경우 버퍼링에 사용할 수 있는 공간이 최소 288GB 이상 확보되어 있는지 확인해야 합니다.

가능한 경우 해당 위치에 별도의 SSD를 장착하는 것을 권장합니다.
{{% /tab %}}
{{% tab "RPM-based Linux" %}}
기본적으로 Observability Pipelines Worker의 데이터 디렉터리는 `/var/lib/observability-pipelines-worker`로 설정되어 있습니다. 설정 샘플을 사용하는 경우 버퍼링에 사용할 수 있는 공간이 최소 288GB 이상 확보되어 있는지 확인해야 합니다.

가능한 경우 해당 위치에에 별도의 SSD를 장착하는 것이 권장합니다.
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}
기본적으로 각 인스턴스에는 288GB EBS 드라이브가 할당되며, 위의 샘플 설정은 버퍼링에 이를 사용하도록 설정되어 있습니다.
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

Terraform 설치의 경우 `lb-dns` 출력은 필요한 값을 제공합니다.

이 시점에서 관측 가능성 데이터는 Worker로 이동한 다음 S3 아카이브로 전송되어야 합니다.

## 배포 모드 업데이트하기

{{% op-updating-deployment-modes %}}

## 아카이브 재수화하기

Datadog에서 아카이브를 재수화하여 해당 로그를 분석 및 조사를 시작하는 방법에 대한 지침은 [아카이브에서 재수화하기][4]를 참조하세요 

## 참고 자료
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/observability_pipelines/legacy/
[2]: /ko/account_management/api-app-keys/#api-keys
[3]: https://app.datadoghq.com/observability-pipelines/create
[4]: /ko/logs/log_configuration/rehydrating/
[5]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[6]: /ko/logs/log_configuration/archives/#advanced-settings
[7]: /ko/logs/log_configuration/archives