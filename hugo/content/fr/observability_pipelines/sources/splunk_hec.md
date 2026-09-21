---
description: Apprenez à collecter des logs à partir d'un collecteur d'événements HTTP
  (HEC) Splunk à l'aide de l'Observability Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Source du Splunk HTTP Event Collector (HEC)
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la source Splunk HTTP Event Collector (HEC) d’Observability Pipelines pour recevoir des logs de votre Splunk HEC. Vous pouvez choisir de stocker le jeton HEC en tant que métadonnée d'événement et :

- Envoyer des logs d'Observability Pipelines vers Splunk HEC avec le jeton d'origine envoyé avec l'événement.
- Utilisez le processeur de tableau d'enrichissement pour ajouter un champ de log à partir de votre lookup file, basé sur le jeton dans les métadonnées, puis traitez et acheminez vos logs en fonction de la valeur de ce champ.

**Remarques** :
- Le Worker transfère le jeton HEC stocké qui est reçu vers le composant suivant.
- Les jetons Splunk HEC stockés ne sont pas affichés dans [Live Capture][9].
- Utilisez la source Splunk HEC si vous souhaitez [envoyer des logs de la Splunk Distribution of the OpenTelemetry Collector vers Observability Pipelines](#send-logs-from-the-splunk-distribution-of-the-opentelemetry-collector-to-observability-pipelines).

## Prérequis {#prerequisites}

{{% observability_pipelines/prerequisites/splunk_hec %}}

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement les identifiants de l'adresse Splunk HEC et, le cas échéant, les clés de mot de passe TLS et de jeton d'authentification. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez cette source lorsque vous [configurez un pipeline][1]. Vous pouvez configurer un pipeline dans l'[interface utilisateur][6], en utilisant l'[API][7] ou avec [Terraform][8]. Les instructions de cette section concernent la configuration de la source dans l'UI.

Après avoir sélectionné la source Splunk HEC dans l'interface utilisateur du pipeline :

1. Saisissez l'identifiant de votre adresse Splunk HEC. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.
1. Activez {{< ui >}}Store HEC token{{< /ui >}} uniquement si vous souhaitez effectuer l'une des opérations suivantes :
    - Utilisez une destination Splunk HEC avec la stratégie de jeton {{< ui >}}From Source{{< /ui >}}.
    - Utilisez un processeur de tableau d'enrichissement pour mapper les jetons Splunk HEC à partir d'un fichier local.

{{% observability_pipelines/secrets_env_var_note %}}

### Paramètres optionnels {#optional-settings}

#### Activer TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

#### Configurer les jetons d'authentification {#configure-authentication-tokens}

Si vous stockez des jetons Splunk HEC dans l'en-tête d'autorisation de votre requête HTTP, vous pouvez configurer Observability Pipelines pour vérifier si les requêtes HTTP entrantes possèdent un jeton valide. Les événements de requête qui ne possèdent pas de jeton valide sont abandonnés.

Pour configurer les jetons d'authentification, activez le commutateur {{< ui >}}Configure authentication tokens{{< /ui >}} :

1. Cliquez sur {{< ui >}}Manage Tokens{{< /ui >}} puis sur {{< ui >}}Add Token{{< /ui >}}.
1. Saisissez l'identifiant de votre clé de jeton.<br>**Remarque** : Si vous utilisez des variables d'environnement, la variable d'environnement pour ce jeton est l'identifiant que vous avez saisi, précédé de `DD_OP_`.
1. (Facultatif) Saisissez un champ et une valeur si vous souhaitez ajouter des informations supplémentaires aux logs authentifiés avec succès avec ce jeton spécifique.

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de l'adresse Splunk HEC :
	- Référence l'adresse de liaison, telle que `0.0.0.0:8088`, sur laquelle votre Observability Pipelines Worker écoute pour recevoir les logs initialement destinés à l'indexeur Splunk.
	- L'identifiant par défaut est `SOURCE_SPLUNK_HEC_ADDRESS`.
- Identifiant de la phrase secrète TLS Splunk HEC (lorsque TLS est activé) :
	- L'identifiant par défaut est `SOURCE_SPLUNK_HEC_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_hec %}}

{{% /tab %}}
{{< /tabs >}}

{{% observability_pipelines/log_source_configuration/splunk_hec %}}

## Envoyez des logs depuis la Splunk Distribution of the OpenTelemetry Collector vers Observability Pipelines {#send-logs-from-the-splunk-distribution-of-the-opentelemetry-collector-to-observability-pipelines}

Pour envoyer des logs depuis la Splunk Distribution of the OpenTelemetry Collector :

1. Installez le Splunk OpenTelemetry Collector en fonction de votre environnement :
    - [Kubernetes][2]
    - [Linux][3]
1. [Configurez un pipeline][4] en utilisant la [source Splunk HEC](#set-up-the-source-in-the-pipeline-ui).
1. Configurez le Splunk OpenTelemetry Collector:
    ```bash
    cp /etc/otel/collector/splunk-otel-collector.conf.example etc/otel/collector/splunk-otel-collector.conf
    ```
    ```bash
    # Splunk HEC endpoint URL, if forwarding to Splunk Observability Cloud
    # SPLUNK_HEC_URL=https://ingest.us0.signalfx.com/v1/log
    # If you're forwarding to a Splunk Enterprise instance running on example.com, with HEC at port 8088:
    SPLUNK_HEC_URL=http://<OPW_HOST>:8088/services/collector
    ```
   -  `<OPW_HOST>` est l'adresse IP ou l'URL de l'host (ou de l'équilibreur de charge) associé à l'Observability Pipelines Worker.
        - Pour les installations CloudFormation, la sortie `LoadBalancerDNS` CloudFormation contient l'URL correcte à utiliser.
        - Pour les installations Kubernetes, l'enregistrement DNS interne du service Observability Pipelines Worker peut être utilisé, par exemple `opw-observability-pipelines-worker.default.svc.cluster.local`.

**Remarque** : si vous utilisez un pare-feu, assurez-vous qu'il autorise le trafic du Splunk OpenTelemetry Collector vers le Worker.

[1]: /fr/observability_pipelines/configuration/set_up_pipelines/
[2]: https://help.splunk.com/en/splunk-observability-cloud/manage-data/splunk-distribution-of-the-opentelemetry-collector/get-started-with-the-splunk-distribution-of-the-opentelemetry-collector/collector-for-kubernetes
[3]: https://help.splunk.com/en/splunk-observability-cloud/manage-data/splunk-distribution-of-the-opentelemetry-collector/get-started-with-the-splunk-distribution-of-the-opentelemetry-collector/collector-for-linux
[4]: /fr/observability_pipelines/configuration/set_up_pipelines
[6]: https://app.datadoghq.com/observability-pipelines
[7]: /fr/api/latest/observability-pipelines/
[8]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[9]: /fr/observability_pipelines/configuration/live_capture/