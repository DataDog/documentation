---
title: ログ収集のトラブルシューティングガイド
kind: ガイド
aliases:
  - /ja/logs/faq/log-collection-troubleshooting-guide
further_reading:
  - link: /logs/log_collection/
    tag: Documentation
    text: ログの収集方法
  - link: /logs/explorer/
    tag: Documentation
    text: ログの調査方法
  - link: /logs/faq/why-do-my-logs-not-have-the-expected-timestamp/
    tag: FAQ
    text: あるはずのタイムスタンプがログに含まれないのはなぜですか
  - link: /logs/faq/why-do-my-logs-show-up-with-an-info-status-even-for-warnings-or-errors/
    tag: FAQ
    text: 警告またはエラーのログが Info ステータスで表示されるのはなぜですか
---
`dd-agent` でログコレクターから[新しいログを Datadog に送信][1]する際に、よく障害となる問題がいくつかあります。新しいログを Datadog に送信する際に問題が発生した場合は、このページに挙げられたトラブルシューティングをお役立てください。それでも問題が解決しない場合は、[ Datadog サポート][2]までお問い合わせください。

## Agent の再起動が必要

`datadog-agent` のコンフィギュレーションに加えられた変更は、[Agent を再起動][3]した後に反映されます。

## ポート 10516 のアウトバウンドトラフィックがブロックされる

Datadog Agent は、ポート 10516 から TCP で Datadog にログを送信します。この接続が使用できない場合、ログは送信に失敗し、それを示すエラーが `agent.log` ファイルに記録されます。

手動で接続をテストするには、次の Telnet または OpenSSL コマンドを実行します (ポート 10514 でも動作しますが、安全性は劣ります)。

* `openssl s_client -connect intake.logs.datadoghq.com:10516`
* `telnet intake.logs.datadoghq.com 10514`

さらに、次のようなログを送信します。

```text
<API_KEY> これはテストメッセージです
```

- ポート 10514 または 10516 を開くことを選択できない場合は、`datadog.yaml` に次の設定を追加して、Datadog Agent がログを転送するよう構成することができます。

```yaml
logs_config:
  use_http: true
```

詳細については、[HTTPS ログ転送セクション][4]をご参照ください。

## Agent のステータスをチェックします

[Agent のステータスコマンド][5]をチェックすることが、問題の解決に役立つことがあります。

## 新しいログが書き込まれていない

Datadog Agent は、ログの収集 (ログの追跡またはリスニング) を開始して以降に書き込まれたログのみを収集します。ログ収集が適切にセットアップされているかどうかを確認する場合は、まず新しいログが書き込まれていることを確認してください。

## ログファイルを追跡する際のアクセス許可の問題

`datadog-agent` はルートとして実行されません (一般的なベストプラクティスとしても、ルートとして実行することはお勧めしていません)。このため、(カスタムログまたはインテグレーションの) ログファイルを追跡するように `datadog-agent` を構成する場合は、追跡して収集するログファイルへの読み取りアクセス権を `datadog-agent` ユーザーが持つことを特に注意して確認する必要があります。

そのような場合、[Agent のステータス][5] に次のようなエラーメッセージが表示されます。

```text
==========
Logs Agent
==========

  test
  ----
    Type: file
    Path: /var/log/application/error.log
    Status: Error: file /var/log/application/error.log does not exist
```

ファイルアクセス許可の詳細情報を取得するには、`namei` コマンドを実行します。

```text
> namei -m /var/log/application/error.log
> f: /var/log/application/error.log
 drwxr-xr-x /
 drwxr-xr-x var
 drwxrwxr-x log
 drw-r--r-- application
 -rw-r----- error.log
```

この例の場合、`application` ディレクトリが実行可能ディレクトリではないため、Agent はファイルをリストできません。さらに、Agent には `error.log` ファイルに対する読み取りアクセス許可がありません。
[chmod コマンド][6]を使用して、不足しているアクセス許可を追加してください。

{{< img src="logs/agent-log-permission-ok.png" alt="アクセス許可 OK"  style="width:70%;">}}

**注**: 読み取りアクセス許可を追加する際は、ログローテーション構成でそれらのアクセス許可が正しく設定されていることを確認してください。そうでない場合、次のログローテーションで、Datadog Agent が読み取りアクセス許可を失う可能性があります。
Agent がファイルへの読み取りアクセス許可を持つようにするには、ログローテーション構成でそれらのファイルのアクセス許可を `644` に設定します。

## アクセス許可の問題と Journald

journald からログを収集する場合は、[journald インテグレーション][7]で説明されているように、Datadog Agent ユーザーが systemd グループに追加されている必要があります。

ファイルアクセス許可が正しくなければ、journald は空のペイロードを送信します。そのため、この場合は、明示的なエラーメッセージを表示および送信することはできません。

## 構成上の問題

以下に挙げる一般的な構成上の問題は、`datadog-agent` セットアップで何重にもチェックすることをお勧めします。

1. `datadog.yaml` で `api_key` が定義されているかをチェックします。

2. `datadog.yaml` で `logs_enabled: true` が設定されているかをチェックします。

3. デフォルトでは、Agent はログを収集しません。Agent の `conf.d/` ディレクトリに、logs セクションと適切な値が含まれた .yaml ファイルが少なくとも 1 つあることを確認します。

4. 構成ファイルで何らかの .yaml パースエラーが発生することがあります。YAML には細かな注意が必要なため、疑わしい場合は、[YAML 検証ツール][8]を使用してください。

### Agent ログ内のエラーのチェック

問題について記述されたエラーがログに含まれている場合があります。次のコマンドを実行して、このようなエラーをチェックします。

```shell
sudo cat /var/log/datadog/agent.log | grep ERROR
```

## Docker 環境

[Docker ログ収集のトラブルシューティングガイド][9]をご参照ください

## サーバーレス環境

[Lambda ログ収集のトラブルシューティングガイド][10]をご参照ください

## 予期せぬログの欠落

ログが [Datadog Live Tail][11] に表示されることをチェックします。Live Tail に表示される場合は、インデックス構成ページで、いずれかの[除外フィルター][12]がログと一致していないかどうかをチェックしてください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/
[2]: /ja/help/
[3]: /ja/agent/guide/agent-commands/#restart-the-agent
[4]: /ja/agent/logs/log_transport?tab=https#enforce-a-specific-transport
[5]: /ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://en.wikipedia.org/wiki/Chmod
[7]: /ja/integrations/journald/
[8]: https://codebeautify.org/yaml-validator
[9]: /ja/logs/guide/docker-logs-collection-troubleshooting-guide/
[10]: /ja/logs/guide/lambda-logs-collection-troubleshooting-guide/
[11]: https://app.datadoghq.com/logs/livetail
[12]: /ja/logs/indexes/#exclusion-filters