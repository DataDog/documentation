---
title: Règles dʼanalyse statiques
description: Afficher les règles pour plusieurs langages pour l'analyse statique.
aliases:
- /continuous_integration/static_analysis/rules
- /static_analysis/rules
is_beta: false
type: static-analysis
rulesets:
  csharp-best-practices:
    title: "Bonnes pratiques pour C#"
    description: |
      Règles pour appliquer les bonnes pratiques en C#.
  csharp-code-style:
    title: "Suivre les conventions de style de code C#"
    description: |
      Règles pour appliquer le style de code C#.
  csharp-inclusive:
    title: "Utiliser un langage inclusif en C#"
    description: |
      Règles pour rendre votre code C# plus inclusif.
  csharp-security:
    title: "Écrire un code en C# sûr et sécurisé"
    description: |
      Règles conçues pour identifier les vulnérabilités dans votre code C#.
  docker-best-practices:
    title: Suivre les bonnes pratiques avec Docker
    description: |
      Bonnes pratiques pour l'utilisation de Docker.
  github-actions:
    title: Sécuriser vos GitHub Actions
    description: |
      Règles pour vérifier vos GitHub Actions et détecter des schémas non sécurisés, tels que les permissions ou le verrouillage de version.
  go-best-practices:
    title: Bonnes pratiques pour Go
    description: |
      Règles destinées à faciliter et accélérer l'écriture de code Go. Allant des conventions de style à la prévention des bugs, ce jeu de règles aide les développeurs à produire du code Go performant, maintenable et optimisé.
  go-inclusive:
    title: Utiliser un langage inclusif en Go
    description: |
      Vérifiez que le code Go ne présente pas de problèmes de formulation.
  go-security:
    title: Veiller à ce que votre code Go soit sûr et sécurisé
    description: |
      Identifiez les vulnérabilités fréquentes (comme l'injection SQL, le XSS ou l'injection shell) dans votre code Go.
  java-best-practices:
    title: Suivre les bonnes pratiques avec Java
    description: |
      Règles pour appliquer les bonnes pratiques en Java.
  java-code-style:
    title: Suivre les conventions de style de code Java
    description: |
      Règles pour appliquer le style de code Java.
  java-inclusive:
    title: Utiliser un langage inclusif en Java
    description: |
      Règles pour Java afin d'éviter des formulations inappropriées dans le code et les commentaires.
  java-security:
    title: Veiller à ce que votre code Java soit sécurisé
    description: |
      Règles conçues pour identifier les vulnérabilités dans le code Java.
  javascript-best-practices:
    title: Suivre les bonnes pratiques pour écrire du code en JavaScript
    description: |
      Règles pour appliquer les bonnes pratiques en JavaScript.
  javascript-browser-security:
    title: Règles de sécurité pour les applications web JavaScript
    description: |
      Règles conçues pour identifier les vulnérabilités au sein de vos applications web JavaScript.
  javascript-code-style:
    title: Appliquer le style de code JavaScript
    description: |
      Règles pour appliquer le style de code JavaScript.
  javascript-common-security:
    title: Règles de sécurité courantes pour JavaScript
    description: |
      Règles conçues pour identifier les vulnérabilités dans votre code JavaScript.
  javascript-express:
    title: Vérifier les bonnes pratiques et la sécurité pour Express.js
    description: |
      Règles spécifiques aux bonnes pratiques et à la sécurité pour Express.js.
  javascript-inclusive:
    title: Vérifier les problèmes de formulation dans le code JavaScript
    description: |
      Règles pour JavaScript afin d'éviter des formulations inappropriées dans le code et les commentaires.
  javascript-node-security:
    title: Identifier les points sensibles de sécurité potentiels en Node
    description: |
      Règles pour identifier les points sensibles de sécurité potentiels en Node. Cela peut inclure de faux positifs nécessitant une analyse plus approfondie.
  jsx-react:
    title: Règles de linting spécifiques à React
    description: |
      Ce plugin exporte une configuration `recommended` qui applique les bonnes pratiques de React.
  kotlin-best-practices:
    title: Suivre les bonnes pratiques pour écrire du code en Kotlin
    description: |
      Règles pour appliquer les bonnes pratiques en Kotlin.
  kotlin-code-style:
    title: Appliquer le style de code Kotlin
    description: |
      Règles pour appliquer le style de code Kotlin.
  php-best-practices:
    title: Suivre les bonnes pratiques pour écrire du code en PHP
    description: |
      Règles pour appliquer les bonnes pratiques en PHP, améliorer le style de code, prévenir les bugs et favoriser un code PHP performant, maintenable et efficace.
  php-code-style:
    title: Appliquer le style de code PHP
    description: |
      Règles pour appliquer le style de code PHP.
  php-security:
    title: Règles de sécurité pour PHP
    description: |
      Règles conçues pour identifier les vulnérabilités dans votre code PHP.
  python-best-practices:
    title: Suivre les bonnes pratiques pour écrire du code en Python
    description: |
      Bonnes pratiques pour Python afin d'écrire un code efficace et sans bug.
  python-code-style:
    title: Appliquer le style de code Python
    description: |
      Règles pour appliquer le style de code Python.
  python-design:
    title: Vérifier la structure des programmes en Python
    description: |
      Règles pour vérifier la structure de vos programmes en Python, y compris des éléments comme les boucles imbriquées.
  python-django:
    title: Vérifier les bonnes pratiques et la sécurité pour Django
    description: |
      Règles spécifiques aux bonnes pratiques et à la sécurité pour Django.
  python-flask:
    title: Vérifier les bonnes pratiques et la sécurité pour Flask
    description: |
      Règles spécifiques aux bonnes pratiques et à la sécurité pour Flask.
  python-inclusive:
    title: Vérifier que le code Python ne présente pas de problèmes de formulation
    description: |
      Règles pour Python afin d'éviter des formulations inappropriées dans le code et les commentaires.
  python-pandas:
    title: Bonnes pratiques pour la data science avec pandas
    description: |
      Un ensemble de règles pour vérifier que le code pandas est utilisé correctement.

      - Vérifie que les déclarations `import` respectent les directives de codage.
      - Évite le code et les méthodes obsolètes.
      - Évite le code inefficace autant que possible.
  python-security:
    title: Veiller à ce que votre code Python soit sûr et sécurisé
    description: |
      Règles destinées à identifier les problèmes de sécurité et vulnérabilités dans votre code Python, y compris celles figurant dans l'OWASP10 et le SANS25.

      - Usage de protocoles de chiffrement ou de hachage faibles
      - Manque de contrôle d'accès
      - Mauvaise configuration de sécurité
      - Injections SQL
      - Informations d'identification codées en dur
      - Injection shell
      - Désérialisation non sécurisée
  rails-best-practices:
    title: Modèles largement adoptés par la communauté Ruby on Rails
    description: |
      Meilleures pratiques pour écrire du code en Ruby on Rails.
  ruby-best-practices:
    title: Suivre les bonnes pratiques avec Ruby
    description: |
      Règles pour appliquer les bonnes pratiques en Ruby.
  ruby-code-style:
    title: Règles pour appliquer le style de code Ruby.
    description: |
      Règles Code Analysis pour écrire des règles Ruby qui suivent les standards de codage établis.
  ruby-inclusive:
    title: Règles pour un code en Ruby inclusif
    description: |
      Écrire du code en Ruby inclusif
  ruby-security:
    title: Règles de sécurité pour Ruby
    description: |
      Règles conçues pour identifier les vulnérabilités dans votre code Ruby.
  terraform-aws:
    title: Terraform AWS
    description: |
      Règles pour appliquer les bonnes pratiques avec Terraform pour AWS.
  tsx-react:
    title: Qualité du code TypeScript React
    description: |
      Ce plugin exporte une configuration `recommended` qui applique les bonnes pratiques de React.
  typescript-best-practices:
    title: Suivre les bonnes pratiques pour écrire du code en TypeScript
    description: |
      Règles pour appliquer les bonnes pratiques en TypeScript.
  typescript-browser-security:
    title: Règles de sécurité pour les applications web TypeScript
    description: |
      Règles axées sur la recherche de problèmes de sécurité dans vos applications web TypeScript.
  typescript-code-style:
    title: Modèles de code TypeScript prescriptifs
    description: |
      Règles reconnues comme de bonnes pratiques pour les bases de code TypeScript actuelles, sans effet sur la logique des programmes. Elles sont en général prescriptives et orientées vers l'application de schémas de code plus clairs.
  typescript-common-security:
    title: Règles de sécurité courantes pour TypeScript
    description: |
      Règles conçues pour identifier les vulnérabilités dans votre code TypeScript.
  typescript-express:
    title: Vérifier les bonnes pratiques et la sécurité pour TypeScript
    description: |
      Règles spécifiques aux bonnes pratiques et à la sécurité en TypeScript avec Express.js.
  typescript-inclusive:
    title: Vérifier les problèmes de formulation dans le code TypeScript
    description: |
      Règles pour TypeScript afin d'éviter des formulations inappropriées dans le code et les commentaires.
  typescript-node-security:
    title: Identifier les points sensibles de sécurité potentiels en Node
    description: |
      Règles pour identifier les points sensibles de sécurité potentiels en Node. Cela peut inclure de faux positifs nécessitant une analyse plus approfondie.
cascade:
  modal:
    title: Tester cette règle et utiliser Datadog Code Analysis pour analyser votre code
    top_box:
      title: Comment utiliser cette règle
      steps:
        - Créez un fichier static-analysis.datadog.yml avec le contenu ci-dessus à la racine de votre référentiel.
        - Utilisez nos plugins IDE gratuits ou ajoutez des analyses Code Analysis à vos pipelines CI.
        - Obtenir des retours sur votre code
      footer: Pour plus d'informations, consultez la <a href="/code_analysis">documentation Code Analysis</a>.
    bottom_boxes:
      - title: Extension VS Code
        icon: vscode
        subtitle: Identifier les vulnérabilités de code directement dans votre éditeur VS Code</br>
        cta_title: Télécharger l'extension
        cta_url: "https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode"
      - title: Plugin JetBrains
        icon: jetbrains
        subtitle: Identifier les vulnérabilités de code directement dans</br>les produits JetBrains
        cta_title: Télécharger le plugin
        cta_url: "https://plugins.jetbrains.com/plugin/19495-datadog"
    footer:
      text: Utiliser Datadog Code Analysis pour détecter les problèmes de code à chaque étape de votre processus de développement
      link:
        name: Datadog Code Analysis
        url: "https://www.datadoghq.com/code-analysis/"

  banner:
    title: <span>Intégrations fluides.</span> Essayer Datadog Code Analysis
    link:
      name: Datadog Code Analysis
      url: "https://www.datadoghq.com/code-analysis/"

further_reading:
  - link: /code_analysis/
    tag: Documentation
    text: En savoir plus sur Datadog Code Analysis
---

{{< callout url="#" btn_hidden="true" header="Profitez de l'aperçu !" >}}
L'aperçu de Code Analysis est disponible.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Code Analysis n'est pas disponible pour le site {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

## Section Overview

L'analyse statique Datadog propose des règles prêtes à l'emploi pour détecter les non-conformités dans vos pipelines CI/CD lors des revues de code, et identifier les bugs, failles de sécurité et problèmes de maintenabilité. Pour en savoir plus, consultez la [documentation relative à la configuration][1].

[1]: /code_analysis/static_analysis/setup
