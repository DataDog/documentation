---
beta: true
dependencies:
- https://github.com/DataDog/dd-sdk-android/blob/master/docs/web_view_tracking.md
description: Surveillez des vues Web dans vos applications Android hybrides.
further_reading:
- link: /real_user_monitoring/android/
  tag: Documentation
  text: Surveillance Android
- link: /real_user_monitoring/browser/
  tag: Documentation
  text: Surveillance Browser
kind: documentation
title: Suivi des vues Web Android
---

## Présentation

Grâce à la solution Real User Monitoring, vous pouvez surveiller des vues Web et bénéficier d'une visibilité complète sur vos applications Android et Android TV hybrides.

Datadog vous permet d'accomplir ce qui suit 

- Surveiller des parcours utilisateur dans les composants Web et natifs de vos applications mobiles
- Identifier les pages Web ou composants natifs à l'origine des problèmes de latence de vos applications mobiles
- Venir en aide aux utilisateurs qui ne parviennent pas à charger des pages Web sur leur appareil mobile

## Configuration

### Prérequis

Commencez par configurer le SDK RUM Browser pour la page Web à afficher sur votre application mobile Android et Android TV. Pour en savoir plus, consultez la section [Surveillance Browser RUM][1].

### Modifier la configuration existante du SDK

1. Téléchargez la [dernière version][2] du SDK RUM Android.
2. Modifiez la configuration existante du SDK Android pour la [surveillance Android RUM][3].
3. L'exemple suivant permet d'ajouter une fonctionnalité de suivi des vues Web :

   ```
            val configuration = Configuration.Builder(
                    rumEnabled = true
                )
               .useSite()
               .trackInteractions()
               .setWebViewTrackingHosts(hosts)
               .trackLongTasks(durationThreshold)
               .useViewTrackingStrategy(strategy)
               .build()
            val credentials = Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>)
            Datadog.initialize(this, credentials, configuration, trackingConsent)
        }
    }
   ```

4. Configurez `DatadogEventBridge` pour les vues Web que vous souhaitez suivre dans votre application mobile Android. Pour cela, utilisez `DatadogEventBridge.setup(webView)` dans le fichier de configuration pendant l'initialisation du SDK RUM Android.

## Accéder à vos vues Web

Vos vues Web s'affichent dans le [RUM Explorer][4], avec les attributs `service` et `source` associés. L'attribut `service` indique le composant Web à partir duquel la vue Web a été générée, tandis que l'attribut `source` fournit la plateforme de l'application mobile, par exemple Android.

Appliquez un filtre basé sur vos applications Android et Android TV, puis cliquez sur une session. Un volet latéral s'ouvre alors. Il contient la liste des événements de la session.

{{< img src="real_user_monitoring/android/android-webview-tracking.png" alt="Événements de vues Web enregistrés lors d'une session dans le RUM Explorer" style="width:100%;">}}

Cliquez sur **Open View waterfall** dans l'onglet **Performance** pour passer d'une session à une visualisation en cascade des ressources.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/real_user_monitoring/browser/#npm
[2]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-android/1.12.0-beta1/aar
[3]: https://docs.datadoghq.com/fr/real_user_monitoring/android/?tab=kotlin#setup
[4]: https://app.datadoghq.com/rum/explorer