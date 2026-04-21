---
aliases:
- /es/security/agentless_scanning
- /es/security/cloud_security_management/agentless_scanning
further_reading:
- link: /security/vulnerabilities
  tag: Documentación
  text: Más información sobre Cloud Security Vulnerabilities
- link: /security/sensitive_data_scanner/setup/cloud_storage
  tag: Documentación
  text: Configurar Sensitive Data Scanner para el almacenamiento en la nube
- link: /security/cloud_security_management/setup/agentless_scanning/update
  tag: Documentación
  text: Actualización de Agentless Scanning
- link: /security/cloud_security_management/troubleshooting/agentless_scanning
  tag: Documentación
  text: Resolución de problemas de Agentless Scanning
title: Cloud Security Agentless Scanning
---

## Información general

Agentless Scanning brinda visibilidad de las vulnerabilidades que existen en tu infraestructura en la nube de AWS, Azure y GCP, sin necesidad de instalar el Datadog Agent. Datadog recomienda activar Agentless Scanning como primer paso para obtener una visibilidad completa de tus recursos en la nube y, luego, instalar el Datadog Agent en tus activos principales con el tiempo para obtener un contexto de seguridad y observabilidad más profundo.

<div class="alert alert-info">Agentless Scanning excluye los recursos que tienen instalado el Datadog Agent.</div>

## Cómo funciona

El siguiente diagrama ilustra el funcionamiento de Agentless Scanning:

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Diagrama que muestra cómo funciona Agentless Scanning" width="90%" >}}

1. Datadog programa escaneos automáticos en intervalos de 12 horas y envía los recursos a escanear a través de [Remote Configuration][2].
   - Si tienes configurados [Filtros de evaluación de seguridad en la nube][15], Agentless Scanning respeta estos filtros y solo explora los recursos que coinciden con los criterios configurados.
2. En el caso de las funciones sin servidor (como AWS Lambda), los escáneres obtienen el código de la función.
3. El escáner crea snapshots de los volúmenes utilizados en las instancias de máquinas virtuales en ejecución. Utilizando las snapshots o el código de función, el escáner genera un SBOM (una lista de paquetes y dependencias).
4. El SBOM y los metadatos del host se transmiten a Datadog. Todos los demás datos -incluidas las snapshots, el contenido de los discos y las imágenes de los contenedores- permanecen en tu infraestructura. Las snapshots se eliminan.
5. Datadog utiliza el SBOM para identificar vulnerabilidades conocidas en tus recursos.

Esta arquitectura proporciona:
- **Privacidad de los datos**: el contenido de tus discos, imágenes de contenedores y datos confidenciales permanecen dentro de tu cuenta en la nube. Solo los metadatos del paquete (el SBOM) se transmiten a Datadog.
- **Residencia de datos**: ningún dato cruza los límites de una cuenta para entrar en la infraestructura de Datadog, lo que simplifica el cumplimiento de los requisitos de soberanía de datos.
- **Cumplimiento**: los auditores pueden verificar que los datos de escaneado permanecen dentro de tu perímetro.

Para más información sobre la privacidad de los datos, consulta [Qué datos se envían a Datadog](#what-data-is-sent-to-datadog).

<div class="alert alert-info">
  <ul>
    <li>El escáner funciona como una máquina virtual independiente dentro de tu infraestructura, lo que garantiza un impacto mínimo en los sistemas y recursos existentes.</li>
    <li>Para AWS, las instancias del escáner se escalan automáticamente en función de la carga de trabajo. Cuando no hay recursos que escanear, los escáneres se escalan a cero para minimizar los costes del proveedor de la nube.</li>
    <li>El escáner recopila de forma segura una lista de paquetes de tus hosts sin transmitir ninguna información personal confidencial o privada fuera de tu infraestructura.</li>
    <li>El escáner limita su uso de la API del proveedor de la nube para evitar alcanzar cualquier límite de velocidad, y utiliza un backoff exponencial si es necesario.</li>
    <li>Las instancias del escáner se rotan automáticamente cada 24 horas, lo que garantiza que ejecutan las imágenes más recientes.</li>
  </ul>
</div>

## Datos que se envían a Datadog

En lugar de copiar instantáneas de disco fuera de tu entorno para su análisis, para mantener la privacidad de tus datos, Datadog despliega una infraestructura de análisis ligera **dentro de tu cuenta en la nube**. Agentless Scanning crea snapshots de tus recursos y las analiza localmente, eliminando las snapshots una vez finalizados los análisis. Solo envía a Datadog la lista de materiales de software (SBOM) resultante, que contiene una lista de paquetes y dependencias. Los datos en bruto, el contenido de los discos y las imágenes de los contenedores nunca salen de tu entorno.

El analizador Agentless utiliza el formato OWASP [cycloneDX][3] para transmitir una lista de paquetes a Datadog. Nunca se transmite información personal confidencial o privada fuera de tu infraestructura.

Datadog **no** envía:
- Configuraciones de sistemas y paquetes 
- Claves de cifrado y certificados
- Logs y registros de auditoría
- Datos empresariales sensibles

## Coste del proveedor de servicio en la nube

Dado que Agentless Scanning se ejecuta dentro de tu cuenta en la nube, los costes informáticos y de red aparecen en la factura de tu proveedor de servicios en la nube. Mientras que los proveedores que escanean en su propia infraestructura incluyen los costes de computación en sus tarifas SaaS, mantener los datos en tu entorno significa que ves el coste de la infraestructura directamente.

Para reducir costes:
- Despliega un escáner en cada región donde tengas más de 150 hosts. Un escáner regional evita la transferencia de datos entre regiones, lo que resulta más rentable que escanear esos hosts desde una región remota.
- Utiliza la [configuración recomendada][13] con Terraform para desplegar un escáner por región.
- Para grandes despliegues multiregionales, consulta [Despliegue de Agentless Scanning][16] para obtener orientación sobre la elección de una topología de despliegue.

## Restringir el acceso al escáner

Las instancias de escáner requieren [permisos][4] para crear y copiar instantáneas y describir volúmenes. Datadog recomienda seguir las siguientes directrices para mantener la seguridad de los escáneres:

- Restringe el acceso a las instancias de escáner a los usuarios administrativos.
- Configura los permisos del escáner para que sigan el principio de mínimos privilegios, limitados al mínimo necesario para el escaneado.
- Cifra toda la transmisión de datos entre el escáner y Datadog con HTTPS.
- Activa las actualizaciones de seguridad desatendidas y rota las instancias automáticamente cada 24 horas.
- No permitas el acceso entrante a las instancias de escáner (grupo de seguridad restringido).

## Análisis del almacenamiento en la nube

Puedes activar [Sensitive Data Scanner][8] para tus recursos de Agentless Scanning durante el despliegue o después de la configuración. Sensitive Data Scanner cataloga y clasifica los datos confidenciales de tu almacenamiento en la nube (como los buckets de Amazon S3). Solo lee los almacenes de datos y sus archivos en tu entorno, sin enviar ningún dato confidencial a Datadog.

## On-demand scanning

Por defecto, Agentless Scanning analiza automáticamente los recursos cada 12 horas. En AWS, también puedes activar un análisis inmediato de un recurso específico (host, contenedor, función de Lambda o bucket de S3) mediante la API de escaneo bajo demanda. Para obtener más información, consulta la documentación [On-Demand Scanning API][14].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_security_management/setup/agentless_scanning#setup
[2]: /es/remote_configuration
[3]: https://cyclonedx.org/
[4]: /es/security/cloud_security_management/setup/agentless_scanning/enable#prerequisites
[5]: https://app.datadoghq.com/security/csm/vm
[6]: #terraform
[7]: mailto:success@datadoghq.com
[8]: /es/security/sensitive_data_scanner
[9]: /es/security/cloud_security_management
[10]: /es/remote_configuration
[11]: /es/security/sensitive_data_scanner/scanning_rules/library_rules/
[13]: /es/security/cloud_security_management/setup/agentless_scanning/deployment_methods#recommended-configuration
[14]: /es/api/latest/agentless-scanning/#create-aws-on-demand-task
[15]: /es/security/cloud_security_management/guide/resource_evaluation_filters
[16]: /es/security/cloud_security_management/setup/agentless_scanning/deployment_methods