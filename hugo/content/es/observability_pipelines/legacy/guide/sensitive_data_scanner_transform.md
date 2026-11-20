---
aliases:
- /es/observability_pipelines/guide/sensitive_data_scanner_transform/
disable_toc: false
further_reading:
- link: /observability_pipelines/legacy/setup/
  tag: Documentación
  text: Configurar Observability Pipelines
- link: /observability_pipelines/legacy/working_with_data/
  tag: Documentación
  text: Trabajar con datos en Observability Pipelines
is_beta: true
private: true
title: (LEGACY) Transformación Sensitive Data Scanner
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSfnNnV823zAgOCowCYuXJE5cDtRqIipKsYcNpaOo1LKpGfppA/viewform" btn_hidden="false" header="Request Access!">}}
La transformación <code>sensitive_data_scanner</code> está en fase beta privada.
{{< /callout >}}

## Información general

Los datos confidenciales, como números de tarjetas de crédito, números de ruta bancaria y claves de API, pueden revelarse involuntariamente en tus logs, lo que puede exponer tu organización a riesgos financieros y de privacidad. Utiliza la transformación `sensitive_data_scanner` de Observability Pipelines para identificar, etiquetar y, opcionalmente, enmascarar o aplicar hash a la información confidencial, antes de enrutar los datos a diferentes destinos. Puedes utilizar reglas de análisis predefinidas para detectar patrones comunes como direcciones de correo electrónico, números de tarjetas de crédito, claves de API, tokens de autorización, etc. O bien, puedes crear reglas de análisis personalizadas utilizando regex (patrones de expresiones regulares) para buscar coincidencias de informaciones confidenciales.

## Configurar la transformación `sensitive_data_scanner` 

1. Ve a [Observability Pipelines][1].
1. Haz clic en tu pipeline.
1. Haz clic en **Edit as Draft** (Editar como borrador).
1. Haz clic en **+ Add Component** (+ Añadir componente).
1. Selecciona la pestaña **Transformaciones**.
1. Haz clic en el cuadro **Sensitive Data Scanner**.
1. Introduce un nombre para el componente.
1. Selecciona una o varias entradas para la transformación.
1. Haz clic en **Add a New Item** (Añadir un nuevo elemento) para añadir una regla de análisis que determina la información confidencial que debe coincidir con los datos.
1. Introduce un nombre para la regla.
1. En la sección **Definir acción en caso de coincidencia**, selecciona la acción que quieres realizar con la información coincidente. Las acciones de enmascaramiento, enmascaramiento parcial y hash de datos son irreversibles.
    - Si estás enmascarando la información, especifica el texto que sustituirá a los datos coincidentes.
    - Si estás enmascarando parcialmente la información, especifica el número de caracteres que quieres enmascarar y qué parte de los datos coincidentes quieres enmascarar.
    - **Nota:** Si seleccionas el hash, los bytes UTF-8 de la coincidencia utilizan el hash con la huella digital de 64 bits de farmhash.
1. En la sección **Patrón**:
    - Para crear una regla de análisis personalizada:  
        a. Selecciona **Personalizado** en el menú desplegable **Tipo**.
        b. En el campo **Definir regex**, introduce el patrón regex para analizar los datos. Para obtener más información, consulta [Uso de regex para reglas personalizadas](#using-regex-for-custom-rules).
    - Para utilizar una regla de análisis predefinida:
        a. Selecciona **Biblioteca** en el menú desplegable **Tipo**.
        b. Selecciona la regla de análisis que quieres utilizar en el menú desplegable **Nombre**.
1. En la sección **Analizar todo el evento o parte de él**:  
    a. Selecciona si quieres analizar el **Todo el evento** o **Atributos específicos** en el menú desplegable **Destino**.
    - Si estás analizando todo el evento, también puedes optar por excluir atributos del análisis.
    - Si estás analizando atributos específicos, especifica qué atributos quieres analizar.
1. También puedes añadir una o más etiquetas (tags) para asociarlas a los eventos coincidentes.
1. Si quieres añadir otra regla, haz clic en **Add a New Item** (Añadir un nuevo elemento) y sigue los pasos del 10 al 14.
1. Haz clic en **Save** (Guardar).

**Nota**: Cualquier regla que añadas o actualices sólo afectará a los datos que lleguen a Observability Pipelines después de que se haya definido la regla.

### Uso de regex para reglas personalizadas

La transformación `sensitive_data_scanner` admite expresiones regulares compatibles con Perl (PCRE2), pero los siguientes patrones no son compatibles:
  - Backreferences y captura de subexpresiones (lookarounds)
  - Afirmaciones de espacio de ancho cero arbitrarias
  - Referencias a subrutinas y patrones recursivos
  - Patrones condicionales
  - Verbos de control del backtracking
  - Directiva \C "single-byte" (que rompe las secuencias UTF-8)
  - Coincidencia de nueva línea \R
  - Directiva \K de reinicio de coincidencia
  - Llamadas y código integrado
  - Agrupación atómica y cuantificadores posesivos

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines