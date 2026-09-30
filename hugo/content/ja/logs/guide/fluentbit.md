---
description: Fluent Bit を構成し、ログデータを複数ソースから収集してパースし、転送します。
further_reading:
- link: https://www.datadoghq.com/blog/fluentbit-integration-announcement/
  tag: ブログ
  text: Datadog と Fluent Bit を使用してログを一元管理する
name: fluentbit
title: Fluent Bit ログを Datadog に送信する
---

## 概要

Fluent Bit を構成して、ログデータを複数の異なるソースから収集してパースし、Datadog に転送して監視します。Fluent Bit のメモリサイズは小さい (最大 450 KB) ため、コンテナ化されたサービスや埋め込み Linux システムなど、制約のあるリソース環境でログを収集するために使用できます。[Datadog の Fluent Bit アウトプットプラグイン][1]は Fluent Bit v1.3.0 以降に対応しています。

Fluent Bit Agent チェックを構成するには、[Fluent Bit (Agent)][13] を参照してください。

## セットアップ

以下に、ホスト上で Fluent Bit を構成する手順を示します。Amazon ECS の場合は、[ECS Fluent Bit と FireLens][2] を参照してください。

### ログ収集

初めに、[Datadog アカウント][3]と [Datadog API キー][4]を確認し、[Datadog Logs Management を有効にする][5]必要があります。

1. コンフィギュレーションファイルの推奨メソッドを使用して、Fluent Bit を [インストール][6]および[構成][7]します。
2. [Fluent Bit コンフィギュレーションファイル][8]をアップデートし、アウトプットプラグインとして Datadog に追加します。コンフィギュレーションパラメーターの詳細情報については、[コンフィギュレーションパラメーターの表](#コンフィギュレーションパラメーター) を参照してください。たとえば、`[OUTPUT]` コンフィギュレーションセクションについては、[コンフィギュレーションファイルの例](#コンフィギュレーションファイルの例) を確認してください。
3. Fluent Bit からログの送信を開始したら、[Datadog Logs Explorer ページ][9]でログを検証します。

#### コンフィギュレーションパラメーター

| キー            | 説明                                                                                                                                                                                                                                                                                                                 | デフォルト                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------                                                                                                                                                                                                    | --------------------------------------------------------------------------- |
| ホスト           | _必須_ - ログの送信先となる Datadog サーバー。                                                                                                                                                                                                                                                            | {{< region-param key="http_endpoint" code="true" >}}                        |
| TLS            | _必須_ - エンドツーエンドの安全な通信のためのセキュリティプロトコル。この設定は `on` に設定する必要があります。                                                                                                                                                                                                                        | `off`                                                                       |
| apikey         | _必須_ - [Datadog API キー][4]。                                                                                                                                                                                                                                                                                     |                                                                             |
| 圧縮       | _推奨_ - ペイロードを GZIP 形式で圧縮します。Datadog はこれを `gzip` と設定することをサポートおよび推奨します。                                                                                                                                                                                                              |                                                                             |
| dd_service     | _推奨_ - ログを生成するサービス (アプリケーションまたはデータベース) の名前。人間が解読可能であること。                                                                                                                                                                                                    |                                                                             |
| dd_source      | _推奨_ - サービスの基盤となるテクノロジーの名前。人間が解読可能であること。たとえば `postgres` や `nginx` など。                                                                                                                                                                                                    |                                                                             |
| dd_message_key | _推奨_ - ログメッセージを保存するために属性を使用するように設定します。                                                                                                                                                                                                                                                         |                                                                             |
| dd_tags        | _任意_ - Datadog のログに割り当てる[タグ][10]。                                                                                                                                                                                                                                                     |                                                                             |
| dd_hostname    | _オプション_ - ログを発行したホストに関連付けることができます。未設定の場合、Datadog はホストが[標準のホスト属性][12]のいずれかとして設定されているとみなします。 
| プロバイダー       | _任意_ - 使用するプロバイダー。Fargate Tasks から Datadog にログを送信する場合は、これを `ecs` に設定します。                                                                                                                                                                                                            |                                                                             |

#### コンフィギュレーションファイルの例

```text
[OUTPUT]
    Name              datadog
    Match             *
    Host              http-intake.logs.datadoghq.com
    TLS               on
    compress          gzip
    apikey            <DATADOG_API_キー>
    dd_service       <アプリケーション_サービス> 
    dd_source         <ソース>
    dd_message_key    log
    dd_tags           env:dev,<タグキー>:<タグ値>
```

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.fluentbit.io/manual/output/datadog
[2]: /ja/integrations/ecs_fargate/?tab=webui#fluent-bit-and-firelens
[3]: https://app.datadoghq.com/signup
[4]: /ja/account_management/api-app-keys/
[5]: https://app.datadoghq.com/logs/activation
[6]: https://docs.fluentbit.io/manual/installation/sources/build-and-install
[7]: https://docs.fluentbit.io/manual/administration/configuring-fluent-bit
[8]: https://docs.fluentbit.io/manual/administration/configuring-fluent-bit/classic-mode/configuration-file
[9]: https://app.datadoghq.com/logs
[10]: /ja/getting_started/tagging/
[11]: /ja/help/
[12]: /ja/logs/log_configuration/pipelines/?tab=host#preprocessing
[13]: /ja/integrations/fluentbit/