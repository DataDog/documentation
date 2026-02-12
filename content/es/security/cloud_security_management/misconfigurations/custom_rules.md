---
aliases:
- /es/security/cspm/custom_rules
- /es/security/misconfigurations/custom_rules
cascade:
  algolia:
    rank: 30
    subcategory: Administración de la postura de seguridad en la nube
further_reading:
- link: security/cloud_security_management/guide/writing_rego_rules
  tag: Guía
  text: Empezando con la escritura de tus propias reglas Rego
- link: security/default_rules
  tag: Documentación
  text: Explorar las reglas de cumplimiento predeterminadas de configuración en la
    nube de CSM Misconfigurations
- link: security/misconfigurations/frameworks_and_benchmarks
  tag: Documentación
  text: Conocer los marcos y las referencias del sector
is_beta: true
title: Crear reglas personalizadas
---

## Información general

Para ampliar las reglas que se aplican a tu entorno a fin de evaluar tu postura de seguridad, puedes clonar reglas de cumplimiento y editar las copias, y también puedes crear tus propias reglas desde cero.
Para ver la lista de los tipos de recursos disponibles para tus reglas personalizadas, consulta [Esquema de recursos en la nube][8]. 

## Reglas de clonación

Para clonar una regla:

1. Busca la regla que quieres copiar realizando una de las siguientes acciones:
   - Ve a la página [**Reglas de errores de configuración**][1]. Selecciona la regla que quieres copiar para abrir su página de detalles.
   - Ve al [**Explorador de errores de configuración**][2]. Selecciona un error de configuración para abrir sus detalles y, a continuación, selecciona **Edit Rule** (Editar regla).
2. Realiza los cambios que quieras para tu nueva regla.
3. Desplázate hasta la parte inferior de la página de detalles y haz clic en **Clone Rule** (Clonar regla).

## Creación de reglas

Para crear una regla desde cero:

1. Ve a la página [**Reglas de errores de configuración**][1].
2. Haz clic en **New Rule** (Nueva regla) en la parte superior derecha.
3. Selecciona **Cloud Configuration** (Configuración en la nube), como tipo de regla.
4. Especifica los tipos de recursos de nube para los que estás escribiendo la regla.
5. Escribe la lógica de la regla utilizando [Rego][3], un lenguaje de política-como-código, ya sea desde cero o utilizando la plantilla de Datadog. Para más información, consulta [Escribir reglas personalizadas con Rego][4]. Ten en cuenta que puedes marcar un recurso como "aprobado", "fallado" u "omitir". Si no marcas un recurso, se interpretará como "omitir".

   {{< img src="security/cspm/custom_rules/custom_rules_first_half.png" alt="Pasos para las reglas personalizadas" width="100%">}}

6. Excluye la actividad benigna especificando consultas para incluir o eliminar determinados recursos de los errores de configuración.
7. Confirma la lógica de tu regla seleccionando recursos y haciendo clic en **Test Rule** (Probar regla). Observa qué recursos se han aprobado y cuáles no, junto con las etiquetas (tags) del recurso correspondiente.
8. Especifica una gravedad (`Critical`, `High`, `Medium`, `Low` o `Info`) para la regla.
9. Selecciona una faceta (por ejemplo, para cada tipo de recurso o para cada ID de cuenta) y [especifica un destino de notificación ][5] para señalar.
10. En **Say what's happening** (Cuéntanos que está sucediendo), escribe una descripción para la notificación, utilizando las opciones de notificación para hacerla útil. Para obtener más detalles, consulta [Notificaciones][6].
11. Especifica etiquetas para aplicarlas a los errores de configuración resultantes. Para obtener más información, consulta [Etiquetado de errores de configuración](#tagging-misconfigurations).
12. Haz clic en **Save Rule** (Guardar regla).

    {{< img src="security/cspm/custom_rules/custom_rules_second_half.png" alt="Pasos para las reglas personalizadas" width="100%">}}

## Etiquetado de errores de configuración

Al crear, clonar o modificar reglas de cumplimiento de CSM Misconfigurations, puedes especificar etiquetas para que se apliquen a los errores de configuración, de modo que puedas agrupar, filtrar y buscar errores de configuración utilizando esas etiquetas. Al clonar una regla, algunas etiquetas se transfieren a la nueva regla y otras no (consulta la siguiente tabla).

Puedes asignar casi cualquier clave-valor como etiqueta. La siguiente tabla muestra etiquetas que son útiles en escenarios de seguridad comunes.

| Clave              | Valores válidos                                                                                                             | Descripción                                                                                                                                          |
|------------------|--------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `scored`         | `true`, `false`                                                                                                          | Indica si se debe incluir la regla al calcular la puntuación de postura general de la organización. Se añade automáticamente a las reglas clonadas.                    |
| `security`       | `compliance`                                                                                                             | Categoriza los errores de configuración en la [página de señales de seguridad][7]. No se puede eliminar.                                                                   |
| `requirement`    | Cadena                                                                                                                   | No permitido para reglas personalizadas. Indica un requisito relacionado con un marco de cumplimiento. No la añadas a reglas que no formen parte de un marco de cumplimiento. |
| `cloud_provider` | `aws`, `gcp`, `azure`                                                                                                    | No se puede eliminar. Se define automáticamente en función del tipo de recurso.                                                                                      |
| `control`        | Cadena                                                                                                                   | No permitido para reglas personalizadas. Indica un control relacionado con un marco de cumplimiento. No la añadas a reglas que no formen parte de un marco de cumplimiento.     |
| `source`         | Cadena de un conjunto definido dado por los proveedores de nube como se muestra en la [faceta de origen en el Explorador de errores de configuración][2]. | No se puede eliminar. Se añade automáticamente a las reglas clonadas. Facilita la agrupación de reglas por proveedor de nube.                                                |
| `framework`      | Cadena                                                                                                                   | No permitido para reglas personalizadas. Indica el marco de cumplimiento al que pertenece la regla. No se añade automáticamente a las reglas clonadas.                       |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/compliance/rules
[2]: https://app.datadoghq.com/security/compliance
[3]: https://www.openpolicyagent.org/docs/latest/
[4]: /es/security/cloud_security_management/guide/writing_rego_rules/
[5]: /es/security/cloud_security_management/misconfigurations/compliance_rules#set-notification-targets-for-compliance-rules
[6]: /es/security/notifications/
[7]: https://app.datadoghq.com/security/
[8]: /es/infrastructure/resource_catalog/schema/