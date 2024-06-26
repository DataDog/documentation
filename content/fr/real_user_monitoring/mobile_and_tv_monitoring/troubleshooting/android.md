---
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: GitHub
  text: Code source dd-sdk-android
- link: /real_user_monitoring
  tag: Documentation
  text: Se familiariser avec Real User Monitoring (RUM)
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

## Envoi de données lorsque l'appareil est hors ligne

La fonction RUM s'assure de recueillir les données même lorsque l'appareil de l'utilisateur est hors ligne. Lorsque la connexion réseau est mauvaise ou que la batterie de l'appareil est trop faible, tous les événements RUM sont d'abord stockés en local sur l'appareil sous forme groupée.

Chaque groupe de logs respecte les spécifications d'admission. Ils sont envoyés dès que le réseau est disponible, et dès que la batterie est suffisamment élevée pour que le SDK Datadog n'affecte pas l'expérience de l'utilisateur final. Si le réseau n'est pas disponible alors que votre application s'exécute au premier plan, ou si l'envoi des données échoue, le groupe de logs est conservé jusqu'à ce qu'il puisse être envoyé.

Ainsi, même si les utilisateurs ouvrent votre application sans être connectés à Internet, aucune donnée n'est perdue. Pour veiller à ce que le SDK n'utilise pas trop d'espace disque, les données sur le disque sont automatiquement supprimées après une certaine durée.

## Migration vers la version 2.0.0

Si vous utilisez la version 1 du SDK, des changements majeurs ont été apportés avec la version `2.0.0`. Consultez le [guide sur la migration][1] pour en savoir plus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/blob/develop/MIGRATION.MD