---
description: Intégrez une application Datadog publiée dans les dashboards, les notebooks,
  la page d'accueil de l'Internal Developer Portal et le panneau latéral du catalogue.
further_reading:
- link: /actions/datadog_apps/
  tag: Documentation
  text: Apps Datadog
- link: /actions/app_builder/embedded_apps/
  tag: Documentation
  text: Intégrez des applications App Builder
- link: https://www.npmjs.com/package/@datadog/apps-frontend
  tag: Site externe
  text: package @datadog/apps-frontend sur npm
title: Intégrez des applications
---
{{< callout url="https://www.datadoghq.com/product-preview/apps/" btn_hidden="false" header="Rejoignez la Preview !">}}
Datadog Apps est en version préliminaire. Utilisez ce formulaire pour demander l'accès.
{{< /callout >}}

Intégrez [Datadog Apps][1] dans d'autres produits Datadog pour placer des outils opérationnels directement dans les surfaces où les utilisateurs étudient les problèmes et prennent des mesures. Une application intégrée peut afficher son expérience existante ou répondre au contexte en direct fourni par son host, comme la plage temporelle et les variables de modèle d'un dashboard.

## Prérequis {#prerequisites}

- Une application Datadog créée, importée et publiée
- Autorisation d'utiliser l'application et de modifier la surface de destination

Pour plus d'informations sur la création, l'importation et la publication d'une application, consultez [Datadog Apps][1].

## Intégrez une application {#embed-an-app}

<div class="alert alert-info">Vous pouvez intégrer une application uniquement dans l'interface utilisateur Datadog. Les agents IA ne peuvent pas intégrer d'applications.</div>

Une fois que vous avez importé et publié une application, vous pouvez l'ajouter à une surface Datadog prise en charge sans modifier l'application.

Vous pouvez intégrer une application depuis l'application elle-même ou depuis la surface où vous souhaitez qu'elle apparaisse.

### Intégrer depuis l'application {#embed-from-the-app}

1. Dans la [liste des applications][2], ouvrez l'application publiée que vous souhaitez intégrer.
1. En haut de la page, cliquez sur **+ Add to Dashboard**, ou cliquez sur la flèche vers le bas à côté et sélectionnez un type de destination dans le menu.
1. Sélectionnez la destination, puis cliquez sur **Save**.

### Intégrer depuis la destination {#embed-from-the-destination}

{{< tabs >}}
{{% tab "Dashboard" %}}

1. Ouvrez le dashboard où vous souhaitez ajouter l'application.
1. Dans le tiroir de widgets, recherchez le widget **Apps** sous **Actions and Remediations**, et faites-le glisser sur le dashboard.
1. Dans l'éditeur, choisissez l'application dans la liste déroulante **Select app**. Pour limiter la liste aux applications que vous possédez, activez **My Apps Only**.
1. Redimensionnez le widget, puis enregistrez le dashboard.

{{% /tab %}}
{{% tab "Notebook" %}}

1. Ouvrez le notebook dans lequel vous souhaitez ajouter l'application.
1. Ajoutez une cellule et sélectionnez le type de cellule **Apps**.
1. Choisissez l'application dans la liste déroulante.
1. Enregistrez le notebook.

La cellule **Apps** utilise la plage temporelle du notebook. Pour lire la plage temporelle dans l'application, utilisez l'entrée `datadogNotebook`.

{{% /tab %}}
{{% tab "Catalog" %}}

1. Accédez à [Catalog][1] et sélectionnez un service.
1. Dans le panneau latéral du service, sélectionnez l'onglet **+ Add App**.
1. Choisissez l'application dans la liste déroulante. Pour limiter la liste aux applications que vous possédez, activez **My Apps Only**.

[1]: https://app.datadoghq.com/services

{{% /tab %}}
{{< /tabs >}}

Une fois l'application intégrée, vous pouvez éventuellement [configurer l'application](#customize-the-embedded-experience) pour qu'elle réponde au contexte, au thème ou à l'état du lien partagé de son host. Ensuite, [vérifiez-la](#verify-the-app). Une application intégrée affiche la version la plus récemment publiée. Publiez donc vos modifications avant de procéder à l'intégration.

## Personnalisez l'expérience intégrée {#customize-the-embedded-experience}

Si ce n'est pas déjà fait, installez le package [`@datadog/apps-frontend`][3] dans l'application :

```shell
npm install @datadog/apps-frontend
```

Pour qu'une application intégrée réponde à son host Datadog, conservez `DatadogAppProvider` à la racine de l'application. Le fournisseur établit la communication avec le host Datadog, rend les entrées du host disponibles pour les hooks et préserve l'état de l'URL de l'application dans les liens Datadog partagés.

```typescript
import { DatadogAppProvider } from '@datadog/apps-frontend/embedding/react';

export function Root() {
  return (
    <DatadogAppProvider>
      <App />
    </DatadogAppProvider>
  );
}
```

L'échafaudage standard des Datadog Apps inclut ce fournisseur par défaut. Chaque hook `@datadog/apps-frontend` doit être rendu en dessous, alors conservez le fournisseur en place lorsque vous restructurez l'application.

### Lire les entrées du host {#read-host-inputs}

Les entrées du host sont des valeurs et des fonctions fournies par le produit Datadog contenant l'application. Par exemple, un dashboard peut fournir sa plage horaire actuelle et ses variables de modèle, tandis que le panneau latéral du catalogue peut fournir le service qu'il affiche.

Les valeurs du host se mettent à jour automatiquement lorsque le contexte du produit environnant change.

Importez `useDatadogAppInput` et le schéma d'entrée pour la surface de produit pertinente :

```typescript
import { useDatadogAppInput } from '@datadog/apps-frontend/inputs/react';
import {
  datadogDashboard,
  datadogIdp,
  datadogNotebook,
  datadogServicePanel,
  datadogTheme,
} from '@datadog/apps-frontend/inputs/schema';
```

Pour les définitions TypeScript complètes, consultez la [`@datadog/apps-frontend` source sur npm][4].

#### États d'entrée {#input-states}

`useDatadogAppInput` renvoie un objet d'état dont le `status` est `pending`, `ready`, `unavailable` ou `failed`. Les valeurs ne sont disponibles dans `fields` que lorsque le statut est `ready`.

`unavailable` est un résultat normal plutôt qu'une erreur. Cela signifie que l'application s'exécute sur une surface qui ne fournit pas cette entrée, comme la lecture de `datadogDashboard` dans un notebook. Affichez une solution de repli pour ce cas.

Exemple :

```typescript
function PanelHeader() {
  const panel = useDatadogAppInput(datadogServicePanel);

  switch (panel.status) {
    case 'pending':
      return <Spinner />;
    case 'unavailable':
      return <p>Open this app from a Catalog side panel.</p>;
    case 'failed':
      return <p>{panel.error.message}</p>;
    case 'ready':
      return (
        <header>
          {panel.fields.service}
          <button onClick={() => panel.fields.close()}>×</button>
        </header>
      );
  }
}
```

### Entrées disponibles {#available-inputs}

{{< tabs >}}
{{% tab "Thème" %}}

Utilisez `datadogTheme` pour répondre au thème actuellement utilisé par le host Datadog.

```typescript
const theme = useDatadogAppInput(datadogTheme);
```

Lorsque le statut est `ready`, `fields` fournit :

```typescript
{
  theme: 'light' | 'dark';
}
```

La valeur est mise à jour lorsque l'utilisateur change le thème Datadog.

Si l'application utilise [DRUIDS][1], vous pouvez utiliser `DruidsEnvironmentWithThemeInput` pour appliquer automatiquement le thème du host :

```typescript
import { DruidsEnvironmentWithThemeInput } from '@datadog/apps-frontend/druids/react';

<DatadogAppProvider>
  <DruidsEnvironmentWithThemeInput defaultThemePreference="light">
    <App />
  </DruidsEnvironmentWithThemeInput>
</DatadogAppProvider>
```

[1]: /fr/actions/datadog_apps/#ui-components

{{% /tab %}}
{{% tab "Dashboard" %}}

Utilisez `datadogDashboard` pour lire la plage horaire actuelle et les variables de modèle d'un dashboard.

```typescript
const dashboard = useDatadogAppInput(datadogDashboard);
```

Lorsque le statut est `ready`, `fields` fournit :

```typescript
{
  dashboard: {
    timeframe: {
      start: number;
      end: number;
      isLive: boolean;
    };
    templateVariables: {
      name: string;
      value: string;
      values?: string[];
      prefix?: string;
      default?: string;
    }[];
  };
}
```

Utilisez la plage horaire pour limiter les requêtes de l'application au dashboard. Utilisez les variables de modèle pour appliquer les mêmes filtres de service, d'environnement, d'équipe ou autres utilisés par le dashboard environnant.

{{% /tab %}}
{{% tab "Notebook" %}}

Utilisez `datadogNotebook` pour lire la plage horaire actuelle et les variables de modèle d'un notebook.

```typescript
const notebook = useDatadogAppInput(datadogNotebook);
```

Lorsque le statut est `ready`, `fields` fournit :

```typescript
{
  notebook: {
    timeframe: {
      start: number;
      end: number;
      isLive: boolean;
    };
    templateVariables: {
      name: string;
      value: string;
      values?: string[];
      availableValues?: string[];
      prefix?: string;
      default?: string;
    }[];
  };
}
```

Utilisez ce contexte pour maintenir l'application synchronisée avec la plage horaire et les filtres appliqués au notebook environnant.

{{% /tab %}}
{{% tab "Page d'accueil de l'IDP" %}}

Utilisez `datadogIdp` pour lire et modifier la position de l'application sur la page d'accueil de l'Internal Developer Portal.

```typescript
const idp = useDatadogAppInput(datadogIdp);
```

Lorsque le statut est `ready`, `fields` fournit :

```typescript
{
  position: number;
  move: (inputs: { delta: number }) => number;
}
```

Utilisez `position` pour lire la position actuelle de l'application sur la page d'accueil. Appelez `move()` pour déplacer l'application d'un certain nombre de positions ; cela renvoie la nouvelle position de l'application.

```typescript
const newPosition = await idp.fields.move({ delta: 1 });
```

{{% /tab %}}
{{% tab "Panneau latéral du catalogue" %}}

Utilisez `datadogServicePanel` pour identifier le service affiché dans le panneau latéral du catalogue.

```typescript
const servicePanel = useDatadogAppInput(datadogServicePanel);
```

Lorsque le statut est `ready`, `fields` fournit :

```typescript
{
  service: string;
  close: () => undefined;
}
```

Utilisez `service` pour limiter le contenu de l'application au service sélectionné. Appelez `close()` lorsqu'une action de l'application doit fermer le panneau latéral.

{{% /tab %}}
{{< /tabs >}}

Ne supposez pas qu'une entrée disponible sur une surface de produit est disponible sur une autre. Demandez uniquement le contexte dont l'application a besoin et offrez une expérience utile lorsque ce contexte est absent.

## Préserver l'état dans les liens partagés {#preserve-state-in-shared-links}

`DatadogAppProvider` conserve la chaîne de requête et le fragment d'URL de l'application dans les liens Datadog partagés. Stockez l'état partageable — tel que les services sélectionnés, les filtres, les enregistrements ou les routes dans l'application — dans l'URL. Lorsqu'un autre utilisateur ouvre le lien partagé, l'application intégrée peut restaurer le même état. Les [liens profonds][5] vers un état d'application spécifique fonctionnent sans configuration supplémentaire, tant que l'application reste encapsulée dans `DatadogAppProvider`.

## Vérifiez l'application {#verify-the-app}

Après avoir intégré l'application, vérifiez les points suivants sur la surface où vous l'avez intégrée :

- **Accès** : ouvrez la surface en tant qu'utilisateur disposant de l'autorisation d'utiliser l'application mais ne l'ayant pas intégrée. L'application s'affiche au lieu d'une erreur d'autorisation.
- **Taille** : redimensionnez l'application à la taille la plus petite que vous attendez des utilisateurs. Le contenu reste lisible, sans dépassement ni coupure.
- **Contexte du host** : modifiez le contexte du host, comme la plage temporelle d'un dashboard ou la valeur d'une variable de modèle, et confirmez que l'application se met à jour. Si l'application affiche son `unavailable` contenu de secours à la place, c'est qu'elle lit une entrée que la surface ne fournit pas.
- **Liens partagés** : modifiez l'état dans l'application, copiez le lien de partage Datadog et ouvrez-le dans une nouvelle session de navigateur. L'application restaure le même état.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/actions/datadog_apps/
[2]: https://app.datadoghq.com/app-builder/apps/list
[3]: https://www.npmjs.com/package/@datadog/apps-frontend
[4]: https://www.npmjs.com/package/@datadog/apps-frontend?activeTab=code
[5]: /fr/actions/datadog_apps/#share-embedded-app-state-with-deep-links