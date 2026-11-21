---
algolia:
  tags:
  - airgap
  - airgapped
  - air gap
  - air gapped
  - air-gap
  - air-gapped
aliases:
- /es/agent/faq/how-do-i-install-the-agent-on-a-server-with-limited-internet-connectivity/
description: Instale el Datadog Agent en servidores con acceso restringido a internet
  utilizando métodos alternativos, incluyendo la configuración de proxy y paquetes
  sin conexión.
further_reading:
- link: /agent/
  tag: Documentación
  text: Obtenga más información sobre el Datadog Agent
- link: /agent/configuration/proxy/
  tag: Documentación
  text: Obtenga más información sobre el Proxy
title: Instalación del Agent en un servidor con conectividad a internet limitada
---
El comando de instalación de una sola línea proporcionado en las [instrucciones de instalación del Agent][1] requiere acceso HTTPS de salida a algunos endpoints diferentes para funcionar correctamente y podría no funcionar con servidores que tienen acceso limitado a internet. Específicamente, estos son:

* Para la instalación en sistemas Debian/Ubuntu:
  * https://keys.datadoghq.com - Almacenamiento de claves públicas de firma de Datadog.
  * https://apt.datadoghq.com - Repositorio de paquetes APT de Datadog.
* Para la instalación en sistemas basados en RedHat y SUSE:
  * https://keys.datadoghq.com - Almacenamiento de claves públicas de firma de Datadog.
  * https://yum.datadoghq.com - Repositorio de paquetes RPM de Datadog.
* Para la instalación en sistemas AIX:
  * https://dd-agent-aix.s3.amazonaws.com - Repositorio de paquetes AIX de Datadog.

Para servidores sin acceso directo a internet, el Agent puede configurarse para enrutar su tráfico a través de un proxy; consulte [Configuración del proxy del Agent][2]. Para servidores con conectividad a internet de salida limitada, el Agent puede instalarse utilizando el paquete correspondiente para el sistema operativo del servidor. Las [instrucciones de instalación del Agent][1] contienen instrucciones paso a paso debajo de los comandos de instalación de una sola línea.

Si el sistema de destino tiene bloqueado el acceso directo al repositorio de paquetes, descargue el paquete del repositorio utilizando otro servidor y luego transfiéralo al sistema de destino para una instalación local.

Los paquetes RPM para el Agent 6 están disponibles en [https://yum.datadoghq.com/stable/6/][3], para el Agent 7 en [https://yum.datadoghq.com/stable/7/][4], y los paquetes DEB están disponibles en [https://apt.datadoghq.com/pool/d/da/][5].

**Nota**: El paquete incluye todos los recursos necesarios para ejecutar el Agent y las comprobaciones (independientemente de si la integración está habilitada o no). En cuanto a los requisitos estrictos, se requieren Python 2.7+ y sysstat; otras dependencias son obligatorias dependiendo de qué comprobaciones estén habilitadas.

Para sistemas AIX, el Agent 7 se distribuye como paquetes BFF, disponibles en [https://dd-agent-aix.s3.amazonaws.com/stable/][8] (por ejemplo, `datadog-agent-7-latest.aix.ppc64.bff`). El paquete BFF incluye el entorno de ejecución de Python integrado, OpenSSL y otras dependencias, por lo que no se requiere Python del sistema ni bibliotecas adicionales en el servidor de destino.

Una vez que el paquete se haya transferido al sistema de destino, se puede instalar localmente utilizando el comando del administrador de paquetes apropiado. Para yum, el comando seguiría el patrón:

```bash
sudo yum localinstall datadog-agent-<AGENT_VERSION>-1.<CPU_ARCHITECTURE>.rpm
```

Para instalar un archivo deb en el directorio actual para distribuciones basadas en Debian:

```bash
sudo apt install ./datadog-agent_<AGENT_VERSION>-1_amd64.deb
```

Para instalar un archivo BFF en el directorio actual para AIX:

```bash
sudo installp -acXYd datadog-agent-7-latest.aix.ppc64.bff datadog-agent
```

Una vez instalado, agregue un archivo `datadog.yaml` copiando `datadog.yaml.example`. Luego, actualice `datadog.yaml` con la [clave de API][6] de su organización. Esto se puede hacer con un solo comando:

```bash
sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_DATADOG_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
```

Luego, [inicie el Agent][7] usando el comando apropiado para su sistema.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /es/agent/configuration/proxy
[3]: https://yum.datadoghq.com/stable/6
[4]: https://yum.datadoghq.com/stable/7
[5]: https://apt.datadoghq.com/pool/d/da
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: /es/agent/configuration/agent-commands/#start-the-agent
[8]: https://dd-agent-aix.s3.amazonaws.com/stable/