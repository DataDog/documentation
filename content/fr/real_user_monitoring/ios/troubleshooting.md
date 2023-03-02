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

## Utiliser `DDURLSessionDelegate` avec votre propre délégué de session

Si vous souhaitez [surveiller automatiquement les requêtes réseau][1] avec `DDURLSessionDelegate`, mais que votre application utilise déjà son propre délégué de session, vous pouvez utiliser les patterns d'_héritage_ ou de _composition_ et transmettre les appels à `DDURLSessionDelegate`.

Pour les patterns d'_héritage_, utilisez `DDURLSessionDelegate` comme classe de base pour votre délégué personnalisé et assurez-vous d'appeler l'implémentation `super` depuis vos méthodes remplacées. Exemple :
```swift
class YourCustomDelegateURLSessionDelegate: DDURLSessionDelegate {
    override func urlSession(_ session: URLSession, task: URLSessionTask, didCompleteWithError error: Error?) {
        super.urlSession(session, task: task, didCompleteWithError: error) // transmettre au délégué Datadog
        /* votre logique personnalisée */
    }
}
```

Pour les patterns _composition_, servez-vous du protocole `__URLSessionDelegateProviding` pour conserver une instance interne de `DDURLSessionDelegate` et transmettre les appels à `ddURLSessionDelegate`. Exemple :
```swift
private class YourCustomDelegateURLSessionDelegate: NSObject, URLSessionTaskDelegate, URLSessionDataDelegate, __URLSessionDelegateProviding {
    // MARK: - __URLSessionDelegateProviding conformance

    let ddURLSessionDelegate = DDURLSessionDelegate()

    // MARK: - __URLSessionDelegateProviding handling

    func urlSession(_ session: URLSession, task: URLSessionTask, didFinishCollecting metrics: URLSessionTaskMetrics) {
        ddURLSessionDelegate.urlSession(session, task: task, didFinishCollecting: metrics) // transmettre au délégué Datadog
        /* votre logique personnalisée */
    }

    func urlSession(_ session: URLSession, task: URLSessionTask, didCompleteWithError error: Error?) {
        ddURLSessionDelegate.urlSession(session, task: task, didCompleteWithError: error) // transmettre au délégué Datadog
        /* votre logique personnalisée */
    }

    func urlSession(_ session: URLSession, dataTask: URLSessionDataTask, didReceive data: Data) {
        ddURLSessionDelegate.urlSession(session, dataTask: dataTask, didReceive: data) // transmettre au délégué Datadog
        /* votre logique personnalisée */
    }
}
```
**Remarque** : si vous utilisez les patterns de _composition_, `ddURLSessionDelegate` doit recevoir tous les appels requis répertoriés dans les [commentaires du protocole `__URLSessionDelegateProviding`][2]. Votre délégué doit effectuer les tâches suivantes :
* Implémenter `URLSessionTaskDelegate` et transmettre :
  * [`urlSession(_:task:didFinishCollecting:)`][3] et
  * [`urlSession(_:task:didCompleteWithError:)`][4]
* Implémenter `URLSessionDataDelegate` et transmettre :
  * [`urlSession(_:dataTask:didReceive:)`][5]

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/real_user_monitoring/ios/advanced_configuration/?tab=swift#automatically-track-network-requests
[2]: https://github.com/DataDog/dd-sdk-ios/blob/master/Sources/Datadog/URLSessionAutoInstrumentation/DDURLSessionDelegate.swift#L12
[3]: https://developer.apple.com/documentation/foundation/urlsessiontaskdelegate/1643148-urlsession
[4]: https://developer.apple.com/documentation/foundation/urlsessiontaskdelegate/1411610-urlsession
[5]: https://developer.apple.com/documentation/foundation/urlsessiondatadelegate/1411528-urlsession