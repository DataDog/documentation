---
app_id: filemage
categories:
- nube
custom_kind: integración
description: Monitoring Agent para servicios de FileMage
integration_version: 1.0.0
media:
- caption: Logotipo de carrusel
  image_url: images/carousel-logo.jpg
  media_type: imagen
supported_os:
- linux
- Windows
- macOS
title: FileMage
---
## Información general

Este check monitoriza [FileMage](https://www.filemage.io/).

## Configuración

### Instalación del paquete

Para las versiones v7.21 o v6.21 o posterior del Agent, sigue las instrucciones a continuación para instalar la integración de Filemage en tu host.
Consulta [Uso de integraciones de la comunidad](https://docs.datadoghq.com/agent/guide/use-community-integrations/) para realizar la instalación con el Docker Agent o versiones anteriores del Datadog Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

```shell
datadog-agent integration install -t datadog-filemage==1.0.0
```

2. Configura tu integración de forma similar a las [integraciones](https://docs.datadoghq.com/getting_started/integrations/) basadas en el Agent.

### Configuración

1. Edita el archivo `filemage.d/conf.yaml.example`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para empezar a recopilar tus [métricas](#metrics) de FileMage.
   Una vez finalizado, guarda el archivo modificado como `filemage.d/conf.yaml`.\
   Consulta el [ejemplo filemage conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/filemage/datadog_checks/filemage/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

Ejecuta el [subcomando de `status` del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `filemage` en la sección Running Checks (Checks en ejecución).

```text
...

  Running Checks
  ==============

    ...

    filemage (1.0.0)
    ----------------
      Instance ID: filemage:ac55127bf7bd70b9 [OK]
      Configuration Source: file:/etc/datadog-agent/conf.d/filemage.d/conf.yaml
      Total Runs: 1,298
      Metric Samples: Last Run: 0, Total: 0
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 2, Total: 2,594
      Average Execution Time : 41ms
      Last Execution Date : 2022-11-23 15:59:22 EST / 2022-11-23 20:59:22 UTC (1669237162000)
      Last Successful Execution Date : 2022-11-23 15:59:22 EST / 2022-11-23 20:59:22 UTC (1669237162000)
```

## Datos recopilados

Esta integración rastrea el número de veces que se ejecuta cada comando de FTP.

### Métricas

| | |
| --- | --- |
| **filemage.ftp.account** <br>(count) | Número de veces que se ha recibido el comando FTP de la cuenta|
| **filemage.ftp.append** <br>(count) | Número de veces que se ha recibido el comando FTP append|
| **filemage.ftp.ascii** <br>(count) | Número de veces que se ha recibido el comando FTP ascii|
| **filemage.ftp.bell** <br>(count) | Número de veces que se ha recibido el comando FTP bell|
| **filemage.ftp.binary** <br>(count) | Número de veces que se ha recibido el comando FTP binary|
| **filemage.ftp.bye** <br>(count) | Número de veces que se ha recibido el comando FTP bye|
| **filemage.ftp.case** <br>(count) | Número de veces que se ha recibido el comando FTP case|
| **filemage.ftp.cd** <br>(count) | Número de veces que se ha recibido el comando FTP cd|
| **filemage.ftp.cdup** <br>(count) | Número de veces que se ha recibido el comando FTP cdup|
| **filemage.ftp.chmod** <br>(count) | Número de veces que se ha recibido el comando FTP chmod|
| **filemage.ftp.close** <br>(count) | Número de veces que se ha recibido el comando FTP close|
| **filemage.ftp.cr** <br>(count) | Número de veces que se ha recibido el comando FTP cr|
| **filemage.ftp.qc** <br>(count) | Número de veces que se ha recibido el comando FTP qc|
| **filemage.ftp.delete** <br>(count) | Número de veces que se ha recibido el comando FTP delete|
| **filemage.ftp.debug** <br>(count) | Número de veces que se ha recibido el comando FTP debug|
| **filemage.ftp.disconnect** <br>(count) | Número de veces que se ha recibido el comando FTP disconnect|
| **filemage.ftp.form** <br>(count) | Número de veces que se ha recibido el comando FTP form|
| **filemage.ftp.get** <br>(count) | Número de veces que se ha recibido el comando FTP get|
| **filemage.ftp.glob** <br>(count) | Número de veces que se ha recibido el comando FTP glob|
| **filemage.ftp.hash** <br>(count) | Número de veces que se ha recibido el comando FTP hash|
| **filemage.ftp.help** <br>(count) | Número de veces que se ha recibido el comando FTP help|
| **filemage.ftp.idle** <br>(count) | Número de veces que se ha recibido el comando FTP idle|
| **filemage.ftp.ipany** <br>(count) | Número de veces que se ha recibido el comando FTP ipany|
| **filemage.ftp.ipv4** <br>(count) | Número de veces que se ha recibido el comando FTP ipv4|
| **filemage.ftp.ipv6** <br>(count) | Número de veces que se ha recibido el comando FTP ipv6|
| **filemage.ftp.lcd** <br>(count) | Número de veces que se ha recibido el comando FTP lcd|
| **filemage.ftp.macdef** <br>(count) | Número de veces que se ha recibido el comando FTP macdef|
| **filemage.ftp.mdelete** <br>(count) | Número de veces que se ha recibido el comando FTP mdelete|
| **filemage.ftp.mdir** <br>(count) | Número de veces que se ha recibido el comando FTP mdir|
| **filemage.ftp.mget** <br>(count) | Número de veces que se ha recibido el comando FTP mget|
| **filemage.ftp.mkdir** <br>(count) | Número de veces que se ha recibido el comando FTP mkdir|
| **filemage.ftp.mls** <br>(count) | Número de veces que se ha recibido el comando FTP mls|
| **filemage.ftp.mode** <br>(count) | Número de veces que se ha recibido el comando FTP mode|
| **filemage.ftp.modtime** <br>(count) | Número de veces que se ha recibido el comando FTP modtime|
| **filemage.ftp.mput** <br>(count) | Número de veces que se ha recibido el comando FTP mput|
| **filemage.ftp.newer** <br>(count) | Número de veces que se ha recibido el comando FTP newer|
| **filemage.ftp.nmap** <br>(count) | Número de veces que se ha recibido el comando FTP nmap|
| **filemage.ftp.ntrans** <br>(count) | Número de veces que se ha recibido el comando FTP ntrans|
| **filemage.ftp.open** <br>(count) | Número de veces que se ha recibido el comando FTP open|
| **filemage.ftp.prompt** <br>(count) | Número de veces que se ha recibido el comando FTP prompt|
| **filemage.ftp.proxy** <br>(count) | Número de veces que se ha recibido el comando FTP proxy|
| **filemage.ftp.put** <br>(count) | Número de veces que se ha recibido el comando FTP put|
| **filemage.ftp.pwd** <br>(count) | Número de veces que se ha recibido el comando FTP pwd|
| **filemage.ftp.quit** <br>(count) | Número de veces que se ha recibido el comando FTP quit|
| **filemage.ftp.quote** <br>(count) | Número de veces que se ha recibido el comando FTP quote|
| **filemage.ftp.recv** <br>(count) | Número de veces que se ha recibido el comando FTP recv|
| **filemage.ftp.reget** <br>(count) | Número de veces que se ha recibido el comando FTP reget|
| **filemage.ftp.remotehelp** <br>(count) | Número de veces que se ha recibido el comando FTP remotehelp|
| **filemage.ftp.remotestatus** <br>(count) | Número de veces que se ha recibido el comando FTP remotestatus|
| **filemage.ftp.reset** <br>(count) | Número de veces que se ha recibido el comando FTP reset|
| **filemage.ftp.restart** <br>(count) | Número de veces que se ha recibido el comando FTP restart|
| **filemage.ftp.rmdir** <br>(count) | Número de veces que se ha recibido el comando FTP rmdir|
| **filemage.ftp.runique** <br>(count) | Número de veces que se ha recibido el comando FTP runique|
| **filemage.ftp.send** <br>(count) | Número de veces que se ha recibido el comando FTP send|
| **filemage.ftp.sendport** <br>(count) | Número de veces que se ha recibido el comando FTP sendport|
| **filemage.ftp.site** <br>(count) | Número de veces que se ha recibido el comando FTP site|
| **filemage.ftp.size** <br>(count) | Número de veces que se ha recibido el comando FTP size|
| **filemage.ftp.status** <br>(count) | Número de veces que se ha recibido el comando FTP status|
| **filemage.ftp.struct** <br>(count) | Número de veces que se ha recibido el comando FTP struct|
| **filemage.ftp.sunique** <br>(count) | Número de veces que se ha recibido el comando FTP sunique|
| **filemage.ftp.system** <br>(count) | Número de veces que se ha recibido el comando FTP system|
| **filemage.ftp.tenex** <br>(count) | Número de veces que se ha recibido el comando FTP tenex|
| **filemage.ftp.trace** <br>(count) | Número de veces que se ha recibido el comando FTP trace|
| **filemage.ftp.type** <br>(count) | Número de veces que se ha recibido el comando FTP type|
| **filemage.ftp.umask** <br>(count) | Número de veces que se ha recibido el comando FTP umask|
| **filemage.ftp.verbose** <br>(count) | Número de veces que se ha recibido el comando FTP verbose|

### Checks de servicio

**filemage.services_up**

Devuelve `CRITICAL` si los servicios están inactivos o `OK` si los servicios se están ejecutando.

_Estados: ok, critical_

**filemage.metrics_up**

Devuelve `WARNING` si el check no pudo recuperar las métricas o `OK` si las métricas se enviaron correctamente.

_Estados: ok, warning_

### Eventos

La integración de FileMage no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [dOpenSource](https://dopensource.com/).