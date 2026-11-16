---
further_reading:
- link: /disaster_recovery/
  tag: Documentación
  text: Datadog Disaster Recovery (DDR)
site_support_id: datadog_disaster_recovery
title: Configuración recomendada para conmutación por error de DNS
---
Configure el almacenamiento en caché de DNS y la reutilización de conexión para minimizar el tiempo de conmutación por error de DNS para Datadog Disaster Recovery (DDR).

La conmutación por error lleva tiempo porque las cachés de DNS deben actualizarse y las fuentes de telemetría deben volver a conectarse antes de que los datos lleguen a la región secundaria. Configure estos ajustes en conjunto para ayudar a cumplir con su objetivo de tiempo de recuperación (RTO). Los retrasos en estas capas pueden acumularse, así que considere su efecto combinado al elegir el tiempo de vida (TTL) y los ajustes de restablecimiento de conexión.

## Configuración de registros DNS {#dns-record-configuration}

| Ajuste | Configuración recomendada | Descripción |
| --- | --- | --- |
| TTL de registro A o CNAME | Establezca entre 60 y 300 segundos. | **Alto impacto.** Controla cuánto tiempo almacenan en caché los resolutores el registro antes de buscar un valor actualizado después de una conmutación por error. Consulte [RFC 1035][1] (campo TTL) y [RFC 2181][2] (aclaraciones sobre TTL, incluido el manejo de TTL=0). |
| TTL de caché negativa | Establezca entre 60 y 300 segundos, coincidiendo con el TTL de su registro A o CNAME. Verifique tanto el TTL del registro SOA como su campo `MINIMUM`. | **Impacto medio.** Si una búsqueda devuelve NXDOMAIN (el dominio no existe) o NODATA (el tipo de registro solicitado no existe) durante la conmutación por error, los resolutores almacenan esa respuesta en caché. El TTL de caché negativa es el menor entre el TTL del registro SOA y su campo `MINIMUM`. Consulte [RFC 2308][3]. |
| Profundidad de la cadena CNAME | Apunte su registro DNS directamente al punto de conexión del centro de datos de Datadog, sin registros `CNAME` intermedios. | **Impacto medio.** Cada registro en la cadena tiene su propio TTL, y cada salto agrega un registro que debe mantener sincronizado. |

## Almacenamiento en caché de DNS del SO y de la aplicación {#os-and-application-dns-caching}

| Ajuste | Configuración recomendada | Descripción |
| --- | --- | --- |
| Almacenamiento en caché de DNS de la aplicación | Para aplicaciones con una caché de DNS, establezca el TTL de caché en 60-300 segundos, coincidiendo con el TTL de su registro DNS. Para aplicaciones basadas en JVM, configure `networkaddress.cache.ttl`. | **Alto impacto.** Las cachés de DNS de la aplicación pueden retener direcciones antiguas después de que cambien los registros DNS. Algunas configuraciones de JVM almacenan direcciones en caché indefinidamente. Verifique el comportamiento de almacenamiento en caché para cada tiempo de ejecución y cliente HTTP, incluidos los clientes de Go y Node.js. |
| Almacenamiento en caché de DNS del SO | Confirme que los TTL de caché de DNS del SO sean de 300 segundos o menos en los servidores que ejecutan remitentes de telemetría. | **Impacto bajo a medio.** Las cachés de DNS del SO, como `nscd`, `systemd-resolved` y el Cliente DNS de Windows, también pueden aumentar el tiempo de conmutación por error. |

## Comportamiento del remitente y del Agent {#sender-and-agent-behavior}

Cualquier Datadog Agent que utilice la conmutación por error basada en DNS de DDR debe cumplir con los [requisitos previos de DDR][4].

| Ajuste | Configuración recomendada | Descripción |
| --- | --- | --- |
| Reutilización de conexión del Agent | Establezca un intervalo de restablecimiento de conexión de 1 a 300 segundos para cada tipo de telemetría. Consulte [ejemplos de configuración del Agent](#agent-configuration-examples) para ver los ajustes correspondientes. | **Alto impacto.** Las conexiones de larga duración pueden seguir enviando telemetría a la región principal después de los cambios de DNS. Configure reconexiones periódicas para que el Agent realice la resolución de DNS nuevamente. |
| Fuentes de telemetría que no son del Agent | Valide cada fuente de forma independiente. Configure reconexiones periódicas en intervalos de 300 segundos o menos, donde sea compatible. Verifique que los fallos de conexión activen la resolución de DNS inmediata en lugar de intentos repetidos contra una IP en caché. | **Alto impacto.** Las fuentes de telemetría que no son agentes, como las extensiones de Lambda, OpenTelemetry Collector, Fluent Bit y los clientes de API personalizados, manejan el almacenamiento en caché de DNS y la reutilización de conexiones de manera diferente. Su comportamiento después de un fallo de conexión también afecta el tiempo de conmutación por error. |

Volver a resolver el DNS aún puede devolver una dirección en caché. Configure [TTLs de registros DNS](#dns-record-configuration) y [cachés de DNS del SO y de la aplicación](#os-and-application-dns-caching) junto con intervalos de restablecimiento de conexión.

### Ejemplos de configuración del Agent {#agent-configuration-examples}

Reemplace `<CUSTOM_INTAKE_URL>` con el punto de conexión de ingesta que Datadog configura durante la incorporación de DDR. Este punto de conexión utiliza su dominio delegado de Datadog (`<CUSTOMER>.mrf.datadoghq.com`). Consulte [Configurar la conmutación por error de DNS iniciada por el cliente][5].

En `datadog.yaml`, actualice la configuración del intervalo de restablecimiento de conexión para cada tipo de telemetría que envíe. Configure un intervalo de no más de 300 segundos. No establezca el intervalo en `0`, lo cual deshabilita la reconexión periódica.

**Métricas** (`datadog.yaml`):

```yaml
dd_url: <CUSTOM_INTAKE_URL>
# Reset connections every 300 seconds to resolve DNS again.
forwarder_connection_reset_interval: 300
```

**Registros** (`datadog.yaml`):

```yaml
logs_config:
  logs_dd_url: <CUSTOM_INTAKE_URL>
  # Reset connections every 300 seconds to resolve DNS again.
  connection_reset_interval: 300
```

**Trazas de APM** (`datadog.yaml`):

```yaml
apm_config:
  apm_dd_url: <CUSTOM_INTAKE_URL>
  # Reset connections every 300 seconds to resolve DNS again.
  connection_reset_interval: 300
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.rfc-editor.org/rfc/rfc1035
[2]: https://www.rfc-editor.org/rfc/rfc2181
[3]: https://www.rfc-editor.org/rfc/rfc2308
[4]: /es/disaster_recovery/#prerequisites
[5]: /es/disaster_recovery/#set-up-customer-initiated-dns-failover