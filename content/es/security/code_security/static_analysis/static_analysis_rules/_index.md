---
aliases:
- /es/continuous_integration/static_analysis/rules
- /es/static_analysis/rules
- /es/code_analysis/static_analysis_rules
- /es/security/code_security/static_analysis_rules
cascade:
  banner:
    link:
      name: Seguridad de Código Datadog
      url: https://www.datadoghq.com/product/code-security/
    title: <span>Integraciones sin interrupciones.</span> Prueba la Seguridad de Código
      Datadog
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
      title: JetBrains Plugin
    footer:
      link:
        name: Seguridad de Código Datadog
        url: https://www.datadoghq.com/product/code-security/
      text: Utiliza la Seguridad de Código Datadog para detectar problemas de código
        en cada paso de tu proceso de desarrollo
    title: Prueba esta regla y analiza tu código con la Seguridad de Código Datadog
    top_box:
      footer: Para más información, por favor lee la <a href="/security/code_security/">documentación
        de Seguridad de Código</a>
      steps:
      - Crea un archivo static-analysis.datadog.yml con el contenido anterior en la
        raíz de tu repositorio
      - Utiliza nuestros Plugins de IDE gratuitos o añade escaneos de Seguridad de
        Código a tus pipelines de CI
      - Obtén retroalimentación sobre tu código
      title: Cómo utilizar esta regla
description: Consulta reglas para múltiples lenguajes para Análisis Estático de Código.
further_reading:
- link: /security/code_security/
  tag: Documentación
  text: Conoce sobre la Seguridad de Código Datadog
is_beta: false
rulesets:
  apex-code-style:
    description: 'Reglas de Seguridad de Código para escribir reglas Apex que sigan
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
    title: Reglas de calidad del código para scripts de Bash.
  bash-security:
    description: 'Reglas para hacer cumplir las mejores prácticas de seguridad en
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
    description: 'Reglas para hacer que tu código en C# sea más inclusivo.

      '
    title: Utiliza un lenguaje inclusivo en C#
  csharp-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en tu código
      de C#.

      '
    title: Escribe código en C# seguro y protegido
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
    description: 'Reglas para hacer que escribir código en Go sea más rápido y fácil.
      Desde el estilo de código hasta la prevención de errores, este conjunto de reglas
      ayuda a los desarrolladores a escribir código en Go que sea eficiente, mantenible
      y de alto rendimiento.

      '
    title: Mejores prácticas para Go
  go-inclusive:
    description: 'Revisa el código de Go en busca de problemas de redacción.

      '
    title: Utiliza un lenguaje inclusivo en Go.
  go-security:
    description: 'Detecta problemas de seguridad comunes (como inyección SQL, XSS
      o inyección de shell) en tu base de código de Go.

      '
    title: Asegúrate de que tu código de Go sea seguro.
  java-best-practices:
    description: 'Reglas para hacer cumplir las mejores prácticas de Java.

      '
    title: Sigue las mejores prácticas en Java.
  java-code-style:
    description: 'Reglas para hacer cumplir el estilo de código de Java.

      '
    title: Sigue los patrones de estilo de código de Java.
  java-inclusive:
    description: 'Reglas para Java para evitar redacciones inapropiadas en el código
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
    description: 'Reglas específicas para las mejores prácticas y seguridad de Express.js.

      '
    title: Verifique las mejores prácticas y la seguridad de Express.js.
  javascript-inclusive:
    description: 'Reglas para JavaScript para evitar un lenguaje inapropiado en el
      código y los comentarios.

      '
    title: Verifique el código de JavaScript en busca de problemas de redacción.
  javascript-node-security:
    description: 'Reglas para identificar posibles puntos críticos de seguridad en
      Node. Esto puede incluir falsos positivos que requieren una mayor evaluación.

      '
    title: Identifique posibles puntos críticos de seguridad en Node.
  jsx-react:
    description: 'Este complemento exporta una configuración `recomendada` que refuerza
      las buenas prácticas de React.

      '
    title: Reglas de linting específicas de React.
  kotlin-best-practices:
    description: 'Reglas para hacer cumplir las mejores prácticas de Kotlin.

      '
    title: Siga las mejores prácticas para escribir código en Kotlin.
  kotlin-code-style:
    description: 'Reglas para hacer cumplir el estilo de código de Kotlin.

      '
    title: Haga cumplir el estilo de código de Kotlin.
  kotlin-security:
    description: 'Reglas centradas en encontrar problemas de seguridad en su código
      de Kotlin.

      '
    title: Haga cumplir la codificación segura en Kotlin.
  php-best-practices:
    description: 'Reglas para hacer cumplir las mejores prácticas de PHP, mejorando
      el estilo de código, previniendo errores y promoviendo un código PHP eficiente,
      mantenible y de alto rendimiento.

      '
    title: Siga las mejores prácticas para escribir código en PHP.
  php-code-style:
    description: 'Reglas para hacer cumplir el estilo de código de PHP.

      '
    title: Haga cumplir el estilo de código de PHP.
  php-security:
    description: 'Reglas centradas en encontrar problemas de seguridad en su código
      de PHP.

      '
    title: Reglas de seguridad para PHP
  python-best-practices:
    description: 'Mejores prácticas para Python para escribir código eficiente y sin
      errores.

      '
    title: Siga las mejores prácticas para escribir código en Python
  python-code-style:
    description: 'Reglas para hacer cumplir el estilo de código en Python.

      '
    title: Haga cumplir el estilo de código en Python
  python-design:
    description: 'Reglas para verificar la estructura de su programa en Python, incluyendo
      aspectos como bucles anidados.

      '
    title: Verifique la estructura del programa en Python
  python-django:
    description: 'Reglas específicamente para las mejores prácticas y seguridad en
      Django.

      '
    title: Verifique las mejores prácticas y la seguridad en Django
  python-flask:
    description: 'Reglas específicamente para las mejores prácticas y seguridad en
      Flask.

      '
    title: Verifique las mejores prácticas y la seguridad en Flask
  python-inclusive:
    description: 'Reglas para Python para evitar un lenguaje inapropiado en el código
      y los comentarios.

      '
    title: Verifique el código de Python en busca de problemas de redacción
  python-pandas:
    description: "Un conjunto de reglas para verificar que el código de pandas se\
      \ utilice adecuadamente.\n\n - Asegura que las declaraciones de `import` sigan\
      \ las pautas de codificación.\n - Evite el código y los métodos obsoletos.\n\
      \ - Evite el código ineficiente siempre que sea posible.\n"
    title: Buenas prácticas para la ciencia de datos con pandas
  python-security:
    description: "Reglas centradas en encontrar problemas de seguridad y vulnerabilidad\
      \ en su código de Python, incluyendo aquellos encontrados en OWASP10 y SANS25.\n\
      \n - Uso de protocolos de cifrado y hash inadecuados\n - Falta de control de\
      \ acceso\n - Configuración de seguridad incorrecta\n - Inyecciones SQL\n - Credenciales\
      \ codificadas\n - Inyección de shell\n - Deserialización insegura\n"
    title: Asegúrese de que su código Python sea seguro
  rails-best-practices:
    description: 'Mejores prácticas para escribir código en Ruby on Rails.

      '
    title: Patrones ampliamente adoptados por la comunidad de Ruby on Rails
  ruby-best-practices:
    description: 'Reglas para hacer cumplir las mejores prácticas de Ruby.

      '
    title: Siga las mejores prácticas en Ruby
  ruby-code-style:
    description: 'Reglas de seguridad del código para escribir reglas de Ruby que
      sigan estándares de codificación establecidos.

      '
    title: Reglas para hacer cumplir el estilo de código de Ruby.
  ruby-inclusive:
    description: 'Escriba código Ruby inclusivo

      '
    title: Reglas para código Ruby inclusivo
  ruby-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en su código
      Ruby.

      '
    title: Reglas de seguridad para Ruby
  swift-code-style:
    description: 'Reglas de seguridad del código para escribir reglas de Swift que
      sigan estándares de codificación establecidos.

      '
    title: Reglas para hacer cumplir el estilo de código de Swift y las mejores prácticas.
  swift-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en su código
      Swift.

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
    title: Calidad del código TypeScript React
  typescript-best-practices:
    description: 'Reglas para hacer cumplir las mejores prácticas de TypeScript.

      '
    title: Siga las mejores prácticas para escribir código TypeScript
  typescript-browser-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en sus aplicaciones
      web de TypeScript.

      '
    title: Reglas de seguridad para aplicaciones web de TypeScript
  typescript-code-style:
    description: 'Reglas consideradas como mejores prácticas para bases de código
      modernas de TypeScript, pero que no impactan la lógica del programa. Estas reglas
      son generalmente opuestas a la imposición de patrones de código más simples.

      '
    title: Patrones de código opinativos de TypeScript
  typescript-common-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en su código
      TypeScript.

      '
    title: Reglas de seguridad comunes para TypeScript
  typescript-express:
    description: 'Reglas específicamente para las mejores prácticas y seguridad de
      TypeScript en Express.js.

      '
    title: Verifique las mejores prácticas y seguridad de TypeScript en Express.js
  typescript-inclusive:
    description: 'Reglas para TypeScript para evitar un lenguaje inapropiado en el
      código y los comentarios.

      '
    title: Verifique el código TypeScript en busca de problemas de redacción
  typescript-node-security:
    description: 'Reglas para identificar posibles puntos críticos de seguridad en
      Node. Esto puede incluir falsos positivos que requieren una mayor evaluación.

      '
    title: Identifique posibles puntos críticos de seguridad en Node.
title: Reglas SAST
type: static-analysis
---
{{% site-region region="gov" %}}
<div class="alert alert-warning">
    La seguridad del código no está disponible para el {{< region-param key="dd_site_name" >}} sitio.
</div>
{{% /site-region %}}

## Resumen {#overview}

El Análisis de Código Estático de Datadog proporciona reglas listas para usar que ayudan a detectar vulnerabilidades de seguridad, errores y problemas de mantenibilidad en su base de código. Para más información, consulte la [documentación de configuración][1].

[1]: /es/security/code_security/static_analysis/setup/