---
description: Déboguez et désobfusquez les traces de pile dans RUM à l'aide de symboles
  de débogage pour examiner les erreurs dans des applications mobiles et web obfusquées.
title: Examinez les traces de pile obfusquées avec les symboles de débogage RUM.
---
La [page Symboles de débogage RUM][1] répertorie tous les symboles de débogage téléchargés pour un type donné d'application RUM. Vous pouvez utiliser cette page pour examiner les traces de pile obfusquées.

<div class="alert alert-info">Pour associer automatiquement les traces de pile à votre service et à votre version pour la résolution du code source, utilisez le <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context">plugin de build Source Code Context</a>.</div>

Le message d'erreur suivant s'affiche lorsqu'une trace de pile n'est pas correctement désobfusquée dans RUM ou Error Tracking : _La trace de pile n'a pas pu être désobfusquée car aucun symbole de débogage n'a pu être trouvé pour cette application. Si vous n'obfusquez pas votre application, ignorez ce message. Sinon, téléchargez vos symboles de débogage pour voir les traces de pile désobfusquées. Vous pouvez consulter tous vos symboles téléchargés sur la page Symboles de débogage RUM._

{{< img src="real_user_monitoring/guide/debug-symbols/deobfuscation-failed-message.png" alt="Échec de la désobfuscation : la trace de pile n'a pas pu être désobfusquée car aucun fichier de mappage n'a pu être trouvé pour cette application. Si vous n'obfusquez pas votre application, ignorez ce message. Sinon, téléchargez vos fichiers de mappage pour voir les traces de pile désobfusquées. Vous pouvez consulter tous vos fichiers téléchargés sur la page Symboles de débogage RUM." >}}

Cela peut se produire pour plusieurs raisons :

### La trace de pile n'était pas obfusquée {#the-stack-trace-was-not-obfuscated}

Datadog tente de désobfusquer toutes les traces de pile, y compris celles qui ne sont pas obfusquées (par exemple, issues de tests locaux ou de builds hors production).

Vous pouvez ignorer cet avertissement. La trace de pile est déjà lisible.

### Aucun symbole de débogage téléchargé pour cette version {#no-debug-symbols-uploaded-for-this-version}

Utilisez la [page Symboles de débogage RUM][1] pour voir si des symboles de débogage existent pour votre application. Cette page est filtrée par {{< ui >}}type{{< /ui >}} (JavaScript, WebAssembly, Android, iOS, React Native, Flutter). Utilisez le filtre pour trouver les symboles de débogage que vous recherchez.

S'il n'y a pas de symboles de débogage pour votre application, [téléchargez-les][2].

<div class="alert alert-danger">
Assurez-vous que la taille de chaque symbole de débogage ne dépasse pas la limite de **500 Mo**, sinon le téléchargement sera rejeté.
Pour les dSYM iOS, des fichiers individuels allant jusqu'à **2 Go** sont pris en charge. 
</div>

### Les tags des symboles de débogage ne correspondent pas {#debug-symbol-tags-do-not-match}

Datadog s'appuie sur différents tags pour faire correspondre les symboles de débogage aux traces de pile. Ces tags varient pour chaque type d'application :

| Type d'application | Combinaison de tags utilisée pour la correspondance |
| ---- | ---- |
| JavaScript | `service`, `version`, `path`|
| WebAssembly | `build_id` |
| Android | v1.13.0+ : `build_id`<br/> Versions antérieures : `service`, `version`, `variant`|
| iOS | `uuid` |
| React Native | `service`, `version`, `bundle_name`, `platform` ; si plusieurs maps source correspondent à ces champs, celle avec la valeur `build_number` la plus élevée est sélectionnée |
| Flutter | `service`, `version`, `variant`, `architecture` |

La [page Symboles de débogage RUM][1] affiche les valeurs de ces tags. Si vous constatez une incohérence, téléchargez à nouveau les symboles de débogage avec un ensemble de tags corrigé.



[1]: https://app.datadoghq.com/source-code/setup/rum
[2]: /fr/real_user_monitoring/error_tracking/mobile/android/?tab=us#upload-your-mapping-file