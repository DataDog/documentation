---
description: 내부 애플리케이션 및 프라이빗 URL을 모니터링하도록 프라이빗 위치를 설정하세요. 미션 크리티컬 영역 및 내부 테스트 환경을
  위한 사용자 지정 위치를 만듭니다.
further_reading:
- link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog/
  tag: 블로그
  text: Datadog을 사용하여 Synthetic 프라이빗 위치 모니터링하기
- link: /synthetics/private_locations
  tag: 문서
  text: 프라이빗 위치 알아보기
- link: /synthetics/guide/kerberos-authentication/
  tag: 가이드
  text: Synthetic Monitoring을 위한 Kerberos 인증
title: 프라이빗 위치로 시작하기
---
## 개요 {#overview}

프라이빗 위치를 사용하면 **내부용 애플리케이션을 모니터링**하거나 공용 인터넷에서 액세스할 수 없는 프라이빗 URL을 모니터링할 수 있습니다. 

{{< img src="synthetics/private_locations/private_locations_worker_1.png" alt="Synthetic Monitoring에서 프라이빗 위치가 작동하는 방식을 나타내는 아키텍처 다이어그램" style="width:100%;">}}

프라이빗 위치를 사용하여 다음 작업을 수행할 수도 있습니다.

비즈니스의 미션 크리티컬 영역에 - **사용자 지정 위치 만들기**
[CI/CD 파이프라인의 Synthetic 테스트][1]를 통해 새 기능을 프로덕션에 릴리스하기 전에 - **내부 테스트 환경에서 애플리케이션 성능을 확인**합니다.
내부 네트워크 안팎에서 - **애플리케이션 성능을 비교**합니다.
내부 Windows 기반 사이트 및 API에 대해 - **[Kerberos SSO를 사용하여 Synthetic Monitoring 테스트를 인증][16]**합니다.

프라이빗 위치는 프라이빗 네트워크 내 어디에나 설치할 수 있는 Docker 컨테이너 또는 Windows 서비스입니다. [Docker Hub][2]에서 Docker 이미지를 가져오거나 [Windows 설치 프로그램][13]을 다운로드하세요.**\*** 

**참고**: Docker 컨테이너의 프라이빗 위치는 amd64 아키텍처에서만 지원됩니다. arm64 지원에 대해 궁금한 점이 있으면 [Datadog 지원팀][15]에 문의하세요.

**\*** **본 소프트웨어의 사용 및 운영은 [여기][14]에서 확인할 수 있는 최종 사용자 라이선스 계약의 적용을 받습니다.**

프라이빗 위치를 생성하고 설치한 후에는 관리형 위치와 마찬가지로 [Synthetic 테스트][3]를 프라이빗 위치에 할당할 수 있습니다. 

프라이빗 위치 테스트 결과는 관리형 위치 테스트 결과와 동일하게 표시됩니다. 

{{< img src="synthetics/private_locations/test_results_pl.png" alt="프라이빗 위치에 Synthetic 테스트 할당" style="width:100%;">}}

## 프라이빗 위치 만들기 {#create-your-private-location}

1. Datadog 사이트에서 {{< ui >}}Digital Experience{{< /ui >}} 위에 마우스를 올리고 {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Private Locations{{< /ui >}}][5]를 선택합니다. 
2. {{< ui >}}Add Private Location{{< /ui >}}을 클릭합니다.
3. 프라이빗 위치 세부 정보를 입력합니다. {{< ui >}}Name{{< /ui >}} 및 {{< ui >}}API key{{< /ui >}} 필드만 필수입니다.
4. Worker에서 사용할 프라이빗 위치의 구성 파일을 생성하려면 {{< ui >}}Save Location and Generate Configuration File{{< /ui >}}를 클릭합니다. 
5. 프라이빗 위치를 설치한 위치에 따라 구성 파일에 추가 파라미터를 입력해야 할 수 있습니다. 
    - 프록시를 사용하는 경우 URL을 `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`로 입력합니다. 
    - {{< ui >}}Block reserved IPs{{< /ui >}}는 기본적으로 켜져 있으며, 이는 프라이빗 위치의 예약된 IP에 대한 액세스를 제한합니다. 특정 엔드포인트에 대한 액세스를 허용하려면 IP 범위 및/또는 도메인 이름을 입력합니다.  

    자세한 내용은 [프라이빗 위치 구성 옵션][6], [프라이빗 위치에서 Synthetic 테스트 실행][7] 및 [프라이빗 위치 네트워크 보안 강화][17]를 참조하세요. 

6. 프라이빗 위치 구성 파일을 작업 디렉터리에 복사하여 붙여넣습니다.

    **참고**: 구성 파일에는 프라이빗 위치 인증, 테스트 구성 복호화 및 테스트 결과 암호화에 사용되는 시크릿이 포함되어 있습니다. Datadog은 시크릿을 저장하지 않으므로 {{< ui >}}Private Locations{{< /ui >}} 생성 양식을 종료하기 전에 로컬에 저장하세요. **프라이빗 위치에 Worker를 추가하려면 시크릿을 다시 참조할 수 있어야 합니다**. 
7. 준비가 되면 {{< ui >}}View Installation Instructions{{< /ui >}}를 클릭합니다.
8. 프라이빗 위치 Worker를 실행하려는 환경에 맞는 설치 지침을 따르세요.
9. Docker를 사용하는 경우 Docker `run` 명령과 구성 파일을 사용하여 Worker를 독립형 컨테이너로 실행합니다.

    ```shell
    docker run --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```
    
    This command starts a Docker container and prepares your private location to run tests. Datadog recommends running the container in detached mode with proper restart policy.

    <div class="alert alert-info">Podman과 같은 다른 컨테이너 런타임을 사용할 수 있습니다. 자세한 내용은 <a href="https://docs.datadoghq.com/synthetics/private_locations/?tab=podman#install-your-private-location">프라이빗 위치 설명서</a>를 참조하세요.</div>
    
    If you are using Windows, [run the Synthetics Private Location Installer with a GUI][12] or run the `msiexec` command on the command line inside the directory where you downloaded the installer:

    ```shell
    msiexec /i datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi
    ```

10. 프라이빗 위치가 Datadog에 올바르게 보고되면 `OK` 상태가 {{< ui >}}Private Location Status{{< /ui >}} 아래와 {{< ui >}}Settings{{< /ui >}} 페이지의 {{< ui >}}Private Locations{{< /ui >}} 목록에 표시됩니다.

    {{< img src="synthetics/private_locations/pl_health.png" alt="프라이빗 위치 상태" style="width:100%;">}}

    Additionally, you can see private location logs in your terminal:

    ```text
    2022-02-28 16:20:03 [info]: Fetching 10 messages from queue - 10 slots available
    2022-02-28 16:20:03 [info]: Fetching 10 messages from queue - 10 slots available
    2022-02-28 16:20:04 [info]: Fetching 10 messages from queue - 10 slots available
    ```
11. 내부 엔드포인트 테스트를 완료했으면 {{< ui >}}OK{{< /ui >}}를 클릭하세요.

## 프라이빗 위치로 Synthetic 테스트 실행 {#run-synthetic-tests-with-your-private-location}

Synthetic 테스트에서 새 프라이빗 위치를 관리형 위치와 동일하게 사용하세요.

1. 모니터링하려는 내부 엔드포인트나 애플리케이션을 대상으로 [API 테스트][2], [다단계 API 테스트][8] 또는 [브라우저 테스트][9]를 생성합니다.
2. {{< ui >}}Private Locations{{< /ui >}}에서 새 프라이빗 위치를 선택합니다.

    {{< img src="synthetics/private_locations/assign-test-pl_3.png" alt="프라이빗 위치에 Synthetic 테스트를 할당합니다." style="width:100%;">}}

3. 테스트 작성을 계속 진행하세요!

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}



[1]: /ko/continuous_testing/cicd_integrations
[2]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[3]: /ko/getting_started/synthetics/
[4]: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce
[5]: https://app.datadoghq.com/synthetics/settings/private-locations
[6]: /ko/synthetics/platform/private_locations/configuration/#all-configuration-options
[7]: /ko/synthetics/private_locations/?tab=docker#blocking-reserved-ips
[8]: /ko/getting_started/synthetics/api_test#create-a-multistep-api-test
[9]: /ko/getting_started/synthetics/browser_test
[10]: https://podman.io/
[11]: https://app.vagrantup.com/ubuntu/boxes/jammy64
[12]: /ko/synthetics/private_locations?tab=windows#install-your-private-location
[13]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi
[14]: https://www.datadoghq.com/legal/eula/
[15]: https://www.datadoghq.com/support/
[16]: /ko/synthetics/guide/kerberos-authentication/
[17]: /ko/synthetics/platform/private_locations/network_security/