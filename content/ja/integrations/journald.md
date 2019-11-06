---
integration_title: Journald
kind: インテグレーション
public_title: Datadog-Journald インテグレーション
categories:
  - ログの収集
description: ジャーナルから Datadog にログを転送
short_description: ジャーナルから Datadog にログを転送
has_logo: true
is_public: true
name: journald
ddtype: check
supported_os:
  - linux
---
## 概要

Systemd-journald は、ログデータを収集して保管するシステムサービスです。さまざまなソースから受け取ったログ情報に基づいて、構造化およびインデックス化されたジャーナルを作成し、維持します。

## セットアップ

### インストール

ジャーナルファイルは、デフォルトでは、`systemd-journal` システムグループによって所有され、読み取られます。ジャーナルログの収集を開始するには、以下のようにします。

1. ジャーナルを実行しているインスタンスに [Agent をインストールします][1]。
2. 以下を実行して、`systemd-journal` グループに `dd-agent` ユーザーを追加します。

```
usermod -a -G systemd-journal dd-agent
```

### コンフィグレーション

Agent のディレクトリのルートにある Agent の `conf.d/` フォルダー内に、`journald.d/conf.yaml` ファイルを作成します。

#### ログの収集

**Agent バージョン 6 .0 以上で使用可能**

Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

```
logs_enabled: true
```

ログの収集を開始するには、次の構成ブロックを `journald.d/conf.yaml` ファイルに追加します。

```
logs:
  - type: journald
```

最後に、[Agent を再起動][2]します。

#### 高度な機能

##### ジャーナルの場所の変更

Agent は、デフォルトで次の場所でジャーナルを探します。

* `/var/log/journal`
* `/var/run/journal`

ジャーナルがこれ以外の場所にある場合は、`path` パラメーターに、対応するジャーナルのパスを追加します。

##### ジャーナルユニットの絞り込み

以下のパラメーターを使用して、特定のユニットに絞り込んだり除外することができます。

* `include_units`: 指定されたすべてのユニットを含めます。
* `exclude_units`: 指定されたすべてのユニットを除外します。

例:

```
logs:
  - type: journald
    path: /var/log/journal/
    include_units:
      - docker.service
      - sshd.service
```

##### コンテナタグの収集

高度に動的なコンテナ環境において情報を見つける際にタグは重要です。Agent が journald ログからコンテナタグを収集できる理由はここにあります。

Agent がホストから実行されている場合、これは自動的に機能します。Datadog Agent のコンテナバージョンを使用している場合は、ジャーナルパスと次のファイルをマウントしてください。

- `/etc/machine-id`: これで、Agent は、ホストに格納されたジャーナルに確実に問い合わせることができます。

最後に、[Agent を再起動][2]します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## その他の参考資料

インフラストラクチャーの監視の詳細および Datadog の全インテグレーションについては、[ブログ記事][4]を参照してください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[3]: /ja/help
[4]: https://www.datadoghq.com/blog