---
algolia:
  tags:
  - apm automatic instrumentation
further_reading:
- link: /tracing/glossary/
  tag: Documentation
  text: Termes et concepts d'APM
kind: documentation
title: Instrumentation automatique
---

## Présentation

L'instrumentation automatique vous permet de créer automatiquement des spans pour votre application. Vous pouvez ainsi capturer des données d'observabilité à partir d'un large éventail d'opérations standard et de frameworks populaires, et ce en limitant les interventions manuelles. L'instrumentation automatique de votre application peut être configurée lors de l'installation de l'Agent Datadog grâce à l'[instrumentation en une étape][5], ou en [ajoutant manuellement les bibliothèques de tracing Datadog][6] dans votre code.

## Cas d'utilisation

L'instrumentation automatique peut être utile dans les cas suivants :

- Pour capturer des données d'observabilité essentielles avec les bibliothèques et les langages courants, le tout sans configuration complexe.
- Pour activer la surveillance en temps réel avec des paramètres pré-configurés et ainsi analyser sans attendre les performances de votre application.
- Pour simplifier votre système d'observabilité lorsqu'aucune [instrumentation personnalisée][7] n'est requise.

## Prise en main

Suivez la documentation correspondant à votre méthode d'instrumentation automatique pour en savoir plus :

{{< tabs >}}
{{% tab "Instrumentation en une étape (bêta)" %}}

Si vous installez ou mettez à jour l'Agent Datadog en ayant sélectionné l'option **Enable APM Instrumentation (beta)**, l'Agent est installé et configuré pour activer APM. Vous pourrez ainsi instrumenter automatiquement votre application sans étape d'installation ou de configuration supplémentaire.

Pour commencer, lisez la documentation [Instrumentation en une étape][1].

[1]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm

{{% /tab %}}

{{% tab "Bibliothèques Datadog" %}}

Pour instrumenter automatiquement votre application à l'aide des bibliothèques Datadog :

1. [Installez et configurez l'Agent](#installer-et-configurer-l-agent).
2. [Ajoutez la bibliothèque de tracing Datadog dans votre code](#instrumenter-votre-application).

### Installer et configurer l'Agent

Installez et configurez l'Agent Datadog de façon à ce qu'il reçoive les traces provenant de votre application instrumentée. Par défaut, l'Agent Datadog est configuré pour recevoir les traces dans votre fichier `datadog.yaml` avec l'option `enabled: true` sous `apm_config`. Il détecte les données de trace sur `http://localhost:8126`.

Pour les environnements conteneurisés, suivez les liens ci-dessous pour activer la collecte de traces au sein de l'Agent Datadog.

#### Conteneurs

1. Définissez `apm_non_local_traffic: true` dans la section `apm_config` de votre [fichier de configuration principal `datadog.yaml`][8].
2. Consultez les instructions de configuration spécifiques pour vous assurer que l'Agent est configuré de façon à recevoir des traces dans un environnement conteneurisé :

{{< partial name="apm/apm-containers.html" >}}

</br>

3. Le client de tracing tente d'envoyer les traces au socket de domaine Unix `/var/run/datadog/apm.socket` par défaut. Si le socket n'existe pas, les traces sont envoyées à `http://localhost:8126`.

   Si vous souhaitez spécifier un autre socket, host ou port, utilisez la variable d'environnement `DD_TRACE_AGENT_URL`. Par exemple :

   ```
   DD_TRACE_AGENT_URL=http://custom-hostname:1234
   DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket

   ```

   Là encore, le client de tracing tente d'envoyer les statistiques au socket de domaine Unix `/var/run/datadog/dsd.socket`. Si le socket n'existe pas, les statistiques sont envoyées à `http://localhost:8125`.

{{< site-region region="us3,us5,eu,gov,ap1" >}}

4. Définissez `DD_SITE` dans l'Agent Datadog sur {{< region-param key="dd_site" code="true" >}} pour vous assurer que l'Agent envoie les données au bon site Datadog.

{{< /site-region >}}

#### AWS Lambda

Pour configurer la solution APM Datadog dans AWS Lambda, consultez la documentation dédiée au [tracing de fonctions sans serveur][9].

#### Autres environnements

Le tracing est disponible pour d'autres d'environnements tels que [Heroku][10], [Cloud Foundry][11], [AWS Elastic Beanstalk][12] et [Azure App Services][13].

Pour les autres environnements, consultez la documentation relative aux [intégrations][14] pour l'environnement qui vous intéresse. [Contactez l'assistance][15] si vous rencontrez des problèmes de configuration.

### Instrumenter votre application

Configurez votre application pour envoyer des traces en utilisant l'une des bibliothèques de tracing Datadog officielles suivantes :

{{< partial name="apm/apm-languages.html" >}}

<br>

Pour instrumenter une application écrite dans un langage qui n'est pas pris en charge par une bibliothèque officielle, consultez la liste des [bibliothèques de tracing de notre communauté][1].

[1]: /fr/developers/community/libraries/#apm-tracing-client-libraries
[8]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[9]: /fr/tracing/serverless_functions/
[10]: /fr/agent/basic_agent_usage/heroku/#installation
[11]: /fr/integrations/cloud_foundry/#trace-collection
[12]: /fr/integrations/amazon_elasticbeanstalk/
[13]: /fr/infrastructure/serverless/azure_app_services/#overview
[14]: /fr/integrations/
[15]: /fr/help/
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[2]: /fr/tracing/trace_collection/custom_instrumentation/dd_libraries/
[3]: /fr/tracing/trace_collection/custom_instrumentation/otel_instrumentation
[4]: /fr/tracing/trace_collection/custom_instrumentation/opentracing/
[5]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm
[6]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[7]: /fr/tracing/trace_collection/custom_instrumentation/