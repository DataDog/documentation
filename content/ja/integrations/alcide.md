---
categories:
- log collection
- Security
description: Alcide のログを収集・処理
doc_link: https://docs.datadoghq.com/integrations/alcide/
dependencies: ["https://github.com/DataDog/documentation/blob/master/content/en/integrations/alcide.md"]
has_logo: true
integration_title: Alcide
is_public: true
custom_kind: integration
name: alcide
public_title: Datadog-Alcide インテグレーション
short_description: Alcide のログを収集・処理
version: '1.0'
integration_id: "alcide"
---

## 概要

Alcide は Kubernetes の監査と異常検知モニタリングに特化したサービスです。インテグレーションを行うことで、Alcide のログを Datadog 側で収集および処理できるようになります。

## セットアップ

### インストール

Alcide のログが検知されると、Datadog のログ処理パイプラインが自動で有効化されます。新しいシステムをインストールする必要はありません。

### 構成

Alcide の _Integrations_ タブで _Detections Integrations Configuration_ セクションを開きます。脅威インテリジェンスログのインテグレーション構成に使用されているセクションです。

1. ターゲットに **HTTP API** を選択します。

2. URL 欄に、`https://http-intake.logs.<DATADOG_SITE>/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=alcide` と入力します。プレースホルダー `<DATADOG_SITE>` の値を、US サイトの場合は `datadoghq.com` に、EU サイトの場合は `datadoghq.eu` に置き換えます。プレースホルダー `<DATADOG_API_KEY>` の値をお使いの [Datadog API キー][1]に変更します。

3. _Entities Types_ で、転送する脅威インテリジェンスのタイプを選択します。Datadog では、すべてのタイプを選択することを推奨しています。

4. _Detection Categories_ で、転送するカテゴリを選択します。Datadog では _incidents_ と _anomalies_ の両方を選択することを推奨しています。

5. _Detection Confidence_ で希望する秘密保持のレベルを選択します。Datadog では最低でも _high_ および _medium_ に設定することを推奨しています。

6. _Entities Matching_ および _Entities Not Matching_ ボックスを使用して、エンティティ上に包含フィルターと除外フィルターを作成することができます (オプション)。

その後、上記セクションの下部にある _Selected Audit Entries Integration Configuration_ セクションへ移動します。このセクションは監査ログのインテグレーション構成に使用されます。

1. ターゲットに **HTTP API** を選択します。

2. URL 欄に、`https://http-intake.logs.<DATADOG_SITE>/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&ddsource=alcide` と入力します。プレースホルダー `<DATADOG_SITE>` の値を、US サイトの場合は `datadoghq.com` に、EU サイトの場合は `datadoghq.eu` に置き換えます。プレースホルダー `<DATADOG_API_KEY>` の値をお使いの [Datadog API キー][1]に変更します。

## トラブルシューティング

お困りですか？[Datadog サポート][2]にお問い合わせください。

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /help/
