---
title: Reglas de análisis estático
description: Consulta reglas de varios lenguajes para el análisis estático.
aliases:
- /continuous_integration/static_analysis/rules
- /static_analysis/rules
is_beta: false
type: static-analysis
rulesets:
  csharp-best-practices:
    title: "Prácticas recomendadas para C#"
    description: |
      Reglas para aplicar las prácticas recomendadas de C#.
  csharp-code-style:
    title: "Seguir los patrones del estilo de código de C#"
    description: |
      Reglas para aplicar el código de estilo de C#.
  csharp-inclusive:
    title: "Usar lenguaje inclusivo en C#"
    description: |
      Reglas para que tu código de C# sea más inclusivo.
  csharp-security:
    title: "Escribir código de C# seguro y protegido"
    description: |
      Reglas centradas en encontrar problemas de seguridad en tu código de C#.
  docker-best-practices:
    title: Seguir las prácticas recomendadas con el uso de Docker
    description: |
      Prácticas recomendadas para el uso de Docker.
  github-actions:
    title: Proteger las GitHub Actions
    description: |
      Reglas para verificar tus GitHub Actions y detectar patrones inseguros, como permisos o fijación de versiones.
  go-best-practices:
    title: Prácticas recomendadas para Go
    description: |
      Reglas para que sea más rápido y sencillo escribir código de Go. Desde el estilo de código hasta la prevención de errores, este conjunto de reglas ayuda a los desarrolladores a escribir código de Go eficiente, fácil de mantener y de alto rendimiento.
  go-inclusive:
    title: Usar lenguaje inclusivo en Go
    description: |
      Verifica el código de Go para detectar problemas de redacción.
  go-security:
    title: Garantizar que el código de Go esté protegido y seguro
    description: |
      Detecta problemas de seguridad comunes (como la inyección de SQL, XSS o inyección de shell) en tu base de código de Go.
  java-best-practices:
    title: Seguir las prácticas recomendadas en Java
    description: |
      Reglas para aplicar las prácticas recomendadas de Java.
  java-code-style:
    title: Seguir los patrones del estilo de código de Java
    description: |
      Reglas para aplicar el código de estilo de Java.
  java-inclusive:
    title: Usar lenguaje inclusivo en Java
    description: |
      Reglas de Java para evitar redactar textos inadecuados en el código y los comentarios.
  java-security:
    title: Garantizar que el código de Java sea seguro
    description: |
      Reglas centradas en encontrar problemas de seguridad en código de Java.
  javascript-best-practices:
    title: Seguir las mejores prácticas para escribir código de JavaScript
    description: |
      Reglas para aplicar las prácticas recomendadas de JavaScript.
  javascript-browser-security:
    title: Reglas de seguridad para aplicaciones web de JavaScript
    description: |
      Reglas centradas en encontrar problemas de seguridad en tus aplicaciones web de JavaScript.
  javascript-code-style:
    title: Aplicar el estilo de código de JavaScript
    description: |
      Reglas para aplicar el código de estilo de JavaScript.
  javascript-common-security:
    title: Reglas de seguridad comunes para JavaScript
    description: |
      Reglas centradas en encontrar problemas de seguridad en tu código de JavaScript.
  javascript-express:
    title: Consultar las prácticas recomendadas y seguridad de Express.js
    description: |
      Reglas específicas para las prácticas recomendadas y seguridad de Express.js.
  javascript-inclusive:
    title: Verifica el código de JavaScript para detectar problemas de redacción.
    description: |
      Reglas de JavaScript para evitar redactar textos inadecuados en el código y los comentarios.
  javascript-node-security:
    title: Identificar posibles puntos críticos de seguridad en Node
    description: |
      Reglas para identificar posibles puntos críticos de seguridad en Node. Esto puede incluir falsos positivos que requieren una evaluación más exhaustiva.
  jsx-react:
    title: Reglas de linting específicas de React
    description: |
      Este complemento exporta una configuración `recommended` que aplica las prácticas recomendadas de React.
  kotlin-best-practices:
    title: Seguir las mejores prácticas para escribir código de Kotlin
    description: |
      Reglas para aplicar las prácticas recomendadas de Kotlin.
  kotlin-code-style:
    title: Aplicar el estilo de código de Kotlin
    description: |
      Reglas para aplicar el código de estilo de Kotlin.
  php-best-practices:
    title: Seguir las mejores prácticas para escribir código de PHP
    description: |
      Reglas para aplicar las prácticas recomendadas de PHP, mejorar el estilo de código, prevenir errores, y promover un código de PHP de alto rendimiento, fácil de mantener y eficiente.
  php-code-style:
    title: Aplicar el estilo de código de PHP
    description: |
      Reglas para aplicar el código de estilo de PHP.
  php-security:
    title: Reglas de seguridad para PHP
    description: |
      Reglas centradas en encontrar problemas de seguridad en tu código de PHP.
  python-best-practices:
    title: Seguir las mejores prácticas para escribir código de Python
    description: |
      Prácticas recomendadas de Python para escribir código eficiente y sin errores.
  python-code-style:
    title: Aplicar el estilo de código de Python
    description: |
      Reglas para aplicar el código de estilo de Python.
  python-design:
    title: Verificar la estructura de programa de Python
    description: |
      Reglas para verificar la estructura de programa de Python, incluido cosas como bucles anidados.
  python-django:
    title: Consultar las prácticas recomendadas y seguridad de Django
    description: |
      Reglas específicas para las prácticas recomendadas y seguridad de Django.
  python-flask:
    title: Consultar las prácticas recomendadas y seguridad de Flask
    description: |
      Reglas específicas para las prácticas recomendadas y seguridad de Flask.
  python-inclusive:
    title: Verifica el código de Python para detectar problemas de redacción.
    description: |
      Reglas de Python para evitar redactar textos inadecuados en el código y los comentarios.
  python-pandas:
    title: Prácticas recomendadas para la ciencia de datos con pandas
    description: |
      Un conjunto de reglas para verificar que el código de pandas se use de forma adecuada.

       - Garantiza que las declaraciones `import` sigan las pautas de codificación.
       - Evita códigos y métodos obsoletos.
       - Evita el código ineficiente siempre que sea posible.
  python-security:
    title: Garantizar que el código de Python esté protegido y seguro
    description: |
      Reglas centradas en encontrar problemas de seguridad y vulnerabilidad en tu código de Python, incluidos aquellos que se encuentran en OWASP10 y SANS25.

       - Uso de protocolos de cifrado y hash incorrectos
       - Falta de control de acceso
       - Configuración errónea de seguridad
       - Inyecciones de SQL
       - Credenciales codificadas
       - Inyección de shell
       - Deserialización insegura
  rails-best-practices:
    title: Patrones ampliamente adoptados por la comunidad de Ruby on Rails
    description: |
      Prácticas recomendadas para escribir código de Ruby on Rails.
  ruby-best-practices:
    title: Seguir las prácticas recomendadas en Ruby
    description: |
      Reglas para aplicar las prácticas recomendadas de Ruby.
  ruby-code-style:
    title: Reglas para aplicar el código de estilo de Ruby.
    description: |
      Reglas de análisis de código para escribir reglas de Ruby que sigan estándares de codificación establecidos.
  ruby-inclusive:
    title: Reglas para código de Ruby inclusivo
    description: |
      Escribir código de Ruby inclusivo
  ruby-security:
    title: Reglas de seguridad para Ruby
    description: |
      Reglas centradas en encontrar problemas de seguridad en tu código de Ruby.
  terraform-aws:
    title: Terraform AWS
    description: |
      Reglas a fin de aplicar las prácticas recomendadas de Terraform para AWS.
  tsx-react:
    title: Calidad del código de TypeScript con React
    description: |
      Este complemento exporta una configuración `recommended` que aplica las prácticas recomendadas de React.
  typescript-best-practices:
    title: Seguir las mejores prácticas para escribir código de TypeScript
    description: |
      Reglas para aplicar las prácticas recomendadas de TypeScript.
  typescript-browser-security:
    title: Reglas de seguridad para aplicaciones web de TypeScript
    description: |
      Reglas centradas en encontrar problemas de seguridad en tus aplicaciones web de TypeScript.
  typescript-code-style:
    title: Patrones de código con opiniones de TypeScript
    description: |
      Reglas que se consideran las prácticas recomendadas para las bases de código de TypeScript modernas, pero que no afectan la lógica del programa. Por lo general, estas reglas tienen como objetivo aplicar patrones de código más simples.
  typescript-common-security:
    title: Reglas de seguridad comunes para TypeScript
    description: |
      Reglas centradas en encontrar problemas de seguridad en tu código de TypeScript.
  typescript-express:
    title: Consultar las prácticas recomendadas y seguridad de Express.js con TypeScript
    description: |
      Reglas específicas para las prácticas recomendadas y seguridad de Express.js con TypeScript.
  typescript-inclusive:
    title: Verifica el código de TypeScript para detectar problemas de redacción.
    description: |
      Reglas de TypeScript para evitar redactar textos inadecuados en el código y los comentarios.
  typescript-node-security:
    title: Identificar posibles puntos críticos de seguridad en Node
    description: |
      Reglas para identificar posibles puntos críticos de seguridad en Node. Esto puede incluir falsos positivos que requieren una evaluación más exhaustiva.
cascade:
  modal:
    title: Probar esta regla y analizar el código con Datadog Code Analysis
    top_box:
      title: Cómo usar esta regla
      steps:
        - Crea un static-analysis.datadog.yml con el contenido anterior en la raíz de tu repositorio
        - Usa nuestros complementos de IDE gratuitos o añade escaneos de Code Analysis a tus pipelines de CI
        - Recibe comentarios sobre tu código
      footer: Para obtener más información, lee la <a href="/code_analysis">documentación de Code Analysis</a>
    bottom_boxes:
      - title: Extensión de VS Code
        icon: vscode
        subtitle: Identifica vulnerabilidades del código directamente en tu editor de</br>VS Code
        cta_title: Descargar extensión
        cta_url: "https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode"
      - title: Complemento de JetBrains
        icon: jetbrains
        subtitle: Identifica vulnerabilidades del código directamente en los productos de</br>JetBrains
        cta_title: Descargar complemento
        cta_url: "https://plugins.jetbrains.com/plugin/19495-datadog"
    footer:
      text: Usa Datadog Code Analysis para detectar problemas de código en cada paso de tu proceso de desarrollo
      link:
        name: Datadog Code Analysis
        url: "https://www.datadoghq.com/code-analysis/"

  banner:
    title: <span>Integraciones perfectas.</span> Prueba Datadog Code Analysis
    link:
      name: Datadog Code Analysis
      url: "https://www.datadoghq.com/code-analysis/"

further_reading:
  - link: /code_analysis/
    tag: Documentación
    text: Más información sobre Datadog Code Analysis
---

{{< callout url="#" btn_hidden="true" header="¡Obtén la versión preliminar!" >}}
Code Analysis se encuentra en versión preliminar.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Analysis no se encuentra disponible para el sitio {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

## Información general

El análisis estático de Datadog proporciona reglas listas para usar que ayudan a detectar infracciones en los pipelines de CI/CD en las revisiones de código e identifican errores, problemas de seguridad y mantenimiento. Para obtener más información, consulta la [documentación de configuración][1].

[1]: /code_analysis/static_analysis/setup
