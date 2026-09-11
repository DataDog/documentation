---
description: Triez, escaladez, automatisez et répondez à un signal de Workload Protection
  depuis le panneau latéral des signaux.
disable_toc: false
title: Triez et intervenez sur les signaux de sécurité.
---
Après avoir examiné un signal de Workload Protection, utilisez la section {{< ui >}}Next Steps{{< /ui >}} dans le panneau latéral du signal pour triez, escaladez, automatisez ou répondez à la menace.

Les signaux de Workload Protection partagent les mêmes flux de travail de tri et de réponse que les autres signaux de Datadog Security. Pour une vue d'ensemble des signaux de sécurité dans Cloud SIEM, App and API Protection et Workload Protection, consultez les [Règles de détection][1] et le [Security Signals Explorer][2] unifié.

## Trier un signal {#triage-a-signal}

Vous pouvez trier un signal en l'attribuant à un utilisateur pour une enquête plus approfondie. L'utilisateur assigné peut ensuite suivre son examen en mettant à jour le statut du signal.

<div class="alert alert-info">Pour modifier les signaux de sécurité, vous devez disposer de la <code>security_monitoring_signals_write</code> autorisation. Consultez <a href="/account_management/rbac/permissions/#cloud-security-platform">Contrôle d'accès basé sur les rôles</a> pour plus d'informations sur les rôles par défaut de Datadog et les autorisations de contrôle d'accès granulaires basées sur les rôles disponibles pour Workload Protection.</div>

1. Dans le [Signals Explorer][3], sélectionnez un signal de sécurité.
2. Dans la section {{< ui >}}Triage{{< /ui >}}, cliquez sur {{< ui >}}Assign Signal{{< /ui >}}, puis sélectionnez un utilisateur.
3. Pour mettre à jour le statut du signal de sécurité, cliquez sur le menu déroulant du statut de tri et sélectionnez un statut. Le statut par défaut est {{< ui >}}Open{{< /ui >}}.
    - {{< ui >}}Open{{< /ui >}} : Le signal n'a pas encore été résolu.
    - {{< ui >}}Under Review{{< /ui >}} : Le signal fait l'objet d'une enquête active. Depuis l'état {{< ui >}}Under Review{{< /ui >}}, vous pouvez faire passer le signal à {{< ui >}}Archived{{< /ui >}} ou {{< ui >}}Open{{< /ui >}} selon vos besoins.
    - {{< ui >}}Archived{{< /ui >}} : La détection à l'origine du signal a été résolue. Depuis l'état {{< ui >}}Archived{{< /ui >}}, vous pouvez ramener le signal à {{< ui >}}Open{{< /ui >}} s'il se situe dans les 30 jours suivant la détection initiale du signal.

## Créez un cas {#create-a-case}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Case Management n'est pas pris en charge pour votre <a href="/getting_started/site">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Utilisez [Case Management][4] pour suivre, trier et enquêter sur les signaux de sécurité.

1. Dans le [Signals Explorer][3], sélectionnez un signal de sécurité.
2. Sur le panneau latéral du signal, sous {{< ui >}}Next Steps{{< /ui >}}, recherchez la section {{< ui >}}Respond{{< /ui >}} et cliquez sur {{< ui >}}Create Security Case{{< /ui >}}. Pour ajouter le signal à un cas existant, ouvrez le menu déroulant à côté de {{< ui >}}Create Security Case{{< /ui >}} et sélectionnez {{< ui >}}Add to existing Security Case{{< /ui >}}.
3. Saisissez un titre et une description facultative.
4. Cliquez sur {{< ui >}}Create Case{{< /ui >}}.

## Déclarer un incident {#declare-an-incident}

Utilisez [Incident Management][5] pour créer un incident pour un signal de sécurité.

1. Dans le [Signals Explorer][3], sélectionnez un signal de sécurité.
2. Dans la section {{< ui >}}Respond{{< /ui >}} du panneau latéral du signal, développez {{< ui >}}More actions{{< /ui >}}.
3. Sous {{< ui >}}Escalate{{< /ui >}}, effectuez l'une des opérations suivantes :
    - Pour créer un incident, cliquez sur {{< ui >}}Declare Incident{{< /ui >}}. Configurez l'incident en précisant des détails tels que le niveau de gravité et le responsable de l'incident, puis cliquez sur {{< ui >}}Declare Incident{{< /ui >}}.
    - Pour ajouter le signal à un incident existant, ouvrez le menu déroulant à côté de {{< ui >}}Declare Incident{{< /ui >}}, sélectionnez un incident et cliquez sur {{< ui >}}Confirm{{< /ui >}}.

## Exécutez un workflow {#run-a-workflow}

Utilisez [Workflow Automation][7] pour déclencher manuellement un workflow pour un signal de sécurité. Consultez [Trigger a workflow from a security signal][6] pour plus d'informations.

1. Dans le [Signals Explorer][3], sélectionnez un signal de sécurité.
2. Dans la section {{< ui >}}Respond{{< /ui >}} du panneau latéral du signal, cliquez sur {{< ui >}}Run Workflow{{< /ui >}}.
3. Dans la fenêtre modale de workflow, sélectionnez le workflow que vous souhaitez exécuter. Le workflow doit disposer d'un déclencheur de sécurité pour apparaître dans la liste. Selon le workflow, vous devrez peut-être saisir des paramètres d'entrée supplémentaires.
4. Cliquez sur {{< ui >}}Run Workflow{{< /ui >}}.

Sinon, cliquez sur l'onglet {{< ui >}}Workflows{{< /ui >}} dans le panneau latéral du signal pour voir quels workflows ont été déclenchés pour le signal et les workflows suggérés à exécuter.

## Terminez des conteneurs ou des processus {#kill-containers-or-processes}

Depuis le panneau latéral du signal, vous pouvez terminer directement un processus ou un conteneur malveillant. Sous {{< ui >}}Respond{{< /ui >}}, cliquez sur {{< ui >}}Kill Containers or Processes{{< /ui >}}.

Cette action nécessite que l'application des mesures soit activée sur le Datadog Agent. L'Agent termine le processus ciblé ou tous les processus dans un conteneur compromis en fonction du périmètre configuré. Consultez [Réponse manuelle][8] pour connaître les prérequis, la configuration et les statuts des actions.

## Isolation réseau {#network-isolation}

Depuis le panneau latéral des signaux, vous pouvez isoler un processus ou un conteneur compromis du réseau. Sous {{< ui >}}Respond{{< /ui >}}, cliquez sur {{< ui >}}Network Isolation{{< /ui >}} pour bloquer le trafic réseau de la charge de travail concernée à l'aide d'un filtre basé sur eBPF.

L'isolation réseau nécessite que l'application des mesures soit activée sur l'Agent, ainsi que les sondes réseau que l'Agent active par défaut. Consultez [Réponse manuelle][8] pour connaître les prérequis et les options d'application disponibles.

[1]: /fr/security/detection_rules/
[2]: https://app.datadoghq.com/security/signals
[3]: https://app.datadoghq.com/security/workload-protection/signals
[4]: /fr/incident_response/work_management/
[5]: /fr/incident_response/incident_management/
[6]: /fr/security/cloud_security_management/workflows
[7]: /fr/service_management/workflows
[8]: /fr/security/workload_protection/respond_and_report/#response