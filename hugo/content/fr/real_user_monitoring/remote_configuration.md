---
description: Configurez les paramètres du SDK RUM à distance pour les applications
  navigateur, iOS et Android.
further_reading:
- link: /real_user_monitoring/
  tag: Documentation
  text: Real User Monitoring
title: Configuration RUM à distance
---
## Présentation {#overview}

À mesure que votre application évolue, vous devrez peut-être ajuster les données collectées par le SDK RUM et leur fréquence de collecte. La configuration à distance RUM vous permet de mettre à jour les paramètres pris en charge des SDK navigateur, iOS et Android depuis Datadog sans déployer une nouvelle version de votre application.

{{< img src="/real_user_monitoring/remote_configuration/rum_remote_configuration_menu.png" alt="La page de configuration du SDK répertoriant les paramètres RUM navigateur disponibles pour la configuration à distance." >}}

## Prérequis {#prerequisites}

[La configuration à distance][2] doit être activée dans votre organisation et nécessite les versions suivantes du SDK RUM :

- SDK navigateur version 7.13.0+
- SDK iOS version 3.17.0+
- SDK Android version 3.14.1+

<div class="alert alert-danger">Si votre réseau ou proxy utilise une liste d'autorisation, ajoutez <code>*.browser-intake-&lt;DC_REGION&gt;-datadoghq.com</code> pour votre application. Cette entrée couvre à la fois l'ingestion de données RUM et les requêtes de configuration à distance du SDK, qui utilisent le <code>sdk-configuration.</code> sous-domaine. Pour les applications navigateur, ajoutez également ce domaine à votre politique de sécurité du contenu (Content Security Policy).
<br><br> Si ce domaine est bloqué, le SDK ne peut pas récupérer les paramètres distants et continue d'utiliser sa configuration locale à la place, sans erreur visible.</div>

## Fonctionnement {#how-it-works}

Chaque application RUM possède un identifiant de configuration à distance que le SDK utilise pour récupérer ses paramètres distants.

Lorsque le SDK s'initialise, il applique les paramètres distants mis en cache. Si aucun paramètre mis en cache n'est disponible, il utilise les paramètres définis dans votre application. Le SDK recherche les mises à jour en arrière-plan et enregistre les modifications pour la prochaine initialisation. Si le check échoue, le SDK conserve son cache existant ou continue d'utiliser ses paramètres locaux. Le check ne retarde pas l'initialisation du SDK et n'interrompt pas la collecte des événements RUM.

<div class="alert alert-danger">Les paramètres distants publiés remplacent les paramètres correspondants dans votre application. Les paramètres que vous n'activez pas à distance continuent d'utiliser leurs valeurs locales. Activez uniquement les paramètres que vous souhaitez gérer depuis Datadog.</div>

Une configuration distante s'applique à tous les utilisateurs et sessions initialisés avec son ID. Vous ne pouvez pas cibler des utilisateurs ou des sessions individuels. Si vous modifiez l'ID, le SDK le traite comme une nouvelle configuration et n'utilise pas les paramètres mis en cache sous l'ID précédent.

<div class="alert alert-warning">Le SDK récupère les paramètres de configuration distante à partir d'un endpoint de réseau de diffusion de contenu (CDN) public. N'incluez pas de secrets ou d'informations personnelles dans les valeurs de configuration.</div>

## Autorisations {#permissions}

La configuration distante utilise les mêmes autorisations que les applications RUM. Pour activer, modifier ou publier une configuration, vous avez besoin de l'autorisation `RUM Apps Write`. Pour plus d'informations, consultez [Real User Monitoring permissions][1].

## Configuration {#setup}

Pour configurer les paramètres distants d'une application :

1. Installez un SDK RUM pris en charge dans une nouvelle application, ou mettez à jour le SDK dans une application existante.
2. Accédez à {{< ui >}}RUM{{< /ui >}} > {{< ui >}}Manage Applications{{< /ui >}}, sélectionnez une application, puis cliquez sur {{< ui >}}SDK Configuration{{< /ui >}}.
3. Activez la configuration distante pour générer un ID de configuration distante.
   **Remarque** : Datadog enregistre la configuration en tant que brouillon, ses valeurs ne remplacent donc pas vos paramètres SDK existants avant que vous ne la publiiez.
4. Ajoutez l'ID de configuration distante à l'initialisation de votre SDK.

   {{< tabs >}}
   {{% tab "Browser" %}}

   Ajoutez un objet `remoteConfiguration` à votre appel `datadogRum.init()` existant :

   ```javascript
   remoteConfiguration: {
       id: '<REMOTE_CONFIGURATION_ID>',
   },
   ```

   {{% /tab %}}
   {{% tab "iOS" %}}

   Ajoutez `remoteConfiguration` à votre `Datadog.Configuration` :

   ```swift
   remoteConfiguration: .init(id: "<REMOTE_CONFIGURATION_ID>")
   ```

   {{% /tab %}}
   {{% tab "Android" %}}

   Appelez `setRemoteConfigurationId()` sur votre `Configuration.Builder` :

   ```kotlin
   .setRemoteConfigurationId("<REMOTE_CONFIGURATION_ID>")
   ```

   {{% /tab %}}
   {{< /tabs >}}
 
5. Mettez à jour les paramètres comme décrit dans la section [Modifier les paramètres du SDK avec la configuration à distance](#change-sdk-settings-with-remote-configuration).
6. Publiez la configuration pour appliquer ses paramètres activés.

## Modifier les paramètres du SDK avec la configuration à distance {#change-sdk-settings-with-remote-configuration}

La configuration à distance ne remplace aucun paramètre du SDK par défaut. Pour gérer un paramètre à distance, activez explicitement son remplacement dans Datadog, puis configurez sa valeur. Les paramètres sans remplacement activé continuent d'utiliser les valeurs configurées dans le SDK.

1. Activez le remplacement pour un paramètre que vous souhaitez gérer à distance. Choisissez parmi les paramètres listés dans la section [Paramètres configurables](#configurable-settings) pour votre plateforme.

   <div class="alert alert-danger">Certains paramètres nécessitent des importations de modules correspondants dans les SDK iOS et Android. Si votre application n'importe pas ces modules, la configuration à distance ne fonctionne pas pour Session Replay, le traçage distribué ou le profilage.</div>

2. Configurez le paramètre en sélectionnant un état, en modifiant son taux d'échantillonnage ou en ajoutant des données.
3. Enregistrez vos modifications.

## Paramètres configurables {#configurable-settings}

{{< tabs >}}
{{% tab "Browser" %}}

**Taux d'échantillonnage**

| Libellé de l'interface utilisateur | Nom du paramètre |
|----------|----------------|
| Taux d'échantillonnage de Session Replay | `rum.sessionReplaySampleRate` |
| Taux d'échantillonnage des traces | `rum.traceSampleRate` |
| Taux d'échantillonnage du profilage | `profiling.sampleRate` |

**Confidentialité**

| Libellé de l'interface utilisateur | Nom du paramètre |
|----------|----------------|
| Niveau de confidentialité par défaut | `rum.defaultPrivacyLevel` |
| Confidentialité pour les noms d'action | `rum.enablePrivacyForActionName` |

**Suivi des événements**

| Libellé de l'interface utilisateur | Nom du paramètre |
|----------|----------------|
| Suivre les utilisateurs anonymes | `rum.trackAnonymousUser` |
| Suivre les interactions des utilisateurs | `rum.trackUserInteractions` |
| Suivre les ressources | `rum.trackResources` |
| Suivre les tâches longues | `rum.trackLongTasks` |
| Suivre les sessions sur les sous-domaines | `rum.trackSessionAcrossSubdomains` |

**Attributs de l'application**

| Libellé de l'interface utilisateur | Nom du paramètre |
|----------|----------------|
| Attribut de nom d'action | `rum.actionNameAttribute` |
| Injection de contexte de trace | `rum.traceContextInjection` |
| URL de traçage autorisées | `rum.allowedTracingUrls` |
| Origines de suivi autorisées | `rum.allowedTrackingOrigins` |

{{% /tab %}}
{{% tab "iOS" %}}

**Taux d'échantillonnage**

| Libellé de l'interface utilisateur | Nom du paramètre |
|----------|----------------|
| Taux d'échantillonnage de Session Replay | `sessionReplay.sampleRate` |
| Taux d'échantillonnage du profilage continu | `profiling.continuousSampleRate` |
| Taux d'échantillonnage du profilage au lancement de l'application | `profiling.applicationLaunchSampleRate` |
| Taux d'échantillonnage des traces | `trace.sampleRate` |

**Confidentialité**

| Libellé de l'interface utilisateur | Nom du paramètre |
|----------|----------------|
| Confidentialité du texte et des entrées | `sessionReplay.textAndInputPrivacy` |
| Confidentialité des images | `sessionReplay.imagePrivacy` |
| Confidentialité des interactions tactiles | `sessionReplay.touchPrivacy` |

**Suivi des événements**

| Libellé de l'interface utilisateur | Nom du paramètre |
|----------|----------------|
| Suivre les utilisateurs anonymes | `rum.trackAnonymousUser` |
| Suivre les interactions des utilisateurs | `rum.trackUserInteractions` |
| Suivre les ressources | `rum.trackResources` |
| Suivre les événements en arrière-plan | `rum.trackBackgroundEvents` |
| Suivre les signaux de frustration | `rum.trackFrustrations` |
| Suivre les tâches longues | `rum.longTask.enabled` |
| Seuil de tâche longue | `rum.longTask.threshold` |
| Fréquence de mise à jour des indicateurs vitaux | `rum.vitalsUpdateFrequency` |
| Suivre les slow frames | `rum.trackSlowFrames` |
| Suivre les blocages de l'application | `rum.appHang.enabled` |
| Seuil de blocage de l'application | `rum.appHang.threshold` |
| Suivre les arrêts par le Watchdog | `rum.trackWatchdogTerminations` |
| Suivre les avertissements de mémoire | `rum.trackMemoryWarnings` |

**Attributs de l'application**

| Libellé de l'interface utilisateur | Nom du paramètre |
|----------|----------------|
| Injection de contexte de trace | `trace.traceContextInjection` |
| URL de traçage autorisées | `trace.tracedHosts` |

{{% /tab %}}
{{% tab "Android" %}}

**Taux d'échantillonnage**

| Libellé de l'interface utilisateur | Nom du paramètre |
|----------|----------------|
| Taux d'échantillonnage du profilage | `rum.profilingSampleRate` |
| Taux d'échantillonnage de Session Replay | `sessionReplay.sampleRate` |
| Taux d'échantillonnage du profilage continu | `profiling.continuousSampleRate` |
| Taux d'échantillonnage du profilage au lancement de l'application | `profiling.applicationLaunchSampleRate` |
| Taux d'échantillonnage des traces | `trace.sampleRate` |

**Confidentialité**

| Libellé de l'interface utilisateur | Nom du paramètre |
|----------|----------------|
| Confidentialité du texte et des entrées | `sessionReplay.textAndInputPrivacy` |
| Confidentialité des images | `sessionReplay.imagePrivacy` |
| Confidentialité des interactions tactiles | `sessionReplay.touchPrivacy` |

**Suivi des événements**

| Libellé de l'interface utilisateur | Nom du paramètre |
|----------|----------------|
| Suivre les utilisateurs anonymes | `rum.trackAnonymousUser` |
| Suivre les interactions des utilisateurs | `rum.trackUserInteractions` |
| Suivre les événements en arrière-plan | `rum.trackBackgroundEvents` |
| Suivre les signaux de frustration | `rum.trackFrustrations` |
| Suivre les tâches longues | `rum.longTask.enabled` |
| Seuil de tâche longue | `rum.longTask.threshold` |
| Fréquence de mise à jour des indicateurs vitaux | `rum.vitalsUpdateFrequency` |
| Suivre les slow frames | `rum.trackSlowFrames` |
| Rapports de crash | `rum.crashReportsEnabled` |
| Suivre les ANR non fatales | `rum.trackNonFatalAnrs` |

**Attributs de l'application**

| Libellé de l'interface utilisateur | Nom du paramètre |
|----------|----------------|
| Injection de contexte de trace | `trace.traceContextInjection` |
| URL de traçage autorisées | `trace.tracedHosts` |

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/permissions/#real-user-monitoring
[2]: /fr/remote_configuration/