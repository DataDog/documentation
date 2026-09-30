---
aliases:
- /fr/internal_developer_portal/plugins/
description: Créez et déployez des applications personnalisées localement à l'aide
  d'un workflow de développement basé sur le code avec React, des fonctions backend
  et une CLI.
further_reading:
- link: https://www.datadoghq.com/blog/internal-applications-datadog-apps/
  tag: Blog
  text: Déployez des applications internes depuis votre Agent IA avec Datadog Apps
- link: https://www.youtube.com/watch?v=HEDjpMyqkSE
  tag: Vidéo
  text: Démo de Datadog Apps
- link: /actions/app_builder/
  tag: Documentation
  text: App Builder
- link: /actions/app_builder/embedded_apps/
  tag: Documentation
  text: Applications intégrées
- link: /actions/app_builder/access_and_auth/
  tag: Documentation
  text: Accès et authentification
title: Apps
---
{{< callout url="https://www.datadoghq.com/product-preview/apps/" btn_hidden="false" header="Rejoignez la Preview !">}}
Datadog Apps est en version préliminaire. Utilisez ce formulaire pour demander l'accès.
{{< /callout >}}

## Présentation {#overview}

Avec les Apps, vous créez des applications localement sous forme de code avec React et TypeScript (ou JavaScript), en utilisant votre workflow de développement standard.

Les Apps utilisent le même [modèle d'autorisations][1] que les [applications App Builder][2]. Vous pouvez également les intégrer dans d'autres produits Datadog, tels que les [dashboards et l'Internal Developer Portal][3].

Choisissez les Apps lorsque vous avez besoin :

- **Collaboration d'équipe** : plusieurs ingénieurs contribuant à la même application, avec revue de code et historique des versions via votre système de contrôle de version existant.
- **Contrôle de version et CI/CD** : stockez votre application dans GitHub et déployez-la automatiquement lors de la fusion.
- **Développement assisté par IA** : utilisez vos outils locaux préférés (tels que Cursor, GitHub Copilot ou Claude) pour générer et affiner le code.
- **Fournisseurs cloud et API personnalisés** : intégrez des services au-delà du [Action Catalog][4] en utilisant votre propre code backend.
- **Interface utilisateur et logique complexes** : contrôle total via React et TypeScript sur les composants, l'état et le rendu.

## Prérequis {#prerequisites}

- **Node.js version 20.12.0 ou ultérieure**. Vérifiez votre version :
  ```shell
  node --version
  ```
- Optionnel : une **clé d'API** Datadog et une **clé d'application** avec [Actions API Access][5] activé. Requis pour la télémétrie de build basée sur une clé d'API (métriques de build et téléchargements de sourcemaps d'Error Tracking) et pour les téléchargements CI/CD. Pour obtenir des instructions, consultez [API and Application Keys][6].

  Pour activer l'accès à l'API Actions sur une clé d'application :

  1. Accédez à [**Paramètres de l'organisation > Clés d'application**][7].
  1. Sélectionnez votre clé d'application.
  1. Activez **l'accès à l'API Actions**.

## Échafauder une application {#scaffold-an-app}

1. Exécutez la commande d'échafaudage pour créer une application :
   ```shell
   npm create @datadog/apps@latest
   ```
2. Suivez les invites interactives pour configurer le nom et le modèle de votre application.

### Structure d'application générée {#generated-app-structure}

Le projet échafaudé comprend :

| Fichier ou répertoire | Description |
|---|---|
| `src/App.tsx` | Composant d'interface utilisateur racine (React) |
| `src/**/*.backend.ts` | Fonctions backend qui s'exécutent côté serveur avec accès aux [connexions Datadog][8] |
| `vite.config.ts` | Configuration de build avec [`@datadog/vite-plugin`][9] préconfigurée |
| `package.json` | Dépendances et scripts (`dev`, `build`, `upload`) |

## Utilisez la `datadog-app` skill {#use-the-datadog-app-skill}

La [`datadog-app` agent skill][20] fournit aux agents de codage IA des conseils sur les flux de travail des applications Datadog, notamment l'échafaudage, le développement local, les téléchargements, la publication, l'intégration et le déploiement continus (CI/CD), le dépannage, DDSQL et l'utilisation de l'Action Catalog. La skill est disponible dans le [dépôt GitHub agent-skills][21].

### Installation{#install}

```shell
npx skills add datadog-labs/agent-skills \
  --skill datadog-app \
  --full-depth -y
```

L'interface de ligne de commande `skills` prend en charge Claude Code, Codex, Cursor, Gemini CLI, OpenCode et d'autres agents de codage. Pour cibler un agent spécifique, consultez la [documentation de la CLI skills][22]. Si la skill n'apparaît pas après l'installation, redémarrez votre agent de codage.

### Exemples de prompts {#example-prompts}

- `Scaffold a Datadog App called my-app.`
- `Run this Datadog App locally.`
- `Upload and publish this Datadog App.`
- `Set up CI/CD for this Datadog App.`
- `Troubleshoot this Datadog App authentication error.`
- `Add a table component to this Datadog App using Druids.`

## Développez votre application localement {#develop-your-app-locally}

1. Démarrez le serveur de développement :
   ```shell
   npm run dev
   ```
2. Ouvrez l'URL affichée dans le terminal (par exemple, `http://localhost:5173/`) pour prévisualiser votre application.

Lorsque le serveur de développement doit appeler Datadog, par exemple lors de l'exécution d'une fonction backend localement, il utilise OAuth par défaut. Si une autorisation est requise, la commande ouvre une invite de navigateur. Une fois l'autorisation terminée, le jeton est mis en cache dans le magasin d'informations d'identification de votre système d'exploitation.

Si vous définissez à la fois `DD_API_KEY` et `DD_APP_KEY`, l'application générée utilise ces clés au lieu d'OAuth.

### Fonctions backend {#backend-functions}

Les fichiers correspondant à `*.backend.ts` ou `*.backend.js` contiennent des fonctions backend. Les fonctions backend s'exécutent côté serveur avec un accès à vos [connections][8]. Le frontend les importe et les appelle comme des modules ES standard.

Les fonctions backend peuvent appeler n'importe quelle action dans l'[Action Catalog][4] de Datadog via la bibliothèque [`@datadog/action-catalog`][10]. L'Action Catalog fournit des actions réutilisables et prédéfinies pour interagir avec les fournisseurs cloud, les outils SaaS et la Datadog API. Vous pouvez vous appuyer sur des intégrations existantes au lieu d'écrire des clients API à partir de zéro.

La bibliothèque est un client TypeScript entièrement typé qui enveloppe les intégrations, notamment AWS, Azure, GCP, la Datadog API, GitHub, GitLab, Slack, Jira, PagerDuty, ServiceNow, OpenAI, Anthropic et HTTP générique. L'importation d'actions depuis `@datadog/action-catalog` vous donne des entrées et des réponses typées pour chaque action.

Vous pouvez consulter les utilitaires backend via le package [@datadog/apps-backend][24]. Utilisez les utilitaires pour faciliter les actions courantes telles que la récupération des informations de l'utilisateur appelant.

   ```
import { getInitiatingUser, type User } from '@datadog/apps-backend/user';

export async function getCurrentUser(): Promise<User> {
    return getInitiatingUser();
}
   ```

{{% collapse-content title="Exemple de fonction backend" level="h4" expanded=false %}}

Créez une fonction backend qui liste les hosts via l'Action Catalog :

**src/listHosts.backend.ts**

```typescript
import { listHosts, type ListHostsResponse } from '@datadog/action-catalog/dd/hosts';

export async function getHosts(filter?: string): Promise<ListHostsResponse> {
    const response = await listHosts({
        inputs: {
            filter: filter ?? '*',
            count: 10,
            include_hosts_metadata: true,
        },
    });
    return response;
}
```

Appelez-la ensuite depuis le `App.tsx` de votre application :

**src/App.tsx**

```tsx
import { useState, useEffect } from 'react';
import { getHosts } from './listHosts.backend';

function App() {
    const [hostCount, setHostCount] = useState<number>(0);

    useEffect(() => {
        getHosts().then((response) => {
            setHostCount(response.host_list?.length ?? 0);
        });
    }, []);

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1>Welcome to my-app</h1>
            <p>Monitoring {hostCount} hosts</p>
        </div>
    );
}

export default App;
```
{{% /collapse-content %}}

### Composants d'interface utilisateur {#ui-components}

Utilisez [`@datadog/druids`][23] pour construire l'interface utilisateur de votre application avec les mêmes composants React que ceux utilisés dans les produits Datadog, tels que les tableaux, les boutons, les graphiques et les formulaires. Construire avec Druids aide votre application à correspondre à l'apparence du reste de Datadog.

Installez la bibliothèque :

```shell
npm install @datadog/druids
```

Importez les composants de la même manière que vous importez n'importe quel composant React :

```tsx
import { Button } from '@datadog/druids';
```

Druids nécessite React 18 ou 19 en tant que dépendance de pair. Consultez l'ensemble des composants disponibles dans le [package sur npm][23].

<div class="alert alert-info">
Les composants Druids sont destinés à être utilisés uniquement dans les applications Datadog et App Builder. Consultez la licence du package pour plus de détails.
</div>

## Construisez et téléchargez votre application {#build-and-upload-your-app}

Utilisez `npm run build` pour construire l'application localement sans la télécharger. C'est la valeur par défaut recommandée pour le développement local, où vous ne souhaitez généralement pas télécharger chaque build.

Utilisez `npm run upload` pour construire et télécharger l'application sur Datadog. Ceci exécute `vite build` avec `DD_APPS_UPLOAD_ASSETS=1`.

```shell
npm run upload
```

Les téléchargements utilisent OAuth par défaut et peuvent ouvrir un flux d'autorisation dans le navigateur la première fois. Si vous définissez à la fois `DD_API_KEY` et `DD_APP_KEY`, les téléchargements utilisent l'authentification par clé d'API et clé d'application à la place.

Les variables d'environnement suivantes sont disponibles :

| Variable | Description |
|---|---|
| `DD_API_KEY` | Optionnel. Clé d'API Datadog utilisée avec `DD_APP_KEY` pour le développement local et les téléchargements. Active également la télémétrie de build basée sur la clé d'API, telle que les métriques de build et les téléchargements de sourcemaps Error Tracking. |
| `DD_APP_KEY` | Optionnel. Clé d'application utilisée avec `DD_API_KEY` pour le développement local et les téléchargements. |
| `DD_APPS_AUTH_METHOD` | Optionnel. Définissez sur `oauth` ou `apiKey` pour remplacer la méthode d'authentification de l'application générée. |
| `DD_APPS_VERSION_NAME` | Optionnel. Le nom de version pour la version de l'application téléchargée. Doit être une chaîne unique par application. Si elle n'est pas définie, Datadog attribue un nom de version. |
| `DD_APPS_UPLOAD_ASSETS` | Si définie, télécharge les ressources générées vers Datadog. Défini automatiquement par `npm run upload`. |

Pour les déploiements en production, [configurez l'intégration et le déploiement continus (CI/CD) avec GitHub Actions](#set-up-cicd-with-github-actions). [`DataDog/apps-github-action`][11] gère l'étape de téléchargement pour vous.

Après un téléchargement réussi, la sortie de build affiche une URL où votre application est accessible dans Datadog.

## Publiez et gérez vos applications {#publish-and-manage-your-apps}

Après avoir téléchargé une application, elle apparaît dans votre liste d'applications [App Builder][12]. Depuis App Builder, vous pouvez :

- [Publiez votre application][13]
- [Modifier le nom et la description de l'application][13]
- Gérer les [autorisations][14]
- [Intégrer l'application][3] dans les dashboards, les notebooks et l'Internal Developer Portal

<div class="alert alert-danger">
Les fonctionnalités suivantes d'App Builder ne sont pas disponibles pour les applications créées localement :
<ul>
<li>Édition de l'interface utilisateur avec des composants glisser-déposer</li>
<li>Variables, événements et expressions gérés dans l'interface utilisateur d'App Builder</li>
</ul>
Pour modifier l'interface utilisateur ou la logique d'une application, mettez à jour le code dans votre projet local et téléversez-le à nouveau.
</div>

## Configurer CI/CD avec GitHub Actions {#set-up-cicd-with-github-actions}

Pour téléverser automatiquement votre application à chaque push sur la branche `main`, utilisez l'action GitHub [`DataDog/apps-github-action`][11]. Cette action compile votre application et la téléverse sur Datadog.

Les téléversements CI/CD nécessitent une authentification par clé d'API et d'application. Créez une clé d'API Datadog et une clé d'application avec [Actions API Access][5] activé, puis stockez-les en tant que secrets GitHub.

Si votre organisation n'est pas sur US1 (`datadoghq.com`), définissez `auth.site` dans `vite.config.ts` sur votre [site Datadog][15]. La compilation lit cette configuration lors du téléversement de l'application, donc le même paramètre s'applique également au développement local. Votre site Datadog est `{{< region-param key="dd_site" >}}`.

{{< site-region region="us3,us5,eu,ap1,ap2,uk1" >}}

```ts
datadogVitePlugin({
  auth: {
    site: '<YOUR_DATADOG_SITE>',
  },
});
```
{{< /site-region >}}

Créez `.github/workflows/cd.yml` dans le référentiel de votre application :

```yaml
name: Continuous Deployment
on:
  push:
    branches:
      - main

permissions:
  contents: read

jobs:
  deploy-app:
    name: Deploy Datadog App
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write

    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Setup Node.js
        uses: actions/setup-node@v6

      - name: Deploy
        uses: DataDog/apps-github-action@v0.0.2
        with:
          datadog-api-key: ${{ secrets.DATADOG_API_KEY }}
          datadog-app-key: ${{ secrets.DATADOG_APP_KEY }}
          app-directory: .
```

## Dépannage {#troubleshooting}

### Erreurs d'authentification {#authentication-errors}

Pour le développement local et les téléversements, les erreurs d'authentification OAuth peuvent avoir l'une des causes suivantes :

- Le flux de navigateur OAuth ne s'est pas terminé.
- Le jeton OAuth mis en cache est invalide.
- `auth.site` ne correspond pas à votre site Datadog.

Relancez la commande et terminez le flux d'autorisation du navigateur.

Si vous utilisez l'authentification par clé d'API et d'application, les erreurs d'authentification indiquent généralement des identifiants manquants ou invalides. Les échecs d'appel de fonction backend peuvent avoir la même cause. Vérifiez que `DD_API_KEY` et `DD_APP_KEY` sont définis, et que la clé d'application a [Actions API Access][5] activé.

### La build réussit mais rien n'est téléversé {#build-succeeds-but-nothing-uploads}

Assurez-vous d'avoir exécuté `npm run upload` (pas `npm run build`), et que `dryRun` dans `vite.config.ts` n'est pas défini sur `true`.

### Erreurs de version Node.js pendant le scaffolding {#nodejs-version-errors-during-scaffolding}

L'outil de scaffolding nécessite Node.js 20.12.0 ou une version ultérieure. Si vous voyez des erreurs même sur une version prise en charge, passez à la v22. Utilisez un gestionnaire de version tel que [nvm][16], [Volta][17] ou [fnm][18], ou téléchargez-la depuis le [site web de Node.js][19].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/actions/app_builder/access_and_auth/
[2]: /fr/actions/app_builder/
[3]: /fr/actions/app_builder/embedded_apps/
[4]: /fr/actions/actions_catalog/
[5]: /fr/account_management/api-app-keys/#actions-api-access
[6]: /fr/account_management/api-app-keys/
[7]: https://app.datadoghq.com/organization-settings/application-keys
[8]: /fr/actions/connections/
[9]: https://github.com/DataDog/build-plugin
[10]: https://www.npmjs.com/package/@datadog/action-catalog
[11]: https://github.com/DataDog/apps-github-action
[12]: https://app.datadoghq.com/app-builder/apps/list
[13]: /fr/actions/app_builder/build/#customize-your-app
[14]: /fr/actions/app_builder/access_and_auth/#app-permissions
[15]: /fr/getting_started/site/
[16]: https://github.com/nvm-sh/nvm
[17]: https://volta.sh
[18]: https://github.com/Schniz/fnm
[19]: https://nodejs.org
[20]: https://github.com/datadog-labs/agent-skills/tree/main/dd-apps/datadog-app
[21]: https://github.com/datadog-labs/agent-skills/blob/main/README.md
[22]: https://github.com/vercel-labs/skills
[23]: https://www.npmjs.com/package/@datadog/druids
[24]: https://www.npmjs.com/package/@datadog/apps-backend