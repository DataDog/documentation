---
description: Apprenez à utiliser le processeur Add Environment Variables pour ajouter
  le nom et la valeur d'une variable d'environnement aux messages de log.
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Add Environment Variables Processor
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez ce processeur pour ajouter un nom de champ de variable d'environnement et une valeur au message de log.

## Configuration {#setup}

Pour configurer ce processeur :

1. Définissez un {{< ui >}}filter query{{< /ui >}}. Consultez [Logs Search Syntax][1] pour plus d'informations.
   - Seuls les logs correspondant au filtre sont traités.
   - Tous les logs, qu’ils correspondent ou non à la requête de filtrage, sont envoyés à l’étape suivante du pipeline.
1. Saisissez le nom du champ pour la variable d'environnement.
1. Saisissez le nom de la variable d'environnement.
1. Cliquez sur {{< ui >}}Add Environment Variable{{< /ui >}} si vous souhaitez ajouter une autre variable d'environnement.

### Variables d'environnement bloquées&nbsp;{#blocked-environment-variables}

Les variables d'environnement qui correspondent à l'un des modèles suivants sont empêchées d'être ajoutées aux messages de log car la variable d'environnement pourrait contenir des données sensibles.

- `CONNECTIONSTRING` / `CONNECTION-STRING` / `CONNECTION_STRING`
- `AUTH`
- `CERT`
- `CLIENTID` / `CLIENT-ID` / `CLIENT_ID`
- `CREDENTIALS`
- `DATABASEURL` / `DATABASE-URL` / `DATABASE_URL`
- `DBURL` / `DB-URL` / `DB_URL`
- `KEY`
- `OAUTH`
- `PASSWORD`
- `PWD`
- `ROOT`
- `SECRET`
- `TOKEN`
- `USER`

La variable d'environnement est comparée au modèle et non au mot littéral. Par exemple, `PASSWORD` bloque l'ajout de variables d'environnement telles que `USER_PASSWORD` et `PASSWORD_SECRET` aux messages de log.

### Liste d'autorisation&nbsp;{#allowlist}

Après avoir ajouté des processeurs à votre pipeline et cliqué sur {{< ui >}}Next: Install{{< /ui >}}, dans le champ {{< ui >}}Add environment variable processor(s) allowlist{{< /ui >}}, saisissez une liste séparée par des virgules des variables d'environnement dont vous souhaitez extraire les valeurs et les utiliser avec ce processeur.

La liste d'autorisation est stockée dans la variable d'environnement `DD_OP_PROCESSOR_ADD_ENV_VARS_ALLOWLIST`.

## Métriques de santé {#health-metrics}

Pour les [métriques de composants][2] et les [métriques de tampon de processeur][3] émises par tous les processeurs, consultez la documentation sur les [Métriques d'utilisation des pipelines][4]. Pour filtrer ou regrouper par les métriques du processeur Add Environment Variables, utilisez le tag `component_type:add_env_vars`.

[1]: /fr/observability_pipelines/search_syntax/logs/
[2]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[4]: /fr/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/