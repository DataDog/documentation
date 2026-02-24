---
further_reading:
- link: /account_management/rbac/data_access
  tag: Documentación
  text: Más información sobre los controles de acceso a los datos
title: Seguridad de datos y RBAC
---
{{< whatsnext desc=" ">}}
  {{< nextlink href="https://datadoghq.com/legal/hipaa-eligible-services">}}<u>Servicios elegibles para la HIPAA</u>: lista legal de Datadog de los servicios elegibles para la HIPAA{{< /nextlink >}}
{{< /whatsnext >}}

## Control de acceso a los datos

{{< callout url="#" header="false" btn_hidden="true">}}
  El control de acceso a datos está en Disponibilidad limitada.
{{< /callout >}}

LLM Observability te permite restringir el acceso a datos potencialmente confidenciales asociados a tus aplicaciones de ML solo a determinados equipos y roles de tu organización. Esto es especialmente importante cuando tus aplicaciones LLM procesan información confidencial, como datos personales, información empresarial privada o interacciones confidenciales entre usuarios.

Los controles de acceso en LLM Observability se basan en la función [Control de acceso de datos][1] de Datadog, que permite regular el acceso a datos considerados confidenciales. Puedes utilizar la etiqueta `ml_app` para identificar y restringir el acceso a aplicaciones LLM específicas dentro de tu organización.

## Redactar datos con procesadores de tramo

Puedes redactar o modificar datos confidenciales a nivel de aplicación antes de que se envíen a Datadog. Utiliza los procesadores de tramo en el kit de desarrollo de software (SDK) de LLM Observability para modificar condicionalmente los datos de entrada y salida en los tramos, o evitar que los tramos se emitan por completo.

Esto es útil para:
- Eliminación de información confidencial de las preguntas o respuestas
- Filtrar flujos de trabajo internos o datos de test
- Redacción condicional de datos en función de etiquetas u otros criterios

Para ver ejemplos detallados de implementación y patrones de uso, consulta la sección [Procesamiento de tramos en la Referencia del SDK][2].

## Integración de Sensitive Data Scanner

LLM Observability se integra con [Sensitive Data Scanner][3], que ayuda a evitar la filtración de datos identificando y redactando cualquier información confidencial (como datos personales, detalles financieros o información de propiedad) que pueda estar presente en cualquier paso de tu aplicación de LLM.

Al escanear de forma proactiva los datos confidenciales, LLM Observability garantiza que las conversaciones permanezcan seguras y cumplan con las normas de protección de datos. Esta capa adicional de seguridad refuerza el compromiso de Datadog de mantener la confidencialidad y la integración de las interacciones de los usuarios con LLM.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/data_access
[2]: /es/llm_observability/instrumentation/sdk/#span-processing
[3]: /es/security/sensitive_data_scanner/