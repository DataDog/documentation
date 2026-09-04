---
aliases:
- /fr/cloud_cost_management/tag_pipelines/
- /fr/cloud_cost_management/tags/tag_pipelines/
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Découvrez Cloud Cost Management.
- link: /getting_started/tagging/
  tag: Documentation
  text: Débuter avec les tags
- link: /integrations/guide/reference-tables
  tag: Documentation
  text: En savoir plus sur les tables de référence
- link: https://www.datadoghq.com/blog/cloud-cost-management-ai-costs/
  tag: Blog
  text: Répartissez les coûts de l'IA entre les fournisseurs avec Datadog Cloud Cost
    Management
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: Blog
  text: Gérez et optimisez vos coûts OCI avec Datadog Cloud Cost Management
title: Pipelines de tags
---
## Présentation {#overview}

Les tags sont la base de toute analyse et allocation dans Cloud Cost Management. Ils vous permettent de ventiler les dépenses par service, équipe, projet, environnement ou toute dimension pertinente pour votre entreprise. Les pipelines de tags imposent l'utilisation de tags standardisés sur vos ressources cloud et aident à garantir une attribution des coûts cohérente et précise dans toute votre organisation.

Avec les [pipelines de tags][1], vous pouvez créer des règles de tag pour corriger les tags manquants ou incorrects sur vos factures cloud. Vous pouvez également créer de nouveaux tags déduits qui s'alignent sur une logique métier spécifique pour améliorer la précision de votre suivi des coûts. Ces tags standardisés alimentent toutes les capacités d'analyse des coûts, y compris l'allocation des coûts des conteneurs, les règles d'allocation personnalisées et les recommandations de coûts.

Les pipelines de tags s'appliquent aux métriques Cloud Cost de tous les fournisseurs. Les règles que vous créez affectent toutes les données de coût et les recommandations de coût, garantissant ainsi la cohérence entre les dashboards, les monitors et les rapports d'allocation.

Lorsque les pipelines de tags changent, les nouvelles règles sont automatiquement appliquées aux trois derniers mois de données. La mise à jour des données historiques peut prendre jusqu'à 24 heures après l'ajout ou la modification de règles.

Tous les nouveaux utilisateurs ont la règle recommandée pour [activer la normalisation des tags][6] activée par défaut.

## Créer un ensemble de règles {#create-a-ruleset}

Vous pouvez gérer les ensembles de règles de pipeline de tags via l'[API][7], [Terraform][8], ou directement dans Datadog en suivant les instructions ci-dessous.

Pour créer un ensemble de règles, accédez à [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Tag Pipelines{{< /ui >}}][1].

<div class="alert alert-danger"> Vous pouvez créer jusqu'à 100 règles. Les tables de référence basées sur l'API ne sont pas prises en charge. </div>

Avant de créer des règles individuelles, créez un ensemble de règles (un dossier pour vos règles) en cliquant sur {{< ui >}}+ New Ruleset{{< /ui >}}.

Au sein de chaque ensemble de règles, cliquez sur {{< ui >}}+ Add New Rule{{< /ui >}} et sélectionnez un type de règle : {{< ui >}}Add tag{{< /ui >}}, {{< ui >}}Alias tag keys{{< /ui >}} ou {{< ui >}}Map multiple tags{{< /ui >}}. Ces règles s'exécutent dans un ordre séquentiel et déterministe, de haut en bas.

{{< img src="cloud_cost/pipelines-create-ruleset-1.png" alt="Une liste de règles de tag sur la page Tag Pipelines affichant diverses catégories telles que l'équipe, le compte, le service, le département, l'unité commerciale, et plus encore" style="width:60%;" >}}

Vous pouvez organiser les règles et les ensembles de règles pour vous assurer que l'ordre d'exécution correspond à votre logique métier.

### Ajouter un tag {#add-tag}

Ajoutez un nouveau tag (clé + valeur) en fonction de la présence de tags existants sur vos données de coûts Cloud.

Vous pouvez par exemple créer une règle qui applique à toutes les ressources un tag, dont la valeur correspond à l'unité commerciale liée aux services dont ces ressources font partie.

{{< img src="cloud_cost/pipelines-add-tag-2.png" alt="Ajoutez un nouveau tag d'unité commerciale aux ressources avec service:process-agent ou service:process-billing." style="width:60%;" >}}

Sous la section {{< ui >}}Additional options{{< /ui >}}, vous disposez des options suivantes :

- {{< ui >}}Action when tag `{tag}` exists{{< /ui >}} - Choisissez quoi faire si le tag spécifié (`business-unit` dans l'exemple ci-dessus) existe déjà :
  - {{< ui >}}Don't apply the rule{{< /ui >}} - Ignorez le tag si celui-ci existe déjà, en préservant la valeur d'origine.
  - {{< ui >}}Append the tag{{< /ui >}} - Ajoutez la nouvelle valeur au tag existant sans supprimer la valeur d'origine.
  - {{< ui >}}Replace the tag{{< /ui >}} - Remplacez la valeur du tag existant par la nouvelle valeur. <div class="alert alert-warning">Le remplacement des tags peut écraser les données existantes. Utilisez cette option avec précaution.</div>
- {{< ui >}}Apply case-insensitive matching to resource tags{{< /ui >}} - Permet aux tags définis dans le champ `To resources with tag(s)` et aux tags issus des données de coût d'être insensibles à la casse. Par exemple, si les tags de ressource de l'interface utilisateur sont : `foo:bar` et que le tag issu des données de coût est `Foo:bar`, alors les deux peuvent être mis en correspondance.

### Alias de clés de tag {#alias-tag-keys}

Mappez des valeurs de tags existants à un tag plus standard.

Par exemple, si votre organisation souhaite utiliser la clé de tag standard `application`, mais que plusieurs équipes utilisent une variante de ce tag (comme `app`, `webapp` ou `apps`), vous pouvez créer un alias de `apps` vers `application`. Chaque règle de tag d'alias vous permet de créer un alias pour un maximum de 25 clés de tag vers un nouveau tag.

{{< img src="cloud_cost/pipelines-alias-tag-4.png" alt="Ajoutez un tag d'application aux ressources avec le tag app, webapp ou apps." style="width:60%;" >}}

Ajoutez le tag d'application aux ressources avec les tags `app`, `webapp` ou `apps`. La règle cesse de s'exécuter pour chaque ressource après la première correspondance trouvée. Par exemple, si une ressource possède déjà un tag `app`, alors la règle ne tente plus d'identifier un tag `webapp` ou `apps`.

Sous la section {{< ui >}}Additional options{{< /ui >}}, vous disposez des options suivantes :

- {{< ui >}}Action when tag `{tag}` exists{{< /ui >}} - Choisissez quoi faire si le tag spécifié (`application` dans l'exemple ci-dessus) existe déjà :
  - {{< ui >}}Don't apply the rule{{< /ui >}} - Ignorez le tag si celui-ci existe déjà, en préservant la valeur d'origine.
  - {{< ui >}}Append the tag{{< /ui >}} - Ajoutez la nouvelle valeur au tag existant sans supprimer la valeur d'origine.
  - {{< ui >}}Replace the tag{{< /ui >}} - Remplacez la valeur du tag existant par la nouvelle valeur. <div class="alert alert-warning">Le remplacement des tags peut écraser les données existantes. Utilisez cette option avec précaution.</div>
- {{< ui >}}Apply case-insensitive matching to resource tags{{< /ui >}} - Permet aux tags définis dans les clés de tag d'alias et aux tags issus des données de coût d'être insensibles à la casse. Par exemple, si les tags de ressource de l'interface utilisateur sont : `app:bar` et que le tag issu des données de coût est `App:bar`, alors les deux peuvent être mis en correspondance.

### Mapper plusieurs tags {#map-multiple-tags}

Utilisez les [Tables de référence][2] pour ajouter plusieurs tags aux données de coût sans créer plusieurs règles. Ceci mappe les valeurs de la colonne de clé primaire de votre Reference Table aux valeurs des tags de coût. Si elle est trouvée, le pipeline ajoute les colonnes de Reference Table sélectionnées en tant que tags aux données de coût.

Par exemple, si vous souhaitez ajouter des informations sur les vice-présidents, les organisations et les business_units auxquels appartiennent différents comptes AWS et Azure, vous pouvez créer un tableau et mapper les tags.

{{< img src="cloud_cost/pipelines-map-multiple-tags-2.png" alt="Ajoutez des métadonnées de compte comme customer_name en utilisant des tables de référence pour les pipelines de tags" style="width:60%;" >}}

Similaire aux [clés de tag d'alias](#alias-tag-keys), la règle cesse de s'exécuter pour chaque ressource après la première correspondance trouvée. Par exemple, si un `application` est trouvé, alors la règle ne tente plus de trouver un `subscription_id`.

Sous la section {{< ui >}}Additional options{{< /ui >}}, vous disposez des options suivantes :

- {{< ui >}}Action when column exists{{< /ui >}} - Choisissez quoi faire si les colonnes spécifiées existent déjà :
  - {{< ui >}}Don't apply the rule{{< /ui >}} - Ignore la règle si les colonnes existent déjà, en préservant les valeurs d'origine.
  - {{< ui >}}Append the column{{< /ui >}} - Ajoute les nouvelles valeurs aux colonnes existantes sans supprimer les valeurs d'origine.
  - {{< ui >}}Replace the column{{< /ui >}} - Remplace les valeurs de colonne existantes par les nouvelles valeurs. <div class="alert alert-warning">Le remplacement de colonnes peut écraser les données existantes. Utilisez cette option avec précaution.</div>
- {{< ui >}}Apply case-insensitive matching for primary key values{{< /ui >}} - Active la correspondance insensible à la casse entre la valeur de la clé primaire de la Reference Table et la valeur du tag dans les données de coût lorsque la clé de tag correspond à la clé primaire. Par exemple, si la paire de valeurs de clé primaire de l'interface utilisateur est `foo:Bar` et que le tag des données de coût est `foo:bar`, alors les deux peuvent être mis en correspondance.

## Tags réservés {#reserved-tags}

Certains tags tels que `env` et `host` sont des [tags réservés][4] et font partie du [Unified Service Tagging][3]. Le tag `host` ne peut pas être ajouté dans les pipelines de tags.

L'utilisation de tags aide à corréler vos métriques, traces, processus et logs. Les tags réservés comme `host` offrent une visibilité et une surveillance efficace sur l'ensemble de votre infrastructure. Pour une corrélation optimale et des informations exploitables, utilisez ces tags réservés dans le cadre de votre stratégie de balisage dans Datadog.

## Supprimer des tags {#delete-tags}
Pour supprimer un tag créé à l'aide des pipelines de tags, supprimez la règle qui l'a créé. Dans les 24 heures, le tag est automatiquement supprimé des données des trois derniers mois. Pour supprimer le tag des anciennes données, contactez le [support Datadog][5].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/tag-pipelines
[2]: /fr/integrations/guide/reference-tables/?tab=manualupload
[3]: /fr/getting_started/tagging/unified_service_tagging/
[4]: /fr/getting_started/tagging/
[5]: /fr/help/
[6]: /fr/cloud_cost_management/tags#how-tags-are-normalized
[7]: /fr/api/latest/cloud-cost-management/#create-tag-pipeline-ruleset
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/tag_pipeline_ruleset