---
aliases:
- /fr/bits_ai/bits_ai_security_analyst
further_reading:
- link: https://www.datadoghq.com/blog/bits-ai-security-analyst/
  tag: Blog
  text: Automatiser les enquêtes Cloud SIEM avec Bits AI Security Analyst
- link: https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026
  tag: Blog
  text: 'Nouveautés de Cloud SIEM : enquêtes assistées par l''IA, renseignement sur
    les menaces amélioré et opérations de sécurité évolutives'
title: Bits Security Analyst
---
## Aperçu {#overview}

Bits Security Analyst est un agent IA autonome qui enquête sur les signaux Cloud SIEM de bout en bout. Il interroge les signaux de sécurité et les journaux, et utilise un raisonnement basé sur les données pour aider les ingénieurs en sécurité à enquêter sur les alertes de menaces et à formuler une recommandation sur le verdict de chaque signal d'alerte. En réduisant l'effort manuel et la fatigue des analystes, Bits Security Analyst rend les opérations de sécurité plus fluides et plus efficaces.

### Fonctionnalités clés {#key-capabilities}

Les enquêtes de Bits Security Analyst sont autonomes. Si une règle de détection est activée, Bits AI enquête de manière autonome sur les signaux qui y sont associés.

Dans l'[Explorateur de signaux Cloud SIEM][5], vous pouvez cliquer sur l'onglet {{< ui >}}Bits Security Analyst{{< /ui >}} pour n'afficher que les signaux que Bits AI a enquêtés. Dans la colonne Sévérité, un statut de Bits AI s'affiche comme En cours d'enquête, jusqu'à ce que le signal soit marqué comme soit Bénin soit Suspect.

{{< img src="bits_ai/bits_security_analyst_signals_explorer.png" alt="L'explorateur de signaux Cloud SIEM, sur l'onglet Bits Security Analyst" style="width:100%;" >}}

Lorsque vous cliquez sur une ligne avec une enquête de Bits AI, le panneau latéral d'enquête de Bits AI s'ouvre :

{{< img src="bits_ai/bits_security_analyst_example.png" alt="Exemple de détection de Bits Security Analyst, intitulé 'Détection de phishing Okta avec vérification d'origine FastPass'." style="width:100%;" >}}

Dans le panneau latéral, vous pouvez voir les résultats d'enquête de Bits AI, y compris :
- Conclusion générale
- Preuves clés utilisées pour parvenir à cette conclusion
- Étapes d'enquête montrant les requêtes de données de Bits AI, y compris les résultats intégrés et les liens vers les requêtes complètes
- Analyse de chaque étape d'enquête

Vous pouvez également prendre des mesures supplémentaires directement depuis le panneau latéral :
- Créer un cas avec des résultats d'enquête Bits AI pré-remplis
- Exécuter un flux de travail avec un modèle SOAR
- Déclarer un incident
- Ajouter une suppression de règle
- Archiver le signal, ou visualiser le signal avec l'interface Cloud SIEM habituelle
- Donner un retour à Bits AI sur son analyse

De plus, lorsque vous utilisez les notifications Cloud SIEM pour envoyer de nouvelles alertes de signal à Slack ou Jira, Bits AI met automatiquement à jour ces notifications. Il inclut des réponses montrant la conclusion d'enquête de Bits AI, avec un lien vers l'enquête complète.

### Sources prises en charge {#supported-sources}

Bits AI peut mener des enquêtes sur les sources de journaux de sécurité suivantes :
- Amazon GuardDuty
  - Les catégories de détection [Finding categories][6] incluent un comportement IAM anormal, l'exfiltration et l'utilisation frauduleuse des identifiants EC2, l'exposition des données S3, l'évasion de défense CloudTrail ou S3, et des séquences d'attaque corrélant la compromission des identifiants IAM et des données S3.
- AWS CloudTrail
- Azure
- GCP
- Kubernetes
- Microsoft Entra ID
- Okta
- Google Workspace
- Microsoft 365
- GitHub
- Snowflake
- SentinelOne
- Phishing par e-mail

## Configurer Bits Security Analyst {#set-up-bits-security-analyst}

### Prérequis {#prerequisites}

Pour utiliser Bits Security Analyst:
- Assurez-vous que votre organisation utilise une version non obsolète de Cloud SIEM. Si vous avez besoin d'aide, contactez l'[assistance Datadog][1].
- Pour configurer Bits Security Analyst, vous avez besoin de la **Bits Security Analyst Config Write** [permission][2].
- Pour voir les enquêtes, vous devez avoir **14 jours ou plus** d'historique des journaux. Si vous avez un historique des journaux plus court, vous pouvez toujours configurer Bits Security Analyst, mais vous ne verrez aucune enquête tant que vous n'aurez pas cet historique.

### Configuration {#setup}

Lorsque vous activez Bits Security Analyst, Datadog analyse vos règles, y compris les règles personnalisées, pour déterminer s'il peut enquêter en toute confiance sur les signaux qui leur sont associés. Pour toutes les règles éligibles de gravité supérieure à moyenne, il commence à enquêter de manière autonome sur les signaux. 

L'éligibilité des règles dépend de la capacité d'enquête que Datadog a construite pour la source de journal, et de la capacité de l'Agent à enquêter sur la règle spécifique. Si vous avez de nouvelles règles personnalisées à évaluer, ou si vous souhaitez poser des questions sur une règle qui n'a pas été rendue éligible, contactez [le support Datadog][1].

1. Dans Datadog, allez à {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Bits Security Analyst{{< /ui >}}][3].
1. Activez le commutateur pour {{< ui >}}Enable Bits Security Analyst{{< /ui >}}. Des paramètres supplémentaires apparaissent.
1. (Optionnel) Configurez les règles et les niveaux de gravité que vous souhaitez que Bits Security Analyst enquête automatiquement sur les signaux. Il existe deux façons de procéder :
   - Cliquez sur {{< ui >}}Rule Settings{{< /ui >}} pour configurer les enquêtes pour des règles individuelles. Vous pouvez changer la gravité minimale pour que les signaux soient enquêtés, et activer ou désactiver des règles individuelles pour l'enquête.
   - Cliquez sur {{< ui >}}Query Filter{{< /ui >}} pour écrire un filtre de requête de signal, afin que Bits Security Analyst n'enquête que les signaux qui correspondent à votre filtre.
1. Certaines sources de journaux nécessitent des identifiants pour exécuter ou améliorer les enquêtes en accédant aux journaux, à la télémétrie ou à d'autres données qui ne sont pas dans Datadog. Pour ajouter des identifiants, cliquez sur {{< ui >}}Edit credentials{{< /ui >}}. Dans la fenêtre {{< ui >}}Select or Add Connection{{< /ui >}} qui s'ouvre, suivez les instructions pour sélectionner une [connexion existante][4] dans le catalogue d'actions, ou ajoutez une connexion. Datadog stocke et restreint en toute sécurité tous les identifiants en utilisant le catalogue d'actions.
   
   Certaines sources de journaux nécessitent une configuration supplémentaire afin que vous puissiez créer des connexions HTTP. Voici un exemple :
   {{< collapse-content title="Configurer SentinelOne" level="h4" expanded=false id="sentinelone" >}}
   <ol>
     <li>Dans SentinelOne, assurez-vous d'avoir la permission de créer un jeton API. Créez un utilisateur de service API S1, puis attribuez le rôle {{< ui >}}Viewer{{< /ui >}} à cet utilisateur.</li>
     <li>Dans Datadog, dans la fenêtre {{< ui >}}Select or Add Connection{{< /ui >}}, dans le menu déroulant, sélectionnez {{<  ui >}}New Connection{{< /ui >}}, puis cliquez sur la tuile {{< ui >}}HTTP{{< /ui >}}.</li>
     <li>Ajoutez les informations suivantes :
       <ul>
         <li>Dans le champ {{< ui >}}Description{{< /ui >}}, Datadog recommande d'ajouter la date d'expiration de votre jeton, pour la rendre facilement accessible.</li>
         <li>Dans le champ {{< ui >}}Base URL{{< /ui >}}, entrez l'URL de votre console de gestion SentinelOne.</li>
         <li>Sous {{< ui >}}Token Auth{{< /ui >}} :
           <ol>
             <li>Entrez un nom pour votre jeton dans le champ {{< ui >}}Token Name{{< / ui >}}, et votre jeton API dans le champ {{< ui >}}Token Value{{< /ui >}}.</li>
             <li>Dans l'onglet {{< ui >}}Headers{{< /ui >}}, sous {{< ui  >}}Request Headers{{< /ui >}}, cliquez sur {{< ui >}}Add a Header{{< /ui >}}. Ajoutez les deux en-têtes suivants :
               <table>
                 <thead>
                   <tr>
                     <th>Nom</th>
                     <th>Valeur</th>
                   </tr>
                 </thead>
                 <tr>
                   <td><code>Authorization</code></td>
                   <td><code>Bearer</code> suivi d'un espace, puis insérez le {{< ui >}}Token Name{{< /ui >}} que vous avez défini</td>
                 </tr>
                 <tr>
                   <td><code>Content-Type</code></td>
                   <td><code>application/json</code></td>
                 </tr>
               </table>
             </li>
           </ol>
       </ul>
     </li>
     <li>Cliquez sur {{< ui >}}Next, Confirm Access{{< /ui >}} pour vérifier votre connexion.</li>
   </ol>
   {{< /collapse-content >}}

## Désactiver Bits Security Analyst {#disable-bits-security-analyst}

1. Dans Datadog, allez à {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Bits Security Analyst{{< /ui >}}][3].
1. Faites défiler jusqu'en bas de la page. Sous {{< ui >}}Disable Bits Security Analyst{{< /ui >}}, désactivez le commutateur {{< ui >}}Enabled{{< /ui >}}.
   <div class="alert alert-warning">Désactiver Bits Security Analyst réinitialise définitivement tous les paramètres de configuration.</div>

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help
[2]: /fr/account_management/rbac/permissions/#cloud-security-platform
[3]: https://app.datadoghq.com/security/configuration/bits-ai-security-analyst
[4]: /fr/actions/connections/
[5]: https://app.datadoghq.com/security/siem/signals
[6]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-active.html