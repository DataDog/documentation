---
description: Étapes à suivre pour configurer manuellement l'intégration Datadog/AWS
further_reading:
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: Documentation
  text: Intégration AWS
- link: https://docs.datadoghq.com/serverless/libraries_integrations/forwarder/
  tag: Documentation
  text: Fonction Lambda du Forwarder Datadog
- link: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
  tag: Guide
  text: Envoyer des logs de service AWS avec la destination Datadog pour Amazon Data Firehose
- link: https://docs.datadoghq.com/integrations/guide/aws-integration-troubleshooting/
  tag: Guide
  text: Dépannage de l'intégration AWS
- link: https://docs.datadoghq.com/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
  tag: Guide
  text: Flux de métriques AWS CloudWatch avec Amazon Data Firehose
- link: https://www.datadoghq.com/blog/aws-monitoring/
  tag: Blog
  text: Métriques clés pour la surveillance AWS
- link: https://www.datadoghq.com/blog/monitoring-ec2-instances-with-datadog/
  tag: Blog
  text: Comment surveiller des instances EC2 avec Datadog
- link: https://www.datadoghq.com/blog/monitoring-aws-lambda-with-datadog/
  tag: Blog
  text: Surveillance d'AWS Lambda avec Datadog
- link: https://www.datadoghq.com/blog/cloud-security-posture-management/
  tag: Blog
  text: Présentation de Datadog Cloud Security Posture Management
- link: https://www.datadoghq.com/blog/datadog-workload-security/
  tag: Blog
  text: Sécurisez votre infrastructure en temps réel avec Datadog Cloud Workload Security
- link: https://www.datadoghq.com/blog/announcing-cloud-siem/
  tag: Blog
  text: Présentation de Datadog Security Monitoring
- link: https://www.datadoghq.com/blog/tagging-best-practices/#aws
  tag: Blog
  text: Bonnes pratiques en matière de tagging pour votre infrastructure et vos applications
kind: guide
title: Guide de configuration manuelle d'AWS
---

## Présentation

Référez-vous à ce guide pour configurer manuellement l'[intégration Datadog/AWS][1].

{{< tabs >}}
{{% tab "Délégation des rôles" %}}

Pour configurer manuellement l'intégration AWS, créez une stratégie IAM et un rôle IAM dans votre compte AWS, puis configurez le rôle avec un ID externe AWS généré dans votre compte Datadog. Le compte AWS de Datadog pourra ainsi interroger les API AWS à votre place et récupérer les données dans votre compte Datadog. Les sections ci-dessous décrivent la marche à suivre pour créer chacun de ces composants puis terminer la configuration dans votre compte Datadog.

## Configuration

### Générer un ID externe

1. Sur la [page de configuration de l'intégration AWS][1], cliquez sur **Add AWS Account** puis sélectionnez **Manually**.
2. Sélectionnez `Role Delegation` pour le type dʼaccès et copiez `AWS External ID`. Pour en savoir plus sur lʼID externe, lisez le [guide dʼutilisation dʼIAM][2].  
  **Remarque** : lʼID externe reste disponible et nʼest pas régénéré pendant 48 heures, sauf sʼil a été explicitement modifié par un utilisateur ou si un autre compte AWS est ajouté à Datadog pendant cette période. Vous pouvez revenir à la page **Add New AWS Account** pendant cette période pour terminer le processus dʼajout de compte sans modifier lʼID externe.

### Stratégie IAM AWS pour Datadog
Créez une stratégie IAM dédiée au rôle Datadog dans votre compte AWS en lui accordant les [autorisations nécessaires](#strategie-iam-de-l-integration-aws) pour profiter de chaque intégration AWS proposée par Datadog. Ces autorisations seront susceptibles de changer si d'autres composants sont ajoutés à une intégration.

3. Créez une nouvelle stratégie dans la [console IAM][3] d'AWS.
4. Sélectionnez lʼonglet **JSON**. Collez les [stratégies dʼautorisations](#strategie-iam-de-l-integration-aws) dans la zone de texte.  
  **Remarque** : vous pouvez aussi choisir dʼajouter des éléments de [Condition][7] à la stratégie IAM. Des conditions peuvent par exemple être utilisées pour [limiter la surveillance à certaines régions][8].
5. Cliquez sur **Next: Tags** et **Next: Review**.
6. Nommez la stratégie `DatadogIntegrationPolicy` ou utilisez le nom de votre choix, et saisissez une description pertinente.
7. Cliquez sur **Create policy**.

### Rôle IAM AWS pour Datadog
Créez un rôle IAM pour Datadog afin dʼutiliser les autorisations définies dans la stratégie IAM.

8. Créez un nouveau rôle dans la [console IAM][4] d'AWS.
9. Sélectionnez **AWS account** pour le type dʼentité fiable, puis **Another AWS account**.
{{< site-region region="us,us3,us5,eu" >}}
10. Saisissez `464622532012` pour `Account ID`. Il sʼagit de lʼID de compte de Datadog, qui permet à Datadog dʼaccéder à vos données AWS.
{{< /site-region >}}
{{< site-region region="ap1" >}}
10. Saisissez `417141415827` pour `Account ID`. Il sʼagit de lʼID de compte de Datadog, qui permet à Datadog dʼaccéder à vos données AWS.
{{< /site-region >}}
{{< site-region region="gov" >}}
10. Si le compte AWS que vous souhaitez intégrer est un compte GovCloud, saisissez `065115117704` pour `Account ID`. Sinon, saisissez `392588925713`. Il sʼagit de lʼID de compte de Datadog, qui permet à Datadog dʼaccéder à vos données AWS.
{{< /site-region >}}
11. Sélectionnez **Require external ID** et saisissez lʼID externe copié dans la section [Générer un ID externe](#générer-un-id-externe).
Assurez-vous que `Require MFA` est toujours désactivé. Pour en savoir plus, consultez la section [Procédure d'utilisation d'un ID externe lorsque vous accordez l'accès à vos ressources AWS à un tiers][1] de la documentation AWS.
12. Cliquez sur **Next**.
13. Si vous avez déjà créé la stratégie, recherchez-la sur cette page et sélectionnez-la. Sinon, cliquez sur **Create Policy**, qui sʼouvre dans une nouvelle fenêtre, et suivez les instructions de la section précédente.
14. Si vous le souhaitez, associez la <a href="https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit" target="_blank">stratégie SecurityAudit AWS</a> au rôle pour tirer profit de la solution [Cloud Security Management Misconfigurations][5].
15. Cliquez sur **Next**.
16. Saisissez le nom `DatadogIntegrationRole` ou un nom similaire pour le rôle, ainsi qu'une description pertinente.
17. Cliquez sur **Create Role**.

### Terminer la configuration dans Datadog

18. Revenez à la page de configuration pour lʼintégration AWS relative à lʼajout manuel dʼun compte dans Datadog que vous avez ouverte dans un autre onglet. Cliquez sur la case pour confirmer que le rôle IAM Datadog a été ajouté au compte AWS.
19. Saisissez lʼID de compte **sans tiret**, p. ex. `123456789012`. Votre ID de compte est indiqué dans l'ARN du rôle créé pour Datadog.
20. Saisissez le nom du rôle créé à la section précédente, puis cliquez sur **Save**.
  **Remarque** : le nom de rôle saisi dans le carré d'intégration est sensible à la casse et doit correspondre parfaitement au nom du rôle dans AWS.
21. Si une erreur [Datadog is not authorized to perform sts:AssumeRole][6] sʼaffiche, suivez les étapes de dépannage recommandées dans lʼIU ou lisez le [guide de dépannage][6].
22. Patientez 10 minutes le temps que les données commencent à être recueillies, puis accédez au <a href="https://app.datadoghq.com/screen/integration/7/aws-overview" target="_blank">dashboard récapitulatif d'AWS</a> prêt à l'emploi pour visualiser les métriques envoyées par vos services et votre infrastructure AWS :


[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html
[3]: https://console.aws.amazon.com/iam/home#/policies
[4]: https://console.aws.amazon.com/iam/home#/roles
[5]: /fr/security/cloud_security_management/misconfigurations/
[6]: /fr/integrations/guide/error-datadog-not-authorized-sts-assume-role/
[7]: https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements_condition.html
[8]: https://aws.amazon.com/blogs/security/easier-way-to-control-access-to-aws-regions-using-iam-policies/
{{% /tab %}}
{{% tab "Clés d'accès (GovCloud ou Chine uniquement)" %}}

## Configuration

### AWS

1. Dans votre console AWS, créez un utilisateur IAM qui sera utilisé pour lʼintégration Datadog avec les [autorisations nécessaires](#strategie-iam-de-l-integration-aws).
2. Générez une clé d'accès et une clé de secret pour l'utilisateur IAM de l'intégration Datadog.

### Datadog

3. Dans le [carré dʼintégration AWS][1], cliquez sur **Add AWS Account**, puis sélectionnez **Manually**.
4. Sélectionnez lʼonglet **Access Keys (GovCloud or China\* Only)**.
5. Cochez la case **I confirm that the IAM User for the Datadog Integration has been added to the AWS Account**.
6. Saisissez votre `Account ID`, `AWS Access Key` et `AWS Secret Key`. Seules les clés d'accès et de secret pour GovCloud et la Chine sont acceptées.
7. Cliquez sur **Save**.
8. Patientez 10 minutes le temps que les données commencent à être recueillies, puis accédez au <a href="https://app.datadoghq.com/screen/integration/7/aws-overview" target="_blank">dashboard récapitulatif d'AWS</a> prêt à l'emploi pour visualiser les métriques envoyées par vos services et votre infrastructure AWS :

\* _Toute utilisation des Services Datadog dans (ou en connexion avec des environnements se situant au sein de) la Chine continentale est sujette à la remarque indiquée dans la section [Restricted Service Locations][2] de notre site web._

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://www.datadoghq.com/legal/restricted-service-locations/
{{% /tab %}}
{{< /tabs >}}

{{% aws-permissions %}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/amazon_web_services/