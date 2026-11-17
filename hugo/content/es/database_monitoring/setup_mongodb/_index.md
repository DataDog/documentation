---
description: Configuración de Database Monitoring en un clúster de MongoDB
disable_sidebar: true
title: Configuración de MongoDB
---
### Versiones de MongoDB compatibles {#mongodb-versions-supported}

|                       | Autohospedado | MongoDB Atlas |
| --------------------- | ----------- | ------------- |
| MongoDB 4.4           | {{< X >}}   |               |
| MongoDB 5.0           | {{< X >}}   | {{< X >}}     |
| MongoDB 6.0           | {{< X >}}   | {{< X >}}     |
| MongoDB 7.0           | {{< X >}}   | {{< X >}}     |
| MongoDB 8.0           | {{< X >}}   | {{< X >}}     |
| MongoDB 9.0           | {{< X >}}   | {{< X >}}     |

MongoDB 9.0 requiere Datadog Agent 7.85.0 o posterior.

Para obtener instrucciones de configuración, seleccione su tipo de alojamiento:

{{< card-grid card_width="300px" >}}
  {{< image-card href="/database_monitoring/setup_mongodb/selfhosted" src="integrations_logos/mongo.png" alt="Autohospedado" title="Autohospedado" >}}
  {{< image-card href="/database_monitoring/setup_mongodb/mongodbatlas" src="integrations_logos/mongodb_atlas.png" alt="MongoDB Atlas" title="MongoDB Atlas" >}}
{{< /card-grid >}}