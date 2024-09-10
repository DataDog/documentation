---
title: Agent Site Issues
---

By default the Agent sends its data to Datadog US site: `app.datadoghq.com`. If your organization is on another site, you must update the `site` parameter in your [Agent main configuration file][1] or set the `DD_SITE` environment variable.

To update the Datadog documentation to your site, use the selector on the right. You are currently viewing documentation for: {{< region-param key="dd_full_site" code="true" >}}.

Set the `DD_SITE` variable to {{< region-param key="dd_site" code="true" >}}or update the parameter `site` parameter in your `datadog.yaml`

```yaml
## @param site - string - optional - default: datadoghq.com
## The site of the Datadog intake to send Agent data to.
#
site: {{< region-param key="dd_site" >}}
```


[1]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
