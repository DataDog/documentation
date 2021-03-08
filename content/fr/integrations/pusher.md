---
categories:
  - processing
  - messaging
ddtype: crawler
dependencies: []
description: Envoyez des métriques depuis Pusher vers Datadog pour consulter et surveiller l'engagement d'une app.
doc_link: 'https://docs.datadoghq.com/integrations/pusher/'
draft: false
git_integration_title: pusher
has_logo: true
integration_title: Pusher
is_public: true
kind: integration
manifest_version: '1.0'
name: pusher
public_title: Intégration Datadog/Pusher
short_description: Envoyez des métriques depuis Pusher vers Datadog pour consulter et surveiller l'engagement d'une app.
version: '1.0'
---
## Présentation

Surveillez vos données de connexion et vos messages en temps réel sur l'ensemble de vos apps Pusher pour :

- Visualiser les connexions simultanées en temps réel
- Suivre les messages envoyés par type, y compris les messages d'API, d'événements clients, de Webhooks et de diffusion
- Obtenir des données statistiques détaillées concernant la taille du message, notamment la moyenne, la médiane, le maximum et le 95e centile
- Surveiller l'utilisation des ressources en fonction des calendriers de facturation

## Configuration

### Installation

Afin de surveiller vos métriques depuis Pusher :

1. Copiez votre [clé d'API Datadog][1] :

2. Accédez aux paramètres de votre compte Pusher et sélectionnez l'intégration Datadog, ou rendez-vous [ici][2].

3. Collez votre clé d'API Datadog et cliquez sur Save.

4. Si vous revenez sur le dashboard Datadog, vous verrez que les métriques commencer à s'ajouter au dashboard Pusher par défaut.

<div class="alert alert-info">
Les métriques sont ajoutées en temps réel. Par conséquent, les données historiques commencent à s'ajouter lorsque votre intégration est terminée.
</div>

## Données collectées

### Métriques
{{< get-metrics-from-git "pusher" >}}


### Événements

L'intégration Pusher n'inclut aucun événement.

### Checks de service

L'intégration Pusher n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://app.datadoghq.com/account/settings#api
[2]: https://dashboard.pusher.com/accounts/sign_in
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/pusher/pusher_metadata.csv
[4]: https://docs.datadoghq.com/fr/help/