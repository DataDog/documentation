---
description: Apprenez à envoyer des logs à rsyslog ou syslog-ng en utilisant l'Observability
  Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destinations Syslog
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez les destinations syslog d'Observability Pipelines pour envoyer des logs à rsyslog ou syslog-ng.

**Remarque** : Les destinations rsyslog et syslog-ng prennent en charge le format [RFC5424][5].

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement l'identifiant de l'URL de l'endpoint syslog et, le cas échéant, la clé de passe. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez la destination rsyslog ou syslog-ng lorsque vous [configurez un pipeline][2]. Vous pouvez configurer un pipeline dans l'[UI][1], en utilisant l'[API][3] ou avec [Terraform][4]. Les étapes de cette section sont configurées dans l'UI.

Après avoir sélectionné la destination rsyslog ou syslog-ng dans l'UI du pipeline, saisissez l'identifiant de votre URL d'endpoint. Si vous le laissez vide, la [valeur par défaut](#secret-defaults) est utilisée.

Consultez [Mise en correspondance des champs de log avec les champs syslog](#matching-log-fields-to-syslog-fields) pour plus d'informations sur la façon dont les champs sont mis en correspondance.

{{% observability_pipelines/secrets_env_var_note %}}

### Paramètres facultatifs {#optional-settings}

#### Activer TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### Temps d'attente pour les sondes TCP keepalive {#wait-time-for-tcp-keepalive-probes}

Saisissez le nombre de secondes à attendre avant d'envoyer des sondes TCP keepalive sur une connexion inactive.

#### Mise en tampon {#buffering}

{{% observability_pipelines/destination_buffer %}}

## Mise en correspondance des champs de log avec les champs syslog {#matching-log-fields-to-syslog-fields}

Les destinations rsyslog et syslog-ng font correspondre ces champs de log aux champs syslog suivants :

| Événement de log       | CHAMP SYSLOG | Par défaut                    |
|-----------------|--------------|----------------------------|
| log[\"message\"]  | MESSAGE      | `NIL`                      |
| log[\"procid\"]   | PROCID       | L'identifiant de processus du Worker en cours d'exécution. |
| log[\"appname\"]  | APP-NAME     | `observability_pipelines`  |
| log[\"facility\"] | FACILITY     | `8 (log_user)`             |
| log[\"msgid\"]    | MSGID        | `NIL`                      |
| log[\"severity\"] | SEVERITY     | `info`                     |
| log[\"host\"]     | HOSTNAME     | `NIL`                      |
| log[\"timestamp\"]| TIMESTAMP    | Heure UTC actuelle.          |

## Valeurs par défaut du secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de l'URL d'endpoint rsyslog ou syslog-ng :
	- Référence l'adresse et le port vers lesquels l'Observability Pipelines Worker envoie les logs. Par exemple, `127.0.0.1:9997`.
	- L'identifiant par défaut est `DESTINATION_SYSLOG_ENDPOINT_URL`.
- Identifiant de la clé de passe TLS rsyslog ou syslog-ng (lorsque TLS est activé) :
	- L'identifiant par défaut est `DESTINATION_SYSLOG_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/syslog %}}

{{% /tab %}}
{{< /tabs >}}

## Comment fonctionne la destination {#how-the-destination-works}

### Regroupement d'événements {#event-batching}

Les destinations rsyslog et syslog-ng ne regroupent pas les événements en lots.

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/configuration/set_up_pipelines/
[3]: /fr/api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[5]: https://datatracker.ietf.org/doc/html/rfc5424