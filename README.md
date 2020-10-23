## 距离 DDL 还有 1 天

关于需求的具体确认，很抱歉时间真的不够了，可以开 issue 可以微信聊。

原则是可用性和可玩性做到就行。

### 部署

首先搭 Python 开发环境，然后安装 Django，一律最新版。

`git clone` 把代码拉下来，数据库迁移（照做就行）：

```
python manage.py migrate
```

### 加页面

原则是照葫芦画瓢。

- `myapp/templates` 放 HTML。
- `myapp/static` 放 Js 和 CSS。

### 调试

```
python manage.py runserver
```

如果是提示 `Starting development server at http://127.0.0.1:8000/`

那么 http://127.0.0.1:8000/login/ 就是登录页。

怎么玩自己的关卡呢？编辑 `myapp/views.py`：

找到这个：

```
def play(request):
```

直接在下面临时插一行，把 `level2.html` 改成你要看的 HTML 文件：

```
    return render(request, 'level2.html')
```

不需要管怎么判断用户输入的 flag 是不是对的，我们来做。

做到让用户看到 flag 就行。

提交代码的时候在 `myapp/views.py` 临时插的行删掉
