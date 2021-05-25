---
aliases:
  - /fr/real_user_monitoring/setup
dependencies:
  - 'https://github.com/DataDog/browser-sdk/blob/main/packages/rum/README.md'
kind: documentation
title: Surveillance Browser RUM
---
## Présentation

Le Real User Monitoring (RUM) de Datadog vous permet de visualiser et d'analyser les performances en temps réel et les parcours des utilisateurs de votre application.

## Configuration

Pour configurer la surveillance Browser RUM de Datadog :

1. Dans Datadog, accédez à la [page Real User Monitoring][1] et cliquez sur le bouton **New Application**.
2. Saisissez un nom pour votre application et cliquez sur **Generate Client Token**. Cette option permet de générer un `clientToken` et un `applicationId` pour votre application.
3. Configurez le SDK RUM Datadog via [npm](#npm) ou l'une des versions hébergées : [CDN asynchrone](#cdn-asynchrone) ou [CDN synchrone](#cdn-synchrone).
4. Déployez les modifications sur votre application. Une fois votre déploiement actif, Datadog recueille les événements depuis les navigateurs de vos utilisateurs.
5. Visualisez les [données recueillies][2] grâce aux [dashboards][3] de Datadog.

**Remarque** : votre application affiche le statut « Pending » (en attente) sur la liste des applications tant que Datadog n'a pas encore reçu de données.

### Choisir la bonne méthode d'installation

| Méthode d'installation        | Cas d'utilisation                                                                                                                                                                                                                                                                                                         |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| npm (node package manager) | Cette méthode est recommandée pour les applications Web modernes. Le SDK RUM est inclus dans le package avec le reste de votre code JavaScript frontend. Les performances de chargement des pages ne sont pas affectées. Le SDK peut toutefois omettre les erreurs, les ressources et les actions utilisateur déclenchées avant l'initialisation du SDK.                            |
| CDN asynchrone                  | Cette méthode est recommandée pour les applications Web devant satisfaire des objectifs de performance. Le SDK RUM est chargé à partir de notre CDN de façon asynchrone : ainsi, le téléchargement du SDK n'affecte pas les performances de chargement des pages. Le SDK peut toutefois omettre les erreurs, les ressources et les actions utilisateur déclenchées avant l'initialisation du SDK. |
| CDN synchrone                   | Cette méthode est recommandée pour recueillir tous les événements RUM. Le SDK RUM est chargé à partir de notre CDN de façon synchrone : ainsi, le SDK est chargé en premier et recueille toutes les erreurs, ressources et actions utilisateur. Cette méthode peut avoir un impact sur les performances de chargement des pages.                                                     |

### npm

Ajoutez [`@datadog/browser-rum`][4] à votre fichier `package.json`, puis lancez-le avec :

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<ID_APPLICATION_DATADOG>',
  clientToken: '<TOKEN_CLIENT_DATADOG>',
  site: '<SITE_DATADOG>',
  //  service: 'my-web-application',
  //  env: 'production',
  //  version: '1.0.0',
  sampleRate: 100,
  trackInteractions: true,
})
```

**Remarque** : le paramètre `trackInteractions` permet la collecte automatique des clics utilisateur dans votre application. **Des données sensibles et privées** contenues dans vos pages sont susceptibles d'être recueillies pour identifier les éléments qui ont fait l'objet d'une interaction.

### CDN asynchrone

Ajoutez l'extrait de code généré dans le tag head de toutes les pages HTML que vous souhaitez surveiller dans votre application.

<!-- prettier-ignore -->
```html
<script>
 (function(h,o,u,n,d) {
   h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
   d=o.createElement(u);d.async=1;d.src=n
   n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
})(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum.js','DD_RUM')
  DD_RUM.onReady(function() {
    DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: '<SITE_DATADOG>',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      trackInteractions: true,
    })
  })
</script>
```

**Remarques** :

- Le paramètre `trackInteractions` permet la collecte automatique des clics utilisateur dans votre application. **Des données sensibles et privées** contenues dans vos pages sont susceptibles d'être recueillies pour identifier les éléments qui ont fait l'objet d'une interaction.
- Les premiers appels de l'API RUM doivent être wrappés dans le callback `DD_RUM.onReady()`. De cette façon, le code est uniquement exécuté une fois le SDK entièrement chargé.

### CDN synchrone

Ajoutez l'extrait de code généré dans le tag head (avant tous les autres tags du script) de toutes les pages HTML que vous souhaitez surveiller dans votre application. Lorsque le tag script est placé tout en haut du code et synchronisé, la solution RUM de Datadog peut recueillir toutes les données de performance et toutes les erreurs.

```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<TOKEN_CLIENT>',
      applicationId: '<ID_APPLICATION>',
      site: '<SITE_DATADOG>',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sampleRate: 100,
      trackInteractions: true,
    })
</script>
```

**Remarques** :

- Le paramètre `trackInteractions` permet la collecte automatique des clics utilisateur dans votre application. **Des données sensibles et privées** contenues dans vos pages sont susceptibles d'être recueillies pour identifier les éléments qui ont fait l'objet d'une interaction.
- Le check `window.DD_RUM` est utilisé pour éviter tout problème si le chargement du SDK RUM échoue.

### TypeScript

Les types sont compatibles avec TypeScript >= 3.0. Pour les versions antérieures, importez les sources JS et utilisez des variables globales pour éviter tout problème de compilation :

```javascript
import '@datadog/browser-rum/bundle/datadog-rum'

window.DD_RUM.init({
  applicationId: 'XXX',
  clientToken: 'XXX',
  site: 'datadoghq.com',
  resourceSampleRate: 100,
  sampleRate: 100,
})
```

## Configuration

### Paramètres de lancement

Les paramètres suivants sont disponibles :

| Paramètre               | Type    | Obligatoire | Valeur par défaut         | Description                                                                                              |
| ----------------------- | ------- | -------- | --------------- | -------------------------------------------------------------------------------------------------------- |
| `applicationId`         | Chaîne  | Oui      |                 | L'ID d'application RUM.                                                                                  |
| `clientToken`           | Chaîne  | Oui      |                 | Un [token client Datadog][5].                                                                             |
| `site`                  | Chaîne  | Oui      | `datadoghq.com` | Le site Datadog associé à votre organisation. Site américain : `datadoghq.com`. Site européen : `datadoghq.eu`.                           |
| `service`               | Chaîne  | Non       |                 | Le nom du service de votre application.                                                                   |
| `env`                   | Chaîne  | Non       |                 | L'environnement de l'application, par exemple : prod, pre-prod, staging, etc.                                |
| `version`               | Chaîne  | Non       |                 | La version de l'application, par exemple : 1.2.3, 6c44da20, 2020.02.13, etc.                                |
| `trackInteractions`     | Booléen | Non       | `false`         | Active la [collecte automatique des actions des utilisateurs][6].                                                      |
| `resourceSampleRate`    | Nombre  | Non       | `100`           | Le pourcentage de sessions à surveiller (avec collecte des ressources). Choisissez une valeur entre `100` (toutes les sessions) et `0` (aucune session).               |
| `sampleRate`            | Nombre  | Non       | `100`           | Le pourcentage de sessions à surveiller. Choisissez une valeur entre `100` (toutes les sessions) et `0` (aucune session). Seules les sessions surveillées envoient des événements RUM. |
| `silentMultipleInit`    | Booléen | Non       | `false`         | L'initialisation échoue sans envoyer d'alerte si la fonction RUM de Datadog est déjà initialisée sur la page.                       |
| `proxyHost`             | Chaîne  | Non       |                 | Host de proxy facultatif (ex : www.proxy.com). Consultez le [guide de configuration d'un proxy][7] complet pour en savoir plus.       |
| `allowedTracingOrigins` | Liste    | Non       |                 | La liste des origines de la requête utilisée pour injecter les en-têtes de tracing.                                                |

Options qui doivent avoir une configuration correspondante lors de l'utilisation simultanée du SDK `logs` :

| Paramètre                      | Type    | Obligatoire | Valeur par défaut | Description                                                                                                                                                 |
| ------------------------------ | ------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trackSessionAcrossSubdomains` | Booléen | Non       | `false` | Préserver la session pour tous les sous-domaines d'un même site.                                                                                                   |
| `useSecureSessionCookie`       | Booléen | Non       | `false` | Utiliser un cookie de session sécurisé. Ce paramètre désactive les événements RUM envoyés via des connexions non sécurisées (connexions non HTTPS).                                                             |
| `useCrossSiteSessionCookie`    | Booléen | Non       | `false` | Utiliser un cookie de session intersite sécurisé. Cela permet d'exécuter le SDK RUM lorsque le site est chargé à partir d'un autre site (iframe). Implique l'utilisation de `useSecureSessionCookie`. |

#### Exemple

Init doit être appelé pour commencer le suivi :

```
init(configuration: {
    applicationId: string,
    clientToken: string,
    site?: string,
    resourceSampleRate?: number
    sampleRate?: number,
    silentMultipleInit?: boolean,
    trackInteractions?: boolean,
    service?: string,
    env?: string,
    version?: string,
    allowedTracingOrigins?: Array<String|Regexp>,
    trackSessionAcrossSubdomains?: boolean,
    useSecureSessionCookie?: boolean,
    useCrossSiteSessionCookie?: boolean,
})
```

[1]: https://app.datadoghq.com/rum/list
[2]: https://docs.datadoghq.com/fr/real_user_monitoring/data_collected/
[3]: https://docs.datadoghq.com/fr/real_user_monitoring/dashboards/
[4]: https://www.npmjs.com/package/@datadog/browser-rum
[5]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#client-tokens
[6]: https://docs.datadoghq.com/fr/real_user_monitoring/data_collected/user_action/#automatic-collection-of-user-actions
[7]: https://docs.datadoghq.com/fr/real_user_monitoring/faq/proxy_rum_data/
