---
further_reading:
- link: /logs/
  tag: Documentation
  text: Recueillir vos logs
- link: /agent/proxy/
  tag: Documentation
  text: Configurer l'Agent de façon à utiliser un proxy
- link: https://vector.dev/docs/
  tag: Documentation
  text: Documentation Vector
kind: documentation
title: Agréger les données de plusieurs Agents avec Vector
---

## Présentation

La solution [Vector][1] prend en charge l'Agent Datadog. Pour illustrer son fonctionnement, imaginons que plusieurs Agents en amont envoient des données à Vector afin de les agréger :

`Agents -> Vector -> Datadog`

Ce scénario ne revient pas à utiliser un [proxy][2] : en effet, Vector peut traiter les données avant de les envoyer à Datadog ou à d'autres plateformes. Vector propose les fonctionnalités suivantes :

* [Parsing, structuration et enrichissement de logs][3]
* [Echantillonnage][4] pour réduire les coûts
* [Censure des informations personnelles][5] et des données sensibles avant qu'elles ne quittent votre réseau
* [Génération de métriques à partir de logs][6], pour une analyse rentable
* [Envoi de données vers plusieurs destinations][7]

**Remarques** :

- Seule l'agrégation des logs et des métriques est prise en charge.
- Vector peut recueillir des logs et des métriques directement auprès d'autres sources. Il est néanmoins possible que les logs provenant de fournisseurs tiers n'incluent pas les bons tags. Pour [ajouter des tags][8], une source ou des valeurs de service, il est recommandé d'utiliser le langage [langage Vector Remap Language (VRL)][9].

## Configuration

### Configuration de l'Agent

Cette configuration requiert au minimum la version 6.35 ou 7.35 de l'Agent Datadog.

Pour envoyer des logs à Vector, modifiez le fichier de configuration `datadog.yaml` de l'Agent.

```yaml
vector:
  logs.enabled: true
  # Définir le protocole sur https si le TLS/SSL est activé côté Vector
  logs.url: "http://<HOST_VECTOR>:<PORT_VECTOR>"
# Supprimer la mise en commentaire de la ligne suivante si vous utilisez une version de Vector antérieure à 0.17.0
# logs_config.use_v2_api: false
```

Pour les métriques, modifiez les valeurs suivantes dans le fichier `datadog.yaml` :

```yaml
vector:
  metrics.enabled: true
  # Définir le protocole sur https si le TLS/SSL est activé côté Vector
  metrics.url: "http://<HOST_VECTOR>:<PORT_VECTOR>"
```

Remplacez <HOST_VECTOR> par le hostname du système exécutant Vector et <PORT_VECTOR> par le port TCP sur lequel la source `datadog_agent` de Vector effectue son écoute.

### Configuration Docker

Si vous utilisez Docker, ajoutez ce qui suit au fichier de configuration de votre Agent.

```
-e DD_VECTOR_METRICS_URL=http://<HOST_VECTOR>:<PORT_VECTOR>
-e DD_VECTOR_METRICS_ENABLED=true
-e DD_VECTOR_LOGS_URL=http://<HOST_VECTOR>:<PORT_VECTOR>
-e DD_VECTOR_LOGS_ENABLED=true
```

### Configuration de Vector
Pour recevoir des logs ou des métriques à partir de l'Agent Datadog, configurez Vector avec une [source datadog_agent][10]. Pour envoyer des logs à Datadog, vous devez avoir configuré au minimum un [récepteur datadog_logs][11] pour Vector. De même, pour envoyer des métriques à Datadog, vous devez avoir configuré au minimum un [récepteur datadog_metrics][12] pour Vector.

Consultez la [documentation Vector][13] officielle (en anglais) pour découvrir tous les paramètres de configuration et toutes les transformations qui peuvent être appliquées aux logs lors de leur traitement par Vector.

L'exemple de configuration suivant ajoute un tag à chaque log et métrique à l'aide du langage VRL :

```yaml
sources:
  datadog_agents:
    type: datadog_agent
    # Le <VECTOR_PORT> indiqué plus haut doit être défini sur la valeur du port ci-dessous.
    address: "[::]:8080"
    multiple_outputs: true # Pour séparer automatiquement les métriques des logs

transforms:
  tag_logs:
    type: remap
    inputs:
      - datadog_agents.logs
    source: |
      # Le raccourci `!` est utilisé ici avec la fonction `string`. Il renvoie une erreur si
      # .ddtags n'est pas une string.
      # Le champ .ddtags devrait toujours être une string.
      .ddtags = string!(.ddtags) + ",sender:vector"
  tag_metrics:
    type: remap
    inputs:
      - datadog_agents.metrics
    source: |
      .tags.sender = "vector"

sinks:
  log_to_datadog:
    type: datadog_logs
    inputs:
       - tag_logs
    default_api_key: "${DATADOG_API_KEY_ENV_VAR}"
    encoding:
      codec: json
  metrics_to_datadog:
    type: datadog_metrics
    inputs:
       - tag_metrics
    default_api_key: "${DATADOG_API_KEY_ENV_VAR}"
```

### Avec Kubernetes

Les [paramètres de configuration de l'Agent](#configuration-de-l-agent) décrits ci-dessus peuvent être ajoutés à la valeur `agents.customAgentConfig` à l'aide du chart Datadog officiel. **Remarque** : pour que la valeur de `agents.customAgentConfig` soit appliquée, `agent.useConfigMap` doit être défini sur `true`.

Pour en savoir plus sur le chart Helm Datadog, consultez la section [Kubernetes][14].

Vector fournit un [chart officiel pour l'agrégation de données][15], avec une source de logs Datadog préconfigurée. Pour en savoir plus sur l'installation de Vector avec Helm, consultez la [documentation Vector officielle][16] (en anglais).

Pour envoyer des logs à Datadog, vous devez ajouter un récepteur `datadog_logs` à la configuration Vector. De même, pour envoyer des métriques à Datadog, vous devez ajouter un récepteur `datadog_metrics` à la configuration Vector. Le chart de Vector peut inclure n'importe quelle configuration Vector valide dans le fichier `values.yaml` grâce au champ `customConfig`. Pour activer `datadog_logs`, vous pouvez inclure directement le même type de configuration décrite à la rubrique [Configuration de Vector](#configuration-de-vector), sans y apporter la moindre modification.

## Gérer des logs et métriques Datadog avec Vector

Vous pouvez utiliser sur les logs et métriques envoyées à Vector toutes les fonctionnalités de Vector, notamment le langage [Vector Remap Language (VRL)][3] pour les transformer.

Lorsque Vector reçoit des logs envoyés par l'Agent Datadog, ils sont structurés à l'aide du schéma attendu. Si vous envoyez des logs à l'aide de l'API Datadog, consultez la [documentation sur l'API][17] pour obtenir une description complète du schéma.

Les logs et métriques recueillis par Vector à partir d'autres sources peuvent être [entièrement enrichis][8]. Le langage VRL permet également de modifier ces logs et métriques, en remplissant les champs pertinents en fonction du schéma attendu.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://vector.dev/
[2]: /fr/agent/proxy
[3]: https://vector.dev/docs/reference/configuration/transforms/remap/
[4]: https://vector.dev/docs/reference/configuration/transforms/sample/
[5]: https://vector.dev/docs/reference/vrl/functions/#redact
[6]: https://vector.dev/docs/reference/configuration/transforms/log_to_metric/
[7]: https://vector.dev/docs/reference/configuration/transforms/route/
[8]: /fr/getting_started/tagging
[9]: https://vector.dev/docs/reference/vrl/
[10]: https://vector.dev/docs/reference/configuration/sources/datadog_agent/
[11]: https://vector.dev/docs/reference/configuration/sinks/datadog_logs/
[12]: https://vector.dev/docs/reference/configuration/sinks/datadog_metrics/
[13]: https://vector.dev/docs/reference/configuration/
[14]: /fr/agent/kubernetes/?tab=helm
[15]: https://github.com/timberio/helm-charts/tree/master/charts/vector-aggregator
[16]: https://vector.dev/docs/setup/installation/package-managers/helm/
[17]: /fr/api/latest/logs/#send-logs