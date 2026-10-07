---
aliases:
- /ko/integrations/faq/how-to-add-event-log-files-to-the-win32-ntlogevent-wmi-class
title: Win32_NTLogEvent WMI 클래스에 이벤트 로그 파일 추가
---

일부 이벤트 로그만 Win32_NTLogEvent WMI 클래스에 포함됩니다. 이벤트 뷰어 통합은 이러한 클래스의 이벤트만을 수집할 수 있으므로 윈도우즈(Windows) 레지스트리를 수정하여 이 클래스 범위 외의 이벤트 로그를 추가합니다.

첫 번째 단계는 Powershell에서 다음 WMI 쿼리(이러한 이벤트를 수집하기 위해 에이전트가 실행하는 동일한 쿼리)를 사용해 Win32_NTLogEvent를 통해 로그 파일에 액세스할 수 있는지를 확인하는 것입니다.

```text
$ Get-WmiObject -Query "Select EventCode,SourceName,TimeGenerated,Type,InsertionStrings,Message,Logfile from Win32_NTLogEvent WHERE ( LogFile = '<LogFileName>' )" | select -First 1
```

결과가 없는 경우 로그 파일에 액세스할 수 없으며 윈도우즈(Windows) 레지스트리를 통해 추가해야 합니다.

이벤트 뷰어에서 모니터링하려는 이벤트 로그를 찾습니다. 로그 파일을 찾은 다음 "작업" 섹션에서 "속성"을 클릭하여 로그 경로와 전체 이름을 찾습니다. 예를 들어 Microsoft/Windows/TaskScheduler 폴더에 위치한 "운영" 이벤트 로그 파일 모니터링을 설정하는 방법입니다. {{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_1.png" alt="File이라는 이름의 선택된 파일과 문자열 편집 옵션을 표시하는 Windows 이벤트 뷰어. 값 데이터: 필드가 강조 표시되고 로그 경로가 표시됩니다." >}}

윈도우즈(Windows) 레지스트리를 엽니다(레지스트리 편집기의 기본 이름인 regedit.exe를 검색하세요.). 레지스트리 편집기 내에서 다음 경로에 있는 EventLog 폴더를 찾습니다.

```text
\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\EventLog\
```

모니터링하려는 이벤트 로그 이름으로 새 키를 생성합니다. path-to-folder/LogFileName(이벤트 뷰어에 있는 전체 이름과 동일) 구문을 사용합니다.
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_2.png" alt="EventLog 폴더를 확장하고 마우스 오른쪽 버튼을 클릭하면 하위 메뉴가 표시됩니다. 하위 메뉴에서 새 항목(New)을 선택하면 새 하위 메뉴가 열립니다. 키는 빨간색 상자로 강조 표시됩니다." >}}

{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_3.png" alt="빨간색 상자로 강조 표시된 Microsoft-Windows-TaskScheduler/Operational을 표시하는 확장된 EventLog 폴더" >}}

키를 생성한 후 이 키에 세 개의 값을 추가합니다. 먼저 로그 파일에 "File"이라는 문자열 값(REG_SZ)으로 경로를 추가합니다.
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_4.png" alt="File이라는 이름이 지정된 파일과 문자열 편집 옵션을 표시하는 윈도우즈(Windows) 이벤트 뷰어. 값 데이터: 필드가 강조 표시되고 로그 경로가 표시됩니다." >}}

그런 다음 로그 파일의 전체 이름을 "Primary Module"이라는 문자열 값(REG_SZ)으로 추가합니다.
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_5.png" alt="Primary Module이라는 이름의 선택된 파일과 문자열 편집 옵션을 보여주는 윈도우즈(Windows) 이벤트 뷰어. 값 데이터: 필드가 강조 표시되고 전체 이름이 표시됩니다." >}}

마지막으로 "DisplayNameFile"이라는 이름의 확장 가능한 문자열 값으로 `%SystemRoot%\system32\wevtapi.dll`에 존재해야 하는 윈도우즈(Windows) 이벤트 로그 Api DLL(wevtapi.dll)에 대한 경로를 추가합니다.
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_6.png" alt="DisplayNameFile이라는 이름의 선택된 파일과 문자열 편집 옵션을 보여주는 윈도우즈(Windows) 이벤트 뷰어. 값 데이터: 필드가 강조 표시됩니다." >}}

변경사항은 즉시 적용됩니다. Win32_NTLogEvent WMI 클래스를 통해 이벤트 로그에 액세스할 수 있는지 확인하려면 위 쿼리를 다시 시도하세요. 그런 다음 이벤트 뷰어 통합 구성 파일에 이벤트 추가를 재개할 수 있습니다.

참고: 쿼리를 실행할 때 여전히 이벤트가 없으면 이벤트 뷰어를 확인하여 로그 파일에 이벤트가 있는지 확인하세요. 또한 이벤트 로그가 비활성화되어 있지 않은지, 사용 가능한 최근 이벤트가 있는지 확인하세요.
{{< img src="integrations/guide/windows_event_logs_with_wmi/event_viewer_7.png" alt="오른쪽에 작업 목록을 표시하는 윈도우즈(Windows) 이벤트 뷰어. 여기에서 로그를 활성화하라는 메모와 함께 로그 활성화 작업이 강조 표시되어 있습니다." >}}