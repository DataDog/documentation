---
description: Parcourez les packs Observability Pipelines par source et destination.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/rehydrate-archived-logs-with-observability-pipelines
  tag: Blog
  text: Réhydratez les logs archivés dans n'importe quel SIEM ou fournisseur de journalisation
    avec Observability Pipelines
multifiltersearch:
  data:
  - description: Ce pack signale les campagnes malveillantes de boîtes aux lettres
      d'abus et les tentatives de remédiation échouées dans les messages signalés.
    destination: Any destination
    pack: '[Abnormal.ai - Abuse Campaigns](/observability_pipelines/packs/abnormal_ai_abuse_campaigns/)'
    source: Abnormal.ai
  - description: Ce pack suit le backlog des messages de la boîte de réception des
      signalements d'abus effectués par des utilisateurs que Abnormal.ai n'a pas analysés.
    destination: Any destination
    pack: '[Abnormal.ai - Abuse Mailbox Messages Not Analyzed](/observability_pipelines/packs/abnormal_ai_abuse_mailbox_messages/)'
    source: Abnormal.ai
  - description: Ce pack signale les actions administratives échouées et les événements
      de remédiation de masse provenant de la piste d'audit du portail Abnormal.ai.
    destination: Any destination
    pack: '[Abnormal.ai - Audit Logs](/observability_pipelines/packs/abnormal_ai_audit_logs/)'
    source: Abnormal.ai
  - description: Ce pack signale les menaces par e-mail à haut risque non remédiées
      telles que la compromission d'e-mail professionnel (BEC), l'extorsion et le
      phishing d'identifiants ciblant les VIP.
    destination: Any destination
    pack: '[Abnormal.ai - Threats](/observability_pipelines/packs/abnormal_ai_threats/)'
    source: Abnormal.ai
  - description: Ce pack traite les événements Active Directory Domain Services, y
      compris l'authentification Kerberos, les modifications des services d'annuaire
      et l'abus de réplication DCSync.
    destination: Any destination
    pack: '[Active Directory](/observability_pipelines/packs/active_directory/)'
    source: Active Directory
  - description: Les journaux Akamai montrent les demandes et les réponses des clients
      à la périphérie.
    destination: Any destination
    pack: '[Akamai CDN](/observability_pipelines/packs/akamai_cdn/)'
    source: Akamai
  - description: Les résultats d'AlphaSOC signalent les menaces DNS et IP détectées
      sur votre réseau.
    destination: Any destination
    pack: '[AlphaSOC Findings](/observability_pipelines/packs/alphasoc_findings/)'
    source: AlphaSOC
  - description: Les journaux AWS CloudFront montrent les demandes, l'utilisation
      du cache et l'activité à la périphérie.
    destination: Any destination
    pack: '[Amazon CloudFront](/observability_pipelines/packs/amazon_cloudfront/)'
    source: AWS
  - description: Ce pack extrait les signaux de contact et d'agent des journaux Amazon
      Connect, signalant les appels abandonnés et les risques de fraude.
    destination: Any destination
    pack: '[Amazon Connect](/observability_pipelines/packs/amazon_connect/)'
    source: AWS
  - description: Les journaux de flux Amazon VPC capturent le trafic réseau entre
      les ressources VPC.
    destination: Any destination
    pack: '[Amazon VPC Flow Logs](/observability_pipelines/packs/amazon_vpc_flow_logs/)'
    source: AWS
  - description: Ce pack traite les événements de synchronisation, d'état et RBAC
      d'Argo CD provenant du contrôleur d'application et du serveur API.
    destination: Any destination
    pack: '[Argo CD](/observability_pipelines/packs/argo_cd/)'
    source: Argo CD
  - description: Les journaux Auth0 couvrent les activités de connexion, d'inscription,
      de MFA et d'API.
    destination: Any destination
    pack: '[Auth0](/observability_pipelines/packs/auth0/)'
    source: Auth0
  - description: Les journaux d'audit de l'Aviatrix Controller capturent les commandes
      API, l'attribution des utilisateurs et les résultats.
    destination: Any destination
    pack: '[Aviatrix Controller API Audit](/observability_pipelines/packs/aviatrix_controller_api_audit/)'
    source: Aviatrix
  - description: Les journaux du pare-feu FQDN Aviatrix capturent les demandes de
      domaine de sortie et l'application des politiques.
    destination: Any destination
    pack: '[Aviatrix FQDN Firewall](/observability_pipelines/packs/aviatrix_fqdn_firewall/)'
    source: Aviatrix
  - description: Les journaux de statistiques réseau de la passerelle Aviatrix exposent
      les octets rx/tx par interface, le nombre de paquets et les événements de perte
      réseau.
    destination: Any destination
    pack: '[Aviatrix Gateway Network Stats](/observability_pipelines/packs/aviatrix_gateway_network_stats/)'
    source: Aviatrix
  - description: Aviatrix Gateway System Stats expose l’utilisation du CPU, de la
      mémoire et du disque sur les passerelles cloud.
    destination: Any destination
    pack: '[Aviatrix Gateway System Stats](/observability_pipelines/packs/aviatrix_gateway_system_stats/)'
    source: Aviatrix
  - description: Les journaux de microsegmentation DCF Aviatrix capturent l'application
      des politiques est-ouest sur les passerelles cloud.
    destination: Any destination
    pack: '[Aviatrix L4 Microsegmentation](/observability_pipelines/packs/aviatrix_l4_microsegmentation/)'
    source: Aviatrix
  - description: Les journaux d'inspection L7/TLS Aviatrix capturent le contexte de
      session TLS et l'application des politiques.
    destination: Any destination
    pack: '[Aviatrix L7/TLS Inspection](/observability_pipelines/packs/aviatrix_l7_tls_inspection/)'
    source: Aviatrix
  - description: Les alertes IDS/IPS Suricata Aviatrix capturent les correspondances
      de signature sur le trafic réseau de la passerelle.
    destination: Any destination
    pack: '[Aviatrix Suricata IDS/IPS](/observability_pipelines/packs/aviatrix_suricata_ids_ips/)'
    source: Aviatrix
  - description: Les journaux d'état des tunnels Aviatrix capturent les changements
      d'état, les événements et les causes de défaillance des liens Site2Cloud et
      de transit.
    destination: Any destination
    pack: '[Aviatrix Tunnel Status](/observability_pipelines/packs/aviatrix_tunnel_status/)'
    source: Aviatrix
  - description: Les journaux de la passerelle VPN Aviatrix capturent les cycles de
      vie des sessions par utilisateur, les événements d'authentification et les volumes
      de trafic de la passerelle.
    destination: Any destination
    pack: '[Aviatrix VPN Session](/observability_pipelines/packs/aviatrix_vpn_session/)'
    source: Aviatrix
  - description: Les ALB AWS capturent l'activité des requêtes HTTP acheminées via
      ceux-ci.
    destination: Any destination
    pack: '[AWS Application Load Balancer Logs](/observability_pipelines/packs/aws_alb/)'
    source: AWS
  - description: AWS CloudTrail enregistre les appels d'API et l'activité du compte
      sur les services AWS.
    destination: Any destination
    pack: '[AWS CloudTrail](/observability_pipelines/packs/aws_cloudtrail/)'
    source: AWS
  - description: AWS CloudWatch Logs capture les flux de logs provenant de Lambda,
      ECS, et plus encore.
    destination: Any destination
    pack: '[AWS CloudWatch Logs](/observability_pipelines/packs/aws_cloudwatch_logs/)'
    source: AWS
  - description: AWS Config surveille et enregistre les modifications de configuration
      des ressources.
    destination: Any destination
    pack: '[AWS Config](/observability_pipelines/packs/aws_config/)'
    source: AWS
  - description: Les ELB AWS capturent les requêtes HTTP et HTTPS des Classic Load
      Balancers.
    destination: Any destination
    pack: '[AWS Elastic Load Balancer Logs](/observability_pipelines/packs/aws_elb/)'
    source: AWS
  - description: AWS GuardDuty détecte les menaces dans votre compte AWS.
    destination: Any destination
    pack: '[AWS GuardDuty](/observability_pipelines/packs/aws_guardduty/)'
    source: AWS
  - description: Les journaux AWS Lambda capturent les invocations, les erreurs et
      les démarrages à froid.
    destination: Any destination
    pack: '[AWS Lambda](/observability_pipelines/packs/aws_lambda/)'
    source: AWS
  - description: Les NLB AWS capturent l'activité de connexion et les données de performance.
    destination: Any destination
    pack: '[AWS Network Load Balancer Logs](/observability_pipelines/packs/aws_nlb/)'
    source: AWS
  - description: AWS Route 53 capture les requêtes DNS sur votre infrastructure AWS.
    destination: Any destination
    pack: '[AWS Route 53](/observability_pipelines/packs/aws_route_53/)'
    source: AWS
  - description: AWS Security Hub agrège les résultats de sécurité dans AWS.
    destination: Any destination
    pack: '[AWS Security Hub](/observability_pipelines/packs/aws_security_hub/)'
    source: AWS
  - description: AWS WAF capture les journaux AWS WAF depuis CloudWatch, S3 ou Firehose.
    destination: Any destination
    pack: '[AWS WAF](/observability_pipelines/packs/aws_waf/)'
    source: AWS
  - description: Les journaux de flux v2 des groupes de sécurité réseau Azure enregistrent
      les décisions par connexion et le nombre d'octets.
    destination: Any destination
    pack: '[Azure NSG](/observability_pipelines/packs/azure_nsg/)'
    source: Azure
  - description: Le syslog BlueCat BDDS capture les requêtes DNS et les baux DHCP.
    destination: Any destination
    pack: '[BlueCat DNS](/observability_pipelines/packs/bluecat_dns/)'
    source: BlueCat
  - description: Ce pack traite les journaux Check Point au format CEF, avec ou sans
      préfixe syslog.
    destination: Any destination
    pack: '[Check Point](/observability_pipelines/packs/checkpoint/)'
    source: Check Point
  - description: Les événements syslog Cisco ACI capturent l'état de santé de la fabric,
      les déplacements d'endpoints et l'activité administrative.
    destination: Any destination
    pack: '[Cisco ACI](/observability_pipelines/packs/cisco_aci/)'
    source: Cisco
  - description: Les journaux du pare-feu Cisco ASA capturent les événements syslog
      pour le trafic, les VPN et les alertes de sécurité.
    destination: Any destination
    pack: '[Cisco ASA](/observability_pipelines/packs/cisco_asa/)'
    source: Cisco
  - description: Ce pack mappe les événements syslog Cisco ASA au schéma UDM dans
      Google Security Operations.
    destination: Google SecOps
    pack: '[Cisco ASA - Google SecOps](/observability_pipelines/packs/cisco_asa_google_secops/)'
    source: Cisco
  - description: Ce pack associe les événements syslog Cisco ASA analysés au schéma
      CommonSecurityLog dans Microsoft Sentinel.
    destination: Microsoft Sentinel
    pack: '[Cisco ASA - Microsoft Sentinel](/observability_pipelines/packs/cisco_asa_microsoft_sentinel/)'
    source: Cisco
  - description: Les événements syslog Cisco FTD couvrent le contrôle d'accès, la
      prévention des intrusions, la détection de fichiers et le VPN.
    destination: Any destination
    pack: '[Cisco FTD](/observability_pipelines/packs/cisco_ftd/)'
    source: Cisco
  - description: Le syslog Cisco IOS capture les événements de sécurité, d'authentification
      et de routage.
    destination: Any destination
    pack: '[Cisco IOS](/observability_pipelines/packs/cisco_ios/)'
    source: Cisco
  - description: Les événements de trace Cisco IOS signalent les erreurs logicielles,
      les défaillances de mémoire et les problèmes de CPU.
    destination: Any destination
    pack: '[Cisco IOS Traceback](/observability_pipelines/packs/cisco_ios_traceback/)'
    source: Cisco
  - description: Cisco Meraki capture les événements d'appliance, les flux, le pare-feu
      VPN, les flux NAT et l'activité URL.
    destination: Any destination
    pack: '[Cisco Meraki](/observability_pipelines/packs/cisco_meraki/)'
    source: Cisco
  - description: Ce pack mappe les événements syslog Cisco Meraki analysés vers le
      schéma du tableau Syslog dans Microsoft Sentinel.
    destination: Microsoft Sentinel
    pack: '[Cisco Meraki - Microsoft Sentinel](/observability_pipelines/packs/cisco_meraki_microsoft_sentinel/)'
    source: Cisco
  - description: Les journaux Cloudflare montrent le trafic de périphérie, les performances
      et la sécurité.
    destination: Any destination
    pack: '[Cloudflare](/observability_pipelines/packs/cloudflare/)'
    source: Cloudflare
  - description: Falcon Data Replicator (FDR) fournit une détection et une réponse
      au niveau des endpoints.
    destination: Any destination
    pack: '[CrowdStrike FDR](/observability_pipelines/packs/crowdstrike/)'
    source: CrowdStrike
  - description: Ce flux de requêtes/réponses DNS neutre vis-à-vis du fournisseur
      inclut des indicateurs de tunneling et de beaconing DGA.
    destination: Any destination
    pack: '[DNS Stream](/observability_pipelines/packs/dns_stream/)'
    source: DNS Stream
  - description: Ce pack traite les journaux du pare-feu Cisco ASA envoyés à Exabeam
      et filtre par code ASA pour éliminer le bruit syslog non exploitable.
    destination: Exabeam
    pack: '[Exabeam - Cisco ASA](/observability_pipelines/packs/exabeam_cisco_asa/)'
    source: Cisco
  - description: Ce pack traite les événements CrowdStrike Falcon Data Replicator
      envoyés à Exabeam et élimine le bruit des capteurs et de la télémétrie.
    destination: Exabeam
    pack: '[Exabeam - CrowdStrike FDR](/observability_pipelines/packs/exabeam_crowdstrike_fdr/)'
    source: CrowdStrike
  - description: Ce pack traite les journaux du pare-feu FortiGate envoyés à Exabeam
      et filtre le trafic de routine et le bruit des contrôles de santé.
    destination: Exabeam
    pack: '[Exabeam - Fortinet FortiGate](/observability_pipelines/packs/exabeam_fortinet_fortigate/)'
    source: Fortinet
  - description: Ce pack traite les journaux syslog PAN-OS envoyés à Exabeam et filtre
      les journaux de trafic vides et les doublons de début, laissant le CSV brut
      intact.
    destination: Exabeam
    pack: '[Exabeam - Palo Alto](/observability_pipelines/packs/exabeam_palo_alto/)'
    source: Palo Alto
  - description: Ce pack traite les événements SentinelOne EDR envoyés à Exabeam et
      échantillonne les types d'événements à haut volume pour réduire les coûts d'ingestion.
    destination: Exabeam
    pack: '[Exabeam - SentinelOne Cloud Funnel](/observability_pipelines/packs/exabeam_sentinelone_cloud_funnel/)'
    source: SentinelOne
  - description: Ce pack traite les journaux d'événements Windows envoyés à Exabeam
      et filtre selon les codes utilisés par les analyseurs Exabeam, tout en conservant
      le XML brut intact pour le parsing.
    destination: Exabeam
    pack: '[Exabeam - Windows](/observability_pipelines/packs/exabeam_windows/)'
    source: Windows
  - description: Ce pack traite les journaux web ZIA, DNS ZIA et ZPA de Zscaler envoyés
      à Exabeam, et filtre et échantillonne le trafic de routine.
    destination: Exabeam
    pack: '[Exabeam - Zscaler](/observability_pipelines/packs/exabeam_zscaler/)'
    source: Zscaler
  - description: Les détections ExtraHop Reveal(x) font apparaître les menaces réseau
      et les anomalies comportementales.
    destination: Any destination
    pack: '[ExtraHop](/observability_pipelines/packs/extrahop/)'
    source: ExtraHop
  - description: Ce pack étiquette les détections réseau ExtraHop Reveal(x) avec la
      gravité et les adresses IP pour l'ingestion dans Microsoft Sentinel.
    destination: Microsoft Sentinel
    pack: '[ExtraHop - Microsoft Sentinel](/observability_pipelines/packs/extrahop_microsoft_sentinel/)'
    source: ExtraHop
  - description: Les journaux F5 capturent le trafic, la politique de sécurité et
      les événements d'intrusion.
    destination: Any destination
    pack: '[F5](/observability_pipelines/packs/f5/)'
    source: F5
  - description: Les journaux du CDN Fastly enregistrent les requêtes des clients,
      les états du cache et les performances de livraison.
    destination: Any destination
    pack: '[Fastly](/observability_pipelines/packs/fastly/)'
    source: Fastly
  - description: Ce pack mappe les journaux FortiGate vers le schéma CommonSecurityLog
      dans Microsoft Sentinel.
    destination: Microsoft Sentinel
    pack: '[Fortinet - Microsoft Sentinel](/observability_pipelines/packs/fortinet_microsoft_sentinel/)'
    source: Fortinet
  - description: Les journaux du pare-feu Fortinet enregistrent le trafic réseau autorisé,
      refusé et autre.
    destination: Any destination
    pack: '[Fortinet Firewall](/observability_pipelines/packs/fortinet_firewall/)'
    source: Fortinet
  - description: Les journaux du pare-feu VPC GCP enregistrent le trafic autorisé
      et refusé.
    destination: Any destination
    pack: '[GCP Firewall](/observability_pipelines/packs/gcp_firewall/)'
    source: Google Cloud
  - description: Les journaux d'audit Google Cloud capturent l'activité administrative
      et les violations de politique.
    destination: Any destination
    pack: '[Google Cloud Audit](/observability_pipelines/packs/google_cloud_audit/)'
    source: Google Cloud
  - description: Ce pack mappe les enregistrements de flux VPC AWS vers le schéma
      UDM dans Google Security Operations.
    destination: Google SecOps
    pack: '[Google SecOps - AWS VPC](/observability_pipelines/packs/google_secops_aws_vpc/)'
    source: AWS
  - description: Ce pack mappe les journaux de pare-feu Fortinet vers le schéma UDM
      dans Google Security Operations.
    destination: Google SecOps
    pack: '[Google SecOps - Fortinet Firewall](/observability_pipelines/packs/google_secops_fortinet_firewall/)'
    source: Fortinet
  - description: Ce pack remappe les journaux PAN-OS vers le schéma UDM dans Google
      Security Operations.
    destination: Google SecOps
    pack: '[Google SecOps - Palo Alto Firewall](/observability_pipelines/packs/google_secops_palo_alto_firewall/)'
    source: Palo Alto
  - description: Ce pack mappe les événements de sécurité Windows vers le schéma UDM
      dans Google Security Operations.
    destination: Google SecOps
    pack: '[Google SecOps - Windows Event Log](/observability_pipelines/packs/google_secops_windows_event_log/)'
    source: Windows
  - description: Les journaux d'entrée HAProxy enregistrent la manière dont le trafic
      d'entrée Kubernetes est routé et servi.
    destination: Any destination
    pack: '[HAProxy Ingress](/observability_pipelines/packs/haproxy_ingress/)'
    source: HAProxy
  - description: Le syslog Infoblox NIOS capture l'activité DNS, DHCP, d'audit et
      CEF des appliances.
    destination: Any destination
    pack: '[Infoblox](/observability_pipelines/packs/infoblox/)'
    source: Infoblox
  - description: Les journaux Istio Proxy capturent le trafic entrant et sortant géré
      par Envoy.
    destination: Any destination
    pack: '[Istio Proxy](/observability_pipelines/packs/istio_proxy/)'
    source: Istio
  - description: Le pare-feu Juniper SRX enregistre les données de session réseau.
    destination: Any destination
    pack: '[Juniper SRX Firewall Traffic Logs](/observability_pipelines/packs/juniper_srx_traffic/)'
    source: Juniper
  - description: Ce pack conserve uniquement les erreurs et les avertissements de
      kube-proxy, en éliminant le bruit de synchronisation iptables de routine généré
      à chaque cycle.
    destination: Any destination
    pack: '[Kube Proxy](/observability_pipelines/packs/kube_proxy/)'
    source: Kubernetes
  - description: Ce pack analyse le log texte de débogage classique du serveur DNS
      Windows (dns.log) et décode les noms de requête et les codes de réponse.
    destination: Any destination
    pack: '[Microsoft DNS](/observability_pipelines/packs/microsoft_dns/)'
    source: Microsoft
  - description: Ce pack étiquette les journaux AWS WAF avec les tactiques et techniques
      MITRE ATT&CK.
    destination: Any destination
    pack: '[MITRE ATT&CK AWS WAF Enrichment](/observability_pipelines/packs/mitre_attack_aws_waf_enrichment/)'
    source: AWS
  - description: Ce pack étiquette les journaux CloudTrail avec les tactiques et techniques
      MITRE ATT&CK.
    destination: Any destination
    pack: '[MITRE ATT&CK CloudTrail Enrichment](/observability_pipelines/packs/mitre_attack_cloudtrail_enrichment/)'
    source: AWS
  - description: Ce pack étiquette les journaux FortiGate avec les tactiques et techniques
      MITRE ATT&CK.
    destination: Any destination
    pack: '[MITRE ATT&CK FortiGate Enrichment](/observability_pipelines/packs/mitre_attack_fortigate_enrichment/)'
    source: Fortinet
  - description: Ce pack étiquette les journaux Okta avec les tactiques et techniques
      MITRE ATT&CK.
    destination: Any destination
    pack: '[MITRE ATT&CK Okta Enrichment](/observability_pipelines/packs/mitre_attack_okta_enrichment/)'
    source: Okta
  - description: Ce pack étiquette les journaux Palo Alto avec les tactiques et techniques
      MITRE ATT&CK.
    destination: Any destination
    pack: '[MITRE ATT&CK Palo Alto Enrichment](/observability_pipelines/packs/mitre_attack_palo_alto_enrichment/)'
    source: Palo Alto
  - description: Ce pack étiquette les journaux d'événements Windows avec les tactiques
      et techniques MITRE ATT&CK.
    destination: Any destination
    pack: '[MITRE ATT&CK Windows Enrichment](/observability_pipelines/packs/mitre_attack_windows_enrichment/)'
    source: Windows
  - description: Les journaux Netskope capturent l'utilisation des applications cloud,
      les politiques et les événements de sécurité.
    destination: Any destination
    pack: '[Netskope](/observability_pipelines/packs/netskope/)'
    source: Netskope
  - description: Les journaux NGINX enregistrent les requêtes des clients, les réponses
      et les erreurs du serveur web.
    destination: Any destination
    pack: '[NGINX](/observability_pipelines/packs/nginx/)'
    source: NGINX
  - description: Les journaux Okta montrent l'authentification, l'activité des utilisateurs
      et les événements de politique.
    destination: Any destination
    pack: '[Okta](/observability_pipelines/packs/okta/)'
    source: Okta
  - description: Ce pack signale les échecs de connexion, les nouvelles clés d'API
      et les modifications de privilèges figurant dans les logs d'audit de l'organisation
      OpenAI.
    destination: Any destination
    pack: '[OpenAI - Audit Logs](/observability_pipelines/packs/openai_audit_logs/)'
    source: OpenAI
  - description: Les journaux OTLP/JSON imbriquent les événements sous les tableaux
      resourceLogs, scopeLogs et logRecords, sur trois niveaux de profondeur par charge
      utile.
    destination: Any destination
    pack: '[OpenTelemetry Logs](/observability_pipelines/packs/opentelemetry_logs/)'
    source: OpenTelemetry
  - description: Ce pack normalise les résultats cloud d'Orca Security pour le routage
      vers le SIEM et le lac de données.
    destination: Any destination
    pack: '[Orca Security](/observability_pipelines/packs/orca_security/)'
    source: Orca Security
  - description: Les alertes Cortex XDR incluent la gravité, le mappage MITRE ATT&CK
      et le contexte source/destination.
    destination: Any destination
    pack: '[Palo Alto Cortex](/observability_pipelines/packs/palo_alto_cortex/)'
    source: Palo Alto
  - description: Les journaux du pare-feu Palo Alto capturent le trafic, les menaces
      et les événements système.
    destination: Any destination
    pack: '[Palo Alto Firewall](/observability_pipelines/packs/palo_alto_firewall/)'
    source: Palo Alto
  - description: Ce pack mappe les logs PAN-OS au schéma CommonSecurityLog dans Microsoft
      Sentinel.
    destination: Microsoft Sentinel
    pack: '[Palo Alto Networks - Microsoft Sentinel](/observability_pipelines/packs/palo_alto_microsoft_sentinel/)'
    source: Palo Alto
  - description: Ce pack remappe les journaux PAN-OS au schéma JSON plat de Cortex
      XSIAM.
    destination: Cortex XSIAM
    pack: '[Palo Alto Networks - XSIAM](/observability_pipelines/packs/palo_alto_xsiam/)'
    source: Palo Alto
  - description: Les journaux de Proofpoint Email Security capturent les menaces par
      e-mail, le phishing et les détections de logiciels malveillants.
    destination: Any destination
    pack: '[Proofpoint Email Security](/observability_pipelines/packs/proofpoint_email_security/)'
    source: Proofpoint
  - description: Ce pack fait ressortir les détections de vulnérabilités Qualys nouvelles,
      confirmées et rouvertes, en éliminant le bruit de faible gravité.
    destination: Any destination
    pack: '[Qualys Detections](/observability_pipelines/packs/qualys_detections/)'
    source: Qualys
  - description: SentinelOne Cloud Funnel diffuse les événements EDR et Deep Visibility
      sous forme de JSON vers le stockage cloud.
    destination: Any destination
    pack: '[SentinelOne Cloud Funnel EDR](/observability_pipelines/packs/sentinel_one/)'
    source: SentinelOne
  - description: Ce pack analyse le syslog générique RFC 3164/5424 avec un mappage
      de gravité et une métrique de volume de logs.
    destination: Any destination
    pack: '[Syslog](/observability_pipelines/packs/syslog/)'
    source: Syslog
  - description: Le journal analytique du serveur DNS Windows couvre les logs, les
      transferts de zone et les mises à jour dynamiques.
    destination: Any destination
    pack: '[Windows DNS Log](/observability_pipelines/packs/windows_dns_log/)'
    source: Windows
  - description: 'Ce pack signale les événements à haut risque du journal d''audit
      unifié Microsoft 365 (M365) : règles de transfert de courrier, délégation et
      changements de rôle.'
    destination: Any destination
    pack: '[Windows Office 365](/observability_pipelines/packs/windows_office_365/)'
    source: Microsoft
  - description: Les journaux d'événements Windows capturent l'activité du système,
      des applications et de la sécurité des hôtes Windows.
    destination: Any destination
    pack: '[Windows XML](/observability_pipelines/packs/windows_xml/)'
    source: Windows
  - description: Le journal d'événements Windows capture les événements d'authentification,
      de création de processus et de gestion de compte.
    destination: Any destination
    pack: '[WinEventLog](/observability_pipelines/packs/wineventlog/)'
    source: Windows
  - description: Les journaux DNS de Zscaler Internet Access (ZIA) capturent l'activité
      DNS et les actions de politique à l'échelle de l'organisation.
    destination: Any destination
    pack: '[ZScaler ZIA DNS](/observability_pipelines/packs/zscaler_zia_dns/)'
    source: Zscaler
  - description: Les journaux du pare-feu Zscaler Internet Access (ZIA) montrent le
      trafic réseau et les événements de sécurité.
    destination: Any destination
    pack: '[Zscaler ZIA Firewall](/observability_pipelines/packs/zscaler_zia_firewall/)'
    source: Zscaler
  - description: Les journaux de tunnel Zscaler Internet Access (ZIA) montrent l'état
      du tunnel, le trafic et les événements clés.
    destination: Any destination
    pack: '[Zscaler ZIA Tunnel](/observability_pipelines/packs/zscaler_zia_tunnel/)'
    source: Zscaler
  - description: Les journaux Web de Zscaler Internet Access (ZIA) capturent l'activité
      Web des utilisateurs et les actions de sécurité.
    destination: Any destination
    pack: '[Zscaler ZIA Web Logs](/observability_pipelines/packs/zscaler_zia_web_logs/)'
    source: Zscaler
  - description: Zscaler Private Access capture l'accès aux applications privées,
      les sessions et les connexions.
    destination: Any destination
    pack: '[Zscaler ZPA](/observability_pipelines/packs/zscaler_zpa/)'
    source: Zscaler
  headers:
  - id: pack
    name: Pack
  - filter_by: true
    id: source
    name: Source
  - filter_by: true
    id: destination
    name: Destination
  - id: description
    name: Description
title: Packs
---
## Présentation {#overview}

{{< img src="observability_pipelines/packs/packs.png" alt="La section des packs d'Observability Pipelines" style="width:100%;" >}}

Lors de la configuration d'un pipeline pour envoyer des journaux d'une source spécifique vers Observability Pipelines, vous devez souvent décider comment traiter et gérer ces journaux.

Des questions telles que les suivantes peuvent se poser :

- Quels journaux provenant de cette source sont importants ?
- Quels journaux peuvent être ignorés en toute sécurité ?
- Les journaux répétitifs doivent-ils être échantillonnés ?
- Quels champs doivent être analysés ou formatés pour la destination ?

Prendre ces décisions nécessite généralement une coordination entre plusieurs équipes et une connaissance détaillée de chaque source de logs.

Les Observability Pipelines Packs fournissent des configurations prédéfinies pour vous aider à prendre ces décisions rapidement et de manière cohérente. Les Packs appliquent les meilleures pratiques recommandées par Datadog pour des sources de logs spécifiques telles qu'Akamai, AWS CloudTrail, Cloudflare, Fastly, Palo Alto Firewall et Zscaler.

### Que font les Packs ?{#what-packs-do}

Chaque Pack inclut des configurations spécifiques à la source qui définissent :

- **Les champs qui peuvent être supprimés en toute sécurité** pour réduire la taille de la charge utile
- **Les journaux qui peuvent être ignorés**, tels que les événements en double ou les vérifications d'état
- **Les journaux qui doivent être conservés ou analysés**, tels que les erreurs ou les détections de sécurité
- **Les règles de formatage et de normalisation** pour aligner les journaux entre les différentes destinations et environnements

En utilisant des Packs, vous pouvez appliquer une logique cohérente de parsing, de filtrage et de routage pour chaque source de log sans créer de configurations manuellement.

### Pourquoi utiliser des Packs {#why-use-packs}

Les Packs aident les équipes à :

- **Réduire le volume d'ingestion et les coûts** en filtrant ou en échantillonnant les événements répétitifs à faible valeur
- **Maintenir la cohérence** du parsing et du mappage des champs entre les environnements et les destinations
- **Accélérer la configuration** en appliquant des configurations prêtes à l'emploi pour les sources courantes

## Configuration {#setup}

Pour configurer des packs :

1. Accédez à la page [Pipelines][1].
1. Cliquez sur {{< ui >}}Packs{{< /ui >}}.
1. Cliquez sur le pack que vous souhaitez configurer.
1. Vous pouvez soit créer un nouveau pipeline à partir du pack, soit ajouter le pack à un pipeline existant.
    - Si vous avez cliqué sur {{< ui >}}Add to New Pipeline{{< /ui >}}, dans le nouveau pipeline qui a été créé :
        - Cliquez sur le groupe de processeurs qui a été ajouté pour voir les processeurs individuels que le pack a ajoutés et les modifier si nécessaire. Consultez [Processors][2] pour plus d'informations.
        - Consultez [Set Up Pipelines][3] pour plus d'informations sur la configuration du reste du pipeline.
    - Si vous avez cliqué sur {{< ui >}}Add to Existing Pipeline{{< /ui >}} :
        1. Sélectionnez le pipeline auquel vous souhaitez ajouter le pack.
        1. Cliquez sur {{< ui >}}Add to Existing Pipeline{{< /ui >}}.
            1. Le pack est ajouté au dernier groupe de processeurs de votre pipeline.
            1. Cliquez sur le groupe pour examiner les processeurs individuels et les modifier si nécessaire. Consultez [Processors][2] pour plus d'informations.

## Packs disponibles {#available-packs}

Recherchez ou filtrez le tableau par source ou destination. Sélectionnez un nom de pack pour obtenir des détails.

{{< multifilter-search >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /fr/observability_pipelines/processors/
[3]: /fr/observability_pipelines/configuration/set_up_pipelines/