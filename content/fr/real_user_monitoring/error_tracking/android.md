---
dependencies:
- "https://github.com/DataDog/dd-sdk-android-gradle-plugin/blob/main/docs/upload_mapping_file.md"
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: Suivi des erreurs
  text: Débuter avec le suivi des erreurs
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: Visualiser les données de suivi des erreurs dans l'Explorer
kind: documentation
title: Suivi des erreurs Android
---
## Présentation

La fonctionnalité de suivi des erreurs traite les erreurs recueillies à partir du SDK Android. Pour démarrer rapidement le suivi des erreurs, téléchargez la dernière version de [dd-sdk-android][1].

Si votre code source Android mobile est obfusqué, importez votre fichier de mapping Proguard/R8 dans Datadog pour que vos différentes stack traces puissent être désobfusquées. Pour une erreur donnée, vous pouvez accéder au chemin du fichier, au numéro de ligne, ainsi qu'à un extrait de code pour chaque frame de la stack trace associée.

## Importer votre fichier de mapping

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}

1. Ajoutez le [plug-in Gradle][1] à votre projet Gradle en utilisant l'extrait de code suivant.

```groovy
// Dans le script build.gradle de votre application
plugins {
    id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
}
```

2. [Créez une nouvelle clé d'API Datadog dédiée][2] et exportez-la en tant que variable d'environnement `DD_API_KEY` (vous pouvez également la transmettre en tant que propriété de tâche).
3. (Facultatif) Configurez le plug-in de façon à importer les fichiers sur le site européen en exportant deux variables d'environnement supplémentaires : `export DATADOG_SITE="datadoghq.eu"` et `export DATADOG_API_HOST="api.datadoghq.eu"`.
4. Lancez la tâche d'importation une fois que votre APK obfusqué a été créé :
```bash
./gradlew uploadMappingRelease
```
**Remarque** : si votre projet utilise d'autres flavors, le plug-in fournit une tâche d'importation pour chaque variante sur laquelle l'obfuscation est activée. Dans ce cas, initialisez le SDK avec un nom de variante approprié (l'API nécessaire est disponible à partir de la version `1.8.0`).

[1]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[2]: https://app.datadoghq.com/account/settings#api

{{% /tab %}}
{{% tab "Site européen de Datadog" %}}
1. Ajoutez le [plug-in Gradle][1] à votre projet Gradle en utilisant l'extrait de code suivant.

```groovy
// Dans le script build.gradle de votre application
plugins {
    id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
}
```

2. [Créez une nouvelle clé d'API Datadog dédiée][2] et exportez-la en tant que variable d'environnement `DD_API_KEY` (vous pouvez également la transmettre en tant que propriété de tâche).
3. Configurez le plug-in de façon à utiliser le site européen en ajoutant l'extrait de code suivant dans le fichier de script `build.gradle` de votre application :

```groovy
datadog {
    site = "EU"
}
```
4. Lancez la tâche d'importation une fois que votre APK obfusqué a été créé :
```bash
./gradlew uploadMappingRelease
```
**Remarque** : si votre projet utilise d'autres flavors, le plug-in fournit une tâche d'importation pour chaque variante sur laquelle l'obfuscation est activée. Dans ce cas, initialisez le SDK avec un nom de variante approprié (l'API nécessaire est disponible à partir de la version `1.8.0`).

[1]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[2]: https://app.datadoghq.com/account/settings#api
{{% /tab %}}
{{< /tabs >}}

### Options de configuration du plug-in

Vous pouvez configurer plusieurs propriétés du plug-in à l'aide de l'extension. Si vous utilisez plusieurs variantes, vous pouvez définir une valeur de propriété pour une flavor spécifique dans la variante.

**Exemple :**

Pour une variante `fooBarRelease`, la configuration suivante est possible :

```groovy
datadog {
    foo {
        versionName = "foo"
    }
    bar {
        versionName = "bar"
    }
    fooBar {
        versionName = "fooBar"
    }
}
```

La configuration de tâche pour cette variante sera fusionnée à partir des trois flavors fournis dans l'ordre suivant : `bar` -> `foo` -> `fooBar`, ce qui permettra de résoudre la valeur finale pour la propriété `versionName` en tant que : `fooBar`

| Nom de la propriété              | Description                                                                                                                                                                                               |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `versionName`              | Le nom de version de l'application.                                                                                                                                                                      |
| `serviceName`              | Le nom de service de l'application.                                                                                                                                                                      |
| `site`                     | Le site Datadog vers lequel importer vos données ("US", "EU" ou "GOV").                                                                                                                                       |
| `remoteRepositoryUrl`      | L'URL du référentiel distant où le code source a été déployé. Si cette valeur n'est pas fournie, elle sera résolue à partir de votre configuration GIT actuelle pendant le temps d'exécution de la tâche.                     |
| `checkProjectDependencies` | Cette propriété définit si le plug-in doit vérifier si le SDK Datadog est inclus dans les dépendances et effectuer l'action suivante si ce n'est pas le cas :  « none » - ignorer, « warn » - envoyer un avertissement, « fail » - faire échouer le build avec une erreur (par défaut). |


## Dépanner les erreurs

Une stack trace obfusquée est peu utile, puisque vous n'avez pas accès au nom de classe, au chemin du fichier et au numéro de ligne. Il est alors difficile d'identifier l'origine de l'erreur dans votre codebase. De plus, l'extrait de code est toujours minifié (il s'agit d'une longue ligne de code transformé), ce qui rend le processus de dépannage encore plus difficile. Voici un exemple de stack trace minifiée :

![image_obfuscated][2]

À l'inverse, une stack trace désobfusquée vous donne tout le contexte dont vous avez besoin pour dépanner le problème :

![image_deobfuscated][3]

[1]: https://github.com/DataDog/dd-sdk-android
[2]: https://raw.githubusercontent.com/DataDog/dd-sdk-android-gradle-plugin/main/docs/images/obfuscated_stacktrace.png
[3]: https://raw.githubusercontent.com/DataDog/dd-sdk-android-gradle-plugin/main/docs/images/deobfuscated_stacktrace.png

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
