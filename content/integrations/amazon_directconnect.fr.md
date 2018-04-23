---
aliases:
  - /fr/integrations/awsdirectconnect/
categories:
  - cloud
  - direct connect
  - aws
  - log collection
ddtype: crawler
description: Suivre les métriques clés Amazon Direct Connect.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_directconnect/'
git_integration_title: amazon_directconnect
has_logo: true
integration_title: AWS Direct Connect
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_directconnect
public_title: Intégration Datadog-AWS Direct Connect
short_description: Suivre les métriques clés Amazon Direct Connect.
version: '1.0'
---
## Aperçu

Cette intégration récupère des métriques à partir d'AWS Direct Connect (par exemple, état de connexion, entrée et sortie de débit binaire, entrée et sortie de débit de paquets, etc.).

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. Dans la [vignette d'intégration AWS] (https://app.datadoghq.com/account/settings#integrations/amazon_web_services), assurez-vous que `DirectConnect` est coché dans la partie "metric collection".

2. Ajoutez ces permissions votre politique [IAM Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) afin de collecter les métriques Amazon Direct Connect.

    * `directconnect:DescribeConnections` : Obtenir les connexions Direct Connect disponible.
    * `directconnect:DescribeTags` : Obtenir les tags personnalisés appliqués aux connexions Direct Connect.

    Pour plus d'information sur les polices Direct Conect, consultez [la documentation AWS dédiée](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_directconnect.html).

3. Installez l'intégration [Datadog - AWS Direct Connect] (https://app.datadoghq.com/account/settings#integrations/amazon_directconnect).

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_directconnect" >}}


Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

### Evénements
L'intégration AWS Direct Connect n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration AWS Direct Connect n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)