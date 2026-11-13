---
description: Parcourez vos feature flags et surchargez-les localement dans votre navigateur
  avec l'extension développeur du Datadog Browser SDK.
further_reading:
- link: /feature_flags/client/javascript/
  tag: Documentation
  text: Feature Flags JavaScript
- link: /feature_flags/implementation_patterns/local_flag_overrides/
  tag: Documentation
  text: Surcharges locales de feature flags avec le modèle multi-fournisseur
- link: /feature_flags/concepts/variants_and_flag_types/
  tag: Documentation
  text: Variantes et types de Feature Flags
title: Extension de développement pour navigateur
---
## Présentation {#overview}

L'[extension développeur du SDK Browser Datadog][1] pour Chrome inclut un onglet **Feature Flags**. L'onglet répertorie les feature flags de votre organisation et vous permet de les surcharger localement dans votre navigateur. Utilisez-le pour voir comment votre application se comporte avec différentes valeurs de feature flag, sans modifier la configuration des feature flags dans Datadog.

Les surcharges s'appliquent uniquement à votre navigateur. Ils ne sont jamais envoyés à Datadog et n'affectent pas les autres utilisateurs.

{{< img src="feature_flags/devtools_extension/flags-tab-overview.png" alt="L'onglet Feature Flags affichant l'en-tête Feature Flag Overrides, un badge Connected pour US1, la ligne de filtre et une liste de feature flags avec des boutons de variante." style="width:100%;" >}}

L'extension inclut d'autres onglets pour inspecter le comportement du SDK Browser. Cette page couvre l'onglet **Feature Flags**.

## Prérequis {#prerequisites}

Avant de commencer, vous avez besoin de :

- Google Chrome.
- Accès aux feature flags dans une organisation Datadog sur un [site Datadog][2] commercial : US1 (`datadoghq.com`), US3 (`us3.datadoghq.com`), US5 (`us5.datadoghq.com`), EU1 (`datadoghq.eu`), AP1 (`ap1.datadoghq.com`) ou AP2 (`ap2.datadoghq.com`). Les sites Datadog for Government ne sont pas pris en charge.
- Une application web instrumentée avec le [SDK Datadog Feature Flags pour JavaScript][3].
- Le wrapper `DatadogDevtools` intégré à votre pile de fournisseurs OpenFeature. Consultez [Ajouter le wrapper DatadogDevtools](#add-the-datadogdevtools-wrapper).

## Installer l'extension {#install-the-extension}

Installez l'[extension développeur du SDK Browser Datadog][1] depuis le Chrome Web Store.

## Ajouter le wrapper DatadogDevtools {#add-the-datadogdevtools-wrapper}

`DatadogDevtools` est un fournisseur OpenFeature qui enveloppe un autre fournisseur. Il lit les surcharges définies par l'extension, les renvoie pour les clés de feature flag correspondantes et délègue toute autre évaluation au fournisseur qu'il enveloppe. Sans lui, l'onglet affiche une notification **DatadogDevtools non détecté**. Vous pouvez toujours définir des surcharges, mais elles ne s'appliquent pas tant que le wrapper n'est pas en place.

Importez `DatadogDevtools` depuis `@datadog/openfeature-browser`, transmettez-lui votre fournisseur et enregistrez le wrapper via l'API OpenFeature :

{{< code-block lang="javascript" >}}
import { DatadogProvider, DatadogDevtools } from '@datadog/openfeature-browser';
import { OpenFeature } from '@openfeature/web-sdk';

const provider = new DatadogProvider({
  applicationId: '<APPLICATION_ID>',
  clientToken: '<CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  env: '<ENV_NAME>',
});

await OpenFeature.setProviderAndWait(new DatadogDevtools(provider));
{{< /code-block >}}

Définissez `site` sur le [site Datadog][2] que votre organisation utilise. Utilisez le même site que celui que vous sélectionnez dans le menu déroulant de l'extension. S'ils diffèrent, vous parcourez et sélectionnez des variantes dans le catalogue de feature flags d'une organisation alors que votre application résout les feature flags selon le catalogue d'une organisation différente.

Le wrapper accepte n'importe quel fournisseur OpenFeature, vous pouvez donc également l'utiliser sur un `InMemoryProvider` dans une build de développement local. Si votre application enregistre des fournisseurs pour plusieurs domaines, enveloppez chacun d'eux.

<div class="alert alert-warning">Les surcharges locales contournent votre configuration de feature flags dans Datadog, et toute personne pouvant écrire dans le stockage du navigateur peut les définir. Restreignez le wrapper aux builds hors production afin que les utilisateurs finaux ne puissent pas modifier le comportement des flags dans votre application de production.</div>

### Confirmez qu'une surcharge a été appliquée {#confirm-that-an-override-applied}

`DatadogDevtools` lit les surcharges une fois, lors de l'initialisation du fournisseur. Évaluez le flag avec une méthode de détails pour voir d'où provient la valeur : un flag surchargé se résout avec un `reason` de `STATIC` et `flagMetadata.overridden` défini sur `true`.

{{< code-block lang="javascript" >}}
const client = OpenFeature.getClient();
const details = client.getBooleanDetails('<FLAG_KEY>', false);

console.log(details.value, details.reason, details.flagMetadata.overridden);
{{< /code-block >}}

Une surcharge dont la valeur ne correspond pas à son type déclaré est ignorée lorsque le wrapper la lit lors de l'initialisation, et le wrapper consigne un avertissement dans la console du navigateur. Les surcharges d'entiers doivent être des nombres entiers.

## Ouvrez l'onglet Feature Flags {#open-the-feature-flags-tab}

1. Ouvrez votre application dans Chrome.
2. Ouvrez les outils de développement Chrome (`Cmd+Opt+I` sur Mac, `F12` sur Windows ou Linux).
3. Sélectionnez le panneau **Browser SDK**. Si vous ne le voyez pas, sélectionnez le menu de débordement (`»`) dans la barre d'onglets des DevTools.
4. Sélectionnez l'onglet **Feature Flags**.
5. Sélectionnez votre site Datadog dans la liste déroulante avant de vous connecter. Votre sélection de site détermine l'organisation Datadog dont proviennent la connexion et la liste des flags. Cliquez ensuite sur **Sign in to Datadog**.

{{< img src="feature_flags/devtools_extension/flags-tab-connect.png" alt="L'écran de connexion de l'onglet Feature Flags, montrant la liste déroulante du site Datadog réglée sur US1 et le bouton Sign in to Datadog." style="width:100%;" >}}

Vos identifiants sont stockés pour la session de navigation et sont effacés à la fin de la session. Pour vous déconnecter et révoquer la session, cliquez sur **Disconnect**. Vous pouvez également révoquer l'accès de l'extension dans Datadog sous **Organization Settings > Authorized Applications**.

## Parcourir et filtrer les flags {#browse-and-filter-flags}

L'onglet affiche un en-tête **Feature Flag Overrides** et un badge confirmant le site Datadog auquel vous êtes connecté. Au-dessus de la liste se trouve un nombre de flags à votre disposition. Chaque flag affiche son nom, sa clé, sa description et des boutons de variante.

Pour restreindre la liste, utilisez la ligne de filtre :

| Filtrer | Description |
| --- | --- |
| **Filtrer vos feature flags** | Faites correspondre un nom de flag, une clé ou un tag. |
| **Mes Feature Flags** | Afficher uniquement les flags que vous avez créés. |
| **Mes équipes** | Afficher uniquement les flags tagués pour les équipes auxquelles vous appartenez. |
| **Type** | Afficher uniquement les flags de type Boolean, String, Integer, Number ou JSON. |
| **Tags** | Afficher uniquement les flags avec un ou plusieurs tags sélectionnés. |

## Surcharger un flag {#override-a-flag}

Pour surcharger un flag de la liste, cliquez sur l'un de ses boutons de variante.

Pour définir une valeur qui n'est pas définie comme variante, développez **Ajouter une surcharge personnalisée**. Saisissez la clé du feature flag, sélectionnez le type de valeur et saisissez la valeur. Si vous appliquez une clé qui possède déjà une surcharge, la valeur existante est remplacée. Une valeur qui ne correspond pas au type du feature flag est rejetée dans l'interface utilisateur de l'extension avant d'être enregistrée.

Les feature flags surchargés sont déplacés dans une section **Surcharges locales** mise en évidence en haut de la liste, qui indique combien sont actives. La variante sélectionnée est mise en évidence et chaque ligne dispose d'une commande de rétablissement pour supprimer cette surcharge individuelle. Pour supprimer des surcharges en masse, cliquez sur **Effacer tout** en bas de l'onglet. Voir [Effacer toutes les surcharges](#clear-all-overrides).

Une ligne de surcharge peut également comporter un avertissement :

| Avertissement | Description |
| --- | --- |
| Ligne surlignée en rouge | Le type de la surcharge stockée ne correspond pas au type du feature flag, la surcharge ne s'applique donc pas. Les surcharges dont le type ne correspond pas sont ignorées lors de l'initialisation du fournisseur et consignées sous forme d'avertissement dans la console du navigateur ; l'onglet signale l'incohérence avant que vous ne rechargiez la page. |
| Note grisée sous la clé du feature flag | Le feature flag ne figure plus dans le catalogue de feature flags de votre organisation, car il a été archivé ou supprimé après la définition de la surcharge. La surcharge est toujours résolue. La note est informative. |

{{< img src="feature_flags/devtools_extension/flags-tab-local-overrides.png" alt="L'onglet Feature Flags avec deux surcharges actives mises en évidence dans une section Surcharges locales en haut de la liste, au-dessus des boutons Clear all et Refresh Page." style="width:100%;" >}}

## Appliquer des surcharges à votre application {#apply-overrides-to-your-application}

Les surcharges sont enregistrées dès que vous les définissez, mais `DatadogDevtools` les lit une fois, lors de l'initialisation de votre fournisseur. Définir ou annuler une surcharge n'a aucun effet sur la page en cours d'exécution. Cliquez sur **Actualiser la page** en bas de l'onglet pour recharger afin que les nouvelles valeurs prennent effet.

## Gérer les surcharges {#manage-overrides}

Les surcharges persistent indépendamment de votre connexion Datadog. Se déconnecter, fermer les outils de développement et redémarrer votre navigateur les laissent en place. Lorsqu'une page comporte des surcharges et que vous êtes déconnecté, l'écran de connexion indique combien de surcharges sont stockées pour la page. Il propose également **Effacer tout**, afin que vous puissiez les supprimer sans vous connecter.

Annulez des surcharges individuelles ou cliquez sur **Effacer tout** lorsque vous avez terminé les tests, puis actualisez la page afin que votre application résolve à nouveau les feature flags depuis Datadog.

### Les surcharges sont limitées à un site Datadog {#overrides-are-scoped-to-a-datadog-site}

Les surcharges sont stockées séparément pour chaque site Datadog. Une surcharge que vous définissez alors que vous êtes connecté à un site ne s'applique pas lorsque vous êtes connecté à un autre.

La sélection d’un site différent dans le menu déroulant modifie les overrides qui s’appliquent. L'onglet affiche une bannière **Recharger pour appliquer `<SITE>`les overrides de** : la page continue d'utiliser les overrides avec lesquels elle a été chargée jusqu'à ce que vous la rechargiez. La sélection du site d'origine restaure les overrides de ce site. Le changement de site ne supprime aucun override.

### Effacer tous les overrides {#clear-all-overrides}

**Effacer tout** supprime les overrides en bloc et vous demande d'abord de confirmer. Ce qui est supprimé dépend de si vous êtes connecté ou non :

| État | Portée |
| --- | --- |
| Connecté | Supprime uniquement les overrides pour le site connecté. Les overrides des autres sites sont conservées. |
| Déconnecté | Supprime les overrides de chaque site, car aucun site connecté ne permet de limiter l'action. Le message de confirmation l'indique. |

Une fois les overrides effacés, l'onglet vous invite à recharger. La page continue d'appliquer les overrides effacés tant que vous ne le faites pas.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://chromewebstore.google.com/detail/datadog-browser-sdk-devel/boceobohkgenpcpogecpjlnmnfbdigda
[2]: /fr/getting_started/site/
[3]: /fr/feature_flags/client/javascript/