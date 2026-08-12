---
description: 로컬에서 LLM Observability 대시보드를 실행하여 Datadog 계정 없이 브라우저에서 코딩 에이전트 및 애플리케이션
  트레이스를 검사합니다.
further_reading:
- link: https://github.com/DataDog/dd-apm-test-agent/blob/master/lapdog/README.md
  tag: GitHub
  text: GitHub의 Lapdog README
- link: /llm_observability/instrumentation/sdk
  tag: 설명서
  text: LLM Observability SDK로 애플리케이션 계측
- link: /llm_observability/instrumentation/auto_instrumentation
  tag: 설명서
  text: LLM Observability를 위한 자동 계측
title: Lapdog
---
## 개요 {#overview}

Lapdog은 LLM Observability를 위한 로컬 개발 도구입니다. 이 도구는 `localhost:8126`에서 에이전트를 실행하여 LLM 애플리케이션이나 Claude Code, Codex, Pi와 같은 코딩 에이전트에서 모든 스팬, 프롬프트, 도구 호출 및 비용을 캡처하고 이를 [lapdog.datadoghq.com](https://lapdog.datadoghq.com)의 브라우저 대시보드로 스트리밍합니다. Datadog 계정은 필요하지 않습니다.

Lapdog은 오픈 소스 [Datadog APM 테스트 에이전트][1]를 기반으로 구축되었습니다. 캡처된 텔레메트리를 Datadog으로 전달하여 동일한 데이터가 프로덕션 트래픽과 함께 LLM Observability에 표시되도록 할 수도 있습니다.

## 이 작업으로 얻게 되는 사항 {#what-you-get}

- 프롬프트, 도구 호출 및 응답이 포함된 세션별 트레이스
- 입력, 출력 및 캐시 히트에 따라 분석한 토큰 사용량 및 예상 비용
- 권한 마찰: 통제된 도구 호출 및 대기 시간
- 세션 동안의 컨텍스트 창 사용량 및 캐시 히트
- 실행 중인 코딩 에이전트의 실시간 상태(실행 중, 유휴, 차단됨)

## 설치 {#install}

{{< tabs >}}
{{% tab "Homebrew(macOS)" %}}

```shell
brew install datadog/lapdog/lapdog
```
{{% /tab %}}
{{% tab "pip/pipx" %}}

```shell
pipx install ddapm-test-agent
# or: pip install ddapm-test-agent
```
{{% /tab %}}
{{< /tabs >}}

Docker, 소스에서 설치 및 기타 설치 경로에 대한 내용은 [Lapdog 설치 가이드][1]를 참조하세요.

## 코딩 에이전트 실행 {#run-a-coding-agent}

Lapdog은 코딩 에이전트를 엔드 투 엔드로 계측합니다. 각 프롬프트, 도구 호출 및 권한 요청은 대시보드에서 다시 재생할 수 있는 세션의 스팬이 됩니다.

{{< tabs >}}
{{% tab "Claude Code" %}}

```shell
lapdog claude
```
로컬 에이전트를 시작하고, Claude Code lapdog 플러그인을 설치한 후 Claude Code를 실행합니다.
{{% /tab %}}
{{% tab "Codex" %}}

```shell
lapdog codex
```
로컬 에이전트를 시작한 후 OpenAI 호환 프록시와 JSONL 감시자를 사용하여 Codex를 실행하세요. 이 감시자는 모든 LLM 요청, 도구 호출 및 단계를 세션으로 캡처합니다.
{{% /tab %}}
{{% tab "Pi" %}}

```shell
lapdog pi
```
로컬 에이전트를 시작하고, Pi lapdog 확장을 설치한 후 `LAPDOG_URL`이 구성된 Pi를 실행합니다.
{{% /tab %}}
{{% tab "기타" %}}

```shell
lapdog python my_app.py
```
로컬 에이전트를 가리키는 `ddtrace` 자동 계측으로 모든 명령을 실행합니다. 이 작업은 개발 중에 LLM 기반 애플리케이션을 계측하는 데 유용합니다.
{{% /tab %}}
{{< /tabs >}}

**참고**: `lapdog claude` 및 `lapdog codex`는 프록시의 지원을 받는 구조로, 로컬 Lapdog 에이전트가 실시간 모델 요청 경로에 있습니다. 코딩 에이전트가 종료될 때까지 Lapdog을 실행 상태로 유지하세요. 세션 중에 Lapdog을 중지하거나 종료하면 실행된 코딩 에이전트가 모델 호출에서 진행을 중지할 수 있습니다. Lapdog을 재시작한 후 코딩 에이전트를 재시작하세요. `lapdog pi` 및 후크 전용 설정은 Lapdog이 다운되면 열립니다. 코딩 에이전트는 계속 실행되지만 캡처 데이터는 손실됩니다.

## 세션 보기 {#view-sessions}

세션이 실행되는 동안 [lapdog.datadoghq.com](https://lapdog.datadoghq.com)을 여세요. 대시보드는 로컬 에이전트에서 `localhost:8126`에 대해 직접 읽으며, 로그인이나 Datadog 계정이 필요하지 않습니다.

로컬 포트를 변경한 경우 대시보드 헤더의 {{< ui >}}Collecting sessions{{< /ui >}} 배지를 통해 이를 재정의합니다.

## Datadog에 이벤트 전달 {#forward-events-to-datadog}

캡처된 이벤트를 Datadog의 LLM Observability로 동시에 전송하려면 API 키를 설정하고 `--forward`를 전달하세요.

```shell
DD_API_KEY=<YOUR_API_KEY> lapdog --forward claude
```

전달된 스팬은 `source:lapdog` 태그가 붙어 개발 세션과 프로덕션 트래픽을 구분할 수 있습니다.

## 유용한 명령 {#useful-commands}

| 명령 | 동작 |
| --- | --- |
| `lapdog claude` | 캡처가 연결된 Claude Code 실행 |
| `lapdog codex` | OpenAI 프록시와 JSONL 감시자가 연결된 Codex 실행 |
| `lapdog pi` | lapdog 확장 프로그램이 설치된 Pi 실행 |
| `lapdog python app.py` | 트레이스 계측이 적용된 애플리케이션 실행 |
| `lapdog start` | 백그라운드에서 로컬 에이전트 시작 |
| `lapdog stop` | 백그라운드 에이전트 중지 |
| `lapdog status` | 에이전트의 실행 여부 표시 |

전체 옵션 목록을 보려면 `lapdog --help`를 실행하세요.

## 설치 제거 {#uninstall}

Lapdog과 Lapdog이 홈 디렉토리에 쓰는 상태를 제거하려면 다음 단계를 따르세요. 패키지 관리자(Homebrew, pip 또는 pipx)는 설치된 항목만 지우며, `~/.lapdog/`, Claude Code 플러그인 또는 Pi 확장 프로그램은 그대로 유지됩니다.

1. 로컬 에이전트를 중지합니다.

   ```shell
   lapdog stop
   ```

2. (설치된 경우) Claude Code 플러그인을 제거합니다.

   ```shell
   claude plugin uninstall lapdog@lapdog
   claude plugin marketplace remove lapdog
   ```

3. Pi 확장 프로그램을 제거합니다(단, `lapdog pi`를 실행한 경우에만).

   ```shell
   rm -f ~/.pi/agent/extensions/lapdog.ts
   ```

4. Lapdog 작업 디렉토리를 제거합니다.

   ```shell
   rm -rf ~/.lapdog
   ```

5. 패키지를 제거합니다.

   {{< tabs >}}
   {{% tab "Homebrew(macOS)" %}}
   ```shell
   brew uninstall lapdog
   brew untap datadog/lapdog
   ```
   {{% /tab %}}
   {{% tab "pip/pipx" %}}
   ```shell
   pipx uninstall ddapm-test-agent
   # or: pip uninstall ddapm-test-agent
   ```
   {{% /tab %}}
   {{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-apm-test-agent/blob/master/lapdog/README.md