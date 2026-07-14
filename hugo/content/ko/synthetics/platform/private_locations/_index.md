---
aliases:
- /ko/synthetics/private_locations
description: 프라이빗 위치에서 Synthetic API 및 브라우저 테스트 실행하기
further_reading:
- link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog/
  tag: 블로그
  text: Datadog을 사용하여 Synthetic 프라이빗 위치 모니터링하기
- link: /getting_started/synthetics/private_location
  tag: 설명서
  text: 프라이빗 위치로 시작하기
- link: /synthetics/private_locations/monitoring
  tag: 설명서
  text: 프라이빗 위치 모니터링하기
- link: /synthetics/private_locations/dimensioning
  tag: 설명서
  text: 프라이빗 위치 규모 측정
- link: https://www.datadoghq.com/architecture/protect-sensitive-data-with-synthetics-private-location-runners/
  tag: 아키텍처 센터
  text: Synthetics Private Location Runners로 민감한 데이터 보호하기
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_private_location
  tag: 외부 사이트
  text: Terraform을 사용하여 Synthetic 프라이빗 위치 생성 및 관리하기
title: 프라이빗 위치에서 Synthetic 테스트 실행하기
---
## 개요 {#overview}

프라이빗 위치를 사용하면 **내부용 애플리케이션 모니터링이나 공용 인터넷에서 액세스할 수 없는 프라이빗 엔드포인트** 모니터링을 할 수 있습니다. 또한 다음과 같은 용도에 사용할 수도 있습니다.

비즈니스 운영에 필수적인 영역에서 * **맞춤형 Synthetic 위치**를 생성합니다.
새로운 기능을 프로덕션에 배포하기 전에 [Continuous Testing 및 CI/CD][28]를 사용하여 * **내부 CI 환경에서 애플리케이션 성능을 검증**합니다.
내부 네트워크의 내외부에서 * **애플리케이션 성능을 비교**합니다.
내부 Windows 기반 사이트 및 API에 대해 * **[Kerberos SSO를 사용하여 Synthetic Monitoring 테스트를 인증][33]**합니다.

{{< img src="synthetics/private_locations/private_locations_worker_1.png" alt="Synthetic Monitoring에서 프라이빗 위치가 작동하는 방식을 나타내는 아키텍처 다이어그램" style="width:100%;">}}

프라이빗 위치는 프라이빗 네트워크 내에 설치할 수 있는 Docker 컨테이너 또는 Windows 서비스로 제공됩니다. 프라이빗 위치를 생성하고 설치한 후에는 관리되는 위치와 마찬가지로 [Synthetic 테스트][29]를 할당할 수 있습니다.

프라이빗 위치 워커는 HTTPS를 사용하여 Datadog의 서버에서 테스트 구성을 가져오고, 일정에 따라 또는 필요에 따라 테스트를 실행하며, 테스트 결과를 Datadog의 서버에 반환합니다. 그런 다음 관리되는 위치에서 실행되는 테스트를 시각화하는 것과 완전히 동일한 방식으로 프라이빗 위치의 테스트 결과를 시각화할 수 있습니다.

{{< img src="synthetics/private_locations/test_results_pl.png" alt="프라이빗 위치에 Synthetic 테스트를 할당합니다." style="width:100%;">}}

## 전제 조건 {#prerequisites}

[Continuous Testing 테스트][23]를 위해 프라이빗 위치를 사용하려면 버전이 v1.27.0 이상이어야 합니다.

{{< tabs >}}
{{% tab "Docker" %}}

프라이빗 위치는 프라이빗 네트워크 내 어디에나 설치할 수 있는 Docker 컨테이너입니다. Docker Hub에서 [프라이빗 위치 워커 이미지][101]에 액세스할 수 있습니다. 호스트에서 [Docker Engine][102]을 사용할 수 있으며 Linux 컨테이너 모드에서 실행할 수 있는 경우, Linux 기반 OS 또는 Windows OS에서 실행할 수 있습니다.**\***

{{< site-region region="gov,gov2" >}}

FIPS 지원이 필요한 경우, Docker Hub에서 [FIPS 준수 이미지][26]를 사용하세요.

[26]: https://hub.docker.com/r/datadog/synthetics-private-location-worker-fips

{{< /site-region >}}

**\*** **본 소프트웨어의 사용 및 운영은 [여기][103]에서 확인할 수 있는 최종 사용자 라이선스 계약의 적용을 받습니다.**

[101]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[102]: https://docs.docker.com/engine/install/
[103]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{% tab "Helm" %}}

프라이빗 위치는 Helm을 사용하여 Kubernetes 클러스터에 설치할 수 있는 Kubernetes 배포판입니다. [Helm 차트][101]는 Linux 기반 Kubernetes에서 실행될 수 있습니다.

**참고**: 본 소프트웨어의 사용 및 운영은 [최종 사용자 라이선스 계약][103]의 적용을 받습니다.

[101]: https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location
[103]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{% tab "Windows" %}}

프라이빗 위치는 [MSI 파일][101]을 사용하여 프라이빗 네트워크 내 어디에나 설치할 수 있는 Windows 서비스입니다. 프라이빗 위치를 설치할 가상 또는 물리적 머신에서 이 파일을 실행하세요.**\***

**\*** **본 소프트웨어의 사용 및 운영은 [여기][102]에서 확인할 수 있는 최종 사용자 라이선스 계약의 적용을 받습니다.**

이 머신의 요구 사항은 아래 표에 나열되어 있습니다. 프라이빗 위치 워커를 설치하는 머신에서 PowerShell 스크립팅을 활성화해야 합니다.

| 시스템 | 요구 사항 |
|---|---|
| OS | Windows Server 2022, Windows Server 2019, Windows Server 2016, 또는 Windows 10. |
| RAM | 최소 4GB. 8GB 권장. |
| CPU | 64비트를 지원하는 Intel 또는 AMD 프로세서. 2.8GHz 이상의 프로세서 권장. |

**참고**: Windows 프라이빗 위치에서 브라우저 테스트를 실행하려면 브라우저(예: Chrome, Edge 또는 Firefox)가 Windows 컴퓨터에 설치되어 있어야 합니다.

MSI 설치 프로그램을 사용하기 전에 컴퓨터에 .NET 버전 4.7.2 이상을 설치해야 합니다.

**FIPS 140-2 암호화 모드 활성화**: </br>
안전한 통신을 위해 FIPS 준수 암호화 모듈을 활성화하세요. 이 옵션을 사용하려면 Windows 호스트가 Windows FIPS 모드에서 실행되어야 합니다. 프라이빗 위치 `v1.63.0` 이상에서 지원됩니다.

{{< img src="synthetics/private_locations/synthetics_pl_windows_fips.png" alt="Synthetics Private Location Worker 마법사, MSI 설치 프로그램. FIPS 140-2 암호화 모드 설정이 표시되어 있습니다." style="width:80%;" >}}

[101]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi
[102]: https://www.datadoghq.com/legal/eula/

{{% /tab %}}
{{< /tabs >}}

### Datadog 프라이빗 위치 엔드포인트 {#datadog-private-locations-endpoints}

테스트 구성을 가져오고 테스트 결과를 푸시하려면, 프라이빗 위치 워커가 다음 Datadog API 엔드포인트에 액세스할 수 있어야 합니다.

| 포트 | 엔드포인트                               | 설명                                                   |
| ---- | -------------------------------------- | ------------------------------------------------------------- |
| 443  | {{< region-param key=synthetics_intake_endpoint code="true" >}} | 프라이빗 위치에서 테스트 구성을 가져오고 [AWS Signature Version 4 protocol][1]을 기반으로 한 내부 프로토콜을 사용하여 Datadog에 테스트 결과를 푸시하는 데 사용됩니다.{{< site-region region="gov,gov2" >}} 버전 `1.32.0` 이상에서는 **컨테이너화된 Linux 프라이빗 위치**에서의 요청이 FIPS(연방 정보 처리 표준)를 준수합니다. **Windows 프라이빗 위치**의 경우, FIPS 준수 암호화는 버전 `1.63.0` 이상에서 지원됩니다.{{< /site-region >}} |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< site-region region="eu" >}}

**참고**: 이 도메인은 정적 IP 주소 집합을 가리킵니다. 이 주소는 https://ip-ranges.datadoghq.eu에서 확인할 수 있습니다.

{{< /site-region >}}

## 프라이빗 위치 설정 {#set-up-your-private-location}

**Synthetics 프라이빗 위치 쓰기** 역할이 있는 사용자만 프라이빗 위치를 생성할 수 있습니다. 자세한 정보는 [권한](#permissions)을 참조하세요.

### 프라이빗 위치 만들기 {#create-your-private-location}

[**Synthetic Monitoring** > **Settings** > **Private Locations**][22]로 이동하여 **Add Private Location**을 클릭하세요.

{{< img src="synthetics/private_locations/synthetics_pl_add_1.png" alt="프라이빗 위치 생성하기" style="width:90%;">}}

프라이빗 위치 세부 정보를 입력합니다.

1. 프라이빗 위치의 **이름**과 **설명**을 지정하세요.
2. 프라이빗 위치와 연결하려는 **태그**를 추가하세요.
3. 기존의 **API 키** 중 하나를 선택하세요. API 키를 선택하면 프라이빗 위치와 Datadog 간의 통신이 가능해집니다. 기존 API 키가 없는 경우, **Generate API key**를 클릭하여 전용 페이지에서 생성하세요. `Name` 및 `API key` 필드만 필수입니다.
4. 프라이빗 위치에 대한 액세스를 설정하고 **Save Location and Generate Configuration File**을 클릭합니다. Datadog이 프라이빗 위치를 생성하고 관련 구성 파일을 생성합니다.

{{< img src="synthetics/private_locations/pl_creation_1.png" alt="프라이빗 위치에 세부 정보 추가하기" style="width:85%;">}}

### 프라이빗 위치 구성{#configure-your-private-location}

생성된 구성 파일을 사용자 지정하여 프라이빗 위치를 구성하세요. **3단계**에서 [프록시](#proxy-configuration) 및 [차단된 예약 IP](#blocking-reserved-ips)와 같은 초기 구성 파라미터를 추가하면, 생성된 구성 파일이 **4단계**에서 자동으로 업데이트됩니다.

고급 옵션을 통해 내부 네트워크 설정에 맞게 구성을 조정할 수 있습니다. `help` 명령에 대한 자세한 내용은 [구성][5]을 참조하세요.

#### 프록시 구성 {#proxy-configuration}

프라이빗 위치와 Datadog 간의 트래픽이 프록시를 통과해야 하는 경우, 관련 `proxyDatadog` 파라미터를 생성된 구성 파일에 추가하려면 프록시 URL을 `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`로 지정하세요.

{{<img src="synthetics/private_locations/pl_proxy_1.png" alt="프라이빗 로케이션 구성 파일에 프록시 추가하기" style="width:90%;">}}

#### 예약 IP 차단 {#blocking-reserved-ips}

기본적으로, Synthetics 사용자는 모든 IP를 사용하여 엔드포인트에서 Synthetic 테스트를 생성할 수 있습니다. 네트워크 내의 민감한 내부 IP에서 사용자가 테스트를 생성하지 못하도록 하려면, **Block reserved IPs** 토글을 클릭하여 기본 예약 IP 범위([IPv4 주소 레지스트리][6] 및 [IPv6 주소 레지스트리][7])를 차단하고 관련 `enableDefaultBlockedIpRanges` 파라미터를 생성된 구성 파일에서 `true`로 설정하세요.

테스트하려는 엔드포인트 중 일부가 차단된 예약 IP 범위 내에 위치하는 경우, 해당 IP 및/또는 CIDR을 허용 목록에 추가하여 관련 `allowedIPRanges` 파라미터를 생성된 구성 파일에 추가할 수 있습니다.

{{< img src="synthetics/private_locations/pl_reserved_ips_1.png" alt="예약 IP 구성" style="width:90%;">}}

### 구성 파일 보기 {#view-your-configuration-file}

프라이빗 위치 구성 파일에 적절한 옵션을 추가하면 이 파일을 복사하여 작업 디렉토리에 붙여 넣을 수 있습니다. 구성 파일에는 프라이빗 위치 인증, 테스트 구성 복호화 및 테스트 결과 암호화에 사용되는 시크릿이 포함되어 있습니다.

{{< img src="synthetics/private_locations/pl_view_file_1.png" alt="예약 IP 구성" style="width:90%;">}}

Datadog은 시크릿을 저장하지 않으므로 **설치 지침 보기**를 클릭하기 전에 로컬에 저장하시기 바랍니다.

**참고:** 더 많은 워커를 추가하거나 다른 호스트에 워커를 설치하기로 결정한 경우, 이러한 시크릿을 다시 참조할 수 있어야 합니다.

### 프라이빗 위치 설치 {#install-your-private-location}

작업 정의에서 `DATADOG_API_KEY`, `DATADOG_ACCESS_KEY`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_PUBLIC_KEY_PEM` 및 `DATADOG_PRIVATE_KEY` 환경 변수를 사용할 수 있습니다.

다음에서 프라이빗 위치를 시작하세요.

{{< tabs >}}
{{% tab "Docker" %}}

이 명령을 실행하여 구성 파일을 컨테이너에 마운트하여 프라이빗 위치 워커를 부팅합니다. `<MY_WORKER_CONFIG_FILE_NAME>.json` 파일이 루트 홈 폴더가 아닌 `/etc/docker`에 있는지 확인하세요.

```shell
docker run -d --restart unless-stopped -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest
```

**참고:** 예약 IP를 차단한 경우, `NET_ADMIN` [Linux 기능][26]을 프라이빗 위치 컨테이너에 추가하세요.

이 명령을 통해 Docker 컨테이너를 시작하고 프라이빗 위치에서 테스트를 실행할 준비를 완료할 수 있습니다. **Datadog은 분리 모드에서 컨테이너를 실행하고, 자동 재시작 정책을 설정할 것을 권장합니다.**

[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "Docker Compose" %}}

1. 다음을 사용하여 `docker-compose.yml` 파일을 생성합니다.

    ```yaml
    version: "3"
    services:
        synthetics-private-location-worker:
            image: datadog/synthetics-private-location-worker:latest
            volumes:
                - PATH_TO_PRIVATE_LOCATION_CONFIG_FILE:/etc/datadog/synthetics-check-runner.json
    ```
    **Note:** If you have blocked reserved IPs, add the `NET_ADMIN` [Linux capabilities][26] to your private location container.

2. 다음을 사용하여 컨테이너를 시작합니다.

    ```shell
    docker-compose -f docker-compose.yml up
    ```
[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "Podman" %}}
Podman 구성은 Docker와 매우 유사하지만, ICMP 테스트를 지원하기 위해 `NET_RAW`를 추가 기능으로 설정해야 합니다.

1.  컨테이너가 실행되는 호스트에서 `sysctl -w "net.ipv4.ping_group_range = 0 2147483647"`을 실행합니다.
2. 이 명령을 실행하여 구성 파일을 컨테이너에 마운트하여 프라이빗 위치 워커를 부팅합니다. `<MY_WORKER_CONFIG_FILE_NAME>.json` 파일이 컨테이너에 마운트될 수 있도록 액세스 가능한지 확인합니다.

   ```shell
   podman run --cap-add=NET_RAW --rm -it -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json gcr.io/datadoghq/synthetics-private-location-worker:latest
   ```

   차단된 예약 IP 주소를 구성한 경우, `NET_ADMIN` Linux 기능을 프라이빗 위치 컨테이너에 추가하세요.

이 명령을 통해 Podman 컨테이너를 시작하고 프라이빗 위치에서 테스트를 실행할 준비를 완료할 수 있습니다. Datadog은 분리 모드에서 컨테이너를 실행하고, 자동 재시작 정책을 설정할 것을 권장합니다.
{{< /tab >}}

{{% tab "Kubernetes 배포" %}}

프라이빗 위치 워커를 안전하게 배포하려면 Kubernetes Secret 리소스를 설정하고 컨테이너 내부의 `/etc/datadog/synthetics-check-runner.json`에 마운트하세요.

1. 다음 명령을 실행하여 이전에 생성한 JSON 파일로 Kubernetes Secret을 생성하세요.

    ```shell
    kubectl create secret generic private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. 배포를 사용하여 프라이빗 위치와 관련된 원하는 상태를 정의합니다. 다음과 같은 `private-location-worker-deployment.yaml` 파일을 생성합니다.

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: datadog-private-location-worker
      namespace: default
    spec:
      selector:
        matchLabels:
          app: private-location
      template:
        metadata:
          name: datadog-private-location-worker
          labels:
            app: private-location
        spec:
          containers:
          - name: datadog-private-location-worker
            image: datadog/synthetics-private-location-worker
            volumeMounts:
            - mountPath: /etc/datadog/synthetics-check-runner.json
              name: worker-config
              subPath: <MY_WORKER_CONFIG_FILE_NAME>
          volumes:
          - name: worker-config
            secret:
              secretName: private-location-worker-config
    ```

    **Note:** If you have blocked reserved IPs, add the `NET_ADMIN` [Linux capabilities][26] to your private location container.

3. 구성을 적용합니다.

    ```shell
    kubectl apply -f private-location-worker-deployment.yaml
    ```

OpenShift의 경우 `anyuid` SCC로 프라이빗 위치를 실행하세요. 이는 브라우저 테스트를 실행하는 데 필요합니다.

[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "Helm 차트" %}}

구성 파라미터에서 이미 구성한 시크릿을 가리키는 환경 변수를 설정할 수 있습니다. 시크릿을 사용해 환경 변수를 생성하려면 [Kubernetes 문서][3]를 참조하세요.

다른 방법:

1. [Datadog Synthetics 프라이빗 위치][2]를 Helm 리포지토리에 추가합니다.

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```

2. 이전에 생성한 JSON 파일을 사용하여 릴리스 이름(`<RELEASE_NAME>`)으로 차트를 설치합니다.

    ```shell
    helm install <RELEASE_NAME> datadog/synthetics-private-location --set-file configFile=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

**참고:** 예약 IP를 차단한 경우, `NET_ADMIN` [Linux 기능][26]을 프라이빗 위치 컨테이너에 추가하세요.

[2]: https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location
[3]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#define-container-environment-variables-using-secret-data
[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "ECS" %}}

다음과 일치하는 새로운 EC2 작업 정의를 생성합니다. 각 파라미터를 이전에 생성한 프라이빗 위치 구성 파일에서 찾은 해당 값으로 교체하세요.

```yaml
{
    ...
    "containerDefinitions": [
        {
            "command": [
                "--site='...'",
                "--locationID='...'",
                "--accessKey='...'",
                "--datadogApiKey='...'",
                "--secretAccessKey='...'",
                "--privateKey='-----BEGIN RSA PRIVATE KEY-----XXXXXXXX-----END RSA PRIVATE KEY-----'",
                "--publicKey.pem='-----BEGIN PUBLIC KEY-----XXXXXXXX-----END PUBLIC KEY-----'",
                "--publicKey.fingerprint='...'"
            ],
            ...
            "image": "datadog/synthetics-private-location-worker:latest",
            ...
        }
    ],
    ...
    "compatibilities": [
        "EC2"
    ],
    ...
}
```
**참고:**

- 예약 IP를 차단한 경우, 프라이빗 위치 컨테이너에 `NET_ADMIN` 기능을 부여할 수 있도록 [linuxParameters][31]를 구성하세요.
-  `DATADOG_API_KEY`, `DATADOG_ACCESS_KEY`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_PUBLIC_KEY_PEM` 및 `DATADOG_PRIVATE_KEY` 환경 변수를 사용하는 경우, `"command": [ ]` 섹션에 포함할 필요가 없습니다.

[31]: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_LinuxParameters.html

{{< /tab >}}

{{% tab "Fargate" %}}

다음과 일치하는 새로운 Fargate 작업 정의를 생성합니다. 각 파라미터를 이전에 생성한 프라이빗 위치 구성 파일에서 찾은 해당 값으로 교체하세요.

```yaml
{
    ...
    "containerDefinitions": [
        {
            "command": [
                "--site='...'",
                "--locationID='...'",
                "--accessKey='...'",
                "--datadogApiKey='...'",
                "--secretAccessKey='...'",
                "--privateKey='-----BEGIN RSA PRIVATE KEY-----XXXXXXXX-----END RSA PRIVATE KEY-----'",
                "--publicKey.pem='-----BEGIN PUBLIC KEY-----XXXXXXXX-----END PUBLIC KEY-----'",
                "--publicKey.fingerprint='...'"
            ],
            ...
            "image": "datadog/synthetics-private-location-worker:latest",
            ...
        }
    ],
    ...
    "compatibilities": [
        "EC2",
        "FARGATE"
    ],
    ...
}
```

**참고:** 프라이빗 위치 방화벽 옵션은 AWS Fargate에서 지원되지 않으므로 `enableDefaultBlockedIpRanges` 파라미터를 `true`로 설정할 수 없습니다.

{{< /tab >}}

{{% tab "AWS Secret Manager를 사용하는 Fargate" %}}

AWS Secret Manager에서 이전에 생성된 프라이빗 위치 구성의 일부 또는 전체를 저장할 시크릿을 생성합니다. 구성 파일에서는 `publicKey`를 그대로 유지할 수 없다는 점에 유의하세요. 예:

```json
{
    "datadogApiKey": "...",
    "id": "...",
    "site": "...",
    "accessKey": "...",
    "secretAccessKey": "...",
    "privateKey": "...",
    "pem": "...",
    "fingerprint": "..."
}
```

작업 정의와 AWS Fargate 인스턴스가 Secret Manager에서 저장된 시크릿을 읽을 수 있도록 필요한 권한을 허용해야 합니다. 자세한 내용은 [Amazon ECS에서 Secrets Manager 시크릿을 사용하여 민감한 데이터 지정하기][25]를 참조하세요.

이전 단계에서 생성한 시크릿의 ARN으로 시크릿 목록의 값을 교체하여 다음 예와 일치하는 Fargate 작업 정의를 생성합니다. 예: `arn:aws:secretsmanager:<region>:<account-id>:secret:<secret_arn>:<secret_key>::`.

Secret Manager에 모든 구성을 저장해 두지 않았다면, 계속해서 하드코딩된 문자열 인수로 값을 전달할 수 있습니다.

```yaml
{
    ...
    "containerDefinitions": [
        {
            "entryPoint": [
                "/bin/bash",
                "-c"
            ],
            "command": [
                "/home/dog/scripts/entrypoint.sh --locationID=$locationID --publicKey.fingerprint=$fingerprint"
            ],
            "secrets": [
              {
                "name": "DATADOG_ACCESS_KEY",
                "valueFrom": "..."
              },
              {
                "name": "DATADOG_API_KEY",
                "valueFrom": "...",
              },
              {
                "name": "fingerprint",
                "valueFrom": "...",
              },
              {
                "name": "locationID",
                "valueFrom": "...",
              },
              {
                "name": "DATADOG_PUBLIC_KEY_PEM",
                "valueFrom": "...",
              },
              {
                "name": "DATADOG_PRIVATE_KEY",
                "valueFrom": "...",
              },
              {
                "name": "DATADOG_SECRET_ACCESS_KEY",
                "valueFrom": "...",
              },
              {
                "name": "DATADOG_SITE",
                "valueFrom": "...",
              }
            ],
            ...
            "image": "datadog/synthetics-private-location-worker:latest",
            ...
        }
    ],
    ...
    "compatibilities": [
        "EC2",
        "FARGATE"
    ],
    ...
}
```

**참고:** 프라이빗 위치 방화벽 옵션은 AWS Fargate에서 지원되지 않으므로 `enableDefaultBlockedIpRanges` 파라미터를 `true`로 설정할 수 없습니다.

[25]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html

{{< /tab >}}

{{% tab "EKS" %}}

Datadog은 이미 Kubernetes 및 AWS와 통합되어 있으므로 EKS 모니터링에 바로 사용할 수 있습니다.

1. 다음 명령을 실행하여 이전에 생성한 JSON 파일로 Kubernetes Secret을 생성하세요.

    ```shell
    kubectl create secret generic private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. 배포를 사용하여 프라이빗 위치와 관련된 원하는 상태를 정의합니다. 다음과 같은 `private-location-worker-deployment.yaml` 파일을 생성합니다.

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: datadog-private-location-worker
      namespace: default
    spec:
      selector:
        matchLabels:
          app: private-location
      template:
        metadata:
          name: datadog-private-location-worker
          labels:
            app: private-location
        spec:
          containers:
          - name: datadog-private-location-worker
            image: datadog/synthetics-private-location-worker
            volumeMounts:
            - mountPath: /etc/datadog/synthetics-check-runner.json
              name: worker-config
              subPath: <MY_WORKER_CONFIG_FILE_NAME>
          volumes:
          - name: worker-config
            configMap:
              name: private-location-worker-config
    ```

    **Note:** If you have blocked reserved IPs, configure a security context to grant `NET_ADMIN` [Linux capabilities][26] to your private location containers.

3. 구성을 적용합니다.

    ```shell
    kubectl apply -f private-location-worker-deployment.yaml
    ```

[26]: https://docs.docker.com/engine/containers/run/#runtime-privilege-and-linux-capabilities

{{< /tab >}}

{{% tab "Windows(GUI 사용)" %}}

1. [`datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi` 파일][101]을 다운로드한 후 프라이빗 위치를 설치할 머신에서 이 파일을 실행합니다.
1. 시작 페이지에서 **Next**를 클릭하고 EULA를 읽은 후 이용약관에 동의하세요. **Next**를 클릭하세요.
1. 애플리케이션을 설치할 위치를 수정하거나 기본 설정을 유지합니다. **Next**를 클릭하세요.
1. Windows 프라이빗 위치를 설정하려면 다음 중 하나를 수행하세요.
   - Datadog Synthetics Private Location Worker에 대한 JSON 구성을 붙여 넣습니다. 이 파일은 [프라이빗 위치를 생성할 때][102] Datadog에 의해 생성됩니다.
   - Datadog Synthetics Private Location Worker에 대한 JSON 설정이 포함된 파일의 파일 경로를 찾아보거나 입력하세요.
   - 빈칸으로 둔 상태에서 설치가 완료된 후 Windows 명령 프롬프트에서 `C:\\Program Files\Datadog-Synthetics\Synthetics\synthetics-pl-worker.exe --config=<PathToYourConfiguration>`을 실행할 수 있습니다.

   {{< img src="synthetics/private_locations/configuration_selector_paste.png" alt="Synthetics Private Location Worker 마법사, MSI 설치 프로그램. 'Paste in a JSON configuration' 옵션이 선택되었습니다. 이 JSON 구성에 대한 텍스트 필드가 표시됩니다." style="width:80%;" >}}

1. 다음과 같은 구성 옵션을 적용할 수 있습니다.

   {{< img src="synthetics/private_locations/synthetics_pl_windows_fips.png" alt="Synthetics Private Location Worker 마법사, MSI 설치 프로그램. FIPS 140-2 암호화 모드 설정이 표시되어 있습니다." style="width:80%;" >}}

   이 프로그램에 필요한 방화벽 규칙을 Windows Firewall에 적용
   : 설치 프로그램이 설치 시 방화벽 규칙을 적용하고, 제거 시 제거할 수 있도록 허용합니다.

   Windows Firewall에서 예약된 IP를 차단하는 규칙 적용
   : Chrome, Firefox 및 Edge(설치된 경우)에 대한 차단 규칙을 설정하고 Windows Firewall에서 예약된 IP 주소 범위 아웃바운드를 차단하는 규칙을 추가합니다.

   파일 로깅 활성화
   : Synthetics Private Location Worker가 설치 디렉토리에 파일을 기록하도록 허용합니다.

   로그 로테이션 일수
   : 로컬 시스템에서 로그를 삭제하기 전에 보관할 기간(일)을 지정합니다.

   로깅 상세 정도
   : Synthetics Private Location Worker에 대한 콘솔 및 파일 로깅의 상세 정도를 지정합니다.

   FIPS 140-2 암호화 모드 활성화
   :안전한 통신을 위해 FIPS 준수 암호화 모듈을 활성화합니다. 이 옵션을 사용하려면 Windows 호스트가 Windows FIPS 모드에서 실행되어야 합니다. 프라이빗 위치 v1.63.0 이상에서 지원됩니다.

1. **Next** 및 **Install**을 클릭하여 설치 프로세스를 시작합니다.

프로세스가 완료되면 설치 완료 페이지에서 **Finish**를 클릭합니다.

<div class="alert alert-danger">JSON 구성을 입력한 경우, Windows 서비스가 해당 구성으로 실행됩니다. 구성을 입력하지 않은 경우, 명령 프롬프트에서 <code>C:\\Program Files\Datadog-Synthetics\Synthetics\synthetics-pl-worker.exe --config=< PathToYourConfiguration ></code> 을 실행하거나 <code>start menu</code> 바로 가기를 사용하여 Synthetics Private Location Worker를 시작하세요.</div>

[101]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi
[102]: https://app.datadoghq.com/synthetics/settings/private-locations

{{< /tab >}}

{{% tab "Windows(CLI 사용)" %}}

1. [`datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi` 파일][101]을 다운로드한 후 프라이빗 위치를 설치할 머신에서 이 파일을 실행합니다.
2. 설치 프로그램을 다운로드한 디렉토리 내에서 다음 명령 중 하나를 실행합니다.

   - PowerShell Terminal에서:

     ```powershell
     Start-Process msiexec "/i datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi /quiet /qn CONFIG_FILEPATH=<path_to_your_worker_config_file>";
     ```

   - 또는 Command Terminal에서:

     ```cmd
     msiexec /i datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi /quiet /qn CONFIG_FILEPATH=<path_to_your_worker_config_file>
     ```

다음과 같은 추가적인 파라미터를 추가할 수 있습니다.

| 선택적 파라미터 | 정의 | 값 | 기본값 | 유형 |
|---|---|---|---|---|
| APPLYDEFAULTFIREWALLRULES | 프로그램에 필요한 방화벽 규칙을 적용합니다. | 1 | 해당 없음 | 0: 비활성화<br>1: 활성화 |
| APPLYFIREWALLDEFAULTBLOCKRULES | 설치한 각 브라우저(Chrome, Edge, Firefox)에 대한 예약 IP 주소를 차단합니다. Windows 방화벽에서는 루프백 연결을 차단할 수 없습니다. | 0 | 해당 없음 | 0: 비활성화<br>1: 활성화 |
| LOGGING_ENABLED | 활성화되면 파일 로그가 구성됩니다. 이 로그는 설치 디렉토리의 로그 폴더에 저장됩니다. | 0 | `--enableFileLogging` | 0: 비활성화<br>1: 활성화 |
| LOGGING_VERBOSITY | 프로그램의 로깅 상세 정도를 구성합니다. 이는 콘솔 및 파일 로그에 영향을 미칩니다. | 이는 콘솔 및 파일 로그에 영향을 미칩니다. | `-vvv` | `-v`: 오류<br>`-vv`: 경고<br>`-vvv`: 정보<br>`vvvv`: 디버그 |
| LOGGING_MAXDAYS | 파일 로그를 삭제하기 전에 시스템에서 보관하는 일수입니다. 무인 설치를 실행하는 경우에는 어떤 숫자든 지정할 수 있습니다. | 7 | `--logFileMaxDays` | 정수 |
| CONFIG_FILEPATH | 이는 Synthetics Private Location Worker JSON 설정 파일의 경로로 변경되어야 합니다. 경로에 공백이 포함된 경우 이 경로를 따옴표로 묶습니다. | <None> | `--config` | 문자열 |

FIPS 140-2 암호화 모드를 활성화하려면 작업 실행 파일을 실행하기 전에 `ENABLE_FIPS=1` 환경 변수를 설정하세요. 이 옵션을 사용하려면 Windows 호스트가 Windows FIPS 모드에서 실행되어야 합니다. 프라이빗 위치 v1.63.0 이상에서 지원됩니다.

예:

```cmd
set ENABLE_FIPS=1 && .\synthetics-pl-worker.exe --config "<PathToYourConfiguration>"
```

[101]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi

{{< /tab >}}
{{< /tabs >}}

관리자를 위한 프라이빗 위치 파라미터에 대한 자세한 내용은 [구성][32]을 참조하세요.

#### 루트 인증서 {#root-certificates}

API 및 브라우저 테스트가 자체 `.pem` 파일을 사용하여 SSL 핸드셰이크를 수행할 수 있도록 사용자 지정 루트 인증서를 프라이빗 위치에 업로드할 수 있습니다.

{{< tabs >}}
{{% tab "Linux 컨테이너" %}}

프라이빗 위치 컨테이너를 시작할 때 관련 인증서 `.pem` 파일을 `/etc/datadog/certs`에 마운트하는 방식으로 프라이빗 위치 구성 파일을 마운트하세요. 이 인증서는 신뢰할 수 있는 CA로 간주되며 테스트 실행 시 사용됩니다.

<div class="alert alert-info">모든 <code>.pem</code> 파일을 하나의 파일로 결합하는 경우, 파일 내 인증서의 순서가 중요합니다. 신뢰 체인을 올바르게 구축하려면 중간 인증서가 루트 인증서보다 먼저 위치해야 합니다.</div>

{{% /tab %}}

{{% tab "Windows 서비스" %}}

Windows 서비스의 프라이빗 위치에 루트 인증서를 설치하려면 다음 단계를 따르세요.

1. Registry Editor App을 엽니다.
2. `Computer\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\synthetics-private-location`으로 이동합니다.
3. `Environment`라는 이름의 레지스트리 키를 생성하고 `Multi-string` 값 유형을 설정합니다.

<div class="alert alert-info">인증서는 Synthetic Monitoring Service와 동일한 폴더에 있어야 합니다.
기본값: <code>C:\Program Files\Datadog-Synthetics\Synthetics</code>.</div>

4. `NODE_EXTRA_CA_CERTS=C:\Program Files\Datadog-Synthetics\Synthetics\CACert.pem` 값을 설정합니다.

   {{< img src="synthetics/private_locations/windows_pl_set_service.png" alt="이미지 설명" style="width:100%;" >}}

5. Services App을 열고 Datadog Synthetic Monitoring Private Location 서비스를 다시 로드합니다.

{{% /tab %}}

{{% tab "독립형 Windows" %}}

`synthetics-private-location.exe`이 있는 독립형 Windows 프로세스의 프라이빗 위치에 루트 인증서를 설치하려면 다음 단계를 따르세요.

1. Windows 명령 프롬프트 또는 PowerShell을 여세요.

2. 환경 변수를 설정하고 실행 파일을 호출하세요.

예:

```text
set NODE_EXTRA_CA_CERTS=C:\Program Files\Datadog-Synthetics\Synthetics\CACert.pem && .\synthetics-private-location.exe --config "C:\ProgramData\Datadog-Synthetics\Synthetics\worker-config.json"
```

FIPS 140-2 암호화 모드를 활성화하려면 `ENABLE_FIPS=1`을 포함하세요.

```text
set ENABLE_FIPS=1 && set NODE_EXTRA_CA_CERTS=C:\Program Files\Datadog-Synthetics\Synthetics\CACert.pem && .\synthetics-private-location.exe --config "C:\ProgramData\Datadog-Synthetics\Synthetics\worker-config.json"
```

이 옵션을 사용하려면 Windows 호스트가 Windows FIPS 모드에서 실행되어야 합니다. 프라이빗 위치 v1.63.0 이상에서 지원됩니다.

{{% /tab %}}
{{< /tabs >}}

#### 생존 및 준비 프로브 설정{#set-up-liveness-and-readiness-probes}

작업자가 올바르게 실행되는지 오케스트레이터가 확인할 수 있도록 라이브니스 또는 레디니스 프로브를 추가하세요.

준비 프로브의 경우, 프라이빗 위치 배포에서 포트 `8080`에 프라이빗 위치 상태 프로브를 활성화해야 합니다. 자세한 내용은 [프라이빗 위치 구성][5]을 참조하세요.

{{< tabs >}}

{{% tab "Docker Compose" %}}

```yaml
healthcheck:
  retries: 3
  test: [
    "CMD", "wget", "-O", "/dev/null", "-q", "http://localhost:8080/liveness"
  ]
  timeout: 2s
  interval: 10s
  start_period: 30s
```

{{% /tab %}}

{{% tab "Kubernetes 배포" %}}

```yaml
livenessProbe:
  httpGet:
    path: /liveness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
readinessProbe:
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  httpGet:
    path: /readiness
    port: 8080
```

{{% /tab %}}

{{% tab "Helm 차트" %}}

```yaml
livenessProbe:
  httpGet:
    path: /liveness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
readinessProbe:
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  httpGet:
    path: /readiness
    port: 8080
```

{{% /tab %}}

{{% tab "ECS" %}}

```json
"healthCheck": {
  "retries": 3,
  "command": [
    "CMD-SHELL", "/usr/bin/wget", "-O", "/dev/null", "-q", "http://localhost:8080/liveness"
  ],
  "timeout": 2,
  "interval": 10,
  "startPeriod": 30
}
```

{{% /tab %}}

{{% tab "Fargate" %}}

```json
"healthCheck": {
  "retries": 3,
  "command": [
    "CMD-SHELL", "wget -O /dev/null -q http://localhost:8080/liveness || exit 1"
  ],
  "timeout": 2,
  "interval": 10,
  "startPeriod": 30
}
```

{{% /tab %}}

{{% tab "EKS" %}}

```yaml
livenessProbe:
  httpGet:
    path: /liveness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
readinessProbe:
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  httpGet:
    path: /readiness
    port: 8080
```

{{% /tab %}}
{{< /tabs >}}

#### 추가 상태 검사 구성 {#additional-health-check-configurations}

<div class="alert alert-warning">프라이빗 위치 상태 검사를 추가하는 이 방법은 더 이상 지원되지 않습니다. Datadog은 생존성 및 준비 프로브 사용을 권장합니다.</div>

프라이빗 위치 컨테이너의 `/tmp/liveness.date` 파일은 Datadog에서 성공적인 폴링이 있을 때마다 업데이트됩니다(기본값 2초). 일정 시간 동안 폴링이 수행되지 않으면 컨테이너는 건강하지 않은 것으로 간주됩니다. 예를 들어: 지난 1분 동안 가져오기가 없었습니다.

아래 구성을 사용하여 `livenessProbe`로 컨테이너의 상태 검사를 설정하세요.

{{< tabs >}}

{{% tab "Docker Compose" %}}

```yaml
healthcheck:
  retries: 3
  test: [
    "CMD", "/bin/sh", "-c", "'[ $$(expr $$(cat /tmp/liveness.date) + 300000) -gt $$(date +%s%3N) ]'"
  ]
  timeout: 2s
  interval: 10s
  start_period: 30s
```

{{% /tab %}}

{{% tab "Kubernetes 배포" %}}

```yaml
livenessProbe:
  exec:
    command:
      - /bin/sh
      - -c
      - '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  failureThreshold: 3
```

{{% /tab %}}

{{% tab "Helm 차트" %}}

```yaml
livenessProbe:
  exec:
    command:
      - /bin/sh
      - -c
      - '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  failureThreshold: 3
```

{{% /tab %}}

{{% tab "ECS" %}}

```json
"healthCheck": {
  "retries": 3,
  "command": [
    "CMD-SHELL", "/bin/sh -c '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'"
  ],
  "timeout": 2,
  "interval": 10,
  "startPeriod": 30
}
```

{{% /tab %}}

{{% tab "Fargate" %}}

```json
"healthCheck": {
  "retries": 3,
  "command": [
    "CMD-SHELL", "/bin/sh -c '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'"
  ],
  "timeout": 2,
  "interval": 10,
  "startPeriod": 30
}
```

{{% /tab %}}

{{% tab "EKS" %}}

```yaml
livenessProbe:
  exec:
    command:
      - /bin/sh
      - -c
      - '[ $(expr $(cat /tmp/liveness.date) + 300000) -gt $(date +%s%3N) ]'
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 2
  failureThreshold: 3
```

{{% /tab %}}

{{< /tabs >}}

### 프라이빗 위치 이미지 업그레이드{#upgrade-a-private-location-image}

기존 프라이빗 위치를 업그레이드하려면 프라이빗 위치 사이드 패널에서 **기어** 아이콘을 클릭한 후 **설치 지침**을 클릭하세요.

{{< img src="synthetics/private_locations/pl_edit_config.png" alt="프라이빗 위치에 대한 설정 워크플로에 접근하세요." style="width:90%;" >}}

그런 다음, 환경에 따라 [구성 명령](#install-your-private-location)을 실행하여 프라이빗 위치 이미지의 최신 버전을 가져오세요.

**참고**: `docker run`을 사용하여 프라이빗 위치 이미지를 시작하고 이전에 `latest` 태그를 사용하여 프라이빗 위치 이미지를 설치한 경우, `docker run` 명령에 `--pull=always`을 추가해야 합니다. 이를 통해 동일한 `latest` 태그를 사용하여 로컬에 존재할 수 있는 이미지의 캐시된 버전에 의존하기보다는 최신 버전을 가져오도록 합니다.

### 내부 엔드포인트 테스트하기{#test-your-internal-endpoint}

하나 이상의 프라이빗 위치 워커가 Datadog에 보고를 시작하면 프라이빗 위치 상태가 녹색으로 표시됩니다.

{{< img src="synthetics/private_locations/pl_reporting.png" alt="프라이빗 위치 보고" style="width:90%;">}}

프라이빗 위치 목록의 **설정** 페이지에서 `REPORTING` 상태와 관련 모니터 상태를 확인할 수 있습니다.

{{< img src="synthetics/private_locations/pl_monitoring_table_reporting_1.png" alt="프라이빗 위치 상태 및 모니터 상태" style="width:100%;">}}

내부 엔드포인트 중 하나에서 빠른 테스트를 실행하여 첫 번째 내부 엔드포인트 테스트를 시작하고, 예상 응답을 받는지 확인하세요.

{{< img src="synthetics/private_locations/pl_fast_test.mp4" alt="프라이빗 위치에서의 빠른 테스트" video="true" width="90%">}}

**참고:** Datadog은 프라이빗 위치에서만 아웃바운드 트래픽을 전송하며, 인바운드 트래픽은 전송되지 않습니다.

## 프라이빗 위치에서 Synthetic 테스트 시작하기{#launch-synthetic-tests-from-your-private-location}

API, 다단계 API 또는 브라우저 테스트를 생성하고, 관심 있는 **프라이빗 위치**를 선택하세요.

{{< img src="synthetics/private_locations/assign-test-pl_3.png" alt="프라이빗 위치에 Synthetic 테스트 할당하기" style="width:90%;">}}

프라이빗 위치를 Datadog 관리 위치처럼 사용하세요. [Synthetic 테스트][29]를 프라이빗 위치에 할당하고, 테스트 결과를 시각화하며, [Synthetic 메트릭][11]을 조회하고, 그 외에도 더 많은 작업을 수행할 수 있습니다.

## 프라이빗 위치 확장{#scale-your-private-location}

하나의 구성 파일로 여러 작업자를 단일 프라이빗 위치에서 실행할 수 있기 때문에, 작업자를 추가하거나 제거하여 프라이빗 위치를 **수평 확장**할 수 있습니다. 이때, `concurrency` 파라미터를 설정하고 프라이빗 위치에서 실행할 테스트의 유형과 수에 일치하는 작업자 리소스를 할당해야 합니다.

프라이빗 위치 작업자가 처리할 수 있는 부하를 증가시켜 **수직 확장**할 수도 있습니다. 유사하게, 작업자가 실행할 수 있는 최대 테스트 수를 조정하기 위해 `concurrency` 파라미터를 사용하고 작업자에게 할당된 리소스를 업데이트해야 합니다.

자세한 내용은 [프라이빗 위치 규모 측정][18]을 참조하세요.

프라이빗 위치를 Continuous Testing에 사용하려면 `concurrency` 파라미터에 값을 설정하여 병렬화를 제어하세요. 자세한 내용은 [Continuous Testing][23]을 참조하세요.

## 프라이빗 위치 모니터링 {#monitor-your-private-location}

프라이빗 위치에서 실행할 테스트의 수와 유형에 일치하는 리소스를 처음에 추가하는 동안, 프라이빗 위치를 축소하거나 확장해야 하는지 알기 가장 쉬운 방법은 이를 면밀히 모니터링하는 것입니다. [프라이빗 위치 모니터링][19]은 프라이빗 위치의 성능과 상태에 대한 인사이트와 기본 제공 메트릭 및 모니터를 제공합니다.

자세한 내용은 [프라이빗 위치 모니터링][19]을 참조하세요.

## 권한 {#permissions}

기본적으로 Datadog Admin 역할을 가진 사용자만 프라이빗 위치를 생성하고, 삭제하며, 프라이빗 위치 설치 가이드에 액세스할 수 있습니다.

[Datadog Admin 및 Datadog Standard 역할][20]을 가진 사용자는 프라이빗 위치를 보고, 검색하고, 프라이빗 위치에 Synthetic 테스트를 할당할 수 있습니다. 사용자를 이러한 두 개의 [기본 역할][19] 중 하나로 업그레이드하여 [**프라이빗 위치** 페이지][22]에 대한 액세스를 부여하세요.

[사용자 정의 역할 기능][21]을 사용하는 경우, `synthetics_private_location_read` 및 `synthetics_private_location_write` 권한이 포함된 사용자 정의 역할에 사용자를 추가하세요.

<div class="alert alert-warning">테스트에 제한된 프라이빗 위치가 포함된 경우, 테스트를 업데이트하면 해당 위치가 테스트에서 제거됩니다.</div>

## 액세스 제한{#restrict-access}

[세분화된 액세스 제어][24]를 사용해 테스트 기반 역할, 팀, 개인 사용자 액세스 제한하는 방법은 다음과 같습니다.

1. 양식의 권한 섹션을 엽니다.
2. **Edit Access**를 클릭합니다.
  {{< img src="synthetics/settings/grace_2.png" alt="프라이빗 위치 구성 양식에서 테스트에 대한 권한을 설정합니다." style="width:100%;" >}}
3. **Restrict Access**를 클릭합니다.
4. 팀, 역할 또는 사용자를 선택합니다.
5. **Add**를 클릭합니다.
6. 각 역할에 연결하려는 액세스 수준을 선택합니다.
7. **Done**을 클릭합니다.

<div class="alert alert-info">열람자 액세스 권한이 없어도 해당하는 프라이빗 위치의 결과를 볼 수 있습니다. <br><br>
프라이빗 위치를 제한하면 다른 사용자가 테스트에 추가하거나 편집하는 것을 제한할 수 있지만, 권한이 있는 사용자가 테스트에 추가한 경우 위치의 이름은 여전히 볼 수 있습니다.</div>

| 액세스 수준 | PL 지침 조회 | PL 메트릭 조회 | 테스트에서 PL 사용 | PL 구성 편집 |
| ------------ | ---------------------| --------------- | -------------- | ---------------------- |
| 액세스 없음    |                      |                 |                |                        |
| 열람자| {{< X >}}            | {{< X >}}       | {{< X >}}      |                        |
| 편집자 | {{< X >}}            | {{< X >}}       | {{< X >}}      | {{< X >}}              |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[3]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker?pli=1
[4]: https://docs.docker.com/engine/install/
[5]: /ko/synthetics/private_locations/configuration/
[6]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[7]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml
[10]: https://docs.docker.com/engine/reference/builder/#healthcheck
[11]: /ko/synthetics/metrics
[12]: /ko/synthetics/api_tests/
[13]: /ko/synthetics/multistep?tab=requestoptions
[14]: /ko/synthetics/browser_tests/?tab=requestoptions
[16]: /ko/agent/
[17]: /ko/synthetics/metrics/
[18]: /ko/synthetics/private_locations/dimensioning
[19]: /ko/synthetics/private_locations/monitoring
[20]: /ko/account_management/rbac/permissions
[21]: /ko/account_management/rbac#custom-roles
[22]: https://app.datadoghq.com/synthetics/settings/private-locations
[23]: /ko/continuous_testing/cicd_integrations/configuration
[24]: /ko/account_management/rbac/granular_access
[25]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[26]: https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities
[27]: https://docs.datadoghq.com/ko/synthetics/private_locations/configuration/#private-locations-admin
[28]: /ko/continuous_testing/cicd_integrations
[29]: /ko/synthetics/
[30]: https://github.com/DataDog/helm-charts/tree/master/charts/synthetics-private-location
[31]: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_LinuxParameters.html
[32]: /ko/synthetics/platform/private_locations/configuration
[33]: /ko/synthetics/guide/kerberos-authentication/