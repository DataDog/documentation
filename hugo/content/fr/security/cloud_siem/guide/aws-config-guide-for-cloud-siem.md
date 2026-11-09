---
aliases:
- /fr/security_platform/guide/aws-config-guide-for-cloud-siem
- /fr/security_platform/cloud_siem/guide/aws-config-guide-for-cloud-siem
further_reading:
- link: /security/default_rules/#cat-cloud-siem-log-detection
  tag: Documentation
  text: Explorer les règles de détection par défaut de Cloud SIEM
- link: /security/cloud_siem/triage_and_investigate/investigate_security_signals
  tag: Documentation
  text: En savoir plus sur le Security Signals Explorer
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule
  tag: Documentation
  text: Créer des règles de détection personnalisées
- link: /getting_started/integrations/aws/
  tag: Documentation
  text: Débuter avec AWS
- link: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
  tag: Documentation
  text: Envoyer des logs de services AWS avec la fonction Lambda Datadog
- link: /logs/explorer/
  tag: Documentation
  text: Découvrir comment explorer vos logs
- link: https://learn.datadoghq.com/courses/cloud-siem-configure-aws
  tag: Centre d'apprentissage
  text: Configurez Cloud SIEM pour AWS
title: Guide de configuration d'AWS pour Cloud SIEM
---
## Présentation {#overview}

Cloud SIEM applique des règles de détection à tous les logs traités dans Datadog afin de détecter les menaces, telles qu'une attaque ciblée, une adresse IP figurant dans les données de veille sur les menaces qui communique avec vos systèmes ou une configuration non sécurisée. Les menaces sont présentées sous forme de Security Signals dans le [Security Signals Explorer][1] afin de pouvoir les trier.

Ce guide détaille les étapes à suivre afin de commencer à détecter les menaces à l'aide de vos logs AWS CloudTrail :

1. [Configurez l'intégration AWS de Datadog](#set-up-aws-integration-using-cloudformation)
2. [Activez les logs AWS CloudTrail](#enable-aws-cloudtrail-logging)
3. [Envoyez les logs AWS CloudTrail à Datadog](#send-aws-cloudtrail-logs-to-datadog)
4. [Utilisez Cloud SIEM pour trier les Security Signals](#use-cloud-siem-to-triage-security-signals)

## Configurez l'intégration AWS à l'aide de CloudFormation {#set-up-aws-integration-using-cloudformation}

{{% cloud-siem-aws-setup-cloudformation %}}

## Activez la journalisation AWS CloudTrail {#enable-aws-cloudtrail-logging}

{{% cloud-siem-aws-cloudtrail-enable %}}

## Envoyez les logs AWS CloudTrail à Datadog {#send-aws-cloudtrail-logs-to-datadog}

{{% cloud-siem-aws-cloudtrail-send-logs %}}

## Utilisez Cloud SIEM pour trier les Security Signals {#use-cloud-siem-to-triage-security-signals}

Cloud SIEM applique des règles de détection prêtes à l'emploi à tous les logs traités, y compris les logs CloudTrail que vous venez de configurer. Lorsqu'une menace est détectée avec une Detection Rule, un Security Signal est généré et peut être consulté dans le Security Signals Explorer.

- Accédez au [Cloud SIEM Signals Explorer][9] pour consulter et trier les menaces. Consultez le [Security Signals Explorer][10] pour plus de détails.
- Vous pouvez également utiliser le [dashboard AWS CloudTrail][11] pour enquêter sur les activités anormales.
- Consultez les [règles de détection prêtes à l'emploi][12] qui sont appliquées à vos logs.
- Créez de [nouvelles règles][13] pour détecter les menaces qui correspondent à votre cas d'utilisation spécifique.

Comme Cloud SIEM applique des règles de détection à tous les logs traités, consultez les [instructions intégrées][14] sur la façon de collecter les [logs d'audit Kubernetes][15] et les logs provenant d'autres sources pour la détection des menaces. Vous pouvez également activer la journalisation de différents [services AWS][16] dans un bucket S3 et envoyer leurs logs à Datadog pour surveiller les menaces.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/signals?query=%40workflow.rule.type%3A%22Log%20Detection%22
[9]: https://app.datadoghq.com/security/siem/signals?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%29%20&column=time&order=desc
[10]: /fr/security/cloud_siem/triage_and_investigate/investigate_security_signals
[11]: https://app.datadoghq.com/dash/integration/30459/aws-cloudtrail
[12]: https://docs.datadoghq.com/fr/security/default_rules/#cat-cloud-siem
[13]: https://docs.datadoghq.com/fr/security/detection_rules/
[14]: https://app.datadoghq.com/security/configuration?detect-threats=apache&secure-cloud-environment=amazon-web-services&secure-hosts-and-containers=kubernetes&selected-products=security_monitoring
[15]: https://docs.datadoghq.com/fr/integrations/kubernetes_audit_logs/
[16]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#enable-logging-for-your-aws-service