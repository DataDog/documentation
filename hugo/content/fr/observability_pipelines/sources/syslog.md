---
description: Apprenez à collecter les logs envoyés à rsyslog ou syslog-ng à l'aide
  de l'Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Source Syslog
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez rsyslog ou syslog-ng d'Observability Pipelines pour recevoir les logs envoyés à rsyslog ou syslog-ng.

Vous pouvez également [transférer des logs tiers vers syslog](#forward-third-party-logs-to-syslog) puis les envoyer à l'Observability Pipelines Worker.

## Prérequis {#prerequisites}

{{% observability_pipelines/prerequisites/syslog %}}

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement les identifiants de l'adresse syslog et, le cas échéant, de la passphrase de la clé TLS. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez cette source lorsque vous [configurez un pipeline][1]. Vous pouvez configurer un pipeline dans l'[UI][7], en utilisant l'[API][8] ou avec [Terraform][9]. Les instructions de cette section concernent la configuration de la source dans l'UI.

Après avoir sélectionné la source Syslog dans l'interface utilisateur du pipeline :

1. Saisissez l'identifiant de votre adresse syslog. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.
1. Dans le menu déroulant {{< ui >}}Socket Type{{< /ui >}}, sélectionnez le protocole de communication que vous souhaitez utiliser : {{< ui >}}TCP{{< /ui >}} ou {{< ui >}}UDP{{< /ui >}}.

{{% observability_pipelines/secrets_env_var_note %}}

### Paramètres TLS optionnels {#optional-tls-settings}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de l'adresse rsyslog ou syslog-ng :
	- Référence l'adresse de liaison, telle que `0.0.0.0:9997`, sur laquelle l'Observability Pipelines Worker écoute pour recevoir les logs du Syslog forwarder.
	- L'identifiant par défaut est `SOURCE_SYSLOG_ADDRESS`.
- Identifiant de la passphrase TLS rsyslog ou syslog-ng (lorsque TLS est activé) :
	- L'identifiant par défaut est `SOURCE_SYSLOG_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/syslog %}}

{{% /tab %}}
{{< /tabs >}}

## Envoyez des logs à l'Observability Pipelines Worker via syslog {#send-logs-to-the-observability-pipelines-worker-over-syslog}

{{% observability_pipelines/log_source_configuration/syslog %}}

## Transférez des logs tiers à l'Observability Pipelines Worker {#forward-third-party-logs-to-the-observability-pipelines-worker}

Syslog est un protocole de journalisation largement utilisé pour envoyer des logs réseau à un serveur central. De nombreux périphériques réseau prennent en charge la sortie syslog, vous pouvez donc transférer des logs tiers vers la source syslog d'Observability Pipelines pour traitement et routage. Voici des exemples de ces services tiers :

### Fortinet {#fortinet}
- [Configurez le transfert de logs][2]
- [Configuration des paramètres syslog][3]

### Palo Alto Networks {#palo-alto-networks}
- [Configurez le transfert de logs][4]
- [Transférez les logs de trafic vers un serveur syslog][5]

[1]: /fr/observability_pipelines/configuration/set_up_pipelines/
[2]: https://help.fortinet.com/fa/faz50hlp/56/5-6-1/FMG-FAZ/2400_System_Settings/1600_Log%20Forwarding/0400_Configuring.htm
[3]: https://help.fortinet.com/fadc/4-5-1/olh/Content/FortiADC/handbook/log_remote.htm
[4]: https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/configure-log-forwarding
[5]: https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000ClRxCAK
[7]: https://app.datadoghq.com/observability-pipelines
[8]: /fr/api/latest/observability-pipelines/
[9]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline