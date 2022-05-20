---
title: Agréger les données de plusieurs Agents avec Vector
kind: documentation
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

- Seule l'agrégation des logs est prise en charge.
- Vector peut recueillir des logs directement auprès d'autres sources. Il est néanmoins possible que les logs provenant de fournisseur tiers n'incluent pas les bons tags. Pour [ajouter des tags][8], une source ou des valeurs de service, il est recommandé d'utiliser le [langage de remappage Vector][9].

## Configuration

### Configuration de l'Agent
Pour envoyer des logs à Vector, modifiez le fichier de configuration `datadog.yaml` de l'Agent. Seules les données des logs sont prises en charge. Modifiez les valeurs suivantes dans le fichier `datadog.yaml` :

```yaml
logs_config:
  logs_dd_url: "<HOST_VECTOR>:<PORT_VECTOR>"
  logs_no_ssl: true # Si le TLS/SSL n'est pas activé côté Vector
  use_http: true # La source `datadog_agent` de Vector prend uniquement en charge les événements transmis via HTTP(S), et non par l'intermédiaire d'une connexion TCP brute
  # use_v2_api: false # Supprimer la mise en commentaire de cette ligne si vous utilisez une version de Vector antérieure à 0.17.0
```

Remplacez <HOST_VECTOR> par le hostname du système exécutant Vector et <PORT_VECTOR> par le port TCP sur lequel la source `datadog_agent` de Vector effectue son écoute.

### Configuration Docker

Si vous utilisez Docker, ajoutez ce qui suit au fichier de configuration de votre Agent.

```
-e DD_LOGS_CONFIG_LOGS_DD_URL=<HOST_VECTOR>:<PORT_VECTOR>
-e DD_LOGS_CONFIG_LOGS_NO_SSL=true
-e DD_LOGS_CONFIG_USE_HTTP=true
```

### Configuration de Vector
Pour que l'Agent Datadog transmette des logs à Vector, configurez une [source datadog_agent][10]. Pour envoyer des logs à Datadog, Vector doit inclure au moins un [récepteur datadog_logs][11].

Consultez la [documentation Vector][12] officielle (en anglais) pour découvrir tous les paramètres de configuration et toutes les transformations qui peuvent être appliquées aux logs lors de leur traitement par Vector.

L'exemple de configuration suivant ajoute un tag à chaque log à l'aide du langage de remappage Vector :

```yaml
sources:
  datadog_agents:
    type: datadog_agent
    address: "[::]:8080" # Le placeholder <PORT_VECTOR> indiqué ci-dessus doit être défini sur la valeur de ce port

transforms:
  add_tags:
    type: remap
    inputs:
      - datadog_agents
    source: |
      # Le raccourci `!` est utilisé ici avec la fonction `string` ; il renvoie une erreur si .ddtags n'est pas une « string ».
      # Le champ .ddtags doit toujours être une string.
      .ddtags = string!(.ddtags) + ",sender:vector"

sinks:
  to_datadog:
    type: datadog_logs
    inputs:
       - add_tags
    default_api_key: "${DATADOG_API_KEY_ENV_VAR}"
    encoding:
      codec: json
```

### Avec Kubernetes

Les [paramètres de configuration de l'Agent](#configuration-de-l-agent) décrits ci-dessus peuvent être ajoutés à la valeur `agents.customAgentConfig` à l'aide du chart Datadog officiel. **Remarque** : pour que la valeur de `agents.customAgentConfig` soit appliquée, `agent.useConfigMap` doit être défini sur `true`.

Pour en savoir plus sur le chart Helm Datadog, consultez la [documentation Kubernetes][13].

Vector fournit un [chart officiel pour l'agrégation de données][14], avec une source de logs Datadog préconfigurée. Pour en savoir plus sur l'installation de Vector avec Helm, consultez la [documentation Vector officielle][15] (en anglais).

Pour envoyer des logs à Datadog, vous devez ajouter un récepteur `datadog_logs` à la configuration Vector. Le chart Vector peut inclure n'importe quelle configuration Vector valide dans le fichier `values.yaml` grâce au champ `customConfig`. Pour activer `datadog_logs`, vous pouvez inclure directement dans la configuration du chart Vector le même type de configuration décrite dans la rubrique [Configuration Vector](#configuration-vector), sans y apporter la moindre modification.

## Gérer des logs Datadog avec Vector

Les logs envoyés par Datadog peuvent bénéficier des fonctionnalités de Vector. Il est notamment possible d'exploiter le [langage de remappage Vector][3] pour transformer les logs. Lorsque Vector reçoit des logs envoyés par l'Agent Datadog, ils sont structurés selon le schéma attendu. Si vous envoyez directement vos logs depuis l'API Datadog, consultez la [documentation sur l'API][16] pour découvrir la description complète du schéma.

Les logs recueillis par Vector à partir d'autres sources peuvent être [entièrement enrichis][8]. Le langage de remappage Vector permet également de modifier ces logs, en remplissant les champs pertinents en fonction du schéma attendu.

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
[12]: https://vector.dev/docs/reference/configuration/
[13]: /fr/agent/kubernetes/?tab=helm
[14]: https://github.com/timberio/helm-charts/tree/master/charts/vector-aggregator
[15]: https://vector.dev/docs/setup/installation/package-managers/helm/
[16]: /fr/api/latest/logs/#send-logs