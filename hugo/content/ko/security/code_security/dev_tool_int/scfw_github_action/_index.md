---
description: Datadog의 GitHub Action for Supply Chain Firewall을 사용하여 CI/CD 러너에서 악성
  패키지를 차단하세요.
disable_toc: false
further_reading:
- link: /security/code_security/#supply-chain-security-preview
  tag: 문서
  text: Supply Chain Security
- link: https://securitylabs.datadoghq.com/articles/introducing-supply-chain-firewall/
  tag: 블로그
  text: 'Supply-Chain Firewall 소개: 악성 오픈소스 패키지로부터 개발자 보호'
- link: https://www.datadoghq.com/blog/supply-chain-firewall-code-security/
  tag: 블로그
  text: Supply Chain Firewall 및 Datadog Code Security를 사용하여 조직 전체에서 악성 패키지를 차단하기
is_beta: true
title: Supply Chain Firewall GitHub Action
---
Supply Chain Firewall GitHub Action은 Datadog의 [Supply Chain Firewall][1](SCFW)을 설치하고, 이후의 모든 워크플로 단계에서 지원되는 패키지 관리자 명령을 가로채도록 구성합니다. 활성화되면 SCFW는 지원되는 각 패키지 관리자 명령이 실행되기 전에 이를 검사합니다.

<div class="alert alert-info">이 액션은 Linux 및 macOS 러너만 지원합니다.</div>

## 사용 방법 {#usage}

```yaml
steps:
  - uses: actions/checkout@9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0 # v7.0.0

  - uses: DataDog/supply-chain-firewall-action@2f166ae1d2c34ed717d7b08427c7acb57804f3f5 # v1.0.0
    with:
      version: '3.1.0'
      package-managers: npm,pip

  # npm and pip commands are inspected by SCFW before they run.
  # Flagged packages are blocked; other installs proceed normally.
  - run: pip install -r requirements.txt
  - run: npm install
```

### Supply Chain Security 통합 구성 {#configure-the-supply-chain-security-integration}

{{< callout url=https://docs.google.com/forms/d/1Xqh5h1n3-jC7au2t30fdTq732dkTJqt_cb7C7T-AkPc/viewform?edit_requested=true
 btn_hidden="false" header="미리 보기에 참여하세요!">}}
이 양식을 사용하여 Supply Chain Security Preview 참여 요청을 제출하세요.
{{< /callout >}}

```yaml
steps:
  - uses: DataDog/supply-chain-firewall-action@2f166ae1d2c34ed717d7b08427c7acb57804f3f5 # v1.0.0
    with:
      dd-codesec-logger: 'true'
      dd-api-key: ${{ secrets.DD_API_KEY }}
      dd-app-key: ${{ secrets.DD_APP_KEY }}
      dd-site: {{< region-param key="dd_site" >}}
```

### `SCFW_HOME` 디렉터리 캐싱 {#cache-the-scfw-home-directory}

`SCFW_HOME` 항목을 캐싱하면 실행할 때마다 검증기 데이터를 다시 가져오지 않아도 됩니다.

```yaml
steps:
  - uses: actions/cache@55cc8345863c7cc4c66a329aec7e433d2d1c52a9 # v6.1.0
    with:
      path: ~/.scfw
      key: scfw-${{ runner.os }}

  - uses: DataDog/supply-chain-firewall-action@2f166ae1d2c34ed717d7b08427c7acb57804f3f5 # v1.0.0
    with:
      scfw-home: ~/.scfw
```

## 작동 방식 {#how-it-works}

1. **설치**: Supply Chain Firewall CLI는 `pipx`를 사용해 격리된 Python 환경에 설치되므로 프로젝트의 종속성과 충돌하지 않습니다.

2. **래핑**: 요청된 각 패키지 관리자에 대해, 이 액션은 임시 디렉터리에 간단한 래퍼 스크립트를 작성하고 해당 디렉터리를 `PATH` 앞에 추가합니다. 해당 패키지 관리자를 호출하는 모든 후속 단계는 자동으로 Supply Chain Firewall을 거치도록 라우팅됩니다.

   각 래퍼는 호출 시점에 `PATH`에서 자신의 디렉터리를 제거한 뒤 실제 바이너리를 찾아 그 경로를 `scfw run --executable`에 전달합니다. 이를 통해 Supply Chain Firewall이 실제 바이너리를 호출하고 래퍼를 다시 호출하지 않도록 보장할 수 있습니다.

   `source .venv/bin/activate` 등을 사용하여 Python 가상 환경을 활성화하면 해당 단계의 나머지 부분에서는 Python 가상 환경이 Supply Chain Firewall 래퍼보다 우선합니다. 가상 환경 내에서 실행되는 모든 명령에는 `scfw run pip install ...`을 명시적으로 사용하세요.

3. **구성**: `DD_API_KEY` 및 `SCFW_HOME` 등의 관련 환경 변수가 `GITHUB_ENV`에 기록되어 후속 단계에서 사용할 수 있게 됩니다.

   `GITHUB_ENV`에 기록된 환경 변수는 이 액션 이후에 실행되는 타사 액션을 포함하여 작업의 모든 후속 단계에서 액세스할 수 있습니다. `dd-api-key` 또는 `dd-app-key`를 제공하는 경우, 워크플로에서 이어지는 액션에 의심스러운 동작이나 침해 징후가 있는지 감사하세요.

## 입력 사항 {#inputs}

| 입력 | 설명 | 기본값 |
|-------|-------------|---------|
| `version` | 설치할 SCFW 버전입니다. `"latest"`를 사용하거나 특정 릴리스(예: `"3.1.0"`)로 고정하세요. | `latest` |
| `package-managers` | 가로챌 패키지 관리자의 쉼표로 구분된 목록입니다. 지원됨: `npm`, `pip`, `poetry` | `npm,pip,poetry` |
| `error-on-block` | 설치가 차단될 때 0이 아닌 종료 코드로 워크플로 단계를 실패 처리합니다. | `true` |
| `dd-api-key` | 방화벽 이벤트를 Datadog HTTP 또는 Code Security API로 전달하기 위한 Datadog API 키입니다. `$를 사용하세요.{{ secrets.DD_API_KEY }}`. | — |
| `dd-app-key` | Datadog application key for forwarding firewall events to the Datadog Code Security API. Use `${{ secrets.DD_APP_KEY }}`. | — |
| `dd-api-logger` | When `"true"`, enables SCFW's Datadog HTTP API logger. Requires `dd-api-key`. | `false` |
| `dd-codesec-logger` | When `"true"`, enables SCFW's Datadog Code Security logger. Requires `dd-api-key` and `dd-app-key`. | `false` |
| `dd-site` | Datadog 사이트({{< region-param key="dd_site" code="true" >}})에서 지원되지 않습니다. `dd-api-logger` 및 `dd-codesec-logger` 모두에서 사용됩니다. | `datadoghq.com` |
| `dd-log-level` | 어떤 방화벽 이벤트를 Datadog으로 전달할지 제어합니다. `ALLOW`는 모든 이벤트를 로그에 기록하고, `BLOCK`은 차단된 이벤트만 로그에 기록합니다. | `ALLOW` |
| `scfw-home` | SCFW 로컬 캐시용 디렉터리입니다. 실행 간 검증기 데이터 가져오기 속도를 높이려면 이를 캐시된 디렉터리로 지정하세요. | — |
| `on-warning` | 경고 수준 발견 결과에 대해 SCFW가 취해야 할 작업: `ALLOW` 또는 `BLOCK` 비대화형 환경에서는 기본값이 `BLOCK`입니다. | — |
| `package-minimum-age` | 설치가 허용되기 전에 패키지 버전이 도달해야 하는 최소 경과 시간(시간 단위)입니다. | `24` |
| `dd-env` | 전달되는 모든 방화벽 이벤트에 첨부되는 Datadog 환경 태그입니다. | `ci` |
| `dd-log-attributes` | 전달되는 모든 Datadog 로그 이벤트에 첨부할 사용자 지정 속성의 JSON 객체입니다(예: `'{"team":"security"}'`). | — |

## 출력 {#outputs}

| 출력 | 설명 |
|--------|-------------|
| `scfw-version` | 설치된 Supply Chain Firewall 버전입니다. |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/supply-chain-firewall