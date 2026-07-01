---
description: Configurez les intégrations pour Claude Code, Cursor et GitHub Copilot
  afin de surveiller l'activité des coding agents dans Datadog Agent Console.
further_reading:
- link: /ai_agents_console/
  tag: Documentation
  text: Agent Console
- link: /integrations/anthropic-usage-and-costs/
  tag: Documentation
  text: Intégration de l'utilisation et des coûts d'Anthropic
- link: /integrations/cursor/
  tag: Documentation
  text: Intégration de Cursor
title: Configurer Agent Console
---
{{< callout url="#" btn_hidden="true" header="Preview">}}
Agent Console est disponible pour tous les clients de Datadog en Preview.
{{< /callout >}}

Configurez une intégration pour chaque coding agent que vous souhaitez surveiller dans [Agent Console][1].

## Claude Code {#claude-code}

### Option 1 : Intégration de l'utilisation et des coûts d'Anthropic (recommandée) {#option-1-anthropic-usage-and-costs-integration-recommended}

Pour surveiller Claude Code avec Agent Console, configurez l'intégration [Utilisation et coûts d'Anthropic][4].

Après la configuration, accédez à [Agent Console][1] et cliquez sur la tuile {{< ui >}}Claude Code{{< /ui >}} pour voir les métriques.

### Option 2 : OpenTelemetry (OTLP) {#option-2-opentelemetry-otlp}

La procédure suivante configure Claude Code pour envoyer la télémétrie directement à Datadog avec le protocole OpenTelemetry (OTLP).

1. Assurez-vous que votre [Logs configuration][6] inclut un [index][7] catch-all, ou un index qui couvre `service:claude-code`.
2. Générez une [clé API Datadog][8].
3. Définissez les variables d'environnement suivantes dans votre fichier de paramètres Claude Code (par exemple, `~/.claude/settings.json`) :

   ```json
   {
     "env": {
       "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
       "OTEL_LOGS_EXPORTER": "otlp",
       "OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "http/protobuf",
      "OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "{{< region-param key="otlp_logs_endpoint" >}}",
      "OTEL_METRICS_EXPORTER": "otlp",
      "OTEL_EXPORTER_OTLP_METRICS_PROTOCOL": "http/protobuf",
      "OTEL_EXPORTER_OTLP_METRICS_ENDPOINT": "{{< region-param key="otlp_metrics_endpoint" >}}",
      "OTEL_EXPORTER_OTLP_HEADERS": "dd-api-key=<DATADOG_API_KEY>"
     }
   }
   ```

   Replace `<DATADOG_API_KEY>` with your Datadog API key.

   <div class="alert alert-info">To set up Agent Console for Claude Code across your organization, your IT team can use a Mobile Device Management (MDM) system or <a href="https://code.claude.com/docs/en/server-managed-settings">server-managed settings</a> to distribute the Claude Code settings file across all managed devices.</div>
4. Restart Claude Code.

After you restart Claude Code, navigate to the [Agent Console][1] and click the {{< ui >}}Claude Code{{< /ui >}} tile. Metrics (usage, cost, latency, errors) should appear within a few minutes.

### Option 3: Forward data through the Datadog Agent 

1. Make sure that your [Logs configuration][6] includes a catch-all [index][7], or an index that covers `service:claude-code`.
2. [Install the Datadog Agent][9].
3. Configure your Datadog Agent to enable the OpenTelemetry Collector:
   ```yaml
   otlp_config:
     receiver:
       protocols:
         grpc:
           endpoint: 0.0.0.0:4317
     logs:
       enabled: true
   otelCollector:
     enabled: true
   ```
4. Définissez les variables d'environnement suivantes dans votre fichier de paramètres Claude Code (par exemple, `~/.claude/settings.json`):
   ```json
   {
     "env": {
       "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
       "OTEL_METRICS_EXPORTER": "otlp",
       "OTEL_LOGS_EXPORTER": "otlp",
       "OTEL_EXPORTER_OTLP_ENDPOINT": "http://127.0.0.1:4317",
       "OTEL_EXPORTER_OTLP_PROTOCOL": "grpc",
       "OTEL_METRIC_EXPORT_INTERVAL": "10000"
     }
   }
   ```

   <div class="alert alert-info">Pour configurer Agent Console pour Claude Code dans votre organisation, votre équipe informatique peut utiliser un système de Mobile Device Management (MDM) ou <a href="https://code.claude.com/docs/en/server-managed-settings">des paramètres gérés par le serveur</a> pour distribuer le fichier de paramètres Claude Code sur tous les appareils gérés.</div>
5. Redémarrez Claude Code.

Après avoir redémarré Claude Code, accédez à [Agent Console][1] et cliquez sur la tuile {{< ui >}}Claude Code{{< /ui >}}. Les métriques (utilisation, coût, latence, erreurs) devraient apparaître dans quelques minutes.

## Cursor {#cursor}

Pour surveiller Cursor avec Agent Console, configurez l'intégration [Cursor][5] en utilisant Datadog Extension for Cursor.

Après la configuration, accédez à [Agent Console][1] et cliquez sur la tuile {{< ui >}}Cursor{{< /ui >}} pour voir les métriques.

## GitHub Copilot {#github-copilot}

Pour surveiller GitHub Copilot avec Agent Console, configurez l'intégration [GitHub Copilot][10].

Après la configuration, accédez à [Agent Console][1] et cliquez sur la tuile {{< ui >}}GitHub Copilot{{< /ui >}} pour voir les métriques.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[4]: /fr/integrations/anthropic-usage-and-costs/
[5]: /fr/integrations/cursor/?tab=datadogextensionforcursor
[6]: /fr/logs/log_configuration/
[7]: /fr/logs/log_configuration/indexes/
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: /fr/agent/?tab=Host-based
[10]: /fr/integrations/github-copilot/