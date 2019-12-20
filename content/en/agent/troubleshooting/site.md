---
title: Agent Site issues
kind: documentation
disable_toc: true
---

By default the Agent sends its data to Datadog US site: `app.datadoghq.com`. If your organization is on another site, you must update the `site` parameter in your [Agent main configuraiton file][1] accordingly or set the `DD_SITE` environment variable:

{{< tabs >}}
{{% tab "US Site" %}}

Set the `DD_SITE` variable to `datadoghq.com`or update the parameter `site` parameter in your `datadog.yaml`

```yaml
## @param site - string - optional - default: datadoghq.com
## The site of the Datadog intake to send Agent data to.
## Set to 'datadoghq.eu' to send data to the EU site.
#
site: datadoghq.com
```

{{% /tab %}}
{{% tab "EU Site" %}}

Set the `DD_SITE` variable to `datadoghq.eu`or update the parameter `site` parameter in your `datadog.yaml`:

```yaml
## @param site - string - optional - default: datadoghq.com
## The site of the Datadog intake to send Agent data to.
## Set to 'datadoghq.eu' to send data to the EU site.
#
site: datadoghq.eu
```

{{% /tab %}}
{{< /tabs >}}
[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
