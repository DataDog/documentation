---
aliases:
- /fr/real_user_monitoring/error_tracking/maui
- /fr/error_tracking/frontend/mobile/maui/
code_lang: maui
code_lang_weight: 55
description: Configurez Error Tracking pour vos applications .NET MAUI.
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: Documentation
  text: Débuter avec Error Tracking
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: Visualiser les données d'Error Tracking dans l'Explorer
title: .NET MAUI Crash Reporting et Error Tracking
type: multi-code-lang
---
## Présentation {#overview}

Error Tracking traite les erreurs collectées à partir du SDK .NET MAUI.

Activez les rapports de plantage .NET MAUI Crash Reporting et Error Tracking pour obtenir des rapports de plantage complets, des traces de pile iOS natives symbolisées et des tendances d'erreurs sur iOS et Android. Vos rapports de plantage apparaissent dans [{{< ui >}}Error Tracking{{< /ui >}}][1].

### Suivi des erreurs C# {#c-error-tracking}

Le suivi des erreurs C# est activé automatiquement dès que RUM est activé — aucune configuration supplémentaire n'est requise. Le SDK capture :

- Exceptions C# non gérées (`AppDomain.UnhandledException`)
- Exceptions de tâche non observées (`TaskScheduler.UnobservedTaskException`)

Vous pouvez également signaler manuellement une erreur avec `DdRum.AddError`.

### Rapports de plantage natifs (facultatif) {#native-crash-reporting-optional}

`NativeCrashReportEnabled` est **uniquement** nécessaire si vous souhaitez également capturer les plantages provenant de code iOS ou Android natif — par exemple, un plantage Objective-C/Swift sur iOS, ou un plantage JNI/Kotlin sur Android. Le suivi des erreurs C# fonctionne sans cela.

Pour activer les rapports de plantage natifs, définissez `NativeCrashReportEnabled = true` dans la configuration du SDK :

```csharp
.UseDatadog(new DdSdkConfiguration
{
    ClientToken = "<CLIENT_TOKEN>",
    Environment = "<ENV_NAME>",
    TrackingConsent = TrackingConsent.Granted,
    NativeCrashReportEnabled = true,
})
```

{% alert level="info" %}
Lorsque `NativeCrashReportEnabled = true`, une exception C# non gérée qui fait planter l'application est signalée **deux fois** : une fois en tant qu'erreur C# capturée par `AppDomain.UnhandledException`, et une fois en tant que plantage natif iOS ou Android capturé par le rapporteur de plantage de la plateforme. Les deux événements partagent la même session et la même vue RUM, vous pouvez donc les corréler dans l'Explorer.

Si vous souhaitez n'en conserver qu'une seule version, utilisez [`ErrorEventMapper`][5] pour supprimer celle qui ne correspond pas à votre workflow (par exemple, filtrez par le contenu `Source` ou `Stacktrace`).
{% /alert %}

## Configuration {#setup}

Si vous n'avez pas encore configuré le SDK .NET MAUI, suivez les [instructions de configuration dans l'application][2] ou consultez la [documentation de configuration de .NET MAUI][3].

## Obtenez des traces de pile symbolisées {#get-symbolicated-stack-traces}

Pour résoudre les noms de méthodes et les adresses de plantage dans les rapports de plantage iOS natifs, téléversez le bundle `.dSYM` de votre application vers Datadog. La symbolisation s'effectue ensuite côté serveur lors de chaque événement de plantage.

| Type de trace de pile | Fichier de symboles | Comment il est résolu |
|---|---|---|
| Plantages iOS natifs (et noms de méthodes C# compilés AOT) | `.dSYM` bundle | Téléversé vers Datadog, résolu côté serveur lors de chaque événement de plantage |

Le bundle `.dSYM` iOS est le seul fichier de symboles que le SDK téléverse. Les fichiers de mappage Android R8/ProGuard et les fichiers PDB portables ne sont pas téléversés — voir [Limitations](#limitations).

### Téléversez les symboles avec `datadog-ci` {#upload-symbols-with-datadog-ci}

Le package NuGet `Datadog.Maui` fournit une cible MSBuild qui téléverse automatiquement les symboles vers Datadog dans le cadre de `dotnet publish`. Pour l'activer :

#### 1. Installez `datadog-ci` {#1-install-datadog-ci}

```bash
npm install -g @datadog/datadog-ci
```

Vérifiez l'installation avec `datadog-ci version`.

#### 2. Définissez votre clé d'API Datadog {#2-set-your-datadog-api-key}

Exportez la clé dans le shell qui exécute `dotnet publish` :

```bash
export DATADOG_API_KEY=<YOUR_DATADOG_API_KEY>
```

Pour les environnements CI, définissez `DATADOG_API_KEY` comme variable d'environnement protégée/secrète sur votre exécuteur. Ne validez pas la clé dans le contrôle de code source.

Pour les tests locaux, vous pouvez transmettre la clé en tant que propriété MSBuild (`-p:DatadogApiKey=...`), mais **ne définissez pas `DatadogApiKey` dans votre `.csproj`** — ce fichier est déjà intégré dans le dépôt.

#### 3. Activez le téléversement {#3-enable-the-upload}

Définissez `DatadogUploadSymbols=true` soit comme une entrée `<PropertyGroup>` dans votre `.csproj`, soit sur la ligne de commande `dotnet publish`. Les cibles MSBuild s'exécutent automatiquement après la publication et sont ignorées silencieusement si `datadog-ci` est manquant ou si la clé d'API n'est pas définie.

```bash
dotnet publish -c Release -f net10.0-ios -r ios-arm64 \
  -p:DatadogUploadSymbols=true
```

Le bundle `.dSYM` généré à côté du `.app` est téléversé. Les dSYM ne sont produits que pour les builds d'appareil (`-r ios-arm64`) ; les builds de simulateur (`iossimulator-arm64`) ignorent le téléchargement.

### Configuration {#configuration}

Toute la configuration s'effectue via les propriétés MSBuild — soit dans votre `.csproj` `<PropertyGroup>`, soit sur la ligne de commande `dotnet publish` avec `-p:`.

| Propriété | Requis | Par défaut | Description |
|---|---|---|---|
| `DatadogUploadSymbols` | Oui | `false` | Défini sur `true` pour activer le téléchargement des symboles après la publication. |
| `DatadogServiceName` | Non | `$(AssemblyName)` | Nom du service utilisé pour identifier votre application dans Datadog. Doit correspondre au `Service` que vous transmettez à `DdSdkConfiguration` au moment de l'exécution. |
| `DatadogSite` | Non | `datadoghq.com` | Le site Datadog qui reçoit le téléchargement (par exemple, `datadoghq.eu`, `us5.datadoghq.com`). Doit correspondre à la valeur `Site` définie sur `DdSdkConfiguration`. |
| `DatadogApiKey` | Non | — | Clé d'API transmise directement. Si elle n'est pas définie, la variable d'environnement `DATADOG_API_KEY` est utilisée à la place. |

```xml
<PropertyGroup>
  <DatadogServiceName>my-maui-app</DatadogServiceName>
  <DatadogSite>datadoghq.eu</DatadogSite>
</PropertyGroup>
```

Le logger de terminal que `dotnet publish` utilise par défaut masque les informations de sortie. Pour voir les messages de téléchargement Datadog, ajoutez `-v n -tl:off` :

```bash
dotnet publish -c Release -f net10.0-ios -r ios-arm64 \
  -p:DatadogUploadSymbols=true -v n -tl:off
```

Après le téléchargement, le traitement des symboles peut prendre jusqu'à 5 minutes. Vous pouvez confirmer leur réception sous [{{< ui >}}Error Tracking{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Symbol Files{{< /ui >}}][4].

## Limitations {#limitations}

### Traces de pile C# gérées {#managed-c-stack-traces}

Les traces de pile d'exceptions C# gérées ne sont résolues qu'en noms de méthodes. Les noms de fichiers et les numéros de ligne ne sont pas encore disponibles.

Les builds de version .NET MAUI compilent le C# en AOT avant la distribution, de sorte que le runtime sur l'appareil ne peut pas mapper une trame vers un emplacement source.
- Sur iOS, le runtime minimal ne peut pas lire du tout les fichiers PDB portables. 
- Sur Android, les frames compilées en AOT rapportent `Unknown Source`. 
La résolution de ces frames nécessite de combiner le PDB portable de votre application (`.pdb`) avec les informations de débogage natives de la plateforme côté serveur, ce qui n'est pas pris en charge. Les fichiers PDB portables ne sont pas téléchargés vers Datadog, et les inclure dans l'application n'ajoute pas d'informations de fichier ou de ligne aux traces de pile rapportées.

### Téléchargement de symboles Android {#android-symbol-upload}

Le téléchargement de symboles n'est pas pris en charge pour les builds Android. Les fichiers R8/ProGuard `mapping.txt` ne sont pas téléchargés, donc les frames Java/Kotlin obfusquées dans les rapports de crash Android ne sont pas dés-obfusquées. Les crashs Android sont toujours collectés et rapportés — seule l'étape de dés-obfuscation est indisponible.

### Taille des fichiers {#file-sizing}

Les bundles dSYM (iOS) peuvent atteindre jusqu'à **2 Go** chacun.

### Collecte {#collection}

Le SDK gère les rapports de panne avec les comportements suivants :

- Les crashs ne peuvent être détectés qu'une fois le SDK initialisé. Initialisez le SDK le plus tôt possible dans `MauiProgram.CreateMauiApp`.
- Les crashs RUM doivent être associés à une vue RUM. Si un crash survient avant qu'une vue ne soit visible (ou après que l'application a été mise en arrière-plan par l'utilisateur), le crash est ignoré et n'est pas rapporté. Pour atténuer cela, définissez `TrackBackgroundEvents = true` sur `DdRumConfiguration`.
- Seuls les crashs survenant lors de sessions échantillonnées sont conservés.

### Symboles de crash NDK Android {#android-ndk-crash-symbols}

Lorsque `NativeCrashReportEnabled = true`, les crashs natifs (C/C++) capturés par `dd-sdk-android-ndk` nécessitent des fichiers `.so` non dépouillés pour la symbolisation.

Dans une application MAUI, les fichiers `.so` natifs proviennent généralement du runtime .NET (`libmonosgen-2.0.so`, `libmonodroid.so`) et de la propre bibliothèque NDK de Datadog — Datadog résout ces derniers côté serveur ; aucun téléchargement manuel n'est nécessaire pour l'un ou l'autre. Si vous distribuez des bibliothèques C/C++ natives personnalisées, téléchargez leurs symboles manuellement avec `datadog-ci dsyms upload <path-to-so-directory>`.

## Testez votre implémentation {#test-your-implementation}

Pour vérifier votre configuration de Crash Reporting et d'Error Tracking, déclenchez un crash et confirmez que l'erreur apparaît dans Datadog :

1. Exécutez votre application sur un appareil réel ou un émulateur (les dSYM ne sont générés que pour les builds d'appareil sur iOS).
2. Exécutez du code qui génère une exception non gérée. Exemple :

   ```csharp
   void OnButtonClicked(object sender, EventArgs e)
   {
       throw new InvalidOperationException("Crash the app");
   }
   ```

3. Après le crash, redémarrez votre application et attendez que le SDK télécharge le rapport de crash.
4. Confirmez l'événement dans [{{< ui >}}Error Tracking{{< /ui >}}][1]. Pour un crash iOS natif provenant d'un build d'appareil, les frames sont symbolisées.

## Dépannage {#troubleshooting}

**`Skipping symbol upload — datadog-ci is not installed`**
Exécutez `npm install -g @datadog/datadog-ci` et vérifiez avec `datadog-ci version`.

**`Skipping symbol upload — DATADOG_API_KEY is not set`**
Exportez la clé dans votre shell : `export DATADOG_API_KEY=<YOUR_DATADOG_API_KEY>`. Vérifiez avec `echo $DATADOG_API_KEY`.

**`Skipping dSYM upload — file not found`**
Les dSYM ne sont générés que pour les builds d'appareil (`-r ios-arm64`). Les builds pour simulateur ne produisent pas de dSYM.

**Aucune sortie Datadog visible lors de la publication**
Le logger du terminal masque les messages d'information. Ajoutez `-v n -tl:off` à votre commande `dotnet publish`.

**Le téléchargement se termine mais les symboles n'apparaissent pas dans Datadog**
Le traitement des symboles peut prendre jusqu'à 5 minutes. Vérifiez [{{< ui >}}Error Tracking{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Symbol Files{{< /ui >}}][4].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /fr/real_user_monitoring/application_monitoring/maui/setup
[4]: https://app.datadoghq.com/source-code/setup/symbols
[5]: /fr/real_user_monitoring/application_monitoring/maui/advanced_configuration/#modify-or-drop-rum-events