---
categories:
  - cloud
  - aws
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_Rekognition."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_rekognition/'
git_integration_title: amazon_rekognition
has_logo: true
integration_title: "Amazon\_Rekognition"
is_public: true
kind: integration
manifest_version: 1
name: amazon_rekognition
public_title: "Intégration Datadog/Amazon\_Rekognition"
short_description: "Surveillez des métriques clés d'Amazon\_Rekognition."
version: 1
---
## Présentation
Amazon Rekognition facilite l'ajout d'une analyse des images et des vidéos à vos applications. Vous fournissez simplement une image ou une vidéo à l'API Rekognition, et le service peut identifier les objets, les personnes, le texte, les scènes et les activités, ainsi que détecter tout contenu inapproprié.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Rekognition.

## Implémentation
### Installation
Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques
1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Rekognition` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/Amazon Rekognition][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_rekognition" >}}


### Événements
L'intégration Amazon Rekognition n'inclut aucun événement.

### Checks de service
L'intégration Amazon Rekognition n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-rekognition
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_rekognition/amazon_rekognition_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/


{{< get-dependencies >}}