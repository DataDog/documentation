---
aliases: []
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/openldap/README.md'
display_name: OpenLDAP
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

## Implémentation

### Installation

L'intégration OpenLDAP est fournie avec l'Agent. Pour commencer à recueillir vos métriques OpenLDAP, suivez ces étapes :

1. Assurez-vous que le backend `cn=Monitor` est configuré sur vos serveurs OpenLDAP.
2. [Installez l'Agent][1] sur vos serveurs OpenLDAP.

### Configuration

#### Préparer OpenLDAP

Si le backend `cn=Monitor` n'est pas configuré sur votre serveur, suivez ces étapes :

1. Vérifiez si la surveillance est activée sur votre installation.

    ```
        sudo ldapsearch -Y EXTERNAL -H ldapi:/// -b cn=module{0},cn=config
    ```

Si vous voyez une ligne comprenant `olcModuleLoad: back_monitor.la`, la surveillance est bien activée. Passez alors à l'étape 3.

2. Activez la surveillance sur votre serveur.

    ```
        cat <<EOF | sudo ldapmodify -Y EXTERNAL -H ldapi:///
        dn: cn=module{0},cn=config
        changetype: modify
        add: olcModuleLoad
        olcModuleLoad: back_monitor.la
        EOF
    ```

3. Créez un utilisateur pour accéder aux informations de surveillance.

    1. Créez un mot de passe chiffré avec `slappasswd`.
    2. Ajoutez un nouvel utilisateur.

        ```
            cat <<EOF | ldapadd -H ldapi:/// -D <YOUR BIND DN HERE> -w <YOUR PASSWORD HERE>
            dn: <DN OF THE NEW USER>
            objectClass: simpleSecurityObject
            objectClass: organizationalRole
            cn: <COMMON NAME OF THE NEW USER>
            description: LDAP monitor
            userPassword:<ENCRYPTED PASSWORD HERE>
            EOF
        ```

4. Configurez la base de données du monitor.

    ```
        cat <<EOF | sudo ldapadd -Y EXTERNAL -H ldapi:///
        dn: olcDatabase=Monitor,cn=config
        objectClass: olcDatabaseConfig
        objectClass: olcMonitorConfig
        olcDatabase: Monitor
        olcAccess: to dn.subtree='cn=Monitor' by dn.base='<YOUR MONITOR USER DN HERE>' read by * none
        EOF
    ```

#### Configurer l'intégration OpenLDAP

Ajoutez ce bloc de configuration à votre fichier `openldap.d/conf.yaml` pour commencer à recueillir vos [métriques](#metriques) :

```
  init_config:

  instances:
      - url: ldaps://localhost
        port: 686
        username: <DN de l'utilisateur du monitor>
        password: <mot de passe de l'utilisateur du monitor>
```

Consultez le [fichier d'exemple openldap.yaml][2] pour découvrir toutes les options de configuration disponibles.

[Redémarrez l'Agent][3] pour commencer à envoyer vos métriques OpenLDAP à Datadog.

### Validation

[Lancez la sous-commande `status` de l'Agent][4] et cherchez `openldap` dans la section Checks :

```
  Checks
  ======
    [...]

    openldap
    --------
      - instance #0 [OK]
      - Collected 26 metrics, 0 events & 1 service check

    [...]
```

## Compatibilité

Ce check est compatible avec toutes les principales plateformes.

## Données collectées

### Métriques
{{< get-metrics-from-git "openldap" >}}


### Événements

Le check OpenLDAP n'inclut aucun événement.

### Checks de service

**openldap.can_connect**

Renvoie `CRITICAL` si l'intégration ne parvient pas à se connecter au serveur OpenLDAP à surveiller. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

## Développement

Consultez la [documentation sur les outils de développement][7]
pour découvrir comment tester et développer des intégrations reposant sur l'Agent.

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-core/blob/master/openldap/datadog_checks/openldap/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[5]: https://github.com/DataDog/integrations-core/blob/master/openldap/metadata.csv
[6]: https://docs.datadoghq.com/fr/help
[7]: https://docs.datadoghq.com/fr/developers


{{< get-dependencies >}}