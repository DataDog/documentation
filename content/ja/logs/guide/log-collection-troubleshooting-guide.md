---
title: ログ収集のトラブルシューティングガイド
kind: ガイド
aliases:
  - /ja/logs/faq/log-collection-troubleshooting-guide
further_reading:
  - link: /logs/log_collection
    tag: Documentation
    text: ログの収集方法
  - link: /logs/explorer
    tag: Documentation
    text: ログの調査方法
  - link: /logs/faq/why-do-my-logs-not-have-the-expected-timestamp/
    tag: FAQ
    text: あるはずのタイムスタンプがログに含まれないのはなぜですか
  - link: /logs/faq/why-do-my-logs-show-up-with-an-info-status-even-for-warnings-or-errors/
    tag: FAQ
    text: 警告またはエラーのログが Info ステータスで表示されるのはなぜですか
---
`dd-agent` でログコレクターから[新しいログを Datadog に送信][1]する際に、よく障害となる問題がいくつかあります。新しいログを Datadog に送信する際に問題が発生した場合は、このページに挙げられたトラブルシューティングをお役立てください。それでもトラブルが解消しない場合は、[サポートチーム][2]まで電子メールでお問い合わせください。

## Agent の再起動が必要

`datadog-agent` の構成に何らかの変更を加えた場合、その変更は、Datadog Agent を再起動するまで有効になりません。

## ポート 10516 のアウトバウンドトラフィックがブロックされる

Datadog Agent は、ポート 10516 から TCP で Datadog にログを送信します。この接続が使用できない場合、ログは送信に失敗し、それを示すエラーが `agent.log` ファイルに記録されます。

手動で接続をテストするには、次の Telnet または OpenSSL コマンドを実行します (ポート 10514 でも動作しますが、安全性は劣ります)。

* `openssl s_client -connect intake.logs.datadoghq.com:10516`
* `telnet intake.logs.datadoghq.com 10514`

さらに、次のようなログを送信します。

```
<API_KEY> this is a test message
```

- ポート 10514 または 10516 のオープンを利用できない場合は、`datadog.yaml` に次の設定を追加して、Datadog Agent がポート `443` を使用してログを転送するように指示することができます (Datadog Agent でのみ使用可能)。

```
logs_config:
  use_port_443: true
```

## 新しいログが書き込まれていない

Datadog Agent は、ログの収集 (ログの追跡またはリスニング) を開始して以降に書き込まれたログのみを収集します。ログ収集が適切にセットアップされているかどうかを確認する場合は、まず新しいログが書き込まれていることを確認してください。

## ログファイルを追跡する際のアクセス許可の問題

`datadog-agent` はルートとして実行されません (一般的なベストプラクティスとしても、ルートとして実行することはお勧めしていません)。このため、(カスタムログまたはインテグレーションの) ログファイルを追跡するように `datadog-agent` を構成する場合は、追跡して収集するログファイルへの読み取りアクセス権を `datadog-agent` ユーザーが持つことを特に注意して確認する必要があります。

アクセス権がない場合は、Agent の `status` に次のようなメッセージが表示されます。

{{< img src="logs/agent-log-executable-permission-issue.png" alt="Permission issue" responsive="true" style="width:70%;">}}

ファイルアクセス許可の詳細情報を取得するには、`namei` コマンドを実行します。

```
> namei -m /var/log/application/error.log
> f: /var/log/application/error.log
 drwxr-xr-x /
 drwxr-xr-x var
 drwxrwxr-x log
 drw-r--r-- application
 -rw-r----- error.log
```

この例の場合は、`application` ディレクトリが実行可能ディレクトリではないため、Agent はファイルをリストできません。さらに、Agent には `error.log` ファイルに対する読み取りアクセス許可がありません。
[chmod コマンド][3]を使用して、不足しているアクセス許可を追加してください。

{{< img src="logs/agent-log-permission-ok.png" alt="Permission OK" responsive="true" style="width:70%;">}}

**注**: 読み取りアクセス許可を追加する際は、ログローテーション構成でそれらのアクセス許可が正しく設定されていることを確認してください。そうでない場合、次のログローテーションで、Datadog Agent が読み取りアクセス許可を失う可能性があります。
Agent がファイルへの読み取りアクセス許可を持つようにするには、ログローテーション構成でそれらのファイルのアクセス許可を `644` に設定します。

## アクセス許可の問題と Journald

journald からログを収集する場合は、[journald インテグレーション][4]で説明されているように、Datadog Agent ユーザーが systemd グループに追加されている必要があります。

ファイルアクセス許可が正しくなければ、journald は空のペイロードを送信します。そのため、この場合は、明示的なエラーメッセージを表示および送信することはできません。

## 構成上の問題

以下に挙げる一般的な構成上の問題は、`datadog-agent` セットアップで何重にもチェックすることをお勧めします。

1. 主要な構成上の問題を見つけるには、Agent のステータス構成 `datadog-agent status` を実行します。

2. `datadog.yaml` で `api_key` が定義されているかをチェックします。

3. デフォルトでは、Agent はログを収集しません。Agent の `conf.d/` ディレクトリに、logs セクションと適切な値が含まれた .yaml ファイルが少なくとも 1 つあることを確認します。

4. 構成ファイルで何らかの .yaml パースエラーが発生することがあります。YAML には細かな注意が必要なため、疑わしい場合は、適切な [YAML 検証ツール][5]を使用して調べてみることをお勧めします。

5. `datadog.yaml` で `logs_enabled: true` が設定されているかをチェックします。

### Agent ログ内のエラーのチェック

問題について記述されたエラーがログに含まれている場合があります。次のコマンドを実行するだけで、このようなエラーをチェックできます。

```
sudo cat /var/log/datadog/agent.log | grep ERROR
```

## Docker 環境

### ログ収集が有効にならない

1. Datadog Agent が Docker ソケットにアクセスできることを確認します。
2. `usermod -a -G docker dd-agent` で、Agent ユーザーが Docker グループに含まれていることをチェックします。
3. ログ収集が有効 `DD_LOGS_ENABLED=true` になっていることをチェックします。

### 構成上の問題

少なくとも 1 つの有効なログ構成が、ログ収集を開始するように設定されている必要があります。ログ収集を構成するためのオプションはいくつかあります。少なくとも 1 つを有効にしてください。

1. `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`。これは、すべてのコンテナからログを収集します ([一部のコンテナを除外する方法はこちら][6]を参照してください)。

2. [コンテナラベル][7]によるオートディスカバリー。この場合は、`datadog.yaml` に Docker リスナーと構成プロバイダーを追加します。

```
listeners:
  - name: docker
config_providers:
  - name: docker
    polling: true
```

3. [ポッドアノテーション][8]による Kubernetes でのオートディスカバリー。この場合は、`datadog.yaml` に kubelet リスナーと構成プロバイダーを追加します。

```
listeners:
  - name: kubelet
config_providers:
  - name: kubelet
    polling: true
```

### Journald

コンテナ環境で Journald を使用している場合は、特定のファイルで Agent をマウントする必要があるため、[journald インテグレーション][4]の説明に従ってください。

## サーバーレス環境

### lambda 関数からのログがログエクスプローラーページに表示されない

環境の構成については、[Datadog-AWS ログインテグレーション][9]を参照してください。それでもログが表示されない場合は、さらに以下の点を確認してください。

#### Lambda 関数の構成

Datadog の lambda 構成パラメーターをチェックします。

* `<API_KEY>`: [Datadog API キー][10]を Python コードで直接設定するか、環境変数として設定する必要があります。複数のプラットフォームを管理している場合は、本当に正しいプラットフォームに正しい `<API_KEY>` を使用しているかを再度確認してください。


#### lambda 関数がトリガーされているか

Datadog lambda 関数が実際にトリガーされているかどうかを確認します。それには、Datadog 内で、使用する Datadog lambda 関数の `functionname` タグと共に `aws.lambda.invocations` メトリクスと `aws.lambda.errors` メトリクスを利用します。また、Cloudwatch で Datadog lambda ログにエラーがないかをチェックします。

## 設定間違いによるログの欠落

ログが [Datadog Live Tail][11] に表示されることをチェックします。Live Tail に表示される場合は、インデックス構成ページで、いずれかの[除外フィルター][12]がログと一致していないかどうかをチェックしてください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/logs
[2]: /ja/help
[3]: https://en.wikipedia.org/wiki/Chmod
[4]: https://docs.datadoghq.com/ja/integrations/journald/#pagetitle
[5]: https://codebeautify.org/yaml-validator
[6]: /ja/agent/docker/log/?tab=containerinstallation#filter-containers
[7]: /ja/agent/autodiscovery/integrations/?tab=dockerlabel#configuration
[8]: /ja/agent/autodiscovery/integrations/?tab=kubernetespodannotations#configuration
[9]: /ja/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[10]: https://app.datadoghq.com/account/settings#api
[11]: https://app.datadoghq.com/logs/livetail
[12]: /ja/logs/indexes/#exclusion-filters