---
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: En savoir plus sur le RUM Explorer
- link: /logs/log_collection/javascript/
  tag: Documentation
  text: Découvrir comment utiliser le SDK Browser Datadog pour les logs
title: Surveillance Browser avec RUM
---

## Section Overview

Real User Monitoring (RUM) de Datadog permet dʼobtenir des informations détaillées sur les performances frontend de votre application. Surveillez les données réelles des utilisateurs pour optimiser votre expérience Web et proposer les meilleures expériences utilisateur possibles. Mettez en corrélation les tests Synthetic, les métriques de backend, les traces, et les logs en un seul endroit pour identifier et résoudre les problèmes de performance sur l'ensemble de la pile.

Datadog vous aide à comprendre le niveau actuel d’expérience utilisateur, à identifier les points d’amélioration et à mesurer l’impact de chaque modification ou déploiement. Utilisez ces informations pour repérer et résoudre les problèmes front-end imprévus avant qu’ils n’affectent les utilisateurs, afin d’offrir la meilleure expérience possible.

Avec le SDK Browser RUM de Datadog, vous pouvez également :

- Surveiller les consultations de pages et les performances de votre application afin d'étudier les éventuels problèmes
- Bénéficiez d’une visibilité complète de bout en bout sur les ressources et les requêtes (telles que les images, fichiers CSS, éléments JavaScript et polices de caractères).
- Collecter et surveiller automatiquement tous les événements intéressants avec lʼensemble du contexte pertinent, et collecter manuellement les erreurs qui ne sont pas automatiquement suivies.
- Suivre les interactions des utilisateurs au cours de leur utilisation afin d'obtenir des informations sur leur comportement tout en respectant les exigences en matière de confidentialité.
- Mettre en évidence les difficultés des utilisateurs à l'aide de signaux de frustration.
- Identifier la cause d'une erreur au niveau de la ligne de code pour la résoudre.

{{< img src="real_user_monitoring/performance-summary-browser.png" alt="Dashboard de synthèse des performances RUM" style="width:100%;">}}

La responsabilité de la sécurité des données utilisateur est partagée entre Datadog et les développeurs qui utilisent les SDK RUM. En savoir plus sur la [responsabilité partagée][1].

## Prise en main

{{< whatsnext desc="Pour commencer avec le SDK Browser RUM pour navigateur, suivez les étapes pour créer une application RUM en fonction de la façon dont votre application est servie :" >}}
  {{< nextlink href="/real_user_monitoring/browser/setup/client">}}<u>Côté client</u> : Instrumentez chacune de vos applications web basées sur un navigateur, déployez l’application, puis configurez les paramètres d’initialisation que vous souhaitez suivre, et utilisez la configuration avancée pour gérer plus finement les données et le contexte collectés par RUM.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/browser/setup/server">}}<u>Auto-instrumentation</u> : Injectez un script JavaScript du SDK RUM dans les réponses HTML de vos applications web servies via un serveur ou un proxy.{{< /nextlink >}}
{{< /whatsnext >}}

À partir de là, vous pouvez modifier les [données et le contexte][2] que le SDK Browser RUM collecte pour les adapter à vos besoins spécifiques. Apprenez à remplacer les paramètres par défaut dans la section [Configuration avancée][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/data_security/real_user_monitoring/#shared-responsibility
[2]: /fr/real_user_monitoring/browser/data_collected/
[3]: /fr/real_user_monitoring/browser/advanced_configuration/