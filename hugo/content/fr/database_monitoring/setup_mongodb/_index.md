---
description: Configuration de Database Monitoring sur un cluster MongoDB
disable_sidebar: true
title: Configurer MongoDB
---
### Versions de MongoDB prises en charge {#mongodb-versions-supported}

|                       | Auto-hébergé | MongoDB Atlas |
| --------------------- | ----------- | ------------- |
| MongoDB 4.4           | {{< X >}}   |               |
| MongoDB 5.0           | {{< X >}}   | {{< X >}}     |
| MongoDB 6.0           | {{< X >}}   | {{< X >}}     |
| MongoDB 7.0           | {{< X >}}   | {{< X >}}     |
| MongoDB 8.0           | {{< X >}}   | {{< X >}}     |
| MongoDB 9.0           | {{< X >}}   | {{< X >}}     |

MongoDB 9.0 nécessite Datadog Agent 7.85.0 ou une version ultérieure.

Pour obtenir les instructions de configuration, sélectionnez votre type d'hébergement :

{{< card-grid card_width="300px" >}}
  {{< image-card href="/database_monitoring/setup_mongodb/selfhosted" src="integrations_logos/mongo.png" alt="Auto-hébergé" title="Auto-hébergé" >}}
  {{< image-card href="/database_monitoring/setup_mongodb/mongodbatlas" src="integrations_logos/mongodb_atlas.png" alt="MongoDB Atlas" title="MongoDB Atlas" >}}
{{< /card-grid >}}