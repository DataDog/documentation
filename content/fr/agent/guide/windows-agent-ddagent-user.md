---
aliases:
- /fr/agent/faq/windows-agent-ddagent-user/
title: Utilisateur de l'Agent Datadog pour Windows
---

Depuis la version `6.11.0` de l'Agent Windows, les composants de base ainsi que ceux de la solution APM et du système de tracing s'exécutent sous un compte utilisateur dédié au lieu du compte `LOCAL_SYSTEM`. Lorsqu'il est activé, le composant Live Process s'exécute toujours sous le compte `LOCAL_SYSTEM`.

Le programme d'installation de l'Agent crée un nouveau compte par défaut (`ddagentuser`), mais l'utilisateur a également la possibilité d'en spécifier un.
Le compte rejoint les groupes suivants lors de l'installation :

* Il devient membre du groupe Utilisateurs de l’Analyseur de performances
  * Nécessaire pour accéder aux informations de WMI
  * Nécessaire pour accéder aux données des compteurs de performances Windows
* Il devient membre du groupe Lecteurs des journaux d’événements

**Remarque** : le programme d'installation n'ajoute pas le compte qu'il crée aux groupes `Users` par défaut. Dans de rares cas, il est possible de rencontrer des problèmes d'autorisations. Si vous êtes concerné, ajoutez manuellement l'utilisateur créé au groupe `Users`.

Les stratégies de sécurité suivantes sont également appliquées au compte lors de l'installation :
* Refuser l'accès à cet ordinateur depuis le réseau
* Refuser les connexions locales
* Refuser les connexions via Remote Desktop Services
* Se connecter en tant que service

**Important** : étant donné que le compte est modifié au cours de l'installation afin de restreindre ses privilèges, notamment ses privilèges de connexion, assurez-vous qu'il ne s'agit pas d'un « vrai » compte utilisateur mais d'un compte uniquement dédié à l'exécution de l'Agent Datadog.

**Remarque** : les exemples de commande sur cette page utilisent tous les symboles `<>` pour signaler une variable à remplacer. Par exemple, si le compte utilisateur est `ddagentuser` et que la commande contient `DDAGENTUSER_NAME=<NOM_UTILISATEUR>`, alors `DDAGENTUSER_NAME=ddagentuser` doit être saisi dans la ligne de commande.

**Remarque** : depuis la version `7.38.0/6.38.0`, le programme d'installation prend en charge l'utilisation d'un **compte de service administré de groupe (gMSA)**. Pour spécifier un compte gMSA, ajoutez **$** à la fin du nom d'utilisateur : `<DOMAINE>\<NOM_UTILISATEUR>$`. Le compte gMSA doit exister *avant* l'installation, car le programme ne peut pas en créer un.

## Installation

Si aucun compte utilisateur n'est spécifié sur la ligne de commande, le programme d'installation tente de créer un compte utilisateur local nommé `ddagentuser` avec un mot de passe généré aléatoirement.

Si un compte utilisateur est spécifié sur la ligne de commande mais que ce compte est introuvable dans le système, le programme d'installation tente de le créer. Si un mot de passe a été spécifié, le programme d'installation utilise ce mot de passe ; sinon, il en génère un aléatoirement.

Pour spécifier un NOM_UTILISATEUR et un MOT_DE_PASSE (facultatif), passez les propriétés suivantes à la commande `msiexec` (supprimez les symboles `<>` qui entourent les paramètres fictifs) :

```shell
msiexec /i ddagent.msi DDAGENTUSER_NAME=<NOM_UTILISATEUR> DDAGENTUSER_PASSWORD=<MOT_DE_PASSE>
```

**Remarque** : le `<NOM_UTILISATEUR>` ne doit pas comporter plus de 20 caractères afin de respecter les exigences de l'[attribut SAM-Account-Name du schéma Active Directory][1].

**Remarque** : en raison d'une limitation liée au programme d'installation MSI, la propriété `DDAGENTUSER_PASSWORD` ne peut pas contenir de point-virgule `;`.

**Remarque** : si vous rencontrez des problèmes d'autorisations avec les checks `system` et `winproc` lors de l'installation, assurez-vous que le compte `ddagentuser` fait partie des groupes Utilisateurs de l'Analyseur de performances et Lecteurs des journaux d’événements.

**Remarque** : il n'est pas possible de spécifier l'utilisateur dans l'interface du programme d'installation. Utilisez la ligne de commande pour passer le `DDAGENTUSER_NAME` et d'autres paramètres. Ils seront ainsi pris en compte, même en cas d'installation via l'interface utilisateur.

### Installation avec une stratégie de groupe

Le programme d'installation modifie la stratégie de groupe locale pour permettre au compte utilisateur créé de **s'exécuter en tant que service**.
Si la stratégie de groupe du domaine ne le permet pas, le paramètre d'installation sera remplacé et vous devrez mettre à jour la stratégie de groupe du domaine pour permettre au compte utilisateur de fonctionner en tant que service.

### Installation dans un environnement de domaine

#### Machines jointes à un domaine

Sur les machines jointes à un domaine, le programme d'installation de l'Agent peut utiliser un compte spécifié par l'utilisateur (qu'il s'agisse d'un compte de domaine ou d'un compte local), ou créer un compte local.

Si un compte de domaine est spécifié sur la ligne de commande, il doit exister avant l'installation puisque seuls les contrôleurs de domaine peuvent créer des comptes de domaine.

Si un compte utilisateur est spécifié sur la ligne de commande mais que ce compte est introuvable dans le système, le programme d'installation tente de le créer. Si un mot de passe a été spécifié, le programme d'installation utilise ce mot de passe ; sinon, il en génère un aléatoirement.

Pour spécifier un nom d'utilisateur depuis un compte de domaine, utilisez le format suivant pour la propriété `DDAGENTUSER_NAME` :

```shell
msiexec /i ddagent.msi DDAGENTUSER_NAME=<DOMAINE>\<NOM_UTILISATEUR> DDAGENTUSER_PASSWORD=<MOT_DE_PASSE>
```

Le `<DOMAINE>` peut être un nom de domaine complet (au format `mondomaine.com`) ou le nom NETBIOS (pré-Windows 2000).
Il doit être séparé du `<NOM_UTILISATEUR>` à l'aide d'une barre oblique inversée `\`.

**Remarque** : le `<NOM_UTILISATEUR>` ne doit pas comporter plus de 20 caractères afin de respecter les exigences de l'[attribut SAM-Account-Name du schéma Active Directory][1].

**Remarque** : en raison d'une limitation liée au programme d'installation MSI, la propriété `DDAGENTUSER_PASSWORD` ne peut pas contenir de point-virgule `;`.

#### Contrôleurs de domaine

##### Contrôleurs de domaine principaux et secondaires

Lors de l'installation de l'Agent sur un contrôleur de domaine, il n'y a pas de notion de compte utilisateur local. Ainsi, si le programme d'installation crée un compte utilisateur, il s'agit d'un utilisateur de domaine et non d'un utilisateur local.

Si un compte utilisateur est spécifié sur la ligne de commande mais que ce compte est introuvable dans le système, le programme d'installation tente de le créer. Un mot de passe doit être spécifié pour que l'installation se déroule correctement.

Si le compte utilisateur spécifié est issu d'un domaine parent, le programme d'installation utilise ce compte utilisateur.
Si le compte utilisateur n'existe pas, il le crée dans le domaine enfant (le domaine auquel le contrôleur est joint). Le programme d'installation ne crée jamais de compte utilisateur dans le domaine parent.

##### Contrôleurs de domaine en lecture seule

En cas d'installation sur un contrôleur de domaine en lecture seule, le programme d'installation peut uniquement utiliser un compte de domaine existant.

### Installation avec Chef

Si vous utilisez Chef et le cookbook `datadog` officiel pour déployer l'Agent sur des hosts Windows, **utilisez au minimum la version 2.18.0** du cookbook pour que les autorisations adéquates soient attribuées aux fichiers de configuration de l'Agent.

## Mise à jour

Avec les versions < `7.25.0` de l'Agent, lorsque vous mettez à jour l'Agent Datadog sur un contrôleur de domaine ou un host où l'utilisateur a fourni un nom d'utilisateur pour l'Agent, vous devez spécifier la propriété `DDAGENTUSER_NAME` mais pas la propriété `DDAGENTUSER_PASSWORD`.

Depuis la version `7.25.0` de l'Agent, le programme d'installation mémorise le nom d'utilisateur utilisé pour installer l'Agent et s'en sert pour les mises à jour.
Il est toutefois possible de remplacer la valeur enregistrée avec `DDAGENTUSER_NAME`.

## Intégrations de l'Agent

### Autorisations générales

Tout a été mis en œuvre pour veiller à ce que le passage de `LOCAL_SYSTEM` à `ddagentuser` se déroule en douceur. Toutefois, certains problèmes nécessitent une modification spécifique, propre à chaque configuration, lors de l'installation de l'Agent. Ces problèmes sont liés au fait que l'Agent Windows faisait auparavant appel à des droits administrateur que le nouvel Agent ne possède pas par défaut.

Par exemple, si le check Directory surveille un répertoire qui dispose de droits d'accès spécifiques, tels qu'un accès en lecture réservé aux membres du groupe Administrateurs, alors l'Agent existant pourra surveiller ce répertoire puisque `LOCAL_SYSTEM` dispose des droits d'administrateur. Une fois la mise à jour effectuée, l'administrateur devra ajouter `ddagentuser` à la liste des contrôles d'accès associée à ce répertoire afin que le check fonctionne correctement.

**Remarque** : sous Windows Server, l'intégration Windows Service ne peut pas exécuter le check sur le service `DHCPServer` car celui-ci utilise une liste de contrôle d'accès spéciale. Le check renvoie alors `UNKNOWN`.

**Remarque** : les mêmes considérations s'appliquent aux fichiers de logs qui peuvent être surveillés via les fonctionnalités de collecte de logs de l'Agent.

### Intégrations basées sur JMX

Le passage à `ddagentuser` affectera vos intégrations basées sur JMX si le JMXFetch de l'Agent est configuré pour se connecter aux JVM surveillées via l'API Attach. Par exemple, si :

1. Vous utilisez une intégration basée sur JMX telle que :
   * [ActiveMQ][2]
   * [ActiveMQ_XML][3]
   * [Cassandra][4]
   * [JMX][5]
   * [Presto][6]
   * [Solr][7]
   * [Tomcat][8]
   * [Kafka][9]

2. **ET** que vous avez configuré l'intégration avec le paramètre `process_name_regex` au lieu des paramètres `host` et `port`.

Si vous utilisez l'API Attach, le changement de contexte utilisateur signifie que le JMXFetch de l'Agent pourra uniquement se connecter aux JVM qui s'exécutent également sous le contexte utilisateur `ddagentuser`. Dans la plupart des cas, il est recommandé de configurer JMXFetch pour qu'il utilise l'accès distant à JMX en activant l'accès distant sur vos JVM cibles et en configurant vos intégrations JMX avec les paramètres `host` et `port`. Pour en savoir plus, consultez la [documentation JMX][5].

### Check de processus

À partir de la version 6.11, l'Agent s'exécute en tant que `ddagentuser` au lieu de `Local System`. Par conséquent, il n'a pas accès à la ligne de commande complète des processus exécutés sous d'autres utilisateurs ni à l'utilisateur des processus des autres utilisateurs. Cela signifie que les options suivantes du check ne fonctionnent pas :

* `exact_match` lorsque définie sur `false`
* `user`, qui permet de sélectionner des processus qui appartiennent à un utilisateur spécifique

Pour rétablir l'ancien comportement et exécuter l'Agent en tant que `Local System` (déconseillé), ouvrez une console en tant qu'administrateur et exécutez la commande suivante : `sc.exe config "datadogagent" obj= LocalSystem`. Vous pouvez également ouvrir le gestionnaire de services, accéder à DataDog Agent > Properties et définir le paramètre Log On sur `Local System`.

### Intégration Cassandra Nodetool

Pour que l'intégration Cassandra Nodetool continue de fonctionner, appliquez les modifications suivantes à votre environnement :

* Autorisez l'utilisateur `ddagentuser` à accéder au répertoire d'installation de Nodetool.
* Définissez les variables d'environnement du répertoire d'installation de Nodetool (`CASSANDRA_HOME` et `DSCINSTALLDIR`) en tant que variables dans l'ensemble du système au lieu de variables limitées à l'utilisateur effectuant l'installation de Nodetool.

## Canal des logs de sécurité

Si vous utilisez l'[intégration Datadog/Journal d'événements Win32][10], l'utilisateur Datadog `ddagentuser` doit être ajouté au groupe Lecteurs des journaux d’événements pour recueillir les logs depuis le canal des logs de sécurité :

1. Ouvrez l'exécuteur de commandes avec le raccourci *Windows+R*, puis saisissez `compmgmt.msc`.
2. Accédez à *Outils système* -> *Utilisateurs et groupes locaux* -> *Groupes*.
3. Faites un clic droit sur **Lecteurs des journaux d’événements** et sélectionnez *Propriétés*.
4. Cliquez sur *Ajouter* et saisissez `ddagentuser` -> *Vérifier les noms*.
5. Cliquez sur *OK* et *Appliquer*.

[1]: https://docs.microsoft.com/en-us/windows/win32/adschema/a-samaccountname?redirectedfrom=MSDN
[2]: /fr/integrations/activemq/
[3]: /fr/integrations/activemq/#activemq-xml-integration
[4]: /fr/integrations/cassandra/
[5]: /fr/integrations/java/
[6]: /fr/integrations/presto/
[7]: /fr/integrations/solr/
[8]: /fr/integrations/tomcat/
[9]: /fr/integrations/kafka/
[10]: /fr/integrations/win32_event_log/