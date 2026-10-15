---
description: Datadog의 Supply Chain Firewall을 사용하여 설치 시 악성 오픈소스 패키지와 최근 게시된 오픈소스 패키지를
  차단하세요.
disable_toc: false
further_reading:
- link: https://securitylabs.datadoghq.com/articles/introducing-supply-chain-firewall/
  tag: 블로그
  text: 'Supply-Chain Firewall 소개: 악성 오픈소스 패키지로부터 개발자 보호'
title: Supply Chain Firewall
---
{{< callout url=https://docs.google.com/forms/d/1Xqh5h1n3-jC7au2t30fdTq732dkTJqt_cb7C7T-AkPc/viewform?edit_requested=true
 btn_hidden="false" header="미리 보기에 참여하세요!">}}
Supply Chain Firewall은 미리 보기로 제공되고 있습니다.
{{< /callout >}}

Supply Chain Firewall(SCFW)은 악성 오픈소스 패키지가 리포지토리나 CI/CD 파이프라인에 도달하기 전에 설치 단계에서 개발 환경에 유입되는 것을 방지합니다.

SCFW는 지원되는 패키지 관리자 명령(`npm`, `pip`, `poetry`)을 래핑합니다. SCFW를 통해 설치 명령을 실행하면 알려진 악성 및 침해된 오픈소스 패키지 정보가 포함된 Datadog Security Research의 [위협 인텔리전스 피드][1]와 조직에서 구성한 사용자 지정 허용 및 차단 정책을 기준으로 패키지를 평가합니다.

이러한 검사 결과에 따라 SCFW는 명령에 대해 다음 세 가지 결과 중 하나를 반환합니다.

- **허용**: 문제가 발견되지 않았으며 설치가 정상적으로 진행됩니다.
- **경고**: 심각하지 않은 발견 결과를 보고하고 계속 진행할지 확인하도록 요청합니다.
- **차단**: 중대한 발견 결과를 보고하며, 일반적으로 해당 패키지가 알려진 악성 패키지임을 나타냅니다. 설치를 차단하고 차단 사유와 필요한 조치를 안내하는 메시지를 표시합니다.

## CLI 설치 {#install-the-cli}

패키지를 설치하기 전에 패키지 관리자 명령을 검사할 수 있도록 SCFW CLI를 로컬 환경에 설치합니다. 

SCFW는 런타임 종속성이 없는 단일 Go 바이너리로 배포되며, macOS 및 주요 Linux 배포판에서 실행됩니다. Windows는 지원되지 않습니다.

Go 또는 GitHub 릴리스를 사용하여 SCFW 4.0.0 이상 버전을 설치할 수 있습니다. 

로컬이 아닌 CI에서 패키지 관리자 명령을 검사하려면 [Supply Chain Firewall GitHub Action][3]을 참조하세요.

### Go로 설치 {#install-with-go}

Go 1.26이 설치되어 있고 CLI를 가장 빠르게 실행 가능한 상태로 만들려면 `go install`을 사용합니다.

```bash
go install github.com/DataDog/supply-chain-firewall/scfw@latest
```

이 명령은 `scfw` 바이너리를 `$(go env GOPATH)/bin`에 설치합니다. 해당 디렉터리가 아직 `PATH`에 포함되어 있지 않다면 추가합니다.

### GitHub 릴리스로 설치 {#install-with-a-github-release}

Go가 설치되어 있지 않거나 특정 릴리스 버전을 고정하고 검증하려면 GitHub 릴리스를 사용하여 설치합니다.

[최신 GitHub 릴리스][2]에서 운영체제와 시스템 아키텍처에 맞는 바이너리를 다운로드합니다. 이 명령들을 실행하기 전에 `scfw_expected_checksum` 값을 릴리스 페이지에 게시된 해당 바이너리의 체크섬으로 바꿉니다.

```bash
# Replace this placeholder with the checksum from the release page.
scfw_expected_checksum="<expected-sha256-checksum>"

# Detect the operating system used in the release artifact name.
case "$(uname -s)" in
    Darwin) scfw_os=darwin ;;
    Linux)  scfw_os=linux ;;
    *) echo "Unsupported operating system: $(uname -s)" >&2; exit 1 ;;
esac

# Detect the CPU architecture used in the release artifact name.
case "$(uname -m)" in
    x86_64)        scfw_arch=amd64 ;;
    arm64|aarch64) scfw_arch=arm64 ;;
    *) echo "Unsupported architecture: $(uname -m)" >&2; exit 1 ;;
esac

# Download the binary for the detected platform.
scfw_binary="scfw-${scfw_os}-${scfw_arch}"
curl -fLO "https://github.com/DataDog/supply-chain-firewall/releases/latest/download/${scfw_binary}"

# Calculate the downloaded binary's checksum and compare it against the published value.
scfw_actual_checksum=$(sha256sum "${scfw_binary}" | awk '{print $1}')
if [ "${scfw_actual_checksum}" != "${scfw_expected_checksum}" ]; then
    echo "Checksum verification failed" >&2
    exit 1
fi

# Install the verified binary in a directory on PATH.
chmod +x "${scfw_binary}"
sudo install "${scfw_binary}" /usr/local/bin/scfw
```

## 환경 구성 {#configure-your-environment}

Datadog 자격 증명을 저장하도록 SCFW를 구성하고, 지원되는 패키지 관리자 명령이 SCFW를 자동으로 거치도록 셸 별칭을 설정합니다.

```bash
scfw configure \
    --dd-api-key=<DD_API_KEY> \
    --dd-app-key=<DD_APP_KEY> \
    --dd-site=<DD_SITE> \
    --alias-npm \
    --alias-pip \
    --alias-poetry
```

구성 명령은 다음과 같은 여러 단계를 수행합니다.

- API 및 애플리케이션 키를 시스템 키체인에 안전하게 저장합니다.

   <div class="alert alert-tip">플래그로 전달하는 대신 `DD_API_KEY`, `DD_APP_KEY`, `DD_SITE` 환경 변수를 사용하여 Datadog 자격 증명과 사이트를 지정할 수 있습니다. 환경 변수는 시스템 키체인에 저장된 자격 증명보다 우선합니다.</div>

- 셸의 rc 파일(`.bashrc`, `.bash_profile`, `.zshrc`, `.zprofile` 중 이미 존재하는 파일)에 SCFW의 별칭 구성을 추가합니다. 별칭을 적용하려면 셸을 다시 시작하거나 해당 rc 파일을 source 명령으로 실행합니다.

   <div class="alert alert-tip">별칭 옵션은 누적 적용됩니다. 이전 실행에서 추가된 별칭은 해당 `--remove-alias-*` 옵션을 전달하지 않는 한 그대로 유지됩니다. 이 명령은 셸 rc 파일에서 명확히 구분된 SCFW 관리 블록만 관리하며 파일의 다른 부분은 변경하지 않습니다.</div>

- Datadog으로의 로그 포워딩을 활성화합니다. 자세한 내용은 [Supply Chain Firewall 통합][4]을 참조하세요.

구성 명령에서 사용할 수 있는 옵션은 다음과 같습니다.

| 옵션 | 설명 |
| --- | --- |
| `--dd-api-key` | 정책 평가 및 보고에 사용되는 Datadog API 키입니다. |
| `--dd-app-key` | 정책 평가 및 보고에 사용되는 Datadog 애플리케이션 키입니다. |
| `--dd-site` | 정책 평가 및 보고에 사용되는 Datadog 사이트 파라미터(기본값: `datadoghq.com`). |
| `--alias-npm` | 모든 npm 명령이 SCFW를 통해 실행되도록 셸 별칭을 추가합니다. |
| `--remove-alias-npm` | SCFW에서 관리하는 npm 셸 별칭을 제거합니다. |
| `--alias-pip` | 모든 pip/pip3 명령을 SCFW를 통해 실행하도록 셸 별칭을 추가합니다. |
| `--remove-alias-pip` | SCFW에서 관리하는 pip/pip3 셸 별칭을 제거합니다. |
| `--alias-poetry` | 모든 poetry 명령을 SCFW를 통해 실행하도록 셸 별칭을 추가합니다. |
| `--remove-alias-poetry` | SCFW에서 관리하는 poetry 셸 별칭을 제거합니다. |
| `--scfw-home` | SCFW가 로컬 캐시로 사용할 수 있는 디렉터리 |
| `--remove` | SCFW에서 관리하는 모든 구성을 제거합니다. |

자격 증명과 별칭이 올바르게 구성되었는지 확인하려면 다음 명령을 실행합니다.

```bash
scfw doctor
```

## 설치 중 패키지 검사 {#inspect-a-package-during-install}

SCFW를 설치하고 구성한 후에는 `npm`, `pip` 및 `poetry` 명령이 자동으로 SCFW를 통해 라우팅됩니다. 

명령을 수동으로 검사하려면 명령 앞에 `scfw run --`을 붙입니다.

```bash
scfw run -- npm install react
scfw run -- pip install -r requirements.txt
```

`scfw run` 명령에서 지원하는 옵션은 다음과 같습니다.

| 옵션 | 설명 |
| --- | --- |
| `--executable` | 명령 실행에 사용할 패키지 관리자 실행 파일(기본값: 환경에 따라 자동 결정). |
| `--error-on-block` | 차단된 명령을 오류로 처리하여 0이 아닌 종료 코드를 반환합니다. 스크립팅 및 CI에 유용합니다. |
| `--allow-on-warning` | 경고 수준의 발견 결과만 있는 명령을 사용자와의 상호 작용 없이 허용합니다. |
| `--block-on-warning` | 경고 수준의 발견 결과만 있는 명령을 사용자와의 상호 작용 없이 차단합니다. |

`SCFW_ON_WARNING` 환경 변수(`allow` 또는 `block`)는 `--allow-on-warning` 또는 `--block-on-warning`과 동일한 효과가 있으며, 설정하면 우선 적용됩니다. 환경 변수를 사용하면 각 명령 호출을 변경하지 않고도 CI 환경 전반에 일관된 정책을 적용할 수 있습니다. 터미널이 없는 비대화형 환경에서는 SCFW가 사용자에게 확인을 요청할 수 없으므로 `--allow-on-warning`, `--block-on-warning` 또는 `SCFW_ON_WARNING`이 설정되지 않았다면 경고 수준의 발견 결과가 있는 명령도 기본적으로 차단합니다.

## 호환성 {#compatibility}

SCFW는 다음 패키지 관리자 버전 및 하위 명령을 지원합니다.

| 패키지 관리자 | 지원 버전 | 검사 대상 하위 명령 |
|------------------|--------------------|-------------------------|
| npm | 7.0 이상 | `install`(별칭 포함) |
| pip | 22.2 이상 | `install` |
| poetry | 1.7 이상 | `add`, `install`, `sync`, `update` |

지정된 것 이외의 하위 명령은 항상 검사 없이 실행됩니다.

패키지 관리자 버전이 최소 지원 버전보다 낮으면 SCFW는 검사 대상 하위 명령을 검사 없이 실행하도록 허용하지 않고 실행 자체를 거부합니다. 이러한 페일 클로즈드(fail-closed) 동작은 알려진 악성 패키지의 설치를 차단하기 위한 것입니다. 명령을 정상적으로 검사하려면 지원되는 버전으로 업그레이드합니다.

## SCFW 제거 {#uninstall-scfw}

SCFW를 제거하면 CLI와 해당 CLI가 관리하는 구성이 환경에서 삭제됩니다.

바이너리를 제거하기 전에 `scfw configure --remove`를 실행하여 환경에서 SCFW가 관리하는 구성을 제거합니다.

```bash
scfw configure --remove
```

그런 다음 `scfw` 바이너리를 제거합니다. 예를 들어 `/usr/local/bin`에서 삭제하거나 `go install`로 설치했다면 `$(go env GOPATH)/bin`에서 삭제합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/malicious-software-packages-dataset
[2]: https://github.com/DataDog/supply-chain-firewall/releases/latest
[3]: /ko/security/code_security/dev_tool_int/scfw_github_action/
[4]: /ko/integrations/supply-chain-firewall/