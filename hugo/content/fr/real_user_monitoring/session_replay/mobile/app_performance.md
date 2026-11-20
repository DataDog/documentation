---
aliases: null
description: Analyse comparative des performances pour Mobile Session Replay.
further_reading:
- link: /real_user_monitoring/session_replay/mobile
  tag: Documentation
  text: Session Replay sur mobile
- link: /real_user_monitoring/session_replay/mobile/privacy_options
  tag: Documentation
  text: Options de confidentialité de Mobile Session Replay
- link: /real_user_monitoring/session_replay/mobile/setup_and_configuration
  tag: Documentation
  text: Installer et configurer Mobile Session Replay
- link: /real_user_monitoring/session_replay/mobile/troubleshooting
  tag: Documentation
  text: Dépanner Mobile Session Replay
- link: /real_user_monitoring/session_replay
  tag: Documentation
  text: Session Replay
title: Impact de Mobile Session Replay sur les performances des applications
---

## Présentation
Session Replay exploite les mécanismes existants de mise en lots et de téléchargement intelligent du noyau du SDK Datadog. Ces mécanismes permettent un transfert efficace et optimisé des données de votre application vers les serveurs Datadog. En regroupant plusieurs événements et en les téléchargeant intelligemment à des intervalles appropriés, Session Replay minimise l'impact global sur le réseau et l'utilisation de la bande passante tout en garantissant une utilisation efficace des ressources de réseau.

Le SDK Mobile Session Replay offre une expérience utilisateur transparente sans affecter les performances de votre application.

## Thread principal
Le système responsable de la capture de l'écran actuel de votre application s'exécute dans le thread de lʼIU, ce qui peut potentiellement retarder les mises à jour de l'interface utilisateur. Cependant, Datadog utilise des processus hautement optimisés pour minimiser la charge de travail du SDK dans le thread de lʼIU.

Les écrans sont capturés dans un intervalle situé entre 64 ms et 100 ms (en fonction de la plateforme) et la capture d'un seul écran prend 3 ms. Lʼensemble du traitement des données collectées sont traitées en arrière-plan, sans affecter les performances de votre application.

## Network
Pour minimiser le volume total de téléchargement, Datadog utilise un format de thread très optimisé. Par conséquent, vous pouvez vous attendre à une utilisation moyenne de la bande passante d'environ 12 Ko/s pour les données envoyées aux serveurs Datadog sur iOS, et de 1,22 Ko/s sur Android. Lorsque l'enregistrement d'images est activé, les applications dont le contenu est riche en images peuvent présenter un volume initial légèrement plus élevé. Lorsque l'appareil est déconnecté du réseau, les données sont mises en mémoire tampon sur le disque de l'appareil jusqu'à ce qu'une connexion à haut débit soit rétablie.

## Taille de l'application
Le SDK Datadog respecte des normes strictes et vise à minimiser l'inclusion de dépendances tierces. Cette approche garantit que le SDK exploite autant que possible le code du cadre natif. Sur Android, la taille du binaire produit par le code de Datadog dans le paquet AAR est de 480 ko. Obtenez plus d'informations sur l'impact de la taille de l'application [ici][1]. Sur iOS, la taille du fichier exporté `*.ipa` sera supérieure d'environ 200 ko.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/blob/develop/docs/sdk_performance.md?plain=1#L119