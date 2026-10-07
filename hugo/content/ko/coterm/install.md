---
description: macOS 및 Linux에 CoTerm을 설치하고, Datadog으로 권한 부여를 구성하며, CoTerm 구성 설정을 지정하세요.
further_reading:
- link: /coterm
  tag: 설명서
  text: Datadog CoTerm
- link: /coterm/usage
  tag: 설명서
  text: CoTerm 사용하기
- link: /coterm/rules
  tag: 설명서
  text: CoTerm 구성 규칙
title: Datadog CoTerm 설치하기
---
CoTerm은 macOS 및 Linux에서 지원됩니다.

1. Homebrew 또는 curl을 사용하여 Datadog CoTerm을 설치합니다.

   **brew** (macOS 전용)
   ```shell
   brew install coterm
   ```
  
   **curl**
   ```shell
   curl --tlsv1.2 --proto '=https' -sSf 'https://coterm.datadoghq.com/install-ddcoterm.sh' | bash
   ```
   
   이 명령은 최신 버전의 CoTerm을 `.ddcoterm/bin/ddcoterm`에 다운로드하고 `.bashrc` 및 `.zshrc`에서 PATH를 업데이트합니다. 터미널을 다시 시작하거나 프로필을 가져오세요. Bash 또는 Zsh 이외의 셸을 사용하는 경우 `path/to/.ddcoterm/bin`를 PATH에 수동으로 추가하세요.

2. [Datadog 사이트][6]가 `https://app.datadoghq.com`이 아닌 경우, `connection_config.host` 아래의 `.ddcoterm/config.yaml`에서 사이트를 설정합니다.
   ```yaml
   ...
   connection_config:
     host: {{< region-param key=dd_full_site code="true" >}}
   ...
   ```

3. Initialize your configuration file by running:

   ```shell
   ddcoterm init
   ```

   설정을 선택합니다. [`~/.ddcoterm/config.yaml` 파일](#configure-your-coterm-settings)에서 이러한 설정을 변경할 수 있습니다.

## Datadog에 연결하도록 CoTerm에 권한 부여 {#authorize-coterm-to-connect-to-datadog}

초기화 중에 다음 방법 중 하나를 선택하여 CoTerm이 Datadog 계정에 액세스하도록 권한을 부여할 수 있습니다.
- {{< ui >}}OAuth{{< /ui >}}: OAuth로 로그인할 수 있도록 브라우저를 엽니다.
- {{< ui >}}API Key + App Key{{< /ui >}}: `~/.ddcoterm/config.yaml`에 [Datadog API 키][1] 및 [애플리케이션 키][2]를 설정하라는 메시지를 표시합니다.
- {{< ui >}}API Key Only{{< /ui >}}: `~/.ddcoterm/config.yaml`에 Datadog API 키를 설정하라는 메시지를 표시합니다.

<div class="alert alert-info"><strong>API Key Only</strong> 옵션을 선택하면 <a href="/coterm/usage/#require-approval-for-commands">Work Management를 통한 승인을 요구</a>할 수 없습니다.</div>

## CoTerm 설정 구성 {#configure-your-coterm-settings}

`~/.ddcoterm/config.yaml` 파일에는 CoTerm 구성이 포함되어 있습니다.

`process_config`
: CoTerm이 린터 역할을 하도록 구성하고, 규칙과 일치하는 명령을 인터셉트할 때 특정 작업을 수행합니다. [CoTerm 구성 규칙][4]을 참조하세요.

`enable_telemetry`
: Datadog으로의 텔레메트리 전송을 활성화하거나 비활성화합니다. 기본값은 `false`입니다.

`enable_ptrace`
: Linux에서 실험적인 `ptrace` 기반 프로세스 모니터링을 활성화하거나 비활성화합니다. 기본값은 `false`입니다.

`connection_config`
: 
  `host`
  : Datadog에 연결하기 위한 호스트입니다. 기본값은 `https://app.datadoghq.com`입니다.

  `port`
  : Datadog에 연결하기 위한 포트입니다. 기본값은 `443`입니다.

  `api_key`
  : OAuth를 사용하지 않는 경우, [Datadog API 키][1]입니다. OAuth를 활성화한 경우, CoTerm은 기본적으로 OAuth를 사용하며 `api_key`를 무시합니다.

  `app_key`
  : OAuth를 사용하지 않는 경우, [Datadog 애플리케이션 키][2]입니다. <br/>**참고**: [Work Management를 통한 승인을 요구][5]하려면 OAuth를 사용_하거나_ 이 파일에 API 키와 애플리케이션 키를 모두 지정해야 합니다.

## 다음 단계 {#next-steps}

- `ddcoterm`을 실행하여 기록된 터미널 세션을 시작하세요.
- [CoTerm 사용][3]에 대해 자세히 알아보세요.

## 설치 제거 {#uninstall}

CoTerm을 설치 제거하려면 `.ddcoterm` 폴더를 삭제하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: /ko/coterm/usage
[4]: /ko/coterm/rules
[5]: /ko/coterm/usage/#require-approval-for-commands
[6]: /ko/getting_started/site/