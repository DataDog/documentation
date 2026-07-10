---
aliases:
- /ko/getting_started/tracing/distributed-tracing
description: Application Performance Monitoring(APM)을 설정하여 병목을 식별하고, 문제를 해결하고 Datadog으로
  트레이스를 전송합니다.
further_reading:
- link: /tracing/
  tag: 설명서
  text: APM 기능에 관해 자세히 알아보기
- link: /tracing/metrics/runtime_metrics/
  tag: 설명서
  text: 런타임 메트릭 활성화
- link: /tracing/guide/#enabling-tracing-tutorials
  tag: 가이드
  text: 트레이싱을 활성화하는 다양한 방법 튜토리얼
- link: https://learn.datadoghq.com/courses/intro-to-apm
  tag: 학습 센터
  text: Application Performance Monitoring 소개
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여해 APM 이해도 높이기
title: APM 트레이싱 시작하기
---
## 개요 {#overview}

Datadog Application Performance Monitoring(APM)을 이용하면 애플리케이션을 더욱 상세히 가시화할 수 있어 성능 병목을 파악하고 문제를 해결하고 서비스를 최적화할 수 있습니다.

이 가이드에서는 APM을 시작해 Datadog으로 첫 트레이스를 전송하는 방법을 설명합니다.

1. Datadog APM을 설정하여 Datadog으로 트레이스를 전송합니다.
1. 애플리케이션을 실행해 데이터를 생성합니다.
1. Datadog에서 수집한 데이터를 탐색합니다.

## 전제 조건 {#prerequisites}

이 가이드를 완료하려면 다음이 필요합니다.

1. [Datadog 계정이 없는 경우 생성합니다][1].
1. [Datadog API 키][2]를 찾거나 생성합니다.
1. Linux 호스트 또는 VM을 시작합니다.

## 애플리케이션 생성 {#create-an-application}

Datadog에서 관찰할 애플리케이션을 생성하는 방법:

1. Linux 호스트 또는 VM에서 이름이 `hello.py`인 Python 애플리케이션을 새로 만듭니다. 예: `nano hello.py`.
1. 다음 코드를 `hello.py`에 추가:

    {{< code-block lang="python" filename="hello.py" collapsible="true" disable_copy="false" >}}
  from flask import Flask
  import random

  app = Flask(__name__)
  
  quotes = [
      "Strive not to be a success, but rather to be of value. - Albert Einstein",
      "Believe you can and you're halfway there. - Theodore Roosevelt",
      "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
  ]
  
  @app.route('/')
  def index():
      quote = random.choice(quotes)+"\n"
      return quote
  
  if __name__ == '__main__':
      app.run(host='0.0.0.0', port=5050)
  {{< /code-block >}}

## Datadog APM 설정 {#set-up-datadog-apm}

애플리케이션 코드나 배포 프로세스를 수정하지 않고도 Datadog APM을 설정하려면 단일 단계 APM 계측을 사용하거나 [Datadog 추적][8] 라이브러리를 사용하여 APM을 설정할 수 있습니다.


1. 설치 명령 실행:

   ```shell
    DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APM_INSTRUMENTATION_LIBRARIES=python:4 DD_ENV=<AGENT_ENV> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
    ```
 
    Replace `<YOUR_DD_API_KEY>` with your [Datadog API key][2], `<YOUR_DD_SITE>` with your [Datadog site][7], and `<AGENT_ENV>` with the environment your Agent is installed on (for example, `development`).

1. 호스트 또는 VM에서 서비스를 재시작합니다.
1. Agent가 실행 중인지 확인:

    ```shell
   sudo datadog-agent status
   ```

이 방법을 사용하면 자동으로 Datadog Agent가 설치되고, Datadog APM이 활성화되며, 런타임에 애플리케이션이 [계측][5]됩니다.

## 애플리케이션 실행 {#run-the-application}

단일 단계 계측으로 Datadog APM을 설정하면 Datadog가 런타임에 애플리케이션을 자동으로 계측합니다.

`hello.py` 실행 방법:

1. 현재 디렉터리에 Python 가상 환경 만들기:

   ```shell
   python3 -m venv ./venv
   ```

1. `venv` 가상 환경 활성화:

   ```shell
   source ./venv/bin/activate
   ```

1. `pip` 및 `flask` 설치:

   ```shell
   sudo apt-get install python3-pip
   pip install flask
   ```

1. 서비스 이름을 설정하고 `hello.py` 실행:

   ```shell
   export DD_SERVICE=hello
   python3 hello.py
   ```

## 애플리케이션 테스트 {#test-the-application}

트레이스를 Datadog에 전송하려면 애플리케이션을 테스트하세요.

1. 새 명령 프롬프트에서 다음 실행:

   ```shell
   curl http://0.0.0.0:5050/
   ```
1. 무작위 인용구가 반환되는지 확인하세요.
   ```text
   Believe you can and you're halfway there. - Theodore Roosevelt
   ```

`curl` 명령을 실행할 때마다 새 트레이스가 Datadog으로 전송됩니다.

## Datadog에서 트레이스 탐색 {#explore-traces-in-datadog}

1. Datadog에서 [**APM** > **서비스**][3]로 이동합니다. 이름이 `hello`인 Python 서비스가 표시되어야 합니다.

   {{< img src="/getting_started/apm/service-catalog.png" alt="Software Catalog에 새 Python 서비스가 표시됩니다." style="width:100%;" >}}

1. 서비스를 선택하면 해당 서비스의 지연 시간, 처리량 및 오류율과 같은 성능 메트릭을 조회할 수 있습니다.
1. [**APM** > **트레이스**][4]로 이동합니다. `hello` 서비스의 트레이스가 표시되어야 합니다.

   {{< img src="/getting_started/apm/trace-explorer.png" alt="트레이스 탐색기에 hello 서비스의 트레이스가 표시됩니다." style="width:100%;" >}}

1. 트레이스를 선택하면 플레임(Flame) 그래프 등 해당 트레이스의 세부 정보가 표시됩니다. 이런 세부 정보는 성능 병목을 파악하는 데 도움이 됩니다.

## Advanced APM 설정 {#advanced-apm-setup}

지금까지는 Datadog이 단일 단계 계측을 사용해 `hello.py` 애플리케이션을 자동으로 계측하도록 맡겼습니다. 이 방식은 코드를 건드리거나 라이브러리를 수동으로 설치하지 않고 공통 라이브러리 및 언어 전체에서 필수 트레이스를 수집하려면 권장합니다.

하지만 사용자 지정 코드에서 트레이스를 수집해야 하거나 좀 더 세분화된 제어가 필요한 경우, [사용자 지정 계측][6]을 추가할 수 있습니다.

이것을 나타내기 위해 Datadog Python SDK를 `hello.py`로 가져온 다음 사용자 지정 스팬과 스팬 태그를 생성하게 됩니다.

사용자 지정 계측을 추가하는 방법:

1. Datadog SDK 설치:

   ```shell
   pip install ddtrace
   ```

1. 강조 표시된 라인을 `hello.py`의 코드에 추가하여 사용자 지정 스팬 태그 `get_quote` 및 사용자 지정 스팬 태그 `quote` 생성:

   {{< highlight python "hl_lines=3 15 17" >}}
    from flask import Flask
    import random
    from ddtrace import tracer

    app = Flask(__name__)

    quotes = [
        "Strive not to be a success, but rather to be of value. - Albert Einstein",
        "Believe you can and you're halfway there. - Theodore Roosevelt",
        "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
    ]

    @app.route('/')
    def index():
        with tracer.trace("get_quote") as span:
            quote = random.choice(quotes)+"\n"
            span.set_tag("quote", quote)
            return quote

    if __name__ == '__main__':
        app.run(host='0.0.0.0', port=5050)
   {{< /highlight >}}

1. 앞서의 가상 환경에서 `hello.py` 실행:
   ```shell
   ddtrace-run python hello.py
   ```
1. 별도의 명령 프롬프트에서 몇 가지 `curl` 명령 실행:
   ```shell
   curl http://0.0.0.0:5050/
   ```
1. Datadog에서 [**APM** > **트레이스**][4]로 이동합니다.
1. **hello** 트레이스를 선택합니다.
1. 플레임(Flame) 그래프에서 새 사용자 지정 `get_quote` 스팬을 찾아 마우스 커서를 올립니다.

   {{< img src="/getting_started/apm/custom-instrumentation.png" alt="플레임(Flame) 그래프에 get_quote 사용자 지정 스팬이 표시됩니다. 마우스 커서를 올리면 quote 스팬 태그가 표시됩니다. " style="width:100%;" >}}

1. 사용자 지정 `quote` 스팬 태그가 **Info** 탭에 표시되는지 확인하세요.

## 다음 단계는? {#whats-next}

추적을 설정했고 애플리케이션이 Datadog으로 데이터를 전송하면, 추가적인 APM 기능 탐색:

### Software Catalog {#software-catalog}

[Software Catalog][9]에는 소유권 메타데이터, 성능 인사이트, 보안 분석 및 비용 할당을 한곳에 모아 서비스에 대한 통합 조회를 제공합니다. 소유권 정보, 런북 및 설명서 링크 등으로 서비스를 보강하려면 태그, 어노테이션 또는 `service.datadog.yaml` 파일을 사용하여 [서비스 메타데이터][10]를 구성하세요.

### 트레이스 수집 및 보존 {#trace-ingestion-and-retention}

[수집 제어][11] 및 [보존 필터][12]를 구성하여 비용을 제어하고 데이터 볼륨을 관리하세요. 수집 제어를 사용하면 Datadog Agent 또는 SDK 수준에서 샘플링 레이트를 사용자 지정할 수 있고, 보존 필터를 사용하면 검색 및 분석을 위해 어느 스팬을 인덱싱할지 결정할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://app.datadoghq.com/services
[4]: https://app.datadoghq.com/apm/traces
[5]: /ko/tracing/glossary/#instrumentation
[6]: /ko/tracing/trace_collection/custom_instrumentation/
[7]: /ko/getting_started/site/
[8]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[9]: /ko/internal_developer_portal/software_catalog/
[10]: /ko/internal_developer_portal/software_catalog/entity_model/
[11]: /ko/tracing/trace_pipeline/ingestion_controls/
[12]: /ko/tracing/trace_pipeline/trace_retention/