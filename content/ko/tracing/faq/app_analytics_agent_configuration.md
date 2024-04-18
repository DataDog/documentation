---
aliases:
- /ko/tracing/trace_search_and_analytics/agent_trace_search/
- /ko/tracing/app_analytics/agent_trace_search/
- /ko/tracing/guide/app_analytics_agent_configuration/
kind: 설명서
title: 에이전트로 애플리케이션 분석 구성하기
---

<div class="alert alert-danger">
이 페이지에서는 레거시 애플리케이션 분석과 관련한 구성 정보와 더불어 사용되지 않는 기능을 설명합니다. 이는 트러블슈팅이나 오래된 설정을 수정할 때 유용합니다. 트레이스를 전체적으로 통제하려면 대신 <a href="/tracing/trace_ingestion">수집 통제</a>와 <a href="/tracing/trace_retention">보존 필터</a>를 사용하세요.
<br>
새 기능을 사용하려면 <a href="/tracing/trace_pipeline">트레이스 보존 및 수집</a>으로 이동하세요.
</div>

[애플리케이션 분석][1]은 요청을 트러블슈팅하거나 필터링하기 위해 `customer_id`, `error_type`, 또는 `app_name`와 같은 사용자 정의 태그로 APM 데이터를 필터링하는 데 사용됩니다. 활성화하려면 다음 방법 중 하나를 사용하세요.

* 서비스에서 관련 분석 정보를 [자동][2] 또는 [수동][3]으로 전송하도록 APM 추적기를 구성합니다.
* 서비스에서 관련 분석 정보를 전송하도록 Datadog 에이전트를 구성합니다(아래 설명 참고).

**참고**: 에이전트에서 애플리케이션 분석을 활성화하려면 [서비스][3]가 Datadog로 전송되고 있어야 합니다.

1. [서비스 설정이 완료][4]되면 [애플리케이션 분석 설명서 페이지][5]로 이동해 Trace Search에서 사용할 수 있는 [서비스][6] 목록과 [리소스][7] 이름을 찾습니다.
3. [인덱싱된 스팬][8]으로 추출할 `environment`와 `services`를 선택합니다.
2. 아래 정보로 Datadog 에이전트 구성을 업데이트합니다(에이전트 버전에 따라).

{{< tabs >}}
{{% tab "에이전트 6.3.0+" %}}
`datadog.yaml`의 `apm_config` 아래 `analyzed_spans`를 추가합니다. 다음 예시를 참고하세요.

```yaml
apm_config:
  analyzed_spans:
    <SERVICE_NAME_1>|<OPERATION_NAME_1>: 1
    <SERVICE_NAME_2>|<OPERATION_NAME_2>: 1
```

{{% /tab %}}
{{% tab "에이전트 5.25.0+" %}}
`datadog.conf`에 `[trace.analyzed_spans]`를 추가하세요. 다음 예시를 참고하세요.

```text
[trace.analyzed_spans]
<SERVICE_NAME_1>|<OPERATION_NAME_1>: 1
<SERVICE_NAME_2>|<OPERATION_NAME_2>: 1
```

{{% /tab %}}
{{% tab "Docker" %}}
에이전트 컨테이너 환경(버전 12.6.5250+과 호환)에 `DD_APM_ANALYZED_SPANS`를 추가하세요. 형식은 쉼표로 구분되고 띄어쓰기가 없는 일반 표현식입니다. 다음 예시를 참고하세요.

```text
DD_APM_ANALYZED_SPANS="<SERVICE_NAME_1>|<OPERATION_NAME_1>=1,<SERVICE_NAME_2>|<OPERATION_NAME_2>=1"
```

```text
`my-express-app|express.request=1,my-dotnet-app|aspnet_core_mvc.request=1`
```

{{% /tab %}}
{{< /tabs >}}

Datadog에서 자동으로 계측된 서비스 모두에는 `<OPERATION_NAME>`이 있는데, 이는 추적 중인 요청 유형을 설정할 때 사용됩니다. 예를 들어 Python Flask 애플리케이션을 추적 중인 경우, 운영 이름이 `flask.request`입니다. Express를 사용하는 Node 애플리케이션의 경우에는 운영 이름이 `express.request`입니다.

구성에서 `<SERVICE_NAME>`과 `<OPERATION_NAME>`을 변경해 Trace Search에 추가하고 싶은 [트레이스][9]의 서비스 이름과 운영 이름으로 바꾸세요.

예를 들어 이름이 `python-api`인 Python 서비스가 있고 Flask(운영 이름 `flask.request`)에서 실행 중일 경우, `<SERVICE_NAME>`은 `python-api`이고 `<OPERATION_NAME>`은 `flask.request`입니다.

[1]: https://app.datadoghq.com/apm/services
[2]: /ko/tracing/app_analytics/#automatic-configuration
[3]: /ko/tracing/app_analytics/#custom-instrumentation
[4]: /ko/tracing/send_traces/
[5]: https://app.datadoghq.com/apm/settings
[6]: /ko/tracing/glossary/#services
[7]: /ko/tracing/glossary/#resources
[8]: /ko/tracing/app_analytics/search/#analysed-span
[9]: /ko/tracing/glossary/#trace