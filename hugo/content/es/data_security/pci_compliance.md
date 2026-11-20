---
further_reading:
- link: https://trust.datadoghq.com/
  tag: Datadog Trust Center
  text: Conozca la postura de seguridad de Datadog y revise la documentación de seguridad
title: Compliance de PCI DSS
---
## Descripción general {#overview}

El Estándar de Seguridad de Datos de la Industria de Tarjetas de Pago (PCI DSS) tiene requisitos rigurosos de monitoreo y seguridad de datos para todos los comerciantes, proveedores de servicios e instituciones financieras. Para cumplir con estos requisitos, las organizaciones a menudo separan los datos regulados por PCI (como los datos del titular de la tarjeta) y los datos no regulados en diferentes aplicaciones para fines de monitoreo y Compliance.

**Las herramientas y políticas de Datadog cumplen con PCI v4.0.1**. Para comprender todo el contexto del entorno de Datadog y cómo se relaciona con las responsabilidades del cliente bajo los controles PCI-DSS relevantes, descargue la Customer Responsibility Matrix y la Attestation of Compliance (AoC) desde el [Datadog Trust Center][1].

La Attestation of Compliance (AoC) de Datadog refleja las herramientas y políticas que tenemos implementadas para mantener un entorno Connected PCI como proveedor de servicios. La plataforma Datadog admite conexiones a entornos de datos de titulares de tarjetas (CDE) como un entorno Connected PCI, pero no sirve como un CDE en sí mismo para almacenar, procesar o transmitir datos de titulares de tarjetas (CHD).
Es su responsabilidad evitar que cualquier CHD ingrese a la plataforma Datadog. 

## Herramientas recomendadas para el Compliance con PCI {#recommended-tools-for-pci-compliance}

Para ayudar a mantener el Compliance con PCI, **Datadog recomienda encarecidamente** el uso de las siguientes herramientas y el siguiente proceso:
- [**Sensitive Data Scanner**][2]: descubra, clasifique y oculte datos confidenciales de titulares de tarjetas
- [**Audit Trail**][3]: busque y analice eventos de auditoría detallados por hasta 90 días para la retención y el archivo a largo plazo
- [**File Integrity Monitoring**][4]: supervise los cambios en archivos y directorios clave
- [**Cloud Security**][5]: realice un seguimiento de la conformidad con los requisitos de los estándares de la industria y otros controles

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://trust.datadoghq.com/?itemUid=53e1508c-665e-45a8-9ce0-03fdf9ae1efb&source=click
[2]: /es/security/sensitive_data_scanner/
[3]: /es/account_management/audit_trail/
[4]: /es/security/workload_protection/
[5]: /es/security/cloud_security_management/#track-your-organizations-health