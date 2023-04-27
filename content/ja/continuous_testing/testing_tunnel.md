---
aliases:
- /ja/synthetics/testing_tunnel
description: Datadog の Continuous Testing テストトンネルを使用したローカルおよびリモート CI/CD テストについて学びます。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
  tag: ブログ
  text: Datadog Continuous Testing テストを CI/CD パイプラインに組み込む
- link: https://www.datadoghq.com/blog/internal-application-testing-with-datadog/
  tag: ブログ
  text: Datadog のテストトンネルとプライベートロケーションを使用して内部アプリケーションをテストします
- link: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
  tag: ラーニングセンター
  text: CI/CD パイプラインでテストを実行する方法を学ぶ
- link: /synthetics/browser_tests/
  tag: ドキュメント
  text: ブラウザテストの構成
- link: /synthetics/api_tests/
  tag: ドキュメント
  text: API テストの構成
kind: documentation
title: Continuous Testing Tunnel
---

## 概要

Continuous Testing トンネルにより、内部環境と Datadog インフラストラクチャーの間に短期間の安全な接続が作成され、プライベートアプリケーションで Synthetic HTTP およびブラウザテストを迅速にトリガーできるようになります。

Datadog は、専用の長期間のプロービングシステム ([プライベートロケーション][1]など) をデプロイせずに、アプリケーションのローカルバージョンに対して Continuous Testing のテストを起動する必要がある場合、テストトンネルの使用を推奨しています。テストトンネルは、短命のクラウド環境に対するテストのトリガーとして使用することができます。

## テストトンネルとは

テストトンネルは、[@datadog/datadog-ci][2] NPM パッケージに付属する機能です。これは、CI/CD パイプラインの一部として Synthetic テストを含めるために Datadog が<span class="x x-first x-last">提供する</span>方法の 1 つです。テストトンネルは、インフラストラクチャーと Datadog の間にエンドツーエンドの暗号化された HTTP プロキシを作成します。つまり、CLI を<span class="x x-first x-last">介して</span>送信されたテストリクエストはすべて、`datadog-ci`クライアントを介して自動的にルーティングされます<span class="x x-first x-last">。これにより、</span>Datadog は内部アプリケーションにアクセスしてテストすることができます。

{{< img src="synthetics/tunnel_diagram.png" alt="Synthetic テストトンネル図" style="width:100%;">}}

`datadog-ci` はまず、認証のために Datadog から事前に署名された URL を取得します。次に、事前に署名された URL を使用して、Datadog の管理された場所への WebSocket Secure 接続 (wss) を開きます。WebSocket 接続を介した SSH 接続を使用して、テストは `datadog-ci` によってトリガーされ、Datadog の管理ロケーションを介して実行されます。

DNS 解決はトンネルを介して実行されるため、内部ドメインを使用して、または `datadog-ci` を実行しているマシンの `localhost` でアプリケーションをテストできます。

テストトンネルを使用する場合、テストのロケーションは、Datadog アカウントのリージョンに依存するロケーションによって上書きされます。

## テストトンネルの使用方法

上記のように、テストトンネルは [@datadog/datadog-ci][2] NPM パッケージに付属しており、パッケージのバージョン [v0.11.0][3] から入手できます。開始するには、[Continuous Testing と CI/CD][4] を参照してください。

ローカルマシンまたは CI サーバーにクライアントをセットアップしたら、`--tunnel` で HTTP およびブラウザテストを起動するために使用するコマンドを追加することにより、トンネルでテストを起動することを決定できます。たとえば、グローバルコンフィギュレーションファイルを使用している場合は、次を使用できます。

```sh
datadog-ci synthetics run-tests --config <GLOBAL_CONFIG_FILE>.json --tunnel
```

### ファイアウォールの要件

<span class="x x-first x-last"></span>次の Datadog エンドポイントに対して**アウトバウンド接続**を許可します。

{{< site-region region="us" >}}

| ポート | エンドポイント                                                                                             | 説明                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443 | `tunnel-us1.synthetics.datadoghq.com`   | `datadog-ci` クライアントからトンネルサービスへの wss 接続を開くために必要です。 |
| 443 | `intake.synthetics.datadoghq.com` | 事前に署名された URL を取得し、Synthetic テストをトリガーするために必要です。 |
| 443 | `api.datadoghq.com` | Synthetic テストを検索して取得し、結果をポーリングするために必要です。 |

{{< /site-region >}}

{{< site-region region="eu" >}}

| ポート | エンドポイント                                                                                             | 説明                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443 | `tunnel-eu1.synthetics.datadoghq.com`   | `datadog-ci` クライアントからトンネルサービスへの wss 接続を開くために必要です。 |
| 443 | `api.datadoghq.eu` | 事前に署名された URL を取得し、Synthetic テストを検索し、取得し、トリガーし、結果をポーリングするために必要です。 |

**注**: トンネルサービスのトップレベルドメインは `.com` (`.eu` ではありません) ですが、エンドポイントは EU (Frankfurt AWS) にあります。

{{< /site-region >}}

{{< site-region region="us3" >}}

| ポート | エンドポイント                                                                                             | 説明                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443 | `tunnel-us3.synthetics.datadoghq.com`   | `datadog-ci` クライアントからトンネルサービスへの wss 接続を開くために必要です。 |
| 443 | `api.us3.datadoghq.com` | 事前に署名された URL を取得し、Synthetic テストを検索し、取得し、トリガーし、結果をポーリングするために必要です。 |

{{< /site-region >}}

{{< site-region region="us5" >}}

| ポート | エンドポイント                                                                                             | 説明                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443 | `tunnel-us5.synthetics.datadoghq.com`   | `datadog-ci` クライアントからトンネルサービスへの wss 接続を開くために必要です。 |
| 443 | `api.us5.datadoghq.com` | 事前に署名された URL を取得し、Synthetic テストを検索し、取得し、トリガーし、結果をポーリングするために必要です。 |

{{< /site-region >}}

{{< site-region region="ap1" >}}

 ポート | エンドポイント                                                                                             | 説明                                                                                                                             |
| ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 443 | `tunnel-ap1.synthetics.datadoghq.com`   | `datadog-ci` クライアントからトンネルサービスへの wss 接続を開くために必要です。 |
| 443 | `api.ap1.datadoghq.com` | Synthetic テストの URL 取得、検索、取得、トリガー、結果ポーリングに必要です。 |

{{< /site-region >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/private_locations
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: https://github.com/DataDog/datadog-ci/releases/tag/v0.11.0
[4]: /ja/continuous_testing/cicd_integrations#use-the-cli