---
description: Compare las Deployment Gates Just-In-Time (JIT) y las preconfiguradas,
  y siga la guía de configuración para el modo que elija.
further_reading:
- link: /deployment_gates/setup/jit
  tag: Documentación
  text: Configure Just-In-Time (JIT) Deployment Gates
- link: /deployment_gates/setup/preconfigured
  tag: Documentación
  text: Configure Deployment Gates preconfigurados.
- link: /deployment_gates/explore
  tag: Documentación
  text: Obtenga información sobre el Deployment Gates explorer.
- link: /api/latest/deployment-gates
  tag: Referencia de la API
  text: Referencia de la API de Deployment Gates.
title: Configure Deployment Gates
---
Las Deployment Gates tienen dos componentes principales:

- Una **Gate** se define para un servicio y entorno (y opcionalmente un identificador), y evalúa una o más reglas para decidir si un despliegue debe proceder.
- Una **regla** es un tipo de evaluación realizada como parte de una Deployment Gate, como verificar el estado de un conjunto de monitores o ejecutar un análisis de APM Faulty Deployment Detection en la versión desplegada.

Las evaluaciones de Gates son asíncronas: la API responde inmediatamente con un ID de evaluación, y el resultado se resuelve en `pass` o `fail` con el tiempo a medida que se ejecutan las reglas.

## Modos de evaluación de Deployment Gate {#deployment-gate-evaluation-modes}
Las Deployment Gates admiten dos modos de evaluación: Just-In-Time (JIT) y preconfigurado.


| | **[JIT][1]** (predeterminado) | **[Preconfigurado][2]** |
|---|---|---|
| **Dónde residen las reglas** | En línea en su configuración de despliegue o paso de CI | Persistidas en Datadog (UI, API o Terraform) |
| **Configuración en Datadog** | Ninguna | Cree una Deployment y reglas con antelación |
| **Ideal para** | Reglas como código, flexibilidad por despliegue, equipos que poseen su propia configuración de Deployment | Reglas compartidas entre servicios, gestión centralizada, edición fuera de CI |
| **Cómo evaluar** | Envíe las reglas en la solicitud de evaluación | Haga referencia a la Gate por servicio, entorno y, opcionalmente, identificador |

Puede usar diferentes modos en diferentes Deployment si es necesario.

Si no está seguro de por dónde empezar, use JIT. No requiere configuración en Datadog y le permite iterar sobre las reglas directamente en su configuración de despliegue.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/deployment_gates/setup/jit
[2]: /es/deployment_gates/setup/preconfigured