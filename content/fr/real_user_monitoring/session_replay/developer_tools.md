---
aliases: null
description: Décrit les outils de développement disponibles dans Session Replay
further_reading:
- link: /real_user_monitoring/session_replay
  tag: Documentation
  text: Session Replay
kind: documentation
title: Outils de développement Browser de Session Replay
---

## Présentation

Les outils de développement Browser de Session Replay sont intégrés à la solution et vous permettent de diagnostiquer des problèmes concernant vos applications. Ils ne nécessitent aucune configuration.

## Outils de développement Browser

Pour accéder aux outils de développement Browser, depuis l'onglet **Sessions**, cliquez sur le bouton **Jump to Replay** situé à gauche d'une session. Vous pouvez également cliquer sur une session, puis sur **Replay Session** en haut à droite du [RUM Explorer][1]. 

{{< img src="real_user_monitoring/session_replay/dev_tools/dev-tools-beta.png" alt="Bouton Dev Tools" style="width:80%;">}}

Le bouton **</> Dev Tools** s'affiche à droite du bouton **Share**. Vous pouvez visualiser des données de performance, des logs de la console, des erreurs ainsi que des attributs relatifs à vos replays.

### Performance

L'onglet **Performance** contient les événements (tels que les actions, erreurs, ressources et tâches longues) et les timestamps d'une session sous la forme d'une cascade.

Pour changer le contexte des ressources et types d'événements affichés, sélectionnez et appliquez les filtres **Network**, **Events** et **Timings**. Vous pouvez également faire glisser les curseurs de la cascade pour rallonger l'intervalle.  

{{< img src="real_user_monitoring/session_replay/dev_tools/performance-filters.mp4" alt="Filtres de performance" video="true" style="width:60%;">}}

### Console

L'onglet **Console** contient tous les [logs recueillis à partir du navigateur Web][2] ainsi que les erreurs pour chaque vue.

Pour filtrer vos logs en fonction de la gravité, cliquez sur **Error**, **Warn**, **Info** et **Debug**. Pour rechercher ces logs dans le [Log Explorer][3], cliquez sur **View in Log Explorer**.

{{< img src="real_user_monitoring/session_replay/dev_tools/dev-tools-console.png" alt="Bouton View in Log Explorer de la console" style="width:50%;">}}

Le Log Explorer s'ouvre dans un onglet distinct, avec une requête de recherche préremplie.

### Errors

L'onglet **Errors** contient les [erreurs RUM][4] et les problèmes de [suivi des erreurs][5] liés à la session.

{{< img src="real_user_monitoring/session_replay/dev_tools/dev-tools-errors.png" alt="Onglet Errors" style="width:70%;">}}

### Attributes

L'onglet **Attributes** contient tous les attributs liés à la session. Pour en savoir plus, consultez la section [Attributs par défaut][6].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/explorer/
[2]: /fr/logs/log_collection/javascript/
[3]: /fr/logs/explorer/
[4]: /fr/real_user_monitoring/browser/collecting_browser_errors/
[5]: /fr/real_user_monitoring/error_tracking/
[6]: /fr/real_user_monitoring/browser/data_collected/#default-attributes