---
further_reading:
- link: /integrations/guide/reference-tables/
  tag: Documentación
  text: Añadir metadatos personalizados con tablas de referencia
title: Tablas de referencia en DDSQL
---

# Información general

Las tablas de referencia permiten combinar metadatos con información ya existente en Datadog. Estas tablas almacenan conjuntos predefinidos de información que se pueden citar fácilmente en las consultas, lo que reduce la complejidad y mejora el rendimiento de las consultas. Con DDSQL puedes consultar y unir tablas de referencia con otras tablas para ampliar tu información de análisis.

Para obtener más información sobre cómo añadir tablas de referencia, consulta la [documentación Tablas de referencia][1].

## Consultar tablas de referencia

Puedes consultar tablas de referencia directamente utilizando el Editor DDSQL. El objetivo de esta guía es mostrarte cómo puedes liberar todo el potencial de las tablas de referencia en tus consultas de datos.

### Ejemplo de sintaxis de consulta

Para consultar una tabla de referencia, puedes utilizar la siguiente sintaxis. Supongamos que la tabla de referencia se llama "test":

```sql
SELECT * FROM reference_tables.test
```

Esta consulta recupera todos los datos de la tabla de referencia especificada. Modifica la consulta para incluir columnas o condiciones específicas, según sea necesario.

### Unir datos

Además de consultar tablas de referencia, también puedes unirlas a otras tablas disponibles. Al unir tablas de referencia, puedes:

- Combinar datos de referencia con datos en tiempo real para mejorar tus informes y dashboards.
- Integrar datos estáticos y dinámicos para obtener análisis exhaustivos.

El siguiente es un ejemplo de unión de una tabla de referencia con otra tabla:

```sql
SELECT a.table_name, b.table.version
FROM reference_tables.test a
  JOIN other_table b ON a.key = b.key
ORDER BY b.table_version DESC;
```

## Prácticas recomendadas

Actualiza periódicamente las tablas de referencia para garantizar la exactitud de los datos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/integrations/guide/reference-tables/