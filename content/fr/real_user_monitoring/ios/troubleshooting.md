---
dependencies:
  - https://github.com/DataDog/dd-sdk-ios/blob/master/docs/rum_collection/troubleshooting.md
further_reading:
  - link: https://github.com/DataDog/dd-sdk-ios
    tag: Github
    text: Code source dd-sdk-ios
  - link: /real_user_monitoring
    tag: Documentation
    text: Service Real User Monitoring Datadog
kind: documentation
title: Dépannage
---
## Vérifier si le SDK Datadog est correctement initialisé

Après avoir configuré le SDK Datadog et exécuter l'application pour la première fois, consultez votre console de debugging dans Xcode. Le SDK implémente plusieurs checks de cohérence et affiche des avertissements pertinents en cas de problème de configuration.

## Debugging
Lors de la création de votre application, vous pouvez activer les logs de développement en configurant la valeur `verbosityLevel`. Les messages pertinents provenant du SDK et avec une priorité supérieure ou égale au niveau spécifié s'affichent dans la console de debugging dans Xcode :

```swift
Datadog.verbosityLevel = .debug
```

Si tout fonctionne comme prévu, vous devriez obtenir une sortie similaire à ce qui suit, indiquant qu'un lot de données RUM a bien été importé :
```
[DATADOG SDK] 🐶 → 17:23:09.849 [DEBUG] ⏳ (rum) Uploading batch...
[DATADOG SDK] 🐶 → 17:23:10.972 [DEBUG]    → (rum) accepted, won't be retransmitted: success
```

**Conseil :** il est recommandé d'utiliser le paramètre `Datadog.verbosityLevel` dans la configuration `DEBUG` et de ne pas le définir dans `RELEASE`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]:/fr/real_user_monitoring/ios/advanced_configuration/#initialization-parameters