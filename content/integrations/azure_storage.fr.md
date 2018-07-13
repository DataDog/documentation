---
categories:
- cloud
- azure
- data store
ddtype: crawler
description: Suivre les métriques clés Azure Storage.
doc_link: https://docs.datadoghq.com/integrations/azure_storage/
git_integration_title: azure_storage
has_logo: true
integration_title: Microsoft Azure Storage
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_storage
public_title: Intégration Datadog-Microsoft Azure Storage
short_description: Suivre les métriques clés Azure Storage.
version: '1.0'
---

{{< img src="integrations/azure/storage_dash.png" alt="storage dash" responsive="true" >}}

## Aperçu

Azure Storage est la solution de stockage dans le cloud pour les applications modernes qui comptent sur la durabilité, la disponibilité et l'évolutivité pour répondre aux besoins de leurs clients. Il fournit les quatre services suivants : Blob storage, Table storage, Queue storage, et File storage

Activez cette intégration pour afficher les mesures de capacité et de transaction à partir d'Azure Storage dans Datadog (les mesures de capacité sont uniquement disponibles pour le stockage Blob).

## Implémentation
### Installation

1.  Si vous ne l'avez pas déjà fait, configurez [l'Intégration Microsoft Azure en premier](https://docs.datadoghq.com/integrations/azure/).
2.  Pour chaque compte de stockage que vous souhaitez surveiller, créez les tables de surveillance nécessaires et générez le jeton SAS avec l'interface de ligne de commande de l'intégration d'Azure Storage. **Des instructions et un script pour compléter cette étape peuvent être récupérer [ici](https://github.com/DataDog/azure-storage-dd)**
3.  Collez le nom de compte de stockage et le jeton SAS généré à partir de l'outil CLI dans le formulaire de [Azure Storage Tile](https://app.datadoghq.com/account/settings#integrations/azure_storage)

    {{< img src="integrations/azure/storage_tile.png" alt="storage tile" responsive="true">}}

4.  Une fois que vous avez effectué cette opération pour chaque compte de stockage que vous souhaitez monitorer, cliquez sur Update Configuration.

<div class="alert alert-info">
Azure peut prendre jusqu'à une heure pour générer et peupler la table de métriques-minutes d'un compte de stockage. Ce délai se produit lors de l'ajout d'un compte de stockage à surveiller dans Datadog
</div>

## Données collectées
### Métriques
{{< get-metrics-from-git "azure_storage" >}}


### Evénements
L'intégration Azure Storage n'inclut aucun événement pour le moment.

### Checks de Service
L'intégration Azure Storage n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)
