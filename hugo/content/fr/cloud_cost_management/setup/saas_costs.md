---
aliases:
- /fr/cloud_cost_management/saas_costs
disable_toc: false
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Cloud Cost Management
- link: /cloud_cost_management/setup/aws
  tag: Documentation
  text: Obtenez des informations sur votre facture AWS
- link: /cloud_cost_management/setup/azure
  tag: Documentation
  text: Obtenez des informations sur votre facture Azure
- link: /cloud_cost_management/setup/google_cloud
  tag: Documentation
  text: Obtenez des informations sur votre facture Google Cloud
- link: /cloud_cost_management/setup/oracle
  tag: Documentation
  text: Obtenez des informations sur votre facture Oracle
- link: /cloud_cost_management/setup/custom
  tag: Documentation
  text: Obtenez des informations sur vos coûts personnalisés
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: Blog
  text: Analysez rapidement et de manière exhaustive les coûts cloud et SaaS liés
    à vos services
- link: https://www.datadoghq.com/blog/cursor-cloud-cost-management/
  tag: Blog
  text: Gérez les coûts de Cursor avec Datadog Cloud Cost Management
title: Coûts SaaS et IA
---
## Présentation {#overview}

Les coûts SaaS et IA vous permettent d'envoyer des données de coûts **directement depuis vos fournisseurs** en configurant les comptes associés à vos données de coûts cloud dans Datadog.

{{< card-grid >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=snowflake#configure-your-saas-accounts" src="integrations_logos/snowflake_small.svg" alt="snowflake" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=databricks#configure-your-saas-accounts" src="integrations_logos/databricks_small.svg" alt="databricks" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=openai#configure-your-saas-accounts" src="integrations_logos/openai_small.svg" alt="openai" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=anthropic#configure-your-saas-accounts" src="integrations_logos/anthropic_small.svg" alt="anthropic" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=cursor#configure-your-saas-accounts" src="integrations_logos/cursor_small.svg" alt="cursor" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=temporalcloud#configure-your-saas-accounts" src="integrations_logos/temporal_small.svg" alt="temporal cloud" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=github#configure-your-saas-accounts" src="integrations_logos/github_small.svg" alt="github" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=confluentcloud#configure-your-saas-accounts" src="integrations_logos/confluent-cloud_small.svg" alt="confluent cloud" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=mongodb#configure-your-saas-accounts" src="integrations_logos/mongodb_small.svg" alt="mongodb" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=elasticcloud#configure-your-saas-accounts" src="integrations_logos/elastic-cloud_small.svg" alt="elastic cloud" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=fastly#configure-your-saas-accounts" src="integrations_logos/fastly_small.svg" alt="fastly" >}}
  {{< image-card href="/cloud_cost_management/setup/saas_costs/?tab=twilio#configure-your-saas-accounts" src="integrations_logos/twilio_small.svg" alt="twilio" >}}
{{< /card-grid >}}

Si votre fournisseur n'est pas pris en charge, utilisez [Coûts personnalisés][1] pour importer n'importe quelle source de données de coûts dans Datadog et comprendre le coût total de vos services. Seuls les coûts SaaS en USD sont pris en charge pour le moment.

## Configuration {#setup}

Accédez à [**Cloud Cost** > **Paramètres**, sélectionnez **Comptes**][8] puis cliquez sur {{< ui >}}Configure{{< /ui >}} sur un fournisseur pour collecter les données de coûts.

{{< img src="cloud_cost/saas_costs/all_accounts.png" alt="Ajoutez vos comptes AWS, Azure et Google Cloud pour collecter les données de coûts. Vous pouvez également ajouter vos comptes pour Fastly, Snowflake, Confluent Cloud, MongoDB, Databricks, OpenAI, Twilio, GitHub, Cursor et Temporal Cloud" style="width:100%" >}}

{{< tabs >}}

{{% tab "Snowflake" %}}

1. Trouvez votre [URL de compte Snowflake][102].
   {{< img src="integrations/snowflake/snowflake_account_url.png" alt="Le menu de compte avec l'option de copie de l'URL de compte sélectionnée dans l'interface utilisateur de Snowflake" style="width:100%;" >}}
2. Accédez à la [tuile d'intégration Snowflake][101] dans Datadog et cliquez sur {{< ui >}}Add Snowflake Account{{< /ui >}}.
3. Saisissez l'URL de votre compte Snowflake dans le champ {{< ui >}}Account URL{{< /ui >}}. Par exemple : `https://xyz12345.us-east-1.snowflakecomputing.com`.
4. Sous la section {{< ui >}}Connect your Snowflake account{{< /ui >}}, cliquez sur le bouton bascule pour activer Snowflake dans Cloud Cost Management.
5. Saisissez votre nom d'utilisateur Snowflake dans le champ {{< ui >}}User Name{{< /ui >}}.
6. Suivez l'étape 4 de la page [Intégration Snowflake][103] pour créer un rôle et un utilisateur spécifiques à Datadog afin de surveiller Snowflake.
7. Suivez l'étape 5 de la page [Intégration Snowflake][103] pour configurer l'authentification par paire clé-valeur.
8. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Les données de coût Snowflake des 6 derniers mois sont disponibles dans Cloud Cost Management sous 24 heures. Pour accéder aux données disponibles collectées par chaque intégration de coût SaaS, consultez la section [Données collectées](#data-collected).

**Tags de requête Snowflake**

Les [tags de requête de Snowflake][105] sont des chaînes de métadonnées puissantes qui peuvent être associées aux requêtes. L'[intégration de gestion des coûts Snowflake][101] ingère des tags de requête [analysables au format JSON][106] présents dans une liste d'autorisation séparée par des virgules trouvée dans la tuile d'intégration Snowflake.

Par exemple, si une organisation souhaite regrouper ses coûts de calcul Snowflake par les dimensions `team` et `application`, elle peut choisir de taguer ses requêtes Snowflake pour l'application d'une équipe spécifique de la manière suivante :

```
ALTER SESSION SET QUERY_TAG = '{"team": "devops", "application": "CI_job_executor"}';
```
{{< img src="cloud_cost/saas_costs/snowflake_query_tags_example.png" alt="Regroupez les coûts par tags de requête d'application et d'équipe." style="width:100%" >}}

Par conséquent, les coûts de toutes les requêtes exécutées avec les tags de requête `team` et `application` sont attribuables à ces concepts.

Pour utiliser les tags de requête dans la gestion des coûts, assurez-vous des points suivants :

- La chaîne `query_tag` doit être analysable au format JSON. Plus précisément, cela signifie que la chaîne est traitable par la fonction native `PARSE_JSON`.

- Une liste d'autorisation de clés doit être fournie dans la tuile d'intégration Snowflake. Ces clés correspondent à la première couche du champ `query_tag` au format JSON. Cette liste d'autorisation apparaît sous la forme d'une liste de chaînes séparées par des virgules, par exemple : `tag_1,tag_2,tag_3`. Assurez-vous que les chaînes ne contiennent que des caractères alphanumériques, des traits de soulignement, des traits d'union et des points. Vous pouvez saisir ces informations dans la tuile Snowflake, sous {{< ui >}}Resources Collected{{< /ui >}} > {{< ui >}}Cloud Cost Management{{< /ui >}} > {{< ui >}}Collected Query Tags{{< /ui >}}.

**Remarque** : Sélectionnez vos tags de requête en tenant compte de l'ampleur des données. Les tags de requête appropriés sont ceux qui ont une cardinalité de groupe faible à moyenne (par exemple : équipe, utilisateur, service). La sélection d'un tag de requête avec une cardinalité de groupe élevée (telle qu'un UUID unique associé à des exécutions de jobs) peut entraîner des problèmes de goulot d'étranglement pour l'ingestion de données et le rendu frontal.

**Tags d'objet Snowflake CCM**

Les tags d'objet sont des chaînes définies par l'utilisateur que vous pouvez associer aux objets Snowflake pour une meilleure auditabilité et une analyse des coûts. Par exemple, pour suivre les coûts par équipe, taguez vos entrepôts avec les équipes respectives qui les utilisent.

Toute la configuration des tags d'objet s'effectue dans [Snowflake][104].

Remarques :
- **Héritage de tags** : les objets Snowflake respectent une structure hiérarchique et l'intégration CCM prend en compte les tags hérités lors de la soumission des données de coût.

{{< img src="cloud_cost/saas_costs/snowflake_setup.png" alt="Intégrez Snowflake pour collecter des données de coût." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/snowflake-web
[102]: https://docs.snowflake.com/en/user-guide/organizations-connect
[103]: /fr/integrations/snowflake-web/#cloud-cost-management
[104]: https://docs.snowflake.com/en/user-guide/object-tagging
[105]: https://docs.snowflake.com/en/sql-reference/parameters#query-tag
[106]: https://docs.snowflake.com/en/sql-reference/functions/parse_json

{{% /tab %}}

{{% tab "Databricks" %}}

1. Accédez à la [tuile d'intégration Databricks][101] dans Datadog et cliquez sur {{< ui >}}Configure{{< /ui >}}.
2. Saisissez le nom de l'espace de travail, l'URL, l'ID client et le secret client correspondant à votre principal de service Databricks.
3. Sous la section {{< ui >}}Select products to set up integration{{< /ui >}}, cliquez sur le bouton bascule pour chaque compte afin d'activer Databricks `Cloud Cost Management`.
4. Saisissez un `System Tables SQL Warehouse ID` correspondant à l'entrepôt de votre instance Databricks pour interroger les données de facturation des tables système.
5. Cliquez sur {{< ui >}}Save Databricks Workspace{{< /ui >}}.

Votre principal de service nécessite un accès en lecture aux [tables système](https://docs.databricks.com/aws/en/admin/system-tables/) au sein d'Unity Catalog. Dans Databricks, ouvrez le {{< ui >}}SQL Editor{{< /ui >}} et exécutez les commandes suivantes, en utilisant l'ID client du principal de service (et non son nom d'affichage) :

```sql
GRANT USE CATALOG ON CATALOG system TO `<CLIENT-ID>`;
GRANT USE SCHEMA ON CATALOG system TO `<CLIENT-ID>`;
GRANT SELECT ON CATALOG system TO `<CLIENT-ID>`;
```

Vos données de coût Databricks des 15 derniers mois sont accessibles dans Cloud Cost Management après 24 heures. Pour accéder aux données disponibles collectées par chaque intégration de coût SaaS, consultez la section [Données collectées](#data-collected).

{{< img src="cloud_cost/saas_costs/databricks_setup_1.png" alt="Intégrez Databricks pour collecter des données de coût." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/databricks

{{% /tab %}}


{{% tab "OpenAI" %}}

<div class="alert alert-danger">Une <strong>clé d'API avec périmètre administrateur est requise</strong> pour collecter les données de coût OpenAI pour Cloud Cost Management. Les clés d'API avec périmètre projet ne peuvent pas collecter de données de coût.</div>

1. Créez une [clé d'API administrateur][103] dans les paramètres de votre compte OpenAI :
   - Connectez-vous à votre [compte OpenAI][104].
   - Accédez à la [page des clés administrateur][105] ou allez dans {{< ui >}}API keys{{< /ui >}} sous {{< ui >}}Organization settings{{< /ui >}} et sélectionnez l'onglet {{< ui >}}Admin keys{{< /ui >}}.
   - Cliquez sur {{< ui >}}Create a new secret key{{< /ui >}} et copiez la clé d'API administrateur créée.
2. Accédez à la [tuile d'intégration OpenAI][102] dans Datadog et cliquez sur {{< ui >}}Add Account{{< /ui >}}.
3. Saisissez le nom de votre compte OpenAI, entrez votre clé d'API administrateur et, éventuellement, spécifiez des tags.
4. Sous la section {{< ui >}}Resources{{< /ui >}}, cliquez sur le bouton bascule de chaque compte pour activer `OpenAI Billing Usage Data Collection`.
5. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Vos données de coût OpenAI des 15 derniers mois sont accessibles dans Cloud Cost Management après 24 heures. Pour accéder aux données disponibles collectées par chaque intégration de coût SaaS, consultez la section [Données collectées](#data-collected).

{{< img src="cloud_cost/saas_costs/openai_setup.png" alt="Intégrez OpenAI pour collecter des données de coût." style="width:100%" >}}

[102]: https://app.datadoghq.com/integrations/openai
[103]: https://platform.openai.com/docs/api-reference/admin-api-keys
[104]: https://platform.openai.com/
[105]: https://platform.openai.com/settings/organization/admin-keys

{{% /tab %}}

{{% tab "Anthropic" %}}

### 1. Générez une clé d'API administrateur {#1-generate-an-admin-api-key}

Commencez par obtenir une [clé d'API administrateur](https://docs.anthropic.com/en/api/administration-api) auprès d'Anthropic. Cette clé permet d'accéder aux rapports d'utilisation et de coûts dans toute votre organisation.

1. Accédez aux paramètres de votre organisation ou contactez votre administrateur de compte Anthropic pour créer une nouvelle clé d'API administrateur.
2. Copiez la clé d'API dans un emplacement sécurisé.

### 2. Configurez l'intégration Datadog {#2-configure-the-datadog-integration}

1. Dans Datadog, accédez à [**Integrations > Anthropic Usage and Costs**](https://app.datadoghq.com/integrations?integrationId=anthropic-usage-and-costs).
2. Sous l'onglet {{< ui >}}Configure{{< /ui >}}, dans {{< ui >}}Account details{{< /ui >}}, collez la {{< ui >}}Admin API Key{{< /ui >}} provenant d'Anthropic.
3. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Une fois votre configuration enregistrée, Datadog commence à interroger les endpoints d'utilisation et de coûts d'Anthropic à l'aide de cette clé, et renseigne les métriques dans votre environnement.

**Remarque** : Pour suivre les coûts des comptes Anthropic Enterprise et des comptes de plateforme, répétez les étapes de configuration pour ajouter une entrée de compte distincte pour chaque type de clé d'API. Utilisez la [clé d'API administrateur](https://docs.anthropic.com/en/api/administration-api) pour l'utilisation standard de la plateforme, et la clé d'API Enterprise Analytics pour l'utilisation d'Anthropic Enterprise.

{{% /tab %}}

{{% tab "Cursor" %}}

<div class="alert alert-warning">Un forfait Enterprise et un rôle d'administrateur d'équipe sont requis pour générer une clé d'API administrateur Cursor. Les comptes avec un forfait d'équipe standard renvoient des erreurs d'accès refusé.</div>

### 1. Générez une clé d'API administrateur {#1-generate-an-admin-api-key-1}

Commencez par obtenir une clé d'API administrateur auprès de Cursor. Cette clé permet d'accéder aux rapports d'utilisation et de coûts de votre équipe.

1. Dans le dashboard Cursor, accédez à **Settings > Advanced > Admin API Keys**.
2. Créez une nouvelle clé d'API administrateur et copiez-la dans un emplacement sécurisé.

### 2. Configurez l'intégration Datadog {#2-configure-the-datadog-integration-1}

1. Dans Datadog, accédez à [**Integrations > Cursor**][101].
2. Sous l'onglet {{< ui >}}Configure{{< /ui >}}, dans {{< ui >}}Account details{{< /ui >}}, collez la {{< ui >}}Admin API Key{{< /ui >}} provenant de Cursor.
3. Dans la section {{< ui >}}Resources{{< /ui >}}, cliquez sur le bouton bascule de chaque compte pour activer `Cursor in Cloud Cost Management`.
4. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Une fois votre configuration enregistrée, Datadog commence à interroger les endpoints d'utilisation et de coûts de Cursor à l'aide de cette clé, et renseigne les métriques dans votre environnement. Vos données de coûts Cursor des 15 derniers mois sont accessibles dans Cloud Cost Management après 24 heures. Pour accéder aux données disponibles collectées par chaque intégration de coût SaaS, consultez la section [Données collectées](#data-collected).

[101]: https://app.datadoghq.com/integrations/cursor

{{% /tab %}}

{{% tab "Temporal Cloud" %}}

<div class="alert alert-warning">Un compte de service doté du rôle <strong>Finance Admin</strong> ou <strong>Account Owner</strong> est requis pour générer une clé d'API de facturation Temporal Cloud. Les rôles Metrics Read-Only et Account Admin ne peuvent pas accéder à l'API de facturation.</div>

### 1. Générez une clé d'API de facturation {#1-generate-a-billing-api-key}

1. Dans Temporal Cloud, accédez à **Settings > Service Accounts > Create Service Account**.
2. Attribuez au compte de service le rôle **Finance Admin** ou **Account Owner**.
3. Générez une clé d'API pour le compte de service et copiez-la dans un emplacement sécurisé. Temporal Cloud n'affiche la clé qu'une seule fois.

### 2. Configurez l'intégration Datadog {#2-configure-the-datadog-integration-2}

1. Dans Datadog, accédez à [**Integrations > Temporal Cloud Cost Management**][110].
2. Cliquez sur {{< ui >}}Install Integration{{< /ui >}}, puis cliquez sur {{< ui >}}Configure{{< /ui >}}.
3. Cliquez sur {{< ui >}}Add Account{{< /ui >}} et collez la clé d'API de facturation provenant de Temporal Cloud.
4. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Une fois votre configuration enregistrée, Datadog commence à interroger l'API de facturation Temporal Cloud à l'aide de cette clé et renseigne les métriques dans votre environnement. Vos données de coût Temporal Cloud sont accessibles dans Cloud Cost Management sous 25 à 30 heures. Pour accéder aux données disponibles collectées par chaque intégration de coût SaaS, consultez la section [Données collectées](#data-collected).

[110]: https://app.datadoghq.com/integrations/temporal-cloud-costs

{{% /tab %}}

{{% tab "GitHub" %}}

1. Créez un jeton d'autorisation personnel (classique), avec les périmètres `manage_billing:enterprise` et `read:org` sur la page [Personal Access Tokens][109] dans GitHub.
2. Accédez à la tuile [GitHub Costs][108] de Datadog.
3. Cliquez sur {{< ui >}}Add New{{< /ui >}}.
4. Saisissez un nom de compte, votre jeton d'accès personnel et votre nom d'entreprise (au format `enterprise-name`), ainsi que tous les tags appropriés.
5. Cliquez sur le bouton en forme de coche pour enregistrer ce compte.

Vos données de coût GitHub des 15 derniers mois sont accessibles dans Cloud Cost Management sous 24 heures. Pour accéder aux données disponibles collectées par chaque intégration de coût SaaS, consultez la section [Données collectées](#data-collected).

{{< img src="cloud_cost/saas_costs/github_setup.png" alt="Intégrez-vous à GitHub pour collecter des données de coût." style="width:100%" >}}

[108]: https://app.datadoghq.com/integrations/github-costs
[109]: https://github.com/settings/tokens

{{% /tab %}}

{{% tab "Confluent Cloud" %}}

1. Créez ou obtenez une clé d'API avec le rôle [billing admin][102] dans Confluent Cloud.
2. Accédez à la [tuile d'intégration Confluent Cloud][101] dans Datadog et cliquez sur {{< ui >}}Add Account{{< /ui >}}.
3. Saisissez le nom de votre compte Confluent Cloud, votre clé d'API, votre secret API et, éventuellement, spécifiez des tags.
4. Sous la section {{< ui >}}Resources{{< /ui >}}, cliquez sur le bouton bascule pour {{< ui >}}Collect cost data to view in Cloud Cost Management{{< /ui >}}.
5. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Vos données de coût Confluent Cloud deviennent disponibles dans Cloud Cost Management 24 heures après la configuration. Ces données incluent automatiquement 12 mois d'historique, le maximum fourni par l'API de facturation Confluent. Au cours des trois prochains mois, les données s'étendront progressivement pour couvrir 15 mois d'historique. Pour accéder aux données disponibles collectées par chaque intégration de coût SaaS, consultez la section [Données collectées](#data-collected).

Si vous souhaitez collecter des tags au niveau du cluster ou des tags de métadonnées métier pour vos coûts, vous pouvez ajouter une clé d'API et un secret Schema Registry. Veuillez consulter [Schema Management on Confluent Cloud][103] pour plus d'informations.

{{< img src="cloud_cost/saas_costs/confluent_setup_1.png" alt="Intégrez-vous à Confluent pour collecter des données de coût." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/confluent-cloud
[102]: https://docs.confluent.io/cloud/current/security/access-control/rbac/predefined-rbac-roles.html#billingadmin-role
[103]: https://docs.confluent.io/cloud/current/get-started/schema-registry.html#quick-start-for-schema-management-on-ccloud

{{% /tab %}}
{{% tab "MongoDB" %}}

1. [Créez un jeton d'API][101] dans MongoDB avec les autorisations `Organizational Billing Viewer`, et ajoutez les autorisations `Organizational Read Only` pour les tags de ressources de cluster.
2. Accédez à la [tuile d'intégration MongoDB Cost Management][102] dans Datadog et cliquez sur {{< ui >}}Add New{{< /ui >}}.
3. Saisissez le nom de votre compte MongoDB, votre clé publique, votre clé privée, votre ID d'organisation et, éventuellement, spécifiez des tags.
4. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Vos données de coût MongoDB des 15 derniers mois sont accessibles dans Cloud Cost Management après 24 heures. Pour accéder aux données disponibles collectées par chaque intégration de coût SaaS, consultez la section [Données collectées](#data-collected).

{{< img src="cloud_cost/saas_costs/mongodb_setup.png" alt="Intégrez-vous à MongoDB pour collecter des données de coût." style="width:100%" >}}

[101]: https://www.mongodb.com/docs/cloud-manager/reference/user-roles/#organization-roles
[102]: https://app.datadoghq.com/integrations/mongodb-cost-management

{{% /tab %}}

{{% tab "Elastic Cloud" %}}

1. Accédez à la section [API Key][102] dans les paramètres de votre organisation Elastic Cloud.
2. Cliquez sur {{< ui >}}Create New Key{{< /ui >}}.
3. Choisissez un {{< ui >}}Name{{< /ui >}} et {{< ui >}}Expiration Date{{< /ui >}} pour votre clé d'API.
4. Sélectionnez le rôle {{< ui >}}Billing Admin{{< /ui >}}.
5. Cliquez sur {{< ui >}}Create Key{{< /ui >}} pour générer la clé.
6. Accédez à la [tuile d'intégration Elastic Cloud][101] dans Datadog
7. Cliquez sur {{< ui >}}Add Account{{< /ui >}}.
8. Saisissez votre {{< ui >}}Elastic Cloud Organization ID{{< /ui >}} et {{< ui >}}Billing API Key{{< /ui >}} dans le tableau des comptes.

Vos données de coût Elastic Cloud des 15 derniers mois sont accessibles dans Cloud Cost Management après 24 heures. Pour accéder aux données disponibles collectées par chaque intégration de coût SaaS, consultez la section [Données collectées](#data-collected).

{{< img src="cloud_cost/saas_costs/elasticcloud_setup.png" alt="Intégrez-vous à Elastic Cloud pour collecter des données de coût." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/elastic-cloud-ccm
[102]: https://cloud.elastic.co/account/keys

{{% /tab %}}

{{% tab "Fastly" %}}

1. Créez un jeton d'API avec au moins le périmètre `"global:read"` et le rôle `"Billing"` sur la page [Personal API tokens][101] dans Fastly.
2. Accédez à la [tuile d'intégration Fastly Cost Management][102] dans Datadog et cliquez sur {{< ui >}}Add New{{< /ui >}}.
3. Saisissez le nom de votre compte Fastly et votre jeton d'API.
4. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Vos données de coût Fastly des 15 derniers mois sont accessibles dans Cloud Cost Management après 24 heures. Pour accéder aux données disponibles collectées par chaque intégration de coût SaaS, consultez la section [Données collectées](#data-collected).

{{< img src="cloud_cost/saas_costs/fastly_setup_1.png" alt="Intégrez-vous à Fastly pour collecter des données de coût." style="width:100%" >}}

[101]: https://manage.fastly.com/account/personal/tokens
[102]: https://app.datadoghq.com/integrations/fastly-cost-management

{{% /tab %}}
{{% tab "Twilio" %}}

1. Accédez à la [tuile d'intégration Twilio][101] dans Datadog et cliquez sur {{< ui >}}Add Account{{< /ui >}}.
2. Sous la section {{< ui >}}Resources{{< /ui >}}, cliquez sur le commutateur de chaque compte pour activer `Twilio in Cloud Cost Management`.
3. Saisissez un {{< ui >}}Account SID{{< /ui >}} pour votre compte Twilio.
4. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Vos données de coût Twilio des 15 derniers mois sont accessibles dans Cloud Cost Management après 24 heures. Pour accéder aux données disponibles collectées par chaque intégration de coût SaaS, consultez la section [Données collectées](#data-collected).

{{< img src="cloud_cost/saas_costs/twilio_setup.png" alt="Intégrez Twilio pour collecter des données de coût." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/twilio

{{% /tab %}}
{{< /tabs >}}

## Données collectées {#data-collected}

Vous pouvez consulter les données de coût sur la [**Cloud Cost Explorer** page][3], sur le [Cloud Cost Tag Explorer][4], et dans les [dashboards][5], [notebooks][6] ou [monitors][7]. Vous pouvez également combiner ces métriques de coût avec d'autres [métriques Cloud Cost][2] ou [métriques d'observabilité].

Le tableau suivant contient une liste non exhaustive de tags prêts à l'emploi associés à chaque intégration SaaS Cost.

{{< tabs >}}
{{% tab "Snowflake" %}}

<table>
  <thead>
    <tr>
      <th style="width: 200px;">Nom du tag</th>
      <th>Description du tag</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>account_locator</code></td>
      <td>Localisateur du compte où l'utilisation a été consommée.</td>
    </tr>
    <tr>
      <td><code>account_name</code></td>
      <td>Nom du compte où l'utilisation a été consommée.</td>
    </tr>
    <tr>
      <td><code>balance_source</code></td>
      <td>Source des fonds utilisés pour payer l'utilisation quotidienne. La source peut être l'une des suivantes : <br>- <b>capacity</b> : Utilisation payée avec les crédits restants sur l'engagement de capacité d'une organisation.<br>- <b>rollover</b> : Utilisation payée avec des crédits de report. Lorsqu'une organisation renouvelle un engagement de capacité, les crédits inutilisés sont ajoutés au solde du nouveau contrat en tant que crédits de report.<br>- <b>free usage</b> : Utilisation couverte par les crédits gratuits fournis à l'organisation.<br>- <b>overage</b> : Utilisation payée au tarif à la demande, ce qui se produit lorsqu'une organisation a épuisé ses crédits de capacité, de report et gratuits.<br>- <b>rebate</b> : Utilisation couverte par les crédits accordés à l'organisation lorsqu'elle a partagé des données avec une autre organisation.</td>
    </tr>
    <tr>
      <td><code>billing_type</code></td>
      <td>Indique ce qui est facturé ou crédité. Les types de facturation possibles incluent :<br>- <b>consumption</b> : Utilisation associée aux crédits de calcul, aux coûts de stockage et aux coûts de transfert de données.<br>- <b>rebate</b> : Utilisation couverte par les crédits accordés à l'organisation lorsqu'elle a partagé des données avec une autre organisation.<br>- <b>priority support</b> : Frais pour les services de support prioritaire. Cette charge est associée à une stipulation dans un contrat, et non à un compte.<br>- <b>vps_deployment_fee</b> : Frais pour un déploiement Virtual Private Snowflake.<br>- <b>support_credit</b> : Snowflake Support a crédité le compte pour annuler des frais attribués à un problème dans Snowflake.</td>
    </tr>
    <tr>
      <td><code>charge_description</code></td>
      <td>Une description du type de coût associé à des éléments distincts. Les descriptions diffèrent pour chaque type de coût, représenté par la <code>servicename</code> tag.</td>
    </tr>
    <tr>
      <td><code>contract_number</code></td>
      <td>Numéro de contrat Snowflake pour l'organisation.</td>
    </tr>
    <tr>
      <td><code>database_name</code></td>
      <td>Nom de la base de données dans laquelle la requête a été exécutée (le cas échéant). Uniquement trouvé pour les coûts d'<b>attribution de requête</b>.</td>
    </tr>
    <tr>
      <td><code>organization_name</code></td>
      <td>Nom de l'organisation.</td>
    </tr>
    <tr>
      <td><code>query_hash</code></td>
      <td>Hachage unique représentant une version paramétrée de la requête à des fins d'attribution. Uniquement trouvé pour les coûts d'<b>attribution de requête</b>.</td>
    </tr>
    <tr>
      <td><code>query_hash_version</code></td>
      <td>Version de l'algorithme de hachage de requête Snowflake utilisé pour générer <code>query_hash</code>. Uniquement trouvé pour les coûts de <b>query attribution</b>.</td>
    </tr>
    <tr>
      <td><code>rating_type</code></td>
      <td>Indique comment l'utilisation dans l'enregistrement est évaluée ou tarifée. Les valeurs possibles incluent :<br>- <b>compute</b><br>- <b>data_transfer</b><br>- <b>storage</b><br>- <b>Other</b></td>
    </tr>
    <tr>
      <td><code>region</code></td>
      <td>Nom de la région où se trouve le compte.</td>
    </tr>
    <tr>
      <td><code>service_level</code></td>
      <td>Niveau de service (édition) du compte Snowflake (Standard, Enterprise ou Business Critical).</td>
    </tr>
    <tr>
      <td><code>servicename</code></td>
      <td>Type d'utilisation. Les types de service possibles incluent :<br>- <b>automatic_clustering</b> : Reportez-vous à Automatic Clustering.<br>- <b>data_transfer</b> : Reportez-vous à Understanding data transfer cost.<br>- <b>logging</b> : Reportez-vous à Logging and Tracing Overview.<br>- <b>materialized_view</b> : Reportez-vous à Working with Materialized Views.<br>- <b>replication</b> : Reportez-vous à Introduction to replication and failover across multiple accounts.<br>- <b>query_acceleration</b> : Reportez-vous à Using the Query Acceleration Service.<br>- <b>search_optimization</b> : Reportez-vous à Search Optimization Service.<br>- <b>serverless_task</b> : Reportez-vous à Introduction to tasks.<br>- <b>snowpipe</b> : Reportez-vous à Snowpipe.<br>- <b>snowpipe_streaming</b> : Reportez-vous à Snowpipe Streaming.<br>- <b>storage</b> : Reportez-vous à Understanding storage cost.<br>- <b>warehouse_metering_query_attribution</b> : Reportez-vous à Virtual warehouse credit usage of queries with an execution time of 100ms or greater. N'indique pas l'utilisation du calcul serverless ou des services cloud.<br>- <b>warehouse_metering_query_attribution</b> : Reportez-vous à Virtual warehouse credit usage of queries with an execution time of 100ms or less, as well as idle warehouse time. N'indique pas l'utilisation du calcul serverless ou des services cloud.</td>
    </tr>
    <tr>
      <td><code>user_name</code></td>
      <td>Nom de l'utilisateur ou du compte de service associé à la requête.</td>
    </tr>
    <tr>
      <td><code>warehouse_id</code></td>
      <td>Identifiant de l'entrepôt générant le coût.</td>
    </tr>
    <tr>
      <td><code>warehouse_name</code></td>
      <td>Nom de l'entrepôt associé à cette utilisation.</td>
    </tr>
    <tr>
      <td><code>warehouse_size</code></td>
      <td>Taille de l'entrepôt (par exemple, Large, Medium).</td>
    </tr>
  </tbody>
</table>

{{% /tab %}}
{{% tab "Databricks" %}}

**Remarque** : L'intégration des coûts Databricks calcule les coûts en utilisant les prix catalogue et les données d'utilisation. Elle ne reflète aucun tarif négocié ou réduit.

<table>
  <thead>
    <tr>
      <th style="width: 220px;">Nom du tag</th>
      <th>Description du tag</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>account_id</code></td>
      <td>ID du compte pour lequel ce rapport a été généré.</td>
    </tr>
    <tr>
      <td><code>billing_origin_product</code></td>
      <td>Produit ou fonctionnalité à l'origine de l'événement de facturation (par exemple, JOBS, CLUSTERS).</td>
    </tr>
    <tr>
      <td><code>central_clean_room_id</code></td>
      <td>ID de la salle blanche centrale associée à la charge de travail (le cas échéant).</td>
    </tr>
    <tr>
      <td><code>charge_description</code></td>
      <td>Combinaison du type de cloud et du nom de la SKU associée (par exemple, AWS - PREMIUM_ALL_PURPOSE_COMPUTE).</td>
    </tr>
    <tr>
      <td><code>cloud</code></td>
      <td>Cloud pour lequel cette utilisation est pertinente. Les valeurs possibles sont AWS, AZURE et GCP.</td>
    </tr>
    <tr>
      <td><code>cluster_id</code></td>
      <td>ID du cluster associé à cette utilisation.</td>
    </tr>
    <tr>
      <td><code>custom_tags</code></td>
      <td>Tags personnalisés appliqués à l'utilisation, généralement sous forme de paires clé-valeur pour des métadonnées ou une catégorisation supplémentaires.</td>
    </tr>
    <tr>
      <td><code>destination_region</code></td>
      <td>Région où la charge de travail est dirigée (le cas échéant).</td>
    </tr>
    <tr>
      <td><code>dlt_maintenance_id</code></td>
      <td>ID de maintenance pour Delta Live Tables (le cas échéant).</td>
    </tr>
    <tr>
      <td><code>dlt_pipeline_id</code></td>
      <td>ID du pipeline Delta Live Tables (le cas échéant).</td>
    </tr>
    <tr>
      <td><code>dlt_tier</code></td>
      <td>Niveau du service Delta Live Tables (le cas échéant).</td>
    </tr>
    <tr>
      <td><code>dlt_update_id</code></td>
      <td>ID de mise à jour Delta Live Table associé à cette utilisation (le cas échéant).</td>
    </tr>
    <tr>
      <td><code>endpoint_id</code></td>
      <td>ID de l'endpoint pour une utilisation basée sur SQL ou liée au service (le cas échéant).</td>
    </tr>
    <tr>
      <td><code>endpoint_name</code></td>
      <td>Nom de l'endpoint SQL ou de service (le cas échéant).</td>
    </tr>
    <tr>
      <td><code>instance_pool_id</code></td>
      <td>ID du pool d'instances utilisé (le cas échéant).</td>
    </tr>
    <tr>
      <td><code>is_photon</code></td>
      <td>Indique si le traitement Photon a été utilisé (<code>true</code> ou <code>false</code>).</td>
    </tr>
    <tr>
      <td><code>is_serverless</code></td>
      <td>Indique si l'utilisation concerne une ressource de calcul serverless (<code>true</code> ou <code>false</code>).</td>
    </tr>
    <tr>
      <td><code>job_id</code></td>
      <td>Identifiant unique du job dans Databricks.</td>
    </tr>
    <tr>
      <td><code>job_name</code></td>
      <td>Nom du job dans Databricks (le cas échéant).</td>
    </tr>
    <tr>
      <td><code>job_run_id</code></td>
      <td>Identifiant de l'exécution spécifique du job (le cas échéant).</td>
    </tr>
    <tr>
      <td><code>jobs_tier</code></td>
      <td>Niveau du job, tel que <code>CLASSIC</code> ou <code>PREMIUM</code>.</td>
    </tr>
    <tr>
      <td><code>networking</code></td>
      <td>Type de mise en réseau utilisé pour ce job, si spécifié.</td>
    </tr>
    <tr>
      <td><code>node_type</code></td>
      <td>Type de nœud utilisé dans cet enregistrement de facturation (par exemple, m5d.large).</td>
    </tr>
    <tr>
      <td><code>notebook_id</code></td>
      <td>ID du notebook utilisé dans cet enregistrement de facturation (le cas échéant).</td>
    </tr>
    <tr>
      <td><code>notebook_path</code></td>
      <td>Chemin d'accès au notebook dans Databricks (le cas échéant).</td>
    </tr>
    <tr>
      <td><code>record_id</code></td>
      <td>ID unique pour cet enregistrement.</td>
    </tr>
    <tr>
      <td><code>run_name</code></td>
      <td>Nom du job ou de l'exécution du workflow actuel (le cas échéant).</td>
    </tr>
    <tr>
      <td><code>serving_type</code></td>
      <td>Type de modèle de service utilisé, le cas échéant (par exemple, Model Serving).</td>
    </tr>
    <tr>
      <td><code>source_region</code></td>
      <td>Région d'origine de cet enregistrement de facturation (le cas échéant).</td>
    </tr>
    <tr>
      <td><code>sql_tier</code></td>
      <td>Niveau SQL associé à l'utilisation (le cas échéant).</td>
    </tr>
    <tr>
      <td><code>usage_metadata</code></td>
      <td>Métadonnées relatives à l'utilisation, pouvant inclure des détails tels que le type d'utilisation, la catégorie de service ou d'autres informations pertinentes.</td>
    </tr>
    <tr>
      <td><code>usage_type</code></td>
      <td>Type d'utilisation facturé (par exemple, COMPUTE_TIME).</td>
    </tr>
    <tr>
      <td><code>warehouse_id</code></td>
      <td>ID de l'entrepôt SQL (le cas échéant).</td>
    </tr>
    <tr>
      <td><code>workspace_id</code></td>
      <td>ID de l'espace de travail auquel cette utilisation était associée.</td>
    </tr>
  </tbody>
</table>

{{% /tab %}}

{{% tab "OpenAI" %}}

| Nom du tag | Description du tag |
|---|---|
| `charge_description` | Nom du modèle dont les coûts sont associés à la facturation. |
| `organization_id` | Identifiant unique de l'organisation. |
| `organization_name` | Nom de l'organisation. |
| `project_id` | Identifiant unique du projet. |
| `project_name` | Nom du projet. |

{{% /tab %}}

{{% tab "Anthropic" %}}

| Nom du tag | Description du tag |
|---|---|
| `workspace_id` | Identifiant unique de l'espace de travail Anthropic. |
| `workspace_name` | Version normalisée par tag du nom de l'espace de travail. |
| `display_workspace_name` | Nom inchangé de l'espace de travail. |
| `org_id` | Identifiant unique de l'organisation Anthropic. |
| `org_name` | Version normalisée par tag du nom de l'organisation Anthropic. |
| `display_org_name` | Nom inchangé de l'organisation. |
| `org_type` | Le type de compte Anthropic (par exemple, `enterprise` ou `platform`). |
| `model_id` | L'identifiant canonique du modèle Anthropic (par exemple, `claude-3-opus-20240229`). |
| `model` | Un alias pour `model_id`, fourni pour des raisons de compatibilité et de cohérence avec l'utilisation et les métriques. |
| `model_name` | Le nom convivial du modèle (par exemple, `Claude 3 Opus`). |
| `service_tier` | Le plan ou le niveau de service Anthropic associé à l'utilisation (par exemple, `standard`, `pro`, `enterprise`). |
| `token_type` | La catégorie de jetons consommés.|
| `context_window` | La taille de la fenêtre de contexte pour les jetons (par exemple, `tier_0-200k`). |

{{% /tab %}}

{{% tab "Cursor" %}}

| Nom du tag | Description du tag |
|---|---|
| `billing_group` | Le groupe de facturation au sein de l'organisation Cursor auquel l'utilisation est attribuée. |
| `charge_type` | La catégorie de frais Cursor (par exemple, `fast_premium`, `slow_premium`). |
| `hour` | L'heure à laquelle l'utilisation a été enregistrée, en UTC. |
| `is_headless` | Indique si l'utilisation a été générée par une session sans interface, telle qu'un agent en arrière-plan s'exécutant en dehors de l'éditeur Cursor (`true` ou `false`). |
| `max_mode` | Indique si la requête a utilisé Cursor Max, qui achemine les requêtes vers des modèles de pointe à un coût plus élevé (`true` ou `false`). |
| `user` | L'adresse e-mail de l'utilisateur Cursor ayant engendré le coût. |

{{% /tab %}}

{{% tab "Temporal Cloud" %}}

**Remarque** : Les tags d'espace de noms personnalisés configurés dans Temporal Cloud sont affichés sous forme de tags `temporal_tag_<key>` dynamiques (par exemple, un espace de noms tagué `tmprl_project` apparaît sous la forme `temporal_tag_tmprl_project`).

| Nom du tag | Description du tag |
|---|---|
| `namespace` | L'espace de noms Temporal Cloud auquel l'utilisation est attribuée (par exemple, `replay-2025`). |
| `billing_account` | Le compte de facturation Temporal Cloud associé aux frais. |
| `billing_account_id` | L'identifiant unique du compte de facturation Temporal Cloud. |
| `resource_type` | Le type de ressource générant l'utilisation (par exemple, `Namespace`). |
| `service_subcategory` | La catégorie d'utilisation entraînant la facturation (par exemple, `Actions`, `Active Storage`, `Retained Storage`). |
| `sku_id` | L'identifiant unique de la SKU Temporal Cloud associée à la facturation (par exemple, `business-actions`, `business-active-storage`). |
| `sku_meter` | Le compteur de SKU Temporal Cloud utilisé pour calculer la facturation (par exemple, `Actions`, `Active Storage`, `Retained Storage`). |
| `charge_category` | La catégorie des frais Temporal Cloud (par exemple, `usage`). |
| `pricing_unit` | L'unité utilisée pour tarifer les frais (par exemple, `GB/h`, `1 Million Actions`). |
| `usage_unit` | L'unité d'utilisation mesurée pour les frais (par exemple, `GB/h`, `1 Million Actions`). |
| `unit_price` | Le prix par unité d'utilisation. |
| `invoice_id` | L'identifiant unique de la facture Temporal Cloud associée à la facturation. |

{{% /tab %}}

{{% tab "GitHub" %}}

**Remarque** : L'intégration des coûts GitHub estime les coûts sur la base des prix catalogue et des données d'utilisation, et inclut les valeurs de remise lorsqu'elles sont disponibles. Elle ne prend pas en compte les tarifs négociés.

| Nom du tag | Description du tag |
|---|---|
| `enterprise_name` | Chaîne alphanumérique identifiant le compte d'entreprise GitHub. |
| `charge_description` | La description de la facturation. |
| `product` | Le produit de l'utilisation, par exemple « actions » ou « stockage ». |
| `organization_name` | L'organisation GitHub. |
| `repository_name` | Le dépôt GitHub. |
| `billing_currency` | La devise de facturation, par exemple « USD ». |
| `discount` | Si l'élément de coût est une remise. |

{{% /tab %}}

{{% tab "Confluent Cloud" %}}

<table>
  <thead>
    <tr>
      <th style="width: 200px;">Nom du tag</th>
      <th>Description du tag</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>charge_description</code></td>
      <td>Le sous-type du coût (par exemple, KAFKA_NETWORK_WRITE).</td>
    </tr>
    <tr>
      <td><code>environment_id</code></td>
      <td>L'identifiant unique de l'environnement.</td>
    </tr>
    <tr>
      <td><code>network_access_type</code></td>
      <td>Type d'accès réseau pour le cluster. Les valeurs possibles sont <code>INTERNET</code>, <code>TRANSIT_GATEWAY</code>, <code>PRIVATE_LINK</code>, et <code>PEERED_VPC</code>.</td>
    </tr>
    <tr>
      <td><code>product</code></td>
      <td>Nom du produit. Les valeurs possibles incluent <code>KAFKA</code>, <code>CONNECT</code>, <code>KSQL</code>, <code>AUDIT_LOG</code>, <code>STREAM_GOVERNANCE</code>, <code>CLUSTER_LINK</code>, <code>CUSTOM_CONNECT</code>, <code>FLINK</code>, <code>SUPPORT_CLOUD_BASIC</code>, <code>SUPPORT_CLOUD_DEVELOPER</code>, <code>SUPPORT_CLOUD_BUSINESS</code>, et <code>SUPPORT_CLOUD_PREMIER</code>.</td>
    </tr>
    <tr>
      <td><code>resource_id</code></td>
      <td>L'identifiant unique de la ressource Confluent.</td>
    </tr>
    <tr>
      <td><code>resource_name</code></td>
      <td>Le nom de la ressource Confluent.</td>
    </tr>
  </tbody>
</table>

{{% /tab %}}

{{% tab "Elastic Cloud" %}}

| Nom du tag | Description du tag |
|---|---|
| `charge_description` | L'unité de gestion des stocks (SKU) d'une charge. |
| `kind` | Le type de ressource. |
| `name` | L'identifiant unique de la ressource Elastic Cloud. |
| `price_per_hour` | Le coût de la ressource Elastic Cloud par heure. |

{{% /tab %}}
{{% tab "MongoDB" %}}

| Nom du tag | Description du tag |
|---|---|
| `charge_description` | La description d'une charge. |
| `cluster_name` | Le nom du cluster ayant engendré la charge. |
| `group_id` | ID du projet auquel le poste de dépense est associé. |
| `invoice_id` | L'identifiant unique de la facture. |
| `mongo_org_id` | ID de l'organisation MongoDB. |
| `replica_set_name` | Nom du jeu de réplicas auquel l'élément de ligne est associé. |
| `resource_tags` | Tags arbitraires sur les clusters définis par les utilisateurs, généralement sous forme de paires clé-valeur. |
| `status` | État du paiement. |

{{% /tab %}}

{{% tab "Fastly" %}}

<table>
  <thead>
    <tr>
      <th style="width: 200px;">Nom du tag</th>
      <th>Description du tag</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>charge_description</code></td>
      <td>La description de la charge.</td>
    </tr>
    <tr>
      <td><code>credit_coupon_code</code></td>
      <td>Code de tout coupon ou crédit appliqué à cette entrée de coût (si disponible).</td>
    </tr>
    <tr>
      <td><code>plan_name</code></td>
      <td>Nom du plan auquel ce service appartient, correspondant souvent à « product_line ».</td>
    </tr>
    <tr>
      <td><code>product_name</code></td>
      <td>Nom du produit spécifique facturé (par exemple, « North America Bandwidth »).</td>
    </tr>
    <tr>
      <td><code>product_group</code></td>
      <td>Groupe ou catégorie du produit, tel que « Full Site Delivery ».</td>
    </tr>
    <tr>
      <td><code>product_line</code></td>
      <td>Gamme de produits à laquelle cet élément appartient, par exemple « Network Services ».</td>
    </tr>
    <tr>
      <td><code>region</code></td>
      <td>Région où l'utilisation du service a eu lieu (par exemple, « North America »).</td>
    </tr>
    <tr>
      <td><code>service_name</code></td>
      <td>Nom du service associé à cette entrée de coût, correspondant souvent au <code>product_name</code>.</td>
    </tr>
    <tr>
      <td><code>usage_type</code></td>
      <td>Type d'utilisation facturé (par exemple, « Bandwidth »).</td>
    </tr>
    <tr>
      <td><code>usage_type_cd</code></td>
      <td>Code ou libellé représentant le type d'utilisation, tel que « North America Bandwidth ». </td>
    </tr>
  </tbody>
</table>

{{% /tab %}}
{{% tab "Twilio" %}}

<table>
  <thead>
    <tr>
      <th style="width: 200px;">Nom du tag</th>
      <th>Description du tag</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>account_sid</code></td>
      <td>Chaîne alphanumérique identifiant le compte Twilio.</td>
    </tr>
    <tr>
      <td><code>category</code></td>
      <td>La catégorie d'utilisation. Pour plus d'informations, consultez <a href="https://www.twilio.com/docs/usage/api/usage-record#usage-categories" target="_blank">Usage Categories</a>.</td>
    </tr>
    <tr>
      <td><code>charge_description</code></td>
      <td>La description de la charge.</td>
    </tr>
    <tr>
      <td><code>count_unit</code></td>
      <td>Unités dans lesquelles le nombre est mesuré, telles que les appels pour les appels ou les messages pour les SMS.</td>
    </tr>
    <tr>
      <td><code>usage_unit</code></td>
      <td>Unités dans lesquelles l'utilisation est mesurée, telles que les minutes pour les appels ou les messages pour les SMS.</td>
    </tr>
  </tbody>
</table>

[101]: https://www.twilio.com/docs/usage/api/usage-record#usage-categories

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/cloud_cost_management/setup/custom
[2]: /fr/cloud_cost_management
[3]: https://app.datadoghq.com/cost/explorer
[4]: https://app.datadoghq.com/cost/tags?cloud=custom
[5]: /fr/dashboards
[6]: /fr/notebooks
[7]: /fr/monitors/types/cloud_cost
[8]: https://app.datadoghq.com/cost/settings/accounts