---
description: Información sobre los datos que recopila Monitorización de base de datos.
further_reading: null
title: Datos recopilados de Monitorización de base de datos
---

Cuando se configura Monitorización de base de datos, el Agent recopila todas las métricas descritas en la documentación sobre la integración correspondiente. Esto incluye métricas del estado de la base de datos, eventos, conmutaciones por error, conexiones y grupos de buffers, además de las métricas del rendimiento de las consultas que utiliza Monitorización de base de datos.

Se trata de métricas estándar de Datadog que puedes utilizar en los [dashboards][1], [monitores][2], [notebooks][3] y en cualquier otro lugar donde utilices métricas.

Para ver una lista completa de las métricas recopiladas, consulta la sección de la documentación **Datos recopilados** de la integración de tu producto de base de datos:

{{< partial name="dbm/dbm-data-collected" >}}
<p></p>

Las métricas utilizadas para las vistas de Monitorización de base de datos son, principalmente, las siguientes:
- **MySQL**: `mysql.queries.*`
- **Postgres: `postgresql.queries.*`
- **SQL Server**: `sqlserver.queries.*`
- **Oracle: `oracle.queries.*`

## Consultas normalizadas

Con el fin de eliminar la información redundante y realizar un rastreo de las tendencias de rendimiento, Monitorización de base de datos agrupa consultas idénticas con parámetros diferentes enmascarando los parámetros. Estos grupos de consultas se denominan consultas normalizadas y a veces se denominan síntesis de consultas. En lugar de imponer una limitación estricta del volumen de consultas, Datadog admite 200 consultas normalizadas por host de base de datos. Este proceso también garantiza que no se filtren datos confidenciales a las herramientas de observabilidad.

Por ejemplo, puedes ver muchas consultas que recuperan datos de la misma tabla por id:

```sql
SELECT * FROM customers WHERE id = 13345;
SELECT * FROM customers WHERE id = 24435;
SELECT * FROM customers WHERE id = 34322;
```

Estos aparecen juntos como una consulta normalizada que sustituye el parámetro por `?`.

```sql
SELECT * FROM customers WHERE id = ?
```

Las consultas con varios parámetros siguen el mismo patrón:

```sql
SELECT * FROM timeperiods WHERE start >= '2022-01-01' AND end <= '2022-12-31' AND num = 5
```

La consulta anterior con parámetros específicos se convierte en la versión enmascarada siguiente:

```sql
SELECT * FROM timeperiods WHERE start >= ? AND end <= ? AND num = ?
```

## Información confidencial

Dado que el Agent de Monitorización de base de datos normaliza las consultas, enmascara todos los parámetros de enlace de consulta enviados a la entrada Datadog. Por lo tanto, las contraseñas, la información personal identificable (PII) y otra información potencialmente confidencial almacenada en tu base de datos no se pueden ver en las métricas de consultas, las muestras de consultas o los planes de explicación.

Sin embargo, existen algunas fuentes comunes de riesgo para los datos:

### Esquema de la base de datos

Si los nombres de tablas, los nombres de columnas, los índices, los nombres de bases de datos o cualquier otro esquema contienen información confidencial, estos datos no se enmascaran. No es habitual que los esquemas de bases de datos se consideren confidenciales, pero ten en cuenta que el enmascaramiento no se aplica a estos tipos de datos.

### Logs de base de datos

Si envías logs a Datadog desde tu base de datos, ten en cuenta que algunos logs pueden contener el texto completo de la consulta SQL, incluidos los parámetros de enlace de la consulta. Revisa y aplica [reglas de seguridad de logs][4] coherentes con los requisitos de tu organización.

### Comentarios sobre consultas

El Agent puede recopilar los comentarios de la consulta SQL y enviarlos a Datadog sin pasar por el enmascaramiento. Los comentarios de consultas SQL no suelen contener datos confidenciales, pero los comentarios extraídos de la consulta SQL no pasarán por el enmascaramiento.

## Qué consultas se rastrean

Monitorización de base de datos de Datadog recopila métricas por consulta para las 200 consultas normalizadas más importantes medidas por su tiempo total de ejecución en el host. Este límite se aplica solo a cada intervalo de recopilación (10 segundos de modo predeterminado), por lo que el número total de consultas rastreadas puede superar el límite configurado en periodos de tiempo más largos.

Las muestras de consultas no tienen límites en cuanto al número de consultas únicas normalizadas rastreadas, pero el muestreo está sesgado hacia las consultas que son lentas o frecuentes. Es posible que se seleccione una muestra de consultas, pero que no tenga ninguna métrica de consulta asociada. Este es el caso cuando la consulta fue lenta o frecuente durante un breve periodo de tiempo, pero no se mantuvo lo suficiente como para convertirse en una consulta principal.

## Periodos de retención de consultas

Datadog retiene datos de consulta de Database Monitoring en función del tipo de datos recopilados:

- Las métricas de consulta se conservan durante 15 meses.
- Las muestras de consulta se conservan durante 15 días.

Para más información, consulta [Periodos de retención de datos][5].

## Otras consultas

_Otras consultas_ representa métricas de todas las consultas que no aparecen entre las 200 principales. Dado que una consulta puede ser una de las principales en algunos periodos de tiempo, pero no en otros, las métricas de una consulta concreta pueden contabilizarse a veces como una consulta normalizada distinta y otras veces en Otras consultas.

[1]: /es/dashboards/
[2]: /es/monitors/
[3]: /es/notebooks/
[4]: /es/data_security/logs/
[5]: /es/data_security/data_retention_periods/