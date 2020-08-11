---
categories:
  - ログの収集
  - セキュリティ
ddtype: crawler
description: Carbon Black Defense ログを収集する
doc_link: 'https://docs.datadoghq.com/integrations/carbon_black/'
dependencies:
  - 'https://github.com/DataDog/documentation/blob/master/content/en/integrations/carbon_black.md'
has_logo: true
integration_title: Carbon Black
is_public: true
kind: インテグレーション
name: carbon_black
public_title: Datadog-Carbon Black インテグレーション
short_description: Carbon Black Defense ログを収集する
version: '1.0'
---
## 概要

Carbon Black Defense ログを Datadog に転送するには、Datadog-Carbon Black インテグレーションを使用します。

## セットアップ

### インストール

まず、[Carbon Black Defense ログシッパー][1]をインストールしてセットアップします。

### コンフィギュレーション

以下の構成ファイルにより、Carbon Black Defense シッパーはログを Datadog に転送できるようになります。

{{< tabs >}}
{{% tab "Datadog US Site" %}}

```conf
[general]

template = {{source}}|{{version}}|{{vendor}}|{{product}}|{{dev_version}}|{{signature}}|{{name}}|{{severity}}|{{extension}}
policy_action_severity = 4
output_format=json
output_type=http
http_out=https://http-intake.logs.datadoghq.com/v1/input/<DATADOG_API_キー>?ddsource=cbdefense
http_headers={"content-type": "application/json"}
https_ssl_verify=True

[cbdefense1]
server_url = <CB_DEFENSE_サーバー_URL>
siem_connector_id=<CB_DEFENSE_API_ID>
siem_api_key=<CB_DEFENSE_API_シークレットキー>
```

{{% /tab %}}
{{% tab "Datadog EU Site" %}}

```conf
[general]

template = {{source}}|{{version}}|{{vendor}}|{{product}}|{{dev_version}}|{{signature}}|{{name}}|{{severity}}|{{extension}}
policy_action_severity = 4
output_format=json
output_type=http
http_out=https://http-intake.logs.datadoghq.eu/v1/input/<DATADOG_API_キー>?ddsource=cbdefense
http_headers={"content-type": "application/json"}
https_ssl_verify=True

[cbdefense1]
server_url = <CB_DEFENSE_サーバー_URL>
siem_connector_id=<CB_DEFENSE_API_ID>
siem_api_key=<CB_DEFENSE_API_シークレットキー>
```

{{% /tab %}}
{{< /tabs >}}

`<DATADOG_API_キー>`、`<CB_DEFENSE_API_シークレットキー>`、`<CB_DEFENSE_API_ID>`、`<CB_DEFENSE_サーバー_URL>` プレースホルダーを置き換えて構成を完成させます。

最初に、`<DATADOG_API_キー>` を [Datadog API キー][2]ページにある Datadog API キーに置き換えます。

次に、Carbon Black Defense API キーと API ID を取得するために、Carbon Black 内からこれらを生成します。

1. _Settings_ -> _API KEYS_ -> _Add API Key_ に移動します。
2. キーの名前を入力します。
3. キーに対して **SIEM** アクセスレベルを選択します。
4. キーが作成されたら、新しい API キーと API ID を使用して、Carbon Black Defense ログシッパー構成ファイルのプレースホルダー `<CB_DEFENSE_API_シークレットキー>` と `<CB_DEFENSE_API_ID>` を置き換えます。

Carbon Black Defense サーバーの URL は、Carbon Black ダッシュボード内で確認できます。_Settings_ -> _API KEYS_ -> _Download_ に移動して、この URL とそのアクセスレベルの説明を確認します。この値を使用して、`<CB_DEFENSE_サーバー_URL>` プレースホルダーを置き換えます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://github.com/carbonblack/cb-defense-syslog-tls
[2]: https://app.datadoghq.com/account/settings#api
[3]: /ja/help/