---
categories:
- languages
ddtype: crawler
description: Envoyer des statistiques personnalisées à partir de vos applications PHP en utilisant le PHP DogStatsD
  client.
doc_link: https://docs.datadoghq.com/integrations/php/
git_integration_title: php
has_logo: true
integration_title: PHP
is_public: true
kind: integration
manifest_version: '1.0'
name: php
public_title: Intégration Datadog-PHP
short_description: Envoyer des statistiques personnalisées à partir de vos applications PHP en utilisant DogStatsD
  PHP client.
version: '1.0'
---

{{< img src="integrations/php/phpgraph.png" alt="PHP Graph" responsive="true" >}}

## Aperçu

Connecter vos applications PHP à Datadog pour:

* Visualiser leur performances
* Corréler leur performances avec le reste de vos applications.
* Surveiller toute métrique pertinente

## Implémentation
### Installation

L'intégration de PHP vous permet de monitorer des métriques personnalisées en ajoutant simplement quelques lignes de code à votre application Python. 
Par exemple, vous pouvez avoir une métrique qui renvoie le nombre de pages vues ou le temp de tout appel de fonction. 
Pour plus d'informations sur l'intégration PHP, reportez-vous au [guide sur la soumission des métriques](/guides/metrics). Pour une utilisation avancée, veuillez vous reporter à la documentation dans le répertoire dédié.

1.  Installer la bibliothèque en clonant le répertoire Git:

        git clone git@github.com:DataDog/php-datadogstatsd.git

1.  Commencez à instrumenter votre code:

        # Require the datadogstatsd.php library file
        require './libraries/datadogstatsd.php';


        # Increment a counter.
        DataDogStatsD::increment('your.data.point');

1.  Allez sur la page [Metrics Explorer](https://app.datadoghq.com/metric/explorer) afin de voir vos métriques!

## Données collectées
### Métriques

L'intégration PHP n'inclut aucune métrique pour le moment.

### Evénements
L'intégration PHP n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration PHP n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)

