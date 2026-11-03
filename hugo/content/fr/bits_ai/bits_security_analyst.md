---
aliases:
- /fr/bits_ai/bits_ai_security_analyst
further_reading:
- link: https://www.datadoghq.com/blog/bits-ai-security-analyst/
  tag: Blog
  text: Automatisez les investigations Cloud SIEM avec Bits AI Security Analyst
- link: https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026
  tag: Blog
  text: 'Nouveautés dans Cloud SIEM : enquêtes assistées par IA, renseignement sur
    les menaces amélioré et opérations de sécurité évolutives'
- link: https://www.datadoghq.com/blog/cloud-security-investigation-ai/
  tag: Blog
  text: Comment enquêter sur une compromission d'identifiants Cloud avec Bits Security
    Analyst
- link: https://www.datadoghq.com/blog/datadog-google-cloud-ai-stack/
  tag: Blog
  text: Évaluez, optimisez et sécurisez votre pile d'IA Google Cloud avec Datadog.
title: Bits Security Analyst
---
## Présentation {#overview}

Bits Security Analyst est un agent IA autonome qui enquête de bout en bout sur les signaux Cloud SIEM. Il interroge les signaux et les journaux de sécurité, et utilise un raisonnement basé sur les données pour aider les ingénieurs en sécurité à enquêter sur les alertes de menace et à formuler une recommandation concernant le verdict de chaque signal d'alerte. En réduisant l'effort manuel et la fatigue des analystes, Bits Security Analyst rend les opérations de sécurité plus fluides et plus efficaces.

### Fonctionnalités clés {#key-capabilities}

Les investigations de Bits Security Analyst sont autonomes. Si une règle de détection est activée, Bits AI investigue de manière autonome les signaux qui y sont associés.

Dans l'[Explorateur de signaux Cloud SIEM][5], vous pouvez cliquer sur l'onglet {{< ui >}}Bits Security Analyst{{< /ui >}} pour n'afficher que les signaux ayant fait l'objet d'une investigation par Bits AI. Dans la colonne Gravité, un statut Bits AI s'affiche comme En cours d'investigation, jusqu'à ce que le signal soit marqué comme Bénin ou Suspect.

{{< img src="bits_ai/bits_security_analyst_signals_explorer.png" alt="L'explorateur de signaux Cloud SIEM, sur l'onglet Bits Security Analyst" style="width:100%;" >}}

Lorsque vous cliquez sur une ligne contenant une investigation Bits AI, le panneau latéral d'investigation Bits AI s'ouvre :

{{< img src="bits_ai/bits_security_analyst_example.png" alt="Exemple de détection Bits Security Analyst, intitulée « Okta phishing detection with FastPass origin check »." style="width:100%;" >}}

Dans le panneau latéral, vous pouvez voir les conclusions de l'investigation de Bits AI, notamment :
- Conclusion générale
- Preuves clés utilisées pour parvenir à cette conclusion
- Étapes suivantes suggérées pour remédier au problème ou supprimer les règles de détection avec des attributs spécifiques
- Étapes d'investigation montrant les requêtes de données de Bits AI, y compris les résultats intégrés et les liens vers les requêtes complètes
- Analyse de chaque étape d'investigation

Vous pouvez également effectuer des étapes supplémentaires directement depuis le panneau latéral :
- Créer un élément de travail avec les résultats d'investigation Bits AI pré-remplis
- Exécuter un workflow avec un blueprint SOAR
- Déclarer un incident
- Ajouter une suppression de règle
- Archiver le signal ou afficher le signal avec l'interface Cloud SIEM habituelle
- Donner votre avis à Bits AI sur son analyse

De plus, lorsque vous utilisez les notifications Cloud SIEM pour envoyer de nouvelles alertes de signal vers Slack ou Jira, Bits AI met automatiquement à jour ces notifications. Il inclut des réponses montrant la conclusion de l'investigation de Bits AI, avec un lien vers l'investigation complète.

### Sources prises en charge {#supported-sources}

Bits AI peut effectuer des investigations sur les sources de logs de sécurité suivantes :
- Amazon GuardDuty, lorsque les [types de résultats][6] pris en charge couvrent :
  - Identifiants IAM anormaux et compromis
  - Exfiltration et utilisation abusive d'identifiants EC2 et de ressources
  - Modifications de la journalisation Bedrock, invocation anormale de modèles, récolte de coûts et injection directe de requêtes
  - séquences d'attaque de clusters EKS et ECS compromis
  - Accès aux identifiants Kubernetes, comportement anormal, exécution, élévation de privilèges, persistance, modifications de politiques et appelants malveillants
  - Comportement anormal de S3, exposition de données, appelants malveillants et activité de test d'intrusion
  - Évasion de défense CloudTrail ou S3
  - Séquences d'attaque corrélant la compromission des identifiants IAM et des données S3
- AWS CloudTrail
- Azure
- Cloudflare
- CrowdStrike
- GCP
- Kubernetes
- Microsoft Entra ID
- Okta
- Google Workspace
- Microsoft 365
- GitLab
- GitHub
- JumpCloud
- Salesforce
- Slack
- Snowflake
- SentinelOne
- Windows
- Hameçonnage par e-mail

## Configurer Bits Security Analyst {#set-up-bits-security-analyst}

### Prérequis {#prerequisites}

Pour utiliser Bits Security Analyst :
- Assurez-vous que votre organisation utilise une version non héritée de Cloud SIEM. Si vous avez besoin d'aide, contactez l'[assistance Datadog][1].
- Pour configurer Bits Security Analyst, vous avez besoin de la [permission][2] **Bits Security Analyst Config Write**.
- Pour afficher les enquêtes, vous devez disposer de **14 jours ou plus** d'historique de logs. Si vous disposez d'un historique de logs plus court, vous pouvez toujours configurer Bits Security Analyst, mais vous ne verrez aucune enquête tant que vous n'aurez pas atteint cette durée d'historique.

### Configuration {#setup}

Lorsque vous activez Bits Security Analyst, Datadog analyse vos règles, y compris les règles personnalisées, pour déterminer s'il peut enquêter en toute confiance sur les signaux qui leur sont associés. Pour toutes les règles éligibles d'une gravité supérieure à moyenne, il commence à enquêter de manière autonome sur les signaux. 

L'éligibilité d'une règle dépend du fait que Datadog ait développé la capacité d'enquête pour la source de logs, et que l'Agent soit en mesure d'enquêter sur la règle spécifique. Si vous avez de nouvelles règles personnalisées à évaluer, ou si vous souhaitez poser une question sur une règle qui n'a pas été rendue éligible, contactez le [support Datadog][1].

1. Dans Datadog, accédez à {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Bits Security Analyst{{< /ui >}} > [{{< ui >}}Analyst Configuration{{< /ui >}}][3].
1. Activez le commutateur pour {{< ui >}}Enable Bits Security Analyst{{< /ui >}}. Des paramètres supplémentaires s'affichent.
1. (Facultatif) Configurez les règles et les niveaux de gravité pour lesquels vous souhaitez que Bits Security Analyst enquête automatiquement sur les signaux. Il existe deux manières de procéder :
   - Cliquez sur {{< ui >}}Rule Settings{{< /ui >}} pour configurer les enquêtes pour des règles individuelles. Vous pouvez modifier la gravité minimale des signaux à enquêter, et activer ou désactiver des règles individuelles pour l'enquête.
   - Cliquez sur {{< ui >}}Query Filter{{< /ui >}} pour rédiger un filtre de requête de signal, afin que Bits Security Analyst n'enquête que sur les signaux correspondant à votre filtre.
1. Certaines sources de logs nécessitent des identifiants pour exécuter ou améliorer les enquêtes en accédant à des logs, à de la télémétrie ou à d'autres données qui ne se trouvent pas dans Datadog. Pour ajouter des identifiants, cliquez sur {{< ui >}}Edit credentials{{< /ui >}}. Dans la fenêtre {{< ui >}}Select or Add Connection{{< /ui >}} qui s'ouvre, suivez les instructions pour sélectionner une [connexion existante][4] depuis le catalogue d'actions, ou ajoutez une connexion. Datadog stocke et restreint de manière sécurisée toutes les informations d'identification à l'aide d'Actions Catalog.
   
   Certaines sources de logs nécessitent une configuration supplémentaire pour que vous puissiez créer des connexions HTTP. Voici quelques exemples :
   {{< collapse-content title="Configurer SentinelOne" level="h4" expanded=false id="sentinelone" >}}
   <ol>
     <li>Dans SentinelOne, assurez-vous d'avoir l'autorisation de créer un jeton d'API. Créez un utilisateur de service API S1, puis attribuez le rôle {{< ui >}}Viewer{{< /ui >}} à cet utilisateur.</li>
     <li>Dans Datadog, dans la fenêtre {{< ui >}}Select or Add Connection{{< /ui >}}, dans la liste déroulante, sélectionnez {{<  ui >}}New Connection{{< /ui >}}, puis cliquez sur la tuile {{< ui >}}HTTP{{< /ui >}}.</li>
     <li>Ajoutez les informations suivantes :
       <ul>
         <li>Dans le champ {{< ui >}}Description{{< /ui >}}, Datadog recommande d'ajouter la date d'expiration de votre jeton, afin de la rendre facilement accessible.</li>
         <li>Dans le champ {{< ui >}}Base URL{{< /ui >}}, saisissez l'URL de votre console de gestion SentinelOne.</li>
         <li>Sous {{< ui >}}Token Auth{{< /ui >}} :
           <ol>
             <li>Saisissez un nom pour votre jeton dans le champ {{< ui >}}Token Name{{< / ui >}}, et votre jeton d'API dans le champ {{< ui >}}Token Value{{< /ui >}}.</li>
             <li>Sous l'onglet {{< ui >}}Headers{{< /ui >}}, dans {{< ui  >}}Request Headers{{< /ui >}}, cliquez sur {{< ui >}}Add a Header{{< /ui >}}. Ajoutez les deux en-têtes suivants :
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

   {{< collapse-content title="Configurer CrowdStrike" level="h4" expanded=false id="crowdstrike" >}}
   <ol>
     <li>Dans CrowdStrike, accédez à <strong>Support and resources</strong>, puis cliquez sur <strong>API clients and keys</strong>.</li>
     <li>Cliquez sur <strong>Créer un client API</strong>.</li>
     <li>Sélectionnez les portées pour le client API :
       <ul>
         <li>Définissez toutes les portées sur <strong>Lecture seule</strong>, à l'exception de <strong>NGSIEM</strong>.</li>
         <li>Définissez la portée <strong>NGSIEM</strong> sur <strong>Lecture et écriture</strong>. L'interrogation de NGSIEM nécessite des requêtes POST, que CrowdStrike classe comme une action d'écriture.</li>
       </ul>
     </li>
     <li>Une fois le client API créé, enregistrez en toute sécurité l'<strong>Identifiant client</strong>, le <strong>Secret</strong> et l'<strong>URL de base</strong>. Le secret ne s'affiche qu'une seule fois et l'URL de base doit correspondre à votre région CrowdStrike.</li>
     <li>Dans Datadog, dans la fenêtre {{< ui >}}Select or Add Connection{{< /ui >}}, dans le menu déroulant, sélectionnez {{< ui >}}New Connection{{< /ui >}}, puis cliquez sur la tuile {{< ui >}}HTTP{{< /ui >}}.</li>
     <li>Ajoutez les informations suivantes :
       <ul>
         <li>Dans le champ {{< ui >}}Base URL{{< /ui >}}, saisissez votre URL de gestion CrowdStrike.</li>
         <li>Pour {{< ui >}}Authentication Type{{< /ui >}}, sélectionnez {{< ui >}}2 Step Auth{{< /ui >}}.</li>
       </ul>
     </li>
     <li>Sous {{< ui >}}Query your access token{{< /ui >}} :
       <ul>
         <li>Pour {{< ui >}}Secret Type{{< /ui >}}, sélectionnez {{< ui >}}Token Auth{{< /ui >}}, puis ajoutez deux jetons :
           <table>
             <thead>
               <tr>
                 <th>Nom du jeton</th>
                 <th>Valeur du jeton</th>
               </tr>
             </thead>
             <tr>
               <td><code>secret</code></td>
               <td>Votre secret CrowdStrike</td>
             </tr>
             <tr>
               <td><code>clientid</code></td>
               <td>Votre identifiant client CrowdStrike</td>
             </tr>
           </table>
         </li>
         <li>Dans le champ {{< ui >}}Request URL{{< /ui >}}, saisissez <code>{your_base_url}/oauth2/token</code> (par exemple, <code>https://api.crowdstrike.com/oauth2/token</code>).</li>
         <li>Dans le champ {{< ui >}}Body{{< /ui >}}, ajoutez votre <code>client_id</code> et <code>client_secret</code>. Le type de contenu doit être <code>application/x-www-form-urlencoded</code>.</li>
       </ul>
     </li>
     <li>Sous {{< ui >}}Get Access Token from Response{{< /ui >}}:
       <ul>
         <li>Définissez {{< ui >}}Variable Path to Access Token{{< /ui >}} sur <code>body.access_token</code>.</li>
         <li>Définissez {{< ui >}}Refresh Interval{{< /ui >}} sur <code>1700</code>.</li>
         <li>Sous {{< ui >}}Request Headers{{< /ui >}}, ajoutez les deux en-têtes suivants :
           <table>
             <thead>
               <tr>
                 <th>Nom</th>
                 <th>Valeur</th>
               </tr>
             </thead>
             <tr>
               <td><code>Authorization</code></td>
               <td><code>Bearer</code> suivi d'un espace, puis <code>{{accessToken}}</code></td>
             </tr>
             <tr>
               <td><code>Accept</code></td>
               <td><code>application/json</code></td>
             </tr>
           </table>
         </li>
       </ul>
     </li>
     <li>Cliquez sur {{< ui >}}Next, Confirm Access{{< /ui >}} pour vérifier votre connexion.</li>
   </ol>
   {{< /collapse-content >}}

### Ajouter des sources de connaissances {#add-knowledge-sources}

Vous pouvez fournir un contexte supplémentaire à Bits Security Analyst, tel que des détails sur les règles d'autorisation, les politiques et l'environnement de votre organisation, permettant à Bits de produire des enquêtes plus précises et adaptées aux besoins de votre organisation.

Pour ajouter des connaissances, dans Datadog, accédez à {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Bits Security Analyst{{< /ui >}} > [{{< ui >}}Knowledge Sources{{< /ui >}}][8]. Vous pouvez y ajouter deux types de connaissances :
- **Contexte général de l'organisation (Bits.md)** : Instructions au niveau de l'organisation que Bits Security Analyst doit appliquer à toutes les enquêtes.
  1. Cliquez sur **Modifier** pour rendre le champ modifiable afin d'effectuer vos modifications.
  1. Cliquez sur **Enregistrer**.
- **Contexte situationnel** : Faits spécifiques à l'enquête que Bits Security Analyst doit appliquer dans des situations précises. Vous pouvez rechercher et filtrer le tableau des entrées de contexte, et choisir d'afficher les entrées expirées, pour obtenir une vue d'ensemble du contexte existant.
  1. Cliquez sur **Créer une entrée de contexte**. Dans la fenêtre qui s'ouvre, saisissez :
     1. **Titre** : Un titre court pour votre entrée.
     1. **Description du contexte** : Les informations que vous souhaitez que Bits Security Analyst prenne en compte.
     1. **Statut** : Choisissez d'activer cet élément de contexte ou de l'enregistrer sans l'activer.
     1. **Date d'expiration** (facultatif) : Une date à laquelle Bits Security Analyst cessera de prendre en compte cet élément de contexte.
  1. Cliquez sur **Créer une entrée**. La fenêtre se ferme et votre contexte apparaît dans le tableau.

### Recevoir des notifications pour les enquêtes terminées {#get-notifications-for-completed-investigations}

Vous pouvez créer des règles de notification de sécurité pour recevoir une notification lorsque Bits Security Analyst termine une enquête. Pour ce faire, suivez les instructions dans [Créer des règles de notification][7]. Lors de la spécification des tags et attributs qui doivent être présents pour que la règle de notification soit déclenchée, ajoutez le tag `@workflow.bits_investigator.state:*`.

## Désactiver Bits Security Analyst {#disable-bits-security-analyst}

1. Dans Datadog, accédez à {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Bits Security Analyst{{< /ui >}} > [{{< ui >}}Analyst Configuration{{< /ui >}}][3].
1. Faites défiler jusqu'en bas de la page. Sous {{< ui >}}Disable Bits Security Analyst{{< /ui >}}, désactivez le commutateur {{< ui >}}Enabled{{< /ui >}}.
   <div class="alert alert-warning">La désactivation de Bits Security Analyst réinitialise définitivement tous les paramètres de configuration.</div>

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help
[2]: /fr/account_management/rbac/permissions/#cloud-security-platform
[3]: https://app.datadoghq.com/security/configuration/bits-ai-security-analyst/analyst-configuration
[4]: /fr/actions/connections/
[5]: https://app.datadoghq.com/security/siem/signals
[6]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-active.html
[7]: /fr/security/notifications/rules/#create-notification-rules
[8]: https://app.datadoghq.com/security/configuration/bits-ai-security-analyst/knowledge-sources