---
aliases:
- /es/llm_observability/data_privacy_security_and_rbac/
- /es/llm_observability/data_security_and_rbac/
description: Controle el acceso a datos confidenciales de Agent Observability con
  controles de acceso a datos y RBAC, redacte datos con procesadores de tramos y conozca
  cuánto tiempo conserva Agent Observability cada tipo de datos.
further_reading:
- link: /account_management/rbac/data_access
  tag: Documentación
  text: Obtenga más información sobre los controles de acceso a datos
- link: /llm_observability/improve/datasets/
  tag: Documentación
  text: Trabaje con conjuntos de datos y versiones de conjuntos de datos
- link: /data_security/data_retention_periods/
  tag: Documentación
  text: Consulte los períodos de retención de datos predeterminados en los productos
    de Datadog
- link: https://www.datadoghq.com/pricing/?product=llm-observability#products
  tag: Precios
  text: Precios de Agent Observability
title: Gobernanza de datos
---
{{< whatsnext desc=" ">}}
  {{< nextlink href="https://datadoghq.com/legal/hipaa-eligible-services">}}<u>Servicios elegibles para HIPAA</u>: lista de servicios elegibles para HIPAA de Datadog Legal{{< /nextlink >}}
{{< /whatsnext >}}

## Data Access Control {#data-access-control}

Agent Observability le permite restringir el acceso a datos potencialmente confidenciales asociados con sus aplicaciones de IA solo a ciertos equipos y roles en su organización. Esto es particularmente importante cuando sus aplicaciones de IA procesan información confidencial, como datos personales, información comercial patentada o interacciones confidenciales de los usuarios.

Los controles de acceso en Agent Observability se basan en la función [Data Access Control][11] de Datadog, que le permite regular el acceso a los datos considerados confidenciales. Puede usar la etiqueta `ml_app` para identificar y restringir el acceso a aplicaciones de IA específicas dentro de su organización.

También puede restringir proyectos individuales de Agent Observability, incluidos sus experimentos, conjuntos de datos, registros de conjuntos de datos y colas de anotación. Consulte [Data Access Control in Agent Observability][14].

## Redacción de datos con procesadores de tramos {#redacting-data-with-span-processors}

Puede redactar o modificar datos confidenciales a nivel de aplicación antes de que se envíen a Datadog. Utilice procesadores de tramos en el SDK de Agent Observability para modificar condicionalmente los datos de entrada y salida en los tramos, o evitar que los tramos se emitan por completo.

Esto es útil para:
- Eliminar información confidencial de prompts o respuestas
- Filtrar flujos de trabajo internos o datos de prueba
- Redactar datos condicionalmente según etiquetas u otros criterios

Para obtener ejemplos de implementación detallados y patrones de uso, consulte la [sección de procesamiento de tramos en la referencia del SDK][12].

## Integración de Sensitive Data Scanner {#sensitive-data-scanner-integration}

Agent Observability se integra con [Sensitive Data Scanner][13], lo que ayuda a prevenir la fuga de datos al identificar y redactar cualquier información confidencial (como datos personales, detalles financieros o información de propiedad exclusiva) que pueda estar presente en cualquier paso de su aplicación de IA.

Al escanear proactivamente en busca de datos confidenciales, Agent Observability ayuda a garantizar que las conversaciones permanezcan seguras y cumplan con las regulaciones de protección de datos. Esta capa adicional de seguridad refuerza el compromiso de Datadog de mantener la confidencialidad e integridad de las interacciones de los usuarios con sus aplicaciones de IA.

## Retención de datos {#data-retention}

Los períodos de retención en Agent Observability dependen del tipo de datos y de su plan. Las trazas de sus aplicaciones instrumentadas siguen el período de retención de tramos de su plan, mientras que los experimentos, datasets y prompts tienen sus propios períodos.

| Datos                                         | Período de retención                                                                          |
| -------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Trazas y tramos                             | 15 días; 30, 60 o 90 días con un complemento de retención                                       |
| Experimentos                                  | Plan gratuito y planes bajo demanda: 15 días. Planes comprometidos: 90 días. Con un complemento de retención: 6, 9 o 12 meses |
| Interacciones anotadas y etiquetas            | 90 días desde el momento de la anotación, o su período de retención de tramos si es más largo      |
| Registros de conjuntos de datos                              | Versión actual: 3 años. Versiones anteriores: 90 días, se reinicia cuando se usan                     |
| Prompts en el registro de prompts               | 3 años, se extiende cada vez que se extrae el prompt                                          |
| `ml_obs.*` métricas                           | 15 meses                                                                                 |

### Trazas y tramos {#traces-and-spans}

Las trazas y tramos de sus aplicaciones instrumentadas se retienen durante **15 días** en todos los planes de forma predeterminada. Esto se aplica a todo lo almacenado en el tramo, incluidos los datos operativos por tramo, como costos, recuentos de tokens, latencia y errores, así como las puntuaciones de evaluación adjuntas a los tramos.

Un complemento de retención extiende esto a **30, 60 o 90 días**. Los complementos no están disponibles en el nivel gratuito. Consulte [Cambiar su periodo de retención](#changing-your-retention-period).

La retención se aplica a los tramos sin procesar que consulta en el Trace Explorer. Las métricas derivadas de esos tramos se retienen por separado, durante más tiempo. Consulte [Métricas](#metrics).

### Experimentos {#experiments}

En los planes comprometidos, los [experimentos][3] se retienen durante más tiempo que los tramos de producción.

| Plan                                | Retención de experimentos |
| ----------------------------------- | -------------------- |
| Nivel gratuito                        | 15 días              |
| Bajo demanda                          | 15 días              |
| Comprometido (mensual o anual)        | 90 días              |
| Complemento de retención de 30 días   | 6 meses              |
| Complemento de retención de 60 días   | 9 meses              |
| Complemento de retención de 90 días   | 12 meses             |

Si su organización tiene un contrato personalizado, es posible que sus periodos de retención no coincidan con esta tabla. Comuníquese con su representante de cuenta de Datadog para confirmar sus periodos.

### Cambiar su periodo de retención {#changing-your-retention-period}

La duración de la retención afecta su facturación, ya que un periodo más largo significa que Datadog almacena más datos suyos. Para conocer las tarifas, consulte la [página de precios de Agent Observability][10].

Los complementos de retención se gestionan a través de su equipo de cuenta en lugar de habilitarse desde la interfaz de usuario de Datadog. Para solicitar un período de retención más largo, comuníquese con su representante de cuenta de Datadog o con el [soporte de Datadog][1].

Cuando agrega o extiende un complemento de retención, el período más largo se aplica **retroactivamente a cada tramo que aún no haya expirado**. Los tramos que expiraron bajo su período anterior no son recuperables.

Por ejemplo, si tiene la retención predeterminada de 15 días y agrega un complemento de 60 días hoy, los tramos de los últimos 15 días adoptan el período de 60 días, pero todo lo anterior ya desapareció.

Cuando cambia a un período de retención más corto, los tramos anteriores al nuevo período ya no están disponibles.

### Interacciones anotadas {#annotated-interactions}

Anotar una interacción extiende su retención. Cuando aplica una etiqueta de anotación o una nota a una traza, un tramo o una sesión —ya sea directamente o a través de una [cola de anotaciones][2]— Datadog retiene la interacción anotada durante **90 días** a partir del momento de la anotación, incluso si su período de retención de tramos es más corto. Anotar un tramo retiene toda su traza principal, y anotar una traza que pertenece a una sesión retiene toda la sesión.

Las etiquetas de anotación se retienen durante el mismo período que las interacciones que anotan.

Extender la retención mediante la anotación de una interacción no genera un cargo adicional.

### Registros de conjuntos de datos {#dataset-records}

Los registros en la versión actual de un [conjunto de datos][4] se retienen durante **3 años**, independientemente de su período de retención de tramos.

Los registros en versiones anteriores de un conjunto de datos se retienen durante **90 días**. Este período se restablece cada vez que se utiliza una versión anterior; por ejemplo, cuando un experimento lee esa versión. Después de 90 días consecutivos sin uso, una versión anterior se vuelve elegible para su eliminación permanente. Para obtener más detalles, consulte [Dataset versioning][5].

### Prompts {#prompts}

Los prompts en el [prompt registry][9] se retienen durante **3 años**. Este período se extiende cada vez que su aplicación solicita el prompt, por lo que un prompt en uso activo permanece disponible. Un prompt que no se solicita durante 3 años se vuelve elegible para su eliminación permanente.

### Métricas {#metrics}

Las `ml_obs.*` métricas generadas a partir de sus tramos son [métricas de Datadog][6] estándar y siguen la [retención de métricas estándar de Datadog][7]: 15 meses con granularidad completa. Se conservan según este cronograma independientemente de su período de retención de tramos, por lo que puede crear paneles y monitores a largo plazo sobre recuentos de tramos, uso de tokens, costo, latencia y tasas de error incluso después de que los tramos subyacentes expiren.

Para obtener la lista completa de métricas disponibles, consulte [Agent Observability metrics][8].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: /es/llm_observability/investigate/annotation_queues/
[3]: /es/llm_observability/improve/experiments/
[4]: /es/llm_observability/improve/datasets/
[5]: /es/llm_observability/improve/datasets/#dataset-versioning
[6]: /es/metrics/
[7]: /es/data_security/data_retention_periods/
[8]: /es/llm_observability/investigate/metrics/
[9]: /es/llm_observability/configure/prompt_management/
[10]: https://www.datadoghq.com/pricing/?product=llm-observability#products
[11]: /es/account_management/rbac/data_access
[12]: /es/llm_observability/instrument/sdk/#span-processing
[13]: /es/security/sensitive_data_scanner/
[14]: /es/llm_observability/improve/access_control/