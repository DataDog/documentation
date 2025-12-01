---
code_lang: go
code_lang_weight: 20
title: Go 호환성 요구 사항
type: multi-code-lang
---

## Application Security 기능

지정된 추적기 버전에 Go 라이브러리에서 지원되는 애플리케이션 보안 기능은 다음과 같습니다.

| 애플리케이션 보안 기능                   | Go 추적기 최소 버전 |
| -------------------------------- | ----------------------------|
| 위협 탐지| 1.47.0  |
| API Security | 1.59.0 |
| Threat Protection |  1.50.0   |
| 차단된 요청에 대한 응답 사용자 지정 | 1.53.0 |
| 소프트웨어 구성 분석(SCA) | 1.49.0 |
| 코드 보안  | 지원되지 않음 |
| 자동 사용자 활동 이벤트 추적 | 지원되지 않음 |

Go에서 지원되는 모든 애플리케이션 보안 기능을 사용하기 위한 최소 추적기 버전은 1.59.0입니다.

**참고**: 위협 보호를 사용하려면 최소 추적기 버전 목록에 포함된 [Remote Configuration][1]을 활성화해야 합니다.

### 지원되는 배포 유형
| 유형        | 위협 탐지 지원 | 소프트웨어 구성 분석 |
|-------------|--------------------------|-------------------------------|
| Docker      | {{< X >}}                | {{< X >}}                     |
| 쿠버네티스(Kubernetes)  | {{< X >}}                | {{< X >}}                     |
| Amazon ECS  | {{< X >}}                | {{< X >}}                     |
| AWS Fargate | {{< X >}}                | {{< X >}}                     |
| AWS Lambda  | {{< X >}}                |                               |

## 언어 및 프레임워크 호환성

### 지원되는 Go 버전

Datadog Go 추적 라이브러리는 오픈소스 프로그램입니다. 자세한 정보는 [GitHub 리포지토리][2]를 참조하세요.

Datadog Go 추적 라이브러리에는 Go 버전의 [버전 지원 정책][3]이 정의되어 있습니다. Go의 최신 두 릴리스는 완전한 지원을 제공합니다. 세 번째 릴리스의 경우 [유지 관리][4] 수준의 지원만 제공됩니다. 이전 버전은 작동할 수 있지만 지원은 기본적으로 제공되지 않습니다. 특별 요청이 있는 경우 [고객지원팀에 문의][5]하세요.

Datadog Agent v5.21.1+를 실행 중이어야 합니다.

추적기 버전 1.53.0부터는 애플리케이션 보안 기능에 [CGO][15]가 필요하지 않습니다.

## 통합

Go 추적기에는 다음 프레임워크, 데이터 저장소 및 라이브러리에 대한 지원이 포함되어 있습니다.

이 페이지에 안내된 Go 패키지는 애플리케이션 보안 기능과 관련이 있습니다. [애플리케이션 성능 모니터링(APM) 추적 호환성 페이지][16]에서 더 많은 추적 통합을 확인할 수도 있습니다.

{{< tabs >}}
{{% tab "v1" %}}

**참고**: [Go 통합 설명서][6]에서 지원되는 패키지와 해당 API의 자세한 개요와 사용 예시를 확인할 수 있습니다.

<div class="alert alert-info">원하는 라이브러리가 목록에 없는 경우 <a href="https://forms.gle/gHrxGQMEnAobukfn7">이 양식을 작성하여 세부 정보를 보내주세요</a>.</div>

### 웹 프레임워크 호환성

| 프레임워크         | Threat Detection이 지원되나요? | Threat Protection이 지원되나요? |
|-------------------|-----------------------------|------------------------------|
| [net/http][13]     | <i class="icon-check-bold"></i>  | <i class="icon-check-bold"></i> |
| [Gin][7]          | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [Gorilla Mux][8] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [gRPC][11]          | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [echo v4][9]     | <i class="icon-check-bold"></i>  | <i class="icon-check-bold"></i> |
| [echo v3][10]     | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [chi][12] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [graphql-go][17] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [gqlgen][18] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |


### 네트워킹 프레임워크 호환성

| 프레임워크             | Threat Detection이 지원되나요? | Threat Protection이 지원되나요? |
|-----------------------|-----------------------------|------------------------------|
| [gRPC client][11]     | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i> |
| [net/http client][13] | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i> |

### 데이터 스토어 호환성

| 프레임워크         | Threat Detection이 지원되나요?    | Threat Protection이 지원되나요?                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [sql][14]          | <i class="icon-check-bold"></i> |   <i class="icon-check-bold"></i>    |

[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib
[7]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin
[8]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/gorilla/mux
[9]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo.v4
[10]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/labstack/echo
[11]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/google.golang.org/grpc
[12]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/go-chi/chi
[13]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http
[14]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib/database/sql
[15]: https://github.com/golang/go/wiki/cgo
[17]: https://pkg.go.dev/github.com/graphql-go/graphql
[18]: https://pkg.go.dev/github.com/99designs/gqlgen/graphql

{{% /tab %}}

{{% tab "v2" %}}

**참고**: [Go 통합 설명서][19]에서 지원되는 패키지와 해당 API의 자세한 개요와 사용 예시를 확인할 수 있습니다.

<div class="alert alert-info">원하는 라이브러리가 목록에 없는 경우 <a href="https://forms.gle/gHrxGQMEnAobukfn7">이 양식을 작성하여 세부 정보를 보내주세요</a>.</div>

### 웹 프레임워크 호환성

| 프레임워크         | Threat Detection이 지원되나요? | Threat Protection이 지원되나요? |
|-------------------|-----------------------------|------------------------------|
| [net/http][26]     | <i class="icon-check-bold"></i>  | <i class="icon-check-bold"></i> |
| [Gin][20]          | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [Gorilla Mux][21] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [gRPC][24]          | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [echo v4][22]     | <i class="icon-check-bold"></i>  | <i class="icon-check-bold"></i> |
| [chi][25] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [graphql-go][17] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| [gqlgen][18] | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |


### 네트워킹 프레임워크 호환성

| 프레임워크             | Threat Detection이 지원되나요? | Threat Protection이 지원되나요? |
|-----------------------|-----------------------------|------------------------------|
| [gRPC client][24]     | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i> |
| [net/http client][26] | <i class="icon-check-bold"></i>                   | <i class="icon-check-bold"></i> |

### 데이터 스토어 호환성

| 프레임워크         | Threat Detection이 지원되나요?    | Threat Protection이 지원되나요?                                              |
|-------------------|-----------------|--------------------------------------------------------------------------|
| [sql][27]          | <i class="icon-check-bold"></i> |   <i class="icon-check-bold"></i>    |

[17]: https://pkg.go.dev/github.com/graphql-go/graphql
[18]: https://pkg.go.dev/github.com/99designs/gqlgen/graphql
[19]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/contrib/
[20]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gin-gonic/gin/v2
[21]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/gorilla/mux/v2
[22]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/labstack/echo.v4/v2
[23]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/labstack/echo/v2
[24]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/google.golang.org/grpc/v2
[25]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/go-chi/chi/v2
[26]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/net/http/v2
[27]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/contrib/database/sql/v2

{{% /tab %}}
{{< /tabs >}}

[1]: /ko/agent/remote_config/#enabling-remote-configuration
[2]: https://github.com/DataDog/dd-trace-go
[3]: https://github.com/DataDog/dd-trace-go#support-policy
[4]: https://github.com/DataDog/dd-trace-go#support-maintenance
[5]: https://www.datadoghq.com/support/
[16]: /ko/tracing/compatibility_requirements/go