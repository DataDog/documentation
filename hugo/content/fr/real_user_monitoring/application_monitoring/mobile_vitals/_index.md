---
aliases:
- /fr/real_user_monitoring/android/mobile_vitals
- /fr/real_user_monitoring/ios/mobile_vitals
- /fr/real_user_monitoring/flutter/mobile_vitals
- /fr/real_user_monitoring/reactnative/mobile_vitals
description: Surveillez les métriques clés de performance mobile, notamment les temps
  de démarrage, les taux de rafraîchissement d'images, l'utilisation des ressources
  et les séries temporelles de performance sur Android, iOS, Flutter et React Native.
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Code source
  text: Code source de dd-sdk-android
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Code source
  text: Code source de dd-sdk-ios
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: Code source
  text: Code source de dd-sdk-flutter
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: Code source
  text: Le code source pour dd-sdk-reactnative
- link: /real_user_monitoring/explorer/events/#performance-timeseries
  tag: Documentation
  text: Explorez le panneau des séries temporelles de performance.
- link: /real_user_monitoring
  tag: Documentation
  text: Explorer le service Datadog RUM
title: Signaux mobiles
---
## Présentation {#overview}

Real User Monitoring propose Mobile Vitals, qui inclut un ensemble de points de données inspirés par des frameworks tels que [Android Vitals][1] et [Apple's MetricKit][2], qui peuvent aider à calculer des informations sur la réactivité, la stabilité et la consommation des ressources de votre application mobile. Les Mobile Vitals sont classés comme médiocres, modérés ou bons.

Vous pouvez consulter les Mobile Vitals de votre application en accédant à {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Performance Summary{{< /ui >}} et en sélectionnant votre application.

{{< img src="real_user_monitoring/android/android-mobile-vitals.png" alt="Mobile Vitals sur l'onglet Résumé des performances." style="width:90%;">}}

Pour accéder au dashboard des performances des applications mobiles RUM, passez à l'onglet {{< ui >}}Performance{{< /ui >}}, puis cliquez sur le lien {{< ui >}}View Dashboard{{< /ui >}}.

{{< img src="real_user_monitoring/android/android-perf-dash-link.png" alt="Accédez au dashboard des performances mobiles depuis l'onglet Performance." style="width:90%;">}}

Comprenez la santé et les performances globales de votre application grâce aux graphiques linéaires affichant des points de données pour différentes versions de l'application. Pour filtrer par version d'application ou voir des sessions et des vues spécifiques, cliquez sur un graphique.

{{< img src="real_user_monitoring/android/android_mobile_vitals_3.png" alt="Les chronologies des événements et Mobile Vitals dans le RUM Explorer" style="width:90%;">}}

Vous pouvez également sélectionner une vue dans le RUM Explorer et observer les plages de référence recommandées qui sont directement corrélées à l'expérience utilisateur de votre application au cours de la session. Cliquez sur une métrique telle que {{< ui >}}Refresh Rate Average{{< /ui >}} et cliquez sur {{< ui >}}Search Views With Poor Performance{{< /ui >}} pour appliquer un filtre dans votre requête de recherche et examiner des vues supplémentaires.

## Télémétrie {#telemetry}

La télémétrie suivante fournit des informations sur les performances de votre application mobile.

{{< tabs >}}
{{% tab "Android" %}}

| Mesure | Description |
| --- | --- |
| Fréquence de rafraîchissement | Pour garantir une expérience utilisateur fluide et [sans saccades][1], votre application doit afficher des images à une fréquence inférieure à 60 Hz. <br /><br /> RUM suit la [fréquence de rafraîchissement de l'affichage du thread principal][2] de l'application en utilisant les attributs de vue `@view.refresh_rate_average` et `@view.refresh_rate_min`.  <br /><br />  **Remarque :** Les taux de rafraîchissement sont normalisés sur une plage de zéro à 60 fps. Par exemple, si votre application s'exécute à 100 fps sur un appareil capable d'afficher 120 fps, Datadog rapporte 50 fps dans {{< ui >}}Mobile Vitals{{< /ui >}}.|
| Rendus lents | Pour garantir une expérience utilisateur fluide et [sans saccades][1], votre application doit afficher les images à une fréquence inférieure à 60 Hz. <br /><br />  RUM suit le [taux de rafraîchissement de l'affichage][2] de l'application en utilisant les attributs de vue `@view.refresh_rate_average` et `@view.refresh_rate_min`. <br /><br />Avec le rendu lent, vous pouvez surveiller quelles vues prennent plus de 16 ms à s'afficher ou présentent un taux de rafraîchissement inférieur à 60 Hz. <br /> **Remarque :** Les taux de rafraîchissement sont normalisés sur une plage de zéro à 60 fps. Par exemple, si votre application s'exécute à 100 fps sur un appareil capable d'afficher 120 fps, Datadog rapporte 50 fps dans {{< ui >}}Mobile Vitals{{< /ui >}}. |
| Images figées | Les images qui prennent plus de 700 ms à s'afficher apparaissent comme bloquées et ne répondent pas dans votre application. Celles-ci sont classées comme [images figées][3]. <br /><br />  RUM suit les événements `long task` avec la durée de toute tâche prenant plus de 100 ms à se terminer. <br /><br />  Avec les images figées, vous pouvez surveiller quelles vues semblent figées (prenant plus de 700 ms à s'afficher) pour vos utilisateurs finaux et éliminer les saccades dans votre application. |
| Application ne répond pas | Lorsque le thread d'interface utilisateur d'une application est bloqué pendant plus de 5 secondes, une erreur `Application Not Responding` ([ANR][4]) se déclenche. Si l'application est au premier plan, le système affiche une boîte de dialogue modale à l'utilisateur, lui permettant de forcer la fermeture de l'application. <br /><br />   RUM suit les occurrences d'ANR et capture l'intégralité de la trace de pile qui bloque le thread principal lorsqu'il rencontre un ANR. |
| Sessions sans plantage par version | Un [plantage d'application][5] est signalé en raison d'une sortie inattendue de l'application, généralement causée par une exception ou un signal non géré. Les sessions utilisateur sans plantage dans votre application correspondent directement à l'expérience et à la satisfaction globale de vos utilisateurs finaux. <br /><br />   RUM suit les rapports de plantage complets et présente les tendances au fil du temps avec [Error Tracking][6]. <br /><br />  Avec les sessions sans plantage, vous pouvez rester au courant des références du secteur et vous assurer que votre application est bien classée sur le Google Play Store. |
| Tics CPU par seconde | Une utilisation élevée du CPU affecte l'[autonomie de la batterie][7] des appareils de vos utilisateurs.  <br /><br />  RUM suit les tics CPU par seconde pour chaque vue et l'utilisation du CPU au cours d'une session. La plage recommandée est de moins de 40 pour être considérée comme bonne, et de moins de 60 pour être considérée comme modérée. <br /><br />  Vous pouvez voir les vues ayant le plus grand nombre de tics CPU en moyenne sur une période sélectionnée sous {{< ui >}}Mobile Vitals{{< /ui >}} dans la page {{< ui >}}Overview{{< /ui >}} de votre application. |
| Utilisation de la mémoire | Une utilisation élevée de la mémoire peut entraîner une [OutOfMemoryError][8], ce qui provoque le plantage de l'application et crée une mauvaise expérience utilisateur. <br /><br />  RUM suit la quantité de mémoire physique utilisée par votre application en octets pour chaque vue, au cours d'une session. La plage recommandée est <200 Mo pour de bonnes performances et <400 Mo pour des performances modérées. <br /><br />  Vous pouvez voir les vues avec la consommation de mémoire la plus élevée en moyenne sur une période sélectionnée sous {{< ui >}}Mobile Vitals{{< /ui >}} dans la page {{< ui >}}Overview{{< /ui >}} de votre application. |

[1]: https://developer.android.com/topic/performance/vitals/render#common-jank
[2]: https://developer.android.com/guide/topics/media/frame-rate
[3]: https://developer.android.com/topic/performance/vitals/frozen
[4]: https://developer.android.com/topic/performance/vitals/anr
[5]: https://developer.android.com/topic/performance/vitals/crash
[6]: /fr/real_user_monitoring/error_tracking/android
[7]: https://developer.android.com/topic/performance/power
[8]: https://developer.android.com/reference/java/lang/OutOfMemoryError

{{% /tab %}}
{{% tab "iOS" %}}

| Mesure | Description |
| --- | --- |
| Taux de rafraîchissement | Pour garantir une expérience utilisateur fluide et sans saccades, votre application doit afficher les images à une fréquence inférieure à 60 Hz. <br /><br /> RUM suit le taux de rafraîchissement de l'affichage du thread principal de l'application à l'aide des attributs de vue `@view.refresh_rate_average` et `@view.refresh_rate_min`.  <br /><br />  **Remarque :** Les taux de rafraîchissement sont normalisés sur une plage de zéro à 60 fps. Par exemple, si votre application s'exécute à 100 fps sur un appareil capable d'afficher 120 fps, Datadog rapporte 50 fps dans {{< ui >}}Mobile Vitals{{< /ui >}}. |
| Rendus lents | Pour garantir une expérience utilisateur fluide et sans saccades, votre application doit afficher les images à une fréquence inférieure à 60 Hz. <br /><br />  RUM suit le taux de rafraîchissement de l'affichage de l'application à l'aide des attributs de vue `@view.refresh_rate_average` et `@view.refresh_rate_min`. <br /><br />Avec le rendu lent, vous pouvez surveiller quelles vues prennent plus de 16 ms à s'afficher ou présentent un taux de rafraîchissement inférieur à 60 Hz. <br /> **Remarque :** Les taux de rafraîchissement sont normalisés sur une plage de zéro à 60 fps. Par exemple, si votre application s'exécute à 100 fps sur un appareil capable d'afficher 120 fps, Datadog rapporte 50 fps dans {{< ui >}}Mobile Vitals{{< /ui >}}. |
| Images figées | Les images qui prennent plus de 700 ms à s'afficher apparaissent comme bloquées et ne répondent pas dans votre application. Celles-ci sont classées comme images figées. <br /><br />  RUM suit les événements `long task` avec la durée de toute tâche prenant plus de 100 ms à se terminer. <br /><br />  Avec les images figées, vous pouvez surveiller quelles vues semblent figées (prenant plus de 700 ms à s'afficher) pour vos utilisateurs finaux et éliminer les saccades dans votre application. |
| Sessions sans plantage par version | Un [plantage de l'application][1] est signalé en raison d'une fermeture inattendue de l'application, généralement causée par une exception ou un signal non géré. Les sessions utilisateur sans plantage dans votre application correspondent directement à l'expérience et à la satisfaction globale de vos utilisateurs finaux. <br /><br />   RUM suit les rapports de plantage complets et présente les tendances au fil du temps avec [Error Tracking][2]. <br /><br />  Grâce aux sessions sans plantage, vous pouvez rester informé des références du secteur et vous assurer que votre application est bien classée sur l'Apple App Store. |
| Taux de blocage | Tel que défini par Apple, le taux de blocage d'une application correspond au « nombre de secondes par heure pendant lesquelles l'application ne répond pas, en ne comptant que les périodes d'absence de réponse supérieures à 250 ms. » Pour calculer le taux de blocage de votre application sur Datadog, activez le [rapport de blocage d'application][4] et suivez la [section dédiée][5].
| Tics CPU par seconde | Une utilisation élevée du processeur affecte l'[autonomie de la batterie][3] des appareils de vos utilisateurs.  <br /><br />  RUM suit les tics CPU par seconde pour chaque vue et l'utilisation du CPU au cours d'une session. La plage recommandée est de moins de 40 pour être considérée comme bonne, et de moins de 60 pour être considérée comme modérée. <br /><br />  Vous pouvez voir les vues ayant le plus grand nombre de tics CPU en moyenne sur une période sélectionnée sous {{< ui >}}Mobile Vitals{{< /ui >}} dans la page {{< ui >}}Overview{{< /ui >}} de votre application. |
| Utilisation de la mémoire | Une utilisation élevée de la mémoire peut entraîner des [terminaisons par le watchdog][6], ce qui nuit à l'expérience utilisateur. <br /><br />  RUM suit la quantité de mémoire physique utilisée par votre application en octets pour chaque vue, au cours d'une session. La plage recommandée est <200 Mo pour de bonnes performances et <400 Mo pour des performances modérées. <br /><br />  Vous pouvez voir les vues avec la consommation de mémoire la plus élevée en moyenne sur une période sélectionnée sous {{< ui >}}Mobile Vitals{{< /ui >}} dans la page {{< ui >}}Overview{{< /ui >}} de votre application. |

[1]: https://developer.apple.com/documentation/xcode/diagnosing-issues-using-crash-reports-and-device-logs
[2]: /fr/real_user_monitoring/ios/crash_reporting/
[3]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[4]: /fr/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#add-app-hang-reporting
[5]: /fr/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#compute-the-hang-rate-of-your-application
[6]: /fr/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#add-watchdog-terminations-reporting

{{% /tab %}}
{{% tab "Flutter" %}}

| Mesure | Description |
| --- | --- |
| Fréquence de rafraîchissement | Pour garantir une expérience utilisateur fluide et [sans saccades][1], votre application doit afficher des images à une fréquence inférieure à 60 Hz. <br /><br /> RUM suit la [fréquence de rafraîchissement de l'affichage du thread principal][2] de l'application en utilisant les attributs de vue `@view.refresh_rate_average` et `@view.refresh_rate_min`.  <br /><br />  **Remarque :** Les taux de rafraîchissement sont normalisés sur une plage de zéro à 60 fps. Par exemple, si votre application s'exécute à 100 fps sur un appareil capable d'afficher 120 fps, Datadog rapporte 50 fps dans {{< ui >}}Mobile Vitals{{< /ui >}}. |
| Rendus lents | Pour garantir une expérience utilisateur fluide et [sans saccades][1], votre application doit afficher les images à une fréquence inférieure à 60 Hz. <br /><br />  RUM suit le [taux de rafraîchissement de l'affichage][2] de l'application en utilisant les attributs de vue `@view.refresh_rate_average` et `@view.refresh_rate_min`. <br /><br />Avec le rendu lent, vous pouvez surveiller quelles vues prennent plus de 16 ms à s'afficher ou présentent un taux de rafraîchissement inférieur à 60 Hz. <br /> **Remarque :** Les taux de rafraîchissement sont normalisés sur une plage de zéro à 60 fps. Par exemple, si votre application s'exécute à 100 fps sur un appareil capable d'afficher 120 fps, Datadog rapporte 50 fps dans {{< ui >}}Mobile Vitals{{< /ui >}}. |
| Images figées | Les images qui prennent plus de 700 ms à s'afficher apparaissent comme bloquées et ne répondent pas dans votre application. Celles-ci sont classées comme [images figées][3]. <br /><br />  RUM suit les événements `long task` avec la durée de toute tâche prenant plus de 100 ms à se terminer. <br /><br />  Avec les images figées, vous pouvez surveiller quelles vues semblent figées (prenant plus de 700 ms à s'afficher) pour vos utilisateurs finaux et éliminer les saccades dans votre application. |
| Application ne répond pas | Sur Android, lorsque le thread d'interface utilisateur d'une application est bloqué pendant plus de 5 secondes, une erreur `Application Not Responding` ([ANR][4]) se déclenche. Si l'application est au premier plan, le système affiche une boîte de dialogue modale à l'utilisateur, lui permettant de forcer la fermeture de l'application. <br /><br />   RUM suit les occurrences d'ANR et capture l'intégralité de la trace de pile qui bloque le thread principal lorsqu'il rencontre un ANR. |
| Sessions sans plantage par version | Un [plantage d'application][5] est signalé en raison d'une sortie inattendue de l'application, généralement causée par une exception ou un signal non géré. Les sessions utilisateur sans plantage dans votre application correspondent directement à l'expérience et à la satisfaction globale de vos utilisateurs finaux. <br /><br />   RUM suit les rapports de plantage complets et présente les tendances au fil du temps avec [Error Tracking][8]. <br /><br />  Avec les sessions sans plantage, vous pouvez rester au courant des références du secteur et vous assurer que votre application est bien classée sur le Google Play Store. |
| Tics CPU par seconde | Une utilisation élevée du processeur affecte l'[autonomie de la batterie][6] des appareils de vos utilisateurs.  <br /><br />  RUM suit les tics CPU par seconde pour chaque vue et l'utilisation du CPU au cours d'une session. La plage recommandée est de moins de 40 pour être considérée comme bonne, et de moins de 60 pour être considérée comme modérée. <br /><br />  Vous pouvez voir les vues ayant le plus grand nombre de tics CPU en moyenne sur une période sélectionnée sous {{< ui >}}Mobile Vitals{{< /ui >}} dans la page {{< ui >}}Overview{{< /ui >}} de votre application. |
| Utilisation de la mémoire | Une utilisation élevée de la mémoire peut entraîner des [plantages par manque de mémoire][7], ce qui nuit à l'expérience utilisateur. <br /><br />  RUM suit la quantité de mémoire physique utilisée par votre application en octets pour chaque vue, au cours d'une session. La plage recommandée est <200 Mo pour de bonnes performances et <400 Mo pour des performances modérées. <br /><br />  Vous pouvez voir les principales vues avec la plus forte consommation de mémoire en moyenne sur une période sélectionnée sous {{< ui >}}Mobile Vitals{{< /ui >}} dans la page {{< ui >}}Overview{{< /ui >}} de votre application. |
| Temps de construction du widget | Il s'agit de la durée nécessaire pour construire le widget sur le thread d'interface utilisateur. Pour garantir des animations fluides, cela ne doit pas dépasser 16 ms pour 60 FPS et 8 ms pour 120 FPS. <br /><br />  Des valeurs élevées ici signifient que vous devez chercher à optimiser vos méthodes de construction pour cette vue. Consultez [Control Build Cost][8] dans la documentation Flutter. |
| Temps de rastérisation | Il s'agit de la durée nécessaire pour rastériser l'image sur le thread de rastérisation. Pour garantir des animations fluides, cela ne doit pas dépasser 16 ms pour 60 FPS et 8 ms pour 120 FPS. <br /><br />  Des valeurs élevées ici peuvent signifier que votre vue est complexe à afficher. Consultez [Identifying Problems in the GPU Graph][12] dans la documentation Flutter. |

[1]: https://docs.flutter.dev/perf/ui-performance
[2]: https://docs.flutter.dev/tools/devtools/performance
[3]: https://developer.android.com/topic/performance/vitals/frozen
[4]: https://developer.android.com/topic/performance/vitals/anr
[5]: https://docs.flutter.dev/reference/crash-reporting
[6]: /fr/real_user_monitoring/error_tracking/flutter
[7]: https://docs.flutter.dev/perf/best-practices#build-and-display-frames-in-16ms
[8]: https://docs.flutter.dev/tools/devtools/memory
[9]: https://docs.flutter.dev/perf/best-practices#control-build-cost
[10]: https://docs.flutter.dev/perf/ui-performance#identifying-problems-in-the-gpu-graph

{{% /tab %}}
{{% tab "React Native" %}}

| Mesure | Description |
| --- | --- |
| Fréquence de rafraîchissement | Pour garantir une expérience utilisateur fluide et [sans saccades][1], votre application doit afficher des images à une fréquence inférieure à 60 Hz. <br /><br /> RUM suit la [fréquence de rafraîchissement de l'affichage du thread principal][2] de l'application en utilisant les attributs de vue `@view.refresh_rate_average` et `@view.refresh_rate_min`.  <br /><br />  **Remarque :** Les taux de rafraîchissement sont normalisés sur une plage de zéro à 60 fps. Par exemple, si votre application s'exécute à 100 fps sur un appareil capable d'afficher 120 fps, Datadog rapporte 50 fps dans {{< ui >}}Mobile Vitals{{< /ui >}}. |
| Fréquence de rafraîchissement JS | Pour garantir une expérience utilisateur fluide et [sans saccades][1], votre application doit rendre les images à une fréquence d'au moins 60 Hz. <br /><br /> RUM suit la [fréquence de rafraîchissement de l'affichage du thread javascript][2] de l'application en utilisant les attributs de vue `@view.js_refresh_rate.average`, `@view.js_refresh_rate.min` et `@view.js_refresh_rate.max`.  <br /><br />  **Remarque :** Les taux de rafraîchissement sont normalisés sur une plage de zéro à 60 fps. Par exemple, si votre application s'exécute à 100 fps sur un appareil capable d'afficher 120 fps, Datadog rapporte 50 fps dans {{< ui >}}Mobile Vitals{{< /ui >}}. |
| Rendus lents | Pour garantir une expérience utilisateur fluide et [sans saccades][1], votre application doit afficher les images à une fréquence inférieure à 60 Hz. <br /><br /> Avec un rendu lent, vous pouvez surveiller quelles vues ont une fréquence d'images moyenne inférieure à 55 fps.  <br /><br />  **Remarque :** Les taux de rafraîchissement sont normalisés sur une plage de zéro à 60 fps. Par exemple, si votre application s'exécute à 100 fps sur un appareil capable d'afficher 120 fps, Datadog rapporte 50 fps dans {{< ui >}}Mobile Vitals{{< /ui >}}. |
| Images figées | Les images qui prennent plus de 700 ms à s'afficher apparaissent comme bloquées et ne répondent pas dans votre application. Celles-ci sont classées comme [images figées][3]. <br /><br />  RUM suit les événements `long task` avec la durée de toute tâche prenant plus de 100 ms à se terminer. <br /><br />  Avec les images figées, vous pouvez surveiller quelles vues semblent figées (prenant plus de 700 ms à s'afficher) pour vos utilisateurs finaux et éliminer les saccades dans votre application. |
| Application ne répond pas | Lorsque le thread UI d'une application est bloqué pendant plus de 5 secondes, une erreur `Application Not Responding` (ANR) se déclenche. Si l'application est au premier plan, le système affiche une boîte de dialogue modale à l'utilisateur, lui permettant de forcer la fermeture de l'application. <br /><br />   RUM suit les occurrences d'ANR et capture l'intégralité de la trace de pile qui bloque le thread principal lorsqu'il rencontre un ANR. |
| Sessions sans crash par version | Un [application crash][4] est signalé en raison d'une fermeture inattendue de l'application, généralement causée par une exception ou un signal non géré. Les sessions utilisateur sans plantage dans votre application correspondent directement à l'expérience et à la satisfaction globale de vos utilisateurs finaux. <br /><br />   RUM suit les rapports de plantage complets et présente les tendances au fil du temps avec [Error Tracking][5]. <br /><br />  Avec les sessions sans plantage, vous pouvez rester au courant des références du secteur et vous assurer que votre application est bien classée sur le Google Play Store. |
| Tics CPU par seconde | Une utilisation élevée du processeur affecte l'[autonomie de la batterie][6] des appareils de vos utilisateurs.  <br /><br />  RUM suit les tics CPU par seconde pour chaque vue et l'utilisation du CPU au cours d'une session. La plage recommandée est de moins de 40 pour être considérée comme bonne, et de moins de 60 pour être considérée comme modérée. <br /><br />  Vous pouvez voir les vues ayant le plus grand nombre de tics CPU en moyenne sur une période sélectionnée sous {{< ui >}}Mobile Vitals{{< /ui >}} dans la page {{< ui >}}Overview{{< /ui >}} de votre application. |
| Utilisation de la mémoire | Une utilisation élevée de la mémoire peut entraîner des [plantages par manque de mémoire][7], ce qui nuit à l'expérience utilisateur. <br /><br />  RUM suit la quantité de mémoire physique utilisée par votre application en octets pour chaque vue, au cours d'une session. La plage recommandée est <200 Mo pour de bonnes performances et <400 Mo pour des performances modérées. <br /><br />  Vous pouvez voir les vues avec la consommation de mémoire la plus élevée en moyenne sur une période sélectionnée sous {{< ui >}}Mobile Vitals{{< /ui >}} dans la page {{< ui >}}Overview{{< /ui >}} de votre application. |

[1]: http://jankfree.org/
[2]: https://reactnative.dev/docs/performance#what-you-need-to-know-about-frames
[3]: https://firebase.google.com/docs/perf-mon/screen-traces?platform=ios#frozen-frames
[4]: https://docs.microsoft.com/en-us/appcenter/sdk/crashes/react-native
[5]: /fr/real_user_monitoring/ios/crash_reporting/
[6]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[7]: https://docs.sentry.io/platforms/apple/guides/ios/configuration/out-of-memory/

{{% /tab %}}
{{% tab "Unity" %}}

| Mesure | Description |
| --- | --- |
| Taux de rafraîchissement | Pour garantir une expérience utilisateur fluide et sans saccades, votre application doit afficher les images à une fréquence inférieure à 60 Hz. <br /><br /> RUM suit le taux de rafraîchissement de l'affichage du thread principal de l'application à l'aide des attributs de vue `@view.refresh_rate_average` et `@view.refresh_rate_min`.  <br /><br />  **Remarque :** Les taux de rafraîchissement sont normalisés sur une plage de zéro à 60 fps. Par exemple, si votre application s'exécute à 100 fps sur un appareil capable d'afficher 120 fps, Datadog rapporte 50 fps dans {{< ui >}}Mobile Vitals{{< /ui >}}. |
| Rendus lents | Pour garantir une expérience utilisateur fluide et sans saccades, votre application doit afficher les images à une fréquence inférieure à 60 Hz. <br /><br />  RUM suit le taux de rafraîchissement de l'affichage de l'application à l'aide des attributs de vue `@view.refresh_rate_average` et `@view.refresh_rate_min`. <br /><br />Avec le rendu lent, vous pouvez surveiller quelles vues prennent plus de 16 ms à s'afficher ou présentent un taux de rafraîchissement inférieur à 60 Hz. <br /> **Remarque :** Les taux de rafraîchissement sont normalisés sur une plage de zéro à 60 fps. Par exemple, si votre application s'exécute à 100 fps sur un appareil capable d'afficher 120 fps, Datadog rapporte 50 fps dans {{< ui >}}Mobile Vitals{{< /ui >}}. |
| Sessions sans plantage par version | Un [plantage de l'application][1] est signalé en raison d'une fermeture inattendue de l'application, généralement causée par une exception ou un signal non géré. Les sessions utilisateur sans plantage dans votre application correspondent directement à l'expérience et à la satisfaction globale de vos utilisateurs finaux. <br /><br />   RUM suit les rapports de plantage complets et présente les tendances au fil du temps avec [Error Tracking][2]. <br /><br />  Avec les sessions sans plantage, vous pouvez rester au courant des références du secteur et vous assurer que votre application est bien classée sur le Google Play Store. |
| Taux de blocage | Tel que défini par Apple, le taux de blocage d'une application correspond au « nombre de secondes par heure pendant lesquelles l'application ne répond pas, en ne comptant que les périodes d'absence de réponse supérieures à 250 ms. » Pour calculer le taux de blocage de votre application sur Datadog, activez {{< ui >}}Track Non-Fatal App Hangs{{< /ui >}} dans les [Paramètres de Datadog][4].
| Tics CPU par seconde | Une utilisation élevée du processeur affecte l'[autonomie de la batterie][3] des appareils de vos utilisateurs.  <br /><br />  RUM suit les tics CPU par seconde pour chaque vue et l'utilisation du CPU au cours d'une session. La plage recommandée est de moins de 40 pour être considérée comme bonne, et de moins de 60 pour être considérée comme modérée. <br /><br />  Vous pouvez voir les vues ayant le plus grand nombre de tics CPU en moyenne sur une période sélectionnée sous {{< ui >}}Mobile Vitals{{< /ui >}} dans la page {{< ui >}}Overview{{< /ui >}} de votre application. |
| Utilisation de la mémoire | Une utilisation élevée de la mémoire peut entraîner des [terminaisons par le watchdog][6], ce qui nuit à l'expérience utilisateur. <br /><br />  RUM suit la quantité de mémoire physique utilisée par votre application en octets pour chaque vue, au cours d'une session. La plage recommandée est <200 Mo pour de bonnes performances et <400 Mo pour des performances modérées. <br /><br />  Vous pouvez voir les vues avec la consommation de mémoire la plus élevée en moyenne sur une période sélectionnée sous {{< ui >}}Mobile Vitals{{< /ui >}} dans la page {{< ui >}}Overview{{< /ui >}} de votre application. |

[1]: https://developer.apple.com/documentation/xcode/diagnosing-issues-using-crash-reports-and-device-logs
[2]: /fr/real_user_monitoring/error_tracking/mobile/unity/
[3]: https://developer.apple.com/documentation/xcode/analyzing-your-app-s-battery-use/
[4]: /fr/real_user_monitoring/application_monitoring/unity/setup
[6]: /fr/real_user_monitoring/error_tracking/mobile/ios/?tab=cocoapods#add-watchdog-terminations-reporting

{{% /tab %}}

{{< /tabs >}}

## Séries temporelles de performance {#performance-timeseries}

{{< callout url="https://www.datadoghq.com/product-preview/rum-timeseries/" btn_hidden="false" header="Rejoignez la Preview !">}}
Les séries temporelles de performance sont en version préliminaire et la collecte est désactivée par défaut. Pour l'activer, rejoignez la version préliminaire. Datadog envoie des instructions de configuration aux clients participants.
{{< /callout >}}

Les séries temporelles de performance sont disponibles sur les SDK iOS et Android.

Les indicateurs mobiles standard rapportent l'utilisation de la mémoire en moyenne sur la durée de vie de la vue. Les séries temporelles de performance capturent l'utilisation de la mémoire et du processeur chaque seconde pendant toute la durée de la session, et affichent les résultats sur un graphique interactif dans les [panneaux latéraux][3] de session, de vue et d'opération.

{{< img src="real_user_monitoring/mobile_vitals/timeseries-panel.png" alt="La section Séries temporelles de performance d'un panneau latéral RUM, affichant un graphique interactif de la mémoire et du processeur sur la durée d'une session." style="width:100%;" >}}

Une fois la collecte activée, les séries temporelles sont capturées pour toutes les sessions.

Deux séries sont collectées :

- **Utilisation du processeur** : le pourcentage de la capacité totale du processeur de l'appareil sur l'ensemble des cœurs consommé par votre application. Ceci diffère des cycles processeur par seconde rapportés pour une vue.
- **Mémoire** : la même valeur que le SDK collecte déjà pour les indicateurs de mémoire des vues. Voir [collecte de la mémoire des vues sur iOS][4] et [sur Android][5].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.android.com/topic/performance/vitals
[2]: https://developer.apple.com/documentation/metrickit
[3]: /fr/real_user_monitoring/explorer/events/#performance-timeseries
[4]: /fr/real_user_monitoring/application_monitoring/ios/data_collected/#view-memory-collection
[5]: /fr/real_user_monitoring/application_monitoring/android/data_collected/#view-memory-collection