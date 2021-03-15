---
aliases: []
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: openldap
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/openldap/README.md'
display_name: OpenLDAP
draft: false
git_integration_title: openldap
guid: ec61c06d-a870-4183-8a27-c66db1fc47cc
integration_id: openldap
integration_title: OpenLDAP
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: openldap.
metric_to_check: openldap.connections.current
name: openldap
public_title: Intégration Datadog/OpenLDAP
short_description: Recueillez des métriques à partir de votre serveur OpenLDAP à l'aide du backend cn=monitor.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Utilisez l'intégration OpenLDAP pour recueillir des métriques à partir du backend `cn=Monitor` de vos serveurs OpenLDAP.

## Configuration

### Installation

L'intégration OpenLDAP est fournie avec l'Agent. Pour commencer à recueillir vos métriques OpenLDAP :

1. Assurez-vous que le backend `cn=Monitor` est configuré sur vos serveurs OpenLDAP.
2. [Installez l'Agent][1] sur vos serveurs OpenLDAP.

### Configuration

#### Préparer OpenLDAP

Si le backend `cn=Monitor` n'est pas configuré sur votre serveur, suivez ces étapes :

1. Vérifiez si la surveillance est activée sur votre installation :

   ```shell
    sudo ldapsearch -Y EXTERNAL -H ldapi:/// -b cn=module{0},cn=config
   ```

   Si vous voyez une ligne comprenant ``olcModuleLoad: back_monitor.la`, la surveillance est bien activée. Passez alors à l'étape 3.

2. Activez la surveillance sur votre serveur :

   ```text
       cat <<EOF | sudo ldapmodify -Y EXTERNAL -H ldapi:///
       dn: cn=module{0},cn=config
       changetype: modify
       add: olcModuleLoad
       olcModuleLoad: back_monitor.la
       EOF
   ```

3. Créez un mot de passe chiffré avec `slappasswd`.
4. Ajoutez un nouvel utilisateur :

   ```text
       cat <<EOF | ldapadd -H ldapi:/// -D <YOUR BIND DN HERE> -w <YOUR PASSWORD HERE>
       dn: <USER_DISTINGUISHED_NAME>
       objectClass: simpleSecurityObject
       objectClass: organizationalRole
       cn: <COMMON_NAME_OF_THE_NEW_USER>
       description: LDAP monitor
       userPassword:<PASSWORD>
       EOF
   ```

5. Configurez la base de données du monitor :

   ```text
       cat <<EOF | sudo ldapadd -Y EXTERNAL -H ldapi:///
       dn: olcDatabase=Monitor,cn=config
       objectClass: olcDatabaseConfig
       objectClass: olcMonitorConfig
       olcDatabase: Monitor
       olcAccess: to dn.subtree='cn=Monitor' by dn.base='<USER_DISTINGUISHED_NAME>' read by * none
       EOF
   ```

#### Configurer l'intégration OpenLDAP

#{{< tabs >}}
{{% tab "Host" %}}
#{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

###### Collecte de métriques

1. Modifiez le fichier `openldap.d/conf.yaml` dans le dossier `conf.d` à la racine du répertoire de configuration de votre Agent. Consultez le [fichier d'exemple openldap.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## Full URL of your ldap server. Use `ldaps` or `ldap` as the scheme to
     ## use TLS or not, or `ldapi` to connect to a UNIX socket.
     #
     - url: ldaps://localhost:636

       ## @param username - string - optional
       ## The DN of the user that can read the monitor database.
       #
       username: "<USER_DISTINGUISHED_NAME>"

       ## @param password - string - optional
       ## Password associated with `username`
       #
       password: "<PASSWORD>"
   ```

2. [Redémarrez l'Agent][2].

###### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `openldap.d/conf.yaml` pour commencer à recueillir vos logs OpenLDAP :

   ```yaml
   logs:
     - type: file
       path: /var/log/slapd.log
       source: openldap
       service: "<SERVICE_NAME>"
   ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple openldap.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/openldap/datadog_checks/openldap/data/conf.yaml.example
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][2] et cherchez `openldap` dans la section Checks.

## Compatibilité

Ce check est compatible avec toutes les principales plateformes.

## Données collectées

### Métriques
{{< get-metrics-from-git "openldap" >}}


### Événements

Le check OpenLDAP n'inclut aucun événement.

### Checks de service

**openldap.can_connect** :<br>
Renvoie `CRITICAL` si l'intégration ne parvient pas à se connecter au serveur OpenLDAP à surveiller. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/fr/help/