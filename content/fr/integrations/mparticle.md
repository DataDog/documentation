---
categories:
  - web
ddtype: crawler
dependencies: []
description: Surveillez les crashs d'applications et recueillez des métriques détaillées sur les performances de runtime.
doc_link: 'https://docs.datadoghq.com/integrations/mparticle/'
git_integration_title: mparticle
has_logo: true
integration_title: mParticle
is_public: true
kind: integration
manifest_version: '1.0'
name: mparticle
public_title: Intégration Datadog/mParticle
short_description: Surveillez les crashs d'applications et recueillez des métriques détaillées sur les performances de runtime.
version: '1.0'
---
## Présentation
Connectez mParticle à Datadog et consultez les informations suivantes en temps réel dans votre dashboard Datadog :

* Rapports d'incidents
* Données de performance réseau tiers
* Informations sur la session active
* Utilisation de la batterie, de la mémoire et du processeur de l'appareil

## Implémentation
### Installation

1. Connectez-vous à votre compte [mParticle][1].
2. Accédez à la page des services en cliquant sur l'icône en forme d'avion en papier dans la barre de navigation à gauche.

3. Cliquez sur le carré Datadog pour afficher le volet des paramètres de l'intégration Datadog.

4. Entrez votre [clé d'API Datadog][2] dans le volet des paramètres et cliquez sur Save.

5. Activez Status de façon à transmettre les données à Datadog.

## Données collectées
### Métriques

L'intégration mParticle n'inclut aucune métrique.

### Événements
L'intégration mParticle n'inclut aucun événement.

### Checks de service
L'intégration mParticle n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://app.mparticle.com/login?return=
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}