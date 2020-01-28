---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - security
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/sigsci/README.md'
display_name: Signal Sciences
git_integration_title: sigsci
guid: 0c92b7cd-0736-4f9d-82ed-16f1bba8c8d0
integration_id: sigsci
integration_title: Signal Sciences
is_public: true
kind: インテグレーション
maintainer: info@signalsciences.com
manifest_version: 1.0.0
metric_prefix: sigsci.
metric_to_check: sigsci.test
name: sigsci
public_title: Datadog-Signal Sciences インテグレーション
short_description: Signal Sciences からデータを収集して異常値を表示し、攻撃を阻止
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Signal Sciences のメトリクスとイベントを Datadog に送信することで、アプリケーション、API、マイクロサービスなどに対する攻撃や悪用をリアルタイムに監視できます。また、Signal Sciences が正しく機能し、トラフィックを検査していることを確認できます。

![image-datadog-sigsci-dashboard][11]

![image-datadog-sigsci-security][1]

Signal Sciences からメトリクスとイベントをリアルタイムに取得して、以下のことができます。

* 以下に関連する WAF のメトリクスを表示できます。
  - 合計リクエスト数
  - 主要な潜在的攻撃の種類
  - コマンドの実行
  - SQL インジェクション
  - クロスサイトスクリプティング
  - パススキャニング
  - 異常トラフィック
  - 不明ソース
  - サーバーの 400/500

* 以下のアクティビティのいずれかにより、Signal Sciences がブロックするか、悪意があると見なした IP を表示できます。
  - OWASP インジェクション攻撃
  - アプリケーション DoS
  - ブルートフォース攻撃
  - アプリケーションの悪用および誤用
  - リクエスト率制限
  - アカウント乗っ取り
  - 不正なボット
  - 仮想パッチ

* Signal Sciences エージェントのステータスに関するアラートを表示できます。

## セットアップ

Signal Sciences-Datadog インテグレーションを使用するには、Signal Sciences ユーザーである必要があります。Signal Sciences の詳細については、<https://www.signalsciences.com> にアクセスしてください。

### コンフィグレーション

#### メトリクスの収集

1. [Signal Sciences エージェント][8]をインストールします。

2. DogStatsD を使用するように Signal Sciences エージェントを構成します。

    各エージェントの agent.config ファイルに次の行を追加します。
    ```
    statsd-type = "dogstatsd"
    ```

    追加すると、エージェントの StatsD クライアントのタグ付け機能が有効になり、`sigsci.agent.signal.<SIGNAL_TYPE>` のようなメトリクスは、`signal_type:<SIGNAL_TYPE>` のタグが付いた `sigsci.agent.signal` として送信されます。

    例: `sigsci.agent.signal.http404` は、`signal_type:http404` のタグが付いた `sigsci.agent.signal` として送信されます。

    Kubernetes を使用して Datadog Agent を実行している場合は、[Kubernetes と DogStatsD に関するドキュメント](https://docs.datadoghq.com/agent/kubernetes/dogstatsd/)の説明に従って、DogStatsD の非ローカルトラフィックを必ず有効にしてください。

3. メトリクスを Datadog Agent に送信するように SigSci エージェントを構成します。

    各エージェントの `agent.config` ファイルに次の行を追加します。
    ```
    statsd-address="<DATADOG_AGENT_HOSTNAME>:<DATADOG_AGENT_PORT>"
    ```

4. ボタンをクリックしてインテグレーションをインストールします。

5. Datadog で、「Signal Sciences - Overview」ダッシュボードが作成され、メトリクスのキャプチャが開始されていることを確認します。

#### イベント収集

1. Datadog で、[API キーを作成][2]します。

2. [Signal Sciences ダッシュボード][3]のサイトナビゲーションバーで、Manage > Integrations をクリックし、Datadog Event インテグレーションの横にある Add をクリックします。

3. **API Key** フィールドに API キーを入力します。

4. **Add** をクリックします。


**詳細情報**

- [こちらのビデオ][9]で、エージェントの構成と Datadog の設定について説明しています。
- [Signal Sciences のドキュメント][10]で、詳細をご確認ください。

## 収集データ
### メトリクス

```
sigsci.agent.waf.total
sigsci.agent.waf.error
sigsci.agent.waf.allow
sigsci.agent.waf.block
sigsci.agent.waf.perf.decision_time
sigsci.agent.waf.perf.queue_time
sigsci.agent.rpc.connections.open
sigsci.agent.runtime.cpu_pct
sigsci.agent.runtime.mem.sys_bytes
sigsci.agent.runtime.uptime
sigsci.agent.signal
```

### イベント

すべての Signal Sciences イベントが [Datadog のイベントストリーム][4]に送信されます。

### サービスのチェック

Signal Sciences インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

## その他の参考資料


アプリケーションセキュリティ、DevOps、SecOps、およびすべての操作については、[Signal Sciences のブログ][6]を参照してください。

Signal Sciences のサブスクリプションなしで、アプリケーション、API、マイクロサービスなどに対する攻撃をリアルタイムに表示できる無料サービス Signal Sciences-Datadog Monitoring に登録できます。[登録ページ][7]にアクセスしてください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sigsci/images/datadog-sigsci-security.png
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://dashboard.signalsciences.net
[4]: https://docs.datadoghq.com/ja/events
[5]: https://docs.datadoghq.com/ja/help
[6]: https://labs.signalsciences.com
[7]: https://info.signalsciences.com/datadog-security
[8]: https://docs.signalsciences.net/install-guides/
[9]: https://player.vimeo.com/video/347360711
[10]: https://docs.signalsciences.net/integrations/datadog/
[11]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sigsci/images/datadog-sigsci-dashboard.png


{{< get-dependencies >}}