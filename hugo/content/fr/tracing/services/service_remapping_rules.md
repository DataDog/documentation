---
aliases:
- /fr/tracing/services/inferred_entity_remapping_rules/
- /fr/tracing/services/renaming_rules/
further_reading:
- link: https://www.datadoghq.com/blog/service-remapping/
  tag: Blog
  text: Connectez l’ensemble de vos données de service avec Service Remapping
site_support_id: service_remapping_rules
title: Règles Service Remapping
---
## Présentation {#overview}

Mettez à jour la façon dont vos services apparaissent dans Datadog sans modifier la configuration du traceur ni redéployer le code. Les règles de remappage de service vous permettent de renommer, fusionner ou diviser des services, ou de créer de nouveaux services en vous basant sur des tags d'infrastructure depuis l'interface utilisateur Datadog Vous pouvez également créer des règles de remappage pour d'autres types d'entités, tels que les services déduits, les magasins de données et les files d'attente

<div class="alert alert-info">Chaque organisation peut contenir jusqu'à 100 règles de remappage.</div>

## Prérequis {#prerequisites}

Vous devez disposer de l'autorisation **APM Service Remapping Write** (`apm_service_renaming_write`) pour créer, modifier et supprimer des règles de remappage. Consultez [Permissions][1] pour plus de détails sur le contrôle d'accès basé sur les rôles de Datadog.

### Exigences de version de traceur {#tracer-version-requirements}

Vous pouvez créer des règles de remappage de service uniquement pour les services instrumentés avec des versions de traceur prises en charge. Si un service transmet des données depuis une version de traceur plus ancienne, mettez à niveau le SDK avant de créer des règles de remappage pour ce service.

**Remarque** : cela s'applique uniquement aux services instrumentés. Il n'y a aucune exigence de version de traceur pour remapper les services déduits, les magasins de données ou les files d'attente. 

| Langage   | Version minimale de traceur prise en charge |
|------------|----------------------------------|
| C++        | Toutes versions prises en charge           |
| Dotnet     | [3.4.0][3]                       |
| Go         | [1.55.0][6]                      |
| Java       | [1.20.0][2]                      |
| JavaScript | [3.37.0][16]-3.x ou [4.16.0][4]  |
| PHP        | [0.94.1][7]                      |
| Python     | [1.19.0][5]                      |
| Ruby       | [1.15.0][8]                      |

## Créer une règle de remappage de service {#create-a-service-remapping-rule}

### Étape 1 : Sélectionnez l'action de remappage et les entités à cibler {#step-1-select-remapping-action-and-entities-to-target}

1. Dans Datadog, accédez à {{< ui >}}APM{{< /ui >}} > {{< ui >}}Catalog{{< /ui >}} > {{< ui >}}Manage{{< /ui >}} > [{{< ui >}}Service Remapping{{< /ui >}}][13]. Cliquez sur {{< ui >}}Add Service Rule{{< /ui >}} pour remapper les services instrumentés. Pour remapper les services déduits, les magasins de données ou les files d'attente, sélectionnez l'onglet {{< ui >}}Inferred Entity Rules{{< /ui >}} et cliquez sur {{< ui >}}Add Inferred Entity Rule{{< /ui >}}. 

   Alternativement, accédez à {{< ui >}}APM{{< /ui >}} > [{{< ui >}}Catalog{{< /ui >}}][14] et cliquez sur un service pour ouvrir le panneau latéral du service. À partir de là, cliquez sur {{< ui >}}Service Page{{< /ui >}} > {{< ui >}}Service Remapping{{< /ui >}}.
   {{< img src="tracing/services/renaming_rules/service-side-panel.png" alt="Le panneau latéral d'un service, affichant le menu déroulant de la page Service avec une option Service Remapping" style="width:100%;" >}}
1. Choisissez une action de remappage à effectuer pour votre nouvelle règle de remappage de service.
   - Sélectionnez {{< ui >}}Remap services{{< /ui >}} pour diviser une entité unique, renommer une entité, fusionner plusieurs entités ensemble ou renommer plusieurs entités.
   - Sélectionnez {{< ui >}}Correlate telemetry{{< /ui >}} pour identifier un service basé sur un tag d'infrastructure.
1. Utilisez la barre de recherche pour sélectionner les entités que vous souhaitez remapper.
   - Vous pouvez sélectionner une ou plusieurs entités, mais elles doivent toutes être du même type (service, service déduit, magasin de données ou file d'attente). Sélectionnez les services en fonction de leur tag `service` ou `peer.service`, et non par leurs métadonnées de nom d'affichage.
   - Au fur et à mesure que vous sélectionnez des entités, une requête de span est créée en arrière-plan. Pour modifier la requête, sélectionnez {{< ui >}}Build Advanced Query{{< /ui >}}.
   - Si vous corrélez un service avec des balises d'infrastructure, vous ne pouvez sélectionner que _un_ seul service. Choisissez le ou les tags d'infrastructure sur lesquels corréler la télémétrie. Toute la télémétrie possédant le ou les mêmes tags d'infrastructure que le service choisi sera remappée vers un nom de service unifié

### Étape 2 : Spécifiez le nouveau nom d'entité {#step-2-specify-new-entity-name}

Dans la zone de texte, saisissez un nom unique pour l'entité (ou les entités) sélectionnée(s). Alternativement, utilisez des valeurs de tag avec la syntaxe `{{tagName}}` pour remapper en fonction des tags d'une entité. Au fur et à mesure que vous tapez, un aperçu du ou des nouveaux noms de service apparaît.
   1. Si les valeurs de tag suivent un modèle, appliquez une expression régulière pour extraire uniquement la partie que vous souhaitez dans le nom.
**Remarque** : L'aperçu n'est pas une liste exhaustive. Si vous remappez un service basé sur un tag avec plusieurs valeurs, seules les valeurs avec le plus grand nombre de spans apparaissent dans l'aperçu. 

### Étape 3 : Nommez votre règle de remappage de service et vérifiez-la {#step-3-name-your-rule-and-review}

1. Optionnellement, saisissez un nom descriptif pour la règle de remappage afin de pouvoir l'identifier ultérieurement.
1. Vérifiez et enregistrez votre règle de remappage. Après avoir enregistré votre règle, _il peut s'écouler environ une minute avant qu'elle ne prenne effet_.

## Comportement des règles de remappage {#remapping-rules-behavior}

Les règles de remappage de service fonctionnent en remplaçant le tag `service` pour remapper les services, ou le tag `peer.service` pour remapper les services déduits, les magasins de données et les files d'attente Les services sont remappés lors de l'ingestion, et toute configuration préexistante spécifiant un nom de service ne change pas lorsqu'une règle de remappage de service est créée Les règles de remappage de service prévalent sur toutes les autres configurations de nom de service

Les règles de remappage de service sont appliquées sur APM, Logs, Metrics, USM, DSM, DJM, DBM, Profiling, NPM, Live Processes, Live Containers, Kubernetes et Events

- **Données historiques :** Les modifications apportées par les règles de remappage de service affectent uniquement la télémétrie ingérée pendant qu'une règle est active, et les données passées ne sont pas mises à jour rétroactivement La suppression ou la modification d'une règle de remappage de service empêche son application aux nouvelles données, mais ne rétablit pas les noms sur les données précédemment ingérées
- **Ordre des règles :** Les règles de remappage de service sont appliquées dans l'ordre Les règles de remappage de service situées en haut de la liste sont appliquées en premier Un service n'est remappé que par la première règle de remappage de service qui le capture (plusieurs règles ne sont pas appliquées au même service)
- **Expressions régulières :** Les expressions régulières peuvent être utilisées pour définir de nouveaux noms de service, mais les quantificateurs gourmands ne sont pas autorisés à l'intérieur du groupe de capture.
- **Remappeur de service de logs :** Les règles de remappage de service s'appliquent avant les pipelines de logs Si le remappeur de service de logs et les règles de remappage de service sont tous deux appliqués à un service, les règles de remappage de service ont la priorité 
- **Dashboards et monitors :** Les requêtes existantes qui font référence à d'anciens noms de service ne sont pas automatiquement mises à jour. Examinez et mettez-les à jour manuellement.
**Intégration et remplacements personnalisés :** Si les remplacements d'intégration ou les remplacements personnalisés entrent dans le champ d'application d'une règle de remappage de service, ils sont également remappés [Supprimer les remplacements d'intégration][15] pour une expérience APM optimale.
- **Hiérarchie de nommage des services :** Les noms de service sont déterminés par la hiérarchie suivante, de la priorité la plus élevée à la plus basse :
  1. Règles de remappage de service
  2. Service défini dans le code (`tracer.Start(WithService(xx))`)
  3. Service défini dans la propriété système (`-Ddd.service={}`)
  4. Service défini dans la variable d'environnement (`DD_SERVICE`)
  5. Service défini dans le fichier de configuration (`application_monitoring.yaml`)

[1]: /fr/account_management/rbac/permissions
[2]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.20.0
[3]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v3.4.0
[4]: https://github.com/DataDog/dd-trace-js/releases/tag/v4.16.0
[5]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.19.0
[6]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.55.0
[7]: https://github.com/DataDog/dd-trace-php/releases/tag/0.94.1
[8]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.15.0
[9]: /fr/tracing/services/
[10]: /fr/internal_developer_portal/catalog/
[11]: /fr/logs/explorer/
[12]: /fr/metrics/explorer/
[13]: https://app.datadoghq.com/software/settings/service-rename
[14]: https://app.datadoghq.com/software
[15]: /fr/tracing/services/service_override_removal
[16]: https://github.com/DataDog/dd-trace-js/releases/tag/v3.37.0

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}