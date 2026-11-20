---
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
title: Guía de configuración de OCI para Cloud SIEM
---
## Descripción general {#overview}

Cloud SIEM aplica reglas de detección a todos los registros procesados en Datadog para detectar amenazas como ataques dirigidos, comunicación con direcciones IP incluidas en la inteligencia de amenazas o modificaciones de recursos no seguras. Las amenazas detectadas se muestran como Security Signals en Security Signals Explorer para su clasificación.

Esta guía le muestra los siguientes pasos para comenzar a detectar amenazas con sus registros de auditoría de OCI:

1. [Configure la integración de OCI de Datadog](#set-up-datadogs-oci-integration)  
2. [Habilite la recopilación de registros](#enable-log-collection)
3. [Utilice Cloud SIEM para clasificar los Security Signals](#use-cloud-siem-to-triage-security-signals)

## Configure la integración de OCI de Datadog {#set-up-datadogs-oci-integration}

Configure la [integración de OCI][5] de Datadog mediante el método QuickStart (recomendado) o Terraform.

## Habilitar la recopilación de registros {#enable-log-collection}

Asegúrese de que la recopilación de registros esté habilitada en el mosaico de integración de OCI de Datadog:

{{< img src="security/cloud_siem/guide/oci_config_guide/oci_logs_enabled.png" alt="El mosaico de integración de OCI en Datadog con la recopilación de registros habilitada" style="width:90%;" >}}

## Utilice Cloud SIEM para clasificar los Security Signals {#use-cloud-siem-to-triage-security-signals}

Cloud SIEM aplica reglas de detección listas para usar a todos los registros procesados, incluidos sus registros de auditoría de OCI. Cuando se detecta una amenaza con una regla de detección, se genera un Security Signal que se puede visualizar en Security Signals Explorer.

- Vaya a [Cloud SIEM Signals Explorer][1] para visualizar y clasificar las amenazas. Para obtener más información, consulte [Investigar Security Signals][2].  
- Consulte las [reglas de detección listas para usar][3] que se aplican a sus registros.  
- [Cree reglas][4] para detectar amenazas que coincidan con su caso de uso específico.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/siem/signals
[2]: /es/security/cloud_siem/triage_and_investigate/investigate_security_signals/
[3]: /es/security/default_rules/#cat-cloud-siem
[4]: /es/security/detection_rules/#create-detection-rules
[5]: /es/integrations/oracle-cloud-infrastructure/?tab=createvcnrecommended