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
  text: Mieux comprendre votre facture AWS
- link: /cloud_cost_management/setup/azure
  tag: Documentation
  text: Mieux comprendre votre facture Azure
- link: /cloud_cost_management/setup/google_cloud
  tag: Documentation
  text: Mieux comprendre votre facture Google Cloud
- link: /cloud_cost_management/setup/oracle
  tag: Documentation
  text: Mieux comprendre votre facture Oracle
- link: /cloud_cost_management/setup/custom
  tag: Documentation
  text: Mieux connaître vos coûts personnalisés
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: Blog
  text: Analysez rapidement et de façon exhaustive les coûts cloud et SaaS associés
    à vos services
is_beta: true
private: true
title: Intégrations des coûts du SaaS
---

{{< callout btn_hidden="true" header="Profitez de l'aperçu !">}}
Les intégrations de coûts SaaS sont en aperçu.
{{< /callout >}}

## Présentation

Les intégrations des coûts Saas vous permettent d'envoyer des données de coûts **directement depuis vos fournisseurs** en configurant les comptes associés à vos données de coûts cloud dans Datadog. 

{{< partial name="cloud_cost/cost-integrations.html" >}}

</br>

Si votre fournisseur n'est pas pris en charge, utilisez [Custom Costs][1] pour charger n'importe quelle source de données de coûts vers Datadog et comprendre le coût total de vos services. Seuls les coûts SaaS en USD sont pris en charge pour le moment.

## Configuration

Pour utiliser les intégrations de coûts SaaS, vous devez configurer [Cloud Cost Management][2] pour AWS, Azure, Google Cloud ou Oracle Cloud.

Consultez la documentation respective pour votre fournisseur de cloud :

{{< partial name="cloud_cost/getting-started.html" >}}

</br>

### Configurer vos comptes SaaS

Accédez à [**Cloud Cost** > **Settings**, sélectionnez **Accounts**][8], puis cliquez sur **Configure** sur un fournisseur pour collecter les données de coûts.

{{< img src="cloud_cost/saas_costs/all_accounts.png" alt="Ajoutez vos comptes avec AWS, Azure, Google Cloud pour collecter les données de coûts. Vous pouvez également ajouter vos comptes pour Fastly, Snowflake, Confluent Cloud, MongoDB, Databricks, OpenAI, Twilio et GitHub" style="width:100%" >}}

{{< tabs >}}

{{% tab "Snowflake" %}}

1. Trouvez votre [URL de compte Snowflake][102].
   {{< img src="integrations/snowflake/snowflake_account_url.png" alt="Le menu de compte avec l'option de copie de l'URL de compte sélectionnée dans l'interface utilisateur Snowflake" style="width:100%;" >}}
2. Accédez au [carreau d'intégration Snowflake][101] dans Datadog et cliquez sur **Add Snowflake Account**.
3. Saisissez votre URL de compte Snowflake dans le champ `Account URL`. Par exemple : `https://xyz12345.us-east-1.snowflakecomputing.com`.
4. Sous la section **Connect your Snowflake account**, cliquez sur le bouton bascule pour activer Snowflake dans Cloud Cost Management.
5. Saisissez votre nom d'utilisateur Snowflake dans le champ `User Name`.
6. Suivez l'étape 4 de la page d'[intégration Snowflake][103] pour créer un rôle et un utilisateur spécifiques à Datadog pour surveiller Snowflake.
7. Suivez l'étape 5 de la page d'[intégration Snowflake][103] pour configurer l'authentification par paire clé-valeur.
8. Cliquez sur **Save**.

Vos données de coûts Snowflake des 15 derniers mois sont accessibles dans Cloud Cost Management après 24 heures. Pour accéder aux données disponibles collectées par chaque intégration SaaS Cost Integration, consultez la section [Données collectées](#donnees-collectees).

**Tags de requête Snowflake**

Les [tags de requête de Snowflake][105] sont de puissantes chaînes de métadonnées qui peuvent être associées à des requêtes. L'[intégration Snowflake Cost Management][101] ingère les tags de requête [analysables en JSON][106] présents dans une liste d'autorisation séparée par des virgules trouvée dans le carreau d'intégration Snowflake.

Par exemple, si une organisation souhaite regrouper ses coûts de calcul Snowflake par les dimensions `team` et `application`, elle peut choisir de taguer ses requêtes Snowflake pour l'application d'une équipe spécifique de la manière suivante :
```
ALTER SESSION SET QUERY_TAG = '{"team": "devops", "application": "CI_job_executor"}';
```
{{< img src="cloud_cost/saas_costs/snowflake_query_tags_example.png" alt="Regrouper les coûts par tags de requête team et application." style="width:100%" >}}

En conséquence, les coûts de toutes les requêtes exécutées avec les tags de requête `team` et `application` sont attribuables à ces concepts.

Pour utiliser les tags de requête dans la gestion des coûts, assurez-vous que les conditions suivantes sont remplies :

- La chaîne `query_tag` doit être analysable en JSON. Plus précisément, cela signifie que la chaîne peut être traitée par la fonction native `PARSE_JSON`.

- Une liste d'autorisation de clés doit être fournie dans le carreau d'intégration Snowflake. Ces clés correspondent à la première couche du champ `query_tag` au format JSON. Cette liste d'autorisation apparaît sous la forme d'une liste de chaînes séparées par des virgules, par exemple : `tag_1,tag_2,tag_3`. Assurez-vous que les chaînes contiennent uniquement des caractères alphanumériques, des traits de soulignement, des traits d'union et des points. Vous pouvez saisir ces informations dans le carreau Snowflake, sous **Resources Collected -> Cloud Cost Management -> Collected Query Tags**.

**Remarque** : sélectionnez vos tags de requête en gardant à l'esprit l'ampleur des données. Les tags de requête appropriés sont ceux qui ont une cardinalité de groupe faible à moyenne (par exemple : équipe, utilisateur, service). La sélection d'un tag de requête avec une cardinalité de groupe élevée (comme un UUID unique associé aux exécutions de tâches) peut entraîner des problèmes de goulot d'étranglement pour l'ingestion de données et le rendu frontal.

**Tags d'objets CCM Snowflake**

Les tags d'objets sont des chaînes définies par l'utilisateur que vous pouvez attacher aux objets Snowflake pour une auditabilité et une analyse des coûts améliorées. Par exemple, pour suivre les coûts par équipe, taguez vos entrepôts avec les équipes respectives qui les utilisent.

Toute la configuration des tags d'objets se fait dans [Snowflake][104].

Remarques :
- **Héritage de tags** : les objets Snowflake adhèrent à une structure hiérarchique, et l'intégration CCM prend en compte les tags hérités lors de la soumission des données de coûts.

{{< img src="cloud_cost/saas_costs/snowflake_setup.png" alt="Intégrer avec Snowflake pour collecter les données de coûts." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/snowflake-web
[102]: https://docs.snowflake.com/en/user-guide/organizations-connect
[103]: /fr/integrations/snowflake-web/#cloud-cost-management
[104]: https://docs.snowflake.com/en/user-guide/object-tagging
[105]: https://docs.snowflake.com/en/sql-reference/parameters#query-tag
[106]: https://docs.snowflake.com/en/sql-reference/functions/parse_json

{{% /tab %}}

{{% tab "Databricks" %}}

1. Accédez au [carreau d'intégration Databricks][101] dans Datadog et cliquez sur **Configure**.
2. Saisissez le nom de l'espace de travail, l'URL, l'ID client et le secret client correspondant à votre principal de service Databricks.
3. Sous la section **Select products to set up integration**, cliquez sur le bouton bascule pour chaque compte afin d'activer Databricks `Cloud Cost Management`.
4. Saisissez un `System Tables SQL Warehouse ID` correspondant à l'entrepôt de votre instance Databricks pour interroger les données de facturation des tables système.
5. Cliquez sur **Save Databricks Workspace**.

Votre principal de service nécessite un accès en lecture aux [tables système](https://docs.databricks.com/aws/en/admin/system-tables/) dans Unity Catalog.
```sql
GRANT USE CATALOG ON CATALOG system TO <service_principal>;
GRANT USE SCHEMA ON CATALOG system TO <service_principal>;
GRANT SELECT ON CATALOG system TO <service_principal>;
```

Vos données de coûts Databricks des 15 derniers mois sont accessibles dans Cloud Cost Management après 24 heures. Pour accéder aux données disponibles collectées par chaque intégration SaaS Cost Integration, consultez la section [Données collectées](#donnees-collectees).

{{< img src="cloud_cost/saas_costs/databricks_setup_1.png" alt="Intégrer avec Databricks pour collecter les données de coûts." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/databricks

{{% /tab %}}


{{% tab "OpenAI" %}}

1. Créez une [clé API de projet][101] ou une [clé API d'administrateur][103] dans les paramètres de votre compte dans OpenAI. Assurez-vous que la clé dispose d'un accès en lecture aux portées d'API Usage et Management.
2. Accédez au [carreau d'intégration OpenAI][102] dans Datadog et cliquez sur **Add Account**.
3. Saisissez le nom de votre compte OpenAI, saisissez votre clé API et, éventuellement, spécifiez des tags.
4. Sous la section **Resources**, cliquez sur le bouton bascule pour chaque compte afin d'activer `OpenAI Billing Usage Data Collection`.
5. Cliquez sur **Save**.

Vos données de coûts OpenAI des 15 derniers mois sont accessibles dans Cloud Cost Management après 24 heures. Pour accéder aux données disponibles collectées par chaque intégration SaaS Cost Integration, consultez la section [Données collectées](#donnees-collectees).

{{< img src="cloud_cost/saas_costs/openai_setup.png" alt="Intégrer avec OpenAI pour collecter les données de coûts." style="width:100%" >}}

[101]: https://platform.openai.com/docs/api-reference/project-api-keys
[102]: https://app.datadoghq.com/integrations/openai
[103]: https://platform.openai.com/docs/api-reference/admin-api-keys

{{% /tab %}}

{{% tab "Anthropic" %}}

### 1. Générer une clé API d'administrateur

Commencez par obtenir une [clé API d'administrateur](https://docs.anthropic.com/en/api/administration-api) auprès d'Anthropic. Cette clé permet d'accéder aux rapports d'utilisation et de coûts dans toute votre organisation.

1. Accédez aux paramètres de votre organisation ou contactez l'administrateur de votre compte Anthropic pour créer une nouvelle clé API d'administrateur.
2. Copiez la clé API dans un emplacement sécurisé.

### 2. Configurer l'intégration Datadog

1. Dans Datadog, accédez à [**Integrations > Anthropic Usage and Costs**](https://app.datadoghq.com/integrations?integrationId=anthropic-usage-and-costs).
2. Dans l'onglet **Configure**, sous **Account details**, collez la **Admin API Key** d'Anthropic.
3. Cliquez sur **Save**.

Après avoir enregistré votre configuration, Datadog commence à interroger les endpoints d'utilisation et de coûts d'Anthropic à l'aide de cette clé et remplit les métriques dans votre environnement.

{{% /tab %}}

{{% tab "GitHub" %}}

1. Créez un token d'autorisation personnel (classic), avec les portées `manage_billing:enterprise` et `read:org` sur la page [Personal Access Tokens][109] dans GitHub.
2. Accédez au [carreau GitHub Costs][108] de Datadog.
3. Cliquez sur **Add New**.
4. Saisissez un nom de compte, votre token d'accès personnel et le nom de votre entreprise (au format `enterprise-name`), ainsi que tous les tags appropriés.
5. Cliquez sur le bouton de coche pour enregistrer ce compte.

Vos données de coûts GitHub des 15 derniers mois sont accessibles dans Cloud Cost Management dans les 24 heures. Pour accéder aux données disponibles collectées par chaque intégration SaaS Cost Integration, consultez la section [Données collectées](#donnees-collectees).

{{< img src="cloud_cost/saas_costs/github_setup.png" alt="Intégrer avec GitHub pour collecter les données de coûts." style="width:100%" >}}

[108]: https://app.datadoghq.com/integrations/github-costs
[109]: https://github.com/settings/tokens

{{% /tab %}}

{{% tab "Confluent Cloud" %}}

1. Créez ou acquérez une clé API avec le rôle [billing admin][102] dans Confluent Cloud.
2. Accédez au [carreau d'intégration Confluent Cloud][101] dans Datadog et cliquez sur **Add Account**.
3. Saisissez le nom de votre compte Confluent Cloud, la clé API, le secret API et, éventuellement, spécifiez des tags.
4. Sous la section **Resources**, cliquez sur le bouton bascule pour `Collect cost data to view in Cloud Cost Management`.
5. Cliquez sur **Save**.

Vos données de coûts Confluent Cloud deviennent disponibles dans Cloud Cost Management 24 heures après la configuration. Ces données incluent automatiquement 12 mois d'historique, le maximum fourni par l'API de facturation Confluent. Au cours des trois prochains mois, les données s'étendront progressivement pour couvrir 15 mois d'historique. Pour accéder aux données disponibles collectées par chaque intégration SaaS Cost Integration, consultez la section [Données collectées](#donnees-collectees).

Si vous souhaitez collecter des tags au niveau du cluster ou des tags de métadonnées métier pour vos coûts, vous pouvez ajouter une clé API et un secret Schema Registry. Veuillez consulter [Schema Management on Confluent Cloud][103] pour plus d'informations.

{{< img src="cloud_cost/saas_costs/confluent_setup_1.png" alt="Intégrer avec Confluent pour collecter les données de coûts." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/confluent-cloud
[102]: https://docs.confluent.io/cloud/current/security/access-control/rbac/predefined-rbac-roles.html#billingadmin-role
[103]: https://docs.confluent.io/cloud/current/get-started/schema-registry.html#quick-start-for-schema-management-on-ccloud

{{% /tab %}}
{{% tab "MongoDB" %}}

1. [Créez un token API][101] dans MongoDB avec les autorisations `Organizational Billing Viewer` et ajoutez les autorisations `Organizational Read Only` pour les tags de ressources de cluster.
2. Accédez au [carreau d'intégration MongoDB Cost Management][102] dans Datadog et cliquez sur **Add New**.
3. Saisissez le nom de votre compte MongoDB, la clé publique, la clé privée, l'ID organisationnel et, éventuellement, spécifiez des tags.
4. Cliquez sur **Save**.

Vos données de coûts MongoDB des 15 derniers mois sont accessibles dans Cloud Cost Management après 24 heures. Pour accéder aux données disponibles collectées par chaque intégration SaaS Cost Integration, consultez la section [Données collectées](#donnees-collectees).

{{< img src="cloud_cost/saas_costs/mongodb_setup.png" alt="Intégrer avec MongoDB pour collecter les données de coûts." style="width:100%" >}}

[101]: https://www.mongodb.com/docs/cloud-manager/reference/user-roles/#organization-roles
[102]: https://app.datadoghq.com/integrations/mongodb-cost-management

{{% /tab %}}

{{% tab "Elastic Cloud" %}}

1. Accédez à la section [API Key][102] dans les paramètres de votre organisation Elastic Cloud.
2. Cliquez sur **Create New Key**.
3. Choisissez un **Name** et une **Expiration Date** pour votre clé API.
4. Sélectionnez le rôle **Billing Admin**.
5. Cliquez sur **Create Key** pour générer la clé.
6. Accédez au [carreau d'intégration Elastic Cloud][101] dans Datadog
7. Cliquez sur **Add Account**.
8. Saisissez votre **Elastic Cloud Organization ID** et votre **Billing API Key** dans le tableau de comptes.

Vos données de coûts Elastic Cloud des 15 derniers mois sont accessibles dans Cloud Cost Management après 24 heures. Pour accéder aux données disponibles collectées par chaque intégration SaaS Cost Integration, consultez la section [Données collectées](#donnees-collectees).

{{< img src="cloud_cost/saas_costs/elasticcloud_setup.png" alt="Intégrer avec Elastic Cloud pour collecter les données de coûts." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/elastic-cloud-ccm
[102]: https://cloud.elastic.co/account/keys

{{% /tab %}}

{{% tab "Fastly" %}}

1. Créez un token API avec au moins la portée `"global:read"` et le rôle `"Billing"` sur la page [Personal API tokens][101] dans Fastly.
2. Accédez au [carreau d'intégration de gestion des coûts Fastly][102] dans Datadog et cliquez sur **Add New**.
3. Saisissez le nom de votre compte Fastly et le token API.
4. Cliquez sur **Save**.

Vos données de coûts Fastly des 15 derniers mois sont accessibles dans Cloud Cost Management après 24 heures. Pour accéder aux données disponibles collectées par chaque intégration SaaS Cost Integration, consultez la section [Données collectées](#donnees-collectees).

{{< img src="cloud_cost/saas_costs/fastly_setup_1.png" alt="Intégrer avec Fastly pour collecter les données de coûts." style="width:100%" >}}

[101]: https://manage.fastly.com/account/personal/tokens
[102]: https://app.datadoghq.com/integrations/fastly-cost-management

{{% /tab %}}
{{% tab "Twilio" %}}

1. Accédez au [carreau d'intégration Twilio][101] dans Datadog et cliquez sur **Add Account**.
2. Sous la section **Resources**, cliquez sur le bouton bascule pour chaque compte afin d'activer `Twilio in Cloud Cost Management`.
3. Saisissez un `Account SID` pour votre compte Twilio.
4. Cliquez sur **Save**.

Vos données de coûts Twilio des 15 derniers mois sont accessibles dans Cloud Cost Management après 24 heures. Pour accéder aux données disponibles collectées par chaque intégration SaaS Cost Integration, consultez la section [Données collectées](#donnees-collectees).

{{< img src="cloud_cost/saas_costs/twilio_setup.png" alt="Intégrer avec Twilio pour collecter les données de coûts." style="width:100%" >}}

[101]: https://app.datadoghq.com/integrations/twilio

{{% /tab %}}
{{< /tabs >}}

## Données collectées

Vous pouvez consulter les données de coûts sur la [page **Cloud Cost Explorer**][3], le [Cloud Cost Tag Explorer][4], et dans les [dashboards][5], [notebooks][6] ou [monitors][7]. Vous pouvez également combiner ces métriques de coûts avec d'autres [métriques de coûts cloud][2] ou métriques d'observabilité.

Le tableau suivant contient une liste non exhaustive de tags prêts à l'emploi associés à chaque intégration SaaS Cost.

{{< tabs >}}
{{% tab "Snowflake" %}}

<table> <thead> <tr> <th style="width: 200px;">Nom du tag</th> <th>Description du tag</th> </tr> </thead> <tbody> <tr> <td><code>account_locator</code></td> <td>Localisateur du compte où l'utilisation a été consommée.</td> </tr> <tr> <td><code>account_name</code></td> <td>Nom du compte où l'utilisation a été consommée.</td> </tr> <tr> <td><code>balance_source</code></td> <td>Source des fonds utilisés pour payer l'utilisation quotidienne. La source peut être l'une des suivantes :<br>- <b>capacity</b> : utilisation payée avec les crédits restants sur l'engagement de capacité d'une organisation.<br>- <b>rollover</b> : utilisation payée avec des crédits reportés. Lorsqu'une organisation renouvelle un engagement de capacité, les crédits inutilisés sont ajoutés au solde du nouveau contrat en tant que crédits reportés.<br>- <b>free usage</b> : utilisation couverte par les crédits gratuits fournis à l'organisation.<br>- <b>overage</b> : utilisation payée au tarif à la demande, qui se produit lorsqu'une organisation a épuisé ses crédits de capacité, de report et gratuits.<br>- <b>rebate</b> : utilisation couverte par les crédits attribués à l'organisation lorsqu'elle a partagé des données avec une autre organisation.</td> </tr> <tr> <td><code>billing_type</code></td> <td>Indique ce qui est facturé ou crédité. Les types de facturation possibles incluent :<br>- <b>consumption</b> : utilisation associée aux crédits de calcul, aux coûts de stockage et aux coûts de transfert de données.<br>- <b>rebate</b> : utilisation couverte par les crédits attribués à l'organisation lorsqu'elle a partagé des données avec une autre organisation.<br>- <b>priority support</b> : frais pour les services d'assistance prioritaire. Ces frais sont associés à une stipulation dans un contrat, et non à un compte.<br>- <b>vps_deployment_fee</b> : frais pour un déploiement Virtual Private Snowflake.<br>- <b>support_credit</b> : l'assistance Snowflake a crédité le compte pour annuler les frais attribués à un problème dans Snowflake.</td> </tr> <tr> <td><code>charge_description</code></td> <td>Une description du type de coût associé à des lignes distinctes. Les descriptions diffèrent pour chaque type de coût, représenté par le tag <code>servicename</code>.</td> </tr> <tr> <td><code>contract_number</code></td> <td>Numéro de contrat Snowflake pour l'organisation.</td> </tr> <tr> <td><code>database_name</code></td> <td>Nom de la base de données dans laquelle la requête a été exécutée (le cas échéant). Trouvé uniquement pour les coûts d'<b>attribution de requête</b>.</td> </tr> <tr> <td><code>organization_name</code></td> <td>Nom de l'organisation.</td> </tr> <tr> <td><code>query_hash</code></td> <td>Hachage unique représentant une version paramétrée de la requête à des fins d'attribution. Trouvé uniquement pour les coûts d'<b>attribution de requête</b>.</td> </tr> <tr> <td><code>query_hash_version</code></td> <td>Version de l'algorithme de hachage de requête Snowflake utilisé pour générer <code>query_hash</code>. Trouvé uniquement pour les coûts d'<b>attribution de requête</b>.</td> </tr> <tr> <td><code>rating_type</code></td> <td>Indique comment l'utilisation dans l'enregistrement est évaluée ou tarifée. Les valeurs possibles incluent :<br>- <b>compute</b><br>- <b>data_transfer</b><br>- <b>storage</b><br>- <b>Other</b></td> </tr> <tr> <td><code>region</code></td> <td>Nom de la région où se trouve le compte.</td> </tr> <tr> <td><code>service_level</code></td> <td>Niveau de service (édition) du compte Snowflake (Standard, Enterprise ou Business Critical).</td> </tr> <tr> <td><code>servicename</code></td> <td>Type d'utilisation. Les types de service possibles incluent :<br>- <b>automatic_clustering</b> : consultez Automatic Clustering.<br>- <b>data_transfer</b> : consultez Understanding data transfer cost.<br>- <b>logging</b> : consultez Logging and Tracing Overview.<br>- <b>materialized_view</b> : consultez Working with Materialized Views.<br>- <b>replication</b> : consultez Introduction to replication and failover across multiple accounts.<br>- <b>query_acceleration</b> : consultez Using the Query Acceleration Service.<br>- <b>search_optimization</b> : consultez Search Optimization Service.<br>- <b>serverless_task</b> : consultez Introduction to tasks.<br>- <b>snowpipe</b> : consultez Snowpipe.<br>- <b>snowpipe_streaming</b> : consultez Snowpipe Streaming.<br>- <b>storage</b> : consultez Understanding storage cost.<br>- <b>warehouse_metering_query_attribution</b> : consultez Virtual warehouse credit usage of queries avec un temps d'exécution de 100 ms ou plus. N'indique pas l'utilisation de calcul serverless ou de services cloud.<br>- <b>warehouse_metering_query_attribution</b> : consultez Virtual warehouse credit usage of queries avec un temps d'exécution de 100 ms ou moins, ainsi que le temps d'inactivité de l'entrepôt. N'indique pas l'utilisation de calcul serverless ou de services cloud.</td> </tr> <tr> <td><code>user_name</code></td> <td>Nom de l'utilisateur ou du compte de service associé à la requête.</td> </tr> <tr> <td><code>warehouse_id</code></td> <td>Identifiant de l'entrepôt générant le coût.</td> </tr> <tr> <td><code>warehouse_name</code></td> <td>Nom de l'entrepôt associé à cette utilisation.</td> </tr> <tr> <td><code>warehouse_size</code></td> <td>Taille de l'entrepôt (par exemple, Large, Medium).</td> </tr> </tbody> </table>

{{% /tab %}}
{{% tab "Databricks" %}}

**Remarque** : l'intégration de coûts Databricks calcule les coûts à l'aide des prix catalogue et des données d'utilisation. Elle ne reflète aucun tarif négocié ou réduit. 

<table> <thead> <tr> <th style="width: 220px;">Nom du tag</th> <th>Description du tag</th> </tr> </thead> <tbody> <tr> <td><code>account_id</code></td> <td>ID du compte pour lequel ce rapport a été généré.</td> </tr> <tr> <td><code>billing_origin_product</code></td> <td>Produit ou fonctionnalité à l'origine de l'événement de facturation (par exemple, JOBS, CLUSTERS).</td> </tr> <tr> <td><code>central_clean_room_id</code></td> <td>ID de la salle propre centrale associée à la charge de travail (le cas échéant).</td> </tr> <tr> <td><code>charge_description</code></td> <td>Une combinaison du type de cloud et du nom du SKU associé (par exemple, AWS - PREMIUM_ALL_PURPOSE_COMPUTE).</td> </tr> <tr> <td><code>cloud</code></td> <td>Cloud pour lequel cette utilisation est pertinente. Les valeurs possibles sont AWS, AZURE et GCP.</td> </tr> <tr> <td><code>cluster_id</code></td> <td>ID du cluster associé à cette utilisation.</td> </tr> <tr> <td><code>custom_tags</code></td> <td>Tags personnalisés appliqués à l'utilisation, généralement sous forme de paires clé-valeur pour des métadonnées ou une catégorisation supplémentaires.</td> </tr> <tr> <td><code>destination_region</code></td> <td>Région vers laquelle la charge de travail est dirigée (le cas échéant).</td> </tr> <tr> <td><code>dlt_maintenance_id</code></td> <td>ID de maintenance pour Delta Live Tables (le cas échéant).</td> </tr> <tr> <td><code>dlt_pipeline_id</code></td> <td>ID du pipeline Delta Live Tables (le cas échéant).</td> </tr> <tr> <td><code>dlt_tier</code></td> <td>Niveau du service Delta Live Tables (le cas échéant).</td> </tr> <tr> <td><code>dlt_update_id</code></td> <td>ID de mise à jour Delta Live Table associé à cette utilisation (le cas échéant).</td> </tr> <tr> <td><code>endpoint_id</code></td> <td>ID de l'endpoint pour une utilisation basée sur SQL ou liée à la diffusion (le cas échéant).</td> </tr> <tr> <td><code>endpoint_name</code></td> <td>Nom de l'endpoint SQL ou de diffusion (le cas échéant).</td> </tr> <tr> <td><code>instance_pool_id</code></td> <td>ID du pool d'instances utilisé (le cas échéant).</td> </tr> <tr> <td><code>is_photon</code></td> <td>Indique si le traitement Photon a été utilisé (<code>true</code> ou <code>false</code>).</td> </tr> <tr> <td><code>is_serverless</code></td> <td>Indique si l'utilisation concerne une ressource de calcul serverless (<code>true</code> ou <code>false</code>).</td> </tr> <tr> <td><code>job_id</code></td> <td>Identifiant unique de la tâche dans Databricks.</td> </tr> <tr> <td><code>job_name</code></td> <td>Nom de la tâche dans Databricks (le cas échéant).</td> </tr> <tr> <td><code>job_run_id</code></td> <td>Identifiant de l'exécution spécifique de la tâche (le cas échéant).</td> </tr> <tr> <td><code>jobs_tier</code></td> <td>Niveau de la tâche, tel que <code>CLASSIC</code> ou <code>PREMIUM</code>.</td> </tr> <tr> <td><code>networking</code></td> <td>Type de réseau utilisé pour cette tâche, s'il est spécifié.</td> </tr> <tr> <td><code>node_type</code></td> <td>Type de nœud utilisé dans cet enregistrement de facturation (par exemple, m5d.large).</td> </tr> <tr> <td><code>notebook_id</code></td> <td>ID du notebook utilisé dans cet enregistrement de facturation (le cas échéant).</td> </tr> <tr> <td><code>notebook_path</code></td> <td>Chemin vers le notebook dans Databricks (le cas échéant).</td> </tr> <tr> <td><code>record_id</code></td> <td>ID unique pour cet enregistrement.</td> </tr> <tr> <td><code>run_name</code></td> <td>Nom de l'exécution actuelle de la tâche ou du workflow (le cas échéant).</td> </tr> <tr> <td><code>serving_type</code></td> <td>Type de modèle de diffusion utilisé, le cas échéant (par exemple, Model Serving).</td> </tr> <tr> <td><code>source_region</code></td> <td>Région d'origine pour cet enregistrement de facturation (le cas échéant).</td> </tr> <tr> <td><code>sql_tier</code></td> <td>Niveau SQL associé à l'utilisation (le cas échéant).</td> </tr> <tr> <td><code>usage_metadata</code></td> <td>Métadonnées relatives à l'utilisation, qui peuvent inclure des détails tels que le type d'utilisation, la catégorie de service ou d'autres informations pertinentes.</td> </tr> <tr> <td><code>usage_type</code></td> <td>Type d'utilisation facturée (par exemple, COMPUTE_TIME).</td> </tr> <tr> <td><code>warehouse_id</code></td> <td>ID de l'entrepôt SQL (le cas échéant).</td> </tr> <tr> <td><code>workspace_id</code></td> <td>ID de l'espace de travail auquel cette utilisation a été associée.</td> </tr> </tbody> </table> 

{{% /tab %}}

{{% tab "OpenAI" %}}

| Nom du tag | Description du tag |
|---|---|
| `charge_description` | Le nom du modèle dont les coûts sont associés aux frais. |
| `organization_id` | L'identifiant unique de l'organisation. |
| `organization_name` | Le nom de l'organisation. |
| `project_id` | L'identifiant unique du projet. |
| `project_name` | Le nom du projet. |

{{% /tab %}}

{{% tab "Anthropic" %}}

| Nom du tag | Description du tag |
|---|---|
| `workspace_id` | L'identifiant unique de l'espace de travail Anthropic. |
| `workspace_name` | Une version normalisée en tag du nom de l'espace de travail. |
| `display_workspace_name` | Le nom non modifié de l'espace de travail. |
| `org_id` | L'identifiant unique de l'organisation Anthropic. |
| `org_name` | Une version normalisée en tag du nom de l'organisation Anthropic. |
| `display_org_name` | Le nom non modifié de l'organisation. |
| `model_id` | L'identifiant de modèle Anthropic canonique (par exemple, `claude-3-opus-20240229`). |
| `model` | Un alias pour `model_id`, fourni pour la compatibilité et la cohérence avec l'utilisation et les métriques. |
| `model_name` | Le nom convivial du modèle (par exemple, `Claude 3 Opus`). |
| `service_tier` | Le plan ou niveau de service Anthropic associé à l'utilisation (par exemple, `standard`, `pro`, `enterprise`). |
| `token_type` | La catégorie de tokens consommés.|
| `context_window` | La taille de la fenêtre de contexte pour les tokens (par exemple, `tier_0-200k`). |

{{% /tab %}}

{{% tab "GitHub" %}}

**Remarque** : l'intégration de coûts GitHub estime les coûts en fonction des prix catalogue et des données d'utilisation, et inclut les valeurs de remise lorsqu'elles sont disponibles. Elle ne tient pas compte des tarifs négociés.

| Nom du tag | Description du tag |
|---|---|
| `enterprise_name` | Chaîne alphanumérique identifiant le compte d'entreprise GitHub. |
| `charge_description` | La description des frais. |
| `product` | Le produit d'utilisation, par exemple « actions » ou « storage ». |
| `organization_name` | L'organisation GitHub. |
| `repository_name` | Le référentiel GitHub. |
| `billing_currency` | La devise de facturation, par exemple « USD ». |
| `discount` | Si l'élément de coût est une remise. |

{{% /tab %}}

{{% tab "Confluent Cloud" %}}

<table> <thead> <tr> <th style="width: 200px;">Nom du tag</th> <th>Description du tag</th> </tr> </thead> <tbody> <tr> <td><code>charge_description</code></td> <td>Le sous-type du coût (par exemple, KAFKA_NETWORK_WRITE).</td> </tr> <tr> <td><code>environment_id</code></td> <td>L'identifiant unique de l'environnement.</td> </tr> <tr> <td><code>network_access_type</code></td> <td>Type d'accès réseau pour le cluster. Les valeurs possibles sont <code>INTERNET</code>, <code>TRANSIT_GATEWAY</code>, <code>PRIVATE_LINK</code> et <code>PEERED_VPC</code>.</td> </tr> <tr> <td><code>product</code></td> <td>Nom du produit. Les valeurs possibles incluent <code>KAFKA</code>, <code>CONNECT</code>, <code>KSQL</code>, <code>AUDIT_LOG</code>, <code>STREAM_GOVERNANCE</code>, <code>CLUSTER_LINK</code>, <code>CUSTOM_CONNECT</code>, <code>FLINK</code>, <code>SUPPORT_CLOUD_BASIC</code>, <code>SUPPORT_CLOUD_DEVELOPER</code>, <code>SUPPORT_CLOUD_BUSINESS</code> et <code>SUPPORT_CLOUD_PREMIER</code>.</td> </tr> <tr> <td><code>resource_id</code></td> <td>L'identifiant unique de la ressource Confluent.</td> </tr> <tr> <td><code>resource_name</code></td> <td>Le nom de la ressource Confluent.</td> </tr> </tbody> </table>

{{% /tab %}}

{{% tab "Elastic Cloud" %}}

| Nom du tag | Description du tag |
|---|---|
| `charge_description` | Le SKU d'un coût. |
| `kind` | Le type de ressource. |
| `name` | L'identifiant unique de la ressource Elastic Cloud. |
| `price_per_hour` | Le coût de la ressource Elastic Cloud par heure. |

{{% /tab %}}
{{% tab "MongoDB" %}}

| Nom du tag | Description du tag |
|---|---|
| `charge_description` | La description d'un coût. |
| `cluster_name` | Le nom du cluster qui a engendré les frais. |
| `group_id` | ID du projet auquel la ligne est associée. |
| `invoice_id` | L'identifiant unique de la facture. |
| `mongo_org_id` | ID de l'organisation MongoDB. |
| `replica_set_name` | Nom de l'ensemble de répliques auquel la ligne est associée. |
| `resource_tags` | Tags arbitraires sur les clusters définis par les utilisateurs, généralement sous forme de paires clé-valeur. |
| `status` | État du paiement. |

{{% /tab %}}

{{% tab "Fastly" %}}

<table> <thead> <tr> <th style="width: 200px;">Nom du tag</th> <th>Description du tag</th> </tr> </thead> <tbody> <tr> <td><code>charge_description</code></td> <td>La description des frais.</td> </tr> <tr> <td><code>credit_coupon_code</code></td> <td>Code de tout coupon ou crédit appliqué à cette entrée de coût (si disponible).</td> </tr> <tr> <td><code>plan_name</code></td> <td>Nom du plan sous lequel ce service s'inscrit, correspondant souvent à « product_line ».</td> </tr> <tr> <td><code>product_name</code></td> <td>Nom du produit spécifique facturé (par exemple, « North America Bandwidth »).</td> </tr> <tr> <td><code>product_group</code></td> <td>Groupe ou catégorie du produit, tel que « Full Site Delivery ».</td> </tr> <tr> <td><code>product_line</code></td> <td>Ligne de produits à laquelle cet élément appartient, par exemple, « Network Services ».</td> </tr> <tr> <td><code>region</code></td> <td>Région où l'utilisation du service s'est produite (par exemple, « North America »).</td> </tr> <tr> <td><code>service_name</code></td> <td>Nom du service associé à cette entrée de coût, correspondant souvent au <code>product_name</code>.</td> </tr> <tr> <td><code>usage_type</code></td> <td>Type d'utilisation facturée (par exemple, « Bandwidth »).</td> </tr> <tr> <td><code>usage_type_cd</code></td> <td>Code ou étiquette représentant le type d'utilisation, tel que « North America Bandwidth ».</td> </tr> </tbody> </table>

{{% /tab %}}
{{% tab "Twilio" %}}

<table> <thead> <tr> <th style="width: 200px;">Nom du tag</th> <th>Description du tag</th> </tr> </thead> <tbody> <tr> <td><code>account_sid</code></td> <td>Chaîne alphanumérique identifiant le compte Twilio.</td> </tr> <tr> <td><code>category</code></td> <td>La catégorie d'utilisation. Pour plus d'informations, consultez la section <a href="https://www.twilio.com/docs/usage/api/usage-record#usage-categories" target="_blank">Usage Categories</a>.</td> </tr> <tr> <td><code>charge_description</code></td> <td>La description des frais.</td> </tr> <tr> <td><code>count_unit</code></td> <td>Les unités dans lesquelles le nombre est mesuré, telles que les appels pour les appels ou les messages pour les SMS.</td> </tr> <tr> <td><code>usage_unit</code></td> <td>Les unités dans lesquelles l'utilisation est mesurée, telles que les minutes pour les appels ou les messages pour les SMS.</td> </tr> </tbody> </table>

[101]: https://www.twilio.com/docs/usage/api/usage-record#usage-categories

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/cloud_cost_management/setup/custom
[2]: /fr/cloud_cost_management
[3]: https://app.datadoghq.com/cost/explorer
[4]: https://app.datadoghq.com/cost/tags?cloud=custom
[5]: /fr/dashboards
[6]: /fr/notebooks
[7]: /fr/monitors/types/cloud_cost
[8]: https://app.datadoghq.com/cost/settings/accounts