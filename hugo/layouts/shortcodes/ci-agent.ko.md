Jenkins 또는 자체 관리형 GitLab CI와 같은 온프레미스 CI 공급자에서 테스트를 실행하는 경우, [에이전트 설치 지침][101]에 따라 각 작업자 노드에 Datadog 에이전트를 설치합니다.
자동으로 테스트 결과를 [로그][106]와 [기본 호트스 메트릭][106]과 연결할 수 있기 때문에 이 옵션을 추천합니다. 

쿠버네티스 실행기를 사용하는 경우 Datadog에서는 [Datadog 연산자][102]를 사용할 것을 권고합니다.
연산자에는 [Datadog 허용 제어기][103]가 포함되어 있어 빌드 파드에 자동으로 [추적기 라이브러리를 삽입][104]합니다.
**참고:** Datadog 연산자를 사용할 경우 허용 제어기가 작업을 해주기 때문에 추적기 라이브러리를 다운로드 받고 삽입할 필요가 없습니다. 따라서 아래 해당 단계를 건너뛰어도 됩니다.
그러나 테스트 가시화 기능을 사용할 때 필요한 파드의 환경 변수나 명령줄 파라미터는 설정해야 합니다.

쿠버네티스를 사용하지 않거나 Datadog 허용 제어기를 사용할 수 없고 CI 공급자가 컨테이너 기반 실행기를 사용하는 경우, 추적기를 실행하는 빌드 컨테이너에서 환경 변수 `DD_TRACE_AGENT_URL`(기본값 `http://localhost:8126`)를 해당 컨테이너 내에서 액세스할 수 있는 엔드포인트로 설정합니다. **참고:** 빌드 내에서 `localhost`를 사용하면 기본 작업자 노드나 에이전트를 실행하는 컨테이너를 참조하지 않고 컨테이너 자체를 참조합니다.

`DD_TRACE_AGENT_URL` 은 프로토콜과 포트(예: `http://localhost:8126`)를 포함하고 `DD_AGENT_HOST`과 `DD_TRACE_AGENT_PORT`보다 우선하며, CI Visibility를 위해 Datadog 에이전트의 URL을 설정하는 데 권장되는 설정 파라미터입니다.

Datdog 에이전트에 연결하는 데 아직 문제가 있다면 [에이전트리스 모드](?tab=cloudciprovideragentless#configuring-reporting-method)를 사용해 보세요.
**참고:** 이 방법을 사용할 경우 테스트가 [로그][105] 및 [인프라스트럭처 메트릭][106]과 상관 관계를 수립하지 않습니다.

[101]: /agent/
[102]: /containers/datadog_operator/
[103]: /agent/cluster_agent/admission_controller/
[104]: /tracing/trace_collection/library_injection_local/?tab=kubernetes
[105]: /tracing/other_telemetry/connect_logs_and_traces/
[106]: /infrastructure/
