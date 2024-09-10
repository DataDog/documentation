---
aliases:
- /ko/continuous_integration/setup_pipelines/custom_commands
further_reading:
- link: /continuous_integration/pipelines/custom_commands/
  tag: 설명서
  text: CI 문제 해결
title: 파이프라인 트레이스에 커스텀 명령 추가
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택한 사이트 ({{< region-param key="dd_site_name" >}})에서 CI Visibility를 사용할 수 없습니다.</div>
{{< /site-region >}}

커스텀 명령은 CI 파이프라인의 개별 명령을 트레이스할 수 있는 방법을 제공하므로 작업에서 수행할 수 있는 설정 또는 해체 작업 (예: 도커(Docker) 이미지 다운로드 또는 쿠버네티스(Kubernetes) 기반 인프라스트럭처에서 사용 가능한 노드 대기)을 고려하지 않고 명령에 걸리는 시간을 측정할 수 있습니다. 이러한 스팬은 파이프라인 트레이스의 일부로 나타납니다.

{{< img src="ci/ci-custom-spans.png" alt="Details for a single pipeline with custom commands" style="width:100%;">}}

## 호환성

커스텀 명령은 다음 CI 공급자와 함께 작동합니다:

- Jenkins와 Datadog 플러그인 >= v3.2.0
- CircleCI

## Datadog CI CLI 설치

`npm`을 사용하여 [`datadog-ci`][1](>=0.17.0) CLI를 전체적으로 설치합니다:

{{< code-block lang="shell" >}}
npm install -g @datadog/datadog-ci
{{< /code-block >}}

## 명령 트레이스

명령을 트레이스하기 위해 다음을 실행합니다:

{{< code-block lang="shell" >}}
datadog-ci trace [--name <name>] -- <command>
{{< /code-block >}}

`DATADOG_API_KEY` 환경 변수에서 유효한 [Datadog API 키][2]를 지정합니다. 예:

{{< site-region region="us,us3,eu,ap1" >}}
<pre>
<code>
DATADOG_API_KEY=&lt;key&gt; DATADOG_SITE={{< region-param key="dd_site" >}} datadog-ci trace \
--name "Greet" \
-- \
echo "Hello World"
</code>
</pre>
{{< /site-region >}}
{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">CI Visibility는 선택한 사이트 ({{< region-param key="dd_site_name" >}})에서 사용할 수 없습니다.</div>
{{< /site-region >}}

## 구성 설정

이러한 옵션은 `datadog-ci trace` 명령에 사용할 수 있습니다:

`--name`
: 커스텀 명령의 표시 이름.<br/>
**기본값**: `<command>`와 동일한 값<br/>
**예**: `Wait for DB to be reachable`

`--tags`
: 커스텀 명령에 연결할 `key:value`양식의 키-값 쌍( `--tags` parameter can be specified multiple times). When specifying tags using `DD_TAGS`, separate them using commas (for example, `team:backend,priority:high`).<br/>
**환경 변수**: `DD_TAGS`<br/>
**기본값**: (없음)<br/>
**예**: `team:backend`<br/>
**참고**: '--tags` and with the `DD_TAGs` environment variable are merged. If the same key appears in both `--tags` and `DD_TAGS`, the value in the environment variable `DD_TAGS`를 우선합니다.


`--no-fail`
: 지원되지 않는 CI 공급자에서 실행되는 경우에도 Datadog-ci가 실패하지 않도록 합니다. 이 경우 명령이 실행되고 Datadog에 아무것도 보고되지 않습니다.<br/>
**기본값**: `false`

위치 인수
: 시작되고 추적되는 명령입니다.

지원되는 환경 변수는 다음과 같습니다:

`DATADOG_API_KEY` (필수)
: 요청을 인증하는 데 사용되는 [Datadog API 키][2]입니다.<br/>
**기본값**: (없음)

{{< site-region region="us3,us5,eu,ap1" >}}
또한, 선택한 사이트 ({{< region-param key="dd_site_name" >}})를 사용하도록 Datadog 사이트를 설정합니다:

`DATADOG_SITE`
: 결과를 업로드할 Datadog 사이트입니다.<br/>
**기본값**: `datadoghq.com`<br/>
**선택된 사이트**: {{< region-param key="dd_site" code="true" >}}
{{< /site-region >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.npmjs.com/package/@datadog/datadog-ci
[2]: https://app.datadoghq.com/organization-settings/api-keys