---
title: Prise en main de RUM
kind: documentation
aliases:
  - /fr/real_user_monitoring/setup
further_reading:
  - link: 'https://www.npmjs.com/package/@datadog/browser-rum'
    tag: npm
    text: package datadog/browser-rum npm
  - link: /real_user_monitoring/installation/advanced_configuration
    tag: Documentation
    text: Configuration avancée pour la collecte de données RUM
  - link: /real_user_monitoring/dashboards
    tag: Documentation
    text: Visualisez vos données RUM via des dashboards prêts à l'emploi
---
Pour configurer la solution Real User Monitoring (RUM) de Datadog :

1. Sur la [page Real User Monitoring][1], cliquez sur le bouton **New Application**.
2. Renseignez les informations sur votre application et cliquez sur **Generate Client Token**. Cette option permet de créer automatiquement un `clientToken` et un `applicationId` pour votre application.
3. Configurez le SDK RUM Datadog [via npm](#configuration-via-npm) ou collez l'[extrait de code généré](#configuration-via-bundle) dans le tag head.
4. Déployez les modifications sur votre application. Une fois votre déploiement actif, Datadog commence à recueillir les événements depuis les navigateurs de vos utilisateurs.
5. Visualisez les [données recueillies][2] sur les [dashboards prêt à l'emploi][3] de Datadog.

**Remarque** : votre application affiche le statut « Pending » (en attente) sur la liste des applications tant que Datadog n'a pas encore reçu de données.

## Configuration via npm

Après avoir ajouté [`@datadog/browser-rum`][4] à votre fichier `package.json`, lancez la bibliothèque avec :

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<ID_APPLICATION_DATADOG>',
    clientToken: '<TOKEN_CLIENT_DATADOG>',
    datacenter: 'us',
    sampleRate: 100,
});
```

{{% /tab %}}
{{% tab "Site européen de Datadog" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<ID_APPLICATION_DATADOG>',
    clientToken: '<TOKEN_CLIENT_DATADOG>',
    datacenter: 'eu',
    sampleRate: 100,
});
```

{{% /tab %}}
{{< /tabs >}}

## Configuration via bundle

Collez l'extrait de code généré dans le tag head (avant tous les autres tags du script) de toutes les pages HTML que vous souhaitez surveiller dans votre application. Lorsque le tag de script de niveau plus élevé est intégré et synchronisé, la solution RUM de Datadog peut recueillir toutes les données de performance et les erreurs.

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}

```html
<script
    src="https://www.datadoghq-browser-agent.com/datadog-rum-us.js"
    type="text/javascript"
></script>
<script>
    window.DD_RUM &&
        window.DD_RUM.init({
            clientToken: '<TOKEN_CLIENT>',
            applicationId: '<ID_APPLICATION>',
            sampleRate: 100,
        });
</script>
```

{{% /tab %}}
{{% tab "Site européen de Datadog" %}}

```html
<script
    src="https://www.datadoghq-browser-agent.com/datadog-rum-eu.js"
    type="text/javascript"
></script>
<script>
    window.DD_RUM &&
        window.DD_RUM.init({
            clientToken: '<TOKEN_CLIENT>',
            applicationId: '<ID_APPLICATION>',
            sampleRate: 100,
        });
</script>
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : le check `window.DD_RUM` est utilisé pour éviter tout problème si le chargement du SDK RUM échoue.

## Paramètres de lancement

| Paramètre            | Type    | Obligatoire | Valeur par défaut                           | Description                                                                                                  |
| -------------------- | ------- | -------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `applicationId`      | Chaîne  | Oui      | `` | L'ID d'application RUM.      |
| `clientToken`        | Chaîne  | Oui      | `` | Un [token client Datadog][5]. |
| `datacenter`         | Chaîne  | Oui      | `us`                              | Le site Datadog associé à votre organisation. Choisissez `us` pour le site américain ou `eu` pour le site européen.                   |
| `resourceSampleRate` | Numéro  | Non       | `100`                             | Le pourcentage de sessions à surveiller (avec collecte des ressources). Choisissez une valeur entre `100` (toutes les sessions) et `0` (aucune session).               |
| `sampleRate`         | Numéro  | Non       | `100`                             | Le pourcentage de sessions à surveiller. Les événements RUM sont uniquement envoyés pour les sessions surveillées. Choisissez une valeur entre `100` (toutes les sessions) et `0` (aucune session). |
| `silentMultipleInit` | Booléen | Non       | `false`                           | L'initialisation échoue sans envoyer d'alerte si la fonction RUM de Datadog est déjà initialisée sur la page.                            |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum
[2]: /fr/real_user_monitoring/data_collected
[3]: /fr/real_user_monitoring/dashboards
[4]: https://www.npmjs.com/package/@datadog/browser-rum
[5]: /fr/account_management/api-app-keys/#client-tokens
