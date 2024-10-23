---
categories:
- azure
- cloud
- network
dependencies: []
description: Surveillez des métriques clés de réseau virtuel Azure.
doc_link: https://docs.datadoghq.com/integrations/azure_virtual_networks/
draft: false
git_integration_title: azure_virtual_networks
has_logo: true
integration_id: ''
integration_title: Réseau virtuel Microsoft Azure
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: azure_virtual_networks
public_title: Intégration Datadog/Réseau virtuel Microsoft Azure
short_description: Surveillez des métriques clés de réseau virtuel Azure.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Le réseau virtuel Azure (VNet) est le bloc de construction fondamental pour votre réseau privé dans Azure. Le réseau virtuel permet à de nombreux types de ressources Azure, telles que les machines virtuelles (VM) Azure, de communiquer de manière sécurisée entre elles, avec Internet et avec les réseaux locaux. Utilisez Datadog pour surveiller votre espace d'adressage disponible afin d'éviter de manquer d'espace dans les moments critiques.

Recueillez des métriques de réseau virtuel Azure pour :

* Surveiller le nombre d'adresses attribuées et non attribuées pour vos réseaux virtuels
* Surveiller le nombre total de peerings réseau et le nombre de peerings réseau connectés
* Surveiller le nombre d'adresses disponibles et le nombre d'adresses attribuées dans vos sous-réseaux
* Éviter de manquer d'espace d'adressage dans les moments critiques

**Les métriques de cette intégration ne sont pas fournies par Azure Monitor**. Datadog les génère en interrogeant les API de métadonnées Azure et en convertissant les réponses en points de données, afin d'obtenir des séries temporelles. Ces métriques sont fournies dans Datadog sous la forme de métriques standard à partir de l'intégration Azure.

## Formule et utilisation

**Remarque** : l'utilisation de sous-réseaux de passerelle n'est pas prise en charge par Azure, et entraîne le renvoi de la valeur « (-1) » pour l'espace d'adressage disponible et attribué. Tenez compte de cette particularité lorsque vous consultez l'utilisation agrégée de réseaux virtuels comportant des sous-réseaux de passerelle.

### Liste des infrastructures

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Microsoft Azure][1]. Aucune autre procédure d'installation n'est requise.

## Real User Monitoring
### Analyse d'entonnoirs
{{< get-metrics-from-git "azure_virtual_networks" >}}


### Aide
L'intégration Réseau virtuel Azure n'inclut aucun événement.

### Aide
L'intégration Réseau virtuel Azure n'inclut aucun check de service.

## Aide
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://docs.datadoghq.com/fr/integrations/azure/
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_virtual_networks/azure_virtual_networks_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/