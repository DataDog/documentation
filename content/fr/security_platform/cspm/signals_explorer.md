---
title: Signals Explorer
kind: documentation
further_reading:
  - link: security_platform/default_rules
    tag: Documentation
    text: Explorer les règles de configuration cloud par défaut
  - link: security_platform/cspm/frameworks_and_benchmarks
    tag: Documentation
    text: En savoir plus sur les frameworks pris en charge et les benchmarks de l'industrie
---
{{< site-region region="us3,us5,gov,eu" >}}
<div class="alert alert-warning">
La solution Cloud Security Posture Management n'est pas disponible pour ce site.
</div>
{{< /site-region >}}

## Présentation

En plus de passer en revue et de corriger directement les problèmes de configuration cloud sur la page des [résultats][1], vous pouvez mettre en place des notifications en cas d'échec et faire en sorte que les signaux soient mis en corrélation avec les problèmes de configuration au même endroit que les menaces en temps réel générées par les solutions [Security Monitoring][2] et [Cloud Workload Security][3].

## Limiter les alertes superflues avec les signaux de sécurité

Les signaux sont des alertes de sécurité qui sont générées par Datadog et qui s'affichent dans le [Signals Explorer][4]. Un signal de sécurité se déclenche lorsque Datadog génère un résultat `evaluation:fail` pour une règle de configuration de cloud ou d'infrastructure.

Les règles dont le niveau de gravité est défini sur High ou Critical génèrent des signaux par défaut. Pour les règles ayant un niveau de gravité moins élevé, vous devez activer l'option *Trigger a security signal* pour qu'elles commencent à générer des signaux. Cette même option peut également être utilisée pour empêcher une règle de générer des signaux à tout moment.

{{< img src="security_platform/cspm/signals_explorer/Notifications.png" style="width:100%;">}}

Afin d'analyser les résultats par groupes logiques et d'éviter les alertes superflues, vous êtes libre de modifier les paramètres de déclenchement des signaux pour chaque ressource comme bon vous semble : vous pouvez par exemple recevoir un signal à chaque fois qu'une règle échoue pour une ressource dans un nouveau compte cloud ou à chaque fois qu'une ressource est mal configurée dans un service. Les signaux peuvent également se déclencher en fonction d'une facette Datadog. Quels que soient les paramètres de regroupement logique que vous choisissez, il suffit d'ouvrir un signal pour afficher la liste des derniers résultats ayant échoué pour la règle correspondante.

{{< img src="security_platform/cspm/signals_explorer/Signals.png" style="width:100%;">}}

Cliquez sur un signal de sécurité pour ouvrir un volet latéral détaillé :

{{< img src="security_platform/cspm/signals_explorer/Sidepanel.png" style="width:100%;">}}

La partie supérieure du volet latéral affiche des informations clés sur l'origine du problème de configuration : une ressource spécifique, un service ou un compte cloud entier.

{{< img src="security_platform/cspm/signals_explorer/Top.png" style="width:100%;">}}

La capture d'écran ci-dessous affiche le message de la règle, ainsi qu'une description du problème de configuration et des instructions pour corriger le problème.

{{< img src="security_platform/cspm/signals_explorer/Message.png" style="width:100%;">}}

L'onglet suivant dans la section inférieure du volet latéral affiche tous les résultats qui déclenchent ce signal. Cette liste reflète toujours l'état actuel de votre infrastructure, ce qui signifie que si vous avez corrigé 3 des 10 groupes de sécurité mal configurés depuis l'arrivée du premier signal, Datadog affichera les 7 groupes de sécurité restants tandis que ceux qui sont désormais conformes disparaîtront.

{{< img src="security_platform/cspm/signals_explorer/Findings.png" style="width:100%;">}}

**Remarque** : si vous utilisez autre chose qu'un ID de ressource pour regrouper les alertes, un signal se déclenche la première fois qu'un résultat correspond aux critères de regroupement, mais pas à chaque fois qu'une nouvelle ressource avec le même regroupement (par exemple, le même service ou compte) échoue. Ce comportement est volontaire : il permet d'éviter le déclenchement d'un nouveau signal à chaque fois qu'une nouvelle ressource cloud échoue. Si vous souhaitez recevoir une alerte à chaque fois qu'une ressource cloud échoue pour une règle, définissez l'option *group by* de la règle concernée sur `@resource_type`.

L'onglet Related issues affiche les autres règles qui ont déclenché des signaux avec la même logique de regroupement (même ressource, service ou compte cloud) et le même type de ressource (par exemple, groupe de sécurité).

{{< img src="security_platform/cspm/signals_explorer/Related.png" style="width:100%;">}}

En haut du volet latéral, vous pouvez configurer la règle de façon à ce qu'une notification soit envoyées à vos collègues via e-mail, Slack, Microsoft Teams, PagerDuty, ServiceNow, Jira, Webhooks, et plus encore.

{{< img src="security_platform/cspm/signals_explorer/Final.png" style="width:100%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/security_platform/cspm/findings/
[2]: https://docs.datadoghq.com/fr/security_platform/security_monitoring/
[3]: https://docs.datadoghq.com/fr/security_platform/cloud_workload_security/
[4]: https://docs.datadoghq.com/fr/security_platform/explorer