---
aliases:
- /fr/real_user_monitoring/guide/getting-started-rum-deployment-tracking/
description: Découvrir comment configurer RUM pour capturer de nouvelles versions,
  suivre vos déploiements et analyser les performances dans Datadog
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Visualiser vos données RUM dans le RUM Explorer
- link: /tracing/version_tracking
  tag: Documentation
  text: Utiliser des tags version dans l'APM Datadog pour surveiller les déploiements
- link: https://www.datadoghq.com/blog/datadog-rum-deployment-tracking
  tag: Blog
  text: Dépanner les problèmes de déploiement frontend avec le suivi des déploiements
    dans RUM

title: Débuter avec le suivi des déploiements RUM
---


## Présentation
Avec les changements et déploiements de code fréquents causés par votre équipe, il peut être difficile de déterminer précisément la cause à l'origine d'un pic d'erreur ou d'un ralentissement du chargement d'une page. La fonctionnalité de suivi des déploiements RUM vous permet de découvrir lorsqu'un déploiement récent ou une nouvelle version nuit aux performances de votre application, et d'identifier plus facilement la cause de vos problèmes.

## Configuration
Vous pouvez utiliser le tag `version` pour surveiller vos déploiements et le comportement de vos services, afin de continuer à respecter votre stratégie de déploiement logiciel. Pour commencer à utiliser le suivi des déploiements RUM, vous devez ajouter des versions RUM à votre application.

### RUM Browser
{{< tabs >}}
{{% tab "npm" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

// Initialiser le SDK Browser Datadog
datadogRum.init({
  ...
  version: '1.0.0',
  ...
});
```

{{% /tab %}}
{{% tab "CDN asynchrone" %}}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      ...
      version: '1.0.0',
      ...
    })
})
```

{{% /tab %}}
{{% tab "CDN synchrone" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
      ...
      version: '1.0.0',
      ...
    })
```
{{% /tab %}}
{{< /tabs >}}

### RUM mobile

#### RUM Android

Le tag « version » est capturé automatiquement à partir du manifeste de l'application.

#### RUM iOS

Le tag « version » est capturé automatiquement à partir du fichier `info.plist` de l'application.

## Analyser les performances de vos déploiements dans RUM

{{< tabs >}}
{{% tab "RUM Browser" %}}

### Utiliser des tags de version sur la page Application Overview

Lorsque vous avez configuré des tags de version pour une application, vous pouvez accéder à la section **Deployment Tracking** sur la page Application Overview de cette application. Cette section affiche toutes les versions de l'application et des services qui étaient actives lors de l'intervalle sélectionné.

Ainsi, lorsque vous rencontrez un problème avec une version, vous pouvez procéder au rétablissement d'une version stable afin d'éviter tout impact sur l'expérience de vos utilisateurs. Les graphiques prêts à l'emploi de cette section représentent des données agrégées pour toutes les versions, ce qui vous permet d'identifier facilement vos problèmes avant qu'ils ne deviennent trop sérieux.

Les graphiques représentent les données suivantes :
- Le p75 du temps de chargement par version
- Le nombre total de sessions utilisateur par version
- Le taux d'erreur par version

Les informations suivantes sont également disponibles dans le tableau sous les widgets :
- Le nom des versions déployées pour l'application et ses services sur l'intervalle sélectionné.
- Le nombre de sessions utilisateur pour la version en question
- Le nombre moyen d'erreurs par vue
- Le p75 du temps de chargement
- Le p75 des signaux Web essentiels

Ces widgets peuvent être exportés au sein de dashboards et de monitors.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/browser-rum-app-overview-deployment-tracking.png" alt="Suivi des déploiements Browser sur la page Application Overview de RUM" style="width:100%;">}}


### Comparaison de déploiements

Cliquez sur une ligne de version dans le tableau **List of Versions** pour ouvrir une page de comparaison. Vous pouvez ainsi comparer deux versions d'un même service. Par défaut, la version sélectionnée est comparée à toutes les versions précédentes. Vous pouvez modifier la sélection afin de comparer n'importe quelle paire de versions au cours des 30 derniers jours.

À l'instar des graphiques sur la page **Application Overview**, les graphiques **User Sessions**, **Core Web Vitals** et **Errors** affichent une vue globale d'un déploiement ou les pics de taux d'erreur. Les versions comparées sont mises en évidence, tandis que les autres versions sont affichées en gris en guise de contexte supplémentaire.

Dans le cadre de la surveillance de votre version, ces données vous aident à comparer les performances des déploiements de code au code en production. Vous êtes ainsi capable de vérifier si le nouveau code fonctionne correctement et de découvrir si une erreur est apparue entre deux versions.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/browser-deployment-tracking-comparison.png" alt="Fonctionnalité de comparaison du suivi des déploiements Browser" style="width:75%;">}}

L'onglet **Issues** répertorie les différences d'erreurs détectées pour chacune des deux versions et met en évidence les informations suivantes :
- Le nombre d'erreurs par version
- Le pourcentage de vues comportant des erreurs par version
- Les problèmes issus de la fonctionnalité de suivi des erreurs

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/browser-deployment-tracking-comparison-error.png" alt="Erreurs de la fonctionnalité de comparaison du suivi des déploiements Browser" style="width:75%;">}}

### Explorer les powerpacks du suivi des déploiements RUM
Vous pouvez ajouter la fonctionnalité de suivi des déploiements de vos services RUM à vos dashboards. Depuis le menu des powerbacks, recherchez le powerback Deployment Version Tracking. Vous pouvez alors itérer et ajouter d'autres widgets à vos dashboards pour aider vos équipes à publier en toute sécurité de nouvelles fonctionnalités.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/browser-deployment-tracking-powerpack.png" alt="Powerback Browser Deployment Tracking" style="width:75%;">}}

{{% /tab %}}
{{% tab "RUM mobile" %}}

### Utiliser des tags de version sur la page Application Overview

Lorsque vous avez configuré des tags de version pour une application, vous pouvez accéder à la section **Deployment Tracking** sur la page Application Overview de cette application. Cette section affiche toutes les versions de l'application et des services qui étaient actives lors de l'intervalle sélectionné.

Ainsi, lorsque vous rencontrez un problème avec une version, vous pouvez procéder rapidement au rétablissement d'une version stable afin d'éviter tout impact sur l'expérience de vos utilisateurs. Les graphiques prêts à l'emploi de cette section représentent des données agrégées pour toutes les versions, ce qui vous permet d'identifier facilement vos problèmes avant qu'ils ne deviennent trop sérieux.

Les graphiques représentent les données suivantes :
- La durée de lancement moyenne de l'application par version
- Le nombre total de sessions utilisateur par version
- Le taux d'erreur par version

Les informations suivantes sont également disponibles dans le tableau sous les widgets :
- Le nom des versions déployées pour l'application et ses services sur l'intervalle sélectionné.
- Le nombre de lancements de l'application pour la version en question
- Le taux d'erreur
- Le taux de crash
- Le p90 de la durée de lancement de l'application

Ces widgets peuvent être exportés au sein de dashboards et de monitors.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/mobile-rum-app-overview-deployment-tracking.png" alt="Suivi des déploiements mobiles sur la page Application Overview de RUM" style="width:100%;">}}

### Comparaison de déploiements

Cliquez sur une ligne de version dans le tableau **List of Versions** pour ouvrir une page de comparaison. Vous pouvez ainsi comparer deux versions d'un même service. Par défaut, la version sélectionnée est comparée à toutes les versions précédentes. Vous pouvez modifier la sélection afin de comparer n'importe quelle paire de versions au cours des 30 derniers jours.

À l'instar des graphiques sur la page **Application Overview**, les graphiques **User Sessions**, **Mobile Vitals** et **Errors** affichent une vue globale d'un déploiement ou les pics de taux d'erreur. Les versions comparées sont mises en évidence tandis que les autres versions sont affichées en gris en guise de contexte supplémentaire.

Dans le cadre de la surveillance de votre version, ces données vous aident à comparer les performances des déploiements de code au code en production. Vous êtes ainsi capable de vérifier si le nouveau code fonctionne correctement et de découvrir si une erreur est apparue entre deux versions.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/mobile-deployment-tracking-comparison.png" alt="Fonctionnalité de comparaison du suivi des déploiements mobiles" style="width:75%;">}}

L'onglet **Issues** répertorie les différences d'erreurs détectées pour chacune des deux versions et met en évidence les informations suivantes :
- Le nombre d'erreurs par version
- Le pourcentage de vues comportant des erreurs par version
- Les problèmes issus de la fonctionnalité de suivi des erreurs

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/mobile-deployment-tracking-comparison-error.png" alt="Erreurs de la fonctionnalité de comparaison du suivi des déploiements mobiles" style="width:75%;">}}

### Explorer les powerpacks du suivi des déploiements RUM
Vous pouvez ajouter la fonctionnalité de suivi des déploiements de vos services RUM à vos dashboards. Depuis le menu des powerbacks, recherchez le powerback Deployment Version Tracking. Vous pouvez alors itérer et ajouter d'autres widgets à vos dashboards pour aider vos équipes à publier en toute sécurité de nouvelles fonctionnalités.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/mobile-deployment-tracking-powerpack.png" alt="Powerback Browser Deployment Tracking" style="width:75%;">}}


{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}