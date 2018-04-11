---
title: How to Merge Screenboards ?
kind: faq
---

If you want to merge Screenboards together, you will first have to get the ID of each of them (The ID can be found in the URL of the dashboards).

Then use the [script here][1], it relies on the API [get][2] and [push][3] for screenboards.

The usage is very simple, run the following:
```
python merge_screenboard.py [screenboard1,screenboard2...,screenboardN] 
orientation
```

**orientation** is a number, you can select 0 if you want your dashboards to be merged vertically or 1 if you want them horizontally.

By default, the template variables are added uniquely to the new dashboard, but in the code you can add new ones in the dict_tem_var. (examples are listed below as comments).

By default the title is Merged Screenboard but you can change it in the title variable.

The output of the script will be the URL of your merged screenboard.

Note: You can merge integration dashboards, but you first have to clone them so you can have an ID.

You have to enter your API and APP keys in the script for it to work.

[1]: https://github.com/DataDog/Miscellany/blob/master/merge_screenboards.py
[2]: /api/#screenboards-get
[3]: /api/#screenboards-post
