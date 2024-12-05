---
further_reading:
- link: /tracing/trace_collection/library_config/go/
  tags: 설명서
  text: 추가 추적 라이브러리 설정 옵션
- link: /tracing/trace_collection/dd_libraries/go/
  tags: 설명서
  text: 상세한 추적 라이브러리 설정 지침
- link: /tracing/trace_collection/compatibility/go/
  tags: 설명서
  text: 자동 계측에 지원되는 고 프레임워크
- link: /tracing/trace_collection/custom_instrumentation/go/
  tags: 설명서
  text: 수동으로 트레이스와 스팬 설정하기
- link: /tracing/trace_pipeline/ingestion_mechanisms/
  tags: 설명서
  text: 수집 매커니즘
- link: https://github.com/DataDog/dd-trace-Go
  tags: GitHub
  text: 추적 라이브러리 오픈 소스 리포지토리
title: 튜토리얼 - 컨테이너의 고(Go) 애플리케이션 및 Datadog 에이전트에 대한 추적 활성화
---

## 개요

본 튜토리얼은 컨테이너에 설치된 샘플 고 애플리케이션에서 추적을 활성화하는 단계를 안내합니다. 이 시나리오에서 Datadog 에이전트도 컨테이너에 설치되어 있습니다.

호스트 애플리케이션 및 에이전트, 클라우드 인프라스트럭처 애플리케이션 및 에이전트, 다른 언어로 작성된 애플리케이션을 포함하는 기타 시나리오의 경우 다른 [추적 활성화 튜토리얼][1]을 참조하세요. 

고에 대한 일반적인 추적 단계 설명서는 [고 애플리케이션 추적][2]을 참조하세요.

### 전제 조건

- Datadog 계정과 [조직 API 키][3]
- Git
- 도커(Docker)
- Curl
- 고 버전 1.18 이상
- 제조사 및 GCC

## 컨테이너화된 샘플 고 애플리케이션 설치

이 튜토리얼을 위한 코드 샘플은 GitHub([github.com/DataDog/apm-tutorial-golang.git][9])에 있습니다. 시자하려면 GIT 리포지토리를 복제하세요.

{{< code-block lang="shell" >}}
git clone https://github.com/DataDog/apm-tutorial-golang.git
{{< /code-block >}}

리포지토리는 도커(Docker) 컨테이너 내에서 실행되도록 설정된 다중 서비스 고 애플리케이션을 포함합니다. 샘플 앱은 기본 메모 앱과 일정 앱으로 구성되어 있으며 각각에 REST API가 포함되어 데이터를 추가하고 변경할 수 있습니다 `docker-compose` YAML 파일은 `docker` 디렉터리에 있습니다.

이 튜토리얼에서는 `all-docker-compose.yaml` 파일을 사용합니다. 파일은 메모 및 일정 애플리케이션과 Datadog 에이전트 모두에 대한 컨테이너를 빌드합니다.

### 샘플 애플리케이션 시작 및 실행

1. 애플리케이션 컨테이너 빌드 실행:
   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml build{{< /code-block >}}

1. 컨테이너 시작:

   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml up -d{{< /code-block >}}

1. `docker ps` 명령을 사용해 컨테이너가 실행되는지 확인합니다. 다음과 같은 콘텐츠를 확인할 수 있어야 합니다.
   {{< code-block lang="shell" disable_copy="true" >}}
   컨테이너 ID   이미지                           명령                  생성              상태                          포트                    이름
   0a4704ebed09   docker-notes                    "./cmd/notes/notes"      1분 전   약 1분               0.0.0.0:8080->8080/tcp   notes
   9c428d7f7ad1   docker-calendar                 "./cmd/calendar/cale..."   1분 전   약 1분               0.0.0.0:9090->9090/tcp   calendar
   b2c2bafa6b36   gcr.io/datadoghq/agent:latest   "/bin/entrypoint.sh"     1분 전   약 1분(비정상)   8125/udp, 8126/tcp       datadog-ag
   {{< /code-block >}}

1. 샘플 `notes` 애플리케이션은 기본 REST API로 메모리 내부 데이터베이스에 데이터를 보관합니다. `curl`을 사용하여 몇몇 API 요청을 전송합니다.

   `curl localhost:8080/notes`
   : 아직 데이터베이스에 아무 것도 없기 때문에 `[]`을 반환합니다. 

   `curl -X POST 'localhost:8080/notes?desc=hello'`
   : `hello` 설명 및 `1` ID 값과 함께 메모를 추가합니다. `{"id":1,"description":"hello"}`을 반환합니다.

   `curl localhost:8080/notes/1`
   : `1`의 `id` 값을 포함한 메모를 반환합니다. `{"id":1,"description":"hello"}`

   `curl -X POST 'localhost:8080/notes?desc=otherNote'`
   : `otherNote` 설명과 `2` ID 값을 포함한 메모를 추가합니다. `{"id":2,"description":"otherNote"}`를 반환합니다.

   `curl localhost:8080/notes`
   데이터베이스 콘텐츠를 반환합니다. `[{"id":1,"description":"hello"},{"id";2,"description":"otherNote"}]`

1. 더 많은 API 호출을 실행하여 작동 중인 애플리케이션을 확인합니다. 완료되면 컨테이너를 종료하고 제거합니다. 컨테이너가 제거되었는지 확인하세요.
   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml down
   docker-compose -f all-docker-compose.yaml rm{{< /code-block >}}

## 추적 활성화

다음으로 고 애플리케이션을 설정하여 추적을 활성화합니다. 에이전트가 컨테이너에서 실행되므로 아무 것도 설치할 필요가 없습니다.

추적 지원을 활성화하려면 `apm-tutorial-golang/cmd/notes/main.go`의 가져오기에서 주석을 제거합니다.

{{< code-block lang="go" filename="cmd/notes/main.go" >}}
sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
chitrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi"
httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
{{< /code-block >}}

`main()` 함수에서 다음 줄의 주석을 제거합니다.

{{< code-block lang="go" filename="cmd/notes/main.go" >}}
tracer.Start()
defer tracer.Stop()
{{< /code-block >}}

{{< code-block lang="go" filename="cmd/notes/main.go" >}}
client = httptrace.WrapClient(client, httptrace.RTWithResourceNamer(func(req *http.Request) string {
   return fmt.Sprintf("%s %s", req.Method, req.URL.Path)
}))
{{< /code-block >}}

{{< code-block lang="go" filename="cmd/notes/main.go" >}}
r.Use(chitrace.Middleware(chitrace.WithServiceName("notes")))
{{< /code-block >}}

`setupDB()`에서 다음 줄의 주석을 제거합니다.

{{< code-block lang="go" filename="cmd/notes/main.go" >}}
sqltrace.Register("sqlite3", &sqlite3.SQLiteDriver{}, sqltrace.WithServiceName("db"))
db, err := sqltrace.Open("sqlite3", "file::memory:?cache=shared")
{{< /code-block >}}

다음 줄의 주석을 제거합니다.
{{< code-block lang="go" filename="cmd/notes/main.go" >}}
db, err := sql.Open("sqlite3", "file::memory:?cache=shared")
{{< /code-block >}}

## 에이전트 컨테이너 추가

`all-docker-compose.yaml` 파일의 서비스 섹션에서 Datadog 에이전트를 추가해 에이전트를 빌드에 추가합니다.

1. 에이전트 설정 주석을 제거하고 자체적인 [Datadog API 키][3]를 지정합니다.
   {{< code-block lang="yaml" filename="docker/all-docker-compose.yaml">}}
     Datadog-에이전트:
   컨테이너_이름: Datadog-에이전트
   이미지: "gcr.io/datadoghq/agent:latest"
     pid: 호스트
   환경:
       - DD_API_KEY=<DD_API_KEY_HERE>
       - DD_APM_ENABLED=true
       - DD_APM_NON_LOCAL_TRAFFIC=true
   볼륨:
       - /var/run/docker.sock:/var/run/docker.sock
       - /proc/:/host/proc/:ro
       - /sys/fs/cgroup:/host/sys/fs/cgroup:ro
   {{< /code-block >}}

1. `notes` 컨테이너에서 `datadog-agent`에 대한 `depends_on` 필드의 주석을 제거합니다.

1. `notes` 서비스 섹션에서 `DD_AGENT_HOST` 환경 변수가 에이전트 컨테이너 호스트 이름으로 설정되어 있는지 확인합니다. `notes` 컨테이너 섹션은 다음과 같아야 합니다.
   {{< code-block lang="yaml" filename="docker/all-docker-compose.yaml">}}
   메모:
   컨테이너_이름: 메모
   재시작: 항상
   빌드:
   컨텍스트: ../
   도커 파일: ../dockerfile.notes
   포트:
      - 8080:8080
    레이블:
      - com.datadoghq.tags.service="notes"
      - com.datadoghq.tags.env="dev"
      - com.datadoghq.tags.version="0.0.1"
    환경:
      - DD_SERVICE=notes
      - DD_ENV=dev
      - DD_VERSION=0.0.1
      - DD_AGENT_HOST=datadog-agent
#     - CALENDAR_HOST=calendar
    depends_on:
#     - calendar
      - datadog-agent
   {{< /code-block >}}
   이 튜토리얼의 후반부에서 `calendar` 섹션과 변수를 설정하게 됩니다.

## 컨테이너를 시작해 자동 계측을 탐색합니다.

추적 라이브러리가 설치되었으므로 애플리케이션 컨테이너를 스핀업하고 트레이스 수신을 시작합니다. 다음 명령을 실행합니다.

{{< code-block lang="shell" >}}
docker-compose -f all-docker-compose.yaml build
docker-compose -f all-docker-compose.yaml up -d{{< /code-block >}}

트레이스 생성 및 수집을 시작하려면 `make run`을 사용해 다시 애플리케이션을 시작합니다.

터미널에서 지속적인 출력을 관찰하여 에이전트가 작동하고 있는지 확인할 수 있습니다. 혹은 Datadog에서 [이벤트 탐색기][8]를 열어 에이전트 시작 이벤트를 확인할 수 있습니다.

{{< img src="tracing/guide/tutorials/tutorial-python-container-agent-start-event.png" alt="이벤트 탐색기에 표시된 에이전트 시작 이벤트" style="width:100%;" >}}

`curl`을 다시 사용해 애플리케이션에 요청 전송:

`curl localhost:8080/notes`
: `[]`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes/1`
: `{"id":1,"description":"hello"}`

`curl localhost:8080/notes`
: `[{"id":1,"description":"hello"}]`

잠시 기다린 다음 Datadog UI를 살펴보세요. [**APM > 트레이스**][11]로 이동합니다. 트레이스 목록은 다음과 같은 콘텐츠를 표시합니다.

{{< img src="tracing/guide/tutorials/tutorial-go-host-traces2.png" alt="트레이스 보기는 호스트의 트레이스 데이터를 표시합니다." style="width:100%;" >}}

데이터베이스(`db`) 및 `notes` 앱에 대한 입력 항목입니다. 트레이스 목록은 모든 스팬, 시작 시점, 스팬을 사용해 추적되는 리소스, 소요 시간을 표시합니다.

트레이스를 확인할 수 없는 경우, **트레이스** 검색 필드의 모든 피터를 지웁니다(사용하지 않는 `ENV` 등 환경 변수에서 필터링하는 경우가 있습니다.).

### 트레이스 검사

트레이스 페이지에서 `POST /notes` 트레이스를 클릭하면 각 스팬 소요 시간 및 스팬 완료 전 발생한 기타 스팬을 표시하는 불꽃 그래프를 확인할 수 있습니다. 그래프 상단의 막대는 이전 화면에서 선택한 스팬입니다(이 경우 메모 애플리케이션에서 초기 입력 요소).

바의 너비는 완료되는 데 소요된 시간을 나타냅니다. 낮은 깊이의 막대는 높은 깊이의 막대 수명 동안 완료된 스팬을 나타냅니다.

`POST` 트레이스의 불꽃 그래프는 이와 비슷한 형태입니다.

{{< img src="tracing/guide/tutorials/tutorial-go-host-post-flame.png" alt="A flame graph for a POST trace." style="width:100%;" >}}

`GET /notes` 트레이스는 이와 비슷한 형태입니다.

{{< img src="tracing/guide/tutorials/tutorial-go-host-get-flame.png" alt="GET 트레이스의 불꽃 그래프입니다." style="width:100%;" >}}

## 추적 설정

추적 라이브러리를 설정하여 Datadog가 전송하는 텔레메트리에 태그를 추가할 수 있습니다. 태그는 대시보드와 그래프에서 데이터를 그룹화 또는 필터링하고 이를 의미 있는 방법으로 표시할 수 있도록 지원합니다. 태그를 추가하려면, 애플리케이션 실행 시 환경 변수를 지정합니다. 프로젝트  `Makefile`는 환경 변수 `DD_ENV`, `DD_SERVICE` 및 `DD_VERSION`를 포함하며 해당 변수는 [통합 서비스 태깅][17]을 활성화하도록 설정되어 있습니다.

{{< code-block lang="go" filename="docker/all-docker-compose.yaml" disable_copy="true" >}}
environment:
  - DD_API_KEY=<DD_API_KEY_HERE>
  - DD_APM_ENABLED=true
  - DD_APM_NON_LOCAL_TRAFFIC=true
{{< /code-block >}}

사용 가능한 설정 옵션에 대한 자세한 정보는 [고 추적 라이브러리 설정][14]을 참조하세요.

### 자동 트레이싱 라이브러리 사용

Datadog는 코드에 구현하면 자동 추적을 허용하고 완전한 지원을 제공하는 고 애플리케이션용 라이브러리를 보유하고 있습니다.  `cmd/notes/main.go` 파일에서 `go-chi`, `sql` 및 `http` 라이브러리는 각각 해당되는 Datadog 라이브러리인 `chitrace`, `sqltrace` 및 `httptrace`에 연결되어 있습니다.

{{< code-block lang="go" filename="cmd/notes/main.go" disable_copy="true" collapsible="true" >}}
import (
  ...

  sqltrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql"
  chitrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi"
  httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
  ...
)
{{< /code-block >}}

`cmd/notes/main.go`에서 Datadog 라이브러리는 `WithServiceName` 옵션을 사용해 초기화됩니다. 예를 들어 `chitrace` 라이브러리는 다음과 같이 초기화됩니다.

{{< code-block lang="go" filename="cmd/notes/main.go" disable_copy="true" collapsible="true" >}}
r := chi.NewRouter()
r.Use(middleware.Logger)
r.Use(chitrace.Middleware(chitrace.WithServiceName("notes")))
r.Mount("/", nr.Register())
{{< /code-block >}}

`chitrace.WithServiceName("notes")`를 사용하면 라이브러리가 추적하는 모든 요소가 서비스 이름 `notes` 아래에 있는지 확인합니다.

`main.go` 파일은 이러한 각 라이브러리에 대한 더 많은 구현 예시를 포함합니다. 라이브러리 확장 목록을 보려면 [고 호환성 요구 사항][16]을 참조하세요.

### 컨텍스트 포함 커스텀 트레이싱 사용

코드가 지원되는 라이브러리에 해당하지 않으면 수동으로 스팬을 생성할 수 있습니다.

`notes/notesController.go`에서 `makeSpanMiddleware` 함수 관련 코멘트를 제거합니다. 해당 함수는 제공된 이름의 스팬에서 요청을 래핑하는 미들웨어를 생성합니다. 이 함수를 사용하려면 다음 줄을 코멘트 아웃합니다.

{{< code-block lang="go" filename="notes/notesController.go" disable_copy="true" collapsible="true" >}}
r.Get("/notes", nr.GetAllNotes)                // GET /notes
r.Post("/notes", nr.CreateNote)                // POST /notes
r.Get("/notes/{noteID}", nr.GetNoteByID)       // GET /notes/123
r.Put("/notes/{noteID}", nr.UpdateNoteByID)    // PUT /notes/123
r.Delete("/notes/{noteID}", nr.DeleteNoteByID) // DELETE /notes/123
{{< /code-block >}}

다음 줄의 코멘트를 제거합니다.

{{< code-block lang="go" disable_copy="true" filename="notes/notesController.go" collapsible="true" >}}
r.Get("/notes", makeSpanMiddleware("GetAllNotes", nr.GetAllNotes))               // GET /notes
r.Post("/notes", makeSpanMiddleware("CreateNote", nr.CreateNote))                // POST /notes
r.Get("/notes/{noteID}", makeSpanMiddleware("GetNote", nr.GetNoteByID))          // GET /notes/123
r.Put("/notes/{noteID}", makeSpanMiddleware("UpdateNote", nr.UpdateNoteByID))    // PUT /notes/123
r.Delete("/notes/{noteID}", makeSpanMiddleware("DeleteNote", nr.DeleteNoteByID)) // DELETE /notes/123
{{< /code-block >}}

다음 가져오기에 대한 코멘트도 제거합니다.

{{< code-block lang="go" filename="notes/notesController.go" disable_copy="true" collapsible="true" >}}
"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
{{< /code-block >}}

샘플 애플리케이션에 커스텀 추적의 몇몇 예시가 있습니다. 여기 두어 개의 예시가 추가로 제공됩니다. 이러한 스팬을 활성화하려면 코멘트를 제거합니다.

`doLongRunningProcess` 함수는 상위 컨텍스트에서 하위 스팬을 생성합니다.

{{< code-block lang="go" filename="notes/notesHelper.go" disable_copy="true" collapsible="true" >}}
func doLongRunningProcess(ctx context.Context) {
    childSpan, ctx := tracer.StartSpanFromContext(ctx, "traceMethod1")
    childSpan.SetTag(ext.ResourceName, "NotesHelper.doLongRunningProcess")
    defer childSpan.Finish()

    time.Sleep(300 * time.Millisecond)
    log.Println("Hello from the long running process in Notes")
    privateMethod1(ctx)
}
{{< /code-block >}}

`privateMethod1` 함수는 컨텍스트에서 완전히 별도의 서비스를 생성하는 것을 보여줍니다.

{{< code-block lang="go" filename="notes/notesHelper.go" disable_copy="true" collapsible="true" >}}
func privateMethod1(ctx context.Context) {
    childSpan, _ := tracer.StartSpanFromContext(ctx, "manualSpan1",
        tracer.SpanType("web"),
        tracer.ServiceName("noteshelper"),
    )
    childSpan.SetTag(ext.ResourceName, "privateMethod1")
    defer childSpan.Finish()

    time.Sleep(30 * time.Millisecond)
    log.Println("Hello from the custom privateMethod1 in Notes")
}
{{< /code-block >}}

커스텀 추적에 대한 자세한 정보는 [고 커스텀 계측][12]을 참조하세요.

## 두 번째 애플리케이션을 추가해 배포된 트레이스를 확인하세요.

단일 애플리케이션 추적은 좋은 시작이지만 추적의 진정한 가치는 서비스를 통한 요청의 흐름을 확인하는 데 있습니다. 이것을 _분산 추적_이라고 부릅니다.

샘플 프로젝트는 `calendar`로 불리는 두 번째 애플리케이션을 포함하며 애플리케이션이 호출되면 임의의 날짜를 반환합니다. 메모 애플리케이션의 `POST` 엔드포인트는 `add_date`란 이름의 두 번째 쿼리 파라미터를 포함합니다. `y`로 설정되면 메모 애플리케이션은 일정 애플리케이션을 호출에 메모에 추가할 날짜를 얻습니다.

일정 애플리케이션에서 추적 활성화:

1. `cmd/calendar/main.go`에서 다음 줄의 주석을 제거합니다.
   {{< code-block lang="go" filename="cmd/calendar/main.go" disable_copy="true" collapsible="true" >}}
   chitrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi"
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
   {{< /code-block >}}

   {{< code-block lang="go" filename="cmd/calendar/main.go" disable_copy="true" collapsible="true" >}}
   tracer.Start()
   defer tracer.Stop()
   {{< /code-block >}}

   {{< code-block lang="go" filename="cmd/calendar/main.go" disable_copy="true" collapsible="true" >}}
   r.Use(chitrace.Middleware(chitrace.WithServiceName("calendar")))
   {{< /code-block >}}

1. `docker/all-docker-compose.yaml`를 열고 `calendar` 서비스 주석을 제거하여 앱과 도커를 위한 통합 서비스 태그와 에이전트 호스트를 설정합니다.
   {{< code-block lang="yaml" filename="docker/all-docker-compose.yaml" >}}
   일정:
   컨테이너_이름: 일정
   재시작: 항상
   빌드:
       context: ../
       dockerfile: ../dockerfile.calendar
   레이블:
       - com.datadoghq.tags.service="calendar"
       - com.datadoghq.tags.env="dev"
       - com.datadoghq.tags.version="0.0.1"
   환경:
       - DD_SERVICE=calendar
       - DD_ENV=dev
       - DD_VERSION=0.0.1
       - DD_AGENT_HOST=datadog-agent
     ports:
       - 9090:9090
     depends_on:
       - datadog-agent
   {{< /code-block >}}
1. `notes` 서비스 섹션에서 `CALENDAR_HOST` 환경 변수를, `depends_on`에서 `calendar` 항목 주석을 제거하여 두 앱 간 필요한 연결을 만듭니다. 메모 서비스는 다음과 같아야 합니다.
   {{< code-block lang="yaml" filename="docker/all-docker-compose.yaml" >}}
   메모:
   컨테이너_이름: 메모
   재시작: 항상
   빌드:
       context: ../
       dockerfile: ../dockerfile.notes
     ports:
       - 8080:8080
   레이블:
       - com.datadoghq.tags.service="notes"
       - com.datadoghq.tags.env="dev"
       - com.datadoghq.tags.version="0.0.1"
   환경:
       - DD_SERVICE=notes
       - DD_ENV=dev
       - DD_VERSION=0.0.1
       - DD_AGENT_HOST=datadog-agent
       - CALENDAR_HOST=calendar
     depends_on:
       - calendar
       - datadog-agent
   {{< /code-block >}}

1. 실행되는 모든 컨테이너 중단:
   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml down{{< /code-block >}}

1. 애플리케이션 컨테이너 스핀업:
   {{< code-block lang="shell" >}}
   docker-compose -f all-docker-compose.yaml build
   docker-compose -f all-docker-compose.yaml up -d{{< /code-block >}}

1. `add_date` 파라미터를 사용하여 POST 요청을 보냅니다.
   {{< code-block lang="go">}}curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'{{< /code-block >}}

1. 트레이스 탐색기에서 이 최신 `notes` 트레이스를 클릭해 두 서비스 간 분산된 트레이스를 확인합니다.
   {{< img src="tracing/guide/tutorials/tutorial-go-host-distributed.png" alt="A flame graph for a distributed trace." style="width:100%;" >}}

이 불꽃 그래프는 여러 애플리케이션의 통합을 결합합니다.
- 첫 번째 스팬은 사용자가 전송한 POST 요청으로 지원되는 `go-chi` 라이브러리를 통해 `chi` 라우터에서 처리됩니다.
- 두 번째 스팬은 `createNote` 함수로, `makeSpanMiddleware` 함수로 수동 추적됩니다. 함수는 HTTP 요청 컨텍스트에서 스팬을 생성했습니다.
- 다음 스팬은 지원되는 `http` 라이브러리와 `main.go` 파일에서 초기화된 클라이언트를 사용해 메모 애플리케이션에서 전송된 요청입니다. 이 GET 요청은 일정 애플리케이션으로 전송됩니다. 일정 애플리케이션 스팬은 별도의 서비스이므로 파란색으로 표시됩니다.
- 일정 애플리케이션 내 `go-chi` 라우터는 GET 요청을 처리하고 `GetDate` 함수는 GET 요청 내의 자체적인 스팬으로 수동 추적됩니다.
- 마지막으로 보라색 `db` 호출은 지원되는 `sql` 라이브러리의 자체적인 서비스입니다. 모두 상위 스팬 `CreateNote`에 의해 호출되므로 `GET /Calendar` 요청과 동일한 수준에 표시됩니다. 

## 트러블슈팅

예상대로 트레이스를 수신하지 않으면 고 트레이서에서 디버그 모드를 설정합니다. [디버그 모드 활성화][13]를 읽어 자세히 알아보세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/guide/#enabling-tracing-tutorials
[2]: /ko/tracing/trace_collection/dd_libraries/go/
[3]: /ko/account_management/api-app-keys/
[4]: /ko/tracing/trace_collection/compatibility/go/
[5]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[6]: /ko/getting_started/site/
[7]: https://www.baeldung.com/go-instrumentation
[8]: https://app.datadoghq.com/event/explorer
[9]: https://github.com/DataDog/apm-tutorial-golang
[10]: /ko/getting_started/tagging/unified_service_tagging/#non-containerized-environment
[11]: https://app.datadoghq.com/apm/traces
[12]: /ko/tracing/trace_collection/custom_instrumentation/go/
[13]: /ko/tracing/troubleshooting/tracer_debug_logs/?code-lang=go
[14]: /ko/tracing/trace_collection/library_config/go/
[15]: /ko/tracing/trace_pipeline/ingestion_mechanisms/?tab=Go
[16]: /ko/tracing/trace_collection/compatibility/go/#library-compatibility
[17]: /ko/getting_started/tagging/unified_service_tagging/