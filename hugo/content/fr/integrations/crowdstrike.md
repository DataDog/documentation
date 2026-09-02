---
categories:
- cloud
- log collection
- log collection
- network
- security
dependencies: []
description: CrowdStrike
doc_link: https://docs.datadoghq.com/integrations/crowdstrike/
draft: false
git_integration_title: crowdstrike
has_logo: true
integration_id: ''
integration_title: CrowdStrike
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: crowdstrike
public_title: CrowdStrike
short_description: Recueillez en temps réel des événements de détection CrowdStrike
  sous la forme de logs Datadog.
team: web-integrations
version: '1.0'
---

## Présentation

Installez l'intégration CrowdStrike pour ingérer des événements suivants :

* Synthèse de détection
* Authentification
* Mises à jour des statuts de détection
* Indicateurs de compromission (IoC) importés
* Confinement réseau
* Mise sur liste blanche d'adresses IP
* Gestion des stratégies
* Activités de la boutique CrowdStrike
* Début/fin des sessions d'intervention en temps réel
* Début/fin des flux d'événements

## Configuration

### Installation

Aucune installation n'est requise.

### Configuration

#### Activer la transmission d'événements

Avant de pouvoir associer les flux d'événements, vous devez [contacter l'équipe d'assistance CrowdStrike][1] afin d'activer les API de transmission pour votre compte client.

#### Associer votre compte CrowdStrike

Une fois la transmission activée, ajoutez un nouveau client API :

* Connectez-vous à la console Falcon.
* Accédez à [Support > API Clients and Keys][2].
* Cliquez sur Add new API client.
* Saisissez un nom de client explicite qui identifie votre client API dans Falcon et dans les logs des actions de l'API (par exemple, « Datadog »).
* Vous pouvez également saisir une description, comme l'utilisation prévue de votre client API.
* Sélectionnez l'accès Read pour tous les contextes d'API.
* Cliquez sur Add.
* Revenez sur le site Datadog et cliquez sur Connect a CrowdStrike Account.
* Copiez l'ID client et le secret client de l'API.
* Vous pouvez également saisir une liste de tags séparés par des virgules.

#### Résultats

Patientez cinq minutes le temps que les [logs][3] soient transmis depuis la source `crowdstrike`.

## Données collectées

### Logs

Les événements CrowdStrike Falcon s'affichent sous la forme de logs depuis la source `crowdstrike`.

### Métriques

L'intégration CrowdStrike n'inclut aucune métrique.

### Checks de service

L'intégration CrowdStrike n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://supportportal.crowdstrike.com/
[2]: https://falcon.crowdstrike.com/support/api-clients-and-keys
[3]: /fr/logs/
[4]: https://docs.datadoghq.com/fr/help/