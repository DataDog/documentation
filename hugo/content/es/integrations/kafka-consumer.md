---
aliases:
- /es/integrations/kafka_consumer
app_id: kafka-consumer
categories:
- colas de mensajes
custom_kind: integración
description: Recopila métricas de los consumidores de Kafka.
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics
  tag: blog
  text: Monitorización de métricas del rendimiento de Kafka
- link: https://www.datadoghq.com/blog/collecting-kafka-performance-metrics
  tag: blog
  text: Recopilación de métricas del rendimiento de Kafka
- link: https://www.datadoghq.com/blog/monitor-kafka-with-datadog
  tag: blog
  text: Monitorización de Kafka con Datadog
integration_version: 6.6.0
media: []
supported_os:
- linux
- windows
- macos
title: Consumidor Kafka
---
![Dashboard de Kafka](https://raw.githubusercontent.com/DataDog/integrations-core/master/kafka_consumer/images/kafka_dashboard.png)

## Información general

Esta integración del Agent recopila métricas del desplazamiento de mensajes de tus consumidores de Kafka. Este check obtiene desplazamientos de marca de agua alta de intermediarios Kafka, desplazamientos de consumidores que se almacenan en Kafka (o Zookeeper para los consumidores antiguos), y luego calcula el desfase del consumidor (que es la diferencia entre el desplazamiento del intermediario y el desplazamiento del consumidor).

**Nota**

- Esta integración garantiza que los desplazamientos de consumidores se comprueban antes que los desplazamientos de intermediarios. En el peor de los casos, el desfase de los consumidores puede ser un poco exagerado. Comprobar estos desplazamientos en el orden inverso puede infravalorar el desfase del consumidor hasta el punto de tener valores negativos, lo que es un escenario calamitoso que suele indicar que se están omitiendo mensajes.
- Si quieres recopilar métricas de JMX de tus intermediarios Kafka o tus consumidores/productores Java, consulta la [integración de intermediarios Kafka](https://app.datadoghq.com/integrations/kafka?search=kafka).

## Configuración

### Instalación

El check del consumidor Kafka del Agent se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest). No es necesaria ninguna instalación adicional en tus nodos Kafka.

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host que ejecuta tus consumidores de Kafka:

##### Recopilación de métricas

1. Edita el archivo `kafka_consumer.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory). Consulta el [ejemplo kafka_consumer.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/kafka_consumer/datadog_checks/kafka_consumer/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

Este check no recopila logs adicionales. Para recopilar logs de intermediarios Kafka, consulta las [instrucciones de recopilación de logs para Kafka](https://docs.datadoghq.com/integrations/kafka/#log-collection).

{{% /tab %}}

{{% tab "En contenedores" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/containers/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `kafka_consumer`                     |
| `<INIT_CONFIG>`      | en blanco o `{}`                        |
| `<INSTANCE_CONFIG>`  | `{"kafka_connect_str": <KAFKA_CONNECT_STR>}` <br/>Por ejemplo, `{"kafka_connect_str": "server:9092"}` |

##### Recopilación de logs

Este check no recopila logs adicionales. Para recopilar logs de intermediarios Kafka, consulta las [instrucciones de recopilación de logs para Kafka](https://docs.datadoghq.com/integrations/kafka/#log-collection).

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent (https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `kafka_consumer` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **kafka.broker_offset** <br>(gauge) | Desplazamiento actual de mensajes en el intermediario.<br>_Se muestra como desplazamiento_ |
| **kafka.consumer_lag** <br>(gauge) | Desfase en los mensajes entre el consumidor y el intermediario.<br>_Se muestra como desplazamiento_ |
| **kafka.consumer_offset** <br>(gauge) | Desplazamiento actual de mensajes en el consumidor.<br>_Se muestra como desplazamiento_ |
| **kafka.estimated_consumer_lag** <br>(gauge) | Desfase en segundos entre el consumidor y el intermediario. Esta métrica se proporciona a través de Data Streams Monitoring. Pueden aplicarse cargos adicionales.<br>_Se muestra en segundos_ |

### Eventos

**consumer_lag**:<br>
El Datadog Agent emite un evento cuando el valor de la métrica `consumer_lag` baja de 0 y lo etiqueta con `topic`, `partition` y `consumer_group`.

### Checks de servicio

El check del consumidor de Kafka no incluye checks de servicio.

## Solucionar problemas

- [Resolución de problemas y profundización en Kafka](https://docs.datadoghq.com/integrations/faq/troubleshooting-and-deep-dive-for-kafka/)
- [El Agent no ha podido recuperar el stub RMIServer](https://docs.datadoghq.com/integrations/guide/agent-failed-to-retrieve-rmiserver-stub/)

**Autenticación de Kerberos GSSAPI**

Según la configuración de Kerberos de tu clúster Kafka, puede que necesites configurar lo siguiente:

- Cliente Kafka configurado para que el Datadog Agent se conecte al intermediario Kafka. El cliente Kafka debe añadirse como principal Kerberos y debe añadirse a un keytab Kerberos. El cliente Kafka también debe tener un ticket de Kerberos válido.
- Certificado TLS para autenticar una conexión segura con el intermediario Kafka.
  - Si se utiliza el almacén de claves JKS, es necesario exportar un certificado desde el almacén de claves y configurar la ruta del archivo con las opciones `tls_cert` o `tls_ca_cert` aplicables.
  - Si se requiere una clave privada para autenticar el certificado, debe configurarse con la opción `tls_private_key`. Si procede, la contraseña de la clave privada debe configurarse con la opción `tls_private_key_password`.
- La variable de entorno `KRB5_CLIENT_KTNAME` que apunta a la localización del keytab de Kerberos del cliente de Kafka si difiere de la ruta por defecto (por ejemplo, `KRB5_CLIENT_KTNAME=/etc/krb5.keytab`)
- La variable entorno `KRB5CCNAME` que apunta a la caché de tiques de credenciales de Kerberos del cliente de Kafka si difiere de la ruta predeterminada (por ejemplo, `KRB5CCNAME=/tmp/krb5cc_xxx`)
- Si el Datadog Agent no puede acceder a las variables de entorno, configura las variables de entorno en un archivo de anulación de configuración del servicio del Datadog Agent para tu sistema operativo. El procedimiento para modificar el archivo de unidad del servicio del Datadog Agent puede variar para diferentes sistemas operativos de Linux. Por ejemplo, en un entorno `systemd` de Linux: 

**Ejemplo de Linux Systemd**

1. Configura las variables de entorno en un archivo de entorno.
   Por ejemplo: `/path/to/environment/file`

```
KRB5_CLIENT_KTNAME=/etc/krb5.keytab
KRB5CCNAME=/tmp/krb5cc_xxx
```

2. Crea un archivo de anulación de configuración del servicio del Datadog Agent: `sudo systemctl edit datadog-agent.service`

1. Configura lo siguiente en el archivo de anulación:

```
[Service]
EnvironmentFile=/path/to/environment/file
```

4. Ejecuta los siguientes comandos para recargar el daemon systemd, el servicio datadog-agent y el Datadog Agent:

```
sudo systemctl daemon-reload
sudo systemctl restart datadog-agent.service
sudo service datadog-agent restart
```

## Referencias adicionales

- [Monitorización de métricas del rendimiento de Kafka](https://www.datadoghq.com/blog/monitoring-kafka-performance-metrics)
- [Recopilación de métricas del rendimiento de Kafka](https://www.datadoghq.com/blog/collecting-kafka-performance-metrics)
- [Monitorización de Kafka con Datadog](https://www.datadoghq.com/blog/monitor-kafka-with-datadog)