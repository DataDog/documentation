---
aliases: null
description: Comment résoudre les problèmes liés à Mobile Session Replay.
further_reading:
- link: /real_user_monitoring/session_replay/mobile
  tag: Documentation
  text: Session Replay sur mobile
- link: /real_user_monitoring/session_replay/mobile/setup_and_configuration
  tag: Documentation
  text: Installer et configurer Mobile Session Replay
- link: /real_user_monitoring/session_replay/mobile/app_performance
  tag: Documentation
  text: Impact de Mobile Session Replay sur les performances des applications
- link: /real_user_monitoring/session_replay/mobile/privacy_options
  tag: Documentation
  text: Options de confidentialité de Mobile Session Replay
- link: /real_user_monitoring/session_replay
  tag: Documentation
  text: Session Replay
kind: documentation
title: Dépanner Mobile Session Replay
---
## Session replays
### Certaines parties de l'application sont vides ou non visibles dans le lecteur.

Mobile Session Replay ne prend en charge que les frameworks natifs. Dans ces frameworks, certains composants ou écrans peuvent manquer, comme par exemple :

- les écrans conçus avec SwiftUI (iOS) ou Jetpack Compose (Android)
- les vues du Web
- certains éléments du système, tels que l'actionBar dans Android, les barres de progression et les roues de chargement
- le contenu riche du système, tel que les lecteurs vidéo, de musique et les widgets de plans
- les vues utilisant directement des dessins du canevas
- les styles de texte avancés

### Le rendu de Session Replay ne reflète pas exactement mon application.
L'approche de Mobile Session Replay combine performance et convivialité. Ce résultat nʼest pas obtenu via une recréation au pixel près de votre application, mais plutôt par le biais dʼune approche hybride du visuel : une arborescence de lʼécran peut être enrichie ultérieurement par des images contextuelles et des images dʼagrément.

### Je vois qu'une rediffusion est jointe pour les sessions très courtes, mais je ne peux pas la visualiser.
Lorsque les sessions durent 1 nanoseconde, Datadog n'est pas en mesure de traiter l'enregistrement. En conséquence, aucune rediffusion nʼest jointe.

## Sécurité des données
### Je dois prendre en compte le consentement de l'application mobile lors de la collecte des rediffusions de sessions mobiles.
Avant que les données ne soient importées dans Datadog, elles sont stockées en clair dans le répertoire cache de votre application. Au démarrage du SDK, une valeur doit être définie pour le consentement au suivi avec lʼune des options suivantes :

- Si la valeur est **not granted**, aucune donnée ne sera jamais écrite sur le disque. 
- Si la valeur est **pending**, les données sont écrites dans un dossier temporaire qui ne peut pas être importé dans Datadog. 
- Si la valeur est **granted**, les données sont écrites dans un dossier « upload », qui est traité en arrière-plan pour finir par être importé dans Datadog.

Il est possible de modifier le consentement au suivi à tout moment pendant la durée de vie de l'application host. Lorsque le consentement passe de pending à granted, les données du dossier temporaire sont déplacées vers le dossier « upload ».

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}