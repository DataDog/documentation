---
further_reading:
- link: /logs/log_configuration/logs_to_metrics/
  tag: Documentation
  text: Générer des métriques à partir des logs ingérés
- link: /getting_started/tagging/
  tag: Documentation
  text: En savoir plus sur le tagging
- link: /dashboards/widgets/table/
  tag: Documentation
  text: En savoir plus sur le widget Tableau

title: Attribution des coûts des logs
---

## Présentation

Datadog fournit des informations sur l'utilisation des logs via le [Dashboard d'estimation de l'utilisation des logs][1], la section [Plan and Usage][2] de l'application, ainsi que les [métriques d'utilisation des logs][3] disponibles. Toutefois, vous aurez peut-être parfois besoin de consulter des données plus détaillées sur l'attribution des coûts, par exemple pour des équipes spécifiques.

Ce guide vous présente les étapes à suivre pour créer des métriques custom et un dashboard afin de connaître l'attribution des coûts des logs pour chaque équipe. Vous pouvez également utiliser ce processus pour détailler les données en fonction d'autres attributs, tels que les services, les projets, les produits, les régions, etc.

1. [Configurer des tags personnalisés](#configurer-des-tags-personnalises).
2. [Générer des métriques de logs custom](#generer-des-metriques-de-logs-custom) avec ces tags.
3. [Créer des widgets dans un dashboard](#creer-un-dashboard-en-utilisant-les-metriques-de-logs-custom) pour les métriques de logs custom.

{{< img src="logs/faq/logs_cost_attribution/cost_attribution_dashboard.png" alt="Un dashboard avec des widgets Tableau affichant l'utilisation et les coûts détaillés par équipe pour les logs ingérés, le scanner de données sensibles, les logs indexés sur 7 jours et les logs indexés sur 15 jours. " style="width:85%" >}}

## Créer un pipeline de logs

Créez un pipeline de logs qui filtre les logs pour lesquels vous souhaitez connaître l'attribution des coûts. Dans cet exemple, filtrez le sous-ensemble de logs que vous souhaitez ventiler par équipe.

1. Accédez à [Logs Pipelines][4].
2. Cliquez sur **Add a new pipeline**.
3. Saisissez le filtre correspondant aux logs pour lesquels vous souhaitez connaître l'attribution des coûts.
4. Nommez le pipeline, par exemple : `Attribution des coûts par équipe`.
5. Ajoutez des tags et une description si vous le souhaitez.
6. Cliquez sur **Create**.

Gardez le nouveau pipeline en bas de la liste des pipelines. De cette manière, les logs devront d'abord passer par les autres pipelines de façon à ce que les tags et les attributs concernés soient créés en premier.

Ajoutez tous les processeurs créés pour cet exemple d'attribution des coûts au nouveau pipeline.

### Ajouter un tag `team`

Datadog vous conseille d'appliquer l'une de ces [méthodes de tagging][5] pour ajouter le tag `team` aux logs **avant leur ingestion**.

Si toutefois vous souhaitez configurer le tag lors de l'ingestion, suivez ces étapes pour créer et ajouter un tag `team`.

1. [Créer un attribut `team`](#creer-un-attribut-team).
2. [Créer un remappeur pour convertir l'attribut `team` en tag](#creer-un-remappeur-pour-convertir-l-attribut-team-en-tag).

Utilisez ce processus pour créer les attributs en fonction desquels vous souhaitez décomposer votre utilisation des logs (par exemple, par service, produit, région, etc.).

#### Créer un attribut `team`

Utilisez un [processeur de catégories] [6] pour créer un attribut `team` pour vos logs.

1. Accédez au nouveau pipeline et cliquez sur **Add processor**.
2. Sélectionnez le type de processeur **Category Processor**.
3. Nommez le processeur, par exemple : "Créer un attribut team".
4. Saisissez `team` dans le champ **Set target category attribute** pour créer un attribut `team`.
5. Dans la section **Populate category**, ajoutez une catégorie pour chaque équipe. Par exemple, pour ajouter le tag `team:service_a` aux événements de log qui correspondent à `service:a` et `env:prod` :
      a. Saisissez `service:a` et `env:prod` dans le champ **All events that match**.
      b. Saisissez `service_a` dans le champ **Appear under the value name**.
      c. Cliquez sur **Add**.
6. Ajoutez les autres équipes en tant que catégories distinctes.
7.  Cliquez sur **Create**.

#### Créer un remappeur pour convertir l'attribut `team` en tag

1. Accédez au pipeline et cliquez sur **Add processor**.
2. Sélectionnez le type de processeur **Remapper**.
3. Nommez le processeur, par exemple : "Convertir l'attribut team en tag".
4. Dans la section **Set attribute(s) or tag key to remap**, sélectionnez **Attribute(s)** et saisissez `team`.
5. Dans la section **Set target attribute or tag key**, sélectionnez **Tag key** et saisissez `team`.
6. Désactivez **Preserve source attribute** pour que l'attribut soit bien supprimé et que le tag soit conservé.
7. Activez **Override on conflict**.
8. Cliquez sur **Create**.

{{< img src="logs/faq/logs_cost_attribution/team_remapper.png" alt="Formulaire de création de remappeur avec toutes les données renseignées pour créer un remappeur team" style="width:75%" >}}

## Configurer des tags personnalisés

Créez des tags personnalisés afin de classer les métriques d'utilisation des logs custom dans des catégories répondant à vos besoins. Pour cet exemple, créez les tags suivants :

- `retention_period` pour indiquer la période de rétention des logs dans les index Datadog.
- `online_archives` pour indiquer que les logs ont été acheminés vers Online Archives.
- `sds` pour indiquer que les logs ont été scannés par le scanner de données sensibles.

### Créer un tag `retention_period`

<div class="alert alert-warning">Datadog vous recommande de configurer le tag <code>retention_period</code> même si tous vos index ont la période de rétention. De cette manière, si vous commencez à utiliser plusieurs périodes différentes, chaque log sera tagué avec sa période de rétention.</div>

`retention_period` correspond à la période de rétention de vos logs dans les index Datadog. Étant donné que les coûts facturés dépendent du nombre de jours pendant lesquels les logs sont conservés, utilisez le tag `retention_period` pour associer chaque log à sa période de rétention et ainsi visualiser l'attribution des coûts.

Datadog vous recommande de procéder comme suit pour configurer le tag `retention_period` :

1. [Créer un attribut `index_name`](#creer-un-attribut-index_name).
2. [Créer un attribut `retention_period`](#creer-un-attribut-retention_period).
3. [Créer un remappeur pour convertir l'attribut `retention_period` en tag](#creer-un-remappeur-pour-convertir-l-attribut-retention_period-en-tag).

#### Créer un attribut `index_name`

Utilisez un [processeur de catégories][6] pour créer un attribut `index_name` permettant d'identifier l'index vers lequel les logs sont acheminés.

1. Accédez au pipeline précédemment créé et cliquez sur **Add processor**.
2. Sélectionnez le type de processeur **Category Processor**.
3. Nommez le processeur, par exemple : "Créer un attribut index_name".
4. Saisissez **index_name** dans le champ **Set target category attribute** pour créer un attribut `index_name`.
5. Ajoutez une catégorie pour chaque index. Par exemple, si vous avez un index nommé `retention-7` pour tous les logs associés au tag `env:staging` :
   {{< img src="logs/faq/logs_cost_attribution/indexes_configuration.png" alt="Liste des index montrant la requête de filtre, la période de rétention et si Online Archives est activé pour les index retention-30, retention-15, retention-7 et demo" >}}
Ensuite, procédez comme suit dans la section **Populate category** :
      a. Saisissez `env:staging` dans le champ **All events that match**.
      b. Saisissez `retention-7` dans le champ **Appear under the value name**.
      c. Cliquez sur **Add**.
6. Ajoutez les autres index en tant que catégories distinctes.
7.  Cliquez sur **Create**.

{{< img src="logs/faq/logs_cost_attribution/indexes_category_processor.png" alt="Formulaire du processeur de catégories affichant les données renseignées pour créer un attribut index_name" style="width:75%" >}}

#### Créer un attribut `retention_period`

Utilisez un [processeur de catégories][6] pour créer un attribut `retention_period` permettant d'associer l'index à sa période de rétention.

1. Accédez au pipeline et cliquez sur **Add processor**.
2. Sélectionnez le type de processeur **Category Processor**.
3. Nommez le processeur, par exemple : "Créer un attribut retention_period".
4. Saisissez `retention_period` dans le champ **Set target category attribute** pour créer un attribut `retention_period`.
5. Ajoutez une catégorie pour chaque période de rétention. Par exemple, pour un index avec une période de rétention de 7 jours nommé `retention-7`, procédez comme suit dans la section **Populate category** :
      a. Saisissez `@index_name:(retention-7)` dans le champ **All events that match**.
      b. Saisissez `7` dans le champ **Appear under the value name**.
      c. Cliquez sur **Add**.
6. Ajoutez les autres périodes de rétention en tant que catégories distinctes.
7. Cliquez sur **Create**.

{{< img src="logs/faq/logs_cost_attribution/retention_period_processor.png" alt="Formulaire du processeur de catégories affichant les données renseignées pour créer un attribut retention_period" style="width:75%" >}}

#### Créer un remappeur pour convertir l'attribut `retention_period` en tag

1. Accédez au pipeline et cliquez sur **Add processor**.
2. Sélectionnez le type de processeur **Remapper**.
3. Nommez le processeur, par exemple : "Convertir l'attribut retention_period en tag".
4. Dans la section **Set attribute(s) or tag key to remap**, sélectionnez **Attribute(s)** et saisissez `retention_period`.
5. Dans la section **Set target attribute or tag key**, sélectionnez **Tag key** et saisissez `retention_period`.
6. Désactivez **Preserve source attribute** pour que l'attribut soit bien supprimé et que le tag soit conservé.
7. Activez **Override on conflict**.
8. Cliquez sur **Create**.

{{< img src="logs/faq/logs_cost_attribution/retention_period_remapper.png" alt="Formulaire de création de remappeur avec toutes les données renseignées pour créer un remappeur retention_period" style="width:75%" >}}

### Créer un tag `online_archives`

<div class="alert alert-warning">Datadog vous recommande de configurer le tag <code>online_archives</code> même si Online Archives n'est activé pour aucun de vos index. De cette manière, si vous commencez à utiliser Online Archives, les logs concernés auront déjà le tag <code>online_archives</code>.</div>

Le tag `online_archives` indique si vos logs ont été acheminés ou non vers Online Archives. Étant donné qu'Online Archives n'utilise pas la même grille tarifaire que l'indexation standard, utilisez le tag `online_archives` pour identifier les logs acheminés vers Online Archives et connaître l'attribution des coûts.

Datadog vous recommande de procéder comme suit pour configurer le tag `online_archive` :

#### Créer un attribut `online_archives`

Utilisez un [processeur de catégories][6] pour créer un nouvel attribut `online_archives` et ainsi indiquer si Online Archives est activé pour l'index associé.

1. Accédez au pipeline précédemment créé et cliquez sur **Add processor**.
2. Sélectionnez le type de processeur **Category Processor**.
3. Nommez le processeur, par exemple : "Créer l'attribut online_archives" pour créer un attribut `online_archives`.
4. Dans la section **Populate category**, ajoutez deux catégories :
      <br> Dans la **première catégorie**, la valeur `true` est attribuée à tous les index où Online Archives est activé. Par exemple, si les logs de l'index nommé `retention-30` sont transférés vers Online Archives :
      a. Saisissez `@index_name:(retention-30)` dans le champ **All events that match**.
      b. Saisissez `true` dans le champ **Appear under the value name**.
      c. Cliquez sur **Add**.
      <br> Dans la **deuxième catégorie**, la valeur `false` est attribuée à tous les autres index.
      a. Saisissez `*` dans le champ **All events that match**.
      b. Saisissez `false` dans le champ **Appear under the value name**.
      c. Cliquez sur **Add**.
5. Cliquez sur **Create**.

{{< img src="logs/faq/logs_cost_attribution/online_archives_attribute.png" alt="Formulaire du processeur de catégories affichant des données pour créer un attribut online_archives" style="width:75%" >}}

#### Créer un remappeur pour convertir l'attribut `online_archives` en tag

1. Accédez au pipeline et cliquez sur **Add processor**.
2. Sélectionnez le type de processeur **Remapper**.
3. Nommez le processeur, par exemple : "Convertir l'attribut online_archives en tag".
4. Dans la section **Set attribute(s) or tag key to remap**, sélectionnez **Attribute(s)** et saisissez ``online_archives`.
5. Dans la section **Set target attribute or tag key**, sélectionnez **Tag key** et saisissez `online_archives`.
6. Désactivez **Preserve source attribute** pour que l'attribut soit bien supprimé et que le tag soit conservé.
7. Activez **Override on conflict**.
8. Cliquez sur **Create**.

<div class="alert alert-info"> Dans un processeur de catégories, l'ordre des catégories est important. L'attribut reçoit la valeur de la première catégorie pour laquelle le log correspond à la requête, en utilisant la même logique que les index. Pour cette raison, assurez-vous que les requêtes et le processeur de catégories respectent le même l'ordre que celui des index. De la même manière, la catégorie `true` doit toujours être cochée avant `false` dans le processeur de catégories Online Archives. <br><br>
En cas de modification des configurations de l'index, vous devez mettre à jour la configuration du processeur pour prendre en compte la modification.</div>


Datadog vous recommande fortement d'utiliser les [endpoint d'API Datadog][7] pour automatiser ce processus en récupérant et en mettant à jour automatiquement la configuration.

### Créer un tag `sds`

<div class="alert alert-warning">Datadog vous recommande de toujours configurer le tag <code>sds</code> même si vous n'utilisez pas le scanner de données sensibles. De cette manière, si vous commencez à utiliser le scanner de données sensibles, tous les logs concernés auront déjà le tag <code>sds</code>.</div>

La tag `sds` indique si vos logs ont été scannés ou non par le scanner de données sensibles. Utilisez le tag `sds` pour évaluer les coûts associés à l'utilisation du scanner de données sensibles.

L'utilisation du scanner de données sensibles est facturée en fonction du volume de logs scannés ; elle est donc déterminée à partir d'un groupe d'analyse et non d'une règle d'analyse. Par conséquent, vous devez créer une règle d'analyse proxy dans chaque groupe d'analyse et utiliser une expression régulière pour faire correspondre tous les logs. De cette façon, tous les logs scannés recevront le tag adéquat.

1. Accédez au [scanner de données sensibles][8].
2. Dans chaque groupe d'analyse :
      a. Cliquez sur **Add Scanning Rule**.
      b. Saisissez `.` dans le champ **Define Regex to match** pour faire correspondre tous les logs.
      c. Sélectionnez **Entire Event** dans le champ **Scan the entire event or a portion of it**.
      d. Saisissez `sds:true` dans le champ **Add tags**.
      e. Laissez le champ **Define action on match** sur **No action**.
      f. Nommez la règle d'analyse, par exemple : "Créer un tag sds".
      g. Cliquez sur **Create**.

## Générer des métriques de logs custom

Datadog propose un ensemble de [métriques d'utilisation des logs][3] qui vous permet d'obtenir une estimation de l'utilisation. Toutefois, comme ces métriques ne peuvent pas être modifiées, vous avez la possibilité de générer des métriques de logs custom adaptées à votre utilisation des logs.

L'utilisation étant calculée en gigaoctets (Go) ou en millions d'événements selon le produit, vous devez générer deux métriques différentes :

- Une métrique qui compte le nombre d'octets ingérés.
- Une métrique qui compte le nombre d'événements ingérés.

Lors de la configuration de métriques custom, les tags spécifiés dans le champ `group by` correspondent aux dimensions de votre métrique. Utilisez ces champs pour filtrer et agréger les métriques une fois qu'elles ont été générées. Assurez-vous d'ajouter les tags suivants dans le champ `group by` :

- `datadog_index` : si le log est acheminé, le nom de l'index vers lequel il est acheminé est inclus dans le tag.
- `datadog_is_excluded` : indique si le log est rejeté par un filtre d'exclusion dans l'index acheminé.
- Tous les tags personnalisés que vous avez configurés précédemment (`team`, `retention_period`, `online_archives` et `sds`).

Consultez la section [Générer une métrique basée sur des logs][9] pour découvrir comment générer des métriques.

<div class="alert alert-info">Vous devez à tout prix vous assurer d'inclure tous les tags pertinents dans les dimensions de la métrique, car en cas de modification de la configuration d'une métrique (comme les filtres de requête, les dimensions, etc.), cette nouvelle configuration ne sera pas appliquée aux logs déjà ingérés.</div>

{{< img src="logs/faq/logs_cost_attribution/bytes_injected_metric.png" alt="Formulaire de nouvelle métrique affichant logs.estimated.usage.ingested_bytes comme nom de métrique et le champ Group by avec les tags mentionnés" style="width:75%" >}}

{{< img src="logs/faq/logs_cost_attribution/events_injected_metric.png" alt="Formulaire de nouvelle métrique affichant logs.estimated.usage.ingested_events comme nom de métrique et le champ Group by avec les tags mentionnés" style="width:75%" >}}

## Créer un dashboard en utilisant les métriques de logs custom

Il existe plusieurs façons d'utiliser les métriques de logs custom générées dans Datadog. Vous pouvez par exemple visualiser les métriques dans des dashboards, créer des alertes basées sur ces métriques, les utiliser dans des notebooks, les interroger dans le Metrics Explorer, et plus encore.

Datadog vous recommande de [créer un dashboard][10] avec un [widget Tableau][11] pour chacun des produits suivants afin de surveiller leur utilisation :

- Ingestion des logs
- Scanner de données sensibles pour les logs
- Indexation des logs par période de rétention (3, 7, 15, 30 jours, et ainsi de suite)
- Online Archives

Pour créer un dashboard :

1. Accédez à la [liste des dashboards][12].
2. Cliquez sur **New Dashboard* en haut à droite.
3. Attribuez un nom au dashboard.
4. Cliquez sur **New Dashboard**.

### Créer un widget pour l'utilisation de l'ingestion des logs

Pour l'ingestion des logs, Datadog vous recommande de configurer le widget Tableau comme suit :

1. Dans le dashboard, cliquez sur **Add Widgets**.
2. Sélectionnez le widget **Table**.
3. Dans le champ **Metrics**, sélectionnez la métrique count **bytes** que vous avez générée précédemment pour compter le nombre d'octets ingérés.
4. Sélectionnez le champ **sum by** et ajoutez le tag `team` pour afficher l'utilisation en octets et par équipe. Vous pouvez également ajouter d'autres tags pour vos autres unités de coûts, comme le tag `host` pour afficher l'utilisation par host.
5. Ajoutez la formule suivante pour convertir l'utilisation en coûts : `Usage in gigabytes` * `Unit cost for Log Ingestion`.
      **Remarque** : si votre prix contractuel par gigaoctet change, vous devez modifier vous-même la formule.
6. Cliquez sur **Save**.

{{< img src="logs/faq/logs_cost_attribution/logs_ingestion_metric_widget.png" alt="Formulaire de modification du widget affichant les données renseignées pour l'utilisation de l'ingestion des logs" style="width:75%" >}}

{{< img src="logs/faq/logs_cost_attribution/ingestion_widget.png" alt="Widget Tableau affichant l'utilisation et les coûts d'ingestion ventilés par équipe" style="width:60%" >}}

### Créer un widget pour le scanner de données sensibles

Pour le scanner de données sensibles, Datadog vous recommande de configurer le widget Tableau comme suit :

1. Dans le dashboard, cliquez sur **Add Widgets**.
2. Sélectionnez le widget **Table**.
3. Dans le champ **Metrics**, sélectionnez la métrique count **bytes** que vous avez générée précédemment pour compter le nombre d'octets ingérés.
4. Dans le champ **from**, saisissez `sds:true` pour ne garder que les logs qui ont été analysés par le scanner de données sensibles.
5. Sélectionnez le champ **sum by** et ajoutez le tag `team` pour afficher l'utilisation en octets et par équipe. Vous pouvez également ajouter d'autres tags pour vos autres unités de coûts.
6. Ajoutez la formule suivante pour convertir l'utilisation en coûts : `Usage in gigabytes` *`Unit cost for the Sensitive Data Scanner`.
      **Remarque** : si votre prix contractuel par gigaoctet change, vous devez modifier vous-même la formule.
7. Cliquez sur **Save**.

{{< img src="logs/faq/logs_cost_attribution/sds_metric_widget.png" alt="Formulaire de modification du widget affichant les données renseignées pour l'utilisation du scanner de données sensibles" style="width:75%" >}}

{{< img src="logs/faq/logs_cost_attribution/sds_widget.png" alt="Widget Tableau affichant l'utilisation du scanner de données sensibles ventilée par équipe" style="width:60%" >}}


### Créer un widget pour l'utilisation de l'indexation des logs

Étant donné que l'indexation est facturée en fonction du nombre de jours de rétention des logs, vous devez créer un widget pour chaque période de rétention.

Pour l'indexation des logs, Datadog vous recommande de configurer le widget Tableau comme suit :

1. Dans le dashboard, cliquez sur **Add Widgets**.
2. Sélectionnez le widget **Table**.
3. Sélectionnez la métrique count **events** que vous avez générée précédemment pour compter le nombre d'événements ingérés.
4. Dans le champ **from**, ajoutez ce qui suit :
      a. `datadog_index:*` pour ne garder que les logs acheminés vers des index.
      b. `datadog_is_excluded:false` pour ne garder que les logs qui ne correspondent à aucun filtre d'exclusion.
      c. `retention_period:7` pour ne garder que les logs conservés pendant 7 jours. Si vous utilisez la même période de rétention pour tous vos index, inutile d'ajouter ce tag, car il n'a pas été configuré. Si vous avez d'autres tags `retention_period`, créez un widget pour chacun d'entre eux.
5. Sélectionnez le champ **sum by** et ajoutez le tag `team` pour afficher l'utilisation sous forme d'événements et par équipe. Vous pouvez également ajouter d'autres tags pour vos autres unités de coûts.
6. Ajoutez la formule suivante pour convertir l'utilisation en coûts : `Usage in millions of events` * `Unit cost for 7 days of retention`. Si votre prix contractuel par million d'événements change, vous devez modifier vous-même la formule.
7. Cliquez sur **Save**.

Créez des widgets pour chaque tag `retention_period`.

{{< img src="logs/faq/logs_cost_attribution/indexing_metric_widget.png" alt="Formulaire de modification du widget affichant les données renseignées pour l'utilisation de l'indexation des logs" style="width:75%" >}}

{{< img src="logs/faq/logs_cost_attribution/7_day_indexing_widget.png" alt="Widget Tableau affichant l'utilisation de l'indexation sur 7 jours ventilée par équipe" style="width:60%" >}}

### Créer un widget pour l'utilisation de Online Archives

Lorsque Online Archives est activé pour un index, les logs sont dupliqués et sont transférés vers :

1. les filtres d'exclusion (les logs ne sont indexés que s'ils passent par des filtres d'exclusion) ; et
2. Online Archives directement.

Par conséquent, les filtres d'exclusion ne s'appliquent pas aux logs transférés vers Online Archives.

{{< img src="logs/faq/logs_cost_attribution/exclusion_filters_online_archives.png" alt="Index Online Archives affichant un pipeline pour les filtres d'exclusion et un pipeline pour Online Archives" style="width:75%" >}}

Sur la base de ces informations, Datadog vous recommande de configurer le widget Tableau pour Online Archives comme suit :

1. Dans le dashboard, cliquez sur **Add Widgets**.
2. Sélectionnez le widget **Table**.
3. Dans le champ **Metrics**, sélectionnez la métrique count **events** que vous avez générée précédemment pour compter le nombre d'événements ingérés.
4. Dans le champ **from**, ajoutez ce qui suit :
      - `datadog_index:*` pour ne garder que les logs acheminés vers des index.
      - `online_archives:true` pour ne garder que les logs acheminés vers Online Archives.
5. Sélectionnez le champ **sum by** et ajoutez le tag `team` pour afficher l'utilisation sous forme d'événements et par équipe. Vous pouvez également ajouter d'autres tags pour vos autres unités de coûts.
6. Ajoutez la formule suivante pour convertir l'utilisation en coûts : `Usage in millions of events` * `Unit cost for Online Archives`.
      **Remarque** : si votre prix contractuel par million d'événements change, vous devez modifier vous-même la formule.
7. Cliquez sur **Save**.

{{< img src="logs/faq/logs_cost_attribution/online_archives_metric_widget.png" alt="Formulaire de modification du widget affichant les données renseignées pour l'utilisation de Online Archives" style="width:75%" >}}

### Créer un widget pour l'utilisation totale et les coûts totaux

Vous pouvez regrouper tous les produits dans un seul widget pour afficher l'utilisation et les coûts totaux. Datadog vous recommande de configurer le widget Tableau comme suit :

1. Dans le dashboard, cliquez sur **Add Widgets**.
2. Sélectionnez le widget **Table**.
3. Ajoutez dans ce widget toutes les requêtes et formules créées dans les autres widgets :
    - [Ingestion des logs](#creer-un-widget-pour-l-utilisation-de-l-ingestion-des-logs)
    - [Scanner de données sensibles pour les logs](#creer-un-widget-pour-le-scanner-de-données-sensibles)
    - [Indexation des logs](#creer-un-widget-pour-l-utilisation-de-l-indexation-des-logs)
    - [Online Archives](#creer-un-widget-pour-l-utilisation-de-online-archives)
4. Cliquez sur **Save**.

{{< img src="logs/faq/logs_cost_attribution/all_metrics_widget.png" alt="Section Graph your data du widget Tableau affichant six métriques différentes" style="width:75%" >}}

### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30602/log-management---estimated-usage
[2]: https://app.datadoghq.com/billing/usage
[3]: /fr/logs/log_configuration/logs_to_metrics/#logs-usage-metrics
[4]: https://app.datadoghq.com/logs/pipelines
[5]: /fr/getting_started/tagging/#tagging-methods
[6]: /fr/logs/log_configuration/processors/?tab=ui#category-processor
[7]: /fr/logs/log_configuration/processors/?tab=api#category-processor
[8]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner
[9]: /fr/logs/log_configuration/logs_to_metrics/#generate-a-log-based-metric
[10]: /fr/dashboards/#new-dashboard
[11]: /fr/dashboards/widgets/table/
[12]: https://app.datadoghq.com/dashboard/lists
