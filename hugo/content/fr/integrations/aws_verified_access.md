---
categories:
- cloud
- aws
- log collection
dependencies: []
description: Recueillez les logs AWS Verified Access.
doc_link: https://docs.datadoghq.com/integrations/aws_verified_access/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/verified-access-datadog/
  tag: Blog
  text: Renforcer la sécurité des applications professionnelles grâce à AWS Verified Access
    et Datadog
git_integration_title: aws_verified_access
has_logo: true
integration_id: amazon-verified-access
integration_title: AWS Verified Access
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: aws_verified_access
public_title: Intégration Datadog/AWS Verified Access
short_description: Recueillez les logs AWS Verified Access.
version: '1.0'
---

## Présentation

Grâce à AWS Verified Access, vous pouvez sécuriser l'accès à vos applications professionnelles sans avoir à recourir à un réseau privé virtuel (VPN). Verified Access examine chaque requête d'application et veille à ce que l'accès à chaque application soit accordé uniquement aux utilisateurs qui respectent les exigences de sécurité définies.


## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de logs

#### Activer les logs Verified Access

1. Ouvrez la console Amazon VPC.
2. Dans le volet de navigation, sélectionnez **Verified Access instances**.
3. Sélectionnez l'instance Verified Access.
4. Dans l'onglet Verified Access instance logging configuration, sélectionnez **Modify Verified Access instance logging configuration**.
5. Activez l'option **Deliver to Amazon Cloudwatch Logs**. Choisissez le groupe de logs de destination.

**Remarque** : ajoutez la chaîne `verified-access` au nom du groupe de logs pour activer le parsing automatique des logs.

Pour en savoir plus, consultez la section [Activer ou désactiver les journaux][2].

#### Envoyer des logs à Datadog

**Remarque** : si vous utilisez l'[intégration Amazon Security Lake][3] de Datadog, vous pouvez envoyer des logs Verified Access via cette intégration au lieu de suivre les étapes ci-dessous.

1. Si ce n'est pas déjà fait, configurez la [fonction Lambda du Forwarder Datadog][4] dans votre compte AWS.
2. Une fois la fonction Lambda configurée, accédez-y. Dans la section Function Overview, cliquez sur **Add Trigger**.
3. Sélectionnez le déclencheur **CloudWatch Logs** pour le champ Trigger Configuration.
4. Sélectionnez le groupe de logs où se trouvent vos logs Verified Access.
5. Attribuez un nom au filtre.
6. Cliquez sur **Add** pour ajouter le déclencheur à votre fonction Lambda.

Accédez au [Log Explorer][5] pour commencer à explorer vos logs.

Pour en savoir plus sur la collecte de logs de services AWS, consultez la section [Envoyer des logs de services AWS avec la fonction Lambda Datadog][6].

## Données collectées

### Métriques

L'intégration AWS Verified Access n'inclut aucune collecte de métriques.

### Événements

L'intégration AWS Verified Access n'inclut aucun événement.

### Logs

L'intégration AWS Verified Access inclut [les logs Verified Access][7].

### Checks de service

L'intégration AWS Verified Access n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/verified-access/latest/ug/access-logs-enable.html
[3]: https://docs.datadoghq.com/fr/integrations/amazon_security_lake/
[4]: https://docs.datadoghq.com/fr/logs/guide/forwarder/
[5]: https://app.datadoghq.com/logs
[6]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[7]: https://docs.aws.amazon.com/verified-access/latest/ug/access-logs.html
[8]: https://docs.datadoghq.com/fr/help/