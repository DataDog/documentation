---
description: Les enquêtes agentiques de Datadog apportent une analyse des causes premières
  structurée et de premier niveau directement dans vos flux de travail RUM.
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: En savoir plus sur le RUM Explorer
title: AI Investigations
---
## Aperçu {#overview}

Enquêter sur une mauvaise expérience utilisateur dans RUM consiste généralement à alterner entre les session replays, les error panels, les traces et les performance timelines afin de reconstituer ce qui s'est mal passé. AI Investigations automatisent ce premier triage. L'agent RUM de Datadog inspecte les données attachées à vos vues et met en avant des résultats de causes profondes classés et catégorisés directement dans votre flux de travail RUM.

Cette page répertorie les types d'enquête disponibles.

## Single-View AI Investigation {#single-view-ai-investigation}

Effectuez une enquête agentique sur une seule vue RUM pour examiner les problèmes de performance ou identifier des opportunités d'optimisation sur cette page ou cet écran spécifique. L'agent RUM de Datadog inspecte l'événement de vue et ses sous-événements pour identifier les causes profondes à partir de sources allant de l'application, du backend, des bibliothèques tierces et de l'environnement réseau de l'utilisateur.

{{< img src="real_user_monitoring/ai_investigations/single-view-ai-investigation-overview.png" alt="A Single-View AI Investigation présentant des root-cause findings pour une vue RUM." style="width:100%;" >}}

Pour plus d'informations, voir [Single-View AI Investigation][1].

## Multi-View AI Investigation {#multi-view-ai-investigation}

Effectuez une enquête agentique sur un échantillon de vues partageant un vital de performance lent. Multi-View AI Investigation étend la même analyse agentique à une population de vues, vous aidant à identifier ce qu'il faut corriger lorsque toute paire (vue × vital) est systématiquement lente chez les utilisateurs. Disponible depuis la page d’Optimisation pour Loading Time, Largest Contentful Paint, First Contentful Paint et Interaction to Next Paint.

{{< img src="real_user_monitoring/ai_investigations/multi-view-ai-investigation-recommendations.png" alt="La page d'Optimisation pour un vital de performance, affichant des cartes de recommandations classées avec un bouton Investigate sur chacune." style="width:100%;" >}}

Pour plus d'informations, voir [Multi-View AI Investigation][2].

## Operation AI Investigation {#operation-ai-investigation}

Effectuez une enquête agentique sur une seule opération dans [Operations Monitoring][3]. L'agent analyse à la fois le taux de réussite et la latence de l'opération, mettant en évidence des enquêtes ciblées pour chaque mode de défaillance (erreurs, délais d'attente, abandon) et pour les régressions de latence.

{{< img src="real_user_monitoring/ai_investigations/operation-ai-investigation-recommendations.png" alt="La page des opérations pour une opération, affichant un résumé de santé en langage clair et des cartes de recommandations classées avec des badges de priorité." style="width:100%;" >}}

Pour plus d'informations, voir [Operation AI Investigation][4].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/ai_investigations/single_view_ai_investigation/
[2]: /fr/real_user_monitoring/ai_investigations/multi_view_ai_investigation/
[3]: /fr/real_user_monitoring/operations_monitoring/
[4]: /fr/real_user_monitoring/ai_investigations/operation_ai_investigation/