---
aliases:
- /fr/security/workload_protection/respond_and_report/active_protection
- /fr/security/workload_protection/respond_and_report/automated_response
- /fr/security/workload_protection/respond_and_report/response
- /fr/security/workload_protection/respond_and_report/remediation
- /fr/security/workload_protection/guide/active-protection
- /fr/security/cloud_security_management/guide/active-protection
description: Terminez les processus et les conteneurs ou bloquez le trafic réseau
  avec des actions de réponse automatisées et manuelles de Workload Protection.
disable_toc: false
further_reading:
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
  tag: Documentation
  text: Règles de détection de Workload Protection
- link: /security/workload_protection/setup
  tag: Documentation
  text: Mise en place de Workload Protection
- link: /security/workload_protection/setup/advanced_configuration
  tag: Documentation
  text: Configuration de l'Agent Workload Protection
- link: https://learn.datadoghq.com/courses/workload-protection-detect-compromises
  tag: Centre d'apprentissage
  text: Détectez les compromissions de hosts et de conteneurs avec Workload Protection
- link: https://www.datadoghq.com/blog/stop-runtime-threats-with-workload-protection-response-actions/
  tag: Blog
  text: Arrêtez les menaces à l'exécution avec les actions de réponse de Workload
    Protection
site_support_id: workload_security_active_protection
title: Répondre aux menaces
---
Workload Protection agit sur les menaces en terminant les processus et les conteneurs ou en bloquant le trafic réseau. Le Datadog Agent exécute ces actions automatiquement lorsqu'une règle d'Agent correspond, ou lorsque vous les déclenchez manuellement à partir d'un signal. Les deux méthodes dépendent de l'application de l'Agent.

## Exigences de réponse {#response-requirements}

Les actions de réponse s'exécutent dans l'Agent, donc les réponses automatisées et manuelles dépendent des paramètres de l'Agent et des autorisations RBAC appropriées.

### Configurer l'application de l'Agent {#configure-agent-enforcement}

Les actions de réponse utilisent les paramètres `runtime_security_config.enforcement` dans `/etc/datadog-agent/system-probe.yaml`. L'application est activée par défaut et les paramètres par défaut sont suffisants pour la plupart des configurations. Pour obtenir la référence complète des paramètres, consultez [Workload Protection Agent configuration][4].

Ces paramètres vous permettent d'exclure des binaires des actions de réponse ou de contrôler quelles sources de règles peuvent les déclencher. Par défaut, aucun binaire n'est exclu et les sources de règles `file` et `remote-config` sont autorisées.

### Autorisations de réponse {#response-permissions}

Les réponses automatisées et manuelles nécessitent des [autorisations RBAC][5] spécifiques :

- L'autorisation `security_monitoring_cws_agent_rules_actions` permet aux utilisateurs de configurer la réponse automatisée et de répondre manuellement aux menaces.
  - Un utilisateur disposant du rôle Datadog Admin doit créer un rôle incluant cette autorisation, puis attribuer ce rôle uniquement aux utilisateurs qui gèrent la réponse automatisée ou qui doivent exécuter des actions de réponse manuelles.
- Le rôle **Datadog Standard** permet aux utilisateurs de créer et de mettre à jour des règles personnalisées par défaut, tant que les modifications ne modifient pas les paramètres de **protection** de la règle. Les utilisateurs disposant du rôle Standard ne peuvent pas activer une règle désactivée incluant une action de réponse automatisée et ne peuvent pas utiliser d'actions de réponse manuelles.

## Réponse automatisée {#automated-response}

La réponse automatisée vous permet de bloquer de manière proactive les menaces identifiées par les règles de détection du Datadog Agent en terminant ou en isolant du réseau les processus ou conteneurs correspondants.

La réponse automatisée répartit la décision entre deux équipes :

- Security décide quelles menaces justifient une action automatisée.
- DevOps décide quelles applications et ressources sont suffisamment résilientes pour supporter une protection ciblée.

Le résultat est une détection des menaces suivie d'une atténuation immédiate et ciblée des menaces à haute confiance.

### Disponibilité de la réponse automatisée {#automated-response-availability}

Si la réponse automatisée est active pour une règle d'Agent, vous pouvez la vérifier dans la règle :

1. Dans [Agent Configuration][2], ouvrez la règle.
2. Confirmez que {{< ui >}}Automated response{{< /ui >}} apparaît dans la liste des actions actives.

Pour vérifier si la réponse automatisée s'applique à une règle ayant généré un signal :

1. Dans [Signals][1], ouvrez le signal.
2. Affichez {{< ui >}}Next Steps{{< /ui >}}. Si la réponse automatisée est disponible pour la règle correspondante, {{< ui >}}Proactively block threats{{< /ui >}} affiche {{< ui >}}Automated response enabled{{< /ui >}}.

### Configurer la réponse automatisée sur les règles de l'Agent {#configure-automated-response-on-agent-rules}

Par défaut, toutes les règles de l'Agent prêtes à l'emploi (OOTB) sont actives sans réponse automatisée. Vous devez configurer manuellement l'action de réponse automatisée afin de terminer ou d'isoler des processus.

#### États de protection {#protection-states}

Une règle de l'Agent peut se trouver dans l'un des états suivants :

- **Inactif :** L'Agent ne surveille pas les événements de la règle et n'envoie pas de détections au backend Datadog.
- **Actif :** Il s'agit du paramètre par défaut pour les règles activées. L'Agent surveille la règle activée et affiche les détections dans [Signals][1].
- **Actif avec réponse automatisée :** L'Agent surveille la règle activée, termine ou isole du réseau les processus correspondants et affiche les détections dans [Signals][1].

<div class="alert alert-info">La réponse automatisée est appliquée à toutes les menaces détectées après l'activation de la réponse automatisée. La réponse automatisée n'est pas rétroactive.</div>

Pour activer la réponse automatisée sur une règle d'Agent :

1. Dans [Agent Configuration][2], ouvrez une règle. S'il n'y a pas d'action {{< ui >}}Automated response{{< /ui >}} dans la section {{< ui >}}Agent's actions{{< /ui >}}, alors la réponse automatisée n'est pas disponible pour cette règle.
2. Cliquez sur {{< ui >}}Edit{{< /ui >}}.
3. Sous {{< ui >}}Add actions for the agent to follow{{< /ui >}}, sélectionnez l'une des {{< ui >}}Automated response{{< /ui >}}.

   {{< img src="security/workload_protection/respond_and_report/automated_response_activation.png" alt="Section Protection d'une règle d'Agent affichant l'action de réponse automatisée" style="width:100%;" >}}
4. Sous {{< ui >}}Link the rule to policies{{< /ui >}}, vérifiez que la règle est {{< ui >}}Active{{< /ui >}} dans au moins une politique.
5. Cliquez sur {{< ui >}}Update Agent Rule{{< /ui >}}.

### Examiner les tentatives d'attaque bloquées {#review-blocked-attack-attempts}

Une fois la réponse automatisée activée pour une règle d'Agent, les menaces bloquées apparaissent dans [Signals][1].

Toute réponse automatisée est répertoriée dans le tableau Réponse, ainsi que les réponses soumises manuellement.

## Réponse manuelle {#response}

La réponse manuelle vous permet de protéger votre infrastructure depuis le panneau latéral des signaux après que Workload Protection a généré un [signal][6]. Utilisez la réponse manuelle si vous ne souhaitez pas qu'une règle d'Agent termine automatiquement les processus.

{{< img src="security/workload_protection/respond_and_report/response_actions.png" alt="Section Réponse affichant les actions d'isolation de conteneur et d'arrêt de conteneur avec les statuts ISOLATED et KILLED" style="width:100%;" >}}

### Exigences supplémentaires pour la réponse manuelle {#additional-requirements-for-manual-response}

Confirmez que chaque environnement avec des hosts ou des conteneurs exécutant l'Agent avec Workload Protection activé répond à ces exigences :

- Datadog **Agent 7.78** ou version ultérieure sur les hosts devant exécuter des actions de réponse.
- [**Remote Configuration**][3] est activé afin que les politiques de réponse puissent être transmises à l'Agent.
- L'application est activée par défaut dans `system-probe` comme décrit dans [Configurer l'application de l'Agent](#configure-agent-enforcement).

### Actions disponibles {#available-actions}

L'Agent prend en charge les types d'actions d'**application** suivants :

#### Kill {#kill}

Terminer un processus malveillant ou tous les processus dans un **conteneur** compromis (cgroup), selon le périmètre.

#### Filtre réseau (isolation réseau) {#network-filter-network-isolation}

Bloquer le trafic réseau à l'aide d'un filtre basé sur eBPF (par exemple, abandonner le trafic sortant vers des ports spécifiques). Toute isolation peut être annulée.

L'isolation réseau utilise des classificateurs **Traffic Control** eBPF et des programmes de paquets bruts. L'Agent active les sondes réseau requises par défaut dans `event_monitoring_config.network` dans `system-probe.yaml`.

### Statuts des actions {#action-statuses}

Lorsqu'une action de réponse est exécutée, l'Agent l'enregistre dans le tableau Response, avec les réponses automatisées. Chaque action possède un statut. Le tableau ci-dessous résume les principaux résultats pour chaque type d'action.

| Statut | Description | Kill | Isolation réseau |
| --- | --- | --- | --- |
| `performed` | L'action s'est terminée avec succès. | {{< X >}} | {{< X >}} |
| `partially_performed` | Une partie de l'action kill a réussi (par exemple, certains processus ont été terminés) mais toutes les cibles n'ont pas pu être éliminées. | {{< X >}} | |
| `removed` | Une règle d'isolation a été **supprimée** de l'ensemble de règles actuel alors qu'elle était présente auparavant — utilisée lors de la **réversion** de l'isolation réseau. | | {{< X >}} |
| `error` | Une erreur s'est produite lors de la réponse. L'action a échoué et le processus ou le conteneur est toujours en cours d'exécution ou n'est pas isolé. | {{< X >}} | {{< X >}} |
| `not_triggered` | L'Agent n'a pas trouvé la ressource ciblée. Le conteneur ou le processus a peut-être quitté avant que l'action de réponse ne s'exécute. | {{< X >}} | {{< X >}} |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security
[2]: https://app.datadoghq.com/security/workload-protection/agent-rules
[3]: /fr/agent/remote_config/?tab=configurationyamlfile
[4]: /fr/security/workload_protection/setup/advanced_configuration
[5]: /fr/account_management/rbac/permissions
[6]: /fr/security/workload_protection/investigate_and_triage/security_signals