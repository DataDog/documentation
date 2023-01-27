---
beta: true
dependencies:
- https://github.com/DataDog/dd-sdk-ios/blob/master/docs/rum_collection/swiftui.md
description: Utilisez RUM pour instrumenter vos applications SwiftUI.
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: GitHub
  text: Code source dd-sdk-ios
- link: https://docs.datadoghq.com/real_user_monitoring/ios/
  tag: Documentation
  text: En savoir plus sur la surveillance iOS et tvOS
kind: documentation
title: SwiftUI
---
## Présentation

Le SDK iOS Datadog pour RUM vous permet d'instrumenter les vues et les actions de vos applications `SwiftUI`. L'instrumentation fonctionne également avec les applications `UIKit` et `SwiftUI` hybrides. 

La prise en charge de SwiftUI est disponible à partir de la [version 1.9.0][1] du SDK. 

## Configuration

Pour en savoir plus sur la configuration, consultez [Surveillance iOS et tvOS][2].

### Instrumenter des vues

Pour instrumenter une `SwiftUI.View`, ajoutez la méthode suivante à votre déclaration de vue :

```swift
import SwiftUI
import Datadog

struct FooView: View {

    var body: some View {
        FooContent {
            ...
        }
        .trackRUMView(name: "Foo")
    }
}
```

La méthode `trackRUMView(name:)` démarre et arrête une vue RUM lorsque la vue `SwiftUI` apparaît et disparaît à l'écran.

### Instrumenter des actions d'appui sur l'écran

Pour instrumenter une action d'appui sur une `SwiftUI.View`, ajoutez la méthode suivante à votre déclaration de vue :

```swift
import SwiftUI
import Datadog

struct BarView: View {

    var body: some View {
        Button("BarButton") { {
            ...
        }
        .trackRUMTapAction(name: "Bar")
    }
}
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-ios/releases/tag/1.9.0
[2]: /fr/real_user_monitoring/ios/#setup