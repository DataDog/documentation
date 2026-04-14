---
app_id: ntp
categories:
- network
custom_kind: integración
description: Recibe alertas cuando tus hosts se desincronicen con el servidor NTP
  elegido.
integration_version: 1.0.0
media: []
supported_os:
- linux
- macos
- windows
title: NTP
---
## Información general

La integración de Network Time Protocol (NTP) está activada por defecto e informa del desfase horario desde un servidor ntp cada 15 minutos. Cuando la hora del Agent local está más de 15 segundos desfasada del servicio de Datadog y otros hosts que se monitorizan, puedes experimentar:

- Activación de alertas incorrecta
- Retraso en el tiempo de respuesta de las métricas
- Vacíos en los gráficos de métricas

Por defecto, el check detecta en qué proveedor de nube se está ejecutando el Agent y utiliza el servidor NTP privado de ese proveedor de nube, si está disponible.
Si no se detecta ningún proveedor de nube, el Agent 
utilizará por defecto los servidores NTP indicados a continuación:

- `0.datadog.pool.ntp.org`
- `1.datadog.pool.ntp.org`
- `2.datadog.pool.ntp.org`
- `3.datadog.pool.ntp.org`

**Nota:** Las solicitudes NTP no admiten la configuración de proxy.

## Configuración

### Instalación

El check de NTP está incluido en el paquete del [Datadog Agent ](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus servidores.

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

El Agent activa el check NTP en forma predeterminada. Para configurar el check tú mismo, edita el archivo `ntp.d/conf.yaml` en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory). Consulta el [ejemplo de ntp.d/conf.yaml](https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/ntp.d/conf.yaml.default) para conocer todas las opciones de configuración disponibles.

Se debe permitir el tráfico UDP saliente a través del puerto `123` para que el Agent pueda confirmar que la hora del servidor local es razonablemente precisa según los servidores NTP de Datadog.

**Nota**: Si editas el archivo de configuración de check de Datadog-NTP, [reinicie el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) para efectuar cualquier cambio de configuración.

{{% /tab %}}

{{% tab "Containerized" %}}

#### En contenedores

Para entornos en contenedores, consulta la documentación relativa a [configuraciones de Autodiscovery](https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=annotations#configuration) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación. Consulta el ejemplo [ntp.d/conf.yaml](https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/ntp.d/conf.yaml.default) para conocer todas las opciones de configuración disponibles.

##### Recopilación de métricas

| Parámetro            | Valor                        |
|----------------------|------------------------------|
| `<INTEGRATION_NAME>` | `["ntp"]`                    |
| `<INIT_CONFIG>`      | `[{}]`                       |
| `<INSTANCE_CONFIG>`  | `[{"host": "<NTP_SERVER>"}]` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando `status` del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `ntp` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **ntp.offset** <br>(medidor) | La diferencia horaria entre el reloj de referencia NTP y el reloj local.<br>_Mostrado como segundo_ |

### Eventos

El check de NTP no incluye ningún evento.

### Checks de servicio

**ntp.in_sync**

Devuelve CRÍTICO si el reloj del host se aleja más del umbral configurado de la hora NTP. Devuelve DESCONOCIDO si el Agent no puede conectarse con el servidor NTP. En caso contrario, devuelve OK.

_Estados: ok, crítico, desconocido_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).