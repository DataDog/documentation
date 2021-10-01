---
dependencies:
  - 'https://github.com/DataDog/dd-sdk-android/blob/master/docs/troubleshooting_android.md'
further_reading:
  - link: 'https://github.com/DataDog/dd-sdk-android'
    tag: Github
    text: Code source dd-sdk-android
  - link: /real_user_monitoring
    tag: Page d'accueil
    text: Explorer le service RUM de Datadog
kind: documentation
title: Dépannage
---
## Vérifier si le RUM Datadog est initialisé
Utilisez la méthode utilitaire `isInitialized` pour vérifier que le SDK est bien initialisé :

```kotlin
if (Datadog.isInitialized()) {
    // votre code ici
}
```

## Debugging
Lors de la création de votre application, vous pouvez activer les logs de développement en appelant la méthode `setVerbosity`. Tous les messages internes de la bibliothèque dont la priorité est supérieure ou égale au niveau spécifié sont alors enregistrés dans le Logcat Android :

```kotlin
Datadog.setVerbosity(Log.INFO)
```

## Activer le consentement au suivi (conformité au RGPD)

Pour répondre aux exigences du RGPD, le SDK nécessite la valeur de consentement au suivi à son initialisation.
Voici les différentes valeurs possibles pour le consentement au suivi :

- `TrackingConsent.PENDING` (par défaut) : le SDK commence à recueillir les données et à les regrouper par lots, mais ne les envoie pas à
 l'endpoint de collecte de données. Le SDK attend d'obtenir la nouvelle valeur de consentement au suivi pour déterminer ce qu'il doit faire de ces lots de données.
- `TrackingConsent.GRANTED` : le SDK commence à recueillir les données et les envoie au endpoint de collecte de données.
- `TrackingConsent.NOT_GRANTED` : le SDK ne recueille aucune donnée. Vous ne pouvez pas envoyer manuellement des logs, des traces ou
 des événements RUM.

Pour mettre à jour le consentement au suivi une fois le SDK lancé, effectuez l'appel suivant : `Datadog.setTrackingConsent(<NEW CONSENT>)`. Le SDK ajuste son comportement en fonction de la nouvelle valeur de consentement. Imaginons que vous modifiez la valeur de consentement `TrackingConsent.PENDING` :

- Si vous la remplacez par `TrackingConsent.GRANTED` : le SDK envoie tous les lots de données actuels, ainsi que toutes les données ultérieures, directement au endpoint de collecte de données.
- Si vous la remplacez par `TrackingConsent.NOT_GRANTED` : le SDK supprime tous les lots de données et ne recueille plus aucune donnée par la suite.

## Échantillonner des sessions RUM

Pour contrôler les données que votre application envoie au service RUM de Datadog, vous pouvez spécifier un taux d'échantillonnage pour les sessions RUM lors de l'[initialisation du RumMonitor][1]. Ce taux est défini sous forme de pourcentage entre 0 et 100.

```kotlin
val monitor = RumMonitor.Builder()
        // Ici, 75 % des sessions RUM sont envoyées à Datadog
        .sampleRumSessions(75.0f)
        .build()
GlobalRum.registerIfAbsent(monitor)
```

## Envoi de données lorsque l'appareil est hors ligne

La fonction RUM s'assure de recueillir les données même lorsque l'appareil de l'utilisateur est hors ligne. Lorsque la connexion réseau est mauvaise ou que la batterie de l'appareil est trop faible, tous les événements RUM sont d'abord stockés  en local sur l'appareil sous forme groupée. Chaque groupe de logs respecte les spécifications d'admission. Ils sont envoyés dès que le réseau est disponible, et dès que la batterie est suffisamment élevée pour que le SDK Datadog n'affecte pas l'expérience de l'utilisateur final. Si le réseau n'est pas disponible alors que votre application s'exécute au premier plan, ou si l'envoi des données échoue, le groupe de logs est conservé jusqu'à ce qu'il puisse être envoyé.

Cela signifie que même si les utilisateurs ouvrent votre application en étant hors ligne, aucune donnée ne sera perdue.

**Remarque** : les données stockées sont automatiquement supprimées si elles sont trop anciennes pour limiter l'espace utilisé par le SDK.

## Migration vers la version 1.0.0

Si vous utilisiez l'ancien SDK (version `0.1.x` ou `0.2.x`), des changements majeurs ont été apportés dans la version `1.0.0`, notamment :

### Logger.Builder

Avant

```java
logger = new LoggerBuilder()
    .withName("my-application-name") // Auparavant utilisé pour définir le nom du service
    .withNetworkInfoLogging(this)
    .build("my-api-key");
```

After

```java
Datadog.initialize(context, "my-api-key");

// …

logger = new Logger.Builder()
        .setNetworkInfoEnabled(true)
        .setServiceName("android-sample-java") // Définit le nom du service
        .setLoggerName("my_logger") // Définit le nom du logger (au sein du service)
        .setLogcatLogsEnabled(true)
        .build();
```


### Attributs

Dans les anciennes versions, l'ajout ou la suppression d'un attribut se faisait avec les méthodes `Logger.addField()` et `Logger.removeField()`. Ces méthodes ont été renommées par souci de cohérence et s'intitulent désormais `Logger.addAttribute()` et `Logger.removeAttribute()`. Leur comportement reste le même.


## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]:/fr/real_user_monitoring/android/