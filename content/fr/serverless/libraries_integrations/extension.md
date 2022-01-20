---
title: Extension Lambda Datadog
kind: documentation
further_reading:
  - link: serverless/custom_metrics
    tag: Documentation
    text: Envoyer des métriques custom à partir d'AWS Lambda
  - link: https://www.datadoghq.com/blog/aws-graviton2-lambda-monitoring/
    tag: Blog
    text: Fonctions AWS Lambda exécutées sur des processeurs AWS Graviton2
aliases:
  - /fr/serverless/datadog_lambda_library/extension/
---
## Présentation

Les extensions AWS Lambda sont des processus complémentaires qui permettent d'enrichir vos fonctions Lambda. Elles s'exécutent dans l'environnement d'exécution Lambda, avec le code de votre fonction Lambda. L'extension Datadog est une version plus légère de l'Agent Datadog, conçue pour s'exécuter en même temps que votre code avec un impact minimal sur les performances.

{{< img src="serverless/serverless_monitoring_installation_instructions.png" alt="Instrumenter des applications sans serveur AWS"  style="width:100%;">}}

L'extension Lambda Datadog est utilisée pour :
- Envoyer en temps réel des [métriques Lambda optimisées][1], des [métriques custom][2] et des [traces][3] depuis la bibliothèque Lambda Datadog à Datadog.
- Transmettre des logs depuis votre fonction Lambda à Datadog.

L'extension Datadog envoie des métriques custom, des métriques optimisées, des traces et des logs de façon [asynchrone][4]. L'envoi de logs Lambda via l'extension est pris en charge dans tous les runtimes Lambda. L'envoi de métriques custom, de métriques optimisées et de traces est pris en charge dans les runtimes Lambda Node.js, Python et Go.

## Installation

Pour installer l'extension Lambda Datadog, instrumenter vos applications sans serveur AWS et passer en revue les runtimes pris en charge, consultez les [instructions d'installation pour les environnements sans serveur][5].

## Collecte de logs

Pour désactiver l'envoi de vos logs AWS Lambda à Datadog via l'extension, définissez la variable d'environnement `DD_SERVERLESS_LOGS_ENABLED` sur `false` dans votre fonction Lambda.

Pour exclure les logs `START` et `END`, définissez la variable d'environnement `DD_LOGS_CONFIG_PROCESSING_RULES` sur `[{"type": "exclude_at_match", "name": "exclude_start_and_end_logs", "pattern": "(START|END)\\s"}]`. Vous pouvez également ajouter un fichier `datadog.yaml` dans le répertoire de départ de votre projet avec le contenu suivant :

```yaml
logs_config:
  processing_rules:
    - type: exclude_at_match
      name: exclude_start_and_end_logs
      pattern: (START|END)\s
```

Pour nettoyer ou filtrer d'autres logs avant de les envoyer à Datadog, consultez [Collecte de logs avancée][6].


## Collecte de traces

Pour désactiver l'envoi de vos traces AWS Lambda à Datadog via l'extension, définissez la variable d'environnement `DD_TRACE_ENABLED` sur `false` dans votre fonction Lambda.

Pour filtrer des traces avant de les envoyer à Datadog, consultez [Ignorer les ressources non désirées dans l'APM][7].

Si vous avez besoin de nettoyer les attributs de vos traces pour des raisons de sécurité, consultez [Configurer l'Agent Datadog ou le traceur pour assurer la sécurité des données][8].

## Tags

Lorsque vous utilisez l'extension, Datadog vous conseille d'appliquer des tags en ajoutant les variables d'environnement suivantes à vos fonctions Lambda :

- `DD_ENV` : permet de définir le tag `env` dans Datadog. Utilisez ce tag pour faire la différence entre vos environnements de staging, de développement et de production.
- `DD_SERVICE` : permet de définir le tag `service` dans Datadog. Utilisez ce tag pour regrouper les fonctions Lambda connexes au sein d'un service.
- `DD_VERSION` : permet de définir le tag `version` dans Datadog. Utilisez ce tag pour activer le [Suivi des déploiements][9].
- `DD_TAGS` : permet de définir des tags custom dans Datadog. Doit correspondre à une liste de paires `<key>:<value>` séparées par des virgules, par exemple : `layer:api,team:intake`.

Si vous avez activé l'intégration Datadog/AWS, les tags de ressource AWS appliqués à votre fonction AWS Lambda seront également appliqués dans Datadog automatiquement.

## VPC

L'extension Lambda Datadog doit avoir accès à Internet pour envoyer des données à Datadog. Si vos fonctions Lambda sont déployées dans un sous-réseau privé de VPC sans accès à Internet, consultez les options ci-dessous.

### Avec AWS PrivateLink

Si vous envoyez des données à un site Datadog hébergé sur AWS, tel que US1, vous pouvez [envoyer ces données via AWS PrivateLink][10]. Consultez la section [Sites Datadog][11] ou ouvrez un ticket sur [help.datadoghq.com][12] si vous ne connaissez pas votre site Datadog.

### Avec un proxy

Si vous envoyez des données à un site Datadog qui n'est _PAS_ hébergé sur AWS, tel que EU1, vous devez alors [passer par un proxy][13].

## Performances

L'extension Lambda Datadog alourdit légèrement votre fonction Lambda lors des démarrages à froid (l'initialisation prend donc plus de temps). Datadog optimise continuellement les performances de l'extension Lambda et vous conseille de toujours utiliser la dernière version.

Vous remarquerez peut-être que la durée d'exécution annoncée de votre fonction Lambda est plus longue qu'auparavant. Cela s'explique par le fait que l'extension Lambda Datadog doit renvoyer des données via l'API Datadog. Bien que le temps passé à transmettre ces données soit pris en compte dans la durée de la fonction, cette opération a lieu *après* le renvoi de la réponse de votre fonction au client par AWS. En d'autres termes, votre fonction Lambda ne subit en réalité aucun ralentissement. Consultez cet [article sur le blog d'AWS][14] pour en savoir plus.

Par défaut, l'extension renvoie les données à Datadog à la fin de chaque invocation. Cela permet d'éviter les retards de transmission des données pour les applications à faible trafic qui effectuent des invocations de façon sporadique, les tâches cron et les tests manuels. Dès que l'extension détecte un pattern d'invocation régulier et fréquent (plus d'une fois par minute), elle regroupe les données de plusieurs invocations et transmet les données de façon périodique au début de l'invocation. Cela signifie que *plus votre fonction est occupée, plus la durée d'exécution moyenne par invocation sera faible*.

Si votre fonction Lambda est déployée dans une région éloignée du site Datadog, par exemple si elle est déployée dans eu-west-1 et qu'elle transmet ses données au site Datadog US1, il est possible que la durée d'exécution soit plus élevée en raison de la latence du réseau. Vous pouvez définir la variable d'environnement `DD_SERVERLESS_FLUSH_STRATEGY` avec la valeur `periodically,30000` sur vos fonctions Lambda afin de transmettre les données toutes les 30 secondes au lieu de 10 secondes par défaut. Ce changement se traduira généralement par une durée d'exécution *moyenne* nettement inférieure par invocation.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/serverless/enhanced_lambda_metrics
[2]: /fr/serverless/custom_metrics
[3]: /fr/serverless/distributed_tracing
[4]: /fr/serverless/custom_metrics?tab=python#synchronous-vs-asynchronous-custom-metrics
[5]: /fr/serverless/installation
[6]: /fr/agent/logs/advanced_log_collection/
[7]: /fr/tracing/guide/ignoring_apm_resources/
[8]: /fr/tracing/setup_overview/configure_data_security/
[9]: /fr/tracing/deployment_tracking/
[10]: /fr/serverless/guide/extension_private_link/
[11]: /fr/getting_started/site/
[12]: https://help.datadoghq.com/
[13]: /fr/agent/proxy/
[14]: https://aws.amazon.com/blogs/compute/performance-and-functionality-improvements-for-aws-lambda-extensions/