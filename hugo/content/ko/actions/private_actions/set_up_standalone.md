---
description: Docker 또는 Helm을 통해 직접 배포하고 관리하는 독립형 프라이빗 액션 러너를 설치, 연결, 관리, 업데이트하세요.
disable_toc: false
further_reading:
- link: actions/private_actions/
  tag: 설명서
  text: Private Actions 개요
- link: actions/private_actions/set_up_agent_based
  tag: 설명서
  text: Datadog Agent에서 프라이빗 액션 러너 설정하기
- link: actions/connections
  tag: 설명서
  text: 연결
title: 독립형 프라이빗 액션 러너 설정하기
---
## 개요 {#overview}

독립형 프라이빗 액션 러너는 Docker 또는 Helm을 통해 Datadog Agent와 무관하게 설치하고 관리할 수 있는 전용 컨테이너입니다. 이 러너는 유지 관리 모드로 지원됩니다. 보안 및 안정성 업데이트는 계속 제공되지만 새로운 기능을 추가할 계획은 없습니다. 새로 배포하는 경우, 그리고 실행 정책을 사용하려면 Datadog Agent에서 러너를 실행하세요. [Datadog Agent에서 프라이빗 액션 러너 설정하기][1]를 참조하세요.

러너 설정은 다음 세 단계로 진행됩니다.

1. [**설치**](#install-the-runner): Docker, Docker Compose, Kubernetes를 사용하여 러너를 설치합니다.
1. [**연결**](#connect-the-runner): 러너를 Datadog에 연결합니다.
1. [**업데이트**](#update-the-runner): 새 버전이 공개되면 러너를 업데이트합니다.

독립형 러너는 항상 **소유자가 있습니다**. 아래 두 가지 방법 중 하나로 러너를 생성하면 항상 [연결][2]로 인증된 생성 사용자 아래에 등록됩니다.

## 전제 조건 {#prerequisites}

- Docker 또는 Kubernetes 클러스터
- Datadog에 대한 네트워크 액세스(`https://{{< region-param key=dd_site >}}` and `https://config){{< region-param key=dd_site >}}`.

## 러너 설치 {#install-the-runner}

1. Datadog에서 [**Action Catalog > Private Action Runners**][3]로 이동한 다음, **New Private Action Runner**를 클릭합니다.
1. 러너 이름을 입력하고 허용되는 액션을 선택합니다.
1. 러너가 구성을 저장할 수 있도록 호스트에 디렉터리를 생성합니다(예: `./config`).
1. 컨테이너 플랫폼 관련 단계에 따라 러너를 배포합니다.

{{< tabs >}}
{{% tab "Docker" %}}

1. **Docker**를 클릭합니다.
1. 호스트에서 제공된 `docker run` 명령을 실행하고 `./config`를 러너 구성용으로 생성한 디렉터리 경로로 바꿉니다.

**참고**: `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED` 오류는 무시해도 안전합니다.

{{% /tab %}}
{{% tab "Docker Compose" %}}

1. **Docker Compose**를 클릭합니다.
1. `docker-compose.yaml` 파일을 생성하고 제공된 YAML을 추가하거나, 기존 Docker Compose 파일에 `runner` 스탠자를 추가합니다.
1. 를 러너 구성용으로 생성한 디렉터리 경로로 바꿉니다.`./config`
1. `docker compose up -d`를 실행합니다.

**참고**: `DATADOG TRACER DIAGNOSTIC - Agent Error: connect ECONNREFUSED` 오류는 무시해도 안전합니다.

{{% /tab %}}
{{% tab "Kubernetes(Helm)" %}}

1. **Kubernetes**를 클릭합니다.
1. `kubectl` 및 `helm`이 설치되어 있는지, 클러스터에서 Kubernetes 리소스를 생성할 수 있는 권한을 충분히 보유하고 있는지 확인합니다.
1. 앱에서 제공하는 지침에 따라 러너를 등록하고, 구성을 생성하고, Private Action Runner Helm 리포지토리를 추가하고, 차트를 설치합니다.
1. `kubectl get pods -w`를 실행하고 프라이빗 액션 러너 포드의 상태가 **준비 완료**로 전환되는지 확인합니다.

{{% /tab %}}
{{< /tabs >}}

## 대안: 프로그래밍 방식 설치 {#alternative-programmatic-installation}

위에서 언급한 UI 기반 설정의 대안으로, API 키와 애플리케이션 키를 사용하여 독립형 러너를 프로그래밍 방식으로 등록하고 구성할 수 있습니다. 이 접근 방식은 자동화된 배포, CI/CD 파이프라인, 코드형 인프라 워크플로에 적합합니다. UI 기반 설정과 유사하게 이 접근 방식은 항상 소유자가 있는 러너를 생성합니다. `--with-api-key` 플래그 이름과 달리, 이 경로에서는 여전히 애플리케이션 키가 필요합니다. 러너는 두 가지 자격 증명을 모두 사용하여 자체 등록하고 애플리케이션 키의 소유자를 러너의 편집자로 지정합니다.

러너를 프로그래밍 방식으로 설정하기

1. `DD_API_KEY` 및 `DD_APP_KEY` 환경 변수를 통해 Datadog API 키와 애플리케이션 키를 제공합니다.
1. `--with-api-key` 플래그를 러너 컨테이너에 전달합니다.

{{< tabs >}}
{{% tab "Docker" %}}

```bash
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"

docker run -d \
  -e DD_BASE_URL=https://{{< region-param key=dd_site >}} \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -e DD_API_KEY="$DD_API_KEY" \
  -e DD_APP_KEY="$DD_APP_KEY" \
  -e RUNNER_NAME=<YOUR_RUNNER_NAME> \
  -v ./config:/etc/dd-action-runner/config \
  gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}} \
  --with-api-key
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

```yaml
services:
  private-runner:
    image: gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}
    command: ["--with-api-key"]
    environment:
      DD_API_KEY: ${DD_API_KEY}
      DD_APP_KEY: ${DD_APP_KEY}
      DD_BASE_URL: https://{{< region-param key=dd_site >}}
      DD_PRIVATE_RUNNER_CONFIG_DIR: /etc/dd-action-runner/config
      RUNNER_NAME: my-compose-runner
    volumes:
      - "./config:/etc/dd-action-runner/config"
```

다음을 통해 실행합니다.

```bash
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"
docker compose up -d
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

러너 구성 생성:

```bash
export DD_API_KEY="<YOUR_API_KEY>"
export DD_APP_KEY="<YOUR_APP_KEY>"

docker run \
  -e DD_BASE_URL=https://{{< region-param key=dd_site >}} \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -e DD_API_KEY="$DD_API_KEY" \
  -e DD_APP_KEY="$DD_APP_KEY" \
  -e RUNNER_NAME="my-runner" \
  -v ./config:/etc/dd-action-runner/config \
  gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}} \
  --with-api-key --enroll -f helm-values > values.yaml
```

Helm 차트 배포:

```bash
helm upgrade --install <RELEASE_NAME> datadog/private-action-runner -f values.yaml
```

{{% /tab %}}
{{< /tabs >}}

러너가 **사용 준비 완료** 상태로 표시되면 연결을 생성하거나 **프라이빗 액션 러너** 페이지에서 확인합니다.

## 사용자 지정 CA 인증서 {#custom-ca-certificates}

조직에서 HTTP 엔드포인트나 Jenkins 등 내부 서비스용 인증서 발급 목적으로 사용자 지정 인증 기관(CA)을 활용하는 경우, 독립형 프라이빗 액션 러너가 해당 CA를 신뢰하도록 구성할 수 있습니다.

{{< tabs >}}
{{% tab "Docker" %}}

`SSL_CERT_DIR` 환경 변수를 추가하고 인증서를 `docker run` 명령에 마운트한 다음, `<PATH_TO_YOUR_CA_CERTIFICATE>`를 CA 인증서 파일 경로로 바꿉니다.

{{< highlight bash "hl_lines=7 9" >}}
docker run -d \
  -e DD_BASE_URL=https://{{< region-param key=dd_site >}} \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -e DD_API_KEY="$DD_API_KEY" \
  -e DD_APP_KEY="$DD_APP_KEY" \
  -e RUNNER_NAME=<YOUR_RUNNER_NAME> \
  -e SSL_CERT_DIR=/etc/dd-action-runner/config/ca-certificates \
  -v ./config:/etc/dd-action-runner/config \
  -v <PATH_TO_YOUR_CA_CERTIFICATE>:/etc/dd-action-runner/config/ca-certificates/ca.crt \
  gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}} \
  --with-api-key
{{< /highlight >}}

{{% /tab %}}
{{% tab "Docker Compose" %}}

`SSL_CERT_DIR`환경 변수를 추가하고 인증서를 `docker-compose.yaml` 파일에 마운트한 다음, `<PATH_TO_YOUR_CA_CERTIFICATE>`를 CA 인증서 파일 경로로 바꿉니다.

```yaml
services:
  private-runner:
    environment:
      SSL_CERT_DIR: /etc/dd-action-runner/config/ca-certificates
    volumes:
      - "<PATH_TO_YOUR_CA_CERTIFICATE>:/etc/dd-action-runner/config/ca-certificates/ca.crt"
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

1. CA 인증서를 포함하는 ConfigMap을 생성합니다.

   ```bash
   kubectl create configmap my-ca-cert --from-file=ca.crt=./my-custom-ca.pem
   ```

1. Helm `values.yaml` 파일에서 ConfigMap을 참조합니다.

   ```yaml
   runner:
     customCaCert:
       configMapName: my-ca-cert
   ```

1. 업데이트된 값을 적용합니다.

   ```bash
   helm upgrade --install <RELEASE_NAME> datadog/private-action-runner -f values.yaml
   ```

{{% /tab %}}
{{< /tabs >}}

## 러너 연결 {#connect-the-runner}

독립형 러너는 항상 소유자가 있으며 연결 권한 부여 모델을 사용합니다. 연결은 서비스의 자격 증명을 저장하고 이를 러너와 페어링합니다. 연결을 생성하고 러너와 페어링하려면 [연결][2]을 참조하세요. 러너 자체에 대한 권한의 작동 방식은 [소유자가 있는 러너 액세스 관리][4]를 참조하세요.

## 러너 관리 {#manage-the-runner}

### 연결 편집/러너 삭제 {#edit-connections-or-delete-a-runner}

Action Catalog의 **프라이빗 액션 러너** 페이지에서 모든 프라이빗 러너를 각 러너를 사용하는 워크플로/앱과 함께 확인할 수 있습니다. 러너 연결을 편집하려면 **세부 정보 보기**를 클릭합니다. 휴지통 아이콘을 클릭하여 러너를 삭제합니다.

### 허용 목록 변경 {#change-the-allowlist}

독립형 러너의 허용 목록을 편집하려면 러너 환경의 `config.yaml` 파일에서 `actionsAllowlist` 섹션을 편집한 다음, 컨테이너나 배포를 다시 시작하여 러너를 다시 시작합니다.

## 러너 업데이트 {#update-the-runner}

러너를 설치한 방식과 일치하는 탭을 선택합니다. 현재 `v{{< private-action-runner-version "private-action-runner" >}}` 버전을 사용하고 하드코딩된 태그는 사용하지 마세요.

{{< tabs >}}
{{% tab "Docker" %}}

컨테이너의 현재 ID를 찾습니다.

```bash
docker ps
```

컨테이너 중단:

```bash
docker stop <id>
```

[최신 이미지][101]로 새 컨테이너를 시작합니다. 환경 변수는 필요하지 않습니다. 모든 항목은 `config/config.yaml` 파일에 구성되어 있습니다.

```bash
docker run -d \
  -e DD_PRIVATE_RUNNER_CONFIG_DIR=/etc/dd-action-runner/config \
  -v ./config:/etc/dd-action-runner/config \
  gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}
```

새 버전이 작동하는지 확인한 후 이전 컨테이너를 삭제합니다.

```bash
docker rm <id>
```

[101]: https://api.datadoghq.com/api/v2/on-prem-management-service/runner/latest-image

{{% /tab %}}
{{% tab "Docker Compose" %}}

`docker-compose.yaml` 파일이 포함된 디렉터리로 이동하여 이미지 버전을 업데이트합니다.

```yaml
services:
  private-actions-runner:
    image: gcr.io/datadoghq/private-action-runner:v{{< private-action-runner-version "private-action-runner" >}}
```

컨테이너를 다시 시작합니다.

```bash
docker compose up -d
```

{{% /tab %}}
{{% tab "Helm" %}}

Helm을 통해 업그레이드하는 방법은 두 가지가 있습니다.

1. **(권장)** 최신 버전의 러너를 사용하는 차트를 업그레이드합니다. 차트에 변경 사항이 적용되었을 수 있으므로 [변경 로그][101]를 검토하세요.
1. 러너만 업그레이드합니다(차트 업그레이드 생략).

**차트 업그레이드(권장):**

```bash
helm repo update
helm upgrade <RELEASE_NAME> datadog/private-action-runner -f ./values.yaml
```

**러너만 업그레이드:** [차트의 values 파일][102]에서 제공된 값을 사용하여 `values.yaml` 키 아래 `common.image.tag`에 러너 버전을 지정합니다.

```yaml
common:
  image:
    tag: v{{< private-action-runner-version "private-action-runner" >}}
```

그리고 다음을 실행합니다.

```bash
helm upgrade <RELEASE_NAME> datadog/private-action-runner -f ./values.yaml
```

[101]: https://github.com/DataDog/helm-charts/blob/main/charts/private-action-runner/CHANGELOG.md
[102]: https://github.com/DataDog/helm-charts/blob/main/charts/private-action-runner/values.yaml

{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/actions/private_actions/set_up_agent_based/
[2]: /ko/actions/connections/
[3]: https://app.datadoghq.com/actions/private-action-runners
[4]: /ko/actions/private_actions/enroll_runner/#manage-access-to-owned-runners