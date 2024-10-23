---
algolia:
  tags:
  - agent
aliases:
- /es/agent/faq/agent-check-directory-structure
- /es/agent/faq/install-core-extra
- /es/logs/faq/can-the-datadog-agent-be-used-to-send-only-logs
- /es/agent/faq/the-datadog-agent-for-logs-or-traces-only
cascade:
  algolia:
    rank: 70
description: Instalar y configurar el Agent para recopilar datos
further_reading:
- link: /logs/
  tag: Documentación
  text: Recopilar tus logs
- link: /infrastructure/process/
  tag: Documentación
  text: Recopilar tus procesos
- link: /tracing/
  tag: Documentación
  text: Recopilar tus trazas
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: Documentación
  text: ¿Por qué debería instalar el Agent en instancias de nube?
- link: https://www.datadoghq.com/blog/dont-fear-the-agent/
  tag: Blog
  text: No temas al Agent
title: Agent
---

<div class="alert alert-info">
La versión 7 del Agent ya está disponible. <a href="/agent/versions/upgrade_to_agent_v7">Actualiza a la última versión</a> para acceder a las nuevas funciones.
</div>

## Información general

El Datadog Agent es un software que se ejecuta en tus hosts. Se encarga de recopilar eventos y métricas de los hosts y los envía a Datadog, donde puedes analizar tus datos de monitorización y rendimiento. El Datadog Agent es de código abierto, y su código fuente está disponible en GitHub: [DataDog/datadog-agent][1].

**Se recomienda instalar el Agent de forma completa.** No obstante, hay disponible un paquete DogStatsD independiente para Amazon Linux, CentOS, Debian, Fedora, Red Hat, SUSE y Ubuntu. Este paquete se usa en entornos contenedorizados donde DogStatsD se ejecuta a modo de sidecar o en entornos con un servidor DogStatsD sin la funcionalidad completa del Agent.

El paquete DogStatsD independiente se instala con el [comando de instalación de una línea][2] del Agent, **excepto** las ocurrencias de `datadog-agent`, que deben sustituirse por `datadog-dogstatsd`. Hay una imagen de Docker disponible en el [repositorio de imágenes de Docker de DogStatsD6][3].

Los paquetes también están disponibles para arquitecturas Arm v8 y x86 de 64 bits. Para otras arquitecturas, utiliza la instalación de origen.

{{< partial name="platforms/platforms.html" links="platforms" >}}

<div class="alert alert-info"><p>
Datadog recomienda actualizar el Datadog Agent con cada versión secundaria y de parche. O bien, al menos, actualizarlo una vez al mes. </p>
<p>
Actualizar a una versión principal del Datadog Agent y mantenerla actualizada es la única forma compatible de obtener las últimas funcionalidades y correcciones del Agent. Sin embargo, el Agent cuenta con actualizaciones frecuentes y puede ser todo un reto gestionarlas a escala empresarial. Esto no significa que debas esperar a las versiones principales para actualizarlo. La frecuencia de actualización adecuada para tu organización depende de la infraestructura y la forma de gestionar la configuración, pero lo aconsejable es que sea mensual.</p>
<p>
Para llevar a cabo la actualización básica del Datadog Agent entre dos versiones secundarias de un host determinado, ejecuta <a href="https://app.datadoghq.com/account/settings/agent/latest">el comando de instalación correspondiente para tu plataforma</a>.</p>
<p>
La numeración de las versiones del Datadog Agent sigue las reglas de <a href="https://semver.org/">SemVer</a>.</p>
</div>

{{< whatsnext desc="Esta sección incluye los siguientes temas:">}}
  {{< nextlink href="/agent/basic_agent_usage">}}<u>Uso básico del Agent</u>: obtén más información sobre el Datadog Agent, incluido los detalles de la arquitectura, CLI, sobrecarga y herramientas de gestión de la configuración.{{< /nextlink >}}
  {{< nextlink href="/agent/docker">}}<u>Docker</u>: instala y configura el Datadog Agent en Docker. {{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes">}}<u>Kubernetes</u>: instala y configura el Datadog Agent en Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/cluster_agent">}}<u>Cluster Agent</u>: instala y configura el Cluster Agent para Kubernetes, una versión del Datadog Agent creada para recopilar de manera eficaz datos de monitorización de un clúster orquestado.{{< /nextlink >}}
  {{< nextlink href="/agent/amazon_ecs">}}<u>Amazon ECS</u>: instala y configura el Datadog Agent en Amazon ECS.{{< /nextlink >}}
  {{< nextlink href="integrations/ecs_fargate/">}}<u>AWS Fargate</u>: instala y configura el Datadog Agent con Amazon ECS en AWS Fargate.{{< /nextlink >}}
  {{< nextlink href="/agent/iot">}}<u>IoT</u>: instala y configura el Datadog IoT Agent, una versión del Datadog Agent optimizada para monitorizar dispositivos IoT y aplicaciones integradas.{{< /nextlink >}}
  {{< nextlink href="/agent/logs">}}<u>Recopilación de logs</u>: habilita y configura la recopilación de logs en el Datadog Agent.{{< /nextlink >}}
  {{< nextlink href="/agent/configuration/proxy">}}<u>Proxy</u>: si la configuración de tu red restringe el tráfico saliente, utiliza un proxy para el tráfico del Agent.{{< /nextlink >}}
  {{< nextlink href="/agent/versions/">}}<u>Versiones</u>: el Agent 7 es la última versión principal del Datadog Agent. Conoce los cambios entre las versiones principales del Agent y cómo actualizar.{{< /nextlink >}}
  {{< nextlink href="/agent/troubleshooting">}}<u>Solución de problemas</u>: encuentra información para solucionar problemas relacionados con el Datadog Agent.{{< /nextlink >}}
  {{< nextlink href="/agent/guide">}}<u>Guías</u>: tutoriales paso a paso detallados para utilizar el Agent.{{< /nextlink >}}
  {{< nextlink href="/agent/security">}}<u>Seguridad</u>: información sobre las principales capacidades y características de seguridad disponibles para los clientes que garantizan que su entorno sea seguro.{{< /nextlink >}}
  {{< nextlink href="/getting_started/observability_pipelines">}}<u>Configuración de pipelines de observabilidad y Datadog</u>: despliega el worker de pipelines de observabilidad como un agregador para recopilar, transformar y redirigir todos tus logs y métricas a cualquier destino.{{< /nextlink >}}
{{< /whatsnext >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=aws
[3]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/dogstatsd/alpine