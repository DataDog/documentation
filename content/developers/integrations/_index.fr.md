---
title: Créer une nouvelle intégration
kind: documentation
aliases:
  - /fr/guides/new_integration/
---
## Aperçu

Être capable de voir toutes vos métriques à travers votre infrastructure est la clé de Datadog. Alors que nous avons des guides pour soumettre [des métriques custom][1] via notre [API][2] et des [instrumentation de code][3], il est possible que vous souhaitiez voir une certaine source devenir une intégration officielle. Dans l'ensemble, le facteur déterminant le plus important dans la construction des intégrations Datadog est d'être à l'écoute de ce que nos clients demandent.

Si vous souhaitez proposer une intégration, contactez-nous à l'adresse support@datadoghq.com et indiquez-nous les métriques que vous souhaiteriez afficher à partir de cette source.

Si vous gérez ou utilisez un service et souhaitez que Datadog l'intègre, les informations suivantes sont nécessaires:

* Comment les données peuvent être envoyées à Datadog? Il y a actuellement trois options:
  *  Transférer les données de la source vers Datadog
  *  Explorer l'API de la source de données
  *  Demandez à l'agent Datadog de récupérer les informations de la source
* Quelles sont les métriques et les tags qui doivent être récupérés depuis la source?
* Quelles métriques doivent être incluses dans le dashboard par défaut que nous générons pour chaque intégration?

Nous avons également besoin d'un bref texte décrivant l'intégration ainsi que la bonne image à utiliser sur notre site.

## Nouvelle documentation d'intégration

Les intégrations comprennent des informations provenant de deux sources différentes. La première et principale source sont les fichiers dans content/integrations. La deuxième source sont les fichiers csv métriques sous dogweb. Afin de voir les tableaux de métriques qui apparaissent pour certaines intégrations, vous devez créer une variable d'environnement nommée `github_personal_token`, affectée de votre jeton personnel github (vous devez avoir accès à dogweb et donc être un employé de Datadog pour voir ceci) . La table est automatiquement introduite par le processus de déploiement.

Le début de chaque fichier d'intégration doit inclure le frontmatter suivant:

    ---
    title: Datadog-<integration name> Integration
    integration_title: <integration name>
    kind: integration
    git_integration_title: <integration name>
    ---

Il n'est pas nécessaire de mettre à jour un index, un menu ou les barres latérales. Ceux-ci sont générés automatiquement.

La plupart des intégrations commencent avec un niveau de titre de H2.

Chaque intégration doit avoir le format suivant:

```
## Overview
**Absolutely Required.**

The first thing in the Overview should be a representative image for the integration. Try to make it as interesting as possible.

The overview section is required and should be a paragraph or two with some bullets of what is interesting about this integration. For example, the following comes from the Docker integration.

Get metrics from Docker in real time to:

* Visualize your containers' performance.
* Correlate the performance of containers with the applications running inside.

There are three ways to setup the Docker integration: install the Agent on the host, on a single priviledged container, and on each individual container.

## Setup
### Installation
**Required with some exceptions**

The installation section should cover anything that needs to be installed on the Agent host. For instance, in the Docker installation section you learn about installing the Agent into a container. If there is nothing to install on the Agent host, this section can be left out. To be a complete integration, either an installation section or a configuration section must be included.

### Configuration
**Required with some exceptions**

The configuration section should cover anything that you can configure in the Datadog interface or the Agent configuration files. In almost every case this section should be included since there is almost always something to configure. To be a complete integration, either an installation section or a configuration section must be included.

### Configuration Options

Describe each of the options available in the YAML file. This is often the stuff included in the YAML comments (remove them from the YAML included in the doc), but sometimes you have to investigate a bit to figure out what the option is for.

### Validation
**Required**

The validation section should include instructions on how to validate that the integration is successfully working.

## Troubleshooting
**Optional**

The troubleshooting section should include anything that answers a question a user might have about the integration. If there is a question that comes up in support about the integration, it should be added here.

##Data Collected
### Metrics
**Required for integrations that have metrics**

Include a list of metrics if the integration provides any.

### Events
**Optional**

Include a list of events if the integration provides any.

### Service Checks
**Optional**

Include a list of service checks if the integration provides any.

## Further Reading
**Optional**

Include any links to Docs pages or Datadog blog articles that highlight the integration.
```

[1]: /developers/metrics/
[2]: /api/
[3]: /developers/libraries/
