---
aliases:
- /fr/real_user_monitoring/frustration_signals
- /fr/real_user_monitoring/browser/frustration_signals/
description: Identifiez les points de friction des utilisateurs grâce aux signaux
  de frustration RUM (notamment les clics de rage, les clics morts et les clics d'erreur)
  afin d'améliorer l'expérience utilisateur et de réduire les abandons.
further_reading:
- link: https://www.datadoghq.com/blog/analyze-user-experience-frustration-signals-with-rum/
  tag: Blog
  text: Détecter les difficultés des utilisateurs avec Datadog Frustration Signals
- link: /real_user_monitoring/platform/dashboards/usage#frustration-signals
  tag: Documentation
  text: Dashboard des signaux de frustration
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: En savoir plus sur le RUM Explorer
- link: /session_replay/
  tag: Documentation
  text: En savoir plus sur Session Replay
title: Signaux de frustration
---
## Présentation {#overview}

Les signaux de frustration vous aident à identifier les points de friction les plus importants de votre application en faisant ressortir les moments où les utilisateurs manifestent de la frustration.

RUM collecte trois types de signaux de frustration :

Clics de rage
: Un utilisateur clique sur un élément plus de trois fois dans une fenêtre glissante d'une seconde.

Clics morts
: Un utilisateur clique sur un élément statique qui ne produit aucune action sur la page.

Clics d'erreur
: Un utilisateur clique sur un élément juste avant qu'une erreur JavaScript ne se produise.

En activant les signaux de frustration, Datadog collecte les trois types de signaux par défaut.

## Prérequis {#requirements}

Tout d'abord, vous avez besoin de la version >= 4.14.0 du SDK RUM pour navigateur.

Pour commencer à collecter les signaux de frustration, ajoutez ce qui suit à votre configuration SDK :

{{% collapse-content title="Dernière version" level="h3" expanded=true %}}

```javascript
window.DD_RUM.init({
  trackUserInteractions: true,
})
```

{{% /collapse-content %}}

{{% collapse-content title="Avant la v5.0.0" level="h3" expanded=false %}}

```javascript
window.DD_RUM.init({
  trackUserInteractions: true,
  trackFrustrations: true
})
```

Les signaux de frustration nécessitent des actions. L'activation de `trackFrustrations` active automatiquement `trackUserInteractions`.

{{% /collapse-content %}}

## Utilisation {#usage}

Les signaux de frustration apparaissent sous forme de points de données de haut niveau représentant les sources de frustration des utilisateurs sur la [{{< ui >}}RUM Applications{{< /ui >}} page][1]. Pour afficher une liste des nombres de frustrations dans le [RUM Explorer][2], cliquez sur le bouton {{< ui >}}Options{{< /ui >}} et ajoutez une colonne pour `@session.frustration.count`.

### Liste des applications {#application-list}

Survolez la liste des sessions de navigateur et cliquez sur une session pour observer le comportement de clic frustré d'un utilisateur. Ou cliquez sur {{< ui >}}Frustrated Sessions{{< /ui >}} pour accéder aux sessions avec un signal de frustration.

### Explorez le dashboard des signaux de frustration {#explore-the-frustration-signals-dashboard}

{{< ui >}}Frustration Signals{{< /ui >}}Le dashboard fournit une vue d'ensemble des niveaux de frustration dans votre application, vous montrant des sujets tels que les utilisateurs les plus frustrés et les pages avec le plus grand nombre de signaux de frustration.

Vous pouvez cloner ce tableau de bord et le personnaliser pour répondre à vos besoins. Pour plus d'informations, consultez [Dashboard des signaux de frustration][3].

### Recherchez des signaux de frustration {#search-for-frustration-signals}

Parcourez toutes les données collectées par RUM dans le [RUM Explorer][4] pour faire ressortir les tendances sur les signaux de frustration, analyser les modèles avec un meilleur contexte ou les exporter vers des [dashboards][5] et des [monitors][6].

Entrez une facette dans la requête de recherche pour commencer votre recherche. Les champs de recherche disponibles incluent :

Type de frustration
: Trouvez des actions avec des signaux de frustration. Par exemple, si vous souhaitez identifier des actions comportant un clic de rage, ajoutez `action.frustration.type:rage_click` à la requête de recherche.

Nombre de signaux de frustration
: Trouvez les sessions et les vues où un signal de frustration s'est produit. Par exemple, si vous souhaitez trouver des sessions utilisateur ou des vues avec au moins un signal de frustration, ajoutez `session.frustration.count:>1` ou `view.frustration.count:>1` à la requête de recherche.

#### Sessions {#sessions}

Cliquez sur une session avec une valeur dans la colonne {{< ui >}}Frustration Count{{< /ui >}} pour examiner la frustration utilisateur détectée. Vous pouvez voir le type de signal (`rage click`, `dead click` ou `error click`) et la chronologie des événements, qui montre ce qui s'est produit pendant la session.

#### Vues {#views}

Cliquez sur une vue pour identifier si un utilisateur a été frustré sur une page spécifique avec la tag `frustration detected`.

{{< img src="real_user_monitoring/frustration_signals/frustration_signals_in_performance_tab.png" alt="Actions liées aux signaux de frustration dans le menu déroulant « Événements » du graphique en cascade des performances" style="width:90%;" >}}

Le graphique en cascade des performances affiche les actions contenant des signaux de frustration.

{{< img src="real_user_monitoring/frustration_signals/actions_frustration_signal.png" alt="Signaux de frustration détectés en tant qu'action" style="width:90%;" >}}

#### Actions {#actions}

{{< ui >}}Actions{{< /ui >}}L'onglet affiche le tag `frustration detected` si l'action sélectionnée contient un signal de frustration.

Si plusieurs signaux de frustration se produisent dans une action, ils sont affichés sous {{< ui >}}What Happened{{< /ui >}} dans le panneau d'action.

{{< img src="real_user_monitoring/frustration_signals/actions_panel_multiple_frustration_signals.png" alt="Plusieurs types de signaux de frustration détectés dans l'action sous « Ce qui s'est passé »" style="width:90%;" >}}

#### Erreurs {#errors}

Cliquez sur une erreur dans l'onglet {{< ui >}}Errors{{< /ui >}} pour ouvrir un panneau latéral contenant les détails de l'erreur. Vous pouvez voir si un signal de frustration s'est produit.

{{< img src="real_user_monitoring/frustration_signals/errors_tab.png" alt="Onglet Erreurs dans le panneau latéral Actions" style="width:90%;" >}}

## Regardez les signaux de frustration dans Session Replay {#watch-frustration-signals-in-session-replay}

Dans [Session Replay][7], vous pouvez observer une reproduction vidéo de l'activité réelle de l'utilisateur. Les relectures fournissent une preuve vidéo des actions effectuées par les utilisateurs lorsqu'ils montrent des signes de frustration.

Le parcours utilisateur d'une Session Replay détaille les événements qui se produisent par ordre chronologique. Survolez un événement pour accéder à ce moment précis dans la relecture : par exemple, lorsqu'un clic mort s'est produit.

{{< img src="real_user_monitoring/frustration_signals/session_replay_frustration_signals.png" alt="Les signaux de frustration apparaissent dans un enregistrement de navigateur" style="width:90%;" >}}

 Pour plus d'informations, consultez la [documentation de Session Replay][8].

## Créez des alertes pour les signaux de frustration {#create-alerts-for-frustration-signals}

Vous pouvez créer des monitors et définir des alertes sur les signaux de frustration afin d'avertir vous ou votre équipe en cas de détection de signaux de frustration sur une page importante de votre application.

Par exemple, pour définir une alerte qui vous avertit si des signaux de frustration surviennent sur une page spécifique :

{{< img src="real_user_monitoring/frustration_signals/rum_monitor_frustration_count.png" alt="Créez un monitor RUM qui envoie une alerte en fonction du nombre de signaux de frustration." style="width:90%;" >}}

Pour plus d'informations, consultez la [documentation du monitor RUM][9].

## Dépannage {#troubleshooting}

### Les clics de rage ne sont pas créés lorsqu'un utilisateur appuie sur une touche (comme Supprimer) du clavier {#rage-clicks-are-not-being-created-when-a-user-presses-a-key-like-delete-on-the-keyboard}

Les signaux de frustration sont générés à partir des clics de souris, et non des frappes au clavier.

### Le panneau latéral n'indique pas qu'une session comporte un nombre de signaux de frustration différent de celui de la chronologie des événements {#the-side-panel-does-not-show-that-a-session-has-a-different-number-of-frustration-signals-than-in-the-event-timeline}

Si une session est en cours, elle récupère des informations, ce qui peut entraîner une différence entre le nombre affiché sur les bannières et celui de la chronologie.

<div class="alert alert-danger">
Pour fournir des commentaires ou soumettre une demande de fonctionnalité, contactez <a href="/help/">Datadog Support</a>.
</div>

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/list
[2]: /fr/real_user_monitoring/explorer/
[3]: /fr/real_user_monitoring/platform/dashboards/usage#frustration-signals
[4]: https://app.datadoghq.com/rum/explorer
[5]: /fr/dashboards/
[6]: /fr/monitors/
[7]: https://app.datadoghq.com/rum/replay/sessions/
[8]: /fr/session_replay/
[9]: /fr/monitors/types/real_user_monitoring/
[10]: mailto:success@datadoghq.com