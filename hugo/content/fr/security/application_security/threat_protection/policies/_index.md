---
aliases:
- /fr/security/application_security/policies/
- /fr/security/application_security/threats/protection
disable_toc: false
title: Politiques
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection est en préversion sur le site Datadog Government US1-FED.
</div>
{{< /site-region >}}

Si votre service exécute [un Agent avec Remote Configuration activée et une version du SDK qui la prend en charge][2], vous pouvez bloquer les attaques et les attaquants depuis l'interface utilisateur Datadog sans configuration supplémentaire de l'Agent ou des SDK.

App and API Protection (AAP) Protect vous permet de ralentir les attaques et les attaquants en les _bloquant_. Les traces de sécurité sont bloquées en temps réel par les SDK Datadog. Les blocs sont enregistrés sur la plateforme Datadog, récupérés automatiquement et en toute sécurité par l'Agent Datadog, déployé dans votre infrastructure et appliqués à vos services.

## Prérequis {#prerequisites}

Pour utiliser les fonctionnalités de protection avec votre service :

- [Mettez à jour votre Agent Datadog][3] vers au moins la version 7.41.1.
- [Activez AAP][1].
- [Activez Remote Configuration][2].
- Mettez à jour votre SDK vers au moins la version minimale requise pour activer la protection. Pour plus de détails, consultez la section sur la prise en charge des fonctionnalités AAP dans [Compatibilité][12] pour le langage de votre service.
- Si vous prévoyez d'utiliser le blocage d'utilisateurs authentifiés, [ajoutez des informations utilisateur aux traces][4].

## Blocage des attaquants (adresses IP et utilisateurs authentifiés) {#blocking-attackers-ips-and-authenticated-users}

Vous pouvez bloquer, temporairement ou définitivement, les attaquants signalés dans AAP [Security Signals][5]. Dans Signals Explorer, cliquez sur un signal pour voir quels utilisateurs et adresses IP génèrent ce signal, et bloquez-les si vous le souhaitez.

À partir de là, tous les services protégés par AAP bloquent les requêtes entrantes effectuées par l'adresse IP ou l'utilisateur bloqué, pour la durée spécifiée. Toutes les traces bloquées sont marquées avec `security_response.block_ip` ou `security_response.block_user` et affichées dans le [Trace Explorer][6]. Les services pour lesquels AAP est désactivé ne sont pas protégés. Consultez [Investigate Security Signals][20] pour plus d'informations.

## Répondez aux menaces en temps réel en automatisant le blocage des attaquants {#respond-to-threats-in-real-time-by-automating-attacker-blocking}

En plus de bloquer manuellement les attaquants, vous pouvez configurer des règles d'automatisation pour qu'AAP bloque automatiquement les attaquants signalés dans [Security Signals].

Pour commencer, accédez à {{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > [{{< ui >}}Detection Rules{{< /ui >}}][14]. Vous pouvez créer une règle ou modifier une règle existante. Par exemple, vous pouvez créer une règle pour déclencher des signaux de gravité `Critical` lorsque des attaques de Credential Stuffing sont détectées, et bloquer automatiquement les adresses IP des attaquants associés pendant 30 minutes.

**Remarque** : Vous devez instrumenter vos services pour pouvoir bloquer les attaquants authentifiés. Voir [User Monitoring and Protection][15] pour plus de détails.

## Bloquer les attaquants au périmètre - intégrez AAP à vos déploiements WAF existants {#block-attackers-at-the-perimeter-integrate-aap-with-your-existing-waf-deployments}

Datadog AAP permet aux clients de bloquer les attaquants au périmètre, directement depuis Security Signal. AAP s'intègre aux [Workflows][17] pour pousser les adresses IP des attaquants vers les pare-feu d'applications Web périmétriques (AWS WAF, Cloudflare, Fastly) et garantir que les requêtes provenant de ces attaquants sont bloquées à la périphérie avant même qu'elles n'entrent dans l'environnement du client.
Créez des workflows à partir des [blueprints][18] disponibles et exécutez-les directement depuis le panneau latéral des signaux d'AAP.

## Denylist {#denylist}

Les adresses IP des attaquants et les utilisateurs authentifiés bloqués de manière permanente ou temporaire sont ajoutés à la _Denylist_. Gérez la liste sur la [Denylist page][7]. Une liste de refus permet de bloquer des adresses IP individuelles ainsi qu'une plage d'adresses IP (blocs CIDR).

**Remarque** : Par défaut, votre Denylist peut contenir jusqu'à 2 500 entrées (adresses IP, plages CIDR et utilisateurs authentifiés combinés). Les entrées ajoutées au-delà de cette limite sont acceptées dans l'interface utilisateur de Datadog mais ne sont pas incluses dans la configuration de la Denylist appliquée, de sorte que le blocage ne prend pas effet pour elles. Si vous devez bloquer plus d'entrées que ne le permet cette limite, contactez le [Datadog Support][21] pour demander une augmentation.

## Passlist {#passlist}

Vous pouvez utiliser le _Passlist_ pour autoriser en permanence l'accès à votre application à des adresses IP spécifiques. Par exemple, vous souhaiterez peut-être ajouter des adresses IP internes à votre Passlist, ou des adresses IP effectuant régulièrement des audits de sécurité sur votre application. Vous pouvez également ajouter des chemins spécifiques pour garantir un accès ininterrompu. Gérez la liste depuis la [Passlist page][8].

## Blocage des tentatives d'attaque avec le WAF In-App {#blocking-attack-attempts-with-in-app-waf}

AAP In-App WAF (web application firewall) combine les techniques de détection des WAF périmétriques avec le contexte riche fourni par Datadog, aidant vos équipes à protéger leurs systèmes en toute confiance.

Comme AAP connaît les routes d'une application, la protection peut être appliquée de manière granulaire à des services spécifiques, et pas nécessairement à toutes les applications et à tout le trafic. Cette efficacité contextuelle réduit votre effort d'inspection et diminue le taux de faux positifs par rapport à un WAF périmétrique. Il n'y a pas de période d'apprentissage, car la plupart des frameworks web fournissent une carte structurée des routes. AAP peut aider votre équipe à déployer automatiquement des protections contre les vulnérabilités zero-day peu après la divulgation de la vulnérabilité, tout en ciblant les applications vulnérables, ce qui limite le risque de faux positifs.

### Comment In-App WAF bloque les traces de sécurité {#how-in-app-waf-blocks-security-traces}

En plus des modes `monitoring` et `disabled` proposés pour chacune des 130+ règles d'In-App WAF, les règles disposent également d'un mode `blocking`. Chaque règle spécifie des conditions sur la requête entrante pour définir ce que la bibliothèque considère comme suspect. Lorsqu'un modèle de règle donné correspond à une requête HTTP en cours, la requête est bloquée par la bibliothèque.

Les politiques gérées définissent le mode dans lequel chacune des règles d'In-App WAF se comporte en cas de correspondance : `monitoring`, `blocking` ou `disabled`. Parce qu'il dispose du contexte complet de vos applications, AAP sait quelles règles appliquer pour protéger vos applications tout en limitant le nombre de faux positifs.

Pour un contrôle précis, vous pouvez cloner une politique gérée par Datadog ou créer une politique personnalisée et définir le mode selon vos besoins. Si vous définissez la politique sur `auto-updating`, vos applications sont protégées par les dernières détections déployées par Datadog. Vous avez également la possibilité d'épingler une politique à une version spécifique de l'ensemble de règles.

Lorsque les règles d'In-App WAF sont basculées entre les modes, les changements sont reflétés en temps quasi réel pour les services avec [Remote Configuration enabled][2]. Pour les autres services, vous pouvez mettre à jour la politique sur la [In-App WAF page][9] puis [define In-App WAF rules][10] pour que le changement de comportement soit appliqué.

Gérez le WAF In-App en accédant à {{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > [{{< ui >}}In-App WAF{{< /ui >}}][9].

Affichez les traces de sécurité bloquées dans le [Trace Explorer][11] en filtrant sur la facette `Blocked:true`.

<!-- {{< img src="security/application_security/app_sec_blocked.png" alt="Trace Explorer AAP filtré en utilisant la facette Blocked définie sur true." style="width:100%;" >}} -->

### Configurer In-App WAF {#configure-in-app-waf}

1. [**Activer Remote Configuration**][2] afin que vos services compatibles AAP apparaissent sous In-App WAF. Ceci est requis pour transmettre en toute sécurité la configuration In-App WAF depuis votre backend Datadog vers le SDK de votre infrastructure.

2. **Associez vos services AAP/Remote Configuration-enabled à une politique**. Une fois Remote Configuration activée sur un service, accédez à {{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > [{{< ui >}}In-App WAF{{< /ui >}}][9]. Le service apparaît sous la politique _Datadog Monitoring-only_ par défaut. Datadog Monitoring-only est une politique gérée et en lecture seule, ce qui signifie que vous ne pouvez pas modifier le statut (surveillance, blocage ou désactivé) des règles individuelles.

   Si vous avez besoin d'un contrôle granulaire, clonez l'une des politiques disponibles pour créer une politique personnalisée où les statuts des règles peuvent être modifiés. Associez un ou plusieurs de vos services à cette politique personnalisée.

   Pour modifier la politique appliquée par défaut à vos services, vous pouvez mettre à jour votre politique par défaut. Depuis In-App WAF, cliquez sur la politique que vous souhaitez définir par défaut, puis cliquez sur **Actions** > **Set this policy as default**.

## Personnalisez le comportement de protection {#customize-protection-behavior}

### Personnalisez la réponse aux requêtes bloquées {#customize-response-to-blocked-requests}

{{% asm-protection-page-configuration %}}

Le code d'état de réponse HTTP par défaut lors de la présentation de la page de refus aux attaquants est `403 FORBIDDEN`. Pour personnaliser la réponse, accédez à {{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}In-App Waf{{< /ui >}} > [{{< ui >}}Custom Responses{{< /ui >}}][16].

Vous pouvez facultativement masquer le fait que l'attaquant a été détecté et bloqué en remplaçant le code de réponse par `200 OK` ou `404 NOT FOUND` lorsque la page de refus est présentée.

Vous pouvez également rediriger les attaquants vers une page de refus personnalisée, les éloignant ainsi de vos services et infrastructures critiques. Spécifiez une URL de redirection et le type de redirection, par exemple permanente (`301` code de réponse) ou temporaire (`302` code de réponse).

### Désactiver la protection sur tous les services (Désactivation du mode de protection) {#disable-protection-across-all-services-disabling-protection-mode}

Le mode de protection est **activé** par défaut et constitue un interrupteur permettant de désactiver rapidement le blocage sur **tous** vos services. Les requêtes peuvent être bloquées depuis deux sections dans Datadog : toutes les requêtes d'attaquants depuis Security Signals et les traces de sécurité depuis In-App WAF.

Bien qu'il soit important pour vous de pouvoir appliquer la protection de manière granulaire et de réduire la probabilité que des utilisateurs légitimes soient bloqués, vous avez parfois besoin d'un simple interrupteur pour arrêter rapidement **tout** blocage sur **tous** les services. Pour désactiver la protection, accédez à {{< ui >}}Security{{< /ui >}} > {{< ui >}}App & API Protection{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > [{{< ui >}}In-App WAF{{< /ui >}}][9] et basculez **Allow Request Blocking** sur off.

[1]: /fr/security/application_security/setup/
[2]: /fr/tracing/guide/remote_config
[3]: /fr/agent/versions/upgrade_between_agent_minor_versions
[4]: /fr/security/application_security/how-it-works/add-user-info/#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability
[5]: https://app.datadoghq.com/security/appsec/signals?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&view=signal
[6]: https://app.datadoghq.com/security/appsec/traces?query=%40appsec.blocked%3Atrue
[7]: https://app.datadoghq.com/security/appsec/denylist
[8]: https://app.datadoghq.com/security/appsec/passlist
[9]: https://app.datadoghq.com/security/appsec/in-app-waf
[10]: /fr/security/application_security/threat_protection/policies/inapp_waf_rules/
[11]: https://app.datadoghq.com/security/appsec/traces
[12]: /fr/security/application_security/setup/compatibility/
[14]: https://app.datadoghq.com/security/appsec/detection-rules
[15]: /fr/security/application_security/how-it-works/add-user-info/?tab=set_user#adding-authenticated-user-information-to-traces-and-enabling-user-blocking-capability
[16]: https://app.datadoghq.com/security/appsec/in-app-waf?config_by=custom-responses
[17]: https://docs.datadoghq.com/fr/actions/workflows/
[18]: https://app.datadoghq.com/workflow/blueprints?selected_category=SECURITY
[20]: /fr/security/application_security/threat_protection/security_signals/
[21]: /fr/help/