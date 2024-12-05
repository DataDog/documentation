---
disable_toc: false
further_reading:
- link: /security/cloud_siem/log_detection_rules
  tag: Documentación
  text: Crear reglas de detección de logs
- link: security/cloud_siem/investigator
  tag: Documentación
  text: Más información sobre Investigator
- link: /security/cloud_siem/investigate_security_signals
  tag: Documentación
  text: Investigar las señales de seguridad
title: Paquetes de contenidos
---

## Información general

Los [Paquetes de contenidos de Cloud SIEM][1] proporcionan contenido predefinido para las integraciones de seguridad clave. Según la integración, un Paquete de contenidos puede incluir lo siguiente:

- [Normas de detección][2] para ofrecer una cobertura completa de tu entorno
- Un dashboard interactivo con información detallada sobre el estado de logs y señales de seguridad para el Paquete de contenidos
- [Investigator][3], una interfaz gráfica interactiva para investigar actividades sospechosas de un usuario o recurso
- [Workflow Automation][4], para automatizar acciones y acelerar la investigación y resolución de problemas.
- Guías de configuración

{{< whatsnext desc="Content Packs are grouped into the following categories:" >}}
    {{< nextlink href="/security/cloud_siem/content_packs#cloud-audit-content-packs" >}}<u>Auditoría en la nube</u>: AWS CloudTrail, Azure Security, GCP Audit Logs, Kubernetes Audit Logs{{< /nextlink >}}
    {{< nextlink href="/security/cloud_siem/content_packs#authentication-content-packs" >}}<u>Autenticación</u>: 1Password, Auth0, Cisco DUO, JumpCloud, Okta{{< /nextlink >}}
    {{< nextlink href="/security/cloud_siem/content_packs#collaboration-content-packs" >}}<u>Colaboración</u>: Google Workspace, Microsoft 365, Slack Audit Logs{{< /nextlink >}}
    {{< nextlink href="/security/cloud_siem/content_packs#network-content-packs" >}}<u>Red</u>: Cloudflare, Cisco Meraki, Cisco Umbrella, Palo Alto Networks Firewall{{< /nextlink >}}
    {{< nextlink href="/security/cloud_siem/content_packs#web-security-content-packs" >}}<u>Seguridad web</u>: NGINX{{< /nextlink >}}
    {{< nextlink href="/security/cloud_siem/content_packs#cloud-developer-tools-content-packs" >}}<u>Herramientas para desarrolladores en la nube</u>: GitHub{{< /nextlink >}}
    {{< nextlink href="/security/cloud_siem/content_packs#endpoint-content-packs" >}}<u>Endpoint</u>: CrowdStrike{{< /nextlink >}}
{{< /whatsnext >}}

## Paquetes de contenidos de Auditoría en la nube

### AWS CloudTrail

Monitoriza los niveles de seguridad y cumplimiento de tus operaciones en AWS.

El [paquete de contenidos de AWS CloudTrail][5] incluye:
- [Reglas de detección][6]
- Un dashboard interactivo
- AWS Investigador
- Workflow Automation
- [Guía de configuración][43]

### Azure Security

Protege tu entorno de Azure rastreando la actividad de los atacantes.

El [paquete de contenidos de Azure Security][7] incluye:
- [Reglas de detección][8]
- Un dashboard interactivo
- Azure Investigator
- [Guía de configuración][44]

### Logs de auditoría de GCP

Protege tu entorno de GCP mediante la monitorización de auditorías de logs.

El [paquete de contenidos de los logs de auditoría de GCP][9] incluye:
- [Reglas de detección][10]
- Un dashboard interactivo
- GCP Investigator
- [Guía de configuración][45]

### Logs de auditoría de Kubernetes
Gana cobertura mediante la monitorización de logs de auditoría en tu plano de control de Kubernetes.

El [paquete de contenidos de los logs de auditoría de Kubernetes][11] incluye:
- [Reglas de detección][12]
- Un dashboard interactivo

## Paquetes de contenidos de autenticación

### 1Password

Monitoriza la actividad de la cuenta con 1Password Events Reporting.

El [paquete de contenidos de 1Password][13] incluye:
- [Reglas de detección][14]
- Un dashboard interactivo

### Auth0

Monitoriza y genera señales en torno a la actividad del usuario de Auth0.

El [paquete de contenidos de Auth0][15] incluye:
- [Reglas de detección][16]
- Un dashboard interactivo

### Cisco DUO

Monitoriza y analiza MFA y asegura el acceso a los logs de Cisco DUO.

El [paquete de contenidos de Cisco DUO][31] incluye:
- [Reglas de detección][32]
- Un dashboard interactivo

### JumpCloud

Rastrea la actividad del usuario mediante la monitorización de logs de auditoría de JumpCloud.

El [paquete de contenidos de JumpCloud][17] incluye:
- [Reglas de detección][18]

### Okta

Rastrea la actividad de los usuarios mediante la monitorización de la auditoría de logs de Okta.

El [paquete de contenidos de Okta][15] incluye:
- [Reglas de detección][20]
- Un dashboard interactivo
- Workflow Automation

## Paquetes de contenidos de colaboración

### Google Workspace

Optimiza tu monitorización de seguridad dentro de Google Workspace.

El [paquete de contenidos de Google Workspace][21] incluye:
- [Reglas de detección][22]
- Un dashboard interactivo

### Microsoft 365

Monitoriza eventos de seguridad clave de logs de Microsoft 365.

El [paquete de contenidos de Microsoft 365][23] incluye:
- [Reglas de detección][24]
- Un dashboard interactivo

### Logs de auditoría de Slack

Ve, analiza y monitoriza los logs de auditoría de Slack.

El [paquete de contenidos de Slack][33] incluye:
- [Reglas de detección][34]
- Un dashboard interactivo

## Paquetes de contenidos de red

### Cloudflare

Mejora la seguridad de tus aplicaciones web.

El [paquete de contenidos de Cloudflare][25] incluye:
- [Reglas de detección][26]
- Un dashboard interactivo
- Workflow Automation

### Cisco Meraki

Monitoriza logs de Cisco Meraki e identifica la actividad de los atacantes.

El [paquete de contenidos de Cisco Meraki][35] incluye:
- [Reglas de detección][36]
- Un dashboard interactivo

### Palo Alto Networks Firewall

Analiza el tráfico y detecta amenazas con Palo Alto Networks Firewall.

El [paquete de contenidos de Palo Alto Networks Firewall][37] incluye:
- [Reglas de detección][38]
- Un dashboard interactivo

### Cisco Umbrella

Recopila y monitoriza los logs de Cisco Umbrella para obtener información sobre DNS y logs de proxy.

El [paquete de contenidos de Cisco Umbrella][39] incluye:
- [Reglas de detección][40]
- Un dashboard interactivo

## Paquetes de contenidos de seguridad web

### NGINX

Monitoriza y responde a los riesgos basados en la Web con NGINX.

El [paquete de contenidos de NGINX][41] incluye:
- [Reglas de detección][42]
- Un dashboard interactivo

## Paquetes de contenidos de herramientas de desarrollo en la nube

### GitHub

Rastrea la actividad de los usuarios y el historial de cambios de código mediante la monitorización de logs de auditoría de GitHub.

El [paquete de contenidos de GitHub][27] incluye:
- [Reglas de detección][28]
- Un dashboard interactivo

## Paquetes de contenidos para endpoints

### CrowdStrike

Mejora la seguridad de tus endpoints con CrowdStrike.

El [paquete de contenidos de CrowdStrike][29] incluye:
- [Reglas de detección][30]
- Un dashboard interactivo

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/content-packs
[2]: /es/security/detection_rules/
[3]: /es/security/cloud_siem/investigator
[4]: /es/service_management/workflows/
[5]: https://app.datadoghq.com/security/content-packs/aws-cloudtrail
[6]: /es/security/default_rules/#cloudtrail
[7]: https://app.datadoghq.com/security/content-packs/azure
[8]: /es/security/default_rules/#azuresecurity
[9]: https://app.datadoghq.com/security/content-packs/gcp-audit-logs
[10]: /es/security/default_rules/#gcp
[11]: https://app.datadoghq.com/security/content-packs/kubernetes-audit-logs
[12]: /es/security/default_rules/#kubernetes
[13]: https://app.datadoghq.com/security/content-packs/1password
[14]: /es/security/default_rules/#1password
[15]: https://app.datadoghq.com/security/content-packs/auth0
[16]: /es/security/default_rules/#auth0
[17]: https://app.datadoghq.com/security/content-packs/jumpcloud
[18]: /es/security/default_rules/#jumpcloud
[19]: https://app.datadoghq.com/security/content-packs/okta
[20]: /es/security/default_rules/#okta
[21]: https://app.datadoghq.com/security/content-packs/google-workspace
[22]: /es/security/default_rules/#gsuite
[23]: https://app.datadoghq.com/security/content-packs/microsoft-365
[24]: /es/security/default_rules/#microsoft-365
[25]: https://app.datadoghq.com/security/content-packs/cloudflare
[26]: /es/security/default_rules/#cloudflare
[27]: https://app.datadoghq.com/security/content-packs/github
[28]: /es/security/default_rules/#github-telemetry
[29]: https://app.datadoghq.com/security/content-packs/crowdstrike
[30]: /es/security/default_rules/#crowdstrike
[31]: https://app.datadoghq.com/security/content-packs/cisco-duo
[32]: /es/security/default_rules/#cisco-duo
[33]: https://app.datadoghq.com/security/content-packs/slack
[34]: /es/security/default_rules/#slack
[35]: https://app.datadoghq.com/security/content-packs/meraki
[36]: /es/security/default_rules/#meraki
[37]: https://app.datadoghq.com/security/content-packs/pan-firewall
[38]: /es/security/default_rules/#panfirewall
[39]: https://app.datadoghq.com/security/content-packs/cisco-umbrella-dns
[40]: /es/security/default_rules/#cisco-umbrella-dns
[41]: https://app.datadoghq.com/security/content-packs/nginx
[42]: /es/security/default_rules/#nginx
[43]: https://docs.datadoghq.com/es/security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
[44]: https://docs.datadoghq.com/es/security/cloud_siem/guide/azure-config-guide-for-cloud-siem
[45]: https://docs.datadoghq.com/es/security/cloud_siem/guide/google-cloud-config-guide-for-cloud-siem/