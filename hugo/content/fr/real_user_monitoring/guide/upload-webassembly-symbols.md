---
description: Téléversez les symboles de débogage WebAssembly pour rendre lisibles
  les traces de pile WASM collectées à partir d'applications de navigateur.
further_reading:
- link: /error_tracking/frontend/browser
  tag: Documentation
  text: Configurez Browser Error Tracking
- link: /real_user_monitoring/guide/upload-javascript-source-maps
  tag: Documentation
  text: Téléverser des maps source JavaScript
- link: /real_user_monitoring/guide/debug-symbols
  tag: Documentation
  text: Analysez les traces de pile obscurcies à l'aide des symboles de débogage RUM.
- link: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/wasm-symbols
  tag: Code source
  text: Référence des commandes pour les symboles WebAssembly.
title: Téléversez les symboles WebAssembly
---
## Présentation {#overview}

WebAssembly (WASM) s'exécute au sein d'une application de navigateur. Il ne s'agit pas d'un type d'application Datadog distinct. Le SDK Navigateur Datadog collecte les erreurs WASM en conservant le contexte du navigateur, et Datadog Error Tracking peut symboliser leurs trames de pile WASM à l'aide des informations de débogage DWARF téléversées.

Une seule erreur peut contenir à la fois des trames JavaScript et WASM. Téléversez les [cartes sources JavaScript][1] pour les trames JavaScript et les symboles WASM pour les trames WASM.

<div class="alert alert-warning">La symbolisation WebAssembly est en version bêta. Le plugin du SDK Navigateur et la <code>datadog-ci wasm-symbols upload</code> commande sont expérimentaux et peuvent changer.</div>

## Prérequis {#prerequisites}

Avant de téléverser des symboles, assurez-vous d'avoir :

- Une application de navigateur configurée pour collecter les métadonnées de module WASM avec [RUM][2], [Browser Logs][3] ou les deux.
- Un fichier de symboles `.wasm` avec des sections de débogage DWARF intégrées et une section personnalisée `build_id`.
- `@datadog/datadog-ci` version 5.23.0 ou ultérieure.

## Générer des symboles de débogage {#generate-debug-symbols}

Configurez votre chaîne d'outils WASM pour générer :

- Sections DWARF intégrées telles que `.debug_info` et `.debug_line`.
- Une section personnalisée `build_id`. L'ID de build dans le fichier de symboles téléversé doit correspondre à l'ID de build dans le module chargé par le navigateur.

Par exemple, avec Emscripten :

```shell
emcc -g -Wl,--build-id <SOURCES> -o <OUTPUT>.js
```

Cette commande produit `<OUTPUT>.js`, le chargeur JavaScript, et `<OUTPUT>.wasm`, le binaire WebAssembly contenant les informations DWARF intégrées et la section personnalisée `build_id`.

Vous pouvez inspecter le module généré avec `wasm-objdump` :

```shell
wasm-objdump -h <OUTPUT>.wasm
wasm-objdump -j build_id -x <OUTPUT>.wasm
```

Conservez le fichier de symboles en tant qu'artefact de build afin de pouvoir le téléverser depuis votre pipeline CI.

## Téléversez vos symboles {#upload-your-symbols}

Installez l'interface de ligne de commande Datadog et configurez votre clé Datadog API ainsi que votre site :

```shell
npm install --save-dev @datadog/datadog-ci
export DATADOG_API_KEY=<DATADOG_API_KEY>
export DATADOG_SITE={{< region-param key="dd_site" >}}
```

Activez les commandes bêta et téléversez soit un fichier `.wasm`, soit un répertoire. Lorsqu'un répertoire est indiqué, l'interface de ligne de commande le parcourt de manière récursive à la recherche de fichiers `.wasm` :

```shell
DD_BETA_COMMANDS_ENABLED=1 datadog-ci wasm-symbols upload /path/to/build
```

La commande ignore les fichiers qui ne contiennent pas à la fois des informations DWARF intégrées et une section personnalisée `build_id`. Utilisez `--dry-run` pour valider les fichiers de symboles sans les téléverser :

```shell
DD_BETA_COMMANDS_ENABLED=1 datadog-ci wasm-symbols upload /path/to/build --dry-run
```

Par défaut, Datadog conserve le premier fichier de symboles téléversé pour un ID de build. Utilisez `--replace-existing` lorsque vous devez le remplacer volontairement.

<div class="alert alert-info">Le téléverseur ne résout pas une <code>external_debug_info</code> référence. Un module d'exécution qui ne contient que cette référence est ignoré. Téléversez un fichier de symboles qui contient des sections DWARF intégrées et la même <code>build_id</code> que le module d'exécution.</div>

## Comment les symboles sont mis en correspondance {#how-symbols-are-matched}

Datadog utilise les métadonnées d'URL du module pour associer chaque trame de pile WASM à un module, puis fait correspondre le module à ses symboles téléversés via `build_id`. Contrairement aux source maps JavaScript, `service` et `version` ne font pas partie de la recherche de symboles WASM.

Vous pouvez consulter les fichiers téléversés sur la [page RUM Debug Symbols][4].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/guide/upload-javascript-source-maps/
[2]: /fr/real_user_monitoring/application_monitoring/browser/collecting_browser_errors/#configure-webassembly-error-tracking
[3]: /fr/logs/log_collection/javascript/#webassembly-errors
[4]: https://app.datadoghq.com/source-code/setup/rum