---
cascade:
  algolia:
    category: 지침
    rank: 20
    subcategory: 서버리스 모니터링 지침
disable_toc: true
private: true
title: 서버리스 모니터링 지침
---

## 일반 서버리스 지침

{{< whatsnext desc="서버리스 애플리케이션 모니터링 모범 사례" >}}
    {{< nextlink href="/serverless/guide/connect_invoking_resources" >}}Lambda 함수를 호출하는 리소스에 대한 심층적인 가시성{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_warnings" >}}서버리스 경고{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_tagging" >}}서버리스 태깅{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/agent_configuration" >}}에이전트 설정{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/opentelemetry" >}}서버리스 및 OpenTelemetry{{< /nextlink >}}
{{< /whatsnext >}}

## Datadog 포워더를 사용해 설치

{{< whatsnext desc="이전에 Datadog 포워더를 사용하여 모니터링하도록 설정된 애플리케이션에 대한 설치 지침" >}}
{{< nextlink href="/serverless/guide/datadog_forwarder_node" >}}Datadog 포워더를 사용하여 Node.js 서버리스 애플리케이션 계측하기{{< /nextlink >}}
{{< nextlink href="/serverless/guide/datadog_forwarder_python" >}}Datadog 포워더를 사용하여 Python 서버리스 애플리케이션 계측하기{{< /nextlink >}}
{{< nextlink href="/serverless/guide/datadog_forwarder_java" >}}Datadog 포워더를 사용하여 Java 서버리스 애플리케이션 계측하기{{< /nextlink >}}
{{< nextlink href="/serverless/guide/datadog_forwarder_go" >}}Datadog 포워더를 사용하여 Go 서버리스 애플리케이션 계측하기{{< /nextlink >}}
{{< nextlink href="/serverless/guide/datadog_forwarder_dotnet" >}}Datadog 포워더를 사용하여 .NET 서버리스 애플리케이션 계측하기{{< /nextlink >}}
{{< nextlink href="/serverless/guide/extension_motivation" >}}Datadog Lambda 확장으로 마이그레이션 결정하기{{< /nextlink >}}
{{< /whatsnext >}}

## 설치 문제 해결하기

{{< whatsnext desc="일반적인 설치 문제 및 문제 해결을 위한 팁" >}}
 {{< nextlink href="/serverless/troubleshooting" >}}서버리스 모니터링 문제 해결{{< /nextlink >}}
 {{< nextlink href="/serverless/guide/serverless_tracing_and_webpack" >}}Node.js Lambda 추적 및 웹팩 호환성{{< /nextlink >}}
 {{< nextlink href="/serverless/guide/serverless_package_too_large" >}}서버리스 패키지가 너무 클 경우 오류 문제 해결{{< /nextlink >}}
 {{< nextlink href="/serverless/guide/handler_wrapper" >}}Lambda 핸들러를 코드로 래핑하기{{< /nextlink >}}
 {{< nextlink href="/serverless/guide/layer_not_authorized" >}}레이어 미승인 오류 문제 해결{{< /nextlink >}}
{{< /whatsnext >}}