---
further_reading:
- link: /security_platform/default_rules/#cat-cloud-siem
  tag: Documentation
  text: Explorer les règles de détection par défaut de Cloud SIEM
- link: /security_platform/explorer/
  tag: Documentation
  text: En savoir plus sur le Security Signals Explorer
- link: /security_platform/cloud_siem/log_detection_rules/
  tag: Documentation
  text: Créer des règles de détection
- link: /getting_started/integrations/aws/
  tag: Documentation
  text: Débuter avec AWS
- link: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
  tag: Documentation
  text: Envoyer des logs de services AWS avec la fonction Lambda Datadog
- link: /logs/explorer/
  tag: Documentation
  text: Découvrir comment explorer vos logs
title: Guide de configuration d'AWS pour Cloud SIEM
---

## Présentation

Cloud SIEM applique des règles de détection à l'ensemble des logs traités dans Datadog. Cette approche permet de détecter les menaces, comme les attaques ciblées, les adresses IP communiquant avec vos systèmes alors qu'elles font partie d'une liste noire ou les configurations non sécurisées. Les menaces s'affichent sous la forme de signaux de sécurité dans le [Security Signals Explorer][1] et peuvent être triés.

Ce guide détaille les étapes à suivre afin de commencer à détecter les menaces à l'aide de vos logs AWS CloudTrail :

- [Configurer l'intégration Datadog/AWS](#configurer-l-integration-aws-avec-cloudformation)
- [Activer les logs AWS CloudTrail](#activer-les-logs-aws-cloudtrail)
- [Envoyer les logs AWS CloudTrail à Datadog](#envoyer-les-logs-aws-cloudtrail-a-datadog)
- [Utiliser Cloud SIEM pour trier les signaux de sécurité](#utiliser-cloud-siem-pour-trier-les-signaux-de-securite)

## Configurer l'intégration AWS avec CloudFormation

1. Accédez au [carré d'intégration AWS][2] de Datadog pour installer l'intégration.
2. Cliquez sur **Automatically Using CloudFormation**. Si un compte AWS est déjà configuré, cliquez d'abord sur **Add Another Account**.
3. Pour la solution Cloud SIEM, la gestion des logs doit être intégrée. Sélectionnez donc **Log Management**. Cela permet de configurer la fonction Lambda du Forwarder Datadog afin de l'utiliser par la suite pour envoyer les logs AWS CloudTrail à Datadog.
4. Sélectionnez la région AWS à partir de laquelle la pile CloudFormation sera lancée.
5. Sélectionnez la clé d'API Datadog servant à envoyer des données depuis votre compte AWS vers Datadog, ou créez-la si besoin.
6. Cliquez sur **Launch CloudFormation Template**, afin d'ouvrir la console AWS et de charger la pile CloudFormation. Les paramètres définis varient en fonction des informations que vous avez fournies précédemment dans le formulaire Datadog précédent.

    **Remarque** : le paramètre `DatadogAppKey` active la pile CloudFormation et permet donc d'effectuer des appels API vers Datadog, afin d'ajouter et de modifier la configuration Datadog pour ce compte AWS. La clé est automatiquement générée et liée à votre compte Datadog.

7. Cochez les cases requises pour AWS et cliquez sur **Create stack**.
8. Une fois la pile CloudFormation créée, revenez au carré d'intégration AWS dans Datadog et repérez la zone correspondant au compte créé. Cliquez sur **Refresh to Check Status** pour afficher un message de réussite en haut de la page. Le nouveau compte est également indiqué, avec les informations pertinentes.

Consultez la section [Débuter avec AWS][3] pour en savoir plus sur l'intégration Datadog/AWS et le modèle CloudFormation. Si vous souhaitez configurer manuellement l'intégration AWS, consultez les [instructions dédiées][4].

## Activer les logs AWS CloudTrail

Activez la journalisation AWS CloudTrail afin d'envoyer les logs vers un compartiment S3. Si vous avez déjà appliqué cette configuration, passez à l'étape [Envoyer des logs AWS CloudTrail à Datadog](#envoyer-des-logs-aws-cloudtrail-a-datadog).

1. Cliquez sur **Create trail** sur le [dashboard CloudTrail][5].
2. Saisissez le nom de votre journal de suivi.
3. Créez un compartiment S3 ou utilisez-en un existant pour stocker les logs CloudTrail.
4. Créez une clé AWS KMS ou utilisez-en une existante, puis cliquez sur **Next**.
5. Conservez le type d'événement par défaut, à savoir les événements de lecture et d'écriture de gestion, ou choisissez les types d'événements supplémentaires que vous souhaitez envoyer à Datadog. Cliquez ensuite sur **Next**.
6. Vérifiez votre configuration, puis cliquez sur **Create trail**.

## Envoyer des logs AWS CloudTrail à Datadog

Configurez un déclencheur sur la fonction Lambda du Forwarder Datadog afin d'envoyer les logs CloudTrail stockés dans le compartiment S3 à Datadog, pour faciliter la surveillance.

1. Accédez à la [fonction Lambda du Forwarder Datadog][6] qui a été créée lors de la configuration de l'intégration AWS.
2. Cliquez sur **Add trigger**.
3. Sélectionnez le déclencheur **S3**.
4. Sélectionnez le compartiment S3 que vous utilisez pour recueillir les logs AWS CloudTrail.
5. Sélectionnez le type d'événement **All object create events**.
6. Cliquez sur **Add**.
7. Accédez à vos logs CloudTrail dans la vue [Log Explorer][7] de Datadog.

Consultez la section [Log Explorer][8] pour découvrir comment rechercher, filtrer, regrouper et visualiser vos logs.

## Utiliser Cloud SIEM pour trier les signaux de sécurité

Cloud SIEM applique des règles de détection prêtes à l'emploi à l'ensemble des logs traités, y compris les logs CloudTrail que vous avez configurés. Lorsqu'une menace est détectée grâce à une règle, un signal de sécurité est généré. Vous pouvez le consulter dans le Security Signals Explorer.

- Accédez au [Signals Explorer de Cloud SIEM][9] pour visualiser et trier les menaces. Consultez la section [Security Signals Explorer][10] pour en savoir plus.
- Vous pouvez également vous servir du [dashboard AWS CloudTrail][11] pour étudier les activités anormales.
- Consultez les [règles de détection prêtes à l'emploi][12] qui sont appliquées à vos logs.
- Créez des [règles][13] pour détecter les menaces en fonction de vos besoins précis.

Cloud SIEM applique des règles de détection à l'ensemble des logs traités. Pour cette raison, vous pouvez consulter les [instructions dans l'application][14] pour découvrir comment recueillir des [logs d'audit Kubernetes][15] et des logs d'autres sources afin d'améliorer la détection des menaces. Il est également possible d'activer la journalisation d'autres [services AWS][16] dans un compartiment S3 et d'envoyer ces logs à Datadog à des fins de surveillance des menaces.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Log%20Detection%22
[2]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[3]: https://docs.datadoghq.com/fr/getting_started/integrations/aws/
[4]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=roledelegation#manual
[5]: https://console.aws.amazon.com/cloudtrail/home
[6]: https://console.aws.amazon.com/lambda/home
[7]: https://app.datadoghq.com/logs?query=service%3Acloudtrail
[8]: https://docs.datadoghq.com/fr/logs/explorer/
[9]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%29%20&column=time&order=desc&product=siem
[10]: https://docs.datadoghq.com/fr/security_platform/explorer/
[11]: https://app.datadoghq.com/dash/integration/30459/aws-cloudtrail
[12]: https://docs.datadoghq.com/fr/security_platform/default_rules/#cat-cloud-siem
[13]: https://docs.datadoghq.com/fr/security_platform/detection_rules/
[14]: https://app.datadoghq.com/security/configuration?detect-threats=apache&secure-cloud-environment=amazon-web-services&secure-hosts-and-containers=kubernetes&selected-products=security_monitoring
[15]: https://docs.datadoghq.com/fr/integrations/kubernetes_audit_logs/
[16]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#enable-logging-for-your-aws-service