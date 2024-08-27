---
aliases:
- /es/agent/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql/
- /es/integrations/faq/can-i-set-up-the-dd-agent-mysql-check-on-my-google-cloudsql/
title: ¿Puedo configurar el check mysql dd-Agent en mi CloudSQL de Google?
---

Al igual que con la [integración de Amazon RDS][1] "nativa" con MySQL, puedes configurar una integración de MySQL con un Agent de Datadog en una instancia de MySQL que se ejecuta en CloudSQL de Google. Con esta configuración, puedes complementar las métricas que de otro modo obtendrías de la [integración de CloudSQL de Google][2] de Datadog con las métricas disponibles de la [integración de MySQL][3] del Agent de Datadog.

Para configurar este integración "extra" en tu instancia CloudSQL de Google, puedes configurar la integración  de MySQL en un Agent de Datadog y [configurarla para conectarse remotamente][4] a tu instancia CloudSQL de Google en lugar de utilizar el host local por defecto. Por lo demás, los pasos de configuración son los mismos que para cualquier otra instancia MySQL alojada localmente.

Con una advertencia: CloudSQL de Google [no es compatible con performance_schemas][5], por lo que no puedes `GRANT SELECT ON performance_schema.*` al usuario del Agent de Datadog. Como resultado, dos de las métricas extra/opcionales de los checks de MySQL no están disponibles para las instancias CloudSQL de Google. Por lo demás, la integración debería funcionar igual que con cualquier instancia MySQL alojada localmente.

[1]: /es/integrations/amazon_rds/
[2]: /es/integrations/google_cloudsql/
[3]: /es/integrations/mysql/
[4]: https://github.com/DataDog/integrations-core/blob/5.12.x/mysql/conf.yaml.example#L4-L7
[5]: https://cloud.google.com/sql/docs/features#differences