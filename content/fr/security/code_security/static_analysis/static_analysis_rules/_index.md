---
aliases:
- /fr/continuous_integration/static_analysis/rules
- /fr/static_analysis/rules
- /fr/code_analysis/static_analysis_rules
- /fr/security/code_security/static_analysis_rules
cascade:
  banner:
    link:
      name: Datadog Code Security
      url: https://www.datadoghq.com/product/code-security/
    title: <span>Intégrations fluides.</span> Essayez Datadog Code Security
  modal:
    bottom_boxes:
    - cta_title: Télécharger l'extension
      cta_url: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
      icon: vscode
      subtitle: Identifiez les vulnérabilités du code directement dans votre</br>éditeur
        VS Code
      title: Extension VS Code
    - cta_title: Télécharger le plugin
      cta_url: https://plugins.jetbrains.com/plugin/19495-datadog
      icon: jetbrains
      subtitle: Identifiez les vulnérabilités du code directement dans</br>les produits
        JetBrains
      title: JetBrains Plugin
    footer:
      link:
        name: Datadog Code Security
        url: https://www.datadoghq.com/product/code-security/
      text: Utilisez Datadog Code Security pour détecter les problèmes de code à chaque
        étape de votre processus de développement
    title: Essayez cette règle et analysez votre code avec Datadog Code Security
    top_box:
      footer: For more information, please read the <a href="/security/code_security/">Code
        Security documentation</a>
      steps:
      - Create a static-analysis.datadog.yml with the content above at the root of
        your repository
      - Use our free IDE Plugins or add Code Security scans to your CI pipelines
      - Get feedback on your code
      title: Comment utiliser cette règle
description: Consultez les règles pour plusieurs langages pour l'analyse statique
  du code.
further_reading:
- link: /security/code_security/
  tag: Documentation
  text: Découvrez Datadog Code Security
is_beta: false
rulesets:
  apex-code-style:
    description: 'Règles de sécurité du code pour écrire des règles Apex qui respectent
      les normes de codage établies.

      '
    title: Règles pour appliquer le style de code Apex et les meilleures pratiques.
  apex-security:
    description: 'Règles axées sur la détection des problèmes de sécurité dans votre
      code Apex.

      '
    title: Règles de sécurité pour Apex
  bash-code-quality:
    description: 'Règles pour garantir la qualité du code pour les scripts Bash.

      '
    title: Règles de qualité du code pour les scripts Bash.
  bash-security:
    description: 'Règles pour appliquer les meilleures pratiques de sécurité pour
      les scripts Bash.

      '
    title: Règles de sécurité pour les scripts Bash
  csharp-best-practices:
    description: 'Règles pour appliquer les meilleures pratiques en C#.

      '
    title: Meilleures pratiques pour C#
  csharp-code-style:
    description: 'Règles pour appliquer le style de code C#.

      '
    title: Suivez les modèles de style de code C#
  csharp-inclusive:
    description: 'Règles pour rendre votre code C# plus inclusif.

      '
    title: Utilisez un langage inclusif en C#
  csharp-security:
    description: 'Règles axées sur la détection des problèmes de sécurité dans votre
      code C#.

      '
    title: Écrivez un code C# sûr et sécurisé
  docker-best-practices:
    description: 'Meilleures pratiques pour utiliser Docker.

      '
    title: Suivez les meilleures pratiques lors de l'utilisation de Docker
  github-actions:
    description: 'Règles pour vérifier vos GitHub Actions et détecter des modèles
      non sécurisés, tels que les autorisations ou le verrouillage de version.

      '
    title: Sécurisez vos GitHub Actions
  go-best-practices:
    description: 'Règles pour rendre l''écriture de code Go plus rapide et plus facile.
      Du style de code à la prévention des bogues, cet ensemble de règles aide les
      développeurs à écrire un code Go performant, maintenable et efficace.

      '
    title: Meilleures pratiques pour Go
  go-inclusive:
    description: 'Vérifiez le code Go pour des problèmes de formulation.

      '
    title: Utilisez un langage inclusif en Go
  go-security:
    description: 'Détectez les problèmes de sécurité courants (tels que l''injection
      SQL, XSS ou l''injection de shell) dans votre code Go.

      '
    title: Assurez-vous que votre code Go est sûr et sécurisé
  java-best-practices:
    description: 'Règles pour appliquer les meilleures pratiques en Java.

      '
    title: Suivez les meilleures pratiques en Java.
  java-code-style:
    description: 'Règles pour appliquer le style de code Java.

      '
    title: Suivez les modèles de style de code Java.
  java-inclusive:
    description: 'Règles pour Java afin d''éviter un langage inapproprié dans le code
      et les commentaires.

      '
    title: Utilisez un langage inclusif en Java.
  java-security:
    description: 'Règles axées sur la détection des problèmes de sécurité dans le
      code Java.

      '
    title: Assurez-vous que votre code Java est sécurisé.
  javascript-best-practices:
    description: 'Règles pour appliquer les meilleures pratiques en JavaScript.

      '
    title: Suivez les meilleures pratiques pour écrire du code JavaScript.
  javascript-browser-security:
    description: 'Règles axées sur la détection des problèmes de sécurité dans vos
      applications web JavaScript.

      '
    title: Règles de sécurité pour les applications web JavaScript.
  javascript-code-style:
    description: 'Règles pour appliquer le style de code JavaScript.

      '
    title: Appliquez le style de code JavaScript.
  javascript-common-security:
    description: 'Règles axées sur la détection des problèmes de sécurité dans votre
      code JavaScript.

      '
    title: Règles de sécurité courantes pour JavaScript.
  javascript-express:
    description: 'Règles spécifiquement pour les meilleures pratiques et la sécurité
      d''Express.js.

      '
    title: Vérifier les meilleures pratiques et la sécurité d'Express.js.
  javascript-inclusive:
    description: 'Règles pour JavaScript afin d''éviter un langage inapproprié dans
      le code et les commentaires.

      '
    title: Vérifier le code JavaScript pour des problèmes de formulation.
  javascript-node-security:
    description: 'Règles pour identifier les points chauds de sécurité potentiels
      dans Node. Cela peut inclure des faux positifs nécessitant un tri supplémentaire.

      '
    title: Identifier les points chauds de sécurité potentiels dans Node.
  jsx-react:
    description: 'Ce plugin exporte une configuration `recommandée` qui impose de
      bonnes pratiques React.

      '
    title: Règles de linting spécifiques à React
  kotlin-best-practices:
    description: 'Règles pour imposer les meilleures pratiques en Kotlin.

      '
    title: Suivez les meilleures pratiques pour écrire du code Kotlin
  kotlin-code-style:
    description: 'Règles pour imposer le style de code Kotlin.

      '
    title: Imposer le style de code Kotlin
  kotlin-security:
    description: 'Règles axées sur la détection des problèmes de sécurité dans votre
      code Kotlin.

      '
    title: Imposer une programmation Kotlin sécurisée
  php-best-practices:
    description: 'Règles pour imposer les meilleures pratiques en PHP, améliorer le
      style de code, prévenir les bogues et promouvoir un code PHP performant, maintenable
      et efficace.

      '
    title: Suivez les meilleures pratiques pour écrire du code PHP
  php-code-style:
    description: 'Règles pour imposer le style de code PHP.

      '
    title: Imposez le style de code PHP
  php-security:
    description: 'Règles axées sur la détection des problèmes de sécurité dans votre
      code PHP.

      '
    title: Règles de sécurité pour PHP
  python-best-practices:
    description: 'Meilleures pratiques pour Python afin d''écrire un code efficace
      et sans bogues.

      '
    title: Suivez les meilleures pratiques pour écrire du code Python
  python-code-style:
    description: 'Règles pour imposer le style de code Python.

      '
    title: Imposez le style de code Python
  python-design:
    description: 'Règles pour vérifier la structure de votre programme Python, y compris
      des éléments tels que les boucles imbriquées.

      '
    title: Vérifier la structure du programme Python
  python-django:
    description: 'Règles spécifiquement pour les meilleures pratiques et la sécurité
      de Django.

      '
    title: Vérifier les meilleures pratiques et la sécurité de Django
  python-flask:
    description: 'Règles spécifiquement pour les meilleures pratiques et la sécurité
      de Flask.

      '
    title: Vérifier les meilleures pratiques et la sécurité de Flask
  python-inclusive:
    description: 'Règles pour Python afin d''éviter un langage inapproprié dans le
      code et les commentaires.

      '
    title: Vérifier le code Python pour des problèmes de formulation
  python-pandas:
    description: "Un ensemble de règles pour vérifier que le code pandas est utilisé\
      \ de manière appropriée.\n\n - Assure que les déclarations `import` respectent\
      \ les directives de codage.\n - Éviter le code et les méthodes obsolètes.\n\
      \ - Éviter le code inefficace autant que possible.\n"
    title: Bonnes pratiques pour la science des données avec pandas
  python-security:
    description: "Règles axées sur la détection des problèmes de sécurité et de vulnérabilité\
      \ dans votre code Python, y compris ceux trouvés dans l'OWASP10 et le SANS25.\n\
      \n - Utilisation de protocoles de chiffrement et de hachage inappropriés\n -\
      \ Manque de contrôle d'accès\n - Mauvaise configuration de la sécurité\n - Injections\
      \ SQL\n - Identifiants codés en dur\n - Injection de shell\n - Désérialisation\
      \ non sécurisée\n"
    title: Assurez-vous que votre code Python est sûr et sécurisé
  rails-best-practices:
    description: 'Meilleures pratiques pour écrire du code Ruby on Rails.

      '
    title: Modèles largement adoptés par la communauté Ruby on Rails
  ruby-best-practices:
    description: 'Règles pour appliquer les meilleures pratiques Ruby.

      '
    title: Suivez les meilleures pratiques en Ruby
  ruby-code-style:
    description: 'Règles de Datadog Code Security pour écrire des règles Ruby qui
      respectent les normes de codage établies.

      '
    title: Règles pour appliquer le style de code Ruby.
  ruby-inclusive:
    description: 'Écrivez un code Ruby inclusif

      '
    title: Règles pour un code Ruby inclusif
  ruby-security:
    description: 'Règles axées sur la détection des problèmes de sécurité dans votre
      code Ruby.

      '
    title: Règles de sécurité pour Ruby
  swift-code-style:
    description: 'Règles de Datadog Code Security pour écrire des règles Swift qui
      respectent les normes de codage établies.

      '
    title: Règles pour appliquer le style de code Swift et les meilleures pratiques.
  swift-security:
    description: 'Règles axées sur la détection des problèmes de sécurité dans votre
      code Swift.

      '
    title: Règles de sécurité pour Swift.
  terraform-aws:
    description: 'Règles pour appliquer les meilleures pratiques Terraform pour AWS.

      '
    title: Terraform AWS
  tsx-react:
    description: 'Ce plugin exporte une configuration `recommandée` qui impose de
      bonnes pratiques React.

      '
    title: Qualité du code TypeScript React.
  typescript-best-practices:
    description: 'Règles pour appliquer les meilleures pratiques TypeScript.

      '
    title: Suivez les meilleures pratiques pour écrire du code TypeScript.
  typescript-browser-security:
    description: 'Règles axées sur la détection des problèmes de sécurité dans vos
      applications web TypeScript.

      '
    title: Règles de sécurité pour les applications web TypeScript.
  typescript-code-style:
    description: 'Règles considérées comme meilleures pratiques pour les bases de
      code TypeScript modernes, mais qui n''impactent pas la logique du programme.
      Ces règles sont généralement orientées vers l''application de modèles de code
      plus simples.

      '
    title: Modèles de code orientés TypeScript.
  typescript-common-security:
    description: 'Règles axées sur la détection des problèmes de sécurité dans votre
      code TypeScript.

      '
    title: Règles de sécurité courantes pour TypeScript.
  typescript-express:
    description: 'Règles spécifiquement pour les meilleures pratiques et la sécurité
      TypeScript d''Express.js.

      '
    title: Vérifiez les meilleures pratiques et la sécurité TypeScript d'Express.js.
  typescript-inclusive:
    description: 'Règles pour TypeScript afin d''éviter un langage inapproprié dans
      le code et les commentaires.

      '
    title: Vérifiez le code TypeScript pour des problèmes de formulation.
  typescript-node-security:
    description: 'Règles pour identifier les points chauds de sécurité potentiels
      dans Node. Cela peut inclure des faux positifs nécessitant un tri supplémentaire.

      '
    title: Identifier les points chauds de sécurité potentiels dans Node.
title: Règles SAST.
type: static-analysis
---
{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Datadog Code Security n'est pas disponible pour le {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

## Aperçu {#overview}

L'analyse statique de code Datadog fournit des règles prêtes à l'emploi pour aider à détecter les vulnérabilités de sécurité, les bogues et les problèmes de maintenabilité dans votre base de code. Pour plus d'informations, consultez la [documentation d'installation][1].

[1]: /fr/security/code_security/static_analysis/setup/