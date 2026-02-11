---
categories:
- log collection
- Security
custom_kind: integration
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/alcide.md
description: Alcideのログを取り込んで処理する
doc_link: https://docs.datadoghq.com/integrations/alcide/
has_logo: true
integration_id: alcide
integration_title: アルシド
is_public: true
name: alcide
public_title: Datadog-Alcideの統合
short_description: Alcideのログを取り込んで処理する
version: '1.0'
---

## 概要

AlcideはKubernetesの監査および異常監視サービスを提供している。この統合により、DatadogはAlcideからログを取り込み、処理することができます。

## セットアップ

### インストール

Datadogは、Alcideログを検出すると、自動的にログ処理パイプラインを有効にします。インストール手順は必要ありません。

### 構成

Alcideで 、 ［ _統合］_タブを選択し 、 ［ _検出統合構成_］セクションに移動します。

1. ターゲットとして**HTTP API**を選択します。

2. URLボックスに「`https://http-intake.logs.<DATADOG_SITE>/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=alcide`」と入力します。プレースホルダの値の`<DATADOG_SITE>`を米国サイトの`datadoghq.com`に、EUサイトの`datadoghq.eu`に置き換えます。プレースホルダ値の`<DATADOG_API_KEY>`を[Datadog APIキー][1]に置き換えます。

3. [_エンティティタイプ_]で、脅威情報を転送するタイプを選択します。Datadogでは、これらすべてを選択することを推奨します。

4. [_検出カテゴリ_]で、転送するカテゴリを選択します。Datadogでは、_インシデント_と_異常_の両方を選択することを推奨します。

5. [_検出信頼度_]で、希望の信頼度レベルを選択します。Datadogでは、最低_限「高_」と「_中」_を選択することを推奨します。

6. オプションで、_［エンティティ一致_］ボックスと［_エンティティ不一致_］ボックスを使用して、エンティティに包含フィルタと除外フィルタを作成できます。

次に、前のセクションの下にある「_選択された_監査エントリの統合構成」セクションに移動します。このセクションでは、監査ログの連動を設定します。

1. ターゲットとして**HTTP API**を選択します。

2. URLボックスに「`https://http-intake.logs.<DATADOG_SITE>/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=alcide`」と入力します。プレースホルダの値の`<DATADOG_SITE>`を米国サイトの`datadoghq.com`に、EUサイトの`datadoghq.eu`に置き換えます。プレースホルダ値の`<DATADOG_API_KEY>`を[Datadog APIキー][1]に置き換えます。

## トラブルシューティング

助けが必要ですか?[Datadogサポート][2]にお問い合わせください。

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/help/