---
title: Datadog にイベントを送信する
---

## 標準イベント
追加設定を行わなくても、Datadog Events は Agent およびインストール済みインテグレーションによって収集されたイベントを自動的に集約します。

Kubernetes、Docker、Jenkins、Chef、Puppet、Amazon ECS または Autoscaling、Sentry、Nagios など、100 を超える Datadog インテグレーションがイベント収集をサポートしています。

{{< whatsnext desc="イベントを Datadog に送信する:" >}}
    {{< nextlink href="https://app.datadoghq.com/integrations" >}}インテグレーション{{< /nextlink >}}
{{< /whatsnext >}}

## カスタムイベント
Datadog API、カスタム Agent チェック、DogStatsD、または Events Email API を使用して、独自のカスタムイベントを送信することもできます。

{{< whatsnext desc="カスタムイベントを Datadog に送信する:" >}}
    {{< nextlink href="/api/latest/events/#post-an-event" >}}Datadog API{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/agent/" >}}カスタム Agent チェック{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/email/" >}}メール{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/dogstatsd/" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/integrations/guide/events-from-sns-emails/" >}}Amazon SNS メール{{< /nextlink >}}
    {{< nextlink href="/logs/guide/sending-events-and-logs-to-datadog-with-amazon-eventbridge-api-destinations/#configuration" >}}Amazon EventBridge API デスティネーション{{< /nextlink >}}
{{< /whatsnext >}}