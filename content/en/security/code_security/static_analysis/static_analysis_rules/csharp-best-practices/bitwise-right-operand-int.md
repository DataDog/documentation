---
aliases:
- /continuous_integration/static_analysis/rules/csharp-best-practices/bitwise-right-operand-int
- /static_analysis/rules/csharp-best-practices/bitwise-right-operand-int
dependencies: []
disable_edit: true
group_id: csharp-best-practices
meta:
  category: Error Prone
  id: csharp-best-practices/bitwise-right-operand-int
  language: C#
  language_alias: CSharp
  severity: Error
  severity_rank: 1
title: Enforces an int operand on bitwise and shift operations
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `csharp-best-practices/bitwise-right-operand-int`

**Language:** C#

**Severity:** Error

**Category:** Error Prone

## Description
When a variable is marked `dynamic`, the compiler does not validate that the right operand of bitwise or shift operations is valid, which can lead to an unexpected run-time exception. This rule checks that the right operand of bitwise and shift operations is of type `int`, `sbyte`, `byte`, `short`, `ushort`, or `char`.

Input:
```csharp
dynamic dyn = 4;
// The next line causes a run-time exception:
var shifted = dyn << 2.0;
```
Output:
```
Run-time exception (line 6): Operator '<<' cannot be applied to operands of type 'int' and 'double'\

Stack Trace:\

[Microsoft.CSharp.RuntimeBinder.RuntimeBinderException: Operator '<<' cannot be applied to operands of type 'int' and 'double']\
   at CallSite.Target(Closure , CallSite , Object , Double )\
   at System.Dynamic.UpdateDelegates.UpdateAndExecute2[T0,T1,TRet](CallSite site, T0 arg0, T1 arg1)\
   at Program.Main()
```

## Non-Compliant Code Examples
```csharp
class NonCompliant {
    public static void Main()
    {
        dynamic dyn = 4;

        var binExp = dyn << 1;
        binExpr = dyn << new { amount = 1 };
        binExpr = dyn << new int[1];
        binExpr = dyn << (double)2;
        binExpr = dyn << default(double);
        binExpr = dyn << new[]{1};
        binExpr = dyn << new("key", "value");
        binExpr = dyn << {["key"] = 4};
        binExpr = dyn << $"{2}";
        binExpr = dyn << 1..2;
        binExpr = dyn << typeof(int);
        binExpr = dyn << 2.0;
        binExpr = dyn << null;
        binExpr = dyn << true;
        binExpr = dyn << "2";
        binExpr = dyn << @"2";
        binExpr = dyn << """2""";
        binExpr = dyn << 2F;
        binExpr = dyn << 2f;
        binExpr = dyn << 2L;
        binExpr = dyn << 2l;
        binExpr = dyn << 2U;
        binExpr = dyn << 2u;
        binExpr = dyn << 2UL;
        binExpr = dyn << 2ul;
        binExpr = dyn << 2M;
        binExpr = dyn << 2m;
        binExpr = dyn << 2E+1;
        binExpr = dyn << 2e+1;
        binExpr = dyn << (1, 2);
        binExpr = dyn << new object();

        var assignment = dyn << 1;
        assignment <<= new { amount = 1 };
        assignment <<= new int[1];
        assignment <<= (double)2;
        assignment <<= default(object);
        assignment <<= new[]{1};
        assignment <<= new("key", "value");
        assignment <<= {["key"] = 4};
        assignment <<= $"{2}";
        assignment <<= 1..2;
        assignment <<= typeof(int);
        assignment <<= 2.0;
        assignment <<= null;
        assignment <<= true;
        assignment <<= "2";
        assignment <<= @"2";
        assignment <<= """2""";
        assignment <<= 2F;
        assignment <<= 2f;
        assignment <<= 2L;
        assignment <<= 2l;
        assignment <<= 2U;
        assignment <<= 2u;
        assignment <<= 2UL;
        assignment <<= 2ul;
        assignment <<= 2M;
        assignment <<= 2m;
        assignment <<= 2E+1;
        assignment <<= 2e+1;
        assignment <<= (1, 2);
        assignment <<= new object();
    }
}

```

## Compliant Code Examples
```csharp
class Compliant {
    public static void Main()
    {
        dynamic dyn = 4;
        
        var binExp = dyn << 1;
        binExp = dyn << (int)2.1;
        binExp = dyn << (byte)2.1;
        binExp = dyn << (short)2.1;
        binExp = dyn << (ushort)2.1;
        binExp = dyn << (char)2.1;
        binExp = dyn << default(int);
        binExp = dyn << 2;
        binExp = dyn << 0b0000010;
        binExp = dyn << 0x2;
        binExp = dyn << '2';

        var assignment = dyn << 1;
        assignment <<= (int)2.1;
        assignment <<= (sbyte)2.1;
        assignment <<= (byte)2.1;
        assignment <<= (short)2.1;
        assignment <<= (ushort)2.1;
        assignment <<= (char)2.1;
        assignment <<= default(int);
        assignment <<= 2;
        assignment <<= 0b0000010;
        assignment <<= 0x2;
        assignment <<= '2';

        myObject = new MyObject(123);
    }
}

```
