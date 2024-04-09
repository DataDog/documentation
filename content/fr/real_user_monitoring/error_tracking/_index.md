---
algolia:
  tags:
  - suivi des erreurs
description: Découvrez comment retrouver et gérer les erreurs recueillies depuis vos
  applications Web et mobiles.
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: GitHub
  text: Analyser les problèmes affectant vos applications avec la solution Error Tracking
    de Datadog
- link: https://www.datadoghq.com/blog/ios-crash-reporting-datadog
  tag: GitHub
  text: Débugger efficacement les plantages sous iOS avec la solution RUM de Datadog
- link: https://www.datadoghq.com/blog/how-datadogs-tech-solutions-team-rum-session-replay/
  tag: GitHub
  text: Comment l'équipe Technical Solutions de Datadog utilise les solutions RUM,
    Session Replay et Error Tracking pour résoudre les problèmes rencontrés par les
    clients
- link: https://www.datadoghq.com/blog/error-tracking-logs/
  tag: Blog
  text: Suivre et trier les erreurs dans vos logs avec la solution Error Tracking
    de Datadog
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: En savoir plus sur l'Error Tracking Explorer
- link: /monitors/types/error_tracking/
  tag: Documentation
  text: Créer un monitor Error Tracking
kind: documentation
title: Error Tracking pour les applications Web et mobiles
---

## Présentation

Afin d'optimiser le fonctionnement de votre système, il est essentiel de surveiller en permanence les erreurs recueillies par Datadog. Lorsque les événements d'erreur sont nombreux et divers, il est difficile de savoir lesquels doivent être traités en priorité. En assurant le suivi, le triage et le debugging des plantages recueillis depuis vos applications Web et mobiles, vous pouvez minimiser l'impact des erreurs critiques sur l'expérience utilisateur.

{{< img src="real_user_monitoring/error_tracking/rum-error-tracking-2.png" alt="Error Tracking Explorer pour RUM affichant les problèmes associés aux rapports de crash dans vos applications Web et mobiles" style="width:100%;" >}}

Après avoir configuré [RUM][2] pour le suivi des erreurs des **applications Web et mobiles**, les problèmes détectés commencent à apparaître sous forme de cartes. Accédez à [**UX Monitoring** > **Error Tracking**][1] pour consulter les problèmes en cours, les problèmes ignorés ou tous les problèmes, les trier par volume ou par ancienneté, et les filtrer en fonction de n'importe quelle facette par défaut ou personnalisée sur vos applications Web et mobiles.

La solution Error Tracking vous permet de :

- Définir des alertes sur des événements Error Tracking afin d'être informé en cas d'erreur critique
- Regrouper les erreurs connexes au sein d'un problème unique afin d'identifier plus facilement les erreurs importantes et de réduire les alertes superflues
- Suivre l'évolution des problèmes au fil du temps pour identifier à quel moment ils sont apparus, s'ils surviennent toujours ainsi que la fréquence à laquelle ils se produisent
- Rassembler tous les éléments de contexte pour un diagnostic simplifié

## Importer des source maps

{{< whatsnext desc="Pour bien débuter avec la solution Datadog Error Tracking pour RUM, consultez les instructions d'importation de source maps pour votre framework:" >}}
    {{< nextlink href="real_user_monitoring/error_tracking/browser" >}}Browser{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/android" >}}Android{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/ios" >}}iOS{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/expo" >}}Expo{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/reactnative" >}}React Native{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/flutter" >}}Flutter{{< /nextlink >}}
{{< /whatsnext >}}

## Examiner des problèmes pour commencer le dépannage ou le debugging

La solution Error Tracking regroupe automatiquement les plantages recueillis depuis vos applications Web et mobiles sous forme de catégories dans l'[Error Tracking Explorer][1]. 

{{< img src="real_user_monitoring/error_tracking/issue-panel-2.png" alt="Error Tracking Explorer pour RUM affichant les problèmes associés aux rapports de crash dans vos applications Web et mobiles" style="width:100%;" >}}

Cliquez sur un problème pour visualiser les informations de debugging telles que la stack trace, les sessions utilisateur et les métadonnées, y compris l'emplacement de l'utilisateur, la version et les attributs personnalisés inclus dans vos rapports de crash. 

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: /fr/real_user_monitoring/