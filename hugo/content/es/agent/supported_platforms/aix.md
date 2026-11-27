---
algolia:
  tags:
  - uninstall
  - uninstalling
aliases:
- /es/agent/basic_agent_usage/aix/
description: Instale y administre el Datadog Agent en sistemas IBM AIX.
further_reading:
- link: /logs/
  tag: Documentación
  text: Recopile sus registros
- link: /infrastructure/process/
  tag: Documentación
  text: Recopile sus procesos
- link: /tracing/
  tag: Documentación
  text: Recopile sus trazas
- link: /extend/dogstatsd/
  tag: Documentación
  text: Envíe métricas personalizadas con DogStatsD
- link: /extend/custom_checks/
  tag: Documentación
  text: Escriba una verificación del Agent personalizada
- link: /agent/architecture/#agent-architecture
  tag: Documentación
  text: Obtenga más información sobre la arquitectura del Agent
- link: /agent/configuration/network#configure-ports
  tag: Documentación
  text: Configurar puertos de entrada
title: AIX
---
Esta página cubre el Agent 7 en AIX. Para versiones de AIX que el Agent 7 no admite, consulte el [Datadog UNIX Agent][12] heredado.

## Descripción general {#overview}
El Datadog Agent ofrece monitoreo a nivel de servidor para IBM AIX (PowerPC 8+) para que pueda visualizar métricas del sistema, habilitar productos adicionales de Datadog y solucionar problemas de servicios que se ejecutan en las instalaciones.

**Nota**: El Agent 7 en AIX no admite lo siguiente:
- Integraciones basadas en JMX
- Cloud Network Monitoring
- Configuración y actualizaciones remotas del Agent con Fleet Automation

Consulte [Plataformas compatibles][5] para obtener la lista completa de versiones de AIX compatibles.

## Instalación {#installation}

### Requisitos previos {#prerequisites}
- Privilegios de root (o sudo) en cada servidor
- HTTPS saliente (443) a `.datadoghq.com`
- `curl` o `wget`, y `ksh` (incluido en AIX de forma predeterminada)
- Verifique que su servidor esté ejecutando una [versión de AIX compatible][5]

### Instale el Agent {#install-the-agent}

Para instalar el Agent en AIX, siga las [instrucciones en la aplicación en Fleet Automation][6] y ejecute el script generado en sus servidores.

{{< img src="/agent/basic_agent_usage/aix_agent7_install.png" alt="Pasos de instalación en la aplicación para el Datadog Agent en un servidor AIX." style="width:90%;">}}

## Comandos {#commands}

| Descripción              | Comando                     |
|--------------------------|-----------------------------|
| Iniciar el Agent              | `startsrc -g datadog-agent` |
| Detener el Agent               | `stopsrc -g datadog-agent`  |
| Estado de los servicios del Agent | `lssrc -g datadog-agent`    |
| Página de estado del Agent        | `datadog-agent status`      |
| Enviar flare               | `datadog-agent flare`       |
| Mostrar todos los comandos        | `datadog-agent --help`      |

## Configure el Agent {#configure-the-agent}

El [archivo de configuración del Datadog Agent][7] se encuentra en `/etc/datadog-agent/datadog.yaml`. Este archivo YAML contiene los detalles de conexión a nivel de servidor que se utilizan para enviar datos a Datadog, incluyendo:
- `api_key`: La [clave de API de Datadog][8] de su organización
- `site`: Región de Datadog de destino (consulte [Datadog Sites][1])
- `proxy`: puntos de conexión de proxy HTTP/HTTPS para tráfico saliente (consulte [Configuración de proxy del Datadog Agent][9])
- Etiquetas predeterminadas, nivel de registro y configuraciones de Datadog

Un archivo de referencia totalmente comentado, ubicado en `/etc/datadog-agent/datadog.yaml.example`, enumera todas las opciones disponibles para comparación o para copiar y pegar.

Alternativamente, consulte el [archivo datadog-agent_aix.yaml.example][10] para ver todas las opciones de configuración disponibles.

### Archivos de integración {#integration-files}

Los archivos de configuración para las integraciones se encuentran en `/etc/datadog-agent/conf.d/`.
Cada integración tiene su propio subdirectorio, `<INTEGRATION>.d/`, que contiene:
- `conf.yaml`: La configuración activa que controla cómo la integración recopila métricas y registros
- `conf.yaml.example`: Una muestra que ilustra las claves admitidas y los valores predeterminados

Para solicitar soporte para una integración en AIX, abra una solicitud de nueva funcionalidad con [Datadog Support][13].

## Migrar desde el UNIX Agent {#migrate-from-the-unix-agent}

<div class="alert alert-warning">

El UNIX Agent incluye sus propios certificados de autoridad de certificación (CA). El Agent 7 en AIX depende del almacén de confianza del servidor para verificar los certificados TLS de los endpoints de ingesta de Datadog. Si el almacén de confianza del servidor no incluye la CA raíz que firma los certificados de Datadog, el Agent 7 no podrá enviar datos después de la migración. El Agent registra errores como `x509: certificate signed by unknown authority`.

Antes de migrar, verifique que el servidor confíe en la cadena de certificados de Datadog. Consulte [Cambios en la cadena de confianza de certificados TLS de Datadog][14] para ver los certificados que debe agregar al almacén de confianza del servidor. Si encuentra problemas, comuníquese con [Datadog Support][13].

</div>

Para migrar del Datadog UNIX Agent al Agent 7, desinstale el UNIX Agent y luego instale el Agent 7:

1. Haga una copia de seguridad de la configuración del UNIX Agent. La desinstalación del UNIX Agent elimina el directorio `/etc/datadog-agent`.
   ```shell
   cp -rp /etc/datadog-agent /etc/datadog-agent.unix-agent.bak
   ```
2. Desinstale el UNIX Agent:
   ```shell
   installp -u datadog-unix-agent
   ```
3. [Instale el Agent 7](#install-the-agent).
4. Configure el Agent 7 en `/etc/datadog-agent/datadog.yaml`. Use su copia de seguridad como referencia, pero no copie el archivo tal cual:
   - Los ajustes básicos como `api_key`, `site`, `hostname`, `tags`, `log_level` y `proxy.*` mantienen los mismos nombres.
   - La mayoría de las otras opciones han sido renombradas o eliminadas. Revise cada opción con la [configuración de ejemplo de AIX][10].
   - No copie el ajuste `dd_url: https://unix.agent.datadoghq.com`.
5. Revise sus configuraciones de integración en `/etc/datadog-agent/conf.d/`. Algunas opciones son diferentes en el Agent 7.
6. Ejecute `datadog-agent status` para confirmar que el Agent se está ejecutando y enviando datos.

Si tiene preguntas sobre la migración de su configuración, contacte a [Datadog Support][13].

## Monitorear el tiempo de actividad del Agent {#monitor-agent-uptime}

Puede usar la métrica `datadog.agent.running` para monitorear el tiempo de actividad de un Agent. La métrica emite un valor de `1` si el Agent está reportando a Datadog.

## Desinstale el Agent {#uninstall-the-agent}

Para eliminar un Agent instalado, ejecute el siguiente comando `installp`:

{{< code-block lang="shell" >}}
installp -u datadog-agent
{{< /code-block >}}

La desinstalación del Agent elimina los servicios del Agent y la entrada de arranque.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/site/#access-the-datadog-site
[5]: /es/agent/supported_platforms/?tab=aix
[6]: https://app.datadoghq.com/fleet/install-agent/latest?platform=aix
[7]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: /es/agent/configuration/proxy/
[10]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_aix.yaml.example
[12]: /es/agent/guide/install-unix-agent-aix/
[13]: /es/help/
[14]: /es/data_security/guide/tls_cert_chain_of_trust/?tab=g1rootcertificateold