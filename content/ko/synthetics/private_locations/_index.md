---
description: 프라이빗 위치에서 신서틱(Synthetic) API 및 브라우저 테스트 실행
further_reading:
- link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog/
  tag: 블로그
  text: Datadog으로 신서틱(Synthetic) 프라이빗 위치 모니터링
- link: /getting_started/synthetics/private_location
  tag: 설명서
  text: 프라이빗 위치 시작하기
- link: /synthetics/private_locations/monitoring
  tag: 설명서
  text: 프라이빗 위치 모니터링
- link: /synthetics/private_locations/dimensioning
  tag: 설명서
  text: 프라이빗 위치 크기 조정
- link: /synthetics/api_tests
  tag: 설명서
  text: API 테스트 설정
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_private_location
  tag: Terraform
  text: Terraform으로 신서틱(Synthetic) 프라이빗 위치 생성 및 관리
kind: 설명서
title: 프라이빗 위치에서 신서틱(Synthetic) 테스트 실행
---

<div class="alert alert-info">
Windows 프라이빗 위치 베타 버전에 참여하려면 <a href="https://docs.datadoghq.com/help/">Datadog 지원팀</a>에 문의하세요.
</div>

## 개요

프라이빗 위치를 사용하면 공용 인터넷에서 액세스할 수 없는 **내부 연결 애플리케이션 또는 모든 프라이빗 엔드포인트**를 모니터링할 수 있습니다. 또한 다음과 같은 용도로 사용할 수 있습니다.

* 비즈니스 핵심 영역에 **커스텀 신서틱(Synthetic) 위치를 생성합니다**.
* [지속적인 테스트 및 CI/CD][1]를 사용하여 새로운 기능을 프로덕션에 출시하기 전에 **내부 CI 환경에서 애플리케이션 성능을 확인하세요**.
* 내부 네트워크의 내외부에서 **애플리케이션 성능을 비교하세요**.

{{< img src="synthetics/private_locations/private_locations_worker.png" alt="신서틱(Synthetic) 모니터링에서 프라이빗 위치가 작동하는 방식에 대한 아키텍처 다이어그램" style="width:100%;">}}

프라이빗 위치는 프라이빗 네트워크 내부의 어느 곳에나 설치할 수 있는 Docker 컨테이너로 제공됩니다. 생성 및 설치가 완료되면 관리형 위치와 마찬가지로 [신서틱(Synthetic) 테스트][2]를 프라이빗 위치에 할당할 수 있습니다.

프라이빗 위치 작업자는 HTTPS를 사용하여 Datadog 서버에서 테스트 설정을 가져와 일정에 따라 또는 요청 시 테스트를 실행하고 테스트 결과를 Datadog 서버에 반환합니다. 그런 다음 관리형 위치에서 실행되는 테스트를 시각화하는 방식과 동일하게 프라이빗 위치 테스트 결과를 시각화할 수 있습니다.

{{< img src="synthetics/private_locations/test_results_pl.png" alt="프라이빗 위치에 신서틱(Synthetic) 테스트 할당" style="width:100%;">}}

## 필수 구성 요소

### Continuous Testing

[Continuous Testing 테스트][23]를 위해 프라이빗 위치를 사용하려면 v1.27.0 이상이 필요합니다.

### Docker

프라이빗 위치는 프라이빗 네트워크 내부 어디에나 설치할 수 있는 Docker 컨테이너입니다. Google Container Registry에서 [프라이빗 위치 작업자 이미지][3]에 액세스할 수 있습니다. 호스트에서 [Docker 엔진][4]을 사용할 수 있고 Linux 컨테이너 모드에서 실행할 수 있는 경우 Linux 기반 OS 또는 Windows OS에서 실행할 수 있습니다.

### Datadog 프라이빗 위치 엔드포인트

테스트 설정을 가져온 후 테스트 결과를 푸시하려면 프라이빗 위치 작업자가 다음 Datadog API 엔드포인트에 액세스해야 합니다.

{{< site-region region="us" >}}

| 포트 | 엔드포인트                               | 설명                                                   |
| ---- | -------------------------------------- | ------------------------------------------------------------- |
| 443  | `intake.synthetics.datadoghq.com`      | [AWS Signature Version 4 프로토콜][1]을 기반으로 하는 내부 프로토콜을 사용하여 테스트 설정을 가져오고 테스트 결과를 Datadog에 푸시하기 위해 프라이빗 위치에서 사용됩니다. |
| 443  | 버전 0.2.0 이상 및 1.4.0 이하의 경우 `intake-v2.synthetics.datadoghq.com`   | 스크린샷, 오류 및 리소스와 같은 브라우저 테스트 아티팩트를 푸시하기 위해 프라이빗 위치에서 사용됩니다.       |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="eu" >}}

| 포트 | 엔드포인트                           | 설명                                                    |
| ---- | ---------------------------------- | -------------------------------------------------------------- |
| 443  | `intake.synthetics.datadoghq.eu`   | [AWS Signature Version 4 프로토콜][1]을 기반으로 하는 내부 프로토콜을 사용하여 테스트 설정을 가져오고 테스트 결과를 Datadog에 푸시하기 위해 프라이빗 위치에서 사용됩니다. |

**참고**: 이러한 도메인은 일련의 고정 IP 주소를 가리킵니다. 이 주소는 https://ip-ranges.datadoghq.eu에서 찾을 수 있으며,  `api.datadoghq.eu`의 경우 https://ip-ranges.datadoghq.eu/api.json에서, `intake-v2.synthetics.datadoghq.eu`의 경우 https://ip-ranges.datadoghq.eu/synthetics-private-locations.json에서 찾을 수 있습니다.

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="us3" >}}

| 포트 | 엔드포인트                                | 설명                                                                        |
| ---- | --------------------------------------- | ---------------------------------------------------------------------------------- |
| 443  | `intake.synthetics.us3.datadoghq.com`  | [AWS Signature Version 4 프로토콜][1]을 기반으로 하는 내부 프로토콜을 사용하여 테스트 설정을 가져오고 테스트 결과를 Datadog에 푸시하기 위해 프라이빗 위치에서 사용됩니다. |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="ap1" >}}

| 포트 | 엔드포인트                                | 설명                                                                        |
| ---- | --------------------------------------- | ---------------------------------------------------------------------------------- |
| 443  | `intake.synthetics.ap1.datadoghq.com`  | [AWS Signature Version 4 프로토콜][1]을 기반으로 하는 내부 프로토콜을 사용하여 테스트 설정을 가져오고 테스트 결과를 Datadog에 푸시하기 위해 프라이빗 위치에서 사용됩니다. |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="us5" >}}

| 포트 | 엔드포인트                              | 설명                                                    |
| ---- | ------------------------------------- | -------------------------------------------------------------- |
| 443  | `intake.synthetics.us5.datadoghq.com` | [AWS Signature Version 4 프로토콜][1]을 기반으로 하는 내부 프로토콜을 사용하여 테스트 설정을 가져오고 테스트 결과를 Datadog에 푸시하기 위해 프라이빗 위치에서 사용됩니다. |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

{{< site-region region="gov" >}}

| 포트 | 엔드포인트                         | 설명                                                                                                                                                                                                                                                                       |
|------|----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 443  | `intake.synthetics.ddog-gov.com` | [AWS Signature Version 4 프로토콜][1]을 기반으로 하는 내부 프로토콜을 사용하여 테스트 설정을 가져오고 테스트 결과를 Datadog에 푸시하기 위해 프라이빗 위치에서 사용됩니다. 버전 1.32.0 이상의 경우 이러한 요청은 FIPS(연방 정보 처리 표준)를 준수합니다. |

[1]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html

{{< /site-region >}}

## 프라이빗 위치 설정

**Admin** 역할을 가진 사용자만 프라이빗 위치를 만들 수 있습니다. 자세한 내용은 [권한](#permissions)을 참조하세요.

### 프라이빗 위치 생성하기

[**Synthetic Monitoring** > **Settings** > **Private Locations**][22]로 이동하여 **Add Private Location**을 클릭합니다.

{{< img src="synthetics/private_locations/synthetics_pl_add_1.png" alt="프라이빗 위치 생성" style="width:90%;">}}

프라이빗 위치 세부 정보 입력

1. 프라이빗 위치의 **이름**과 **설명**을 입력합니다.
2. 프라이빗 위치와 연결할 **태그**를 추가하세요.
3. 기존 **API 키** 중 하나를 선택하세요. API 키를 선택하면 프라이빗 위치와 Datadog 간의 통신이 가능해집니다. 기존 API 키가 없으면 **Generate API key**를 클릭하여 전용 페이지에서 API 키를 생성하세요. `Name` 및 `API key` 필드는 필수입니다.
4. 프라이빗 위치에 대한 액세스를 설정하고 **Save Location and Generate Configuration File**을 클릭하세요. Datadog은 프라이빗 위치와 관련 설정 파일을 생성합니다.

{{< img src="synthetics/private_locations/pl_creation_1.png" alt="프라이빗 위치에 세부 정보 추가" style="width:85%;">}} 

### 프라이빗 위치 구성

생성된 파일을 사용자 지정하여 프라이빗 위치를 설정하세요. **3단계**에서 [프록시](#proxy-configuration) 및 [차단된 예약 IP](#blocking-reserved-ips)와 같은 초기 설정 파라미터를 추가하면 생성된 설정 파일이 **4단계**에서 자동으로 업데이트됩니다. 

고급 옵션에 액세스하여 내부 네트워크에 따라 설정을 조정할 수 있습니다. `help` 명령어에 대한 자세한 내용은 [설정][5]을 참조하세요.

#### 프록시 설정

프라이빗 위치와 Datadog 간의 트래픽이 프록시를 통과해야 하는 경우 생성된 설정 파일에 관련 `proxyDatadog` 파라미터를 추가하려면 프록시 URL을 `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`로 지정하세요.

{{<img src="synthetics/private_locations/pl_proxy_1.png" alt="Add a proxy to your private location configuration file" style="width:90%;">}}

#### 예약된 IP 차단

기본적으로 신서틱(Synthetic) 사용자는 모든 IP를 사용하여 엔드포인트에서 신서틱(Synthetic) 테스트를 생성할 수 있습니다. 사용자가 네트워크의 민감한 내부 IP에 대한 테스트를 생성하지 못하도록 하려면 **Block reserved IPs** 버튼을 토글하여 예약된 IP 범위의 기본 집합([IPv4 주소 레지스트리][6] 및 [IPv6 주소 레지스트리][7])을 차단하세요. 생성된 설정 파일에서 관련 `enableDefaultBlockedIpRanges` 파라미터를 `true`로 설정합니다.

테스트하려는 엔드포인트 중 일부가 차단된 예약 IP 범위 중 하나 이상에 있는 경우 해당 IP 및/또는 CIDR을 허용 목록에 추가하여 생성된 설정 파일에 관련 `allowedIPRanges` 파라미터를 추가할 수 있습니다.

{{< img src="synthetics/private_locations/pl_reserved_ips_1.png" alt="예약된 IP 설정" style="width:90%;">}}

### 설정 파일 보기

프라이빗 위치 설정 파일에 적절한 옵션을 추가한 후 이 파일을 작업 디렉터리에 복사하여 붙여넣을 수 있습니다. 설정 파일에는 프라이빗 위치 인증, 테스트 설정 암호 해독 및 테스트 결과 암호화를 위한 비밀번호가 포함되어 있습니다.

{{< img src="synthetics/private_locations/pl_view_file_1.png" alt="예약된 IP 설정" style="width:90%;">}}

Datadog은 비밀번호를 저장하지 않으므로 **View Installation Instructions**를 클릭하기 전에 로컬로 저장하세요.

**참고:** 작업자를 추가하거나 다른 호스트에 작업자를 설치하기로 한 경우 이 비밀번호를 다시 참조할 수 있어야 합니다.

### 프라이빗 위치 설치

작업 정의에서 `DATADOG_API_KEY`, `DATADOG_ACCESS_KEY`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_PUBLIC_KEY_PEM`, `DATADOG_PRIVATE_KEY` 환경 변수를 사용할 수 있습니다.

다음에서 프라이빗 위치를 실행하세요.

{{< tabs >}}

{{% tab "Docker" %}}

설정 파일을 컨테이너에 마운트하여 프라이빗 위치 작업자를 부팅하려면 이 명령을 실행하세요. `<MY_WORKER_CONFIG_FILE_NAME>.json` 파일이 루트 홈 폴더가 아닌 `/etc/docker`에 있는지 확인하세요.

```shell
docker run -d --restart unless-stopped -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest
```

**참고:** 예약된 IP를 차단한 경우 `NET_ADMIN` [Linux 기능][1]을 프라이빗 위치 컨테이너에 추가하세요.

이 명령은 Docker 컨테이너를 시작하고 프라이빗 위치에서 테스트를 실행할 수 있도록 준비합니다. **Datadog은 적절한 재시작 정책을 사용하여 분리 모드에서 컨테이너를 실행할 것을 권장합니다.**

#### 루트 인증서

커스텀 루트 인증서를 프라이빗 위치에 업로드하여 API 및 브라우저 테스트가 자체 `.pem` 파일을 사용하여 SSL 핸드셰이크를 수행하도록 할 수 있습니다.

프라이빗 위치 컨테이너를 가동할 때 프라이빗 위치 설정 파일을 마운트하는 것과 동일한 방식으로 관련 인증서 `.pem` 파일을 `/etc/datadog/certs`에 마운트하세요. 이러한 인증서는 신뢰할 수 있는 CA로 간주되며 테스트 런타임에 사용됩니다.

관리자를 위한 프라이빗 위치 파라미터는 [설정][2]을 참조하세요.

[1]: https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities
[2]: https://docs.datadoghq.com/ko/synthetics/private_locations/configuration/#private-locations-admin

{{% /tab %}}

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
   **참고:** 예약된 IP를 차단한 경우 `NET_ADMIN` [Linux 기능][1]을 프라이빗 위치 컨테이너에 추가하세요.

2. 컨테이너를 다음과 함께 시작하세요.

    ```shell
    docker-compose -f docker-compose.yml up
    ```

#### 루트 인증서

커스텀 루트 인증서를 프라이빗 위치에 업로드하여 API 및 브라우저 테스트가 자체 `.pem` 파일을 사용하여 SSL 핸드셰이크를 수행하도록 할 수 있습니다.

프라이빗 위치 컨테이너를 가동할 때 프라이빗 위치 설정 파일을 마운트하는 것과 동일한 방식으로 관련 인증서 `.pem` 파일을 `/etc/datadog/certs`에 마운트하세요. 이러한 인증서는 신뢰할 수 있는 CA로 간주되며 테스트 런타임에 사용됩니다.

관리자를 위한 프라이빗 위치 파라미터는 [설정][2]을 참조하세요.

[1]: https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities
[2]: https://docs.datadoghq.com/ko/synthetics/private_locations/configuration/#private-locations-admin

{{% /tab %}}

{{% tab "Podman" %}}

Podman 설정은 Docker와 매우 유사하지만 ICMP 테스트를 지원하려면 `NET_RAW`를 추가 기능으로 설정해야 합니다.

1. 컨테이너를 실행하는 호스트에서 `sysctl -w "net.ipv4.ping_group_range = 0 2147483647"`를 실행하세요.
2. 설정 파일을 컨테이너에 마운트하여 프라이빗 위치 작업자를 부팅하려면 이 명령을 실행하세요. `<MY_WORKER_CONFIG_FILE_NAME>.json` 파일을 컨테이너에 마운트할 수 있는 지 확인하세요.

   ```shell
   podman run --cap-add=NET_RAW --rm -it -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json gcr.io/datadoghq/synthetics-private-location-worker:latest
   ```

   **참고:** 예약된 IP를 차단한 경우 `NET_ADMIN` [Linux 기능][1]을 프라이빗 위치 컨테이너에 추가하세요.

이 명령은 Podman 컨테이너를 시작하고 프라이빗 위치에서 테스트를 실행할 수 있도록 준비합니다. Datadog은 적절한 재시작 정책을 사용하여 분리 모드에서 컨테이너를 실행할 것을 권장합니다.


{{% /tab %}}

{{% tab "Kubernetes Deployment" %}}

프라이빗 위치 작업자를 안전한 방식으로 배포하려면 `/etc/datadog/synthetics-check-runner.json` 아래 컨테이너에서 Kubernetes Secret 리소스를 설정하고 마운트하세요.

1. 다음을 실행하여 이전에 생성된 JSON 파일로 Kubernetes Secret을 생성합니다.

    ```shell
    kubectl create secret generic private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. 배포를 사용하여 프라이빗 위치와 관련된 원하는 상태를 설명합니다. 다음 `private-location-worker-deployment.yaml` 파일을 생성하세요.

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

   **참고:** 예약된 IP를 차단한 경우 `NET_ADMIN` [Linux 기능][1]을 프라이빗 위치 컨테이너에 추가하세요.

3. 설정 적용

    ```shell
    kubectl apply -f private-location-worker-deployment.yaml
    ```

OpenShift의 경우 `anyuid` SCC를 사용하여 프라이빗 위치를 실행하세요. 이는 브라우저 테스트를 실행하는 데 필요합니다.

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/

{{% /tab %}}

{{% tab "Helm Chart" %}}

이미 설정한 비밀번호를 가리키는 설정 파라미터에서 환경 변수를 설정할 수 있습니다. 비밀번호가 포함된 환경 변수를 생성하려면 [Kubernetes 문서][3]를 참조하세요.

또는:

1. Helm 리포지토리에 [Datadog Synthetics Private Location][1]을 추가합니다.

    ```shell
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```

2. 이전에 생성된 JSON 파일을 사용하여 릴리스 이름 `<RELEASE_NAME>`으로 차트를 설치합니다.

    ```shell
    helm install <RELEASE_NAME> datadog/synthetics-private-location --set-file configFile=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

**참고:** 예약된 IP를 차단한 경우 `NET_ADMIN` [Linux 기능][1]을 프라이빗 위치 컨테이너에 추가하세요.

[1]: https://github.com/DataDog/helm-charts/tree/master/charts/synthetics-private-location
[2]: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
[3]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#define-container-environment-variables-using-secret-data

{{% /tab %}}

{{% tab "ECS" %}}

다음과 일치하는 새 EC2 작업 정의를 생성합니다. 각 파라미터를 이전에 생성된 프라이빗 위치 설정 파일에 있는 해당 값으로 바꿉니다.

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

- 예약된 IP를 차단한 경우 [linuxParameters][1]를 설정하여 개인 위치 컨테이너에 `NET_ADMIN` 기능을 부여하세요.
- `DATADOG_API_KEY`, `DATADOG_ACCESS_KEY`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_PUBLIC_KEY_PEM`, `DATADOG_PRIVATE_KEY` 환경 변수를 사용할 경우 `"command": [ ]` 섹션에 이를 추가할 필요가 없습니다.

[1]: https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_LinuxParameters.html

{{% /tab %}}

{{% tab "Fargate" %}}

다음과 일치하는 새 Fargate 작업 정의를 생성합니다. 각 파라미터를 이전에 생성된 프라이빗 위치 설정 파일에 있는 해당 값으로 바꿉니다.

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

**참고:** AWS Fargate에서는 프라이빗 위치 방화벽 옵션이 지원되지 않으므로 `enableDefaultBlockedIpRanges` 파라미터를 `true`로 설정할 수 없습니다.

{{% /tab %}}

{{% tab "EKS" %}}

Datadog은 이미 Kubernetes 및 AWS와 통합되어 있으므로 EKS를 모니터링할 준비가 되어 있습니다.

1. 다음을 실행하여 이전에 생성된 JSON 파일로 Kubernetes Secret을 생성합니다.

    ```shell
    kubectl create secret generic private-location-worker-config --from-file=<MY_WORKER_CONFIG_FILE_NAME>.json
    ```

2. 배포를 사용하여 프라이빗 위치와 관련된 원하는 상태를 설명합니다. 다음 `private-location-worker-deployment.yaml` 파일을 생성하세요.

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

   **참고:** 예약된 IP를 차단한 경우 `NET_ADMIN` [Linux 기능][1]을 프라이빗 위치 컨테이너에 추가하기 위해 보안 컨텍스트를 설정하세요.

3. 설정 적용

    ```shell
    kubectl apply -f private-location-worker-deployment.yaml
    ```

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/

{{% /tab %}}

{{< /tabs >}}

#### 라이브니스 및 레디니스 프로브 설정

작업자가 올바르게 실행되는지 오케스트레이터가 확인할 수 있도록 라이브니스 또는 레디니스 프로브를 추가하세요.

레디니스 프로브의 경우 프라이빗 위치 배포의 포트 `8080`에서 프라이빗 위치 상태 프로브를 활성화해야 합니다. 자세한 내용은 [프라이빗 위치 설정][5]을 참조하세요.

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

{{% tab "Kubernetes Deployment" %}}

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

{{% tab "Helm Chart" %}}

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

#### 추가적인 상태 검사 설정

<div class="alert alert-danger">프라이빗 위치 상태 검사를 추가하는 이 메서드는 더 이상 지원되지 않습니다. Datadog은 라이브니스 및 레디니스 프로브 사용을 권장합니다.</div>

프라이빗 위치 컨테이너의 `/tmp/liveness.date` 파일은 Datadog에서 폴링이 성공할 때마다 업데이트됩니다(기본적으로 2초). 한동안 폴링이 수행되지 않은 경우 컨테이너는 비정상으로 간주됩니다(예: 마지막 순간에 가져오기가 없음).

아래 설정과 `livenessProbe`를 사용하여 컨테이너의 상태 검사를 설정하세요.

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

{{% tab "Kubernetes Deployment" %}}

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

{{% tab "Helm Chart" %}}

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

### 프라이빗 위치 이미지 업그레이드

기존 프라이빗 위치를 업그레이드하려면 프라이빗 위치 사이드 패널에서 **Gear** 아이콘을 클릭하고 **Installation instructions**를 클릭하세요.

{{< img src="synthetics/private_locations/pl_edit_config.png" alt="프라이빗 위치의 설정 워크플로에 액세스" style="width:90%;" >}}

그런 다음 [환경에 따른 설정 명령](#install-your-private-location)을 실행하여 프라이빗 위치 이미지의 최신 버전을 가져옵니다.

### 내부 엔드포인트 테스트

하나 이상의 프라이빗 위치 컨테이너가 Datadog에 보고하기 시작하면 프라이빗 위치 상태가 녹색으로 표시됩니다.

{{< img src="synthetics/private_locations/pl_reporting.png" alt="프라이빗 위치 보고" style="width:90%;">}}

**Settings** 페이지의 Private Locations 목록에 표시되는 `REPORTING` 상태 및 관련 모니터 상태를 볼 수 있습니다.

{{< img src="synthetics/private_locations/pl_monitoring_table_reporting_1.png" alt="프라이빗 위치 상태 및 모니터 상태" style="width:100%;">}}

내부 엔드포인트 중 하나에서 빠른 테스트를 실행하여 첫 번째 내부 엔드포인트 테스트를 시작하고 예상된 응답을 얻었는지 확인하세요.

{{< img src="synthetics/private_locations/pl_fast_test.mp4" alt="프라이빗 위치에서 신속한 테스트" video="true" width="90%">}}

**참고:** Datadog은 프라이빗 위치에서 아웃바운드 트래픽만 전송하며 인바운드 트래픽은 전송되지 않습니다.

## 프라이빗 위치에서 신서틱(Synthetic) 테스트 실행하기

API, 다단계 API 또는 브라우저 테스트를 생성하고 관심 있는 **프라이빗 위치**를 선택하세요.

{{< img src="synthetics/private_locations/assign-test-pl-2.png" alt="프라이빗 위치에 신서틱(Synthetic) 테스트 할당" style="width:90%;">}}

Datadog 관리형 위치와 마찬가지로 프라이빗 위치를 사용하세요. [신서틱(Synthetic) 테스트][2]를 프라이빗 위치에 할당하고, 테스트 결과를 시각화하며, [신서틱(Synthetic) 메트릭][11]을 검색하는 등의 작업을 수행하세요.

## 프라이빗 위치 확장

하나의 설정 파일을 사용하여 하나의 프라이빗 위치에 대해 여러 컨테이너를 실행할 수 있으므로 프라이빗 위치에 작업자를 추가하거나 제거하여 **수평적으로 확장**할 수 있습니다. 그렇게 할 때 `concurrency` 파라미터를 설정하고 프라이빗 위치에서 실행하려는 테스트 유형 및 수와 일치하는 작업자 리소스를 할당해야 합니다.

또한 프라이빗 위치 컨테이너가 처리할 수 있는 부하를 늘려 프라이빗 위치를 **수직적으로 확장**할 수도 있습니다. 마찬가지로 `concurrency` 파라미터를 사용하여 작업자가 실행할 수 있는 최대 테스트 수를 조정하고 작업자에게 할당된 리소스를 업데이트해야 합니다.

자세한 정보는 [프라이빗 위치 크기 조정][18]을 참조하세요.

Continuous Testing을 위해 프라이빗 위치를 사용하려면 `concurrency` 파라미터에 값을 설정하여 병렬화를 제어하세요. 자세한 내용은 [Continuous Testing][23]을 참조하세요.

## 프라이빗 위치 모니터링

초기에 프라이빗 위치에서 실행할 테스트 수 및 유형과 일치하는 리소스를 추가하는 동안 리소스를 면밀히 모니터링하여 프라이빗 위치를 축소할지 또는 확대할지를 파악할 수 있습니다. [프라이빗 위치 모니터링][19]은 프라이빗 위치의 성능과 상태는 물론 기본 메트릭과 모니터에 대한 인사이트를 제공합니다.

자세한 내용은 [프라이빗 위치 모니터링][19]을 참조하세요.

## 권한

기본적으로 Datadog Admin 역할이 있는 사용자만 프라이빗 위치를 생성 및 삭제할 수 있으며, 프라이빗 위치 설치 지침에 액세스할 수 있습니다.

[Datadog Admin 및 Datadog Standard 역할][20]을 가진 사용자는 프라이빗 위치를 확인하고 검색할 수 있으며, 프라이빗 위치에 신서틱(Synthetic) 테스트를 할당할 수 있습니다. 사용자를 이 두 가지 [기본 역할][19] 중 하나로 업그레이드하여 [**Private Locations** 페이지][22]에 대한 액세스 권한을 부여하세요.

[커스텀 역할 기능][21]을 사용하는 경우 `synthetics_private_location_read` 및 `synthetics_private_location_write` 권한을 포함하는 커스텀 역할에 사용자를 추가합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_testing/cicd_integrations
[2]: /ko/synthetics/
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