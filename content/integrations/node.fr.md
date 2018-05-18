---
aliases:
  - /fr/integrations/nodejs/
categories:
  - languages
ddtype: crawler
description: >-
  Envoyer des métriques personnalisées à partir de vos services Node.js via
  DogStatsD ou notre API.
doc_link: 'https://docs.datadoghq.com/integrations/nodejs/'
git_integration_title: node
has_logo: true
integration_title: NodeJS
is_public: true
kind: integration
manifest_version: '1.0'
name: node
public_title: Intégration Datadog-NodeJS
short_description: >-
  Envoyer des métriques personnalisées à partir de vos services Node.js via
  DogStatsD ou our API.
version: '1.0'
---
{{< img src="integrations/nodejs/nodejs_graph.png" alt="Node JS graph" >}}

## Aperçu

Connecter vos applications Node.js à Datadog pour:

* Visualiser leur performances
* Corréler leur performances avec le reste de vos applications.
* Monitorer toute métrique pertinente

## Implémentation
### Configuration

L'intégration Node.js vous permet de surveiller toute métrique custom en instrumentant quelques lignes de code.
Par exemple, vous pouvez avoir une métrique qui renvoie le nombre de pages vues ou temps mit par tout appel de fonction.
L'instrumentation peut être implémentée en utilisant [hot-shots][1],
un client DogStatsD open source pour node.js.
Pour plus d'informations sur l'intégration de Node.js, veuillez vous reporter à ce [guide sur la soumission des métriques][2]

1. Installez hot-shots avec npm:

```
npm install hot-shots
```

2. Commencez à instrumenter votre code:

```js
var StatsD = require('hot-shots');
var dogstatsd = new StatsD();

// Increment a counter.
dogstatsd.increment('page.views')
```

### Validation
Allez sur la page [Metrics Explorer](https://app.datadoghq.com/metric/explorer) afin de voir vos métriques!

## Données collectées
### Métriques

L'intégration node n'inclut aucune métrique pour le moment.

### Evénements
L'intégration node n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration node n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide ? Contactez  [l'équipe support de Datadog][3].

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][4].


[1]: https://github.com/brightcove/hot-shots
[2]: https://docs.datadoghq.com/developers/metrics/
[3]: http://docs.datadoghq.com/help/
[4]: https://www.datadoghq.com/blog/