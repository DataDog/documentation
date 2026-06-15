---
aliases:
- /fr/security_platform/guide/setting-up-security-monitoring-for-aws
- /fr/security_platform/cloud_siem/guide/setting-up-security-monitoring-for-aws
title: Configurer Cloud SIEM pour AWS
---

## Présentation

La solution Cloud SIEM de Datadog applique des règles de détection à l'ensemble des logs traités. Les logs des services AWS sont recueillis par une fonction Lambda Datadog. Cette dernière se déclenche sur les compartiments S3 et transmet les logs à Datadog. Suivez les instructions de configuration ci-dessous pour commencer à utiliser cette fonctionnalité :

## Configuration

1. Accédez à la [page Security Configuration Setup][1] dans l'application Datadog.
2. Sélectionnez **Cloud SIEM**.
3. Sous **Secure your cloud environment**, sélectionnez AWS.
4. Terminez la configuration de la section **Detect threats with cloud logs**.
5. (Facultatif) Terminez la configuration de la section **Secure your hosts and containers**.
6. (Facultatif) Terminez la configuration de la section **Detect threats in additional logging sources**.


[1]: https://app.datadoghq.com/security/configuration