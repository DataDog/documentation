---
title: Datadog에 이벤트 전송
---

## 표준 이벤트
추가 설정 없이 Datadog Events는 에이전트 및 설치된 통합에서 수집한 이벤트를 자동으로 수집합니다.

Kubernetes, Docker, Jenkins, Chef, Puppet, Amazon ECS 또는 Autoscaling, Sentry, Nagios를 포함하여 100개 이상의 Datadog 통합이 이벤트 수집을 지원합니다.

{{< whatsnext desc="Datadog에 이벤트 전송:">}}
    {{< nextlink href="https://app.datadoghq.com/integrations" >}}통합{{< /nextlink >}}
{{< /whatsnext >}}

## 커스텀 이벤트
Datadog API, Custom Agent Check, DogStatsD, 또는 Events Email API를 사용하여 커스텀 이벤트를 제출할 수도 있습니다.

{{< whatsnext desc="Datadog에 커스텀 이벤트 전송:">}}
    {{< nextlink href="/api/latest/events/#post-an-event" >}}Datadog API{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/agent/" >}}Custom Agent Check{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/email/" >}}이메일{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/dogstatsd/" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/integrations/guide/events-from-sns-emails/" >}}Amazon SNS 이메일{{< /nextlink >}}
    {{< nextlink href="/logs/guide/sending-events-and-logs-to-datadog-with-amazon-eventbridge-api-destinations/#configuration" >}}Amazon EventBridge API Destinations{{< /nextlink >}}
{{< /whatsnext >}}