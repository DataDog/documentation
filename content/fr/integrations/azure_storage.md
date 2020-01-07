---
categories:
  - cloud
  - azure
  - data store
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés de Stockage Azure.
doc_link: 'https://docs.datadoghq.com/integrations/azure_storage/'
git_integration_title: azure_storage
has_logo: true
integration_title: Stockage Microsoft Azure
is_public: true
kind: integration
manifest_version: '1.0'
name: azure_storage
public_title: Intégration Datadog/Stockage Microsoft Azure
short_description: Surveillez des métriques clés de Stockage Azure.
version: '1.0'
---
{{< img src="integrations/azure/storage_dash.png" alt="dashboard stockage"  >}}

## Présentation

Stockage Azure est la solution de stockage dans le cloud pour les applications modernes nécessitant un niveau supérieur de durabilité, de disponibilité et d'évolutivité pour répondre aux besoins de leurs clients. Elle fournit les quatre services suivants : Stockage Blob, Stockage Table, Stockage File d'attente et Stockage Fichier.

Activez cette intégration pour afficher les métriques de capacité et de transaction depuis Stockage Azure dans Datadog (les métriques de capacité sont uniquement disponibles pour Stockage Blob).

## Implémentation
### Installation

1.  Si vous ne l'avez pas déjà fait, configurez l'[intégration principale d'Azure][1].
2.  Pour chaque compte de stockage que vous souhaitez surveiller, créez les tables de surveillance requises et générez le jeton SAS avec l'interface de ligne de commande de configuration de l'intégration Stockage Azure. **Cliquez [ici][2] pour obtenir des instructions ainsi qu'un script afin d'y parvenir.**
3.  Collez le nom du compte de stockage ainsi que le jeton SAS généré depuis l'interface de ligne de commande dans le formulaire du [carré Stockage Azure][3].

    {{< img src="integrations/azure/storage_tile.png" alt="carré stockage" >}}

4.  Une fois que vous avez effectué cette opération pour chaque compte de stockage à surveiller, cliquez sur Update Configuration.

<div class="alert alert-info">
Azure peut prendre jusqu'à une heure pour générer et remplir la table de métriques-minutes d'un compte de stockage. Ce délai se produit lors de l'ajout d'un compte de stockage à surveiller dans Datadog.
</div>

## Données collectées
### Métriques
{{< get-metrics-from-git "azure_storage" >}}


### Événements
L'intégration Stockage Azure n'inclut aucun événement.

### Checks de service
L'intégration Stockage Azure n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/azure
[2]: https://github.com/DataDog/azure-storage-dd
[3]: https://app.datadoghq.com/account/settings#integrations/azure_storage
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/azure_storage/azure_storage_metadata.csv
[5]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}