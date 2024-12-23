---
further_reading:
- link: security/default_rules
  tag: Documentación
  text: Explorar las reglas de detección predeterminadas de configuración en la nube
    de CSM Misconfigurations
- link: /security/misconfigurations/custom_rules
  tag: Documentación
  text: Crear reglas personalizadas
title: Kubernetes Security Posture Management
---

Kubernetes Security Posture Management (KSPM) para Cloud Security Management (CSM) te ayuda a reforzar de forma proactiva la postura de seguridad de tus despliegues de Kubernetes comparando tu entorno con las prácticas recomendadas establecidas del sector, como las definidas por [CIS][1], o con tus propias [políticas de detección personalizadas](#create-your-own-kubernetes-detection-rules).

## Configuración de KSPM

Para sacar el máximo partido de KSPM, debes instalar tanto el Datadog Agent como las integraciones en la nube. Para obtener instrucciones detalladas, consulta los siguientes artículos:

- CSM Enterprise ([Agent][14] e [integraciones en la nube][15])
- CSM Pro ([Agent][12] e [integraciones en la nube][13])

Esto permite a Datadog detectar riesgos en tus despliegues de Kubernetes para cada uno de los siguientes tipos de recursos:

| Tipo de recurso            | Método de instalación    | Marco        |
|--------------------------|-------------------|------------------|
| `aws_eks_cluster`        | Integración en la nube | `cis-eks`        |
| `aws_eks_worker_node`    | Agent             | `cis-eks`        |
| `azure_aks_cluster`      | Integración en la nube | `cis-aks`        |
| `azure_aks_worker_node`  | Agent             | `cis-aks`        |
| `kubernetes_master_node` | Agent             | `cis-kubernetes` |
| `kubernetes_worker_node` | Agent             | `cis-kubernetes` |

## Monitorizar el riesgo en todos los despliegues de Kubernetes 

Con KSPM, Datadog analiza tu entorno en busca de riesgos definidos por más de 50 reglas de detección predefinidas de Kubernetes. Cuando al menos un caso definido en una regla coincide durante un periodo determinado, [se envía una alerta de notificación ][6] y se genera un hallazgo en el [Misconfigurations Explorer][11].

Cada hallazgo contiene el contexto que necesitas para identificar el impacto del problema, como la configuración completa del recurso, las etiquetas (tags) a nivel de recurso y un mapa de las relaciones del recurso con otros componentes de tu infraestructura. Después de comprender el problema y su impacto, puedes empezar a solucionar el problema [creando un tique de Jira][7] desde CSM o [ejecutando un flujo de trabajo predefinido][8].

**Nota**: Tambiéns puede utilizar la [API para interactuar mediante programación con los hallazgos][10].

{{< img src="security/csm/kspm_finding.png" alt="El panel de detalles para un hallazgo de gravedad alta para la regla EKS Cluster should have public access limited rule" width="80%">}}

## Evalúa tu posición de seguridad en Kubernetes con respecto a los marcos estándar del sector.

CSM proporciona una [puntuación de la posición de seguridad][2] que te ayuda a comprender tu estado de seguridad y cumplimiento utilizando una única métrica. La puntuación representa el porcentaje de tu entorno que satisface todas tus reglas activas de detección en la nube e infraestructura. Puedes obtener la puntuación para toda tu organización o para equipos, cuentas y entornos específicos, incluidos los despliegues de Kubernetes.

Para obtener una explicación detallada sobre el funcionamiento de la puntuación de la posición de seguridad, consulta [Puntuación de la posición de seguridad][3].

### Ver la puntuación de la posición de seguridad de los despliegues de Kubernetes 

Para ver la puntuación de la posición de seguridad de tus despliegues de Kubernetes, navega a la página [**Security** > **Compliance**][9] (Seguridad > Cumplimiento) y localiza los informes de marcos de CIS Kubernetes.

### Ver informes detallados de los marcos de Kubernetes

Para ver un informe detallado que te permita conocer tu puntuación con respecto a los requisitos y normas del marco, haz clic en **Framework Overview** (Descripción general del marco). En la página del marco, puedes descargar una copia del informe en formato PDF o exportarlo como CSV.

{{< img src="security/csm/kubernetes_posture_score.png" alt="La página del informe de cumplimiento de CIS Kubernetes que muestra una puntuación de posición general del 64 porciento" width="100%">}}

## Crea tus propias reglas de detección en Kubernetes 

Además de las reglas de detección predefinidas, también puedes crear tus propias reglas de detección en Kubernetes clonando una regla existente o creando una nueva desde cero. Las reglas se escriben en el [lenguaje de política Rego][4], un lenguaje flexible similar a Python que sirve como estándar de la industria para reglas de detección. Para más información, consulta [Escribir reglas personalizadas con Rego][5].

Después de crear la regla de detección, puedes personalizar su gravedad (`Critical`, `High`, `Medium`, `Low` o `Info`) y [establecer alertas para notificaciones en tiempo real][6] para que te notifique cuando se detecte un nuevo hallazgo.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.cisecurity.org/cis-benchmarks
[2]: /es/security/cloud_security_management#track-your-organizations-health
[3]: /es/glossary/#security-posture-score
[4]: https://www.openpolicyagent.org/docs/latest/policy-language/
[5]: /es/security/cloud_security_management/guide/writing_rego_rules/
[6]: /es/security/misconfigurations/compliance_rules#set-notification-targets-for-compliance-rules
[7]: /es/security/cloud_security_management/review_remediate/jira
[8]: /es/security/cloud_security_management/review_remediate/workflows
[9]: https://app.datadoghq.com/security/compliance/home
[10]: /es/api/latest/security-monitoring/#list-findings
[11]: https://app.datadoghq.com/security/compliance
[12]: /es/security/cloud_security_management/setup/csm_pro/agent/kubernetes
[13]: /es/security/cloud_security_management/setup/csm_pro/cloud_accounts
[14]: /es/security/cloud_security_management/setup/csm_enterprise/agent/kubernetes
[15]: /es/security/cloud_security_management/setup/csm_enterprise/cloud_accounts