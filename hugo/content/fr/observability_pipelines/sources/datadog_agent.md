---
description: Apprenez à collecter des logs, des métriques ou des traces depuis le
  Datadog Agent en utilisant l'Observability Pipelines Worker.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
  tag: Blog
  text: Gérez le volume de métriques et les tags dans votre environnement avec Observability
    Pipelines
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: Métriques
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Source du Datadog Agent
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez la source Datadog Agent d'Observability Pipelines pour recevoir des logs ou des métriques du Datadog Agent.

**Remarques** :
- Si vous utilisez le collecteur Datadog Distribution of OpenTelemetry (DDOT) pour collecter des logs ou des métriques, vous devez [utiliser la source OpenTelemetry pour envoyer ces données à Observability Pipelines][4].
- Le Datadog Agent envoie des logs et des métriques marqués avec `ddsource` et `ddtags`, et non `source` et `tags`. Lorsque vous définissez des requêtes ou des filtres de processeur pour ces événements, utilisez plutôt `ddsource` et `ddtags`.

## Prérequis {#prerequisites}

{{% observability_pipelines/prerequisites/datadog_agent %}}

## Configuration {#setup}

<div class="alert alert-danger">Pour la gestion des secrets : saisissez uniquement l'identifiant de l'adresse du Datadog Agent et, le cas échéant, la phrase secrète de la clé TLS. Ne <b>saisissez pas</b> les valeurs réelles.</div>

Configurez cette source lorsque vous [configurez un pipeline][1]. Vous pouvez configurer un pipeline dans l'[interface utilisateur][6], en utilisant l'[API][7] ou avec [Terraform][8]. Les instructions de cette section concernent la configuration de la source dans l'UI.

Après avoir sélectionné la source Datadog Agent dans l'interface utilisateur du pipeline, saisissez l'identifiant de votre adresse de Datadog Agent. Si vous le laissez vide, le [default](#secret-defaults) est utilisé.

{{% observability_pipelines/secrets_env_var_note %}}

### Paramètres TLS optionnels {#optional-tls-settings}

{{% observability_pipelines/tls_settings %}}

## Valeurs par défaut des secrets {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestion des secrets" %}}

- Identifiant de l'adresse du Datadog Agent :
    - Fait référence à l'adresse de liaison sur laquelle l'Observability Pipelines Worker écoute pour recevoir les logs du Datadog Agent.
    - L'identifiant par défaut est `SOURCE_DATADOG_AGENT_ADDRESS`.
- Identifiant de la phrase secrète TLS du Datadog Agent (lorsque TLS est activé) :
    - L'identifiant par défaut est `SOURCE_DATADOG_AGENT_KEY_PASS`.

{{% /tab %}}

{{% tab "Variables d'environnement" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/datadog_agent %}}

{{% /tab %}}
{{< /tabs >}}

## Connectez le Datadog Agent à l'Observability Pipelines Worker {#connect-the-datadog-agent-to-the-observability-pipelines-worker}

{{< tabs >}}
{{% tab "Logs" %}}

Utilisez le fichier de configuration de l'Agent ou le fichier de valeurs du chart Helm de l'Agent pour connecter le Datadog Agent à l'Observability Pipelines Worker.

**Remarque** : Si votre Agent s'exécute dans un conteneur Docker, vous devez exclure les logs de l'Observability Pipelines en utilisant la variable d'environnement `DD_CONTAINER_EXCLUDE_LOGS`. Pour Helm, utilisez `datadog.containerExcludeLogs`. Cela évite les logs en double, car le Worker envoie également ses propres logs directement à Datadog. Consultez [Collecte de logs Docker][1] ou [Configuration des variables d'environnement pour Helm][2] pour plus d'informations.

{{% collapse-content title="Fichier de configuration de l'Agent" level="h3" expanded=false id="logs-agent-config-file" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent %}}

{{% /collapse-content %}}

{{% collapse-content title="Fichier de valeurs Helm de l'Agent" level="h3" expanded=false id="logs-agent-helm-values-file" %}}

{{% observability_pipelines/log_source_configuration/datadog_agent_kubernetes %}}

{{% /collapse-content %}}

[1]: /fr/containers/docker/log/?tab=containerinstallation#linux
[2]: /fr/containers/guide/container-discovery-management/?tab=helm#setting-environment-variables

{{% /tab %}}

{{% tab "Métriques" %}}

Utilisez le fichier de configuration de l'Agent ou le fichier de valeurs du chart Helm de l'Agent pour connecter le Datadog Agent à l'Observability Pipelines Worker.

**Remarque** : Si votre Agent s'exécute dans un conteneur Docker, vous devez exclure les métriques Observability Pipelines, telles que les métriques d'utilisation et d'événements entrants/sortants, en utilisant la variable d'environnement `DD_CONTAINER_EXCLUDE_METRICS`. Pour Helm, utilisez `datadog.containerExcludeMetrics`. Cela évite les métriques en double, car le Worker envoie également ses propres métriques directement à Datadog. Consultez [Collecte de métriques Docker][1] ou [Définition des variables d'environnement pour Helm][2] pour plus d'informations.

{{% collapse-content title="Fichier de configuration de l'Agent" level="h3" expanded=false id="metrics-agent-config-file" %}}

Pour envoyer les métriques du Datadog Agent à l'Observability Pipelines Worker, mettez à jour votre [fichier de configuration de l'Agent][1] avec ce qui suit :

```
observability_pipelines_worker:
  metrics:
    enabled: true
    url: "http://<OPW_HOST>:8383"

```

`<OPW_HOST>` est l'adresse IP du host ou l'URL de l'équilibreur de charge associée à l'Observability Pipelines Worker.
- Pour les installations CloudFormation, utilisez la sortie CloudFormation `LoadBalancerDNS` pour l'URL.
- Pour les installations Kubernetes, vous pouvez utiliser l'enregistrement DNS interne du service Observability Pipelines Worker. Par exemple : `http://opw-observability-pipelines-worker.default.svc.cluster.local:<PORT>`.

**Remarque** : Si le Worker écoute les logs sur le port 8282, vous devez utiliser un autre port pour les métriques, tel que 8383.

Après avoir [redémarré l'Agent][2], vos données d'observabilité sont envoyées au Worker, traitées par le pipeline et transmises à Datadog.

[1]: /fr/agent/configuration/agent-configuration-files/
[2]: /fr/agent/configuration/agent-commands/#restart-the-agent

{{% /collapse-content %}}

{{% collapse-content title="Fichier de valeurs Helm de l'Agent" level="h3" expanded=false id="metrics-agent-helm-values-file" %}}

Pour envoyer les métriques du Datadog Agent à l'Observability Pipelines Worker, mettez à jour votre chart Helm Datadog [datadog-values.yaml][1] avec les variables d'environnement suivantes. Consultez [Variables d'environnement de l'Agent][2] pour plus d'informations.

```
datadog:
  env:
    - name: DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_ENABLED
      value: true
    - name: DD_OBSERVABILITY_PIPELINES_WORKER_METRICS_URL
      value: "http://<OPW_HOST>:8383"
```

`<OPW_HOST>` est l'adresse IP du host ou l'URL de l'équilibreur de charge associée à l'Observability Pipelines Worker.

 Pour les installations Kubernetes, vous pouvez utiliser l'enregistrement DNS interne du service Observability Pipelines Worker. Par exemple : `http://opw-observability-pipelines-worker.default.svc.cluster.local:<PORT>`.

**Remarque** : Si le Worker écoute les logs sur le port 8282, vous devez utiliser un autre port pour les métriques, tel que 8383.

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[2]: https://docs.datadoghq.com/fr/agent/guide/environment-variables/

{{% /collapse-content %}}

[1]: /fr/containers/docker/data_collected/
[2]: /fr/containers/guide/container-discovery-management/?tab=helm#setting-environment-variables

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/observability_pipelines/configuration/set_up_pipelines/
[4]: /fr/observability_pipelines/sources/opentelemetry/#send-data-from-the-datadog-distribution-of-opentelemetry-collector-to-observability-pipelines
[5]: /fr/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
[6]: https://app.datadoghq.com/observability-pipelines
[7]: /fr/api/latest/observability-pipelines/
[8]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline