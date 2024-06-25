---
aliases:
- /es/graphing/infrastructure/containermap/
- /es/guides/hostmap
further_reading:
- link: /infrastructure/livecontainers/
  tag: Documentación
  text: Obtén visibilidad en tiempo real de todos los contenedores de tu entorno
- link: /infrastructure/process/
  tag: Documentación
  text: Comprender lo que sucede en cualquier nivel del sistema
kind: documentación
title: Mapa de contenedores
---

## Información general

Al igual que los [mapas de hosts][1], los [mapas de contenedores][2] te brindan una visión general del estado de tus contenedores. Datadog se integra con ECS, Docker, Kubernetes y mucho más. Puedes ver todos tus contenedores juntos en una pantalla con agrupaciones y filtros personalizados, así como métricas, que se destacan al instante a través de distintos colores y formas.

En un solo lugar, puedes detectar outliers, identificar patrones de uso, evitar problemas de recursos y tomar decisiones sobre cómo gestionar mejor tus contenedores. No importa si tienes 10, 100 o 10.000 contenedores. [Autodiscovery][3] detecta de manera automática los contenedores nuevos y los contabiliza.

{{< img src="infrastructure/containermap/containermap.png" alt="Mapa de contenedores, parte 1" style="width:80%;">}}

## Instalación

Después de desplegar el [Agent][4], no se necesita ninguna otra configuración. Para recopilar información del contenedor de Docker en la instalación estándar en lugar de con el [Docker Agent][5], el usuario `dd-agent` debe contar con permisos para acceder a `docker.sock`. El permiso se puede otorgar al añadir `dd-agent` al grupo `docker`.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/infrastructure/hostmap/
[2]: https://app.datadoghq.com/infrastructure/map?node_type=container
[3]: /es/agent/kubernetes/integrations/
[4]: /es/agent/
[5]: /es/agent/docker/