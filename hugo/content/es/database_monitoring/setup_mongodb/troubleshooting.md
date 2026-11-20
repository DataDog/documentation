---
description: Solución de problemas de configuración de la Monitorización de base de
  datos
title: Solución de problemas de configuración de la Monitorización de bases de datos
  para MongoDB
---

Esta página explica cómo resolver problemas comunes con la configuración y el uso de la monitorización de base de datos con MongoDB. Datadog recomienda permanecer en la última versión estable del Agent y seguir la última [documentación de configuración][1], ya que puede cambiar con los lanzamientos de versiones del Agent.

## Diagnóstico de problemas comunes

### Nombre de clúster con mayúsculas o espacios

`cluster_name` de MongoDB debería seguir las [convenciones de nomenclatura de etiquetas de Datadog][2].
Si tu `cluster_name` de MongoDB contiene caracteres en mayúsculas o espacios, el Agent normaliza el nombre del clúster a minúsculas y sustituye los espacios por guiones bajos. Por ejemplo, si tu nombre de clúster es `My Cluster`, el Agent lo normaliza a `my_cluster`.
Para evitar incoherencias y comportamientos inesperados, asegúrate de que tu `cluster_name` sigue las convenciones de nomenclatura de etiqueta de Datadog.

### ServerSelectionTimeoutError al conectar con el clúster de MongoDB Atlas

Si estás utilizando MongoDB Atlas, es posible que te encuentres con un `ServerSelectionTimeoutError` al conectarte al clúster. Este error se produce cuando el Agent no puede conectarse al clúster de MongoDB Atlas debido a un problema de red o a una configuración incorrecta de TLS. Para resolver este problema, asegúrate de que `tls` está configurado como `true` en el archivo de configuración de la integración. Si sigues teniendo problemas, comprueba la configuración del acceso de red del clúster de MongoDB Atlas para asegurarte de que la dirección IP del Agent puede conectarse al clúster.

[1]: /es/database_monitoring/setup_mongodb/
[2]: /es/developers/guide/what-best-practices-are-recommended-for-naming-metrics-and-tags/#rules-and-best-practices-for-naming-tags