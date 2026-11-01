---
description: Restrinja el acceso a los datos de telemetría mediante Data Access Control.
further_reading:
- link: /account_management/rbac/data_access
  tag: Documentación
  text: Data Access Control
- link: /security/sensitive_data_scanner/
  tag: Documentación
  text: Sensitive Data Scanner
- link: /administrators_guide/plan/#resource-tagging
  tag: Documentación
  text: 'Guía del administrador: Etiquetado'
- link: /tracing/configure_data_security/
  tag: Documentación
  text: Data Security
title: Protección de datos confidenciales
---
## Descripción general {#overview}

Mientras que [Protecting Assets][1] cubre quién puede editar o visualizar Dashboards, Monitors y otros objetos, esta sección cubre *telemetría*: los datos subyacentes que fluyen a través de Datadog. No todas las organizaciones necesitan restricciones a nivel de datos, pero aquellas que manejan datos sensibles o regulados necesitan [Data Access Control][2]. Data Access Control le permite crear restricciones a nivel de fila en sus datos, definidas por valores de etiqueta, y aplicadas en cada visualización donde esos datos puedan aparecer.

Esta sección le ayuda a identificar sus patrones de confidencialidad de datos y a elegir el enfoque correcto para restringir el acceso.

## Identificación de sus patrones de sensibilidad de datos {#identifying-your-data-sensitivity-patterns}

Para las restricciones de datos sensibles, existen tres patrones comunes. Puede usar uno o una combinación de los tres.

### Patrón 1: Basado en el tipo de datos {#pattern-1-based-on-the-type-of-data}

Todos los datos de un tipo determinado son sensibles, independientemente de su origen.

*Por ejemplo, los usuarios con privilegios bajos nunca deberían poder visualizar datos de Logs porque siempre contienen información sensible. O un contratista no debería tener acceso a las sesiones de RUM porque pueden contener PII de usuarios finales.*

**Enfoque recomendado:** Cree un [rol personalizado][3] sin los permisos de lectura pertinentes. Asigne ese rol a cualquier usuario, como contratistas externos, que no deba poder visualizar ese tipo de datos en absoluto. Esta es una restricción a nivel de permisos, no una restricción de Data Access Control.

### Patrón 2: Basado en el servicio, la infraestructura o el propietario {#pattern-2-based-on-the-service-infrastructure-or-owner}

La sensibilidad de los datos se determina por quién o qué produce los datos, no por el tipo de datos en sí. Algunos servicios o componentes de infraestructura generan datos que deberían restringirse a Teams específicos.

*Por ejemplo, un servicio de procesamiento de pagos genera trazas de APM, Logs y datos de RUM que solo deberían ser visibles para el Payments Team y los administradores sénior. Toda la telemetría de ese servicio es sensible, independientemente del tipo.*

**Enfoque recomendado:** Utilice [Data Access Control][2] para crear conjuntos de datos restringidos basados en la etiqueta (como `service:payment-processor`) en los tipos de telemetría relevantes. Asigne el acceso al Teams responsable y a cualquier otro rol o Teams autorizado.

### Patrón 3: Basado en clases de datos protegidos dentro de un servicio {#pattern-3-based-on-protected-classes-of-data-within-a-service}

Los datos confidenciales se mezclan con datos no confidenciales de la misma fuente y tipo de telemetría. Esto es común en industrias reguladas donde solo ciertos registros dentro de un flujo de datos son confidenciales.

*Por ejemplo, en una organización de atención médica, un servicio puede generar registros operativos de rutina que pueden ser vistos por cualquier persona en la organización, junto con datos protegidos por HIPAA que deben restringirse. O en una institución financiera, los datos comerciales en APM, registros y RUM deben restringirse a usuarios aprobados por cumplimiento, mientras que los datos generales de infraestructura del mismo entorno son ampliamente accesibles.*

**Enfoque recomendado:** Utilice Data Access Control para crear conjuntos de datos restringidos basados en una etiqueta de clasificación (como `data_sensitivity:hipaa` o `data_classification:trading`) en los tipos de telemetría afectados. Asigne el acceso a los roles o Teams autorizados para visualizar esa clase de datos.

## Sensitive Data Scanner {#sensitive-data-scanner}

[Sensitive Data Scanner][4] proporciona una red de seguridad automatizada para situaciones en las que aparecen datos sensibles de forma impredecible. Por ejemplo, los desarrolladores pueden registrar inadvertidamente números de tarjetas de crédito, direcciones de correo electrónico o números de seguridad social.

Sensitive Data Scanner es útil como medida de defensa en profundidad junto con Data Access Control, especialmente cuando no se puede garantizar que los datos sensibles se etiqueten de forma coherente durante la ingesta.

## Elección de la configuración de acceso para datos fuera de los conjuntos de datos restringidos {#choosing-the-access-setting-for-data-outside-restricted-datasets}

Utilice la configuración predeterminada **Unrestricted** para aplicar restricciones de forma progresiva: todos los datos son visibles de forma predeterminada y usted crea conjuntos de datos restringidos para limitar el acceso a datos específicos. Este modelo funciona bien cuando los datos sensibles son la excepción, no la regla.

Para organizaciones con requisitos normativos estrictos (por ejemplo, defensa) u organizaciones que colaboran con múltiples socios comerciales externos en el mismo inquilino de Datadog, Datadog ofrece la [**Restricted**][6] para datos que no están en conjuntos de datos restringidos. Con esta configuración, los datos están ocultos de forma predeterminada y los usuarios solo pueden visualizar los datos a los que se les ha otorgado acceso explícitamente. En lugar de restringir el subconjunto sensible, debe permitir explícitamente el acceso a todo.

La configuración **Restricted** es la excepción, no la regla. Úselo solo si su marco normativo o legal exige un modelo de denegación predeterminada para el acceso a la telemetría.

## Recomendaciones {#recommendations}

- **Identifique qué patrón se aplica a usted** antes de crear conjuntos de datos. Muchas organizaciones utilizan el Patrón 2 (restricciones basadas en servicios) como su modelo principal, con el Patrón 1 (restricciones basadas en tipos a través de roles) como complemento.
- **Use etiquetas de manera consistente.** Las restricciones de Access Control a datos son tan buenas como su etiquetado. Asegúrese de que los servicios, la infraestructura y las clasificaciones de datos estén etiquetados de manera consistente en la ingesta. Trabaje con su estrategia de etiquetado (consulte la [Guía del administrador][5]) para ayudar a garantizar que las etiquetas correctas estén presentes.
- **Comience con sus datos más sensibles.** No intente crear conjuntos de datos para todo a la vez. Identifique los 3 a 5 servicios o clases de datos más sensibles y restrinja esos primero.
- **Mantenga la configuración predeterminada Unrestricted** a menos que tenga una razón normativa para restringir los datos fuera de los conjuntos de datos. La denegación predeterminada crea una carga operativa significativa y solo debe usarse cuando el entorno normativo lo exija.
- **Combine Data Access Control con Sensitive Data Scanner** como una medida de defensa en profundidad, especialmente para Logs.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/access_for_enterprises/protecting_assets/
[2]: /es/account_management/rbac/data_access
[3]: /es/getting_started/access_for_enterprises/permissions/#custom-roles
[4]: /es/sensitive_data_scanner/
[5]: /es/administrators_guide/plan/#resource-tagging
[6]: /es/account_management/rbac/data_access/#strict-mode