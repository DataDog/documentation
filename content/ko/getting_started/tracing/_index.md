---
aliases:
- /ko/getting_started/tracing/distributed-tracing
description: 애플리케이션 성능 모니터링(APM)을 설정하여 병목 현상을 파악하고 문제를 해결하며 트레이스를 Datadog에 전송하세요.
further_reading:
- link: /tracing/
  tag: 설명서
  text: APM 기능에 대해 더 알아보기
- link: /tracing/metrics/runtime_metrics/
  tag: 설명서
  text: 런타임 메트릭 활성화
- link: /tracing/guide/#enabling-tracing-tutorials
  tag: 가이드
  text: 추적을 활성화하는 다양한 방법 튜토리얼
- link: https://learn.datadoghq.com/courses/intro-to-apm
  tag: 학습 센터
  text: 애플리케이션 성능 모니터링 소개
- link: https://dtdg.co/fe
  tag: 기초 구축
  text: 대화형 세션에 참여해 애플리케이션 성능 모니터링(APM)에 대한 이해도를 높이세요.
title: APM 추적 시작하기
---

## 개요

Datadog APM(애플리케이션 성능 모니터링)을 이용하면 애플리케이션을 더욱 상세히 가시화할 수 있어 성능 병목 현상을 파악하고, 오류를 트러블슈팅하고, 서비스를 최적화할 수 있습니다.

이 가이드에서는 APM을 시작해 Datadog로 첫 트레이스를 전송하는 방법을 설명합니다.

1. Datadog APM을 설정해 Datadog로 트레이스를 보낼 수 있습니다.
1. 애플리케이션을 실행해 데이터를 생성합니다.
1. Datadog에서 수집한 데이터를 탐색합니다.

## 사전 필수 조건

본 지침을 완료하려면 다음이 필요합니다.

1. 계정이 없는 경우 [Datadog 계정을 생성][1]하세요.
1. [Datadog API 키][2]를 검색 또는 생성하세요.
1. Linux 호스트나 VM을 시작하세요

## 애플리케이션 생성

Datadog에서 관찰할 애플리케이션을 생성하는 방법:

1. Linux 호스트나 VM에서 이름이 `hello.py`인 새 Python 애플리케이션을 생성하세요(예: `nano hello.py`).
1. `hello.py`에 다음 코드를 추가하세요.

    {{< code-block lang="python" filename="hello.py" collapsible="true" disable_copy="false" >}}
  from flask import Flask
  import random

  app = Flask(__name__)

  quotes = [
      "성공한 사람보다는 가치 있는 사람이 되라. - 알버트 아인슈타인",
      "스스로 할 수 있다고 믿으면 절반은 성공이다". - 시어도어 루즈벨트",
      "미래는 자신의 꿈의 아름다움을 믿는 사람의 것이다. - 엘레노어 루즈벨트"
  ]

  @app.route('/')
  def index():
      quote = random.choice(quotes)+"\n"
      return quote

  if __name__ == '__main__':
      app.run(host='0.0.0.0', port=5050)
  {{< /code-block >}}

## Datadog APM 설정

애플리케이션 코드나 배포 프로세스를 수정하지 않고도 Datadog APM을 설정하려면 Single Step APM Instrumentation을 사용하거나 [Datadog 추적][8] 라이브러리를 사용하여 APM을 설정할 수 있습니다.


1. 설치 명령을 실행하세요

   ```shell
    DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APM_INSTRUMENTATION_LIBRARIES=python:4 DD_ENV=<AGENT_ENV> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
    ```

    `<YOUR_DD_API_KEY>`를 [Datadog API 키][2]로 변경하고, `<YOUR_DD_SITE>`를 [Datadog 사이트][7]로 변경하며, `<AGENT_ENV>`를 에이전트가 설치된 환경으로 변경하세요(예: `development`).

1. 내 호스트나 VM에 있는 서비스를 재시작하세요
1. 에이전트가 실행 중인지 확인하세요

    ```shell
   sudo datadog-agent status
   ```

이 방법을 사용하면 자동으로 Datadog 에이전트가 설치되고, Datadog APM이 활성화되며, 런타임에 애플리케이션이 [계측][5]됩니다.

## 애플리케이션 실행

단일 단계 계측으로 Datadog APM을 설정하면 Datadog가 런타임에 애플리케이션을 자동으로 계측합니다.

`hello.py`을 실행하는 방법:

1. 현재 디렉터리에 Python 가상 환경을 만드세요.

   ```shell
   python3 -m venv ./venv
   ```

1. `venv` 가상 환경을 활성화하세요.

   ```shell
   source ./venv/bin/activate
   ```

1. `pip`과 `flask`를 설치하세요.

   ```shell
   sudo apt-get install python3-pip
   pip install flask
   ```

1. 서비스 이름을 설정하고 `hello.py`를 실행하세요.

   ```shell
   export DD_SERVICE=hello
   python3 hello.py
   ```

## 애플리케이션을 테스트하세요.

트레이스를 Datadog에 전송하려면 애플리케이션을 테스트하세요.

1. 새 명령 프롬프트에서 다음을 실행하세요.

   ```shell
   curl http://0.0.0.0:5050/
   ```
1. 무작위 인용이 반환되는지 확인하세요.
   ```text
   Believe you can and you're halfway there. - Theodore Roosevelt
   ```

`curl` 명령을 실행할 때마다 새 트레이스가 Datadog로 전송됩니다.

## Datadog에서 트레이스 탐색

1. Datadog에서 [**APM** > **Services**][3]로 이동하세요. 이름이 `hello`인 Python 서비스가 있습니다.

   {{< img src="/getting_started/apm/service-catalog.png" alt="새로운 Python 서비스를 보여주는 Software Catalog." style="width:100%;" >}}

1. 대기 시간, 처리량, 오류율과 같은 성능 메트릭을 볼 서비스를 선택하세요.
1. [**APM** > **Traces**][4]로 이동하세요. `hello` 서비스 트레이스가 있습니다.

   {{< img src="/getting_started/apm/trace-explorer.png" alt="hello 서비스를 보여주는 트레이스 탐색기" style="width:100%;" >}}

1. 트레이스를 선택하면 플레임 그래프를 포함한 상세 정보를 볼 수 있습니다. 플레임 그래프는 성능 병목 현상을 파악하는 데 도움이 됩니다.

## 고급 APM 설정

지금까지는 단일 단계 계측을 사용해 Datadog에서 `hello.py` 애플리케이션을 자동으로 계측하는 방법을 알아봤습니다. 코드나 수동으로 라이브러리를 설치하지 않고 일반적인 라이브러리와 언어에서 중요 트레이스를 캡처하고 싶을 때 이 방법을 추천합니다.

그러나 커스텀 코드에서 트레이스를 수집해야 하거나 세부적인 제어가 필요할 경우 [커스텀 계측][6]을 추가할 수 있습니다.

예를 들어 Datadog Python 추적 라이브러리를 `hello.py`로 가져와 커스텀 스팬과 스팬 태그를 생성할 수 있습니다.

커스텀 계측을 추가하는 방법:

1. Datadog 추적 라이브러리를 설치합니다.

   ```shell
   pip install ddtrace
   ```

1. `hello.py`에 강조 표시한 줄을 추가하여 커스텀 스팬 태그 `get_quote`와 커스텀 스팬 태그 `quote`를 생성하세요.

   {{< highlight python "hl_lines=3 15 17" >}}
    from flask import Flask
    import random
    from ddtrace import tracer

    app = Flask(__name__)

    quotes = [
        "성공한 사람보다는 가치 있는 사람이 되라. - 알버트 아인슈타인",
        "스스로 할 수 있다고 믿으면 절반은 성공이다". - 시어도어 루즈벨트",
        "미래는 자신의 꿈의 아름다움을 믿는 사람의 것이다. - 엘레노어 루즈벨트"
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

1. 이전 가상 환경에서 `hello.py`를 실행하세요.
   ```shell
   ddtrace-run python hello.py
   ```
1. 별도의 명령 프롬프트에서 `curl` 명령을 몇 번 실행하세요.
   ```shell
   curl http://0.0.0.0:5050/
   ```
1. Datadog에서 [**APM** > **Traces**][4]로 이동하세요.
1. **hello** 트레이스를 선택하세요.
1. 플레임 그래프에서 새 커스텀 `get_quote` 스팬을 찾아 마우스 커서를 올리세요.

   {{< img src="/getting_started/apm/custom-instrumentation.png" alt="플레임 그래프에 표시된 get_quote 커스텀 스팬, 마우스 커서를 올리면 인용 스팬 태그를 표시" style="width:100%;" >}}

1. 커스텀 `quote` 스팬 태그가 **Info** 탭에 표시됩니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://app.datadoghq.com/services
[4]: https://app.datadoghq.com/apm/traces
[5]: /ko/tracing/glossary/#instrumentation
[6]: /ko/tracing/trace_collection/custom_instrumentation/
[7]: /ko/getting_started/site/
[8]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/