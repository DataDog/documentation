---
further_reading:
- link: /tracing/trace_collection/library_config/python/
  tag: 설명서
  text: 추가 추적 라이브러리 설정 옵션
- link: /tracing/trace_collection/dd_libraries/python/
  tag: 설명서
  text: 상세한 추적 라이브러리 설정 지침
- link: /tracing/trace_collection/compatibility/python/
  tag: 설명서
  text: 자동 계측에 지원되는 파이썬 프레임워크
- link: /tracing/trace_collection/custom_instrumentation/python/
  tag: 설명서
  text: 수동으로 트레이스와 스팬 설정하기
- link: https://github.com/DataDog/dd-trace-py
  tag: 소스 코드
  text: 추적 라이브러리 오픈 소스 리포지토리
title: 튜토리얼 - Datadog Agent와 동일한 호스트에서 Python 애플리케이션의 추적 활성화하기
---

## 개요

본 튜토리얼에서는 호스트에 설치된 샘플 Python 애플리케이션에서 추적을 활성화하는 단계를 안내합니다. 이 시나리오에서는 Datadog 에이전트를 애플리케이션과 동일한 호스트에 설치합니다.

{{< img src="tracing/guide/tutorials/tutorial-python-host-overview.png" alt="본 튜토리얼의 설치 시나리오를 나타내는 다이어그램" style="width:100%;" >}}

컨테이너의 애플리케이션, 컨테이너의 Agent, 다른 언어로 작성된 애플리케이션을 포함하는 기타 시나리오의 경우, 다른 [추적 활성화 튜토리얼][1]을 참조하세요.

[파이썬 추적 애플리케이션][2] 설명서에서 파이썬 추적 설정에 대한 포괄적인 정보를 확인하세요.

### 사전 필수 조건

- Datadog 계정과 [조직 API 키][3]
- Git
- [추적 라이브러리 요구 사항][4]을 충족하는 파이썬

## 에이전트 설치

시스템에 Datadog 에이전트를 설치하지 않은 경우, [**통합 > 에이전트**][5]로 이동하여 운영체제를 선택합니다. 예를 들어, 대부분의 Linux 플랫폼은 다음 스크립트를 실행하여 `<YOUR_API_KEY>`을 [Datadog API 키][3]로 대체하여 에이전트를 설치합니다.

{{< code-block lang="shell" >}}
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=<YOUR_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script.sh)"
{{< /code-block >}}

`datadoghq.com` 이외의 Datadog 사이트로 데이터를 전송하려면 `DD_SITE` 환경변수를 [Datadog 사이트][6]로 교체합니다.

호스트에 이미 에이전트가 설치되어 있는 경우 버전이 7.28 이상인지 확인합니다. `ddtrace`를 사용하여 파이썬(Python) 애플리케이션을 추적하는 데 필요한 Datadog 에이전트 최소 버전은 [추적 라이브러리 개발자 문서][7]에 명시되어 있습니다.

[**이벤트 > 탐색기**][8]로 이동하여 에이전트가 실행 중이며 Datadog로 데이터를 전송하는지 확인합니다. 옵션으로 `Datadog` 소스 패싯으로 필터링하여 호스트의 에이전트 설치를 확인하는 이벤트를 찾습니다.

{{< img src="tracing/guide/tutorials/tutorial-python-host-agent-verify.png" alt="에이전트가 호스트에 설치되었음을 나타내는 Datadog 메시지가 표시된 이벤트 탐색기" style="width:70%;" >}}

<div class="alert alert-info">몇 분이 지난 후에도 Datadog의 <strong>인프라스트럭처 > 호스트 맵</strong> 하단에 호스트가 표시되지 않는다면, 정확한 조직 API키를 사용했는지 확인하세요. 해당 키는 <a href="https://app.datadoghq.com/organization-settings/api-keys"><strong>조직 설정 > API 키</strong></a>에서 사용할 수 있습니다.</div>


## 샘플 Python 애플리케이션 설치 및 실행

다음으로 추적할 샘플 애플리케이션을 설치합니다. 이 튜토리얼의 코드 샘플은 [github.com/Datadog/apm-tutorial-Python][9]에서 확인할 수 있습니다. 다음을 실행하여 git 리포지토리를 복제합니다.

{{< code-block lang="shell" >}}
git clone https://github.com/DataDog/apm-tutorial-python.git
{{< /code-block >}}

Poetry 또는 pip를 중 하나를 사용하여 이 샘플의 Python 종속성을 구성, 설정, 설치합니다. 다음 중 하나를 실행합니다.

{{< tabs >}}
{{% tab "Poetry" %}}

```shell
poetry install
```

{{% /tab %}}
{{% tab "pip" %}}

```shell
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

{{% /tab %}}
{{< /tabs >}}

다음을 실행하여 애플리케이션을 시작합니다.

{{% tabs %}}
{{% tab "Poetry" %}}

```shell
poetry run python -m notes_app.app
```

{{% /tab %}}

{{% tab "pip" %}}

```shell
python -m notes_app.app
```

{{% /tab %}}
{{< /tabs >}}

샘플 `notes_app` 애플리케이션은 기본 REST API로 메모리 내부 데이터베이스에 데이터를 보관합니다. 다른 터미널을 열고 `curl`로 다음 몇몇 API 요청을 전송합니다.

`curl -X GET 'localhost:8080/notes'`
: 아직 데이터베이스에 아무것도 없으므로 `{}`을 반환합니다.

`curl -X POST 'localhost:8080/notes?desc=hello'`
: 설명 `hello`와 ID 값 `1`이 포함된 메모를 추가합니다. `( 1, hello)`를 반환합니다.

`curl -X GET 'localhost:8080/notes?id=1'`
: `1` 값이 `id`인 노트를 반환합니다: `( 1, hello)`

`curl -X POST 'localhost:8080/notes?desc=otherNote'`
: 설명 `otherNote`와 ID 값 `2`이 포함된 메모를 추가합니다. `( 2, otherNote)`를 반환합니다.

`curl -X GET 'localhost:8080/notes'`
: 데이터베이스의 내용을 반환합니다: `{ "1": "hello", "2": "otherNote" }`

`curl -X PUT 'localhost:8080/notes?id=1&desc=UpdatedNote'`
: 첫 번째 노트의 설명 값을 `UpdatedNote`로 업데이트합니다.

`curl -X DELETE 'localhost:8080/notes?id=1'`
: 데이터베이스에서 첫 번째 노트를 삭제합니다.

API 호출을 더 실행하여 애플리케이션이 작동하는지 확인합니다. 해당 작업을 완료했으면 Ctrl+C를 입력하여 애플리케이션을 중지합니다.

## Datadog 추적 설치

다음으로 Poetry 또는 pip(최소 버전 18)로 추적 라이브러리를 설치합니다. `apm-tutorial-python` 디렉터리에서 다음을 실행합니다.

{{< tabs >}}
{{% tab "Poetry" %}}

```shell
poetry add ddtrace
poetry install

```

{{% /tab %}}
{{% tab "pip" %}}

```shell
pip install ddtrace
```

{{% /tab %}}
{{< /tabs >}}

## Python 애플리케이션을 자동 계측으로 실행합니다.

트레이스 생성 및 수집을 시작하려면, 이전과 조금 다른 방식으로 샘플 애플리케이션을 다시 시작합니다. 다음을 실행합니다.

{{< tabs >}}
{{% tab "Poetry" %}}

```shell
DD_SERVICE=notes DD_ENV=dev DD_VERSION=0.1.0 \
 poetry run ddtrace-run python -m notes_app.app

```

{{% /tab %}}
{{% tab "pip" %}}

```shell
DD_SERVICE=notes DD_ENV=dev DD_VERSION=0.1.0 \
 ddtrace-run python -m notes_app.app
```

{{% /tab %}}
{{< /tabs >}}

이 명령은 `DD_SERVICE`, `DD_VERSION`, `DD_ENV` 환경 변수를 설정하여 [통합 서비스 태깅][10]을 활성화합니다. 이를 통해 Datadog 전반의 데이터 상관관계를 분석할 수 있습니다.

`curl`을 다시 사용해 애플리케이션에 요청 전송:

`curl -X GET 'localhost:8080/notes'`
: `{}`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `( 1, hello)`

`curl -X GET 'localhost:8080/notes?id=1'`
: `( 1, hello)`

`curl -X POST 'localhost:8080/notes?desc=newNote'`
: `( 2, newNote)`

`curl -X GET 'localhost:8080/notes'`
: `{ "1": "hello", "2": "newNote" }`

잠시 기다린 다음 Datadog UI를 살펴보세요. [**APM > Traces**][11]로 이동합니다. 트레이스 목록은 다음과 같은 콘텐츠를 표시합니다.

{{< img src="tracing/guide/tutorials/tutorial-python-host-traces.png" alt="호스트에서 들어오는 트레이스 데이터를 표시하는 트레이스 보기." style="width:100%;" >}}

트레이스를 확인할 수 없는 경우, Traces Search 필드의 모든 필터를 지웁니다(간혹 사용하지 않는 `ENV` 등의 환경 변수로 필터링되는 경우가 있습니다.).

### 트레이스 검사

Traces 페이지에서 `POST /notes` 트레이스를 클릭하면 각 스팬 소요 시간 및 스팬 완료 전 발생한 기타 스팬을 표시하는 플레임 그래프를 확인할 수 있습니다. 그래프 상단의 막대는 이전 화면에서 선택한 스팬입니다. (이 경우 메모 애플리케이션의 최초 엔트리 포인트입니다.)

바의 너비는 완료되는 데 소요된 시간을 나타냅니다. 낮은 깊이의 막대는 높은 깊이의 막대 수명 동안 완료된 스팬을 나타냅니다.

`POST` 트레이스의 불꽃 그래프는 이와 비슷한 형태입니다.

{{< img src="tracing/guide/tutorials/tutorial-python-host-post-flame.png" alt="POST 트레이스의 플레임 그래프." style="width:100%;" >}}

`GET /notes` 트레이스는 이와 비슷한 형태입니다.

{{< img src="tracing/guide/tutorials/tutorial-python-host-get-flame.png" alt="GET 트레이스의 플레임 그래프." style="width:100%;" >}}


## 파이썬 애플리케이션에 커스텀 계측 추가

자동 계측은 편리하지만 때때로 더욱 세분화된 스팬을 원할 수 있습니다. Datadog의 파이썬 DD 트레이스 API를 사용하면 주석이나 코드로 코드 내 스팬을 지정할 수 있습니다.

다음 단계는 코드에 주석을 추가하여 일부 샘플 메서드를 추적하는 방법을 안내합니다.

1. `notes_app/notes_helper.py`를 엽니다.
2. 다음 가져오기 추가:
   {{< code-block lang="python" >}}
from ddtrace import tracer{{< /code-block >}}

3. `NotesHelper` 클래스 내, `notes_helper`로 불리우는 트레이서 래퍼를 추가해 `notes_helper.long_running_process` 메서드가 작동하는 방법을 더 효과적으로 확인합니다.
   {{< code-block lang="python" >}}class NotesHelper:

    @tracer.wrap(service="notes_helper")
    def long_running_process(self):
        time.sleep(.3)
        logging.info("Hello from the long running process")
        self.__private_method_1(){{< /code-block >}}

   이제 트레이서가 자동으로 리소스에 사용된 함수 이름으로 리소스 레이블을 지정합니다. 이 경우에는 `long_running_process`입니다.

4. 일부 HTTP 요청, 특히 `GET` 요청을 다시 전송합니다.
5. 트레이스 탐색기에서 새로운 `GET` 요청 중 하나를 클릭한 다음 이와 같은 불꽃 그래프를 확인하세요.

   {{< img src="tracing/guide/tutorials/tutorial-python-host-custom-flame.png" alt="커스텀 계측을 활용한 GET 트레이스의 플레임 그래프." style="width:100%;" >}}

   `get_notes` 함수가 커스텀 트레이싱을 포함하므로 스택 트레이스에서 상위 수준의 상세 정보를 확인할 수 있습니다.

자세한 정보는 [커스텀 계측][12]을 참조하세요.

## 두 번째 애플리케이션을 추가해 분산된 트레이스를 확인하세요.

단일 애플리케이션 추적은 좋은 시작이지만 추적의 진정한 가치는 서비스를 통한 요청의 흐름을 확인하는 데 있습니다. 이것을 _분산 추적_이라고 부릅니다.

샘플 프로젝트에 `calendar_app`로 불리는 두 번째 애플리케이션이 포함되어 있습니다. 이 애플리케이션은 호출 시 임의의 날짜를 반환합니다. 메모 애플리케이션의 `POST` 엔드포인트는 `add_date`란 이름의 두 번째 쿼리 파라미터를 포함합니다. `y`로 설정되어 있는 경우 메모는 캘린더 애플리케이션을 호출하여 메모에 추가할 날짜를 가져옵니다.

1. 다음을 실행해 캘린더 애플리케이션을 시작합니다.

   {{< tabs >}}
   {{% tab "Poetry" %}}

   ```shell
   DD_SERVICE=notes DD_ENV=dev DD_VERSION=0.1.0 \
   poetry run ddtrace-run python -m calendar_app.app

   ```

   {{% /tab %}}
   {{% tab "pip" %}}

   ```shell
   DD_SERVICE=calendar DD_ENV=dev DD_VERSION=0.1.0 \
   ddtrace-run python -m calendar_app.app
   ```

   {{% /tab %}}
   {{< /tabs >}}

2. `add_date` 파라미터를 사용하여 POST 요청을 보냅니다.

   `curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'`
   : `(2, hello_again with date 2022-11-06)`


3. 트레이스 탐색기에서 다음 최신 트레이스를 클릭하여 두 서비스 간의 분산 트레이스를 확인하세요.

   {{< img src="tracing/guide/tutorials/tutorial-python-host-distributed.png" alt="분산 트레이스의 플레임 그래프." style="width:100%;" >}}

## 더 많은 커스텀 계측 추가

코드를 사용하여 커스텀 계측을 추가할 수 있습니다. 트레이스를 더 효과적으로 확인하기 위해 캘린더 서비스를 추가로 계측한다고 가정해 보겠습니다.

1. `notes_app/notes_logic.py`를 엽니다.
2. 다음 가져오기 추가:

   ```python
   from ddtrace import tracer
   ```
3. `try` 블록 내, 약 28줄 근처에 다음 `with` 구문을 추가합니다.

   ```python
   with tracer.trace(name="notes_helper", service="notes_helper", resource="another_process") as span:
   ```
   결과:
   {{< code-block lang="python" >}}
def create_note(self, desc, add_date=None):
        if (add_date):
            if (add_date.lower() == "y"):
                try:
                    with tracer.trace(name="notes_helper", service="notes_helper", resource="another_process") as span:
                        self.nh.another_process()
                    note_date = requests.get(f"http://localhost:9090/calendar")
                    note_date = note_date.text
                    desc = desc + " with date " + note_date
                    print(desc)
                except Exception as e:
                    print(e)
                    raise IOError("Cannot reach calendar service.")
        note = Note(description=desc, id=None)
        note.id = self.db.create_note(note){{< /code-block >}}

4. `add_date` 인수를 사용하여 추가 HTTP 요청, 특히 `POST` 요청을 보냅니다.
5. 트레이스 탐색기에서 다음 새 `POST` 트레이스 중 하나를 클릭하면 여러 서비스에 대한 커스텀 트레이스를 볼 수 있습니다.
   {{< img src="tracing/guide/tutorials/tutorial-python-host-cust-dist.png" alt="커스텀 계측이 적용된 분산 트레이스의 플레임 그래프." style="width:100%;" >}}
   새로운 스팬이 `notes_helper.another_process` 레이블 값을 가지니 참고하세요.

예상대로 트레이스 수신되지 않으면 `ddtrace` 파이선 패키지에서 디버그 모드를 설정하세요. 자세한 내용은 [디버그 모드 활성화][13]를 읽어보세요.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/guide/#enabling-tracing-tutorials
[2]: /ko/tracing/trace_collection/dd_libraries/python/
[3]: /ko/account_management/api-app-keys/
[4]: /ko/tracing/trace_collection/compatibility/python/
[5]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[6]: /ko/getting_started/site/
[7]: https://ddtrace.readthedocs.io/en/stable/versioning.html
[8]: https://app.datadoghq.com/event/explorer
[9]: https://github.com/DataDog/apm-tutorial-python
[10]: /ko/getting_started/tagging/unified_service_tagging/#non-containerized-environment
[11]: https://app.datadoghq.com/apm/traces
[12]: /ko/tracing/trace_collection/custom_instrumentation/python/
[13]: /ko/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode