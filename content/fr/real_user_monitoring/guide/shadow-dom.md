---
description: Guide sur la compatibilité de Shadow DOM avec Session Replay.
further_reading:
- link: /real_user_monitoring/session_replay/browser/
  tag: Documentation
  text: En savoir plus sur Session Replay

title: Enrichissez les rediffusions de vos sessions avec les composants du Shadow DOM
---

<div class="alert alert-warning">
Datadog ne prend en charge que le Shadow DOM en mode open.
</div>

## Présentation

Le Shadow DOM aide les développeurs à créer des sites web plus modernes en leur permettant d'incorporer des composants isolés et réutilisables dans leur code. Souvent utilisé pour conserver une structure de code propre et éviter les conflits de style, le Shadow DOM est devenu de plus en plus utilisé dans les pratiques modernes de développement web. 

## Implémentation

À partir de la version `v4.31.0` du [SDK Browser RUM][1], Datadog prend en charge le Shadow DOM en mode ouvert sans nécessiter de configuration supplémentaire. Les composants situés à l'intérieur d'une shadowroot sont automatiquement capturés par Session Replay. Cette fonctionnalité n'est pas prise en charge pour les éléments suivants :
* Shadow DOM en mode closed
* Shadow DOM en mode dynamique
* Modification du style CSS dynamique

**Remarque** : la compatibilité du Shadow Dom en mode ouvert a été testée sur les frameworks les plus répandus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser/