---
aliases:
- /ko/integrations/faq/how-to-retrieve-wmi-metrics
title: WMI\u0008 메트릭 검색하기
---

## WMI는 무엇인가요?

Windows 세계에서는 Windows Management Instrumentation을 사용하여 운영 체제와 애플리케이션 메트릭이 노출됩니다. Windows용 Datadog Agent는 기본적으로 WMI 통합과 함께 제공되므로 중요한 정보를 모니터링할 수 있습니다.

WMI의 데이터는 클래스로 그룹화됩니다. 기본적으로 수백 가지 클래스가 제공되며 각 추가 역할과 기능은 고유한 특성을 갖습니다. 일부 애플리케이션은 다양한 타사 앱과 함께 Microsoft SQL Server, Microsoft Exchange와 같은 클래스를 추가할 수도 있습니다.

Microsoft Powershell은 프로그래밍 방식으로 Windows 시스템과 상호 작용하는 표준 방법이며 WMI를 관리하는 도구와 함께 제공됩니다.

컴퓨터에서 사용 가능한 모든 클래스를 나열하려면 다음을 실행하세요.

```text
PS C:\> Get-WmiObject -List

NameSpace: ROOT\cimv2

Name Methods Properties
---- ------- ----------
__SystemClass {} {}
__thisNAMESPACE {} {SECURITY_DESCRIPTOR}
__Provider {} {Name}
__Win32Provider {} {ClientLoadableCLSID, CLSID, Concurrency, DefaultMachineNam...
__IndicationRelated {} {}

[...]
```

사용 가능한 클래스 수를 계산하려면 다음을 실행하세요.

```text
PS C:\> (Get-WmiObject -List).count
931
```

`where` 문을 사용하여 특정 주제에 대한 클래스를 찾을 수 있습니다. 프로세스 정보를 가진 클래스를 표시하려면 다음을 실행하세요.

```text
PS C:\> Get-WmiObject -List | where {$_.name -match "process"} | select Name

Name
----
Win32_ProcessTrace
Win32_ProcessStartTrace
Win32_ProcessStopTrace
CIM_Process
Win32_Process
CIM_Processor
Win32_Processor
Win32_PerfFormattedData_PerfOS_Processor
Win32_PerfFormattedData_PerfProc_Process
[...]
```

클래스에 의해 노출된 데이터를 찾아보려면 [WQL][1]이라는 SQL과 유사한 구문을 사용할 수 있습니다.

많은 성능 관련 메트릭은 PerfMon 도구에 의해 보고되며 `Win32_PerfFormattedData_`라고 합니다. 이 예에서 프로세스 정보를 확인하여 `Win32_PerfFormattedData_PerfProc_Process` 클래스를 쿼리할 수 있습니다.

```text
PS C:\> Get-WmiObject -Query "select * from Win32_PerfFormattedData_PerfProc_Process where Name = 'Powershell'"

__GENUS                 : 2
__CLASS                 : Win32_PerfFormattedData_PerfProc_Process
__SUPERCLASS            : Win32_PerfFormattedData
__DYNASTY               : CIM_StatisticalInformation
__RELPATH               : Win32_PerfFormattedData_PerfProc_Process.Name="powershell"
__PROPERTY_COUNT        : 36
__DERIVATION            : {Win32_PerfFormattedData, Win32_Perf, CIM_StatisticalInformation}
__SERVER                : DATADOG-9A675BB
__NAMESPACE             : root\cimv2
__PATH                  : \\DATADOG-9A675BB\root\cimv2:Win32_PerfFormattedData_PerfProc_Process.Name="powershell"
Caption                 :
CreatingProcessID       : 2560
Description             :
ElapsedTime             : 3333
Frequency_Object        :
Frequency_PerfTime      :
Frequency_Sys100NS      :
HandleCount             : 655
IDProcess               : 4024
IODataBytesPersec       : 0
IODataOperationsPersec  : 0
IOOtherBytesPersec      : 0
IOOtherOperationsPersec : 0
IOReadBytesPersec       : 0
IOReadOperationsPersec  : 0
IOWriteBytesPersec      : 0
IOWriteOperationsPersec : 0
Name                    : powershell
PageFaultsPersec        : 0
PageFileBytes           : 39415808
PageFileBytesPeak       : 43970560
PercentPrivilegedTime   : 0
PercentProcessorTime    : 0
PercentUserTime         : 0
PoolNonpagedBytes       : 7132
PoolPagedBytes          : 206292
PriorityBase            : 8
PrivateBytes            : 39415808
ThreadCount             : 7
Timestamp_Object        :
Timestamp_PerfTime      :
Timestamp_Sys100NS      :
VirtualBytes            : 162775040
VirtualBytesPeak        : 170778624
WorkingSet              : 41054208
WorkingSetPeak          : 45273088
```

이 명령은 Powershell 프로세스에 대한 세부 정보를 반환합니다. 여기에는 메모리 사용량 및 I/O 작업을 포함한 많은 정보가 포함됩니다.

자신의 컴퓨터에서 타사 애플리케이션을 실행할 수 있는 사용자의 경우 WMI Explorer 도구는 WMI에서 노출된 정보를 탐색하는 데 적합합니다. https://www.ks-soft.net/hostmon.eng/wmi/에서 다운로드할 수 있습니다. 자체 포함된 .exe 파일이므로 설치할 필요가 없으며 바이러스가 없습니다https://www.virustotal.com/en/file/df8e909491da38556a6c9a50abf42b3b906127e0d4b35d0198ef491139d1622c/analysis/.

## Datadog에서 WMI 활용하기

WMI의 작동 방식을 이해한 후에 데이터를 Datadog으로 가져올 수 있습니다. Datadog Agent Manager를 열고 왼쪽 패널에서 WMI Check 통합을 클릭합니다.

간단한 예부터 시작해 보세요: 머신의 프로세스 수 모니터링

```yaml
init_config:

# 각 WMI 쿼리에는 `class`와 `metrics`라는 2가지 필수 옵션이 있습니다.
# `class`는 WMI 클래스 이름입니다 (예: Win32_OperatingSystem).
# `metrics`는 캡처하려는 메트릭 목록이며, 목록의 각 항목은
# [WMI 속성 이름, 메트릭 이름 및 메트릭 유형]의 집합입니다.

instances:

  # 프로세스 수를 가져옵니다
  - class: Win32_OperatingSystem
    metrics:
      - [NumberOfProcesses, system.proc.count, gauge]
```

설정을 저장하고 통합을 활성화한 후 다시 시작한 다음 'Logs and Status -> Agent Status'로 이동합니다. 'Checks' 섹션에 다음이 표시됩니다.

```text
wmi_check Instance #0 OK Collected 1 metrics, 0 events and 1 service check
```

이전에 살펴본 Windows Powershell 프로세스를 모니터링합니다.

```yaml
init_config:

#   실행 중인 단일 애플리케이션에 대한 메트릭을 가져옵니다
instances:
  - class: Win32_PerfFormattedData_PerfProc_Process
    metrics:
      - [ThreadCount, powershell.threads.count, gauge]
      - [VirtualBytes, powershell.mem.virtual, gauge]

  # `filters`는 원하는 WMI 쿼리에 대한 필터 목록입니다. 예를 들어,
  # 프로세스 기반 WMI 클래스의 경우 컴퓨터에서 실행 중인 특정
  # 프로세스에 대해서만 메트릭을 원할 수 있으므로 각 프로세스 이름에 대한 
  # 필터를 추가할 수 있습니다.  아래 예시를 참조하세요.
    filters:
      - Name: powershell
```

Metrics Explorer에는 powershell.threads.count 및 powershell.mem.virtual이라는 2개의 메트릭이 있어야 합니다. 하지만 2개의 Powershell 콘솔이 열려 있으면 어떻게 될까요? 'Checks 섹션'에서 다음 오류를 찾을 수 있습니다.

```text
wmi_check
  Instance #0
    ERROR
  Error
    Exception("WMI query returned multiple rows but no `tag_by` value was given. metrics=[['ThreadCount',
    'powershell.threads.count', 'gauge'], ['VirtualBytes', 'powershell.mem.virtual', 'gauge']]",)
  Collected 0 metrics, 0 events and 1 service check
```

이는  Agent가 이름과 태그 세트가 동일한 2개의 서로 다른 메트릭에 대해 보고할 수 없기 때문입니다. 둘을 구별하려면 `tag_by: Instance_Property_Name statement`를 사용하여 인스턴스 속성 값을 추가 태그로 사용하면 됩니다.

```yaml
init_config:

instances:

#   실행 중인 애플리케이션의 각 인스턴스에 대한 메트릭을 가져옵니다
  - class: Win32_PerfFormattedData_PerfProc_Process
    metrics:
      - [ThreadCount, powershell.threads.count, gauge]
      - [VirtualBytes, powershell.mem.virtual, gauge]
    filters:
      - Name: powershell
# `tag_by`는 선택 사항이며 사용 중인 WMI 클래스의 속성으로
# 각 메트릭에 태그를 지정할 수 있습니다. 이것은 WMI 쿼리에
# 여러 값이 있는 경우에만 유용합니다. 다음 예제에서는 프로세스 메트릭을
# 프로세스 이름("name:app_name"이라는 태그 지정)으로 태그하는 방법을 보여줍니다.
    tag_by: Name
# 프로세스 이름에는`#XYZ`가 추가되고 `XYZ`는 증분 숫자이므로 다음은 Window> = 2008에서 작동합니다.
# Windows 2003에서 실행하는 경우 `tag_by: IDProcess`와 같은 다른 고유한 값을 사용하세요.
```

열린 Powershell 콘솔당 2개의 메트릭을 제공합니다.

```text
wmi_check
  Instance #0
    OK
  Collected 4 metrics, 0 events and 1 service check
```

태그로 사용하려는 정보가 데이터를 가져오는 클래스의 일부가 아닌 경우 tag_queries 목록을 사용하여 다른 테이블의 데이터를 연결할 수 있습니다.

Win32_PerfFormattedData_PerfProc_Process의 PoolNonPagedBytes에 대해 보고하고 Win32_Process의 CreationDate를 태그로 추가한다고 가정해 보겠습니다. 이 두 클래스는 IDProcess inWin32_PerfFormattedData_PerfProc_Process 및 Handle in Win32_Process라는 서로 다른 이름으로 PID를 노출합니다. 따라서 전자는 링크 소스 속성이고 후자는 대상 속성입니다.

```yaml
# `tag_queries`는 선택 사항이며 타겟 클래스 속성으로 메트릭에
# 태그를 지정할 쿼리 목록을 지정할 수 있습니다. 목록의 각 항목은
# [link source property, target class, link target class property, target property]의 집합입니다.
# 여기에서:
#
# - 'link source property'에는 링크 값이 포함됩니다.
# - 'target class'는 링크할 클래스입니다.
# - 'link target class property'는 연결할 대상 클래스 속성입니다.
# - 'target property'에는 태그를 지정할 값이 포함됩니다.
#
# WMI 쿼리로 변환됩니다.
# SELECT 'target property' FROM 'target class'
#                 WHERE 'link target class property' = 'link source property'
#
# 참고: 이렇게 설정하면 tag_by 값에서 모든 인스턴스 번호가 제거됩니다.
# 예: name:process#1 => name:process

init_config:

instances:

#   실행 중인 단일 애플리케이션에 대한 메트릭을 가져옵니다 
  - class: Win32_PerfFormattedData_PerfProc_Process
    metrics:
      - [ThreadCount, powershell.threads.count, gauge]
      - [VirtualBytes, powershell.mem.virtual, gauge]
    filters:
      - Name: powershell
    tag_by: Name

    tag_queries:
      - [IDProcess, Win32_Process, Handle, CreationDate]
```

[1]: https://msdn.microsoft.com/en-us/library/aa392902