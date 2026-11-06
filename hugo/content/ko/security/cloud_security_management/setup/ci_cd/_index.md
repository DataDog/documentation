---
disable_toc: false
further_reading:
- link: /security/cloud_security_management/vulnerabilities
  tag: 설명서
  text: Cloud Security Vulnerabilities
- link: /infrastructure/containers/container_images
  tag: 설명서
  text: Container Images 조회
- link: /security/cloud_security_management/setup/agent
  tag: 설명서
  text: Cloud Security를 위한 Datadog Agent 설정
title: CI/CD에서 컨테이너 이미지 스캐닝
---
## 개요 {#overview}

Cloud Security를 사용하면 CI/CD 중에 컨테이너 이미지가 프로덕션에 배포되기 전에 취약성을 스캔할 수 있습니다. 취약성 스캔을 파이프라인에 직접 통합하면 개발 수명 주기 초기에 보안 문제를 탐지하고 수정할 수 있습니다.

CI/CD 기반 컨테이너 이미지 스캔을 지원하기 위해 Datadog은 **Datadog Security CLI**를 제공합니다. CLI는 CI 작업 내에서 직접 실행되도록 설계되었으며, 파이프라인의 일부로 스캔이 실행되는 시기와 방법을 완벽하게 제어할 수 있습니다.

**참고**: 프로덕션 환경의 취약성 관리에 대해서는 [Cloud Security Vulnerabilities][1]를 참조하세요.

## 시작하기 {#get-started}

CI/CD에서 컨테이너 이미지 스캔을 시작하려면 다음 단계를 따르세요.

1. [Datadog 자격 증명 구성](#configure-datadog-credentials)
2. [CI/CD 파이프라인에 Datadog Security CLI 설치](#install-the-datadog-security-cli)
3. [[Cloud Security Vulnerabilities][3] 페이지에서 스캔 결과 조회](#view-scan-results)
4. 필요시 더 빠른 반복 작업을 위해 [개발 중 로컬 스캔 실행](#run-local-scans-during-development)

### Datadog 자격 증명 구성 {#configure-datadog-credentials}

스캔 결과를 Datadog에 업로드하려면 CI 파이프라인에서 다음 환경 변수를 구성합니다.

| 이름         | 설명                                                                                                                | 필수 | 기본값         |
|--------------|----------------------------------------------------------------------------------------------------------------------------|----------|-----------------|
| `DD_API_KEY` | Datadog API 키입니다. 이 키는 [Datadog 조직][4]에서 생성되며 시크릿으로 저장해야 합니다.            | 예      |                 |
| `DD_APP_KEY` | Datadog 애플리케이션 키입니다. [Datadog 조직][5]에서 생성된 이 키는 `appsec_vm_read` 범위를 포함해야 하며 시크릿으로 저장해야 합니다.    | 예      |                 |
| `DD_SITE`    | 정보를 전송할 [Datadog 사이트][6]입니다. Datadog 사이트는 {{< region-param key="dd_site" code="true" >}}.       | 아니요       | `datadoghq.com` |

<div class="alert alert-info">
민감한 자격 증명을 보호하려면 API 및 애플리케이션 키를 CI/CD 플랫폼에 시크릿으로 저장하세요.
</div>


### Datadog Security CLI 설치 {#install-the-datadog-security-cli}

Datadog Security CLI는 Datadog 패키지 리포지토리에서 설치할 수 있습니다. Debian/Ubuntu, Red Hat/CentOS 및 macOS 시스템에 Datadog Security CLI를 설치할 수 있습니다. 컨테이너 이미지 스캔은 다음을 비롯한 주요 CI/CD 플랫폼을 모두 지원합니다.
- GitHub Actions
- GitLab CI/CD
- Azure DevOps
- 셸 스크립트를 실행할 수 있는 기타 CI 공급자

사용자 지정 가능한 스크립트 방식을 사용하면 파이프라인에서 스캔이 실행되는 시기와 방법을 완전히 제어할 수 있습니다. 아래에서 설치 방법을 선택하세요.


{{< tabs >}}
{{% tab "Debian/Ubuntu" %}}

#### 패키지 리포지토리에서 설치 {#install-from-package-repository}

```bash
# Import Datadog APT signing key
DD_APT_KEY_URL="https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public"
curl -fsSL "$DD_APT_KEY_URL" | sudo gpg --dearmor -o /usr/share/keyrings/datadog-archive-keyring.gpg

# Add Datadog repository
echo "deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable datadog-security-cli" \
| sudo tee /etc/apt/sources.list.d/datadog-security-cli.list

# Update package list and install
sudo apt update
sudo apt install datadog-security-cli
```

{{% /tab %}}
{{% tab "Red Hat/CentOS" %}}

#### 패키지 리포지토리에서 설치 {#install-from-package-repository-1}

```bash
# Import Datadog RPM signing key
sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public

# Add Datadog repository
sudo tee /etc/yum.repos.d/datadog-security-cli.repo > /dev/null <<'EOF'
[datadog-security-cli]
name=Datadog Security CLI
baseurl=https://yum.datadoghq.com/stable/datadog-security-cli/$basearch/
enabled=1
gpgcheck=1
gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
repo_gpgcheck=1
EOF

# Install the CLI
sudo yum install datadog-security-cli
```

{{% /tab %}}
{{% tab "macOS" %}}

#### Homebrew로 설치 {#install-with-homebrew}

```bash
# Install via Homebrew
brew install --cask datadog-security-cli
```

{{% /tab %}}
{{< /tabs >}}

#### 첫 번째 스캔 실행 {#run-your-first-scan}

Datadog Security CLI를 설치한 후 Datadog 자격 증명을 구성하고 컨테이너 이미지를 스캔합니다.

```bash
# Configure Datadog credentials
export DD_API_KEY=<your_api_key>
export DD_APP_KEY=<your_app_key>
export DD_SITE={{< region-param key="dd_site" >}}

# Scan your container image
datadog-security-cli image myimage:tag
```

CLI는 스캔 결과를 터미널에 직접 출력하며 다음 정보를 표시합니다.
- 이미지 정보(이름, 다이제스트, 운영 체제)
- 발견된 총 취약성 수
- 중증도 분류(Critical, High, Medium, Low)
- CVE ID, 영향을 받는 패키지 및 사용 가능한 수정 사항이 포함된 취약성 상세 표

{{< img src="security/vulnerabilities/csm-vm-cli-output.png" alt="컨테이너 이미지의 취약성 스캔 결과를 보여주는 Datadog Security CLI 출력" style="width:100%;" >}}

### 스캔 결과 조회 {#view-scan-results}

첫 번째 스캔을 실행한 후 몇 분 내에 [Cloud Security Vulnerabilities][3] 페이지에 결과가 표시됩니다. 여기서는 다음을 할 수 있습니다.

- **리소스 유형별 필터링**: CI/CD에서 스캔된 컨테이너 이미지의 취약성 조회
- **중증도별 우선순위 지정**: Critical 및 High 중증도 취약성에 우선 집중
- **수정 추적**: 팀원에게 취약성을 할당하고 수정 진행 상황 추적
- **알림 설정**: 새로운 Critical 취약성이 탐지되면 알림 수신

{{< img src="security/vulnerabilities/csm-vm-explorer-actionability-2.png" alt="Cloud Security Vulnerabilities Findings 페이지" width="100%">}}

### 개발 중 로컬 스캔 실행 {#run-local-scans-during-development}

CI에 커밋하기 전에 더 빠르게 반복하려면 위의 [설치 섹션](#install-the-datadog-security-cli)에 설명된 것과 동일한 방법으로 Datadog Security CLI를 로컬에 설치하세요.

#### 결과를 저장하지 않는 로컬 스캔 {#scan-locally-without-persisting-results}

로컬에서 테스트할 때 `--no-persist` 플래그를 사용하여 결과를 Datadog에 업로드하지 않고 이미지를 스캔합니다.

```bash
# Scan locally without sending results to Datadog
datadog-security-cli image myapp:latest --no-persist
```

이는 다음과 같은 경우에 유용합니다.
- Datadog 데이터에 영향을 주지 않고 CLI 기능 테스트
- 로컬 개발 중 컨테이너 이미지 유효성 검사
- CI에 커밋하기 전 이미지 빌드를 빠르게 반복

## 스캔 옵션 {#scan-options}

Datadog Security CLI는 컨테이너 이미지 스캔을 사용자 지정할 수 있는 다양한 옵션을 지원합니다.

### 중증도 임계값 구성 {#configure-severity-thresholds}

```bash
# Fail the build if critical vulnerabilities are found
datadog-security-cli image myapp:latest --fail-on critical

# Fail on high or critical vulnerabilities
datadog-security-cli image myapp:latest --fail-on high
```

### 출력 형식 {#output-formats}

```bash
# Output results in JSON format
datadog-security-cli image myapp:latest --output json
```

## Dockerfile을 취약성과 연결 {#link-dockerfile-to-vulnerabilities}

<div class="alert alert-info">
Dockerfile을 취약성과 연결하는 기능은 CI/CD에서 Datadog Security CLI로 스캔할 때만 지원됩니다. 이 기능은 Datadog Agent 또는 에이전트리스 스캔으로 스캔한 이미지에는 사용할 수 없습니다.
</div>

Datadog이 탐지된 취약성을 소스 코드(Dockerfile)와 연결할 수 있도록 컨테이너 이미지를 빌드할 때 특정 **OCI 이미지 주석**을 포함해야 합니다.

이를 통해 Datadog은 다음을 수행할 수 있습니다.
- Container Image Vulnerabilities 패널에서 **Dockerfile 미리 보기**를 직접 표시
- **소스 기반 수정**을 활성화하여 컨텍스트에 따라 문제를 식별하고 수정하도록 지원

이러한 주석은 스캔된 이미지를 해당 리포지토리, 커밋 및 Dockerfile 경로와 연결하는 데 필요한 메타데이터를 제공합니다.

### 필수 주석 {#required-annotations}

빌드 시 이미지에 다음 주석을 추가합니다.

- `org.opencontainers.image.source`
  리포지토리 URL(예시: `https://github.com/org/repo`)

- `org.opencontainers.image.revision`
  이미지를 빌드하는 데 사용된 커밋 SHA

- `com.datadoghq.image.source_path`
  리포지토리 내 Dockerfile 경로(예시: `Dockerfile` 또는 `docker/Dockerfile`)

### 선택 사항 주석 {#optional-annotations}

이러한 주석은 Datadog이 기본 이미지 수정 제안을 개선하는 데 도움이 됩니다.

- `org.opencontainers.image.base.name`
  기본 이미지 이름(예시: `ubuntu:22.04`)

- `org.opencontainers.image.base.digest`
  기본 이미지 다이제스트

자세한 내용은 [OCI 이미지 사양 주석 문서][14]를 참조하세요.

### 예시 {#example}

#### docker build 사용 {#using-docker-build}

주석이 권장되는 방법입니다. 레이블도 폴백 방식으로 지원됩니다.

```bash
docker build \
  --annotation org.opencontainers.image.source="https://github.com/org/repo" \
  --annotation org.opencontainers.image.revision="$(git rev-parse HEAD)" \
  --annotation com.datadoghq.image.source_path="Dockerfile" \
  -t myapp:latest .
```

#### Datadog Security CLI 사용 {#using-the-datadog-security-cli}

주석을 수동으로 추가하는 대신 Datadog Security CLI는 `--dockerfile` 플래그를 사용하여 스캔 시 필요한 메타데이터를 직접 삽입할 수 있습니다.

```bash
datadog-security-cli image myapp:latest --dockerfile ./Dockerfile
```

## 문제 해결 {#troubleshooting}

### 인증 오류 {#authentication-errors}

인증 오류가 발생하는 경우 다음 단계를 따르세요.
1. `DD_API_KEY` 및 `DD_APP_KEY`가 올바르게 설정되었는지 확인합니다.
2. 애플리케이션 키에 `appsec_vm_read` 범위가 있는지 확인합니다.
3. `DD_SITE`가 Datadog 조직의 사이트와 일치하는지 확인합니다.

### 이미지를 찾을 수 없음 오류 {#image-not-found-errors}

CLI가 이미지를 찾을 수 없는 경우 다음 단계를 따르세요.
1. `docker images`를 사용하여 이미지가 로컬에 있는지 확인합니다.
2. 해당되는 경우 레지스트리를 포함한 전체 이미지 이름을 사용합니다.
3. 스캔하기 전에 이미지가 빌드되었는지 확인합니다.

### 네트워크 연결 문제 {#network-connectivity-issues}

네트워크 문제로 인해 스캔이 실패하는 경우 다음 단계를 따르세요.
1. CI 환경에서 Datadog 사이트에 연결할 수 있는지 확인합니다.
2. 프록시 또는 방화벽 제한 사항을 확인합니다.
3. 아웃바운드 HTTPS 연결이 허용되는지 확인합니다.

추가 도움이 필요하면 [Cloud Security 문제 해결 가이드][12]를 참조하거나 [Datadog 지원팀][13]에 문의하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/cloud_security_management/vulnerabilities
[2]: /ko/security/code_security/software_composition_analysis/
[3]: https://app.datadoghq.com/security/csm/vm
[4]: /ko/account_management/api-app-keys/#api-keys
[5]: /ko/account_management/api-app-keys/#application-keys
[6]: /ko/getting_started/site/
[7]: /ko/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[8]: /ko/integrations/guide/source-code-integration
[9]: /ko/security/code_security/dev_tool_int/github_pull_requests
[10]: /ko/integrations/gitlab-source-code/#setup
[11]: /ko/integrations/azure-devops-source-code/#setup
[12]: /ko/security/cloud_security_management/troubleshooting/vulnerabilities/
[13]: /ko/help/
[14]: https://specs.opencontainers.org/image-spec/annotations/