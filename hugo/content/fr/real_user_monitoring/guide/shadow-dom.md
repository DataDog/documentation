---
description: Guide sur la compatibilité de Shadow DOM avec Session Replay.
further_reading:
- link: /session_replay/
  tag: Documentation
  text: En savoir plus sur Session Replay
title: Enrichissez les rediffusions de vos sessions avec les composants du Shadow DOM
---
<div class="alert alert-danger">
Datadog prend uniquement en charge le Shadow DOM ouvert.
</div>

## Présentation {#overview}

Le Shadow DOM aide les développeurs à créer des sites web plus modernes en leur permettant d'intégrer des composants isolés et réutilisables dans leur code. Souvent utilisé afin de conserver une structure de code propre et d'éviter les conflits de styles, l'utilisation du Shadow DOM est devenue plus répandue dans les pratiques de développement web modernes. 

## Configuration {#setup}

À partir de la `v4.31.0` du [RUM Browser SDK][1], Datadog prend en charge le Shadow DOM ouvert sans nécessiter de configuration supplémentaire. Les composants situés à l'intérieur d'une shadow root sont automatiquement capturés par Session Replay. Cette fonctionnalité n'est pas prise en charge pour les éléments suivants :
* Shadow DOM fermé
* Shadow DOM dynamique
* Modification du style CSS dynamique

**Remarque** : La compatibilité avec le Shadow DOM ouvert a été testée sur des frameworks populaires.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/application_monitoring/browser/