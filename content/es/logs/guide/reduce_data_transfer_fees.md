---
algolia:
  tags:
  - transferencia de datos
  - egreso de datos
  - private link
  - PrivateLink
  - Private Service Connect
further_reading:
- link: https://www.datadoghq.com/architecture/using-cross-region-aws-privatelink-to-send-telemetry-to-datadog/
  tag: Centro de arquitectura
  text: Uso de AWS PrivateLink entre regiones para el envío de telemetría a Datadog
- link: https://aws.amazon.com/solutions/case-studies/textnow-privatelink-case-study/
  tag: Estudio de caso de AWS
  text: TextNow ahorra un 93% en gastos de transferencia de datos gracias a AWS PrivateLink
- link: /logs/log_configuration/flex_logs/#potential-sources-for-sending-directly-to-flex-logs
  tag: Documentación
  text: Posibles fuentes de envío directo a Flex Logs
title: Cómo enviar logs a Datadog reduciendo los costes de transferencia de datos
---

## Información general

A medida que tu organización crece, la cantidad de datos que transfieres entre proveedores de nube a Datadog también puede aumentar. Los proveedores de nube cobran una tarifa de *transferencia de datos* o de *egreso de datos* por mover esos datos desde el almacenamiento en la nube mediante direcciones IP públicas. Esta puede convertirse fácilmente en una de las partidas más altas de la factura de costes en la nube de tu organización. 

Envía datos a través de una red privada para evitar la Internet pública y reducir tus costes de transferencia de datos. Como ejemplo de cómo los enlaces privados reducen tus costes, en las regiones AWS del este de EE.UU., cuesta 0,09 dólares transferir 1 GB, pero con AWS PrivateLink, el coste de transferir datos baja a 0,01 dólares por GB.

## Proveedores de nube compatibles

<div class="alert alert-danger">Asegúrate de que el sitio Datadog seleccionado {{< region-param key="dd_site_name" code="true" >}} es correcto. Los enlaces privados específicos de la nube no están disponibles para todos los sitios Datadog.</div>

{{< whatsnext desc="Conéctate a Datadog mediante:" >}}
    {{< nextlink href="/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=us" >}}US1 - AWS PrivateLink{{< /nextlink >}}
    {{< nextlink href="/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=ap1" >}}AP1 - AWS PrivateLink{{< /nextlink >}}
    {{< nextlink href="/agent/guide/azure-private-link/" >}}US3 - Azure Private Link{{< /nextlink >}}
    {{< nextlink href="/agent/guide/gcp-private-service-connect/" >}}US5 - Google Cloud Private Service Connect{{< /nextlink >}}
{{< /whatsnext >}}

## Herramientas adicionales 

Después de cambiar a enlaces privados, puedes utilizar lo siguiente para monitorizar tu uso y tener más control sobre los costes de tus datos:
- Datadog [Cloud Network Monitoring][1] identifica las aplicaciones de mayor rendimiento de tu organización.
- Las herramientas [Cloud Cost Management][2] pueden verificar y monitorizar la reducción de tus costes de nube.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/network_monitoring/cloud_network_monitoring/
[2]: /es/cloud_cost_management/
[3]: /es/agent/guide/private-link/
[4]: /es/agent/guide/azure-private-link/
[5]: /es/agent/guide/gcp-private-service-connect/