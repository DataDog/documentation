---
further_reading:
- link: /real_user_monitoring/browser
  tag: Documentation
  text: Surveillance Browser avec RUM
- link: /logs/log_collection/javascript
  tag: Documentation
  text: Collecte de logs à partir des navigateurs
title: Conseils pour l'utilisation des outils de développement du navigateur
---

## Présentations

Ce guide fournit quelques conseils pour l'utilisation de outils de développement (DevTools) qui sont inclus dans les navigateurs modernes pour déboguer une application instrumentée avec un SDK de navigateur Datadog.

## S'assurer que les numéros de fichier et de ligne correspondent dans la console DevTools

Le SDK du navigateur instrumente les fonctions de la console (`console.error`, mais aussi `.log`, `.info` et `.warn`) pour collecter des données sur le comportement de l'application.
Cela peut conduire à ce que la console DevTool affiche un numéro de ligne et un fichier incorrects, comme indiqué ci-dessous :
{{< img src="real_user_monitoring/guide/devtools-tips/issue_console.png" alt="Console DevTools affichant un problème dû à un fichier et des numéros de ligne erronés pour une instruction console.error.">}}

Dans l'image ci-dessus, la fonction `console.error` est instrumentée. Remarquez qu'au lieu d'afficher le fichier et le numéro de ligne sur lesquels cette instruction a été appelée, `VM505:1`, la console affiche `datadog-rum.js:1`.

### L'ajout de scripts à la liste des données à ignorer de votre navigateur pour afficher le bon fichier et numéro de ligne.

La plupart des navigateurs permettent aux développeurs de sélectionner des scripts et de les ajouter à une liste de données ignorées. Pour afficher le bon fichier et numéro de ligne, vous pouvez ajouter les scripts suivants à la liste des données à ignorer de votre navigateur : `datadog-rum*.js` et `datadog-logs*.js`.

Vous trouverez ci-dessous un exemple d'emplacement de cette fonctionnalité dans Google Chrome.
{{< img src="real_user_monitoring/guide/devtools-tips/script_ignore_list.png" alt="Comment ajouter un script à la liste des données à ignorer dans Google Chrome.">}}

Dans lʼonglet de la console, développez la sortie de lʼinstruction de la console. Cliquez avec le bouton droit de la souris sur chaque script que vous souhaitez ignorer et sélectionnez l'option **add script to ignore list**.
**Remarque** : la liste des données à ignorer peut être gérée dans **Developer Tools > Settings > Ignore List**

Cette méthode fonctionne bien lorsque vous utilisez les [méthodes d'installation CDN (sync/async)][3]. Si vous utilisez la méthode du paquet NPM, assurez-vous que `sourcemaps` est activé. Sinon, le code du SDK peut être intégré au code de votre application, ce qui empêche DevTools d'ignorer le SDK.

Un autre avantage de l'utilisation de la liste des données à ignorer est visible dans le volet du réseau :
{{< img src="real_user_monitoring/guide/devtools-tips/network_initiator.png" alt="Initiateur réseau sʼaffichant correctement après lʼajout de scripts à la liste des données à ignorer.">}}

Au lieu d'afficher le SDK du navigateur en tant qu'initiateur de la requête, le fichier et le numéro de ligne corrects sont affichés pour l'application.

## Supprimer les nuisances dans lʼonglet du réseau

Les SDK des navigateurs envoient plusieurs requêtes réseau pour enregistrer le comportement d'une application. Cela peut générer un nombre important de lignes dans lʼonglet du réseau, ce qui rend difficile l'identification des demandes initiées par votre application. La plupart des navigateurs vous permettent de filtrer les requêtes provenant des SDK du navigateur.

Voici un exemple de cette fonctionnalité dans Google Chrome :
{{< img src="real_user_monitoring/guide/devtools-tips/network_ignore_intake.png" alt="Volet réseau filtrant les requêtes du SDK du navigateur.">}}

Dans lʼonglet réseau, ajoutez un filtre `-url:intake-datadoghq.com` (mettez à jour le pattern pour qu'il corresponde à l'url de lʼ[admission de votre datacenter][1], ou à celle de votre [proxy][2]).

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/site
[2]: /fr/real_user_monitoring/guide/proxy-rum-data
[3]: /fr/real_user_monitoring/browser/setup/#choose-the-right-installation-method