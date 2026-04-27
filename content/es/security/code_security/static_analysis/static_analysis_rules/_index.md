---
aliases:
- /es/continuous_integration/static_analysis/rules
- /es/static_analysis/rules
- /es/code_analysis/static_analysis_rules
- /es/security/code_security/static_analysis_rules
cascade:
  banner:
    link:
      name: Datadog Code Security
      url: https://www.datadoghq.com/product/code-security/
    title: <span>Integraciones sin inconvenientes.</span> Prueba Datadog Code Security
  modal:
    bottom_boxes:
    - cta_title: Descargar Extensión
      cta_url: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
      icon: vscode
      subtitle: Identifica vulnerabilidades de código directamente en tu</br>editor
        de VS Code
      title: Extensión de VS Code
    - cta_title: Descargar Plugin
      cta_url: https://plugins.jetbrains.com/plugin/19495-datadog
      icon: jetbrains
      subtitle: Identifica vulnerabilidades de código directamente en</br>productos
        de JetBrains
      title: Plugin de JetBrains
    footer:
      link:
        name: Datadog Code Security
        url: https://www.datadoghq.com/product/code-security/
      text: Utiliza Datadog Code Security para detectar problemas de código en cada
        paso de tu proceso de desarrollo
    title: Prueba esta regla y analiza tu código con Datadog Code Security
    top_box:
      footer: For more information, please read the <a href="/security/code_security/">Code
        Security documentation</a>
      steps:
      - Create a static-analysis.datadog.yml with the content above at the root of
        your repository
      - Use our free IDE Plugins or add Code Security scans to your CI pipelines
      - Get feedback on your code
      title: Cómo utilizar esta regla
description: Consulta reglas para múltiples lenguajes para Análisis Estático de Código.
further_reading:
- link: /security/code_security/
  tag: Documentation
  text: Conoce sobre Datadog Code Security
is_beta: false
rulesets:
  apex-code-style:
    description: 'Reglas de Datadog Code Security para escribir reglas Apex que sigan
      estándares de codificación establecidos.

      '
    title: Reglas para hacer cumplir el estilo de código Apex y las mejores prácticas.
  apex-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en tu código
      Apex.

      '
    title: Reglas de seguridad para Apex
  bash-code-quality:
    description: 'Reglas para hacer cumplir la calidad del código en scripts de Bash.

      '
    title: Reglas de calidad de código para scripts de Bash.
  bash-security:
    description: 'Reglas para hacer cumplir las mejores prácticas de seguridad para
      scripts de Bash.

      '
    title: Reglas de seguridad para scripts de Bash
  csharp-best-practices:
    description: 'Reglas para hacer cumplir las mejores prácticas de C#.

      '
    title: Mejores prácticas para C#
  csharp-code-style:
    description: 'Reglas para hacer cumplir el estilo de código de C#.

      '
    title: Sigue los patrones de estilo de código de C#
  csharp-inclusive:
    description: 'Reglas para hacer que tu código C# sea más inclusivo.

      '
    title: Utiliza un lenguaje inclusivo en C#
  csharp-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en tu código
      C#.

      '
    title: Escribe código C# seguro y protegido
  docker-best-practices:
    description: 'Mejores prácticas para usar Docker.

      '
    title: Sigue las mejores prácticas al usar Docker
  github-actions:
    description: 'Reglas para revisar tus GitHub Actions y detectar patrones inseguros,
      como permisos o fijación de versiones.

      '
    title: Asegura tus GitHub Actions
  go-best-practices:
    description: 'Reglas para hacer que escribir código Go sea más rápido y fácil.
      Desde el estilo de código hasta la prevención de errores, este conjunto de reglas
      ayuda a los desarrolladores a escribir código Go eficiente, mantenible y de
      alto rendimiento.

      '
    title: Mejores prácticas para Go
  go-inclusive:
    description: 'Revisa el código Go en busca de problemas de redacción.

      '
    title: Utiliza un lenguaje inclusivo en Go
  go-security:
    description: 'Detecta problemas de seguridad comunes (como inyección SQL, XSS
      o inyección de shell) en tu base de código Go.

      '
    title: Asegura que tu código Go sea seguro y protegido
  java-best-practices:
    description: 'Reglas para hacer cumplir las mejores prácticas de Java.

      '
    title: Sigue las mejores prácticas en Java.
  java-code-style:
    description: 'Reglas para hacer cumplir el estilo de código de Java.

      '
    title: Sigue los patrones de estilo de código de Java.
  java-inclusive:
    description: 'Reglas para Java para evitar un lenguaje inapropiado en el código
      y los comentarios.

      '
    title: Utiliza un lenguaje inclusivo en Java.
  java-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en el código
      de Java.

      '
    title: Asegúrate de que tu código de Java sea seguro.
  javascript-best-practices:
    description: 'Reglas para hacer cumplir las mejores prácticas de JavaScript.

      '
    title: Sigue las mejores prácticas para escribir código JavaScript.
  javascript-browser-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en tus aplicaciones
      web de JavaScript.

      '
    title: Reglas de seguridad para aplicaciones web de JavaScript.
  javascript-code-style:
    description: 'Reglas para hacer cumplir el estilo de código de JavaScript.

      '
    title: Haz cumplir el estilo de código de JavaScript.
  javascript-common-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en tu código
      de JavaScript.

      '
    title: Reglas de seguridad comunes para JavaScript.
  javascript-express:
    description: 'Reglas específicamente para las mejores prácticas y seguridad de
      Express.js.

      '
    title: Verifica las mejores prácticas y la seguridad de Express.js.
  javascript-inclusive:
    description: 'Reglas para JavaScript para evitar un lenguaje inapropiado en el
      código y los comentarios.

      '
    title: Revisa el código JavaScript en busca de problemas de redacción.
  javascript-node-security:
    description: 'Reglas para identificar posibles puntos críticos de seguridad en
      Node. Esto puede incluir falsos positivos que requieren un mayor análisis.

      '
    title: Identificar posibles puntos críticos de seguridad en Node
  jsx-react:
    description: 'Este complemento exporta una configuración `recomendada` que refuerza
      las buenas prácticas de React.

      '
    title: Reglas específicas de linting para React
  kotlin-best-practices:
    description: 'Reglas para hacer cumplir las mejores prácticas de Kotlin.

      '
    title: Seguir las mejores prácticas para escribir código en Kotlin
  kotlin-code-style:
    description: 'Reglas para hacer cumplir el estilo de código de Kotlin.

      '
    title: Hacer cumplir el estilo de código de Kotlin
  kotlin-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en tu código
      de Kotlin.

      '
    title: Hacer cumplir la codificación segura en Kotlin
  php-best-practices:
    description: 'Reglas para hacer cumplir las mejores prácticas de PHP, mejorando
      el estilo de código, previniendo errores y promoviendo un código PHP eficiente,
      mantenible y de alto rendimiento.

      '
    title: Seguir las mejores prácticas para escribir código en PHP
  php-code-style:
    description: 'Reglas para hacer cumplir el estilo de código de PHP.

      '
    title: Hacer cumplir el estilo de código de PHP
  php-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en tu código
      PHP.

      '
    title: Reglas de seguridad para PHP
  python-best-practices:
    description: 'Mejores prácticas para Python para escribir código eficiente y libre
      de errores.

      '
    title: Seguir las mejores prácticas para escribir código en Python
  python-code-style:
    description: 'Reglas para hacer cumplir el estilo de código de Python.

      '
    title: Hacer cumplir el estilo de código de Python
  python-design:
    description: 'Reglas para verificar la estructura de tu programa en Python, incluyendo
      aspectos como bucles anidados.

      '
    title: Revisa la estructura del programa en Python.
  python-django:
    description: 'Reglas específicamente para las mejores prácticas y la seguridad
      en Django.

      '
    title: Verifica las mejores prácticas y la seguridad en Django.
  python-flask:
    description: 'Reglas específicamente para las mejores prácticas y la seguridad
      en Flask.

      '
    title: Verifica las mejores prácticas y la seguridad en Flask.
  python-inclusive:
    description: 'Reglas para Python para evitar un lenguaje inapropiado en el código
      y los comentarios.

      '
    title: Revisa el código de Python en busca de problemas de redacción.
  python-pandas:
    description: "Un conjunto de reglas para verificar que el código de pandas se\
      \ utilice de manera adecuada.\n\n - Asegura que las declaraciones de `import`\
      \ sigan las pautas de codificación.\n - Evitar código y métodos obsoletos.\n\
      \ - Evitar código ineficiente siempre que sea posible.\n"
    title: Buenas prácticas para la ciencia de datos con pandas
  python-security:
    description: "Reglas enfocadas en encontrar problemas de seguridad y vulnerabilidad\
      \ en tu código de Python, incluyendo aquellos encontrados en OWASP10 y SANS25.\n\
      \n - Uso de protocolos de cifrado y hash inadecuados\n - Falta de control de\
      \ acceso\n - Configuración de seguridad incorrecta\n - Inyecciones SQL\n - Credenciales\
      \ codificadas\n - Inyección de shell\n - Deserialización insegura\n"
    title: Asegúrate de que tu código en Python sea seguro y protegido
  rails-best-practices:
    description: 'Mejores prácticas para escribir código en Ruby on Rails.

      '
    title: Patrones ampliamente adoptados por la comunidad de Ruby on Rails
  ruby-best-practices:
    description: 'Reglas para hacer cumplir las mejores prácticas de Ruby.

      '
    title: Sigue las mejores prácticas en Ruby
  ruby-code-style:
    description: 'Reglas de seguridad del código para escribir reglas en Ruby que
      sigan los estándares de codificación establecidos.

      '
    title: Reglas para hacer cumplir el estilo de código en Ruby.
  ruby-inclusive:
    description: 'Escribe código en Ruby inclusivo

      '
    title: Reglas para el código inclusivo en Ruby
  ruby-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en tu código
      en Ruby.

      '
    title: Reglas de seguridad para Ruby
  swift-code-style:
    description: 'Reglas de seguridad del código para escribir reglas en Swift que
      sigan los estándares de codificación establecidos.

      '
    title: Reglas para hacer cumplir el estilo de código y las mejores prácticas en
      Swift.
  swift-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en tu código
      en Swift.

      '
    title: Reglas de seguridad para Swift
  terraform-aws:
    description: 'Reglas para hacer cumplir las mejores prácticas de Terraform para
      AWS.

      '
    title: Terraform AWS
  tsx-react:
    description: 'Este complemento exporta una configuración `recomendada` que refuerza
      las buenas prácticas de React.

      '
    title: Calidad del código en TypeScript React
  typescript-best-practices:
    description: 'Reglas para hacer cumplir las mejores prácticas de TypeScript.

      '
    title: Sigue las mejores prácticas para escribir código TypeScript.
  typescript-browser-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en tus aplicaciones
      web de TypeScript.

      '
    title: Reglas de seguridad para aplicaciones web de TypeScript.
  typescript-code-style:
    description: 'Reglas consideradas como mejores prácticas para bases de código
      modernas de TypeScript, pero que no impactan la lógica del programa. Estas reglas
      tienden a ser prescriptivas en cuanto a la imposición de patrones de código
      más simples.

      '
    title: Patrones de código prescriptivos de TypeScript.
  typescript-common-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en tu código
      TypeScript.

      '
    title: Reglas de seguridad comunes para TypeScript.
  typescript-express:
    description: 'Reglas específicamente para las mejores prácticas y seguridad de
      TypeScript en Express.js.

      '
    title: Verifica las mejores prácticas y la seguridad de TypeScript en Express.js.
  typescript-inclusive:
    description: 'Reglas para TypeScript para evitar un lenguaje inapropiado en el
      código y los comentarios.

      '
    title: Verifica el código TypeScript en busca de problemas de redacción.
  typescript-node-security:
    description: 'Reglas para identificar posibles puntos críticos de seguridad en
      Node. Esto puede incluir falsos positivos que requieren un mayor análisis.

      '
    title: Identificar posibles puntos críticos de seguridad en Node
title: Reglas SAST.
type: static-analysis
---
{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Datadog Code Security no está disponible para el {{< region-param key="dd_site_name" >}} sitio.
</div>
{{% /site-region %}}

## Resumen {#overview}

El Análisis Estático de Código de Datadog proporciona reglas listas para usar para ayudar a detectar vulnerabilidades de seguridad, errores y problemas de mantenibilidad en tu base de código. Para más información, consulta la [documentación de configuración][1].

[1]: /es/security/code_security/static_analysis/setup/