---
aliases:
- /es/graphing/faq/maintain-relevant-dashboards
- /es/graphing/guide/maintain-relevant-dashboards
title: Mejores prácticas para mantener dashboards relevantes
---

Una página de lista de dashboard desordenada puede dificultar la búsqueda del contenido adecuado y contaminar una consulta de búsqueda con resultados no utilizados o irrelevantes. Combinando el borrado masivo con [dashboards **Eliminados recientemente**][1], puedes eliminar dashboards no deseados en escala y restaurar cualquier borrado accidental. Esta guía incluye:

- Normas generales de identificación de los dashboards no utilizados para su retirada periódica
- Mejores prácticas para mantener una página de lista manejable

## Encontrar dashboards sin utilizar

Aunque encontrar todos los dashboards es complicado, estas directrices pueden ayudar identificar una gran mayoría de contenidos no utilizados y reducir el desorden de dashboard significativamente. Antes de empezar a eliminar dashboards, algunas notas sobre la página de lista:

- Comienza con la lista de preajuste **All Custom** (Todo personalizado). Solo se pueden eliminar los dashboards personalizados.
- Al hacer clic en la columna de casillas de verificación se seleccionan todos los dashboards de la página actual.
- Evita eliminar los dashboards compartidos. Los dashboards con un enlace de compartición público o autenticado aparecen con **SHARED** (COMPARTIDO) junto a su nombre. Puede ser más seguro evitar eliminar estos dashboards, ya que puede afectar a una vista pública.

Para restaurar eliminaciones accidentales, ve a la lista **Recently Deleted** (Eliminados recientemente). Esta lista muestra dashboards eliminados en los últimos 30 días y automáticamente muestra primero los dashboards eliminados menos recientemente. También puedes restaurar dashboards en bloque [a través de la API][2].

{{< img src="dashboards/guide/restore_deleted.png" alt="Restaurar dashboards eliminados" style="width:80%;">}}

### Directrices de eliminación

#### 1. Ordenación inversa por popularidad

Haz clic en la columna **Popularity** (Popularidad) para invertir la clasificación por popularidad. La lista coloca automáticamente en primer lugar los dashboards modificados más recientemente. Si estos dashboards son poco populares y no han sido modificados en los últimos tres meses, puede ser seguro borrarlos.

**Nota:** Datadog Miscellany, un repositorio público no oficial, tiene un [script para eliminar dashboards y monitores][3] que no han sido modificados en los últimos tres meses.

#### 2. Buscar títulos por defecto

Buscar términos como:
- "'s timeboard"
- "'s screenboard"
- "'s dashboard"

Muchos dashboards que contienen estas cadenas tienen títulos por defecto (por ejemplo, "Stephanie's dashboard Thu, Jun 3, 1:41:44 pm"). Los títulos predeterminados pueden indicar un dashboard de prueba que se creó rápidamente y nunca se renombró. Puede ser seguro eliminar estos dashboards, especialmente si son antiguos o poco populares. Por ejemplo, la imagen siguiente muestra un filtrado de búsqueda a **All Custom** (Todo personalizado) con una búsqueda para "'s screenboard", ordenado inversamente por popularidad.

**Nota:** Datadog Miscellany, un repositorio público no oficial, tiene un [script para eliminar dashboards basados en el título][4].

{{< img src="dashboards/guide/screenboard_search.jpeg" alt="Buscar por ''s screenboard'" style="width:80%;">}}

#### 3. Buscar palabras clave como "test".

Buscar los términos que indican que un dashboard solo se utilizó temporalmente, como `test` o `clonado`. Estas palabras pueden utilizarse para etiquetar dashboards utilizados activamente, así que elimínalas con precaución, o consulta la antigüedad del dashboard y popularidad junto al título.

## Mejores prácticas de higiene de dashboard 

Las limpiezas periódicas reducen el desorden de dashboard; las buenas prácticas para mantener dashboards pueden ser aún más eficaces. Estas prácticas ayudan a tu equipo a garantizar que los dashboards sean manejables a largo plazo.

- Utiliza listas personalizadas para encontrar lo que necesitas. Busca una palabra clave como un nombre de servicio, y selecciona varios dashboards para añadirlos a una lista
- Guarda exploraciones puntuales para notebooks o Quick Graphs. Cuando explores una métrica o gráfico individual, prueba [notebooks][5], que no se guardan por defecto, o [Quick Graphs][6] en lugar de crear un nuevo dashboard que haya que eliminar.
- Utiliza [detalles de dashboard][7] para describir para qué sirve un dashboard y cómo utilizarlo. Esto ayuda a los compañeros de equipo a comprender el propósito de un dashboard y hace que sea útil para más personas.

También puedes gestionar dashboards mediante programación con la API dashboards, que incluye endpoints para dashboards de [eliminación masiva][8] y [restauración masiva][2].

## Anexo
**Nota**: Datadog Miscellany es un repositorio público no oficial y no es mantenido activamente por Datadog.

- [Documentation: Restore deleted dashboards in UI (Documentación: Restaurar dashboards eliminados en IU)][1]
- [API: Delete dashboards endpoint (API: Eliminar endpoint de dashboards)][8]
- [API: Restore deleted dashboards endpoint (API: Restaurar endpoint de dashboards eliminado)][2]
- [Datadog Miscellany: Remove old dashboards and monitors (Datadog Miscellany: Eliminar dashboards y monitores antiguos)][3]
- [Datadog Miscellany: Delete dashboards based on text in title (Datadog Miscellany: Eliminar dashboards en texto del título)][4]

[1]: https://docs.datadoghq.com/es/dashboards/list/#restore-deleted-dashboards
[2]: https://docs.datadoghq.com/es/api/latest/dashboards/#restore-deleted-dashboards
[3]: https://github.com/DataDog/Miscellany/tree/master/remove_old_dash_monitors
[4]: https://github.com/DataDog/Miscellany/tree/master/delete_dashboards_by_text_search
[5]: https://docs.datadoghq.com/es/notebooks/#overview
[6]: https://docs.datadoghq.com/es/dashboards/guide/quick-graphs/#overview
[7]: https://www.datadoghq.com/blog/dashboard-details/
[8]: https://docs.datadoghq.com/es/api/latest/dashboards/#delete-dashboards