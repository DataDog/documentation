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

{{< img src="real_user_monitoring/error_tracking/rum-et-explorer.png" alt="Les détails dʼun problème dans lʼError Tracking Explorer" style="width:100%;" >}}

{{% error-tracking-description %}}

Les problèmes liés à la solution RUM comprennent les stack trace, les sessions utilisateur et les métadonnées, y compris l'emplacement de l'utilisateur, la version et les attributs personnalisés inclus dans vos rapports de crash.

Découvrez les principales fonctionnalités dʼError Tracking dans la documentation relative à lʼ[Error Tracking Explorer][3]. Pour consulter l'Error Tracking Explorer pour la solution RUM, accédez à [**Digital Experience** > **Error Tracking**][1].

## Configuration

{{< whatsnext desc="Pour bien débuter avec Datadog Error Tracking pour la solution RUM, consultez la documentation à ce sujet :" >}}
    {{< nextlink href="real_user_monitoring/error_tracking/browser" >}}Browser{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/android" >}}Android{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/ios" >}}iOS{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/expo" >}}Expo{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/reactnative" >}}React Native{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/flutter" >}}Flutter{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/roku" >}}Roku{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: /fr/real_user_monitoring/
[3]: /fr/error_tracking/explorer