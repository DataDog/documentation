---
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
title: Guide de configuration OCI pour Cloud SIEM
---
## Présentation {#overview}

Cloud SIEM applique des règles de détection à tous les logs traités dans Datadog afin de détecter les menaces telles que les attaques ciblées, les communications avec des adresses IP figurant dans les listes de renseignement sur les menaces ou les modifications non sécurisées de ressources. Les menaces détectées sont présentées sous forme de Security Signals dans le Security Signals Explorer pour être triées.

Ce guide vous présente les étapes suivantes pour commencer à détecter les menaces à partir de vos logs OCI Audit :

1. [Configurez l'intégration OCI de Datadog](#set-up-datadogs-oci-integration)  
2. [Activez la collecte de logs](#enable-log-collection)
3. [Utilisez Cloud SIEM pour trier les Security Signals](#use-cloud-siem-to-triage-security-signals)

## Configurez l'intégration OCI de Datadog {#set-up-datadogs-oci-integration}

Configurez l'[intégration OCI][5] de Datadog en utilisant soit la méthode QuickStart (recommandée), soit la méthode Terraform.

## Activer la collecte de logs {#enable-log-collection}

Assurez-vous que la collecte de logs est activée dans la tuile d'intégration OCI de Datadog :

{{< img src="security/cloud_siem/guide/oci_config_guide/oci_logs_enabled.png" alt="La tuile d'intégration OCI dans Datadog avec la collecte de logs activée" style="width:90%;" >}}

## Utilisez Cloud SIEM pour trier les Security Signals {#use-cloud-siem-to-triage-security-signals}

Cloud SIEM applique des règles de détection prêtes à l'emploi à tous les logs traités, y compris vos logs OCI Audit. Lorsqu'une menace est détectée avec une règle de détection, un Security Signal est généré et peut être consulté dans le Security Signals Explorer.

- Accédez au [Cloud SIEM Signals Explorer][1] pour afficher et trier les menaces. Consultez [Examiner les Security Signals][2] pour plus de détails.  
- Consultez les [règles de détection prêtes à l'emploi][3] qui sont appliquées à vos logs.  
- [Créez des règles][4] pour détecter les menaces qui correspondent à votre cas d'utilisation spécifique.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/siem/signals
[2]: /fr/security/cloud_siem/triage_and_investigate/investigate_security_signals/
[3]: /fr/security/default_rules/#cat-cloud-siem
[4]: /fr/security/detection_rules/#create-detection-rules
[5]: /fr/integrations/oracle-cloud-infrastructure/?tab=createvcnrecommended