---
further_reading:
- link: /security/application_security/how-it-works/
  tag: 설명서
  text: App and API Protection 작업 방식
- link: /security/default_rules/?category=cat-application-security
  tag: 설명서
  text: OOTB App and API Protection 규칙
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: App and API Protection 트러블슈팅
title: App and API Protection을 위한 Go 애플리케이션 빌드하기
---

Go용 App and API Protection의 설치 요구 사항은 다소 추상적일 수 있으며, Go 툴체인의 크로스 컴파일 및 CGO 기능으로 인해 구체적인 설치 절차를 이해하기 어려울 수 있습니다.

이 가이드는 사용 사례에 맞게 맞춤화된, 실제로 동작하는 Dockerfile을 단계별로 작성할 수 있도록 안내하는 것을 목표로 합니다.

## 가이드

이 가이드에 포함된 많은 Dockerfile 예시는 [appsec-go-test-app][4] 리포지토리에서 가져온 것입니다. 직접 실행해 보려면, 먼저 해당 리포지토리를 클론하세요.

```sh
git clone https://github.com/DataDog/appsec-go-test-app.git
cd appsec-go-test-app
```

`Dockerfile` 예시 목록은 [`examples/docker`][3] 디렉터리에서 확인할 수 있습니다. 다음은 가장 간단한 형태의 예시입니다.

```dockerfile
FROM golang:1 AS build
WORKDIR /app
COPY . .

RUN go install github.com/DataDog/orchestrion # Resolved from go.mod dependencies

RUN orchestrion go build -o=main .

FROM debian:bookworm
COPY --from=build /app/main /usr/local/bin

ENV DD_APPSEC_ENABLED=true
ENTRYPOINT [ "/usr/local/bin/main" ]
```

이 예시는 Datadog WAF가 활성화된 Go 애플리케이션을 위한, 가장 기본적인 형태의 동작 가능한 Dockerfile입니다. [Orchestrion][5]을 처음 사용하는 경우, 이 Dockerfile을 사용하기 전에 먼저 `orchestrion pin`을 실행하고 그 결과 변경 사항을 커밋해야 합니다. 자세한 내용은 [Go 시작하기][6]를 참고하세요.

이 Dockerfile은 두 개의 단계로 구성되어 있습니다.
1. 빌드 단계에서는 Debian 이미지를 사용해 Go 애플리케이션을 빌드하며, [Orchestrion][5] 도구를 사용하여 App and API Protection 기능을 애플리케이션에 적용합니다.
2. 런타임 단계에서는 빌드된 애플리케이션을 최소한의 Ubuntu 이미지로 복사하고, App and API Protection을 활성화하기 위해 환경 변수 `DD_APPSEC_ENABLED`를 `true`로 설정합니다.

이러한 2단계 빌드 프로세스를 사용하면, 불필요한 빌드 도구 없이 최종 이미지를 작고 가볍게 유지하면서도 애플리케이션이 App and API Protection에 맞게 올바르게 계측되도록 할 수 있습니다.

다음 섹션에서는 다양한 Dockerfile 시나리오를 소개하며, 각 시나리오별 고려사항과 전체 예제를 함께 제공합니다.

## Dockerfile 시나리오

App and API Protection을 위한 Dockerfile 선택에는 두 가지 주요 요소가 영향을 미칩니다.
* **libc 구현**: glibc(Debian/Ubuntu) 또는 musl(Alpine)
* **CGO**: 활성화됨 또는 비활성화됨(env var `CGO_ENABLED` 포함)

이러한 요소는 빌드 요구사항과 런타임 호환성 모두에 영향을 줍니다. Datadog WAF는 런타임 시 특정 공유 라이브러리(`libc.so.6`, `libpthread.so.0`, `libdl.so.2`)를 필요로 하며, 빌드 방식은 이러한 선택에 따라 달라집니다. 이러한 의존성은 CGO가 활성화된 상태로 빌드된 모든 프로그램에 공통적으로 필요하므로, Datadog WAF는 이러한 프로그램을 지원하는 런타임 환경에서는 별도 설정 없이 바로 동작합니다.

그러나 CGO가 비활성화된 경우, Go는 일반적으로 이러한 라이브러리가 필요 없는 완전한 정적 링크 바이너리를 생성합니다. 하지만 Datadog WAF를 사용하는 경우에는 예외입니다. 따라서 CGO가 비활성화된 상태에서는 Datadog WAF를 활성화하기 위해 플래그를 전달해야 합니다.

### 표준 glibc 기반 Dockerfile

대부분의 사용자에게 권장되는 방식으로, Debian/Ubuntu 기반 이미지를 사용하는 방법입니다.

```dockerfile
FROM golang:1 AS build
WORKDIR /app
COPY . .

RUN go install github.com/DataDog/orchestrion
RUN orchestrion go build -o=main .

FROM ubuntu:noble

COPY --from=build /app/main /usr/local/bin
ENV DD_APPSEC_ENABLED=true
ENTRYPOINT [ "/usr/local/bin/main" ]
```

**주요 고려 사항:**
* 컴파일 시점 계측을 위해 [Orchestrion][5]을 사용합니다.
* CGO는 기본적으로 활성화되어 있으며, 필요한 공유 라이브러리를 제공합니다.
* 런타임은 빌드 단계와 동일한 libc 구현(glibc)을 사용합니다.
* 런타임 단계에서는 추가 패키지가 필요하지 않습니다.

### glibc로 빌드하고 Alpine 런타임 사용

CGO가 필요하지만 더 가벼운 런타임 이미지를 사용하고 싶다면, Debian 기반 이미지로 빌드한 후 Alpine에서 실행할 수 있습니다.

```dockerfile
FROM golang:1 AS build
WORKDIR /app
COPY . .

RUN go install github.com/DataDog/orchestrion
RUN orchestrion go build -o=main .

FROM alpine

COPY --from=build /app/main /usr/local/bin/main
RUN apk add libc6-compat
ENV DD_APPSEC_ENABLED=true
ENTRYPOINT [ "/usr/local/bin/main" ]
```

**주요 고려 사항:**
* `appsec` 빌드 태그 필요 없음
* `apk add libc6-compat`는 glibc로 빌드된 바이너리가 Alpine에서 동작할 수 있도록, 필요한 경우 symlinks를 추가합니다.
* 이 구성에서는 Datadog 외의 다른 라이브러리도 CGO를 사용하는 경우, 런타임에 추가 패키지 설치가 필요할 수 있습니다.

### Alpine 기반 Dockerfile(CGO 비활성화됨)

빌드 및 런타임 크기를 최소화하려면 CGO를 비활성화한 빌드(Alpine에서 기본값)를 사용하는 것이 좋습니다.

```dockerfile
FROM golang:1-alpine AS build
WORKDIR /app
COPY . .

RUN go install github.com/DataDog/orchestrion
RUN orchestrion go build -tags=appsec -o=main .

FROM alpine

COPY --from=build /app/main /usr/local/bin/main
ENV DD_APPSEC_ENABLED=true
ENTRYPOINT [ "/usr/local/bin/main" ]
```

**주요 고려 사항:**
* CGO가 비활성화된 경우, `-tags=appsec` 플래그를 반드시 지정해야 합니다.

### 라이브러리 추출을 포함한 최소 구성 Dockerfile

`CGO_ENABLED=0` 사용 시 초소형 이미지를 위한 구성:

```dockerfile
FROM golang:1 AS build
WORKDIR /app
COPY . .

RUN go install github.com/DataDog/orchestrion

# Build with appsec tag for CGO-disabled builds
ENV CGO_ENABLED=0
RUN orchestrion go build -tags=appsec -o=main .

# Install ldd and extract shared libraries that are necessary at runtime
RUN apt update && apt install -y binutils
RUN ldd main | tr -s '[:blank:]' '\n' | grep '^/' | \
      xargs -I % sh -c 'mkdir -p $(dirname libs%); cp % libs%;'

FROM scratch
COPY --from=build /app/libs /app/main /
ENV DD_APPSEC_ENABLED=true
ENTRYPOINT [ "/main" ]
```

**주요 고려 사항:**
* CGO가 비활성화된 경우, `-tags=appsec` 플래그를 반드시 지정해야 합니다.
* 필수 공유 라이브러리를 수동으로 추출하여 복사해야 합니다.
* 가능한 가장 작은 이미지 크기를 달성할 수 있습니다.
* `ldd` 명령은 모든 런타임 의존성을 식별합니다.

### Distroless용 Dockerfile

보안 중심의 배포를 위해 [Google의 distroless][7] 이미지를 사용하는 경우

```dockerfile
FROM golang:1 AS build
WORKDIR /app
COPY . .

RUN go install github.com/DataDog/orchestrion

ENV CGO_ENABLED=0
RUN orchestrion go build -tags=appsec -o=main .

# Install ldd and extract shared libraries
RUN apt update && apt install -y binutils
RUN ldd main | tr -s '[:blank:]' '\n' | grep '^/' | \
      xargs -I % sh -c 'mkdir -p $(dirname libs%); cp % libs%;'

FROM gcr.io/distroless/base-debian12:nonroot
COPY --from=build /app/libs /app/main /
ENV DD_APPSEC_ENABLED=true
ENTRYPOINT [ "/main" ]
```

**주요 고려 사항:**
* 패키지 관리자와 셸을 제거하여 보안을 한층 강화합니다.
* 스크래치 방식과 유사하게 라이브러리 추출이 필요합니다.
* 기본적으로 비루트 사용자로 실행됩니다.
* glibc 기반 공유 라이브러리와의 호환성을 유지합니다.

### 크로스 컴파일용 Dockerfile

서로 다른 아키텍처를 대상으로 애플리케이션을 빌드하는 경우

```dockerfile
FROM golang:1 AS build
# Install cross-compilation toolchain
RUN apt-get update && apt-get install -y gcc-aarch64-linux-gnu

WORKDIR /app
COPY . .

RUN go install github.com/DataDog/orchestrion

# Cross-compile for ARM64
ENV CGO_ENABLED=1 CC=aarch64-linux-gnu-gcc GOOS=linux GOARCH=arm64
RUN orchestrion go build -o=main .

FROM arm64v8/debian
COPY --from=build /app/main /usr/local/bin
ENV DD_APPSEC_ENABLED=true
ENTRYPOINT [ "/usr/local/bin/main" ]
```

**주요 고려 사항:**
* 적절한 크로스 컴파일 툴체인을 설치해야 합니다.
* `CC`, `GOOS` 및 `GOARCH` 환경 변수를 설정합니다.
* 런타임 단계는 대상 아키텍처와 일치해야 합니다.
* WAF를 올바르게 통합하려면 CGO를 활성화해야 합니다.

## 시도해 보세요.

이러한 Dockerfile 대부분은 [appsec-go-test-app][4]에서 제공되므로, 직접 실행해보기도 매우 쉽습니다.

```sh
docker build -f ./examples/alpine/Dockerfile -t appsec-go-test-app .
docker run appsec-go-test-app
```

### 설정 확인

App 및 API Protection이 올바르게 작동하는지 확인하려면,

App and API Protection의 위협 탐지를 직접 확인하려면, 애플리케이션에 알려진 공격 패턴을 전송하세요. 예를 들어, 다음과 같은 curl 스크립트가 포함된 파일을 실행하여 [감지된 보안 스캐너][9] 규칙을 트리거할 수 있습니다.
<div>
<pre><code>for ((i=1;i<=250;i++)); <br>do<br># 대상 기존 서비스 경로<br>curl https://your-application-url/existing-route -A Arachni/v1.0;<br># 대상 비-기존 서비스 경로<br>curl https://your-application-url/non-existing-route -A Arachni/v1.0;<br>done</code></pre></div>

애플리케이션을 활성화하고 테스트한 후 몇 분이 지나면, Datadog의 [애플리케이션 트레이스 및 신호 탐색기][8]에서 위협 정보가 표시됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/application_security/setup/compatibility/go
[3]: https://github.com/DataDog/appsec-go-test-app/blob/main/examples/docker
[4]: https://github.com/DataDog/appsec-go-test-app
[5]: /ko/tracing/trace_collection/automatic_instrumentation/dd_libraries/go/?tab=compiletimeinstrumentation
[6]: /ko/security/application_security/setup/go/setup
[7]: https://github.com/GoogleContainerTools/distroless
[8]: https://app.datadoghq.com/security/appsec
[9]: /ko/security/default_rules/security-scan-detected/