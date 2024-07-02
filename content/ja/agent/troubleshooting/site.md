---
title: Agent Site Issues
---

By default the Agent sends its data to Datadog US site: `app.datadoghq.com`. If your organization is on another site, you must update the `site` parameter in your [Agent main configuration file][1] or set the `DD_SITE` environment variable.

Datadog のドキュメントをサイトに更新するには、右側のセレクターを使用します。現在、{{< region-param key="dd_full_site" code="true" >}} のドキュメントを表示しています。

Set the `DD_SITE` variable to {{< region-param key="dd_site" code="true" >}}or update the parameter `site` parameter in your `datadog.yaml`

```yaml
## @param site - 文字列 - 任意 - デフォルト: datadoghq.com
## Agent データを送信する Datadog インテークのサイト。
#
site: {{< region-param key="dd_site" >}}
```


[1]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
