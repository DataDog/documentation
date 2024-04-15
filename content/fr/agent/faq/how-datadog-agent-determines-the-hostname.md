---
aliases:
- /fr/agent/faq/how-can-i-change-the-hostname/
comments: <!–– Original flowchart is in lucidchart. Search Trello for link or ask
  Grant. ––>

title: Comment le hostname de l'Agent est-il déterminé par Datadog ?
---

## Hostnames potentiels

L'Agent Datadog recueille les hostnames potentiels depuis de nombreuses sources différentes. Exécutez la [sous-commande status][1] pour consulter tous les noms détectés par l'Agent.
```text
...
Hostnames
=========

  hostname: my.special.hostname
  agent-hostname: my.special.hostname
  ec2-hostname: ip-192-0-0-1.internal
  instance-id: i-deadbeef
  socket-hostname: myhost
  socket-fqdn: myhost.mydomain
...
```

Un nom canonique est choisi pour le host à partir de ces noms. Il s'agit du nom que l'Agent utilise pour s'identifier auprès de Datadog. Les autres noms sont également transmis, mais seulement comme candidats pour les alias.

Le hostname canonique est choisi en fonction des règles suivantes. Le premier résultat correspondant est sélectionné.

1. **agent-hostname** : hostname explicitement défini dans le [fichier de configuration de l'Agent][2] s'il ne commence pas par ip- ou domu.
2. **hostname** (`hostname -f` sous Linux) : si le hostname du DNS n'est pas défini sur EC2 par défaut (par exemple, `ip-192-0-0-1`).
3. **instance-id** : si l'Agent peut communiquer avec l'endpoint de métadonnées EC2 à partir du host.
4. **hostname** : basculer sur le hostname du DNS, même s'il n'est pas défini sur EC2 par défaut.

Si le nom est courant et non unique (par exemple : `localhost.localdomain`), la règle actuelle échoue et la règle suivante est appliquée.

### Hosts AWS

Lorsque les détails de vos hosts AWS sont récupérés via l'[API Datadog][3], les attributs suivants sont affichés lorsqu'ils sont disponibles :

| Attribut      | Description                                         |
|----------------|-----------------------------------------------------|
| `aws_id`       | L'ID de l'instance ; en cas d'absence d'ID, le host s'affiche à la place |
| `aws_name`     | Le tag `providername` cloud                        |
| `display_name` | Le hostname canonique (valeur de l'identifiant du host)   |

### Alias de host

Un host unique fonctionnant dans EC2 peut posséder un ID d'instance (i-abcd1234), un hostname générique fourni par EC2 basé sur l'adresse IP du host (ip-192-0-0-1) et un hostname significatif fourni par un serveur DNS interne ou un fichier de hosts géré par config (myhost.mydomain). Datadog crée des alias pour les hostnames lorsqu'il existe plusieurs noms uniques identifiables pour un seul host.

Les noms recueillis par l'Agent (plus de détails ci-dessus) sont ajoutés en tant qu'alias pour le nom canonique choisi.

Vous pouvez consulter la liste de tous les hosts de votre compte depuis la [liste des infrastructures][4]. Le volet Inspect affiche la liste des alias associés à chaque host. Pour y accéder, cliquez sur le bouton **Inspect** qui s'affiche lorsque vous passez votre curseur sur un host :

{{< img src="agent/faq/host_aliases.png" alt="Alias de host"  >}}

## Versions de l'Agent

La résolution des hostnames ne fonctionne pas de la même manière avec l'Agent v5 et l'Agent v6.

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

### Linux et macOS

Si vous passez de l'Agent v5 à l'Agent v6, il est possible que le hostname transmis par votre Agent change. Pour résoudre le hostname du système, l'Agent v5 utilise la commande `hostname -f`, tandis que l'Agent v6 utilise l'API Golang `os.Hostname()`. Après une mise à niveau, le hostname de l'Agent peut passer d'un nom de domaine complet (FQDN) à un hostname raccourci. Exemple :

`sub.domain.tld` --> `sub`

**Remarque** : l'option de configuration `hostname_fqdn` a été ajoutée à partir de la version 6.3 de l'Agent afin de conserver le comportement de l'Agent v5 avec l'Agent v6. Ce flag est désactivé par défaut sur les versions 6.3+. Consultez l'[exemple de fichier datadog.yaml][1] pour découvrir comment activer cette option.

#### Comment savoir si vous êtes concerné

À partir de la version 6.3.0, les logs de l'Agent affichent l'avertissement ci-dessous si vous êtes concerné par le changement :
```text
DEPRECATION NOTICE: The agent resolved your hostname as <HOSTNAME>. However in a future version, it will be resolved as <FQDN> by default. To enable the future behavior, please enable the `hostname_fqdn` flag in the configuration.
```

Vous n'êtes pas concerné si l'une des conditions suivantes est vraie :

* L'Agent est exécuté dans GCE.
* Le hostname est défini dans le [fichier de configuration principal de l'Agent][2] ou via la variable d'environnement `DD_HOSTNAME`.
* L'Agent est exécuté dans un conteneur avec accès à l'API Docker ou Kubernetes.
* Les hostnames renvoyés par `cat /proc/sys/kernel/hostname` et `hostname -f` sont identiques.

#### Action recommandée

Si vous êtes concerné par ce changement, Datadog vous conseille d'effectuer les actions suivantes lors de la mise à niveau de votre Agent :

* **Passage de l'Agent v5 à l'Agent < v6.3** : codez votre hostname en dur dans le [fichier de configuration principal de l'Agent][2].
* **Passage de l'Agent v5 à l'Agent >= v6.3** : activez l'option `hostname_fqdn` dans le [fichier de configuration principal de l'Agent][2]. Vous garderez ainsi le même hostname.
* **Passage de l'Agent v5 à l'Agent v6 (une version future qui utilise le nom de domaine complet par défaut)** : aucune action n'est nécessaire.
* Si vous souhaitez vous assurer que le comportement par défaut de l'Agent v6 sera préservé lors des futures mises à niveau de l'Agent, définissez `hostname_fqdn` sur `false`. Toutefois, Datadog vous recommande de définir `hostname_fqdn` sur `true` dans la mesure du possible.

### Windows

Sous Windows, l'Agent v5 transmettait le hostname non qualifié par défaut. Pour des raisons de compatibilité, ce comportement est conservé dans l'Agent v6. Le nouveau flag `hostname_fqdn` est désactivé par défaut sous Windows et le restera sur toutes les futures versions de l'Agent **v6**.

L'Agent pour Windows tient compte du flag de configuration à partir de la version 6.5. Si vous définissez `hostname_fqdn` sur true, l'Agent Windows transmettra le hostname complet.

#### Action recommandée

Par défaut, l'action recommandée est de ne rien faire. Le comportement existant est ainsi préservé, notamment en cas de mise à niveau depuis l'Agent v5.

Si vous souhaitez que les hosts Windows transmettrent leurs hostnames complets, définissez l'option `hostname_fqdn` sur `true` dans le [fichier de configuration principal de votre Agent][2].

### GCE

_Concerne uniquement les Agents exécutés dans GCE_

Par défaut, l'Agent v6 utilise le hostname de l'instance fourni par GCE. Ce comportement correspond à celui de l'Agent v5.5.1+ lorsque `gce_updated_hostname` est défini sur true dans `datadog.conf`.

Si vous mettez à niveau l'Agent depuis la v5 alors que `gce_updated_hostname` n'est pas défini / est défini sur false et que le hostname de l'Agent n'est pas codé en dur dans `datadog.conf`/`datadog.yaml`, le hostname transmis à Datadog passe du `name` de l'instance GCE au `hostname` complet de l'instance GCE (qui inclut l'ID de projet GCE).

[1]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[2]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Agent v5" %}}

{{< img src="agent/faq/agent_hostname.jpeg" alt="Schéma du hostname de l'Agent"  >}}

{{% /tab %}}
{{< /tabs >}}

[1]: /fr/agent/guide/agent-commands/#agent-status-and-information
[2]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[3]: /fr/api/v1/hosts/
[4]: https://app.datadoghq.com/infrastructure
