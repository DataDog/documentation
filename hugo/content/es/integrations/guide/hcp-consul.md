---
further_reading:
- link: /integrations/consul/
  tag: Documentación
  text: Más información sobre la integración Cónsul
title: Monitorización de HCP Cónsul con Datadog
---

## Información general

La [integración Consul en Datadog][1] puede recopilar información sobre tu entorno HCP Consul a través de un cliente Consul. HCP Consul es una versión de Consul en la que el plano de control es gestionado por [HashiCorp Cloud Platform][10].

## Configuración

Para empezar a recopilar tus métricas de Cónsul:

1. Asegúrate de que has configurado HCP Consul de acuerdo con la [documentación Empezando con HCP Consul][2].
2. Instala el Datadog Agent en tu [cliente Cónsul][3].
3. Edita el [archivo `consul.d/conf.yaml`][4], que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][5] y define la opción de configuración `url` en la URL de tu cliente Consul.
5. Reinicia el [Agent][6].

## Métricas recopiladas

El uso de la integración Consul con HCP Consul en Datadog recopila un subconjunto de las [métricas predeterminadas][7] de la integración Consul que no pertenecen al [estado del servidor][8], incluidas los siguientes:

- Información sobre nodos Consul
- Coordenadas de red (latencias entre centros de datos y dentro de ellos)
- Métricas de [estado del clúster][9]

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/consul/?tab=host
[2]: https://developer.hashicorp.com/consul/tutorials/get-started-hcp
[3]: https://developer.hashicorp.com/hcp/docs/consul/usage/clients
[4]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/conf.yaml.example
[5]: /es/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[6]: /es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: /es/integrations/consul/?tab=host#metrics
[8]: https://www.consul.io/docs/agent/telemetry#server-health
[9]: https://www.consul.io/docs/agent/telemetry#cluster-health
[10]: https://developer.hashicorp.com/hcp/docs/consul