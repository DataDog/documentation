---
title: Synthetic テストトンネル
kind: documentation
description: Datadog Synthetic テストトンネルを使用したローカルおよび CI/CD テスト。
further_reading:
  - link: 'https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/'
    tag: ブログ
    text: Datadog Synthetic テストを CI/CD パイプラインに組み込む
  - link: 'https://learn.datadoghq.com/course/view.php?id=37'
    tag: ラーニングセンター
    text: CI/CD パイプラインで Synthetic テストを実行する方法を学ぶ
  - link: 'https://www.datadoghq.com/blog/internal-application-testing-with-datadog/'
    tag: ブログ
    text: Datadog のテストトンネルとプライベートロケーションを使用して内部アプリケーションをテストします
  - link: /synthetics/browser_tests/
    tag: ドキュメント
    text: ブラウザテストの設定
  - link: /synthetics/api_tests/
    tag: ドキュメント
    text: APIテストの設定
---
<div class="alert alert-warning">
この機能は現在公開ベータ版です。
</div>

Synthetic テストトンネルは、内部環境と Datadog インフラストラクチャーの間に短期間の安全な接続を作成し、プライベートアプリケーションで Synthetic テストを迅速にトリガーできるようにします。
Datadog は、CI/CD パイプラインから、または専用の長期的なプロービングシステム ([プライベートロケーション][1]など) をデプロイせずにアプリケーションのローカルバージョンに対して Synthetics テストを起動する場合は、テストトンネルを使用することをお勧めします。テストトンネルは、エフェメラルクラウド環境でのテストのトリガーを検討している場合にも役立ちます。

## テストトンネルとは

テストトンネルは、**[@datadog/datadog-ci][2] NPM パッケージ**に付属する機能です。これは、CI/CD パイプラインの一部として Synthetic テストを含めるために Datadog が<span class="x x-first x-last">提供する</span>方法の 1 つです。テストトンネルは、インフラストラクチャーと Datadog の間にエンドツーエンドの暗号化された HTTP プロキシを作成します。つまり、CLI を<span class="x x-first x-last">介して</span>送信されたテストリクエストはすべて、`datadog-ci `クライアントを介して自動的にルーティングされます<span class="x x-first x-last">。これにより、</span>Datadog は内部アプリケーションにアクセスしてテストすることができます。

{{< img src="synthetics/tunnel_diagram.png" alt="Synthetic テストトンネル図"  style="width:100%;">}}

`datadog-ci` はまず、認証のために Datadog から事前に署名された URL を取得します。次に、事前に署名された URL を使用して、Datadog の管理された場所への WebSocket Secure 接続 (wss) を開きます。WebSocket 接続を介した SSH 接続を使用して、テストは `datadog-ci` によってトリガーされ、Datadog の管理ロケーションを介して実行されます。
DNS 解決はトンネルを介して実行されるため、内部ドメインを使用して、または `datadog-ci` を実行しているマシンの `localhost` でアプリケーションをテストできます。

**注:** テストトンネルを使用する場合、テストのロケーションは、Datadog アカウントのリージョンに依存するロケーションによって上書きされます。

## テストトンネルの使用方法

上記のように、テストトンネルは [@datadog/datadog-ci][2] NPM パッケージに付属しており、パッケージのバージョン [v0.11.0][3] から入手できます。Datadog CI/CD テストインテグレーションの使用を開始する方法については、[Synthetics CI ドキュメント][4]を参照してください。

ローカルマシンまたは CI サーバーにクライアントをセットアップしたら、`--tunnel` でテストを起動するために使用するコマンドを追加することにより、トンネルでテストを起動することを決定できます。たとえば、グローバルコンフィギュレーションファイルを使用している場合は、次を使用できます。

```sh
datadog-ci synthetics run-tests --config <GLOBAL_CONFIG_FILE>.json --tunnel
```

### ファイアウォールの要件

<span class="x x-first x-last"></span>次の Datadog エンドポイントに対して**アウトバウンド接続**を許可します。

{{< site-region region="us" >}}

| ポート | エンドポイント                                                                                             | 説明                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `tunnel-us1.synthetics.datadoghq.com`   | `datadog-ci` クライアントからトンネルサービスへの wss 接続を開くために必要です。 |
| 443  | `intake.synthetics.datadoghq.com` | 事前に署名された URL を取得し、Synthetic テストをトリガーするために必要です。 |
| 443  | `api.datadoghq.com` | Synthetic テストを検索して取得し、結果をポーリングするために必要です。 |

{{< /site-region >}}

{{< site-region region="eu" >}}

| ポート | エンドポイント                                                                                             | 説明                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `tunnel-eu1.synthetics.datadoghq.com`   | `datadog-ci` クライアントからトンネルサービスへの wss 接続を開くために必要です。 |
| 443  | `api.datadoghq.eu` | 事前に署名された URL を取得し、Synthetic テストを検索し、取得し、トリガーし、結果をポーリングするために必要です。 |

**注**: トンネルサービスのトップレベルドメインは `.com` (`.eu` ではありません) ですが、エンドポイントは EU (Frankfurt AWS) にあります。

{{< /site-region >}}

{{< site-region region="us3" >}}

| ポート | エンドポイント                                                                                             | 説明                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443  | `tunnel-us3.synthetics.datadoghq.com`   | `datadog-ci` クライアントからトンネルサービスへの wss 接続を開くために必要です。 |
| 443  | `api.us3.datadoghq.com` | 事前に署名された URL を取得し、Synthetic テストを検索し、取得し、トリガーし、結果をポーリングするために必要です。 |

{{< /site-region >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/private_locations
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: https://github.com/DataDog/datadog-ci/releases/tag/v0.11.0
[4]: /ja/synthetics/ci/#cli-usage