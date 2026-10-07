---
disable_toc: false
private: true
title: Agent 5 のポート
---

このページでは、 Agent 5 が使用するポートについて説明します。 Agent の最新バージョンに関する情報は、 [ネットワークトラフィック][1]を参照してください。

<div class="alert alert-danger">
すべてのアウトバウンドトラフィックは、TCP または UDP を介して SSL で送信されます。
<br><br>
ファイアウォールルールまたは同様のネットワーク制限を使用して、Agent がお客様のアプリケーションまたは信頼できるネットワークソースからのみアクセス可能であることを確認してください。信頼できないアクセスにより、悪意のある行為者は Datadog アカウントにトレースやメトリクスを書き込んだり、構成やサービスに関する情報を取得したりすることを含むがこれに限定されない、いくつかの侵入的なアクションを実行できるようになります。
</div>

**Agent** のすべての機能を利用するには、以下のポートを開きます。

#### アウトバウンド

443/tcp
: 大半の Agent データ (メトリクス、APM、ライブプロセス、コンテナなど) 用のポート。

123/udp
: NTP 用のポート (詳細は、[NTP の重要性に関するドキュメント][2]を参照してください)。<br>
[デフォルトの NTP ターゲット][3]を参照してください。

#### インバウンド

6062/tcp
: Process Agent のデバッグエンドポイント用のポート。

6162/tcp
: Process Agent のランタイム設定を構成するためのポート。

8125/udp
: DogStatsD 用のポート。ただし、`dogstatsd_non_local_traffic` が true に設定されていない場合。このポートは、次のローカルホストで利用できます: `127.0.0.1`、`::1`、`fe80::1`。

8126/tcp
: [APM レシーバー][4]用のポート。

17123/tcp
: Agent Forwarder。Agent と Datadog の間でネットワークスプリットが発生した場合にトラフィックのバッファリングに使用されます。

17124/tcp
: オプションの graphite アダプター。

[1]: /ja/agent/network
[2]: /ja/agent/faq/network-time-protocol-ntp-offset-issues/
[3]: /ja/integrations/ntp/#overview
[4]: /ja/tracing/