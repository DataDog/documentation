---
categories:
- aws
- cloud
- data store
- log collection
- network
- security
dependencies: []
description: Ingérez les logs Amazon Security Lake.
doc_link: ''
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/aws-reinvent-2022-recap/
  tag: GitHub
  text: Les points forts de l'édition 2022 d'AWS re:Invent
git_integration_title: amazon_security_lake
has_logo: true
integration_id: amazon-security-lake
integration_title: Amazon Security Lake
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_security_lake
public_title: Intégration Datadog/Amazon Security Lake
short_description: Ingérez les logs Amazon Security Lake.
version: '1.0'
---

## Présentation

Amazon Security Lake est un lac de données de sécurité permettant l'agrégation et la gestion des données relatives aux logs et événements de sécurité.

Cette intégration permet l'ingestion, par Datadog, des logs de sécurité stockés dans Amazon Security Lake afin de les examiner de manière plus approfondie et de détecter les menaces en temps réel. Pour en savoir plus sur Amazon Security Lake, consultez le [guide d'utilisation d'Amazon Security Lake][1] dans AWS.

## Implémentation

### Prérequis

1. Amazon Security Lake doit être configuré sur votre compte AWS ou pour votre organisation AWS. Consultez le [guide d'utilisation d'Amazon Security Lake][1] pour en savoir plus.
2. Les solutions Datadog [Log Management][2] et [Cloud SIEM][3] doivent être activées sur votre compte Datadog.
3. Si ce n'est pas déjà fait, configurez l'[intégration Amazon Web Services][4] pour le compte AWS sur lequel Amazon Security Lake stocke les données.

**Remarque :** si vous souhaitez uniquement intégrer ce compte AWS pour utiliser l'intégration Amazon Security Lake, vous pouvez désactiver la collecte des métriques sur la [page de l'intégration AWS][5] de manière à ce que Datadog ne surveille pas votre infrastructure AWS et à ce qu'aucuns frais de [surveillance d'infrastructure][6] ne vous soient facturés.

### Collecte de logs
1. Ajoutez la stratégie IAM suivante à votre rôle IAM  `DatadogIntegrationRole` existant afin que Datadog puisse ingérer les nouveaux fichiers de log ajoutés à votre lac de données de sécurité.
{{< code-block lang="yaml" collapsible="true" >}}
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "DatadogSecurityLakeAccess",
          "Effect": "Allow",
          "Action": [
              "s3:GetObject"
          ],
          "Resource": "arn:aws:s3:::aws-security-data-lake-*"
      }
  ]
}
{{< /code-block >}}

2. Dans la console AWS pour Amazon Security Lake, créez un abonné pour Datadog et complétez le formulaire. Pour en savoir plus les abonnés AWS Security Lake, consultez le [guide d'utilisation d'Amazon Security Lake][1].
   - Saisissez `Datadog` pour le nom de l'abonné.
   - Choisissez les données à envoyer à Datadog en sélectionnant  `All log and event sources` ou `Specific log and event sources`.
   - Sélectionnez `S3` comme méthode d'accès aux données.

{{< site-region region="us,us3,us5,eu,gov" >}}
3. Dans le même formulaire, renseignez les identifiants de l'abonné.
   - Pour **Account ID**, saisissez `464622532012`.
   - Pour **External ID**, ouvrez un nouvel onglet et accédez à la [page de l'intégration AWS][7] dans Datadog pour votre compte AWS. L'identifiant **AWS External ID** apparaît dans l'onglet **Account Details**. Copiez-le et collez-le dans le formulaire sur AWS.
   - Pour **Subscriber role**, saisissez `DatadogSecurityLakeRole`. **Remarque :** en réalité, ce rôle ne sera pas utilisé par Datadog puisque le rôle `DatadogIntegrationRole` disposera des autorisations nécessaires depuis l'étape 1.
   - Pour **API destination role**, saisissez `DatadogSecurityLakeAPIDestinationRole`.
   - Pour **Subscription endpoint**, cette valeur dépend du [site Datadog][8] que vous utilisez : <code>https://api.{{< region-param key="dd_site" >}}/api/intake/aws/securitylake</code>

     **Remarque :** si l'endpoint ci-dessus ne reflète pas votre région, utilisez le menu déroulant **site Datadog** à droite de cette page pour choisir votre région.
   - Pour **HTTPS key name**, saisissez `DD-API-KEY`.
   - Pour **HTTPS key value**, ouvrez un nouvel onglet et accédez à la [page des clés d'API][9] dans Datadog pour trouver ou créer une clé d'API Datadog. Copiez-la et collez-la dans le formulaire sur AWS.

[7]: https://app.datadoghq.com/integrations/amazon-web-services?panel=account-details
[8]: https://docs.datadoghq.com/fr/getting_started/site/
[9]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

{{< site-region region="ap1" >}}
3. Dans le même formulaire, renseignez les identifiants de l'abonné.
   - Pour **Account ID**, saisissez `417141415827`.
   - Pour **External ID**, ouvrez un nouvel onglet et accédez à la [page de l'intégration AWS][7] dans Datadog pour votre compte AWS. L'identifiant **AWS External ID** apparaît dans l'onglet **Account Details**. Copiez-le et collez-le dans le formulaire sur AWS.
   - Pour **Subscriber role**, saisissez `DatadogSecurityLakeRole`. **Remarque :** en réalité, ce rôle ne sera pas utilisé par Datadog puisque le rôle `DatadogIntegrationRole` disposera des autorisations nécessaires depuis l'étape 1.
   - Pour **API destination role**, saisissez `DatadogSecurityLakeAPIDestinationRole`.
   - Pour **Subscription endpoint**, cette valeur dépend du [site Datadog][8] que vous utilisez : <code>https://api.{{< region-param key="dd_site" >}}/api/intake/aws/securitylake</code>

     **Remarque :** si l'endpoint ci-dessus ne reflète pas votre région, utilisez le menu déroulant **site Datadog** à droite de cette page pour choisir votre région.
   - Pour **HTTPS key name**, saisissez `DD-API-KEY`.
   - Pour **HTTPS key value**, ouvrez un nouvel onglet et accédez à la [page des clés d'API][9] dans Datadog pour trouver ou créer une clé d'API Datadog. Copiez-la et collez-la dans le formulaire sur AWS.

[7]: https://app.datadoghq.com/integrations/amazon-web-services?panel=account-details
[8]: https://docs.datadoghq.com/fr/getting_started/site/
[9]: https://app.datadoghq.com/organization-settings/api-keys
{{< /site-region >}}

4. Cliquez sur **Create** pour terminer le processus de création de l'abonné.
5. Patientez quelques minutes, puis commencez à explorer vos logs d'Amazon Security Lake dans la vue [Log Explorer de Datadog][7].

Pour en savoir plus sur l'utilisation de cette intégration à des fins de détection des menaces en temps réel, consultez le [blog][8].

## Données collectées

### Métriques

L'intégration Amazon Security Lake n'inclut aucune métrique.

### Événements

L'intégration Amazon Security Lake n'inclut aucun événement.

### Checks de service

L'intégration Amazon Security Lake n'inclut aucun check de service.

## Dépannage

### Autorisations

Consultez le [guide de dépannage][9] pour vous assurer que votre compte AWS a correctement configuré le rôle IAM pour Datadog.

### Créer des abonnés

Consultez le [guide d'utilisation d'Amazon Security Lake][1] pour découvrir comment régler les problèmes relatifs à la création d'un abonné.

Besoin d'aide supplémentaire ? Contactez [l'assistance Datadog][10].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/security-lake/latest/userguide/
[2]: https://www.datadoghq.com/product/log-management/
[3]: https://www.datadoghq.com/product/cloud-security-management/cloud-siem/
[4]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[5]: https://app.datadoghq.com/integrations/amazon-web-services?panel=metric-collection
[6]: https://www.datadoghq.com/product/infrastructure-monitoring/
[7]: https://app.datadoghq.com/logs?query=source%3Aamazon-security-lake&cols=host%2Cservice%2C%40task_name%2C%40identity.user.type%2Caws.source%2C%40network.client.ip%2C%40identity.session.mfa%2C%40evt.name%2C%40connection_info.direction&index=%2A&messageDisplay=inline
[8]: https://www.datadoghq.com/blog/analyze-amazon-security-lake-logs-with-datadog
[9]: https://docs.datadoghq.com/fr/integrations/guide/error-datadog-not-authorized-sts-assume-role/#pagetitle
[10]: https://docs.datadoghq.com/fr/help/