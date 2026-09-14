---
description: Créez des formulaires pour recueillir des entrées, analyser les réponses
  et déclencher des automatisations.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: Blog
  text: Transformez les retours en actions au sein de votre organisation d'ingénierie
    avec Datadog Forms
- link: https://www.datadoghq.com/blog/datadog-forms-sheets-developer-feedback/
  tag: Blog
  text: Transformez les retours d'expérience des développeurs en informations opérationnelles
    avec Datadog Forms et Sheets
title: Forms
---
## Vue d'ensemble {#overview}

Les formulaires Datadog vous permettent de recueillir des entrées, d'analyser les réponses et de déclencher des automatisations dans Datadog. Les formulaires et leurs réponses peuvent être partagés au sein de votre organisation, vous permettant de recueillir et d'analyser des données avec votre équipe.

Quelques façons d'utiliser les formulaires :
- Créez la structure des services à partir de modèles prédéfinis.
- Sondez les retours d'expérience des ingénieurs dans un portail développeur interne (IDP).
- Créez des demandes de service et des [éléments de travail][1] pour les équipes de sécurité, de plateforme ou IT directement à partir des réponses aux formulaires des employés.

## Créer un formulaire {#create-a-form}

Sur la page [Forms][2], cliquez sur {{< ui >}}New Form{{< /ui >}}, puis sélectionnez une méthode de création :

{{< tabs >}}
{{% tab "Créer avec l'IA" %}}
1. Sélectionnez {{< ui >}}Create with AI{{< /ui >}} et cliquez sur {{< ui >}}Continue{{< /ui >}}. L'éditeur de formulaire s'ouvre avec [Bits Chat][100].
1. Décrivez le formulaire que vous souhaitez créer dans le panneau Bits Chat.
1. Cliquez sur {{< ui >}}Publish{{< /ui >}} ou {{< ui >}}Publish Changes{{< /ui >}} pour rendre le formulaire disponible aux répondants.

Vous pouvez également demander à Bits Chat de créer un formulaire depuis n'importe où dans Datadog, et pas seulement depuis l'éditeur Forms. Consultez [Créer et gérer des formulaires avec MCP](#create-and-manage-forms-with-mcp).

[100]: /fr/bits_ai/bits_chat/

{{% /tab %}}

{{% tab "Formulaire vierge" %}}
1. Sélectionnez {{< ui >}}Start with a blank form{{< /ui >}} et cliquez sur {{< ui >}}Continue{{< /ui >}}.
1. Nommez votre formulaire et ajoutez éventuellement une description et une couleur de thème. Cliquez sur {{< ui >}}Continue{{< /ui >}}.
1. Pour ajouter un composant, cliquez sur {{< ui >}}Add Component{{< /ui >}}, ou dans le panneau {{< ui >}}Fields{{< /ui >}}, cliquez sur l'icône plus **+**. Consultez [Composants de formulaire][3] pour obtenir la liste complète des types de composants et leurs options.
1. Cliquez sur {{< ui >}}Publish{{< /ui >}} ou {{< ui >}}Publish Changes{{< /ui >}} pour rendre le formulaire disponible aux répondants.

[3]: /fr/actions/forms/components/

{{% /tab %}}

{{% tab "Blueprint" %}}
Les blueprints sont des formulaires de démarrage pour des cas d'utilisation courants, préchargés avec des exemples de questions. Certains blueprints incluent une automatisation préconfigurée. Les blueprints disponibles incluent Developer Experience Survey, IDP Feedback, Work Management Service Request, Report an Incident, Bug Report, On-Call Escalation, Post-Incident Review, et plus encore.

1. Sélectionnez {{< ui >}}Create from blueprint{{< /ui >}} et parcourez les modèles disponibles.
1. Sélectionnez un blueprint et cliquez sur {{< ui >}}Continue{{< /ui >}}.
1. Nommez votre formulaire et ajoutez éventuellement une description et une couleur de thème. Cliquez sur {{< ui >}}Continue{{< /ui >}}.
1. Pour personnaliser davantage votre formulaire, consultez [Form components][3].
1. Cliquez sur {{< ui >}}Publish{{< /ui >}} ou {{< ui >}}Publish Changes{{< /ui >}} pour rendre le formulaire disponible aux répondants.


[3]: /fr/actions/forms/components/
{{% /tab %}}

{{% tab "Importation" %}}
Vous pouvez importer un formulaire existant à partir d'un fichier PDF ou JSON.

1. Sélectionnez {{< ui >}}Import a form{{< /ui >}}. Une boîte de dialogue d'importation s'ouvre.
1. Choisissez une source et suivez les instructions.
1. Nommez votre formulaire et ajoutez éventuellement une description et une couleur de thème. Cliquez sur {{< ui >}}Continue{{< /ui >}}.
1. Pour personnaliser davantage votre formulaire, consultez [Form components][3].
1. Cliquez sur {{< ui >}}Publish{{< /ui >}} ou {{< ui >}}Publish Changes{{< /ui >}} pour rendre le formulaire disponible aux répondants.


[3]: /fr/actions/forms/components/
{{% /tab %}}
{{< /tabs >}}

Pour prévisualiser ou partager votre formulaire :
1. Cliquez sur {{< ui >}}Preview{{< /ui >}} pour afficher le formulaire tel qu'il apparaît aux répondants.
1. Cliquez sur {{< ui >}}Share{{< /ui >}} pour copier le lien du formulaire ou configurer les options de partage.

## Form settings {#form-settings}

Depuis la page [Forms][2], cliquez sur un formulaire pour l'ouvrir dans l'éditeur. Dans l'en-tête de l'éditeur, cliquez sur l'icône en forme de roue dentée <i class="icon-cog-2"></i> pour accéder aux paramètres suivants :

| Setting | Description |
|---------|-------------|
| Accepting Responses | Définissez le formulaire comme actif ou inactif. Lorsqu'il est inactif, le formulaire n'accepte pas de nouvelles réponses. Vous pouvez également définir une date de fin pour fermer automatiquement le formulaire à une date précise. Uniquement disponible pour les formulaires publiés. |
| Anonymous Responses | Lorsque cette option est activée, les adresses e-mail des répondants ne sont pas enregistrées. |
| Manage Permissions | Configurez qui peut afficher et modifier le formulaire, et qui peut consulter les réponses soumises. Consultez [Manage access](#manage-access). |
| Clone Form | Créez une copie du formulaire. |
| Import Form | Importez des champs depuis un fichier PDF ou JSON dans le formulaire actuel. |
| Export Form (JSON) | Téléchargez le formulaire sous forme de fichier JSON. |

Pour plus d'informations sur la gestion des réponses, consultez [Form responses][4].

## Partager un formulaire {#share-a-form}

Pour configurer le partage d'un formulaire :
1. Depuis la page [Forms][2], cliquez sur un formulaire.
1. Cliquez sur {{< ui >}}Share{{< /ui >}}.

Les options de partage suivantes sont disponibles :

{{% collapse-content title="Partager au sein de Datadog" level="h3" expanded=false %}}
Partagez le formulaire avec les utilisateurs de votre organisation Datadog.

Sous {{< ui >}}Add to Dashboard{{< /ui >}}, utilisez le menu déroulant pour ajouter le formulaire à un dashboard existant ou pour créer un dashboard.

Activez le toggle {{< ui >}}Add to IDP Self-Service Actions{{< /ui >}} pour afficher le formulaire dans le catalogue [Self-Service Actions][5]. Il s'agit d'un emplacement central où les équipes de plateforme et d'infrastructure publient des outils que le reste de l'organisation peut découvrir et utiliser.
{{% /collapse-content %}}

{{% collapse-content title="Partager avec des utilisateurs externes" level="h3" expanded=false %}}
Partagez le formulaire avec des utilisateurs en dehors de votre organisation Datadog. Vous pouvez configurer une date d'expiration d'accès pour chaque option de partage et créer plusieurs configurations de partage avec des paramètres et des dates d'expiration différents.

Les options suivantes sont disponibles :

- **Specific individuals** : Ajoutez des destinataires par adresse e-mail individuelle. Par exemple, `alice@example.com` et `bob@example.com`.
- **Company domain** : Partagez avec toute personne disposant d'un domaine e-mail spécifique. Par exemple, `*@yourcompany.com`.
- **Shareable link** : Générez un lien que n'importe qui peut utiliser pour accéder au formulaire sans compte Datadog.
{{% /collapse-content %}}

Pour suspendre ou supprimer le partage externe, cliquez sur {{< ui >}}Share{{< /ui >}}, puis cliquez sur {{< ui >}}Edit{{< /ui >}} et sélectionnez {{< ui >}}Pause Sharing{{< /ui >}} ou {{< ui >}}Delete Sharing{{< /ui >}}.

Pour préremplir des champs dans un lien partagé afin que les répondants commencent avec certaines réponses déjà saisies, consultez [Préremplir les champs d'un formulaire][15].

## Ajouter un formulaire à un dashboard {#add-a-form-to-a-dashboard}

Pour ajouter un formulaire à un dashboard depuis l'éditeur de formulaire :
1. Depuis la page [Formulaires][2], cliquez sur un formulaire pour l'ouvrir dans l'éditeur.
1. Cliquez sur le dropdown {{< ui >}}Share{{< /ui >}} et sélectionnez {{< ui >}}Share within Datadog{{< /ui >}}.
1. Sous {{< ui >}}Add to Dashboard{{< /ui >}}, sélectionnez un dashboard existant ou créez-en un, puis cliquez sur {{< ui >}}Add{{< /ui >}}.

Vous pouvez également ajouter un formulaire à un dashboard directement depuis le dashboard :
1. Accédez à un [dashboard][6].
1. Cliquez sur **Add Widgets** pour ouvrir le panneau latéral.
1. Cliquez sur l'onglet **Apps**.
1. Sélectionnez **Form Widget**.
1. Sélectionnez votre formulaire, puis cliquez sur {{< ui >}}Save{{< /ui >}}.

## Add automation {#add-automation}

Après avoir créé un formulaire, vous pouvez ajouter une [action][7] ou un [workflow blueprint][8] qui se déclenche automatiquement lorsqu'un formulaire est soumis.
1. Depuis la page [Forms][2], cliquez sur un formulaire.
1. En haut du formulaire, sélectionnez {{< ui >}}Automation{{< /ui >}}.
1. Choisissez une action ou un blueprint.
1. L'action ou le blueprint s'ouvre dans un workflow canvas, où vous pouvez [le modifier][9].
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.

**Remarque** : Les automatisations déclenchées par des formulaires apparaissent sous [Workflow Automation][10].

## Create and manage Forms with MCP {#create-and-manage-forms-with-mcp}

Connectez un agent IA externe au [Datadog MCP Server][11] pour créer, mettre à jour, publier et lire des formulaires ainsi que leurs réponses. Activez l'ensemble d'outils `forms` (ou `all`) lorsque vous vous [connectez au MCP Server][12]. Vous pouvez également demander à [Bits Chat][13] de créer un formulaire depuis n'importe où dans Datadog. Consultez [Forms][14] dans la référence des outils du Datadog MCP Server pour obtenir la liste complète des outils disponibles.

## Manage access {#manage-access}

Par défaut, seul le créateur d'un formulaire peut y accéder. Pour modifier les autorisations sur un formulaire :
1. Depuis la page [Formulaires][2], cliquez sur un formulaire pour l'ouvrir dans l'éditeur.
1. Dans l'en-tête de l'éditeur, cliquez sur l'icône d'engrenage <i class="icon-cog-2"></i>.
1. Cliquez sur {{< ui >}}Manage Permissions{{< /ui >}}. Une fenêtre modale s'ouvre avec deux sections :
   - **Form Access** : Contrôle qui peut consulter et modifier le formulaire.
   - **Response Access** : Contrôle qui peut consulter les réponses soumises. Cette section n'est accessible qu'après que le formulaire ait reçu sa première soumission.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/incident_response/work_management/
[2]: https://app.datadoghq.com/forms
[3]: /fr/actions/forms/components/
[4]: /fr/actions/forms/responses/
[5]: /fr/internal_developer_portal/self_service_actions/
[6]: /fr/dashboards/
[7]: https://app.datadoghq.com/actions/action-catalog/
[8]: https://app.datadoghq.com/workflow/blueprints
[9]: /fr/actions/workflows/build/#build-a-workflow-with-the-workflow-builder
[10]: https://app.datadoghq.com/workflow
[11]: /fr/mcp_server/
[12]: /fr/mcp_server/setup/#toolsets
[13]: /fr/bits_ai/bits_chat/
[14]: /fr/mcp_server/tools/#forms
[15]: /fr/actions/forms/guide/prefill/