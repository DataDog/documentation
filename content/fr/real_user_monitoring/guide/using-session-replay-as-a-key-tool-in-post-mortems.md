---
further_reading:
- link: https://www.datadoghq.com/blog/analyze-user-experience-frustration-signals-with-rum/
  tag: blog
  text: Détecter les difficultés des utilisateurs avec Datadog Frustration Signals
- link: https://docs.datadoghq.com/notebooks/
  tag: documentation
  text: Notebooks

title: Utiliser Session Replay comme principal outil pour vos analyses post-mortem
---

## Présentation

Session Replay permet dʼassocier analyse des utilisateurs et reproduction visuelle des erreurs. Ce guide présente un exemple dʼutilisation de Session Replay pour que les développeurs bénéficient dʼun support visuel lors de leurs analyses post-mortem.

## Utiliser le RUM pour identifier l'étendue d'un problème d'utilisateur

Dans cet exemple, nous avons remarqué qu'un grand nombre d'utilisateurs se plaignait d'un problème lorsqu'ils cliquaient sur le bouton **Checkout**. Après avoir examiné les [signaux de frustration du dashboard RUM][1], nous avons pu voir dans le RUM Explorer que ce type dʼerreur est apparu plus de 3 000 fois l'espace d'une semaine :

{{< img src="real_user_monitoring/guide/using-session-replay-in-post-mortems/identify-widespread-user-issue-1.png" alt="Utiliser le RUM pour identifier le nombre dʼapparition dʼun type dʼerreur en une semaine" style="width:100%;">}}

## Observer le problème de l'utilisateur dans une session Session Replay
Après avoir cliqué sur une session depuis la requête ci-dessus, nous pouvons consulter un Session Replay pour voir cette erreur se produire en direct et observer les actions antérieures et ultérieures des utilisateurs :

{{< img src="real_user_monitoring/guide/using-session-replay-in-post-mortems/watch-user-issue.png" alt="Examiner la survenue dʼun problème dʼun utilisateur dans Session Replay" style="width:100%;">}}

## Partager dans un notebook
Afin de garantir que les autres membres de l'équipe qui étudient ce problème puissent voir ce contexte, nous pouvons utiliser le bouton de partage pour partager ce Session Replay spécifique dans un notebook :

{{< img src="real_user_monitoring/guide/using-session-replay-in-post-mortems/share-to-notebook.png" alt="Partager la vidéo dʼun Session Replay en lʼenregistrant dans un notebook post-mortem" style="width:60%;">}}

Lʼenvoi du Session Replay vers un notebook nous permet dʼajouter des commentaires, dʼanalyser d'autres données télémétriques relatives à cet incident et de documenter notre analyse post-mortem.

**Remarque** : Un modèle pour les notebooks post-mortem est disponible [ici][2].

## Documenter l'analyse post-mortem
Après avoir partagé le replay dans un notebook, nous pouvons commencer à documenter l'analyse.

{{< img src="real_user_monitoring/guide/using-session-replay-in-post-mortems/document-the-post-mortem.png" alt="Dans les notebooks, ajoutez du contexte au comportement illustré dans le replay, ajoutez des graphiques pertinents ou taguez des parties prenantes dans un commentaire" style="width:100%;">}}

Nous pouvons ajouter un contexte au comportement dans le replay et ajouter des graphiques pertinents à même de représenter au mieux le problème, comme le nombre total d'utilisateurs affectés.

De plus, en ajoutant un commentaire dans des notebooks, nous pouvons tagger les parties prenantes à même de sʼintéresser au problème. Dans ce cas, nous avons tagué le product manager responsable de cette fonctionnalité afin quʼil puisse confirmer qu'un correctif a été ajouté au carnet de commandes.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/analyze-user-experience-frustration-signals-with-rum/
[2]: https://app.datadoghq.com/notebook/template/7/postmortem-ir-xxxx-outage-name