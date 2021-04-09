---
categories:
  - web
  - log collection
ddtype: crawler
dependencies: []
description: キャッシュ関連メトリクス、オリジンリクエスト、応答コードなどを追跡。
doc_link: 'https://docs.datadoghq.com/integrations/fastly/'
draft: false
git_integration_title: fastly
has_logo: true
integration_title: Fastly
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: fastly
public_title: Datadog-Fastly インテグレーション
short_description: キャッシュ関連メトリクス、オリジンリクエスト、応答コードなどを追跡。
version: '1.0'
---
{{< img src="integrations/fastly/fastlygraph.png" alt="Fastly Graph" popup="true">}}

## 概要

Fastly に接続して、Fastly のキーメトリクス (キャッシュカバレッジ、ヘッダーサイズなど) を Datadog の他のメトリクスと関連付けて表示できます。

## セットアップ

### インストール

必要なインストール手順はありません。

### コンフィギュレーション

#### メトリクスの収集

Fastly のトークン管理ページで読み取り専用アクセス API トークンを作成し、ダッシュボードからサービス ID を取得して、それらを [Fastly インテグレーションタイル][1]に入力します。

<div class="alert alert-info">
サービス ID は、5VqE6MOOy1QFJbgmCK41pY のような英数字のコードです (<a href="https://docs.fastly.com/api/auth">こちらの例</a>)。
</div>

1 つのアカウントで複数のサービス ID を使用している場合は、各行に API トークンを入力してください。

#### ログの収集

Fastly ログを Datadog アプリケーションに転送するように Datadog エンドポイントを構成します。`Datadog` または `Datadog (via Syslog)` エンドポイントを選択できます。Syslog 経由でログをより確実に配信するには、`Datadog` エンドポイントをお勧めします。

##### ログエンドポイントの選択

1. Fastly Web インターフェイスにログインし、**Configure リンク**をクリックします。
2. **Service** メニューから、該当するサービスを選択します。
3. **Configuration** ボタンをクリックし、次に **Clone active** を選択します。Domains ページが表示されます。
4. **Logging** リンクをクリックします。ログエンドポイントページが表示されます。**Datadog** または **Datadog (via Syslog)** オプションの下の **Create Endpoint** をクリックします。

##### Datadog エンドポイントを構成する (推奨)

1. エンドポイントに名前を付けます (例: `Datadog`)。
2. ログ形式を構成します。デフォルトで、**[推奨される Datadog-Fastly ログ形式][2]**がすでに用意されており、カスタマイズできます。
3. Datadog アカウントのリージョンと一致するように、リージョンとして US または EU を選択します。アカウントのログインが `datadoghq.com` にアクセスする場合は US リージョンアカウント、`datadoghq.eu` にアクセスする場合は EU リージョンアカウントをお持ちです。
4. [Datadog API キー][3]を追加します。
5. 下部にある **Create** をクリックします。
6. 右上の **Activate** をクリックして、新しいコンフィギュレーションをアクティブ化します。数分後、ログがアカウントに流れ始めます。

##### Syslog エンドポイントの構成

1. エンドポイントに名前を付けます (例: `Datadog`)。
2. ログ形式を構成して、**[推奨の Datadog-Fastly ログ形式][2]**の先頭に [Datadog API キー][3]を含めます。

    ```text
    <DATADOG_API_KEY> <DATADOG_FASTLY_LOG_FORMAT>
    ```

    注: Datadog-Fastly ログ形式の先頭に Datadog API キーがないと、ログが Datadog に表示されません。ログ変数の詳細については、[Fastly のドキュメント][4]を参照してください。

3. **Syslog Address** を `intake.logs.datadoghq.com` (EU リージョンの場合は、`tcp-intake.logs.datadoghq.eu`) に設定します。
4. **Port** を `10516` (EU リージョンの場合は `443`) に設定します。
5. **TLS** を `yes` に設定します。
6. **TLS Hostname** を `intake.logs.datadoghq.com` に設定します。
7. Advanced options セクションで、**log line format** として `Blank` を選択します。
8. 最後に、エンドポイントを保存し、サービスをデプロイします。数秒後に、ログが [Datadog アカウント][5]に流れ込むようになります。

## 収集データ

### メトリクス
{{< get-metrics-from-git "fastly" >}}


### イベント

Fastly インテグレーションには、イベントは含まれません。

### サービスのチェック

Fastly インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#integrations/fastly
[2]: https://docs.datadoghq.com/resources/json/fastly_format.json
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://docs.fastly.com/guides/streaming-logs/useful-variables-to-log
[5]: https://app.datadoghq.com/logs
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/fastly/fastly_metadata.csv
[7]: https://docs.datadoghq.com/ja/help/