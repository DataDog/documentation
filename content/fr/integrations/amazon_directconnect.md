---
aliases:
  - /fr/integrations/awsdirectconnect/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Amazon Direct Connect.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_directconnect/'
git_integration_title: amazon_directconnect
has_logo: true
integration_title: "Amazon\_Direct\_Connect"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_directconnect
public_title: "Intégration Datadog/Amazon\_Direct\_Connect"
short_description: Surveillez des métriques clés d'Amazon Direct Connect.
version: '1.0'
---
## Présentation

Cette intégration récupère des métriques à partir d'AWS Direct Connect (par exemple, l'état de connexion, les débits binaires d'entrée et de sortie, les débits de paquets d'entrée et de sortie, etc.).

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Configuration

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `DirectConnect` est cochée dans la section concernant la collecte des métriques.

2. Ajoutez ces autorisations à votre [stratégie IAM Datadog][3] afin de recueillir des métriques d'Amazon Direct Connect :

    * `directconnect:DescribeConnections` : utilisé pour énumérer les connexions Direct Connect disponibles.
    * `directconnect:DescribeTags` : utilisé pour recueillir des tags personnalisés appliqués aux connexions Direct Connect.

    Pour en savoir plus sur les stratégies Direct Connect, consultez [la documentation disponible sur le site d'AWS][4].

3. Installez l'[intégration Datadog/AWS Direct Connect][5].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_directconnect" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements
L'intégration AWS Direct Connect n'inclut aucun événement.

### Checks de service
L'intégration AWS Direct Connect n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_directconnect.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_directconnect
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_directconnect/amazon_directconnect_metadata.csv
[7]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}