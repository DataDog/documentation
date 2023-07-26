---
description: Découvrez des insights à propos de l'intégrité et des performances de
  votre application iOS.
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: GitHub
  text: Code source de dd-sdk-android
- link: https://www.datadoghq.com/blog/monitor-mobile-vitals-datadog/
  tag: Blog
  text: Surveiller les signaux mobiles essentiels dans Datadog
kind: documentation
title: Signaux mobiles essentiels
---

## Présentation

Tout comme Google et [Android Vitals][1], la solution RUM propose un ensemble de signaux mobiles essentiels qui génèrent des insights à propos de la réactivité, la stabilité et la consommation en ressources de votre application mobile. Ces métriques peuvent avoir une valeur faible, correcte ou excellente.

Pour consulter les signaux mobiles essentiels de votre application, accédez à **UX Monitoring > Performance Summary** et sélectionnez votre application.

{{< img src="real_user_monitoring/android/android_performance-summary.png" alt="Signaux mobiles essentiels dans l'onglet Performance Summary" style="width:90%;">}}

Pour accéder au dashboard des performances d'une application mobile RUM, rendez-vous sur la page de synthèse de l'application, faites défiler vers le bas jusqu'à la section Monitor Performance Metrics, puis cliquez sur **Performance Overview**.

{{< img src="real_user_monitoring/android/mobile-performance-dashboard-3.png" alt="Détails des signaux mobiles essentiels dans la section Performance Overview" style="width:90%;">}}

Cette section vous permet de mieux comprendre le niveau de santé global et les performances générales de votre application. Des graphiques linéaires affichent des métriques pour différentes versions de l'application. Pour afficher uniquement les données d'une certaine version de l'application ou consulter des sessions et vues spécifiques, cliquez sur un graphique.

{{< img src="real_user_monitoring/android/android_mobile_vitals_3.png" alt="Durées des événements et signaux mobiles essentiels dans le RUM Explorer" style="width:90%;">}}

Vous pouvez également sélectionner une vue du RUM Explorer et visualiser les plages de référence recommandées qui sont directement liées à l'expérience utilisateur de votre application pour la session en question. Cliquez sur une métrique, par exemple **Refresh Rate Average**, puis sur **Search Views with Poor Performance** pour appliquer un filtre dans votre requête de recherche et étudier d'autres vues dont les performances sont mauvaises.

## Métriques

Les métriques suivantes vous permettent d'obtenir des informations exploitables sur les performances de votre application mobile.

| Mesure                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Slow renders                   | Pour vous assurer que votre application offre une expérience fluide et [sans à-coups][2], celle-ci doit afficher les images à une fréquence inférieure à 60 Hz. <br /><br />La solution RUM surveille la [fréquence d'actualisation de l'affichage][3] de l'application à l'aide des attributs de vue `@view.refresh_rate_average` et `@view.refresh_rate_min`. <br /><br />En cas d'affichage lent, vous pouvez surveiller les vues avec une durée de rendu supérieure à 16 ms ou une fréquence supérieure à 60 Hz. <br />**Remarque** : les fréquences d'actualisation sont normalisées en fonction d'une plage de 0 à 60 ips. Par exemple, si votre application affiche son contenu à 100 ips sur un appareil capable de fournir un rendu de 120 ips, Datadog indique la valeur de 50 ips dans les **signaux mobiles essentiels**. |
| Frozen frames                  | Lorsque des images de votre application mettent plus de 700 ms à s'afficher, elles paraissent bloquées et ne semblent pas réagir aux actions. Elles sont considérées comme des [images figées][5]. <br /><br />La solution RUM surveille les événements `long task` qui durent plus de 100 ms. <br /><br />Cette métrique vous permet de surveiller les vues qui apparaissent figées aux yeux des utilisateurs finaux (avec un temps de rendu supérieur à 700 ms) et d'éliminer les à-coups dans votre application.                                                                                                                                                                                                 |
| Application not responding     | Une erreur `Application Not Responding` ([ANR][6]) se déclenche lorsque le thread de l'interface d'une application est bloqué pendant plus de 5 secondes. Si l'application est active, le système affiche une boîte de dialogue permettant à l'utilisateur de forcer l'arrêt de l'application. <br /><br />La solution RUM surveille les occurrences d'erreurs ANR et enregistre l'intégralité de la stack trace à l'origine du blocage du thread principal en cas d'erreur.                                                                                                                                                                                                                              |
| Crash-free sessions by version | Un [crash d'application][7] est signalé lorsque l'application se ferme de façon inattendue. Les crashs sont généralement provoqués par l'absence de gestion d'une exception ou d'un signal. Les sessions utilisateur sans crash dans votre application offrent une visibilité sur l'expérience et la satisfaction globale de vos utilisateurs finaux. <br /><br />La solution RUM surveille les rapports complets des crashs et indique l'évolution des tendances à l'aide du [suivi des erreurs][8]. <br /><br />En observant les sessions sans crash, vous pouvez vous aligner sur les benchmarks de votre secteur et veiller à ce que votre application soit bien classée dans le Google Play Store.                                                                                                 |
| CPU ticks per second           | Une charge processeur élevée réduit l'[autonomie][8] des appareils de vos utilisateurs.  <br /><br />La solution RUM surveille le nombre de ticks processeur par seconde pour chaque vue et la charge processeur pendant une session. Une charge inférieure à 40 est considérée comme excellente, tandis qu'une charge comprise entre 40 et 60 est seulement correcte. <br /><br />Vous pouvez consulter les vues avec le nombre moyen de ticks processeur le plus élevé pour l'intervalle sélectionné. Ces informations se trouvent dans la section **Mobile Vitals** de la page Overview de votre application.                                                                                                                                                                                                                                                                                                                                                        |
| Memory utilization             | Une erreur [OutOfMemoryError][9] peut survenir en cas d'utilisation élevée de la mémoire. Ces erreurs peuvent provoquer le crash de votre application et nuire fortement à l'expérience utilisateur. <br /><br />La solution RUM surveille le volume de mémoire physique, en octets, utilisée par votre application pour chaque vue tout au long d'une session. Un volume inférieur à 200 Mo est considéré comme excellent, tandis qu'un volume compris entre 200 et 400 Mo est seulement correct. <br /><br />Vous pouvez consulter les vues qui utilisent en moyenne le plus de mémoire sur l'intervalle sélectionné. Ces informations se trouvent dans la section **Mobile Vitals** de la page Overview de votre application.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.android.com/topic/performance/vitals
[2]: https://developer.android.com/topic/performance/vitals/render#common-jank
[3]: https://developer.android.com/guide/topics/media/frame-rate
[4]: https://developer.android.com/topic/performance/vitals/frozen
[5]: https://developer.android.com/topic/performance/vitals/anr
[6]: https://developer.android.com/topic/performance/vitals/crash
[7]: /fr/real_user_monitoring/error_tracking/android
[8]: https://developer.android.com/topic/performance/power
[9]: https://developer.android.com/reference/java/lang/OutOfMemoryError