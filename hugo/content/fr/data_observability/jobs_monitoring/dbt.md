---
aliases:
- /fr/data_observability/jobs_monitoring/dbtcore
- /fr/data_observability/jobs_monitoring/dbtcloud
description: Connectez dbt Cloud ou dbt Core à Datadog pour obtenir les métadonnées
  d'exécution des jobs et le lignage des modèles.
further_reading:
- link: /data_observability/
  tag: Documentation
  text: En savoir plus sur Data Observability.
- link: https://www.datadoghq.com/blog/understanding-dbt/
  tag: Blog
  text: 'Comprendre dbt : notions de base et bonnes pratiques'
title: dbt
---
## Présentation {#overview}

Datadog peut accéder aux métadonnées de votre dbt Cloud ou dbt Core pour extraire des informations sur les exécutions de jobs, notamment les durées d'exécution, les modèles générés par dbt et les relations de lignage entre les modèles. Datadog fait correspondre les tables de votre entrepôt de données avec les modèles dbt pour déterminer la causalité et les conséquences d'une défaillance de tableau.

{{< tabs >}}
{{% tab "dbt Cloud" %}}

Suivez les étapes ci-dessous pour connecter dbt Cloud à Datadog.

## Générez un jeton API dans dbt Cloud {#generate-an-api-token-in-dbt-cloud}

Créez un jeton de service dans dbt Cloud afin que Datadog puisse accéder aux métadonnées de votre compte.

1. Dans dbt Cloud, accédez à {{< ui >}}User Profile{{< /ui >}} > {{< ui >}}API Tokens{{< /ui >}} > {{< ui >}}Service Tokens{{< /ui >}}.
2. Cliquez sur {{< ui >}}\+ Create Service Token{{< /ui >}}.
3. Donnez un nom au jeton.
4. Définissez les autorisations du jeton :
   - Si vous créez vous-même le webhook dans dbt Cloud, utilisez l'ensemble d'autorisations {{< ui >}}Stakeholder/Read-Only{{< /ui >}} limité aux projets dbt Cloud concernés.
   - Si Datadog crée et gère le webhook, utilisez les autorisations {{< ui >}}Developer{{< /ui >}} pour le plan dbt Cloud Enterprise ou les autorisations {{< ui >}}Account Admin{{< /ui >}} pour le plan dbt Cloud Team.
5. Cliquez sur {{< ui >}}Save{{< /ui >}} et copiez le jeton API généré.

## Connectez votre compte dbt Cloud à Datadog {#connect-your-dbt-cloud-account-to-datadog}

Utilisez le jeton API pour configurer l'intégration dans Data Observability.

1. Accédez à [{{< ui >}}Datadog Data Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][1].
2. Dans la section {{< ui >}}dbt Cloud{{< /ui >}}, cliquez sur {{< ui >}}Configure{{< /ui >}}.
3. Si vous avez déjà créé un compte d'intégration dbt Cloud, assurez-vous de l'avoir mis à jour avec le jeton d'API disposant des autorisations décrites ci-dessus.
4. Sinon, créez un compte. Remplissez les sections {{< ui >}}Account Name{{< /ui >}}, {{< ui >}}Account Id{{< /ui >}}, {{< ui >}}Account Url{{< /ui >}} et {{< ui >}}API Token{{< /ui >}}.
5. Cliquez sur {{< ui >}}Save{{< /ui >}} pour enregistrer vos paramètres.

## Configurez les webhooks {#configure-webhooks}

Dans les paramètres de Data Observability, développez le compte dbt Cloud et choisissez la manière dont Datadog reçoit les événements d'exécution de job dbt Cloud.

### Créez vous-même le webhook dans dbt Cloud {#create-the-webhook-in-dbt-cloud-yourself}

Utilisez cette option si vous souhaitez utiliser un jeton de service {{< ui >}}Stakeholder/Read-Only{{< /ui >}} pour l'ingestion d'artefacts.

1. Sélectionnez {{< ui >}}I'll manage the webhook in dbt Cloud myself{{< /ui >}}.
2. Copiez l'URL du webhook Datadog.
3. Dans dbt Cloud, accédez à {{< ui >}}Account Settings{{< /ui >}} > {{< ui >}}Webhooks{{< /ui >}} > {{< ui >}}Create New Webhook{{< /ui >}}.
4. Collez l'URL du webhook Datadog dans le champ URL du webhook.
5. Activez les événements {{< ui >}}Job Run Started{{< /ui >}} et {{< ui >}}Job Run Completed{{< /ui >}}. Pour étendre l'ingestion à des jobs spécifiques, sélectionnez ces jobs dans la configuration du webhook de dbt Cloud.
6. Enregistrez le webhook dans dbt Cloud.
7. Copiez le secret HMAC depuis dbt Cloud, collez-le dans le champ {{< ui >}}HMAC secret from dbt Cloud{{< /ui >}} dans Datadog, puis cliquez sur {{< ui >}}Save{{< /ui >}}.

**Remarque** : Après l'enregistrement, les webhooks que vous créez vous-même peuvent mettre jusqu'à 5 minutes avant de commencer à accepter le trafic provenant de dbt Cloud.

Si vous supprimez ultérieurement une configuration de webhook gérée par l'utilisateur dans Datadog, supprimez manuellement le webhook de dbt Cloud.

### Laissez Datadog gérer le webhook {#let-datadog-manage-the-webhook}

Utilisez cette option si vous souhaitez que Datadog crée et maintienne le webhook dans dbt Cloud.

1. Sélectionnez {{< ui >}}Datadog-managed{{< /ui >}}.
2. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Ce mode nécessite un jeton dbt Cloud avec des autorisations {{< ui >}}Developer{{< /ui >}} pour le plan dbt Cloud Enterprise ou des autorisations {{< ui >}}Account Admin{{< /ui >}} pour le plan dbt Cloud Team.

## Prochaines étapes {#whats-next}

Après votre prochaine exécution de job dbt, vous devriez commencer à voir les données d'exécution de job et de lignage dans [Datadog Data Observability][2], comme illustré ci-dessous.

{{< img src="data_observability/data-obs-dbt-cloud-final.png" alt="Vue d'ensemble de Data Observability montrant les exécutions des jobs dbt sous forme de graphique à barres empilées au fil du temps et un tableau des comptes dbt Cloud connectés avec leur statut." style="width:100%;" >}}

[1]: https://app.datadoghq.com/data-obs/settings/integrations
[2]: https://app.datadoghq.com/data-obs/catalog?integration=dbt

{{% /tab %}}

{{% tab "dbt Core" %}}

Suivez les étapes ci-dessous pour connecter dbt Core à Datadog.

**Remarque** : Si vous exécutez dbt Core avec un orchestrateur externe (tel qu'Airflow) et que vous souhaitez corréler les tâches de l'orchestrateur avec les exécutions dbt, suivez d'abord les [instructions d'intégration Airflow][1].

## Récupérez votre clé Datadog API {#retrieve-your-datadog-api-key}

1. [Suivez ces instructions][2] pour créer ou récupérer une clé Datadog API.

## Installez openlineage-dbt {#install-openlineage-dbt}

1. Installez le package `openlineage-dbt`. Consultez [Utilisation de dbt avec Amazon MWAA][3] pour configurer ce package dans votre environnement virtuel.

   ```shell
   pip3 install openlineage-dbt>=1.39.0
   ```

## Définissez les variables d'environnement {#set-the-environment-variables}

1. Définissez les variables d'environnement suivantes. Remplacez `datadoghq.com` par le [site Datadog][4] correspondant à votre organisation. Pour plus d'informations sur les sites Datadog prédéfinis, consultez la [documentation OpenLineage][5].

   ```shell
   export DD_SITE=datadoghq.com
   export DD_API_KEY=<YOUR_DATADOG_API_KEY>
   export OPENLINEAGE__TRANSPORT__TYPE=datadog

   # OPENLINEAGE_NAMESPACE determines the Datadog tag value for the environment (similar to how the service tag identifies the application).
   # Typical values are dev, staging, or prod, but you can over ride it with any custom value.
   export OPENLINEAGE_NAMESPACE=<YOUR_ENV>

   # Optional, for debugging purposes
   export OPENLINEAGE_CLIENT_LOGGING=DEBUG

   # Required for CI/CD Drift Detection (requires openlineage-dbt >= 1.46.0).
   # Attaches the sourceCodeLocation facet (repository URL, commit SHA, and pull
   # request number) so Datadog can associate the dbt run with a pull request.
   # Disabled by default; not required for job monitoring alone.
   export OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__DISABLED=false
   ```

   Pour les [vérifications CI/CD][8], le numéro de pull request est détecté automatiquement lorsque l'exécution expose `GITHUB_REF` (workflows GitHub Actions déclenchés par une pull request) ou `CI_MERGE_REQUEST_IID` (pipelines de merge request GitLab). Si aucune de ces variables n'est présente, définissez explicitement le numéro de pull request :

   ```shell
   export OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__PULL_REQUEST_NUMBER=<PR_NUMBER>
   ```

   Si votre job CI s'exécute dans un conteneur qui n'hérite pas du contexte git du runner (par exemple, un workflow GitHub Actions lançant un conteneur), l'URL du dépôt, le SHA du commit et le numéro de pull request ne sont pas détectés automatiquement ; vous devez donc transmettre les trois explicitement. Consultez [Exécution de votre job CI dbt Core dans un conteneur](/data_observability/cicd/#running-your-dbt-core-ci-job-in-a-container).

## Mettez à jour l'appel dbt {#update-the-dbt-invocation}

1. Modifiez vos appels dbt pour utiliser le wrapper OpenLineage (`dbt-ol`) au lieu d'appeler `dbt` directement. Cela s'applique à toute commande dbt que vous souhaitez suivre dans Datadog, telle que `run`, `build` et `test`. Pour la liste complète des commandes disponibles, consultez la [documentation dbt][7].
2. Ajoutez l'indicateur `--consume-structured-logs` pour afficher les jobs dbt pendant que la commande est encore en cours d'exécution.

   ```shell
   # Run models
   dbt-ol run --consume-structured-logs --openlineage-dbt-job-name <YOUR_DBT_JOB_NAME>

   # Run tests (required to see test failures in Datadog)
   dbt-ol test --consume-structured-logs --openlineage-dbt-job-name <YOUR_DBT_JOB_NAME>

   # Run build (runs models, tests, seeds, and snapshots)
   dbt-ol build --consume-structured-logs --openlineage-dbt-job-name <YOUR_DBT_JOB_NAME>
   ```

## Quelle est la prochaine étape {#whats-next-1}

Après votre prochaine exécution de job dbt, vous devriez commencer à voir les données d'exécution de job et de lignage dans [Datadog Data Observability][6], comme illustré ci-dessous.

{{< img src="data_observability/data-obs-dbt-cloud-final.png" alt="Vue d'ensemble de Data Observability montrant les exécutions des jobs dbt et le lignage des modèles." style="width:100%;" >}}

[1]: /fr/data_jobs/airflow/?tab=kubernetes
[2]: /fr/account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: https://docs.aws.amazon.com/mwaa/latest/userguide/samples-dbt.html
[4]: /fr/getting_started/site/#access-the-datadog-site
[5]: https://openlineage.io/docs/client/python/#predefined-datadog-sites
[6]: https://app.datadoghq.com/data-obs/catalog?integration=dbt
[7]: https://docs.getdbt.com/docs/running-a-dbt-project/run-your-dbt-projects
[8]: /fr/data_observability/cicd/

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}