---
aliases:
- /ko/tracing/faq/agent-5-tracing-setup
private: true
title: Agent v5와 APM & Continuous Profiler
---

## 시작하기

APM은 Linux 및 Docker Agent에 대한 한 줄 설치 명령의 일부로 Datadog Agent 버전 5.11 이상에서 사용할 수 있습니다. [Mac][1] 및 [Windows][2] 사용자는 별도의 설치 과정을 통해 APM Agent(Trace Agent라고도 함)를 수동으로 설치해야 합니다.

Agent는 [Datadog Agent 설정 파일][3]에 다음을 포함시켜 활성화할 수 있습니다.

```conf
apm_enabled: true
```

<div class="alert alert-info">
APM는 리눅스와 도커에서 Datadog Agent 5.13 이상의 버전을 사용할 때 기본으로 활성화됩니다. 단, 파라미터 apm_enabled: no</code>를 Datadog Agent 설정 파일에 추가하면 비활성화할 수 있습니다.
</div>

### Agent 설치하기

[트레이싱 메트릭][4]은 Datadog Agent를 통해 Datadog로 전송됩니다. 트레이싱을 활성화하는 방법은 다음과 같습니다.

최신 [Datadog Agent][5]를 설치합니다(버전 5.11.0 이상이 필요합니다).

### 도커에서 Agent 실행하기

도커 컨테이너에서 애플리케이션을 트레이스하려면 [docker-dd-agent][6] 이미지(태깅된 버전 11.0.5110 이상)을 사용하고, `DD_APM_ENABLED=true`를 환경 변수로 전송하여 트레이싱을 활성화할 수 있습니다.

자세한 정보는 [도커 페이지][7]를 참조하시기 바랍니다.

### 애플리케이션의 계측

{{< whatsnext desc="지원 언어 중 하나를 선택하세요">}}
    {{< nextlink href="tracing/setup/java" tag="Java" >}}자바(Java) 언어 계측.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/cpp" tag="C++" >}}C++ 언어 계측.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/python" tag="Python" >}}파이썬(Python) 언어 계측.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/ruby" tag="Ruby" >}}Ruby 언어 계측{{< /nextlink >}}
    {{< nextlink href="tracing/setup/go" tag="Go" >}}Go 언어 계측.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/nodejs" tag="Nodejs" >}}Node.js 언어 계측.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/dotnet" tag=".NET" >}}.NET 언어 계측.{{< /nextlink >}}
    {{< nextlink href="tracing/setup/php" tag="PHP" >}}PHP 언어 계측.{{< /nextlink >}}
{{< /whatsnext >}}

공식 라이브러리 지원에 포함되지 않은 언어로 작성된 애플리케이션을 계측하려면 [트레이싱 API][8] 페이지를 참조하세요.

## 설정

Datadog Agent는 인프라스트럭처 모니터링과 APM 설정 옵션 모두에서 설정 파일을 사용합니다.

또한, 일부 설정 옵션은 환경 변수로 설정할 수 있습니다. 환경 변수로 설정된 옵션은 설정 파일에서 정의한 설정보다 우선한다는 점에 유의하시기 바랍니다.

| 파일 설정            | 환경 변수       | 설명                                                                                                                                                      |
|-------------------------|----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `apm_enabled`           | `DD_APM_ENABLED`           | Datadog Agent는 값이 `true`로 설정된 경우 트레이스 메트릭을 활용합니다. 기본 값은 `true`입니다.                                                            |
| `receiver_port`         | `DD_RECEIVER_PORT`         | Datadog Agent의 트레이스 리시버가 사용하는 포트입니다. 기본 값은 `8126`입니다.                                                                  |
| `connection_limit`      | `DD_CONNECTION_LIMIT`      | 한 번의 30초 임대시간(Lease Time) 동안 허용할 단일 클라이언트 연결 횟수입니다. 기본 값은 `2000`입니다.                                                 |
| `resource`              | `DD_IGNORE_RESOURCE`       | 리소스 이름을 기준으로 트레이스를 필터링하기 위한 정규식 제외 목록입니다.                                                                                  |

Datadog Agent를 더 자세히 알아보려면 [전용 설명서 페이지][9]나 [`datadog.conf.example` 파일][10]을 참조하세요.

### 트레이스 검색

Agent 5.25.0 이상의 버전은 트레이스 검색을 지원합니다. 더 자세한 정보는 주요 [APM 설명서][11]의 설정 가이드를 참조하시기 바랍니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 고객 지원팀][12]에 문의해주세요.

[1]: https://github.com/DataDog/datadog-agent/tree/main/docs/trace-agent#run-on-macos
[2]: https://github.com/DataDog/datadog-agent/tree/main/docs/trace-agent#run-on-windows
[3]: /ko/agent/faq/where-is-the-configuration-file-for-the-agent/
[4]: /ko/tracing/glossary/#trace-metrics
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: https://gcr.io/datadoghq/docker-dd-agent
[7]: /ko/tracing/docker/
[8]: /ko/tracing/guide/send_traces_to_agent_by_api/
[9]: /ko/agent/
[10]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[11]: /ko/tracing/setup/?tab=agent5250#trace-search
[12]: /ko/help/