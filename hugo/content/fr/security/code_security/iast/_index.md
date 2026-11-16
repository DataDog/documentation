---
aliases:
- /fr/security/application_security/code_security/
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/datadog-code-security/
  tag: Blog
  text: Protégez le cycle de vie du code et des bibliothèques de votre application
    avec Datadog Code Security.
- link: https://www.datadoghq.com/blog/code-security-secret-scanning
  tag: Blog
  text: Détectez et bloquez les identifiants exposés avec Datadog Secret Scanning.
- link: /security/code_security/iast/setup/
  tag: Documentation
  text: Configurez l'analyse de code au moment de l'exécution (IAST).
- link: /security/code_security/iast/security_controls/
  tag: Documentation
  text: Contrôles de sécurité
- link: /security/ticketing_integrations
  tag: Documentation
  text: Intégrations de gestion des tickets
- link: /security/automation_pipelines/
  tag: Documentation
  text: Pipelines d'automatisation
- link: /security/notifications/
  tag: Documentation
  text: Notifications de sécurité
title: Analyse de code au moment de l'exécution (IAST)
---
## Présentation {#overview}

L'analyse de code au moment de l'exécution (IAST) de Datadog identifie les vulnérabilités au niveau du code dans vos services, en utilisant une approche Interactive Application Security Testing (IAST) pour trouver des vulnérabilités au sein de votre code d'application en fonction de votre instrumentation d'application Datadog. L'IAST permet à Datadog d'identifier les vulnérabilités en utilisant le trafic d'application légitime au lieu de s'appuyer sur des tests externes qui pourraient nécessiter une configuration supplémentaire ou une planification périodique. Il surveille également les interactions de votre code avec d'autres composants de votre pile, tels que les bibliothèques et l'infrastructure, fournissant une vue à jour de votre surface d'attaque.

## Fonctionnement {#how-it-works}

L'analyse de code au moment de l'exécution (IAST) utilise la bibliothèque de tracing Datadog pour suivre les données contrôlées par l'utilisateur au fur et à mesure qu'elles circulent dans votre application lors de l'exécution. Une vulnérabilité n'est signalée que lorsque l'IAST peut confirmer qu'une entrée contaminée atteint un point vulnérable du code, ce qui permet de conserver des résultats exploitables.

- **Suivi des sources de données :** L'IAST observe les données entrant dans votre application à partir de sources externes telles que les URL de requête, les corps ou les en-têtes. Ces entrées sont marquées et suivies tout au long de leur cycle de vie.
- **Analyse du flux de données :** La bibliothèque de tracing Datadog suit la manière dont les données d'entrée se déplacent dans l'application, même lorsqu'elles sont transformées, divisées ou combinées. Cela permet à l'IAST de comprendre si et comment l'entrée d'origine atteint des parties sensibles du code.
- **Identification des points vulnérables :** L'IAST détecte les emplacements du code où les entrées contrôlées par l'utilisateur sont utilisées de manière potentiellement non sécurisée, par exemple dans des requêtes SQL, l'exécution de code dynamique ou le rendu HTML.
- **Confirmation de la vulnérabilité :** Une vulnérabilité n'est signalée que lorsque l'IAST peut confirmer qu'une entrée contaminée atteint réellement un point vulnérable du code. Cette approche minimise les faux positifs et permet de conserver des résultats exploitables.

## Types de vulnérabilités pris en charge {#supported-vulnerability-types}

Datadog IAST détecte les types de vulnérabilités au niveau du code suivants dans les langages pris en charge. La couverture peut varier selon le langage et le framework ; pour une prise en charge au niveau du framework, consultez les [Exigences de compatibilité][5].

| Gravité | Règle de détection | Java | .NET | Node.js | Python |
|----------|---------------------------------------|------|------|---------|--------|
| Critique | Injection NoSQL | FAUX | VRAI | VRAI | FAUX |
| Critique | Injection SQL | VRAI | VRAI | VRAI | VRAI |
| Critique | Server-Side Request Forgery (SSRF) | VRAI | VRAI | VRAI | VRAI |
| Critique | Injection de code | FAUX | FAUX | VRAI | FAUX |
| Critique | Injection de commande | VRAI | VRAI | VRAI | VRAI |
| Élevée | Injection LDAP | VRAI | VRAI | VRAI | FAUX |
| Élevée | Injection HTML dans les e-mails | VRAI | VRAI | VRAI | FAUX |
| Élevée | Secrets codés en dur | VRAI | VRAI | VRAI | FAUX |
| Élevée | Mots de passe codés en dur | FAUX | FAUX | VRAI | FAUX |
| Élevée | Traversée de répertoires | VRAI | VRAI | VRAI | VRAI |
| Élevée | Violation de la limite de confiance | VRAI | VRAI | FAUX | FAUX |
| Élevée | Cross-Site Scripting (XSS) | VRAI | VRAI | FAUX | FAUX |
| Élevée | Désérialisation non fiable | VRAI | FAUX | FAUX | FAUX |
| Élevée | Redirection non validée | VRAI | VRAI | VRAI | FAUX |
| Élevée | Injection XPath | VRAI | VRAI | FAUX | FAUX |
| Élevée | Injection d'en-tête | VRAI | VRAI | VRAI | VRAI |
| Élevée | Fuite de liste de répertoires | VRAI | FAUX | FAUX | FAUX |
| Élevée | Échappement HTML par défaut invalide | VRAI | FAUX | FAUX | FAUX |
| Élevée | Altération de la méthode HTTP | VRAI | FAUX | FAUX | FAUX |
| Moyen | Cookie sans SameSite | VRAI | VRAI | VRAI | VRAI |
| Moyen | Cookie non sécurisé | VRAI | VRAI | VRAI | VRAI |
| Moyen | Cookie sans HttpOnly | VRAI | VRAI | VRAI | VRAI |
| Moyen | Hachage faible | VRAI | VRAI | VRAI | VRAI |
| Moyen | Chiffrement faible | VRAI | VRAI | VRAI | VRAI |
| Moyen | Fuite de trace de pile | VRAI | VRAI | FAUX | FAUX |
| Moyen | Injection par réflexion | VRAI | VRAI | FAUX | FAUX |
| Moyen | Protocole d'authentification non sécurisé | VRAI | VRAI | FAUX | FAUX |
| Moyen | Clé codée en dur | FAUX | VRAI | FAUX | FAUX |
| Moyen | Mise en page JSP non sécurisée | VRAI | FAUX | FAUX | FAUX |
| Faible | En-tête HSTS manquant | VRAI | VRAI | VRAI | FAUX |
| Faible | En-tête X-Content-Type-Options manquant | VRAI | VRAI | VRAI | FAUX |
| Faible | Faible entropie | VRAI | VRAI | VRAI | VRAI |
| Faible | Admin Console active | VRAI | FAUX | FAUX | FAUX |
| Faible | Délai d'expiration de session | VRAI | FAUX | FAUX | FAUX |
| Faible | Réécriture de session | VRAI | FAUX | FAUX | FAUX |

## Fonctionnalités clés {#key-capabilities}

### Examiner et hiérarchiser les vulnérabilités {#review-and-prioritize-vulnerabilities}

Le [Vulnerabilities Explorer pour IAST][1] fournit une vue dédiée, centrée sur les vulnérabilités, des vulnérabilités au niveau du code détectées par IAST. Toutes les découvertes dans cet Explorer correspondent à des vulnérabilités confirmées dans des services exécutés avec la bibliothèque de traçage Datadog et IAST activé. Chaque fonctionnalité de Code Security possède son propre Explorer (SAST, SCA, IAST, Secrets Scanning et IaC), de sorte que les découvertes IAST ne sont pas mélangées avec d'autres types dans cette vue.

Chaque découverte comprend une brève description, les services impactés, le type de vulnérabilité, les heures de première et dernière détection, ainsi que le fichier, la méthode et le numéro de ligne exacts où le problème a été confirmé. Vous pouvez filtrer les résultats par service, équipe, environnement, gravité et d'autres facettes pour vous concentrer sur le travail qui importe à votre groupe.

#### Datadog Severity Score {#datadog-severity-score}

Comme IAST détecte les vulnérabilités dans votre code propriétaire, les découvertes ne possèdent pas de CVE public ou de score CVSS. Datadog attribue une **gravité de base** pour chaque type de vulnérabilité (par exemple, injection de commande ou injection SQL), puis ajuste cette base en **Datadog Severity Score** en fonction du contexte d'exécution et des signaux d'exploitabilité observés dans votre environnement. Ces facteurs aident à distinguer le risque théorique des vulnérabilités les plus susceptibles d'être exploitées dans des environnements réels. Le tableau ci-dessous décrit comment chaque facteur influence le score final.

| Facteur de risque | Comment il est évalué | Impact sur le score |
|---|---|---|
| Gravité de base | Définie par Datadog en fonction du type de vulnérabilité (par exemple, injection de commande, injection SQL). | Point de départ pour le score de gravité. |
| Contexte d'exécution en production | Indique si le service concerné est exécuté dans un environnement de production. | Diminué si le service n'est pas exécuté en production. |
| Sous attaque | Preuve d'une activité d'attaque active ciblant le service. | Diminué si aucune activité d'attaque n'est observée. |

#### Indicateurs d'exécution {#runtime-indicators}

Le panneau latéral de la vulnérabilité affiche les facteurs de contexte d'exécution sous forme d'indicateurs, afin que vous puissiez voir en un coup d'œil pourquoi le score d'une découverte a été ajusté :

- **{{< ui >}}Service In Production{{< /ui >}}** : Correspond au facteur **Contexte d'exécution en production**. Datadog détermine si un service est exécuté en production à partir de ses tags `env` et `environment`. Si le service concerné n'est pas en cours d'exécution en production, le Datadog Severity Score diminue.
- **{{< ui >}}Exposed to Attacks{{< /ui >}}** : Correspond au facteur **Sous attaque**. Un service est marqué comme exposé aux attaques si un signal de sécurité a été détecté sur celui-ci au cours des 15 derniers jours. Si aucune activité d'attaque n'est observée, le panneau affiche {{< ui >}}Not Exposed to Attacks{{< /ui >}} et le Datadog Severity Score diminue.

Pour voir comment chaque indicateur a affecté une découverte spécifique, ouvrez l'onglet {{< ui >}}Datadog Severity Breakdown{{< /ui >}} dans le panneau latéral. Pour plus d'informations sur la manière dont ces risques sont évalués dans Datadog Security, consultez [Boîte de réception de sécurité][19].

### Remédier à une vulnérabilité de code {#remediate-a-code-vulnerability}

Cliquez sur n'importe quelle découverte dans le [Vulnerabilities Explorer pour IAST][1] pour ouvrir le panneau latéral de vulnérabilité, qui fournit aux développeurs et aux ingénieurs de sécurité le contexte complet nécessaire pour corriger le problème.

Le panneau résume la gravité de la découverte, le type de vulnérabilité, la date d'échéance et les indicateurs d'exécution (tels que {{< ui >}}Exposed to Attacks{{< /ui >}} et {{< ui >}}Service In Production{{< /ui >}}), et montre où la vulnérabilité a été confirmée dans votre code, quand elle a été détectée pour la première et la dernière fois, quel service, environnement et équipe elle impacte, ainsi que les références aux normes pertinentes comme le CWE. Lorsque l'intégration [GitHub][7], [GitLab][8] ou [Azure DevOps][18] est activée, Datadog affiche également le commit qui a introduit la vulnérabilité ainsi qu'un extrait du code vulnérable.

Le panneau latéral comprend des onglets pour {{< ui >}}Data Flow{{< /ui >}} (comment l'entrée corrompue atteint le récepteur vulnérable), {{< ui >}}Remediation{{< /ui >}} (conseils étape par étape et exemple de code pour votre framework), {{< ui >}}Datadog Severity Breakdown{{< /ui >}} (comment le contexte d'exécution a influencé le score) et {{< ui >}}More Information{{< /ui >}} (références associées). Depuis le panneau {{< ui >}}Next Steps{{< /ui >}} sur la droite, vous pouvez modifier le statut de la découverte, la masquer, créer un ticket Jira ou ServiceNow, ou accéder directement aux étapes de remédiation.

Pour les workflows répétables, utilisez {{< ui >}}Set up Automation{{< /ui >}} afin d'appliquer automatiquement les mêmes actions aux découvertes nouvelles et existantes qui correspondent à vos critères. Consultez [Automatiser le triage et la remédiation](#automate-triage-and-remediation) pour plus de détails.

### Créer des tickets à partir des découvertes {#create-tickets-from-findings}

Vous pouvez créer un ticket bidirectionnel dans Jira ou ServiceNow directement depuis n'importe quelle découverte IAST pour suivre et remédier aux problèmes dans vos workflows existants. Le statut du ticket reste synchronisé entre Datadog et votre outil de gestion des tickets, de sorte que les mises à jour effectuées dans l'un ou l'autre système restent alignées. Pour plus d'informations, consultez [Intégrations de gestion des tickets][13].

Pour créer des tickets en masse ou dans le cadre d'un processus répétable, utilisez [Pipelines d'automatisation][14] pour ouvrir automatiquement des tickets pour les découvertes qui correspondent à des conditions telles que la gravité, le service, l'environnement ou l'équipe.

### Masquer les résultats {#mute-findings}

Pour masquer un constat, cliquez sur {{< ui >}}Mute{{< /ui >}} dans le panneau de détails du constat. Cela ouvre un workflow où vous pouvez [créer une règle d'automatisation][15] pour un filtrage tenant compte du contexte par valeurs de tag (par exemple, par `service` ou `env`). Ignorer une découverte la masque du triage actif et l'exclut des rapports.

Pour restaurer un constat en mode mute, cliquez sur {{< ui >}}Unmute{{< /ui >}} dans le panneau de détails. Vous pouvez également utiliser le filtre {{< ui >}}Status{{< /ui >}} sur le [Vulnerabilities Explorer pour IAST][1] pour examiner les découvertes ignorées.

### Notifier lors de nouvelles découvertes {#notify-on-new-findings}

Acheminez les nouvelles découvertes IAST vers la bonne équipe dès qu'elles sont détectées. Les notifications Datadog prennent en charge Slack, Microsoft Teams, e-mail, PagerDuty, les webhooks, et plus encore, afin que chaque équipe puisse recevoir les découvertes là où elle travaille déjà. Pour les détails de configuration, consultez [Notifications de sécurité][16].

### Automatiser le triage et la remédiation {#automate-triage-and-remediation}

Utilisez les [Pipelines d'automatisation][14] pour appliquer des actions de triage et de remédiation cohérentes aux découvertes IAST nouvelles et existantes, sans intervention manuelle. Depuis le menu {{< ui >}}Set up Automation{{< /ui >}} dans le panneau latéral de la découverte — ou depuis la page des paramètres Automation Pipelines —, vous pouvez :

- [Ignorer les découvertes][15] qui correspondent à des conditions telles que le service, l'environnement ou le type de vulnérabilité.
- [Définir une date d'échéance][14] en fonction de la gravité et du contexte d'exécution, afin que les SLA de remédiation soient appliqués automatiquement.
- [Ajouter des découvertes à la boîte de réception Security][14] pour concentrer votre équipe sur les tâches les plus prioritaires.
- [Créer des tickets][13] dans Jira ou ServiceNow pour les découvertes correspondantes.
- [Notifier][16] la bonne équipe via Slack, Microsoft Teams, e-mail ou d'autres canaux.

Les pipelines d'automatisation s'appliquent à la fois aux découvertes nouvellement détectées et à celles qui existent déjà dans Datadog, de sorte que les modifications de politique sont appliquées rétroactivement dans tout votre environnement.

### Contexte de vulnérabilité au niveau du code dans APM {#code-level-vulnerability-context-in-apm}

IAST enrichit les informations déjà collectées par l'Application Performance Monitoring (APM) en signalant les services où des vulnérabilités au niveau du code ont été confirmées. Les services vulnérables sont mis en évidence directement dans la vue Security du [Catalogue APM][17], ce qui vous permet de passer d'un service vulnérable à ses traces, logs et contexte d'infrastructure en un seul clic.

## Cycle de vie des vulnérabilités {#vulnerability-lifecycle}

Datadog suit les vulnérabilités IAST au niveau du **service**, en fonction de ce que les bibliothèques de traçage Datadog confirment dans vos applications en cours d'exécution. Une vulnérabilité est ouverte lorsque IAST confirme une vulnérabilité au niveau du code dans un service en cours d'exécution. Une vulnérabilité est fermée lorsque Datadog ne la détecte plus conformément aux règles de cycle de vie ci-dessous.

| Produit | Périmètre | Scénario | Lorsqu'une vulnérabilité est ouverte | Lorsqu'une vulnérabilité est fermée |
|---|---|---|---|---|
| IAST | Service | Service en cours d'exécution | Datadog confirme une vulnérabilité au niveau du code dans un service en cours d'exécution. | Après 14 jours, si la vulnérabilité n'est pas détectée à nouveau au cours de cette période. |
| IAST | Service | Nouvelle version de service déployée | Datadog confirme une vulnérabilité au niveau du code dans un service en cours d'exécution. | 24 heures après que la vulnérabilité ne soit plus détectée dans la nouvelle version, dans l'environnement où elle a été détectée à l'origine. |

Si une vulnérabilité précédemment fermée est détectée à nouveau dans les 15 mois, Datadog la rouvre automatiquement afin que les problèmes récurrents ne soient pas perdus.

## Configurer l'analyse de code en temps réel (IAST) {#set-up-runtime-code-analysis-iast}

Pour activer IAST, configurez la bibliothèque de tracing Datadog pour votre service. Des instructions détaillées et spécifiques au langage sont disponibles dans [Set up Runtime Code Analysis (IAST)][9]. Si vous avez besoin d'aide supplémentaire, contactez [Datadog support][11].

Pour plus d'informations sur la désactivation d'IAST, consultez [Disabling Code Security][12].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/vm/code
[3]: /fr/integrations/jira/
[4]: /fr/account_management/rbac/permissions/#integrations
[5]: /fr/security/code_security/iast/setup/#using-datadog-tracing-libraries
[7]: /fr/integrations/github/
[8]: /fr/integrations/gitlab/
[18]: /fr/integrations/azure_devops/
[19]: /fr/security/security_inbox/#what-appears-in-security-inbox
[9]: /fr/security/code_security/iast/setup/
[10]: https://app.datadoghq.com/security/configuration/code-security/setup
[11]: https://www.datadoghq.com/support/
[12]: /fr/security/code_security/troubleshooting
[13]: /fr/security/ticketing_integrations
[14]: /fr/security/automation_pipelines/
[15]: /fr/security/automation_pipelines/mute
[16]: /fr/security/notifications/
[17]: https://app.datadoghq.com/services?lens=Security