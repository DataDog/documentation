---
aliases:
- /es/agent/faq/how-do-i-install-the-agent-on-a-server-with-limited-internet-connectivity/
further_reading:
- link: /agent/
  tag: Documentación
  text: Más información sobre el Datadog Agent
- link: /agent/proxy/
  tag: Documentación
  text: Más información sobre el proxy
kind: guía
title: Instalar el Agent en un servidor con conectividad limitada a Internet
---

El comando de instalación de una línea proporcionado en las [instrucciones de instalación del Agent][1] requiere acceso HTTPS saliente a distintos endpoints para funcionar correctamente y es posible que no funcione con servidores que tengan acceso limitado a Internet. Concretamente, nos referimos a estos:

* Para la instalación en sistemas Debian/Ubuntu:
  * https://keys.datadoghq.com - Almacenamiento de claves de firma pública de Datadog.
  * https://apt.datadoghq.com - Repositorio de paquetes APT de Datadog.
* Para la instalación en sistemas basados en RedHat y SUSE:
  * https://keys.datadoghq.com - Almacenamiento de claves de firma pública de Datadog.
  * https://yum.datadoghq.com - Repositorio de paquetes RPM de Datadog.

Para servidores sin acceso directo a Internet, el Agent se puede configurar para enrutarse a través de un proxy; consulta [Configuración del proxy del Agent][2]. En el caso de servidores con conectividad a Internet de salida limitada, el Agent se puede instalar mediante el paquete correspondiente según el sistema operativo del servidor. Las [instrucciones de instalación del Agent][1] explican cómo usar los comandos de instalación de una línea paso a paso.

Si el sistema de destino no puede acceder directamente al repositorio de paquetes, descarga el paquete del repositorio a través de otro servidor y, luego, transfiérelo al sistema de destino para instalarlo en local.

Los paquetes RPM para el Agent 6 están disponibles en [https://yum.datadoghq.com/stable/6/][3] y para el Agent 7, en [https://yum.datadoghq.com/stable/7/][4]. Los paquetes DEB están disponibles en [https://apt.datadoghq.com/pool/d/da/][5].

**Nota**: El paquete agrupa todos los recursos necesarios para ejecutar el Agent y llevar a cabo los checks (con independencia de si la integración está habilitada o no). En cuanto a los requisitos, es necesario Python 2.7 (o versiones posteriores) y sysstat; otras dependencias son obligatorias según los checks que estén habilitados.

Una vez que el paquete se haya transferido al sistema de destino, se puede instalar localmente mediante el comando del administrador de paquetes adecuado. Para yum, el comando seguirá el siguiente patrón:

```bash
sudo yum localinstall datadog-agent-<AGENT_VERSION>-1.<CPU_ARCHITECTURE>.rpm
```

Para instalar un archivo deb en el directorio actual para distribuciones basadas en Debian:

```bash
sudo apt install ./datadog-agent_<AGENT_VERSION>-1_amd64.deb
```

Una vez instalado, copia `datadog.yaml.example` para añadir un archivo `datadog.yaml`. A continuación, actualiza `datadog.yaml` con la [clave de API][6] para tu organización. Esto se puede hacer mediante un solo comando:

```bash
sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_DATADOG_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
```

Por último, [inicia el Agent][7] con el comando indicado según tu sistema.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /es/agent/proxy
[3]: https://yum.datadoghq.com/stable/6
[4]: https://yum.datadoghq.com/stable/7
[5]: https://apt.datadoghq.com/pool/d/da
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /es/agent/guide/agent-commands/#start-the-agent