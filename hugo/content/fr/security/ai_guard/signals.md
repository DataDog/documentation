---
further_reading:
- link: /security/ai_guard/
  tag: Documentation
  text: AI Guard
- link: /security/ai_guard/onboarding/
  tag: Documentation
  text: Démarrez avec AI Guard
- link: /security/detection_rules/
  tag: Documentation
  text: Règles de détection
title: Signaux de sécurité AI Guard
---
{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard n'est pas disponible dans le {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

Les signaux de sécurité AI Guard offrent une visibilité sur les menaces et les attaques qu'AI Guard détecte dans vos applications. Ces signaux sont construits sur les [signaux de sécurité AAP (Application and API Protection)][1] et s'intègrent aux workflows de surveillance de la sécurité de Datadog.

## Comprendre les signaux AI Guard {#understand-ai-guard-signals}

Datadog crée des signaux de sécurité AI Guard lorsqu'il détecte une menace basée sur une règle de détection configurée. Les signaux indiquant des menaces telles que l'injection de prompt, le jailbreak ou l'utilisation abusive d'outils apparaissent dans Datadog Security Signals Explorer. Ces signaux peuvent fournir :

- **Détection des menaces** : Contexte de l'attaque basé sur vos règles de détection configurées
- **Informations sur les actions** : Informations sur les actions bloquées ou autorisées selon les paramètres de vos règles
- **Contexte d'investigation riche** : Catégories d'attaques détectées, résultats de l'évaluation AI Guard et liens vers les spans AI Guard associés pour une analyse complète
- **Runbooks personnalisés** : Conseils de remédiation et procédures de réponse personnalisés pour des scénarios de menace spécifiques

Pour vous aider à prioriser vos efforts de remédiation, AI Guard attribue automatiquement un niveau de gravité à chaque signal de sécurité. Vous pouvez créer des [règles de détection personnalisées](#create-detection-rules) pour personnaliser les niveaux de gravité et définir des réponses de sécurité spécifiques.

## Créer des règles de détection {#create-detection-rules}

Vous pouvez créer des règles de détection personnalisées en définissant des seuils pour le moment où vous souhaitez recevoir des notifications ; par exemple, plus de 5 `DENY` actions en 10 minutes. Lorsque les évaluations AI Guard dépassent ces seuils, il génère des signaux de sécurité.

Pour créer des règles de détection AI Guard :
1. Dans Datadog, accédez à [AI Guard Detection Rules Explorer][2], puis cliquez sur {{< ui >}}New Rule{{< /ui >}}.
   {{< img src="security/ai_guard/ai_guard_detection_rules_1.png" alt="AI Guard Detection Rules Explorer" style="width:100%;" >}}
1. Sous {{< ui >}}Define your Real-time rule{{< /ui >}}, choisissez le type de règle à créer.
1. Sous {{< ui >}}Define Search Queries{{< /ui >}}, définissez les types de tags pour lesquels vous souhaitez créer des signaux. Vous pouvez utiliser les attributs AI Guard suivants pour filtrer et cibler des modèles de menace spécifiques :
   <table>
     <thead>
       <tr>
         <th>Tag</th>
         <th>Description</th>
         <th>Valeurs possibles</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td><code>@ai_guard.action</code></td>
         <td>Filtrer par résultat d'évaluation d'AI Guard</td>
         <td><code>ALLOW</code> ou <code>DENY</code></td>
       </tr>
       <tr>
         <td><code>@ai_guard.attack_categories</code></td>
         <td>Cibler des types d'attaques spécifiques</td>
         <td>
           <ul>
             <li><code>jailbreak</code></li>
             <li><code>indirect-prompt-injection</code></li>
             <li><code>destructive-tool-call</code></li>
             <li><code>denial-of-service-tool-call</code></li>
             <li><code>security-exploit</code></li>
             <li><code>authority-override</code></li>
             <li><code>role-play</code></li>
             <li><code>instruction-override</code></li>
             <li><code>obfuscation</code></li>
             <li><code>system-prompt-extraction</code></li>
             <li><code>data-exfiltration</code></li>
           </ul>
         </td>
       </tr>
       <tr>
         <td><code>@ai_guard.blocked</code></td>
         <td>Filtrer selon qu'une action dans la trace a été bloquée ou non</td>
         <td><code>true</code> ou <code>false</code></td>
       </tr>
       <tr>
         <td><code>@ai_guard.tools</code></td>
         <td>Filtrer par noms d'outils spécifiques impliqués dans l'évaluation</td>
         <td><code>get_user_profile</code>, <code>user_recent_transactions</code>, etc.</td>
       </tr>
       <tr>
         <td><code>@ai_guard.sds.categories</code></td>
         <td>Filtrer par catégories de données sensibles détectées par le Sensitive Data Scanner</td>
         <td><code>credentials</code>, <code>email_address</code>, etc.</td>
       </tr>
       <tr>
         <td><code>@ai_guard.sds.rule_tags</code></td>
         <td>Filtrer par tags de règle de données sensibles spécifiques</td>
         <td><code>aws_access_key_id</code>, <code>aws_secret_access_key</code>, <code>claude_api_key</code>, <code>email_address</code>, etc.</td>
       </tr>
     </tbody>
   </table>
1. Sous {{< ui >}}Define Rule Conditions{{< /ui >}} :
   1. Définissez vos conditions de seuil, le cas échéant pour le type de règle que vous avez choisi.
   1. Définissez le niveau de gravité des signaux de sécurité générés par AI Guard avec cette règle.
   1. Choisissez qui doit recevoir des notifications pour les nouveaux signaux et à quelle fréquence.
   1. Choisissez les réponses de sécurité à adopter, telles que le blocage automatisé des adresses IP ou des utilisateurs, et le marquage des adresses IP.
   1. Configurez des paramètres supplémentaires, tels que la mise à jour du même signal au lieu d'en créer un nouveau si AI Guard détecte de nouvelles valeurs dans un laps de temps défini, et la diminution de la gravité des signaux pour les environnements hors production.
1. Sous {{< ui >}}Describe your Playbook{{< /ui >}}, personnalisez la notification et définissez les tags à envoyer avec les signaux.
1. Cliquez sur {{< ui >}}Save Rule{{< /ui >}}.

Pour des capacités de règles de détection plus complètes, consultez [règles de détection][3].

## Étudiez les signaux {#investigate-signals}

Pour afficher et étudier les signaux de sécurité AI Guard, et les corréler avec d'autres événements de sécurité, vous pouvez consulter les signaux à deux endroits :
- [Application and API Protection Security Signals explorer][4]
- [Cloud SIEM Security Signals Explorer][5]

  Dans Cloud SIEM Security Signals Explorer, à côté de la barre de recherche, cliquez sur l'icône {{< ui >}}Filter{{< /ui >}} et cochez la case {{< ui >}}App & API Protection{{< /ui >}} pour afficher les signaux AI Guard.

Les Security Signals Explorers vous permettent de filtrer, de hiérarchiser et d'étudier les signaux AI Guard parallèlement à d'autres menaces de sécurité des applications, offrant ainsi une vue unifiée de votre posture de sécurité.

Vous pouvez créer ou lier des cas directement à partir d'un signal de sécurité AI Guard, et cliquer sur n'importe quel signal pour ouvrir un panneau latéral contenant des informations contextuelles supplémentaires.

## Obtenez un contexte supplémentaire avec les spans {#get-additional-context-with-spans}

Les spans AI Guard offrent des informations détaillées sur les évaluations effectuées et leurs raisons. Lorsque vous ouvrez un span depuis la page [Investigate][6] ou depuis un signal, vous pouvez obtenir du contexte sur les prompts spécifiques utilisés par votre agent AI, lire les entrées et sorties exactes, et voir toutes les catégories d'attaques ayant contribué à ce qu'AI Guard évalue un appel d'outil comme non sécurisé.

### Obtenez du contexte sur un span {#get-context-on-a-span}

Lorsque vous cliquez sur un span dans l'Explorer, vous pouvez voir :
- Le service et l'environnement dans lesquels les requêtes se sont produites
- La [politique de blocage][7] configurée pour ce service, qui détermine si AI Guard bloque les requêtes non sécurisées, ou les détecte et les tague sans les bloquer
- L'utilisateur qui a interagi avec l'agent
- Les entrées et sorties spécifiques de votre agent, et si elles proviennent de LLMs ou d'outils externes
- Si AI Guard a évalué chaque requête comme sûre ou non sûre
- Si AI Guard a bloqué la requête
- Si AI Guard a évalué l'appel comme non sûr, quelles catégories d'attaque il incluait
- Si la requête incluait des données sensibles, et si tel est le cas, quel type de données sensibles
- Tags supplémentaires, que vous pouvez utiliser pour filtrer les spans dans l'Explorer

De plus, vous pouvez cliquer sur {{< ui >}}Explore in graph view{{< /ui >}} pour voir les requêtes de la conversation sous forme de graphique, ou afficher le span dans [APM][8] ou [Agent Observability][9].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/application_security/security_signals/
[2]: https://app.datadoghq.com/security/ai-guard/settings/detection-rules
[3]: /fr/security/detection_rules/
[4]: https://app.datadoghq.com/security/ai-guard/signals
[5]: https://app.datadoghq.com/security/siem/signals
[6]: https://app.datadoghq.com/security/ai-guard/investigate
[7]: /fr/security/ai_guard/setup/#blocking-policy
[8]: /fr/tracing/
[9]: /fr/llm_observability/