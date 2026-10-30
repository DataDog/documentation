---
aliases:
- /fr/real_user_monitoring/ai_investigations/
description: Utilisez Bits Investigation et Bits Chat depuis RUM pour optimiser les
  performances de votre application, trouver la cause racine des régressions et poser
  des questions sur votre frontend.
further_reading:
- link: /bits_ai/bits_investigation/
  tag: Documentation
  text: Bits Investigation
- link: /bits_ai/bits_chat/
  tag: Documentation
  text: Bits Chat
- link: /real_user_monitoring/operations_monitoring/
  tag: Documentation
  text: Surveillance des opérations
title: Bits dans RUM
---
## Présentation {#overview}

Le Real User Monitoring (RUM) est intégré à [Bits AI][1]. Vous pouvez lancer des [Bits Investigations][2] depuis RUM et utiliser [Bits Chat][3] sur n'importe quelle page RUM. RUM fournit à Bits un contexte spécifique au frontend, tel que les Core Web Vitals, les chronologies de chargement des vues, l'état de santé des opérations et les signaux au niveau de la session. Bits corrèle ce contexte avec le reste de votre télémétrie, y compris les traces APM, les logs, les profils et le code source, pour identifier les causes racines.

Comme ces investigations s'exécutent sur Bits Investigation, chaque investigation que vous lancez depuis RUM est enregistrée dans la [liste des Bits Investigations][4], peut être partagée avec votre équipe, prend en compte vos commentaires passés et peut être envoyée à [Bits Code][5] pour générer un correctif.

Vous pouvez utiliser Bits dans RUM de trois manières :

| Cas d'utilisation | Description | Fonctionnalité de Bits |
|---|---|---|
| [Optimiser les performances][6] | Obtenez des recommandations sur les problèmes potentiels affectant les performances de votre application et lancez une investigation sur l'un d'entre eux. | Bits Investigation |
| [Étudier les régressions et les alertes][7] | Étudiez les anomalies sur vos métriques de performance ou activez des investigations automatiques sur les monitors d'alerte. | Bits Investigation |
| [Poser des questions et effectuer des tâches][8] | Posez des questions sur n'importe quelle page RUM, comme `Why is this view slow?` ou `Which pages have the worst INP?`, et laissez Bits agir en votre nom. | Bits Chat |

## Prérequis {#prerequisites}

- Bits AI doit être activé pour votre organisation.
- Pour lancer une Bits Investigation, vous avez besoin de l'autorisation **Bits Investigations Write**. Pour plus d'informations, consultez [Configurer Bits Investigation][9].
- Pour obtenir des résultats au niveau du code, configurez l'[Intégration du code source][10] avec GitHub.
- Pour permettre à Bits d'attribuer les problèmes frontend aux services backend, [corrélez RUM avec les traces APM][11].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/bits_ai/
[2]: /fr/bits_ai/bits_investigation/
[3]: /fr/bits_ai/bits_chat/
[4]: https://app.datadoghq.com/bits-ai/investigations
[5]: /fr/bits_ai/bits_code/
[6]: /fr/real_user_monitoring/bits_ai/optimize_performance/
[7]: /fr/real_user_monitoring/bits_ai/investigate_regressions/
[8]: /fr/real_user_monitoring/bits_ai/bits_chat/
[9]: /fr/bits_ai/bits_investigation/configure/
[10]: /fr/source_code/
[11]: /fr/real_user_monitoring/correlate_with_other_telemetry/apm/