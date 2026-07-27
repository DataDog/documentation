---
aliases:
- /fr/cloudprem/configure/processing/
description: Découvrir comment configurer vos pipelines de traitement dans CloudPrem
further_reading:
- link: /cloudprem/architecture/
  tag: Documentation
  text: En savoir plus sur l'architecture de CloudPrem
- link: /cloudprem/troubleshooting/
  tag: Documentation
  text: Dépannage
title: Configuration du traitement
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en bêta" >}}
  Participez à la bêta de CloudPrem pour profiter de nouvelles fonctionnalités autohébergées de gestion des logs.
{{< /callout >}}

## Présentation

CloudPrem inclut une fonctionnalité de traitement qui vous permet d'analyser et d'enrichir les logs. Il analyse automatiquement les logs au format JSON. Vous pouvez définir des pipelines et des processeurs pour extraire des informations ou des attributs pertinents à partir de texte semi-structuré, qui peuvent ensuite être utilisés pour des agrégations.

<div class="alert alert-info">Les pipelines de logs et les processeurs CloudPrem sont conçus pour correspondre aux capacités des <a href="/logs/log_configuration/pipelines/?tab=source">pipelines de logs et processeurs cloud de Datadog</a>. </div>

Pour obtenir la liste des processeurs pris en charge et non pris en charge, consultez la section [Compatibilité avec les pipelines cloud](#compatibilité-avec-les-pipelines-cloud).

Vous pouvez configurer des pipelines de traitement de logs à l'aide d'un fichier JSON conforme au même format que les configurations de pipelines Datadog.

## Configurer le traitement

1. (Facultatif) Si vous disposez de pipelines cloud existants dans Datadog, vous pouvez récupérer la configuration à l'aide de l'[API Logs Pipelines][2] :

   ```bash
   curl -X GET "https://api.datadoghq.com/api/v1/logs/config/pipelines" \
    -H "Accept: application/json" \
    -H "DD-API-KEY: ${DD_API_KEY}" \
    -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" > pipelines-config.json
   ```

Ce fichier JSON peut être utilisé directement avec CloudPrem.

2. Pour définir la configuration dans le Helm Chart, indiquez le chemin vers votre fichier de configuration JSON à l'aide du paramètre `pipelinesConfig` dans le Helm chart CloudPrem :

   ```bash
   helm repo update
   helm upgrade <RELEASE_NAME> -n <NAMESPACE_NAME> --set-file pipelinesConfig=./pipelines-config.json -f datadog-values.yaml
   ```

   CloudPrem consigne un message d'information (`Successfully read pipeline config file`) lorsqu'il lit correctement le fichier de configuration. Les processeurs définis dans le fichier qui ne sont pas pris en charge par CloudPrem sont ignorés au démarrage.
   **Remarque** : Helm impose une limite de taille de 1 Mo sur le fichier de configuration en raison du stockage etcd sous-jacent.

## Format du fichier de configuration

La configuration est un tableau JSON, où chaque élément représente un processeur ou un pipeline imbriqué.

L'ordre des éléments dans le tableau définit l'ordre d'exécution séquentielle des processeurs. La structure reflète la sortie de l'endpoint d'API Datadog `api/v1/logs/config/pipelines`.


```json
[
  {
    // processor1 details
  },
  {
    // processor2 details
  }
]
```

```json
[
  {
    "type": "pipeline",
    "id": "U73LOMZ9QG2iM-04OcXypA",
    "name": "cluster agent logs parsing",
    "enabled": true,
    "filter": {
      "query": "service:cluster-agent"
    },
    "processors": [
      {
        "type": "grok-parser",
        "id": "xn2WAzysQ1asaasdfakjf",
        "enabled": true,
        "grok": {
          "supportRules": "",
          "matchRules": "agent_rule %{date(\"yyyy-MM-dd HH:mm:ss z\"):timestamp} \\| %{notSpace:agent} \\| %{word:level} \\| \\(%{notSpace:filename}:%{number:lineno} in %{word:process}\\) \\|( %{data::keyvalue(\":\")} \\|)?( - \\|)?( \\(%{notSpace:pyFilename}:%{number:pyLineno}\\) \\|)?%{data}\nagent_rule_pre_611 %{date(\"yyyy-MM-dd HH:mm:ss z\"):timestamp} \\| %{word:level} \\| \\(%{notSpace:filename}:%{number:lineno} in %{word:process}\\)%{data}\njmxfetch_rule     %{date(\"yyyy-MM-dd HH:mm:ss z\"):timestamp} \\| %{notSpace:agent} \\| %{word:level}\\s+\\| %{word:class} \\| %{data}"
        }
      },
      {
        "id": "xnsd5oanXq2893utcsQ",
        "type": "status-remapper",
        "enabled": true,
        "sources": ["level"]
      },
      {
        "type": "date-remapper",
        "id": "xn2WAzysQ1asdjJsb9dfb",
        "enabled": true,
        "sources": ["timestamp"]
      }
    ]
  }
]
```

## Compatibilité avec les pipelines cloud

Le traitement CloudPrem est conçu pour s'aligner étroitement avec le [Log Management][3] Datadog cloud, permettant l'utilisation directe des configurations de pipelines de logs existants. Pour ce faire, il ignore les processeurs inconnus ou non pris en charge. Il existe toutefois quelques différences :
- Certaines requêtes de filtrage ne peuvent pas être analysées, comme les filtres avec des wildcards combinés (par exemple, `@data.message:+*`).
- Le filtrage sur `message` a un comportement de correspondance différent (cela affecte également le category processor).
- CloudPrem utilise une expression régulière pour rechercher le mot, mais devrait tokeniser le texte et tenter de faire correspondre les tokens. Les phrases sont également ignorées.
- Les groks utilisent des expressions régulières en interne. Les moteurs d'expressions régulières peuvent avoir un comportement de correspondance légèrement différent.
- Certains patterns grok ne peuvent pas être analysés (par exemple, `%{?>notSpace:db.severity}`).

Les processeurs ignorés apparaissent sous forme d'avertissement dans les logs de l'indexeur.

### Processeurs pris en charge :
- attribute-remapper
- category-processor
- date-remapper
- grok-parser (compatibilité limitée)
- message-remapper
- pipeline
- service-remapper
- status-remapper
- string-builder-processor
- trace-id-remapper

### Processeurs non pris en charge :
- arithmetic-processor
- geo-ip-parser
- lookup-processor
- url-parser
- user-agent-parser

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_configuration/pipelines/?tab=source
[2]: /fr/api/latest/logs-pipelines/#get-all-pipelines
[3]: /fr/logs/log_configuration/processors/