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
git_integration_title: node
has_logo: true
integration_title: NodeJS
is_public: true
kind: integration
manifest_version: '1.0'
name: node
public_title: Intégration Datadog/NodeJS
short_description: Envoyez des métriques custom à partir de vos services Node.js via DogStatsD ou notre API. our API.
version: '1.0'
---
{{< img src="integrations/nodejs/nodejs_graph.png" alt="Graphique Node.js" >}}

## Présentation

Associez vos applications Node.js à Datadog pour :

* Visualiser leurs performances
* Corréler leurs performances avec le reste de vos applications
* Surveiller toutes les métriques pertinentes

## Implémentation
### Configuration

#### Collecte de métriques

L'intégration Node.js vous permet de surveiller une métrique custom en instrumentant quelques lignes du code. Par exemple, vous pouvez disposer d'une métrique qui renvoie le nombre de vues de pages ou la durée d'un appel de fonction.

L'instrumentation peut être effectuée à l'aide de [hot-shots][1], une version open source du client DogStatsD pour Node.js.

Pour en savoir plus sur l'intégration Node.js, consultez [le guide sur l'envoi de métriques][2].

1. Installez hot-shots avec npm :

```
npm install hot-shots
```

2. Commencez à instrumenter votre code :

```js
var StatsD = require('hot-shots');
var dogstatsd = new StatsD();

// Incrémenter un counter.
dogstatsd.increment('page.views')
```

#### Collecte de logs

**Disponible pour les versions 6+ de l'Agent**

Pour créer des logs depuis votre application Node.js, nous vous conseillons d'utiliser [Winston][3]. Nous vous encourageons fortement à configurer votre bibliothèque de journalisation afin de générer vos logs au format JSON et d'éviter de devoir mettre à jour des règles de parsing personnalisées.

Suivez le [guide de journalisation Node.js][4] pour commencer à transmettre vos logs.

### Validation
Les métriques s'affichent sur la page Metrics Explorer.

## Données collectées
### Métriques
L'intégration Node.js n'inclut aucune métrique.

### Événements
L'intégration Node.js n'inclut aucun événement.

### Checks de service
L'intégration Node.js n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://github.com/brightcove/hot-shots
[2]: https://docs.datadoghq.com/fr/developers/metrics
[3]: https://github.com/winstonjs/winston
[4]: https://docs.datadoghq.com/fr/logs/languages/nodejs
[5]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}