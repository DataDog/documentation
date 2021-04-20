---
aliases:
  - /fr/integrations/nodejs/
categories:
  - languages
  - log collection
ddtype: library
dependencies: []
description: Envoyez des métriques custom à partir de vos services Node.js via DogStatsD ou notre API.
doc_link: 'https://docs.datadoghq.com/integrations/nodejs/'
draft: false
further_reading:
  - link: 'https://www.datadoghq.com/blog/node-logging-best-practices/'
    tag: Blog
    text: 'Comment recueillir, personnaliser et centraliser des Node.js'
  - link: 'https://www.datadoghq.com/blog/node-monitoring-apm/'
    tag: Blog
    text: Surveillance Node.js avec l'APM et le tracing distribué de Datadog
git_integration_title: node
has_logo: true
integration_title: NodeJS
is_public: true
kind: integration
manifest_version: '1.0'
name: node
public_title: Intégration Datadog/NodeJS
short_description: Envoyez des métriques custom à partir de vos services Node.js via DogStatsD ou notre API.
version: '1.0'
---
## Présentation

L'intégration Node.js vous permet de recueillir et de surveiller les logs, les traces et les métriques custom de vos applications Node.js.

## Configuration

### Collecte de métriques

L'intégration Node.js vous permet de surveiller une métrique custom en instrumentant quelques lignes du code. Par exemple, vous pouvez disposer d'une métrique qui renvoie le nombre de vues de pages ou la durée d'un appel de fonction.

L'instrumentation peut être effectuée à l'aide de [hot-shots][1], une version open source du client DogStatsD pour Node.js.

Pour en savoir plus sur l'intégration Node.js, consultez [le guide sur l'envoi de métriques][2].

1. Installez hot-shots avec npm :

    ```shell
    npm install hot-shots
    ```

2. Commencez à instrumenter votre code :

    ```js
    var StatsD = require('hot-shots');
    var dogstatsd = new StatsD();

    // Increment a counter.
    dogstatsd.increment('page.views')
    ```

### Collecte de traces

Consultez la documentation relative à l'[instrumentation de votre application Node.js][3] pour envoyer vos traces à Datadog.

### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

Consultez la documentation relative à la [configuration de la collecte de logs Node.js][4] pour envoyer vos logs à Datadog.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/brightcove/hot-shots
[2]: https://docs.datadoghq.com/fr/developers/metrics/
[3]: https://docs.datadoghq.com/fr/tracing/setup/nodejs/
[4]: https://docs.datadoghq.com/fr/logs/log_collection/nodejs/
[5]: https://docs.datadoghq.com/fr/help/