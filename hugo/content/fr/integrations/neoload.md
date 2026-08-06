---
app_id: neoload
categories:
- notifications
- testing
custom_kind: integration
description: Surveillez et analysez les résultats des tests de performance NeoLoad
integration_version: 1.0.0
media:
- caption: Dashboard des tests de performance NeoLoad
  image_url: images/neoload-dashboard.png
  media_type: image
supported_os:
- linux
- windows
- macos
title: NeoLoad
---
## Section Overview

[Tricentis NeoLoad] (https://www.tricentis.com/products/performance-testing-neoload) simplifie et étend les tests de performance pour les API et les microservices, ainsi que les tests d'applications de bout en bout grâce à des capacités basées sur le protocole et le navigateur.

Grâce à l'intégration NeoLoad, vous pouvez surveiller les métriques de performance liées à vos tests NeoLoad pour :

- Corréler les performances de votre application avec les métriques d'évaluation de la charge système dans NeoLoad
- Analysez et visualisez les paramètres de NeoLoad sur Datadog tels que le débit, les erreurs et les performances à l'aide du tableau de bord prêt à l'emploi ou de [Metrics explorer] (https://docs.datadoghq.com/metrics/explorer).

## Configuration

### Configuration

Pour des instructions détaillées sur la configuration de NeoLoad, suivez la [documentation NeoLoad] (https://documentation.tricentis.com/neoload/latest/en/content/reference_guide/datadog.htm). Depuis la version 9.1 de NeoLoad, vous pouvez choisir les métriques à envoyer dans la configuration **Push Counters** du connecteur Datadog dans NeoLoad.

Installez l'intégration NeoLoad dans Datadog pour ajouter le dashboard NeoLoad par défaut à la liste de vos dashboards.

## Données collectées

### Métriques

| | |
| --- | --- |
| **NeoLoad.Controller.User.Load** <br>(count) | Nombre d'utilisateurs virtuels en cours d'exécution pendant un NeoLoad test<br> _Montré en tant qu'utilisateur_. |
| **NeoLoad.Controller.Throughput** <br>(count) | Débit pendant un NeoLoad test<br> _Affiché en mégaoctets_. |
| **NeoLoad.Request.PerSecond** <br>(rate) | Nombre de requêtes HTTP envoyées par seconde au cours d'un NeoLoad test<br> _Affiché sous forme de requête_. |
| **NeoLoad.Transaction.PerSecond** <br>(taux) | Nombre de transactions effectuées par seconde au cours d'un NeoLoad test<br> _Affiché en tant que transaction_. |
| **NeoLoad.Request.Errors** <br>(count) | Nombre d'erreurs lors d'un NeoLoad test<br> _Affichage de l'erreur_. |

### Événements

Tous les événements de la performance de NeoLoad testsont envoyés à votre [Datadog Events explorer](https://docs.datadoghq.com/events/).
NeoLoad envoie des événements à l'API Datadog lorsqu'une performance test commence et se termine.
Définissez l'option dans la configuration **Push Counters** du connecteur Datadog dans NeoLoad. Disponible depuis NeoLoad 9.1.

## Dépannage

Besoin d'aide ? Contactez [Datadog support](https://docs.datadoghq.com/help/) ou [Tricentis NeoLoad support](https://support-hub.tricentis.com/).