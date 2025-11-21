---
aliases:
- /es/security_platform/guide/aws-config-guide-for-cloud-siem
- /es/security_platform/cloud_siem/guide/aws-config-guide-for-cloud-siem
further_reading:
- link: /security/default_rules/#cat-cloud-siem-log-detection
  tag: Documentación
  text: Explorar las reglas de detección predeterminadas de Cloud SIEM
- link: /security/cloud_siem/investigate_security_signals
  tag: Documentación
  text: Más información sobre Security Signals Explorer
- link: /security/cloud_siem/log_detection_rules/
  tag: Documentación
  text: Crear nuevas reglas de detección
- link: /getting_started/integrations/aws/
  tag: Documentación
  text: Empezando con AWS
- link: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
  tag: Documentación
  text: Enviar logs de servicios de AWS con la función Lambda de Datadog
- link: /logs/explorer/
  tag: Documentación
  text: Consulta cómo explorar tus logs
title: Guía de configuración de AWS para Cloud SIEM
---

## Información general

Cloud SIEM aplica reglas de detección a todos los logs procesados en Datadog para detectar amenazas, como un ataque dirigido, una IP incluida en la lista de amenazas que se comunica con tus sistemas o una configuración insegura. Las amenazas aparecen como señales de seguridad en el [Security Signals Explorer][1] para su clasificación.

Esta guía te indicará los siguientes pasos para que puedas empezar a detectar amenazas con tus logs de AWS CloudTrail:

1. [Configurar la integración de AWS de Datadog](#set-up-aws-integration-using-cloudformation)
2. [Habilitar logs de AWS CloudTrail](#enable-aws-cloudtrail-logging)
3. [Enviar logs de AWS CloudTrail a Datadog](#send-aws-cloudtrail-logs-to-datadog)
4. [Usar Cloud SIEM para clasificar señales de seguridad](#use-cloud-siem-to-triage-security-signals)

## Configurar la integración de AWS con CloudFormation

{{% cloud-siem-aws-setup-cloudformation %}}

## Habilitar el registro de AWS CloudTrail

{{% cloud-siem-aws-cloudtrail-enable %}}

## Enviar logs de AWS CloudTrail a Datadog

{{% cloud-siem-aws-cloudtrail-send-logs %}}

## Usar Cloud SIEM para clasificar señales de seguridad

Cloud SIEM aplica reglas de detección predefinidas a todos los logs procesados, incluidos los logs de CloudTrail que acabas de configurar. Cuando se detecta una amenaza con una regla de detección, se genera una señal de seguridad que se puede ver en el Security Signals Explorer.

- Ve al [Cloud SIEM Signals Explorer][9] para ver y clasificar las amenazas. Consulta [Security Signals Explorer][10] para obtener más información.
- También puedes utilizar el [dashboard de AWS CloudTrail][11] para investigar actividades anómalas.
- Consulta las [reglas de detección predefinidas][12] que se aplican a tus logs.
- Crea [nuevas reglas][13] para detectar amenazas que coincidan con tu caso de uso específico.

Dado que Cloud SIEM aplica reglas de detección a todos los logs procesados, consulta las [instrucciones dentro de la aplicación][14] sobre cómo recopilar [logs de auditoría de Kubernetes][15] y logs de otras fuentes para la detección de amenazas. También puedes habilitar diferentes [servicios de AWS][16] para loguear en un bucket S3 y enviarlos a Datadog para la monitorización de amenazas.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/signals?query=%40workflow.rule.type%3A%22Log%20Detection%22
[9]: https://app.datadoghq.com/security/siem/signals?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%29%20&column=time&order=desc
[10]: /es/security/cloud_siem/investigate_security_signals
[11]: https://app.datadoghq.com/dash/integration/30459/aws-cloudtrail
[12]: https://docs.datadoghq.com/es/security/default_rules/#cat-cloud-siem
[13]: https://docs.datadoghq.com/es/security/detection_rules/
[14]: https://app.datadoghq.com/security/configuration?detect-threats=apache&secure-cloud-environment=amazon-web-services&secure-hosts-and-containers=kubernetes&selected-products=security_monitoring
[15]: https://docs.datadoghq.com/es/integrations/kubernetes_audit_logs/
[16]: https://docs.datadoghq.com/es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#enable-logging-for-your-aws-service
