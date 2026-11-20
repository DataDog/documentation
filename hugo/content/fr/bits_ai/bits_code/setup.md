---
aliases:
- /fr/bits_ai/bits_ai_dev_agent/setup/
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/bits-code/
  tag: Blog
  text: Transformez les résultats Datadog en correctifs de code automatisés avec Bits
    Code
title: Configuration de Bits Code
---
## Présentation {#overview}

[Bits Code][8] s'intègre aux [fournisseurs de code source][11] pour ouvrir, mettre à jour et itérer sur les pull requests ou demandes de fusion en fonction des problèmes détectés dans Datadog. Une fois la configuration terminée, vous pouvez [commencer à utiliser Bits Code][7].

## Prérequis {#prerequisites}

Pour configurer Bits Code, vous avez besoin de l'autorisation [`Bits Code Write` (`bits_dev_write`)][1]. Cette autorisation est incluse dans les rôles Datadog gérés tels que le rôle standard Datadog.

Si votre organisation utilise des rôles personnalisés, un administrateur doit ajouter cette autorisation manuellement. Pour plus de détails, consultez [Access Control][1].

## Configuration {#setup}

Configurez Bits Code pour l'un des [fournisseurs de code source pris en charge][11].

{{< tabs >}}

{{% tab "GitHub" %}}
1. Installez le [GitHub integration][1]. Pour les étapes complètes d'installation et de configuration, consultez le [GitHub integration guide][2].
1. Dans votre compte GitHub, accédez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Apps{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}} pour configurer les autorisations GitHub.
   1. Pour activer les fonctionnalités de base de Bits Code, définissez les autorisations suivantes :
      - {{< ui >}}Repository permissions{{< /ui >}}
        - Contenu du dépôt : Lecture et écriture
        - Pull requests : Lecture et écriture
      - {{< ui >}}Subscribe to events{{< /ui >}}
        - Push
   1. (Facultatif) Pour permettre à Bits Code d'utiliser les journaux CI lors de l'itération sur les demandes de tirage, vous devez envoyer les journaux CI à Datadog et activer la fonctionnalité [auto-push](#enable-auto-push). Cela nécessite des autorisations supplémentaires :  
       - {{< ui >}}Repository permissions{{< /ui >}}
         - Vérifications : Lecture  
         - Statuts de validation : Lecture seule 
       - {{< ui >}}Subscribe to events{{< /ui >}}
         - Exécution de vérification
         - Suite de vérification  
         - Commentaire sur le problème  
         - Statut

[1]: https://app.datadoghq.com/integrations/github
[2]: /fr/integrations/github/
{{% /tab %}}

{{% tab "GitLab" %}}
1. Installez le [GitLab Source Code integration][1]. Pour les étapes complètes d'installation et de configuration, consultez le [GitLab Source Code integration guide][2].
1. Vérifiez que le [compte de service][3] GitLab répond aux exigences suivantes :
   - Le compte de service doit avoir le [Developer role][4] sur le projet. Ce rôle peut être hérité d'un [groupe][5].
   - Le [personal access token][7] du compte de service doit avoir les [scopes][6] suivants : `api`, `write_repository` et `read_user`. 

   <div class="alert alert-warning">Vous ne pouvez pas modifier les [scopes] d'un [personal access token] GitLab existant. Si vous devez créer un [personal access token] incluant les [scopes] ci-dessus, ajoutez <a href="/integrations/gitlab-source-code/#required-gitlab-scopes">tous les [scopes] requis</a> par les autres produits Datadog qui utilisent le [GitLab Source Code integration].</div>

[1]: https://app.datadoghq.com/integrations/gitlab-source-code
[2]: /fr/integrations/gitlab-source-code/
[3]: https://docs.gitlab.com/user/profile/service_accounts/
[4]: https://docs.gitlab.com/user/permissions/#default-roles
[5]: https://docs.gitlab.com/user/permissions/#groups
[6]: https://docs.gitlab.com/user/profile/personal_access_tokens/#personal-access-token-scopes
[7]: https://docs.gitlab.com/user/profile/personal_access_tokens/
{{% /tab %}}

{{% tab "Azure DevOps" %}}
1. Installez le [Azure DevOps Source Code integration][101]. Pour les étapes complètes d'installation et de configuration, consultez le [Azure DevOps Source Code integration guide][102].
2. Vérifiez que le principal de service de l'application Microsoft Entra est un [Project Contributor] sur chaque projet, ou appartient à un groupe personnalisé avec les [repository permissions][103] suivantes :
   - Contribute
   - Contribute to pull requests
   - Create branch
   - Read

Si la [validation de l'e-mail de l'auteur du commit][104] est activée, ajoutez `no-reply@dtdg.co` aux adresses e-mail autorisées. Bits Code utilise cette adresse pour les commits qu'il crée.

[101]: https://app.datadoghq.com/integrations/azure-devops-source-code
[102]: /fr/integrations/azure-devops-source-code/
[103]: https://learn.microsoft.com/en-us/azure/devops/repos/git/set-git-repository-permissions
[104]: https://learn.microsoft.com/en-us/azure/devops/repos/git/repository-settings#commit-author-email-validation-policy
{{% /tab %}}

{{< /tabs >}}

## Configuration supplémentaire {#additional-configuration}

Ces configurations optionnelles vous aident à tirer le meilleur parti de Bits Code.

### Configurer le marquage de télémétrie {#configure-telemetry-tagging}

Bits Code utilise les tags de télémétrie `service` et `version` pour faire correspondre les problèmes détectés (tels que des erreurs ou des vulnérabilités) à la version du code qui était en cours d'exécution à ce moment-là.  

Pour configurer le marquage de télémétrie, consultez [Tag your APM telemetry with Git information][4]. 

Vous pouvez également configurer manuellement le service-to-repository mapping dans les paramètres de Bits Code sous [{{< ui >}}Repositories{{< /ui >}}][5] > {{< ui >}}Service Repository Mapping{{< /ui >}}.

### Activer l'auto-push {#enable-auto-push}

L'auto-push permet à Bits Code de créer des branches, de pousser du code et d'ouvrir des PR ou des MR lorsqu'il détecte un élément pour lequel il peut vous aider. L'auto-push ouvre uniquement des PRs ou des MRs et pousse des modifications ; il ne merge jamais de code. Lorsque l'auto-push est désactivé, vous devez examiner le code dans Datadog avant qu'il ne soit poussé.

Pour activer l'auto-push, accédez à {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}General{{< /ui >}}][6].


#### Considérations de sécurité {#security-considerations}

Autoriser tout outil basé sur l'IA à lire des données non approuvées peut permettre à des attaquants d'influencer ses résultats. Le comportement de l'auto-push dépend du type de données avec lesquelles Bits Code travaille : les workflows basés uniquement sur le code opèrent sur le code source que l'Agent peut inspecter directement, tandis que les workflows basés sur la télémétrie (tels que les erreurs ou les traces) peuvent inclure des entrées d'exécution non approuvées.

Pour équilibrer sécurité et automatisation, vous pouvez configurer le comportement de l'auto-push dans [Datadog][6] (par exemple, en limitant l'auto-push aux workflows basés uniquement sur le code ou en exigeant une révision lorsque la télémétrie est impliquée). Datadog analyse tout le code généré par l'Agent avant de pousser les modifications, mais ces mesures de protection ne sont pas infaillibles.

### Configurer des instructions personnalisées {#configure-custom-instructions}

Bits Code ingère des fichiers d'instructions personnalisés depuis votre dépôt, notamment :

- `AGENTS.md`
- `CLAUDE.md`
- `agent.md`
- `.cursorrules`
- `.windsurfrules`
- `copilot-instructions.md`

Vous pouvez également définir des instructions personnalisées globales qui s'appliquent à toutes les sessions Bits Code dans {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}General{{< /ui >}}][6], dans la section {{< ui >}}Global Agent Instructions{{< /ui >}}.

Un fichier d'instructions personnalisées est un bon endroit pour mentionner les [compétences personnalisées][12] que vous souhaitez que Bits Code utilise.

## Configuration de l'environnement {#environment-setup}

Configurez l'environnement d'exécution de Bits Code, y compris les politiques d'accès réseau et les outils spécifiques au dépôt.

### Configurer l'accès à Internet {#configure-internet-access}

Par défaut, Bits Code n'a **aucun accès à Internet** pendant l'exécution de l'agent. Pour configurer les domaines externes auxquels les agents peuvent accéder, accédez à {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}General{{< /ui >}}][6] et recherchez la section {{< ui >}}Internet Access{{< /ui >}}. Choisissez parmi les politiques d'accès suivantes : {{< ui >}}No Internet Access{{< /ui >}}, {{< ui >}}Default Allowlist{{< /ui >}}, {{< ui >}}Custom + Default Allowlist{{< /ui >}} ou {{< ui >}}Custom Allowlist{{< /ui >}}.

La liste d'autorisation par défaut inclut les domaines suivants. Cette liste évoluera au fil du temps en fonction des retours des utilisateurs et des changements de l'écosystème. Pour éviter les changements, configurez une liste d'autorisation personnalisée.

| Langage | Domaines |
|---|---|
| Clojure/JVM | `repo.clojars.org` |
| Go | `pkg.go.dev`, `proxy.golang.org`, `sum.golang.org`, `vuln.go.dev` |
| Java/JVM | `repo1.maven.org` |
| JavaScript/TypeScript | `registry.npmjs.org`, `registry.yarnpkg.com`, `repo.yarnpkg.com` |
| .NET/C# | `api.nuget.org` |
| PHP | `packagist.org`, `repo.packagist.org` |
| Python | `files.pythonhosted.org`, `pypi.org`, `pypi.python.org`, `pythonhosted.org` |
| Ruby | `api.rubygems.org`, `index.rubygems.org`, `rubygems.org` |
| Rust | `index.crates.io`, `static.crates.io` |
| Ubuntu | `archive.ubuntu.com`, `ports.ubuntu.com`, `security.ubuntu.com` |

### Configurer l'environnement du dépôt {#configure-repository-environment}

Configurez un environnement personnalisé pour Bits Code afin d'installer les dépendances, les formateurs, les linters et les outils de construction nécessaires à votre base de code. Chaque dépôt s'exécute dans son propre bac à sable isolé, et l'environnement définit les paramètres de ce bac à sable. 

Pour configurer un environnement de dépôt :

1. Allez dans {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Repositories{{< /ui >}}][5], et recherchez la section {{< ui >}}Environments{{< /ui >}}.
1. Cliquez sur {{< ui >}}Add Environment{{< /ui >}} pour créer une configuration de dépôt :
   1. Sélectionnez un dépôt dans la liste déroulante.
   1. (Facultatif) Sous {{< ui >}}Pre-installed Languages{{< /ui >}}, cliquez sur {{< ui >}}Select Versions{{< /ui >}} pour spécifier les versions de langage que le bac à sable doit utiliser.
   1. (Facultatif) Définissez des variables d'environnement et des secrets. Les variables d'environnement sont disponibles à la fois pendant la configuration de l'environnement et l'exécution de Bits Code. Les secrets sont disponibles en tant que variables d'environnement uniquement pendant la configuration de l'environnement.
   1. (Facultatif) Ajoutez un script shell avec des commandes de configuration à exécuter (par exemple : `pip install -r requirements.txt`).
1. Exécutez la commande de configuration pour vous assurer qu'elle s'exécute correctement.
1. Enregistrez la configuration.

Bits Code exécute la commande de configuration au démarrage et peut utiliser tous les outils installés dans votre environnement. La commande de configuration s'exécute avec un accès réseau activé pour télécharger les dépendances. Une fois la configuration terminée, votre politique [d'accès à Internet](#configure-internet-access) contrôle l'accès réseau sortant pendant l'exécution de l'agent. Comme les commandes de configuration s'exécutent sur le code de votre référentiel, ne les activez que si vous faites confiance au code du référentiel.

**Remarque** : Pour de meilleurs résultats, ajoutez un [fichier d'instructions personnalisées](#configure-custom-instructions) (comme `claude.md`) à votre référentiel avec des instructions sur la façon de compiler et de tester votre code.

## Dépannage {#troubleshooting}

### La création de GitHub PRs échoue de manière inattendue {#creation-of-github-prs-fails-unexpectedly}

Dans certains cas, notamment dans les dépôts comportant de nombreuses branches, GitHub n'exécute pas la vérification des autorisations lors de la création d'une branche pour la session. Si vous utilisez une application GitHub personnalisée, vous pouvez contourner ce problème en ajoutant l'autorisation `workflows:write` à votre application dans l'[intégration GitHub][2].

**Remarque** : Cette autorisation permet à Bits AI de créer des workflows dans votre référentiel et comporte des implications en matière de sécurité.

[1]: /fr/account_management/rbac/permissions/#bits-ai
[2]: https://app.datadoghq.com/integrations/github
[4]: /fr/integrations/guide/source-code-integration/?tab=go#tag-your-apm-telemetry-with-git-information
[5]: https://app.datadoghq.com/code/settings?tab=repositories
[6]: https://app.datadoghq.com/code/settings
[7]: /fr/bits_ai/bits_code/#start-a-session
[8]: /fr/bits_ai/bits_code/
[11]: /fr/bits_ai/bits_code/#supported-source-code-providers
[12]: /fr/bits_ai/bits_code/#custom-agent-skills-and-instructions

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}