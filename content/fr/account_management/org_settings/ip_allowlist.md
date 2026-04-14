---
description: Contrôlez l'accès réseau à Datadog en restreignant l'accès à l'API et
  à l'interface utilisateur à des adresses IP ou plages CIDR spécifiques pour renforcer
  la sécurité en entreprise.
title: Liste d'adresses IP autorisées
---

{{< callout url="/help/" header="Commencer avec la liste d'autorisation IP" >}}
La fonctionnalité de liste d'autorisation IP est uniquement disponible pour les clients disposant d'un plan Enterprise. Demandez l'accès en contactant l'assistance.
{{< /callout >}}

## Présentation

{{< img src="account_management/org_settings/ip_allowlist_list.png" alt="Capture d'écran montrant l'interface de la liste d'autorisation IP, contenant quatre plages d'adresses IP" >}}

La liste d'autorisation IP contrôle les réseaux autorisés à accéder à vos données dans Datadog. En limitant les réseaux autorisés, vous pouvez protéger vos ressources contre l'exfiltration de données et les menaces internes.

Lorsque la liste d'autorisation IP est activée, seules les adresses IP ou plages CIDR figurant dans la liste peuvent accéder à l'API et à l'interface utilisateur de Datadog.

### Ressources bloquées et autorisées

Si l'adresse IP d'un utilisateur ne figure pas dans la liste d'autorisation IP, il lui est effectivement impossible d'accéder et d'utiliser :

- L'interface web de Datadog
- L'[API][1] publique de Datadog, y compris les endpoints documentés et non documentés
- Les applications mobiles Datadog (iOS, Android)
- Les intégrations et applications tierces qui accèdent à Datadog via OAuth

La fonctionnalité de liste d'autorisation IP ne bloque pas l'accès aux éléments suivants :
- Les endpoints d'ingestion de données vers lesquels l'Agent envoie des données, telles que les métriques, les traces et les logs
- L'endpoint [validate API key][2], utilisé par l'Agent avant d'envoyer des données
- [L'envoi de flare par l'Agent][3]
- Les [dashboards publics][4]

Les applications et intégrations qui envoient des données de télémétrie depuis l'Agent (métriques, traces et logs), ainsi que celles qui utilisent une clé d'API fournie par l'utilisateur, ne sont pas affectées par la liste d'autorisation IP. Datadog recommande d'utiliser l'[Audit Trail][5] pour surveiller les adresses IP provenant d'applications et d'intégrations tierces.

Pour permettre aux clients d'applications mobiles de se connecter à Datadog lorsque la fonctionnalité de liste d'autorisation IP est activée, Datadog recommande que les appareils mobiles se connectent à une plage réseau autorisée via un VPN.

### Fonctionnalité

Seuls les utilisateurs disposant de l'autorisation **Org Management** peuvent configurer la liste d'autorisation IP.

Avec l'API ou l'interface utilisateur de la liste d'autorisation IP, vous pouvez :
- Vérifier l'état de la liste d'autorisation IP. Le fait que la liste soit activée ou désactivée détermine si votre organisation restreint les requêtes en fonction de l'appartenance à la liste d'autorisation IP.
- Activer et désactiver la liste d'autorisation IP.
- Afficher les adresses IP (sous forme de plages CIDR) couvertes par votre liste d'autorisations IP.
- Ajouter des adresses IP (IPv4 ou IPv6) ou des plages CIDR à la liste d'autorisation IP avec une note facultative.
- Modifier la note d'une adresse IP figurant déjà dans la liste des adresses IP autorisées.
- Supprimer une seule entrée de la liste d'autorisation IP.
- Remplacer l'ensemble de la liste d'autorisations IP par de nouvelles entrées (uniquement disponible via l'API).

### Prévention du verrouillage

Lorsque vous activez ou modifiez la liste d'autorisation IP, le système applique des contraintes pour garantir que vous pouvez toujours accéder à vos données :
- Au moins une entrée de la liste d'autorisation IP contient votre adresse IP actuelle
- La liste d'autorisation contient au moins une entrée

## Gérer la liste d'autorisation IP dans l'interface utilisateur

**Remarque :** la page de la liste d'autorisation IP n'apparaît dans l'interface utilisateur que si la fonctionnalité est activée pour votre organisation Datadog.

Pour accéder à l'[interface de la liste d'autorisation IP][6] :

1. Accédez à **Organization Settings** dans le menu de votre compte.
1. Sous **Security**, sélectionnez **IP Allowlist**.

Le tableau de la liste d'autorisation IP répertorie les plages CIDR figurant dans la liste.

### Activer et désactiver la liste d'autorisation IP

Une bannière en haut de la page indique si la liste d'autorisation IP est activée ou désactivée. Elle affiche également votre adresse IP et précise si cette IP figure dans la liste.

Pour modifier l'état de la liste d'autorisation IP, cliquez sur le bouton **Enable** ou **Disable**.

### Ajouter des adresses IP ou des plages CIDR

{{< img src="account_management/org_settings/add_ip_2.png" alt="Capture d'écran montrant une boîte de dialogue intitulée Ajouter une IP à la liste d'autorisation" >}}

1. Cliquez sur le bouton **Add IP** en haut à droite de la page.
1. Saisissez une adresse IP valide ou une plage CIDR.
1. Ajoutez éventuellement une note, par exemple pour vous rappeler pourquoi vous autorisez l'accès à certaines adresses.
1. Cliquez sur **Confirm**.

### Modifier des adresses IP ou des plages CIDR

1. Dans le tableau de la liste d'autorisation IP, survolez la ligne que vous souhaitez modifier.
1. Cliquez sur l'icône de crayon (**Edit**). 
1. Modifiez le texte descriptif de la **Note**.
1. Cliquez sur **Confirm**.

### Supprimer des adresses IP ou des plages CIDR

1. Dans le tableau de la liste d'autorisation IP, survolez la ligne que vous souhaitez supprimer.
1. Cliquez sur l'icône de corbeille (**Delete**) et confirmez la suppression.

## Gérer la liste d'autorisation IP par programmation

Pour gérer la liste d'autorisation IP via l'API, consultez la [documentation de l'API IP Allowlist][7].

Consultez la ressource [`ip_allowlist`][8] pour gérer la liste d'autorisation IP dans Terraform.


[1]: /fr/api/latest/
[2]: /fr/api/latest/authentication/#validate-api-key
[3]: https://docs.datadoghq.com/fr/agent/troubleshooting/send_a_flare/
[4]: /fr/dashboards/sharing/
[5]: /fr/account_management/audit_trail/
[6]: https://app.datadoghq.com/organization-settings/ip-allowlist
[7]: /fr/api/latest/ip-allowlist/
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/ip_allowlist