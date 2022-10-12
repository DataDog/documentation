---
title: Collecting the Agent configuration
kind: documentation
---

Starting with version `7.40.0` the Agent can send its own configuration to Datadog to be displayed in the
[Infrastructure page][1] in the `Agent Configuration` section of the host detail panel.

The Agent configuration is scrubbed from any sensitive information and only contains settings set by the user
through the configuration file or environment variables. The configuration will be refreshed every 10 minutes.

This feature is disabled by default, to enable it you need to add the following settings to the `datadog.yaml` configuration:

```yaml
inventories_configuration_enabled: true
```

Alternatively, you can also use the `DD_INVENTORIES_CONFIGURATION_ENABLED=true` environment variable.

**Note**: `inventories_enabled` configuration setting, which is enabled by default, also controls this feature.
Disabling it will override `inventories_configuration_enabled`.

[1]: https://app.datadoghq.com/infrastructure
