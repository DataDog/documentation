---
aliases:
- /ja/change_tracking/feature_flags/
description: Datadog で Feature Flag の変更を追跡、関連付け、修正して、フラグの更新によって生じる問題を特定して解決する方法を学びます。
further_reading:
- link: /change_tracking/
  tag: ドキュメント
  text: Change Tracking
- link: /feature_flags/
  tag: ドキュメント
  text: Datadog Feature Flags
- link: /integrations/launchdarkly/#feature-flag-tracking-integration/
  tag: ドキュメント
  text: LaunchDarkly
title: Feature Flag の変更を追跡する
---
## 概要{#overview}

Datadog の Feature Flag Tracking を使用すると、フラグの変更とシステムパフォーマンスの問題を関連付けて、インシデントを迅速に解決することができます。フラグがいつ切り替え、更新、またはロールアウトされたかを追跡することで、Feature Flag の変更がパフォーマンスの低下や停止を引き起こしたかどうかを特定できます。

Feature Flag Tracking により、次のことが可能になります。
- ダッシュボード、モニター、サービスページでフラグの変更を直接確認する
- フラグの変更の影響を受けるサービスを自動的に特定する
- 問題のあるフラグを Datadog 内から直接ロールバックする

{{< img src="/change_tracking/monitor.png" alt="モニターグラフには、フラグの変更と関連があるエラーの急増が表示されます。" style="width:100%;" >}}

## Feature Flags を追跡する {#track-feature-flags}

Datadog では、[Datadog Feature Flags][8] の自動追跡、LaunchDarkly インテグレーションを使用した [LaunchDarkly][1] フラグ、または[イベント API][3] を使用した他のプロバイダーからのフラグの追跡がサポートされています。

### Datadog Feature Flags {#datadog-feature-flags}

[Datadog Feature Flags][8] の変更の追跡は自動的に有効になります。追加のセットアップは不要です。環境内でフラグのターゲット、ロールアウト、またはステータスを更新すると、Datadog から変更追跡イベントが発行されます。このイベントはサービスの Change Tracking タイムラインに表示されます。

各イベントには以下が含まれます。

- フラグのキーと名前
- 変更が発生した環境 (およびそれが本番環境かどうか)
- 変更を行ったユーザー
- ターゲティングルールやバリアントを含む、変更前の値と新しい値
- Datadog 内の Feature Flag へのリンク

Datadog Feature Flag の変更をサービスに関連付けるには、Datadog トレーシングライブラリを使用して[フラグ評価コードをインスツルメント][4]します。Datadog は、生成される APM トレースを使用して、どのサービスがフラグを評価しているかを自動的に検出します。詳細については、「[影響を受けるサービスを自動的に検出する](#automatically-detect-affected-services)」を参照してください。

### LaunchDarkly フラグ {#launchdarkly-flags}

サービスの Change Tracking タイムラインで LaunchDarkly の Feature Flag を追跡するには、次のようにします。

1. LaunchDarkly で [Datadog インテグレーション][1]を有効にします。
1. LaunchDarkly で [{{< ui >}}Flags{{< /ui >}}] (フラグ) > [`<your-feature-flag-name>`] に移動します。
1. [{{< ui >}}Datadog tags{{< /ui >}}] (Datadog タグ) で、キーが `service` で、値が `<your-service-name>` (ご使用の Datadog のサービス名と完全に一致する名前) であるタグを追加します。
1. [{{< ui >}}Save changes{{< /ui >}}] (変更を保存) をクリックします。

たとえば、以下の例で使用されている `payments_api` サービスにフラグをリンクするには、タグの値を `payments_api` に設定します。イベントを送信したら、[カタログ][7]に移動し、`payments_api` サービスを選択すると、Change Tracking タイムラインで `fallback_payments_test` Feature Flag イベントを確認できます。

### カスタム Feature Flag {#custom-feature-flags}

[イベント API][3] を使用して、任意のプロバイダーから Feature Flag イベントを送信します。`change` カテゴリーイベントを作成し、サービスタグを含めて、イベントをサービスにリンクさせます。

#### 推奨タグ {#recommended-tags}

カスタム Feature Flag 変更イベントを送信する際は、Datadog 内での正確なフィルタリングと製品間の相関付けを可能にするため、以下のフィールドを含めてください。

- `impacted_resources` (タイプ `service`): `impacted_resources` 配列に該当するサービス名を追加して、Feature Flag の変更を影響を受けるサービスに関連付けます。
- `env`タグ: 変更が発生した環境を指定します (例: production、staging、development)。

イベントの作成時にこれらのタグを追加できない場合は、次のセクションで自動エンリッチメントの説明を参照してください。

リクエスト例:

```json
{
  "data": {
    "attributes": {
      "aggregation_key": "string",
      "attributes": {
        "author": {
          "name": "datadog@datadog.com",
          "type": "user"
        },
        "change_metadata": {
          "dd": {
            "team": "datadog_team",
            "user_email": "datadog@datadog.com",
            "user_id": "datadog_user_id",
            "user_name": "datadog_username"
          },
          "resource_link": "datadog.com/feature/fallback_payments_test"
        },
        "changed_resource": {
          "name": "fallback_payments_test",
          "type": "feature_flag"
        },
        "impacted_resources": [
          {
            "name": "payments_api",
            "type": "service"
          }
        ],
        "new_value": {
          "enabled": true,
          "percentage": "50%",
          "rule": {
            "datacenter": "devcycle.us1.prod"
          }
        },
        "prev_value": {
          "enabled": true,
          "percentage": "10%",
          "rule": {
            "datacenter": "devcycle.us1.prod"
          }
        }
      },
      "category": "change",
      "message": "payment_processed feature flag has been enabled",
      "tags": [
        "env:test"
      ],
      "timestamp": "string",
      "title": "payment_processed feature flag updated"
    },
    "type": "event"
  }
}
```

## 影響を受けるサービスを自動的に検出する {#automatically-detect-affected-services}

LaunchDarkly インテグレーションやイベント API を使用した Feature Flag の設定変更の追跡に加え、Datadog では APM トレースやメトリクスを使用して、どのサービスがフラグを評価しているかを自動的に検出できます。これにより、特に同じフラグが複数のサービスによって評価される場合に、システム全体でのフラグ使用状況をリアルタイムで可視化できます。

### トレースベースのエンリッチメント {#trace-based-enrichment}
トレースベースのエンリッチメントでは、APM トレースを使用して、Feature Flag の変更を該当する Datadog サービスに自動的に関連付けます。次のセクションでは、コードベースでこれを実装する方法を詳しく説明します。

#### セットアップ {#setup}

Feature Flag を使用するサービスを自動的に検出するには、Datadog SDK を使用して Feature Flag の評価コードをインスツルメントします。これにより、元々タグ付けされていなかったサービスも含め、特定のフラグを評価するすべてのサービスを Datadog が自動的に検出できます。

1. Datadog SDK を使用して [Feature Flag の評価コードをインスツルメント][4]します。
1. オペレーション名が `experiments.IsEnabled` のカスタムスパンを作成し、Feature Flag の評価を追跡します。
3. スパンに `experiment_id:<flag-id>` というタグを付けます。`<flag-id>` は Feature Flag ID です。

例:

```python
# Trace feature flag evaluation to enable auto-detection
with tracer.trace("experiments.IsEnabled") as span:
    span.set_tag("experiment_id", "fallback_payments_test") # adds the flag name as a span tag
    # Your existing feature flag evaluation code
    flag_value = evaluate_flag("fallback_payments_test")
    span.set_tag("experiment_value", flag_value) # adds the evaluated flag value as a span tag
```

### メトリクスベースのエンリッチメント {#metrics-based-enrichment}

メトリクスベースのエンリッチメントでは、Datadog メトリクスを使用して、サービスのコンテキストで Feature Flag の変更を補完します。次のセクションでは、コードベースでこれを実装する方法を説明します。

#### セットアップ {#setup-1}

実験ステータスと共に `dd.dynamic_config.is_experiment_enabled` メトリクスを送信します。

```python
from datadog import initialize, statsd

initialize(statsd_host='localhost', statsd_port=8125)

# Any metric type is supported
statsd.gauge(
    'dd.dynamic_config.is_experiment_enabled',
    1,  # 1 if enabled, 0 if disabled
    tags=[
        'experiment.id:fallback_payments_test',
        'service:payments_api'
    ]
)
```

## Workflow Automation で Feature Flag の変更を修正する {#remediate-feature-flag-changes-with-workflow-automation}

Feature Flag の変更によって問題が発生したことを特定した場合は、Datadog を離れることなく、すぐにその状態を切り替えることができます。この機能では [Workflow Automation][2] を使用して、Change Tracking タイムラインから直接 LaunchDarkly フラグを切り替えます。

<div class="alert alert-info">この機能には Workflow Automation が必要です。<a href="https://www.datadoghq.com/pricing/?product=workflow-automation#products">Workflow Automation の価格</a>を参照してください。</div>

### セットアップ {#setup-2}

Workflow Automation を使用して Feature Flag の切り替えを設定するには、次のようにします。

1. [**[Actions] (アクション) > [Action Catalog] > [Connections] (接続)**][6] に移動します。
1. [**New Connection**] (新規接続) をクリックします。
1. [{{< ui >}}LaunchDarkly{{< /ui >}}] を選択します。
1. 必要な情報を入力し、[{{< ui >}}Next, Confirm Access{{< /ui >}}] (次へ、アクセスを確認) をクリックします。
1. 接続のアクセス権限を設定します。
1. [{{< ui >}}Create{{< /ui >}}] (作成) をクリックします。

### Feature Flag の切り替えを使用する {#use-feature-flag-toggles}

Datadog 内から Feature Flags をオンまたはオフに切り替えるには、次のようにします。

1. Change Tracking タイムラインで LaunchDarkly の Feature Flag の変更をクリックします。
1. [{{< ui >}}Toggle Feature Flag{{< /ui >}}] (Feature Flag の切り替え) ボタンをクリックします。
1. [{{< ui >}}Run Action{{< /ui >}}] (アクションを実行) をクリックしてワークフローを実行し、Feature Flag をオンまたはオフに切り替えます。

{{< img src="/change_tracking/toggle.png" alt="[Toggle Feature Flag] ボタンが表示されている、LaunchDarkly の Feature Flag イベントの詳細パネル。" style="width:90%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/launchdarkly/#setup
[2]: https://app.datadoghq.com/actions/connections
[3]: /ja/api/latest/events/
[4]: /ja/tracing/trace_collection/
[5]: https://app.datadoghq.com/apm/settings
[6]: https://app.datadoghq.com/actions/connections
[7]: https://app.datadoghq.com/software
[8]: /ja/feature_flags/