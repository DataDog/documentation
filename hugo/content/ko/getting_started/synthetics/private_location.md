---
further_reading:
- link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog/
  tag: 블로그
  text: Datadog에서 신서틱 프라이빗 위치로 모니터링하기
- link: /getting_started/synthetics/api_test
  tag: 설명서
  text: 첫 API 테스트 만들기
- link: /getting_started/synthetics/browser_test
  tag: 설명서
  text: 첫 브라우저 테스트 만들기
- link: /synthetics/private_locations
  tag: 설명서
  text: 프라이빗 위치 자세히 알아보기
title: 프라이빗 위치로 시작하기
---

## 개요

프라이빗 위치를 사용하면 **내부용 애플리케이션의 모니터링**이나, 공용 인터넷에서 액세스할 수 없는 비공개(프라이빗) URL의 모니터링을 할 수 있습니다.

{{< img src="synthetics/private_locations/private_locations_worker_1.png" alt="신서틱(Synthetic) 모니터링에서 프라이빗 위치가 작동하는 방식에 대한 아키텍처 다이어그램" style="width:100%;">}}

프라이빗 위치는 다음에도 사용할 수 있습니다.

- 비즈니스 핵심 영역에 **커스텀 위치를 생성**합니다.
- [CI/CD 파이프라인에서 신서틱 테스트][1]로 새 기능을 프로덕션에 출시하기 전에 **내부 테스팅 환경에서 애플리케이션 성능을 검증**하세요.
- 내부 네트워크의 내외부에서 **애플리케이션 성능을 비교**합니다.

프라이빗 위치란 프라이빗 네트워크 내에서 설치할 수 있는 Docker 컨테이너나 Windows 서비스 위치 중 한 곳이 될 수 있습니다. [Google Container Registry][2]에서 docker 이미지를 가져오거나 [Windows 인스톨러][13]를 다운로드하세요.**\***

**참고**: Docker 컨테이너의 프라이빗 위치는 amd64 아키텍처에서만 지원됩니다. arm63 지원과 관련한 질문이 있을 경우에는 [Datadog 고객지원팀][15]에 문의하세요.

**\*** **본 소프트웨어의 사용 및 운영은 [여기][14]**에서 확인할 수 있는 최종 사용자 라이선스 계약의 적용을 받습니다.

프라이빗 위치를 생성하고 설치한 후에는 관리형 위치(Managed location)와 마찬가지로 [신서틱 테스트][3]를 프라이빗 위치에 할당할 수 있습니다.

프라이빗 위치 테스트 결과는 관리형 위치 테스트 결과와 동일하게 표시됩니다.

{{< img src="synthetics/private_locations/test_results_pl.png" alt="프라이빗 위치에 신서틱 테스트 할당" style="width:100%;">}}

## 프라이빗 위치 만들기

1. Datadog 사이트에서 **Digital Experience**에 커서를 올린 다음 **Settings** > [**Private Locations**][5]를 선택합니다. 
2. **Add Private Location**를 클릭합니다.
3. 프라이빗 위치 상세 정보를 입력합니다. `Name`과 `API key` 필드만 필수입니다.
4. **Save Location and Generate Configuration File**을 클릭해 워커의 프라이빗 위치와 연관된 설정 파일을 생성합니다. 
5. 프라이빗 위치를 어디에 설치하느냐에 따라 설정 파일에 추가 파라미터를 입력해야 할 수 있습니다.
    - 프록시를 사용한다면 URL에 `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`를 입력하세요.
    - 예약한 IP를 차단하려면 **Block reserved IPs**를 토글하고 IP 범위를 입력하세요.

    더 많은 정보를 보려면 [프라이빗 위치 구성 옵션][6] 및 [프라이빗 위치에서 신서틱 테스트 실행][7]을 확인하세요.

6. 프라이빗 위치 설정 파일을 작업 디렉터리에 복사해 붙여넣습니다.

   **참조**: 설정 파일에는 개인 위치 인증, 테스트 설정 복호화, 테스트 결과 암호화 등의 비밀 정보가 포함되어 있습니다. Datadog는 비밀 정보를 저장하지 않으므로, **프라이빗 위치** 생성 양식을 닫기 전에 해당 정보를 로컬로 저장해주세요. **프라이빗 위치에 워커를 추가하려면 이 비밀 정보를 다시 확인할 수 있어야 합니다.**
7. 준비가 되었다면 **View Installation Instructions**를 클릭합니다.
8. 프라이빗 위치 워커를 실행 중인 환경을 바탕으로 설치 안내를 따라주세요.
9. Docker를 사용 중이라면 Docker `run` 명령어와 설정 파일을 활용하여 Docker를 독립형 컨테이너로 시작하세요.

    ```shell
    docker run --rm -v $PWD/worker-config-<LOCATION_ID>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker
    ```

    이 명령을 사용하면 Docker 컨테이너를 시작하고 프라이빗 위치에서 테스트를 실행할 준비를 합니다. Datadog에서는 적절한 재시작 정책을 사용해 분리 모드로 컨테이너를 실행하기를 권고합니다.

    <div class="alert alert-info">Podman과 같은 또 다른 컨테이너 런타임을 사용할 수 있습니다. 더 많은 정보를 보려면 <a href="https://docs.datadoghq.com/synthetics/private_locations/?tab=podman#install-your-private-location">프라이빗 위치 설명서</a>를 참고하세요.</div>

    Windows를 사용할 경우 [GUI로 신서틱 프라이빗 위치 인스톨러를 실행][12]하거나 인스톨러를 다운로드 받은 디렉터리 내 명령줄에서 `msiexec` 명령을 실행합니다.

    ```shell
    msiexec /i datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi
    ```

10. 프라이빗 위치에서 Datadog로 정확하게 보고한다면 건전성 상태가 **Private Location Status** 및 **Settings** 페이지의 **Private Locations** 에서 `OK`로 표시됩니다.

    {{< img src="synthetics/private_locations/pl_health.png" alt="프라이빗 위치 건전성" style="width:100%;">}}

    또, 프라이빗 위치 로그를 터미널에서 확인할 수 있습니다.

    ```text
    2022-02-28 16:20:03 [info]: Fetching 10 messages from queue - 10 slots available
    2022-02-28 16:20:03 [info]: Fetching 10 messages from queue - 10 slots available
    2022-02-28 16:20:04 [info]: Fetching 10 messages from queue - 10 slots available
    ```
11. 내부 엔드포인트 테스트를 완료했다면 **OK**를 클릭하세요.

## 프라이빗 위치에서 신서틱 테스트 실행하기

관리형 위치와 마찬가지로, 신서틱 테스트에서 새 프라이빗 위치를 사용할 수 있습니다.

1. 모니터링하고자 하는 내부 엔드포인트나 애플리케이션에서 [API 테스트][2], [멀티스텝 API 테스트][8], 또는 [브라우저 테스트][9]를 생성하세요.
2. **Private Locations**에서 새 프라이빗 위치를 선택합니다.

    {{< img src="synthetics/private_locations/assign-test-pl-2.png" alt="프라이빗 위치에 신서틱 테스트 할당" style="width:100%;">}}

3. 계속 테스트 상세 정보를 입력하시면 됩니다!

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}



[1]: /ko/continuous_testing/cicd_integrations
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker?pli=1
[3]: /ko/getting_started/synthetics/
[4]: https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce
[5]: https://app.datadoghq.com/synthetics/settings/private-locations
[6]: /ko/synthetics/private_locations/configuration/#configuration-options
[7]: /ko/synthetics/private_locations/?tab=docker#blocking-reserved-ips
[8]: /ko/getting_started/synthetics/api_test#create-a-multistep-api-test
[9]: /ko/getting_started/synthetics/browser_test
[10]: https://podman.io/
[11]: https://app.vagrantup.com/ubuntu/boxes/jammy64
[12]: /ko/synthetics/private_locations?tab=windows#install-your-private-location
[13]: https://ddsynthetics-windows.s3.amazonaws.com/datadog-synthetics-worker-{{< synthetics-worker-version "synthetics-windows-pl" >}}.amd64.msi
[14]: https://www.datadoghq.com/legal/eula/
[15]: https://www.datadoghq.com/support/