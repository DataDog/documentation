---
further_reading:
- link: /tracing/trace_collection/library_config/python/
  tags: 설명서
  text: 추가 추적 라이브러리 설정 옵션
- link: /tracing/trace_collection/dd_libraries/python/
  tags: 설명서
  text: 상세한 추적 라이브러리 설정 지침
- link: /tracing/trace_collection/compatibility/python/
  tags: 설명서
  text: 자동 계측에 지원되는 파이썬 프레임워크
- link: /tracing/trace_collection/custom_instrumentation/python/
  tags: 설명서
  text: 수동으로 트레이스와 스팬 설정하기
- link: https://github.com/DataDog/dd-trace-py
  tags: GitHub
  text: 추적 라이브러리 오픈 소스 리포지토리
kind: 가이드
title: 튜토리얼 - 컨테이너에서 파이썬(Python) 애플리케이션 및 Datadog 에이전트에 대한 추적 활성화
---

## 개요

이 튜토리얼은 컨테이너에 설치된 샘플 파이썬 애플리케이션에서 추적을 활성화하는 단계를 안내합니다. 이 시나리오에서는 Datadog 에이전트도 컨테이너에 설치됩니다.

{{< img src="tracing/guide/tutorials/tutorial-python-containers-overview.png" alt="이 튜토리얼의 설치 시나리오를 표시한 도표" style="width:100%;" >}}

호스트 애플리케이션 및 에이전트, 컨테이너 애플리케이션, 호스트 에이전트, 다른 언어로 작성된 애플리케이션을 포함하는 애플리케이션을 포함하는 다른 시나리오의 경우 기타 [추적 활성화 튜토리얼][1]을 참조하세요.

[파이썬 추적 애플리케이션][2] 설명서에서 파이썬 추적 설정에 대한 포괄적인 정보를 확인하세요.

### 전제 조건

- Datadog 계정과 [조직 API 키][3]
- Git
- [추적 라이브러리 요구 사항][4]을 충족하는 파이썬

## 도커(Docker)화된 샘플 파이쎤 애플리케이션 설치

이 튜토리얼의 코드 샘플은 GitHub의 [github.com/Datadog/apm-tutorial-python][9]에 있습니다. 시작하려면 리포지토리를 복제하세요.

{{< code-block lang="sh" >}}
git clone https://github.com/DataDog/apm-tutorial-python.git
{{< /code-block >}}

리포지토리에는 도커 컨테이너 내에서 실행되도록 사전 설정된 다중 서비스 파이썬 애플리케이션이 포함되어 있습니다. 샘플 앱은 데이터를 추가하고 변경하기 위한 REST API가 포함된 기본 메모 앱입니다.

### 샘플 애플리케이션 시작 및 실행

1. 실행별 애플리케이션 컨테이너 빌드:

   {{< code-block lang="sh" >}}
docker-compose -f docker/containers/exercise/docker-compose.yaml build notes_app
{{< /code-block >}}

2. 컨테이너 시작:

   {{< code-block lang="sh" >}}
docker-compose -f docker/containers/exercise/docker-compose.yaml up db notes_app
{{< /code-block >}}

   터미널에서 다음 출력을 확인할 수 있는 경우 애플리케이션 사용 준비가 완료된 것입니다.

   ```
   notes          |  * Debug mode: on
   notes          | INFO:werkzeug:WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
   notes          |  * Running on all addresses (0.0.0.0)
   notes          |  * Running on http://127.0.0.1:8080
   notes          |  * Running on http://192.168.32.3:8080
   notes          | INFO:werkzeug:Press CTRL+C to quit
   notes          | INFO:werkzeug: * Restarting with stat
   notes          | WARNING:werkzeug: * Debugger is active!
   notes          | INFO:werkzeug: * Debugger PIN: 143-375-699
   ```

   또한 `docker ps` 명령을 사용해 실행되는 컨테이너를 확인하여 실행 여부를 체크할 수 있습니다.

3. 또 다른 터미널을 열고 API 요청을 전송해 앱을 실행합니다. 메모 애플리케이션은 또 다른 컨테이너에서 실행되는 Postgres 데이터베이스에 데이터를 저장하는 REST API입니다. 몇몇 명령을 전송합니다.

`curl -X GET 'localhost:8080/notes'`
: `{}`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `(1, hello)`

`curl -X GET 'localhost:8080/notes?id=1'`
: `(1, hello)`

`curl -X GET 'localhost:8080/notes'`
: `{”1”, "hello"}`

`curl -X PUT 'localhost:8080/notes?id=1&desc=UpdatedNote'`
: `(1, UpdatedNote)`

`curl -X DELETE 'localhost:8080/notes?id=1'`
: `Deleted`

### 애플리케이션 중지

애플리케이션 실행을 확인한 후 추적을 활성화할 수 있도록 중단합니다.

1. 컨테이너 중단:
   {{< code-block lang="sh" >}}
docker-compose -f docker/containers/exercise/docker-compose.yaml down
{{< /code-block >}}

2. 컨테이너 제거:
   {{< code-block lang="sh" >}}
docker-compose -f docker/containers/exercise/docker-compose.yaml rm
{{< /code-block >}}

## 추적 활성화

이제 작동하는 파이썬 애플리케이션이 있으므로 설정을 통해 추적을 활성화하세요.

1. 파이선 추적 패키지를 프로젝트에 추가하세요. `apm-tutorial-python/requirements.txt` 파일을 열고 존재하지 않는 경우 목록에 `ddtrace`를 추가합니다.

   ```
   flask==2.2.2
   psycopg2-binary==2.9.3
   requests==2.28.1
   ddtrace
   ```

2. 메모 애플리케이션인 Dockerfile 내에 `docker/containers/exercise/Dockerfile.notes`가 존재합니다. 애플리케이션을 시작하는 CMD 명령을 변경해 `ddtrace` 패키지를 사용합니다.

   ```
   # Run the application with Datadog 
   CMD ["ddtrace-run", "python", "-m", "notes_app.app"]
   ```

   자동으로 Datadog 서비스를 포함하는 애플리케이션을 계측합니다.

3. 각기 다른 버전과 배포 환경에서 추적된 서비스를 식별하는 [범용 서비스 태그][10]를 적용하여 Datadog와 연계되도록 합니다. 그러면 태그를 사용해 검색하고 필터링할 수 있습니다. 범용 서비스 태그에 사용되는 세 가지 환경 변수는 `DD_SERVICE`, `DD_ENV` 및 `DD_VERSION`입니다. Dockerfile에서 다음 환경 변수를 추가합니다.

   ```
   ENV DD_SERVICE="notes"
   ENV DD_ENV="dev"
   ENV DD_VERSION="0.1.0"
   ```

4. 범용 서비스 태그와 대응되는 도커(Docker) 레이블을 추가합니다. 이를 통해 애플리케이션이 실행되면 도커 메트릭을 확보할 수 있습니다.

   ```
   LABEL com.datadoghq.tags.service="notes"
   LABEL com.datadoghq.tags.env="dev"
   LABEL com.datadoghq.tags.version="0.1.0"
   ```

올바르게 설정했는지 확인하려면 Dockerfile 파일을 샘플 리포지토리 솔루션 파일에 제공된 것, `docker/containers/solution/Dockerfile.notes`와 비교합니다.

## 에이전트 컨테이너 추가

`docker/containers/exercise/docker-compose.yaml` 파일의 서비스 섹션에 Datadog 에이전트 추가

1. 에이전트 설정 추가 및 자체적인 Datadog API 키[3]와 [사이트][6] 지정
   ```yaml
     datadog:
       container_name: dd-agent
       image: "gcr.io/datadoghq/agent:latest"
       environment:
          - DD_API_KEY=<DD_API_KEY>
          - DD_SITE=datadoghq.com  # Default. Change to eu.datadoghq.com, us3.datadoghq.com, us5.datadoghq.com as appropriate for your org
          - DD_APM_ENABLED=true    # Enable APM
       volumes: 
          - /var/run/docker.sock:/var/run/docker.sock:ro 
          - /proc/:/host/proc/:ro
          - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
   ```

2. 환경 변수 `DD_AGENT_HOST`를 추가하고 모니터링하려는 코드를 사용해 각 컨테이너 섹션에 에이전트 컨테이너 호스트 이름(이 예에서는 `notes_app` 컨테이너)을 지정합니다.
   ```yaml
       environment:
        - DD_AGENT_HOST=datadog
   ```

올바르게 설정하였는지 확인하려면 `docker-compose.yaml` 파일을 샘플 리포지토리 솔루션 파일 `docker/containers/solution/docker-compose.yaml`과 비교합니다.

## 컨테이너를 시작해 자동 추적을 확인합니다.

이제 추적 라이브러리가 설치되었습니다. 애플리케이션을 재시작하고 트레이스 수신을 시작합니다. 다음 명령을 실행합니다.

```
docker-compose -f docker/containers/exercise/docker-compose.yaml build notes_app
docker-compose -f docker/containers/exercise/docker-compose.yaml up db datadog notes_app
```

터미널에서 지속적인 출력을 관찰하여 에이전트가 작동하고 있는지 확인할 수 있습니다. 혹은 Datadog에서 [이벤트 탐색기][8]를 열어 에이전트 시작 이벤트를 확인할 수 있습니다.

{{< img src="tracing/guide/tutorials/tutorial-python-container-agent-start-event.png" alt="이벤트 탐색기에 표시된 에이전트 시작 이벤트" style="width:100%;" >}}

실행되는 애플리케이션에서 CURL 요청을 전송합니다.

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `(1, hello)`

`curl -X GET 'localhost:8080/notes?id=1'`
: `(1, hello)`

`curl -X PUT 'localhost:8080/notes?id=1&desc=UpdatedNote'`
: `(1, UpdatedNote)`

`curl -X DELETE 'localhost:8080/notes?id=1'`
: `Deleted`

잠시 기다린 다음 Datadog에서  [**APM > 트레이스**][11]로 이동합니다. API 호출과 대응되는 트레이스 목록을 확인할 수 있습니다.

{{< img src="tracing/guide/tutorials/tutorial-python-container-traces.png" alt="트레이스 탐색기의 샘플 앱 트레이서" style="width:100%;" >}}

몇 분이 지난 후에도 트레이스를 확인할 수 없다면 트레이스 검색 필드에서 모든 필터를 해제합니다. 때론 사용하지 않는 `ENV` 등 환경 변수에 대해 필터링되었을 수 있습니다.

### 트레이스 검사

트레이스 페이지에서 `POST /notes` 트레이스를 클릭해 각 스팬에 걸리는 시간 및 스팬 완료 전 발생한 다른 스팬을 보여주는 불꽃 그래프를 확인할 수 있습니다. 그래프 상단의 막대는 이전 화면에서 선택한 스팬입니다. (이 경우 메모 애플리케이션의 최초 엔트리 포인트입니다.)

막대의 너비는 완료된 데 걸린 시간을 나타냅니다. 깊이가 얕은 막대는 더 굵은 깊이의 막대 수명 동안 완료된 스팬을 나타냅니다.

`POST` 트레이스의 불꽃 그래프는 이와 비슷한 형태입니다.

{{< img src="tracing/guide/tutorials/tutorial-python-container-post-flame.png" alt="POST 트레이스의 불꽃 그래프" style="width:100%;" >}}

`GET /notes` 트레이스는 이와 비슷한 형태입니다.

{{< img src="tracing/guide/tutorials/tutorial-python-container-get-flame.png" alt="GET 트레이스의 불꽃 그래프" style="width:100%;" >}}


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

4. 실행별로 컨테이너를 다시 빌드합니다.
   {{< code-block lang="sh" >}}
docker-compose -f docker/containers/exercise/docker-compose.yaml build notes_app
docker-compose -f docker/containers/exercise/docker-compose.yaml up db datadog notes_app
{{< /code-block >}}
4. 일부 HTTP 요청, 특히 `GET` 요청을 다시 전송합니다.
5. 트레이스 탐색기에서 새로운 `GET` 요청 중 하나를 클릭한 다음 이와 같은 불꽃 그래프를 확인하세요.

   {{< img src="tracing/guide/tutorials/tutorial-python-container-custom-flame.png" alt="커스텀 계측을 통한 GET 트레이스 불꽃 그래프" style="width:100%;" >}}

   `get_notes` 함수가 커스텀 트레이싱을 포함하므로 스택 트레이스에서 상위 수준의 상세 정보를 확인할 수 있습니다.

자세한 정보는 [커스텀 계측][12]을 참조하세요.

## 두 번째 애플리케이션을 추가해 분산된 트레이스를 확인하세요.

단일 애플리케이션을 추적하는 것은 좋은 시작이지만 트레이싱의 진정한 가치는 서비스에 대한 요청 흐름을 확인하는 데 있습니다. 이를 _분산 트레이싱_이라고 부릅니다.

샘플 프로젝트에 `calendar_app`로 불리는 두 번째 애플리케이션이 포함되어 있습니다. 이 애플리케이션은 호출 시 임의의 날짜를 반환합니다. 메모 애플리케이션의 `POST` 엔드포인트는 `add_date`란 이름의 두 번째 쿼리 파라미터를 포함합니다. `y`로 설정되어 있는 경우 메모는 캘린더 애플리케이션을 호출하여 메모에 추가할 날짜를 가져옵니다.

1. 이전에 메모 앱에서 했던 것과 마찬가지로 `dd_trace`을 Dockerfile의 시작 명령에 추가하여 추적에 대해 캘린더 앱을 설정합니다. `docker/containers/exercise/Dockerfile.calendar`를 열고 이와 같이 CMD 명령줄을 업데이트합니다.
   ```
   CMD ["ddtrace-run", "python", "-m", "calendar_app.app"] 
   ```

3. 메모 앱에서와 마찬가지로 범용 서비스 태그를 적용합니다. `Dockerfile.calendar` 파일에 다음 환경 변수를 추가합니다.

   ```
   ENV DD_SERVICE="calendar"
   ENV DD_ENV="dev"
   ENV DD_VERSION="0.1.0"
   ```

4. 다시 한번 범용 서비스 태그에 해당하는 도커 레이블을 추가하면 애플리케이션이 실행된 후 도커 메트릭을 확보할 수도 있습니다.

   ```
   LABEL com.datadoghq.tags.service="calendar"
   LABEL com.datadoghq.tags.env="dev"
   LABEL com.datadoghq.tags.version="0.1.0"
   ```

2. 추적을 올바른 위치로 보내려면 에이전트 컨테이너 호스트 이름 `DD_AGENT_HOST`을 캘린더 애플리케이션 컨테이너에 추가하세요. `docker/containers/exercise/docker-compose.yaml`을 열고 다음 줄을 `calendar_app` 섹션에 추가합니다.

   ```yaml
       environment:
        - DD_AGENT_HOST=datadog
   ```

   올바르게 설정했는지 확인하려면 샘플 리포지토리 `docker/containers/solution` 디렉터리에 제공된 Dockerfile 및 `docker-config.yaml` 파일과 설정을 비교하세요.

5. 컨테이너를 다시 시작하여 다중 서비스 애플리케이션을 빌드합니다. 먼저 실행 중인 모든 컨테이너를 중단합니다.
   ```
   docker-compose -f docker/containers/exercise/docker-compose.yaml down
   ```

   그런 다음 다음 명령을 실행하여 시작하세요.
   ```
   docker-compose -f docker/containers/exercise/docker-compose.yaml build
   docker-compose -f docker/containers/exercise/docker-compose.yaml up
   ```

6. `add_date` 파라미터를 사용하여 POST 요청을 보냅니다.

`curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'`
: `(2, hello_again with date 2022-11-06)`


7. 트레이스 탐색기에서 다음 최신 트레이스를 클릭하여 두 서비스 간의 분산 트레이스를 확인하세요.

   {{< img src="tracing/guide/tutorials/tutorial-python-container-distributed.png" alt="분산 트레이스에 대한 불꽃 그래프" style="width:100%;" >}}

## 더 많은 커스텀 계측 추가

코드를 사용하여 커스텀 계측을 추가할 수 있습니다. 트레이스를 더 효과적으로 확인하기 위해 캘린더 서비스를 추가로 계측한다고 가정해 보겠습니다.

1. `notes_app/notes_logic.py`를 엽니다.
2. 다음 가져오기 추가

   ```python
   from ddtrace import tracer
   ```
3. `try` 블록 내, 약 28줄 근처에 다음 `with` 구문을 추가합니다.

   ```python
   with tracer.trace(name="notes_helper", service="notes_helper", resource="another_process") as span:
   ```
   결과:
   {{< code-block lang="파이썬(Python)" >}}
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

4. 컨테이너 다시 빌드:
   ```
   docker-compose -f docker/containers/exercise/docker-compose.yaml build notes_app
   docker-compose -f docker/containers/exercise/docker-compose.yaml up
   ```

5. `add_date` 인수를 사용하여 추가 HTTP 요청, 특히 `POST` 요청을 보냅니다.
6. 트레이스 탐색기에서 다음 새 `POST` 트레이스 중 하나를 클릭하면 여러 서비스에 대한 커스텀 트레이스를 볼 수 있습니다.
   {{< img src="tracing/guide/tutorials/tutorial-python-container-cust-dist.png" alt="커스텀 계측을 사용한 분산 추적에 대한 불꽃 그래프" style="width:100%;" >}}
   새로운 스팬이 `notes_helper.another_process` 레이블 값을 가지니 참고하세요.

예상대로 트레이스 수신되지 않으면 `ddtrace` 파이선 패키지에서 디버그 모드를 설정하세요. 자세한 내용은 [디버그 모드 활성화][13]를 읽어보세요.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/guide/#enabling-tracing-tutorials
[2]: /ko/tracing/trace_collection/dd_libraries/python/
[3]: /ko/account_management/api-app-keys/
[4]: /ko/tracing/trace_collection/compatibility/python/
[6]: /ko/getting_started/site/
[8]: https://app.datadoghq.com/event/explorer
[9]: https://github.com/DataDog/apm-tutorial-python
[10]: /ko/getting_started/tagging/unified_service_tagging/
[11]: https://app.datadoghq.com/apm/traces
[12]: /ko/tracing/trace_collection/custom_instrumentation/python/
[13]: /ko/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode