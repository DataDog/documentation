---
disable_toc: false
further_reading:
- link: agent/basic_agent_usage/
  tag: Documentación
  text: Uso básico del Agent
title: Plataformas compatibles
---

El Datadog Agent es compatible con una amplia gama de sistemas operativos y plataformas. Si tu sistema operativo no aparece en la lista, podría servirte [una instalación de origen][1].

{{< tabs >}}
{{% tab "Linux" %}}

## X86 de 64 bits

<table>
  <thead>
    <th>Sistema operativo</th>
    <th>Versiones del SO</th>
    <th>Versiones del Agent 5</th>
    <th>Versiones del Agent 6</th>
    <th>Versiones del Agent 7</th>
  </thead>
  <tr>
    <th rowspan='3'><a href='/agent/basic_agent_usage/amazonlinux/'>Amazon Linux</a></th>
    <td>2</td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
  <tr>
    <td>2022</td>
    <td></td>
    <td>>= 6.40.0</td>
    <td>>= 7.40.0</td>
  </tr>
  <tr>
    <td>2023</td>
    <td></td>
    <td>>= 6.40.0</td>
    <td>>= 7.40.0</td>
  </tr>
  <tr>
    <th rowspan='2'><a href='/agent/basic_agent_usage/deb/'>Debian</a> (systemd)</th>
    <td>7.0 (wheezy)</td>
    <td><i class='icon-check-bold'></td>
    <td><= 6.35.2</td>
    <td><= 7.35.2</td>
  </tr>
  <tr>
    <td>>= 8.0 (jessie)</td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
  <tr>
    <th rowspan='2'>Debian (SysVinit)</th>
    <td>7.0 (wheezy)</td>
    <td></td>
    <td>6.6.0 - 6.35.2</td>
    <td><= 7.35.2</td>
  </tr>
  <tr>
    <td>>= 8.0 (jessie)</td>
    <td></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
  <tr>
    <th rowspan='2'><a href='/agent/basic_agent_usage/ubuntu/'>Ubuntu</a></th>
    <td>12.04</td>
    <td><i class='icon-check-bold'></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>>= 14.04</td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
  <tr>
    <th rowspan='3'><a href='/agent/basic_agent_usage/redhat/'>RedHat /<br>CentOS<br></a></th>
    <td>5.0</td>
    <td><i class='icon-check-bold'></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>>= 6.0</td>
    <td><i class='icon-check-bold'></td>
    <td><= 6.51.1</td>
    <td><= 7.51.1</td>
  </tr>
  <tr>
    <td>>= 7.0</td>
    <td></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/redhat/'>AlmaLinux /<br>Rocky</a></th>
    <td>>= 8.0</td>
    <td></td>
    <td>>= 6.33.0</td>
    <td>>= 7.33.0</td>
  </tr>
  <tr>
    <th rowspan='2'><a href='/agent/basic_agent_usage/suse/'>SUSE Enterprise Linux (systemd)</a></th>
    <td>11 SP4</td>
    <td><i class='icon-check-bold'></td>
    <td><= 6.32.4</td>
    <td><= 7.32.4</td>
  </tr>
  <tr>
    <td>>= 12.0</td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
  <tr>
    <th>SUSE Enterprise Linux (SysVinit)</th>
    <td>11 SP4</td>
    <td></td>
    <td>6.16.0 - 6.33.0</td>
    <td>7.16.0 - 7.33.0</td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/suse/'>OpenSUSE (systemd)</a></th>
    <td>>= 15.0</td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/fedora/'>Fedora</a></th>
    <td>>= 26</td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
  </tr>
</table>

Una marca de verificación ({{< X >}}) indica compatibilidad con todas las versiones secundarias y de parche.

## ARM V8 de 64 bits

<table>
  <thead>
    <th>Sistema operativo</th>
    <th>Versiones del SO</th>
    <th>Versiones del Agent 6</th>
    <th>Versiones del Agent 7</th>
  </thead>
  <tr>
    <th rowspan=3><a href='/agent/basic_agent_usage/amazonlinux/'>Amazon Linux</a></th>
    <td>2</td>
    <td>>= 6.16.0</td>
    <td>>= 7.16.0</td>
  </tr>
  <tr>
    <td>2022</td>
    <td>>= 6.40.0</td>
    <td>>= 7.40.0</td>
  </tr>
  <tr>
    <td>2023</td>
    <td>>= 6.40.0</td>
    <td>>= 7.40.0</td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/deb/'>Debian</a> (systemd)</th>
    <td>>= 9.0 (stretch)</td>
    <td>>= 6.16.0</td>
    <td>>= 7.16.0</td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/ubuntu/'>Ubuntu</a></th>
    <td>>= 16.04</td>
    <td>>= 6.16.0</td>
    <td>>= 7.16.0</td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/redhat/'>RedHat /<br>CentOS<br></a></th>
    <td>>= 8.0</td>
    <td>>= 6.16.0</td>
    <td>>= 7.16.0</td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/redhat/'>AlmaLinux /<br>Rocky</a></th>
    <td>>= 8.0</td>
    <td>>= 6.33.0</td>
    <td>>= 7.33.0</td>
  </tr>
  <tr>
    <th><a href='/agent/basic_agent_usage/fedora/'>Fedora</a></th>
    <td>>= 27</td>
    <td>>= 6.16.0</td>
    <td>>= 7.16.0</td>
  </tr>
</table>

[1]: /es/agent/basic_agent_usage/amazonlinux/
[2]: /es/agent/basic_agent_usage/deb/
[3]: /es/agent/basic_agent_usage/ubuntu/
[4]: /es/agent/basic_agent_usage/redhat/
[7]: /es/agent/basic_agent_usage/fedora/

{{% /tab %}}
{{% tab "Windows" %}}

<table>
  <thead>
    <th>Sistema operativo</th>
    <th>Versiones del SO</th>
    <th>Versiones del Agent 5</th>
    <th>Versiones del Agent 6</th>
    <th>Versiones del Agent 7</th>
    <th>Notas</th>
  </thead>
  <tr>
    <th rowspan=3><a href='/agent/basic_agent_usage/windows/'>Windows Server</a></th>
    <td>2008 R2</td>
    <td><i class='icon-check-bold'></td>
    <td><= 6.45.1</td>
    <td><= 7.45.1</td>
    <td>Server 2008 R2 se ve afectado por un <a href="https://github.com/golang/go/issues/24489">problema conocido con la deriva de reloj y Go</a>.</td>
  </tr>
  <tr>
    <td>2012/R2</td>
    <td></td>
    <td><= 6.46.0</td>
    <td><= 7.46.0</td>
    <td></td>
  </tr>
  <tr>
    <td>>= 2016</td>
    <td></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td></td>
  </tr>
  <tr>
    <td rowspan=3>Windows</td>
    <td>7</td>
    <td><i class='icon-check-bold'></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>8.1</td>
    <td></td>
    <td><= 6.46.0</td>
    <td><= 7.46.0</td>
    <td></td>
  </tr>
  <tr>
    <td>>=10</td>
    <td></td>
    <td><i class='icon-check-bold'></td>
    <td><i class='icon-check-bold'></td>
    <td></td>
  </tr>
</table>

Una marca de verificación ({{< X >}}) indica compatibilidad con todas las versiones secundarias y de parche.

Para instalar una versión específica del Windows Agent, consulta la [lista de instaladores][8].

[8]: https://ddagent-windows-stable.s3.amazonaws.com/installers_v2.json

{{% /tab %}}
{{% tab "macOS" %}}

## X86 de 64 bits

| Versión de macOS | Agent 5 | Agent 6 | Agent 7 |
|---------------|---------|---------|---------|
| 10.10 - 10.11 | <= 5.11.3 |||
| 10.12 || <= 6.34.0 | <= 7.34.0 |
| 10.13 || <= 6.38.2 | <= 7.38.2 |
| >= 10.14 ||           | >= 7.39.0 |

## ARM64 de Apple

| Versión de macOS  | Agent 7 |
|----------------|---------|
| >= 11.0 | >= 7.39.0 |

{{% /tab %}}

{{% tab "Nube y contenedores" %}}

## Compatible con X86 de 64 bits

| Agent | [Docker][5] | [Kubernetes][6] | [Azure Stack HCI OS][7]  |
|-------|-------------|-----------------|--------------------------|
| 5 | >= 1.14 | 1.3 - 1.8 ||
| 6 | >= 1.14 | >= 1.3 | Todas las versiones |
| 7 | >= 1.14 | >= 1.3 | Todas las versiones |


## Compatible con ARM V8 de 64 bits

Las versiones 6 y 7 del Agent son compatibles con las siguientes plataformas ARM V8 de 64 bits:

| Plataforma    | Versiones compatibles | Compatible con ARM V8 de 64 bits | Compatible con X86 de 64 bits |
|-------------|--------------------|-----------------------|--------------------|
| [Docker][5] | >= 1.14     | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| [Kubernetes][6] | >= 1.3   | <i class='icon-check-bold'> | <i class='icon-check-bold'> |


[5]: /es/agent/docker/
[6]: /es/agent/basic_agent_usage/kubernetes/
[7]: /es/agent/basic_agent_usage/windows/

{{% /tab %}}

{{% tab "Unix" %}}

Las versiones 6 y 7 del Agent son compatibles con las siguientes versiones de [AIX][1]:

- 6.1 TL9 SP6
- 7.1 TL5 SP3
- 7.2 TL3 SP0


[1]: /es/agent/basic_agent_usage/aix/
{{% /tab %}}
{{< /tabs >}}

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/basic_agent_usage/source/