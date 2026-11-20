---
aliases:
- /es/continuous_integration/static_analysis/rules
- /es/static_analysis/rules
- /es/code_analysis/static_analysis_rules
- /es/security/code_security/static_analysis_rules
cascade:
  banner:
    link:
      name: Seguridad de Código de Datadog
      url: https://www.datadoghq.com/product/code-security/
    title: <span>Integraciones sin problemas.</span> Prueba la Seguridad de Código
      de Datadog
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
        name: Seguridad de Código de Datadog
        url: https://www.datadoghq.com/product/code-security/
      text: Utiliza la Seguridad de Código de Datadog para detectar problemas de código
        en cada etapa de tu proceso de desarrollo
    title: Prueba esta regla y analiza tu código con la Seguridad de Código de Datadog
    top_box:
      footer: Para más información, por favor lee la <a href="/security/code_security/">documentación
        de Seguridad de Código</a>
      steps:
      - Crea un archivo static-analysis.datadog.yml con el contenido anterior en la
        raíz de tu repositorio
      - Utiliza nuestros IDE Plugins gratuitos o añade escaneos de Seguridad de Código
        a tus canalizaciones de CI
      - Obtén retroalimentación sobre tu código
      title: Cómo utilizar esta regla
description: Consulta reglas para múltiples lenguajes para Análisis Estático de Código.
further_reading:
- link: /security/code_security/
  tag: Documentación
  text: Conoce sobre la Seguridad de Código de Datadog
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
    title: Sigue los patrones de estilo de código de C#.
  csharp-inclusive:
    description: 'Reglas para hacer tu código C# más inclusivo.

      '
    title: Utiliza un lenguaje inclusivo en C#.
  csharp-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en tu código
      C#.

      '
    title: Escribe código C# seguro y protegido.
  docker-best-practices:
    description: 'Mejores prácticas para usar Docker.

      '
    title: Sigue las mejores prácticas al usar Docker.
  github-actions:
    description: 'Reglas para revisar tus GitHub Actions y detectar patrones inseguros,
      como permisos o fijación de versiones.

      '
    title: Asegura tus GitHub Actions.
  go-best-practices:
    description: 'Reglas para hacer que escribir código Go sea más rápido y fácil.
      Desde el estilo de código hasta la prevención de errores, este conjunto de reglas
      ayuda a los desarrolladores a escribir código Go eficiente, mantenible y de
      alto rendimiento.

      '
    title: Mejores prácticas para Go
  go-inclusive:
    description: 'Revisa el código de Go en busca de problemas de redacción.

      '
    title: Utiliza un lenguaje inclusivo en Go
  go-security:
    description: 'Detecta problemas de seguridad comunes (como inyección SQL, XSS
      o inyección de shell) en tu base de código de Go.

      '
    title: Asegúrate de que tu código de Go sea seguro y protegido
  java-best-practices:
    description: 'Reglas para hacer cumplir las mejores prácticas de Java.

      '
    title: Sigue las mejores prácticas en Java
  java-code-style:
    description: 'Reglas para hacer cumplir el estilo de código de Java.

      '
    title: Sigue los patrones de estilo de código de Java
  java-inclusive:
    description: 'Reglas para Java para evitar redacciones inapropiadas en el código
      y los comentarios.

      '
    title: Utiliza un lenguaje inclusivo en Java
  java-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en el código
      de Java.

      '
    title: Asegúrate de que tu código de Java sea seguro
  javascript-best-practices:
    description: 'Reglas para hacer cumplir las mejores prácticas de JavaScript.

      '
    title: Sigue las mejores prácticas para escribir código JavaScript
  javascript-browser-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en tus aplicaciones
      web de JavaScript.

      '
    title: Reglas de seguridad para aplicaciones web de JavaScript
  javascript-code-style:
    description: 'Reglas para hacer cumplir el estilo de código de JavaScript.

      '
    title: Haz cumplir el estilo de código de JavaScript
  javascript-common-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en tu código
      de JavaScript.

      '
    title: Reglas de seguridad comunes para JavaScript
  javascript-express:
    description: 'Reglas específicamente para las mejores prácticas y seguridad de
      Express.js.

      '
    title: Verifica las mejores prácticas y la seguridad de Express.js.
  javascript-inclusive:
    description: 'Reglas para JavaScript para evitar un lenguaje inapropiado en el
      código y los comentarios.

      '
    title: Verifica el código de JavaScript en busca de problemas de redacción.
  javascript-node-security:
    description: 'Reglas para identificar posibles puntos críticos de seguridad en
      Node. Esto puede incluir falsos positivos que requieren una mayor evaluación.

      '
    title: Identifica posibles puntos críticos de seguridad en Node.
  jsx-react:
    description: 'Este complemento exporta una configuración `recomendada` que refuerza
      las buenas prácticas de React.

      '
    title: Reglas de linting específicas para React
  kotlin-best-practices:
    description: 'Reglas para hacer cumplir las mejores prácticas de Kotlin.

      '
    title: Sigue las mejores prácticas para escribir código en Kotlin.
  kotlin-code-style:
    description: 'Reglas para hacer cumplir el estilo de código de Kotlin.

      '
    title: Haz cumplir el estilo de código de Kotlin.
  kotlin-security:
    description: 'Reglas centradas en encontrar problemas de seguridad en tu código
      de Kotlin.

      '
    title: Haz cumplir la codificación segura en Kotlin.
  php-best-practices:
    description: 'Reglas para hacer cumplir las mejores prácticas de PHP, mejorando
      el estilo de código, previniendo errores y promoviendo un código PHP eficiente,
      mantenible y de alto rendimiento.

      '
    title: Sigue las mejores prácticas para escribir código en PHP.
  php-code-style:
    description: 'Reglas para hacer cumplir el estilo de código de PHP.

      '
    title: Haz cumplir el estilo de código de PHP.
  php-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en tu código
      PHP.

      '
    title: Reglas de seguridad para PHP.
  python-best-practices:
    description: 'Mejores prácticas para Python para escribir código eficiente y libre
      de errores.

      '
    title: Sigue las mejores prácticas para escribir código en Python.
  python-code-style:
    description: 'Reglas para hacer cumplir el estilo de código en Python.

      '
    title: Haz cumplir el estilo de código en Python.
  python-design:
    description: 'Reglas para verificar la estructura de tu programa en Python, incluyendo
      aspectos como bucles anidados.

      '
    title: Verifica la estructura del programa en Python.
  python-django:
    description: 'Reglas específicamente para las mejores prácticas y seguridad en
      Django.

      '
    title: Verifica las mejores prácticas y la seguridad en Django.
  python-flask:
    description: 'Reglas específicamente para las mejores prácticas y seguridad en
      Flask.

      '
    title: Verifica las mejores prácticas y la seguridad en Flask.
  python-inclusive:
    description: 'Reglas para Python para evitar un lenguaje inapropiado en el código
      y los comentarios.

      '
    title: Verifica el código de Python en busca de problemas de redacción.
  python-pandas:
    description: "Un conjunto de reglas para verificar que el código de pandas se\
      \ utilice de manera adecuada.\n\n - Asegura que las declaraciones de `import`\
      \ sigan las pautas de codificación.\n - Evita código y métodos obsoletos.\n\
      \ - Evita código ineficiente siempre que sea posible.\n"
    title: Buenas prácticas para ciencia de datos con pandas.
  python-security:
    description: "Reglas enfocadas en encontrar problemas de seguridad y vulnerabilidad\
      \ en tu código Python, incluyendo aquellos encontrados en OWASP10 y SANS25.\n\
      \n - Uso de protocolos de cifrado y hash deficientes\n - Falta de control de\
      \ acceso\n - Configuración de seguridad incorrecta\n - Inyecciones SQL\n - Credenciales\
      \ codificadas de forma fija\n - Inyección de shell\n - Deserialización insegura\n"
    title: Asegúrate de que tu código en Python sea seguro y protegido
  rails-best-practices:
    description: 'Mejores prácticas para escribir código en Ruby on Rails.

      '
    title: Patrones ampliamente adoptados por la comunidad de Ruby on Rails
  ruby-best-practices:
    description: 'Reglas para hacer cumplir las mejores prácticas de Ruby.

      '
    title: Sigue las mejores prácticas en Ruby.
  ruby-code-style:
    description: 'Reglas de Code Security para escribir reglas en Ruby que sigan los
      estándares de codificación establecidos.

      '
    title: Reglas para hacer cumplir el estilo de código de Ruby.
  ruby-inclusive:
    description: 'Escribe código Ruby inclusivo

      '
    title: Reglas para escribir código Ruby inclusivo
  ruby-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en tu código
      Ruby.

      '
    title: Reglas de seguridad para Ruby
  swift-code-style:
    description: 'Reglas de Code Security para escribir reglas en Swift que sigan
      los estándares de codificación establecidos.

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
    description: 'Este complemento exporta una configuración `recomendada` que aplica
      las buenas prácticas de React.

      '
    title: Calidad del código TypeScript React
  typescript-best-practices:
    description: 'Reglas para hacer cumplir las mejores prácticas de TypeScript.

      '
    title: Sigue las mejores prácticas para escribir código TypeScript.
  typescript-browser-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en tus aplicaciones
      web de TypeScript.

      '
    title: Reglas de seguridad para aplicaciones web de TypeScript
  typescript-code-style:
    description: 'Reglas consideradas como mejores prácticas para bases de código
      modernas de TypeScript, pero que no impactan la lógica del programa. Estas reglas
      suelen imponer patrones de código más simples.

      '
    title: Patrones de código de TypeScript con enfoque opinionado.
  typescript-common-security:
    description: 'Reglas enfocadas en encontrar problemas de seguridad en tu código
      TypeScript.

      '
    title: Reglas de seguridad comunes para TypeScript
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
      Node. Esto puede incluir falsos positivos que requieren una mayor evaluación.

      '
    title: Identifica posibles puntos críticos de seguridad en Node.
title: Reglas SAST
type: static-analysis
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">
    La seguridad del código no está disponible para el {{< region-param key="dd_site_name" >}} sitio.
</div>
{{% /site-region %}}

## Descripción general {#overview}

El análisis estático de código de Datadog proporciona reglas listas para usar que ayudan a detectar vulnerabilidades de seguridad, errores y problemas de mantenibilidad en tu base de código. Para más información, consulta la [documentación de configuración][1].

[1]: /es/security/code_security/static_analysis/setup/