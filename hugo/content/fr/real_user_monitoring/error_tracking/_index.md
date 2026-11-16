---
algolia:
  tags:
  - error tracking
description: Apprenez à rechercher et à gérer les erreurs collectées depuis vos applications
  web et mobiles.
further_reading:
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: Blog
  text: Analyser les problèmes affectant vos applications avec Datadog Error Tracking
- link: https://www.datadoghq.com/blog/ios-crash-reporting-datadog
  tag: Blog
  text: Déboguez efficacement les plantages iOS avec Datadog RUM
- link: https://www.datadoghq.com/blog/how-datadogs-tech-solutions-team-rum-session-replay/
  tag: Blog
  text: Comment l'équipe Technical Solutions de Datadog utilise les solutions RUM,
    Session Replay et Error Tracking pour résoudre les problèmes rencontrés par les
    clients
- link: https://www.datadoghq.com/blog/error-tracking-logs/
  tag: Blog
  text: Suivez et triez les erreurs dans vos logs avec Datadog Error Tracking
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: En savoir plus sur l'Error Tracking Explorer
- link: /monitors/types/error_tracking/
  tag: Documentation
  text: Créer un monitor Error Tracking
title: Error Tracking pour les applications web et mobiles
---
## Présentation {#overview}

{{< img src="real_user_monitoring/error_tracking/rum-error-tracking-explorer-1.png" alt="Les détails d'un problème dans l'Error Tracking Explorer" style="width:100%;" >}}

{{% error-tracking-description %}}

Les Issues issues des erreurs RUM incluent la stack trace, les chronologies des sessions utilisateur et les métadonnées, notamment la localisation de l'utilisateur, la version et tout attribut personnalisé inclus dans vos rapports de plantage.

Faites le tour des fonctionnalités clés d'Error Tracking dans la documentation de l'[Error Tracking Explorer][3]. Pour afficher l'Error Tracking Explorer pour RUM, accédez à [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Error Tracking{{< /ui >}}][1].

## Configuration {#setup}

{{< whatsnext desc="Pour commencer avec Datadog Error Tracking pour RUM, consultez la documentation correspondante :" >}}
    {{< nextlink href="real_user_monitoring/error_tracking/browser" >}}Browser{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/application_monitoring/electron/error_tracking" >}}Electron{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/android" >}}Android{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/ios" >}}iOS{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/expo" >}}Expo{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/reactnative" >}}React Native{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/flutter" >}}Flutter{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/roku" >}}Roku{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/kotlin_multiplatform" >}}Kotlin Multiplatform{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/error_tracking/maui" >}}.NET MAUI{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: /fr/real_user_monitoring/
[3]: /fr/error_tracking/explorer