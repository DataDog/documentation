---
description: Dépannez Workload Protection, y compris les flares d'Agent, les auto-tests
  et la compatibilité des plugins réseau.
title: Dépannage de Workload Protection
---
Si vous rencontrez des problèmes avec Workload Protection, utilisez les directives de dépannage suivantes. Si vous avez besoin d'une assistance supplémentaire, contactez [Datadog support][1].

## Flare de Security Agent {#security-agent-flare}

<div class="alert alert-warning">Depuis l'Agent <code>7.77</code>, le <code>security-agent</code> Le composant runtime de Workload Protection est obsolète et n'est plus requis. Le composant autonome <code>security-agent flare</code> la commande ne fonctionne pas lorsque le processus de Security Agent n'est pas en cours d'exécution. Utilisez la commande du core Agent <code>flare</code> à la place.</div>

Semblable au [Agent flare][3], vous pouvez envoyer les informations de dépannage nécessaires à l'équipe de Datadog support avec une seule commande flare.

Le flare demande une confirmation avant le téléchargement, vous pouvez donc examiner le contenu avant que Security Agent ne l'envoie.

Dans les commandes ci-dessous, remplacez `<CASE_ID>` par votre ID de cas de support Datadog si vous en avez un, puis saisissez l'adresse e-mail qui y est associée.

Si vous n'avez pas d'ID de cas, saisissez l'adresse e-mail que vous utilisez pour vous connecter à Datadog afin d'ouvrir un cas de support.

| Plateforme     | Commande                                                                             |
| --------     | -------                                                                             |
| Docker       | `docker exec -it datadog-agent security-agent flare <CASE_ID>`                      |
| Kubernetes   | `kubectl exec -it <POD_NAME> -c security-agent -- security-agent flare <CASE_ID>`   |
| Host         | `sudo /opt/datadog-agent/embedded/bin/security-agent flare <CASE_ID>`               |

## Self-tests de l'Agent {#agent-self-tests}

Pour confirmer que Workload Protection peut détecter les événements système, déclenchez manuellement les self-tests en exécutant la commande suivante :

| Plateforme     | Commande                                                                             |
| --------     | -------                                                                             |
| Docker       | `docker exec -it datadog-agent system-probe runtime self-test`                    |
| Kubernetes   | `kubectl exec -it <POD_NAME> -c system-probe -- system-probe runtime self-test` |
| Host         | `sudo /opt/datadog-agent/embedded/bin/system-probe runtime self-test`             |

La procédure de self-test crée certains fichiers temporaires et des règles pour les surveiller, puis déclenche ces règles pour confirmer que les événements sont propagés correctement.

La réponse suivante apparaît lorsque les règles sont propagées.

```
Runtime self test: OK
```

Les événements apparaissent dans le {{< ui >}}Events Explorer{{< /ui >}}.

## Compatibilité avec les plugins réseau Kubernetes personnalisés {#compatibility-with-custom-kubernetes-network-plugins}

Les détections basées sur le réseau de Workload Protection reposent sur le sous-système de contrôle du trafic du noyau Linux. Ce sous-système est connu pour introduire des conditions de concurrence si plusieurs fournisseurs tentent d'insérer, de remplacer ou de supprimer des filtres sur le qdisc d'entrée « clsact ». Utilisez la liste de contrôle suivante pour confirmer que Workload Protection est configuré correctement :

- Vérifiez si votre fournisseur utilise des classificateurs de contrôle du trafic eBPF. S'il ne les utilise pas, vous pouvez ignorer ce paragraphe.
- Vérifiez si votre fournisseur renvoie TC_ACT_OK ou TC_ACT_UNSPEC après avoir accordé l'accès à un paquet réseau. S'il renvoie TC_ACT_UNSPEC, vous pouvez ignorer ce paragraphe.
- Vérifiez la priorité que votre fournisseur attribue à ses classificateurs eBPF :
  - S'il utilise la priorité 1, les détections réseau de Workload Protection ne fonctionnent pas à l'intérieur de vos conteneurs.
  - S'il utilise une priorité de 2 à 10, assurez-vous de configurer `runtime_security_config.network.classifier_priority` sur un nombre strictement inférieur à la priorité choisie par votre fournisseur.
  - S'ils utilisent la priorité 11 ou supérieure, vous pouvez ignorer ce paragraphe.

Par exemple, il existe une condition de concurrence connue avec Cilium 1.9 et versions antérieures avec Datadog Agent (version 7.36 à 7.39.1, 7.39.2 exclu) qui peut se produire lors du démarrage d'un nouveau pod. La condition de concurrence peut entraîner une perte de connectivité à l'intérieur du pod, selon la configuration de Cilium.

En fin de compte, si Datadog Agent ou vos fournisseurs tiers ne peuvent pas être configurés pour empêcher le problème de se produire, vous devez désactiver les détections réseau de Workload Protection en suivant les étapes ci-dessous :

- Ajoutez le paramètre suivant à votre fichier de configuration `system-probe.yaml` sur les installations basées sur le host :

```yaml
runtime_security_config:
  network:
    enabled: false
```
- Ajoutez les valeurs suivantes si vous utilisez le Helm Chart public pour déployer Datadog Agent :

```yaml
datadog:
  securityAgent:
    runtime:
      network:
        enabled: false
```
- Ajoutez la variable d'environnement suivante si vous déployez manuellement le conteneur de Datadog Agent :

```bash
DD_RUNTIME_SECURITY_CONFIG_NETWORK_ENABLED=false
```

## Dépannage des interruptions de session à distance ou d'admission de pod Kubernetes {#troubleshooting-kubernetes-remote-session-or-pod-admission-disruptions}

Workload Protection collecte les identités des utilisateurs Kubernetes et enrichit vos événements Workload Protection avec le contexte nécessaire pour différencier les accès à distance à votre infrastructure de l'activité générée par vos charges de travail. Cette intégration repose sur un [Kubernetes Mutating Webhook][2] pour instrumenter les sessions `kubectl exec`. Si cette instrumentation perturbe l'admission des pods ou la création de sessions `kubectl exec`, suivez les étapes ci-dessous pour désactiver la fonctionnalité.

{{< tabs >}}

{{% tab "Datadog Operator" %}}

1. Ajoutez ce qui suit à la section `spec` du fichier `datadog-agent.yaml` :

    ```yaml
    # datadog-agent.yaml file
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      features:
        # Integrate with Kubernetes to enrich Workload Protection events with Kubernetes user identities
        admissionController:
          cwsInstrumentation:
            enabled: false
    ```

2. Appliquez les modifications et redémarrez l'Agent.

{{% /tab %}}

{{% tab "Helm" %}}

1. Ajoutez ce qui suit à la section `datadog` du fichier `datadog-values.yaml` :

    ```yaml
    # datadog-values.yaml file

    # Integrate with Kubernetes to enrich Workload Protection events with Kubernetes user identities
    clusterAgent:
      admissionController:
        cwsInstrumentation:
          enabled: false
    ```

2. Redémarrez l'Agent.

{{% /tab %}}

{{% tab "DaemonSet" %}}

1. (facultatif) Ajoutez le paramètre suivant à la section `env` de `cluster-agent` dans le fichier `cluster-agent-deployment.yaml` :

    ```bash
      # Source: datadog/templates/cluster-agent-deployment.yaml
      apiVersion:app/1
      kind: Deployment
      [...]
      spec:
        [...]
        template:
          [...]
          spec:
            [...]
            containers:
            [...]
              - name: cluster-agent
                [...]
                env:
                  - name: DD_RUNTIME_ADMISSION_CONTROLLER_CWS_INSTRUMENTATION_ENABLED
                    value: "false"
    ```

{{% /tab %}}
{{< /tabs >}}

## Désactiver Workload Protection {#disable-workload-protection}

Pour désactiver Workload Protection, suivez les étapes correspondant à la plateforme de Datadog Agent.

### Helm {#helm}

Dans le `values.yaml` Helm, définissez `securityAgent.runtime` sur `enabled: false` comme suit :

{{< code-block lang="yaml" filename="values.yaml" disable_copy="false" collapsible="true" >}}

# values.yaml file
datadog:

# Set to false to Disable CWS
securityAgent:
  runtime:
    enabled: false
{{< /code-block >}}

### Daemonset/Docker {#daemonsetdocker}

Appliquez la modification de variable d'environnement suivante au déploiement de System Probe et de Security Agent pour un Daemonset :

{{< code-block lang="json" filename="daemon.json" disable_copy="false" collapsible="true" >}}

DD_RUNTIME_SECURITY_CONFIG_ENABLED=false
{{< /code-block >}}

### Host {#host}

Modifiez `system-probe.yaml` et `security-agent.yaml` pour désactiver la configuration du runtime :

1. Désactivez Workload Protection dans `/etc/datadog-agent/system-probe.yaml`. Définissez `runtime_security_config` sur `enabled: false` :
    {{< code-block lang="yaml" filename="system-probe.yaml" disable_copy="false" collapsible="true" >}}

    ##########################################
    ## Security Agent Runtime Configuration ##
    ##                                      ##
    ## Settings to send logs to Datadog are ##
    ## fetched from section `logs_config`   ##
    ## in datadog-agent.yaml                ##
    ##########################################

    runtime_security_config:
    ## @param enabled - boolean - optional - default: false
    ## Set to true to enable full Workload Protection.
    #
    enabled: false

    ## @param fim_enabled - boolean - optional - default: false
    ## Set to true to only enable the File Integrity Monitoring feature.
    # fim_enabled: false

    ## @param socket - string - optional - default: /opt/datadog-agent/run/runtime-security.sock
    ## The full path of the unix socket where the security runtime module is accessed.
    #
    # socket: /opt/datadog-agent/run/runtime-security.sock
    {{< /code-block >}}
2. Désactivez Workload Protection dans `/etc/datadog-agent/security-agent.yaml`. Définissez `runtime_security_config` sur `enabled: false` :
    {{< code-block lang="yaml" filename="security-agent.yaml" disable_copy="false" collapsible="true" >}}

    ##########################################
    ## Security Agent Runtime Configuration ##
    ##                                      ##
    ## Settings to send logs to Datadog are ##
    ## fetched from section `logs_config`   ##
    ## in datadog-agent.yaml                ##
    ##########################################

    runtime_security_config:
    ## @param enabled - boolean - optional - default: false
    ## Set to true to enable the Security Runtime Module.
    #
    enabled: false

    ## @param socket - string - optional - default: /opt/datadog-agent/run/runtime-security.sock
    ## The full path of the unix socket where the security runtime module is accessed.
    #
    # socket: /opt/datadog-agent/run/runtime-security.sock
    {{< /code-block >}}
3. Redémarrez vos Datadog Agents.

[1]: /fr/help/
[2]: https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/
[3]: /fr/agent/troubleshooting/send_a_flare/?tab=agent