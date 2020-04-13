---
title: Agent サイトの問題
kind: documentation
---
デフォルトでは、Agent はそのデータを Datadog US サイト: `app.datadoghq.com` に送信します。組織が別のサイトにある場合は、[Agent メイン構成ファイル][1]の `site` パラメーターを適宜更新するか、`DD_SITE` 環境変数を設定する必要があります。

{{< tabs >}}
{{% tab "US Site" %}}

`DD_SITE` 変数を `datadoghq.com` に設定するか、`datadog.yaml` のパラメーター `site` パラメーターを更新します。

```yaml
## @param site - 文字列 - 任意 - デフォルト: datadoghq.com
## Agent データを送信する Datadog インテークのサイト。
## EU サイトにデータを送信するには 'datadoghq.eu' に設定します。
#
site: datadoghq.com
```

{{% /tab %}}
{{% tab "EU Site" %}}

`DD_SITE` 変数を `datadoghq.eu` に設定するか、`datadog.yaml` のパラメーター `site` パラメーターを更新します。

```yaml
## @param site - 文字列 - 任意 - デフォルト: datadoghq.com
## Agent データを送信する Datadog インテークのサイト。
## EU サイトにデータを送信するには 'datadoghq.eu' に設定します。
#
site: datadoghq.eu
```

{{% /tab %}}
{{< /tabs >}}

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file