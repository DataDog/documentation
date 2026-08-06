---
aliases:
- /es/security/application_security/threats/threat-overview
- /es/security/application_security/threats/attack-summary
title: Resumen de ataques
---

<!-- {{< img src="security/application_security/threats/appsec-threat-overview-page-top.png" alt="Captura de pantalla de la página de resumen de ataques de AAP"  >}} -->

El [Resumen de ataques][2] de App and API Protection (AAP) proporciona una vista rápida de la situación de tus aplicaciones y tus API. Destaca las tendencias, la exposición de los servicios, el tráfico de ataques y el impacto en tu lógica empresarial. Puedes pasar de los widgets a sus trazas (traces) relacionadas.

Cada sección de **Resumen de ataques** se centra en un aspecto diferente de la seguridad con información de apoyo.

## Secciones

Superficie del ataque
: esta sección proporciona información sobre los servicios expuestos, las herramientas que utilizan los atacantes y los escáneres comerciales que identifican las posibles vulnerabilidades.

Trafico de ataque
: estos gráficos identifican la clasificación de los ataques, como SSRF, LFI, SQL e inyección de comandos. Permiten a los usuarios identificar picos de tráfico malicioso y patrones.

Lógica de negocio
: esta sección se centra en el fraude y el abuso de la lógica de negocio, como los intentos de adquisición de cuentas o cualquier evento de lógica de negocio personalizada rastreado por tu aplicación.

Fuentes de tráfico de ataque
: un mapa de calor global que indica las fuentes del tráfico de ataque, proporcionando una representación visual de las amenazas por región.

## Prácticas recomendadas

1. Revisa las tendencias y adopta una política de protección que satisfaga tus necesidades de postura.
2. Revisa regularmente el widget de **Servicios de exposición** en **Superficie del ataque** para asegurarte de que solo sean accesibles los servicios correctos y que tengan una política de protección que se ajuste a tu perfil de riesgo.
3. Bloquea las herramientas de ataque y asegúrate de que los escáneres de los clientes forman parte de un programa autorizado de gestión de vulnerabilidades.
4. Monitoriza la lógica de negocio para los picos de ataques de relleno de credenciales o actividad de pago riesgosa.
5. Utiliza **Fuentes de tráfico de ataque** para comparar las fuentes de tráfico de ataque con tus localizaciones de cliente previstas.
6. Utiliza [Powerpacks](#using-powerpacks) para mejorar tus dashboards con la información más relevante.

### Uso de powerpacks

Cuando añadas un widget a un [nuevo dashboard][1] en Datadog, elige la sección **Powerpacks** en la bandeja. Filtra en `tag:attack_summary` o escribe `Attack Summary` en la casilla de búsqueda.

Cada sección de la página **Resumen del ataque** corresponde a una powerback específica.

[1]: https://app.datadoghq.com/dashboard/lists
[2]: https://app.datadoghq.com/security/appsec/threat