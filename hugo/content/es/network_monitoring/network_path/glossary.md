---
description: Glosario de Network Path
title: Términos y conceptos de Network Path
---

## Ruta de red

Network Path proporciona una visibilidad salto a salto de la ruta entre el origen y el destino, lo que te ayuda a identificar dónde existe latencia, pérdida de paquetes o cambios en el enrutamiento.

## Terminología
| Concepto                                 | Descripción                                                                                                                                                                                      |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[Network Path][6]**                        | Network Path proporciona una visibilidad salto a salto de la ruta entre el origen y el destino, lo que te ayuda a identificar dónde existe latencia, pérdida de paquetes o cambios en el enrutamiento. |
| **Sistema autónomo (AS/ASN)**        | Conjunto de prefijos de enrutamiento IP gestionados por un único operador de red. Network Path agrupa los saltos por Sistema Autónomo (AS) o Número de Sistema Autónomo (ASN) para mostrar los dominios de enrutamiento a lo largo de la ruta.
| **[Vista de rutas][7]**                           | Visualización de Network Path que muestra cada salto, agrupado por Número de Sistema Autónomo (ASN), región o red, junto con el estado de la sonda y las métricas de salto.                                                             |
| **Salto**                                 | Nodo de red a lo largo de una ruta entre el origen y el destino, identificado por la dirección IP y los metadatos asociados (ASN, región de la nube, proveedor).                                                                  |                                                      |
| **Origen**                              | Punto de partida de una sonda de Network Path, normalmente un host o contenedor monitorizado por el Agent, que ejecuta el rastreador de monitorización de red Datadog.                                                                     |
| **Destino**                         | Endpoint al que se dirige la sonda de Network Path, como un servicio, un endpoint público o un dominio.                                                                                                         |
| **Traceroute** | Mecanismo que utiliza Network Path para determinar los saltos intermedios y la latencia. CNM envía sondas controladas, similares a traceroute, para detectar cada salto en la ruta.                                                         |
| **Latencia por salto**                     | Tiempo de ida y vuelta entre el origen de la sonda y cada salto. Esto ayuda a identificar nodos lentos o congestionados.                                                                                                            |
| **Pérdida de paquetes por salto**                 | Porcentaje de paquetes de sonda perdidos antes de llegar a un salto o volver de él, útil para diagnosticar problemas de confianza.                                                                                    |

### Vista de rutas
| Concepto                             |  Descripción                                                                                                                                                                                              |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Salto agregado**                  | Grupo de varios saltos idénticos (misma IP, ASN, región), explosionados en una única representación para simplificar la visualización.                                                                                          |
| **Tiempo de espera ICMP o ausencia de respuesta**      | Salto en el que no se ha recibido una respuesta ICMP. Suele aparecer como un salto gris o desconocido en la Vista de rutas.                                                                                                                   |
| **Salto ausente**                     | Punto en la ruta donde la sonda no puede identificar un nodo de red, a menudo debido al filtrado del cortafuegos, límites de frecuencia ICMP o enrutamiento privado. Se muestra como un salto discontinuo o vacío.                                        |
| **Indicador de cambio de ruta**           | Marcador visual que muestra cuando la ruta observada cambia con el tiempo, por ejemplo un cambio de SA o un nuevo salto.                                                                          |
| **Agrupación en SA**                     | Grupo de saltos que pertenecen al mismo Sistema Autónomo, lo que ayuda a identificar qué operador de red controla cada segmento de la ruta.                                                                               |
| **Agrupación en regiones**                 | Grupo de saltos situados dentro de la misma región de nube o región geográfica. Útil para identificar el enrutamiento entre regiones.
| **Nodo inicial**                      | Nodo inicial (origen) donde comienza la sonda. Representado en el extremo izquierdo de la Vista de rutas.                                                                                       |
| **Nodo final**                        | Nodo de destino donde termina la sonda. Representado en el extremo derecho de la Vista de rutas.                                                                                                                       |
| **Indicador de estado del salto**            | Icono o color que indica si el salto está en buen estado, degradado o inalcanzable, en función de la latencia y las pérdidas.                       |
| **Estado de la sonda**                    | Muestra si la sonda ha llegado a un salto con éxito, parcialmente o no ha llegado. Esto te ayuda a identificar dónde se detiene o degrada el tráfico.              |                                             |
| **Recuento del recorrido**                 | Representa el número de paquetes de sondeo activos de traceroute recibidos por el salto de alcance. Los recuentos más elevados sugieren que el salto forma parte sistemáticamente de la ruta. Los recuentos más bajos pueden indicar inestabilidad de la ruta. |
| **Finalización del recorrido**            | Indica si el traceroute ha podido llegar al destino con éxito. |
| **Accesibilidad**                    | Nivel de pérdida de paquetes que experimenta el destino. |
| **Latencia**                         | Tiempo que ha tardado el traceroute en llegar desde un origen hasta su destino. |



[6]: /es/network_monitoring/network_path/
[7]: /es/network_monitoring/network_path/path_view