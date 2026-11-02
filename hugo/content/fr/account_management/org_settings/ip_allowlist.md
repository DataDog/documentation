---
description: Contrôlez l'accès réseau à Datadog en restreignant l'accès à l'API et
  à l'interface utilisateur à des adresses IP ou des plages CIDR spécifiques pour
  la sécurité de l'entreprise.
title: Liste d'adresses IP autorisées
---
{{< callout url="/help/" header="Commencez avec la liste d'autorisation IP" >}}
La fonctionnalité de liste d'autorisation IP est disponible pour les clients disposant d'un forfait Pro+ ou Enterprise. Pour demander l'accès, contactez le support.
{{< /callout >}}

## Présentation {#overview}

{{< img src="account_management/org_settings/ip_allowlist_list.png" alt="Capture d'écran montrant l'interface utilisateur de la liste d'autorisation IP, contenant quatre plages IP" >}}

La liste d'autorisation IP contrôle quels réseaux peuvent être utilisés pour accéder à vos données dans Datadog. En limitant les réseaux autorisés, vous pouvez protéger vos ressources contre l'exfiltration de données et les menaces internes.

Lorsque la liste d'autorisation IP est activée, seules les adresses IP ou les plages CIDR figurant dans la liste d'autorisation peuvent accéder à la Datadog API et à l'interface utilisateur de Datadog. 

La liste d'autorisation IP est un paramètre à l'échelle de l'organisation. Il s'applique uniformément à tout le trafic répertorié sous [Ressources bloquées et autorisées](#blocked-and-allowed-resources) et ne peut pas être limité à un jeton, une clé d'API, un utilisateur ou un endpoint spécifique.

### Ressources bloquées et autorisées {#blocked-and-allowed-resources}

Si l'adresse IP d'un utilisateur ne figure pas dans la liste d'autorisation IP, il est effectivement empêché d'accéder et d'utiliser :

- L'interface web de Datadog
- L'API publique de Datadog [API][1], y compris les endpoints documentés et non publiés
- Les applications mobiles de Datadog (iOS, Android)
- Les intégrations et applications tierces qui accèdent à Datadog via OAuth
- Le [Datadog MCP Server][9], y compris les connexions à distance depuis des agents IA et des clients MCP

La fonctionnalité de liste d'autorisation IP ne bloque pas l'accès aux éléments suivants :
- Les endpoints d'ingestion de données vers lesquels l'Agent envoie des données, tels que les métriques, les traces et les logs
- L'endpoint [validate API key][2], que l'Agent utilise avant de soumettre des données
- [Soumission de flares d'Agent][3]
- [Dashboards publics][4]
- Actions que le support Datadog effectue en votre nom au sein de votre organisation
- Routes gérées par Datadog qui fournissent la configuration du produit via le CDN de Datadog

Les applications et intégrations qui soumettent des données de télémétrie depuis l'Agent (métriques, traces et logs), ainsi que celles qui utilisent une clé d'API fournie par l'utilisateur, ne sont pas affectées par la liste d'autorisation IP. Datadog recommande d'utiliser le [Audit Trail][5] pour surveiller les adresses IP provenant d'applications et d'intégrations tierces.

Pour permettre aux clients d'applications mobiles de se connecter à Datadog lorsque la fonctionnalité de liste d'autorisation IP est activée, Datadog recommande que les appareils mobiles se connectent à une plage réseau autorisée via un VPN.

### Fonctionnalité {#functionality}

Seuls les utilisateurs disposant de l'autorisation {{< ui >}}Org Management{{< /ui >}} peuvent configurer la liste d'autorisation IP.

La liste d'autorisation IP n'est pas héritée entre les organisations parentes et enfants. Chaque organisation doit avoir sa propre liste d'autorisation IP configurée séparément.

Avec l'API ou l'interface utilisateur de la liste d'autorisation IP, vous pouvez :
- Vérifier le statut de la liste d'autorisation IP. L'activation ou la désactivation de la liste d'autorisation IP détermine si votre organisation restreint les requêtes en fonction de l'appartenance à la liste d'autorisation d'adresses IP.
- Activez et désactivez la liste d'autorisation IP.
- Affichez les adresses IP (sous forme de plages CIDR) couvertes par votre liste d'autorisation IP.
- Ajoutez des adresses IP (IPv4 ou IPv6) ou des plages CIDR à la liste d'autorisation IP avec une note facultative.
- Modifiez la note d'une adresse IP déjà présente dans la liste d'autorisation IP.
- Supprimez une entrée unique de la liste d'autorisation IP.
- Remplacez l'intégralité de la liste d'autorisation IP par de nouvelles entrées (disponible uniquement via l'API).

### Prévention du verrouillage {#lockout-prevention}

Lorsque vous activez ou modifiez la liste d'autorisation IP, le système applique des contraintes pour garantir que vous puissiez toujours accéder à vos données :
- Au moins une entrée de la liste d'autorisation IP contient votre adresse IP actuelle
- La liste d'autorisation contient au moins une entrée

## Gestion de la liste d'autorisation IP dans l'interface utilisateur {#managing-the-ip-allowlist-in-the-ui}

**Remarque** : La page de la liste d'autorisation IP n'apparaît dans l'interface utilisateur que si votre organisation Datadog a activé cette fonctionnalité. Pour demander l'accès, [contactez le support](/help/).

Pour trouver l'[interface utilisateur de la liste d'autorisation IP][6] :

1. Accédez à {{< ui >}}Organization Settings{{< /ui >}} depuis le menu de votre compte.
1. Sous {{< ui >}}Security{{< /ui >}}, sélectionnez {{< ui >}}IP Allowlist{{< /ui >}}.

Le tableau de la liste d'autorisation IP répertorie les plages CIDR contenues dans la liste d'autorisation IP.

### Activez et désactivez la liste d'autorisation IP {#enable-and-disable-the-ip-allowlist}

Une bannière en haut de la page indique le statut activé ou désactivé de la liste d'autorisation IP. Elle indique également votre adresse IP et si cette adresse IP figure dans la liste d'autorisation.

Pour basculer le statut de la liste d'autorisation IP, cliquez sur le bouton {{< ui >}}Enable{{< /ui >}} ou {{< ui >}}Disable{{< /ui >}}.

### Ajouter des adresses IP ou des plages CIDR {#add-ip-addresses-or-cidr-ranges}

{{< img src="account_management/org_settings/add_ip_2.png" alt="Capture d'écran montrant une boîte de dialogue intitulée « Add IP to allowlist »" >}}

1. Cliquez sur le bouton {{< ui >}}Add IP{{< /ui >}} en haut à droite de la page. 
1. Saisissez une adresse IP ou une plage CIDR valide.
1. Ajoutez une note, par exemple, pour vous rappeler pourquoi vous autorisez l'accès à certaines adresses.
1. Cliquez sur {{< ui >}}Confirm{{< /ui >}}.

### Modifiez des adresses IP ou des plages CIDR {#edit-ip-addresses-or-cidr-ranges}

1. Dans le tableau de la liste d'autorisation IP, survolez la ligne que vous souhaitez modifier. 
1. Cliquez sur l'icône crayon ({{< ui >}}Edit{{< /ui >}}). 
1. Modifiez le texte {{< ui >}}Note{{< /ui >}} descriptif.
1. Cliquez sur {{< ui >}}Confirm{{< /ui >}}.

### Supprimez des adresses IP ou des plages CIDR {#delete-ip-addresses-or-cidr-ranges}

1. Dans le tableau de la liste d'autorisation IP, survolez la ligne que vous souhaitez supprimer. 
1. Cliquez sur l'icône de corbeille ({{< ui >}}Delete{{< /ui >}}) et confirmez que vous souhaitez la supprimer. 

## Gestion de la liste d'autorisation IP par programmation {#managing-the-ip-allowlist-programmatically}

Pour gérer la liste d'autorisation IP via l'API, consultez la [documentation de l'API de liste d'autorisation IP][7].

Consultez la ressource [`ip_allowlist`][8] pour gérer la liste d'autorisation IP dans Terraform.


[1]: /fr/api/latest/
[2]: /fr/api/latest/authentication/#validate-api-key
[3]: https://docs.datadoghq.com/fr/agent/troubleshooting/send_a_flare/
[4]: /fr/dashboards/sharing/
[5]: /fr/account_management/audit_trail/
[6]: https://app.datadoghq.com/organization-settings/ip-allowlist
[7]: /fr/api/latest/ip-allowlist/
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/ip_allowlist
[9]: /fr/mcp_server/