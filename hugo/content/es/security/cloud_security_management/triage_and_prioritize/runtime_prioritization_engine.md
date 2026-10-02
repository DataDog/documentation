---
further_reading:
- link: /security/cloud_security_management/triage_and_prioritize/severity_scoring/
  tag: Documentación
  text: Comprenda la puntuación de gravedad de Cloud Security
- link: /security/cloud_security_management/vulnerabilities/
  tag: Documentación
  text: Detecte y remedie vulnerabilidades con Cloud Security
- link: /security/security_inbox/
  tag: Documentación
  text: Revise los hallazgos priorizados en la Security Inbox
- link: https://www.datadoghq.com/blog/runtime-prioritization-engine/
  tag: Blog
  text: Priorice los hallazgos de seguridad con Datadog Runtime Prioritization Engine
- link: https://www.datadoghq.com/blog/datadog-security/
  tag: Blog
  text: 'Asegure la era de la IA: supere los ataques impulsados por IA con Security
    y observability unificados.'
- link: https://www.datadoghq.com/blog/cisa-bod-26-04-vulnerability-prioritization/
  tag: Blog
  text: Cómo cambia la directiva BOD 26-04 de CISA la priorización de vulnerabilidades
title: Motor de priorización en tiempo de ejecución
---
Los escáneres de Security muestran miles de hallazgos por entorno. La mayoría de los equipos clasifican de forma predeterminada según la gravedad CVSS, pero las puntuaciones estáticas marcan como críticos muchos hallazgos que nunca se explotan en la práctica. El riesgo real depende del contexto en vivo: ¿se está ejecutando el código vulnerable, hay un exploit disponible y el recurso afectado toca datos confidenciales o un flujo de trabajo crítico para el negocio?

El motor de priorización en tiempo de ejecución de Datadog combina el comportamiento en tiempo de ejecución, la explotabilidad, la exposición y el contexto empresarial de los datos de observabilidad y Security para identificar el 5% de los hallazgos que representan un riesgo real y explotable, para que pueda concentrarse solo en lo que importa.

## Cómo funciona {#how-it-works}

El motor de priorización en tiempo de ejecución está diseñado para ser explicable. Para cada hallazgo, Datadog evalúa cinco dimensiones de riesgo utilizando el contexto de producción y muestra por qué se priorizó el hallazgo.

| Dimensión | Pregunta que responde | Ejemplos de señales |
|---|---|---|
| **Accesibilidad** | ¿El componente vulnerable se está ejecutando realmente? | Imagen afectada observada ejecutándose en una carga de trabajo de producción. Paquete vulnerable observado ejecutándose en tiempo de ejecución. |
| **Exposición** | ¿Pueden los atacantes acceder a él? | Recurso accesible públicamente según el análisis de red estático. Evidencia en tiempo de ejecución de exposición a ataques activos. |
| **Explotabilidad** | ¿Es probable que los atacantes lo exploten? | Existe código de explotación público. Se encuentra explotado activamente en la naturaleza (listado en [CISA KEV][1]). Alta probabilidad de explotación ([EPSS][2]). |
| **Criticidad del negocio** | ¿Tendría un compromiso un alto impacto? | El recurso respalda una función comercial crítica ([Crown Jewel](#crown-jewels)). Se ejecuta con privilegios elevados y procesa datos confidenciales. |
| **Capacidad de acción** | ¿Puede el equipo adecuado solucionarlo? | Propietario del servicio identificado. Corrección o mitigación disponible. |

El motor de priorización en tiempo de ejecución prioriza un hallazgo cuando estas señales indican un riesgo real y explotable en su entorno. Los hallazgos que no cumplen con los criterios de priorización permanecen visibles, pero se mueven fuera de la cola de triaje activa.

## Crown Jewels {#crown-jewels}

[Crown Jewels][8] son los recursos que respaldan sus funciones comerciales más críticas (servicios, servidores, bases de datos, contenedores, etc.). Datadog los infiere automáticamente a partir de datos de observabilidad, como la traza y el flujo de APM, dependencias de servicio (fan-in), SLOs, tráfico, incidentes y más.

Crown Jewels se actualizan continuamente a medida que su entorno cambia. También puede agregar sus propios Crown Jewels manualmente en Datadog Cloud Security.

## Propiedad {#ownership}

[Propiedad][7] identifica al equipo o propietario del servicio responsable de corregir un hallazgo de seguridad. Datadog infiere la propiedad a partir de metadatos de observabilidad como etiquetas de servicio, etiquetas de equipo, metadatos de despliegue, configuración de guardia, enlaces de control de fuente, entradas de catálogo de servicios y más.

Cuando se conoce la propiedad, el motor puede dirigir los hallazgos al equipo correcto en lugar de dejar que los equipos de seguridad busquen manualmente a los propietarios de la remediación.

## Filtrar hallazgos por señales de tiempo de ejecución {#filter-findings-by-runtime-signals}

Datadog añade las señales de tiempo de ejecución que observa a los hallazgos de vulnerabilidades. Utilice estas señales en el [Vulnerability Explorer][11], combinadas con cualquier otro criterio.

### El paquete se está ejecutando {#package-is-running}

Cuando [Runtime Package Prioritization][4] está habilitado, Datadog añade contexto de tiempo de ejecución a nivel de paquete a los hallazgos de vulnerabilidades de imágenes de contenedor para paquetes instalados por un administrador de paquetes del sistema operativo (`apt`, `yum` o `apk`). Busque, filtre y agrupe por estas etiquetas:

| Contexto de tiempo de ejecución | Etiqueta |
|---|---|
| El paquete se está ejecutando | `@risk.is_package_running:true` |
| Accedido por proceso raíz | `@package.is_running_as_root:true` |
| Binario SUID presente | `@package.has_suid:true` |

Datadog añade una etiqueta cuando observa contexto de tiempo de ejecución. Una etiqueta ausente significa que Datadog no observó el contexto; no significa que el paquete no se esté utilizando. Utilice las etiquetas para priorizar qué corregir primero, no para descartar hallazgos.

Por ejemplo, vulnerabilidades altas y críticas que se están ejecutando y tienen una corrección disponible:

```
@risk.is_package_running:true @severity:(high OR critical) @remediation.is_available:true
```

El contexto de tiempo de ejecución persiste durante la vida útil de una versión de imagen: después de que se observa que un paquete se está ejecutando, los hallazgos para esa imagen lo mantienen. Debido a que las imágenes de contenedor son inmutables, esto refleja lo que se ha ejecutado en esa imagen. Cuando la imagen ya no está desplegada, sus hallazgos caducan y se cierran.

### La imagen se está ejecutando {#image-is-running}

Datadog añade el contexto de ejecución de la imagen de contenedor a cada hallazgo de vulnerabilidad de imagen de contenedor, sin configuración adicional del Agent. Busque, filtre y agrupe por esta etiqueta:

| Contexto de tiempo de ejecución | Etiqueta |
|---|---|
| Imagen detectada en ejecución en las últimas 12 horas | `@risk.is_image_running:true` |

La etiqueta siempre es `true` o `false` en los hallazgos de imágenes de contenedor, y está ausente en los hallazgos de servidor, imagen de servidor y sin servidor. Para priorizar las imágenes en ejecución en todos los tipos de activos, excluya los hallazgos de imágenes de contenedor que no se detectaron en ejecución:

```
-@risk.is_image_running:false
```

Para un intervalo distinto a 12 horas, consulte `@risk_details.is_image_running.evidence.detected_at`, la hora de la última detección.

#### Cómo se determina el contexto de ejecución {#how-the-running-context-is-determined}

Datadog detecta imágenes en ejecución con el Datadog Agent o Agentless Scanning, pero ambos difieren en el origen del contexto y en la frecuencia con la que se actualiza:

| | Agent | Agentless |
|---|---|---|
| **Requiere** |  que [el escaneo de vulnerabilidades de Cloud Security][14] y [el monitoreo de contenedores][12] estén habilitados en el Agent. | [Agentless Scanning][13] en la cuenta de la nube. |
| **Fuente del contexto** | Datos de [monitoreo de contenedores][12]: los contenedores que Datadog observa ejecutándose en los servidores que el Agent monitorea. | Agentless Scanning, que registra las imágenes que se ejecutan en un recurso en el momento en que se realiza el escaneo. |
| **Frecuencia de actualización** | Cada hora, cuando Datadog vuelve a evaluar los hallazgos de la imagen. | Una vez por cada escaneo Agentless del recurso, cada 12 horas. |
| **Detalle a nivel de contenedor** | El panel lateral de un hallazgo en el [Explorador de vulnerabilidades][11] enumera los contenedores que ejecutaron la imagen recientemente. | No disponible. |

## Comience {#get-started}

1. Habilite la Priorización de paquetes en tiempo de ejecución en el Agent para mostrar la señal *El paquete se está ejecutando* en los hallazgos de vulnerabilidades. Consulte las instrucciones para hacerlo en implementaciones de [Kubernetes][4], [Docker][9] o [Linux][10]. Consulte [Configuración de Cloud Security][3].
2. Abra el [{{< ui >}}Cloud Security Summary{{< /ui >}}][5] en Datadog. Los hallazgos priorizados se muestran en la parte superior de cada embudo y en el [{{< ui >}}Security Inbox{{< /ui >}}][6].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[2]: https://www.first.org/epss/
[3]: /es/security/cloud_security_management/setup/
[4]: /es/security/cloud_security_management/setup/agent/kubernetes/#runtime-package-prioritization
[5]: https://app.datadoghq.com/security/csm
[6]: /es/security/security_inbox/
[7]: /es/security/cloud_security_management/review_remediate/ownership_agent/
[8]: /es/security/cloud_security_management/crown_jewels/
[9]: /es/security/cloud_security_management/setup/agent/docker/#runtime-package-prioritization
[10]: /es/security/cloud_security_management/setup/agent/linux/#runtime-package-prioritization
[11]: https://app.datadoghq.com/security/csm/vm
[12]: /es/containers/
[13]: /es/security/cloud_security_management/setup/agentless_scanning/
[14]: /es/security/cloud_security_management/vulnerabilities/