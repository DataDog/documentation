---
title: Agent サイトの問題
---

デフォルトでは、Agent はそのデータを Datadog US サイト: `app.datadoghq.com` に送信します。組織が別のサイトにある場合は、[Agent メイン構成ファイル][1]の `site` パラメーターを更新するか、`DD_SITE` 環境変数を設定する必要があります。

To update the Datadog documentation to your site, use the selector on the right. You are currently viewing documentation for: {{< region-param key="dd_full_site" code="true" >}}.

`DD_SITE` 変数を {{< region-param key="dd_site" code="true" >}} に設定するか、`datadog.yaml` の `site` パラメーターを更新します。

```yaml
## @param site - 文字列 - 任意 - デフォルト: datadoghq.com
## Agent データを送信する Datadog インテークのサイト。
#
site: {{< region-param key="dd_site" >}}
```


[1]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file