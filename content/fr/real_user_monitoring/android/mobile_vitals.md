---
dependencies:
- https://github.com/DataDog/dd-sdk-android/blob/master/docs/rum_mobile_vitals.md
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Github
  text: Code source dd-sdk-android
- link: https://www.datadoghq.com/blog/monitor-mobile-vitals-datadog/
  tag: Blog
  text: Surveiller les statistiques mobiles essentielles dans Datadog
kind: documentation
title: Statistiques mobiles essentielles
---
## Présentation

Tout comme Google et [Android Vitals][1], la solution RUM propose un ensemble de métriques Mobile Vitals qui génèrent des insights à propos de la réactivité, la stabilité et la consommation en ressources de votre application mobile.

{{< img src="real_user_monitoring/android/mobile_vitals.png" alt="Métriques Mobile Vitals dans le RUM Explorer" style="width:70%;">}}

Les métriques Mobile Vitals s'affichent dans l'onglet **Overview** de votre application, mais également dans le volet latéral sous **Performance** > **Event Timings and Mobile Vitals** lorsque vous cliquez sur une vue spécifique dans le [RUM Explorer][2]. Cliquez sur un graphique dans la section **Mobile Vitals** pour filtrer les données à partir d'une version ou étudier des sessions filtrées.

{{< img src="real_user_monitoring/android/refresh_rate_and_mobile_vitals.png" alt="Vue Event Timings and Mobile Vitals" style="width:70%;">}}

Les métriques Mobile Vitals comprennent des plages de référence conseillées qui sont directement liées à l'expérience utilisateur de votre application. Vous pouvez visualiser le score d'une métrique par rapport à la plage correspondante et cliquer sur **Search Views With Poor Performance** pour appliquer à votre requête de recherche un filtre basé sur les vues les moins performantes;

## Métriques

Les métriques suivantes vous permettent d'obtenir des informations exploitables sur les performances de votre application mobile.

| Mesure                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|--------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Slow renders                   | Pour vous assurer que votre application offre une expérience fluide et [sans à-coups][3], celle-ci doit afficher les images à une fréquence inférieure à 60 Hz. <br /><br />La solution RUM surveille la [fréquence d'actualisation de l'affichage][4] de l'application à l'aide des attributs de vue `@view.refresh_rate_average` et `@view.refresh_rate_min`. <br /><br />En cas d'affichage lent, vous pouvez surveiller les vues avec une durée de rendu supérieure à 16 ms ou une fréquence supérieure à 60 Hz. <br />**Remarque :** les fréquences d'actualisation sont normalisées en fonction d'une plage de 0 à 60 ips. Par exemple, si votre application affiche son contenu à 100 ips sur un appareil capable de fournir un rendu de 120 ips, Datadog indique la valeur de 50 fps dans les métriques Mobile Vitals. |
| Frozen frames                  | Lorsque des images de votre application mettent plus de 700 ms à s'afficher, elles paraissent bloquées et ne semblent pas réagir aux actions. Elles sont considérées comme des [images figées][5]. <br /><br />La solution RUM surveille les événements `long task` qui durent plus de 100 ms. <br /><br />Cette métrique vous permet de surveiller les vues qui apparaissent figées aux yeux des utilisateurs finaux (avec un temps de rendu supérieur à 700 ms) et d'éliminer les à-coups dans votre application.                                                                                                                                                                                                 |
| Application not responding     | Une erreur `Application Not Responding` ([ANR][6]) se déclenche lorsque le thread de l'interface d'une application est bloqué pendant plus de 5 secondes. Si l'application est active, le système affiche une boîte de dialogue permettant à l'utilisateur de forcer l'arrêt de l'application. <br /><br />La solution RUM surveille les occurrences d'erreurs ANR et enregistre l'intégralité de la stack trace à l'origine du blocage du thread principal en cas d'erreur.                                                                                                                                                                                                                              |
| Crash-free sessions by version | Un [crash d'application][7] est signalé lorsque l'application se ferme de façon inattendue. Les crashs sont généralement provoqués par l'absence de gestion d'une exception ou d'un signal. Les sessions utilisateur sans crash dans votre application offrent une visibilité sur l'expérience et la satisfaction globale de vos utilisateurs finaux. <br /><br />La solution RUM surveille les rapports complets des crashs et indique l'évolution des tendances à l'aide du [suivi des erreurs][8]. <br /><br />En observant les sessions sans crash, vous pouvez vous aligner sur les benchmarks de votre secteur et veiller à ce que votre application soit bien classée dans le Google Play Store.                                                                                                 |
| CPU ticks per second           | Une charge processeur élevée réduit l'[autonomie][9] des appareils de vos utilisateurs.  <br /><br />La solution RUM surveille le nombre de ticks processeur par seconde pour chaque vue et la charge processeur pendant une session. Une charge inférieure à 40 est considérée comme excellente, tandis qu'une charge comprise entre 40 et 60 est seulement correcte.                                                                                                                                                                                                                                                                                                                                                         |
| Memory utilization             | Une erreur [OutOfMemoryError][10] peut survenir en cas d'utilisation élevée de la mémoire. Ces erreurs peuvent provoquer le crash de votre application et nuire fortement à l'expérience utilisateur. <br /><br />La solution RUM surveille le volume de mémoire physique, en octets, utilisée par votre application pour chaque vue tout au long d'une session. Un volume inférieur à 40 Mo est considéré comme excellent, tandis qu'un volume compris entre 200 et 400 Mo est seulement correct.                                                                                                                                                                                                                                                                                          |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.android.com/topic/performance/vitals
[2]: https://app.datadoghq.com/rum/explorer
[3]: https://developer.android.com/topic/performance/vitals/render#common-jank
[4]: https://developer.android.com/guide/topics/media/frame-rate
[5]: https://developer.android.com/topic/performance/vitals/frozen
[6]: https://developer.android.com/topic/performance/vitals/anr
[7]: https://developer.android.com/topic/performance/vitals/crash
[8]: https://docs.datadoghq.com/fr/real_user_monitoring/error_tracking/android
[9]: https://developer.android.com/topic/performance/power
[10]: https://developer.android.com/reference/java/lang/OutOfMemoryError