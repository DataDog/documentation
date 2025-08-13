---
aliases:
- /es/graphing/faq/is-there-a-way-to-share-graphs
- /es/graphing/faq/is-there-a-way-to-share-or-revoke-previously-shared-graphs
- /es/graphing/dashboards/shared_graph/
further_reading:
- link: https://www.datadoghq.com/blog/dashboard-sharing/
  tag: Blog
  text: Comparte dashboards de forma segura con cualquier persona que no pertenezca
    a tu organización
- link: /dashboards/
  tag: Documentación
  text: Crear dashboards en Datadog
- link: /dashboards/guide/embeddable-graphs-with-template-variables/
  tag: Guía
  text: Gráficos integrables con variables de plantilla
- link: /dashboards/widgets/
  tag: Documentación
  text: Descubrir widgets para dashboards
title: Compartir gráficas
---

Para compartir una gráfica:

1. En la gráfica que quieras compartir, haz clic en el icono del lápiz de la esquina superior derecha.
1. En la sección *Graph your data* (Representa gráficamente tus datos), selecciona la pestaña **Share** (Compartir).
1. Elige un periodo de tiempo para tu gráfico.
1. Elige el tamaño del gráfico.
1. Selecciona si deseas incluir la leyenda o no.
1. Obtén el código de integración haciendo clic en el botón **Generate embed code** (Generar código de integración).

{{< img src="dashboards/sharing/graph_share_tab.png" alt="Pestaña Share (Compartir) en un editor de gráficos" style="width:95%;">}}

Todos los gráficas compartidas se enumeran en la página [Configuración de uso compartido público][10]. También puedes revocar gráficas compartidas individualmente o desactivar todos los gráficas compartidas desde esta página.

## Revocar

Para revocar las claves utilizadas para compartir gráficos individuales (integrados):

1. Ve a [**Organization Settings > Public Sharing > Shared Graphs**][1] (Configuración de la organización > Compartir público > Gráficas compartidas) para ver una lista de todas las gráficas compartidas.
2. Encuentra tu gráfica utilizando la barra de búsqueda u ordenando las columnas de la tabla.
3. Haz clic en el botón **Revoke** (Revocar), junto al gráfico que quieres dejar de compartir.

## Aplicar restricciones

Puedes restringir el acceso por dirección IP a tu dashboard. Envía un correo electrónico al [soporte de Datadog][2] para activar la función de listado de direcciones IP incluidas que permite a los administradores proporcionar un lista de direcciones IP que tienen acceso a dashboards compartidos. Una vez activado, gestiona tus restricciones en la página [Public Sharing][3] (Compartir público) de tu organización.

## API

Datadog tiene una [API dedicada][4] que te permite interactuar con tus gráficas compartidas (embeds):

| Endpoint                 | Descripción                                                             |
|--------------------------|-------------------------------------------------------------------------|
| [Obtener todos los embeds][5]     | Obtén una lista de gráficos integrables creados previamente.                     |
| [Crear embed][6]       | Crea un nuevo gráfico integrable.                                         |
| [Obtener un embed específico][7] | Obtén el fragmento HTML de un integrado generado previamente con `embed_id`. |
| [Activar embed][8]       | Activa el integrado especificado.                                             |
| [Revocar embed][9]       | Revoca el integrado especificado.                                             |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/organization-settings/public-sharing/shared-graphs
[2]: /es/help/
[3]: https://app.datadoghq.com/organization-settings/public-sharing/settings
[4]: /es/api/latest/embeddable-graphs/
[5]: /es/api/latest/embeddable-graphs/#get-all-embeds
[6]: /es/api/latest/embeddable-graphs/#create-embed
[7]: /es/api/latest/embeddable-graphs/#get-specific-embed
[8]: /es/api/latest/embeddable-graphs/#enable-embed
[9]: /es/api/latest/embeddable-graphs/#revoke-embed
[10]: https://app.datadoghq.com/organization-settings/public-sharing