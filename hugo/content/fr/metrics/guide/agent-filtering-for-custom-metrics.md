---
aliases:
- /fr/metrics/guide/agent-filtering-for-dogstatsd-custom-metrics/
description: Filtrez les métriques personnalisées inutilisées au niveau de Datadog
  Agent pour réduire le volume de métriques ingérées et indexées.
further_reading:
- link: /metrics/custom_metrics/
  tag: Documentation
  text: En savoir plus sur métriques personnalisées
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: Documentation
  text: Facturation des métriques personnalisées
- link: /metrics/metrics-without-limits/
  tag: Documentation
  text: Metrics without Limits™
- link: /metrics/volume/
  tag: Documentation
  text: Gestion du volume de métriques
- link: https://www.datadoghq.com/blog/custom-metrics-governance/
  tag: Blog
  text: Bonnes pratiques pour la gouvernance de bout en bout des métriques personnalisées
title: Filtrage côté Agent pour les métriques personnalisées
---
{{< callout url="https://www.datadoghq.com/product-preview/agent-side-filtering-for-custom/" >}} Le filtrage côté Agent pour les métriques personnalisées est en préversion. Si cette fonctionnalité vous intéresse, remplissez ce formulaire. {{< /callout >}}

## Présentation {#overview}

Le filtrage côté Agent vous permet de filtrer les métriques personnalisées inutilisées ou indésirables (provenant à la fois de DogStatsD et des intégrations de l'Agent) directement au niveau de Datadog Agent, avant de les envoyer à Datadog. Cela peut réduire considérablement le volume de métriques personnalisées indexées et ingérées.

Le filtrage est effectué au niveau de l'Agent mais géré de manière centralisée via l'interface utilisateur Datadog, offrant aux équipes une visibilité et un contrôle complets. Vous pouvez créer, mettre à jour et gérer des politiques de filtrage dans Datadog, rationalisant ainsi la gouvernance des métriques tout en maintenant la transparence.

La création et la mise à jour de politiques de filtrage nécessitent l'autorisation RBAC [`metric_tags_write`][1]. Tous les utilisateurs peuvent consulter les politiques de filtrage.

## Prérequis {#prerequisites}

- Mettez à niveau vers Datadog Agent v7.67.0 ou une version supérieure.
    - L'utilisation de la v7.70.0 ou d'une version supérieure est recommandée pour filtrer les métriques DogStatsD. 
    - L'utilisation de la v7.74.0 ou d'une version supérieure est requise pour les métriques d'intégration de l'Agent.
- Avec les autorisations [`org_management`][2], activez [Remote Configuration][3] pour votre organisation.
- Avec les autorisations [`api_keys_write`][4], activez la [fonctionnalité Remote Configuration sur les clés d'API][5] utilisées par vos Agents. Après avoir activé Remote Configuration sur une clé d'API, redémarrez vos Agents pour que le changement prenne effet.

{{<img src="agent/remote_config/RC_Key_updated.png" alt="Bouton « Activer » pour les propriétés de la clé d'API dotées de la fonctionnalité Remote Configuration." width="90%" style="center">}}

## Créez une politique de filtrage des métriques {#create-a-metric-filtering-policy}

Vous pouvez créer une politique de filtrage des métriques depuis la [page Paramètres des métriques][7] ou la [page Metrics Summary][6].

Les politiques de filtrage des métriques sont appliquées à tous les Agents v7.67.0+ (v7.74.0+ pour les métriques d'intégration de l'Agent) avec Remote Configuration activé. Les versions d'Agent plus anciennes, ou les Agents avec la Remote Configuration désactivé, n'appliquent pas les politiques de filtrage.

Les mises à jour des politiques sont déployées sur les Agents en 1 à 2 minutes.

### Depuis la page Paramètres des métriques {#from-the-metrics-settings-page}

1. Cliquez sur {{< ui >}}\+ Create Policy{{< /ui >}}.
2. Cliquez sur {{< ui >}}Filter metrics{{< /ui >}}.
3. Fournissez une description pour la nouvelle politique.
4. Sélectionnez les métriques à filtrer dans le menu déroulant {{< ui >}}Metrics to Filter{{< /ui >}}, ou cliquez sur {{< ui >}}Upload CSV{{< /ui >}}.
   - Si vous choisissez de téléverser un fichier CSV, sélectionnez le fichier et cliquez sur {{< ui >}}Open{{< /ui >}}. Vous pouvez utiliser plusieurs fichiers CSV pour créer la politique.
5. Lorsque vous êtes satisfait de la liste des métriques à filtrer, cliquez sur {{< ui >}}Save and Filter{{< /ui >}}.

### Depuis la page Metrics Summary {#from-the-metrics-summary-page}

Créez une politique de filtrage des métriques depuis la page Metrics Summary en utilisant l'une des méthodes suivantes :

{{< tabs >}}
{{% tab "Depuis une requête de métrique" %}}

1. Saisissez une requête de métrique dans la barre de recherche.
2. Cliquez sur le bouton avec les trois points verticaux sur le côté droit de l'écran.
3. Cliquez sur {{< ui >}}Filter metrics{{< /ui >}}.
4. Dans le menu déroulant {{< ui >}}Choose policy{{< /ui >}}, cliquez sur {{< ui >}}New Policy{{< /ui >}}. Fournissez une description pour la politique.
5. Examinez le {{< ui >}}Metrics to Filter{{< /ui >}}. Cliquez sur `X` sur le côté droit de n'importe quelle ligne pour supprimer une métrique de la liste, ou cliquez sur {{< ui >}}\+ Include More Metrics{{< /ui >}} pour ajouter des métriques à la liste.
6. Cliquez sur {{< ui >}}Save and Filter{{< /ui >}}.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/create_policy_from_metric_query.mp4" alt="Création d'une politique de filtrage de métriques à partir d'une requête de métrique" video="true" >}}

{{% /tab %}}
{{% tab "Depuis l'éditeur de politique" %}}

1. Cliquez sur le bouton avec trois points verticaux sur le côté droit de l'écran.
2. Cliquez sur {{< ui >}}Filter metrics{{< /ui >}}.
3. Dans la liste déroulante {{< ui >}}Choose policy{{< /ui >}}, cliquez sur {{< ui >}}New Policy{{< /ui >}}. Fournissez une description pour la politique.
4. Saisissez une requête de métrique dans le champ {{< ui >}}Metrics to Filter{{< /ui >}}, ou sélectionnez des métriques individuellement dans la liste déroulante. Cliquez sur `X` sur le côté droit de n'importe quelle ligne pour supprimer une métrique de la liste.
5. Cliquez sur {{< ui >}}Save and Filter{{< /ui >}}.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/create_policy_with_policy_editor.mp4" alt="Création d'une politique de filtrage de métriques depuis l'éditeur de politique" video="true" >}}

{{% /tab %}}
{{% tab "Depuis un téléversement CSV" %}}

1. Cliquez sur le bouton avec trois points verticaux sur le côté droit de l'écran.
2. Cliquez sur {{< ui >}}Filter metrics{{< /ui >}}.
3. Dans la liste déroulante {{< ui >}}Choose policy{{< /ui >}}, cliquez sur {{< ui >}}New Policy{{< /ui >}}. Fournissez une description pour la politique.
4. Cliquez sur {{< ui >}}Upload CSV{{< /ui >}} à droite du champ {{< ui >}}Metrics to Filter{{< /ui >}}.
5. Sélectionnez le fichier CSV, et cliquez sur {{< ui >}}Open{{< /ui >}}.
6. Examinez les métriques listées. Cliquez sur `X` sur le côté droit de n'importe quelle ligne pour supprimer une métrique de la liste. Si nécessaire, téléversez des fichiers CSV supplémentaires, ou ajoutez des métriques via le champ {{< ui >}}Metrics to Filter{{< /ui >}}.
7. Cliquez sur {{< ui >}}Save and Filter{{< /ui >}}.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/create_policy_with_csv_upload.mp4" alt="Création d'une politique de filtrage de métriques avec un téléversement de fichier CSV" video="true" >}}

{{% /tab %}}
{{< /tabs >}}

## Modifier une politique de filtrage de métriques {#edit-a-metric-filtering-policy}

Vous pouvez modifier une politique de filtrage de métriques depuis la [page Paramètres des métriques][1] ou la [page Metrics Summary][2].

### Depuis la page Paramètres des métriques {#from-the-metrics-settings-page-1}

1. Cliquez sur la politique pour la modifier.
2. Cliquez sur {{< ui >}}Edit{{< /ui >}}.
3. Sélectionnez les métriques à filtrer dans la liste déroulante {{< ui >}}Metrics to Filter{{< /ui >}}, ou cliquez sur {{< ui >}}Upload CSV{{< /ui >}}.
   - Si vous choisissez de téléverser un fichier CSV, sélectionnez le fichier et cliquez sur {{< ui >}}Open{{< /ui >}}.
4. Cliquez sur {{< ui >}}Save and Filter{{< /ui >}}.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/edit_policy_from_metrics_settings.mp4" alt="Modification d'une politique de filtrage de métriques depuis la page Paramètres des métriques" video="true" >}}

### Depuis la page Metrics Summary {#from-the-metrics-summary-page-1}

Modifiez une politique de filtrage de métriques depuis la page Metrics Summary en utilisant l'une des méthodes suivantes :

{{< tabs >}}
{{% tab "Depuis une requête de métrique" %}}

1. Saisissez une requête de métrique dans la barre de recherche.
2. Cliquez sur le bouton avec les trois points verticaux sur le côté droit de l'écran.
3. Cliquez sur {{< ui >}}Filter metrics{{< /ui >}}.
4. Dans la liste déroulante {{< ui >}}Choose policy{{< /ui >}}, sélectionnez la politique à modifier.
5. Examinez les listes {{< ui >}}Metrics to Filter{{< /ui >}} et {{< ui >}}Existing metrics in policy{{< /ui >}}. Cliquez sur `X` sur le côté droit de n'importe quelle ligne pour supprimer une métrique de la liste, ou cliquez sur {{< ui >}}\+ Include More Metrics{{< /ui >}} pour ajouter des métriques à la liste.
6. Cliquez sur {{< ui >}}Save and Filter{{< /ui >}}.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/edit_policy_with_metric_query.mp4" alt="Modification d'une politique de filtrage de métriques avec une requête de métrique" video="true" >}}

{{% /tab %}}
{{% tab "Depuis l'éditeur de politique" %}}

1. Cliquez sur le bouton avec trois points verticaux sur le côté droit de l'écran.
2. Cliquez sur {{< ui >}}Filter metrics{{< /ui >}}.
3. Dans la liste déroulante {{< ui >}}Choose policy{{< /ui >}}, sélectionnez la politique à modifier.
4. Sélectionnez les métriques individuellement dans la liste déroulante {{< ui >}}Metrics to Filter{{< /ui >}}. Cliquez sur `X` sur le côté droit de n'importe quelle ligne pour supprimer une métrique de la liste.
5. Cliquez sur {{< ui >}}Save and Filter{{< /ui >}}.

{{% /tab %}}
{{% tab "Depuis un téléversement CSV" %}}

1. Cliquez sur le bouton avec trois points verticaux sur le côté droit de l'écran.
2. Cliquez sur {{< ui >}}Filter metrics{{< /ui >}}.
3. Dans la liste déroulante {{< ui >}}Choose policy{{< /ui >}}, sélectionnez la politique à modifier.
4. Cliquez sur {{< ui >}}Upload CSV{{< /ui >}} à droite du champ {{< ui >}}Metrics to Filter{{< /ui >}}.
5. Sélectionnez le fichier CSV, et cliquez sur {{< ui >}}Open{{< /ui >}}.
6. Examinez les listes {{< ui >}}Metrics to Filter{{< /ui >}} et {{< ui >}}Existing metrics in policy{{< /ui >}}. Cliquez sur `X` sur le côté droit de n'importe quelle ligne pour supprimer une métrique de la liste, ou cliquez sur {{< ui >}}\+ Include More Metrics{{< /ui >}} pour ajouter des métriques à la liste.
7. Cliquez sur {{< ui >}}Save and Filter{{< /ui >}}.

{{% /tab %}}
{{< /tabs >}}

## Afficher toutes les politiques et les métriques filtrées {#view-all-policies-and-filtered-metrics}

Vous pouvez afficher toutes vos politiques et métriques filtrées depuis la [page Paramètres des métriques][1].

Cliquez sur le [bouton des paramètres][1] : 

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/settings_from_summary.png" alt="Le bouton des paramètres sur la page de résumé des métriques" style="width:100%;" >}}

Cliquez sur {{< ui >}}Metrics{{< /ui >}} dans la barre de navigation et accédez directement aux paramètres :

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/settings_from_nav.png" alt="L'option des paramètres depuis le panneau Métriques développé dans Datadog" style="width:100%;" >}}

### Afficher toutes les politiques {#view-all-policies}

Sélectionnez l'onglet {{< ui >}}Policies{{< /ui >}} dans la barre latérale pour voir une liste de toutes vos politiques. Si vous ne voyez pas la barre latérale, cliquez sur le bouton {{< ui >}}Show Sidebar{{< /ui >}} {{< img src="metrics/guide/agent_filtering_for_custom_metrics/show_sidebar.png" inline="true" width="22" >}}.

Cliquez sur n'importe quelle politique de filtrage de métriques pour ouvrir sa vue détaillée afin de la modifier ou de la supprimer.

### Afficher toutes les métriques filtrées {#view-all-filtered-metrics}

Sélectionnez l'onglet {{< ui >}}Filtered Metrics{{< /ui >}} dans la barre latérale pour voir une liste de toutes vos métriques filtrées. Si vous ne voyez pas la barre latérale, cliquez sur le bouton {{< ui >}}Show Sidebar{{< /ui >}} {{< img src="metrics/guide/agent_filtering_for_custom_metrics/show_sidebar.png" inline="true" width="22" >}}.

Cliquez sur les politiques associées à une métrique filtrée dans la colonne {{< ui >}}ATTACHED POLICIES{{< /ui >}} pour les modifier ou les supprimer.

## Supprimer les politiques {#delete-policies}

Vous pouvez supprimer les politiques de filtrage de métriques depuis la [Metrics Settings page][1].

1. Cliquez sur la politique de filtrage de métriques à supprimer.
2. Sélectionnez {{< ui >}}Delete{{< /ui >}} dans le coin supérieur droit de la page.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/delete_policy.png" alt="Le bouton de suppression de politique sur une vue détaillée de politique de filtrage de métriques" style="width:100%;" >}}

## Gérez les politiques de filtrage de métriques via l'API {#manage-metric-filtering-policies-through-the-api}

<div class="alert alert-danger">Ces endpoints sont susceptibles de changer pendant que le filtrage côté Agent pour les métriques personnalisées est en version préliminaire.</div>

Ces endpoints nécessitent une clé Datadog API et une clé d'application valides. Consultez [Getting started][8] dans la référence de l'API pour plus d'informations.

### Créer une politique de métrique filtrée {#create-a-filtered-metric-policy}

L'URL de base pour votre [Datadog site][9] sélectionné est : {{<region-param key="dd_api" code="true">}}

Remplacez `<BASE_URL>` dans l'exemple ci-dessous par l'URL de base.

**POST** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies`

#### Exemple de corps {#example-body}

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
  "data": {
    "type": "filtered_metrics",
    "attributes": {
      "policy_name": "my policy",
      "metric_names": [
        "metric.name.one",
        "metric.name.two"
      ]
    }
  }
}
{{< /code-block >}}

### Mettre à jour une politique de filtrage de métriques (mise à jour partielle) {#update-a-filtered-metric-policy-partial-update}

L'URL de base pour votre [Datadog site][9] sélectionné est : {{<region-param key="dd_api" code="true">}}

Remplacez `<BASE_URL>` dans l'exemple ci-dessous par l'URL de base.

**PATCH** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

#### Exemple de corps {#example-body-1}

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
  "data": {
    "type": "filtered_metrics",
    "attributes": {
      "policy_name": "my policy",
      "metrics_to_add": [
        "metric.name.three",
        "metric.name.four"
      ],
      "metrics_to_remove": [
        "metric.name.five",
        "metric.name.six"
      ]
    }
  }
}
{{< /code-block >}}

### Mettre à jour une politique de filtrage de métriques (remplacement complet) {#update-a-filtered-metric-policy-full-replace}

L'URL de base pour votre [Datadog site][9] sélectionné est : {{<region-param key="dd_api" code="true">}}

Remplacez `<BASE_URL>` dans l'exemple ci-dessous par l'URL de base.

**PUT** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

#### Exemple de corps {#example-body-2}

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
  "data": {
    "type": "filtered_metrics",
    "attributes": {
      "policy_name": "my policy",
      "metric_names": [
        "metric.name.seven",
        "metric.name.eight"
      ]
    }
  }
}
{{< /code-block >}}

### Supprimer une politique {#delete-a-policy}

L'URL de base pour votre [Datadog site][9] sélectionné est : {{<region-param key="dd_api" code="true">}}

Remplacez `<BASE_URL>` dans l'exemple ci-dessous par l'URL de base.

**DELETE** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

### Obtenir une politique de filtrage de métriques {#get-a-filtered-metric-policy}

L'URL de base pour votre [Datadog site][9] sélectionné est : {{<region-param key="dd_api" code="true">}}

Remplacez `<BASE_URL>` dans l'exemple ci-dessous par l'URL de base.

**GET** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

#### Exemple de corps de réponse {#example-response-body}

{{< code-block lang="json" disable_copy="true" collapsible="true" >}}
{
  "data": [
    {
      "type": "filtered_metrics",
      "id": "metric.name.one",
      "attributes": {
        "updated_timestamp": 1745954352
      }
    },
    {
      "type": "filtered_metrics",
      "id": "metric.name.two"
      "attributes": {
        "updated_timestamp": 1745954389
      }
    }
    // ... up to ~10,000 entries
  ],
  "links": {
    "self": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=200&page[limit]=100",
    "next": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=300&page[limit]=100",
    "prev": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=100&page[limit]=100",
    "first": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=0&page[limit]=100",
    "last": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=9900&page[limit]=100"
  },
  "meta": {
    "agent_coverage_percent": 100,
    "agents_with_latest_policy_count": 4,
    "deployment_failure": {
        "failed_agent_count": 0,
        "failure_message": ""
    },
    "deployment_status": "Deployed to all Agents",
    "deployment_strategy": "all",
    "policy_name": "test_policy_1",
    "total": 7,
    "total_agent_count": 4,
    "updated_by": "user@datadoghq.com",
    "updated_timestamp": 1758912365
  }
}
{{< /code-block >}}

### Lister les politiques de filtrage de métriques {#list-filtered-metric-policies}

L'URL de base pour votre [Datadog site][9] sélectionné est : {{<region-param key="dd_api" code="true">}}

Remplacez `<BASE_URL>` dans l'exemple ci-dessous par l'URL de base.

**GET** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies`

#### Exemple de corps de réponse {#example-response-body-1}

{{< code-block lang="json" disable_copy="true" collapsible="true" >}}
{
    "data": [
        {
            "id": "06b-fab-47e",
            "type": "filtered_metrics",
            "attributes": {
                "count": 85,
                "deployment_status": "Deployed to all Agents",
                "deployment_strategy": "all",
                "policy_name": "policy one",
                "updated_by": "user@datadoghq.com",
                "updated_timestamp": 1758547485,
                "version": 4            
            }
        },
        {
            "id": "07b-201-47e",
            "type": "filtered_metrics",
            "attributes": {
                "count": 8,
                "deployment_status": "Deployed to all Agents",
                "deployment_strategy": "all",
                "policy_name": "policy two",
                "updated_by": "user@datadoghq.com",
                "updated_timestamp": 1758547212,
                "version": 1
            }
        }
    ]
}
{{< /code-block >}}

## Limitations de la version préliminaire {#preview-limitations}

Cette version préliminaire initiale inclut les limitations suivantes :

- Un maximum de 10 000 noms de métriques peuvent être filtrés.
- L'impact de l'utilisation des ressources sur l'Agent est limité à 10 Mo de mémoire (RSS), sans augmentation de l'utilisation du CPU.
- Seules les métriques personnalisées reçues de DogStatsD ou des intégrations de l'Agent sont prises en charge.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/permissions/#metrics
[2]: /fr/account_management/rbac/permissions/#access-management
[3]: https://app.datadoghq.com/organization-settings/remote-config
[4]: /fr/account_management/rbac/permissions#api-and-application-keys
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/metric/summary
[7]: https://app.datadoghq.com/metric/settings/policies                                            
[8]: /fr/api/latest/#getting-started
[9]: /fr/getting_started/site/