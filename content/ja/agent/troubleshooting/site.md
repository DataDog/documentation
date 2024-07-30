---
title: Agent サイトの問題
---
デフォルトでは、Agent はそのデータを Datadog US サイト: `app.datadoghq.com` に送信します。組織が別のサイトにある場合は、[Agent メイン構成ファイル][1]の `site` パラメーターを更新するか、`DD_SITE` 環境変数を設定する必要があります。

Datadog のドキュメントをサイトに更新するには、右側のセレクターを使用します。現在、{{< region-param key="dd_full_site" code="true" >}} のドキュメントを表示しています。

`DD_SITE` 変数を {{< region-param key="dd_site" code="true" >}} に設定するか、`datadog.yaml` のパラメーター `site` パラメーターを更新します。

```yaml
## @param site - 文字列 - 任意 - デフォルト: datadoghq.com
## Agent データを送信する Datadog インテークのサイト。
#
site: {{< region-param key="dd_site" >}}
```


[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file