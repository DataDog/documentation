---
aliases:
- /ja/security_platform/cloud_workload_security/troubleshooting/
kind: documentation
title: クラウドセキュリティ管理のトラブルシューティング
---

## Security Agent フレア

[Agent フレア][1]と同様に、必要なトラブルシューティング情報を 1 つのフレアコマンドで Datadog のサポートチームに送信できます。

フレアはアップロード前に確認を求めるので、Security Agent が送信する前にコンテンツを確認することができます。

以下のコマンドで、`<CASE_ID>` を実際の Datadog サポートケース ID（ある場合）に置き換え、それに紐づけされているメールアドレスを入力します。

ケース ID がない場合は、Datadog へのログインに使用するメールアドレスを入力して新しいサポートケースを作成します。

| プラットフォーム     | コマンド                                                                             |
| --------     | -------                                                                             |
| Docker       | `docker exec -it datadog-agent security-agent flare <CASE_ID>`                      |
| Kubernetes   | `kubectl exec -it <POD_NAME> -c security-agent -- security-agent flare <CASE_ID>`   |
| ホスト         | `sudo /opt/datadog-agent/embedded/bin/security-agent flare <CASE_ID>`               |

## Agent セルフテスト

`security-agent` と `system-probe` 間の通信が期待通りに動作しているか、クラウドワークロードセキュリティがシステムイベントを検出できているかを確認するために、以下のコマンドを実行して手動でセルフテストをトリガーすることが可能です。

| プラットフォーム     | コマンド                                                                             |
| --------     | -------                                                                             |
| Docker       | `docker exec -it datadog-agent security-agent runtime self-test`                    |
| Kubernetes   | `kubectl exec -it <POD_NAME> -c security-agent -- security-agent runtime self-test` |
| ホスト         | `sudo /opt/datadog-agent/embedded/bin/security-agent runtime self-test`             |

セルフテスト手順は、いくつかの一時ファイルとそれを監視するルールを作成し、それらのルールをトリガーにして、イベントが正しく伝搬されることを確認します。

ルールが伝搬されると、次のようなレスポンスが表示されます。
```
Runtime self test: OK
```

これで、`runtime-security-agent` から来るイベントをログエクスプローラーで見ることができるようになりました。

{{< img src="security_platform/cws/self_test_logs.png" alt="ログエクスプローラーに表示されるセルフテストのイベント" style="width:90%;">}}

## カスタム Kubernetes ネットワークプラグインとの互換性

クラウドワークロードセキュリティのネットワークベースの検出は、Linux カーネルのトラフィック制御サブシステムに依存しています。このサブシステムは、複数のベンダーが「clsact」イングレス qdisc 上のフィルターを挿入、置換、削除しようとすると、レースコンディションが発生することが知られています。以下のチェックリストに従って、クラウドワークロードセキュリティが適切に構成されていることを確認してください。

* ベンダーが eBPF トラフィックコントロールクラシファイアを活用しているかどうか確認してください。もしそうでなければ、このパラグラフは無視してかまいません。
* ネットワークパケットへのアクセスを許可した後、ベンダーが TC_ACT_OK または TC_ACT_UNSPEC を返しているかどうかを確認してください。TC_ACT_UNSPEC を返すようであれば、このパラグラフは無視してかまいません。
* ベンダーの eBPF クラシファイアがどの優先度に設定されているかを確認してください。
  * 優先度 1 を使用していると、CWS のネットワーク検出がコンテナ内で機能しません。
  * もし、優先度 2〜10 を使用している場合は、`runtime_security_config.network.classifier_priority` を、ベンダーが選んだ優先度よりも厳密に低い数値に構成してください。
  * 優先度 11 以上を使用している場合は、このパラグラフは無視してかまいません。

例えば、Cilium 1.9 以下と Datadog Agent (バージョン 7.36 から 7.39.1, 7.39.2 を除く) との間には、新しいポッドを起動したときに発生する可能性のある既知の競合が存在します。この競合により、Cilium の構成によっては、ポッド内の接続が失われる可能性があります。

最終的に、Datadog Agent やサードパーティベンダーが問題の発生を防ぐように構成できない場合は、以下の手順でクラウドワークロードセキュリティのネットワークベースの検出を無効化する必要があります。

* ホストベースのインストールでは、`system-probe.yaml` コンフィギュレーションファイルに以下のパラメーターを追加してください。
```yaml
runtime_security_config:
  network:
    enabled: false
```
* Datadog Agent のデプロイにパブリック Helm Chart を使用している場合は、以下の値を追加します。
```yaml
datadog:
  securityAgent:
    runtime:
      network:
        enabled: false
```
* Datadog Agent コンテナを手動でデプロイしている場合は、以下の環境変数を追加します。
```bash
DD_RUNTIME_SECURITY_CONFIG_NETWORK_ENABLED=false
```

[1]: /ja/agent/troubleshooting/send_a_flare/?tab=agentv6v7