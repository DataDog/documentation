---
aliases:
- /ko/security_platform/application_security/getting_started/go
- /ko/security/application_security/getting_started/go
- /ko/security/application_security/threats/setup/threat_detection/go
- /ko/security/application_security/threats_detection/go
further_reading:
- link: /security/application_security/setup/go/sdk
  tag: 설명서
  text: Go용 App and API Protection SDK
- link: /security/application_security/add-user-info/
  tag: 설명서
  text: 트레이스에 사용자 정보 추가
- link: https://github.com/DataDog/dd-trace-go
  tag: 소스 코드
  text: Tracer 소스 코드
- link: https://github.com/DataDog/orchestrion
  tag: 소스 코드
  text: Orchestrion 소스 코드
- link: /security/default_rules/?category=cat-application-security
  tag: 설명서
  text: OOTB App and API Protection 규칙
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: App and API Protection 트러블슈팅
title: Go용 App and API Protection 시작하기
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection은 정부 기관용 Datadog 사이트 US1-FED에서 미리 보기로 제공되고 있습니다.
</div>
{{< /site-region >}}

## 전제 조건 {#prerequisite}

- [Datadog Agent][16]는 애플리케이션의 운영 체제나 컨테이너, 클라우드 또는 가상 환경에 맞게 설치 및 구성됩니다. 
- 서비스 프레임워크 및 도구가 Datadog [애플리케이션 및 API 보호][1]와 [호환][2]됩니다.
- 배포 환경이 [지원][5]됩니다.
- [공식 배포 정책][5]에 따라 [Go][4]의 최신 두 버전 중 하나가 설치되어 있습니다.

## 시작하기 {#get-started}

1. [Orchestrion][10] 설치:
   ```console
   $ go install github.com/DataDog/orchestrion@latest
   ```

2. 프로젝트 디렉터리에서 Orchestrion을 Go 모듈로 등록합니다.
   ```console
   $ orchestrion pin
   ```

3. Datadog에는 일련의 플러그형 패키지가 있어서 일련의 라이브러리 및 프레임워크를 계측하기 위한 즉시 사용 가능한 지원을 제공합니다. 이러한 패키지 목록은 [호환성 요구 사항][1]에서 확인할 수 있습니다. 이러한 패키지를 애플리케이션에 가져온 다음 각 통합과 함께 목록으로 나열된 구성 지침을 따르세요.

4. `appsec` 빌드를 사용하여 Orchestrion으로 프로그램을 다시 컴파일합니다.
   ```console
   $ orchestrion go build -tags=appsec my-program
   ```
   Orchestrion 사용 방법에 대한 자세한 옵션은 [Orchestrion 사용법][7]을 참조하세요.

참고: Linux에서 [CGO][9] 없이 빌드하는 경우, [CGO를 비활성화하여 Go 애플리케이션 빌드하기][6]를 참조하세요.

5. Go 서비스를 재배포하고 `DD_APPSEC_ENABLED` 환경 변수를 `true`로 설정하여 App and API Protection를 활성화합니다:

{{< tabs >}}
{{% tab "환경 변수" %}}

```console
$ env DD_APPSEC_ENABLED=true ./my-program
```

{{% /tab %}}
{{% tab "Docker CLI" %}}

Docker 명령줄에 다음 환경 변수 값을 추가합니다.

```console
$ docker run -e DD_APPSEC_ENABLED=true [...]
```

적합한 Docker 이미지를 생성하는 방법에 관한 자세한 내용은 <a href="/security/application_security/setup/go/dockerfile">Go용 App and API Protection를 위한 Dockerfile 생성</a>을 참조하세요.

{{% /tab %}}
{{% tab "Dockerfile" %}}

애플리케이션 컨테이너의 Dockerfile에 다음 환경 변수 값을 추가합니다.

```Dockerfile
ENV DD_APPSEC_ENABLED=true
```

적합한 Docker 이미지를 생성하는 방법에 관한 자세한 내용은 <a href="/security/application_security/setup/go/dockerfile">Go용 App and API Protection를 위한 Dockerfile 생성</a>을 참조하세요.

{{% /tab %}}
{{% tab "Kubernetes" %}}

APM을 위해 애플리케이션의 배포 구성 파일을 업데이트하고 다음 환경 변수를 추가합니다.

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_APPSEC_ENABLED
              value: "true"
```

적합한 Docker 이미지를 생성하는 방법에 관한 자세한 내용은 <a href="/security/application_security/setup/go/dockerfile">Go용 App and API Protection를 위한 Dockerfile 생성</a>을 참조하세요.

{{% /tab %}}
{{% tab "Amazon ECS" %}}

이 환경 섹션을 활용하여 ECS 작업 정의 JSON 파일을 업데이트합니다.

```json
"environment": [
  ...,
  {
    "name": "DD_APPSEC_ENABLED",
    "value": "true"
  }
]
```

적합한 Docker 이미지를 생성하는 방법에 관한 자세한 내용은 <a href="/security/application_security/setup/go/dockerfile">Go용 App and API Protection를 위한 Dockerfile 생성</a>을 참조하세요.

{{% /tab %}}

{{< /tabs >}}

### 설정을 확인하세요 {#verify-your-setup}

App and API Protection가 올바르게 작동하는지 확인하세요.
   
App and API Protection 위협 탐지가 실제로 작동하는 모습을 확인하려면 애플리케이션에 알려진 공격 패턴을 전송합니다. 예를 들어, 다음 Curl 스크립트가 포함된 파일을 실행하여 [감지된 Security 스캐너][15] 규칙을 트리거합니다.

```bash
for ((i=1;i<=250;i++));
do
  # Target existing service’s routes
  curl https://your-application-url/existing-route -A Arachni/v1.0;
  # Target non existing service’s routes
  curl https://your-application-url/non-existing-route -A Arachni/v1.0;
done
```

애플리케이션을 활성화하고 실행한 몇 분 후 **위협 정보가 Datadog의 [애플리케이션 트레이스 및 신호 탐색기][14]에 표시됩니다.**

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Signals 탐색기 및 세부 정보, Vulnerabilities 탐색기 및 세부 정보를 보여주는 동영상입니다." video="true" >}}

### CGO 없이 빌드하기 {#building-without-cgo}

[CGO][9] 없이 Go 애플리케이션을 빌드하는 경우에도 다음 단계에 따라 App and API Protection을 활성화할 수 있습니다.

1. 애플리케이션을 컴파일할 때 `appsec` 빌드 태그를 추가합니다.
   ```console
   $ CGO_ENABLED=0 orchestrion go build -tags appsec my-program
   ```

  <div class="alert alert-danger">CGO를 비활성화하면 일반적으로 정적으로 링크된 바이너리가 보장됩니다. 이 케이스에는 그렇지 않습니다.</div>

2. Datadog WAF에 필요한 라이브러리이므로 시스템에 `libc.so.6`, `libpthread.so.0` 및 `libdl.so.2`를 설치합니다.
   이 설치는 패키지 관리자를 사용하여 시스템에 `glibc` 패키지를 설치함으로써 수행할 수 있습니다. [Go용 App and API Protection Dockerfile 생성][3]을 참조하세요.

3. 위에서 설명한 대로 `DD_APPSEC_ENABLED=true` 환경 변수를 설정하여 Go 서비스를 재배포합니다.

### Bazel로 빌드하기 {#building-with-bazel}

Bazel 및 [rules_go][12]를 사용하여 Go 애플리케이션을 빌드하는 경우 [Orchestrion][7]은 Bazel과 호환되지 않습니다.
대신 [Datadog Go SDK][11]를 사용하여 애플리케이션을 수동으로 계측할 수 있습니다.

App and API Protection은 Datadog의 WAF에 대한 C++ 바인딩을 지원하기 위해 [purego][13]에 의존하며, 이는 Gazelle이 생성한 `repositories.bzl` 내에서 특별한 주의가 필요합니다. `go_repository` 규칙에 따라, `com_github_ebitengine_purego`에 대해,
`build_directives` 속성과 함께`gazelle:build_tags cgo` 지시문을 추가해야 합니다. 예를 들면 다음과 같습니다.

```starlark
    go_repository(
        name = "com_github_ebitengine_purego",
        build_directives = [
            "gazelle:build_tags cgo",
        ]
        build_file_proto_mode = "disable",
        importpath = "github.com/ebitengine/purego",
        sum = "<your-checksum>",
        version = "v0.8.3",
    )
```

## APM 추적 없이 App and API Protection 사용{#using-app-and-api-protection-without-apm-tracing}

APM 추적 기능 없이 App and API Protection을 사용하려면 추적을 비활성화한 상태로 배포할 수 있습니다.

1.  SDK를 구성할 때 `DD_APM_TRACING_ENABLED=false` 환경 변수와 함께 추가로 `DD_APPSEC_ENABLED=true` 환경 변수를 지정하세요. 이 구성은 Datadog으로 전송되는 APM 데이터 양을 App and API Protection 제품에 필요한 양 중 최소로 줄입니다.

자세한 내용은 [독립형 App and API Protection][8]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/application_security/setup/compatibility/go/?tab=v2#web-framework-compatibility
[2]: /ko/security/application_security/setup/compatibility/go/
[3]: /ko/security/application_security/setup/go/dockerfile
[4]: https://go.dev/
[5]: https://go.dev/doc/devel/release#policy
[6]: /ko/security/application_security/setup/go#building-without-cgo
[7]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/go/?tab=compiletimeinstrumentation#usage
[8]: /ko/security/application_security/guide/standalone_application_security/
[9]: https://go.dev/wiki/cgo
[10]: https://datadoghq.dev/orchestrion
[11]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/go/?tab=manualinstrumentation#add-the-tracer-library-to-your-application
[12]: https://github.com/bazel-contrib/rules_go
[13]: https://github.com/ebitengine/purego
[14]: https://app.datadoghq.com/security/appsec
[15]: /ko/security/default_rules/security-scan-detected/
[16]: https://app.datadoghq.com/account/settings#agent