---
aliases: null
description: Installer et configurer Mobile Session Replay.
further_reading:
- link: /real_user_monitoring/session_replay/mobile
  tag: Documentation
  text: Session Replay sur mobile
- link: /real_user_monitoring/session_replay/mobile/app_performance
  tag: Documentation
  text: Impact de Mobile Session Replay sur les performances des applications
- link: /real_user_monitoring/session_replay/mobile/privacy_options
  tag: Documentation
  text: Options de confidentialité de Mobile Session Replay
- link: /real_user_monitoring/session_replay/mobile/troubleshooting
  tag: Documentation
  text: Dépanner Mobile Session Replay
- link: /real_user_monitoring/session_replay
  tag: Documentation
  text: Session Replay
title: Installer et configurer Mobile Session Replay
---

## Configuration

{{< tabs >}}
{{% tab "Android" %}}

Toutes les versions du SDK Session Replay sont disponibles dans le [référentiel de snapshots Maven][1].

Pour configurer Mobile Session Replay pour Android :

1. Assurez-vous d'avoir [configuré et initialisé le SDK RUM Android de Datadog][2] en ayant activé l'instrumentation des vues.

2. Déclarer Session Replay de Datadog comme dépendance :
  {{< code-block lang="kotlin" filename="build.gradle" disable_copy="false" collapsible="true" >}}
    implementation("com.datadoghq:dd-sdk-android-rum:[datadog_version]")
    implementation("com.datadoghq:dd-sdk-android-session-replay:[datadog_version]")
    // en cas de besoin d'un soutien matériel
    implementation("com.datadoghq:dd-sdk-android-session-replay-material:[datadog_version]")
   {{< /code-block >}}

3. Activer Session Replay dans votre application :

   {{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    // en cas de besoin d'un soutien dʼextension matérielle
    .addExtensionSupport(MaterialExtensionSupport()) 
    .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

[1]: https://oss.sonatype.org/content/repositories/snapshots/com/datadoghq/dd-sdk-android/
[2]: https://docs.datadoghq.com/fr/real_user_monitoring/android/?tab=kotlin
[3]: https://docs.datadoghq.com/fr/real_user_monitoring/android/?tab=kotlin#declare-the-sdk-as-a-dependency

{{% /tab %}}
{{% tab "iOS" %}}

Pour configurer Mobile Session Replay pour iOS :

1. Assurez-vous d'avoir [configuré et initialisé le SDK RUM iOS de Datadog][1] en ayant activé l'instrumentation des vues.

2. Lier la bibliothèque Session Replay de Datadog à votre projet en vous basant sur votre gestionnaire de paquets :

   | Gestionnaire de paquets            | Étape dʼinstallation                                                                           |
   |----------------------------|---------------------------------------------------------------------------------------------|
   | [CocoaPods][2]             | Ajoutez `pod 'DatadogSessionReplay'` à votre `Podfile`.                                         |
   | [Swift Package Manager][3] | Ajoutez la bibliothèque `DatadogSessionReplay` en tant que dépendance à la cible de votre app.                      |
   | [Carthage][4]              | Ajoutez la bibliothèque `DatadogSessionReplay.xcframework` en tant que dépendance à la cible de votre app.                  |

3. Activer Session Replay dans votre application :

   {{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
   importer DatadogSessionReplay

   SessionReplay.enable(
       with: SessionReplay.Configuration(
           replaySampleRate: sampleRate
       )
   )
   {{< /code-block >}}

[1]: https://docs.datadoghq.com/fr/real_user_monitoring/ios/?tab=swift
[2]: https://cocoapods.org/
[3]: https://www.swift.org/package-manager/
[4]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

## Configuration supplémentaire
### Régler la fréquence d'échantillonnage pour lʼaffichage des sessions enregistrées

Le taux d'échantillonnage est un paramètre obligatoire lors de la configuration de Session Replay. Il doit être compris entre 0.0 et 100.0, où 0 signifie qu'aucun enregistrement ne sera effectué et 100 signifie que toutes les sessions du RUM contiendront des enregistrements.

Ce taux d'échantillonnage est appliqué en plus de celui du RUM. Par exemple, si le RUM utilise un taux d'échantillonnage de 80 % et si Session Replay utilise un taux d'échantillonnage de 20 %, cela signifie que, sur lʼensemble des sessions dʼutilisateurs, 80 % dʼentre elles seront incluses dans le RUM et que, parmi elles, seules 20 % possèderont des enregistrements.

{{< tabs >}}
{{% tab "Android" %}}

{{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
 ...
.build()
{{< /code-block >}}

{{% /tab %}}
{{% tab "iOS" %}}

{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
var sessionReplayConfig = SessionReplay.Configuration(
    replaySampleRate: sampleRate
)
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Valider l'envoi de données de Session Replay

Pour valider ou non lʼenvoi des données de Session Replay par l'application, vous pouvez activer l'option de débogage dans le SDK Datadog :

{{< tabs >}}
{{% tab "Android" %}}

{{< code-block lang="kotlin" filename="Application.kt" disable_copy="false" collapsible="true" >}}
Datadog.setVerbosity(Log.DEBUG)
{{< /code-block >}}

{{% /tab %}}
{{% tab "iOS" %}}

{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
Datadog.verbosityLevel = .debug
{{< /code-block >}}

Si tout se passe correctement, les logs suivants doivent apparaître dans la console de débogage de Xcode environ 30 secondes après le lancement de l'application :

{{< code-block lang="bash" filename="Xcode console" disable_copy="true" >}}

[DATADOG SDK] 🐶 → 10:21:29.812 ⏳ (session-replay) Uploading batch...
[DATADOG SDK] 🐶 → 10:21:30.442    → (session-replay) accepted, won't be retransmitted: [response code: 202 (accepted), request ID: BD445EA-...-8AFCD3F3D16]

{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Options de confidentialité

Consultez la section [options de confidentialité][1].

[1]: /fr/real_user_monitoring/session_replay/mobile/privacy_options

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}