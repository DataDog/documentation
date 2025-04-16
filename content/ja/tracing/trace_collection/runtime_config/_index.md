---
further_reading:
- link: /agent/remote_config/
  tag: ドキュメント
  text: Remote Configuration
title: 実行時の構成
---

<div class="alert alert-info">この機能はプレビュー版です。</div>

## 概要

ランタイムでの設定変更により、APM ライブラリの構成を Datadog UI 上から変更できます。アプリケーションやサービスを再起動する必要はありません。新しいデプロイやコード変更を待つ代わりに、この機能を使えばすぐに設定を更新できます。

{{< img src="/tracing/runtime_config/runtime-config-nav.mp4" alt="ランタイムでの構成変更を使用するための Software Catalog の操作例" video="true" style="width:100%;">}}

## 前提条件

- [Datadog Agent][2] バージョン 7.41.1 以上が必要です。
- [Remote Configuration][1] を Agent で有効にしておく必要があります。
- `APM Remote Configuration Read` および `APM Remote Configuration Write` [権限][4]。
  **注**: これらの権限がない場合は、Datadog の管理者に組織の設定から権限を更新してもらうよう依頼してください。

## ランタイムでの設定変更の使い方

サービスの設定をランタイムで変更するには、以下の手順を行ってください。

1. APM の [Software Catalog][3] にアクセスします。
1. 設定を更新したいサービスにカーソルを合わせます。
1. サービス名の横にある **Full Page** をクリックします。
1. **Service Info** をクリックします。
1. **Setup Guidance** タブで **Edit** をクリックします。
1. 必要に応じて設定オプションを変更します。詳しくは[対応している設定オプション](#supported-configuration-options)を参照してください。
1. **Apply Configuration** をクリックします。

**Active Library Configuration** では、対象のサービスと選択した環境に対して設定済みのオプションを確認できます。

{{< img src="/tracing/runtime_config/active-library-config.png" alt="Setup Guidance タブからアクティブなライブラリ設定を確認する画面例" style="width:100%;">}}

上の例では、Staging 環境に対してログインジェクションが有効化されており、2 つのインスタンスで適用されています。インスタンスとは、Remote Configuration クライアントのインスタンスを指します。通常、アプリケーションのプロセスごとに 1 つのインスタンスが存在します。

設定変更が正常に適用されたかどうかは、**X Applied** の文字を参照することで確認できます。上の例では、2 つのインスタンスすべてに対して設定が正常に適用されています。

## 対応している設定オプション

以下のオプションは、実行時の構成でサポートされています。各言語に必要なトレーサーのバージョンが記載されています。

| オプション                                                                                                                                 | Java      | Node.js                 | Python   | .NET      | Ruby      | Go        | C++ |
|----------------------------------------------------------------------------------------------------------------------------------------|-----------|-------------------------|----------|-----------|-----------|-----------|-|
| <h5>カスタムサンプリングレート</h5>DD_TRACE_SAMPLE_RATE を使用し、ライブラリのグローバルなサンプリングレートを設定します。                                  | `1.17.0+` | `4.11+` `3.32+` `2.45+` | `2.4.0+` | `2.33.0+` | `1.13.0+` | `1.59.0+` | `0.2.0+` |
| <h5>ログインジェクション</h5>DD_LOGS_INJECTION を有効にして、ログとトレースを関連付けるためのトレース相関 ID をログに自動挿入します。 | `1.17.0+` | `4.11+` `3.32+` `2.45+` | `2.6.0+` | `2.33.0+` | `1.13.0+` |           | |
| <h5>HTTP ヘッダータグ</h5>`DD_TRACE_HEADER_TAGS` を使用し、HTTP ヘッダーの値をトレースのタグとして追加します。                                        | `1.17.0+` | `4.11+` `3.32+` `2.45+` | `2.6.0+` | `2.33.0+` | `1.13.0+` | `1.59.0+` | |
| <h5>カスタムスパンタグ</h5>`DD_TAGS` を使用して、指定したタグを各スパンに追加します。                                                              | `1.31.0+` | `4.23.0+` `3.44.0+`     | `2.5.0+` | `2.44.0+` |           | `1.59.0+` | `0.2.0+` |

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/remote_config/
[2]: /ja/agent/
[3]: /ja/tracing/software_catalog/
[4]: /ja/account_management/rbac/permissions/
[5]: /ja/tracing/trace_explorer/trace_view