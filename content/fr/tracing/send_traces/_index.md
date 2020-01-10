---
title: Activer la collecte de traces dans Datadog
kind: Documentation
aliases:
  - /fr/tracing/setup/
  - /fr/tracing/environments/
  - /fr/tracing/setup/environment
  - /fr/tracing/setup/first_class_dimensions
  - /fr/tracing/getting_further/first_class_dimensions/
  - /fr/agent/apm/
further_reading:
  - link: tracing/send_traces/agent-apm-metrics/
    tag: Documentation
    text: Métriques APM envoyées par l'Agent Datadog
  - link: /agent/docker/apm
    tag: Documentation
    text: Configuration de l'APM Docker
  - link: '/integrations/amazon_ecs/#collecte-de-traces'
    tag: Documentation
    text: Configuration de l'APM ECS EC2
  - link: '/integrations/ecs_fargate/#collecte-de-traces'
    tag: Documentation
    text: Configuration de l'APM ECS Fargate
---
Pour utiliser l'APM, commencez par envoyer vos [traces][1] à Datadog, puis [configurez votre environnement](#configurer-votre-environnement). Vous pouvez envoyer des traces à Datadog de plusieurs manières en fonction de la configuration de votre système : en exécutant l'[Agent Datadog localement](#agent-datadog), [sur des conteneurs](#conteneurs) ou [via un autre type d'environnement](#environnements-supplementaires). Pour consulter l'ensemble des étapes de configuration de l'APM, accédez à la section [Présentation de l'APM][2].

## Agent Datadog

L'APM est activé par défaut dans l'Agent 6. Définissez `apm_non_local_traffic: true` dans votre [fichier de configuration principal `datadog.yaml`][3] si vous envoyez des traces depuis un environnement non local (comme un conteneur).

Pour découvrir l'ensemble des paramètres disponibles pour l'APM, consultez le [fichier de configuration  `datadog.example.yaml`][4] de l'Agent. Pour obtenir la liste complète des métriques envoyées à Datadog par l'Agent, consultez la page [Métriques APM envoyées par l'Agent Datadog][5]. Pour en savoir plus sur l'Agent Datadog, consultez la [documentation sur l'Agent][6] ou reportez-vous au [modèle de configuration `datadog.yaml`][4].

## Conteneurs

Consultez les instructions de configuration spécifiques pour vous assurer que l'Agent est configuré de manière à recevoir des traces dans un environnement conteneurisé :

{{< partial name="apm/apm-containers.html" >}}
</br>
Remarque : après avoir instrumenté votre application, par défaut, le client de tracing envoie les traces à `localhost:8126`.

## Environnement sans serveur

### AWS Lambda

Pour en savoir plus sur la configuration de Lambda - X-Ray, consultez la [documentation sur l'intégration Amazon X-Ray][7].

### Google App Engine, AAS

L'APM Datadog requiert l'envoi de données de trace à un Agent en cours d'exécution. Pour activer la collecte de trace dans un environnement sans serveur, il est possible de configurer une machine virtuelle distincte qui accepte le trafic de traces de manière externe.

## Environnements supplémentaires

Vous pouvez utiliser d'autres composants que l'Agent et les conteneurs pour recueillir des traces.

### Heroku

Le tracing est activé par défaut lors de la surveillance avec Heroku. Pour en savoir plus sur la configuration du tracing pour Heroku, consultez la [documentation sur la plateforme cloud Heroku][8].

### Cloud Foundry

Le tracing est activé par défaut lors de la surveillance avec Cloud Foundry. Pour en savoir plus sur la configuration du tracing pour Cloud Foundry, consultez la [documentation Cloud Foundry][9].

## Configurer votre environnement

Il existe plusieurs manières de spécifier [un environnement][10] lors de l'envoi de données :

1. **Tag de host** : utilisez un tag de host au format `env:<ENVIRONNEMENT>` pour appliquer le tag correspondant à l'ensemble des traces de l'Agent.
2. **Configuration de l'Agent** : remplacez le tag par défaut utilisé par l'Agent dans le fichier de configuration de l'Agent. Cela permet de taguer l'ensemble des traces transmises à l'Agent en ignorant la valeur du tag de host.

  ```
  apm_config:
  env: <ENVIRONMENT>
  ```

3. **Par trace** : lorsque vous envoyez une seule [trace][1], spécifiez un environnement en taguant l'une de ses [spans][11] avec la clé de métadonnées `env`. Ce tag remplace alors la configuration de l'Agent et la valeur du tag de host (le cas échéant). Consultez la [documentation relative au tagging de traces][12] pour découvrir comment assigner un tag à vos traces.

## Étapes suivantes

Ensuite, [instrumentez votre application][13]. Pour consulter l'ensemble des étapes de configuration de l'APM, accédez à la section [Présentation de l'APM][2].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/#trace
[2]: /fr/tracing
[3]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[4]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[5]: /fr/tracing/send_traces/agent-apm-metrics
[6]: /fr/agent
[7]: /fr/integrations/amazon_xray/#overview
[8]: /fr/agent/basic_agent_usage/heroku/#installation
[9]: /fr/integrations/cloud_foundry/#trace-collection
[10]: /fr/tracing/setting_primary_tags_to_scope/#definition
[11]: /fr/tracing/visualization/#spans
[12]: /fr/tracing/adding_metadata_to_spans/?tab=java
[13]: /fr/tracing/setup