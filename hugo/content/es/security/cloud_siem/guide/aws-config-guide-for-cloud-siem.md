---
aliases:
- /es/security_platform/guide/aws-config-guide-for-cloud-siem
- /es/security_platform/cloud_siem/guide/aws-config-guide-for-cloud-siem
further_reading:
- link: /security/default_rules/#cat-cloud-siem-log-detection
  tag: Documentación
  text: Explore las reglas de detección predeterminadas de Cloud SIEM
- link: /security/cloud_siem/triage_and_investigate/investigate_security_signals
  tag: Documentación
  text: Obtenga información sobre el Explorador de señales de seguridad
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule
  tag: Documentación
  text: Crear reglas de detección personalizadas
- link: /getting_started/integrations/aws/
  tag: Documentación
  text: Primeros pasos con AWS
- link: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
  tag: Documentación
  text: Envíe registros de servicios de AWS con la función Lambda de Datadog
- link: /logs/explorer/
  tag: Documentación
  text: Vea cómo explorar sus registros
- link: https://learn.datadoghq.com/courses/cloud-siem-configure-aws
  tag: Centro de aprendizaje
  text: Configure Cloud SIEM para AWS
title: Guía de configuración de AWS para Cloud SIEM
---
## Descripción general {#overview}

Cloud SIEM aplica reglas de detección a todos los registros procesados en Datadog para detectar amenazas, como un ataque dirigido, una IP listada en inteligencia de amenazas que se comunica con sus sistemas o una configuración insegura. Las amenazas se muestran como Security Signals en el [Explorador de Security Signals][1] para su clasificación.

Esta guía presenta los siguientes pasos para que pueda comenzar a detectar amenazas con sus registros de AWS CloudTrail:

1. [Configure la integración de AWS de Datadog](#set-up-aws-integration-using-cloudformation)
2. [Habilite los registros de AWS CloudTrail](#enable-aws-cloudtrail-logging)
3. [Envíe registros de AWS CloudTrail a Datadog](#send-aws-cloudtrail-logs-to-datadog)
4. [Utilice Cloud SIEM para clasificar los Security Signals](#use-cloud-siem-to-triage-security-signals)

## Configure la integración de AWS mediante CloudFormation {#set-up-aws-integration-using-cloudformation}

{{% cloud-siem-aws-setup-cloudformation %}}

## Habilite el registro de AWS CloudTrail {#enable-aws-cloudtrail-logging}

{{% cloud-siem-aws-cloudtrail-enable %}}

## Envíe registros de AWS CloudTrail a Datadog {#send-aws-cloudtrail-logs-to-datadog}

{{% cloud-siem-aws-cloudtrail-send-logs %}}

## Utilice Cloud SIEM para clasificar los Security Signals {#use-cloud-siem-to-triage-security-signals}

Cloud SIEM aplica reglas de detección preconfiguradas a todos los registros procesados, incluidos los registros de CloudTrail que acaba de configurar. Cuando se detecta una amenaza con una Detection Rule, se genera un Security Signal que se puede visualizar en el Explorador de Security Signals.

- Vaya al [Explorador de Cloud SIEM Signals][9] para visualizar y clasificar las amenazas. Consulte el [Explorador de Security Signals][10] para obtener más detalles.
- También puede utilizar el [AWS CloudTrail dashboard][11] para investigar actividades anómalas.
- Consulte las [reglas de detección predeterminadas][12] que se aplican a sus registros.
- Cree [nuevas reglas][13] para detectar amenazas que coincidan con su caso de uso específico.

Dado que Cloud SIEM aplica reglas de detección a todos los registros procesados, consulte las [instrucciones en la aplicación][14] sobre cómo recopilar [registros de auditoría de Kubernetes][15] y registros de otras fuentes para la detección de amenazas. También puede habilitar diferentes [servicios de AWS][16] para que guarden registros en un bucket de S3 y enviar esos registros a Datadog para el monitoreo de amenazas.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/signals?query=%40workflow.rule.type%3A%22Log%20Detection%22
[9]: https://app.datadoghq.com/security/siem/signals?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%29%20&column=time&order=desc
[10]: /es/security/cloud_siem/triage_and_investigate/investigate_security_signals
[11]: https://app.datadoghq.com/dash/integration/30459/aws-cloudtrail
[12]: https://docs.datadoghq.com/es/security/default_rules/#cat-cloud-siem
[13]: https://docs.datadoghq.com/es/security/detection_rules/
[14]: https://app.datadoghq.com/security/configuration?detect-threats=apache&secure-cloud-environment=amazon-web-services&secure-hosts-and-containers=kubernetes&selected-products=security_monitoring
[15]: https://docs.datadoghq.com/es/integrations/kubernetes_audit_logs/
[16]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#enable-logging-for-your-aws-service