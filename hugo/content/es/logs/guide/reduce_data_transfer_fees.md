---
algolia:
  tags:
  - data transfer
  - data egress
  - private link
  - PrivateLink
  - Private Service Connect
further_reading:
- link: https://www.datadoghq.com/architecture/using-cross-region-aws-privatelink-to-send-telemetry-to-datadog/
  tag: Centro de arquitectura
  text: Uso de AWS PrivateLink de varias regiones para enviar telemetría a Datadog
- link: https://aws.amazon.com/solutions/case-studies/textnow-privatelink-case-study/
  tag: Estudio de incidencia de AWS
  text: TextNow ahorra un 93% en tarifas de transferencia de datos usando AWS PrivateLink
- link: /logs/log_configuration/flex_logs/#potential-sources-for-sending-directly-to-flex-logs
  tag: Documentación
  text: Fuentes potenciales para enviar directamente a Flex Logs
title: Cómo enviar registros a Datadog mientras reduce las tarifas de transferencia
  de datos
---
## Descripción general {#overview}

A medida que su organización crece, la cantidad de datos que transfiere entre proveedores de nube a Datadog también puede aumentar. Los proveedores de nube cobran una tarifa de *transferencia de datos* o una tarifa de *salida de datos* para mover esos datos desde el almacenamiento en la nube a través de direcciones IP públicas. Esto puede convertirse fácilmente en una de las partidas más grandes en la factura de costos de nube de su organización. 

Envíe datos a través de una red privada para evitar la internet pública y reducir sus tarifas de transferencia de datos. Como ejemplo de cómo los enlaces privados reducen sus costos, en las regiones US East de AWS, cuesta $0.09 transferir 1 GB, pero con AWS PrivateLink, el costo para transferir datos baja a $0.01 por GB.

## Proveedores de nube compatibles {#supported-cloud-providers}

<div class="alert alert-danger">Asegúrese de que el sitio de Datadog seleccionado {{< region-param key="dd_site_name" code="true" >}} sea correcto. Los enlaces privados específicos de la nube no están disponibles para todos los sitios de Datadog.</div>

{{< whatsnext desc="Conéctese a Datadog a través de:" >}}
    {{< nextlink href="/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=us" >}}US1 - AWS PrivateLink{{< /nextlink >}}
    {{< nextlink href="/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=ap1" >}}AP1 - AWS PrivateLink{{< /nextlink >}}
    {{< nextlink href="/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=ap2" >}}AP2 - AWS PrivateLink{{< /nextlink >}}
    {{< nextlink href="/agent/guide/private-link/?tab=crossregionprivatelinkendpoints&site=uk1" >}}UK1 - AWS PrivateLink{{< /nextlink >}}
    {{< nextlink href="/agent/guide/azure-private-link/" >}}US3 - Azure Private Link{{< /nextlink >}}
    {{< nextlink href="/agent/guide/gcp-private-service-connect/" >}}US5 - Google Cloud Private Service Connect{{< /nextlink >}}
    {{< nextlink href="/agent/guide/gcp-private-service-connect/?site=eu" >}}EU1 - Google Cloud Private Service Connect{{< /nextlink >}}
{{< /whatsnext >}}

## Herramientas adicionales {#additional-tools}

Después de cambiar a enlaces privados, puede usar lo siguiente para hacer un seguimiento de su uso y tener más control sobre sus costos de datos:
- Cloud Network Monitoring de Datadog identifica las aplicaciones de mayor rendimiento de su organización.
- Las herramientas de Cloud Cost Management pueden verificar y monitorear la reducción de sus costos en la nube.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/network_monitoring/cloud_network_monitoring/
[2]: /es/cloud_cost_management/
[3]: /es/agent/guide/private-link/
[4]: /es/agent/guide/azure-private-link/
[5]: /es/agent/guide/gcp-private-service-connect/