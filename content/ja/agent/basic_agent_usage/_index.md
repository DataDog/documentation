---
aliases:
- /ja/guides/basic_agent_usage/
- /ja/agent/faq/where-is-the-configuration-file-for-the-agent/
- /ja/agent/faq/log-location
further_reading:
- link: /agent/faq/how-datadog-agent-determines-the-hostname/
  tag: よくあるご質問
  text: Datadog が Agent ホスト名を決定する方法
- link: /agent/configuration/agent-commands/
  tag: よくあるご質問
  text: すべての Agent コマンド
- link: /agent/configuration/agent-configuration-files/
  tag: よくあるご質問
  text: すべての Agent 構成ファイルの場所
- link: https://www.datadoghq.com/blog/engineering/performance-improvements-in-the-datadog-agent-metrics-pipeline/
  tag: ブログ
  text: Datadog Agent メトリクスパイプラインのパフォーマンス向上
title: 基本的な Agent の利用方法
---

{{< partial name="platforms/platforms.html" links="platforms" >}}

## Agent の管理

Datadog Agent Manager GUI またはコマンドラインを使用して、Agent のインストールを管理できます。

### Datadog Agent Manager GUI

<div class="alert alert-info">Agent GUI は 32 ビット Windows プラットフォームではサポートされていません。</div>

Datadog Agent Manager GUI を使用して、次のことを行います。
- Agent のステータス情報を表示する
- すべての実行中のチェックを表示する
- Agent ログを表示する
- Agent コンフィギュレーションファイル (`datadog.yaml`) を編集する
- Agent チェックの追加と編集
- フレアの送信

Datadog Agent Manager GUI は Windows と macOS でデフォルトで有効になっており、ポート `5002` で実行します。デフォルトの Web ブラウザで GUI を開くには、`datadog-agent launch-gui` コマンドを使用します。

GUI のデフォルトポートは `datadog.yaml` コンフィギュレーションファイルで変更できます。GUI を無効にするには、ポートの値を `-1` に設定します。Linux では、GUI はデフォルトで無効になっています。

GUI の要件:
- cookie をブラウザで有効にする必要があります。GUI は、GUI サーバーとのすべての通信を認証するために使用されるトークンを生成し、ブラウザに保存します。
- GUI を起動するには、必要なアクセス許可を持っている必要があります。`datadog.yaml` を開くことができる場合は、GUI を使用できます。
- セキュリティ上の理由から、GUI はローカルネットワークインターフェイス (`localhost`/`127.0.0.1`) から**のみ**アクセスできます。そのため、Agent が実行しているホストにいる必要があります。Agent を VM やコンテナーで実行してホストマシンからアクセスすることはできません。

### コマンドラインインターフェイス

Agent 6 以降、Agent のコマンドラインインターフェイスはサブコマンドに基づいています。Agent サブコマンドの完全なリストについては、[Agent コマンド][2]を参照してください。

## Datadog Agent の次のステップ

### Agent の更新

特定のホスト上で実行されている Datadog Agent のコアを手動でマイナーバージョンにアップデートするには、[プラットフォームの対応するインストールコマンド][7]を実行します。

**注**: 特定の Agent インテグレーションを手動でアップデートするには、[インテグレーション管理ガイド][8]を参照してください。

### 構成ファイル

[Agent コンフィギュレーションファイルに関するドキュメント][9]を参照してください。

### Datadog サイト

[Agent のメインコンフィギュレーションファイル][10]、`datadog.yaml` を編集して、`site` パラメーターを設定します (デフォルトは `datadoghq.com`)。

```yaml
site: {{< region-param key="dd_site" >}}
```

**注**: `site` パラメーターの詳細については、[Datadog サイトの概要ドキュメント][11]を参照してください。

### ログの場所

[Agent ログファイルに関するドキュメント][12]を参照してください。

## Agent のオーバーヘッド

以下は、Datadog Agent リソース消費の例です。テストは、Amazon EC2 マシンの `c5.xlarge` インスタンス (4 VCPU/ 8 GB RAM) で行われ、同様のリソースを持つ ARM64 ベースのインスタンスで同等のパフォーマンスが見られました。Agent 自体を監視するために、vanilla `datadog-agent` がプロセスチェックとともに実行されました。さらにインテグレーションを有効にすると、Agent リソースの消費が増えます。
JMX チェックを有効にすると、監視対象の JVM によって公開される Bean の数に応じて、Agent が使用するメモリの量が増えます。トレースとプロセスを有効にしても、Agents のリソース消費が増えます。

* Agent テストのバージョン: 7.34.0
* CPU: 平均で CPU の約 0.08 % を使用
* メモリ: 約 130 MB の RAM を使用 (RSS メモリ)
* ネットワーク帯域幅: 約 140 B/秒 ▼ | 800 B/秒 ▲
* ディスク:
  * Linux: ディストリビューションによって 830 MB ～ 880 MB
  * Windows: 870 MB

**ログ収集**:

以下は、[HTTP フォワーダー][6]が有効になっている状態で*毎秒 110KB のログが記録される*ファイルから得た結果です。これは、使用可能な圧縮レベルに応じてリソース使用量がどのように増加するかを示しています。

{{< tabs >}}
{{% tab "HTTP compression level 6" %}}

* Agent テストのバージョン: 6.15.0
* CPU: 平均で CPU の約 1.5% を使用
* メモリ: 約 95 MB の RAM 使用。
* ネットワーク帯域幅: 約 14KB/秒 ▲

{{% /tab %}}
{{% tab "HTTP compression level 1" %}}

* Agent テストのバージョン: 6.15.0
* CPU: 平均で CPU の約 1% を使用
* メモリ: 約 95 MB の RAM 使用。
* ネットワーク帯域幅: 約 20KB/秒 ▲

{{% /tab %}}
{{% tab "HTTP Uncompressed" %}}

* Agent テストのバージョン: 6.15.0
* CPU: 平均で CPU の約 0.7 % を使用
* メモリ: 約 90 MB の RAM を使用 (RSS メモリ)
* ネットワーク帯域幅: 約 200KB/秒 ▲

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/troubleshooting/send_a_flare/
[2]: /ja/agent/configuration/agent-commands/
[6]: /ja/agent/logs/log_transport/?tab=https#enforce-a-specific-transport
[7]: https://app.datadoghq.com/account/settings/agent/latest
[8]: /ja/agent/guide/integration-management/
[9]: /ja/agent/configuration/agent-configuration-files/
[10]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[11]: /ja/getting_started/site/
[12]: /ja/agent/configuration/agent-log-files/